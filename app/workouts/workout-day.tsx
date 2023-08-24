'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default function WorkoutDay({workoutID}: any) {
  const supabase = createClientComponentClient()

  // let {data: workout_day, error} = await supabase
  // .from ('workout_day')
  // .select()
  // .eq('workout_id', workoutID)

  return (
    // Message for empty workoutDay
    <div className="hero min-h-min bg-base-200 my-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Begin by Adding Workout Days</h1>
          <p className="py-6">
          Let's dive in! Begin by building your workout routine one day at a time.
          Once you've set up your days, you can easily add exercises to make
           each day.
          </p>
          <button className="btn btn-primary">Add Day</button>
        </div>
      </div>
    </div>
  );
}
