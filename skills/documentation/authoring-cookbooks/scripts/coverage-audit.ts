#!/usr/bin/env -S deno run --allow-read

/**
 * coverage-audit.ts
 *
 * Scans recipe markdown files and reports documentation quality issues
 * across three dimensions derived from documentation quality principles:
 *   - skimmability: structure, titles, paragraph length, tables of contents
 *   - writing: parsing tax, demonstrative pronouns, consistency, presumptuous language
 *   - helpfulness: abbreviations, use-case statements, fragile examples, coverage
 *
 * Usage:
 *   deno run --allow-read scripts/coverage-audit.ts ./recipes/
 *   deno run --allow-read scripts/coverage-audit.ts ./recipes/ --json
 *   deno run --allow-read scripts/coverage-audit.ts ./recipes/ --check skimmability
 */

// === INTERFACES ===
interface RecipeIssue {
  file: string;
  check: string;
  dimension: "skimmability" | "writing" | "helpfulness";
  severity: "error" | "warning";
  message: string;
  line?: number;
}

interface AuditResult {
  file: string;
  issues: RecipeIssue[];
  score: number; // 0–100
}

interface AuditSummary {
  files_scanned: number;
  total_issues: number;
  errors: number;
  warnings: number;
  results: AuditResult[];
  top_issues: string[];
}

// === CHECKS: SKIMMABILITY ===

