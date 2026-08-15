# Tracing The Path — Codex Project Instructions

These instructions apply throughout this repository. They are intended for Codex and for human maintainers using other coding agents.

## Project identity

This application is a visual listening edition of Episode 82 of **Tracing The Path**, “When Pepsi Cracked the Iron Curtain.” The podcast is hosted and narrated by award-winning storyteller **Dan R. Morris**.

The app must preserve:

- Tracing The Path’s name, cover artwork, and editorial identity.
- Dan R. Morris’s prominent role as host, narrator, and guide.
- The episode audio as the primary experience.
- The timestamped transcript as the source for synchronized visual events.
- A cumulative connection map that helps listeners understand how the history fits together.

Do not turn the site into a generic history dashboard, a conventional slideshow, or an RSA-style live line-drawing animation.

## Primary learning goal

By the end of the episode, a listener should be able to explain how trade, media technology, consumer products, political systems, and individual decisions connect Catherine the Great, Russian-American commerce, Singer, Lenin, Alexander Poniatoff, Ampex, Pepsi, Donald Kendall, Nixon, Khrushchev, Stolichnaya, the Pepsi fleet, the Soviet collapse, Putin, and the Harrier-jet epilogue.

The experience should answer four questions continuously:

1. Where am I in the episode?
2. What historical idea is Dan explaining now?
3. How does it connect to what came before?
4. What should I notice next?

## Target learner

Design for an intelligent general listener who is curious about 20th-century history but may not know Cold War chronology, recording technology, Soviet trade policy, or the people in the episode.

Do not assume specialist historical knowledge. Introduce context before expecting the listener to understand a relationship.

## Source-of-truth rules

- `public/episode-82-transcript.json` is the synchronization source.
- `public/episode-82-transcript.txt` is the readable transcript.
- `public/episode-82-transcript.vtt` supplies captions.
- `app/episode-data.ts` contains the reviewed chapter, node, and connection model.
- The audio URL is declared as `AUDIO_URL` in `app/episode-data.ts`.

The transcript is machine-generated with reviewed proper names. It is not a certified verbatim transcript.

Never invent a quotation, timestamp, person, causal relationship, or historical claim. Verify new timings against the transcript and audio. For historical claims not contained in the episode, use authoritative primary or institutional sources and record useful credits.

## Learning-experience standard

Optimize in this order:

1. Learning clarity
2. Logical progression
3. Readability
4. Usability
5. Engagement
6. Visual quality
7. Responsive design
8. Historical and conceptual accuracy

When choosing between more information and clearer information, choose clarity. When choosing between more features and a better listening flow, choose the listening flow. Every screen element should help the listener follow Dan’s story.

## Introduction

Keep the opening question-led and concise. The current hook—what Pepsi, videotape, and vodka have in common—should create curiosity before the app explains the answer.

The introduction must:

- Identify Episode 82.
- Make the 1959-to-1763 rewind understandable.
- Explain that the path builds with Dan’s narration.
- Offer an obvious play control.
- Keep Tracing The Path and Dan R. Morris visible.

Avoid weak “Welcome to this lesson” language or long prerequisite explanations before playback.

## Narrative progression

Organize the experience around Dan’s historical pivots, not arbitrary screens. Prefer:

**question → historical rewind → concrete example → connection → implication → reinforcement**

Teach one major idea at a time. If a later connection depends on an earlier person, invention, or trade condition, establish the prerequisite first. Consolidate repetitive explanation.

Each chapter should include:

- A clear date or time period.
- One central idea.
- Short explanatory copy.
- Relevant illustrations already introduced by the audio.
- A “what to notice” reinforcement.
- A direct path back to the synchronized map.

## Map behavior

The map is the central learning visualization.

- Subjects appear only when the narration introduces them.
- Relationships appear only when Dan explains them.
- Revealed subjects and relationships remain visible so meaning accumulates.
- Selecting a subject opens a useful explanation and replay timestamp.
- Selecting a relationship explains why the connection matters and can replay it.
- Chapter navigation returns the learner to the map instead of leaving them below it.
- The latest-connection explanation must not cover important artwork.

Every important person, object, place, idea, or event shown as a node must have a recognizable, finished illustration. Do not use initials, category words, emoji, or generic placeholder icons as the main artwork.

Do not display redundant category labels such as “person,” “thing,” “place,” “event,” or “idea” under map entries.

## Illustration direction

Use the established editorial family:

- Graphite and colored pencil on warm aged cream paper.
- Dark charcoal contours.
- Restrained faded blue and brick-red accents.
- Slightly irregular hand-drawn borders and hatching.
- Historically recognizable subjects.
- Simple compositions that remain legible at thumbnail size.
- No embedded text, labels, watermarks, or photorealistic backgrounds.

New image-generation work should use an existing `public/sketch-*` asset as a style reference. Save optimized web versions in `public/`, preserve useful generation notes in the task handoff, and update `IMAGE_CREDITS.md` when appropriate.

The main app does not use RSA-style line-by-line drawing. The visual effect comes from illustrations revealing, settling into the canvas, and connecting cumulatively.

## Interaction standard

The learner should always know what can be clicked and what happens next.

- Use descriptive text controls, not unexplained icons.
- Keep play, pause, skip, speed, transcript, and chapter controls discoverable.
- Provide immediate feedback when a chapter, subject, or relationship is selected.
- Keep explanations next to the map or control they describe.
- Avoid unnecessary modals and page transitions.
- Preserve audio position when the listener explores the transcript or map.
- Support keyboard focus with visible focus styles.
- Respect `prefers-reduced-motion`.

