import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

const SlidingLink: FC<LinkProps> = ({ className, ...props }) => {
  return (
    <Link
      className={cn("text-md text-center text-primary sliding-link", className)}
      {...props}
    ></Link>
  );
};

export default SlidingLink;
