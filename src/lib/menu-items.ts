import { FileText, LucideProps, Settings } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type MenuItem = {
  title: string;
  url?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  action?: () => void;
};

export const userMenuItems: MenuItem[] = [
  {
    title: "Articles",
    url: "articles",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];
