"use client";

import { TokenDrop } from "@/components/send/TokenDrop";
import { Back } from "@/components/ui/Back";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useState } from "react";

export default function SendPage() {
  const [selectedToken, setSelectedToken] = useState<TokenProps | null>(null);
  const [receiverAddr, setReceiverAddr] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const handleSelect = (token: TokenProps) => {
    setSelectedToken(token);
  };
  return (
    <Skeleton>
      <Back route="/withdraw" />
      <div className="w-full p-4 rounded-2xl bg-white/20 shadow-md flex flex-col justify-center  ">
        <TokenDrop onSelect={handleSelect} selected={selectedToken} />
        <p className="pt-4 pb-2">Receiver address:</p>
        <Input
          value={receiverAddr}
          type="text"
          placeholder="0x..."
          onChange={(e) => setReceiverAddr(e.target.value)}
        />
        <p className="pt-4 pb-2">Amount:</p>
        <Input
          value={amount}
          type="number"
          placeholder="0"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <Button className="bg-yellow-400 text-black ">Send</Button>
    </Skeleton>
  );
}
