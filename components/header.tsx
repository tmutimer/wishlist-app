'use client'

import React from "react"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
    return (
      <header>
        <h1 className="text-center border font-bold text-xl py-5 bg-white">Wishlist</h1>
        <AuthButton />
      </header>
    )
  }

function AuthButton() {
  const {data: session } = useSession()
  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
