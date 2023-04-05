import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  target?: "_blank";
};

export const VuiLink = ({
  children,
  href,
  target,
  className,
  ...rest
}: Props) => {
  const props: {
    target?: string;
    rel?: string;
  } = { ...rest };

  if (target === "_blank") {
    props.target = target;
    props.rel = "noreferrer noopener";
  }

  return (
    <a className={classNames("vuiLink", className)} href={href} {...props}>
      {children}
    </a>
  );
};
