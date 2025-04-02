"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
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
} | undefined;

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthenticationProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const params = useParams();
  const [userData, setUserData] = useState<UserContextType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { decodedToken, isExpired } = useJwt(token as string);
console.log(isExpired)
  useEffect(() => {
    if (!token) {
    
      router.push("/login");
      return;
    }

    if (decodedToken) {
      setUserData(decodedToken as UserContextType);

   
      if (isExpired) {
        router.push("/userPage/home"); 
      }else{router.push("/login")}
    } else {
      
      router.push("/login");
    }

    setIsLoading(false);
  }, [token, decodedToken, isExpired, router]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);

  if (context === null) { // Corrected condition
    throw new Error(
      "useUserData must be used within an AuthenticationProvider"
    );
  }

  return context;
};
