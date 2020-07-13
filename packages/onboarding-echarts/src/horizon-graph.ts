import {OnboardingHorizonGraphSpec} from 'onboarding-core/dist/horizon-graph';
import {
  EChartType,
  OnboardingMessages,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(chart, coords): OnboardingHorizonGraphSpec {
  const dataCoords = chart._chartsViews[0]._data._itemLayouts;

  const xAxis = chart._chartsViews[1]._data._itemLayouts[3];
  const positiveColor = chart._chartsViews[1]._data._itemLayouts[5];
  const negativeColor = chart._chartsViews[2]._data._itemLayouts[2];

  const options = chart._model.option;
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        coords: coords.chartTitle
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        coords: {x: xAxis[0], y: xAxis[1]}
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
    },
    positiveColor: {
      value: chart._chartsViews[0].__model.option.color,
      anchor: {
        coords: {x: positiveColor[0], y: positiveColor[1]}
      }
    },
    negativeColor: {
      value: chart._chartsViews[2].__model.option.color,
      anchor: {
        coords: {x: negativeColor[0], y: negativeColor[1]}
      }
    }
  };
}

export function horizonGraphFactory(chart, coords): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart, coords);
  return generateOnboardingMessages(EChartType.HORIZON_GRAPH, onbordingSpec);
}