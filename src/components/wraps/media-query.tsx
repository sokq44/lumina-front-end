import { useMediaQuery } from "usehooks-ts";
import { Children, FC, isValidElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MediaQuery: FC<Props> = ({ children }) => {
  const matches = useMediaQuery("(min-width:1024px)");

  const more = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === More
  );
  const less = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Less
  );

  return matches ? more : less;
};

const More: FC<Props> = ({ children }) => <>{children}</>;
const Less: FC<Props> = ({ children }) => <>{children}</>;

export { MediaQuery, More, Less };
