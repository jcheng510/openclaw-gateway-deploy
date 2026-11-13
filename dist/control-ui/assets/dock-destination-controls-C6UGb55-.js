import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{wi as t}from"./control-ui-core-D6clmJs8.js";import{$ as n,X as r,Y as i}from"./lit-runtime-DZL1fcCI.js";function a(e){let t=e.destinations.filter(t=>t.dock!==e.current);return t.length===0?r:n`<span class=${e.groupClass} role="group" aria-label=${e.groupLabel}>
    ${t.map(t=>n`<openclaw-tooltip .content=${t.label}>
        <button
          class=${`rail-header__action ${t.className??``}`}
          type="button"
          aria-label=${t.label}
          @click=${()=>e.onSelect(t.dock)}
        >
          ${t.icon}
        </button>
      </openclaw-tooltip>`)}
  </span>`}function o(){return(o=e((()=>{i(),t()})))()}export{a as n,o as t};