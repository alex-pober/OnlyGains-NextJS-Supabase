export default async function Link({
  title,
  url,
  children,
}: {
  title: string;
  url: string;
  children?: any;
}) {
  return (
    <div className="card w-96 bg-neutral text-neutral-content flex flex-row items-center">
      <div className="card-body py-2 px-4 gap-0">
        <h2 className="card-title">{title}</h2>
        <p className="text-slate-400">{url}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn-xs btn-square">
          </button>
        </div> */}
      </div>
      {children}

    </div>
  );
}
