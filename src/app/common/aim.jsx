import Section from "@/app/common/Section";
import React from "react";

const AIM = ({ aim, className }) => {
  return (
    <Section>
      <div className={`${className} mt-10 px-10`}>
        <h2>AIM</h2>
        <h1>{aim}</h1>
      </div>
    </Section>
  );
};

export default AIM;
