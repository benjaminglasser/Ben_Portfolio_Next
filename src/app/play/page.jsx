"use client";
import { IMAGES } from "../../../public/images";
import ImageWithLoader from "../common/ImageWithLoader";
import { useDesignVersion } from "../common/design/DesignVersion";
import PlayLab from "./PlayLab";
import MeaningfulPursuitsVideos from "../common/MeaningfulPursuitsVideos";

const Play = () => {
  const { level } = useDesignVersion();
  const itemData = [
    IMAGES.PLAY_18,
    IMAGES.PLAY_1,
    IMAGES.PLAY_2,
    IMAGES.PLAY_3,
    IMAGES.PLAY_32,
    IMAGES.PLAY_4,
    IMAGES.PLAY_6,
    IMAGES.PLAY_10,
    IMAGES.PLAY_12,
    IMAGES.PLAY_13,
    IMAGES.PLAY_14,
    IMAGES.PLAY_7,
    IMAGES.PLAY_15,
    IMAGES.PLAY_5,
    IMAGES.PLAY_35,
    IMAGES.PLAY_17,
    IMAGES.PLAY_11,
    IMAGES.PLAY_19,
    IMAGES.PLAY_20,
    IMAGES.PLAY_33,
    IMAGES.PLAY_21,
    IMAGES.PLAY_16,
    IMAGES.PLAY_22,
    IMAGES.PLAY_23,
    IMAGES.PLAY_34,
    IMAGES.PLAY_24,
    IMAGES.PLAY_27,
    IMAGES.PLAY_26,
    IMAGES.PLAY_25,
    IMAGES.PLAY_28,
    IMAGES.PLAY_29,
    IMAGES.PLAY_30,
    IMAGES.PLAY_31,
  ];

  // Magazine mosaic: every image stays square, but each band uses a
  // different column count so the scale shifts row to row (big squares,
  // then tighter grids of small squares) while every row stays aligned.
  const bands = [
    "grid-cols-2 md:grid-cols-4", // large squares
    "grid-cols-3 md:grid-cols-6", // small squares
    "grid-cols-3 md:grid-cols-5", // medium
    "grid-cols-3 md:grid-cols-6", // small squares
  ];
  const bandCount = [4, 6, 5, 6];

  const rows = [];
  let i = 0;
  let b = 0;
  while (i < itemData.length) {
    const n = bandCount[b % bandCount.length];
    rows.push({ cls: bands[b % bands.length], slice: itemData.slice(i, i + n) });
    i += n;
    b += 1;
  }

  const count = String(itemData.length).padStart(2, "0");

  const meaningfulPursuits = (
    <section className="grid-ed mt-20 md:mt-28" aria-labelledby="meaningful-pursuits-title">
      <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
        <div className="md:sticky md:top-24">
          <h2 className="edge-label text-mute">Album visuals</h2>
          <h3 id="meaningful-pursuits-title" className="desc-mono subtext text-white font-normal mt-3">
            Meaningful Pursuits
          </h3>
        </div>
      </div>
      <div className="col-span-12 md:col-span-10">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
          <p className="md:col-span-6 subtext desc-mono text-white/80">
            A series of live video vignettes commissioned for Danny Goliger&rsquo;s
            album, Meaningful Pursuits, and projected behind his live performance.
          </p>
          <div className="md:col-span-4 desc-mono uppercase tracking-wide text-[0.68rem] text-mute md:text-right leading-relaxed">
            <div>2021</div>
            <div>Animator and creative director</div>
            <div>TouchDesigner, Premiere Pro</div>
          </div>
        </div>
        <MeaningfulPursuitsVideos carousel />
      </div>
    </section>
  );

  return (
    <div className="mt-16 md:mt-24">
      {/* Intro: label rail + statement */}
      <div className="grid-ed md:items-start">
        <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
          <h4 className="edge-label text-mute whitespace-nowrap">
            <span className="label-index">01</span>Play
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h1 className="text-white desc-mono bio">
            Making is best when it&rsquo;s a form of play. Any excuse to build a
            project from the ground up teaches me something new. I find myself
            moving between digital and physical work, and every form of making
            ends up informing the others. Lately, I&rsquo;ve been especially
            drawn to working with my hands through 3D printing, woodworking,
            metalwork, electronics, and whatever else I can get into.
          </h1>
        </div>
      </div>

      {level >= 2 && <PlayLab beforePosters={meaningfulPursuits} />}

      {/* Gallery: label rail + square mosaic */}
      {level < 2 && (
      <div className="grid-ed mt-20 md:mt-28">
        <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            Experiments ({count})
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10">
          {rows.map((row, idx) => (
            <div key={idx} className={`grid ${row.cls} gap-4 mb-4`}>
              {row.slice.map((item, j) => (
                <ImageWithLoader
                  key={j}
                  className="w-full"
                  wrapperClassName="aspect-square !rounded-none"
                  src={item}
                  alt="Play experiment"
                  width="100"
                  height="100"
                  sizes={`(max-width: 768px) ${row.slice.length === 4 ? "50vw" : "33vw"}, ${Math.ceil(83 / row.slice.length)}vw`}
                  quality={100}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      )}
      {level < 2 && meaningfulPursuits}
    </div>
  );
};

export default Play;
