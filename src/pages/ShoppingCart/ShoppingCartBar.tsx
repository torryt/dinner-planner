import React from "react";
import styled from "styled-components";
import { ProfileMenu } from "components/ProfileMenu";
import { StyledHeading } from "components/Heading";
import { IconButton } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { AdapterLink, BackLink } from "components/Link";

const RightWrapper = styled.div`
  display: flex;
`;
function ShoppingCartBar() {
  return (
    <>
      <BackLink />
      <StyledHeading>Handlelapp</StyledHeading>
      <RightWrapper>
        <ProfileMenu />
      </RightWrapper>
    </>
  );
}

export { ShoppingCartBar };
