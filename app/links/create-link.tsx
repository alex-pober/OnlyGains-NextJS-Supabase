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
        <>editing </>
      ) : (
        <button className="btn btn-primary" onClick={() => setEditing(true)}>
          Add New Link
        </button>
      )}
    </>
  );
}
