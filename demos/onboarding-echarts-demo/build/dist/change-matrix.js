import m from"../web_modules/echarts.js";import*as l from"../web_modules/d3.js";import{onboarding as d}from"../web_modules/onboarding-echarts.js";let i=null;function u(){l.csv("../data/oslo-2018.csv").then(n=>{const{x:e,y:o}=f(n),r=g(e,o);d("change-matrix",r)})}const h=["Tallin","Oslo","Munich"],p=[[0,2,-.6],[1,2,-8.4],[2,2,-2.2],[3,2,1.35],[4,2,-6.2],[5,2,1.1],[6,2,1.1],[7,2,-1.2],[8,2,3.8],[9,2,.5],[10,2,-1.45],[11,2,0],[0,1,-3.5],[1,1,-8.65],[2,1,-3.8],[3,1,-.5],[4,1,-2.4],[5,1,-3.55],[6,1,2],[7,1,.4],[8,1,.25],[9,1,-.3],[10,1,2.3],[11,1,.5],[0,0,.2],[1,0,-6.95],[2,0,-1.5],[3,0,-3.1],[4,0,-2.1],[5,0,-1],[6,0,.8],[7,0,1.1],[8,0,.95],[9,0,2],[10,0,2.65],[11,0,2.4]];function g(n,e){const o={title:{text:"Average temperature change in °C between 1990 and 1991",left:"center"},tooltip:{},grid:{height:"50%",top:"10%"},yAxis:{type:"category",data:h,name:"City",nameLocation:"middle",nameGap:35},xAxis:{type:"category",data:n,axisLabel:{formatter:function(r,a){var t=new Date(r);return t.getMonth()}},name:"Month",nameLocation:"middle",nameGap:30},series:[{type:"heatmap",data:p,label:{show:!1}}],visualMap:{min:-9,max:9,calculable:!0,orient:"horizontal",left:"center",bottom:"15%",color:["#D2B48C","#FDFDFD","#4682b4"],text:["High","Low"]}};return i.setOption(o),i}function f(n){const e=[],o=[];for(let a=0;a<n.length;a++){const t=n[a],s=`${t.year}-${t.month}`;if(e.includes(s)){const c=e.indexOf(s);o[c].push(parseFloat(t.temp))}else e.push(`${t.year}-${t.month}`),o.push([parseFloat(t.temp)])}const r=o.map(a=>{const t=a.reduce((s,c)=>s+c,0);return Math.round(t/a.length,2)});return{x:e,y:r}}const x=(n="svg")=>{const e=document.getElementById("vis");i=m.init(e,null,{renderer:n}),u()};export default x;
