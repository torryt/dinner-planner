import React from "react";
import styled from "styled-components";
import { ProfileMenu } from "components/ProfileMenu";
import { StyledHeading } from "components/Heading";
import { IconButton } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { AdapterLink } from "components/Link";

const RightWrapper = styled.div`
  display: flex;
`;
function RecipeListBar() {
  return (
    <>
      <StyledHeading>Oppskrifter</StyledHeading>
      <RightWrapper>
        <ProfileMenu />

        <IconButton to="/shopping-cart" component={AdapterLink} color="inherit">
          <ShoppingCartOutlined />
        </IconButton>
      </RightWrapper>
    </>
  );
}

export { RecipeListBar };
