"use client";

import { Options } from "@/components/ui/Options";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdOutlineQrCode, MdShoppingCart } from "react-icons/md";

export default function AddPage() {
  const options: OptionProps[] = [
    {
      Icon: MdShoppingCart,
      route: "/add/buy",
      title: "Buy Cryptocurrency",
      description: "Credit card or another methode",
    },
    {
      Icon: MdOutlineQrCode,
      route: "/add/receive",
      title: "Receive Cryptocurrency",
      description: "Receive from another wallet",
    },
  ];
  return (
    <Skeleton>
      <Options options={options} />
    </Skeleton>
  );
}
