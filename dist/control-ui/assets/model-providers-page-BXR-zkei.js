const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./model-setup-page-Ds6U3bmf.js","./control-ui-boot-shared-DhhSjjdA.js","./control-ui-boot-shared-C-yZTZmO.js","./control-ui-boot-shared-CES8Ypkl.js","./plugin-contracts-runtime-DSgjMI0R.js","./markdown-runtime-Hc-lvqnn.js","./config-runtime-CgOgfOrG.js","./control-ui-boot-shared-og7lWkK4.js","./control-ui-boot-shared-e4-xCIbb.js","./control-ui-boot-shared-vP4joK1k.js","./control-ui-boot-shared-DCY2wZcy.js","./css-chat-Ckz95ikh.js","./chat-transcript-layout-hEyp1qZw.js","./css-chat-custodian-new-session-CbWc8vdc.js","./sidebar-update-runtime-BZGhWGH_.js","./settings-DdI5hVp3.js","./state-BcCfjWLC.js","./wizard-login-controller-CVVvSr5l.js","./wizard-step-controls-DGymql-W.js","./channel-picker-DrPxQAZi.js","./first-run-activation-receipt-CZRNSRC0.js","./control-ui-core-D-VUH4Gq.css","./control-ui-boot-shared-BJ_QKfFn.css","./css-chat-DCHf01mf.css","./css-chat-custodian-new-session-FmhgzIjj.css","./sidebar-update-runtime-ah7rgQE7.css","./settings-DyrJbLnT.css","./channel-picker-DMboyz7y.css","./wizard-step-controls-D2NAzKG1.css","./wizard-login-controller-CpdIpYqr.css","./view-status-CPVPeI0Y.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Br as n,Mr as r,Pa as i,Ui as a,qr as o,zi as s,zr as c}from"./control-ui-foundation-C3MHh_P-.js";import{D as l,F as u,Fc as d,Gl as f,Ic as p,Jc as m,Kl as h,Ko as g,Pc as ee,R as te,T as _,Yo as ne,cc as re,hu as v,it as y,lu as b,nl as ie,qc as ae,ql as oe,rt as se,sc as ce,su as le,uu as x,vt as ue,yt as de}from"./control-ui-core-pYNj5S1a.js";import{Ma as fe,Xi as S,Zi as C,_r as pe,fr as me,va as he,vi as ge,yi as _e}from"./control-ui-core-D6clmJs8.js";import{$ as w,X as T,Y as E,ct as D,nt as ve,ut as ye}from"./lit-runtime-DZL1fcCI.js";import{gt as be,ht as xe}from"./control-ui-boot-shared-CnK2ZXzW.js";import{c as Se,d as Ce,l as we}from"./gateway-runtime-iOL78mIi.js";import{H as Te,U as Ee,_a as De,ct as Oe,dt as ke,ga as Ae,lt as je,m as Me,mt as Ne,no as Pe,p as Fe,pt as Ie,ro as Le,st as Re,ya as ze}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as O,R as k,V as Be,z as A}from"./control-ui-boot-shared-D-LYw3KU.js";import{At as j,Ba as Ve,Dt as He,Et as Ue,Ft as We,It as Ge,Mt as M,Ot as N,St as P,To as Ke,Ua as qe,_t as F,jt as Je,wo as Ye,wt as Xe,xt as I,yt as Ze,za as Qe}from"./control-ui-boot-shared-DJ4XCcp6.js";import{Et as $e,Tt as et}from"./control-ui-boot-shared-TgR3hRAg.js";import{n as tt,t as nt}from"./en-settings-DlF4_5vi.js";import{n as rt,t as it}from"./settings-workspace-DKW0BVnu.js";import{n as L,t as at}from"./model-picker-Cr4HKWDk.js";import{n as ot,t as st}from"./decision-model-picker-BMoJj1QJ.js";import{a as ct,i as lt,n as R,r as ut,t as dt}from"./load-CcKuTk7y.js";import{n as ft,r as pt}from"./usage-CNBIeCDY.js";import{A as z,C as mt,D as ht,E as gt,F as _t,M as B,N as vt,O as yt,P as bt,S as xt,T as V,_ as St,a as H,b as U,c as Ct,d as wt,f as Tt,g as Et,h as Dt,i as Ot,j as W,k as kt,m as At,n as jt,o as Mt,p as Nt,r as Pt,s as Ft,t as It,u as Lt,v as Rt,w as zt,x as Bt,y as Vt}from"./view-status-KxPBw5LM.js";import{n as Ht,t as Ut}from"./provider-usage-1TWMOVJN.js";function Wt(e){let t=null,n=null,r=0,i={get generation(){return r},get discovering(){return t!==null},get error(){return n},retry(){a()},reset(){let r=t;t=null,n=null,r?.abort(),e.requestUpdate()}};async function a(){let i=e.getAgentId();if(!i||t)return;let a=e.getGateway(),o=a.client;if(!a.connected||!o)return;let s=e.getAgentEpoch(),c=a.epoch,l=new AbortController,u=()=>t===l&&a.isCurrent({client:o,epoch:c})&&e.getAgentId()===i&&e.getAgentEpoch()===s;t=l,r+=1,n=null,e.requestUpdate();try{let t=await Oe(o,{agentId:i,refresh:!0,signal:l.signal});if(u()){n=je(t,v(`modelProviders.defaults.discoverFailed`));let r=e.getData();r&&e.setData({...r,providerOutcomes:t.providerOutcomes??[],catalogError:null})}}catch(e){u()&&(n=f(e,`request failed`))}finally{t===l&&(t=null,e.requestUpdate(),e.onSettled())}}return i}function Gt(){return(Gt=e((()=>{x(),oe(),Re()})))()}var Kt;function qt(){return(qt=e((()=>{O(),ue(),R(),Kt=class{constructor(e,t){this.options=t,this.active=!1,this.publicationPending=!1,this.task=new k(e,{autoRun:!1,task:([e],{signal:t})=>e?ct(e.client,{agentId:e.agentId,...e.reason===`forced`?{refresh:!0}:{},signal:t}).then(t=>({...e,data:t})):A,onComplete:e=>{this.settle(),this.options.onComplete(e)},onError:()=>this.settle()})}get loading(){return this.active}refresh(e,t,n){return n===`publication`&&(this.active||this.options.isCatalogLoading())?(this.publicationPending=!0,Promise.resolve()):(n===`publication`&&(this.publicationPending&&de(e,{agentId:t}),this.publicationPending=!1),this.active=!0,this.options.onStart(n),this.task.run([{client:e,agentId:t,reason:n}]))}invalidate(){this.publicationPending=!1,this.active=!1,this.task.run([null])}settle(){this.active=!1,this.flushPublication()}flushPublication(){queueMicrotask(()=>{this.publicationPending&&!this.active&&!this.options.isCatalogLoading()&&this.options.refreshPublication()})}}})))()}function Jt(e){return e.state===`closed`?T:e.state===`loading`?w`<openclaw-modal-dialog
      label=${v(`modelSetup.discovery.title`)}
      @modal-cancel=${e.onCancel}
    >
      <div class="model-setup-wizard">
        <div class="model-setup-wizard__body" role="status">${v(`common.loading`)}</div>
        <div class="model-setup-wizard__footer">
          <button class="btn" @click=${e.onCancel}>${v(`common.cancel`)}</button>
        </div>
      </div>
    </openclaw-modal-dialog>`:w`<openclaw-model-setup-page
    .routeData=${{firstRun:!1}}
    .embedded=${!0}
    .credentialChoices=${e.credentialChoices}
    .agentLabel=${e.agentLabel}
    .onClose=${e.onClose}
  ></openclaw-model-setup-page>`}var Yt;function Xt(){return(Xt=e((()=>{E(),x(),Dt(),t(),Et(),Yt=class{constructor(e,t){this.host=e,this.options=t,this.state=`closed`,this.generation=0,this.owner=null,e.addController(this)}get busy(){return this.state!==`closed`}reset(){this.generation+=1,this.state=`closed`,this.owner=null,this.host.requestUpdate()}hostUpdated(){let e=this.owner;if(!e)return;let t=this.options.getOwner();(this.state===`loading`&&!this.options.isCurrent(e)||t.selectionIntentRevision!==e.selectionIntentRevision||!t.selectionPending&&t.agentId!==e.agentId)&&this.reset()}cancelLoading(){this.state===`loading`&&this.reset()}hostDisconnected(){this.reset()}async open(){if(!this.options.canOpen()||this.busy)return;let e=this.options.getOwner();if(!e.client)return;let t=this.generation,n=()=>t===this.generation&&this.state===`loading`&&this.options.isCurrent(e);this.owner=e,this.state=`loading`,this.host.requestUpdate();try{await s(()=>import(`./model-setup-page-Ds6U3bmf.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]),import.meta.url),n()&&(this.state=`ready`,this.host.requestUpdate())}catch(e){n()&&(this.reset(),this.options.onError(e))}}render(e){let t=this.generation;return Jt({...e,state:this.state,onCancel:()=>{t===this.generation&&this.reset()},onClose:()=>{t===this.generation&&(this.reset(),this.options.onClose())}})}}})))()}var G,Zt,Qt;function $t(){return($t=e((()=>{O(),E(),C(),Ve(),F(),x(),m(),we(),V(),G=`acpx.agents.list`,Zt={installed:{kind:`muted`,labelKey:`modelProviders.installedAgents.status.installed`},missing:{kind:`muted`,labelKey:`modelProviders.installedAgents.status.missing`},unverified:{kind:`warn`,labelKey:`modelProviders.installedAgents.status.unverified`}},Qt=class{constructor(e,t){this.host=e,this.options=t,this.agents=null,this.pending=new Map,this.messages=new Map,this.list=new k(e,{args:()=>[t.gateway.connected&&this.available()?t.gateway.client:null,t.gateway.epoch],task:async([e],{signal:t})=>e?(await e.request(G,{},{signal:t})).agents:A,onComplete:e=>{this.agents=e}})}get loading(){return this.list.status===Be.PENDING}get error(){return this.list.status===Be.ERROR?B(this.list.error):null}subscribe(e){return e.subscribeEvents(e=>{e.event===`config.changed`&&this.agents!==null&&this.pending.size===0&&this.list.run()})}reset(e={}){this.list.run([null,this.options.gateway.epoch]),this.pending.clear(),this.messages.clear(),e.preserveVisibleData||(this.agents=null)}filterProviders(e){return e.filter(e=>!this.agents?.some(t=>t.runtimeId===e.id))}available(){return Se(this.options.getContext().gateway.snapshot,G,`operator.read`)}blockedReason(){return W(this.options.getContext())}setEnabled(e,t){let n=this.options.gateway.capture();if(!n||this.blockedReason()||z(this.options.getContext())||this.pending.has(e.id))return!1;this.pending.set(e.id,t);let r=()=>this.options.gateway.isCurrent(n);return _t({runtimeConfig:this.options.getContext().runtimeConfig,isCurrentClient:r,isCurrentAgent:()=>!0,setBusy:t=>{t||this.pending.delete(e.id),this.host.requestUpdate()},setMessage:t=>{t?this.messages.set(e.id,t):this.messages.delete(e.id),this.host.requestUpdate()}},{key:`installed-agent:${e.id}`,raw:{plugins:{entries:{acpx:{config:{nativeAgents:{[e.id]:t}}}}}},note:v(`modelProviders.installedAgents.note`)}).then(()=>{r()&&this.list.run()}),!0}renderAgent(e,t,n,r){let i=this.pending.get(e.id),a=i??(typeof n==`boolean`?n:e.enabled),o=Zt[e.installation],s=``;e.installation===`missing`?s=v(`modelProviders.installedAgents.installHint`,{name:e.name}):e.installation===`unverified`?s=v(`modelProviders.installedAgents.unverifiedHint`):a?r?.catalogStatus===`auth-rejected`?(o={kind:`danger`,labelKey:`modelProviders.installedAgents.status.signIn`},s=v(`modelProviders.installedAgents.signInHint`,{name:e.name})):r?.catalogStatus===`unavailable`?(o={kind:`warn`,labelKey:`modelProviders.status.modelsUnavailable`},s=v(`modelProviders.installedAgents.discoveryHint`,{name:e.name})):r?.checkingModels?o={kind:`muted`,labelKey:`modelProviders.installedAgents.status.discovering`}:r&&r.availableModelCount>0?o={kind:`ok`,labelKey:`modelProviders.installedAgents.status.modelsAvailable`}:s=v(`modelProviders.installedAgents.signInHint`,{name:e.name}):s=v(`modelProviders.installedAgents.disabledHint`);let c=this.messages.get(e.id);return w`
      <div class="model-providers__installed-agent" data-installed-agent=${e.id}>
        ${We({icon:Qe(e.id)?qe(e.id,{className:`model-providers__icon`}):w`<span
                class="model-providers__icon model-providers__agent-icon"
                aria-hidden="true"
                >${S.terminal}</span
              >`,title:e.name,ariaLabel:v(`modelProviders.installedAgents.toggle`,{name:e.name}),description:i===void 0?w`${M({kind:o.kind,label:v(o.labelKey)})}${s?w`<br />${s}`:T}`:M({kind:`muted`,label:v(`modelProviders.saving`)}),checked:a,disabled:t||i!==void 0,onChange:t=>this.setEnabled(e,t)})}
        ${c?w`<div
                class="callout ${c.kind} model-providers__installed-agent-message"
                role=${c.kind===`error`?`alert`:`status`}
              >
                ${c.text}
              </div>`:T}
      </div>
    `}render(e,t){if(!this.available())return T;let n=this.blockedReason(),r=n!==null||z(this.options.getContext()),i=ae(this.options.getContext().runtimeConfig.state),o=a(a(i?.plugins)?.entries),s=a(a(o?.acpx)?.config),c=a(s?.nativeAgents),l=this.error?w`<div class="settings-row">
          <div class="settings-row__text">
            <span class="settings-row__desc provider-usage-error" role="alert">${this.error}</span>
          </div>
          <div class="settings-row__control">
            <button
              class="btn btn--sm"
              ?disabled=${this.loading}
              @click=${()=>void this.list.run()}
            >
              ${v(`common.retry`)}
            </button>
          </div>
        </div>`:T,u=this.agents===null?this.error?l:Xe({rows:4}):w`${l}${this.agents.length===0?I(v(`modelProviders.installedAgents.empty`)):this.agents.map(t=>this.renderAgent(t,r,c?.[t.id],e.find(e=>e.id===t.runtimeId)))}`,d=this.loading?v(`modelProviders.installedAgents.checking`):v(`modelProviders.installedAgents.check`);return w`
      <div class="model-providers__installed-agents">
        ${j({title:v(`modelProviders.installedAgents.title`),description:w`${v(`modelProviders.installedAgents.description`)}${n?w`<br />${n}`:T}`,actions:w`
              <openclaw-tooltip .content=${d}>
                <button
                  type="button"
                  class="btn btn--icon btn--ghost btn--xs model-providers__refresh-button"
                  aria-label=${d}
                  ?disabled=${this.loading||this.pending.size>0}
                  @click=${()=>{this.list.run(),t()}}
                >
                  ${S.refresh}
                </button>
              </openclaw-tooltip>
            `},u)}
      </div>
    `}}})))()}var en;function tn(){return(tn=e((()=>{x(),se(),V(),en=class{constructor(e){this.options=e,this.probeEpochs=new Map,this.probeUnsupported=!1,this.pendingOrders=new Map,this.activeOrderProviders=new Set}get probeAvailable(){return!this.probeUnsupported}resetProbes(){this.probeEpochs=new Map,this.probeUnsupported=!1}clearProbe(e){this.probeEpochs.set(e,(this.probeEpochs.get(e)??0)+1),this.options.setBusy(`probe:`+e,!1),this.options.setProbeResult(e,null)}async probe(e,t){let n=this.options.getClient(),r=`probe:${e}`;if(!n||!this.options.canMutate()||this.options.isBusy(r)||this.probeUnsupported)return;let i=this.options.getClientEpoch(),a=this.options.getAgentId(),o=this.options.getAgentEpoch(),s=(this.probeEpochs.get(e)??0)+1;this.probeEpochs.set(e,s);let c=()=>this.options.isCurrentClient(n,i)&&this.options.getAgentEpoch()===o&&this.options.getAgentId()===a&&this.probeEpochs.get(e)===s;this.options.setBusy(r,!0),this.options.clearMessage(e);try{let r=[];for(let e of t){if(!c())return;r.push(await n.request(`models.probe`,{provider:e,agentId:a}))}c()&&this.options.setProbeResult(e,ht(e,r))}catch(t){if(!c())return;gt(t)?(this.probeUnsupported=!0,this.options.setProbeError(e,v(`modelProviders.probe.unavailable`))):this.options.setProbeError(e,B(t))}finally{c()&&this.options.setBusy(r,!1)}}resetOrders(){this.pendingOrders.clear(),this.options.setOrders({})}setOrder(e,t,n){let r=this.options.getData()?.authStatus?.providers.find(e=>e.provider===t),i=n??r?.profiles.map(e=>e.profileId)??[];this.options.setOrders({...this.options.getOrders(),[t]:i}),this.pendingOrders.set(t,{cardId:e,profileIds:n,optimisticOrder:i}),this.options.clearMessage(e),this.flushOrder(t)}flushPendingOrders(){if(this.options.canMutate())for(let e of this.pendingOrders.keys())this.flushOrder(e)}async logout(e,t){let n=this.options.getClient(),r=`logout:${e}`;if(!n||!this.options.canMutate()||this.options.isBusy(r))return;let i=this.options.getClientEpoch(),a=this.options.getAgentId(),o=this.options.getAgentEpoch(),s=()=>this.isCurrentScope(n,i,o,a);this.clearProbe(e),this.options.setBusy(r,!0),this.options.clearMessage(e);try{let n=await this.options.getConfig().runExternalMutation(async e=>{let n=await e.request(`models.authLogout`,{...t,agentId:a});return y(e),n},{canDispatch:()=>s()&&this.options.canMutate()});if(!s())return;if(!n.ok){await this.options.refresh(),s()&&this.options.setError(e,n.error);return}let r=n.value.warning?[n.value.warning]:[];if(!n.refresh.ok)r.push(n.refresh.error);else try{await this.options.refresh();let e=this.options.getData()?.error;e&&r.push(e)}catch(e){r.push(B(e))}s()&&this.options.setLogoutSuccess(r.join(` `)||void 0)}catch(t){s()&&this.options.setError(e,t)}finally{s()&&this.options.setBusy(r,!1)}}async flushOrder(e){if(!this.activeOrderProviders.has(e)){this.activeOrderProviders.add(e);try{for(;;){let t=this.pendingOrders.get(e);if(!t)return;let n=this.options.getClient();if(!n||!this.options.canMutate())return;this.pendingOrders.delete(e);let r=this.options.getClientEpoch(),i=this.options.getAgentEpoch(),a=this.options.getAgentId();try{let o=await n.request(`models.authOrderSet`,{provider:e,...t.profileIds?{profileIds:t.profileIds}:{},agentId:a});if(y(n),!this.isCurrentScope(n,r,i,a))return;if(t.profileIds&&!o.warning)this.options.cancelRefresh(),this.applyOrder(e,t.profileIds),this.options.refresh();else if(await this.options.refresh(),!this.isCurrentScope(n,r,i,a))return;this.clearOptimisticOrder(e,t.optimisticOrder)&&o.warning&&this.options.setError(t.cardId,o.warning)}catch(o){if(!this.isCurrentScope(n,r,i,a))return;this.clearOptimisticOrder(e,t.optimisticOrder)&&this.options.setError(t.cardId,o)}}}finally{this.activeOrderProviders.delete(e),this.pendingOrders.has(e)&&this.options.canMutate()&&this.flushOrder(e)}}}isCurrentScope(e,t,n,r){return this.options.isCurrentClient(e,t)&&this.options.getAgentEpoch()===n&&this.options.getAgentId()===r}clearOptimisticOrder(e,t){let n=this.options.getOrders();if(n[e]!==t)return!1;let r={...n};return delete r[e],this.options.setOrders(r),!0}applyOrder(e,t){let n=this.options.getData(),r=n?.authStatus;if(!n||!r)return;let i=[...r.providers];for(let[n,r]of i.entries()){if((r.authProvider??r.provider)!==e)continue;let{profileOrder:a,profileOrderStored:o,...s}=r;i[n]={...s,profileOrder:[...t],profileOrderStored:!0}}this.options.setData({...n,authStatus:{...r,providers:i}})}}})))()}function K(e,t,n){let r={...e};return n===null?delete r[t]:r[t]=n,r}var nn;function rn(){return(rn=e((()=>{O(),R(),nn=class{constructor(e,t){this.options=t,this.pending=new Set,this.usageTask=this.createTask(e,`usage`,lt,e=>({providerUsage:e}),(e,t)=>this.options.refreshPolicy.markProviderUsage(e,Date.now(),t)),this.costTask=this.createTask(e,`cost`,ut,e=>({costByProvider:e}))}get loading(){return this.pending.size>0}get usageLoading(){return this.pending.has(`usage`)}adoptCoreData(e,t,n={}){let r=e===this.options.getDataClient()?this.options.getData():null;this.options.setData({...t,...n.preserveCatalogDiagnostics&&r?{providerOutcomes:r.providerOutcomes,catalogError:r.catalogError}:{},providerUsage:r?.providerUsage??t.providerUsage,costByProvider:r?.costByProvider??t.costByProvider}),this.options.setDataClient(e),t.providerUsage!==null&&this.options.refreshPolicy.markProviderUsage(t.providerUsage,t.updatedAt,this.options.getGateway().epoch),e&&!this.options.isCoreLoading()&&!this.loading&&t.providerUsage===null&&t.costByProvider===null&&this.load(e)}invalidate(){this.options.refreshPolicy.interrupt(),this.cancelGeneration()}beginCoreRefresh(e){this.cancelGeneration(),e&&this.options.refreshPolicy.resetPayload()}cancelGeneration(){this.pending.clear();let e=this.options.getGateway().epoch;this.usageTask.run([null,e]),this.costTask.run([null,e])}load(e){return this.loadRequests(e,!0)}loadUsage(){return this.loadRequests(void 0,!1)}async loadRequests(e,t){let n=this.options.getGateway(),r=e??n.client;if(!n.connected||!r){this.options.refreshPolicy.markLoadDeferred();return}this.options.refreshPolicy.beginLoad(),this.pending.add(`usage`);let i=this.usageTask.run([r,n.epoch]);if(!t){await i;return}this.pending.add(`cost`),await Promise.all([i,this.costTask.run([r,n.epoch])])}createTask(e,t,n,r,i){return new k(e,{autoRun:!1,task:([e,t],{signal:r})=>e?n(e,r).then(n=>({client:e,data:n,epoch:t})):A,onComplete:({client:e,data:n,epoch:a})=>{this.pending.delete(t);let o=this.options.getData();o&&e===this.options.getDataClient()&&this.options.getGateway().isCurrent({client:e,epoch:a})&&(this.options.setData({...o,...r(n)}),i?.(n,a)),this.options.refreshPolicy.flushPending()},onError:()=>{this.pending.delete(t),this.options.refreshPolicy.flushPending()}})}}})))()}function an(e,t){let n=new Set,r=[];for(let i of e){let e=U(i);n.has(e)||(n.add(e),r.push(on(i,t)))}return r}function on(e,t){let n=U(e),i=t.get(Ae(e.provider)),a=i?Fe(i,{authProfileId:r(n).profile,projection:`available-credentials`}):void 0;return{value:n,label:e.name||n,...a?{detail:[a.label,a.detail].filter(Boolean).join(` · `)}:{},...e.available===!1?{disabled:!0}:{},...e.provider?{provider:e.provider}:{}}}function q(e){return w`
    <span class="model-providers__label-with-help">
      <span>${e.title}</span>
      <span class="settings-section__docs">
        <openclaw-tooltip open-on-click>
          <button
            id=${e.triggerId}
            type="button"
            class="settings-section__help-button model-providers__help-button"
            aria-label=${e.label}
            @keydown=${e=>{e.key===`Escape`&&e.stopPropagation()}}
          >
            ${S.info}
          </button>
          <div slot="content" class="settings-section__help-panel">${e.body}</div>
        </openclaw-tooltip>
      </span>
    </span>
  `}function sn(e){return e===`auto`?`auto`:e===`on`}function cn(e){return w`
    ${e.catalogDiscovering?w`
            <div class="model-providers__catalog-progress" role="status" aria-live="polite">
              <span class="btn__spinner" aria-hidden="true"></span>
              <span>${v(`modelProviders.defaults.discoveringMore`)}</span>
            </div>
          `:T}
    ${e.catalogDiscoveryError?w`
            <div class="model-providers__catalog-progress" role="alert" aria-live="polite">
              <span>${v(`modelProviders.defaults.discoverFailed`)}</span>
              <button class="btn btn--sm" type="button" @click=${e.onCatalogRetry}>
                ${v(`modelProviders.defaults.retryDiscover`)}
              </button>
            </div>
          `:T}
  `}function ln(e){let t=!e.canMutate||e.models.length===0,n=!e.canMutate,i=!!e.busy.defaults,a=e.mutationBlockedReason??``,o=e.thinkingLevel&&!Z.has(e.thinkingLevel)?[...X,e.thinkingLevel]:X,s=e.fastMode===void 0?``:et(e.fastMode),c=e.selection.fallbacks[0]??``,l=new Map(ze(e.authStatus?.providers??[]).map(e=>[e.provider,e])),u=an(e.models,l),d=e.automaticUtilityModel,f=d?r(d).model:``,p=e.models.find(e=>U(e)===f),m=d?on({...p??{id:f,name:f,provider:f.split(`/`,1)[0]??``},selectionRef:d},l):void 0,h=w`
    <div class="model-providers__defaults">
      ${!e.loading&&e.models.length===0?w`<div class="callout warning">${v(`modelProviders.defaults.noModels`)}</div>`:T}
      ${N({title:v(`modelProviders.defaults.primary`),control:L({label:v(`modelProviders.defaults.primary`),value:e.selection.primary,options:[{value:``,label:v(`modelProviders.defaults.selectModel`),disabled:!e.canMutate||!!e.selection.primary},...e.canMutate?u:u.map(e=>({...e,disabled:!0}))],disabled:e.models.length===0||i,title:a,showSelectedDetail:!0,onChange:e.onPrimaryChange})})}
      ${N({title:q({title:v(`modelProviders.defaults.utility`),label:v(`modelProviders.defaults.utilityHelpLabel`),triggerId:dn,body:w`
            <p>${v(`modelProviders.defaults.utilityHelpPurpose`)}</p>
            <p>${v(`modelProviders.defaults.utilityHelpAutomatic`)}</p>
          `}),control:L({id:un,label:v(`modelProviders.defaults.utility`),value:e.selection.utilityModel??J,options:[{value:J,label:e.automaticUtilityModel?`${v(`quickSettings.model.fastModes.auto`)} · ${m?.label??e.automaticUtilityModel}`:v(`quickSettings.model.fastModes.auto`),provider:m?.provider,detail:d===null?v(`modelProviders.defaults.automaticUnavailable`):m?.detail},{value:``,label:v(`modelProviders.defaults.disabled`)},...u],disabled:t||i,title:a,showSelectedDetail:!0,onChange:t=>e.onUtilityChange(t===J?null:t)})})}
      ${N({title:v(`chat.modelControls.decisionLabel`),description:v(`chat.modelControls.decisionHelp`),control:ot({id:`model-providers-decision-model`,models:e.decisionModels,value:e.selection.decisionModel,disabled:!e.canMutate||i,title:a,onChange:e.onDecisionChange})})}
      ${N({title:v(`modelProviders.defaults.fallback`),control:L({label:v(`modelProviders.defaults.fallback`),value:c,options:[{value:``,label:v(`modelProviders.defaults.noFallback`)},...u.filter(t=>t.value!==e.selection.primary)],disabled:t||i||!e.selection.primary,title:a,showSelectedDetail:!0,onChange:t=>e.onFallbackChange(t||null)})})}
      ${N({title:q({title:v(`quickSettings.model.thinking`),label:v(`modelProviders.defaults.thinkingHelpLabel`),triggerId:fn,body:w`
            <p>${v(`modelProviders.defaults.thinkingHelp`)}</p>
            <p>${v(`modelProviders.defaults.thinkingDefaultHelp`)}</p>
          `}),control:w`
          ${Je({value:e.thinkingLevel??``,ariaLabel:v(`quickSettings.model.thinking`),options:[{value:``,label:v(`quickSettings.model.default`)},...o.map(e=>({value:e,label:Z.has(e)?v(`quickSettings.model.thinkingLevels.${e}`):Te(e)}))],disabled:i||n,onChange:(t,n)=>t===``?e.onThinkingReset():e.onThinkingChange(t,n),onReselect:t=>{t===``&&e.thinkingOverridden&&e.onThinkingReset()}})}
        `})}
      ${N({title:q({title:v(`quickSettings.model.fastMode`),label:v(`modelProviders.defaults.fastModeHelpLabel`),triggerId:Y,body:w`
            <p>${v(`modelProviders.defaults.fastModeHelp`)}</p>
            <p>${v(`modelProviders.defaults.fastModeDefaultHelp`)}</p>
          `}),control:w`
          ${Je({value:s,ariaLabel:v(`quickSettings.model.fastMode`),options:[{value:``,label:v(`quickSettings.model.default`)},{value:`auto`,label:v(`quickSettings.model.fastModes.auto`)},{value:`on`,label:v(`quickSettings.model.fastModes.on`)},{value:`off`,label:v(`quickSettings.model.fastModes.off`)}],disabled:i||n,onChange:t=>{t===``?e.onFastModeReset():t!==s&&e.onFastModeChange(sn(t))},onReselect:t=>{t===``&&e.fastModeOverridden&&e.onFastModeReset()}})}
        `})}
      ${cn(e)}
      ${e.canMutate?H(e.message):T}
    </div>
  `;return j({title:v(`modelProviders.defaults.title`),description:v(`modelProviders.defaults.subtitle`)},h)}var J,un,dn,fn,Y,X,Z;function pn(){return(pn=e((()=>{E(),be(),$e(),st(),C(),at(),F(),x(),Ee(),De(),Me(),Vt(),Pt(),J=`__openclaw_automatic_utility__`,un=`model-providers-utility-model`,dn=`model-providers-utility-help`,fn=`model-providers-thinking-help`,Y=`model-providers-fast-mode-help`,X=xe.filter(e=>e!==`minimal`),Z=new Set(X)})))()}function Q(e){return!e.canMutate||e.configBusy}function mn(e){return e.modelCount===0?null:e.availableModelCount<e.modelCount?v(`modelProviders.modelsAvailable`,{available:String(e.availableModelCount),count:String(e.modelCount)}):e.modelCount===1?v(`modelProviders.modelOne`):v(`modelProviders.models`,{count:String(e.modelCount)})}function hn(e,t){let n=e.localCost;return!n||n.totalTokens===0&&n.totalCost===0?T:w`
    <div class="model-providers__local-cost">
      <div class="provider-usage-billing-row">
        <span>${v(`modelProviders.localCost`,{days:String(t)})}</span>
        <strong>${l(n.totalCost)}</strong>
      </div>
      <div class="model-providers__local-cost-detail">
        ${v(`modelProviders.localCostDetail`,{tokens:_(n.totalTokens),messages:String(n.messageCount)})}
      </div>
    </div>
  `}function gn(e,t){let n=e.profiles.filter(e=>e.type===`oauth`).length,r=e.profiles.filter(e=>e.type===`token`).length,i=e.profiles.filter(e=>e.type===`api_key`).length,a=[];n>0&&a.push(v(`modelProviders.credentials.oauth`,{count:String(n)})),r>0&&a.push(v(`modelProviders.credentials.tokenProfiles`,{count:String(r)}));let o=Lt(e);return o===void 0?i>0&&a.push(v(`modelProviders.credentials.profileKey`,{count:String(i)})):a.push(o),w`
    <div class="model-providers__credentials">
      <span>${v(`modelProviders.credentials.label`,{agent:t})}</span>
      <strong
        >${a.length>0?a.join(` · `):v(`modelProviders.credentials.none`)}</strong
      >
    </div>
  `}function _n(e){if(!e)return T;let t=e.status===`ok`&&e.results.some(e=>e.status!==`ok`),n=t?`warning`:e.status===`ok`?`success`:`error`;return w`
    <div class="model-providers__probe model-providers__probe--${n}" role="status">
      <div class="model-providers__probe-summary">
        <strong
          >${v(t?`modelProviders.probe.status.partial`:`modelProviders.probe.status.${e.status}`)}</strong
        >
        ${e.latencyMs===void 0?T:w`<span
                >${v(`modelProviders.probe.latency`,{ms:String(e.latencyMs)})}</span
              >`}
      </div>
      ${e.error?w`<div>${h(e.error)}</div>`:T}
      ${e.results.map(e=>w`
          <div class="model-providers__probe-target">
            <span>${e.label}</span>
            <span>
              ${v(`modelProviders.probe.status.${e.status}`)}${e.latencyMs===void 0?``:` · ${v(`modelProviders.probe.latency`,{ms:String(e.latencyMs)})}`}
            </span>
            ${e.error?w`<small>${h(e.error)}</small>`:T}
          </div>
        `)}
    </div>
  `}function vn(e,t){if(t.keyEditorProvider!==e.id)return T;let n=!!t.busy[`key:${e.id}`],r=e.apiKeySupported===!1||!!(e.configAuthMode&&e.configAuthMode!==`api-key`),i=Q(t);return w`
    <div class="model-providers__inline-form">
      <label class="field">
        <span>${v(`modelProviders.apiKey.label`)}</span>
        <input
          type="password"
          autocomplete="off"
          placeholder=${e.apiKey?.source===`config`?v(`modelProviders.apiKey.replacePlaceholder`):v(`modelProviders.apiKey.placeholder`)}
          .value=${t.keyDraft}
          ?disabled=${n||i||r}
          @input=${e=>t.onKeyDraftChange(e.target.value)}
        />
      </label>
      <div class="model-providers__form-actions">
        <button
          class="btn primary btn--sm"
          ?disabled=${n||i||r||!t.keyDraft.trim()}
          @click=${()=>t.onSaveKey(e.id,e.configKey??e.id)}
        >
          ${v(n?`modelProviders.saving`:`common.save`)}
        </button>
        <button class="btn btn--sm" ?disabled=${n} @click=${()=>t.onCloseKeyEditor()}>
          ${v(`common.cancel`)}
        </button>
      </div>
    </div>
  `}function yn(e,t){let n=e.credentialProviderIds.length?e.credentialProviderIds:[e.id],r=!!t.busy[`probe:${e.id}`],i=!!t.busy[`key:${e.id}`],a=t.mutationBlockedReason??``,o=!!(e.configAuthMode&&e.configAuthMode!==`api-key`),s=e.apiKeySupported===!1,c=Q(t),l=o?v(`modelProviders.apiKey.authModeBlocked`,{mode:e.configAuthMode??``}):a;return w`
    <div class="model-providers__card-actions">
      ${t.canConnect(e)&&e.profiles.length===0?w`<button
              class="btn btn--sm"
              data-models-connect-provider=${e.id}
              ?disabled=${c||t.loginBusy}
              @click=${()=>t.onConnect(e)}
            >
              ${v(`modelProviders.login.action`)}
            </button>`:T}
      ${It(e)?w`
              <button
                class="btn btn--sm"
                ?disabled=${r||!t.canMutate||!t.probeAvailable}
                title=${t.probeAvailable?a:v(`modelProviders.probe.unavailable`)}
                @click=${()=>t.onProbe(e.id,n)}
              >
                ${v(r?`modelProviders.probe.testing`:`modelProviders.probe.test`)}
              </button>
            `:T}
      ${s?T:w`
              <button
                class="btn btn--sm"
                ?disabled=${i||c||o}
                title=${l}
                @click=${()=>t.onOpenKeyEditor(e.id)}
              >
                ${v(`modelProviders.apiKey.set`)}
              </button>
            `}
      ${e.hasConfigApiKey||e.profiles.some(e=>e.type===`api_key`&&e.logoutSupported)?w`
              <button
                class="btn btn--sm danger"
                ?disabled=${i||c||o}
                title=${l}
                @click=${()=>t.onRemoveKey(e.id,e.configKey??e.id)}
              >
                ${v(`modelProviders.apiKey.remove`)}
              </button>
            `:T}
    </div>
  `}function bn(e,t){let n=mn(e),r=t.messages[`key:${e.id}`]??t.messages[e.id];return w`
    <div
      class="settings-row settings-row--stacked model-providers__row"
      data-provider-id=${e.id}
    >
      <div class="model-providers__head">
        <div class="model-providers__identity">
          ${qe(e.id,{className:`model-providers__icon`})}
          <div class="settings-row__text">
            <span class="settings-row__title">${e.displayName}</span>
            <span class="settings-row__desc"
              >${e.id}${n?w` · ${n}`:T}</span
            >
          </div>
        </div>
        <div class="settings-row__control">
          ${e.usage?.plan?Ge(e.usage.plan):T}
          ${Mt(e)}
        </div>
      </div>
      ${e.profiles.length>0&&t.canViewProfiles?Tt(e,{...t,canMutate:t.canMutate&&!t.configBusy,onAddAccount:t.canConnect(e)?()=>t.onConnect(e):void 0,addAccountDisabled:t.loginBusy||Q(t)}):gn(e,t.credentialAgentLabel)}
      <div
        class="model-providers__global-metrics"
        aria-busy=${t.supplementalLoading?`true`:`false`}
      >
        <div class="model-providers__global-metrics-title">${v(`modelProviders.globalUsage`)}</div>
        ${e.usage?Ht(e.usage):w`<div class="model-providers__no-stats">
                ${v(t.supplementalLoading?`common.loading`:`modelProviders.noStats`)}
              </div>`}
        ${hn(e,t.costDays)}
      </div>
      ${yn(e,t)} ${vn(e,t)}
      ${_n(t.probeResults[e.id])} ${H(r)}
    </div>
  `}function xn(e){if(!e.addProviderOpen)return T;let t=!!e.busy.add,n=Q(e)||t,r=e.unconfiguredProviders.find(t=>t.id===e.addProviderId);return w`
    <openclaw-modal-dialog
      label=${v(`modelProviders.add.title`)}
      @modal-cancel=${n=>{n.preventDefault(),t||e.onAddProviderToggle()}}
    >
      <div class="model-setup-wizard" data-models-key-dialog>
        <div class="model-setup-wizard__header">
          <h2>${r?.displayName??e.addProviderId}</h2>
        </div>
        <div class="model-setup-wizard__body">
          <p>${v(`modelProviders.credentials.label`,{agent:e.credentialAgentLabel})}</p>
          <label class="field">
            <span>${v(`modelProviders.apiKey.label`)}</span>
            <input
              type="password"
              autocomplete="off"
              placeholder=${v(`modelProviders.apiKey.placeholder`)}
              .value=${e.addProviderKey}
              ?disabled=${n}
              @input=${t=>e.onAddProviderKeyChange(t.target.value)}
            />
          </label>
          ${H(e.messages.add)}
        </div>
        <div class="model-setup-wizard__footer">
          <button class="btn" ?disabled=${t} @click=${e.onAddProviderToggle}>
            ${v(`common.cancel`)}
          </button>
          <button
            class="btn primary"
            ?disabled=${n||!e.addProviderId||!e.addProviderKey.trim()}
            @click=${e.onAddProvider}
          >
            ${v(t?`modelProviders.saving`:`modelProviders.add.save`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function Sn(e){let t=e.cards.some(jt);return w`
    <div class="model-providers__setup" data-model-readiness="model-required">
      ${j({title:v(`modelProviders.readiness.title`)},N({title:v(`modelProviders.readiness.heading`),description:v(t?`modelProviders.readiness.signedInNoModels`:`modelProviders.readiness.notConfigured`),control:w`
            ${M({kind:`warn`,label:v(t?`modelProviders.readiness.noModels`:`modelProviders.readiness.modelRequired`)})}
            <button
              class="btn primary"
              ?disabled=${Q(e)||e.loginBusy}
              title=${e.mutationBlockedReason??``}
              @click=${e.onConnectProvider}
            >
              ${v(`modelProviders.login.action`)}
            </button>
          `}))}
    </div>
  `}function Cn(e){return w`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__desc provider-usage-error">${e}</span>
      </div>
    </div>
  `}function wn(e){if(!e.connected)return Ue(P(I(v(`modelProviders.disconnected`))));let t=(e.providerQuery??``).trim().toLocaleLowerCase(),n=e.cards.filter(e=>[e.id,e.displayName,...e.credentialProviderIds].some(e=>e.toLocaleLowerCase().includes(t))),r=w`
    <label class="field model-providers__search">
      <input
        type="search"
        aria-label=${v(`modelProviders.search`)}
        placeholder=${v(`modelProviders.search`)}
        .value=${e.providerQuery??``}
        @input=${t=>e.onProviderQueryChange?.(t.currentTarget.value)}
      />
    </label>
    <div class="model-providers__provider-list">
      ${e.error?P(Cn(e.error)):T}
      ${e.providerUsageFailed?P(Cn(v(`usage.providerUsage.unavailable`))):T}
      ${e.cards.length===0?P(I(w`<strong>${v(`modelProviders.emptyTitle`)}</strong><br />${v(`modelProviders.emptySubtitle`)}`)):n.map(t=>P(bn(t,e)))}
      ${e.cards.length>0&&n.length===0?I(v(`modelProviders.noMatches`)):T}
    </div>
  `,i=!e.loading&&!e.configuredModels.some(e=>e.available!==!1);return w`${Ue(w`
    ${i?Sn(e):T}
    <div id=${g.behavior}>
      ${ln({...e,models:e.configuredModels,selection:e.defaultModels,canMutate:e.defaultsMutationBlockedReason===null&&!e.configBusy,mutationBlockedReason:e.defaultsMutationBlockedReason,message:e.messages.defaults})}
    </div>
    ${e.installedAgents}
    ${j({title:v(`modelProviders.accessTitle`),description:v(`modelProviders.accessDescription`),count:e.cards.length,actions:w`
          ${e.providerScope}
          ${e.updatedAt?w`<span class="model-providers__updated"
                  >${v(`modelProviders.updated`,{time:u(e.updatedAt,{hour:`numeric`,minute:`2-digit`})})}</span
                >`:T}
          <openclaw-tooltip
            .content=${e.refreshing?v(`modelProviders.refreshing`):v(`common.refresh`)}
          >
            <button
              type="button"
              class="btn btn--icon btn--ghost btn--xs model-providers__refresh-button"
              aria-label=${e.refreshing?v(`modelProviders.refreshing`):v(`common.refresh`)}
              ?disabled=${e.refreshing}
              @click=${()=>e.onRefresh()}
            >
              ${S.refresh}
            </button>
          </openclaw-tooltip>
        `},w`${e.accountRecovery}${e.loading?P(Xe()):e.cards.length===0&&e.installedAgents!==T&&!e.error&&!e.providerUsageFailed?T:r}`)}
    ${e.providerUsageStalled?w`<div class="callout warning" role="status">${v(`usage.providerUsage.stalled`)}</div>`:T}
  `)}${xn(e)}`}function Tn(e){return w`
    <span class="muted" data-models-provider-agent
      >${v(`agentScope.label`)}: ${e.agentLabel}</span
    >
    ${Ot(e)}
  `}function En(e){return w`
    ${He({title:fe(`model-providers`),subtitle:w`${v(`modelProviders.subtitle`)}
      ${Ze(`https://docs.openclaw.ai/concepts/model-providers`)}`})}
    ${rt(w`${H(e.loginMessage)}${e.body}`)}
    ${e.login}
  `}function Dn(){return(Dn=e((()=>{E(),he(),C(),Ve(),Ut(),F(),it(),x(),nt(),oe(),te(),ne(),pn(),wt(),Pt(),tt()})))()}var $;function On(){return(On=e((()=>{n(),E(),ve(),_e(),pe(),Ye(),x(),ee(),m(),we(),De(),Re(),ie(),Le(),b(),re(),pt(),Gt(),V(),qt(),Vt(),Xt(),$t(),R(),Ct(),tn(),wt(),rn(),Dn(),$=class extends le{constructor(...e){super(...e),this.mutationBlockedReason=()=>W(this.context)??(this.selectedAgentId?null:v(`agents.noAgents`)),this.canMutate=()=>this.mutationBlockedReason()===null&&!z(this.context),this.loaderPending=!1,this.data=null,this.busy={},this.messages={},this.probeResults={},this.keyEditorProvider=null,this.keyDraft=``,this.logoutConfirmation=null,this.profileOrders={},this.providerQuery=``,this.pendingConnection=!1,this.addProviderOpen=!1,this.addProviderId=``,this.addProviderKey=``,this.defaultsDraft=null,this.selectedAgentId=``,this.dataClient=null,this.routeDataObserved=!1,this.agentEpoch=0,this.coreCatalogGeneration=0,this.core=new Kt(this,{onStart:e=>{e!==`publication`&&this.catalogDiscovery.reset(),this.coreCatalogGeneration=this.catalogDiscovery.generation,this.supplemental.beginCoreRefresh(e===`forced`),e===`forced`&&this.querySelectorAll(`openclaw-model-account-usage`).forEach(e=>e.refreshUsage())},onComplete:({client:e,data:t})=>{let n=this.data!==null&&this.catalogDiscovery.generation!==this.coreCatalogGeneration;n||this.catalogDiscovery.reset(),this.supplemental.adoptCoreData(e,t,{preserveCatalogDiagnostics:n})},isCatalogLoading:()=>this.catalogDiscovery.discovering,refreshPublication:()=>void this.refresh(`publication`)}),this.refreshPolicy=new ft({isLoading:()=>this.loaderPending||!this.routeDataObserved||this.core.loading||this.supplemental.usageLoading,reload:()=>this.supplemental.loadUsage(),onIncompleteUsageExhausted:()=>this.requestUpdate()}),this.supplemental=new nn(this,{isCoreLoading:()=>this.loaderPending,getGateway:()=>this.gateway,getData:()=>this.data,getDataClient:()=>this.dataClient,setData:e=>this.data=e,setDataClient:e=>this.dataClient=e,refreshPolicy:this.refreshPolicy}),this.catalogDiscovery=Wt({getGateway:()=>this.gateway,getAgentId:()=>this.selectedAgentId,getAgentEpoch:()=>this.agentEpoch,getData:()=>this.data,setData:e=>this.data=e,requestUpdate:()=>this.requestUpdate(),onSettled:()=>this.core.flushPublication()}),this.gateway=new Pe(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetConnectionState(),invalidateRequests:()=>this.invalidateRequests(),ensureInitialData:()=>this.ensureInitialData(),onSnapshot:e=>{e.initial?this.resetConnectionState():e.connectionChanged&&!e.identityChanged&&this.resetConnectionState({preserveVisibleData:!0}),e.becameConnected&&!e.initial&&this.routeDataObserved&&!this.loaderPending&&this.refresh(`replacement`)},onPageActivation:()=>this.refreshPolicy.request(`focus`)}),this.installedAgents=new Qt(this,{gateway:this.gateway,getContext:()=>this.context}),this.profileActions=new en({getAgentEpoch:()=>this.agentEpoch,getAgentId:()=>this.selectedAgentId,getClient:()=>this.context.gateway.snapshot.client,getClientEpoch:()=>this.gateway.epoch,getData:()=>this.data,getOrders:()=>this.profileOrders,setData:e=>this.data=e,setError:(e,t)=>Nt(t),setOrders:e=>this.profileOrders=e,clearMessage:e=>this.setMessage(e,null),canMutate:()=>this.canMutate(),cancelRefresh:()=>this.cancelCoreRefresh(),refresh:()=>this.refresh(`forced`),isCurrentClient:(e,t)=>this.gateway.isCurrent({client:e,epoch:t}),isBusy:e=>!!this.busy[e],setBusy:(e,t)=>this.setBusy(e,t),setProbeResult:(e,t)=>this.probeResults=K(this.probeResults,e,t),setProbeError:(e,t)=>this.setMessage(e,{kind:`error`,text:t}),setLogoutSuccess:At,getConfig:()=>this.context.runtimeConfig}),this.discovery=new Yt(this,{canOpen:()=>this.canMutate(),getOwner:()=>({client:this.gateway.client,epoch:this.gateway.epoch,agentEpoch:this.agentEpoch,agentId:this.context.settingsAgentSelection.state.selectedId,selectionIntentRevision:this.context.settingsAgentSelection.intentRevision,selectionPending:this.context.settingsAgentSelection.state.selectedId===null&&this.context.agents.state.agentsList===null}),isCurrent:e=>!!(this.isConnected&&e.client&&this.gateway.isCurrent({client:e.client,epoch:e.epoch})&&this.agentEpoch===e.agentEpoch),onClose:()=>void this.refresh(`replacement`),onError:e=>this.setMessage(`connection`,{kind:`error`,text:B(e)})}),this.login=new Ft(this,{getScope:()=>({context:this.context,agentId:this.selectedAgentId,authStatus:this.data?.authStatus??null}),canStart:()=>this.canMutate(),onDiscover:()=>{this.setMessage(`connection`,null),this.discovery.open()},onApiKey:e=>{this.addProviderId=e,this.addProviderKey=``,this.addProviderOpen=!0,this.setMessage(`add`,null)},canContinue:()=>this.mutationBlockedReason()===null,refresh:()=>this.refresh(`replacement`)}),this.subscriptions=new ce(this).effect(()=>this.context?.gateway,e=>Ne(e,()=>void this.refresh(`publication`))).effect(()=>this.context?.gateway,e=>this.installedAgents.subscribe(e)).watch(()=>this.context?.gateway.snapshot.client,Ie).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t),e=>{!e.state.configSnapshot&&!e.state.configLoading&&e.ensureLoaded().catch(()=>void 0),this.profileActions.flushPendingOrders()}).watch(()=>this.context?.overlays,(e,t)=>e.subscribe(t),()=>this.profileActions.flushPendingOrders()).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),()=>this.syncSelectedAgent()).effect(()=>this.context?.settingsAgentSelection,e=>e.subscribe(()=>this.syncSelectedAgent())),this.setBusy=(e,t)=>this.busy=K(this.busy,e,t?!0:null),this.setMessage=(e,t)=>this.messages=K(this.messages,e,t)}disconnectedCallback(){this.profileActions.resetOrders(),this.subscriptions.clear(),this.refreshPolicy.dispose(),super.disconnectedCallback()}willUpdate(e){let t=this.routeData,n=e.get(`routeData`);(e.has(`routeData`)||e.has(`loaderPending`))&&t&&(t.connect&&!n?.connect&&(this.pendingConnection=!0),e.has(`routeData`)&&t.provider!==n?.provider&&(this.providerQuery=Ae(t.provider??``)),this.cancelCoreRefresh(),this.routeDataObserved=!0,this.setSelectedAgent(this.resolveSelectedAgentId()),(t.agentId??``)===this.selectedAgentId&&t.selectionIntentRevision===this.context.settingsAgentSelection.intentRevision&&this.gateway.isRouteDataCurrent(t)?this.supplemental.adoptCoreData(t.client,t.data):(this.data=null,this.dataClient=null,this.refreshPolicy.resetPayload()),this.ensureInitialData())}updated(){this.isConnected&&this.pendingConnection&&this.data&&this.canMutate()&&!this.core.loading&&(this.pendingConnection=!1,this.login.open())}ensureInitialData(){!this.context.agents.state.agentsList&&!this.context.agents.state.agentsLoading&&!this.context.agents.state.agentsError&&this.context.agents.ensureList();let e=this.gateway.client;this.routeDataObserved&&!this.loaderPending&&this.gateway.connected&&e&&this.selectedAgentId&&!this.core.loading&&(this.data===null||this.data.updatedAt===null||e!==this.dataClient)&&this.refresh(`replacement`)}cancelCoreRefresh(){this.catalogDiscovery.reset(),this.core.invalidate()}invalidateRequests(){this.logoutConfirmation?.abort(),this.cancelCoreRefresh(),this.supplemental.invalidate()}resetConnectionState(e={}){e.preserveVisibleData||(this.data=null,this.dataClient=null),this.refreshPolicy.resetPayload(),this.discovery.cancelLoading(),this.installedAgents.reset(e),this.resetAgentScopeState(),this.profileActions.resetProbes(),this.defaultsDraft=null}resetAgentScopeState(){this.login.reset(),this.busy={},this.messages={},this.probeResults={},this.closeKeyEditor(),this.logoutConfirmation?.abort(),this.profileActions.resetOrders(),this.addProviderOpen=!1,this.addProviderId=``,this.addProviderKey=``}resolveSelectedAgentId(){let e=this.context.settingsAgentSelection.state.selectedId;return e?i(e):``}setSelectedAgent(e){return e!==this.selectedAgentId&&(this.selectedAgentId=e,this.agentEpoch+=1,this.resetAgentScopeState(),!0)}syncSelectedAgent(){this.setSelectedAgent(this.resolveSelectedAgentId())&&(this.invalidateRequests(),this.data=null,this.dataClient=null,this.refreshPolicy.resetPayload(),this.requestUpdate(),this.ensureInitialData())}refresh(e){if(!this.selectedAgentId)return Promise.resolve();let t=this.gateway.client;return!this.gateway.connected||!t?(this.refreshPolicy.markLoadDeferred(),Promise.resolve()):this.core.refresh(t,this.selectedAgentId,e)}async patchConfig(e){let t=this.context.gateway.snapshot.client;if(!t||W(this.context)||z(this.context)||this.busy[e.key])return;let n=this.gateway.epoch,r=this.agentEpoch;return _t({runtimeConfig:this.context.runtimeConfig,isCurrentClient:()=>this.gateway.isCurrent({client:t,epoch:n}),isCurrentAgent:()=>this.agentEpoch===r,setBusy:t=>this.setBusy(e.key,t),setMessage:t=>this.setMessage(e.key,t)},e)}openKeyEditor(e){this.keyEditorProvider=e,this.keyDraft=``,this.setMessage(e,null)}closeKeyEditor(){this.keyEditorProvider=null,this.keyDraft=``}async mutateApiKey(e,t,n,r=`edit`){let i=this.gateway.client,a=r===`add`?`add`:`key:${e}`;if(!i||!this.canMutate()||this.busy[a]||n===``)return;let o=this.gateway.epoch,s=this.agentEpoch,c=()=>this.gateway.isCurrent({client:i,epoch:o})&&this.agentEpoch===s;this.profileActions.clearProbe(e);let l=await bt({runtimeConfig:this.context.runtimeConfig,isCurrentClient:c,isCurrentAgent:c,canMutate:()=>this.canMutate(),refreshProviders:async()=>{let e=this.data;if(await this.refresh(`replacement`),c()&&this.data?.error){let t=this.data.error;return this.data=e,t}return this.data?.error??this.data?.catalogError??null},setBusy:e=>this.setBusy(a,e),setMessage:t=>{this.setMessage(e,t),r===`add`&&this.setMessage(`add`,t)}},{client:i,agentId:this.selectedAgentId,provider:t,apiKey:n,success:kt(r,n,e)});l.ok&&c()&&(r===`add`?this.addProviderId===e&&this.addProviderKey.trim()===n&&(this.addProviderOpen=!!l.warning,l.warning||(this.addProviderId=``),this.addProviderKey=``):this.keyEditorProvider===e&&this.keyDraft.trim()===n&&this.closeKeyEditor())}async requestLogout(e){if(this.logoutConfirmation||!this.canMutate()||this.busy[`logout:${e.cardId}`])return;let t=new AbortController;this.logoutConfirmation=t,await Ke({title:v(`modelProviders.logout.actionFor`,{account:e.label}),message:v(`modelProviders.logout.confirm`,{provider:e.label}),confirmLabel:v(`modelProviders.logout.action`),danger:!0,signal:t.signal}).finally(()=>{this.logoutConfirmation=null})&&!t.signal.aborted&&this.canMutate()&&await this.profileActions.logout(e.cardId,e.target)}async addProvider(){let e=this.addProviderId;e&&await this.mutateApiKey(e,e,this.addProviderKey.trim(),`add`)}async saveDefaults(e=this.defaultsDraft){e&&(await this.patchConfig({key:`defaults`,raw:zt(e),note:v(`modelProviders.notes.defaultModel`),replacePaths:mt}),this.defaultsDraft===e&&(this.defaultsDraft=null))}render(){let e=this.context.gateway.snapshot,t=e.hello?.auth,n=this.context.agents.state,r=n.agentsList?.agents??[],o=n.agentsList!==null&&d(r).length===0,s=n.agentsList?null:n.agentsError,c=r.find(e=>i(e.id)===this.selectedAgentId),l=this.data??dt,u=ae(this.context.runtimeConfig.state),f=Bt(u),m=ke(e.client,this.selectedAgentId),h={...f.defaults,...vt(a(a(u?.agents)?.defaults))},{defaults:g,configuredModels:ee}=xt(m,h,this.defaultsDraft),te=e=>{this.defaultsDraft={...this.defaultsDraft??h,...e},this.setMessage(`defaults`,null),this.saveDefaults(this.defaultsDraft)},_=St({...l,models:m?.models??null,providerOutcomes:m.hasSnapshot?m.providerOutcomes??[]:l.providerOutcomes,pendingProviders:m?.pendingProviders,providerUsage:l.providerUsage?.ok?l.providerUsage.value:null,configProviderIds:f.providerIds,configApiKeyProviderIds:f.apiKeyProviderIds,configProviderAuthModes:f.providerAuthModes}),ne=new Set([...f.providerIds,...l.authStatus?.providers.filter(e=>!!e.apiKey||e.profiles.length>0).map(e=>e.provider)??[]]),re=Ce(e,`models.probe`),y=Ce(e,`codex.accountUsage`),b=this.login.pageActions;return En({body:wn({accountRecovery:this.login.renderRecovery(),providerScope:Tn({agentLabel:c?p(c):this.selectedAgentId,...b,connectDisabled:b.connectDisabled||this.discovery.busy||this.addProviderOpen}),providerQuery:this.providerQuery,onProviderQueryChange:e=>this.providerQuery=e,onConnectProvider:()=>void this.login.open(),usageClient:!this.mutationBlockedReason()&&y?e.client:null,usageAgentId:this.selectedAgentId,connected:e.phase===`connected`,loading:e.phase===`connected`&&this.data===null&&!s&&!o,refreshing:this.core.loading,error:s??(o?v(`agents.noAgents`):l.error),providerUsageFailed:l.providerUsage?.ok===!1,supplementalLoading:this.loaderPending||this.supplemental.loading,updatedAt:l.updatedAt,costDays:30,credentialAgentLabel:c?p(c):this.selectedAgentId,cards:o?[]:this.installedAgents.filterProviders(_),configuredModels:ee,decisionModels:m?.decisionModels??[],defaultModels:g,authStatus:l.authStatus,automaticUtilityModel:m?.defaultModels?.automaticUtilityModel,thinkingLevel:g.thinkingLevel,thinkingOverridden:g.thinkingOverridden,fastMode:g.fastMode,fastModeOverridden:g.fastModeOverridden,catalogDiscovering:this.catalogDiscovery.discovering||!!m?.pendingProviders?.length,catalogDiscoveryError:this.catalogDiscovery.discovering?null:this.catalogDiscovery.error??l.catalogError,configBusy:z(this.context),unconfiguredProviders:Rt(l.authStatus?.providerCapabilities,ne),canViewProfiles:e.phase===`connected`&&t?.scopes!==void 0&&me(t),mutationBlockedReason:this.mutationBlockedReason(),defaultsMutationBlockedReason:W(this.context),providerUsageStalled:this.refreshPolicy.incompleteUsageExhausted,probeAvailable:this.profileActions.probeAvailable&&re!==!1,busy:this.busy,messages:this.messages,probeResults:this.probeResults,keyEditorProvider:this.keyEditorProvider,keyDraft:this.keyDraft,profileOrders:this.profileOrders,addProviderOpen:this.addProviderOpen,addProviderId:this.addProviderId,addProviderKey:this.addProviderKey,installedAgents:this.installedAgents.render(_,()=>this.catalogDiscovery.retry()),onRefresh:()=>void(s?this.context.agents.refreshList():Promise.all([this.context.runtimeConfig.refresh({background:!0}),this.refresh(`forced`)])),onOpenKeyEditor:e=>this.openKeyEditor(e),onCloseKeyEditor:()=>this.closeKeyEditor(),onKeyDraftChange:e=>this.keyDraft=e,onSaveKey:(e,t)=>void this.mutateApiKey(e,t,this.keyDraft.trim()),onRemoveKey:(e,t)=>void this.mutateApiKey(e,t,null),onProbe:(e,t)=>void this.profileActions.probe(e,t),onRequestLogout:e=>void this.requestLogout(e),onProfileOrderChange:(e,t,n)=>this.profileActions.setOrder(e,t,n),onAddProviderToggle:()=>{this.addProviderOpen=!this.addProviderOpen,this.addProviderKey=``,this.setMessage(`add`,null)},onAddProviderKeyChange:e=>this.addProviderKey=e,onAddProvider:()=>void this.addProvider(),...yt(()=>this.defaultsDraft??h,te),onCatalogRetry:()=>this.catalogDiscovery.retry(),...this.login.providerActions}),loginMessage:this.messages.connection??b.loginMessage,login:w`${b.login}${this.discovery.render({agentLabel:c?p(c):this.selectedAgentId,credentialChoices:l.authStatus?.providerCapabilities?.flatMap(e=>e.loginOptions?.map(e=>e.id)??[])??[]})}`})}},o([c({context:ge,subscribe:!0})],$.prototype,`context`,void 0),o([ye({attribute:!1})],$.prototype,`routeData`,void 0),o([ye({attribute:!1})],$.prototype,`loaderPending`,void 0),o([D()],$.prototype,`data`,void 0),o([D()],$.prototype,`busy`,void 0),o([D()],$.prototype,`messages`,void 0),o([D()],$.prototype,`probeResults`,void 0),o([D()],$.prototype,`keyEditorProvider`,void 0),o([D()],$.prototype,`keyDraft`,void 0),o([D()],$.prototype,`profileOrders`,void 0),o([D()],$.prototype,`providerQuery`,void 0),o([D()],$.prototype,`addProviderOpen`,void 0),o([D()],$.prototype,`addProviderId`,void 0),o([D()],$.prototype,`addProviderKey`,void 0),o([D()],$.prototype,`defaultsDraft`,void 0),o([D()],$.prototype,`selectedAgentId`,void 0),customElements.get(`openclaw-model-providers-page`)||customElements.define(`openclaw-model-providers-page`,$)})))()}On();