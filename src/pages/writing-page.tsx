import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoggedIn } from "@/hooks/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import TextEditor from "@/components/text-editor/text-editor";
import { CornerUpLeft, LoaderCircle } from "lucide-react";

const WritingPage = () => {
  const { state } = useLocation();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === null) navigate("/user/articles");
  }, [state, navigate]);

  useEffect(() => {
    if (loggedIn.error) navigate("/login");
  }, [loggedIn.error, navigate]);

  const finishWriting = () => {
    localStorage.removeItem("curr_article");
    navigate("/user/my-articles");
  };

  if (loggedIn.isLoading) {
    return (
      <Container className="flex items-center justify-center h-screen w-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </Container>
    );
  }

  return (
    <Container className="flex items-center justify-center h-screen w-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="fixed top-0 left-0 z-[100] m-2 p-2 rounded-md hover:cursor-pointer transition-all duration-300"
          >
            <CornerUpLeft />
          </Button>
        </DialogTrigger>
        <DialogContent className="font-funnel">
          <DialogHeader>
            <DialogTitle>Are you sure you want to quit?</DialogTitle>
            <DialogDescription>
              All the unsaved changes won't be applied.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={finishWriting}>Quit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ThemeSwitch position="top-right" />
      <TextEditor article={state?.article} />
    </Container>
  );
};

export default WritingPage;
