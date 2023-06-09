import { ReactNode } from "react";
import classNames from "classnames";

const alignItemsToClassNameMap = {
  baseline: "vuiFlexContainer--alignItemsBaseline",
  center: "vuiFlexContainer--alignItemsCenter",
  end: "vuiFlexContainer--alignItemsEnd",
  start: "vuiFlexContainer--alignItemsStart",
  stretch: "vuiFlexContainer--alignItemsStretch",
} as const;

const directionToClassNameMap = {
  column: "vuiFlexContainer--directionColumn",
  columnReverse: "vuiFlexContainer--directionColumnReverse",
  row: "vuiFlexContainer--directionRow",
  rowReverse: "vuiFlexContainer--directionRowReverse",
} as const;

const justifyContentToClassNameMap = {
  center: "vuiFlexContainer--justifyContentCenter",
  end: "vuiFlexContainer--justifyContentEnd",
  start: "vuiFlexContainer--justifyContentStart",
  spaceAround: "vuiFlexContainer--justifyContentSpaceAround",
  spaceBetween: "vuiFlexContainer--justifyContentSpaceBetween",
  spaceEvenly: "vuiFlexContainer--justifyContentSpaceEvenly",
} as const;

const spacingToClassNameMap = {
  none: "vuiFlexContainer--spacingNone",
  xs: "vuiFlexContainer--spacingXs",
  s: "vuiFlexContainer--spacingS",
  m: "vuiFlexContainer--spacingM",
  l: "vuiFlexContainer--spacingL",
  xl: "vuiFlexContainer--spacingXl",
} as const;

export type Props = {
  children?: ReactNode;
  alignItems?: keyof typeof alignItemsToClassNameMap;
  direction?: keyof typeof directionToClassNameMap;
  justifyContent?: keyof typeof justifyContentToClassNameMap;
  spacing?: keyof typeof spacingToClassNameMap;
  wrap?: boolean;
  className?: string;
};

export const VuiFlexContainer = ({
  children,
  alignItems = "stretch",
  direction = "row",
  justifyContent = "start",
  spacing = "m",
  wrap,
  className,
}: Props) => {
  const classes = classNames(
    className,
    "vuiFlexContainer",
    alignItemsToClassNameMap[alignItems],
    directionToClassNameMap[direction],
    justifyContentToClassNameMap[justifyContent],
    spacingToClassNameMap[spacing],
    {
      "vuiFlexContainer--wrap": wrap,
    }
  );

  return <div className={classes}>{children}</div>;
};
