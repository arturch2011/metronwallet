import { MdArrowLeft } from "react-icons/md";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
interface BackProps {
  route: string;
}

export const Back = ({ route }: BackProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full">
      <Button className="py-0" onClick={() => router.push(route)}>
        <IoIosArrowBack className="text-2xl" />
      </Button>
    </div>
  );
};
