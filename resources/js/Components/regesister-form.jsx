"use client";

import { useState } from "react";
import { useForm } from "@inertiajs/react";
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
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    department: "",
    sub_department: "",
    location: "",
    position: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/register", {
      onSuccess: () => toast.success("Register berhasil 🎉"),
      onError: () => toast.error("Gagal mendaftar ❌"),
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
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0A1A2F]">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Register to access Ticketing System
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input
            placeholder="Salis Ahmad"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Department */}
        <div className="grid gap-2">
          <Label>Department</Label>
          <Select onValueChange={(v) => setData("department", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GAR Site Management">GAR Site Management</SelectItem>
              <SelectItem value="GAR UOM">GAR UOM</SelectItem>
              <SelectItem value="SNT">SNT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sub Department */}
        <div className="grid gap-2">
          <Label>Sub Department</Label>
          <Select onValueChange={(v) => setData("sub_department", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Sub Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GSM">GSM</SelectItem>
              <SelectItem value="Site Support">Site Support</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="grid gap-2">
          <Label>Location / Gateway</Label>
          <Select onValueChange={(v) => setData("location", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gateway" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GW01 - Batam">GW 01 Batam</SelectItem>
              <SelectItem value="GW02 - Cikarang">GW 02 Cikarang</SelectItem>
              <SelectItem value="GW03 - Pontianak">GW 03 Pontianak</SelectItem>
              <SelectItem value="GW04 - Banjarmasin">GW 04 Banjarmasin</SelectItem>
              <SelectItem value="GW05 - Tarakan">GW 05 Tarakan</SelectItem>
              <SelectItem value="GW06 - Manado">GW 06 Manado</SelectItem>
              <SelectItem value="GW07 - Kupang">GW 07 Kupang</SelectItem>
              <SelectItem value="GW08 - Ambon">GW 08 Ambon</SelectItem>
              <SelectItem value="GW09 - Manokwari">GW 09 Manokwari</SelectItem>
              <SelectItem value="GW10 - Timika">GW 10 Timika</SelectItem>
              <SelectItem value="GW11 - Jayapura">GW 11 Jayapura</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Position */}
        <div className="grid gap-2">
          <Label>Position</Label>
          <Select onValueChange={(v) => setData("position", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Asst Manager">Asst Manager</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Password */}
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
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label>Re-type Password</Label>
          <div className="relative">
            <Input
              type={showPassword2 ? "text" : "password"}
              placeholder="••••••••"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
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

        {/* Submit */}
        <Button className="w-full" disabled={processing}>
          {processing ? "Processing..." : "Create Account"}
        </Button>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <a href="/" className="underline hover:text-primary">Login</a>
        </p>
      </form>
    </div>
  );
}
