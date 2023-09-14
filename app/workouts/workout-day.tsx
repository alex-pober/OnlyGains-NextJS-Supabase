'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import CreateWorkoutDayModal from "./create-workoutDay-modal"
import { useEffect, useState } from "react"

export default function WorkoutDay({workoutId}: any) {
  const [workoutDays, setWorkoutDays] = useState<any[]>([])

  const supabase = createClientComponentClient()

  // async function getWorkoutDay (workoutId: number) {
  //   try {
  //     let {data: workout_day, error} = await supabase
  //     .from ('workout_day')
  //     .select()
  //     .eq('workout_id', workoutId)
  //     if (error) throw error

  //     return workout_day
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //   }
  // }

  useEffect(() => {
    const getWorkoutDays = async () => {
      const {data} = await supabase
      .from ('workout_day')
      .select()
      .eq('workout_id', workoutId)

      if (data) {
        console.log(data)
        setWorkoutDays(data)
      }
    }

    getWorkoutDays()
  }, [workoutId])

  return (
    // Message for empty workoutDay
    <div className="hero min-h-min bg-base-200 my-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Start Filling Out Your Workout</h1>
          <p className="py-6">
          Begin by building your workout routine one day at a time.
          Once you've set up your days, you can easily add exercises to
           each day.
          </p>
          <CreateWorkoutDayModal workoutId={workoutId}/>
        </div>
      </div>
    </div>
  );
}
