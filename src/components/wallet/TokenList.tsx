import { TokenCard } from "./TokenCard";

export const TokenList = () => {
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
    <div className="w-full flex flex-col">
      {tokens.map((token, index) => (
        <TokenCard
          key={index}
          imgUrl={token.imgUrl}
          name={token.name}
          value={token.value}
          quantity={token.quantity}
          symbol={token.symbol}
        />
      ))}
    </div>
  );
};
