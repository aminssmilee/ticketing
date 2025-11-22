"use client";

import { RegisterForm } from "@/Components/regesister-form";
import registerImage from "/public/img/psn.jpg";

export default function Register() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT IMAGE SECTION */}
      <div className="hidden lg:flex items-center justify-center bg-[#0A1A2F]">
        <img
          src={registerImage}
          alt="Register Illustration"
          className="w-[80%] mx-auto drop-shadow-xl"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>

    </div>
  );
}
