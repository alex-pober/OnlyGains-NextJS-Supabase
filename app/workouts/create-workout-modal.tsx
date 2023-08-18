"use client";
import { useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateWorkoutModal({session, workoutCount}: any) {
  const supabase = createClientComponentClient()
  const [title, setTitle] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function createWorkout({ title, notes }: {title: string, notes: string}) {
    try {
      setLoading(true)

      let { error } = await supabase.from('workout').insert({
        auth_id: session.user.id,
        title: title,
        notes: notes,
        order: workoutCount + 1
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
      alert('Error updating the data!')
    } finally {
      setTitle("")
      setNotes("")
      setLoading(false)
    }
  }


  return (
    <>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg mb-4">Create Workout</h3>
          <input
            type="text"
            placeholder="Workout title"
            className="input input-bordered w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Workout notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => createWorkout({title, notes})}
            >Create</button>
          </div>
        </form>
      </dialog>
      <button
        className="btn btn-neutral"
        onClick={() => window.my_modal_3.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        New Workout
      </button>
    </>
  );
}
