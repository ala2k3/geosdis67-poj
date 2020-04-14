import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/theme";

import MainPage from "./pages/main-page";

import "./styles.css";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MainPage />
  </ThemeProvider>,
  document.getElementById("root")
);
