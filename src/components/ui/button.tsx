import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = clsx("btn", `btn--${variant}`, className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
