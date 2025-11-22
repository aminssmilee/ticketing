"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ForgotPassword() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  })

  const [localErrors, setLocalErrors] = useState({})

  // ==============================
  // FRONTEND VALIDATION
  // ==============================
  const validate = () => {
    const newErrors = {}

    if (!data.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format"
    }

    setLocalErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ==============================
  // SUBMIT
  // ==============================
  const submit = (e) => {
    e.preventDefault()

    if (!validate()) {
      toast.error("Please check your input ❌")
      return
    }

    post("/forgot-password", {
      preserveScroll: true,

      onSuccess: () => {
        toast.success("Link reset dikirim ke email kamu 📩")
        setData("email", "")
      },

      onError: () => {
        toast.error("Email tidak ditemukan ❌")
      },
    })
  }

  const getError = (field) => localErrors[field] || errors[field]

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4 sm:px-0">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

        <p className="text-sm text-muted-foreground text-center">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          
          {/* EMAIL */}
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="your@email.com"
              disabled={processing}
              className={getError("email") ? "border-red-500" : ""}
            />
            {getError("email") && (
              <p className="text-red-500 text-sm">{getError("email")}</p>
            )}
          </div>

          {/* BUTTON */}
          <Button
            className="w-full h-11 text-sm"
            disabled={processing}
          >
            {processing ? "Sending..." : "Send Reset Link"}
          </Button>

        </form>

        {/* Back to login */}
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <a href="/login" className="text-primary underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
