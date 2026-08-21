# Triage questions and example sessions

## Key questions

### Initial triage
- "If I skim only the headings, do I understand what this doc covers?"
- "Is the most important information visible before I scroll?"
- "Can a beginner and an expert both get value from this doc?"

### Recipe-level diagnosis
- "What is the reader's problem before they open this recipe?"
- "Does the first sentence tell them if this solves their problem?"
- "Can they copy-paste the code and run it right now?"

### Coverage
- "What questions does support answer most often?"
- "What search terms bring readers here?"
- "What would make a reader give up and go to a competitor's docs?"

## Example sessions

**User:** "Readers say our docs are hard to follow but we have plenty of content."

1. "Hard to follow" with adequate content is likely AC2 (buried takeaways) or AC3 (parsing tax).
2. Skim headings of 5 pages. If headings are abstract nouns, the states are AC1 and AC2.
3. Read first sentences of random paragraphs. If they reference prior text, the state is AC3.
4. Rewrite topic sentences first. Then invert structure.

**User:** "We're getting support tickets for things that are already in our docs."

1. Content exists but readers do not use it. That is AC1 (cannot find it) or AC7 (wrong things documented).
2. Ask: "Where in the doc is the answer: top or buried?"
3. If buried, use the AC2 intervention. Put takeaways up front.
4. If at the top but undiscoverable, use AC1. Fix navigation and structure.
5. If the answer is there but readers still ask, use AC5. Jargon is blocking comprehension.

**User:** "Starting a new cookbook from scratch. Where do I begin?"

1. Prevention mode. There is no failure state yet.
2. Define the recipe template first. That prevents AC1.
3. Write a terminology glossary before writing content. That prevents AC4.
4. Establish depth tiers (quick / standard / deep). That prevents AC3.
5. Map coverage against reader use cases before writing. That prevents AC7.
6. Scaffold the first 5 recipes with `recipe-scaffold.ts`.
