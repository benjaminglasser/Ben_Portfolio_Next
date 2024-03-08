"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const [isLoading, setLoading] = useState(true);
  return (
    <Link
      href={{
        pathname: path,
      }}
      target={externalLink ? "_blank" : "_self"}
    >
      <div className="hover:border-b-[0.2px] border-white cursor-pointer pb-1 w-full workcard">
        <div className="hover:border-b-[0.2px] border-white cursor-pointer pb-1 w-full workcard">
          {isLoading ? (
            <div className="w-auto h-auto flex justify-center items-center">
              <PuffLoader
                color="#ff477b"
                loading
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <Image
              src={thumbnail}
              alt="stemport gif"
              width="100"
              height="100"
              className="thumbnail"
              onLoadingComplete={() => setLoading(false)}
              style={{ display: isLoading ? "none" : "block" }}
            />
          )}
        </div>
        <div className="flex justify-between text-[11px] text-white font-light border-b-[0.4px] py-2">
          <div>Role: {role}</div>
          <div>Time: {time}</div>
        </div>
        <div className="pt-2 text-white leading-12 text-[2.25em] font-light">
          {title}
        </div>
        <h4 className="ojuju pb-4 text-mute">{description}</h4>
        <p className="text-[11px] text-mute">Tools: {tools?.join(", ")}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
