import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CornerUpLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GoBackArrowProps {
  to?: string;
  position?: "top-left" | "top-right";
}

const GoBackArrow: FC<GoBackArrowProps> = ({ to, position }) => {
  const navigate = useNavigate();

  let finalClassName =
    "fixed top-0 z-50 m-2 p-2 rounded-md text-primary bg-gray-200 transition-all duration-300 hover:cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15";

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

  return (
    <Button
      variant="ghost"
      size="icon"
      className={finalClassName}
      onClick={() => {
        if (to) navigate(to);
        else navigate(-1);
      }}
    >
      <CornerUpLeft size={24} />
    </Button>
  );
};

export default GoBackArrow;
