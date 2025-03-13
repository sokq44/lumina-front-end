import { FC, ReactNode, useEffect } from "react";
import { useLoggedIn } from "@/hooks/user";
import Container from "@/components/ui/container";
import LoadingScreen from "@/components/wraps/loading-screen";

interface AuthorizedProps {
  children: ReactNode;
  onFail?: () => void;
  onSuccess?: () => void;
}

const Authorized: FC<AuthorizedProps> = ({ onSuccess, onFail, children }) => {
  const { isLoggedIn, isLoading } = useLoggedIn();

  useEffect(() => {
    if (isLoggedIn === false) {
      if (onFail) onFail();
    } else if (isLoggedIn === true) {
      if (onSuccess) onSuccess();
    }
  }, [isLoggedIn]);

  if (isLoading)
    return (
      <Container className="w-screen h-screen">
        <LoadingScreen>Checking your login status...</LoadingScreen>
      </Container>
    );

  return children;
};

export default Authorized;
