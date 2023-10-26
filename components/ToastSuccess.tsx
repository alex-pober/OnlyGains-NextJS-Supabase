'use client'
import {useState, useEffect} from 'react'

export default function ToastSuccess({message}: {message: string}){
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    if (message.length > 1){
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 2000);
    }
  }, [message]);

  return(
    <div className={isVisible ? "toast toast-start z-50" : "hidden"}>
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  )
}
