"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CreateAccount = {
  email?:string | null
  password?: string | null;
};

type CreateAccountContextType = {
  createAccount: CreateAccount;
  refetch: () => Promise<void>;
  setCreateAccount: (account: CreateAccount) => void;
};

const CreateAccountContext = createContext<
  CreateAccountContextType | undefined
>(undefined);

export const CreateAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [createAccount, setCreateAccount] = useState<CreateAccount>({
    email: null,
    password: null,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: createAccount.email,
            password: createAccount.password,
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <CreateAccountContext.Provider
      value={{ createAccount, setCreateAccount, refetch: fetchData }}
    >
     {children}
    </CreateAccountContext.Provider>
  );
};

export const useCreateAccount = () => {
  const context = useContext(CreateAccountContext);
  if (!context) {
    throw new Error(
      "useCreateAccount must be used within a CreateAccountProvider"
    );
  }
  return context;
};
