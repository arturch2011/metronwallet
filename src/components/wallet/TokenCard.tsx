import Image from "next/image";

interface TokenCardProps {
  imgUrl: string;
  name: string;
  value: number;
  quantity: number;
  symbol: string;
}

export const TokenCard = ({
  imgUrl,
  name,
  value,
  quantity,
  symbol,
}: TokenCardProps) => {
  return (
    <div className="w-full flex items-center justify-between py-4 border-b border-white/20">
      <div className="flex items-center gap-2">
        {/* <Image
          src={imgUrl}
          alt={`${name} logo`}
          width={400}
          height={400}
          className="w-12 h-12 rounded-full object-cover"
        /> */}
        <span className="w-12 h-12 rounded-full bg-white" />
        <div className="flex flex-col gap-1">
          <h3>{name}</h3>
          <p className="text-sm text-slate-500">$ {value}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <h3>${value * quantity}</h3>
        <p className="text-sm text-slate-500">
          {quantity} {symbol}
        </p>
      </div>
    </div>
  );
};
