import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,tn as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{Nc as a,Pc as o,Qi as s,Ss as c,Xi as l,hu as u,lu as d,su as f,uu as p,xs as m}from"./control-ui-core-pYNj5S1a.js";import{Cn as h,Ma as g,fn as _,ja as v,mn as y,or as b,sr as ee,va as te,vi as x,yi as ne}from"./control-ui-core-D6clmJs8.js";import{$ as S,X as C,Y as w,ct as T,nt as re}from"./lit-runtime-DZL1fcCI.js";import{Ki as ie,Xi as ae,Yi as oe,no as se,qi as ce,ro as le}from"./control-ui-boot-shared-3Hl8ksFq.js";import{At as E,Et as D,Mt as O,Ot as k,To as A,_t as j,kt as M,wo as N,yt as P}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as F,t as I}from"./en-settings-DlF4_5vi.js";import{n as L,o as R}from"./settings-targets-B7PGvUUs.js";import{n as z}from"./login-runtime-BWImoWQx.js";import{n as B,t as V}from"./settings-workspace-DKW0BVnu.js";import{n as H,r as U,t as W}from"./system-info-BXt4emol.js";import{n as ue,r as de,t as fe}from"./system-info-DJYC6ElX.js";import{a as pe,n as me}from"./gateway-vitals-edlwgcif.js";function he(e){if(e.length===0)return null;let t=e.toSorted((e,t)=>e-t),n=e=>t[Math.ceil(t.length*e)-1];return{count:e.length,averageMs:e.reduce((e,t)=>e+t,0)/e.length,p50Ms:n(.5),p95Ms:n(.95),p99Ms:n(.99)}}function G(){return(G=e((()=>{})))()}function ge(e){return e>=.92?`critical`:e>=.75?`warn`:`ok`}function _e(e,t){let n=Math.min(Math.max(t,0),1),r=Math.round(n*100);return S`
    <div
      class="config-host__meter"
      role="meter"
      aria-label=${u(`quickSettings.system.usage`,{label:e})}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${r}
    >
      <div
        class="config-host__meter-fill config-host__meter-fill--${ge(n)}"
        style="--config-host-meter-fill: ${r}%"
      ></div>
    </div>
  `}function ve(e){let t=e.path?`${e.label} ${e.path}`:e.label;return S`
    <div class="config-host__stat" title=${e.title??C}>
      <div class="config-host__stat-label">
        ${e.label}${e.path?S` <span class="config-host__stat-path">${e.path}</span>`:C}
      </div>
      <div class="config-host__stat-value">
        ${e.value}${e.unit?S` <span class="config-host__stat-unit">${e.unit}</span>`:C}
      </div>
      ${e.usedFraction==null?C:_e(t,e.usedFraction)}
      ${e.detail?S`<div class="config-host__stat-detail">${e.detail}</div>`:C}
    </div>
  `}function K(e,t){if(!(e==null||t==null||e<=0))return(e-t)/e}function q(e){return`${Math.round(Math.min(Math.max(e,0),1)*100)}%`}function ye(e){let t=e.loadAverage?.[0],n=e.loadAverage?u(`quickSettings.system.loadAverage`,{values:e.loadAverage.map(e=>e.toFixed(1)).join(` · `)}):void 0,r=[e.cpuModel,n].filter(Boolean).join(` · `)||void 0,i=u(e.cpuCount===1?`quickSettings.system.core`:`quickSettings.system.cores`,{count:String(e.cpuCount)}),o=t==null?{label:u(`quickSettings.system.cpu`),value:i,detail:e.cpuModel}:{label:u(`quickSettings.system.cpu`),value:t.toFixed(1),unit:u(`quickSettings.system.load`),detail:i,usedFraction:e.cpuCount>0?t/e.cpuCount:void 0,title:r},s=K(e.memoryTotalBytes,e.memoryFreeBytes),c=[o,{label:u(`quickSettings.system.memory`),value:s==null?`—`:q(s),unit:s==null?void 0:u(`quickSettings.system.used`),detail:u(`quickSettings.system.freeOf`,{free:a(e.memoryFreeBytes),total:a(e.memoryTotalBytes)}),usedFraction:s}];for(let t of e.disks??[]){let e=K(t.totalBytes,t.availableBytes);e!=null&&c.push({label:u(`quickSettings.system.disk`),value:q(e),unit:u(`quickSettings.system.used`),detail:u(`quickSettings.system.freeOf`,{free:a(t.availableBytes),total:a(t.totalBytes)}),usedFraction:e,path:t.path})}return c}function be(e){return[{label:u(`quickSettings.system.cpu`),value:e},{label:u(`quickSettings.system.memory`),value:e},{label:u(`quickSettings.system.disk`),value:e}]}function xe(e){if(e.systemInfoUnavailable)return C;let t=e.systemInfo,n=e.systemInfoLoading?S`<span class="skeleton config-host__placeholder" aria-hidden="true"></span>`:`—`,r=t&&t.hostname!==t.machineName?t.hostname:void 0,i=t?.lanAddress?`${t.lanAddress}${t.port==null?``:`:${t.port}`}`:void 0,a=t?ye(t):be(n),o={title:u(`quickSettings.system.gatewayHost`),actions:t?O({kind:`ok`,label:u(`quickSettings.system.up`,{duration:oe(t.uptimeMs)})}):void 0};return S`
    <div id=${L.host} aria-busy=${!!e.systemInfoLoading}>
      ${E(o,S`
          <div class="config-host">
            <div class="config-host__identity">
              <div class="config-host__name" title=${r??``}>
                ${t?.machineName??n}
              </div>
              <div class="config-host__meta">
                ${t?`${t.osLabel} · ${t.arch}`:n}
              </div>
              <div class="config-host__meta">
                ${t?u(`quickSettings.system.runtime`,{version:t.nodeVersion,pid:String(t.pid)}):n}
              </div>
              ${i?S`<code class="config-host__address">${i}</code>`:C}
            </div>
            <div class="config-host__stats">${a.map(ve)}</div>
          </div>
        `)}
    </div>
  `}function J(){return(J=e((()=>{w(),j(),p(),o(),ae(),R()})))()}function Se(e){return e?`${(e/1e3).toFixed(e%1e3==0?0:1)}s`:null}function Ce(e,t){let n=t===`password`?`connection.access.passwordHint`:t===`token`?`connection.access.tokenHint`:`connection.access.secretHint`;return k({title:u(`connection.access.secret`),description:u(n),control:S`<div class="settings-input-with-hint">
      ${M({ariaLabel:u(`connection.access.secret`),value:e.secret,placeholder:u(`connection.access.secretPlaceholder`),visible:e.showGatewaySecret,showLabel:u(`connection.access.showSecret`),hideLabel:u(`connection.access.hideSecret`),toggleLabel:u(`connection.access.toggleSecretVisibility`),onInput:e.onSecretChange,onToggle:e.onToggleGatewaySecretVisibility})}
      ${z(e.secret)===`setup-code`?S`<p class="settings-row__desc" role="status">
              ${u(`connection.access.setupCodeHint`)}
            </p>`:C}
    </div>`,stackedOnNarrow:!0})}function we(e){return`${e.toFixed(1)} ${u(`connection.ping.unit`)}`}function Te(e){let t=[{key:`average`,value:e.ping?.averageMs},{key:`p50`,value:e.ping?.p50Ms},{key:`p95`,value:e.ping?.p95Ms},{key:`p99`,value:e.ping?.p99Ms}];return S`<div class="settings-row connection-ping">
    <dl class="connection-ping__stats" aria-label=${u(`connection.ping.title`)}>
      ${t.map(({key:e,value:t})=>S`<div title=${u(`connection.ping.${e}Hint`)}>
          <dt>${u(`connection.ping.${e}`)}</dt>
          <dd>
            ${t===void 0?`—`:S`${t.toFixed(1)} <span>${u(`connection.ping.unit`)}</span>`}
          </dd>
        </div>`)}
    </dl>
    <openclaw-sparkline
      class="gateway-vital connection-ping__trend"
      .label=${u(`connection.ping.latest`)}
      .samples=${e.pingSamples}
      .format=${we}
      .floorMax=${100}
    ></openclaw-sparkline>
    <p class="settings-row__desc">
      ${e.ping?u(`connection.ping.samples`,{count:String(e.ping.count)}):e.pingFailed?C:u(`connection.ping.measuring`)}
      ${e.pingFailed?S`<span class="connection-ping__error" role="status">
              ${u(`connection.ping.failed`)}
            </span>`:C}
    </p>
  </div>`}function Ee(e){let t=e.hello?.snapshot,n=e.phase===`connected`,i=[`connecting`,`starting`,`reconnecting`].includes(e.phase),a=i&&!e.dirty,o=e.phase===`reload-required`,s=t?.authMode,c=r(e.settings.gatewayUrl)===r(e.liveGatewayUrl)?s:void 0,l=c===`trusted-proxy`,d=n?`connected`:e.phase===`stopped`?`offline`:e.phase,f=u(a?e.phase===`reconnecting`?`connection.access.status.reconnecting`:`connection.access.status.connecting`:n||i?`connection.access.applyReconnect`:e.lastError?`connection.access.retry`:`common.connect`),p=Se(e.hello?.policy?.tickIntervalMs),h=S`
    ${n?Te(e):C}
    ${k({title:u(`connection.access.gatewayUrl`),description:u(`connection.access.gatewayUrlHint`),control:S`
        <input
          class="settings-input"
          aria-label=${u(`connection.access.gatewayUrl`)}
          inputmode="url"
          autocapitalize="none"
          autocorrect="off"
          autocomplete="off"
          spellcheck="false"
          .value=${e.settings.gatewayUrl}
          @input=${t=>{e.onConnectionChange({gatewayUrl:t.target.value})}}
          placeholder="wss://gateway.example:443"
        />
      `})}
    ${l?k({title:u(`connection.access.secret`),description:u(`connection.access.trustedProxy`),control:O({kind:`ok`,label:u(`connection.access.trustedProxyStatus`)})}):Ce(e,c)}
    ${!n&&e.lastError?k({title:O({kind:`danger`,label:u(`connection.access.lastError`)}),description:e.lastError}):C}
    ${(!n||e.dirty)&&!o?S`<div class="settings-row connection-actions">
            <div class="settings-row__text">
              <span class="settings-row__desc" role="status">
                ${e.dirty?u(`connection.access.unsavedHint`):C}
              </span>
            </div>
            <div class="settings-row__control connection-actions__buttons">
              ${e.dirty?S`<button class="btn" @click=${e.onDiscardConnection}>
                      ${u(`connection.access.discard`)}
                    </button>`:C}
              <button class="btn primary" ?disabled=${a} @click=${e.onConnect}>
                ${a?S`<span class="btn__spinner" aria-hidden="true"></span>`:C}
                ${f}
              </button>
            </div>
          </div>`:C}
    <details class="connection-details">
      <summary>${u(`connection.access.details`)}</summary>
      <div class="connection-details__body">
        ${n&&(s||p)?S`<p class="settings-row__desc">
                ${[s?u(Y[s]):null,p?u(`connection.access.tick`,{tick:p}):null].filter(Boolean).join(` · `)}
              </p>`:C}
        <p class="settings-row__desc">${u(`connection.access.reconnectHint`)}</p>
        <button class="btn" ?disabled=${!n||e.dirty} @click=${e.onReconnect}>
          ${u(`connection.access.reconnect`)}
        </button>
      </div>
    </details>
  `;return D([E({title:u(`connection.access.title`),description:n?u(`connection.access.connectedTo`,{host:m(e.liveGatewayUrl)}):u(i||o?`connection.access.status.${d}`:`connection.access.descriptionOffline`),actions:O({kind:n?`ok`:`warn`,label:u(`connection.access.status.${d}`)})},h),E({title:u(`connection.activity.title`),description:u(`connection.activity.description`)},S`<div class="settings-row connection-activity">
        ${pe(e.statusHistory.at(-1)?.status??{},e.statusHistory)}
        ${e.statusFailed?S`<p class="settings-row__desc" role="status">
                ${u(`connection.activity.failed`)}
              </p>`:n?e.statusHistory.length===0?S`<p class="settings-row__desc" role="status">${u(`common.loading`)}</p>`:C:S`<p class="settings-row__desc">${u(`connection.activity.offline`)}</p>`}
      </div>`),E({title:u(`connection.access.sessionTitle`),description:u(`connection.access.sessionDescription`,{host:m(e.liveGatewayUrl)})},S`
        ${k({title:u(`connection.access.sessionKey`),description:u(`connection.access.sessionKeyHint`),control:S`
            <input
              class="settings-input"
              aria-label=${u(`connection.access.sessionKey`)}
              .value=${e.settings.sessionKey}
              @input=${t=>e.onSessionKeyChange(t.target.value)}
            />
          `})}
        ${e.sessionDirty?S`<div class="settings-row">
                <div class="settings-row__text"></div>
                <div class="settings-row__control connection-actions__buttons">
                  <button class="btn" @click=${e.onDiscardSession}>
                    ${u(`connection.access.discard`)}
                  </button>
                  <button
                    class="btn primary"
                    ?disabled=${!e.settings.sessionKey.trim()}
                    @click=${e.onSaveSession}
                  >
                    ${u(`common.save`)}
                  </button>
                </div>
              </div>`:e.sessionSaved?S`<div class="settings-row" role="status">${u(`connection.access.saved`)}</div>`:C}
      `),xe(e),e.canForgetDevice?E({title:u(`connection.browser.title`)},k({title:u(`connection.browser.savedSignIn`),control:S`<button class="btn" @click=${e.onForgetDevice}>
              ${u(`connection.browser.forgetDevice`)}
            </button>`})):C])}var Y;function X(){return(X=e((()=>{w(),me(),j(),p(),I(),c(),J(),F(),Y={none:`connection.access.auth.none`,token:`connection.access.auth.token`,password:`connection.access.auth.password`,"trusted-proxy":`connection.access.auth.trustedProxy`}})))()}var Z,Q;function $(){return($=e((()=>{t(),w(),re(),te(),ne(),_(),b(),N(),j(),V(),p(),l(),c(),H(),le(),d(),ce(),G(),fe(),X(),Z=`https://docs.openclaw.ai/gateway/remote`,Q=class extends f{constructor(...e){super(...e),this.settings=y(),this.password=``,this.gatewaySecretVisible=!1,this.systemInfo=null,this.systemInfoUnavailable=!1,this.systemInfoLoading=!1,this.ping=null,this.pingFailed=!1,this.pingSamples=[],this.pingRequest=null,this.statusHistory=[],this.statusFailed=!1,this.systemInfoRequest=null,this.sessionKeyBaseline=``,this.sessionGatewayUrl=``,this.sessionSaved=!1,this.diagnosticsPolling=new ie(this,W,()=>this.refreshDiagnostics(),!1),this.gateway=new se(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>{this.systemInfoLoading=!1,this.resetDiagnostics()},onSnapshot:e=>this.handleGatewaySnapshot(e),onPageActivation:()=>this.syncDiagnosticsPolling()})}disconnectedCallback(){this.resetDiagnostics(),this.resetSensitiveUi(),super.disconnectedCallback()}resetSensitiveUi(){this.gatewaySecretVisible=!1}handleGatewaySnapshot({snapshot:e,initial:t,sourceChanged:n,clientChanged:r}){let i=this.systemInfoUnavailable;t||n||r?(this.resetDiagnostics(),this.resetConnectionDraft(),(t||n||this.sessionGatewayUrl!==this.context.gateway.connection.gatewayUrl)&&this.resetSessionDraft(),this.systemInfo=null,this.systemInfoUnavailable=!1):e.phase!==`connected`&&(this.resetSensitiveUi(),this.systemInfo=null),e.phase===`connected`&&e.hello&&(this.systemInfoUnavailable=!de(e.hello),this.systemInfoUnavailable&&(this.gateway.invalidate(),this.systemInfoRequest?.abort(),this.systemInfoRequest=null,this.systemInfoLoading=!1,this.systemInfo=null,this.statusFailed=!0)),this.settings.sessionKey===this.sessionKeyBaseline&&(this.settings={...this.settings,sessionKey:e.sessionKey}),this.sessionKeyBaseline=e.sessionKey,this.syncDiagnosticsPolling(),i&&!this.systemInfoUnavailable&&this.loadSystemInfo()}stopDiagnosticsPolling(){this.diagnosticsPolling.stop(),this.pingRequest?.abort(),this.pingRequest=null,this.systemInfoRequest?.abort(),this.systemInfoRequest=null,this.systemInfoLoading=!1}resetDiagnostics(){this.stopDiagnosticsPolling(),this.pingSamples=[],this.ping=null,this.pingFailed=!1,this.statusHistory=[],this.statusFailed=!1}syncDiagnosticsPolling(){let e=this.context.gateway.snapshot;if(!this.isConnected||document.visibilityState===`hidden`||e.phase!==`connected`||!e.client){this.stopDiagnosticsPolling();return}this.diagnosticsPolling.start()&&this.refreshDiagnostics()}refreshDiagnostics(){this.measurePing(),this.loadSystemInfo()}async measurePing(){let e=this.gateway.gateway,t=this.gateway.capture();if(!e||e!==this.context.gateway||!t||this.pingRequest||document.visibilityState===`hidden`)return;let n=new AbortController;this.pingRequest=n;let r=()=>this.pingRequest===n&&this.isConnected&&document.visibilityState!==`hidden`&&this.context.gateway===e&&this.gateway.isCurrent(t),i=performance.now();try{if(await t.client.request(`last-heartbeat`,{},{timeoutMs:W,signal:n.signal}),!r())return;this.pingSamples=[...this.pingSamples.slice(-99),{at:Date.now(),value:performance.now()-i}],this.ping=he(this.pingSamples.map(e=>e.value)),this.pingFailed=!1}catch{r()&&(this.pingFailed=!0)}finally{this.pingRequest===n&&(this.pingRequest=null)}}async loadSystemInfo(){let e=this.gateway.gateway,t=this.gateway.capture();if(!e||e!==this.context.gateway||!t||this.systemInfoUnavailable||this.systemInfoRequest||document.visibilityState===`hidden`)return;let n=new AbortController;this.systemInfoRequest=n,this.systemInfoLoading=!0;let r=()=>this.systemInfoRequest===n&&this.isConnected&&document.visibilityState!==`hidden`&&this.context.gateway===e&&this.gateway.isCurrent(t);try{let t=await U(e,n.signal);if(!r())return;this.systemInfo=t.value,this.diagnosticsPolling.stop(),this.diagnosticsPolling.start(),this.statusHistory.at(-1)?.at!==t.at&&(this.statusHistory=[...this.statusHistory.slice(-99),{at:t.at,status:{eventLoop:t.value.eventLoop,processMemory:t.value.processMemory}}]),this.statusFailed=!1}catch(e){if(!r())return;this.statusFailed=!0,(s(e)||ue(e))&&(this.systemInfo=null,this.systemInfoUnavailable=!0)}finally{this.systemInfoRequest===n&&(this.systemInfoRequest=null,this.systemInfoLoading=!1)}}resetConnectionDraft(){let{gatewayUrl:e,token:t,password:n}=this.context.gateway.connection;this.settings={...this.settings,gatewayUrl:e,token:t},this.password=n,this.resetSensitiveUi()}resetSessionDraft(){this.sessionGatewayUrl=this.context.gateway.connection.gatewayUrl,this.sessionKeyBaseline=this.context.gateway.snapshot.sessionKey,this.settings={...this.settings,sessionKey:this.sessionKeyBaseline},this.sessionSaved=!1}saveSession(){this.context.gateway.setSessionKey(this.settings.sessionKey),this.resetSessionDraft(),this.sessionSaved=!0}async forgetDevice(){let e=this.context.gateway,t=e.connection.gatewayUrl;await A({title:u(`connection.browser.confirmTitle`),message:u(`connection.browser.confirmMessage`,{gateway:m(t)}),confirmLabel:u(`connection.browser.confirmLabel`),danger:!0})&&this.isConnected&&this.context.gateway===e&&e.connection.gatewayUrl===t&&(e.forgetDeviceToken?.(),this.requestUpdate())}connect(){this.context.gateway.connect({gatewayUrl:this.settings.gatewayUrl,token:this.settings.token,password:this.password})}updateConnection(e){if(e.gatewayUrl!==void 0){let t=h(this.settings.gatewayUrl,e.gatewayUrl,{token:this.settings.token,password:this.password});this.password=t.password,this.settings={...this.settings,...e,token:t.token};return}this.settings={...this.settings,...e}}render(){let e=this.context.gateway.snapshot,t=this.context.gateway.connection,n=this.settings.gatewayUrl!==t.gatewayUrl||this.settings.token!==t.token||this.password!==t.password,r=Ee({phase:e.phase,hello:e.hello,settings:this.settings,liveGatewayUrl:t.gatewayUrl,secret:this.settings.token||this.password,lastError:e.lastError,systemInfo:this.systemInfo,systemInfoLoading:this.systemInfoLoading,systemInfoUnavailable:this.systemInfoUnavailable,ping:this.ping,pingFailed:this.pingFailed,pingSamples:this.pingSamples,statusHistory:this.statusHistory,statusFailed:this.statusFailed,dirty:n,sessionDirty:this.settings.sessionKey.trim()!==e.sessionKey,sessionSaved:this.sessionSaved,showGatewaySecret:this.gatewaySecretVisible,canForgetDevice:this.context.gateway.hasStoredDeviceToken?.()??!1,onForgetDevice:()=>void this.forgetDevice(),onConnectionChange:e=>this.updateConnection(e),onSecretChange:e=>{this.password=``,this.updateConnection({token:e})},onSessionKeyChange:e=>{this.sessionSaved=!1,this.settings={...this.settings,sessionKey:e}},onToggleGatewaySecretVisibility:()=>{this.gatewaySecretVisible=!this.gatewaySecretVisible},onConnect:()=>this.connect(),onDiscardConnection:()=>this.resetConnectionDraft(),onReconnect:()=>this.context.gateway.connect(),onSaveSession:()=>this.saveSession(),onDiscardSession:()=>this.resetSessionDraft()});return S`
      <section class="content-header" ${ee({toolbarHeader:!0})}>
        <div>
          <h1 class="page-title">${g(`connection`)}</h1>
          <div class="page-subtitle">
            ${v(`connection`)} ${P(Z)}
          </div>
        </div>
      </section>
      ${B(r)}
    `}},n([i({context:x,subscribe:!0})],Q.prototype,`context`,void 0),n([T()],Q.prototype,`settings`,void 0),n([T()],Q.prototype,`password`,void 0),n([T()],Q.prototype,`gatewaySecretVisible`,void 0),n([T()],Q.prototype,`systemInfo`,void 0),n([T()],Q.prototype,`systemInfoUnavailable`,void 0),n([T()],Q.prototype,`systemInfoLoading`,void 0),n([T()],Q.prototype,`ping`,void 0),n([T()],Q.prototype,`pingFailed`,void 0),n([T()],Q.prototype,`statusHistory`,void 0),n([T()],Q.prototype,`statusFailed`,void 0),n([T()],Q.prototype,`sessionSaved`,void 0),customElements.get(`openclaw-connection-page`)||customElements.define(`openclaw-connection-page`,Q)})))()}$();