import { cn } from "@/lib/utils";
import { FC } from "react";

interface SeparatorProps {
  orientation: "horizontal" | "vertical";
  className?: string;
}

const Separator: FC<SeparatorProps> = ({ orientation, className }) => {
  let finalClass = "bg-gray-200";

  switch (orientation) {
    case "horizontal":
      finalClass = cn(finalClass, "h-[1px] w-full");
      break;
    case "vertical":
      finalClass = cn(finalClass, "w-[1px] h-full");
      break;
    default:
      finalClass = cn(finalClass, "h-[1px] w-full");
  }

  finalClass = cn(finalClass, className);

  return <div className={finalClass} />;
};

export default Separator;
