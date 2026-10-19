---
name: portfolio-copy-check
description: Review the portfolio website's copy for grammar and for a conversational tone that describes each project clearly. Use when the user asks to proofread, review, check, or clean up the site's text/copy/wording — Home, About, or any case study (Fika, Criteria, Honeybee Health, Square).
---

# Portfolio copy check

Review the copy on this portfolio site for two things only: **grammar** and **conversational, easy-to-follow project descriptions**. This is not a design or layout review — leave styles, components, and structure alone unless a copy fix requires touching the string in place.

## Where the copy lives

| File | What's in it |
|---|---|
| `src/Home.js` | Tagline, bio, `EXPERIENCE`, `TOOL_LIST`, `SKILLS`, `VALUES` descriptions, `CARDS` project blurbs, `SERVICES` |
| `src/About.js` | Tagline, bio, `HOUR_ACTIONS` |
| `src/projects/projectData.js` | Shared/legacy project case study copy |
| `src/projects/fika/fikaData.js` | Fika case study (`title`, `subtitle`, `eyebrow`, block `text`) |
| `src/projects/criteria/criteriaData.js` | Criteria case study |
| `src/projects/hbh3/hbh3Data.js` | Honeybee Health case study |
| `src/projects/square/squareData.js` | Square case study |

Read the file(s) relevant to what the user asked about before making any judgment — don't rely on memory of past reviews, copy changes over time.

## What to check

**Grammar and mechanics**
- Spelling, punctuation, apostrophes, subject–verb agreement, run-ons, sentence fragments (fragments are fine only when clearly stylistic, e.g. a one-line eyebrow).
- Consistent tense within a passage — case study copy is mostly past tense ("I designed…", "Enabled physicians to…"); catch drift into present or future tense.
- Consistent capitalization and terminology for the same thing across files (e.g. a company name spelled/cased one way everywhere).

**Conversational tone**
- Each project description should read like the designer explaining the work to a person, not like a resume bullet or marketing deck. Flag corporate jargon ("leveraged synergies," "drove impact," "end-to-end solution") and suggest a plainer alternative.
- Prefer active voice and concrete outcomes over vague claims ("improved the experience" → say what changed and for whom).
- Each project's one-line description (the `description` field in `CARDS` on Home, and each case study's `subtitle`) should answer, in one breath: who is this for, and what does it let them do? If it doesn't, say so and propose a replacement in the site's existing voice.
- Keep sentences short. A case study block should be skimmable — break up any block-of-text paragraph that runs past ~3-4 sentences if it's covering more than one idea.

**Consistency with the site's existing voice**
- The bio and taglines use a warm, first-person, lightly casual voice (e.g. the 👋🏼 wave, "So-knee-kah" phonetic). Match that register — don't drift case study copy into a more formal voice than the bio, or vice versa.
- Don't rewrite a phrase just because a different phrasing is possible — only flag actual grammar errors or copy that fails the conversational/clarity bar above.

## Output

For each issue found, report:
- **File and location** (e.g. `src/projects/fika/fikaData.js:101`) — use clickable `file:line` references.
- **What's there now** (the exact current text).
- **The problem** — grammar error, or which tone/clarity criterion above it fails.
- **A suggested rewrite** in the site's existing voice.

Group findings by file, in reading order. If a whole section reads clean, say so briefly rather than listing nothing — don't pad the response with unfound issues.

Do not edit files unless the user asks you to apply the fixes. If asked to apply fixes, make the edits and then summarize what changed per file.
