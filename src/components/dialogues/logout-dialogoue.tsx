import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/user";
import { useToast } from "@/hooks/use-toast";
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
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function LogoutDialogue() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dialogues = useDialogue();
  const { logout, error, isLoading } = useLogout();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dialogues.eventTarget) {
      const handleOpen = () => triggerRef.current?.click();
      dialogues.eventTarget.addEventListener("logout-dialogue", handleOpen);
      return () => {
        dialogues.eventTarget?.removeEventListener(
          "logout-dialogue",
          handleOpen
        );
      };
    }
  }, [dialogues.eventTarget]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Problem while Logging out",
        description:
          error ||
          "There has been an undexpected error while trying to log you out.",
      });
    } else if (error === null) {
      closeRef.current?.click();
      navigate("/login");
    }
  }, [error]);

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} />
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Upload an Image</DialogTitle>
          <DialogDescription>
            Pick an image in order to upload it.
          </DialogDescription>
        </DialogHeader>
        <Container className="flex gap-x-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={logout} disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              "Logout"
            )}
          </Button>
          <DialogClose ref={closeRef} />
        </Container>
      </DialogContent>
    </Dialog>
  );
}
