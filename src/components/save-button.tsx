import { FC } from "react";
import { Button, ButtonProps } from "./ui/button";
import { LoaderCircle, Save } from "lucide-react";

interface SaveButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const SaveButton: FC<SaveButtonProps> = ({
  isLoading,
  ...props
}) => {
  return (
    <Button
      disabled={isLoading}
      className="p-2 w-9 h-9 transition-all duration-300"
      {...props}
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : <Save />}
    </Button>
  );
};

export default SaveButton;
