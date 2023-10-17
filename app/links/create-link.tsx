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
          <div className="card-body p-4 gap-1">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mb-2">
              New Link
            </h2>
            <div className="card-inputs-and-actions flex mb-1 gap-2">
              <div className="card-inputs flex flex-col gap-3 w-full">
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="URL"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </div>
              <div className="card-actions w-20 flex-col space-y-1 items-center">
                <button className="btn btn-sm btn-primary w-full">Add</button>
                <button className="btn btn-sm btn-ghost">Cancel</button>
              </div>
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
