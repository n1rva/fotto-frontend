"use client";

import useDebounce from "@/utils/useDebounce";
import { useContext, useEffect, useState } from "react";

import VideoContext from "@/context/VideoContext";
import ManageSingleVideo from "@/components/admin/video/manageSingleVideo";

function SearchVideos({ access_token }) {
  const { searchVideo } = useContext(VideoContext);

  const [videoQuery, setVideoQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  const searchVideoByQuery = async (query) => {
    setisLoading(true);
    const videos = await searchVideo(access_token, query);

    if (videos.length) {
      setSearchResults(videos);
    }
    setisLoading(false);
  };

  const debouncedSearchTerm = useDebounce(videoQuery, 200);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      searchVideoByQuery(debouncedSearchTerm);
      // setSearchIsLoading(false);
    } else {
      // setSearchIsLoading(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <div className="relative">
        <div className="flex flex-col relative items-center">
          <div className="flex flex-col relative space-y-3">
            <label htmlFor="searchvideo" className="text-sm">
              Webinar kaydı ara
            </label>
            <input
              type="text"
              name="searchvideo"
              id="searchvideo"
              value={videoQuery}
              onChange={(e) => setVideoQuery(e.target.value)}
              className="w-full h-12 p-3 pr-12 text-black border border-secBlue rounded-md focus:outline-none lg:w-80"
              placeholder="Webinar Kaydı"
              autoComplete="off"
            />
            {isLoading && (
              <div
                aria-label="Loading..."
                role="status"
                className="absolute right-3 top-1/2"
              >
                <svg
                  class="animate-spin w-6 h-6 fill-iconBlue"
                  viewBox="3 3 18 18"
                >
                  <path
                    className="opacity-20"
                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                  ></path>
                  <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full my-8">
          {searchResults.length > 0 &&
            searchResults.map((video) => {
              const { id, thumbnail, title, instructor, date } = video;
              return (
                <ManageSingleVideo
                  key={id}
                  id={id}
                  thumbnail={thumbnail}
                  title={title}
                  instructor={instructor}
                  date={date}
                  access_token={access_token}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchVideos;
