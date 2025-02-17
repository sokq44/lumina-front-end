import {
  User,
  UserCog,
  Settings,
  Newspaper,
  LucideIcon,
  NotebookTabs,
} from "lucide-react";

export type MenuItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  action?: () => void;
};

export const userMenuItems: MenuItem[] = [
  {
    title: "Suggested",
    url: "articles",
    icon: Newspaper,
  },
  {
    title: "My Articles",
    url: "my-articles",
    icon: NotebookTabs,
  },
  {
    title: "Settings",
    url: "/settings",
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
];
