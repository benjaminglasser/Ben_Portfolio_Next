import { VscMute, VscUnmute } from "react-icons/vsc";

const VideoPlayerInternal = ({ video, className, centered }) => {
  return (
    <div
      className={`${centered ? "flex justify-center items-center" : "block"}`}
    >
      <div
        className={` ${className} w-full overflow-hidden flex justify-center 
                    ${
                      centered
                        ? "mt-10 w-full px-5 md:px-10 md:w-3/5"
                        : "md:w-full"
                    }
                  `}
      >
        <video
          className="object-cover w-full h-auto "
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayerInternal;
