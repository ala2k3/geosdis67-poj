import React from "react";

import Header from "../components/header";
import BarGraph from "../components/bar-graph";
import Content from "../components/content";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

const ScreenPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />

      <Content />
      <BarGraph />
    </div>
  );
};

export default ScreenPage;
