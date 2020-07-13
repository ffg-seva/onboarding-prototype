
import {
  EChartType,
  OnboardingMessages,
  OnboardingHorizonGraphSpec,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(chart: any): OnboardingHorizonGraphSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.fills");
  const areaNodes = traceNodes[0].querySelectorAll("path.js-fill");
  const areaNodesData = Array.from(areaNodes).map((point: any) => point.__data__);

  const t = areaNodesData[0][0].trace;

  return {
    chartTitle: {
      value: chart.layout.title.text,
    },
    type: {
      value: "area", //t.type,
    },
    yMin: {
      value: t._extremes.y.min[0].val, // 0 = first trace
    },
    yMax: {
      value: t._extremes.y.max[0].val,
    },
    xMin: {
      value: t._extremes.x.min[0].val, // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val,
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
    },
    yAxis: {
      value: chart.layout.yaxis.title.text
    },
    // xAxisLabel (e.g. 01, 02, …)
    // yAxisLabel (e.g. -5, 0, 5, ...)
    // Title (Average Temperature in Oslo)
  };
}

export function horizonGraphFactory(chart): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart);
  return generateOnboardingMessages(EChartType.HORIZON_GRAPH, onbordingSpec);
}
