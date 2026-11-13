import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{N as t,R as n,bs as r,hu as i,uu as a}from"./control-ui-core-pYNj5S1a.js";import{Ma as o,co as s,go as c,ja as l,va as u}from"./control-ui-core-D6clmJs8.js";import{$ as d,X as f,Y as p,c as m,s as h}from"./lit-runtime-DZL1fcCI.js";import{c as g,l as _}from"./gateway-runtime-iOL78mIi.js";import{Dt as v,Qa as y,_t as b,eo as x}from"./control-ui-boot-shared-DJ4XCcp6.js";import{a as S,n as C,o as w,t as T}from"./roster-element-D3O5pUUK.js";function E(e){let{context:n}=e,a=(e,t,i)=>{r(e)&&(e.preventDefault(),n.navigate(t,i))},s=d`<a
    class="btn"
    href=${c(`agents`,n.basePath)}
    @click=${e=>a(e,`agents`)}
    >${i(`agentsHome.manage`)}</a
  >`;return d` <div class="agents-home__header">
      ${v({title:o(`agents-home`),subtitle:l(`agents-home`),actions:d`${s}
          <a
            class="btn primary"
            href=${e.canCreate?`${c(`custodian`,n.basePath)}?intent=new-agent`:c(`agents`,n.basePath)}
            @click=${t=>a(t,e.canCreate?`custodian`:`agents`,e.canCreate?{search:`?intent=new-agent`}:void 0)}
            >${i(`agentsHome.create`)}</a
          >`})}
    </div>
    <section class="agents-home" aria-label=${o(`agents-home`)}>
      ${e.connected?f:d`<div class="callout warn" role="status">${i(`agentsHome.disconnected`)}</div>`}
      ${e.connected&&e.error?d`<div class="callout danger" role="alert">
              ${e.error}
              <button class="btn btn--sm" @click=${e.onRetry}>${i(`common.retry`)}</button>
            </div>`:f}
      ${e.connected&&e.loading&&e.cards.length===0?d` <div
              role="status"
              aria-label=${i(`agentsHome.loading`)}
              class="agents-home__grid"
            >
              ${[0,1,2,3].map(()=>d`<div class="agents-home__skeleton" aria-hidden="true"></div>`)}
            </div>`:f}
      ${e.connected&&!e.loading&&!e.error&&e.cards.length===0?d` <div class="agents-home__empty">
              <p>${i(`agentsHome.empty`)}</p>
              ${s}
            </div>`:f}
      <div class="agents-home__grid">
        ${m(e.cards,e=>e.id,e=>d` <a
            class="agents-home__card"
            data-agent-id=${e.id}
            href=${e.target.href}
            @click=${t=>a(t,`chat`,e.target.options)}
          >
            <div class="agents-home__identity">
              <div class="agents-home__avatar" aria-hidden="true">
                ${x(e)}
              </div>
              <div class="agents-home__name">
                <h2>${e.name}</h2>
                ${e.role?d`<p>${e.role}</p>`:f}
              </div>
            </div>
            ${e.model?d`<span class="agents-home__model" title=${e.model}>${e.model}</span>`:f}
            <div class="agents-home__activity">
              ${e.activeNow?d`<span class="agents-home__working">${i(`agentsHome.working`)}</span>`:e.lastActiveAt?i(`agentsHome.lastActive`,{time:t(e.lastActiveAt)}):i(`agentsHome.neverActive`)}
            </div>
            <p class="agents-home__preview" title=${e.preview??``}>
              ${e.preview||i(`agentsHome.noMessage`)}
            </p>
            <span class="btn primary agents-home__open">${i(`agentsHome.openChat`)}</span>
          </a>`)}
      </div>
    </section>`}function D(){return(D=e((()=>{p(),h(),u(),s(),y(),b(),a(),S(),n(),w()})))()}var O,k,A;function j(){return(j=e((()=>{p(),C(),_(),D(),O=class extends T{render(){return this.avatars.withActiveRoutes(()=>E({cards:this.cards().toSorted((e,t)=>Number(t.activeNow)-Number(e.activeNow)||t.lastActiveAt-e.lastActiveAt||Number(t.id===this.context.agents.state.agentsList?.defaultId)-Number(e.id===this.context.agents.state.agentsList?.defaultId)||e.id.localeCompare(t.id)),context:this.context,connected:this.connected,loading:this.roster.loading,error:this.roster.error??this.roster.subscriptionError,onRetry:()=>void this.refresh(),canCreate:g(this.context.gateway.snapshot,`openclaw.chat`,`operator.admin`)}))}},k=!0,A=()=>d`<openclaw-agents-home-page></openclaw-agents-home-page>`,customElements.get(`openclaw-agents-home-page`)||customElements.define(`openclaw-agents-home-page`,O)})))()}j();export{O as AgentsHomePage,k as header,A as render};