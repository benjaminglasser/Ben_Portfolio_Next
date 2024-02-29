
import { VscMute, VscUnmute } from 'react-icons/vsc';

const VideoPlayer = ({}) => {
 

  return (
    <div className=" relative w-full flex flex-col items-center">
      <video className="w-full h-auto" autoPlay loop playsInline muted >
        <source src={"/EaselSizzle_v10.mp4"} type="video/mp4" />
        <source src={"/EaselSizzle_Vertical.webm"} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="audioBtn">
        <button>

        </button>
      </div>

      
    </div>
  );
};

export default VideoPlayer;