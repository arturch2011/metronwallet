"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { TokenList } from "@/components/wallet/TokenList";
import { WalletCard } from "@/components/wallet/WalletCard";
import { useAuth } from "@/providers/user-context";

export default function Home() {
  const { user } = useAuth();
  console.log(user)
  return (
    <Skeleton>
      <WalletCard />
      <TokenList />
    </Skeleton>
  );
}
