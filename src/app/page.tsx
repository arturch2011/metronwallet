"use client";

import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Skeleton } from "@/components/ui/Skeleton";
import { TokenList } from "@/components/wallet/TokenList";
import { WalletCard } from "@/components/wallet/WalletCard";
import { useAuth } from "@/providers/user-context";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <ProgressIndicator />;
  } else {
    return (
      <Skeleton>
        <WalletCard />
        <TokenList />
      </Skeleton>
    );
  }
}
