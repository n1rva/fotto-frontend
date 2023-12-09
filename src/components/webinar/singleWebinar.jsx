"use client";
import WebinarContext from "@/context/WebinarContext";
import React, { useContext, useEffect, useState } from "react";
import SingleWebinarItem from "./singleWebinarItem";

function SingleWebinar({ slug, access_token }) {
  const { getWebinarBySlug } = useContext(WebinarContext);

  const [webinar, setWebinar] = useState("");

  useEffect(() => {
    const getSingleWebinar = async () => {
      const data = await getWebinarBySlug(slug);

      setWebinar(data);
    };
    getSingleWebinar();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {webinar && (
        <SingleWebinarItem
          date={webinar.date}
          instructor={webinar.instructor}
          instructorImage={webinar.instructor_image}
          price={webinar.price}
          description={webinar.description}
          title={webinar.title}
          image={webinar.image}
          webinarID={webinar.id}
          wp_group_url={webinar.wp_group_url}
          access_token={access_token}
        />
      )}
    </main>
  );
}

export default SingleWebinar;
