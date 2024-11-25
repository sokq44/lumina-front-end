import { CornerUpLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "./ui/button";

interface GoBackArrowProps {
  to?: string;
  position?: "top-left" | "top-right";
}

const GoBackArrow: FC<GoBackArrowProps> = ({ to, position }) => {
  const navigate = useNavigate();

  let finalClassName =
    "absolute z-[100] m-2 p-2 rounded-md hover:cursor-pointer transition-all duration-300";

  switch (position) {
    case "top-left":
      finalClassName = cn(finalClassName, "top-0 left-0");
      break;
    case "top-right":
      finalClassName = cn(finalClassName, "top-0 right-0");
      break;
    default:
      finalClassName = cn(finalClassName, "top-0 left-0");
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
