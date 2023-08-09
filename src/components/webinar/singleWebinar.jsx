"use client";
import WebinarContext from "@/context/WebinarContext";
import React, { useContext, useEffect, useState } from "react";
import SingleWebinarItem from "./singleWebinarItem";

function SingleWebinar({ webinarID }) {
  const { getWebinarByWebinarId } = useContext(WebinarContext);

  const [webinar, setWebinar] = useState("");

  useEffect(() => {
    const getSingleWebinar = async () => {
      const data = await getWebinarByWebinarId(webinarID);

      setWebinar(data);
    };
    getSingleWebinar();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      {webinar && (
        <SingleWebinarItem
          date={webinar.date}
          instructor={webinar.instructor}
          instructorImage={webinar.instructor_image}
          price={webinar.price}
          description={webinar.description}
          title={webinar.title}
          image={webinar.image}
        />
      )}
    </main>
  );
}

export default SingleWebinar;
