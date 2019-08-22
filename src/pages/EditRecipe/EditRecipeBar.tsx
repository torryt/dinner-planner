import React from "react";
import { BackLink } from "components/Link";
import { CenteredHeading } from "components/Heading";
import { ProfileMenu } from "components/ProfileMenu";

function EditRecipeBar({ recipeId }: { recipeId: string }) {
  return (
    <>
      <BackLink to={`/recipes/${recipeId}`} />
      <CenteredHeading>Endre oppskrift</CenteredHeading>
      <ProfileMenu />
    </>
  );
}

export { EditRecipeBar };
