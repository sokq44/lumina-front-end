import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useTextEditor } from "@/hooks/text-editor";
import { useDialogue } from "@/hooks/dialogue";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddLinkDialogue = () => {
  const textEditor = useTextEditor();
  const dialogues = useDialogue();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!dialogues.eventTarget) return;

    const openDialog = () => triggerRef.current?.click();
    dialogues.eventTarget.addEventListener(
      "add-link-dialogue",
      openDialog
    );

    return () => {
      dialogues.eventTarget?.removeEventListener(
        "add-link-dialogue",
        openDialog
      );
    };
  }, [dialogues.eventTarget]);

  const handleLinkAddition: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const value = inputRef.current?.value;
    if (value && textEditor.editor) {
      textEditor.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    }
  };

  const handleInputChange = () => setUrl(inputRef.current?.value || "");

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Add a link</DialogTitle>
          <DialogDescription>Enter the URL for the link.</DialogDescription>
        </DialogHeader>
        <form className="flex gap-x-2" onSubmit={handleLinkAddition}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="https://example.org"
            onInput={handleInputChange}
          />
          <DialogClose asChild>
            <Button type="submit" disabled={!url}>
              Add
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkDialogue;
