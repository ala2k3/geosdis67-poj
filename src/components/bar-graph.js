import React, { useState, useContext } from "react";

import { AppContext } from "../pages/main-page";
import UtCisChart from "./charts/ut_cis-chart";
import SecteurOpsChart from "./charts/secteur_ops-chart";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";

const LABEL_UT_CIS = "[ UT / CIS ] ";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: "100%",
    height: "60%",
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      height: `calc(100% - 56px)`
    }
  },
  drawerPaper: {
    width: "100%",
    height: "60%",
    [theme.breakpoints.down("sm")]: {
      height: `calc(100% - 56px)`
    }
  },
  hide: {
    display: "none"
  },
  hideMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  appToolBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between"
  },
  toolbarDate: {
    display: "flex",

    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}));

const BarGraph = () => {
  const {
    featureClicInfo,
    setFeatureClicInfo,
    openDrawer,
    setOpenDrawer,
    dataRoUtCis,
    dataRoSecteurOps,
    maxValueSelected,
    dateCourante,
    setDateCourante
  } = useContext(AppContext);

  const classes = useStyles();

  const [disabledPrevious, setDisabledPrevious] = useState(false);
  const [disabledNext, setDisabledNext] = useState(true);

  const formatDateCourante = () => {
    var dateFormatCourante = "";
    var y = dateCourante.getFullYear().toString();
    var m = (dateCourante.getMonth() + 1).toString();
    var d = dateCourante.getDate().toString();
    d.length === 1 && (d = "0" + d);
    m.length === 1 && (m = "0" + m);
    dateFormatCourante = y + m + d;
    console.log("bargrph > " + dateFormatCourante);
    return dateFormatCourante;
  };

  const handleDrawerClose = () => {
    console.log("handleDrawerClose");
    setOpenDrawer(false);
    setFeatureClicInfo(null);
    setDateCourante(new Date());
    setDisabledPrevious(false);
    setDisabledNext(true);
  };

  const handleChangeDate = addJour => {
    let dateJour = new Date();
    let dateJourMoins7 = new Date();
    let dateClone = new Date(dateCourante);
    dateClone.setDate(dateClone.getDate() + addJour);
    dateJourMoins7.setDate(dateJourMoins7.getDate() - 7);

    if (dateJour.getDate() === dateClone.getDate()) {
      setDisabledNext(true);
      setDisabledPrevious(false);
    } else if (dateJourMoins7.getDate() === dateClone.getDate()) {
      setDisabledNext(false);
      setDisabledPrevious(true);
    } else {
      setDisabledNext(false);
      setDisabledPrevious(false);
    }
    setDateCourante(dateClone);

    // maj des donnees
  };

  return featureClicInfo ? (
    <Drawer
      className={classes.drawer}
      //variant="persistent"
      anchor="bottom"
      open={openDrawer}
      onClose={handleDrawerClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" noWrap>
          {featureClicInfo.label + featureClicInfo.f.nom}
        </Typography>

        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.toolbarDate}>
        <IconButton
          disabled={disabledPrevious}
          onClick={() => handleChangeDate(-1)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="body1" noWrap>
          Données du {dateCourante.toLocaleDateString()}
        </Typography>
        <IconButton disabled={disabledNext} onClick={() => handleChangeDate(1)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      {featureClicInfo.label === LABEL_UT_CIS ? (
        <UtCisChart
          brutData={dataRoUtCis}
          nom={featureClicInfo.f.nom}
          date={formatDateCourante()}
          maxValue={maxValueSelected}
        />
      ) : (
        <SecteurOpsChart
          brutData={dataRoSecteurOps}
          nom={featureClicInfo.f.nom}
          date={formatDateCourante()}
          maxValue={maxValueSelected}
        />
      )}
    </Drawer>
  ) : (
    <div>Rien Ã  afficher </div>
  );
};

export default BarGraph;