The app should make listeners think and notice patterns rather than merely decorate the audio. Use short prompts such as “What to notice” to reinforce important connections without turning the episode into a quiz.

## Readability standard

Important body text should normally be at least 16–18 px. Do not allow map names, dates, captions, timeline labels, buttons, or transcript text to become technically visible but uncomfortable to read.

Maintain:

- Comfortable line height.
- Strong contrast.
- Short, scannable paragraphs.
- Clear heading hierarchy.
- Adequate button targets.
- Intentional whitespace.
- No information communicated by color alone.

Avoid long unbroken text, clipped headings, excessive line lengths, label collisions, and decorative animation that makes reading harder.

## Responsive layout

The mobile experience must be intentionally composed, not a compressed desktop page.

Current map behavior:

- Desktop and tablet use a five-column historical layout.
- Screens at or below 700 px use a three-column, seven-row map.

When adding nodes, update both map compositions and their connection geometry. Verify that labels do not overlap, nodes remain inside the canvas, and relationship lines reach the correct subjects.

The sticky audio player must not make the content unusable on a phone. Ensure listeners can still read the current caption, manipulate playback, and reach the bottom of every section.

## Navigation and continuity

Listeners must be able to:

- Begin playback immediately.
- Move backward or forward 15 seconds.
- scrub the episode.
- Change playback speed.
- Open and follow the transcript.
- Select a transcript line to replay it.
- Jump to a chapter.
- Return to the map automatically.
- Select an illustration or connection to replay its introduction.
- Reveal and revisit the completed path.

Do not require repeated manual scrolling between a chapter selection and the map state it changes.

## Conclusion

The app must end intentionally. Reconnect the completed map to the opening question and show that the listener can now explain the path.

Keep Dan R. Morris’s host feature and Tracing The Path branding prominent near the conclusion. The final experience should feel like understanding has accumulated, not like the interface simply ran out of chapters.

## Technical conventions

- Use `rg` or `rg --files` for repository searches.
- Use `apply_patch` for hand-authored file changes.
- Preserve unrelated user changes in a dirty worktree.
- Do not use destructive Git commands.
- Keep the app compatible with Node.js 22.13 or newer.
- Preserve the static GitHub Pages build through `vite.github.config.ts`.
- Keep `package-lock.json` synchronized with `package.json`.
- Do not commit `node_modules/`, `.next/`, `.vinext/`, `dist/`, `dist-github/`, `.wrangler/`, environment files, or temporary generation files.
- Store published runtime assets in `public/`.
- Keep episode content in `app/episode-data.ts` rather than scattering historical facts through rendering code.
- Keep transcript data separate from visual chapter interpretation.

The GitHub Pages base is currently `/tracing-the-path/`. If the repository name changes, update `base` in `vite.github.config.ts`.

## Required validation

For code or interface changes, run:

```bash
npm run build:github
npm run lint
```

The build must succeed. Lint must have no errors. Existing warnings about deliberate ordinary `<img>` usage may remain unless the asset architecture changes.

Do not consider a visual change complete until the actual production build has been rendered and inspected at minimum at:

- Desktop/laptop: about 1440 × 1000
- Tablet: about 820 × 1180
- Mobile phone: about 390 × 844

During inspection, check:

- Font and label readability.
- Horizontal overflow.
- Map-node and label overlap.
- Correct connection-line endpoints.
- Clipped text or artwork.
- Player and transcript usability.
- Button size and discoverability.
- Sticky-player clearance.
- Chapter-to-map continuity.
- Opening and conclusion quality.
- Dan R. Morris and Tracing The Path visibility.

After isolated checks, walk through the app from beginning to end in the learner’s order. Verify the opening, every chapter transition, the map’s cumulative logic, the transcript interaction, the final reveal, the host feature, and the footer.

Repeat the render → inspect → correct cycle until the experience is genuinely comfortable on all three sizes.

## Deployment

The workflow `.github/workflows/deploy.yml` publishes `main` to GitHub Pages.

Before reporting a deployment complete:

1. Confirm the worktree contains only intended changes.
2. Run the production build and lint.
3. Perform responsive visual QA for interface changes.
4. Commit the intended source and assets.
5. Push `main`.
6. Wait for the **Deploy Tracing The Path** workflow to succeed.
7. Verify the public HTML and at least one changed asset at the live URL.

## Maintainer handoff

Anyone forking this repository should receive everything required to build the app. A new fork owner must enable GitHub Actions and configure Pages to use GitHub Actions. If they retain the repository name, their expected public address is:

```text
https://USERNAME.github.io/tracing-the-path/
```

The audio is an external dependency hosted by the podcast publisher. If playback fails while the app build remains healthy, check `AUDIO_URL` and the enclosure host first.

## Final audit

Before considering a substantial app change finished, confirm three dimensions.

### Learning

- The central connection is clear.
- Historical prerequisites arrive before dependent ideas.
- The sequence follows Dan’s narration.
- The listener is prompted to notice meaningful relationships.
- The conclusion demonstrates genuine conceptual progress.

### Interface

- Important text is comfortably readable.
- Controls are obvious.
- Desktop, tablet, and phone layouts are intentional.
- Illustrations and connections are legible.
- The visual system remains consistent.

### Experience

- The opening creates curiosity.
- Every chapter has a reason to exist.
- Transitions are natural.
- The listener never wonders how to continue.
- The ending provides closure and reinforces the host and podcast identity.

Completion means the application works technically and succeeds as a coherent visual listening experience.
