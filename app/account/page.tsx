import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import AccountInfo from './account-info'

export const dynamic = 'force-dynamic'

export default async function Account(){
  const supabase = createServerComponentClient({cookies})
  const {data: { session }} = await supabase.auth.getSession()

  let { data: user, error } = await supabase
  .from('user')
  .select()
  .eq('auth_id', session?.user.id)
  .single()

  return(<>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mt-4 mb-4">
        Account
    </h2>
    <AccountInfo sessionUserId={session?.user.id} user={user}/>
  </>)
}
