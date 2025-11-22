"use client";

import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function RegisterForm({ className, ...props }) {
  // Ambil dropdown dari backend
  const { departments, sub_departments, gateways, positions } = usePage().props;

  // Form state
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    department_id: "",
    sub_department_id: "",
    gateway_id: "",
    position_id: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // VALIDATION FE
  const validate = () => {
    if (!data.name.trim()) return "Full name is required";
    if (!data.email.includes("@")) return "Invalid email format";

    if (!data.department_id) return "Department is required";
    if (!data.sub_department_id) return "Sub department is required";
    if (!data.gateway_id) return "Location / Gateway is required";
    if (!data.position_id) return "Position is required";

    if (data.password.length < 6)
      return "Password must be at least 6 characters";

    if (data.password !== data.password_confirmation)
      return "Password confirmation does not match";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return toast.error(err);

    post("/register", {
      preserveScroll: true,
      onSuccess: () => toast.success("Register berhasil 🎉"),
      onError: () => toast.error("Gagal mendaftar ❌ periksa kembali data Anda"),
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 px-4 py-6 sm:px-6 w-full max-w-md mx-auto",
        className
      )}
      {...props}
    >
      <div className="text-center mb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0A1A2F]">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Register to access Ticketing System
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME */}
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input
            placeholder="Salis Ahmad"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* EMAIL */}
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="user@appcare.id"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* DEPARTMENT */}
        <div className="grid gap-2">
          <Label>Department</Label>
          <Select
            value={data.department_id}
            onValueChange={(v) => setData("department_id", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d.id} value={String(d.id)}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department_id && (
            <p className="text-red-500 text-sm">{errors.department_id}</p>
          )}
        </div>

        {/* SUB DEPARTMENT */}
        <div className="grid gap-2">
          <Label>Sub Department</Label>
          <Select
            value={data.sub_department_id}
            onValueChange={(v) => setData("sub_department_id", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Sub Department" />
            </SelectTrigger>
            <SelectContent>
              {sub_departments.map((s) => (
                <SelectItem key={s.id} value={String(s.id)}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sub_department_id && (
            <p className="text-red-500 text-sm">{errors.sub_department_id}</p>
          )}
        </div>

        {/* LOCATION */}
        <div className="grid gap-2">
          <Label>Location / Gateway</Label>
          <Select
            value={data.gateway_id}
            onValueChange={(v) => setData("gateway_id", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gateway" />
            </SelectTrigger>
            <SelectContent>
              {gateways.map((g) => (
                <SelectItem key={g.id} value={String(g.id)}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gateway_id && (
            <p className="text-red-500 text-sm">{errors.gateway_id}</p>
          )}
        </div>

        {/* POSITION */}
        <div className="grid gap-2">
          <Label>Position</Label>
          <Select
            value={data.position_id}
            onValueChange={(v) => setData("position_id", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position_id && (
            <p className="text-red-500 text-sm">{errors.position_id}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="grid gap-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="grid gap-2">
          <Label>Re-type Password</Label>
          <div className="relative">
            <Input
              type={showPassword2 ? "text" : "password"}
              placeholder="••••••••"
              value={data.password_confirmation}
              onChange={(e) =>
                setData("password_confirmation", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-2.5"
            >
              {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button className="w-full" disabled={processing}>
          {processing ? "Processing..." : "Create Account"}
        </Button>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <a href="/" className="underline hover:text-primary">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
