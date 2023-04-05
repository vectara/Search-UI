import classNames from "classnames";

const COLOR = [
  "accent",
  "primary",
  "success",
  "warning",
  "danger",
  "subdued",
  "normal",
] as const;

type Props = {
  iconElement: any;
  color: typeof COLOR[number];
  size: number;
  className?: string;
};

export const VuiIcon = ({ iconElement, color, size, className }: Props) => {
  const classes = classNames(className, "vuiIcon", `vuiIcon--${color}`);
  const IconElement = iconElement as keyof JSX.IntrinsicElements;
  return (
    <div className={classes}>
      <IconElement size={size} />
    </div>
  );
};
