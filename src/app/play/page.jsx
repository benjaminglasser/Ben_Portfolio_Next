"use client";
import Section from "../common/Section";
import { FancyButton } from "../common/FancyButton";
import { IMAGES } from "../../../public/images";
import ImageWithLoader from "../common/ImageWithLoader";

const Play = () => {
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

  return (
    <div className="mt-16 md:mt-24">
      {/* Intro: label rail + statement */}
      <div className="grid-ed md:items-start">
        <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
          <h4 className="edge-label text-mute whitespace-nowrap">Play</h4>
        </div>
        <div className="col-span-12 md:col-span-5">
          <h1 className="text-white desc-mono bio">
            I play in the various sandboxes of Blender, Unity, Unreal Engine,
            Processing, TouchDesigner, as well as other creative spaces in
            pursuit of stumbling upon pleasing surprises. Lately I've been
            gravitating toward more physical forms of making too: 3D printing,
            woodworking, metal work, and physical electronics.
          </h1>
        </div>
      </div>

      <div className="grid-ed mt-8">
        <div className="col-span-12 md:col-start-3 md:col-span-5">
          <FancyButton fullWidth>
            <a href="https://www.instagram.com/bbbbb.stuff/" target="_blank">
              More expiriments can be found HERE
            </a>
          </FancyButton>
        </div>
      </div>

      {/* Gallery: label rail + square mosaic */}
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
                  unoptimized={true}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Play;
