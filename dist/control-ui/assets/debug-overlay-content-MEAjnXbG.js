import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ii as t,Ti as n,ii as r,qr as i}from"./control-ui-foundation-C3MHh_P-.js";import{N as a,R as o,b as ee,cc as s,hu as c,lu as l,sc as u,su as d,uu as f,v as p,y as m}from"./control-ui-core-pYNj5S1a.js";import{$ as h,X as g,Y as _,c as v,ct as y,nt as b,s as x,ut as S}from"./lit-runtime-DZL1fcCI.js";import{Ki as C,Xi as w,Yi as T,no as E,qi as D,ro as O}from"./control-ui-boot-shared-3Hl8ksFq.js";import{n as k,r as A,t as j}from"./system-info-BXt4emol.js";import{a as M,i as N,n as P,r as F,t as I}from"./gateway-vitals-edlwgcif.js";import{i as L,n as R,t as z}from"./lane-table-5a-CLehZ.js";function B(e){return{...e,render:(t,n)=>e.render(t,n)}}function V(e){return c(`debug.overlay.pingMs`,{value:String(Math.round(e))})}function H(e,t){return h`<div class="debug-overlay__widget">
    ${F(e,t)}
    <openclaw-sparkline
      class="gateway-vital gateway-vital--ping"
      data-degraded=${e.pingMs>Y?``:g}
      title=${c(`debug.overlay.pingDescription`)}
      .label=${c(`debug.overlay.ping`)}
      .samples=${I(t,e=>e.pingMs)}
      .format=${V}
      .floorMax=${20}
    ></openclaw-sparkline>
    ${N(e,t)}
  </div>`}function U(e){return h`
    <div class="debug-overlay__table-wrap">
      <table class="data-table command-lanes-table command-lanes-table--compact">
        <thead>
          <tr>
            <th>${c(`debug.lanes.lane`)}</th>
            <th>${c(`debug.lanes.active`)}</th>
            <th>${c(`debug.lanes.queued`)}</th>
            <th>${c(`debug.lanes.blocked`)}</th>
          </tr>
        </thead>
        <tbody>
          ${R(e,{compact:!0})}
        </tbody>
      </table>
    </div>
  `}function W(e){return c(`debug.overlay.freeShort`,{value:G(e)})}function G(e){return n(e,{style:`legacy-binary`,maxUnit:`tera`,separator:` `,fractionDigits:(e,t)=>t===`byte`?null:+(e<10)})}function K(e,t){return h`
    ${M(e,t)}
    ${e.disks?.length?h`<div class="gateway-vitals debug-overlay__disks">
            ${v(e.disks??[],e=>e.path,e=>h`<openclaw-sparkline
                class="gateway-vital gateway-vital--disk"
                title=${e.path}
                .label=${`${c(`debug.overlay.disk`)} ${e.path}`}
                .sub=${c(`debug.overlay.totalShort`,{value:G(e.totalBytes)})}
                .samples=${I(t,t=>t.disks?.find(t=>t.path===e.path)?.availableBytes)}
                .format=${W}
                autorange
              ></openclaw-sparkline>`)}
          </div>`:g}
    ${typeof e.uptimeMs==`number`?h`<div class="debug-overlay__vitals-footer mono">
            ${c(`debug.overlay.uptime`)} ${T(e.uptimeMs)}
          </div>`:g}
  `}function q({sessions:e,totalCount:n,hasMore:r}){return h`
    <div class="debug-overlay__count">
      ${c(`debug.overlay.activeRunsCount`,{count:String(n??e.length)})}
    </div>
    ${r?h`<div class="debug-overlay__count">${c(`activityFeed.showing`,{shown:String(e.length),total:String(n??e.length)})}</div>`:g}
    ${e.length>0?h`<ul class="debug-overlay__list">
            ${e.map(e=>{let n=e.sessionId??e.key;return h`<li class="mono" title=${n}>${t(n,32)}</li>`})}
          </ul>`:h`<div class="debug-overlay__empty">${c(`debug.overlay.noActiveRuns`)}</div>`}
  `}function J(e){let t=e.eventLog.slice(0,8);return t.length>0?h`<ul class="debug-overlay__list debug-overlay__events">
        ${t.map(e=>h`<li>
            <span class="mono">${e.event}</span>
            <time>${a(e.ts)}</time>
          </li>`)}
      </ul>`:h`<div class="debug-overlay__empty">${c(`debug.noEvents`)}</div>`}var Y,X;function Z(){return(Z=e((()=>{r(),_(),x(),P(),f(),w(),o(),k(),m(),z(),Y=250,X=[B({...p.lanes,load:(e,t)=>L(e.client,t),render:U}),B({...p.status,load:async(e,t)=>{let n=await A(e.gateway,t);return{...n.value,pingMs:n.roundTripMs,sampledAt:n.at}},render:K}),B({...p[`active-runs`],load:(e,t)=>e.client.request(`sessions.list`,{activeOnly:!0,archived:`all`,includeGlobal:!0,includeUnknown:!0},{signal:t}),render:q}),B({...p.events,load:async e=>e.gateway,render:J})]})))()}var Q;function $(){return($=e((()=>{_(),b(),f(),k(),O(),l(),D(),s(),m(),Z(),Q=class extends d{constructor(...e){super(...e),this.minimized=!1,this.sections=new Map,this.requestControllers=new Map,this.requestGeneration=0,this.statusHistory=[],this.polling=new C(this,j,()=>void this.refreshSections(),!1,`visible`),this.gateway=new E(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetSections(),ensureInitialData:()=>void this.refreshSections(),onPageActivation:()=>this.syncPolling()}),this.subscriptions=new u(this).watch(()=>!this.minimized&&document.visibilityState!==`hidden`?this.context?.gateway:void 0,(e,t)=>e.subscribeEventLog(t))}connectedCallback(){super.connectedCallback(),this.syncPolling()}disconnectedCallback(){this.polling.stop(),this.subscriptions.clear(),this.resetSections(),super.disconnectedCallback()}resetSections(){this.requestGeneration+=1;for(let e of this.requestControllers.values())e.abort();this.requestControllers.clear(),this.statusHistory=[],this.sections=new Map(X.map(e=>[e.id,{status:this.gateway.connected?`loading`:`unavailable`}]))}syncPolling(){document.visibilityState===`hidden`?this.polling.stop():this.polling.start()&&this.refreshSections(),this.requestUpdate()}async refreshSections(){let e=this.gateway.gateway,t=this.gateway.connected?this.gateway.client:null;if(!this.isConnected||document.visibilityState===`hidden`)return;if(!e||!t){this.sections=new Map(X.map(e=>[e.id,{status:`unavailable`}]));return}let n=this.requestGeneration,r=(this.minimized?X.filter(e=>e.id===`status`):X).map(async r=>{if(this.requestControllers.has(r.id))return;let i=new AbortController;this.requestControllers.set(r.id,i);try{let a=await r.load({client:t,gateway:e},i.signal);this.updateSection(n,r.id,{status:`ready`,value:a})}catch{this.updateSection(n,r.id,{status:`unavailable`})}finally{this.requestControllers.get(r.id)===i&&this.requestControllers.delete(r.id)}});await Promise.allSettled(r)}updateSection(e,t,n){if(!this.isConnected||e!==this.requestGeneration)return;if(t===`status`&&n.status===`ready`){this.polling.stop(),this.polling.start();let e=n.value;this.statusHistory.at(-1)?.at!==e.sampledAt&&(this.statusHistory=[...this.statusHistory.slice(-89),{at:e.sampledAt,status:e}])}let r=new Map(this.sections);r.set(t,n),this.sections=r}renderSection(e){let t=this.sections.get(e.id)??{status:`loading`};return h`
      <section class="debug-overlay__section" aria-busy=${t.status===`loading`}>
        <h3>${c(e.titleKey)}</h3>
        ${t.status===`loading`?ee(e.id):t.status===`unavailable`?h`<div class="debug-overlay__empty">${c(`debug.overlay.unavailable`)}</div>`:e.render(t.value,this.statusHistory)}
      </section>
    `}render(){if(this.minimized){let e=this.sections.get(`status`)??{status:`loading`};if(e.status!==`ready`)return h`<div class="debug-overlay__compact-loading" role="status">
          ${c(e.status===`loading`?`common.loading`:`debug.overlay.unavailable`)}
        </div>`;let t=e.value;return H(t,this.statusHistory)}return h`${X.map(e=>this.renderSection(e))}`}},i([S({attribute:!1})],Q.prototype,`context`,void 0),i([S({type:Boolean})],Q.prototype,`minimized`,void 0),i([y()],Q.prototype,`sections`,void 0),customElements.get(`openclaw-debug-overlay-content`)||customElements.define(`openclaw-debug-overlay-content`,Q)})))()}$();