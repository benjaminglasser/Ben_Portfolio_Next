"use client";
import Image from "next/image";
import { IMAGES } from "@/app/assets/images";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WorkCard = ({
  path,
  role,
  time,
  title,
  description,
  extendedDescription,
  tools,
  thumbnail,
  workDetail,
  externalLink,
}) => {
  return (
    <Link
      href={{
        pathname: path,
      }}
    >
      <div className="hover:border-b cursor-pointer pb-1 w-full workcard">
        <Image src={thumbnail} alt="stemport gif" className="thumbnail" />
        <div className="flex justify-between font-light text-xs border-b-mute border-b py-2">
          <div>Role: {role}</div>
          <div>Time: {time}</div>
        </div>
        <h1 className="text-3xl font-lato py-2">{title}</h1>
        <h2 className="font-sprat pb-1 font-extralight">{description}</h2>
        <p className="text-xs text-mute">Tool: {tools?.join(",")}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
