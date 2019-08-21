import React from "react";
import styled from "styled-components";
import { ArrowBack } from "@material-ui/icons";
import { withTheme } from "@material-ui/styles";
import { IconButton, Theme } from "@material-ui/core";

import { ErrorPage } from "./ErrorPage";
import { AppBar } from "./AppBar";

const StyledAppBar = styled(AppBar)`
  margin-bottom: 3rem;
`;
interface ErrorBoundaryState {
  hasError: boolean;
}
interface ErrorBoundaryProps {
  theme: Theme | unknown;
}
class ErrorBoundaryComponent extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // TODO: Log to Sentry
  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    const theme = this.props.theme as Theme;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <StyledAppBar>
            <IconButton
              aria-label="gå tilbake"
              onClick={() => this.setState({ hasError: false })}
            >
              <ArrowBack style={{ color: theme.palette.common.white }} />
            </IconButton>
          </StyledAppBar>
          <ErrorPage />
        </>
      );
    }

    return this.props.children;
  }
}
const ErrorBoundary = withTheme(ErrorBoundaryComponent);
export { ErrorBoundary };
