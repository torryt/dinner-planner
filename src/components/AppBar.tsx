import React from "react";
import styled from "styled-components";

import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledAppBar = styled(MuiAppBar)`
  margin-bottom: 1rem;
`;

function AppBar({ children, ...restProps }: { children?: React.ReactNode }) {
  return (
    <StyledAppBar position="static" {...restProps}>
      <StyledToolbar>{children && children}</StyledToolbar>
    </StyledAppBar>
  );
}

export { AppBar };
