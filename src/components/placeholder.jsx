function Placeholder() {
  return (
    <div className="min-w-[18rem] w-72 border border-transparent rounded-xl flex flex-col animate-pulse bg-[#CFE2F3]">
      <div className="m-3 rounded-lg h-52 bg-slate-700"></div>
      <div className="flex flex-col space-y-3 my-4 px-8">
        <div className="h-2 w-full bg-slate-700 rounded"></div>
        <div className="h-2 w-44 bg-slate-700 rounded"></div>
        <div className="h-2 w-16 bg-slate-700 rounded"></div>
      </div>
      <div className="flex flex-col space-y-8 my-8 px-8">
        <div className="flex items-center space-x-1">
          <div className="h-2 w-full bg-slate-700 rounded"></div>
        </div>
        <div className="flex justify-end space-x-1">
          <div className="h-3 w-12 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
