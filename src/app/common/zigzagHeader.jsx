import Section from "@/app/common/Section";
import { Grid } from "@mui/material";
import React from "react";
import Link from "next/link";

const ZigzagHeader = ({
  title,
  description,
  extendedDescription,
  time,
  role,
  tools,
  collaborator,
  collaboratorLink,
}) => {
  return (
    <Section>
      <Grid container className="mt-10 zigzag-header">
        <Grid
          item
          xs={12}
          md={3}
          className="border-t lg:border-t lg:border-r border-pink p-3"
        >
          <h2 className="text-4xl mb-3">{title}</h2>
          <h4 className="ojuju font-light text-grey lg:text-2xl">
            {description}
          </h4>
        </Grid>
        <Grid item xs={12} md={9} className="border-l border-b border-pink p-3">
          <p className="mb-6">{extendedDescription}</p>
          <div className="text-xxs mt-2 flex">
            <div className="text-grey mr-2">Time:</div> {time}
          </div>
          <div className="text-xxs mt-2 flex">
            <div className="text-grey mr-2">Role: </div>
            {role}
          </div>
          <div className="text-xxs mt-2 flex">
            <div className="text-grey mr-2">Tools:</div> {tools?.join(", ")}
          </div>
          {collaborator ? (
            <div className="text-xxs mt-2 flex">
              <div className="text-grey mr-2">Collaborator:</div>
              <Link
                href={collaboratorLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {collaborator}
              </Link>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Section>
  );
};

export default ZigzagHeader;
