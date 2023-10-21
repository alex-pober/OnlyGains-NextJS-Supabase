import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "./link"
import CreateLink from "./create-link"

export default async function Links(){
  const supabase = createServerComponentClient({cookies})
  const {data: { session }} = await supabase.auth.getSession()
  const {data: links} = await supabase
    .from("links")
    .select()
    .eq('auth_id', session?.user.id)

  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mt-4 mb-4">
        Links
      </h2>

      <CreateLink />
      <div className="links flex flex-col gap-2">
        {links?.map((link) => {
          return (
            <>
              <Link title={link.title} url={link.url}/>
            </>
          )
        })}
      </div>
    </>
  )
}
