import React from "react";

function ProfileVideoPlaceholder() {
  return (
    <div className="animate-pulse flex items-center border rounded-lg justify-between h-40 my-8 px-5 py-3 bg-white">
      <div className="h-full w-52 bg-slate-700 rounded-lg"></div>
      <div className="flex  h-full items-center">
        <div className="h-full flex flex-col justify-center space-y-2">
          <span className="h-2 w-44 bg-slate-700 rounded-lg"></span>
          <span className="h-2 w-20 bg-slate-700 rounded-lg"></span>
          <span className="h-2 w-12 bg-slate-700 rounded-lg"></span>
        </div>
      </div>
      <div className=" h-full flex items-center">
        <span className="h-14 w-14 bg-slate-700 rounded-lg"></span>
      </div>
    </div>
  );
}

export default ProfileVideoPlaceholder;
