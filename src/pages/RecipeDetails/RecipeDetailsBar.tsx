import React from "react";
import styled from "styled-components";
import { useAsyncFn } from "react-use";
import {
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { MoreVert, Delete, Edit } from "@material-ui/icons";

import { ProfileMenu } from "components/ProfileMenu";
import { BackLink, AdapterLink } from "components/Link";
import { Redirect } from "react-router";
import { firebase } from "../../firebaseSetup";

const ITEM_HEIGHT = 48;

const RightSection = styled.div`
  display: flex;
`;

function deleteRecipe(recipeId: string) {
  return async () => {
    const db = firebase.firestore();
    const result = await db
      .collection("recipes")
      .doc(recipeId)
      .update({ isDeleted: true })
      .then(() => ({ success: true }));
    return result;
  };
}

function RecipeDetailsBar({ recipeId }: { recipeId: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteState, deleteTrigger] = useAsyncFn(deleteRecipe(recipeId), [
    recipeId
  ]);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  if (deleteState.value) {
    return (
      <Redirect
        to={{ pathname: "/", search: `?deletedRecipeId=${recipeId}` }}
      />
    );
  }
  return (
    <>
      <BackLink />
      <RightSection>
        <ProfileMenu />
        <IconButton
          aria-label="mer"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem to={`/recipes/${recipeId}/edit`} component={AdapterLink}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <Typography variant="inherit">Endre</Typography>
          </MenuItem>
          <MenuItem onClick={deleteTrigger}>
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <Typography variant="inherit">Slett</Typography>
          </MenuItem>
        </Menu>
      </RightSection>
    </>
  );
}

export { RecipeDetailsBar };
