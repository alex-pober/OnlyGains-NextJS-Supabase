"use client";
import { useState, useCallback, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation"

export default function CreateLink() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authId, setAuthId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter()

  const setLink = async () => {
    try {
      setLoading(true);
      //1st we match the auth id with logged in user and get users' ID from supabase
      const { data: user, error } = await supabase
        .from("user")
        .select("id")
        .eq("auth_id", authId)
        .single();

      if (error) {
        throw error;
      }

      //2nd when userID is found, we INSERT the link
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
      setTitle("");
      setURL("");
      setEditing(false);
      setLoading(false);
      router.refresh()
    }
  };

  useEffect(() => {
    const getUserAuth = async () => {
      const { data: userAuth } = await supabase.auth.getUser();
      if (userAuth) {
        setAuthId(userAuth.user!.id);
      }
    };

    getUserAuth();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLink()
  }

  return (
    <>
      {editing ? (
        <div className="card w-96 bg-neutral text-neutral-content mb-2 ">
          <div className="card-body p-4 gap-1">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mb-2">
              New Link
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="card-inputs-and-actions flex mb-1 gap-2">
                <div className="card-inputs flex flex-col gap-3 w-full">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-sm input-bordered w-full max-w-xs"
                    required
                  />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                    className="input input-sm input-bordered w-full max-w-xs"
                    required
                  />
                </div>

                <div className="card-actions w-20 flex-col space-y-1 items-center">
                  <button
                    className="btn btn-sm btn-primary w-full"
                    type="submit"
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => {
                      setEditing(false);
                      setTitle("");
                      setURL("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary mb-5" onClick={() => setEditing(true)}>
          Add New Link
        </button>
      )}
    </>
  );
}
