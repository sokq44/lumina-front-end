import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

const SlidingLink: FC<LinkProps> = (props) => {
  return (
    <Link
      className="text-md text-center text-primary sliding-link"
      {...props}
    ></Link>
  );
};

export default SlidingLink;
