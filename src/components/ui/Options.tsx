import { OptionButton } from "./OptionButton";

interface OptionsProps {
  options: OptionProps[];
}

export const Options = ({ options }: OptionsProps) => {
  return (
    <div className="flex flex-col w-full gap-4">
      {options.map((option, index) => (
        <OptionButton key={index} {...option} />
      ))}
    </div>
  );
};
