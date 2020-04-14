import React, { useContext } from "react";

import { AppContext } from "../pages/main-page";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
  }
}));

const Header = () => {
  const { lastDataUpdate, isMobileDevice } = useContext(AppContext);

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.appToolBar}>
        <Typography variant="h5" noWrap>
          {isMobileDevice
            ? "GeoSDIS67 > POJ"
            : "GeoSDIS67 > Potentiel Opérationnel Journalier"}
        </Typography>

        <Typography className={classes.updateDate} variant="body2" noWrap>
          {lastDataUpdate}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
