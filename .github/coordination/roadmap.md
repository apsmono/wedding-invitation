# Product Roadmap

This roadmap is based on the current repository state: a Vite starter app that still needs to become a wedding invitation experience.

## Current State

- `src/App.tsx` now hosts a routed guest experience built on the invitation content model.
- `src/App.css` and `src/index.css` provide the invitation layout, shared actions, and visual system tokens.
- Decorative invitation assets now include custom SVG media in `src/assets/` and `public/`.

## Phase 1: Invitation Landing MVP

Goal: replace the starter UI with a polished single-page wedding invitation that is ready for content review.

Deliverables:

- typed invitation content source for names, dates, venue, schedule, and CTA copy
- global visual system for typography, palette, spacing, and mobile behavior
- hero section with couple names, event date, and top-level CTA
- details section for schedule, venue, dress code, and RSVP guidance
- decorative media treatment and icon cleanup
- final page composition in `src/App.tsx`

## Phase 2: RSVP and Guest Experience

Goal: add interaction and practical guest guidance after the landing page exists.

Deliverables:

- RSVP flow or form integration
- map, travel, and accommodation details
- FAQ or guest notes section
- shareable link and optional countdown behavior

## Phase 3: Launch and Polish

Goal: prepare the invitation for production sharing.

Deliverables:

- final asset compression and copy review
- deployment configuration and preview checks
- accessibility pass and mobile QA
- changelog and usage documentation refresh

## Active Feature Pack

Feature ID: `F1`

Feature: Invitation Landing MVP

Parallel slices:

- `F1-A` content model and copy seed
- `F1-B` global theme tokens and page frame
- `F1-C` hero section
- `F1-D` event details section
- `F1-E` decorative assets and supporting media
- `F1-F` final page composition and CTA wiring

Recommended order:

1. Start `F1-A` and `F1-B` first.
2. Run `F1-C`, `F1-D`, and `F1-E` in parallel once the content model and theme direction are stable.
3. Finish with `F1-F` to assemble the page in `src/App.tsx`.
