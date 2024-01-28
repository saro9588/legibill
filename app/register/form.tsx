'use client'

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function Form() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch('api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        })

    if (response.ok) {
        router.push("/login");
        } else {
          const data = await response.json();
          if (data?.error) {
            setErrorMessage(data.error); // Set error message from API response
          }
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md">
                <h1 className="text-xl">Register an Account</h1>
                <label>Email</label>
                <input name="email" className="border border-black" type="email" required={true}/>
                <label>Password</label>
                <input name="password" className="border border-black"  type="password" required={true}/>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
