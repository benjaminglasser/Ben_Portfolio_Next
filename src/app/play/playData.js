import { IMAGES } from "../../../public/images";
import { CANARY } from "../../../public/images/canary";
import { SPATIAL } from "../../../public/images/SpatialAge";

// Categories for the play lab. Colors are non-text marks (≥3:1 on black).
export const PLAY_CATEGORIES = {
  digital: { label: "Digital", color: "#3d6fd6" },
  object: { label: "Objects", color: "#c8701a" },
  web: { label: "Web", color: "#8a8a8a" },
  wood: { label: "Wood", color: "#9a6b3f" },
};
export const PLAY_CATEGORY_ORDER = ["digital", "object", "web", "wood"];

// Builds: larger, named projects shown "on the bench".
// To add one, copy an entry and fill it in:
//   cover   – an image import (e.g. IMAGES.PLAY_LAMP) or a "/path.jpg" string.
//             Leave it out to show a dot-grid placeholder.
//   status  – "in-progress" or "done"
//   link    – optional URL; the card becomes a link when set
export const PLAY_BUILDS = [
  {
    id: "lamp",
    title: "Lamp",
    category: "object",
    note: "Physical product exploration",
    materials: ["3D print", "Wood", "LED"],
    status: "in-progress",
  },
  {
    id: "website",
    title: "Website",
    category: "web",
    note: "Playful web design project",
    materials: ["Figma", "React"],
    status: "in-progress",
  },
  {
    id: "woodworking",
    title: "Woodworking",
    category: "wood",
    note: "Furniture and small objects",
    materials: ["Hardwood", "Hand tools"],
    status: "in-progress",
  },
];

// Features: standalone projects with their own section.
//   rows    – rows of images for the bento, each with its shape (ratio)
//   link    – optional { label, href } shown as a button under the text
export const PLAY_FEATURES = [
  {
    id: "canary",
    title: "The Canary Test",
    kind: "Web design",
    category: "web",
    // Each inner list is one row of the bento. Images in a row share a
    // height, and each keeps its own shape (ratio = width / height).
    rows: [
      [{ src: CANARY.CANARY_THUMB, alt: "The Canary Test website in motion", ratio: 16 / 9 }],
      [
        { src: CANARY.UI_CONSIDERATION, alt: "Canary home page", ratio: 16 / 9 },
        { src: CANARY.MOBILE_VIEW, alt: "Canary on mobile", ratio: 1920 / 1600 },
      ],
      [
        { src: CANARY.TRANS_HOME, alt: "Canary shows page", ratio: 2880 / 2048 },
        { src: CANARY.INFO, alt: "Canary info page", ratio: 2880 / 2048 },
        { src: CANARY.PRESS, alt: "Canary press page", ratio: 2880 / 2048 },
      ],
    ],
    description:
      "Web design and development for The Canary Test, a Los Angeles gallery for sound, video, performance, and installation work. The gallery asked for a sleek, minimal site that lets the many artists moving through its space take center stage.",
    meta: ["Spring 2022", "Figma, Next.js, Framer Motion, Contentful"],
    link: {
      label: "Visit the website",
      href: "https://canary-alt.vercel.app/",
    },
  },
  {
    id: "spatial-age",
    compact: true,
    title: "The Spatial Age",
    kind: "Research",
    category: "digital",
    rows: [[{ src: SPATIAL.SPINNING_BENCH, alt: "Spinning bench captured as a radiance field", ratio: 16 / 9 }]],
    description:
      "How spatialization is redefining our reality, memory, and experience. A speculative look at radiance fields and what it means to capture a moment in three dimensions.",
    meta: ["October 2022"],
    link: {
      label: "Read the article",
      href: "https://radiancefields.com/unlocking-the-spatial-age-how-nerf-technology-is-redefining-our-reality-memory-and-experience/",
    },
  },
  {
    id: "posters",
    compact: true,
    title: "Poster design and animation",
    kind: "Posters",
    category: "digital",
    rows: [
      [
        { src: IMAGES.PLAY_30, alt: "Animated rave poster for Section Studio at François Ghebaly", ratio: 331 / 414 },
        { video: "/Media/Play/canary-poster.mp4", alt: "Poster animation for The Canary Test", ratio: 720 / 1280 },
      ],
    ],
    description:
      "Animated posters for events and shows, including a rave for Section Studio at François Ghebaly and a poster animation for The Canary Test.",
    meta: ["2021–2023"],
  },
];

// Experiments: quick studies shown in the mosaic. Add a `category` to
// file new ones under Objects, Web, or Wood.
export const PLAY_EXPERIMENTS = [
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
  IMAGES.PLAY_36,
  IMAGES.PLAY_22,
  IMAGES.PLAY_23,
  IMAGES.PLAY_34,
  IMAGES.PLAY_24,
  IMAGES.PLAY_27,
  IMAGES.PLAY_26,
  IMAGES.PLAY_25,
  IMAGES.PLAY_28,
  IMAGES.PLAY_37,
  IMAGES.PLAY_29,
  IMAGES.PLAY_31,
].map((src, i) => ({ id: `exp-${i + 1}`, src, category: "digital" }));
