"use client";

import { Options } from "@/components/ui/Options";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  MdAttachMoney,
  MdOutlineQrCode,
  MdSend,
  MdShoppingCart,
} from "react-icons/md";

export default function WithdrawPage() {
  const options: OptionProps[] = [
    {
      Icon: MdAttachMoney,
      route: "/withdraw/sell",
      title: "Sell Cryptocurrency",
      description: "Withdraw to your bank account",
    },
    {
      Icon: MdSend,
      route: "/withdraw/send",
      title: "Send Cryptocurrency",
      description: "Send to wallet",
    },
  ];
  return (
    <Skeleton>
      <Options options={options} />
    </Skeleton>
  );
}
