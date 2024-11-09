import { Options } from "@/components/ui/Options";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function AddPage() {
  const options: OptionProps[] = [
    {
      Icon: FaArrowDown,
      route: "/add/buy",
      title: "Buy Cryptocurrency",
      description: "Credit card or another methode",
    },
    {
      Icon: FaArrowUp,
      route: "/add/receive",
      title: "Receive Cryptocurrency",
      description: "Receive from another wallet",
    },
  ];
  return <Options options={options} />;
}
