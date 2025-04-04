import { useRouteError } from "react-router-dom";
import Container from "@/components/ui/container";

const ErrorPage = () => {
  const error = useRouteError();

  const errDict = error as { [key: string]: string };

  return (
    <Container className="w-screen h-screen flex flex-col gap-y-4 items-center justify-center">
      <span className="text-xl font-semibold text-red-500">
        Oops! Seems like an unexpected error has occured.
      </span>
      <pre className="max-w-[45rem] max-h-[45rem] m-0 bg-muted text-red-800 overflow-scroll break-words">
        {errDict["statusText"] || errDict["message"]}
      </pre>
    </Container>
  );
};

export default ErrorPage;
