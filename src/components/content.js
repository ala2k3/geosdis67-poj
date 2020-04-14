import React, { useContext } from "react";

import { AppContext } from "../pages/main-page";
import Map from "./map";

import { fade, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  updateDate: {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    padding: theme.spacing(1)
  },
  appToolBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  hideMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  loader: {
    position: "fixed",
    top: "50%",
    left: "50%",
    /* bring your own prefixes */
    transform: "translate(-50%, -50%)"
  }
}));

const Content = () => {
  const { openDrawer, isError, isLoading } = useContext(AppContext);

  const classes = useStyles();

  return (
    <main
      className={clsx(
        classes.content,
        { [classes.contentShift]: openDrawer },
        { [classes.hideMobile]: openDrawer }
      )}
    >
      <div className={classes.toolbar} />
      {isError && <div>Erreur lors du chargement des donnÃ©es ...</div>}

      {isLoading ? (
        <div className={classes.loader}>
          <CircularProgress size={64} />
        </div>
      ) : (
        <Map />
      )}
    </main>
  );
};

export default Content;
