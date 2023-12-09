function ProfileWebinarPlaceholder() {
  return (
    <div className="animate-pulse flex items-center border rounded-lg  justify-between h-16 my-1 bg-white">
      <div className="flex px-8 basis-6/12 h-full items-center">
        <div className="h-full flex flex-col justify-center space-y-2">
          <span className="h-2 w-44 bg-slate-700 rounded-lg"></span>
          <span className="h-2 w-20 bg-slate-700 rounded-lg"></span>
          <span className="h-2 w-12 bg-slate-700 rounded-lg"></span>
        </div>
      </div>
      <div className="basis-3/12 h-full flex items-center">
        <span className="h-2 w-28 bg-slate-700 rounded-lg"></span>
      </div>
      <div className="basis-2/12 h-full flex items-center">
        <span className="h-2 w-24 bg-slate-700 rounded-lg"></span>
      </div>
      <div className="basis-1/12 h-full w-20 bg-slate-700 rounded-lg"></div>
    </div>
  );
}

export default ProfileWebinarPlaceholder;
