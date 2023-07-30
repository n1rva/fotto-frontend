"use client";

import AuthContext from "@/context/AuthContext";
import useDebounce from "@/utils/useDebounce";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function UserManagement({ access_token }) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchTerm = useDebounce(searchQuery, 200);

  const { searchUsers, searchResults, setSearchResults, error, clearErrors } =
    useContext(AuthContext);

  const handleUserSearch = async (query) => {
    const response = await searchUsers(query, access_token);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      handleUserSearch(debouncedSearchTerm);
      // setSearchIsLoading(false);
    } else {
      // setSearchIsLoading(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative my-3 ">
      <div className="space-y-5">
        <label htmlFor="addParticipants" className="text-lg font-medium my-3">
          Kullanıcı bul
        </label>
        <input
          type="search"
          id="addParticipants"
          name="addParticipants"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
        />
      </div>
      <div class="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
        <div class="cursor-pointer ">
          {searchResults?.map((user) => {
            return (
              <Link
                href={`fotto/users/${user.id}`}
                className="py-2 px-3 flex flex-col text-sm font-medium text-gray-600 hover:bg-slate-100"
              >
                <span>{`${user.first_name} ${user.last_name}`}</span>
                <span>{`${user.email}`}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
