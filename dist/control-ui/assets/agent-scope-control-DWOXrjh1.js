import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Pa as t}from"./control-ui-foundation-C3MHh_P-.js";import{Fc as n,Ic as r,Pc as i,hu as a,nl as o,uu as s}from"./control-ui-core-pYNj5S1a.js";import{Xi as c,Zi as l}from"./control-ui-core-D6clmJs8.js";import{$ as u,X as d,Y as f}from"./lit-runtime-DZL1fcCI.js";import{gt as p}from"./control-ui-boot-new-CaEHEcx2.js";function m(e){let i=e.selectedId??e.selection.state.scopeId??``,o=i?t(i):``,s=e.allowAll!==!1,l=n=>e.agents.some(e=>e.kind===`system`&&t(e.id)===n),f=n(e.agents);if(f.length<=1)return d;let p=new Map(f.map(e=>{let n=t(e.id);return[n,n===e.id?e:{...e,id:n}]}));for(let n of e.additionalAgentIds??[]){if(!n.trim())continue;let e=t(n);!l(e)&&!p.has(e)&&p.set(e,{id:e})}o&&!l(o)&&!p.has(o)&&p.set(o,{id:o});let m=[...p.values()].toSorted((e,t)=>r(e).localeCompare(r(t))),h=l(o)?s?``:m[0]?.id??``:o,g=[...s?[{value:``,label:a(`agentScope.allAgents`),icon:c.users}]:[],...m.map(e=>({value:e.id,label:r(e),agent:e}))];return u`
    <div class="agent-scope-control">
      <openclaw-agent-select
        .options=${g}
        .value=${h}
        .accessibleLabel=${a(`agentScope.label`)}
        .menuLabel=${a(`agentScope.label`)}
        .onSelect=${t=>s?e.selection.setScope(t||null):e.selection.set(t||null)}
      ></openclaw-agent-select>
    </div>
  `}function h(){return(h=e((()=>{f(),s(),i(),o(),p(),l()})))()}export{m as n,h as t};