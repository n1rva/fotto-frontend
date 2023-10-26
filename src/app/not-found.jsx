import Link from "next/link";

function NotFound() {
  return (
    <>
      <main className="min-h-screen p-3 mx-auto container max-w-lg flex flex-col items-center mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="font-medium text-xl">Bu sayfa bulunamadı.</h1>
        <Link
          href={"/"}
          className="flex w-fit px-2 py-1 mt-4 border border-fottoText text-white bg-fottoOrange rounded-lg"
        >
          Ana sayfaya dön
        </Link>
      </main>
    </>
  );
}

export default NotFound;
