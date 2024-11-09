import { Button } from "../ui/Button";
import {
  MdArrowDownward,
  MdOutlineAdd,
  MdOutlineSwapHoriz,
  MdHistory,
} from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";

export const WalletCard = () => {
  return (
    <div className="w-full p-4 rounded-2xl bg-white/20 shadow-md flex flex-col justify-center items-center">
      <h2>Your Balance</h2>
      <p className="text-2xl font-bold">
        <span className="text-slate-500 mr-2">$</span>00.00
      </p>
      <div className="w-full flex justify-between items-center mt-4">
        <Button>
          <MdArrowDownward className="text-2xl font-bold" />
        </Button>
        <Button>
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
