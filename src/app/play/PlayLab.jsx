"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "../common/MediaImage";
import LazyVideo from "../common/LazyVideo";
import ImageWithLoader from "../common/ImageWithLoader";
import DotDigits from "../common/design/DotDigits";
import {
  PLAY_BUILDS,
  PLAY_CATEGORIES,
  PLAY_EXPERIMENTS,
  PLAY_FEATURES,
} from "./playData";

const pad = (n) => String(n).padStart(2, "0");

// "On the bench" is hidden for now. Set to true to bring it back.
const SHOW_BENCH = false;

const CategoryDot = ({ category, size = 7 }) => {
  const c = PLAY_CATEGORIES[category];
  if (!c) return null;
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, backgroundColor: c.color }}
    />
  );
};

// Magazine mosaic bands (same rhythm as the original play page).
const BANDS = [
  { cls: "grid-cols-2 md:grid-cols-4", n: 4 },
  { cls: "grid-cols-3 md:grid-cols-6", n: 6 },
  { cls: "grid-cols-3 md:grid-cols-5", n: 5 },
  { cls: "grid-cols-3 md:grid-cols-6", n: 6 },
];

const toRows = (items) => {
  const rows = [];
  let i = 0;
  let b = 0;
  while (i < items.length) {
    const band = BANDS[b % BANDS.length];
    rows.push({ cls: band.cls, slice: items.slice(i, i + band.n), start: i });
    i += band.n;
    b += 1;
  }
  return rows;
};

const BuildCard = ({ build, index }) => {
  const cat = PLAY_CATEGORIES[build.category];
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        {build.cover ? (
          <ImageWithLoader
            src={build.cover}
            alt={build.title}
            width="100"
            height="100"
            wrapperClassName="!rounded-none aspect-[4/3]"
            sizes="(max-width: 768px) 100vw, 28vw"
            quality={100}
          />
        ) : (
          <div className="bench-cover absolute inset-0 flex items-center justify-center text-white/70">
            <DotDigits value={pad(index + 1)} pitch={6} label={`Build ${index + 1}`} />
          </div>
        )}
        {build.status === "in-progress" && (
          <span className="absolute left-2 top-2 edge-label !text-[0.68rem] bg-white text-black px-1.5 py-0.5">
            In progress
          </span>
        )}
      </div>
      <div className="pt-3 flex gap-4">
        <span className="pt-[3px] text-white">
          <DotDigits value={pad(index + 1)} pitch={2.4} />
        </span>
        <div className="w-full">
          <div className="spec-line display-title text-white font-normal">{build.title}</div>
          <p className="spec-line subtext desc-mono text-mute pt-1">{build.note}</p>
          <div className="spec-line flex items-center justify-between gap-3 mt-3 desc-mono uppercase tracking-wide text-[0.68rem] text-mute">
            <span className="flex items-center gap-2">
              <CategoryDot category={build.category} size={6} />
              {cat?.label}
            </span>
            <span>{build.materials?.join(", ")}</span>
          </div>
        </div>
      </div>
    </>
  );
  return build.link ? (
    <a
      href={build.link}
      {...(/^https?:/.test(build.link) ? { target: "_blank", rel: "noreferrer" } : {})}
      className="lab-tile build-card group"
    >
      {body}
    </a>
  ) : (
    <div className="lab-tile build-card">{body}</div>
  );
};

