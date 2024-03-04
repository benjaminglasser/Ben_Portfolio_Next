import Section from "@/app/common/Section";
import React from "react";

const Context = ({
  title,
  context,
  titleBorder,
  bullets,
  className,
  titleLeft,
}) => {
  return (
    <Section>
      <div
        className={`${titleLeft ? "text-left" : "text-center"}  ${className}`}
      >
        {title && (
          <h1
            className={`ojuju text-grey mb-3 ${
              titleBorder
                ? "underline underline-offset-8 decoration-2 decoration-pink"
                : ""
            }`}
          >
            {title}
          </h1>
        )}
        {context && (
          <h2 className="flex text-left justify-center w-full">
            <div className="w-full text-grey px-5 md:w-3/5 text-left text-subheading">
              {context}
            </div>
          </h2>
        )}
        <div className="w-full flex justify-center">
          <ul className="w-full md:w-3/4 lg:w-1/3 text-left list-disc">
            {bullets?.map((bullet, idx) => (
              <li className="mb-2 leading-8 text-base">{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Context;
