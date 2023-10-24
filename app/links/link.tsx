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
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body py-2 px-4 gap-0">
        <h2 className="card-title">{title}</h2>
        <p className="text-slate-400">{url}</p>
        <div className="card-actions justify-end">
          <button className="btn-xs btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
            {children}
        </div>
      </div>

    </div>
  );
}
