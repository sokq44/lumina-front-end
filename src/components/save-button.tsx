import { FC } from "react";
import { Editor } from "@tiptap/react";
import { Button, ButtonProps } from "./ui/button";
import { Save } from "lucide-react";

interface SaveButtonProps extends ButtonProps {
  editor: Editor;
}

const SaveButton: FC<SaveButtonProps> = ({ editor, ...props }) => {
  return (
    <Button
      onClick={() => {
        console.log(editor.getHTML());
      }}
      className="p-2 w-9 h-9"
      {...props}
    >
      <Save />
    </Button>
  );
};

export default SaveButton;
