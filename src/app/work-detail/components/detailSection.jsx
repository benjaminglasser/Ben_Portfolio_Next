import Section from "@/app/common/Section";
import Image from "next/image";

const DetailSection = ({
  title,
  widthFull,
  description,
  images,
  left,
  center,
  video,
  className,
}) => {
  return (
    <Section>
      <div
        className={`w-full flex ${className} mt-14 ${
          left ? "justify-start" : center ? "justify-center" : "justify-end"
        } detail-section`}
      >
        <div className={`${widthFull ? "w-full" : "w-full md:w-1/2"} my-6`}>
          {title && <h3>{title}</h3>}
          <div className="border-b border-pink" />
          {description && (
            <h4 className="mt-3 font-extralight">{description}</h4>
          )}
        </div>
      </div>
      {video && <video autoPlay muted loop src={video} />}
      {images?.length > 0 &&
        images?.map((image, index) => (
          <div key={index} className="flex justify-center w-full mt-5">
            <Image src={image} alt="userflow" />
          </div>
        ))}
    </Section>
  );
};

export default DetailSection;
