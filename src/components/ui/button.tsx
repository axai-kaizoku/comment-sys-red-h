import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex gap-2 items-center px-3 text-sm py-2 border border-neutral-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-150",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
