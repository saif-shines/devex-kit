# Content Jobs

Synthesized from "Technical Content Strategy Decoded" (primary) + cross-referenced with "Developer Marketing Does Not Exist" (share knowledge not features, first success) and the user's MD note (taxonomy must serve the job).

**Core Principle:** You are not a marketer writing about a product. You are a translator who helps developers solve technical problems they face in their daily work. Good content has a job. If you cannot name the job the content is doing for a specific dev persona at a specific point in their journey, you are producing output, not content that earns trust and drives adoption.

## You Are a Translator

Your job is to stand between the capabilities of the product and the lived technical reality of the developer.

- Devs do not wake up wanting "better auth." They wake up dreading "I have to add Google + email magic link sign-in to this new service before the demo on Friday, and last time the state param got lost on the redirect and I spent 6 hours in the logs."
- The translator's output starts with that sentence (or the equivalent for their domain), then shows the knowledge + the tool that removes the dread.
- Never start with "Our accelerator makes auth easy because we support 12 methods." Start with the specific recurring waste or risk the dev feels.

The lingua franca is code + the concrete problems code is written to solve. Use it.

## Start With Technical Problems

Every piece of content begins by naming a technical problem that exists independently of your product.

Bad (product first): "Introducing our new rate limiting primitives — now with token bucket support!"
Good (problem first): "Your API starts returning 429s at exactly the wrong moment — when a customer is in the middle of a bulk import. Here is exactly why fixed-window counters fail under bursty traffic and what the three common algorithms actually do under load."

The second version earns the right to later say "our implementation of token bucket + the SDK helper makes the correct choice the easy one."

## Good Content Has a Job

A job is the specific change in the developer's world that this content is responsible for producing.

Examples of real jobs:
- Move a dev from "I have never used an external IdP before and I am terrified I will get the security model wrong" to "I have a working Google sign-in in my test app and I understand the three places tokens must be validated."
- Help a dev who is about to pick the wrong rate limiting algorithm for their traffic shape see the failure modes of each in code, so they choose correctly and don't wake up at 3am.
- Give the dev who is evaluating three auth libraries a concrete, runnable way to compare "what happens to my error handling and my mobile client when the token refresh fails" without having to implement all three themselves.

If the only job you can articulate is "increase awareness of our product" or "fill the content calendar," the content will read as marketing and will be ignored or resented.

## The Technical Engagement System

Content is not a funnel of blog posts. It is a system that engages technical people at the moments they need external knowledge.

Typical stages in the system (map every content item to one):

1. **Problem recognition / search** — Dev searches for the pain ("oauth state param lost redirect mobile"). Your content must be findable here with the problem language, not your product name. (Often a deep, honest guide or recipe.)
2. **Evaluation of approaches** — Dev needs to understand the tradeoffs before they commit code. Solution Patterns and comparative content live here.
3. **First implementation / first success** — The moment of highest leverage. Sample Applications and Recipes that deliver a visible win. This is where most adoption either sticks or dies.
4. **Deepening / production hardening** — After first success, the dev wants to understand the edges (what happens at 10k req/s, under token replay, with our hosted option vs self-hosted). Reference + advanced guides + honest "here is where we still make you think" content.
5. **Advocacy / teaching others** — The dev has succeeded and now explains it to teammates or writes their own post. Amplify their voice. Give them the clean diagrams, the accurate numbers, the "I stole this sample and adapted it" credit path.

Measure the system by whether devs move from one stage to the next with less wasted time and fewer scars than the DIY path. Vanity metrics (pageviews, time on page) are secondary.

## How Your Content Finds Its Audience

Devs search for solutions, not products.

- They type the error they are seeing, the integration they need ("stripe webhooks idempotency"), the architectural choice they are stuck on ("jwt vs session cookie for spa").
- Your content must contain the actual solution language and runnable code so search engines and other devs can match it.
- "5 reasons our auth is better" almost never matches those queries. "Why your OAuth redirect loses state on mobile Safari and the three-line fix" does.

## Search Solutions, Not Products

When planning or auditing a series, ask for every item:
- What exact search or Slack question from a real dev does this answer?
- What code would they paste into their editor after reading it?
- What fear or waste does it remove?

If the answer is "it introduces our product name", it is not yet solving a job.

## Understand the DIY Instinct

Developers have a strong bias toward building it themselves the first time.

Reasons (all valid from their perspective):
- They have been burned by libraries that abandoned a critical edge case.
- They understand the code they wrote, even if it is ugly.
- "It will only take a weekend" (it never does).
- They do not trust that you understand their exact constraints (compliance, scale, existing error handling, mobile vs server, etc.).

Content that respects the DIY instinct:
- Acknowledges the legitimate reasons to DIY.
- Shows the hidden costs (the 3am page, the security review that finds the nonce bug, the week lost to token refresh logic).
- Then provides a better path that still leaves the dev in control (the sample they can read and own, the escape hatches, the "here is the source of the hard part we solved for you").
- Never calls the dev stupid or lazy for wanting to do it themselves.

## The Lingua Franca

Speak in runnable code, concrete failure modes, and the numbers that actually matter to the person shipping.

- "4x faster" is marketing. "The refresh dance now takes one round-trip instead of three, and we measured p99 at 180ms on a 2019 MacBook Air over hotel WiFi" is evidence.
- "Enterprise ready" is meaningless. "Handles the exact OIDC claims your IdP returns for service principals, with a 6-line example that survives the case where the 'sub' is a GUID" is useful.
- Tables of features are forgettable. Side-by-side runnable scripts that print "this approach loses the user session under flaky network; this one retries with backoff and preserves it" are memorable.

## Numbers That Matter (and how to use them)

- Time the dev actually spends (hours of their life).
- Number of production incidents or support tickets avoided.
- Concrete p99 / error rate / battery impact on the path the dev cares about.
- Always sourced (from your samples running in realistic conditions, from TABs, from customer conversations). Never invented to make the story better.

If you cannot source the number, use a placeholder or describe the shape ("refresh failures dropped to near zero after we added the nonce + replay protection the spec recommends").

## Mapping Content to Jobs — Actionable Practice

Before writing or approving any content:
1. Name the dev persona and the exact technical situation they are in.
2. Name the job (the before/after change in their world).
3. Name the stage in the Technical Engagement System.
4. Choose the taxonomy pattern that matches the job (use content-taxonomy.md table).
5. Write the opening that names the problem in their language.
6. Deliver the knowledge + the runnable artifact that produces the job outcome.
7. End with what success looks like and what the next realistic job is ("Now that you have a working protected endpoint, the next place teams usually get stuck is...").

Audit existing series by running every item through this list. If you cannot answer 1-3 clearly, the content does not have a job yet.

This reference, together with dx-journey.md and content-taxonomy.md, directly counters the RED baseline failures of product-first titles, funnel-stage "jobs", puffery numbers, and content plans that never define the dev's technical problem or the first-success artifact.

Cite specific sections ("per content-jobs.md: Start With Technical Problems", "Technical Engagement System stage 3", "the DIY instinct paragraph") in every plan or audit.
