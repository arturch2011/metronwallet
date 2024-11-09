import { QrCode } from "@/components/receive/QrCode";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ReceivePage() {
  return (
    <Skeleton>
      <QrCode address="0x1234567890" />
      <p className="w-full text-center">0x.... asd678</p>
      <Button className="bg-yellow-400 text-black ">Copy Address</Button>
    </Skeleton>
  );
}
