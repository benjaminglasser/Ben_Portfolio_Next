import Section from "@/app/common/Section";
import React from "react";
import Link from "next/link";

const MetaRow = ({ label, children }) => (
  <div className="flex gap-3">
    <div className="text-[var(--rust)] uppercase tracking-wide shrink-0 w-24">
      {label}
    </div>
    <div>{children}</div>
  </div>
);

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
      <div className="grid-ed gap-y-8 mt-12 md:mt-20 zigzag-header">
        {/* Title + description */}
        <div className="col-span-12 md:col-span-8">
          <div className="rule-line w-full mb-4" />
          <h1 className="lead">{title}</h1>
          {description && (
            <p className="subtext desc-mono mt-4 max-w-2xl">{description}</p>
          )}
          {extendedDescription && (
            <p className="subtext desc-mono mt-4 max-w-2xl">
              {extendedDescription}
            </p>
          )}
        </div>

        {/* Spec block */}
        <div className="col-span-12 md:col-span-4 md:pl-8">
          <div className="rule-line w-full mb-4" />
          <dl className="subtext desc-mono space-y-3">
            {role && <MetaRow label="Role">{role}</MetaRow>}
            {time && <MetaRow label="Time">{time}</MetaRow>}
            {tools?.length > 0 && (
              <MetaRow label="Tools">{tools.join(", ")}</MetaRow>
            )}
            {collaborator && (
              <MetaRow label="With">
                {collaboratorLink ? (
                  <Link
                    href={collaboratorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {collaborator}
                  </Link>
                ) : (
                  collaborator
                )}
              </MetaRow>
            )}
          </dl>
        </div>
      </div>
    </Section>
  );
};

export default ZigzagHeader;
