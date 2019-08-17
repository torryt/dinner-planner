import React from "react";
import ReactDOM from "react-dom";

import { firebase } from "../firebase";

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { AccountCircle, ExitToApp } from "@material-ui/icons";

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

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  if (!auth.currentUser) {
    return null;
  }
  return (
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
  );
}

export { ProfileMenu };
