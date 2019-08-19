import React from "react";
import { BackLink } from "components/Link";
import { CenteredHeading } from "components/Heading";
import { ProfileMenu } from "components/ProfileMenu";

function AddRecipeBar() {
  return (
    <>
      <BackLink />
      <CenteredHeading>Legg til oppskrift</CenteredHeading>
      <ProfileMenu />
    </>
  );
}

export { AddRecipeBar };
