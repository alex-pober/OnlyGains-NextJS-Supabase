'use client'
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function SetUpForm({session}: any) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  // this async need to be inside useEffect for client components
  async function updateUser({ username, displayName, bio }: {username: string, displayName: string, bio: string}) {
    try {
      setLoading(true)

      let { error } = await supabase.from('user').insert({
        user_name: username,
        display_name: displayName,
        bio: bio
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
      alert('Error updating the data!')
    } finally {
      setLoading(false)
      router.push(`/dashboard`)
    }
  }

  console.log(session.user.id)
  return (
    <div className="form-control w-5/6 max-w-lg flex flex-col mt-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8">
        Lets set up your account
      </h2>

      <label className="label">
        <span className="label-text text-base">Username</span>
      </label>
      <input
        type="text"
        placeholder="Your username"
        className="input input-bordered w-full max-w-lg"
        id="displayNameInput"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
      />
      <label className="label">
        <span className="label-text text-gray-400 text-xs">{`Username will be used to create your shareable link onlygains.org/${username || "username"}`}</span>
      </label>

      <label className="label">
        <span className="label-text text-base">Display Name</span>
      </label>
      <input
        type="text"
        placeholder="Your display name"
        className="input input-bordered w-full max-w-lg"
        value={displayName}
        onChange={(e) => {setDisplayName(e.target.value)}}
      />
      <label className="label">
        <span className="label-text text-gray-400 text-xs">This is the name that will be displayed on your profile</span>
      </label>

      <label className="label max-w-lg">
        <span className="label-text text-base">Your bio</span>
        <span className="label-text-alt">Alt label</span>
      </label>
      <textarea
        className="textarea textarea-bordered w-full max-w-lg mb-8"
        placeholder="Bio"
        value={bio}
        onChange={(e) => {setBio(e.target.value)}}
      ></textarea>

      <button
      className="btn btn-primary"
      disabled={loading}
      onClick={() => updateUser({username, displayName, bio})}
      >
        Submit
      </button>
    </div>
  );
}
