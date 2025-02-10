import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Informative from "@/components/inform-badge/informative";
import { Info } from "lucide-react";

const HelpButton = () => {
  return (
    <Dialog>
      <Informative label="Help">
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="p-2 w-9 h-9 transition-all duration-300"
          >
            <Info />
          </Button>
        </DialogTrigger>
      </Informative>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to Write?</DialogTitle>
          <DialogDescription>
            Placeholder for a tutorial on how to write.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HelpButton;
