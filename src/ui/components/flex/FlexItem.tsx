import classNames from "classnames";
import { ReactNode } from "react";

const GROW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type Props = {
  children?: ReactNode;
  grow?: typeof GROW[number];
  className?: string;
};

export const VuiFlexItem = ({ children, grow = 0, className }: Props) => {
  const classes = classNames(
    "vuiFlexItem",
    `vuiFlexItem--flexGrow${grow}`,
    className
  );

  return <div className={classes}>{children}</div>;
};
