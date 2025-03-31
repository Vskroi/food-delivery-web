"use client";

import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { object, string } from "yup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import exp from "constants";

interface LoginProps {
  nextStep: (user: boolean) => void;
}

 const Login = () => {
  const usePramas = useParams()
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loginValue, setLoginValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userSchema = object({
    email: string().email().required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValue),
      });

      const responseData = await response.json();

 

      if (responseData.success) {
 

        localStorage.setItem("token", responseData.data);

        router.push(`/UserPage/home`);
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const onEmailValueChange = (e: event) => {
    setLoginValue((prev) => ({ ...prev, email: e.target.value }));
  };

  const onPasswordValueChange = (e: event) => {
    setLoginValue((prev) => ({ ...prev, password: e.target.value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex w-full justify-center items-center">
      <div className="w-[416px] h-[376px] flex-col justify-center items-start gap-6 inline-flex mt-[326px] ml-[90px]">
        <Button>
          <ChevronLeft />
        </Button>
        <h1 className="text-zinc-950 text-2xl font-semibold leading-loose">
          Log in
        </h1>
        <p className="text-zinc-500 text-base font-normal leading-normal">
          Log in and enjoy your favorite dishes.
        </p>
        <Input
          className="h-9 flex-col justify-start items-start gap-2 w-[336px] text-zinc-500 text-sm font-normal leading-tight"
          placeholder="Enter Your email address"
          onChange={onEmailValueChange}
          value={loginValue.email}
        />
        <Input
          className="h-9 flex-col justify-start items-start gap-2 w-[336px] text-zinc-500 text-sm font-normal leading-tight"
          placeholder="Password"
          type="password"
          onChange={onPasswordValueChange}
          value={loginValue.password}
        />
        {error && <div className="text-red-500">{error}</div>}
        <a href="#" className="underline">
          Forgot password?
        </a>
        <Button onClick={handleSubmit} className="w-[336px]">
          Let's Go
        </Button>
        <Link className="bg-black w-[20px] h-[20px]" href={`/UserPage/ADMIN`}>
          {" "}
          asdasdasdasd
        </Link>
      </div>
      <div className="w-[856px] h-[904px] relative mt-10">
        <img
          className="rounded-3xl w-[856px] h-[904px]"
          src="Frame1321316047.png"
        />
      </div>
    </div>
  );
};
export default Login