"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  className,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={() => onClick}
      disabled={disabled}
      className={`${className} px-4 py-2 bg-black/40 text-white/40 rounded-xl`}
    >
      {children}
    </motion.button>
  );
};
