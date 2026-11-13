import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Ii as n,qr as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{cc as a,hu as o,lu as s,sc as c,su as l,uu as u}from"./control-ui-core-pYNj5S1a.js";import{$ as d,Q as f}from"./control-ui-boot-shared-DhhSjjdA.js";import{Xi as p,Zi as m,vi as h,yi as g}from"./control-ui-core-D6clmJs8.js";import{$ as _,X as v,Y as y,ct as b,m as x,nt as S,p as C,ut as w}from"./lit-runtime-DZL1fcCI.js";import{i as T,r as E,t as D}from"./custodian-surface-D56eTXlj.js";import{Mt as O,Nt as k,jt as A,t as j}from"./control-ui-boot-shared-og7lWkK4.js";import{D as M}from"./control-ui-boot-chat-7MGT05MX.js";import"./css-chat-custodian-new-session-CbWc8vdc.js";var N;function P(){return(P=e((()=>{t(),y(),S(),C(),d(),g(),u(),s(),j(),M(),m(),N=class extends l{constructor(...e){super(...e),this.sessionKey=``,this.agentId=``,this.workContext={page:`chat`},this.includeContext=!0,this.selection=``,this.selectionAvailable=!1,this.selectionScope=``,this.updateSelectionAvailability=()=>{let e=window.getSelection();this.selectionAvailable=!(!e||e.isCollapsed||!e.anchorNode||this.contains(e.anchorNode))},this.attachSelection=e=>{e.preventDefault();let t=window.getSelection();!t||t.isCollapsed||t.anchorNode&&this.contains(t.anchorNode)||(this.selection=n(t.toString(),640),this.includeContext=!0)}}connectedCallback(){super.connectedCallback(),document.addEventListener(`selectionchange`,this.updateSelectionAvailability),this.updateSelectionAvailability()}disconnectedCallback(){document.removeEventListener(`selectionchange`,this.updateSelectionAvailability),super.disconnectedCallback()}willUpdate(){let e=this.workContext,t=JSON.stringify([this.context.gateway.connection.gatewayUrl,e.page,e.sessionKey,e.sessionId,e.agentId,e.file]);this.selectionScope&&this.selectionScope!==t&&(this.selection=``),this.selectionScope=t}render(){let e={...this.workContext,selection:this.selection||void 0},t=f(e),n=JSON.stringify([this.context.gateway.connection.gatewayUrl,this.agentId,this.sessionKey]);return _`
      <div class="assistant-panel-context">
        ${this.includeContext?_`
                <details>
                  <summary>
                    ${o(`assistantPanel.context`,{context:e.title||e.page})}
                  </summary>
                  <pre>${t}</pre>
                </details>
                <button
                  type="button"
                  class="rail-header__action"
                  aria-label=${o(`assistantPanel.removeContext`)}
                  @click=${()=>{this.includeContext=!1}}
                >
                  ${p.x}
                </button>
              `:_`<button
                type="button"
                class="btn btn--sm"
                @click=${()=>{this.includeContext=!0}}
              >
                ${o(`assistantPanel.includeContext`)}
              </button>`}
        <button
          type="button"
          class="rail-header__action"
          aria-label=${o(`assistantPanel.attachSelection`)}
          ?disabled=${!this.selectionAvailable}
          title=${o(`assistantPanel.attachSelection`)}
          @mousedown=${this.attachSelection}
          @click=${e=>{e.detail===0&&this.attachSelection(e)}}
        >
          ${p.messageSquare}
        </button>
        ${this.selection?_`<button
                type="button"
                class="btn btn--sm"
                aria-label=${o(`assistantPanel.removeSelection`)}
                @click=${()=>{this.selection=``}}
              >
                ${o(`assistantPanel.selection`)} ${p.x}
              </button>`:v}
      </div>
      ${x(n,_`<openclaw-chat-pane
          .paneId=${`home-dock:${n}`}
          .presentationId=${`home-dock:${n}`}
          .sessionKey=${this.sessionKey}
          .agentId=${this.agentId}
          .inputRegion=${`dock`}
          .active=${!0}
          .compact=${!0}
          .narrow=${!0}
          .workContext=${this.includeContext?e:void 0}
        ></openclaw-chat-pane>`)}
    `}},r([i({context:h,subscribe:!0})],N.prototype,`context`,void 0),r([w({attribute:!1})],N.prototype,`sessionKey`,void 0),r([w({attribute:!1})],N.prototype,`agentId`,void 0),r([w({attribute:!1})],N.prototype,`workContext`,void 0),r([b()],N.prototype,`includeContext`,void 0),r([b()],N.prototype,`selection`,void 0),r([b()],N.prototype,`selectionAvailable`,void 0),customElements.define(`openclaw-home-session`,N)})))()}var F;function I(){return(I=e((()=>{y(),S(),s(),a(),O(),T(),D(),P(),F=class extends l{constructor(){super(),this.active=!1,this.destination=`custodian`,this.sessionKey=``,this.agentId=``,this.pageRouteId=`chat`,this.pageSessionKey=``,this.pageAgentId=``,this.custodianVisible=!1,new c(this).watch(()=>this.store??E,(e,t)=>e.subscribe(t)).watch(()=>this.context,(e,t)=>k(e,t)).watch(()=>this.context?.sessions,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t))}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent(`assistant-custodian-store`,{detail:this.store??E,bubbles:!0}))}willUpdate(){let e=this.active&&this.destination===`custodian`;e&&!this.custodianVisible&&(this.store??E).refreshTranscriptIfIdle(),this.custodianVisible=e}render(){if(!this.active)return v;let e=this.store??E;return this.destination===`home`?_`<openclaw-home-session
          .sessionKey=${this.sessionKey}
          .agentId=${this.agentId}
          .workContext=${this.context?A(this.context,this.pageRouteId,this.pageSessionKey,this.pageAgentId):void 0}
        ></openclaw-home-session>`:_`<openclaw-custodian-surface
          .store=${e}
          .onboarding=${e.activeVariant===`onboarding`}
          .newAgentIntent=${e.activeVariant===`new-agent`}
          compact
        ></openclaw-custodian-surface>`}},r([w({type:Boolean})],F.prototype,`active`,void 0),r([w()],F.prototype,`destination`,void 0),r([w()],F.prototype,`sessionKey`,void 0),r([w()],F.prototype,`agentId`,void 0),r([w({attribute:!1})],F.prototype,`context`,void 0),r([w()],F.prototype,`pageRouteId`,void 0),r([w()],F.prototype,`pageSessionKey`,void 0),r([w()],F.prototype,`pageAgentId`,void 0),r([w({attribute:!1})],F.prototype,`store`,void 0),customElements.define(`openclaw-assistant-panel-content`,F)})))()}I();export{F as OpenClawAssistantPanelContent};