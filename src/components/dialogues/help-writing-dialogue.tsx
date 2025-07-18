import { useEffect, useRef } from "react";
import { useDialogue } from "@/hooks/use-dialogue";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Container from "../ui/container";

const HelpWritingDialogue = () => {
  const { eventTarget } = useDialogue();

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (eventTarget) {
      const openDialog = () => triggerRef.current?.click();
      eventTarget.addEventListener("help-writing-dialogue", openDialog);
      return () => {
        eventTarget?.removeEventListener("help-writing-dialogue", openDialog);
      };
    }
  }, [eventTarget]);

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>How to Write?</DialogTitle>
          <DialogDescription>
            <Container className="flex">
              <p className="text-lg">Under construction...</p>
            </Container>
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button>Ok</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default HelpWritingDialogue;
