import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { RecipeList } from "./pages/RecipeList";
import { AddRecipe } from "./pages/AddRecipe";
import { AppBar } from "./components/AppBar";
import { Container } from "./components/Container";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424250"
    },
    secondary: {
      main: "#0044ff"
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#424250"
      }
    }
  }
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <>
            {CssBaseline}
            <AppBar />
            <Container />
            <Route exact path="/" component={RecipeList} />
            <Route path="/recipes/add" component={AddRecipe} />
          </>
        </StylesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
