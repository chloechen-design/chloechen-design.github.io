# Portfolio project content system

This directory stores the written source material for every portfolio project.

## Language workflow

1. The Chinese document (`project.zh-CN.md`) is the source of truth.
2. Facts, claims and structure are confirmed in Chinese first.
3. English and French are synchronized only after the Chinese version changes.
4. Translation may adapt tone and sentence structure, but must not introduce new facts.

## Evidence rules

- Never invent launch results, user feedback, research participants or business metrics.
- Separate confirmed facts, estimates, hypotheses and future recommendations.
- A developed but undeployed product must be described as such.
- Portfolio storytelling should foreground decisions and evidence, not a generic design-process checklist.

## Project files

- `lvv/project.zh-CN.md`: Chinese source of truth
- `lvv/interview-faq.zh-CN.md`: Chinese interview questions and evidence-safe answers derived from the source of truth
- `lvv/project.en.md`: English portfolio version
- `lvv/project.fr.md`: French portfolio version
- `wms/project.zh-CN.md`: WMS and warehouse design system source of truth
- `ftl-website/project.zh-CN.md`: FTL Group website project archaeology and Chinese source of truth
- `ftl-website/retrospective-2026-07-17.zh-CN.md`: FTL portfolio page design retrospective and next motion criteria

## Derivative-content rule

Portfolio pages, interview answers, presentation scripts and translated copy are derivative documents. When a fact changes, update `project.zh-CN.md` first and then synchronize every derivative document.
