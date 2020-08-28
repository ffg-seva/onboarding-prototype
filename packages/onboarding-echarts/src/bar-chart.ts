import {
  EChartType,
  OnboardingMessages,
  OnboardingBarChartSpec,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(chart, coords): OnboardingBarChartSpec {
  const dataCoords = chart._chartsViews[0]._data._itemLayouts;

  const yAxisTitle = {x: 108.7, y: 60, width: (869/2), height: 300}
  const xAxisTitle = {x: dataCoords[6].x, y: dataCoords[6].y + 60};

  const data = chart._chartsViews[0]._data;
  const options = chart._model.option;

  function getMainAxis(xType, yType) {
    if (xType === "value" && yType === "category") {
      return "y";
    } else if (yType === "value" && xType === "category") {
      return "x";
    }
  }
  const mainAxis = getMainAxis(options.xAxis[0].type, options.yAxis[0].type);

  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        coords: coords.chartTitle
      }
    },
    yMin: {
      value: data._rawExtent.y[0],
      anchor: {
        coords: dataCoords[1]
      }
    },
    type: {
      value: data.hostModel.option.type,
      anchor: {
        coords: dataCoords[8]
      }
    },
    yMax: {
      value: data._rawExtent.y[1],
      anchor: {
        coords: dataCoords[6]
      }
    },
    // orientation: {
    //   value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    // },
    // yAxisOrientation: {
    //   value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    // },
    xAxisOrientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    barLength: {
      value: mainAxis && (mainAxis === "x" ? "height" : "width")
    },
    // xMin: {
    //   value: data._rawExtent.x[0]
    // },
    // xMax: {
    //   value: data._rawExtent.x[1]
    // },
    xAxisTitle: {
      value: options.xAxis[0].name,
      anchor: {
        coords: xAxisTitle
      }
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        coords: yAxisTitle
      }
    }
  };
}

export function barChartFactory(chart, coords): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart, coords);
  return generateOnboardingMessages(EChartType.BAR_CHART, onbordingSpec);
}