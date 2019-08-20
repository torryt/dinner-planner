import React from "react";
import styled from "styled-components";

import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

function AppBar({ children }: { children: React.ReactNode }) {
  return (
    <MuiAppBar position="static">
      <StyledToolbar>{children}</StyledToolbar>
    </MuiAppBar>
  );
}

export { AppBar };
