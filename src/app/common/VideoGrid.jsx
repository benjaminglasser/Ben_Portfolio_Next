import VideoPlayerInternal from "@/app/common/VideoPlayerInternal";

function VideoGrid({ videos }) {
  return (
    <div className="px-5 md:px-10 my-8 md:my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
        {videos.map((video, index) => (
          <div key={index} className="w-full h-auto mt-12">
            <VideoPlayerInternal video={video.url} />
            <h3 className="ojuju mt-2">{video.caption}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGrid;
