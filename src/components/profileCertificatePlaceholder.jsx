function ProfileCertificatePlaceholder() {
  return (
    <div className="rounded-md flex flex-col animate-pulse min-h-[9rem] h-fit items-center text-center w-72 border px-4 py-6 text-xs font-bold space-y-2 select-none product">
      <div className="h-8 w-8 bg-slate-700 rounded-md" />
      <div className="px-4 flex flex-col space-y-2 items-center">
        <div className="h-2 w-40 rounded-lg bg-slate-700"></div>
        <div className="h-2 w-32 rounded-lg bg-slate-700"></div>
        <div className="h-2 w-24 rounded-lg bg-slate-700"></div>
      </div>
    </div>
  );
}

export default ProfileCertificatePlaceholder;
