import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkCard from "./components/WorkCard";
import Section from "../common/Section";

const Work = () => {
  return (
    <Grid container spacing={5} className="mt-5">
      {[...Array(8)]?.map((_, idx) => (
        <Grid key={idx} md={6}>
          <Section>
            <WorkCard />
          </Section>
        </Grid>
      ))}
    </Grid>
  );
};

export default Work;
