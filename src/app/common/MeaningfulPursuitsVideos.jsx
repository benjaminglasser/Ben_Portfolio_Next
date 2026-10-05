"use client";

import { useState } from "react";
import VideoPlayerExternal from "./VideoPlayerExternal";

const videos = [
  "hK23aSLVaAk", "8Csz61fViZA", "VghFPjuuXhQ", "6ScrKPMQPcw",
  "HsI6URf6grg", "CV9ECfroSgU", "SxJNx4Ymk4M", "kpQODCM1WYU",
  "Uy7GpsWTLS0", "5Oe320cKOl8", "89wx2XuiLt0",
];

export default function MeaningfulPursuitsVideos({ className = "flex flex-col gap-8", showCaptions = false, carousel = false }) {
  const [index, setIndex] = useState(0);
  if (carousel) {
    const step = (direction) => setIndex((current) => (current + direction + videos.length) % videos.length);
    return (
      <div role="region" aria-roledescription="carousel" aria-label="Meaningful Pursuits videos">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button type="button" className="lab-key" onClick={() => step(-1)} aria-controls="meaningful-pursuits-video">
            Previous
          </button>
          <p className="desc-mono subtext text-mute" aria-live="polite" aria-atomic="true">
            Video {index + 1} of {videos.length}
          </p>
          <button type="button" className="lab-key" onClick={() => step(1)} aria-controls="meaningful-pursuits-video">
            Next
          </button>
        </div>
        <div id="meaningful-pursuits-video" role="group" aria-roledescription="slide" aria-label={`Video ${index + 1} of ${videos.length}`}>
          <VideoPlayerExternal key={videos[index]} src={`https://www.youtube.com/embed/${videos[index]}`} />
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      {videos.map((id, index) => (
        <VideoPlayerExternal
          key={id}
          src={`https://www.youtube.com/embed/${id}`}
          caption={showCaptions ? `Meaningful Pursuits — visual ${index + 1}` : undefined}
        />
      ))}
    </div>
  );
}
