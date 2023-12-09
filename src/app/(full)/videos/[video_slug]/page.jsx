import SingleVideo from "@/components/video/singleVideo";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const slug = params.video_slug;

  const product = await fetch(
    `${process.env.API_URL}/api/v1/video/${slug}/slug`
  ).then((res) => res.json());

  return {
    title: `${product.video.title} | Fizyotto Live`,
    openGraph: {
      images: [`${process.env.API_URL}/${product.video.thumbnail}`],
    },
  };
}

async function SingleVideoPage({ params }) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  return (
    <>
      <SingleVideo slug={params.video_slug} access_token={accessToken?.value} />
    </>
  );
}

export default SingleVideoPage;
