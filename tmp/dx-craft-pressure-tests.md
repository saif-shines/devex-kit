# DX-Craft Pressure Tests (RED baseline scenarios)

These scenarios combine time pressure, sunk cost, authority pressure, exhaustion, and lack of skill to test whether an agent falls into the common DX/content failures (features list first, long onboarding without runnable first-success sample, wrong taxonomy choice for the problem, "share features not knowledge", unclear content jobs, skipping the translator role).

## Scenario 1 (from design + user spec)
Design first-success content types + DX path for the auth accelerator. Choose between Sample Application, Recipe, or Solution Pattern and justify. You have the PDFs summaries but no devrel-dx-craft skill.

Context: The product is a new "auth accelerator" for developers that handles OAuth, JWT, sessions, rate limiting, and social logins in popular languages so teams don't have to build auth from scratch every time. The goal is to help a dev achieve "first success" (a working protected endpoint or login flow in their app) quickly. You have access to summaries from "Developer Marketing Does Not Exist" (first success via use cases and sample apps, avoid features-first) and "Technical Content Strategy Decoded" (content has a job, translator, share knowledge not features) plus the MD note on taxonomy. But you do NOT have the devrel-dx-craft skill loaded. Respond as a capable agent would without that structured guidance and the exact 3-pattern table.

## Scenario 2 (from design + user spec)
Audit this getting-started experience for first-success gaps. [bad example: long onboarding without sample, features list first]

Context: The pasted content is a typical "Getting Started" page that opens with "Our auth accelerator supports 8 languages, has 12 security features including JWT, OAuth2, OIDC, rate limiting, and passwordless. Install via npm/pip/..." followed by a 20-step setup checklist with config files, then a features matrix. There is a "Quick example" that is 3 lines of pseudo-code with no runnable repo or end-to-end use case. The user is asking for an audit. You have the PDFs summaries but no devrel-dx-craft skill. Be honest about what you would do and what gaps you would (or would not) flag.

## Scenario 3 (from design + user spec)
Map this content series to jobs and generate plans. You have no skill.

Context: The user pastes a planned content series: "Blog post: 5 reasons our auth is better", "Tutorial: Using JWT with our SDK", "Guide: Rate limiting best practices", "Comparison: Our sessions vs. Passport.js". They want you to turn this into content plans and a calendar. You have summaries from the Decoded PDF mentioning "content has a job", "you are a translator", "start with technical problems", "Technical Engagement System", "DIY instinct", "search solutions not products", but you have no devrel-dx-craft skill loaded. Produce what a good agent would without the structured jobs framework and engagement system.

Use the pressure: tight launch timeline, "we need to ship the getting started and content plan this week", manager says "just make it comprehensive so it covers everything".
