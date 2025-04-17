import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDialogue } from "@/hooks/use-dialogue";
import { useTextEditor } from "@/hooks/use-text-editor";
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
import Container from "@/components/ui/container";

const AddLinkDialogue = () => {
  const { toast } = useToast();
  const { editor } = useTextEditor();
  const { eventTarget } = useDialogue();

  const [url, setUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (eventTarget) {
      const openDialog = () => triggerRef.current?.click();
      eventTarget.addEventListener("add-link-dialogue", openDialog);
      return () => {
        eventTarget?.removeEventListener("add-link-dialogue", openDialog);
      };
    }
  }, [eventTarget]);

  const handleLinkAddition = () => {
    if (!url.startsWith("https://")) {
      toast({
        variant: "destructive",
        title: "Invalid Link",
        description:
          "For security reasons, only links that begin with a secure connection (https://) are allowed.",
      });
    } else {
      const value = inputRef.current?.value;
      if (value && editor) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url, target: "_blank" })
          .run();
      }
      closeRef.current?.click();
    }
  };

  const handleInputChange = () => setUrl(inputRef.current?.value || "");

  const handleOpenChange = (open: boolean) => {
    if (!open) setUrl("");
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Add a link</DialogTitle>
          <DialogDescription>Enter the URL for the link.</DialogDescription>
        </DialogHeader>
        <Container className="flex gap-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="https://example.org"
            onInput={handleInputChange}
          />
          <Button type="submit" disabled={!url} onClick={handleLinkAddition}>
            Add
          </Button>
        </Container>
        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkDialogue;
