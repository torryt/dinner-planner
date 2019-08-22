import React from "react";
import styled from "styled-components";
import { List, Fab, Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useAsyncFn } from "react-use";

import { PageWrapper } from "components/PageWrapper";
import { firebase } from "../../firebaseSetup";

import { ShoppingCartBar } from "./ShoppingCartBar";

function ShoppingCart() {
  return <PageWrapper renderAppBar={ShoppingCartBar}>Content here</PageWrapper>;
}

export { ShoppingCart };
