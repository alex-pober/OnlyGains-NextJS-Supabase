"use client";
import { useState, useCallback, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateWorkoutModal({session, workoutCount}: any) {
  const supabase = createClientComponentClient()
  const myModal = useRef<HTMLDialogElement>(null)
  const [title, setTitle] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [loading, setLoading] = useState(false)
  // this async need to be moved inside useEffect for client compoenents
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
      <dialog id="create_workout_modal" className="modal" ref={myModal}>
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
      <a
        className={"tab transition-transform px-1 bg-transparent"}
        data-tip="hello"
        onClick={() => myModal.current?.showModal()}
      >
          <div className="tooltip" data-tip="Add Workout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </a>
    </>
  );
}
