"use client"

import { trpc } from "@/client/trpc"
import { useEffect, useState } from "react"

export function Greeting() {
  const [mounted, setMounted] = useState(false)
  const { data, error, isLoading } = trpc.greet.useQuery(undefined, {
    enabled: mounted, // Only run query after component mounts on client
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isLoading && "Loading..."}
      {error && `Error loading: ${error.message}`}
      {data && data}
    </div>
  )
}
