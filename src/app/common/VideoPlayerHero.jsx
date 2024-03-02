
import { VscMute, VscUnmute } from 'react-icons/vsc';


const VideoPlayerHero = ({video, className}) => {
 

  return (
    <div className={` ${className} relative w-full overflow-hidden flex justify-center`}>
      <video className="object-cover w-full h-auto " autoPlay loop playsInline muted >
        <source src={video} type="video/mp4" />
        {/* <source src={"/EaselSizzle_Vertical.webm"} type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>
    
      
    </div>
  );
};

export default VideoPlayerHero;