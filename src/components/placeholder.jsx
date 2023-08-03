"use client";

function Placeholder() {
  return (
    <div className="border min-h-[20rem] w-48 flex flex-col animate-pulse cursor-wait">
      <div className="h-40 bg-slate-700"></div>
      <div className="flex flex-col items-center space-y-2 my-4 px-3">
        <div className="h-2 w-full bg-slate-700 rounded"></div>
        <div className="h-2 w-full bg-slate-700 rounded"></div>
        <div className="h-2 w-10 bg-slate-700 rounded"></div>
      </div>
      <div className="flex flex-col space-y-2 my-2 px-3">
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3 bg-slate-700 rounded-sm"></div>
          <div className="h-2 w-full bg-slate-700 rounded"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3 bg-slate-700 rounded-sm"></div>
          <div className="h-2 w-full bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
