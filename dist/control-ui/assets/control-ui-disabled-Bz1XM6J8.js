import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{bs as t,hu as n,uu as r}from"./control-ui-core-pYNj5S1a.js";import{co as i,go as a}from"./control-ui-core-D6clmJs8.js";import{$ as o,Y as s}from"./lit-runtime-DZL1fcCI.js";function c(e,r,i){if(e?.plugins?.errors.some(e=>e.pluginId===r&&e.code===`custom-plugin-ui-disabled`))return o`<div class="card-title">${n(`pluginUi.customPluginsDisabled`)}</div>
    <p class="card-sub">${n(`pluginUi.customPluginsEnableHint`)}</p>
    <a
      class="btn btn--sm"
      href=${a(`labs`,e.basePath)}
      @click=${n=>{t(n)&&(n.preventDefault(),i?.(),e.navigate(`labs`))}}
      >${n(`pluginUi.openLabs`)}</a
    >`}function l(){return(l=e((()=>{s(),i(),r()})))()}export{c as n,l as t};