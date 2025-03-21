import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { CornerUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Authorized from "@/components/wraps/authorized";
import ThemeSwitch from "@/components/theme/theme-switch";
import TextEditor from "@/components/text-editor/text-editor";

export default function WritingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === null) navigate("/user/articles");
  }, [state]);

  const finishWriting = () => {
    localStorage.removeItem("curr_article");
    navigate("/user/my-articles");
  };

  return (
    <Authorized onFail={() => navigate("/login")}>
      <Container className="flex items-center justify-center h-screen w-screen">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="fixed top-0 left-0 z-[100] m-2 p-2 rounded-md cursor-pointer transition-all duration-300"
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
    </Authorized>
  );
}
