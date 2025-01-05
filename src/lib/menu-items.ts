import {
  User,
  UserCog,
  Settings,
  FileText,
  LucideIcon,
  ShieldCheck,
  LayoutTemplate,
} from "lucide-react";

export type MenuItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  action?: () => void;
};

export const userMenuItems: MenuItem[] = [
  {
    title: "Articles",
    url: "/user",
    icon: LayoutTemplate,
  },
  {
    title: "My Articles",
    url: "articles",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export const settingsMenuItems: MenuItem[] = [
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
  {
    title: "Account",
    url: "account",
    icon: UserCog,
  },
  {
    title: "Security",
    url: "security",
    icon: ShieldCheck,
  },
];
