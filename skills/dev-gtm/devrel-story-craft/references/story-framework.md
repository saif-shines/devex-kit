# Story Framework

Synthesized from the Developer-Facing Startup Alchemist GTM playbook (Adam Frankl / Alchemist Accelerator, 2024).

**Core Principle:** Your story must make the developer the hero, the problem the villain, and your product the guide that helps them win. Back all claims with facts. "Extraordinary claims require extraordinary evidence."

**A story has three parts:**
1. Articulate the pain (what devs fear or waste time on daily).
2. The villain (the root cause problem increasing pain points).
3. The victory (paint a picture of the future where they eliminate wasted time).

**Key Rules from the playbook:**
- Be the trusted authority. Don't market to companies—market to devs.
- Always sell the category, not your solution.
- Let your customers sell your product.
- Differentiate your product benefits, not features.
- Know the change that increases your customers’ pain points daily.
- Best value proposition for individual devs: Eliminate wasted time. There are two types of time.
- Paint a picture of the future vs. giving a demo of the present.

**The 12 Most Common Story Mistakes (with Why bad and Fix, synthesized from playbook context):**

1. Talking about the solution
   Why bad: Developers are skeptical and ignore typical marketing messages. Starting with the solution makes it sound like hype.
   Fix: Lead with the pain. Use the "eliminate wasted time" value prop. Start with what devs fear or the problem they face.

2. Not being trusted by other experts
   Why bad: Without TAB or evidence, devs won't believe you.
   Fix: Recruit TAB with various dev personas. Back claims with facts from customers.

3. Making your solution or company the hero
   Why bad: The hero should be the customer/dev.
   Fix: Make the dev the hero, the problem the villain.

4. Not understanding the four levels of differentiation
   Why bad: (Synthesized: benefits vs features, category, etc.)
   Fix: Differentiate benefits, sell category.

5. Using puffery
   Why bad: Devs don't lie to other devs; they spot exaggeration.
   Fix: Use evidence, customer quotes, numbers.

6. Marketing to your own VP of Engineering
   Why bad: You're not the audience.
   Fix: Market to devs, use their language.

7. Telling a lie
   Why bad: Destroys trust permanently.
   Fix: Be honest, even about limitations.

8. Trying to trick a dev
   Why bad: Devs are analytical and skeptical.
   Fix: Be transparent.

9. Sharing that you have pleased executives
   Why bad: Devs don't care about execs; they care about their own problems.
   Fix: Lead with user/dev stories.

10. Making a new product release into a story
    Why bad: Releases are not stories.
    Fix: Tie to ongoing pain/villain.

11. Calling your product a platform
    Why bad: Premature; devs see through it.
    Fix: Call it what it is, focus on solving specific pain.

12. Using ghost stories inappropriately
    Why bad: (Synthesized from context: perhaps unverified or irrelevant.)
    Fix: Use real customer stories.

**Explicit Counters for Common Rationalizations (REFACTOR hardened):**

- "Talking about the solution first? Delete the draft and restart with the pain. No exceptions."
- "Under time pressure? The pressure is exactly when you must follow the structure—rushing produces the exact hype devs ignore."
- "The summary only said high level? The skill provides the exact structure the summary was pointing to. Use it."
- "We'll do TAB later? No. TAB validates the story before you ship any draft for review."
- "It's just a launch post, not a full story? Every public claim about the product is a story moment and must follow the rules."
- "I added evidence numbers to help? Only use numbers that come from real customer conversations or TAB. Inventing is lying (mistake #7)."
- "The canvas is ready, I can send the canvas as the story tonight for review? No. The canvas is pre-story hypothesis. It is not shippable content. Expand only after TAB validation."
- "The manager only needs direction, a quick draft is fine? The only direction you may give under this skill is the validated canvas + the plan to run the exact 3-question TAB calls before any draft exists."
- "I can paraphrase the 3 questions for natural flow? No. Use the diagnostic questions verbatim on the call. Paraphrasing turns them generic and loses the 'change that increases pain daily' signal."
- "This is just the recruitment email, the story rules don't apply yet? The recruitment email is the first public expression of the story. It must lead with pain and follow the template exactly."

**Rationalization Counter Table (new in REFACTOR)**

| Observed Rationalization (from RED/GREEN) | Counter Rule (cite in every response) | Where Documented |
|-------------------------------------------|---------------------------------------|------------------|
| "I started with pain but had to describe the feature for substance" | The canvas (pain + villain + victory) IS the substance until TAB. No feature list, no "in 5 lines", no product name until after validation. | story-framework.md Explicit Counters + canvas template |
| "We'll validate later / TAB in parallel" | TAB must complete (5-7 calls + synthesis) BEFORE any draft for review is produced. Phase gate is non-negotiable. | tab-playbook.md "you are not allowed to publish" + SKILL.md phase gates |
| "Added plausible numbers to help, can replace later" | Inventing = lying (mistake #7). Remove the claim or leave placeholder "[TAB quote or customer X said Y]". | story-framework.md mistake 7 + Evidence Rule |
| "The questions were reasonable / open enough" | Only the exact 3 diagnostic questions. Generic questions produce generic (useless) data. | tab-playbook.md "use on every TAB call" |
| "Email can mention the benefit of the thing we're building" | Recruitment email: zero mention of product, features, or "we're building". Pure pain research framing. | tab-playbook.md email template |
| "This is just internal / for the manager / not public" | Every artifact you produce that a human outside the TAB will read is a story moment and must obey the rules. | story-framework.md "Every public claim..." counter |
| "Under 6pm deadline I have to ship something" | Communicate the canvas + the TAB plan with timeline. That is the professional output. Shipping unvalidated hype damages trust permanently. | SKILL.md "under pressure the counters are mandatory" |

**How to Build a Story Canvas (actionable template):**

1. Pain: List 3-5 specific daily wastes or fears for the target dev persona. Example: "Every integration means 3 weeks of custom code for auth, retries, schema drift, and monitoring that breaks on the next source update."
2. Villain: Name the root cause that makes the pain increase daily. Example: "The villain is the assumption that 'each data source is unique enough to justify bespoke glue code forever' — this assumption compounds as teams add more sources and the boilerplate tax grows."
3. Victory: Paint the future state with concrete time reclaimed. Example: "In the future, adding a new source takes <10 minutes of config. The 3 weeks per integration is reclaimed for core product work. The dev becomes the hero who ships the actual user value instead of plumbing."

Always validate this canvas with TAB before expanding into copy, landing pages, or newsletters.

**Evidence Rule:** Every claim of "fast", "easy", "best", "saves time" must be traceable to a customer quote, TAB feedback, or measured data. If you cannot cite it, remove the claim.

**REFACTOR Note:** These counters were added after GREEN re-tests revealed remaining loopholes (treating canvas as shippable, paraphrasing questions, "manager only needs direction"). The table makes the mapping from temptation to mandatory behavior explicit so agents can cite it under pressure.

This reference directly counters the RED baseline failures of solution-first writing, missing villains, puffery, and skipping TAB. After REFACTOR it is bulletproof even when the user adds "manager wants it shipped tonight".
