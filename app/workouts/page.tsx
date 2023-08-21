import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import CreateWorkoutModal from "./create-workout-modal"
import Workouts from "./workouts"

export default async function WorkoutsDashboard() {
  const supabase = createServerComponentClient({cookies})
  const {data: { session }} = await supabase.auth.getSession()
  let { data: workout, error } = await supabase
  .from('workout')
  .select()
  .eq('auth_id', session?.user.id)

  return (<>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mt-4 mb-4">
      Workouts
    </h2>
    <Workouts workoutsData={workout}/>
    <CreateWorkoutModal workoutCount={workout?.length} session={session}/>
  </>)
}
