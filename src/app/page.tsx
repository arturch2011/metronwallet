"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { TokenList } from "@/components/wallet/TokenList";
import { WalletCard } from "@/components/wallet/WalletCard";
import { useAuth } from "@/providers/user-context";
import { useEffect } from "react";

interface CreateSAccountResponse {
  idWallet: number;
}

export default function Home() {
  const { user, setSAccountInfo } = useAuth();

  useEffect(() => {
    const createSAccount = async () => {
      try {
        if (!user) {
          return
        }

        const response: CreateSAccountResponse = await fetch('/api/createSaccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            languageCode: user.language_code,
          }),
        }).then((res) => res.json());

        if (response.idWallet !== undefined) {
          setSAccountInfo({ 
            ...user,
            idWallet: response.idWallet,
           });
        }
      } catch (error) {
        console.error("Failed to create Saccount:", error);
      }
    };

    createSAccount();
  }, []);

  return (
    <Skeleton>
      <WalletCard />
      <TokenList />
    </Skeleton>
  );
}