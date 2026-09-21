# Forever, Us — Roshini × Mathi

A private cinematic collection built with React, TypeScript, Vinext and accessible Radix dialogs.

## Run locally

Requires Node.js 22 (22.13 or later). Run `npm ci`, then `npm run dev`. Run `npm run build` to create the production Worker and assets. Run `npm test` for regression tests and `npm run typecheck` for TypeScript validation.

## Deploy to Vercel

Import the repository with the project root set to this directory. `vercel.json` selects Next.js and runs `npm run build:vercel`, producing the `.next` output Vercel requires. The default `npm run build` uses Vinext for the existing Worker workflow and must not be used as the Vercel build command. Node.js is pinned to major version 22 to avoid automatic major upgrades.

## Personal content

Edit `content/story.json` for chapter titles, descriptions, film titles and their durations, exact chat excerpts, timeline details, and the optional letter. Dates, songs, locations and voice notes are empty because they were not supplied. Adding those content types requires corresponding rendering, rather than inventing entries. Assets live in `public/media`. Read `CONTENT-MAP.md` for the source-to-chapter map and factual boundaries.

The personalized Tamil song is “உன் நினைவில் வாழ்கிறாய்”. “A Life Full of Love Theme (Instrumental)” loops as background music. Both recordings were supplied by the user. Background playback is attempted on arrival; when the browser blocks audible autoplay, Enter with sound starts it. Enter quietly disables sound. Background music pauses for the personalized song or a film and resumes afterward unless paused or muted. Videos retain their original audio. No generated portraits or fabricated messages are included. Video transcripts were not supplied; the original films currently have no subtitle tracks.

## Features

- Skippable original red-light intro and four profiles
- Responsive streaming catalogue with keyboard-accessible chapter dialogs
- Photo sequences, exact chat excerpts and the original chat screenshot
- Six original films, native playback controls, saved playback position
- Device-local favourites, search and viewing progress
- Personalized Tamil song, looping background instrumental, volume controls and global mute
- Memory wall, factual timeline and quiet final chapter
- Reduced-motion styles, focus states, modal focus management and mobile bottom sheets

Favourites and progress stay in the current browser. They do not sync between devices. Profiles personalize the avatar; they are not separate accounts. Local builds do not require sign-in. Access restrictions must be configured with the hosting provider; the profile selector does not protect the content. A public GitHub repository exposes its committed media independently of any website access settings. The site requests no analytics, external fonts or third-party media.

## Validation

Production build and TypeScript checking. Browser verification covers entrance/profile flow, episode details, saving, search, video playback, ending and phone widths 360, 375, 390, 393, 412 and 430 pixels (the preview browser rounded 393 to 394). Native video controls provide fullscreen and audio controls.
