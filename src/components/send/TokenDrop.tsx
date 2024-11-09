"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { IoIosArrowDown } from "react-icons/io";

interface TokenDropProps {
  onSelect: (token: TokenProps) => void;
  selected: TokenProps | null;
}

export const TokenDrop = ({ onSelect, selected }: TokenDropProps) => {
  //   const [selectedToken, setSelectedToken] = useState<TokenProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsOpen(false);

  useOutsideClick(submenuRef, toggleMenu);
  const handleSelect = (token: TokenProps) => {
    // setSelectedToken(token);
    setIsOpen(false);
    onSelect(token);
  };

  const tokens = [
    {
      imgUrl:
        "https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp",
      name: "Ethereum",
      value: 3000,
      quantity: 10,
      symbol: "ETH",
    },
    {
      imgUrl:
        "https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp",
      name: "Ethereum",
      value: 3000,
      quantity: 10,
      symbol: "ETH",
    },
  ];

  return (
    <div className="w-full relative flex items-center gap-2">
      <Button
        className="w-full  bg-black/40 text-white/40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full flex items-center justify-between">
          <p>{selected ? selected.symbol : "Select Token"}</p>
          <IoIosArrowDown />
        </div>
      </Button>
      {isOpen && (
        <div
          ref={submenuRef}
          className="absolute top-[120%] w-full bg-black/40 text-white/40 backdrop-blur-md rounded-2xl shadow-lg p-4  z-20 max-h-1/2 overflow-y-auto flex flex-col gap-4 border border-white/60"
        >
          {tokens.map((token, index) => (
            <button
              key={index}
              className="flex w-full items-center justify-between gap-4 "
              onClick={() => handleSelect(token)}
            >
              <p className=" text-gray-400">{token.symbol}</p>
              <p>{token.quantity}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
