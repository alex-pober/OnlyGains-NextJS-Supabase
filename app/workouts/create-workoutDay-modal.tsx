import { useState, useCallback, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type WorkoutDay = {
  description: string | null
  id: number | null
  title: string
  workout_id: number | null
}

export default function CreateWorkoutDayModal(){
  const supabase = createClientComponentClient()
  const myModal = useRef<HTMLDialogElement>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // async function createWorkoutDay({ title, description}: WorkoutDay) {
  //   try {
  //     setLoading(true)

  //     let { error } = await supabase.from('workout_day').insert({
  //       auth_id: session.user.id,
  //       title: title,
  //       description: description,
  //       order: workoutCount + 1
  //     })
  //     if (error) throw error
  //     alert('Profile updated!')
  //   } catch (error) {
  //     console.log(error)
  //     alert('Error updating the data!')
  //   } finally {
  //     setTitle("")
  //     setDescription("")
  //     setLoading(false)
  //   }
  // }

  return (
    <>
    {/* Open the modal using ID.showModal() method */}
    <dialog id="my_modal_3" className="modal" ref={myModal}>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            // onClick={() => createWorkoutDay({title, description})}
          >Create</button>
        </div>
      </form>
    </dialog>
    <button
      className="btn btn-neutral"
      onClick={() => myModal.current?.showModal()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
      New Workout
    </button>
  </>
  )
}
