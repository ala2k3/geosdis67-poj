import React from "react";
import { Bar } from "react-chartjs-2";
import colors from "../../styles/colors";

const formatOptions = maxValue => {
  const options = {
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true
      }
    },
    tooltips: {
      mode: "label"
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          stacked: true,
          labels: [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ]
        }
      ],
      yAxes: [
        {
          type: "linear",
          beginAtZero: true,
          display: true,
          stacked: true,
          position: "left",
          id: "y-axis-1",
          ticks: {
            min: 0,
            max: maxValue
          }
        },
        {
          type: "linear",
          beginAtZero: true,
          position: "right",
          display: false,
          id: "y-axis-2",
          ticks: {
            min: 0,
            max: maxValue
          }
        }
      ]
    }
  };

  return options;
};

const formatData = (data, nom, date) => {
  const datasets = [];

  const filterTableau = data.features.filter(
    f => f.properties.nom === nom && f.properties.date === date
  );

  const sortTableau = filterTableau.sort((a, b) =>
    a.properties.heure.localeCompare(b.properties.heure)
  );

  // GESTION HISTORIQUE SANS DISTINCTION ASTREINTE / GARDE
  const maxEffectifReelAstreinte = Math.max.apply(
    Math,
    filterTableau.map(function(o) {
      return o.properties.effectif_reel_astreinte;
    })
  );
  const maxEffectifPrevAstreinte = Math.max.apply(
    Math,
    filterTableau.map(function(o) {
      return o.properties.effectif_previsionnel_astreinte;
    })
  );
  const maxEffectifReelGarde = Math.max.apply(
    Math,
    filterTableau.map(function(o) {
      return o.properties.effectif_reel_garde;
    })
  );
  const maxEffectifPrevGarde = Math.max.apply(
    Math,
    filterTableau.map(function(o) {
      return o.properties.effectif_previsionnel_garde;
    })
  );
  console.log(maxEffectifReelAstreinte);
  console.log(maxEffectifPrevAstreinte);
  console.log(maxEffectifReelGarde);
  console.log(maxEffectifPrevGarde);
  if (
    maxEffectifReelAstreinte +
      maxEffectifPrevAstreinte +
      maxEffectifReelGarde +
      maxEffectifPrevGarde ===
    0
  ) {
    datasets.push({
      label: "Eff. Reel ",
      fill: false,
      backgroundColor: colors.total_reel,
      borderColor: colors.total_reel,
      hoverBackgroundColor: colors.total_reel,
      hoverBorderColor: colors.hover_border,
      yAxisID: "y-axis-1",
      stack: "reel",
      order: 5,
      data: sortTableau.map(f => Number(f.properties.effectif_reel_total))
    });
    datasets.push({
      label: "Eff. Prev.",
      fill: false,
      backgroundColor: colors.total_previsionnel,
      borderColor: colors.total_previsionnel,
      hoverBackgroundColor: colors.total_previsionnel,
      hoverBorderColor: colors.hover_border,
      yAxisID: "y-axis-1",
      stack: "prev",
      order: 7,
      data: sortTableau.map(f =>
        Number(f.properties.effectif_previsionnel_total)
      )
    });
  } else {
    datasets.push({
      label: "Eff. Reel (G)",
      fill: false,
      backgroundColor: colors.garde_reel,
      borderColor: colors.garde_reel,
      hoverBackgroundColor: colors.garde_reel,
      hoverBorderColor: colors.hover_border,
      yAxisID: "y-axis-1",
      stack: "reel",
      order: 5,
      data: sortTableau.map(f => Number(f.properties.effectif_reel_garde))
    });
    datasets.push({
      label: "Eff. Reel (A)",
      fill: false,
      backgroundColor: colors.astreinte_reel,
      borderColor: colors.astreinte_reel,
      hoverBackgroundColor: colors.astreinte_reel,
      hoverBorderColor: colors.hover_border,
      yAxisID: "y-axis-1",
      stack: "reel",
      order: 4,
      data: sortTableau.map(f => Number(f.properties.effectif_reel_astreinte))
    });

    datasets.push({
      label: "Eff. Prev. (G)",
      fill: false,
      backgroundColor: colors.garde_previsionnel,
      borderColor: colors.garde_previsionnel,
      hoverBackgroundColor: colors.garde_previsionnel,
      hoverBorderColor: colors.hover_border,
      yAxisID: "y-axis-1",
      stack: "prev",
      order: 7,
      data: sortTableau.map(f =>
        Number(f.properties.effectif_previsionnel_garde)
      )
    });

    datasets.push({
      label: "Eff. Prev. (A)",
      fill: false,
      backgroundColor: colors.astreinte_previsionnel,
      borderColor: colors.astreinte_previsionnel,
      hoverBackgroundColor: colors.astreinte_previsionnel,
      hoverBorderColor: colors.hover_border,
      yAxisID: "y-axis-1",
      stack: "prev",
      order: 6,
      data: sortTableau.map(f =>
        Number(f.properties.effectif_previsionnel_astreinte)
      )
    });
  }

  datasets.push({
    label: "Vigilance",
    type: "line",
    borderColor: colors.seuil_vigilance,
    backgroundColor: "rgba(0,0,0,0)",
    pointBorderColor: colors.seuil_vigilance,
    pointBackgroundColor: "#eceff1",
    pointHoverBackgroundColor: colors.seuil_vigilance,
    pointHoverBorderColor: colors.seuil_vigilance,
    yAxisID: "y-axis-2",
    order: 1,
    data: sortTableau.map(f => Number(f.properties.seuil_vigilance))
  });

  datasets.push({
    label: "RO",
    type: "line",
    fill: false,
    borderColor: colors.seuil_ro,
    backgroundColor: "rgba(0,0,0,0)",
    pointBorderColor: colors.seuil_ro,
    pointBackgroundColor: "#eceff1",
    pointHoverBackgroundColor: colors.seuil_ro,
    pointHoverBorderColor: colors.seuil_ro,
    yAxisID: "y-axis-2",
    order: 2,
    data: sortTableau.map(f => Number(f.properties.seuil_ro))
  });
  return { datasets };
};

const UtCisChart = ({ brutData, nom, date, maxValue }) => (
  <div
    style={{
      position: "relative",
      margin: " auto",
      height: "90vh",
      width: "90vw"
    }}
  >
    <Bar
      data={formatData(brutData, nom, date)}
      options={formatOptions(maxValue)}
    />
  </div>
);

export default UtCisChart;
