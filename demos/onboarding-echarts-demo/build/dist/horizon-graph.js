import c from"../web_modules/echarts.js";import*as m from"../web_modules/d3.js";import{onboarding as p}from"../web_modules/onboarding-echarts.js";let l=null;function d(){m.csv("../data/oslo-2018.csv").then(o=>{const{x:e,y:n}=u(o),t=h(e,n);p("horizon-graph",t)})}function u(o){const e=[],n=[];for(let t=0;t<o.length;t++){const a=o[t],r=`${a.year}-${a.month}`;e.includes(r)?n[e.indexOf(r)].push(parseFloat(a.temp)):(e.push(`${a.year}-${a.month}`),n.push([parseFloat(a.temp)]))}return{x:e,y:n.map(t=>{const a=t.reduce((r,i)=>r+i,0);return Math.round(a/t.length,2)})}}function h(o,e){const n={title:{text:"Average temperature in Oslo, Norway in 2018",left:"center"},tooltip:{trigger:"axis",axisPointer:{snap:!1,type:"none"},formatter:function(t,a,r){let i=0;i+=t[0].value,i+=t[1].value,i-=t[2].value;const s=`Month: ${t[0].name}<br/> Average temperature in °C: ${i}`;return setTimeout(function(){r(a,s)},100),s}},grid:{height:"50%",top:"10%"},width:800,xAxis:{type:"category",boundaryGap:!1,data:o,axisLabel:{formatter:function(t,a){return new Date(t).getMonth()+1}},name:"Month",nameLocation:"middle",nameGap:30},yAxis:{type:"value",min:-1,max:16,name:"Average Temperature in °C",nameLocation:"middle",nameGap:30},series:[{data:e.map(t=>t<0?0:t>15?15:t),type:"line",areaStyle:{opacity:.6},color:"#a1d76a",smooth:!0,symbol:"none",lineStyle:{width:0}},{data:e.map(t=>t>15?t-15:0),type:"line",areaStyle:{opacity:1},color:"#a1d76a",smooth:!0,symbol:"none",lineStyle:{width:0}},{data:e.map(t=>t<0?-1*t:0),type:"line",areaStyle:{opacity:1},color:"#0571b0",smooth:!0,symbol:"none",lineStyle:{width:0}}]};return l.setOption(n),l}const y=(o="svg")=>{const e=document.getElementById("vis");l=c.init(e,null,{renderer:o}),d()};export default y;