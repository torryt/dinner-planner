import React, { ReactChildren } from "react";
import styled from "styled-components";

import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core";

import { AdapterLink } from "./components/Link";
import { ProfileMenu } from "./components/ProfileMenu";

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
