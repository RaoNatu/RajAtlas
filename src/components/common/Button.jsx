import { forwardRef } from "react";

const variants = {
  primary:
    "bg-royal-700 text-white hover:bg-royal-800 focus-visible:ring-royal-300",
  secondary:
    "bg-desert-100 text-desert-900 hover:bg-desert-200 focus-visible:ring-desert-300",
  outline:
    "border border-desert-200 bg-white/80 text-desert-900 hover:border-royal-300 hover:text-royal-800 focus-visible:ring-royal-200",
  ghost:
    "text-desert-800 hover:bg-desert-100 focus-visible:ring-desert-200",
  danger:
    "bg-maroon-700 text-white hover:bg-maroon-800 focus-visible:ring-maroon-300",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

const Button = forwardRef(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      icon: Icon,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-insetSoft transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-55",
          variants[variant],
          sizes[size],
          className,
        ].join(" ")}
        {...props}
      >
        {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
