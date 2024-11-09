import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { TokenList } from "@/components/wallet/TokenList";
import { WalletCard } from "@/components/wallet/WalletCard";
import Image from "next/image";

export default function Home() {
  return (
    <Skeleton>
      <WalletCard />
      <TokenList />
    </Skeleton>
  );
}
