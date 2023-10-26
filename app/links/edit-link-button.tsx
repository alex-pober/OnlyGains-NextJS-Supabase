"use client";
import { useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation"

export default function EditLinkButton({
  linkId,
  linkTitle,
  linkUrl,
}: {
  linkId: number;
  linkTitle: string;
  linkUrl: string;
}) {
  const supabase = createClientComponentClient();
  const myModalLink = useRef<HTMLDialogElement>(null);
  const router = useRouter()

  const [title, setTitle] = useState<string>(linkTitle);
  const [url, setUrl] = useState<string>(linkUrl);

  const updateLink = async () => {
    try {
      const { error } = await supabase
      .from("links")
      .update({ title: title, url: url })
      .eq("id", linkId);

      if (error) {throw error}
    } catch (error) {
      console.log(error)
    } finally {
      router.refresh()
    }

  }

  const openModal = (e: any) => {
    e.stopPropagation()
    myModalLink.current?.showModal();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    updateLink()
  }
  return (
      <div onClick={openModal}>
        <dialog id="edit_link_modal" className="modal" ref={myModalLink}>
          <div className="modal-box flex flex-col gap-1 items-center">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mb-2">
                Edit Link
              </h2>
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
                onChange={(e) => setUrl(e.target.value)}
                className="input input-sm input-bordered w-full max-w-xs"
                required
              />
              <button
                className="btn btn-sm btn-primary"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 w-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />{" "}
        </svg>
        Edit
      </div>
  );
}