function checkSkimmability(content: string, file: string): RecipeIssue[] {
  const issues: RecipeIssue[] = [];
  const lines = content.split("\n");

  // Must have H2 sections
  const hasH2 = lines.some((l) => l.startsWith("## "));
  if (!hasH2) {
    issues.push({
      file, check: "no-sections", dimension: "skimmability", severity: "error",
      message: "No H2 sections found. Split content into sections with informative titles.",
    });
  }

  // Detect abstract noun titles
  const abstractNouns = [
    "overview", "introduction", "background", "notes", "results",
    "usage", "details", "info", "summary", "conclusion", "misc",
  ];
  lines.forEach((line, i) => {
    if (line.startsWith("## ") || line.startsWith("### ")) {
      const titleText = line.replace(/^#+\s+/, "").toLowerCase().trim();
      if (abstractNouns.some((n) => titleText === n || titleText === n + "s")) {
        issues.push({
          file, check: "abstract-noun-title", dimension: "skimmability", severity: "warning",
          message: `"${line.trim()}" is an abstract noun title. Rewrite as an informative sentence.`,
          line: i + 1,
        });
      }
    }
  });

  // Table of contents for docs with 4+ sections
  const h2Count = lines.filter((l) => l.startsWith("## ")).length;
  if (h2Count >= 4) {
    const hasToc =
      content.toLowerCase().includes("table of contents") ||
      /^- \[/m.test(content) ||
      /^\* \[/m.test(content);
    if (!hasToc) {
      issues.push({
        file, check: "no-toc", dimension: "skimmability", severity: "warning",
        message: `${h2Count} sections but no table of contents. Add one to speed up navigation.`,
      });
    }
  }

  // Long paragraphs
  const paragraphs = content.split(/\n\n+/);
  paragraphs.forEach((para) => {
    if (
      para.startsWith("#") ||
      para.startsWith("```") ||
      para.startsWith("|") ||
      para.startsWith("-") ||
      para.startsWith("*") ||
      para.startsWith(">")
    ) return;
    const sentenceCount = (para.match(/[.!?]+[\s\n]/g) || []).length;
    if (sentenceCount > 5) {
      issues.push({
        file, check: "long-paragraph", dimension: "skimmability", severity: "warning",
        message: `Paragraph with ~${sentenceCount} sentences. Split at a logical break to aid skimming.`,
      });
    }
  });

  return issues;
}

// === CHECKS: WRITING ===

function checkWriting(content: string, file: string): RecipeIssue[] {
  const issues: RecipeIssue[] = [];
  const lines = content.split("\n");

  // Demonstrative pronouns crossing sentence boundaries
  const demonstrativePatterns = [
    /\.\s+(This|These|That|Those)\s+(means|enables|allows|makes|causes|creates|results)/gi,
    /Building on (this|that|these|those)[,\.]/gi,
    /As (mentioned|noted|described|discussed|covered|explained) (above|earlier|previously|before)/gi,
    /As (we|you) (discussed|noted|mentioned|saw|covered|described)/gi,
  ];
  lines.forEach((line, i) => {
    demonstrativePatterns.forEach((pattern) => {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        issues.push({
          file, check: "demonstrative-reference", dimension: "writing", severity: "warning",
          message: `Line ${i + 1}: Demonstrative reference found. Replace with the explicit noun.`,
          line: i + 1,
        });
      }
    });
  });

  // Presumptuous language
  const presumptuousPatterns = [
    /you (probably|likely|might|may) want/gi,
    /you('ll| will) (need|want|have) to (learn|understand|know)/gi,
    /next, you('ll| will) (need|want)/gi,
    /now you('ll| will) (want|need)/gi,
  ];
  lines.forEach((line, i) => {
    presumptuousPatterns.forEach((pattern) => {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        issues.push({
          file, check: "presumptuous-language", dimension: "writing", severity: "warning",
          message: `Line ${i + 1}: Presumptuous phrasing assumes reader intent. Use "To X, ..." instead.`,
          line: i + 1,
        });
      }
    });
  });

  // Mixed heading case detection
  const headings = lines
    .filter((l) => l.startsWith("#"))
    .map((l) => l.replace(/^#+\s+/, "").trim());

  if (headings.length > 3) {
    const titleCase = headings.filter((h) => {
      const words = h.split(" ");
      return words.length > 1 && words.slice(1).filter((w) => w.length > 3).every((w) => /^[A-Z]/.test(w));
    }).length;
    const sentenceCase = headings.filter((h) => {
      const words = h.split(" ");
      return words.length > 1 && words.slice(1).some((w) => w.length > 3 && /^[a-z]/.test(w));
    }).length;
    if (titleCase > 0 && sentenceCase > 0) {
      issues.push({
        file, check: "heading-case-inconsistency", dimension: "writing", severity: "warning",
        message: "Mixed heading case. Pick Title Case or Sentence case and apply consistently throughout.",
      });
    }
  }

  return issues;
}

// === CHECKS: HELPFULNESS ===

function checkHelpfulness(content: string, file: string): RecipeIssue[] {
  const issues: RecipeIssue[] = [];

  // Common abbreviations that should be expanded on first use
  const abbreviations: Record<string, string> = {
    "API": "application programming interface",
    "SDK": "software development kit",
    "JWT": "JSON Web Token",
    "OAuth": "Open Authorization",
    "OIDC": "OpenID Connect",
    "SSO": "single sign-on",
    "SAML": "Security Assertion Markup Language",
    "CLI": "command-line interface",
    "SQL": "structured query language",
    "REST": "representational state transfer",
    "TLS": "Transport Layer Security",
    "SSL": "Secure Sockets Layer",
    "RAG": "retrieval-augmented generation",
    "LLM": "large language model",
  };

  Object.entries(abbreviations).forEach(([abbr, expansion]) => {
    const usagePattern = new RegExp(`\\b${abbr}\\b`);
    const expansionPattern = new RegExp(`${abbr}\\s*\\(|\\(${abbr}\\)|${expansion}`, "i");
    if (usagePattern.test(content) && !expansionPattern.test(content)) {
      issues.push({
        file, check: "unexpanded-abbreviation", dimension: "helpfulness", severity: "warning",
        message: `"${abbr}" used without expansion. Expand on first use: "${expansion} (${abbr})".`,
      });
    }
  });

  // Must have a "use this when" or problem statement
  const hasProblemStatement = /use this when|when to use|use case:|problem:/i.test(content);
  if (!hasProblemStatement) {
    issues.push({
      file, check: "no-problem-statement", dimension: "helpfulness", severity: "error",
      message: 'No problem statement found. Add "Use this when: ..." before the code. Readers need context first.',
    });
  }

  // Hardcoded secrets in code blocks
  const codeBlockPattern = /```[\s\S]*?```/g;
  const codeBlocks = content.match(codeBlockPattern) || [];
  const secretPatterns = [
    { pattern: /sk-[a-zA-Z0-9]{20,}/, label: "OpenAI-style API key" },
    { pattern: /api[_-]?key\s*=\s*["'][a-zA-Z0-9_\-]{8,}["']/i, label: "hardcoded api_key value" },
    { pattern: /secret\s*=\s*["'][a-zA-Z0-9_\-]{8,}["']/i, label: "hardcoded secret value" },
    { pattern: /password\s*=\s*["'][^"']{4,}["']/i, label: "hardcoded password" },
    { pattern: /token\s*=\s*["'][a-zA-Z0-9_\-\.]{20,}["']/i, label: "hardcoded token value" },
  ];

  codeBlocks.forEach((block) => {
    secretPatterns.forEach(({ pattern, label }) => {
      if (pattern.test(block)) {
        issues.push({
          file, check: "hardcoded-secret", dimension: "helpfulness", severity: "error",
          message: `Potential ${label} in code block. Use environment variable references instead.`,
        });
      }
    });
  });

  // Troubleshooting section for non-trivial docs
  const wordCount = content.split(/\s+/).length;
  if (wordCount > 200) {
    const hasTroubleshooting = /## (troubleshooting|if this|common (errors|problems|issues))/i.test(content);
    if (!hasTroubleshooting) {
      issues.push({
        file, check: "no-troubleshooting", dimension: "helpfulness", severity: "warning",
        message: "No troubleshooting section. Readers will hit errors — give them a path forward.",
      });
    }
  }

  return issues;
}

// === SCORING ===

function scoreRecipe(issues: RecipeIssue[]): number {
  const errorPenalty = issues.filter((i) => i.severity === "error").length * 20;
  const warningPenalty = issues.filter((i) => i.severity === "warning").length * 5;
  return Math.max(0, 100 - errorPenalty - warningPenalty);
}

// === FILE SCANNING ===

async function scanDirectory(dir: string): Promise<string[]> {
  const files: string[] = [];
  try {
    for await (const entry of Deno.readDir(dir)) {
      if (entry.isFile && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
        files.push(`${dir}/${entry.name}`);
      } else if (entry.isDirectory && !entry.name.startsWith(".")) {
        const subFiles = await scanDirectory(`${dir}/${entry.name}`);
        files.push(...subFiles);
      }
    }
  } catch {
    // Not found or no permission — return empty
  }
  return files;
}

async function auditFile(
  filePath: string,
  dimension?: "skimmability" | "writing" | "helpfulness",
): Promise<AuditResult> {
  let content: string;
  try {
    content = await Deno.readTextFile(filePath);
  } catch {
    return { file: filePath, issues: [], score: 0 };
  }

  const issues: RecipeIssue[] = [];
  if (!dimension || dimension === "skimmability") issues.push(...checkSkimmability(content, filePath));
  if (!dimension || dimension === "writing") issues.push(...checkWriting(content, filePath));
  if (!dimension || dimension === "helpfulness") issues.push(...checkHelpfulness(content, filePath));

  return { file: filePath, issues, score: scoreRecipe(issues) };
}

// === FORMATTING ===

function formatSummary(summary: AuditSummary): string {
  const lines: string[] = [];

  const scoreEmoji = (s: number) => s >= 80 ? "✓" : s >= 60 ? "~" : "✗";

  lines.push("Documentation Quality Audit");
  lines.push("===========================");
  lines.push(`Files scanned : ${summary.files_scanned}`);
  lines.push(`Total issues  : ${summary.total_issues} (${summary.errors} errors, ${summary.warnings} warnings)`);
  lines.push("");

  if (summary.top_issues.length > 0) {
    lines.push("Most common issues:");
    summary.top_issues.forEach((issue) => lines.push(`  - ${issue}`));
    lines.push("");
  }

  summary.results
    .sort((a, b) => a.score - b.score) // worst first
    .forEach((result) => {
      lines.push(`${scoreEmoji(result.score)} ${result.file}  [score: ${result.score}/100]`);
      if (result.issues.length === 0) {
        lines.push("  No issues found.");
      } else {
        result.issues.forEach((issue) => {
          const prefix = issue.severity === "error" ? "  [ERROR]" : "  [WARN] ";
          lines.push(`${prefix} [${issue.dimension}] ${issue.message}`);
        });
      }
      lines.push("");
    });

  return lines.join("\n");
}

// === MAIN ===

async function main(): Promise<void> {
  const args = Deno.args;

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`coverage-audit.ts

Scan recipe files and report documentation quality issues.

Usage:
  deno run --allow-read scripts/coverage-audit.ts <path>
  deno run --allow-read scripts/coverage-audit.ts <path> --json
  deno run --allow-read scripts/coverage-audit.ts <path> --check skimmability|writing|helpfulness

Options:
  --json                    Output results as JSON
  --check <dimension>       Only check one dimension (skimmability, writing, helpfulness)

Examples:
  deno run --allow-read scripts/coverage-audit.ts ./recipes/
  deno run --allow-read scripts/coverage-audit.ts ./recipes/ --check writing
  deno run --allow-read scripts/coverage-audit.ts docs/authentication.md --json
`);
    Deno.exit(0);
  }

  // Parse --check
  const checkIndex = args.indexOf("--check");
  const dimensionRaw = checkIndex !== -1 ? args[checkIndex + 1] : undefined;
  const dimension = (
    ["skimmability", "writing", "helpfulness"].includes(dimensionRaw ?? "")
      ? dimensionRaw
      : undefined
  ) as "skimmability" | "writing" | "helpfulness" | undefined;

  const jsonOutput = args.includes("--json");

  const skipIndices = new Set<number>();
  if (checkIndex !== -1) { skipIndices.add(checkIndex); skipIndices.add(checkIndex + 1); }

  // Find target path (positional arg)
  let targetPath: string | null = null;
  for (let i = 0; i < args.length; i++) {
    if (!args[i].startsWith("--") && !skipIndices.has(i)) {
      targetPath = args[i];
      break;
    }
  }

  if (!targetPath) {
    console.error("Error: target path required.\nUsage: coverage-audit.ts <dir-or-file>");
    Deno.exit(1);
  }

  // Resolve files
  let files: string[] = [];
  try {
    const stat = await Deno.stat(targetPath);
    if (stat.isFile) {
      files = [targetPath];
    } else {
      files = await scanDirectory(targetPath);
    }
  } catch {
    console.error(`Error: cannot access "${targetPath}"`);
    Deno.exit(1);
  }

  if (files.length === 0) {
    console.log("No markdown files found.");
    Deno.exit(0);
  }

  // Audit all files
  const results = await Promise.all(files.map((f) => auditFile(f, dimension)));

  // Count top issues by check type
  const issueCounts: Record<string, number> = {};
  results.forEach((r) =>
    r.issues.forEach((i) => {
      issueCounts[i.check] = (issueCounts[i.check] || 0) + 1;
    })
  );
  const topIssues = Object.entries(issueCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([check, count]) => `${check} (${count} file${count > 1 ? "s" : ""})`);

  const summary: AuditSummary = {
    files_scanned: files.length,
    total_issues: results.reduce((sum, r) => sum + r.issues.length, 0),
    errors: results.reduce((sum, r) => sum + r.issues.filter((i) => i.severity === "error").length, 0),
    warnings: results.reduce((sum, r) => sum + r.issues.filter((i) => i.severity === "warning").length, 0),
    results,
    top_issues: topIssues,
  };

  if (jsonOutput) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(formatSummary(summary));
  }
}

main();
