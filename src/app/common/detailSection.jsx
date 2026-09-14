import Section from "@/app/common/Section";
import ImageWithLoader from "./ImageWithLoader";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const DetailSection = ({
  title,
  description,
  images,
  video,
  children,
  spanClass = "md:col-span-10",
  descWide = false,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <Section>
      <div className="grid-ed gap-y-4 mt-16 md:mt-24 detail-section">
        {/* Rail label */}
        <div className="col-span-12 md:col-span-2">
          {title && (
            <h3 className="edge-label text-[var(--rust)] md:sticky md:top-24">
              {title}
            </h3>
          )}
        </div>

        {/* Content */}
        <div className={`col-span-12 ${spanClass}`}>
          {/* Growing rust hairline */}
          <div ref={ref}>
            <motion.div
              className="rule-line"
              initial={{ width: 0 }}
              animate={{ width: inView ? "100%" : "0%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>

          {description && (
            <p
              className={`subtext desc-mono mt-5 ${
                descWide ? "" : "max-w-3xl"
              }`}
            >
              {description}
            </p>
          )}

          {video && (
            <video
              className="w-full h-auto mt-8"
              autoPlay
              muted
              loop
              playsInline
              src={video}
            />
          )}

          {images?.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="w-full mt-8">
                <ImageWithLoader
                  src={image}
                  alt="detail"
                  width={1920}
                  height={1080}
                  unoptimized={
                    typeof image === "string" && image.includes(".gif")
                  }
                />
              </div>
            ))}

          {children}
        </div>
      </div>
    </Section>
  );
};

export default DetailSection;
