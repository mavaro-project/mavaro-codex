import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variants = {
  primary:
    "bg-terracotta text-white shadow-card hover:-translate-y-0.5 hover:bg-clay focus:ring-terracotta/20",
  secondary:
    "border border-espresso/15 bg-white/75 text-espresso hover:-translate-y-0.5 hover:bg-white focus:ring-terracotta/10",
  ghost: "text-espresso/65 hover:bg-espresso/5 focus:ring-terracotta/10",
};

export function Button(props: ButtonProps | LinkProps) {
  if ("href" in props && props.href) {
    const { href, children, variant = "primary", className: customClassName = "", ...rest } = props;
    const className = getClassName(variant, customClassName);

    return (
      <Link className={className} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, variant = "primary", className: customClassName = "", ...rest } = props as ButtonProps;

  return (
    <button className={getClassName(variant, customClassName)} {...rest}>
      {children}
    </button>
  );
}

function getClassName(variant: NonNullable<BaseProps["variant"]>, className: string) {
  return `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`;
}
