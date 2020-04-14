import React, { useContext } from "react";

import { AppContext } from "../pages/main-page";
//import ro_ut_cis_ag from "../../public/geojson/h24_ro_ut_cis_ag.geojson";
//import ro_secteur_ops_ag from "../../public/geojson/h24_ro_secteur_ops_ag.geojson";

import MapGL, { Source, Layer, NavigationControl } from "react-map-gl";

import compagnie from "../../public/geojson/compagnie.geojson";
import ut_cis from "../../public/geojson/ut_cis.geojson";
import secteur_ops from "../../public/geojson/secteur_ops.geojson";

import { makeStyles } from "@material-ui/core/styles";

import {
  layerCompagnieGeom,
  layerCompagnieOutline,
  layerCompagnieLabel,
  layerSecteurOpsGeom,
  layerSecteurOpsOutline,
  layerSecteurOpsLabel,
  layerUtCisGeom,
  layerUtCisOutline,
  layerUtCisLabel,
  RoSecteurOpsLayer,
  RoSecteurOpsLayerLabel,
  RoUtCisLayer,
  RoUtCisLayerLabel
} from "./mapbox/layers";

const LABEL_UT_CIS = "[ UT / CIS ] ";
const LABEL_SECTEUR_OPS = "[ SECTEUR OPS ] ";
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2dhZCIsImEiOiJjazd6MDVibnUwMHp6M2xydzU5Mm5sOGI2In0.wXfkxolODM8mZr5kGwuySw";

const useStyles = makeStyles(theme => ({
  navStyle: {
    position: "absolute",
    top: 64,
    left: 0,
    padding: "15px"
  }
}));

const Map = () => {
  const {
    setOpenDrawer,
    filtreLayerDateHeure,
    setViewport,
    setMaxValueSelected,
    setFeatureClicInfo,
    viewport,
    dataRoSecteurOps,
    dataRoUtCis,
    isMobileDevice
  } = useContext(AppContext);

  const classes = useStyles();

  const getMaxEffectifTotal = (nom, searchArray) => {
    let maxEffectifTotal = 120;
    // preparation tableau
    const filterTableau = searchArray.features.filter(
      f => f.properties.nom === nom
    );

    maxEffectifTotal = Math.max.apply(
      Math,
      filterTableau.map(function(o) {
        return o.properties.effectif_reel_total;
      })
    );

    maxEffectifTotal = Math.ceil(maxEffectifTotal / 10) * 10 + 10;
    return maxEffectifTotal;
  };

  const handleViewportChange = viewport => {
    setViewport(viewport);
  };

  const handleClickLayer = event => {
    setFeatureClicInfo(null);

    const feature = event.features[0];
    if (feature) {
      let featureClicInfo = null;
      setMaxValueSelected(0);

      if (feature.layer.id === RoSecteurOpsLayer.id) {
        //feature clic
        featureClicInfo = {
          //lngLat: event.lngLat,
          label: LABEL_SECTEUR_OPS,
          f: feature.properties
        };

        setMaxValueSelected(
          getMaxEffectifTotal(featureClicInfo.f.nom, dataRoSecteurOps)
        );
        //console.log(maxValueSelected);
        setFeatureClicInfo(featureClicInfo);
      } else if (feature.layer.id === RoUtCisLayer.id) {
        featureClicInfo = {
          //lngLat: event.lngLat,
          label: LABEL_UT_CIS,
          f: feature.properties
        };

        setMaxValueSelected(
          getMaxEffectifTotal(featureClicInfo.f.nom, dataRoUtCis)
        );
        //console.log(maxValueSelected);
        setFeatureClicInfo(featureClicInfo);
      }
      setOpenDrawer(true);
      //console.log(openDrawer);
    }
  };

  return (
    <div id="map" style={{ position: "absolute", top: 0, left: 0 }}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[RoSecteurOpsLayer.id, RoUtCisLayer.id]}
        onClick={handleClickLayer}
      >
        <Source type="geojson" data={compagnie}>
          <Layer {...layerCompagnieGeom} />
          <Layer {...layerCompagnieLabel} />
        </Source>
        <Source type="geojson" data={secteur_ops}>
          <Layer {...layerSecteurOpsGeom} />
          <Layer {...layerSecteurOpsOutline} />
          <Layer {...layerSecteurOpsLabel} />
        </Source>
        <Source type="geojson" data={ut_cis}>
          <Layer {...layerUtCisGeom} />
          <Layer {...layerUtCisOutline} />
          <Layer {...layerUtCisLabel} />
        </Source>
        <Source type="geojson" data={compagnie}>
          <Layer {...layerCompagnieOutline} />
        </Source>

        <Source type="geojson" data={dataRoUtCis}>
          <Layer {...RoUtCisLayer} filter={filtreLayerDateHeure} />
          <Layer {...RoUtCisLayerLabel} filter={filtreLayerDateHeure} />
        </Source>

        <Source type="geojson" data={dataRoSecteurOps}>
          <Layer {...RoSecteurOpsLayer} filter={filtreLayerDateHeure} />
          <Layer {...RoSecteurOpsLayerLabel} filter={filtreLayerDateHeure} />
        </Source>

        {!isMobileDevice ? (
          <div className={classes.navStyle}>
            <NavigationControl />
          </div>
        ) : (
          ""
        )}
      </MapGL>
    </div>
  );
};

Map.propTypes = {};

export default Map;
