import React from "react";
import styled from "styled-components";
import { List, Fab, Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useAsyncFn, useAsync } from "react-use";

import { PageWrapper } from "components/PageWrapper";
import { firebase } from "../../firebaseSetup";

import { ShoppingCartBar } from "./ShoppingCartBar";
import { User } from "firebase";
import { PageProgress } from "components/PageProgress";

function ShoppingCart() {
  const currentUser = firebase.auth().currentUser as User;
  // if (cartState.error) {
  //   throw Error();
  // }
  // if (cartState.loading) {
  //   return <PageProgress />;
  // }
  // const recipes = cartState.value
  //   ? cartState.value.recipes.map(x => <div>{x}</div>)
  //   : null;
  return <PageWrapper renderAppBar={ShoppingCartBar}>{}</PageWrapper>;
}

export { ShoppingCart };
