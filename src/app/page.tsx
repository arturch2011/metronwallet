"use client";

import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Skeleton } from "@/components/ui/Skeleton";
import { TokenList } from "@/components/wallet/TokenList";
import { WalletCard } from "@/components/wallet/WalletCard";
import { useAuth } from "@/providers/user-context";

export default function Home() {
  const { user, tokens } = useAuth();
  console.log(tokens);

  if (!user || tokens?.length == 0) {
    return <ProgressIndicator />;
  } else {
    return (
      <Skeleton>
        <WalletCard tokenlist={tokens!} />
        <TokenList tokenslist={tokens!} />
      </Skeleton>
    );
  }
}
