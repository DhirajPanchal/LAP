// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("lap_user") || "{}")
    switch (user.role) {
      case "VERIFIER":
        router.replace("/verification")
        break
      case "EVALUATOR":
        router.replace("/evaluation")
        break
      case "UNDERWRITER":
        router.replace("/underwriting")
        break
      case "ADMIN":
        router.replace("/admin")
        break
      default:
        router.replace("/unauthorized")
    }
  }, [])

  return null
}
