"use client";

import WebinarItem from "@/components/webinar/webinarItem";
import WebinarContext from "@/context/WebinarContext";
import { useContext, useEffect, useState } from "react";
import Placeholder from "../placeholder";

function WebinarList() {
  const { getAllWebinars, allWebinars, webinarLoading, webinarError } =
    useContext(WebinarContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWebinars = async () => {
      await getAllWebinars();

      setIsLoading(false);
    };

    fetchWebinars();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-12 mt-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Placeholder key={i} />
          ))}
      </div>
    );
  }

  if (allWebinars?.length === 0 && !webinarLoading) {
    return <p>Henüz webinar bulunmamaktadır</p>;
  }

  return (
    <section className="flex flex-wrap gap-12 mt-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
      {allWebinars?.map((webinar) => {
        const { id, title, image, instructor, date, slug } = webinar;
        console.log(webinar);

        return (
          <WebinarItem
            key={id}
            date={date}
            instructor={instructor}
            title={title}
            image={image}
            slug={slug}
          />
        );
      })}
    </section>
  );
}

export default WebinarList;
