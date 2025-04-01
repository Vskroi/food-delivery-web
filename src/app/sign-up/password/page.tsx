"use client";

import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { object, string } from "yup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateAccount } from "@/providers/CreateAccountProvider";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { createAccount, setCreateAccount, refetch } = useCreateAccount();
  const [formValue, setFormValue] = useState<CreateAccount>({
    email: createAccount.email,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userSchema = object({
    password: string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const onPassowrdValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await userSchema.validate(formValue, { abortEarly: false });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const back = () => {
    router.back();
  };

  useEffect(() => {
    setCreateAccount(formValue);
  }, [formValue]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[416px] h-[376px] flex-col justify-center items-start gap-6 inline-flex mt-[326px] ml-[90px]">
        <Button className="bg-white " onClick={back}>
          <ChevronLeft stroke="black" />
        </Button>
        <h1 className="text-zinc-950 text-2xl font-semibold leading-loose">
          Create a strong password
        </h1>
        <p className="text-zinc-500 text-base font-normal leading-normal">
          Create a strong password with letters, numbers.
        </p>
        <Input
          className="h-9 flex-col justify-start items-start gap-2 w-[336px] text-zinc-500 text-sm font-normal leading-tight"
          type="password"
          placeholder="Password"
          onChange={onPassowrdValueChange}
          value={formValue.password || ""}
        />
        {error && <div className="text-red-500">{error}</div>}

        <Button onClick={handleSubmit} className="w-[336px]">
          Let's Go
        </Button>
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link className="text-[#2563EB]" href={`/login`}>
            Log in
          </Link>
        </div>
      </div>
      <div className="w-[856px] h-[904px] relative mt-10">
        <img
          className="rounded-3xl w-[856px] h-[904px]"
          src="Frame1321316047.png"
          alt="Illustration"
        />
      </div>
    </div>
  );
};

export default Login;
