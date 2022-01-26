import cn from "classnames";
import { ReactElement } from "react";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Sizes } from "../../types";

type ButtonProps = {
  href?: never;
  type?: "submit" | "reset" | "button";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;
type LinkProps = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

type GetElementProps<
  T extends ButtonProps | LinkProps = ButtonProps | LinkProps
> = T extends Pick<LinkProps, "href"> ? LinkProps : ButtonProps;

interface ReactProps {
  size?: Sizes;
}

type Props<T> = ReactProps & GetElementProps<T>;

const Button = <T extends ButtonProps | LinkProps>({
  children,
  className,
  size = "m",
  ...otherProps
}: Props<T>): ReactElement => {
  const commonClass = cn("btn", `btn--${size}`, className);

  if ("href" in otherProps) {
    return (
      <a {...(otherProps as LinkProps)} className={commonClass}>
        {children}
      </a>
    );
  }

  return (
    <button {...(otherProps as ButtonProps)} className={commonClass}>
      {children}
    </button>
  );
};

export default Button;
