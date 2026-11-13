const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./board-view-d1g_630X.js","./control-ui-boot-shared-DJ4XCcp6.js","./gateway-runtime-iOL78mIi.js","./control-ui-boot-shared-DhhSjjdA.js","./control-ui-boot-shared-CnK2ZXzW.js","./control-ui-boot-shared-C-yZTZmO.js","./control-ui-boot-shared-D-LYw3KU.js","./control-ui-boot-shared-TgR3hRAg.js","./control-ui-boot-shared-CES8Ypkl.js","./plugin-contracts-runtime-DSgjMI0R.js","./markdown-runtime-Hc-lvqnn.js","./config-runtime-CgOgfOrG.js","./control-ui-boot-shared-og7lWkK4.js","./control-ui-boot-shared-e4-xCIbb.js","./control-ui-boot-shared-vP4joK1k.js","./control-ui-boot-shared-DCY2wZcy.js","./css-chat-Ckz95ikh.js","./chat-transcript-layout-hEyp1qZw.js","./css-chat-custodian-new-session-CbWc8vdc.js","./sidebar-update-runtime-BZGhWGH_.js","./board-view-C2iYhVai.js","./control-ui-disabled-Bz1XM6J8.js","./near-viewport-observer-WgGck829.js","./widget-sandbox-host-BrTUURIA.js","./control-ui-core-D-VUH4Gq.css","./control-ui-boot-shared-BJ_QKfFn.css","./css-chat-DCHf01mf.css","./css-chat-custodian-new-session-FmhgzIjj.css","./sidebar-update-runtime-ah7rgQE7.css","./board-view-DSwvd-aj.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,qr as n,zi as r}from"./control-ui-foundation-C3MHh_P-.js";import{hu as i,lu as a,su as o,uu as s}from"./control-ui-core-pYNj5S1a.js";import{Ai as c,Xi as l,Zi as u,ki as d}from"./control-ui-core-D6clmJs8.js";import{$ as f,X as p,Y as m,ct as h,nt as g,ut as _}from"./lit-runtime-DZL1fcCI.js";import{$n as v,er as y,rr as b,tr as x}from"./control-ui-boot-shared-3Hl8ksFq.js";function S(){return d(`openclaw-board-view`,()=>r(()=>import(`./board-view-d1g_630X.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]),import.meta.url))}var C;function w(){return(w=e((()=>{m(),g(),c(),u(),s(),b(),a(),t(),C=class extends o{constructor(...e){super(...e),this.session=null,this.client=null,this.connected=!1,this.canMutate=!1,this.canGrant=!1,this.presented=!0,this.provider=null,this.expanded=!1,this.activeTabId=``,this.viewError=null,this.viewLoad=null,this.lease=null,this.unsubscribeSnapshot=null,this.expansionInitialized=!1}connectedCallback(){super.connectedCallback(),this.requestUpdate()}updated(){this.viewLoad??=S().catch(e=>{this.viewError=e instanceof Error?e.message:String(e)}),this.synchronizeProvider()}disconnectedCallback(){this.releaseProvider(),super.disconnectedCallback()}synchronizeProvider(){let e=this.session,t=this.client;if(!this.isConnected||!e?.sessionKey.trim()||!t){this.releaseProvider();return}let n=x(e);if(this.lease?.client===t&&this.lease.cacheKey===n){(this.lease.session.sessionKey!==e.sessionKey||this.lease.session.agentId!==e.agentId)&&(this.lease.session={...e},this.requestUpdate()),this.lease.update(t,this.connected,{canPinWidgets:!1,canPinMcpApps:!1,canMutate:this.canMutate,canGrant:this.canGrant});return}this.releaseProvider(),this.expansionInitialized=!1,this.activeTabId=``;let r=v(e,t,this.connected,!1,!1,this.canMutate,this.canGrant);this.lease={...r,client:t,cacheKey:n,session:{...e}},this.provider=r.provider,this.unsubscribeSnapshot=r.provider.snapshot$.subscribe(()=>{this.reconcileSnapshot(r.provider),this.requestUpdate()}),this.reconcileSnapshot(r.provider),this.requestUpdate()}releaseProvider(){this.unsubscribeSnapshot?.(),this.unsubscribeSnapshot=null,this.lease?.release(),this.lease=null,this.provider=null}reconcileSnapshot(e){let t=e.snapshot$.value,n=t.tabs[0]?.tabId??``;t.tabs.some(e=>e.tabId===this.activeTabId)||(this.activeTabId=n),!this.expansionInitialized&&e.hasLoadedSnapshot&&(this.expansionInitialized=!0,this.expanded=y(t))}render(){let e=this.provider,t=e?.snapshot$.value,n=this.lease?.session,r=!!(t&&y(t)),a=e?{appViewGeneration:e.appViewGeneration,applyOps:t=>e.applyOps(t),grant:(t,n)=>e.grant(t,n),selectTab:e=>{this.activeTabId=e},frameLoadFailed:t=>e.refreshWidgetFrame(t),widgetAppView:(t,n)=>e.widgetAppView(t,n),refreshWidgetAppView:(t,n)=>e.refreshWidgetAppView(t,n)}:null;return f`
      <section class="plugin-session-dashboard">
        <button
          type="button"
          class="plugin-session-dashboard__toggle"
          aria-expanded=${this.expanded?`true`:`false`}
          @click=${()=>{this.expansionInitialized=!0,this.expanded=!this.expanded}}
        >
          <span class="plugin-session-dashboard__title">
            ${l.kanban}<span>${i(`pluginUi.dashboardTitle`)}</span>
          </span>
          <span class="plugin-session-dashboard__chevron" aria-hidden="true"
            >${l.arrowDown}</span
          >
        </button>
        <div class="plugin-session-dashboard__body" ?hidden=${!this.expanded}>
          ${this.viewError?f`<p role="alert">${this.viewError}</p>
                  <button
                    type="button"
                    @click=${()=>{this.viewLoad=null,this.viewError=null}}
                  >
                    ${i(`common.retry`)}
                  </button>`:r&&e&&t&&n&&a?f`
                    <openclaw-board-view
                      .active=${this.expanded&&this.presented}
                      .session=${n}
                      .snapshot=${t}
                      .activeTabId=${this.activeTabId}
                      .widgetFrameUrl=${(t,n)=>e.widgetFrameUrl(t,n)}
                      .callbacks=${a}
                      .sessions=${[]}
                      .canMutate=${this.canMutate}
                      .canGrant=${this.canGrant}
                    ></openclaw-board-view>
                  `:f`<p class="plugin-session-dashboard__empty">
                    ${i(`pluginUi.dashboardEmpty`)}
                  </p>`}
        </div>
        ${!this.expanded&&this.expansionInitialized&&!r?f`<p class="plugin-session-dashboard__collapsed-empty">
                ${i(`pluginUi.dashboardEmpty`)}
              </p>`:p}
      </section>
    `}},n([_({attribute:!1})],C.prototype,`session`,void 0),n([_({attribute:!1})],C.prototype,`client`,void 0),n([_({attribute:!1})],C.prototype,`connected`,void 0),n([_({attribute:!1})],C.prototype,`canMutate`,void 0),n([_({attribute:!1})],C.prototype,`canGrant`,void 0),n([_({attribute:!1})],C.prototype,`presented`,void 0),n([h()],C.prototype,`provider`,void 0),n([h()],C.prototype,`expanded`,void 0),n([h()],C.prototype,`activeTabId`,void 0),n([h()],C.prototype,`viewError`,void 0),customElements.get(`openclaw-plugin-session-dashboard`)||customElements.define(`openclaw-plugin-session-dashboard`,C)})))()}w();