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

Verified GIF conversions are listed in `src/app/common/gifMedia.json`. The original GIFs remain available as fallbacks. Converted animations keep their original resolution and frame timing, with a full-size poster for loading.

The same manifest includes a forward-and-backward loop of Adobe's animated WebP so its halftone thumbnail also animates before hover. The original WebP remains the fallback.

Shared media components load videos within 200 pixels of the viewport and pause playback offscreen. Home thumbnails preload for the first-page loader; the home wave remains eager. Public images and media use a one-day browser cache with background revalidation.

Images and local videos use a faint dot grid over a fully black background while loading. Red dots fill the grid from left to right, then clear in the same direction. Animation pauses offscreen and in hidden tabs; visitors who prefer reduced motion see a still grid.

Rust accents use the home loading screen's red, `#b02b1a`, on both light and dark pages, including the media scan. The Selected works halftone hover transition uses a darker red, `#8e2115`.

During the thumbnail reveal, the transition dots shrink and fade as dark-red circles directly over the color image, without white cell backgrounds. The resting black-and-white halftone remains unchanged.

BMW thumbnails add local contrast and retain more highlight detail in the halftone so the car's parts read more clearly. This adjustment does not affect the full-color animation or other thumbnails.

The BMW detail page uses its floating-car video as a fixed, full-screen background behind the content, not a hero section. Only the matching mobile or desktop video is loaded.

On client navigation, a changed page background fades for 800 milliseconds before the new content fades in for 500 milliseconds. Routes with the same background start their content fade immediately. Home keeps its first-visit loading sequence and skips the extra content fade on return, waiting only for a changed background. Reduced motion makes both transitions instant.

On every Home visit, including direct refreshes, the wave resolves from a pixelated dot field over one second, then the tagline and Selected works fade in together over 500 milliseconds. First visits retain the measured loader and short hold at 100 before this sequence starts; subsequent visits skip the loader. Client navigation waits for any background transition first. Reduced motion shows the wave, tagline, and works immediately once loading finishes. If you scroll the wave offscreen, or the video or effect fails, the tagline and works still become available.

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
