'use client'
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AccountInfo({ user, sessionUserId }: any) {
  const supabase = createClientComponentClient()
  const [username, setUsername] = useState<string>(user.user_name)
  const [displayName, setDisplayName] = useState<string>(user.display_name)
  const [bio, setBio] = useState<string>(user.bio)

  const [loading, setLoading] = useState<boolean>(false)
  // this async needs to be inside useEffect for client compoenents
  async function updateUser({ username, displayName, bio }: {username: string, displayName: string, bio: string}) {
    try {
      setLoading(true)

      let { error } = await supabase.from('user').upsert({
        id: user?.id,
        auth_id: sessionUserId,
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
    }
  }

  return (
    <div className="form-control w-5/6 max-w-lg flex flex-col mt-4">
      <label className="label">
        <span className="label-text text-base">Username</span>
      </label>
      <input
        type="text"
        placeholder="Your username"
        className="input input-bordered w-full max-w-lg"
        id="displayNameInput"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label className="label">
        <span className="label-text text-gray-400 text-xs">{`Username will be used to create your shareable link onlygains.org/${
          username || "username"
        }`}</span>
      </label>

      <label className="label">
        <span className="label-text text-base">Display Name</span>
      </label>
      <input
        type="text"
        placeholder="Your display name"
        className="input input-bordered w-full max-w-lg"
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
        }}
      />
      <label className="label">
        <span className="label-text text-gray-400 text-xs">
          This is the name that will be displayed on your profile
        </span>
      </label>

      <label className="label max-w-lg">
        <span className="label-text text-base">Your bio</span>
        <span className="label-text-alt">Alt label</span>
      </label>
      <textarea
        className="textarea textarea-bordered w-full max-w-lg mb-8"
        placeholder="Bio"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
      ></textarea>

      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => updateUser({ username, displayName, bio })}
      >
        Update
      </button>
    </div>
  );
}
