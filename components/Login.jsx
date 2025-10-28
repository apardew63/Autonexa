"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiFillGoogleCircle,
  AiFillGooglePlusCircle,
  AiFillGoogleSquare,
} from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");
    const error = searchParams.get("error");

    if (token && user) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", user);
      router.push("/");
    }

    if (error) {
      alert("Authentication failed: " + error);
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center w-full gap-3 bg-white border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src="/images/google.png" alt="Google logo" className="h-5 w-5" />
          <span className="text-[15px] font-medium text-gray-700">
            {loading ? "Redirecting..." : "Sign in with Google"}
          </span>
        </button>
      </div>
    </div>
  );
}
