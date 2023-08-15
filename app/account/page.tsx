export default function Account(){


  return(
    <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
  </label>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <label className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </label>
</div>
  )
}
