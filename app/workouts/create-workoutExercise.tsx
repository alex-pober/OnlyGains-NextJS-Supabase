"use client";
import { useState, useCallback, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateWorkoutExercise() {
  const [addingExercise, setAddingExercise] = useState<boolean>(false);
  const [exercise, setExercise] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const supabase = createClientComponentClient();
  console.log(addingExercise);
  return (
    <>
      {addingExercise ? (
        <>
          <div className="inputs flex gap-5 mt-3">
            <input
              type="text"
              placeholder="Exercise"
              className="input input-sm input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Reps"
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>
          <div className="editing-buttons flex justify-evenly mt-3">
            <button className="btn btn-outline btn-error btn-sm"
              onClick={() => setAddingExercise(false)}
            >Cancel</button>
            <button className="btn btn-sm btn-accent">Add</button>
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
