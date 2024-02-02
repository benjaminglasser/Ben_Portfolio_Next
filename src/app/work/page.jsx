import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkCard from "./components/WorkCard";

const Work = () => {
  return (
    <Grid container spacing={5} className="mt-5">
      {[...Array(8)]?.map((_, idx) => (
        <Grid key={idx} md={6}>
          <WorkCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default Work;
