'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function WorkoutDay({workoutID}: any) {
  const supabase = createClientComponentClient()

  // let {data: workout_day, error} = await supabase
  // .from ('workout_day')
  // .select()
  // .eq('workout_id', workoutID)

  return (
    <div className="hero min-h-fit bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Start by adding days</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