// A standalone project: title in the label rail, bento of images, then text.
const FeatureSection = ({ feature, labelNo }) => {
  return (
    <section className="grid-ed mt-20 md:mt-28" aria-labelledby={`feature-${feature.id}`}>
      <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
        <div className="md:sticky md:top-24">
          <h4 className="edge-label text-mute whitespace-nowrap">
            <span className="label-index">{labelNo}</span>
            {feature.kind}
          </h4>
          <h3 id={`feature-${feature.id}`} className="desc-mono subtext text-white font-normal mt-3">
            {feature.title}
          </h3>
        </div>
      </div>
      <div className="col-span-12 md:col-span-10">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
          <p className="md:col-span-6 subtext desc-mono text-white/80">{feature.description}</p>
          <div className="md:col-span-4 flex flex-col gap-4 md:items-end">
            {feature.meta?.length > 0 && (
              <div className="desc-mono uppercase tracking-wide text-[0.68rem] text-mute md:text-right leading-relaxed">
                {feature.meta.map((m) => (
                  <div key={m}>{m}</div>
                ))}
              </div>
            )}
            {feature.link && (
              <a href={feature.link.href} target="_blank" rel="noreferrer" className="lab-key self-start md:self-end">
                {feature.link.label}
                <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        <div className={`feature-bento ${feature.compact ? "md:max-w-[70%]" : ""}`}>
          {feature.rows.map((row, r) => (
            <div key={r} className="feature-bento__row">
              {row.map((img) => (
                <div
                  key={img.alt}
                  className="feature-bento__cell"
                  style={{ flexGrow: img.ratio, aspectRatio: img.ratio }}
                >
                  {img.video ? (
                    <LazyVideo
                      src={img.video}
                      aria-label={img.alt}
                      className="block w-full h-full object-cover bg-[#0d0d0d]"
                    />
                  ) : (
                  <ImageWithLoader
                    src={img.src}
                    alt={img.alt}
                    width="100"
                    height="100"
                    wrapperClassName="!rounded-none h-full"
                    sizes="(max-width: 768px) 100vw, 58vw"
                    quality={100}
                  />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Full-screen viewer for stepping through experiments.
const Viewer = ({ items, index, onClose, onStep }) => {
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose, onStep]);

  if (!item) return null;
  const cat = PLAY_CATEGORIES[item.category];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Experiment ${index + 1} of ${items.length}`}
    >
      <div className="flex items-center justify-between px-5 md:px-10 py-4 text-white">
        <div className="flex items-center gap-4">
          <DotDigits
            value={`${pad(index + 1)}/${pad(items.length)}`}
            pitch={3}
            label={`${index + 1} of ${items.length}`}
          />
          <span className="flex items-center gap-2 edge-label !text-[0.72rem] text-mute">
            <CategoryDot category={item.category} size={6} />
            {cat?.label}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="lab-key"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-5 md:px-24"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <Image
          key={item.id}
          src={item.src}
          alt={`Play experiment ${index + 1}`}
          className="max-h-full w-auto h-auto max-w-full object-contain"
          sizes="100vw"
          quality={100}
          loading="eager"
        />
      </div>
      <div className="flex items-center justify-center gap-2 py-4">
        <button type="button" className="lab-key" onClick={() => onStep(-1)}>
          Previous
        </button>
        <button type="button" className="lab-key" onClick={() => onStep(1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const PlayLab = ({ beforePosters }) => {
  const [viewing, setViewing] = useState(null);

  const features = PLAY_FEATURES;
  const builds = PLAY_BUILDS;
  const experiments = PLAY_EXPERIMENTS;
  const rows = toRows(experiments);

  const step = useCallback(
    (dir) =>
      setViewing((i) =>
        i === null ? i : (i + dir + experiments.length) % experiments.length
      ),
    [experiments.length]
  );
  const close = useCallback(() => setViewing(null), []);

  return (
    <>
      {/* On the bench: named builds */}
      {SHOW_BENCH && builds.length > 0 && (
        <div className="grid-ed mt-16 md:mt-20">
          <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
            <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
              <span className="label-index">02</span>On the bench
            </h4>
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 lab-enter">
              {builds.map((b) => (
                <BuildCard key={b.id} build={b} index={PLAY_BUILDS.indexOf(b)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experiments mosaic */}
      <div className="grid-ed mt-20 md:mt-28">
        <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            <span className="label-index">{pad(SHOW_BENCH ? 3 : 2)}</span>Digital experiments
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <p className="subtext desc-mono text-white/80 md:max-w-[60%]">
              I play in the various sandboxes of Blender, Unity, Unreal Engine,
              Processing, TouchDesigner, as well as other creative spaces in
              pursuit of stumbling upon pleasing surprises.
            </p>
            <a
              href="https://www.instagram.com/bbbbb.stuff/"
              target="_blank"
              rel="noreferrer"
              className="lab-key self-start md:self-auto"
            >
              More expiriments can be found HERE
              <span aria-hidden="true">&#8599;</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          {experiments.length === 0 ? (
            <p className="subtext desc-mono text-mute">
              Nothing here yet. New experiments are on the way.
            </p>
          ) : (
            <div className="lab-enter">
              {rows.map((row, r) => (
                <div key={r} className={`grid ${row.cls} gap-4 mb-4`}>
                  {row.slice.map((item, j) => {
                    const idx = row.start + j;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="lab-tile"
                        onClick={() => setViewing(idx)}
                        aria-label={`Open experiment ${idx + 1}`}
                      >
                        <ImageWithLoader
                          className="w-full"
                          wrapperClassName="aspect-square !rounded-none"
                          src={item.src}
                          alt=""
                          width="100"
                          height="100"
                          sizes={`(max-width: 768px) ${row.slice.length === 4 ? "50vw" : "33vw"}, ${Math.ceil(83 / row.slice.length)}vw`}
                          quality={100}
                        />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {features.map((f, i) => (
        <div key={f.id} className="contents">
        {f.id === "posters" && beforePosters}
        <FeatureSection key={f.id} feature={f} labelNo={pad((SHOW_BENCH ? 4 : 3) + i)} />
        </div>
      ))}

      {viewing !== null && (
        <Viewer items={experiments} index={viewing} onClose={close} onStep={step} />
      )}
    </>
  );
};

export default PlayLab;
