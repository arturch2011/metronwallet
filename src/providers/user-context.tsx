"use client";
/* eslint-disable */

import WebApp from "@twa-dev/sdk";
// import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserData | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const initUser = async () => {
    let tguser: UserData | null = null;
    if (WebApp.initDataUnsafe.user) {
      tguser = WebApp.initDataUnsafe.user as UserData;
    }

    if (tguser) {
      try {
        const response: CreateSAccountResponse = await fetch(
          "/api/createSaccount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: tguser.id.toString(),
              firstName: tguser.first_name,
              lastName: tguser.last_name ?? "",
              userName: tguser.username,
              languageCode: tguser.language_code,
            }),
          }
        ).then((res) => res.json());

        console.log(response);

        if (response.user.idWallet !== undefined) {
          setUser({
            ...tguser,
            wallet: response.user.wallet,
            idWallet: response.user.idWallet,
          });
        }
      } catch (error) {
        console.error("Failed to create Saccount:", error);
      }
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
