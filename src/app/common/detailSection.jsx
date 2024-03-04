import Section from "@/app/common/Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5, // Trigger when 50% of the element is in view
  });
  return (
    <Section>
      <div
        className={`w-full flex ${className} mt-14 ${
          left ? "justify-start" : center ? "justify-center" : "justify-end"
        } detail-section`}
      >
        <div
          className={`${widthFull ? "w-full" : "w-full md:w-1/2 lg:3/6"} my-6`}
        >
          {title && <h3 className="ojuju">{title}</h3>}
          <div ref={ref}>
            <motion.div
              initial={{ width: 0 }} // Start with a width of 0
              animate={{ width: inView ? "100%" : "0%" }} // Animate to full width when in view
              transition={{ duration: 2, ease: "easeInOut" }} // Customize the animation duration and easing
              style={{
                background: "#ff477b", // Line color
                height: "1px", // Line thickness
              }}
            />
          </div>
          {description && <h4 className="mt-3 md:font-thin">{description}</h4>}
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
