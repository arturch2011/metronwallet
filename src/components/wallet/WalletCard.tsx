"use client";

import { Button } from "../ui/Button";
import {
  // MdArrowDownward,
  MdOutlineAdd,
  MdOutlineSwapHoriz,
  MdHistory,
  MdArrowUpward,
} from "react-icons/md";
// import { FaArrowDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const WalletCard = () => {
  const router = useRouter();
  return (
    <div className="w-full p-4 rounded-2xl bg-white/20 shadow-md flex flex-col justify-center items-center">
      <h2>Your Balance</h2>
      <p className="text-2xl font-bold">
        <span className="text-slate-500 mr-2">$</span>00.00
      </p>
      <div className="w-full flex justify-between items-center mt-4">
        <Button
          className="bg-black/40 text-white/40"
          onClick={() => router.push("/withdraw")}
        >
          <MdArrowUpward className="text-2xl font-bold" />
        </Button>
        <Button
          className="bg-black/40 text-white/40"
          onClick={() => router.push("/add")}
        >
          <MdOutlineAdd className="text-2xl font-bold" />
        </Button>
        <Button className="bg-black/40 text-white/40">
          <MdOutlineSwapHoriz className="text-2xl font-bold" />
        </Button>
        <Button className="bg-black/40 text-white/40">
          <MdHistory className="text-2xl font-bold" />
        </Button>
      </div>
    </div>
  );
};
