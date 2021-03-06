import echarts from 'echarts';
import * as d3 from 'd3';
import { ahoi, EVisualizationType } from '@visahoi/echarts';

let chart = null;

function render() {
  d3.csv("../data/oslo-2018.csv").then(rows => {
    const {x, y} = processData(rows);
    const chart = createPlot(x, y);
    ahoi(EVisualizationType.HORIZON_GRAPH, chart, '#onboarding');
  });
}

function processData(allRows) {
  const x = [];
  const y = [];

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    const month = `${row.year}-${row.month}`;
    if (x.includes(month)) {
      const idx = x.indexOf(month);
      y[idx].push(parseFloat(row.temp));
    } else {
      x.push(`${row.year}-${row.month}`);
      y.push([parseFloat(row.temp)]);
    }
  }
  const averagedYValues = y.map(tempArray => {
    const sum = tempArray.reduce((a, b) => {
      return a + b;
    }, 0);
    return Math.round(sum / tempArray.length, 2);
  });
  return {x, y: averagedYValues};
}

function createPlot(x, y) {
  const options = {
    title: {
      text: "Average temperature in Oslo, Norway in 2018",
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        snap: false,
        type: "none"
      },
      formatter: function(params, ticket, callback) {
        let temperature = 0;
        temperature += params[0].value;
        temperature += params[1].value;
        temperature -= params[2].value;

        const result = `Month: ${
          params[0].name
        }<br/> Average temperature in °C: ${temperature}`;
        setTimeout(function() {
          callback(ticket, result);
        }, 100);
        return result;
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: x,
      axisLabel: {
        formatter: function(value, index) {
          var date = new Date(value);
          return date.getMonth() + 1;
        }
      },
      name: "Month",
      nameLocation: "middle",
      nameGap: 30
    },
    yAxis: {
      type: "value",
      min: -1,
      max: 16,
      name: "Average Temperature in °C",
      nameLocation: "middle",
      nameGap: 30
    },
    series: [
      {
        data: y.map(item => (item < 0 ? 0 : item > 15 ? 15 : item)),
        type: "line",
        areaStyle: {
          opacity: 0.6
        },
        color: "#a1d76a",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 }
      },
      {
        data: y.map(item => (item > 15 ? item - 15 : 0)),
        type: "line",
        areaStyle: {
          opacity: 1
        },
        color: "#a1d76a",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 }
      },
      {
        data: y.map(item => (item < 0 ? item * -1 : 0)),
        type: "line",
        areaStyle: {
          opacity: 1
        },
        color: "#0571b0",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 }
      }
    ]
  };

  chart.setOption(options);
  return chart;
}

const createChart = (renderer = 'svg') => {
  const vis = document.getElementById("vis");
  chart = echarts.init(vis, null, {renderer})
  render();
}

export default createChart;
