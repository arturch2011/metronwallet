"use client";

import { QrCode } from "@/components/receive/QrCode";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/providers/user-context";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ReceivePage() {
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (itemId: string) => {
    setCopiedId(itemId);
    setTimeout(() => setCopiedId(null), 2000); // Limpa o estado após 2 segundos
  };

  function transformarString(str: string): string {
    if (str.length <= 9) {
      return str;
    }
    return str.slice(0, 5) + "..." + str.slice(-4);
  }

  if (!user) {
    return <ProgressIndicator />;
  } else {
    return (
      <Skeleton>
        <QrCode address={user.wallet!} />
        <p className="w-full text-center">{transformarString(user.wallet!)}</p>
        <CopyToClipboard
          text={user.wallet!}
          onCopy={() => handleCopy(user.wallet!)}
        >
          <Button className="bg-yellow-400 text-black ">
            {copiedId ? "Copied "! : "Copy Address"}
          </Button>
        </CopyToClipboard>
      </Skeleton>
    );
  }
}
