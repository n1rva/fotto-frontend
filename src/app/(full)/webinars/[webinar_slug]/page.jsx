import SingleWebinar from "@/components/webinar/singleWebinar";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const slug = params.webinar_slug;

  const product = await fetch(
    `${process.env.API_URL}/api/v1/webinar/${slug}/slug`
  ).then((res) => res.json());

  return {
    title: `${product.webinar.title} | Fizyotto Live`,
    openGraph: {
      images: [`${process.env.API_URL}/${product.webinar.image}`],
    },
  };
}

async function Webinar({ params }) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <>
      <SingleWebinar
        slug={params.webinar_slug}
        access_token={accessToken?.value}
      />
    </>
  );
}

export default Webinar;
