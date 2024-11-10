"use client";

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

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
