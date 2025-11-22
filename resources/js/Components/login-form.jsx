"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function LoginForm({ className, ...props }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [localErrors, setLocalErrors] = useState({})

  // ==========================
  // FRONTEND VALIDATION
  // ==========================
  const validate = () => {
    const newErrors = {}

    if (!data.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!data.password) newErrors.password = "Password is required"

    setLocalErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      toast.error("Please check the form again ❌")
      return
    }

    post("/login", {
      preserveScroll: true,

      onSuccess: () => {
        toast.success("Berhasil login 👋")
      },

      onError: (err) => {
        // Handle error spesifik
        if (errors.rate) {
          toast.error(errors.rate)
        } else if (errors.email || errors.password) {
          toast.error("Email atau password salah ❌")
        } else {
          toast.error("Gagal login. Coba lagi.")
        }
      },
    })
  }

  // Merge FE + BE errors
  const getError = (field) => localErrors[field] || errors[field]

  return (
    <div
      className={cn(
        "flex flex-col gap-6 px-4 py-6 sm:px-6 w-full max-w-sm mx-auto",
        className
      )}
      {...props}
    >
      {/* GLOBAL ERROR SERVER / RATE LIMIT */}
      {(errors.server || errors.rate) && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-2 rounded text-sm">
          {errors.server || errors.rate}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
            Welcome to Ticketing System
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Please login to continue
          </p>
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@appcare.id"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            disabled={processing}
          />
          {getError("email") && (
            <p className="text-sm text-red-500">{getError("email")}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              disabled={processing}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {getError("password") && (
            <p className="text-sm text-red-500">{getError("password")}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right -mt-2">
          <a
            href="/forgot-password"
            className="text-xs sm:text-sm text-primary underline hover:text-primary/80"
          >
            Forgot your password?
          </a>
        </div>

        {/* Login button */}
        <Button
          type="submit"
          className="w-full h-11 text-sm sm:text-base"
          disabled={processing}
        >
          {processing ? "Memproses..." : "Login"}
        </Button>

        {/* Separator */}
        <div className="relative text-center text-xs sm:text-sm mt-4 after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid gap-3 sm:grid-cols-2 mt-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <span className="font-semibold"></span> Continue with Apple
          </Button>

          <Button variant="outline" className="w-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </form>

      {/* Register Link */}
      <div className="text-center text-xs sm:text-sm text-muted-foreground mt-2">
        Dont have an account?{" "}
        <a href="/register" className="font-medium text-primary hover:underline">
          Register now
        </a>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] sm:text-xs text-muted-foreground mt-3 leading-relaxed">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
