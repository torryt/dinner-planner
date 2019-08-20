import React from "react";
import { BackLink } from "components/Link";
import { CenteredHeading } from "components/Heading";
import { ProfileMenu } from "components/ProfileMenu";
import { RouteComponentProps } from "react-router";

function EditRecipeBar({
  match: {
    params: { id }
  }
}: RouteComponentProps<{ id: string }>) {
  return (
    <>
      <BackLink to={`/recipes/${id}`} />
      <CenteredHeading>Endre oppskrift</CenteredHeading>
      <ProfileMenu />
    </>
  );
}

export { EditRecipeBar };
