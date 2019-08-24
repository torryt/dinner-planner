import React from "react";
import styled from "styled-components";
import { ProfileMenu } from "components/ProfileMenu";
import { StyledHeading } from "components/Heading";
import { BackLink } from "components/Link";

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
