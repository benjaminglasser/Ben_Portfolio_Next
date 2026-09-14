import Section from "@/app/common/Section";
import React from "react";

const AIM = ({ aim }) => {
  return (
    <Section>
      <div className="grid-ed mt-16 md:mt-24">
        {/* Rail label */}
        <div className="col-span-12 md:col-span-2 mb-4 md:mb-0">
          <h3 className="edge-label text-[var(--rust)] md:sticky md:top-24">Aim</h3>
        </div>

        {/* Statement */}
        <div className="col-span-12 md:col-span-10">
          <p className="subtext desc-mono max-w-3xl">{aim}</p>
        </div>
      </div>
    </Section>
  );
};

export default AIM;
