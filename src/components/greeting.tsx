"use client"

import { trpc } from "@/client/trpc"
import { useEffect, useState } from "react"

export function Greeting() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the tRPC component after mounting
  if (!mounted) {
    return (
      <div>
        Welcome to Gibson&apos;s Next.js Template! This guide will help you start building your type-safe full stack
        TypeScript application using the Gibson client to store and retrieve your data.
      </div>
    )
  }

  return <GreetingContent />
}

function GreetingContent() {
  const { data, error, isLoading } = trpc.greet.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        Welcome to Gibson&apos;s Next.js Template! This guide will help you start building your type-safe full stack
        TypeScript application using the Gibson client to store and retrieve your data.
      </div>
    )
  }

  return <div>{data}</div>
}
