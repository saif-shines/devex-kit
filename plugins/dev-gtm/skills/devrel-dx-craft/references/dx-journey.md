# DX Journey

Synthesized from "Developer Marketing Does Not Exist" (primary) + cross-referenced with first-success and sample app principles that appear in the Decoded book and the user's MD note.

**Core Principle:** Developer experience is a journey with distinct emotional and practical stages. Most teams over-invest in later stages (reference docs) and under-invest in the early stages that determine whether a dev ever reaches "I succeeded and will keep using this." First success must be use-case driven via runnable samples, not feature lists. Lead with the problem the dev feels, not what your product supports.

## The Four Stages of the DX Journey

### 1. First Impression: Discovery and Reputation
How the dev hears about you and what they believe before they ever type a command.

- Discovery happens in search, on GitHub, in newsletters, on Hacker News, in peer conversations, on X/LinkedIn.
- Reputation is the sum of what other devs say about you when you are not in the room ("their docs are good", "their SDKs actually work", "they understand real production pain").
- Elements that matter: honest positioning, visible customer stories (not logos), open source presence, technical content that solves problems without requiring a signup.
- Red flag: Your first public artifact is a "why we are better" post or a features matrix.

Actionable checklist for first impression:
- [ ] Can a dev discover the problem you solve via search for their pain ("add auth to express without passport hell") before they know your product name?
- [ ] Do peer recommendations exist that are specific ("the rate limiting in their lib saved us during the incident") rather than generic praise?
- [ ] Is there at least one piece of content that delivers complete value with no bait (full working snippet or decision framework)?

### 2. First Experience: Getting Started and Onboarding
The critical window from "I found it" to "I have something working in my context."

**Avoid These Common Getting Started Mistakes (synthesized directly from the book):**
- Long onboarding without a sample. 20-step checklists that make the dev feel they are configuring a nuclear plant before they see any win.
- Features list first. Opening the page with "supports 12 auth methods, 8 languages, enterprise SSO..." before the dev knows why any of it solves the specific waste or fear they have today.
- No runnable code that produces a visible first success. "Quick example" that is 3 lines of pseudocode or requires 40 minutes of setup before the token appears.
- Assuming the dev wants to learn your mental model before they solve their problem. Dumping architecture diagrams or "our philosophy" before the working login.
- Making the dev leave their editor / context. Forcing them into a dashboard playground before they have proved value in the app they actually ship.
- Treating infrastructure/auth as "different" so the normal first-success rules don't apply. (They apply even more.)

**Elements of a strong First Experience:**
- Immediate orientation to the dev's problem: "If you have ever spent two days debugging why your OAuth redirect lost the state param on mobile..."
- A concrete, time-boxed path to first success that is the primary call to action.
- A runnable artifact (see taxonomy) that the dev can have running in their own terminal or stack in minutes.
- Progressive disclosure: advanced options and full matrix are available but never the hero content.

### 3. First Success: Use Cases and Sample Apps
The moment the dev thinks "this actually works for the thing I need to ship" and the fear/doubt drops.

From the book: First success is the most important and most neglected stage. It is not "the SDK is installed." It is "I solved a real slice of my actual problem using this, in my codebase, and it felt better than the DIY path."

**First Success Criteria (mandatory):**
- The dev experiences a complete, realistic use case (e.g. "user clicks Login with Google in the sample frontend, is redirected, backend validates the token, returns the profile, and a rate limit counter increments on repeated calls").
- The win is visible and attributable to your thing (not "it worked because I already had everything else").
- Time to that win is measured in minutes for the core path, not hours.
- The sample or recipe is in a repo the dev can clone, run, mutate, and keep. Not a gist they will lose.
- There is a tutorial that teaches the knowledge ("why we do the refresh this way", "what fails if you skip the nonce check") so the dev can carry it into their real app.

**Use Cases and Sample Apps are the vehicle:**
- Sample Applications (per the taxonomy table) are the gold standard for first success when the use case has multiple moving parts.
- The sample must be deliberately scoped: a tiny but complete "protected notes API + simple frontend" is better than a half-finished clone of their real product.
- "Use case first" means name the sample after the job the dev has ("auth-accelerator-protected-api-sample"), not after your product ("auth-accelerator-demo-v2").

If you cannot point to the exact first-success use case and the exact runnable artifact that delivers it, you do not have a first success path yet — you have installation docs.

### 4. Last Visit: API Reference and Support
The stage most teams over-fund while starving the earlier ones.

- API reference must be accurate, searchable, and generated from truth (code or OpenAPI) so it never lies.
- Support (docs search, GitHub issues, Discord, office hours) must feel like it is staffed by people who have shipped the same pain the dev is feeling.
- The best support content is the content that prevents the need for support: good first-success samples + recipes that cover the 80% paths, plus honest "here is where it gets hard and what we recommend" sections.

Do not optimize the reference docs at the expense of the sample that gets the dev to the point where they need the reference.

## Elements of a Great Developer Experience (checklist synthesized from the book)

1. Libraries / SDKs in the languages and frameworks your actual users ship in (not the ones that are trendy or easy for you to maintain).
2. Code that is readable and follows the idioms of that language (no "this is our Java written in Python").
3. First success is reachable without leaving the experience or signing up for an account just to see if it works.
4. Clear, honest, problem-first content (share knowledge not features).
5. Fast feedback loops: the dev changes one line and sees the effect immediately.
6. Progressive power: easy path for the 80%, escape hatches and advanced options for the 20% without forcing everyone through them.
7. The "magic" (the hard part you solved for them) is free and frictionless; you charge for scale, support, or additional capabilities later.
8. When something goes wrong, the error messages and docs point to the next concrete action (not "contact support").

## Common Getting-Started Anti-Patterns & Direct Fixes

- Features matrix as hero → Replace with problem statement + "Run this sample and see X working in 4 minutes".
- 15-30 step "complete" onboarding → Extract the 3-5 steps that produce the first visible win; everything else is "after first success".
- "Quickstart" that is neither quick nor a start (requires prior knowledge of your config schema) → Scope a sample that has the config pre-set for the demo use case, with one obvious place the dev edits their own keys.
- Treating the sample as marketing decoration ("here is our pretty demo") rather than the primary first-success vehicle → The sample is the product experience for the first 10 minutes. Invest in it accordingly.
- "Our customers love the docs" when the docs are reference only and the real adoption friction is earlier → Measure time-to-first-success in real user sessions, not NPS on the reference.

This reference must be loaded and cited for any DX Journey & First Success area work. Phase gate: you may not move to taxonomy decisions until the first-success use case and the concrete runnable artifact are explicitly named.

The content directly addresses the RED baseline failures of accepting long checklists, features-first pages, and weak "snippet = first success" definitions.
