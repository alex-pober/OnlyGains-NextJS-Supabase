import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Links(){
  const supabase = createServerComponentClient({cookies})
  const {data: { session }} = await supabase.auth.getSession()

  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mt-4 mb-4">
        Links
      </h2>

      <button className="btn btn-primary">Add New Link</button>
    </>
  )
}
