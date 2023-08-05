"use client";

import Image from "next/image";

import { useContext, useEffect, useState } from "react";
import WebinarContext from "@/context/WebinarContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { FaChalkboardTeacher } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import Link from "next/link";
import moment from "moment";

function Home() {
  const { getAllWebinars, allWebinars } = useContext(WebinarContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getAllWebinars();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* hero */}
      <div className="mx-auto px-8 pt-14 pb-7 lg:container lg:flex lg:h-[1000px] lg:justify-between">
        {/* text */}
        <div className="relative max-w-sm flex flex-col lg:ml-20 lg:mt-20 lg:max-w-none lg:h-fit xl:mt-32">
          <h1 className="font-bold text-3xl max-w-xs lg:text-5xl xl:text-6xl lg:max-w-md">
            Kendinizi geliştirmek bir tık uzaklıkta.
          </h1>
          <p className="font-medium text-fottoText mt-6 text-sm max-w-sm lg:text-base">
            Uzman fizyoterapistlerin eşlik ettiği webinarlar ile sertifikanızı
            alın, kariyerinizde bir adım öne geçin.
          </p>
          <Link
            href={"/signup"}
            className="mt-8 mx-auto text-white px-8 py-1 rounded-lg bg-secBlue text-sm hover:bg-opacity-80 lg:mx-0 lg:w-fit lg:text-base"
          >
            Katıl
          </Link>
          <div className="hidden -z-10 xl:block absolute -left-[900px] -top-[1250px] w-[1800px] h-[1800px] border-[75px] border-transparent rounded-full -rotate-90 border-b-iconBlue border-l-secBlue 2xl:-left-[800px] 2xl:-top-[1200px] 2xl:w-[1800px] 2xl:h-[1800px] 2xl:border-[90px]" />
        </div>
        {/* foto + border */}
        <div className="flex justify-center max-w-sm p-12 lg:max-w-3xl">
          <div className="relative h-fit">
            <Image
              src="/anasayfaFoto.webp"
              width={300}
              height={300}
              sizes="100vw"
              className="rounded-lg w-full"
              alt="mainpagephoto"
            />
            <div className="absolute rounded-lg -left-2 top-2 w-full h-full -z-20 bg-secBlue/50 lg:-left-4 lg:top-4 " />
          </div>
        </div>
        <div className="absolute rounded-full right-7 top-8 h-24 w-24 blur-3xl -z-10 bg-secBlue lg:bg-secBlue/50 lg:right-0 lg:-left-44 lg:-top-20 lg:h-[400px] lg:w-[400px] xl:right-0 xl:-left-44 xl:-top-20 xl:h-[600px] xl:w-[600px]" />
      </div>
      {/* yaklaşan webinarlar */}
      <div className="flex flex-col items-center bg-fottoWhite px-12 py-3 max-h-[50rem] h-full">
        <h1 className="font-bold text-2xl my-4 lg:w-full lg:max-w-6xl lg:px-6 xl:text-3xl">
          Yaklaşan Webinarlar
        </h1>
        {/* webinar listesi */}
        <div className="w-full max-w-5xl">
          {isLoading ? (
            <div className="mx-auto flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
            </div>
          ) : allWebinars.length ? (
            <Swiper
              slidesPerView={window.innerWidth < 768 ? 1 : 3}
              grabCursor={true}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {allWebinars.map((webinar) => {
                const { id, date, image, instructor, title } = webinar;
                return (
                  <SwiperSlide key={id}>
                    <Link href={`webinars/${id}`}>
                      <div className="min-h-[20rem] w-48 mx-auto bg-darkerMain border border-secBlue select-none cursor-pointer hover:border-[#fd8f00] rounded-b-lg">
                        <Image
                          src={`${process.env.API_URL}${image}`}
                          width={100}
                          height={100}
                          sizes="100vw"
                          className="w-full max-h-40"
                          alt={`webinar ${title}`}
                        />
                        <h4 className="font-bold text-sm text-center p-1 wrapword">
                          {title}
                        </h4>
                        <div className="p-3 space-y-3">
                          <div className="flex items-center ">
                            <FaChalkboardTeacher className="text-fottoOrange" />
                            <span className="ml-2 text-xs font-medium">
                              {instructor}
                            </span>
                          </div>
                          <div className="flex items-center ">
                            <BsCalendar2Date className="text-fottoOrange" />
                            <span className="ml-2 text-xs font-medium">
                              {moment(date).format("DD/MM/YYYY HH:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="my-20">
              <span className="font-medium text-fottoText">
                Çok yakında yeni webinarlar ile sizlerleyiz.
              </span>
            </div>
          )}
        </div>
      </div>
      {/* 3 feature */}
      <div className="py-12 flex flex-col space-y-8 items-center">
        <div className="flex flex-col justify-center items-center lg:flex-row-reverse lg:container lg:justify-between lg:px-32 lg:max-w-[85rem]">
          <div className="w-72 h-52 bg-white flex justify-center items-center rounded-lg border border-secBlue">
            <Image
              src="/step1.webp"
              width={100}
              height={100}
              sizes="100vw"
              className="h-full w-fit"
              alt="step1"
            />
          </div>
          <div className="w-72 text-center my-6 space-y-3 lg:w-fit lg:text-left lg:space-y-8">
            <h3 className="font-bold text-lg lg:text-2xl">
              Kariyerinizde ilerlemeye başlayın
            </h3>
            <p className="text-xs lg:text-sm lg:max-w-md">
              Sizin için davet ettiğimiz uzman fizyoterapistler ile
              kariyerinizde daha da ileri gidin. Elde edeceğiniz sertifikalar
              ile kendinizi kanıtlayın.
            </p>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center lg:flex-row lg:container lg:justify-between lg:px-32 lg:max-w-[85rem]">
          <div className="w-72 h-52 bg-white flex justify-center items-center rounded-lg border border-secBlue">
            <Image
              src="/step2.webp"
              width={100}
              height={100}
              sizes="100vw"
              className="h-fit w-fit"
              alt="step2"
            />
          </div>
          <div className="w-72 text-center my-6 space-y-3 lg:w-max lg:text-left lg:space-y-8 ">
            <h3 className="font-bold text-lg lg:text-2xl">
              Daha fazlasını isteyenlere{" "}
              <span className="whitespace-pre lg:whitespace-normal">
                {" "}
                özel kayıtlar
              </span>
            </h3>
            <p className="text-xs lg:text-sm lg:max-w-md">
              Uzman fizyoterapistlerin katıldığı özel webinar kayıtlarına
              erişerek yeni bilgiler edinebilir, sektördeki gelişmeleri yakından
              takip edebilirsiniz.
            </p>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center lg:flex-row-reverse lg:container lg:justify-between lg:px-32 lg:max-w-[85rem]">
          <div className="w-72 h-52 p-1 bg-white flex justify-center items-center rounded-lg border border-secBlue">
            <Image
              src="/step3.webp"
              width={100}
              height={100}
              sizes="100vw"
              className="h-fit w-fit"
              alt="step3"
            />
          </div>
          <div className="w-72 text-center my-6 space-y-3 lg:w-fit lg:text-left lg:space-y-8">
            <h3 className="font-bold text-lg lg:text-2xl">
              Türkiye'nin en büyük fizyoterapist
              <span className="whitespace-pre lg:whitespace-normal">
                {" "}
                topluluğuna katılın
              </span>
            </h3>
            <p className="text-xs lg:text-sm lg:max-w-md">
              Deneyimlerinizi paylaşmak, yeni bağlantılar kurmak ve sektördeki
              son gelişmeleri takip etmek için Fizyotto Live etkinliklerine
              katılın.
            </p>
          </div>
        </div>
      </div>
      {/* 3 step */}
      <div className="py-12 flex flex-col justify-center items-center space-y-12 lg:py-24 lg:space-y-20">
        <h2 className="w-72 text-xl font-bold text-center lg:container lg:text-start lg:max-w-[85rem] lg:px-32 lg:text-2xl">
          Sertifikalarınıza 3 adım uzaklıktasınız
        </h2>
        <div className="flex flex-col items-center justify-center space-y-12 lg:flex lg:flex-row lg:items-start lg:space-y-0 lg:space-x-6 lg:container lg:justify-between lg:px-32 lg:max-w-[85rem]">
          <div className="w-72 space-y-3 lg:w-fit lg:basis-1/3">
            <h3 className="font-bold text-xl text-transparent bg-gradient-to-r from-fottoOrange to-darkerOrange bg-clip-text lg:pb-4 lg:text-3xl">
              Adım 1
            </h3>
            <h4 className="font-medium text-lg lg:text-xl">
              Ücretsiz üyeliğinizi oluşturun
            </h4>
            <p className="text-xs lg:text-sm">
              Ücretsiz üyeliğinizi oluşturarak{" "}
              <span className="text-fottoOrange">Fizyotto</span> dünyasına
              adımınızı atın.
            </p>
          </div>
          <div className="w-72 space-y-3 lg:w-fit lg:basis-1/3">
            <h3 className="font-bold text-xl text-transparent bg-gradient-to-r from-fottoOrange to-darkerOrange bg-clip-text lg:pb-4 lg:text-3xl">
              Adım 2
            </h3>
            <h4 className="font-medium text-lg lg:text-xl">Webinara katılın</h4>
            <p className="text-xs lg:text-sm">
              İstediğiniz webinarı alın ve katılım sağlayın.
            </p>
          </div>
          <div className="w-72 space-y-3 lg:w-fit lg:basis-1/3">
            <h3 className="font-bold text-xl text-transparent bg-gradient-to-r from-fottoOrange to-darkerOrange bg-clip-text lg:pb-4 lg:text-3xl">
              Adım 3
            </h3>
            <h4 className="font-medium text-lg lg:text-xl">
              Sertifikanızı alın
            </h4>
            <p className="text-xs lg:text-sm">
              Webinara katılımınız onaylandıktan sonra size özel sertifikanızı
              profilinizde bulabilirsiniz.
            </p>
          </div>
        </div>
      </div>
      {/* sign up section */}
      <div className="py-12 flex justify-center">
        <div className="flex flex-col justify-center items-center space-y-6 lg:container lg:justify-between lg:px-32 lg:max-w-[85rem] lg:items-start">
          <h2 className="w-80 font-bold text-xl text-center lg:w-fit lg:text-start lg:text-3xl">
            Hemen üye olun ve Fizyotto Live ile en iyiye doğru ilerleyin!
          </h2>
          <Link
            href={"/signup"}
            className="py-1 px-8 rounded-lg text-sm bg-gradient-to-r from-secBlue to-secBlue/40 text-white hover:opacity-80 lg:text-base lg:px-10"
          >
            Üye ol
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
