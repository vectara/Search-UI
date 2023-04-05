import { ReactNode } from "react";
import classNames from "classnames";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiTitle } from "../typography/Title";
import { VuiTextColor } from "../typography/TextColor";

const COLOR = ["accent", "primary", "success", "warning", "danger"] as const;
const HEADING_ELEMENT = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

type Props = {
  children?: ReactNode;
  title: string;
  headingElement: typeof HEADING_ELEMENT[number];
  color: typeof COLOR[number];
};

export const VuiCallout = ({
  children,
  title,
  headingElement,
  color,
}: Props) => {
  const classes = classNames("vuiCallout", `vuiCallout--${color}`);
  const HeadingElement = headingElement as keyof JSX.IntrinsicElements;

  return (
    <div className={classes}>
      <VuiTitle size="s">
        <HeadingElement>
          <VuiTextColor color={color}>{title}</VuiTextColor>
        </HeadingElement>
      </VuiTitle>
      {children && <VuiSpacer size="xs" />}
      {children}
    </div>
  );
};
