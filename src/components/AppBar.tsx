import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Route } from "react-router-dom";

import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  useTheme
} from "@material-ui/core";
import { AccountCircle, ExitToApp, ArrowBack } from "@material-ui/icons";
import { firebase } from "../firebase";
import { TypographyProps } from "@material-ui/core/Typography";
import { AdapterLink } from "./Link";

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

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      const rootElement = document.getElementById("root");
      if (rootElement) {
        ReactDOM.unmountComponentAtNode(rootElement);
      }
      // document.location.reload();
    })
    .catch(function(error) {
      throw error;
    });
}
const auth = firebase.auth();

function AppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <MuiAppBar position="static">
      <StyledToolbar>
        <Route
          path="/recipes/add"
          component={() => (
            <>
              <BackLink />
              <CenteredHeading>Legg til oppskrift</CenteredHeading>
            </>
          )}
        />
        <Route
          path="/recipes/:id"
          component={() => (
            <>
              <BackLink />
            </>
          )}
        />
        <Route
          exact
          path="/"
          component={() => <StyledHeading>Oppskrifter</StyledHeading>}
        />
        {auth.currentUser && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={signOut}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <Typography variant="inherit">Logg ut</Typography>
              </MenuItem>
            </Menu>
          </div>
        )}
      </StyledToolbar>
    </MuiAppBar>
  );
}

export { AppBar };
