import t from"../web_modules/vega-embed.js";import{onboarding as n}from"../web_modules/onboarding-vega.js";const r={theme:"default",actions:!1,renderer:"svg"};async function i(){const e=await fetch("./data/changeMatrix.json"),a=await e.json();let o=await t("#vis",a,r);n("change-matrix",o)}i();