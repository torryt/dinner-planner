import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Omit } from "@material-ui/types";

export const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref as any} {...props} />
);

export const CollisionLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "innerRef">
>((props, ref) => (
  <Link to={props.to as string} innerRef={ref as any} {...props} />
));
