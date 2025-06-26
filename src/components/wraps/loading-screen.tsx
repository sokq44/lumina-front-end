import { FC } from "react";
import { LoaderCircle } from "lucide-react";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  children: string;
  className?: string;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ children, className }) => {
  return (
    <Container
      className={cn(
        "w-full h-full flex items-center justify-center bg-background text-muted-foreground",
        className
      )}
    >
      <LoaderCircle className="animate-spin" />
      <span className="ml-2 text-lg">{children}</span>
    </Container>
  );
};

export default LoadingScreen;
