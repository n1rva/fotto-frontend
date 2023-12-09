import AuthContext from "@/context/AuthContext";
import PaymentContext from "@/context/PaymentContext";
import VideoContext from "@/context/VideoContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function SingleVideoItem({
  thumbnail,
  title,
  instructor,
  instructorImage,
  price,
  description,
  videoID,
  slug,
  previewThumbnail,
  previewInstructorImage,
  access_token,
}) {
  if (typeof description === "string") description = JSON.parse(description);

  const [userHasVideo, setUserHasVideo] = useState(false);

  const { addItemToBasket } = useContext(PaymentContext);
  const { checkIfUserHasVideo } = useContext(VideoContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const checkUserVideo = async () => {
        const check = await checkIfUserHasVideo(videoID, access_token);

        setUserHasVideo(check);
      };
      checkUserVideo();
    }
  }, [user]);

  const router = useRouter();

  const createBasket = () => {
    addItemToBasket(
      title,
      price,
      "video",
      title,
      instructor,
      "",
      price,
      thumbnail,
      videoID
    );

    router.push("/checkout");
  };

  return (
    <section className="">
      <header className="banner flex flex-col items-center px-3 py-8">
        <div className="container max-w-lg flex flex-col items-center justify-center  md:items-start md:max-w-2xl md:flex-row lg:max-w-7xl lg:justify-evenly">
          <Image
            src={previewThumbnail || `${process.env.API_URL}${thumbnail}`}
            width={100}
            height={100}
            sizes="100vw"
            alt="video image"
            className="w-fit h-72 md:h-[22rem] lg:h-[30rem]"
          />
          <div className="w-full max-w-lg text-sm space-y-8 lg:text-base">
            <h2 className="text-lg text-center font-medium my-4 md:mt-0 md:text-start md:px-4 lg:text-2xl">
              {title}
            </h2>
            <div className="flex flex-col w-full px-4 ">
              <h3 className="font-bold">Eğitmen</h3>
              <div className="w-fit h-16 mt-3 flex items-center p-3 space-x-3 instructor bg-secBlue/10 rounded-lg lg:h-20">
                <Image
                  src={
                    previewInstructorImage ||
                    `${process.env.API_URL}${instructorImage}`
                  }
                  height={100}
                  width={100}
                  sizes="100vw"
                  alt="instructor"
                  className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
                />
                <span>{instructor}</span>
              </div>
            </div>
            <div className="flex flex-col w-full px-4">
              <div>
                <h3 className="font-bold">Video Kayıt Ücreti</h3>
                <span className="mt-3">{price} TL</span>
              </div>
              {user ? (
                userHasVideo ? (
                  <Link
                    href={`/videos/stream/${slug}`}
                    className="py-1 px-6 bg-red-500 rounded-lg w-fit mt-12 text-white hover:opacity-90 "
                  >
                    İzle
                  </Link>
                ) : (
                  <button
                    onClick={createBasket}
                    className="py-1 px-6 bg-fottoOrange rounded-lg w-fit mt-12 text-white hover:opacity-80"
                  >
                    Satın al
                  </button>
                )
              ) : (
                <Link
                  href={`/signup`}
                  className="py-1 px-6 bg-secBlue rounded-lg w-fit mt-12 text-white hover:opacity-90 "
                >
                  İzle
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="container flex flex-col justify-center px-5 py-3 my-10 space-y-12 md:items-start lg:max-w-7xl mx-auto description rounded-lg">
        {Object.keys(description).map((sec, index) => {
          const paragraphs = description[sec].desc.split("\\n");

          return (
            <div key={index} className="">
              <h2 className="font-medium lg:text-xl">
                {description[sec].title}
              </h2>
              {paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-sm lg:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SingleVideoItem;
