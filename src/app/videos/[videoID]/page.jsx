import SingleVideo from "@/components/video/singleVideo";

async function SingleVideoPage({ params }) {
  return (
    <>
      <SingleVideo videoID={params.videoID} />
    </>
  );
}

export default SingleVideoPage;
