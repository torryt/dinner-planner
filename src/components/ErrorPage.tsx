import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Heading = styled(Typography)`
  text-align: center;
`;
function ErrorPage() {
  return (
    <>
      <Heading variant="h3" component="h1">
        Noe gikk galt{" "}
        <span role="img" aria-label="trist ansikt">
          😥
        </span>
      </Heading>
    </>
  );
}

export { ErrorPage };
