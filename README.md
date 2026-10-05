This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Media performance

Play includes Meaningful Pursuits as a standalone album-visuals section after the experiments and feature projects, with project context and a compact 11-video carousel. Previous and Next controls wrap through the videos; changing the selection unmounts the previous player to stop playback. It shares the video list with the existing detail page, which retains its stacked layout. Video embeds load only when selected.

Verified GIF conversions are listed in `src/app/common/gifMedia.json`. The original GIFs remain available as fallbacks. Converted animations keep their original resolution and frame timing, with a full-size poster for loading.

The same manifest includes a forward-and-backward loop of Adobe's animated WebP so its halftone thumbnail also animates before hover. The original WebP remains the fallback.

Voyager's Home and Work thumbnail uses the supplied `TDMovieOut.7.mov` satellite animation, with a 480-pixel, 24-frame-per-second MP4 (about 1.6 MB), a poster, and a 320-pixel, 12-frame-per-second GIF fallback (about 7 MB). The moving halftone keeps the source tones with levels of 0.08 to 0.8. The planet remains visible in both the cover and full-color reveal; isolating the moving satellite requires a satellite-only render.

Shared media components load videos within 200 pixels of the viewport and pause playback offscreen. Desktop Home thumbnails preload for the first-page loader, while return visits use lazy loading; the home wave remains eager. On screens narrower than 768 pixels, work cards load only near the viewport and show a screen-sized still preview with halftone while their animation loads. The mobile Home loader waits for the wave and fonts, not offscreen thumbnails. Desktop cards and full-quality work-detail media stay unchanged. Public images and media use a one-day browser cache with background revalidation.

Images and local videos use a faint dot grid over a fully black background while loading. Red dots fill the grid from left to right, then clear in the same direction. Animation pauses offscreen and in hidden tabs; visitors who prefer reduced motion see a still grid.

Rust accents use the home loading screen's red, `#b02b1a`, on both light and dark pages, including the media scan. The Selected works halftone hover transition uses a darker red, `#8e2115`.

Thumbnail covers use soft-white dots (`#e8e8e8`) on black, with five-pixel cells and round dots capped at half a cell. A subtle minimum dot keeps the grid quiet in dark areas. Each cover locks its tone from the first sampled frame or mobile poster: average brightness above 0.55 swaps the tones, while darker covers keep them. Set a project's `tone` to `"auto"` (default), `"keep"`, or `"swap"` in the Home or Work list to override this choice. Poster-to-video switches and animated frames retain the choice. During the unchanged 650-millisecond hover reveal, round openings expand from the entry point with an irregular dotted edge, not square pixels. Stable per-cell noise shifts that edge by up to two and a half cells; a three-cell transition band retains a visible rust-red outline of shrinking dots. A solid circular core keeps the revealed interior clear. Openings are batched into one path, and the per-cell progress buffer is reused across frames.

After choosing the tone, each cover locks a brightness histogram from that same sample. The 20th percentile sets the black point (capped at 0.4) and the 97th sets the white point, with a minimum spread of 0.45 to preserve surface shading in low-contrast covers. A gentle S-curve of 1.4 retains middle-sized dots. Tiny background dots use 12 percent opacity; subject dots reach full opacity early, so their size rather than dimness describes the shading. Set a project's `levels` to `{ black: 0.1, white: 0.8, steepness: 1.4 }` to tune detail: points range from zero to one, white must exceed black, and steepness ranges from one to 12. You can also set only `steepness` to adjust the curve while keeping automatic points. BMW uses the dark-background footage on Home and Work, keeps its tones, and uses a broad 0.025 to 0.92 range to match the light-car reference. Clear Canvas uses a linear zero-to-0.45 range; DTLA Marriott uses a linear 0.08-to-0.9 range to recover shading. These overrides apply on mobile and desktop. Levels remain locked across video frames, resizing, and the mobile poster-to-video switch.

BMW thumbnails use local contrast enhancement of 0.6 and a lower shadow cutoff to retain detail in the new light-dot mapping so the car's parts read more clearly. This adjustment does not affect the full-color animation or other thumbnails.

The BMW detail page uses its floating-car video as a fixed, full-screen background behind the content, not a hero section. Only the matching mobile or desktop video is loaded.

On client navigation, a changed page background fades for 800 milliseconds before the new content fades in for 500 milliseconds. Routes with the same background start their content fade immediately. Home keeps its first-visit loading sequence and skips the extra content fade on return, waiting only for a changed background. Reduced motion makes both transitions instant.

On every Home visit, including direct refreshes, the wave starts fully black, then individual cells reveal the video from top to bottom. A small per-cell variation creates a pixelated advancing edge, with a brief shrinking-dot transition instead of a full-image opacity gradient. As soon as the wave finishes, the tagline and Selected works, including its text, start revealing with no added pause. All three share the same downward speed, calculated from the responsive Selected works height and its existing 2.2-second duration. Hero and tagline durations scale with their height and account for each effect's directional threshold, rather than using fixed durations. The sequence runs through offscreen projects too, rather than waiting for scroll. Eight-pixel cover cells clear incrementally without resampling the underlying content. First visits retain the measured loader and short hold at 100 before this sequence starts; subsequent visits skip the loader. Client navigation waits for any background transition first. Reduced motion shows the wave, tagline, and works immediately once loading finishes. If you scroll the wave offscreen, or the video or effect fails, the tagline and works still become available. Canvas failure or resizing during the content reveal releases its cover immediately.

Animated thumbnail covers wait until the wave finishes before starting their live redraws. Return visits also defer thumbnail cover preparation until then. Circle drawing is batched, unchanged video frames are not resampled, and the hero caches its canvas dimensions rather than measuring layout on each frame.

Local video players reserve a 16:9 loading area until the video's dimensions are known. The loader fills that area until the first frame is ready. Click-to-play videos can show a loaded poster instead, with the play control still available.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
