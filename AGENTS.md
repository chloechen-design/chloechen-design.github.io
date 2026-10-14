# Portfolio repository guidance

Before changing this portfolio, read `docs/portfolio-redesign-brief.md` and inspect the current Git state, the requested page, and its source assets. Treat GitHub `main` and merged PRs as the published source of truth; this local checkout may be behind. Do not assume a remembered commit or local draft is current.

## Scope and workflow

- Make changes only to the page or project the user asked for. Keep each project update isolated on its own branch and PR.
- Do not change the homepage or its visual system unless the user explicitly asks. The previous homepage redesign was rejected.
- Do not mix the unmerged Work catalogue draft into project-page updates. Do not include unrelated cache or generated files.
- Do not merge, push, or publish unless the user explicitly asks. When they do ask to publish, first verify the exact branch/PR and changed files, and report the live URL only after deployment is confirmed.
- Preserve existing work. Inspect diffs before editing or reverting anything; never reset or overwrite `main` to make a change easier.
- If the current checkout is stale or the GitHub permission blocks access, explain what is available and work only from verified files. Never claim a remote update succeeded without evidence.

## Design and storytelling standard

- Keep Chloé's own portfolio foundation and the established FTL case-study shell: typography, spacing, palette, gradients, and fixed chapter navigation. Use reference portfolios for useful storytelling and presentation patterns, not as templates to copy.
- Build a convincing senior product-design story: context and status; specific problem and evidence; the decision and trade-offs; the related complete UI or flow; delivery, impact or measurement plan; and honest limitations/reflection.
- Keep evidence next to the decision it supports. Show complete interfaces and meaningful states, components, and workflows when the project supports them. Make the page visually lively and polished, with purposeful motion where useful.
- Preserve image proportions and crop only when the user-approved composition supports it. Avoid tiny clipped screens, constant in-frame scrolling, static paper-like walls of text, oversized abstract slogans, and repetitive process narration.
- Use plain-language labels. Do not call a section “TL;DR.” Never invent research, metrics, launch status, user outcomes, or AI capabilities. Distinguish shipped work, concepts, synthetic demo data, hypotheses, and validation limits.
- Make motion responsive to reduced-motion preferences and keep important content accessible without hover.

## Before handing work back

Inspect the final diff and preview the requested page at desktop and mobile sizes. Give the user a direct preview link and a short list of changes. Clearly distinguish local preview, PR preview, and the published HTTPS URL.
