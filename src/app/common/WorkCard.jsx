import ImageWithLoader from "./ImageWithLoader";
import Link from "next/link";

const WorkCard = ({
  path,
  role,
  time,
  title,
  description,
  thumbnail,
  externalLink,
  thumbnailBorder,
  number,
  aspectClass = "aspect-[3/2]",
}) => {
  return (
    <Link
      href={{
        pathname: path,
      }}
      target={externalLink ? "_blank" : "_self"}
    >
      <div className="group cursor-pointer w-full workcard">
        <ImageWithLoader
          src={thumbnail}
          alt={`${title} - ${description}`}
          width="100"
          height="100"
          className="thumbnail"
          wrapperClassName={`!rounded-none ${aspectClass}`}
          borderOverlayClassName={thumbnailBorder ? "border border-[#b45314] !rounded-none" : ""}
          unoptimized={typeof thumbnail === 'string' && (thumbnail.endsWith('.gif') || thumbnail.endsWith('.webp'))}
        />
        <div className="flex gap-6 pt-3">
          <div className="desc-mono subtext text-black shrink-0">{number}</div>
          <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
            <div className="text-black display-title font-normal">{title}</div>
            <h4 className="pt-1 text-mute subtext desc-mono">{description}</h4>
            <div className="flex justify-between gap-4 desc-mono uppercase tracking-wide text-[#a67253] mt-4 text-[0.68rem] leading-relaxed">
              <div>Role: {role}</div>
              <div className="shrink-0">{time}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
