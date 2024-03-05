import Section from "@/app/common/Section";
import React from "react";

const AIM = ({ aim, className }) => {
  return (
    <Section>
      <div className={`${className} mt-10 px-5 md:px-10`}>
        <h1 className="ojuju">AIM</h1>
        <h1 className="leading-11">{aim}</h1>
      </div>
    </Section>
  );
};

export default AIM;
