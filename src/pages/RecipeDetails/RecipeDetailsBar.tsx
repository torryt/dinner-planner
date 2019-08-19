import React from "react";
import { BackLink } from "components/Link";
import { ProfileMenu } from "components/ProfileMenu";

function RecipeDetailsBar() {
  return (
    <>
      <BackLink />
      <div>
        <ProfileMenu />
      </div>
    </>
  );
}

export { RecipeDetailsBar };
