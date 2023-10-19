"use client";
import { useState, useCallback, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateLink() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authId, setAuthId] = useState<string>("")
  const [title, setTitle] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  console.log(authId)
  const setLink = async () => {
    try {
      setLoading(true);
      const { data: user, error } = await supabase
        .from("user")
        .select('id')
        .eq("auth_id", authId)
        .single();

      if (error) {
        throw error;
      }

      if (user) {
        const { error: linkError } = await supabase.from("links").upsert([
          {
            title: title,
            url: url,
            user_id: user.id,
          },
        ]);

        if (linkError) {
          throw linkError;
        }
      }
    } catch (error) {
      console.log(error);
      alert("error from creating link");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserAuth = async () => {
      const { data: userAuth } = await supabase.auth.getUser()
      if (userAuth) {
        setAuthId(userAuth.user!.id)
      }
    }

    getUserAuth()
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-sm input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </div>
              <div className="card-actions w-20 flex-col space-y-1 items-center">
                <button className="btn btn-sm btn-primary w-full"
                  onClick={() => setLink()}
                >Add</button>
                <button className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setEditing(false)
                    setTitle("")
                    setURL("")
                  }}
                >Cancel</button>
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
