"use client";
import VideoFileView from "@/components/video/videoFileView";

async function StreamVideo({ params }) {
  const { video_slug } = params;

  return (
    <section className="min-h-screen">
      <VideoFileView slug={video_slug} />
    </section>
  );
}

export default StreamVideo;
