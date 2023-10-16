"use client";
import { useState, useCallback, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateLink() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const setLink = async () => {
      try {
        setLoading(true);
        const { data: user } = await supabase.auth.getUser();
        console.log("useEffect user >>> ", user);
        let { error } = await supabase.from("links").insert({
          title: title,
          url: url,
        });

        if (error) throw error;
      } catch (error) {
        console.log(error);
        alert("error from creating link");
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return (
    <>
      {editing ? (
            <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body py-2 px-4 gap-0">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold w-5/6 my-1">
              New Link
            </h2>
            <input type="text" placeholder="Title" className="input input-sm input-bordered w-full max-w-xs" />
            <input type="text" placeholder="URL" className="input input-sm input-bordered w-full max-w-xs" />
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
                <button className="btn-xs btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 22"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
      ) : (
        <button className="btn btn-primary" onClick={() => setEditing(true)}>
          Add New Link
        </button>
      )}
    </>
  );
}
