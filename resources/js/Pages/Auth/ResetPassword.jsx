"use client"
import { useForm } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ResetPassword({ token }) {
  const { data, setData, post, processing, errors } = useForm({
    token,
    email: "",
    password: "",
    password_confirmation: "",
  })

  const submit = (e) => {
    e.preventDefault()

    post("/reset-password", {
      onSuccess: () => toast.success("Password berhasil direset ✔"),
      onError: () => toast.error("Gagal reset password ❌"),
    })
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-5">
      <h1 className="text-xl font-bold">Reset Password</h1>

      <form onSubmit={submit} className="space-y-4">

        <div>
          <Label>Email</Label>
          <Input value={data.email} onChange={(e) => setData("email", e.target.value)} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <Label>Password</Label>
          <Input value={data.password} type="password" onChange={(e) => setData("password", e.target.value)} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input value={data.password_confirmation} type="password" onChange={(e) => setData("password_confirmation", e.target.value)} />
        </div>

        <Button disabled={processing} className="w-full">
          {processing ? "Updating..." : "Reset Password"}
        </Button>
      </form>
    </div>
  )
}
