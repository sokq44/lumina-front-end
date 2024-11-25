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
    "rounded-md hover:cursor-pointer transition-all duration-300";

  switch (position) {
    case "top-left":
      finalClassName = cn(
        finalClassName,
        "absolute z-[100] m-2 p-2 top-0 left-0"
      );
      break;
    case "top-right":
      finalClassName = cn(
        finalClassName,
        "absolute z-[100] m-2 p-2 top-0 right-0"
      );
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
      variant="ghost"
      size="icon"
      onClick={switchTheme}
      className={cn(className, finalClassName)}
    >
      {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  );
};

export default ThemeSwitch;
