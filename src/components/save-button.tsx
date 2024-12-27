import { FC } from "react";
import { Editor } from "@tiptap/react";
import { Button, ButtonProps } from "./ui/button";
import { LoaderCircle, Save } from "lucide-react";

interface SaveButtonProps extends ButtonProps {
  editor: Editor;
  isLoading?: boolean;
}

const SaveButton: FC<SaveButtonProps> = ({ editor, isLoading, ...props }) => {
  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        console.log(editor.getHTML());
      }}
      className="p-2 w-9 h-9"
      {...props}
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : <Save />}
    </Button>
  );
};

export default SaveButton;
