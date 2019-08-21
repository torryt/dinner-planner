import React from "react";
import styled from "styled-components";

import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

function AppBar({ children, ...restProps }: { children?: React.ReactNode }) {
  return (
    <MuiAppBar position="static" {...restProps}>
      <StyledToolbar>{children && children}</StyledToolbar>
    </MuiAppBar>
  );
}

export { AppBar };
