import Section from "@/app/common/Section";
import { Grid } from "@mui/material";
import React from "react";

const ZigzagHeader = ({
  title,
  description,
  extendedDescription,
  time,
  role,
  tools,
}) => {
  return (
    <Section>
      <Grid container className="mt-10 zigzag-header px-5 md:px-10">
        <Grid
          item
          xs={12}
          md={3}
          className="border-t lg:border-t lg:border-r border-pink p-3"
        >
          <h2 className="text-sm sm:text-base md:text-lg lg:text-3xl">
            {title}
          </h2>
          <h4 className="font-sprat text-xs sm:text-sm md:text-base lg:text-2xl">
            {description}
          </h4>
        </Grid>
        <Grid item xs={12} md={9} className="border-l border-b border-pink p-3">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6">
            {extendedDescription}
          </p>
          <div className="text-xxs mt-2">Time: {time}</div>
          <div className="text-xxs mt-2">Role: {role}</div>
          <div className="text-xxs mt-2">Tools: {tools?.join(", ")}</div>
        </Grid>
      </Grid>
    </Section>
  );
};

export default ZigzagHeader;
