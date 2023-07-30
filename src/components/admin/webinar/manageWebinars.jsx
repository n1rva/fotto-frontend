"use client";

import WebinarContext from "@/context/WebinarContext";
import { useContext, useEffect, useState } from "react";
import ManageSingleWebinar from "./manageSingleWebinar";

function ManageWebinars({ access_token }) {
  const { getAllWebinars, allWebinars } = useContext(WebinarContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getAllWebinars(access_token);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex ">
      {allWebinars.length > 0 ? (
        <div className="flex flex-wrap gap-12 mt-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
          {allWebinars.map((webinar) => {
            const { id, image, title, instructor, date } = webinar;

            return (
              <ManageSingleWebinar
                key={id}
                id={id}
                image={image}
                title={title}
                instructor={instructor}
                date={date}
                access_token={access_token}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <p>Henüz hiçbir webinar yok.</p>
        </div>
      )}
    </div>
  );
}

export default ManageWebinars;
