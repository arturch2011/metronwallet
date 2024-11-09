"use client";

import { Button } from "../ui/Button";
import {
  MdArrowDownward,
  MdOutlineAdd,
  MdOutlineSwapHoriz,
  MdHistory,
  MdArrowUpward,
} from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const WalletCard = () => {
  const router = useRouter();
  function goToAdd() {
    router.push("/add");
  }
  return (
    <div className="w-full p-4 rounded-2xl bg-white/20 shadow-md flex flex-col justify-center items-center">
      <h2>Your Balance</h2>
      <p className="text-2xl font-bold">
        <span className="text-slate-500 mr-2">$</span>00.00
      </p>
      <div className="w-full flex justify-between items-center mt-4">
        <Button>
          <MdArrowUpward className="text-2xl font-bold" />
        </Button>
        <Button onClick={goToAdd}>
          <MdOutlineAdd className="text-2xl font-bold" />
        </Button>
        <Button>
          <MdOutlineSwapHoriz className="text-2xl font-bold" />
        </Button>
        <Button>
          <MdHistory className="text-2xl font-bold" />
        </Button>
      </div>
    </div>
  );
};
