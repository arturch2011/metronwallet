"use client";

/* eslint-disable */
interface InputProps {
  value?: any;
  required?: boolean;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value,
  type,
  placeholder,
  required,
  onChange,
}: InputProps) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full bg-black/40 text-white backdrop-blur-md rounded-2xl shadow-lg px-4 py-2 focus:outline-none focus:border  focus:border-cprimary border-solid  "
      onChange={onChange}
    />
  );
};
