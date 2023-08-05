import SingleProduct from "@/components/webinar/singleProduct";

import React from "react";

const getWebinarById = async (id) => {
  try {
    const getWebinar = await fetch(
      `${process.env.API_URL}/api/v1/webinar/${id}`
    );

    const data = await getWebinar.json();
    if (data.success) {
      return data.webinar;
    }
  } catch (error) {}
};

async function Webinar({ params }) {
  const webinar = await getWebinarById(params.webinarID);

  const {
    title,
    image,
    instructor,
    instructor_image,
    date,
    price,
    description,
  } = webinar;
  return (
    <main className="flex min-h-screen flex-col items-center">
      <SingleProduct
        date={date}
        instructor={instructor}
        instructorImage={instructor_image}
        price={price}
        description={description}
        title={title}
        image={image}
      />
    </main>
  );
}

export default Webinar;
