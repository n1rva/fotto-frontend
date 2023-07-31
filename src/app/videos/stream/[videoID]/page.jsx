import VideoFileView from "@/components/video/videoFileView";

const fetchVideo = async (videoFileID) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/video/file/${videoFileID}`
    );
    const videoBlob = await response.blob();

    const videoUrl = URL.createObjectURL(videoBlob);
    console.log(videoUrl);
    return videoUrl;
  } catch (error) {
    // setVideoError(error.message || "Video yüklenemedi.");
    console.log(error);
  }
};

//fix
async function StreamVideo({ params }) {
  const { videoID } = params;
  const videoUrl = await fetchVideo(videoID);

  return (
    <div className="h-screen">
      {/* <video src={videoUrl} controls autoPlay={true} muted={true}></video> */}
      <VideoFileView url={videoUrl} />
    </div>
  );
}

export default StreamVideo;
