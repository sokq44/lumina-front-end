import { Children, FC, isValidElement, ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import Container from "../ui/container";

interface MediaQueryProps {
  children: ReactNode;
}

interface MoreLessProps {
  children: ReactNode;
}

const MediaQuery: FC<MediaQueryProps> = ({ children }) => {
  const matches = useMediaQuery("(min-width:1024px)");

  const more = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === More
  );
  const less = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Less
  );

  return matches ? more : less;
};

const More: FC<MoreLessProps> = ({ children }) => (
  <Container className="w-screen h-screen">{children}</Container>
);
const Less: FC<MoreLessProps> = ({ children }) => (
  <Container className="w-screen h-screen">{children}</Container>
);

export { MediaQuery, More, Less };
