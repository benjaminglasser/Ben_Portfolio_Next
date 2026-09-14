import Section from "@/app/common/Section";
import React from "react";

const Context = ({ title, context, bullets }) => {
  return (
    <Section>
      <div className="grid-ed mt-16 md:mt-24">
        {/* Rail label */}
        <div className="col-span-12 md:col-span-2 mb-4 md:mb-0">
          <h3 className="edge-label text-[var(--rust)] md:sticky md:top-24">
            {title || "Context"}
          </h3>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-10">
          {context && (
            <p className="subtext desc-mono max-w-3xl">{context}</p>
          )}
          {bullets?.length > 0 && (
            <ul className="mt-4 list-disc pl-5 subtext desc-mono max-w-3xl space-y-2">
              {bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Context;
