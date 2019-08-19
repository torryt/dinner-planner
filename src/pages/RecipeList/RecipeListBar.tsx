import React from "react";
import { ProfileMenu } from "components/ProfileMenu";
import { StyledHeading } from "components/Heading";

function RecipeListBar() {
  return (
    <>
      <StyledHeading>Oppskrifter</StyledHeading>
      <ProfileMenu />
    </>
  );
}

export { RecipeListBar };
