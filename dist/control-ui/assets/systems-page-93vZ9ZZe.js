import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ji as t,Ti as n,qr as r}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as i,Jc as a,P as o,R as s,Yc as c,bs as l,bu as ee,cc as u,hc as te,hu as d,lu as f,pa as ne,ql as p,sc as m,su as h,uu as g,xc as re,xu as ie,yc as ae}from"./control-ui-core-pYNj5S1a.js";import{$r as oe,Kr as _,Xi as v,Zi as y,_r as se,dr as ce,hr as le,rt as b,st as ue,ur as x}from"./control-ui-core-D6clmJs8.js";import{$ as S,F as de,M as fe,X as C,Y as w,c as pe,m as me,nt as T,p as he,s as ge,ut as E}from"./lit-runtime-DZL1fcCI.js";import{Ki as _e,Nr as ve,Pr as ye,qi as be}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Xa as xe,Ya as Se}from"./control-ui-boot-shared-DJ4XCcp6.js";import{t as Ce}from"./desktop-panel-B7I9XR4x.js";import{n as D,r as O}from"./system-info-BXt4emol.js";import{t as k}from"./sparkline-tile-CmpQxP7x.js";var A,j;function M(){return(M=e((()=>{ie(),A={systems:{title:`Systems`,inventory:`Machines`,search:`Find a machine…`,filterSort:`Filter & sort machines`,sortBy:`Sort by`,alphabetical:`Alphabetical`,onlineFirst:`Online first`,offlineFirst:`Offline first`,all:`All`,select:`Select a machine`,selectHint:`Choose a host, worker, or paired node to see its status and desktop.`,refresh:`Refresh machines`,loading:`Loading machines…`,empty:`No machines are available to this account.`,noMatches:`No machines match your search or filters.`,offlineGateway:`Gateway disconnected. Reconnect to refresh machines or open a desktop.`,offlineTitle:`This machine is offline`,offlineHint:`Its last reported information is shown. Reconnect the machine to open its desktop.`,noDesktopTitle:`No desktop available`,noDesktopHint:`This machine has not reported a desktop. Its other capabilities remain available.`,noHostDesktopHint:`Refresh machines to check screen-sharing availability on this Gateway.`,screenSharingDetected:`Screen Sharing is available`,desktopDetected:`A desktop is available`,managedDesktopConfigured:`A managed desktop is configured`,screenSharingNeeded:`Turn on Screen Sharing`,desktopServerNeeded:`Set up a desktop server`,desktopSetupAttention:`Screen sharing needs attention`,desktopSetupEnableHint:`Enable desktop access to view and control this machine in OpenClaw.`,screenSharingSetupHint:`On this Mac, open System Settings → General → Sharing. Turn on Screen Sharing, or allow this account to Observe and Control in Remote Management, then check again.`,desktopServerSetupHint:`Set up a password-protected VNC server on this machine, or configure a managed desktop on Linux, then check again.`,enableDesktopAccess:`Enable desktop access in OpenClaw`,desktopSetupEnabling:`Enabling desktop access…`,desktopSetupEnabled:`Desktop access is enabled`,desktopSetupConnecting:`Waiting for desktop access to become available.`,desktopSetupApplyHint:`Applies without restarting the Gateway.`,desktopSetupAdminHint:`A Gateway administrator can enable desktop access.`,desktopSetupCheckAgain:`Check again`,desktopSetupFailed:`Desktop access could not be enabled. Refresh machines and try again.`,accessTitle:`Desktop access unavailable`,accessHint:`Desktop viewing requires an advertised desktop service and administrator access.`,missingTitle:`This machine is no longer listed`,missingHint:`Refresh the inventory or choose another machine. Your selection has not been changed.`,details:`Machine details`,closeDetails:`Close details`,stats:`Show statistics`,hideStats:`Hide statistics`,online:`Online`,offline:`Offline`,unknown:`Unknown`,unavailable:`Unavailable`,desktop:`Desktop`,host:`Gateway host`,worker:`Worker`,node:`Paired node`,workers:`Workers`,nodes:`Paired nodes`,status:`Status`,platform:`Platform`,identifier:`Identifier`,capabilities:`Capabilities`,telemetry:`Reported statistics`,load:`Load (1 min)`,cpuCount:`{count} cores`,memory:`Memory used`,disk:`Disk available`,sampled:`Sampled {time}`,collectingHistory:`Collecting history…`,lastKnown:`Last reported {time}`,noTelemetry:`This machine has not reported resource statistics.`,attachedSessions:`Attached sessions`,attachedHint:`Attachment does not mean a session is currently executing on this machine.`,relatedSessions:`Related sessions`,relatedHint:`Bindings from the loaded session list. A binding is not proof that a turn executed here.`,noRelatedSessions:`No related sessions in the loaded list.`,relations:{placement:`Placed here`,"retained-placement":`Retained placement`,runner:`Runner`,"exec-binding":`Configured exec target`,gateway:`Local session context`},statuses:{starting:`Starting`,stopping:`Stopping`,error:`Error`},errors:`Some machine information could not be refreshed.`}},j=Object.assign(()=>Object.assign(ee,A),{catalog:A})})))()}async function we(e,t){let n=e.snapshot.client;if(!n||!t.isCurrent()||t.signal?.aborted)return;let r={signal:t.signal},[a,o,s]=await Promise.allSettled([n.request(`environments.list`,{includeDesktopSetup:!0},r),n.request(`node.list`,{},r),O(e,t.signal,{fresh:t.fresh})]);if(t.isCurrent()&&!t.signal?.aborted&&!(s.status===`rejected`&&s.reason instanceof DOMException&&s.reason.name===`AbortError`)){if(a.status===`rejected`)throw a.reason;return{environments:a.value.environments,nodes:o.status===`fulfilled`?o.value.nodes:[],gatewaySystemInfo:s.status===`fulfilled`?s.value.value:null,gatewaySampledAtMs:s.status===`fulfilled`?s.value.at:null,errors:{...o.status===`rejected`?{nodes:i(o.reason)}:{},...s.status===`rejected`?{systemInfo:i(s.reason)}:{}}}}}function Te(e,t){let n=new Map(e.nodes.map(e=>[`node:${e.nodeId}`,e])),r=new Map,i=(e,t,n)=>{let i=r.get(e),a={kind:t,session:n};i?i.push(a):r.set(e,[a])};for(let e of t){let t=e.placement;if(t&&t.state!==`local`){if(t.state===`requested`)continue;t.environmentId&&i(t.environmentId,t.state===`reclaimed`||t.state===`failed`?`retained-placement`:`placement`,e),t.state===`active`&&t.runner?.deviceId&&i(`node:${t.runner.deviceId}`,`runner`,e);continue}let n=e.execNode?.trim();i(n?`node:${n}`:`gateway`,n?`exec-binding`:`gateway`,e)}return e.environments.filter(e=>e.type!==`worker`||e.worker?.state!==`destroyed`&&e.worker?.state!==`failed`).map(t=>({environment:t,node:t.type===`node`?n.get(t.id):void 0,gatewaySystemInfo:t.id===`gateway`?e.gatewaySystemInfo??void 0:void 0,sessions:r.get(t.id)??[]}))}function N(){return(N=e((()=>{p(),D()})))()}function P(e){return e.gatewaySystemInfo??e.node?.hostStats}var F,I;function L(){return(L=e((()=>{F=3e4,I=12e4})))()}var R;function z(){return(z=e((()=>{ce(),se(),b(),g(),a(),p(),D(),N(),L(),R=class{constructor(e){this.context=e,this.inventory=null,this.rows=[],this.selectedId=null,this.query=``,this.sortMode=`online-first`,this.statusFilter=`all`,this.showStats=!0,this.showDetails=!1,this.loading=!1,this.error=null,this.sampledAtMs=null,this.desktopSetupError=null,this.telemetry=new Map,this.listeners=new Set,this.subscriptions=[],this.generation=0,this.presented=!1,this.scope=x(e.gateway),this.lifecycle=ne(e.gateway.snapshot)}get current(){return this.scope===x(this.context.gateway)}get connected(){return this.current&&this.context.gateway.snapshot.phase===`connected`}get needsInventoryRefresh(){return this.inventory===null||this.refreshQueued!==void 0}get desktopAvailable(){return this.current&&ue(this.context.gateway.snapshot)}get selected(){return this.current?this.rows.find(e=>e.environment.id===this.selectedId):void 0}get hostDesktopEnabled(){let e=c(this.context.runtimeConfig.state.configSnapshot)?.desktop;return t(e)&&t(e.host)&&e.host.enabled===!0}get desktopSetupBusy(){return this.desktopSetupRequest!==void 0}resetDesktopSetup(){this.desktopSetupRequest=void 0,this.desktopSetupError=null}get canEnableHostDesktop(){let e=this.selected?.environment.desktopSetup;return this.presented&&this.connected&&this.selectedId===`gateway`&&(e?.state===`ready`||e?.state===`managed`)&&!this.hostDesktopEnabled&&this.context.runtimeConfig.canPatch===!0}async enableHostDesktop(){let e=this.lifecycle.capture(),t=this.context.runtimeConfig;if(!e||!this.canEnableHostDesktop||this.desktopSetupBusy)return;let n=Symbol(`desktop-setup`),r=()=>this.desktopSetupRequest===n&&this.presented&&this.current&&this.lifecycle.isCurrent(e)&&this.context.runtimeConfig===t;this.desktopSetupRequest=n,this.desktopSetupError=null,this.notify();try{if(await t.ensureLoaded(),!r()||!this.canEnableHostDesktop)return;let e=await t.patch({raw:{desktop:{host:{enabled:!0}}},note:`systems: enable host desktop`,canDispatch:()=>r()&&this.canEnableHostDesktop});r()&&!e&&(this.desktopSetupError=t.state.lastError??d(`systems.desktopSetupFailed`)),r()&&e&&await this.refresh()}catch(e){r()&&(this.desktopSetupError=i(e))}finally{r()&&(this.desktopSetupRequest=void 0,this.notify())}}telemetryHistory(e){return this.current?this.telemetry.get(e)??[]:[]}subscribe(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}notify(){for(let e of this.listeners)e()}projectRows(){this.rows=this.inventory&&this.current?Te(this.inventory,this.context.sessions.state.result?.sessions??[]):[]}recordTelemetry(e){let t=new Set(this.rows.map(e=>e.environment.id));for(let e of this.telemetry.keys())t.has(e)||this.telemetry.delete(e);for(let t of this.rows){let n=t.environment.id,r=P(t);if(!r){this.telemetry.delete(n);continue}let i=n===`gateway`;if(i&&!e)continue;let a=t.node?.hostStats?.updatedAtMs??this.sampledAtMs;if(a===null)continue;let o=this.telemetry.get(n)??[],s=o.at(-1);if(s&&a<=s.at)continue;let c=i?F:I,l=s&&a-s.at<=c?o:[];this.telemetry.set(n,[...l.slice(-119),{at:a,stats:r}])}}select(e){this.current&&e.trim()&&(this.telemetryRequest?.abort(),this.telemetryRequest=void 0,e!==this.selectedId&&this.resetDesktopSetup(),this.selectedId=e,this.notify())}search(e){this.query=e,this.notify()}setSortMode(e){this.sortMode=e,this.notify()}setStatusFilter(e){this.statusFilter=e,this.notify()}toggleStats(){this.showStats=!this.showStats,this.notify()}toggleDetails(){this.showDetails=!this.showDetails,this.notify()}setPresented(e){if(this.presented!==e){if(this.presented=e,!e){for(let e of this.subscriptions)e();this.subscriptions=[],this.cancelRefresh(),this.resetDesktopSetup();return}this.subscriptions=[this.context.gateway.subscribe(e=>{let t=this.lifecycle.transition(e);this.current?t&&(this.cancelRefresh(),this.resetDesktopSetup(),this.telemetry.clear(),e.phase===`connected`&&this.refresh()):this.clear(),this.notify()}),this.context.gateway.subscribeEvents(e=>{e.event===`presence`||e.event===`node.pair.resolved`||e.event===`node.runnerInventory.changed`||e.event===`config.changed`?this.refresh():e.event===`node.hostStats`&&t(e.payload)&&typeof e.payload.nodeId==`string`&&this.selectedId===`node:${e.payload.nodeId}`&&this.refreshTelemetry()}),this.context.sessions.subscribe(()=>{this.projectRows(),this.notify()}),this.context.runtimeConfig.subscribe(()=>this.notify())],this.lifecycle.transition(this.context.gateway.snapshot)&&this.telemetry.clear(),this.current?this.refresh():this.clear()}}cancelRefresh(){this.generation+=1,this.request?.abort(),this.telemetryRequest?.abort(),this.request=void 0,this.telemetryRequest=void 0,this.loading=!1,this.refreshQueued=void 0}clear(){this.cancelRefresh(),this.inventory=null,this.rows=[],this.selectedId=null,this.error=null,this.sampledAtMs=null,this.telemetry.clear(),this.resetDesktopSetup(),this.query=``}async refresh(e=`automatic`){let t=this.context.gateway.snapshot;this.lifecycle.transition(t)&&this.telemetry.clear();let n=this.lifecycle.capture();if(!this.presented||!this.current||!n||!le(t.hello?.auth??null))return;let r=this.refreshQueued===`manual`?`manual`:e;if(this.loading||document.visibilityState===`hidden`){this.refreshQueued=r;return}this.cancelRefresh();let a=this.generation,o=new AbortController;this.request=o;let s=()=>this.presented&&this.current&&a===this.generation&&this.lifecycle.isCurrent(n);this.loading=!0,this.error=null,this.notify();try{let e=await we(this.context.gateway,{signal:o.signal,isCurrent:s,fresh:r===`manual`});if(!e&&s()&&(this.refreshQueued=this.refreshQueued===`manual`?`manual`:r),!e||!s())return;let t=this.inventory===null;if(this.inventory=e,this.projectRows(),this.sampledAtMs=e.gatewaySampledAtMs,this.recordTelemetry(!0),t&&this.selectedId===null){let e=this.context.gateway.snapshot.sessionKey;this.selectedId=this.rows.find(t=>t.sessions.some(t=>t.session.key===e))?.environment.id??this.rows.find(e=>e.environment.id===`gateway`)?.environment.id??this.rows[0]?.environment.id??null}}catch(e){s()&&(this.error=i(e))}finally{s()&&(this.loading=!1,this.request=void 0,this.notify(),this.refreshQueued&&this.refresh())}}async refreshTelemetry(){let e=this.selected,t=this.inventory,n=this.lifecycle.capture();if(!this.presented||!this.current||!n||!e||!t||this.loading||this.telemetryRequest)return;let r=e.environment.id===`gateway`;if(!r&&e.environment.type!==`node`)return;let a=new AbortController;this.telemetryRequest=a;let o=this.generation,s=this.selectedId,c=()=>this.presented&&this.current&&this.lifecycle.isCurrent(n)&&this.telemetryRequest===a&&o===this.generation&&this.selectedId===s;try{if(r){let e=await O(this.context.gateway,a.signal);if(!c()||!this.inventory)return;let{systemInfo:t,...n}=this.inventory.errors;this.inventory={...this.inventory,gatewaySystemInfo:e.value,gatewaySampledAtMs:e.at,errors:n},this.sampledAtMs=e.at}else{let e=await n.client.request(`node.list`,{},{signal:a.signal});if(!c()||!this.inventory)return;let{nodes:t,...r}=this.inventory.errors;this.inventory={...this.inventory,nodes:e.nodes,errors:r}}this.projectRows(),this.recordTelemetry(r)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;c()&&this.inventory&&(this.inventory={...this.inventory,errors:{...this.inventory.errors,[r?`systemInfo`:`nodes`]:i(e)}})}finally{c()&&(this.telemetryRequest=void 0,this.notify())}}}})))()}function B(e,t,n){return S`<wa-dropdown-item
    class="sidebar-session-sort-menu__item"
    value=${e}
    role="menuitemradio"
    aria-checked=${String(n)}
    ${de(e=>xe(e,n))}
  >
    <span class="session-menu__text">${d(t)}</span>
    <span slot="details" class="session-menu__check" aria-hidden="true"
      >${n?v.check:C}</span
    >
  </wa-dropdown-item>`}function V(e){let t=e.gatewaySystemInfo?.machineName??e.environment.label??e.node?.displayName;if(t)return t;if(e.environment.id===`gateway`)return d(`systems.host`);let n=e.environment.worker;if(n){let t=e.sessions.find(e=>e.kind===`placement`)?.session;if(t)return t.displayName??t.label??t.key;if(n.profileId)return`${n.providerId} · ${n.profileId}`}return e.environment.id}function Ee(e){return e.slice(e.lastIndexOf(`:`)+1,e.lastIndexOf(`:`)+7)}function H(e){return e.environment.id===`gateway`?`host`:e.environment.type===`node`?`node`:`worker`}function U(e){return d(e.environment.status===`available`?`systems.online`:e.environment.status===`unavailable`?`systems.offline`:`systems.statuses.`+e.environment.status)}function W(e){let t=e.gatewaySystemInfo?.osLabel??e.environment.platform??e.node?.platform;return t?ye(t,e.node?.deviceFamily):void 0}var G,K,q;function J(){return(J=e((()=>{w(),T(),fe(),y(),Se(),g(),M(),ve(),f(),u(),j(),G=[{value:`name`,labelKey:`systems.alphabetical`},{value:`online-first`,labelKey:`systems.onlineFirst`},{value:`offline-first`,labelKey:`systems.offlineFirst`}],K=[{value:`all`,labelKey:`systems.all`},{value:`online`,labelKey:`systems.online`},{value:`offline`,labelKey:`systems.offline`}],q=class extends h{constructor(){super(),new m(this).watch(()=>this.controller,(e,t)=>e.subscribe(t))}render(){let e=this.controller;if(!e?.current)return C;let t=e.query.trim().toLocaleLowerCase(),n=e.rows.filter(n=>(e.statusFilter===`all`||n.environment.status===(e.statusFilter===`online`?`available`:`unavailable`))&&[V(n),n.environment.id,W(n)??``,n.environment.platform??n.node?.platform??``].some(e=>e.toLocaleLowerCase().includes(t))).toSorted((t,n)=>{if(e.sortMode!==`name`){let r=e.sortMode===`online-first`?`available`:`unavailable`,i=Number(n.environment.status===r)-Number(t.environment.status===r);if(i)return i}return V(t).localeCompare(V(n),void 0,{numeric:!0,sensitivity:`base`})||t.environment.id.localeCompare(n.environment.id)}),r=t=>{let n=t.environment.status===`available`,r=W(t),i=U(t);return S`<button
        class="systems-machine"
        type="button"
        data-status=${t.environment.status}
        aria-pressed=${t.environment.id===e.selectedId}
        aria-description=${r?`${i} · ${r}`:i}
        @click=${()=>e.select(t.environment.id)}
      >
        <i class="systems-machine__dot" aria-hidden="true"></i>
        <span class="systems-machine__name">${V(t)}</span>
        <span class="systems-machine__meta"
          >${n?t.environment.worker?Ee(t.environment.id):r??C:i}</span
        >
        ${t.environment.desktop?S`<span class="systems-machine__desktop"
                >${v.monitor}<span class="sr-only">${d(`systems.desktop`)}</span></span
              >`:C}
      </button>`};return S`<section class="systems-sidebar" aria-label=${d(`systems.inventory`)}>
      <div class="systems-filter">
        <span aria-hidden="true">${v.search}</span>
        <input
          type="search"
          aria-label=${d(`systems.search`)}
          placeholder=${d(`systems.search`)}
          .value=${e.query}
          @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.search(t.currentTarget.value)}}
        />
        <wa-dropdown
          class="systems-filter-menu sidebar-session-sort-menu"
          placement="bottom-end"
          aria-label=${d(`systems.filterSort`)}
          @wa-select=${t=>{let n=t.detail.item.value,r=G.find(e=>n===`sort:${e.value}`),i=K.find(e=>n===`status:${e.value}`);r?e.setSortMode(r.value):i&&e.setStatusFilter(i.value)}}
        >
          <button
            slot="trigger"
            type="button"
            class="systems-filter__sort sidebar-session-sort ${e.statusFilter===`all`?``:`sidebar-session-sort--filtered`}"
            aria-label=${d(`systems.filterSort`)}
            title=${d(`systems.filterSort`)}
          >
            ${v.listFilter}
          </button>
          <div class="sidebar-session-sort-menu__title">${d(`systems.sortBy`)}</div>
          ${G.map(t=>B(`sort:${t.value}`,t.labelKey,e.sortMode===t.value))}
          <div class="session-menu__separator" role="separator"></div>
          <div class="sidebar-session-sort-menu__title">${d(`systems.status`)}</div>
          ${K.map(t=>B(`status:${t.value}`,t.labelKey,e.statusFilter===t.value))}
        </wa-dropdown>
        <button
          type="button"
          class="systems-filter__refresh"
          aria-label=${d(`systems.refresh`)}
          title=${d(`systems.refresh`)}
          ?disabled=${e.loading||!e.connected}
          @click=${()=>void e.refresh(`manual`)}
        >
          ${v.refresh}
        </button>
      </div>
      <div class="systems-sidebar__list" aria-busy=${e.loading}>
        ${e.loading&&!e.inventory?S`<p class="systems-sidebar__empty" role="status">${d(`systems.loading`)}</p>`:C}
        ${n.filter(e=>H(e)===`host`).map(r)}
        ${[`node`,`worker`].map(e=>{let t=n.filter(t=>H(t)===e);return t.length?S`<section class="systems-group">
                <h3>
                  <span>${d(e===`node`?`systems.nodes`:`systems.workers`)}</span>
                  <span class="systems-group__count">${t.length}</span>
                </h3>
                ${t.map(r)}
              </section>`:C})}
        ${!e.loading&&n.length===0?S`<p class="systems-sidebar__empty">${d(t||e.statusFilter!==`all`?`systems.noMatches`:`systems.empty`)}</p>`:C}
      </div>
    </section>`}},r([E({attribute:!1})],q.prototype,`controller`,void 0),customElements.get(`openclaw-systems-sidebar`)||customElements.define(`openclaw-systems-sidebar`,q)})))()}function Y(e){return n(e,{style:`legacy-binary`,separator:` `,maxUnit:`tera`,fractionDigits:(e,t)=>+(t===`tera`||e<10)})}function X(e,t){let n=[];for(let{at:r,stats:i}of e){let e=t(i);e===void 0||!Number.isFinite(e)?n.length=0:n.push({at:r,value:e})}return n}function Z(e,t){let n=P(e);if(!n)return S`<p class="systems-no-telemetry">${d(`systems.noTelemetry`)}</p>`;let r=e.node?.hostStats?.updatedAtMs??t.sampledAtMs,i=e.environment.id===`gateway`,a=!t.connected||e.environment.status!==`available`||!!t.inventory?.errors[i?`systemInfo`:`nodes`]||r!==null&&Date.now()-r>(i?3e4:12e4),s=t.telemetryHistory(e.environment.id),c=s.length?s:[{at:r??0,stats:n}],l=(e,t)=>S`
    <openclaw-sparkline
      class="gateway-vital systems-vital systems-vital--disk"
      title=${e??C}
      .label=${e?`${d(`systems.disk`)} ${e}`:d(`systems.disk`)}
      .sub=${t===void 0?``:`/ ${Y(t)}`}
      .samples=${X(c,t=>e===void 0?t.disks===void 0?t.diskAvailableBytes:void 0:t.disks?.find(t=>t.path===e)?.availableBytes)}
      .format=${Y}
      .autorange=${!0}
    ></openclaw-sparkline>
  `;return me(e.environment.id,S`<div class="systems-metrics" data-stale=${a}>
      <div
        class="systems-vitals ${n.disks&&n.disks.length!==1?`systems-vitals--volumes`:``}"
      >
        <openclaw-sparkline
          class="gateway-vital systems-vital systems-vital--load"
          .label=${d(`systems.load`)}
          .sub=${d(`systems.cpuCount`,{count:String(n.cpuCount)})}
          .samples=${X(c,e=>e.loadAverage?.[0])}
          .format=${e=>e.toFixed(2)}
          .floorMax=${n.cpuCount}
        ></openclaw-sparkline>
        <openclaw-sparkline
          class="gateway-vital systems-vital systems-vital--memory"
          .label=${d(`systems.memory`)}
          .sub=${`/ ${Y(n.memoryTotalBytes)}`}
          .samples=${X(c,e=>e.memoryTotalBytes-e.memoryFreeBytes)}
          .format=${Y}
          .floorMax=${n.memoryTotalBytes}
        ></openclaw-sparkline>
        ${n.disks===void 0?l(void 0,n.diskTotalBytes):pe(n.disks,e=>e.path,e=>l(e.path,e.totalBytes))}
      </div>
      <div class="systems-metrics-caption">
        ${!a&&c.length<2?S`<span>${d(`systems.collectingHistory`)}</span>`:C}
        ${r===null?C:S`<span class="systems-sample-time">${d(a?`systems.lastKnown`:`systems.sampled`,{time:o(Math.max(0,Date.now()-r))})}</span>`}
      </div>
    </div>`)}function De(e,t,n=!0){return e?S`<openclaw-systems-page
        .routeData=${e}
        .presented=${n}
      ></openclaw-systems-page>`:C}function Oe(e){return e?S`<openclaw-systems-sidebar .controller=${e.controller}></openclaw-systems-sidebar>`:C}function ke(e){return{controller:new R(e)}}var Q;function $(){return($=e((()=>{w(),T(),he(),ge(),y(),k(),oe(),Ce(),g(),M(),s(),te(),f(),be(),u(),z(),J(),L(),j(),Q=class extends h{constructor(){super(),this.presented=!0,this.poll=new _e(this,15e3,()=>{let e=this.routeData?.controller;this.presented&&e&&(e.needsInventoryRefresh?e.refresh():(e.showStats||e.showDetails)&&e.refreshTelemetry())},!0,`visible`),this.handleDesktopToggle=e=>{let n=this.routeData?.controller;if(!this.presented||!n?.current||!(e instanceof CustomEvent))return;let r=t(e.detail)?e.detail:{},i=typeof r.environmentId==`string`?r.environmentId:void 0;if(e.preventDefault(),e.stopImmediatePropagation(),r?.open===!1){this.querySelector(`openclaw-desktop-panel`)?.handleToggleRequest(e);return}if(i&&i!==n.selectedId){n.select(i),n.rows.some(e=>e.environment.id===i)||n.refresh();return}i&&this.querySelector(`openclaw-desktop-panel`)?.handleToggleRequest(e)},this.poll,new m(this).watch(()=>this.routeData?.controller,(e,t)=>e.subscribe(t))}connectedCallback(){super.connectedCallback(),window.addEventListener(_,this.handleDesktopToggle)}disconnectedCallback(){window.removeEventListener(_,this.handleDesktopToggle),this.activeController?.setPresented(!1),this.activeController=void 0,super.disconnectedCallback()}updated(e){(e.has(`routeData`)||e.has(`presented`))&&(this.activeController!==this.routeData?.controller&&this.activeController?.setPresented(!1),this.activeController=this.routeData?.controller,this.activeController?.setPresented(this.presented))}renderDetails(e,t){let n=t.environment;return S`<aside class="systems-details" aria-label=${d(`systems.details`)}>
      <header>
        <h2>${d(`systems.details`)}</h2>
        <button
          class="systems-icon-button"
          aria-label=${d(`systems.closeDetails`)}
          @click=${()=>e.toggleDetails()}
        >
          ${v.x}
        </button>
      </header>
      <dl>
        <dt>${d(`systems.identifier`)}</dt>
        <dd>${n.id}</dd>
        <dt>${d(`systems.status`)}</dt>
        <dd>${e.connected?U(t):d(`systems.offline`)}</dd>
        <dt>${d(`systems.platform`)}</dt>
        <dd>${W(t)??d(`systems.unknown`)}</dd>
      </dl>
      <h3>${d(`systems.telemetry`)}</h3>
      ${Z(t,e)}
      <h3>${d(`systems.relatedSessions`)}</h3>
      <p class="systems-detail-hint">${d(`systems.relatedHint`)}</p>
      ${t.sessions.length?t.sessions.map(t=>{let n=t.session,r=ae(n),i=re({context:e.context,face:r,sessionKey:n.key,preferenceDerivedFace:!0});return S`<a
                class="systems-session-link"
                href=${i.href}
                @click=${t=>{l(t)&&(t.preventDefault(),e.context.navigate(r,i.options))}}
                ><strong>${n.displayName??n.label??n.key}</strong
                ><span>${d(`systems.relations.`+t.kind)}</span></a
              >`}):S`<p class="systems-detail-hint">${d(`systems.noRelatedSessions`)}</p>`}
      ${n.worker?.attachedSessionIds.length?S`<h3>${d(`systems.attachedSessions`)}</h3>
              <p class="systems-detail-hint">${d(`systems.attachedHint`)}</p>
              <ul>
                ${n.worker.attachedSessionIds.map(e=>S`<li>${e}</li>`)}
              </ul>`:C}
      <h3>${d(`systems.capabilities`)}</h3>
      <div class="systems-capabilities">
        ${(n.capabilities??[]).map(e=>S`<span>${e}</span>`)}
      </div>
    </aside>`}renderHostDesktopSetup(e,t){let n=t.environment.desktopSetup,r=e.hostDesktopEnabled,i=W(t)?.startsWith(`macOS`)===!0,a=n?.state===`ready`||n?.state===`managed`,o=r?`systems.desktopSetupEnabled`:n?.state===`managed`?`systems.managedDesktopConfigured`:n?.state===`ready`?i?`systems.screenSharingDetected`:`systems.desktopDetected`:n?.state===`needs-server`?i?`systems.screenSharingNeeded`:`systems.desktopServerNeeded`:`systems.desktopSetupAttention`,s=r?`systems.desktopSetupConnecting`:a?`systems.desktopSetupEnableHint`:i&&n?.state===`needs-server`?`systems.screenSharingSetupHint`:`systems.desktopServerSetupHint`;return S`<div class="systems-state" role="status">
      <span class="systems-state__icon" aria-hidden="true">${v.monitor}</span>
      <h2>${d(o)}</h2>
      <p>${d(s)}</p>
      ${n?.state===`unsupported`&&n.detail?S`<p>${n.detail}</p>`:C}
      ${e.desktopSetupError?S`<p class="systems-callout--error" role="alert">${e.desktopSetupError}</p>`:C}
      ${!r&&a?S`
              <button
                class="btn primary systems-text-button"
                ?disabled=${!e.canEnableHostDesktop||e.desktopSetupBusy}
                @click=${()=>void e.enableHostDesktop()}
              >
                ${d(e.desktopSetupBusy?`systems.desktopSetupEnabling`:`systems.enableDesktopAccess`)}
              </button>
              <p>
                ${d(e.context.runtimeConfig.canPatch===!0?`systems.desktopSetupApplyHint`:`systems.desktopSetupAdminHint`)}
              </p>
            `:C}
      ${!r&&!a?S`<button class="systems-text-button" ?disabled=${e.loading||!e.connected} @click=${()=>void e.refresh(`manual`)}>${d(`systems.desktopSetupCheckAgain`)}</button>`:C}
    </div>`}render(){let e=this.routeData?.controller;if(!e?.current)return S`<p class="systems-state" role="status">${d(`systems.loading`)}</p>`;let t=e.selected,n=!!(t?.environment.desktop&&t.environment.status===`available`&&e.desktopAvailable&&this.presented),r=t?V(t):d(`systems.title`),i=Object.values(e.inventory?.errors??{}),a=e.connected?e.loading&&!e.inventory?d(`systems.loading`):e.selectedId&&!t?d(`systems.missingTitle`):t?t.environment.status===`available`?t.environment.desktop?d(`systems.accessTitle`):d(`systems.noDesktopTitle`):t.environment.status===`unavailable`?d(`systems.offlineTitle`):U(t):d(`systems.select`):d(`systems.offlineGateway`),o=e.selectedId&&!t?d(`systems.missingHint`):t?t.environment.status===`available`?t.environment.desktop?d(`systems.accessHint`):d(t.environment.id===`gateway`?`systems.noHostDesktopHint`:`systems.noDesktopHint`):d(`systems.offlineHint`):d(`systems.selectHint`);return S`<section class="systems-workspace" aria-label=${d(`systems.title`)}>
      <header class="systems-toolbar">
        <div class="systems-heading">
          <h1>${r}</h1>
          <span>${d(t?`systems.`+H(t):`systems.selectHint`)}</span>
        </div>
        <select
          class="systems-mobile-picker"
          aria-label=${d(`systems.select`)}
          @change=${t=>{t.currentTarget instanceof HTMLSelectElement&&e.select(t.currentTarget.value)}}
        >
          <option value="" disabled .selected=${!t}>${d(`systems.select`)}</option>
          ${e.rows.map(t=>S`<option value=${t.environment.id} .selected=${t.environment.id===e.selectedId}>${V(t)}</option>`)}
        </select>
        <button
          class="systems-icon-button"
          title=${d(e.showStats?`systems.hideStats`:`systems.stats`)}
          aria-label=${d(e.showStats?`systems.hideStats`:`systems.stats`)}
          aria-pressed=${e.showStats}
          @click=${()=>e.toggleStats()}
        >
          ${v.activity}
        </button>
        <button
          class="systems-icon-button"
          title=${d(`systems.details`)}
          aria-label=${d(`systems.details`)}
          aria-pressed=${e.showDetails}
          ?disabled=${!t}
          @click=${()=>e.toggleDetails()}
        >
          ${v.panelRightOpen}
        </button>
      </header>
      ${e.error?S`<div class="systems-callout systems-callout--error" role="alert">${e.error}<button @click=${()=>void e.refresh(`manual`)} ?disabled=${e.loading}>${d(`common.retry`)}</button></div>`:C}
      ${e.connected?C:S`<div class="systems-callout" role="status">${d(`systems.offlineGateway`)}</div>`}
      ${i.length?S`<details class="systems-callout">
              <summary>${d(`systems.errors`)}</summary>
              ${i.map(e=>S`<p>${e}</p>`)}
            </details>`:C}
      ${e.showStats&&t?Z(t,e):C}
      <div class="systems-body">
        <div class="systems-desktop">
          ${n&&t?S`<openclaw-desktop-panel
                  embedded
                  data-chat-autotype-exempt
                  .client=${e.context.gateway.snapshot.client}
                  .available=${e.desktopAvailable}
                  .presented=${this.presented}
                  .workspaceControls=${!0}
                  .suppliedEnvironments=${e.inventory?.environments??[]}
                  .requestedSource=${t.environment.id}
                  .basePath=${e.context.basePath}
                ></openclaw-desktop-panel>`:t?.environment.id===`gateway`&&e.connected&&t.environment.status===`available`&&(t.environment.desktopSetup||t.environment.desktop&&e.hostDesktopEnabled&&e.context.runtimeConfig.canPatch===!0)?this.renderHostDesktopSetup(e,t):S`<div class="systems-state" role="status">
                    <span class="systems-state__icon" aria-hidden="true">${v.monitor}</span>
                    <h2>${a}</h2>
                    <p>${o}</p>
                    ${t?S`<button class="systems-text-button" @click=${()=>e.toggleDetails()}>${d(`systems.details`)}</button>`:C}
                  </div>`}
        </div>
        ${e.showDetails&&t?this.renderDetails(e,t):C}
      </div>
    </section>`}},r([E({attribute:!1})],Q.prototype,`routeData`,void 0),r([E({type:Boolean})],Q.prototype,`presented`,void 0),customElements.get(`openclaw-systems-page`)||customElements.define(`openclaw-systems-page`,Q)})))()}$();export{ke as load,De as render,Oe as renderSidebar};