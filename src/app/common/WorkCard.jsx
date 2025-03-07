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
  externalLink,
}) => {
  return (
    <Link
      href={{
        pathname: path,
      }}
      target={externalLink ? "_blank" : "_self"}
    >
      <div className="hover:border-b-[0.2px] border-mute cursor-pointer pb-1 mb-10 w-full workcard">
        <Image
          src={thumbnail}
          alt="stemport gif"
          width="100"
          height="100"
          className="thumbnail "
        />
        <div className="flex justify-between text-[11px] text-black font-light border-b-[0.4px] py-2">
          <div>Role: {role}</div>
          <div>{time}</div>
        </div>
        <div className="pt-2 text-black leading-12 text-[2.25em] font-light">
          {title}
        </div>
        <h4 className="ojuju pb-0 md:pb-4 text-mute">{description}</h4>
        <p className="text-[11px] text-mute">Tools: {tools?.join(", ")}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
