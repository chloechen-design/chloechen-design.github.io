# Portfolio redesign brief

Last updated: 2026-10-13

This is the living source of truth for portfolio work across separate Codex conversations. Update it when the user changes a durable design rule or when a page's implementation/deployment status changes. Do not ask the user to repeat anything already recorded here; verify changing Git and deployment facts before acting.

## Goal and audience

Present Chloé Chen as a senior product designer for hiring teams and freelance clients. Make the work easy to understand, evidence-led, visually memorable, and credible. A reviewer should be able to explain what problem she solved, what she decided, why the interface changed, and what is known about the result.

## Current design direction

- Preserve the portfolio's own foundation. The FTL case-study page is the approved baseline for typography, spacing, colors, gradients, and fixed side chapter navigation. It is clear, though project pages should have more visual character and motion where the content warrants it.
- Learn from strong case-study pages such as Cindy Ly's in their chapter navigation, evidence-led storytelling, full UI presentation, varied modules, and reading rhythm. Keep Chloé's own visual identity; do not reproduce another designer's site.
- Tell a connected story: project context and delivery status → specific user/business problem and evidence → design decision and trade-offs → corresponding complete interface/flow → delivery and known outcome → limits and reflection.
- Keep decisions and their supporting evidence close together. Show the UX flow, key states, components, and overall product screens where relevant. Make motion useful and smooth; honor reduced-motion settings.
- Show screenshots/artboards at a coherent, readable size and preserve their proportions. Do not crop off lower portions of UI or force the reader through a tiny viewport that scrolls internally.
- Use concise headings and plain language. Do not use “TL;DR.” Cut duplicate explanations and generic oversized slogans.
- Keep research, metrics, adoption, launch status, AI behavior, and business impact factual. Do not fabricate evidence. Label synthetic demo content, concept work, hypotheses, and validation limits accurately.

## Scope boundaries

- Homepage redesign was rejected. Keep the original homepage and its carefully designed motion unless Chloé explicitly requests homepage work.
- The Work catalogue/category redesign is an unmerged draft on a separate branch/PR. Do not merge it into case-study updates or publish it unless explicitly requested.
- Work on one requested project at a time, on a separate branch and PR. Do not overwrite `main`, discard earlier work, or include unrelated caches/build files.
- Do not publish by default. An explicit “上线/publish” request authorizes publication only for the exact approved changes after checking the diff.

## Project map and known state

The repository is `chloechen-design/chloechen-design.github.io`; project pages are separate HTML files in the repository. The current local checkout inspected on 2026-10-13 is clean on branch `redesign/work-categories`, with the GitHub repository configured as `origin`. This branch is not proof of the latest `main`; verify GitHub and open PRs before starting new work.

| Project | Main page/file | Known notes |
| --- | --- | --- |
| FTL website | `ftl-group-website.html` | Approved case-study shell and baseline. |
| LVV shipping system | `lvv-shipping-system.html` | Keep validation limits factual; no unverified adoption/productivity metrics. |
| WMS design system | `wms-design-system.html` | Show real system scope, components, and workflow evidence. |
| Esendeo | `esendeo-brand-ecosystem.html` | Preserve large website/newsletter artwork at full proportions. A previous crop issue was corrected; check current main before further changes. |
| Interview Memory System | `interview-memory-system.html` | Demo data is synthetic; demo behavior is deterministic and must not be described as a live AI model or measured product outcome. |
| Invoicing | `invoice-mobile-design.html` | Preserve the complete process story; sample financial data and concept status must remain explicit. |

Known published-project updates through 2026-10-12 included FTL, LVV/WMS, Esendeo, Interview Memory, and Invoicing. GitHub `main` was verified on 2026-10-13 at `2639fd4876cd1d198db6a402d9f25516334f7f04`; open PR #10 is the unmerged Work catalogue draft. The local checkout is behind that `main`. GitHub integration reported repository push permission on 2026-10-13; still verify access when an operation depends on it.

## Starting a new Codex conversation

Open the existing Codex Project/workspace for this repository, then start a new chat inside it. Confirm the active repository is `chloechen-design/chloechen-design.github.io` (local folder `portfolio-work`). The project pages do not need to be imported one by one: each is an HTML file in this repository. Ask Codex to read `AGENTS.md` and this brief, inspect the current branch/main/open PRs, and then work on one named project. Use the starter prompt in `docs/new-portfolio-chat-prompt.md`.

If a new chat is opened outside this repository workspace, attach/open the same GitHub repository first; otherwise it may not see these instructions or local files.

For a new project, the user can attach raw source materials directly to the new Codex conversation, in one or several batches. Codex should inventory the evidence first, use only relevant web-ready assets in the site, add the case-study page and a Work directory entry on an isolated branch, and leave the homepage alone. The user does not need to manually commit source files to `main` or pre-sort them into the website. Sensitive client or user data should be anonymized before upload.
