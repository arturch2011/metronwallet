'use client'

import { TelegramInfo } from "@/components/telegram/telegram-info";
import { Skeleton } from "@/components/ui/Skeleton";
import { TokenList } from "@/components/wallet/TokenList";
import { WalletCard } from "@/components/wallet/WalletCard";

export default function Home() {
  return (
    <Skeleton>
      <WalletCard />
      <TokenList />
      <TelegramInfo />
    </Skeleton>
  );
}
