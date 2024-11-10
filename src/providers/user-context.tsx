"use client";

import WebApp from "@twa-dev/sdk";
// import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserData | null;
  setSAccountInfo: ({ idWallet, wallet }: { idWallet: number, wallet: string }) => void;
}

// interface AuthContextType {
//     user: UserData | null;
//     setSAccountInfo: ({ idWallet, wallet }: { idWallet: number, wallet: string }) => void;
//   }

interface CreateSAccountResponse {
  id: string
  firstName: string;
  lastName: string
  userName: string
  languageCode: string
  allowsWriteToPm: boolean
  wallet: string
  idWallet: number;
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  setSAccountInfo: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userSAccount, setUserSAccount] = useState<UserData | null>(null);
  // const router = useRouter();

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user as UserData);
    }
    
    
  }, []);

  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //         setUser(user);
  //         setIsLoading(false); // Set loading to false when auth state is determined

  //         if (!user) {
  //             router.push('/login');
  //         }
  //         // else {
  //         //     router.push("/"); // Redirect to home if user is authenticated
  //         // }
  //     });

  //     return () => unsubscribe();
  // }, [router]);

  async function setSAccountInfo({ idWallet, wallet }: { idWallet: number, wallet: string }) {
    const response: CreateSAccountResponse = await fetch('/api/createSaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user?.id,
        firstName: user?.first_name,
        lastName: user?.last_name,
        username: user?.username,
        languageCode: user?.language_code,
      }),
    }).then((res) => res.json());
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          wallet: response.wallet,
          idWallet: response.idWallet,
        };
      }
      return prevUser;
    });
  }

  // async function setSAccountInfo() {
  //   const response: CreateSAccountResponse = await fetch('/api/createSaccount', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: user?.id,
  //       firstName: user?.first_name,
  //       lastName: user?.last_name,
  //       username: user?.username,
  //       languageCode: user?.language_code,
  //     }),
  //   }).then((res) => res.json());
  //   setUser((prevUser) => {
  //     if (prevUser) {
  //       return {
  //         ...prevUser,
  //         wallet: response.wallet,
  //         idWallet: response.idWallet,
  //       };
  //     }
  //     return prevUser;
  //   });
  // }

  return (
    <AuthContext.Provider value={{ user, setSAccountInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
