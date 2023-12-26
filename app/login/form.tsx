'use client'

import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Form() {
    const router = useRouter()
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })

   if (response?.error) {
      {
        setError("Invalid email/password.");
      }
        }
    }
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md">
            <h1 className="text-xl">Login to an existing Account</h1>
            <label>Email</label>
            <input name="email" className="border border-black" type="email"/>
            <label>Password</label>
            <input name="password" className="border border-black"  type="password"/>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit">Submit</button>
        </form>
    )
}
