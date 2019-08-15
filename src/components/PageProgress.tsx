import React from "react";
import styled from "styled-components";

import { CircularProgress } from "@material-ui/core";

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

function PageProgress() {
  return (
    <ProgressWrapper>
      <CircularProgress size={60} />
    </ProgressWrapper>
  );
}

export { PageProgress };
