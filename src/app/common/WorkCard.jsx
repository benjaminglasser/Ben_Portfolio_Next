"use client";
import Image from "next/image";
import Link from "next/link";

const WorkCard = ({
  path,
  role,
  time,
  title,
  description,
  tools,
  thumbnail,
}) => {
  return (
    <Link
      href={{
        pathname: path,
      }}
    >
      <div className="hover:border-b-[0.4px] cursor-pointer pb-1 w-full workcard">
        <Image src={thumbnail} alt="stemport gif" width="100" height="100" className="thumbnail" />
        <div className="flex justify-between text-[11px] font-light border-b-[0.4px] py-2">
          <div>Role: {role}</div>
          <div>Time: {time}</div>
        </div>
        <div className="py-2 text-[2.25em] font-light">{title}</div>
        <h2 className="font-sprat pb-1">{description}</h2>
        <p className="text-[11px] text-mute">Tool: {tools?.join(", ")}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
