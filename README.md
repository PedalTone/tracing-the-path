# Tracing The Path — Visual Podcast Experience

An interactive visual listening edition of Episode 82 of **Tracing The Path**, “When Pepsi Cracked the Iron Curtain,” hosted and narrated by **Dan R. Morris**.

The episode audio, timestamped transcript, historical timeline, chapter guide, and illustrated connection map remain synchronized. As Dan introduces a person, product, invention, place, or event, its illustration appears and stays on the map. Connections accumulate until the episode becomes a replayable visual history.

## Live site

https://pedaltone.github.io/tracing-the-path/

## What is included

- 16 transcript-derived story chapters covering the episode from its 1959 opening through its 1763 historical rewind and later epilogue.
- 21 hand-sketched historical illustrations.
- 29 timestamped connections that appear with the narration.
- A synchronized 41:42 audio player and live caption.
- A searchable-by-scrolling, clickable timestamped transcript.
- Chapter cards that return the listener directly to the relevant map state.
- Replay controls for every map subject and revealed relationship.
- Deliberate desktop, tablet, and three-column phone map layouts.
- Tracing The Path artwork and prominent Dan R. Morris host information.

## Project structure

```text
.
├── AGENTS.md                       Project and learning-app instructions
├── app/
│   ├── episode-data.ts             Chapters, map nodes, connections, and audio URL
│   ├── globals.css                 Complete responsive visual system
│   ├── layout.tsx                  Page metadata and document shell
│   └── page.tsx                    Player, transcript, timeline, and map interface
├── public/
│   ├── episode-82-transcript.json  Transcript data used by the interface
│   ├── episode-82-transcript.txt   Readable timestamped transcript
│   ├── episode-82-transcript.vtt   Audio captions
│   ├── sketch-*                    Connection-map illustrations
│   └── podcast and host artwork
├── scripts/build-transcript.mjs    Transcript conversion utility
├── .github/workflows/deploy.yml    GitHub Pages deployment
├── vite.github.config.ts           GitHub Pages production build
└── IMAGE_CREDITS.md                Artwork and historical-image credits
```

## Requirements

- Node.js 22.13 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

For the GitHub Pages production build:

```bash
npm run build:github
```

The production files are generated in `dist-github/`. That directory is build output and is intentionally not committed.

## Verification

Before publishing a change:

```bash
npm run build:github
npm run lint
```

Lint currently permits the deliberate use of ordinary HTML `<img>` elements required by the static Vite/GitHub Pages build. It should complete with no errors.

For any interface change, render and inspect the application at minimum at:

- Desktop: approximately 1440 × 1000
- Tablet: approximately 820 × 1180
- Phone: approximately 390 × 844

Check the full listening journey, not just the edited section. In particular, verify map-label readability, line alignment, sticky-player clearance, chapter navigation, transcript synchronization, horizontal overflow, and node overlap.

## Transcript and timing model

The episode was transcribed locally with `whisper.cpp` using the `small.en` model. The published transcript contains 366 timestamped segments. Important proper names received a manual correction pass.

- `public/episode-82-transcript.json` powers the synchronized transcript.
- `public/episode-82-transcript.txt` is the readable timestamped edition.
- `public/episode-82-transcript.vtt` provides captions for the audio element.
- `app/episode-data.ts` stores the reviewed visual beats, historical dates, map subjects, and relationship-reveal times.

The transcript is a carefully reviewed machine transcription, not a certified verbatim record. When changing chapter boundaries or map timings, verify them against the audio and transcript rather than estimating.

## Audio dependency

The podcast audio is streamed from the public Podomatic enclosure URL declared as `AUDIO_URL` in `app/episode-data.ts`. The audio file is not stored in this repository. If the publisher changes that URL, update `AUDIO_URL` and verify that playback and cross-origin delivery still work.

## Adding or changing a map subject

1. Add a finished illustration to `public/` in the established graphite-and-colored-pencil style.
2. Add or update its node in `app/episode-data.ts`.
3. Use the exact transcript introduction time for `firstSeen`.
4. Add relationships only when Dan explains them, using the corresponding `revealAt` time.
5. Include the node in the appropriate `storyBeats` entry.
6. Update `IMAGE_CREDITS.md` when necessary.
7. Build and inspect all three responsive layouts.

Every important person, object, place, and event on the map should have a recognizable illustration. Do not substitute initials, category labels, or generic placeholders.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` runs whenever a commit is pushed to `main`. It installs locked dependencies, runs `npm run build:github`, uploads `dist-github/`, and deploys it through GitHub Pages.

The configured Vite base path is:

```ts
base: "/tracing-the-path/"
```

If the repository is renamed, update that value in `vite.github.config.ts` to match the new repository name.

## Forking and maintainer handoff

A fork receives all source code, transcript files, illustrations, branding assets, dependency definitions, project instructions, and the deployment workflow.

After creating a fork, the new maintainer should:

1. Keep the repository name `tracing-the-path`, or update the Vite base path.
2. Open the fork’s **Actions** tab and enable workflows.
3. Open **Settings → Pages** and select **GitHub Actions** as the publishing source.
4. Push a commit to `main` or manually run **Deploy Tracing The Path**.
5. Confirm the resulting address, normally `https://USERNAME.github.io/tracing-the-path/`.

Local dependencies, generated build directories, `.env` files, Codex conversations, and full-resolution image-generation working files are intentionally not committed and will not be included in a fork. They are not required to build the published app.

## Design direction

This project uses an editorial, hand-sketched historical style—not RSA-style live line drawing. The canvas should accumulate meaning while the existing illustrations appear, connect, and remain available for replay. Preserve the warm paper palette, restrained red and blue accents, readable typography, and the spatial continuity between narration and map.

The complete development rules are in [`AGENTS.md`](AGENTS.md).

## Credits

Podcast cover art, episode art, host photography, and editorial illustrations identify and represent **Tracing The Path** and Dan R. Morris. See [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md) for detailed credits and licensing information.
