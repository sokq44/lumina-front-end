import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useDialogue } from "@/hooks/use-dialogue";
import { useSessionTerminator } from "@/hooks/api/auth";

export default function LogoutDialogue() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dialogues = useDialogue();
  const { logout, error, isLoading } = useSessionTerminator();

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
      navigate("/login");
      closeRef.current?.click();
    }
  }, [error]);

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} />
      <DialogContent className="font-funnel">
        <DialogHeader>
          <DialogTitle>Logging Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
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
