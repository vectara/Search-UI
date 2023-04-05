import classNames from "classnames";

import { ReactNode } from "react";

const SIZE = ["s", "m", "l"] as const;
const TEXT_ALIGN = ["left", "center", "right"];

type Props = {
  children?: ReactNode;
  size?: typeof SIZE[number];
  align?: typeof TEXT_ALIGN[number];
};

export const VuiText = ({ children, size = "s", align = "left" }: Props) => {
  const classes = classNames(
    "vuiText",
    `vuiText--${size}`,
    `vuiText--${align}`
  );
  return <div className={classes}>{children}</div>;
};
