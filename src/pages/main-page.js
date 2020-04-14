import React, { useEffect, useState } from "react";

//import ro_ut_cis_ag from "../../public/geojson/h24_ro_ut_cis_ag.geojson";
//import ro_secteur_ops_ag from "../../public/geojson/h24_ro_secteur_ops_ag.geojson";

import ScreenPage from "../layout/screen";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import moment from "moment";
import axios from "axios";

export const AppContext = React.createContext();
//export const ThemeContext = React.createContext("theme.default");

const defaultViewport = {
  latitude: 48.6,
  longitude: 7.6,
  zoom: 7.7,
  minZoom: 6,
  maxZoom: 12,
  bearing: 0,
  pitch: 0
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

export default function MainPage() {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataRoUtCis, setDataRoUtCis] = useState(null);
  const [dataRoSecteurOps, setDataRoSecteurOps] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastDataUpdate, setLastDataUpdate] = useState("#N/A");
  const [maxValueSelected, setMaxValueSelected] = useState(0);
  const [viewport, setViewport] = useState(defaultViewport);
  const [featureClicInfo, setFeatureClicInfo] = useState(null);
  const [filtreLayerDateHeure, setFiltreLayerDateHeure] = useState(null);
  const [dateCourante, setDateCourante] = useState(new Date());
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const mobileWidth = 600;
    if (window.innerWidth < mobileWidth) {
      setIsMobileDevice(true);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    const fetchDataRoUtCis = async () => {
      setIsError(false);
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          Authorization: "token d0f57361334685ef2a1f60c8c2e74abc48e459c3",
          Accept: "application/vnd.github.v3.raw"
        },

        url:
          "https://api.github.com/repos/sgad-sdis67/gcuo/contents/covid19/ro_ut_cis.geojson"
      };

      try {
        const res = await axios(options);
        setDataRoUtCis(res.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchDataRoUtCis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDataRoSecteurOps = async () => {
      setIsError(false);
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          Authorization: "token d0f57361334685ef2a1f60c8c2e74abc48e459c3",
          Accept: "application/vnd.github.v3.raw"
        },

        url:
          "https://api.github.com/repos/sgad-sdis67/gcuo/contents/covid19/ro_secteur_ops.geojson"
      };

      try {
        const res = await axios(options);
        console.log(res.data);
        setDataRoSecteurOps(res.data);
      } catch (error) {
        console.log("erreur_ro_secteur_ops");
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchDataRoSecteurOps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDataLastCommit = async () => {
      setIsError(false);
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          Authorization: "token d0f57361334685ef2a1f60c8c2e74abc48e459c3",
          Accept: "application/json"
        },

        url: "https://api.github.com/repos/sgad-sdis67/gcuo/commits"
      };

      try {
        const res = await axios(options);
        const timestamp = res.data[0].commit.message;

        let heure = moment(new Date()).format("HH");
        let dateJour = moment(new Date()).format("YYYYMMDD");

        if (heure !== timestamp.substring(8, 10)) {
          heure -= 1;
        }

        setFiltreLayerDateHeure([
          "all",
          [
            "==",
            ["get", "heure"],
            heure.toLocaleString("fr-FR", {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
          ],
          ["==", ["get", "date"], dateJour.toString()]
        ]);

        setLastDataUpdate(
          timestamp.substring(6, 8) +
            "/" +
            timestamp.substring(4, 6) +
            "/" +
            timestamp.substring(0, 4) +
            " " +
            timestamp.substring(8, 10) +
            ":" +
            timestamp.substring(10, 12)
        );
        //console.log(lastDataUpdate);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchDataLastCommit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResize = () => {
    const mobileWidth = 600;
    setIsMobileDevice(window.innerWidth < mobileWidth);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          openDrawer,
          setOpenDrawer,
          dataRoUtCis,
          setDataRoUtCis,
          dataRoSecteurOps,
          setDataRoSecteurOps,
          isLoading,
          isError,
          lastDataUpdate,
          setLastDataUpdate,
          maxValueSelected,
          setMaxValueSelected,
          viewport,
          setViewport,
          featureClicInfo,
          setFeatureClicInfo,
          filtreLayerDateHeure,
          setFiltreLayerDateHeure,
          dateCourante,
          setDateCourante,
          isMobileDevice
        }}
      >
        <ScreenPage />
      </AppContext.Provider>
    </div>
  );
}
