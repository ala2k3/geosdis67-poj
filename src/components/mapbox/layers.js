import colors from "../../styles/colors";

/* RO SECTEUR OPS */
export const RoSecteurOpsLayer = {
  id: "RoSecteurOpsLayer",
  type: "circle",
  source: "ro_secteur_ops",
  minzoom: 6,
  maxzoom: 9,
  paint: {
    "circle-opacity": 0.85,
    "circle-color": [
      "match",
      ["get", "etat"],
      "ok",
      colors.etat_ok,
      "ro",
      colors.etat_ro,
      "vigilance",
      colors.etat_vigilance,
      "crise",
      colors.etat_crise,
      "na",
      colors.etat_na,
      /* other */ colors.etat_na
    ],
    "circle-radius": {
      base: 1.75,
      stops: [[6, 10], [9, 30]]
    }
  }
};

export const RoSecteurOpsLayerLabel = {
  id: "RoSecteurOps-Label",
  type: "symbol",
  source: "ro_secteur_ops",
  minzoom: 6,
  maxzoom: 9,
  layout: {
    "text-field": "{effectif_reel_total}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": {
      base: 1.75,
      stops: [[6, 9], [9, 16]]
    }
  }
};

/* RO UT CIS */
export const RoUtCisLayer = {
  id: "RoUtCisLayer",
  type: "circle",
  source: "ro_ut_cis",
  minzoom: 9,
  maxzoom: 22,
  paint: {
    "circle-opacity": 0.85,
    "circle-color": [
      "match",
      ["get", "etat"],
      "ok",
      colors.etat_ok,
      "ro",
      colors.etat_ro,
      "vigilance",
      colors.etat_vigilance,
      "crise",
      colors.etat_crise,
      "na",
      colors.etat_na,
      /* other */ colors.etat_na
    ],
    "circle-radius": {
      base: 1.5,
      stops: [[9, 20], [22, 60]]
    }
  }
};

export const RoUtCisLayerLabel = {
  id: "RoUtCis-Label",
  type: "symbol",
  source: "ro_ut_cis",
  minzoom: 9,
  maxzoom: 22,
  layout: {
    "text-field": "{effectif_reel_total}",
    "text-size": {
      base: 1.5,
      stops: [[9, 14], [22, 30]]
    }
  }
};

/* STATIC LAYER */
export const layerCompagnieGeom = {
  id: "compagnie-geom",
  source: "compagnie",
  type: "fill",
  paint: {
    "fill-outline-color": "#212121",
    "fill-color": "#fff",
    "fill-opacity": 0
  }
};

export const layerCompagnieOutline = {
  id: "compagnie-outline",
  source: "compagnie",
  type: "line",
  paint: {
    "line-width": 3,
    "line-color": "#212121"
  }
};

export const layerCompagnieLabel = {
  id: "compagnie-label",
  source: "compagnie",
  type: "symbol",
  layout: {
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 10,
    "text-letter-spacing": 0.05,
    "text-offset": [0, 1.5],
    "text-field": ["get", "nom"]
  }
};

export const layerSecteurOpsGeom = {
  id: "secteur_ops-geom",
  type: "fill",
  source: "secteur_ops",
  minzoom: 6,
  maxzoom: 9,
  paint: {
    "fill-outline-color": "#607d8b",
    "fill-color": "#607d8b",
    "fill-opacity": 0.5
  }
};
export const layerSecteurOpsOutline = {
  id: "secteur_ops-outline",
  source: "secteur_ops",
  type: "line",
  minzoom: 6,
  maxzoom: 22,
  paint: {
    "line-width": 3.5,
    "line-color": "#607d8b"
  }
};
export const layerSecteurOpsLabel = {
  id: "secteur_ops-label",
  source: "secteur_ops",
  type: "symbol",
  minzoom: 6,
  maxzoom: 9,
  layout: {
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 8,
    "text-letter-spacing": 0.05,
    "text-offset": [0, 1.5],
    "text-field": ["get", "nom"]
  }
};

export const layerUtCisGeom = {
  id: "ut_cis-geom",
  type: "fill",
  source: "ut_cis",
  minzoom: 9,
  maxzoom: 22,
  paint: {
    "fill-outline-color": "#90a4ae",
    "fill-color": "#90a4ae",
    "fill-opacity": 0.5
  }
};
export const layerUtCisOutline = {
  id: "ut_cis-outline",
  source: "ut_cis",
  type: "line",
  minzoom: 9,
  maxzoom: 22,
  paint: {
    "line-width": 1.5,
    "line-color": "#90a4ae"
  }
};
export const layerUtCisLabel = {
  id: "ut_cis-label",
  source: "ut_cis",
  type: "symbol",
  minzoom: 9,
  maxzoom: 22,
  layout: {
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 8,
    "text-letter-spacing": 0.05,
    "text-offset": [0, 1.5],
    "text-field": ["get", "nom"]
  }
};
