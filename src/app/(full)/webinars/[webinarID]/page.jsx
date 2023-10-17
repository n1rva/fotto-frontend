import SingleWebinar from "@/components/webinar/singleWebinar";

async function Webinar({ params }) {
  return (
    <>
      <SingleWebinar webinarID={params.webinarID} />
    </>
  );
}

export default Webinar;
