import { FC } from "react";
import { LoaderCircle } from "lucide-react";
import Container from "@/components/ui/container";

interface LoadingScreenProps {
  children: string;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ children }) => {
  return (
    <Container className="w-full h-full flex items-center justify-center bg-background text-muted-foreground">
      <LoaderCircle className="animate-spin" />
      <span className="ml-2 text-lg">{children}</span>
    </Container>
  );
};

export default LoadingScreen;
