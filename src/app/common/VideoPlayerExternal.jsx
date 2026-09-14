"use client";
import React, { useState } from "react";

/**
 * Clean facade for external (YouTube / Vimeo) videos: shows a poster with
 * the site's rust play badge and only loads the embed on click, so the
 * YouTube/Vimeo chrome never clutters the page. Matches VideoPlayerClickable.
 */
const VideoPlayerExternal = ({ src, className = "", caption, poster }) => {
  const [played, setPlayed] = useState(false);
  const [thumbErrored, setThumbErrored] = useState(false);

  const yt = src?.match(/youtube\.com\/embed\/([^?&/]+)/);
  const vimeo = src?.match(/player\.vimeo\.com\/video\/([^?&/]+)/);

  let thumb = poster;
  if (!thumb && yt) {
    thumb = thumbErrored
      ? `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`
      : `https://i.ytimg.com/vi/${yt[1]}/maxresdefault.jpg`;
  }
  if (!thumb && vimeo) thumb = `https://vumbnail.com/${vimeo[1]}.jpg`;

  const playSrc = `${src}${src?.includes("?") ? "&" : "?"}autoplay=1&rel=0`;

  return (
    <div className={className}>
      {caption && <p className="subtext desc-mono text-mute mb-3">{caption}</p>}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
        {played ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={playSrc}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlayed(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label="Play video"
          >
            {thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt={caption || "Video thumbnail"}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setThumbErrored(true)}
              />
            )}
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-[var(--rust)] bg-black/60 group-hover:bg-[var(--rust)] transition-colors">
                <svg width="24" height="28" viewBox="0 0 28 32" aria-hidden="true">
                  <path
                    d="M2 2L26 16L2 30V2Z"
                    fill="var(--rust)"
                    className="group-hover:fill-black"
                  />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerExternal;
