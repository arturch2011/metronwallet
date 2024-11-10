"use client";
/* eslint-disable */

import WebApp from "@twa-dev/sdk";
// import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserData | null;
  tokens?: TokenProps[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  tokens: [],
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [tokens, setTokens] = useState<TokenProps[]>([]);

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
          getBalance(response.user.idWallet);
        }
      } catch (error) {
        console.error("Failed to create Saccount:", error);
      }
    }
  };

  const getBalance = async (id: number) => {
    console.log("aaaaaaaaaaabbbbbbbbbbb");

    try {
      console.log("bbbbbbbbbbbbb");

      const response = await fetch("/api/getBalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idWallet: id,
        }),
      }).then((res) => res.json());

      console.log("ccccccccccccc", response);
      const finalList: TokenProps[] = [];
      response.formatedBalances.forEach((token: any) => {
        const currenttk: TokenProps = {
          imgUrl: token.asset,
          name: token.asset == "tBNB" ? "BNB" : "MyToken",
          value: token.asset == "tBNB" ? 630.44 : 1,
          quantity: Number(token.formattedAmount),
          symbol: token.asset == "tBNB" ? "BNB" : "MTK",
          address: token.asset,
        };

        finalList.push(currenttk);
      });

      setTokens(finalList);
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
