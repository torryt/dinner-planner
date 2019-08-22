import React from "react";
import { AppBar } from "./AppBar";
import { Container } from "@material-ui/core";

interface PageWrapperProps {
  renderAppBar: (props?: any) => React.ReactNode | React.ReactNodeArray;
  children:
    | ((props?: any) => React.ReactNode | React.ReactNodeArray)
    | React.ReactNode
    | React.ReactNodeArray;
}
function PageWrapper({
  renderAppBar,
  children,
  ...restProps
}: PageWrapperProps) {
  return (
    <>
      <AppBar>{renderAppBar(restProps)}</AppBar>
      <Container maxWidth="sm">
        <>{typeof children === "function" ? children(restProps) : children}</>
      </Container>
    </>
  );
}

export { PageWrapper };
