import React from "react";
import styled from "styled-components";
import { BackLink } from "components/Link";
import { ProfileMenu } from "components/ProfileMenu";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { AdapterLink } from "components/Link";
import { RouteComponentProps } from "react-router";

const ITEM_HEIGHT = 48;

const RightSection = styled.div`
  display: flex;
`;

function RecipeDetailsBar({
  match: {
    params: { id }
  }
}: RouteComponentProps<{ id: string }>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
          <MenuItem to={`/recipes/${id}/edit`} component={AdapterLink}>
            Endre
          </MenuItem>
        </Menu>
      </RightSection>
    </>
  );
}

export { RecipeDetailsBar };
