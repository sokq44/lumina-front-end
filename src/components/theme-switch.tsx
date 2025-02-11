import { FC } from "react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitchProps {
  className?: string;
  position?: "top-left" | "top-right" | "custom";
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, position }) => {
  const { theme, setTheme } = useTheme();

  let finalClassName =
    "fixed z-50 m-2 p-2 top-0 rounded-md text-primary bg-secondary/50 dark:bg-secondary/70 hover:cursor-pointer hover:bg-secondary dark:hover:bg-primary/15 transition-all duration-300";

  switch (position) {
    case "top-left":
      finalClassName = cn(finalClassName, "left-0");
      break;
    case "top-right":
      finalClassName = cn(finalClassName, "right-0");
      break;
    default:
      break;
  }

  const switchTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <Button
      size="icon"
      onClick={switchTheme}
      className={cn(finalClassName, className)}
    >
      {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  );
};

export default ThemeSwitch;
