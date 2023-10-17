"use client";
import VideoFileView from "@/components/video/videoFileView";

async function StreamVideo({ params }) {
  const { videoID } = params;

  return (
    <section className="min-h-screen">
      <VideoFileView id={videoID} />
    </section>
  );
}

export default StreamVideo;
