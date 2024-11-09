import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export interface OptionProps {
    Icon: React.ComponentType<Icon>;
    route: string;
    title: string;
    description: string;
  }