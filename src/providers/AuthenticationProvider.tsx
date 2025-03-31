"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import React from "react";

type UserContextType = {
  data: {
    email: string;
    _id: string;
    role: string;
  };
  exp: number;
  iat: number;
};

const UserContext = createContext<UserContextType | null>(null);

export const AuthenticationProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserContextType | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  const { decodedToken, isExpired } = useJwt(token as string);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (decodedToken) {
      setUserData(decodedToken as UserContextType); 
    }

    setIsLoading(false);
  }, [token, isExpired, decodedToken, router]);




  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};


export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within an AuthenticationProvider");
  }
  return context;
};
