import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { TypographyProps } from "@material-ui/core/Typography";

import { AdapterLink } from "./Link";
import { ProfileMenu } from "./ProfileMenu";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

function Heading(props: TypographyProps) {
  const { children, ...restProps } = props;
  return (
    <Typography variant="h6" component="h1" {...restProps}>
      {children}
    </Typography>
  );
}
const StyledHeading = styled(Heading)`
  flex-grow: 1;
`;

const CenteredHeading = styled(Heading)`
  flex-grow: 1;
  text-align: center;
`;

function BackLink() {
  const theme = useTheme();
  return (
    <IconButton edge="start" to="/" component={AdapterLink}>
      <span style={{ color: theme.palette.common.white }}>
        <ArrowBack />
      </span>
    </IconButton>
  );
}

function AppBar() {
  return (
    <MuiAppBar position="static">
      <StyledToolbar>
        <Switch>
          <Route
            path="/recipes/add"
            component={() => (
              <>
                <BackLink />
                <CenteredHeading>Legg til oppskrift</CenteredHeading>
                <ProfileMenu />
              </>
            )}
          />
          <Route
            exact
            path="/recipes/:id"
            component={() => (
              <>
                <BackLink />
                <div>
                  <ProfileMenu />
                </div>
              </>
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <>
                <StyledHeading>Oppskrifter</StyledHeading>
                <ProfileMenu />
              </>
            )}
          />
        </Switch>
      </StyledToolbar>
    </MuiAppBar>
  );
}

export { AppBar };
