import cn from "classnames";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Sizes } from "../../types";

type ButtonProps = {
  href?: never;
  type?: "submit" | "reset" | "button";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;
type LinkProps = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

type GetElementProps<
  T extends ButtonProps | LinkProps = ButtonProps | LinkProps,
  LinkOpt = LinkProps,
  BtnOpt = ButtonProps
> = T extends Pick<LinkProps, "href"> ? LinkOpt : BtnOpt;

interface ReactProps {
  size?: Sizes;
}

type Props<T> = ReactProps & GetElementProps<T>;

/**
 * Reusable Button Component
 * @param size size of the Button, default is m
 * @param href if specified, will return anchor element and switch other props to anchor attributes
 * @param children any valid JSX element
 * @param className additional class for component
 * @param ref forwarded ref of button or anchor
 * @returns Button as a button or anchor element
 * @example
 * <Button size="s" onClick={()=>console.log("echo!")}>Przycisk</Button>
 */
function ButtonInner<T extends ButtonProps | LinkProps>(
  { children, className, size = "m", ...otherProps }: Props<T>,
  ref: ForwardedRef<GetElementProps<T, HTMLAnchorElement, HTMLButtonElement>>
): ReactElement {
  const commonClass = cn("btn", `btn--${size}`, className);
  if ("href" in otherProps) {
    return (
      <a
        {...(otherProps as LinkProps)}
        className={commonClass}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...(otherProps as ButtonProps)}
      className={commonClass}
      ref={ref as ForwardedRef<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}

const Button = forwardRef(ButtonInner);
export default Button;
