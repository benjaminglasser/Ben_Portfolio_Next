"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PuffLoader } from "react-spinners";

const WorkCard = ({
  path,
  role,
  time,
  title,
  description,
  tools,
  thumbnail,
  externalLink,
}) => {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Example logic to simulate loading process
    // In a real scenario, this might depend on your data fetching logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href={{
        pathname: path,
      }}
      target={externalLink ? "_blank" : "_self"}
    >
      <div className="hover:border-b-[0.2px] border-white cursor-pointer pb-1 w-full workcard">
        {isLoading ? (
          // Display the loader if isLoading is true
          <div
            className="flex justify-center items-center"
            style={{ height: "100px", width: "100%" }}
          >
            <PuffLoader color="#fff" height={100} width={100} />
          </div>
        ) : (
          // Once loading is complete, display the content
          <>
            <Image
              src={thumbnail}
              alt="stemport gif"
              width="100"
              height="100"
              className="thumbnail"
            />
            <div className="flex justify-between text-[11px] text-white font-light border-b-[0.4px] py-2">
              <div>Role: {role}</div>
              <div>Time: {time}</div>
            </div>
            <div className="pt-2 text-white leading-12 text-[2.25em] font-light">
              {title}
            </div>
            <h4 className="ojuju pb-4 text-mute">{description}</h4>
            <p className="text-[11px] text-mute">Tools: {tools?.join(", ")}</p>
          </>
        )}
      </div>
    </Link>
  );
};

export default WorkCard;
