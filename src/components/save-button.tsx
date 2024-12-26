import { FC } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

interface SaveButtonProps {
  editor: Editor;
}

const SaveButton: FC<SaveButtonProps> = ({ editor }) => {
  return (
    <Button
      onClick={() => {
        console.log(editor.getHTML());
      }}
      className="p-2 w-9 h-9"
    >
      <Save />
    </Button>
  );
};

export default SaveButton;
