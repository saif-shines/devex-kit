# Content Taxonomy

Synthesized from "Developer Marketing Does Not Exist" and "Technical Content Strategy Decoded" + the user's explicit MD note synthesis on the three content patterns (directly informed by the PDFs).

**Core Principle (from the books + MD note):** Content must help the developer achieve first success on a real technical problem. Taxonomy choice is a deliberate decision about the shape of that first success, not about what is easiest to write or maintain. Lead with the problem the dev faces daily. Share knowledge, not features. The format must match the job: end-to-end runnable use case for proving value, focused snippet for a single hard step, or comparative for choosing among approaches.

**The 3 Content Patterns (exact from user's MD note synthesis):**

| Category | Recommended Name | Description |
| :-- | :-- | :-- |
| **End-to-End Demos** | Sample Applications | A complete, runnable application that demonstrates a real-world use case and helps a developer achieve "first success". These samples should ideally include the full code in a repository, a tutorial explaining how it works, and a link to a working demo. |
| **Feature Examples** | Code Snippets / Recipes | Focused, contextual code examples that illustrate how to solve one specific problem. These are most effective when presented within educational content like tutorials, blog posts, or guides that teach developers how to accomplish a task. The goal is to share knowledge, not just product features. |
| **Comparative Scripts** | Solution Patterns | Self-contained scripts that showcase and compare multiple approaches to the same task. This format is excellent for "Comparison" or "Best practices" content that helps developers understand the pros and cons of different techniques, establishing your authority on the topic. |

**Expanded Decision Criteria (when to choose which — synthesized from PDFs + MD note guidance):**

Use this before any taxonomy decision. Ask:

1. What is the minimal "first success" the dev must experience to believe the value and continue? (A working protected login flow across frontend + backend + external IdP? Or "I just added rate limiting to this one route and saw the effect"?)
2. Does achieving that success require seeing multiple components (auth middleware + route protection + token refresh + error handling + UI login) working together in one runnable context? → Sample Application.
3. Is the blocker a single, well-scoped technical step inside a larger app the dev already has (e.g. "how do I safely validate this JWT in my existing Express handler without breaking my error middleware")? → Code Snippets / Recipes.
4. Is the dev choosing between strategies (JWT vs opaque sessions, token bucket vs leaky bucket, OAuth2 vs OIDC) and needs to see tradeoffs in code before committing? → Solution Patterns (but only after they have a first success to anchor the comparison).

Additional criteria from the books:
- Time to first success must be short (<5-15 minutes for the core win). Sample apps must be deliberately scoped so the dev gets the win fast (a tiny "notes app with Google login" not a full SaaS clone).
- Lead with the problem the dev already feels, not the product's capabilities list.
- The chosen pattern must let the dev stay in their own codebase/context as much as possible for the first win.

**When to Use Each (actionable rules):**

**Sample Applications (End-to-End Demos):**
- The core value requires the developer to see the system working as a whole (e.g. user signs in via social, gets redirected, token is validated on API calls, session is maintained across reloads, rate limits kick in on abuse).
- First success = "I ran this, logged in as a real user in the sample, and my own API call succeeded with proper protection."
- Must include: runnable repo (one-command start), clear "run this → see the win in <10 min" instructions, tutorial that explains the why behind the code (not just "copy these files"), link to hosted demo if possible.
- Anti-pattern: Using for a single narrow integration that does not need the full context.

**Code Snippets / Recipes (Feature Examples):**
- The dev's pain is a specific, isolated technical hurdle inside their existing app ("my token refresh logic always fails on mobile networks", "I need to support both cookie and bearer for the same endpoints").
- First success = "I pasted/adapted this 6-15 line example into my route/handler and the specific problem is now solved."
- Must be embedded in teaching content that explains the knowledge (why this approach, what the pitfalls were, how it interacts with the rest of their system).
- Goal is knowledge transfer, not "here is our config object".
- Anti-pattern: Using a recipe when the win requires the full chain (the dev will copy the snippet, it will half-work, and they will abandon because they never saw the end-to-end mental model).

**Solution Patterns (Comparative Scripts):**
- The dev is evaluating or already past first success and now needs to make a tradeoff decision (sessions vs JWT for their scale and compliance needs; which rate limiting algo matches their traffic shape).
- First success for the comparison itself = "I ran the three side-by-side scripts against my mental model / test load and can now articulate the pros/cons for my situation."
- Excellent for authority-building content after the dev trusts you via a prior first success.
- Must be self-contained and runnable for the comparison (e.g. three small scripts + a runner that outputs latency, memory, correctness under failure injection).
- Anti-pattern: Leading with comparisons before the dev has any skin in the game or first success. They have no basis to care about the tradeoffs.

**Explicit Counters for Common Rationalizations (from RED baselines):**

- "Auth is sensitive / a full sample is too heavy or risky? If the value proposition your devs care about is 'I can trust this in production for a real user flow', then a runnable end-to-end sample (even a deliberately tiny scoped app) is required for first success. A snippet alone leaves them without the mental model of how the pieces survive a real redirect + token + refresh cycle. Use the table row for End-to-End Demos."
- "Recipe is faster to ship under deadline? Taxonomy is chosen for the dev's first-success job, not for your authoring velocity. If the job requires end-to-end proof, you scope a small sample app and ship that. Speed comes from ruthless scoping of the sample, not from downgrading the pattern."
- "For infrastructure/auth, snippets + checklist are what they expect? The books are clear: features lists and long checklists are common getting-started mistakes that kill first success. Devs trying auth have the DIY instinct and fear of 'I will get the security model wrong.' A working sample they can run and mutate defeats that fear faster than any checklist."
- "We can start with a minimal starter repo and call it sample? Only if it actually delivers a complete, runnable use case win (sign up/login/protected call) that the dev experiences as success. A 'minimal starter' that is just the library + a hello route is often just a dressed-up recipe and should be labeled as such."
- "Solution pattern will show our superiority early? Comparisons only land after first success. Before that, the dev is still trying to get any auth working at all; showing three options increases paralysis."

**Decision Tree (use in every taxonomy session):**

Start here:
- Is there a defined first-success use case (specific dev problem + concrete win the dev will feel)? If no → stop. Go back to DX Journey.
- Does the win require the full chain visible and working together in one app the dev runs? → Sample Application (End-to-End).
- Is it one sharp, contextual problem inside the dev's existing code? → Recipe / Snippet.
- Is the dev choosing strategy after they have a working baseline? → Solution Pattern.

Document the choice + which row of the table justified it + the exact first-success definition before writing any content or getting-started page.

This reference directly counters the RED baseline failures of weak taxonomy justification (speed vs. problem match), accepting features-first getting started, and weak first-success definitions. The exact MD note table must be cited by name in every response.
