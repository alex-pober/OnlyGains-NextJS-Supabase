import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "./link"
import CreateLink from "./create-link"

export default async function Links(){
  const supabase = createServerComponentClient({cookies})
  const {data: { session }} = await supabase.auth.getSession()

  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mt-4 mb-4">
        Links
      </h2>

      <CreateLink />
      {/* <Link title="OnlyGains" url="www.onlygains.com"/> */}
    </>
  )
}
