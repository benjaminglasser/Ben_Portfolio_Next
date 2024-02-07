import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkCard from "./components/WorkCard";
import Section from "../common/Section";
import { IMAGES } from "../assets/images";
import { VIDEO } from "../assets/video";

const Work = () => {
  const WORK_CONTENT = [
    {
      role: "UX/UI Designer",
      time: "Spring 2023",
      title: "Stemport",
      description: "Analyze - Organize - Import",
      thumbnail: IMAGES?.STEMPORT,
      tools: ["Unity", "Blender", "Unreal Engine", "Instant-ngp"],
      workDetail: {
        video: VIDEO.STEMPORT,
        context:
          "Music production consists of breaking down individual instrument tracks into many smaller units known as 'stems'. Organizing and labeling large project files can very quickly become cluttered and difficult to sift through - especially as production teams scale.",
        aim: "Stemport uses a machine learning algorithm to analyze, organize, and re-label musical stems to aid in streamlining the creative workflow.",
        detail: [
          {
            title: "Visual Identity",
            description:
              "To enhance the ML experience, a visual identity was created to signify the AI processes. Inspired by the way in which sound can create beautiful ripples in water, a virtual avatar guides the user along the journey.",
            images: [IMAGES.USERFLOW_TRANS],
          },
          {
            title: "Second Item",
            description:
              "This is the second item description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            images: [IMAGES.DESKTOP_MOCKUP],
          },
          {
            title: "Third Item",
            description:
              "This is the third item description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            images: [IMAGES.USERFLOW_TRANS],
          },
          {
            title: "UI Consideration",
            description:
              "When rolling out all the screens, careful attention was paid so that the user flow was clear and simple. Negative space and a minimilistic design was used generously to keep the layouts uncluttered.",
            widthFull: true,
            images: [
              IMAGES.BOARD1,
              IMAGES.BOARD2,
              IMAGES.BOARD3,
              IMAGES.BOARD4,
              IMAGES.BOARD5,
            ],
          },
        ],
      },
    },
    {
      role: "XR Interaction",
      time: "Summer 2022 - Fall 2022",
      title: "BMW",
      description: "Developing next-generation XR products and systems",
      extendedDescription:
        "Designed and implemented XR prototypes for the future interaction between human and vehicle as part of the BMW design and research team in Munich.",
      thumbnail: IMAGES?.DANCING_CAR,
      tools: ["Unreal Engine", "Unity", "Blender", "Abode Suite", "Figma"],
      workDetail: {
        innerBox: true,
      },
    },
    {
      role: "Product Designer",
      time: "Fall 2021 - Spring 2022",
      title: "Mobile Application Design",
      description:
        "Designed a mobile application focusing on productivity and task management, emphasizing simplicity and user-friendly design.",
      thumbnail: IMAGES?.STEMPORT,
      tools: ["Figma", "Adobe XD", "Sketch", "InVision"],
    },
  ];

  return (
    <Grid container spacing={5} className="mt-5">
      {WORK_CONTENT?.map((content, idx) => (
        <Grid key={idx} xs={12} md={6}>
          <Section>
            <WorkCard
              role={content?.role}
              time={content?.time}
              title={content?.title}
              description={content?.description}
              tools={content?.tools}
              thumbnail={content?.thumbnail}
              extendedDescription={content?.extendedDescription}
              workDetail={content?.workDetail}
            />
          </Section>
        </Grid>
      ))}
    </Grid>
  );
};

export default Work;
