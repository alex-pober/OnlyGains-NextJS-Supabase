import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import CreateWorkoutModal from "./create-workout-modal"

export default async function Workouts() {
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
    <CreateWorkoutModal workoutCount={workout?.length} session={session}/>
  </>)
}
