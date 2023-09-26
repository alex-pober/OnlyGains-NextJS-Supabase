'use client'
import { useState, useCallback, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import WorkoutDay from "./workout-day";

type WorkoutDay = {
  description: string | null
  title: string
}

export default function CreateWorkoutDayModal({workoutId}: any){
  const supabase = createClientComponentClient()
  const myModal = useRef<HTMLDialogElement>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function createWorkoutDay({ title, description}: WorkoutDay) {
    try {
      setLoading(true)

      let { error } = await supabase.from('workout_day').insert({
        workout_id: workoutId,
        title: title,
        description: description,
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
      alert('Error updating the data!')
    } finally {
      setTitle("")
      setDescription("")
      setLoading(false)
    }
  }

  return (
    <>
    {/* Open the modal using ID.showModal() method */}
    <dialog id="my_modal_3" className="modal" ref={myModal}>
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg mb-4">Add Day</h3>
        <input
          type="text"
          placeholder="Day Title"
          className="input input-bordered w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Day Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => createWorkoutDay({title, description})}
          >Add</button>
        </div>
      </form>
    </dialog>
    <button
      className="btn btn-primary"
      onClick={() => myModal.current?.showModal()}
    >
      Add Day
    </button>
  </>
  )
}
