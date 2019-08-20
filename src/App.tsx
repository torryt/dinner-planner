import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { RecipeList, RecipeListBar } from "./pages/RecipeList";
import { AddRecipe, AddRecipeBar } from "./pages/AddRecipe";
import { AppBar } from "./AppBar";
import { Container } from "./components/Container";
import { RecipeDetails, RecipeDetailsBar } from "pages/RecipeDetails";
import { EditRecipe, EditRecipeBar } from "pages/EditRecipe";

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
            <CssBaseline />
            <AppBar>
              <Switch>
                <Route exact path="/" component={RecipeListBar} />
                <Route path="/recipes/add" component={AddRecipeBar} />
                <Route path="/recipes/:id/edit" component={EditRecipeBar} />
                <Route path="/recipes/:id" component={RecipeDetailsBar} />
              </Switch>
            </AppBar>
            <Container maxWidth="sm">
              <Switch>
                <Route exact path="/" component={RecipeList} />
                <Route path="/recipes/add" component={AddRecipe} />
                <Route path="/recipes/:id/edit" component={EditRecipe} />
                <Route path="/recipes/:id" component={RecipeDetails} />
              </Switch>
            </Container>
          </>
        </StylesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
