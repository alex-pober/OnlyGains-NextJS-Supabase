"use client";
import { useState, useCallback, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type DayExercise = {
  exercise: string
  reps: string | null
}

export default function CreateWorkoutExercise({workoutDayId}: any) {
  const [addingExercise, setAddingExercise] = useState<boolean>(false);
  const [exercise, setExercise] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient();

  async function createDayExercise({exercise, reps}: DayExercise){
    try {
      setLoading(true)

      let { error } = await supabase.from('workout_day_exercise').insert({
        workout_day_id: workoutDayId,
        exercise: exercise,
        reps: reps,
      })
      if (error) throw error
    } catch (error) {
      console.log(error)
      alert('Error updating the data!')
    } finally {
      setExercise('')
      setReps('')
      setLoading(false)
    }
  }
  return (
    <>
      {addingExercise ? (
        <>
          <div className="inputs flex gap-5 mt-3">
            <input
              type="text"
              placeholder="Exercise"
              className="input input-sm input-bordered w-full max-w-xs"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            />
            <input
              type="text"
              placeholder="Reps"
              className="input input-sm input-bordered w-full max-w-xs"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div className="editing-buttons flex justify-evenly mt-3">
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={() => setAddingExercise(false)}
            >Cancel</button>
            <button
              className="btn btn-sm btn-accent"
              onClick={() => createDayExercise({exercise, reps})}
            >Add</button>
          </div>
        </>
      ) : (
        <button
          className="btn btn-sm btn-outline mx-auto mt-3 flex"
          onClick={() => setAddingExercise((prev) => !prev)}
        >
          Add Exercise
        </button>
      )}
    </>
  );
}
