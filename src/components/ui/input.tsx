import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "register" | "login";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, type, ...props }, ref) => {
    let finalClassName =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    switch (variant) {
      case "register":
        finalClassName = cn(
          finalClassName,
          "border-border shadow-sm focus-visible:ring-offset-1 transition-all duration-300"
        );
        break;
      case "login":
        finalClassName = cn(
          finalClassName,
          "border-border shadow-sm focus-visible:ring-offset-1 transition-all duration-300"
        );
        break;
      default:
        finalClassName = cn(finalClassName, className);
        break;
    }

    return (
      <input
        type={type}
        className={finalClassName}
        autoComplete="off"
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
