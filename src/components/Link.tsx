import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Omit } from "@material-ui/types";

import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

export const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref as any} {...props} />
);

export const CollisionLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "ref">
>((props, ref) => <Link to={props.to as string} ref={ref as any} {...props} />);

export function BackLink() {
  const theme = useTheme();
  return (
    <IconButton edge="start" to="/" component={AdapterLink}>
      <span style={{ color: theme.palette.common.white }}>
        <ArrowBack />
      </span>
    </IconButton>
  );
}
