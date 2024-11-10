"use client";

import { TokenDrop } from "@/components/send/TokenDrop";
import { Back } from "@/components/ui/Back";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/providers/user-context";
import { useState } from "react";

export default function SendPage() {
  const { user } = useAuth();
  const [selectedToken, setSelectedToken] = useState<TokenProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [receiverAddr, setReceiverAddr] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const handleSelect = (token: TokenProps) => {
    setSelectedToken(token);
  };

  async function handleSendToken() {
    setIsLoading(true);

    // if (user?.idWallet) {
    //   console.log("aaaaaaaaaaaa", user);

    //   return;
    // }
    // if(!user?.privateKey) return;
    try {
      console.log("privateKeyy", user!.privateKey);

      const response = await fetch("/api/testTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // token: selectedToken,
          to: receiverAddr,
          amount: amount,
          idWallet: user!.idWallet,
          privateKey: user!.privateKey,
        }),
      });

      const res = await response.json();
    } catch (error) {
      console.log("error");
    }

    setIsLoading(false);
  }
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
      <Button
        className="bg-yellow-400 text-black"
        onClick={() => handleSendToken()}
      >
        {isLoading ? "Sending..." : "Send"}
      </Button>
    </Skeleton>
  );
}
