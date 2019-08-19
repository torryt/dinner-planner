import React from "react";
import styled from "styled-components";
import { TypographyProps } from "@material-ui/core/Typography";
import { Typography } from "@material-ui/core";

export function Heading(props: TypographyProps) {
  const { children, ...restProps } = props;
  return (
    <Typography variant="h6" component="h1" {...restProps}>
      {children}
    </Typography>
  );
}

export const StyledHeading = styled(Heading)`
  flex-grow: 1;
`;

export const CenteredHeading = styled(Heading)`
  flex-grow: 1;
  text-align: center;
`;
