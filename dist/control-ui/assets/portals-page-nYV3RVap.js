import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as i,bu as a,cc as o,fa as s,hu as c,lu as l,ql as u,sc as d,su as f,uu as p,xu as m}from"./control-ui-core-pYNj5S1a.js";import{Ma as h,Yi as g,Zi as _,or as v,sr as y,va as b,vi as x,yi as S}from"./control-ui-core-D6clmJs8.js";import{$ as C,F as w,M as T,X as E,Y as D,ct as O,m as k,nt as A,p as j,ut as M}from"./lit-runtime-DZL1fcCI.js";import{c as N,d as P,l as F}from"./gateway-runtime-iOL78mIi.js";import{Ki as I,no as L,qi as R,ro as z}from"./control-ui-boot-shared-3Hl8ksFq.js";var B,V;function H(){return(H=e((()=>{m(),B={portalsPage:{listLabel:`Active portals`,portLabel:`Port {port}`,openNewTab:`Open in new tab`,closePortal:`Close {title}`,previewTitle:`{title} portal preview`,loading:`Loading portals…`,emptyHint:`Ask the agent to start a portal:`,unavailable:`This portal is no longer available. Ask the agent to reopen the application.`,environmentStarting:`Starting your machine…`,waitingForApp:`Machine ready. Waiting for your application…`,environmentUnavailable:`The machine could not start. Ask the agent to check it or try again.`,promptShow:`Show me in a portal.`,promptStart:`Start the application in a portal.`,promptMakeAvailable:`Make the server available in a portal.`,unsupported:`This gateway does not support portals.`,loadFailed:`Could not load portals: {error}`,closeFailed:`Could not close the portal: {error}`,unreachableTitle:`Portal not reachable from this browser`,unreachableBody:`Check the portal URL's DNS, TLS, and network access. For private Tailscale Serve, allow its HTTPS port in your tailnet policy. For a reverse proxy, check the dedicated portal ingress route, then retry.`,newTabRequiredTitle:`Open this HTTP portal in a new tab`,newTabRequiredBody:`This portal uses HTTP with a different hostname or scheme from the Control UI. Open the link in a new tab so its authentication cookies work, or use an HTTPS portal for an embedded preview.`,ingressRequiredTitle:`Remote portal ingress required`,ingressRequiredBody:`This Gateway returned a loopback URL, which points to this browser's machine. Use a browser on the Gateway host, enable managed private Tailscale Serve, or configure gateway.portals.ingress with a separate private HTTPS wildcard proxy. Forwarding only the Gateway port is not enough.`,writeAccessRequiredTitle:`Write access required`,writeAccessRequiredBody:`This portal requires an operator with write access.`,retry:`Retry`}},V=Object.assign(()=>{a.portalsPage=B.portalsPage},{catalog:B})})))()}function U(e,t){try{return new URL(e.blockedURI).origin===t.origin}catch{return!1}}async function W(e){let t;try{t=new URL(e)}catch{return`unreachable`}let n=!1,r=e=>{U(e,t)&&(n=!0)},i=typeof document>`u`?void 0:document;i?.addEventListener(`securitypolicyviolation`,r);try{return await fetch(e,{mode:`no-cors`,signal:AbortSignal.timeout(G)}),`reachable`}catch{return await new Promise(e=>{setTimeout(e,0)}),n?`blocked`:`unreachable`}finally{i?.removeEventListener(`securitypolicyviolation`,r)}}var G;function K(){return(K=e((()=>{G=4e3})))()}function q(e,t){let n=new URL(e),r=new URL(t);return n.protocol===`http:`&&(r.protocol!==n.protocol||r.hostname!==n.hostname)}function J(e,t){return s(new URL(e).hostname)&&!s(new URL(t).hostname)}function Y(){return(Y=e((()=>{})))()}var X,Z;function Q(){return(Q=e((()=>{t(),D(),A(),j(),T(),b(),S(),v(),_(),p(),H(),u(),F(),z(),l(),R(),o(),K(),Y(),V(),X=`allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts`,Z=class extends f{constructor(...e){super(...e),this.embedded=!1,this.presented=!0,this.requestedPortalId=null,this.requestedEnvironmentId=null,this.portals=[],this.selectedPortalId=null,this.loading=!1,this.loaded=!1,this.error=null,this.closingPortalId=null,this.portalProbeState=null,this.pendingEnvironment=null,this.environmentFailure=null,this.environmentRequestGeneration=0,this.environmentLoading=!1,this.environmentPoll=new I(this,2e3,()=>void this.loadPendingEnvironment(),!1),this.requestGeneration=0,this.portalSetRevision=0,this.portalProbeGeneration=0,this.portalProbeCache=new Map,this.gateway=new L(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetGatewayState(),ensureInitialData:()=>void this.loadPresentation()}),this.subscriptions=new d(this).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.connected&&t.event===`portal.changed`&&this.loadPresentation()}))}disconnectedCallback(){this.environmentRequestGeneration+=1,this.portalProbeGeneration+=1,this.subscriptions.clear(),super.disconnectedCallback()}updated(e){[`requestedPortalId`,`requestedEnvironmentId`].some(t=>e.has(t)&&e.get(t)!==void 0)?(this.requestGeneration+=1,this.environmentRequestGeneration+=1,this.environmentLoading=!1,this.pendingEnvironment=null,this.environmentFailure=null,this.environmentPoll.stop(),this.loading=!1,this.portalProbeGeneration+=1,this.portalProbeState=null,this.applyPortalSet(this.portals),this.loadPresentation()):e.has(`presented`)&&e.get(`presented`)!==void 0&&this.presented?this.loadPresentation():e.has(`presented`)&&!this.presented&&(this.environmentPoll.stop(),this.environmentRequestGeneration+=1,this.environmentLoading=!1)}handleToggleRequest(e){let t=e instanceof CustomEvent?e.detail:null;if(t?.open!==!1){if(t?.portalId&&(t.portalId!==this.requestedPortalId||this.requestedEnvironmentId!==null)){this.requestedPortalId=t.portalId,this.requestedEnvironmentId=null;return}if(t?.environmentId&&(t.environmentId!==this.requestedEnvironmentId||this.requestedPortalId!==null)){this.requestedEnvironmentId=t.environmentId,this.requestedPortalId=null;return}this.loadPresentation()}}get pendingEnvironmentId(){return this.requestedPortalId?null:this.requestedEnvironmentId}async loadPresentation(){this.pendingEnvironmentId?await this.loadPendingEnvironment():await this.loadPortals()}async loadPendingEnvironment(){let e=this.pendingEnvironmentId,t=this.gateway.client,n=this.gateway.capture();if(!e||!t||!n||this.environmentLoading||this.embedded&&!this.presented)return;let r=++this.environmentRequestGeneration,a=()=>this.gateway.isCurrent(n)&&r===this.environmentRequestGeneration&&this.pendingEnvironmentId===e;this.environmentLoading=!0,this.environmentFailure=null;try{let n=await t.request(`environments.status`,{environmentId:e});if(!a())return;if(n.id!==e)throw Error(`Environment status returned a different target`);this.pendingEnvironment=n,n.status===`starting`?this.environmentPoll.start():this.environmentPoll.stop()}catch(t){a()&&(this.environmentFailure={environmentId:e,message:i(t)},this.environmentPoll.stop())}finally{a()&&(this.environmentLoading=!1)}}get portalListSupported(){return P(this.gateway.snapshot??{},`portal.list`)!==!1}get canClosePortal(){return N(this.gateway.snapshot,`portal.close`,`operator.write`)}resetGatewayState(){this.environmentRequestGeneration+=1,this.environmentLoading=!1,this.pendingEnvironment=null,this.environmentFailure=null,this.environmentPoll.stop(),this.requestGeneration+=1,this.portalSetRevision+=1,this.portals=[],this.selectedPortalId=null,this.loading=!1,this.loaded=!1,this.error=null,this.closingPortalId=null,this.portalProbeGeneration+=1,this.portalProbeCache.clear(),this.portalProbeState=null}applyPortalSet(e){this.portalSetRevision+=1,this.portals=[...e];let t=this.selectedPortalId,n=this.pendingEnvironmentId?null:this.requestedPortalId??(e.some(e=>e.id===t)?this.selectedPortalId:e[0]?.id??null);this.selectedPortalId=n,this.loaded=!0,this.error=null;let r=e.find(e=>e.id===n);r?this.ensurePortalProbe(r,n!==t):(this.portalProbeGeneration+=1,this.portalProbeState=null)}ensurePortalProbe(e,t=!1){if(!e.tokenQuery||!e.url){this.portalProbeGeneration+=1,this.portalProbeState=null;return}let n=e.url,r=`${e.id}\u0000${n}`;if(!t&&this.portalProbeState?.key===r)return;if(J(n,this.context.gateway.connection.gatewayUrl)){this.portalProbeGeneration+=1,this.portalProbeState={key:r,status:`ingress-required`};return}if(q(n,location.href)){this.portalProbeGeneration+=1,this.portalProbeState={key:r,status:`new-tab-required`};return}let i=t?void 0:this.portalProbeCache.get(r);if(i!==void 0){this.portalProbeState={key:r,status:i};return}let a=++this.portalProbeGeneration;this.portalProbeState={key:r,status:`probing`},W(n).then(e=>{a===this.portalProbeGeneration&&this.portalProbeState?.key===r&&(this.portalProbeCache.set(r,e),this.portalProbeState={key:r,status:e})})}selectPortal(e){e.id!==this.selectedPortalId&&(this.selectedPortalId=e.id,this.ensurePortalProbe(e,!0))}async loadPortals(){if(this.pendingEnvironmentId||!this.gateway.connected||!this.portalListSupported||this.loading||this.embedded&&!this.presented)return;let e=this.gateway.client,t=this.gateway.capture();if(!e||!t)return;let n=++this.requestGeneration,r=this.portalSetRevision;this.loading=!0,this.error=null;try{let i=await e.request(`portal.list`,{});n===this.requestGeneration&&r===this.portalSetRevision&&this.gateway.isCurrent(t)&&this.applyPortalSet(i.portals)}catch(e){n===this.requestGeneration&&this.gateway.isCurrent(t)&&this.portalListSupported&&(this.error=c(`portalsPage.loadFailed`,{error:i(e)}),this.loaded=!0)}finally{n===this.requestGeneration&&this.gateway.isCurrent(t)&&(this.loading=!1)}}async closePortal(e){if(!this.canClosePortal||this.closingPortalId)return;let t=this.gateway.client,n=this.gateway.capture();if(t&&n){this.closingPortalId=e.id,this.error=null;try{await t.request(`portal.close`,{id:e.id}),this.gateway.isCurrent(n)&&this.loadPortals()}catch(e){this.gateway.isCurrent(n)&&(this.error=c(`portalsPage.closeFailed`,{error:i(e)}))}finally{this.gateway.isCurrent(n)&&this.closingPortalId===e.id&&(this.closingPortalId=null)}}}renderEmptyState(){let e=!this.portalListSupported;return C`
      <section class="portals-empty" role="status" aria-live="polite">
        ${this.loading&&!this.loaded?C`<div class="portals-empty__title">${c(`portalsPage.loading`)}</div>`:C`
                <div class="portals-empty__title">
                  ${c(this.requestedPortalId?`portalsPage.unavailable`:`portalsPage.emptyHint`)}
                </div>
                ${this.requestedPortalId?E:C`<div class="portals-empty__prompts">
                        <span>${c(`portalsPage.promptShow`)}</span>
                        <span>${c(`portalsPage.promptStart`)}</span>
                        <span>${c(`portalsPage.promptMakeAvailable`)}</span>
                      </div>`}
              `}
        ${e?C`<div class="portals-empty__note">${c(`portalsPage.unsupported`)}</div>`:E}
        ${this.error?C`<div class="callout danger">${this.error}</div>`:E}
      </section>
    `}renderPortal(e){if(!e.tokenQuery||!e.url)return C`
        <section class="portals-preview">
          <div class="portals-preview__notice" role="status">
            <div class="portals-preview__notice-title">
              ${c(`portalsPage.writeAccessRequiredTitle`)}
            </div>
            <p>${c(`portalsPage.writeAccessRequiredBody`)}</p>
          </div>
        </section>
      `;let t=e.url,n=new URL(t);n.search=``;let r=`${e.id}\u0000${t}`,i=this.portalProbeState?.key===r?this.portalProbeState.status:`probing`;return C`
      <section class="portals-preview">
        <header class="portals-preview__header">
          <a
            class="portals-preview__url"
            href=${t}
            target="_blank"
            rel="noopener noreferrer"
            title=${n.href}
          >
            <span>${n.href}</span>
            ${g(`externalLink`)}
            <span class="sr-only">${c(`portalsPage.openNewTab`)}</span>
          </a>
          <button
            class="btn btn--icon btn--ghost portals-preview__close"
            type="button"
            title=${c(`portalsPage.closePortal`,{title:e.title})}
            aria-label=${c(`portalsPage.closePortal`,{title:e.title})}
            ?disabled=${!this.canClosePortal||this.closingPortalId===e.id}
            @click=${()=>void this.closePortal(e)}
          >
            ${g(`x`)}
          </button>
        </header>
        ${this.error?C`<div class="callout danger portals-preview__error" role="alert">
                ${this.error}
              </div>`:E}
        ${i===`probing`?C`
                <div class="portals-empty portals-preview__state" role="status" aria-live="polite">
                  <div class="portals-empty__title">${c(`portalsPage.loading`)}</div>
                </div>
              `:i===`unreachable`||i===`ingress-required`||i===`new-tab-required`?C`
                  <div class="portals-preview__notice" role="status">
                    <div class="portals-preview__notice-title">
                      ${c(i===`new-tab-required`?`portalsPage.newTabRequiredTitle`:i===`ingress-required`?`portalsPage.ingressRequiredTitle`:`portalsPage.unreachableTitle`)}
                    </div>
                    <p>
                      ${c(i===`new-tab-required`?`portalsPage.newTabRequiredBody`:i===`ingress-required`?`portalsPage.ingressRequiredBody`:`portalsPage.unreachableBody`)}
                    </p>
                    <a
                      class="portals-preview__notice-url"
                      href=${t}
                      target="_blank"
                      rel="noopener noreferrer"
                      >${n.href}</a
                    >
                    <button
                      class="btn"
                      type="button"
                      @click=${()=>this.ensurePortalProbe(e,!0)}
                    >
                      ${c(`portalsPage.retry`)}
                    </button>
                  </div>
                `:k(r,C`<iframe
                    ${w(e=>{e instanceof HTMLIFrameElement&&!e.hasAttribute(`src`)&&e.setAttribute(`src`,t)})}
                    class="portals-preview__frame"
                    title=${c(`portalsPage.previewTitle`,{title:e.title})}
                    referrerpolicy="no-referrer"
                    sandbox=${X}
                  ></iframe>`)}
      </section>
    `}render(){if(this.pendingEnvironmentId){let e=this.pendingEnvironment?.id===this.pendingEnvironmentId?this.pendingEnvironment:null,t=this.environmentFailure?.environmentId===this.pendingEnvironmentId?this.environmentFailure.message:null,n=t||e&&e.status!==`starting`&&e.status!==`available`;return C`<section class="portals-empty" role="status" aria-live="polite">
        <div class="portals-empty__title">
          ${c(n?`portalsPage.environmentUnavailable`:e?.status===`available`?`portalsPage.waitingForApp`:`portalsPage.environmentStarting`)}
        </div>
        ${t||e?.worker?.error?C`<p>${t??e?.worker?.error}</p>`:E}
        ${n?C`<button class="btn" type="button" @click=${()=>void this.loadPendingEnvironment()}>${c(`portalsPage.retry`)}</button>`:E}
      </section>`}let e=this.portals.find(e=>e.id===(this.requestedPortalId??this.selectedPortalId));return this.embedded?C`<div class="portals-embedded">
        ${e?this.renderPortal(e):this.renderEmptyState()}
      </div>`:C`
      <section
        class="content-header content-header--page"
        ${y({toolbarHeader:!0})}
      >
        <div>
          <h1 class="page-title">${h(`portals`)}</h1>
        </div>
      </section>
      ${e?C`
              <section class="portals-layout">
                <aside class="portals-rail" aria-label=${c(`portalsPage.listLabel`)}>
                  ${this.portals.map(t=>C`
                      <button
                        class="portals-rail__item ${t.id===e.id?`active`:``}"
                        type="button"
                        aria-current=${t.id===e.id?`true`:E}
                        @click=${()=>this.selectPortal(t)}
                      >
                        <span class="portals-rail__title">${t.title}</span>
                        <span class="portals-rail__port"
                          >${c(`portalsPage.portLabel`,{port:String(t.port)})}</span
                        >
                        ${t.description?C`<span class="portals-rail__description"
                                >${t.description}</span
                              >`:E}
                      </button>
                    `)}
                </aside>
                ${this.renderPortal(e)}
              </section>
            `:this.renderEmptyState()}
    `}},n([M({type:Boolean,reflect:!0})],Z.prototype,`embedded`,void 0),n([M({type:Boolean})],Z.prototype,`presented`,void 0),n([M({attribute:!1})],Z.prototype,`requestedPortalId`,void 0),n([M({attribute:!1})],Z.prototype,`requestedEnvironmentId`,void 0),n([r({context:x,subscribe:!0})],Z.prototype,`context`,void 0),n([O()],Z.prototype,`portals`,void 0),n([O()],Z.prototype,`selectedPortalId`,void 0),n([O()],Z.prototype,`loading`,void 0),n([O()],Z.prototype,`loaded`,void 0),n([O()],Z.prototype,`error`,void 0),n([O()],Z.prototype,`closingPortalId`,void 0),n([O()],Z.prototype,`portalProbeState`,void 0),n([O()],Z.prototype,`pendingEnvironment`,void 0),n([O()],Z.prototype,`environmentFailure`,void 0),customElements.get(`openclaw-portals-page`)||customElements.define(`openclaw-portals-page`,Z)})))()}Q();