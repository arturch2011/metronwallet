"use client";

import React from "react";
import { IconType } from "react-icons";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const OptionButton = ({
  Icon,
  route,
  title,
  description,
}: OptionProps) => {
  const router = useRouter();
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(route)}
      className="w-full flex items-center justify-between py-4"
    >
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-white">
          <Icon />
        </div>
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          <p className="text-sm text-slate-500 truncate">$ {description}</p>
        </div>
      </div>
      <IoIosArrowForward className="text-2xl font-bold" />
    </motion.button>
  );
};