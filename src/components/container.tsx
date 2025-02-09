import { FC, HTMLAttributes } from "react";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

export default Container;
