import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{A as i,Gl as a,Kl as o,R as s,cc as c,hu as l,lu as u,nl as d,pl as ee,ql as te,sc as ne,su as re,uu as f}from"./control-ui-core-pYNj5S1a.js";import{Br as ie,Ma as ae,Xi as p,Zi as m,_r as h,fr as g,ja as oe,or as se,sr as ce,va as le,vi as ue,yi as de}from"./control-ui-core-D6clmJs8.js";import{$ as _,B as fe,F as pe,G as me,H as he,J as ge,M as _e,R as ve,U as ye,V as v,W as be,X as y,Y as b,Z as xe,ct as x,et as Se,nt as Ce,q as we,ut as S,z as Te}from"./lit-runtime-DZL1fcCI.js";import{d as C,l as Ee}from"./gateway-runtime-iOL78mIi.js";import{Cn as De,ct as Oe,lt as ke,mt as Ae,st as je,ut as Me,xn as Ne}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as Pe,R as Fe,z as w}from"./control-ui-boot-shared-D-LYw3KU.js";import{Ba as T,Ha as E,Ua as D,Va as Ie,Wa as Le,Xa as Re,Ya as ze,_t as Be,yt as Ve,za as He}from"./control-ui-boot-shared-DJ4XCcp6.js";import{cr as Ue,hr as We,lr as Ge,or as Ke,sr as qe}from"./control-ui-boot-shared-DCY2wZcy.js";import{n as Je,t as Ye}from"./settings-workspace-DKW0BVnu.js";import{n as Xe,t as Ze}from"./model-picker-Cr4HKWDk.js";import{c as Qe,d as $e,i as O,l as et,n as tt,o as k,r as nt,u as rt}from"./state-BcCfjWLC.js";import{a as it,i as at,o as ot,s as st}from"./wizard-login-controller-CVVvSr5l.js";import{a as ct,c as lt,g as A,h as j,i as ut,r as dt,s as ft}from"./view-status-KxPBw5LM.js";import{a as pt,i as mt,n as ht,r as gt,s as _t,t as M}from"./first-run-activation-receipt-CZRNSRC0.js";function N(e){return a(e,l(`modelSetup.errors.requestFailed`))}async function P(e,t){try{return{client:e,value:await t()}}catch(t){return{client:e,error:t}}}function F(){return(F=e((()=>{f(),te()})))()}function I(e,t){return t?e.agentSelection:e.settingsAgentSelection}function L(e,t,n=null){let r=e.gateway.snapshot,i=I(e,t);return{client:r.client,hello:r.hello,agentId:i.state.selectedId,selectionIntentRevision:t?0:i.intentRevision,selectionPending:!t&&i.state.selectedId===null&&e.agents.state.agentsList===null,connected:r.phase===`connected`,firstRun:t,connectionRevision:e.gateway.connectionRevision,recoveryScope:r.phase===`connected`?r.hello?.auth?.recoveryScope??null:n}}function vt(e,t){return e&&t.selectionPending&&t.selectionIntentRevision===e.selectionIntentRevision&&t.firstRun===e.firstRun&&t.connectionRevision===e.connectionRevision&&(!t.connected||t.recoveryScope&&t.recoveryScope===e.recoveryScope&&g(t.hello?.auth??null))?{kind:e.selectionPending?`unchanged`:`pending`,connection:{...e,selectionPending:!0}}:{kind:e&&t.client===e.client&&t.hello===e.hello&&t.agentId===e.agentId&&t.connected===e.connected&&t.firstRun===e.firstRun&&t.connectionRevision===e.connectionRevision&&t.recoveryScope===e.recoveryScope&&t.selectionIntentRevision===e.selectionIntentRevision&&t.selectionPending===e.selectionPending?`unchanged`:`changed`,connection:t}}var R;function z(){return(z=e((()=>{h(),f(),s(),gt(),F(),k(),R=class{constructor(e){this.host=e,this.generation=0,this.started=!1,this.readyConnection=null,this.pending=null}subscribe(e){return _t(t=>{let n=this.pending;n?.receipt&&JSON.stringify(n.receipt)===t&&(this.pending=null,n.outcome===`pending`&&this.host.closeWizard(),n.outcome===`verified`&&this.host.setActivationState({phase:`idle`}),this.host.setVerifyState({phase:`idle`}),e())})}setReadyConnection(e){this.readyConnection=e}routeChanged(){let e=this.pending?.receipt??null;this.reset(),this.readyConnection=null,this.pending=null,this.host.routeData()?.firstRun===!1&&M(e)}connectionChanged(e){if(this.reset(),this.readyConnection=null,this.pending&&(!this.pending.owner.recoveryScope||e.agentId!==this.pending.owner.connection.agentId||this.host.context().gateway.connectionRevision!==this.pending.owner.connectionRevision||this.host.context().gateway.snapshot.phase===`connected`&&(e.hello?.auth?.recoveryScope??null)!==this.pending.owner.recoveryScope)){let e=this.pending.receipt;this.pending=null,M(e)}}reconnectActivation(e){let t=this.pending;if(!t)return;let n=this.host.context();t.owner.recoveryScope&&t.owner.connectionRevision===n.gateway.connectionRevision&&t.owner.recoveryScope===(e.hello?.auth?.recoveryScope??null)&&t.owner.connection.agentId===e.agentId&&t.owner.firstRun===this.host.routeData()?.firstRun&&(t.owner=this.owner(t.owner.firstRun))}retryDetection(){if(this.host.actionsDisabled())return!1;if(this.pending&&Date.now()<this.pending.deadlineMs)return this.host.setRefreshWarning(l(`modelSetup.recovery.wait`,{time:i(this.pending.deadlineMs)})),!0;if(this.host.routeData()?.firstRun){let e=this.host.pageState(),t=this.pending&&e.phase===`ready`&&this.configuredActivationModel(e.result);this.pending=null,M(),this.host.setRefreshWarning(null),this.reset(),this.started=!!t}return!0}dispose(){this.reset(),this.readyConnection=null,this.pending=null}visiblePageState(e){let t=this.host.pageState();return this.host.routeData()?.firstRun&&t.phase===`ready`&&t.result.setupComplete&&t.result.configuredModel&&!e?{...t,result:{...t.result,setupComplete:!1}}:t}start(){let e=this.host.routeData(),t=this.host.context(),n=t.gateway.snapshot,r=this.host.pageState(),i=this.readyConnection;if(!e?.firstRun||this.started||r.phase!==`ready`||!i||i.client!==n.client||i.hello!==n.hello||i.agentId!==t.agentSelection.state.selectedId||this.host.actionsDisabled()||!this.host.canUseSetup(n.client))return;let a=pt(t);this.pending?.receipt&&a?.owner!==this.pending.receipt.owner&&(this.pending=null);let o=a??this.pending;if(o&&(this.pending={owner:this.owner(e.firstRun),modelRef:o.modelRef,...o.modelTarget?{modelTarget:o.modelTarget}:{},kind:o.kind,deadlineMs:o.deadlineMs,receipt:a,outcome:`pending`}),!this.pending){this.started=!0;return}let s=this.configuredActivationModel(r.result);if(!this.pending.modelRef&&a?.wizard){this.started=!0,this.host.resumeWizard(a.wizard,this.observeActivation(this.pending));return}if(this.pending&&(!s||!this.pending.modelRef)){this.started=!0,this.showUnresolved();return}if(s&&!this.host.canVerify(n.client)){this.started=!0,this.host.setVerifyState({phase:`failed`,status:`unknown`,error:`${l(`modelSetup.access.gatewayTooOld`)}. ${l(`updates.confirm.action`)}. ${l(`desktop.reconnect`)}.`});return}this.started=!0,this.run(this.owner(e.firstRun),r.result)}beginActivation(e){let t=this.host.routeData();if(!t?.firstRun)return null;let n=this.owner(t.firstRun),r=mt(this.host.context(),e);return this.pending={owner:n,kind:e.kind,modelRef:e.modelRef??null,...e.modelTarget?{modelTarget:e.modelTarget}:{},receipt:r,outcome:`pending`,deadlineMs:r?.deadlineMs??ht(e.kind)},this.started=!0,this.pending}recordActivation(e,t){if(!e)return;if(t.status===`cancelled`||t.status===`not-admitted`||t.status===`error`&&t.activationRejection?.disposition===`rejected-before-promotion`){this.ownsActivation(e)&&(e.outcome=`rejected`),M(e.receipt),this.pending===e&&(this.pending=null);return}let n=t.status===`done`?t.modelActivation?.modelRef:void 0;n&&this.pending===e&&this.ownsActivation(e)&&(e.modelRef=n,e.modelTarget=t.status===`done`?t.modelActivation?.modelTarget:void 0,e.outcome=`verified`,e.receipt=mt(this.host.context(),e))}observeActivation(e){return t=>(this.recordActivation(e,t),this.host.notify(),()=>this.ownsActivation(e))}finishActivation(e,t,n){this.pending&&this.ownsActivation()&&e.ok&&e.modelRef&&(e.gatewayRestartRequired?(this.host.setActivationState({phase:`testing`,targetId:t}),this.host.setRefreshWarning(n??l(`updates.dialog.restarting`))):n||this.completeNavigation())}get unresolved(){return this.pending!==null}get canUseCurrentModel(){let e=this.host.pageState();return this.pending!==null&&e.phase===`ready`&&!!this.configuredActivationModel(e.result)}async useCurrentModel(){let e=this.host.pageState(),t=this.pending;if(!t||e.phase!==`ready`||!this.configuredActivationModel(e.result)||this.host.actionsDisabled())return;let n=this.configuredActivationModel(e.result),r=this.owner(t.owner.firstRun),i=await this.verify();!this.owns(r)||this.pending!==t||!i||`error`in i||(i.value.ok&&i.value.modelRef===n&&i.value.modelTarget===t.modelTarget?this.completeNavigation():i.value.ok&&this.showUnresolved())}owner(e){let t=L(this.host.context(),e);return{generation:this.generation,firstRun:e,connectionRevision:t.connectionRevision,recoveryScope:t.recoveryScope,connection:t}}clearPending(){this.pending=null,M()}ownsActivation(e=this.pending){return e?this.owns(e.owner)?e.outcome===`rejected`?this.pending===null:this.pending===e&&(!e.receipt||pt(this.host.context(),e.receipt)!==null)&&Date.now()<e.deadlineMs:!1:!this.host.routeData()?.firstRun}async verify(){let e=this.host.routeData();if(!e)return;let t=this.owner(e.firstRun),n=this.pending,r=await this.host.verify(n?.modelTarget);if(this.owns(t)&&r){if(this.pending!==n||n&&!this.ownsActivation(n)){this.host.setVerifyState({phase:`idle`});return}return this.host.setVerifyState(`error`in r?{phase:`failed`,status:`unknown`,error:N(r.error)}:et(r.value)),r}}continueSetup(e){if(this.pending)this.pending.outcome===`verified`&&this.ownsActivation()&&this.completeNavigation();else{let t=this.host.pageState(),n=this.host.activationState();e===`utility`||n.phase===`success`&&n.modelTarget===`utility`||t.phase===`ready`&&t.result.setupModel?this.host.context().navigate(`custodian`,t.phase===`ready`&&!t.result.configuredModel?{search:`?onboarding=1`}:{}):this.host.context().navigate(`chat`)}}completeNavigation(){this.clearPending(),this.host.setRefreshWarning(null),this.host.context().navigate(`custodian`,{search:`?onboarding=1`})}showUnresolved(){this.host.setRefreshWarning(null),this.host.setVerifyState({phase:`failed`,status:`unknown`,error:`${l(`modelSetup.errors.activationFailed`)} ${this.pending?.modelRef??``}`.trim()})}reset(){this.generation+=1,this.started=!1}owns(e){let t=this.host.context(),n=t.gateway.snapshot;return e.generation===this.generation&&e.connectionRevision===t.gateway.connectionRevision&&e.recoveryScope===(n.hello?.auth?.recoveryScope??null)&&e.firstRun===this.host.routeData()?.firstRun&&n.phase===`connected`&&n.client===e.connection.client&&n.hello===e.connection.hello&&I(t,e.firstRun).state.selectedId===e.connection.agentId}async run(e,t){let n=this.configuredActivationModel(t);if(n){if(this.pending&&n!==this.pending.modelRef){this.showUnresolved();return}let t=await this.verify();if(!this.owns(e)||!t||`error`in t)return;t.value.ok&&this.finishVerified(t.value.modelRef,t.value.modelTarget)}}configuredActivationModel(e){return this.pending?.modelTarget===`utility`?e.utilityModel??e.setupModel:e.setupComplete?e.configuredModel:void 0}finishVerified(e,t){this.pending?this.pending.modelRef===e&&this.pending.modelTarget===t?this.completeNavigation():this.showUnresolved():this.host.context().navigate(`chat`)}}})))()}function B(e){return e.brandId&&He(e.brandId)?e.brandId:null}function V(e,t,n=``){let r=B(t);if(r)return D(r,{className:`model-setup__icon ${n}`.trim()});let i=t.icon?e.iconUrls[t.icon]:void 0;return!t.icon||!i?Le(t.label,{className:`model-setup__icon ${n}`.trim()}):_`<img
    class=${`model-setup__icon ${n}`.trim()}
    src=${i}
    alt=${t.label}
    width="24"
    height="24"
    @error=${()=>e.onIconError(t.icon)}
  />`}var H;function U(){return(U=e((()=>{b(),T(),We(),qe(),H=class{constructor(e,t,n){this.getPageState=t,this.loader=new Ke({getFetchContext:()=>Ue(e()),isConnected:t=>e().gateway.snapshot.phase===`connected`&&this.currentIconUrls().has(t),fetchIcon:(e,t,n)=>Ge({iconUrl:e,...t,signal:n}),timeoutError:()=>new DOMException(`catalog icon fetch timed out`,`TimeoutError`),onUrlsChange:n})}reconcile(){let e=this.currentIconUrls();this.loader.reconcileKeys(e);for(let t of e)this.loader.load(t)}invalidate(e){this.loader.handleError(e)}reset(){this.loader.reset()}currentIconUrls(){let e=this.getPageState();if(e.phase!==`ready`)return new Set;let t=e.result;return new Set([...t.candidates,...t.manualProviders,...t.authOptions??[],...t.prepareOptions??[],...t.recommendedInstalls??[]].flatMap(e=>e.icon&&!B(e)?[e.icon]:[]))}}})))()}function W(e){return _`
    <section class="settings-section" data-native-model-setup>
      <div class="settings-section__header"><h2>${l(`modelSetup.nativeModels.title`)}</h2></div>
      <p class="muted">${l(`modelSetup.nativeModels.body`)}</p>
      ${e}
    </section>
  `}function yt(){return W(_`
    <div class="model-picker"><span class="picker-select__trigger skeleton"></span></div>
    <span class="btn skeleton">${`\xA0`}</span>
  `)}var G;function K(){return(K=e((()=>{b(),Ze(),T(),f(),De(),je(),d(),F(),G=class{constructor(e,t){this.host=e,this.options=t,this.nativeModels=[],this.nativeModel=``,this.nativeModelError=null,this.nativeCatalogError=null,this.saving=!1,this.generation=0,this.nativeModelsAbort=null,this.nativeModelsUnsubscribe=null,this.nativeModelsStatus=`idle`}get count(){return this.nativeModels.length}reset(){this.generation+=1,this.nativeModels=[],this.nativeModel=``,this.nativeModelError=null,this.nativeCatalogError=null,this.saving=!1,this.nativeModelsAbort?.abort(),this.nativeModelsAbort=null,this.nativeModelsUnsubscribe?.(),this.nativeModelsUnsubscribe=null,this.nativeModelsStatus=`idle`}async useNativeModel(){let e=this.options.getConnection(),t=this.generation,n=()=>this.generation===t&&this.options.getConnection()===e,r=this.options.getContext(),i=r.gateway.snapshot.client,a=e?.agentId??ee(r.gateway.snapshot)?.defaultAgentId,o=this.nativeModels.find(e=>`${e.provider}/${e.id}`===this.nativeModel);if(!this.options.canUseSetup(i)||!a||o?.available!==!0||this.saving||this.options.blocked())return;this.saving=!0,this.host.requestUpdate(),this.nativeModelError=null;let s=`${o.provider}/${o.id}`;try{let e=await r.runtimeConfig.runExternalMutation(e=>e.request(`agents.update`,{agentId:a,model:s,agentRuntime:o.agentRuntime?.id}),{canDispatch:()=>n()&&this.options.canUseSetup(i)});if(!n())return;if(!e.ok){this.nativeModelError=e.error;return}if(!e.refresh.ok){this.nativeModelError=e.refresh.error;return}await r.agents.refreshList(),n()&&this.options.onSelected()}catch(e){n()&&(this.nativeModelError=N(e))}finally{n()&&(this.saving=!1,this.host.requestUpdate())}}applyNativeCatalog(e){this.nativeModels=e.models.filter(e=>e.agentRuntime&&e.agentRuntime.id!==`openclaw`),this.nativeModelsStatus=e.pendingProviders?.length?`loading`:`ready`,this.nativeCatalogError=ke(e),this.nativeModels.some(e=>`${e.provider}/${e.id}`===this.nativeModel)||(this.nativeModel=``)}async loadNativeModels(e=!0){let t=this.options.getConnection(),n=this.options.getContext(),r=n.gateway.snapshot.client;if(!r||!this.options.canUseSetup(r))return;let i={view:`all`,agentId:t?.agentId??void 0},a=Me(r,i,{allowStale:!0});a&&this.applyNativeCatalog(a),this.nativeModelsUnsubscribe??=Ae(n.gateway,()=>void this.loadNativeModels(!1),i),this.nativeModelsAbort?.abort();let o=new AbortController;this.nativeModelsAbort=o,e&&(this.nativeCatalogError=null),this.nativeModelsStatus=`loading`,this.host.requestUpdate();try{let n=await Oe(r,{...i,refresh:e,signal:o.signal});if(this.options.getConnection()!==t||o.signal.aborted)return;this.applyNativeCatalog(n)}catch(e){this.options.getConnection()===t&&!o.signal.aborted&&(this.nativeModelsStatus=`ready`,this.nativeCatalogError=N(e))}finally{this.nativeModelsAbort===o&&(this.nativeModelsAbort=null,this.host.requestUpdate())}}render(){let e=this.nativeModels,t=e.find(e=>`${e.provider}/${e.id}`===this.nativeModel);return W(_`
      ${this.nativeModelsStatus===`loading`?_`<p role="status">${l(`modelSetup.nativeModels.loading`)}</p>`:y}
      ${this.nativeModelsStatus===`ready`&&e.length===0&&!this.nativeCatalogError?_`<p role="status">${l(`modelSetup.nativeModels.empty`)}</p>`:y}
      ${Xe({label:l(`modelSetup.nativeModels.choose`),value:this.nativeModel,options:e.map(e=>({value:`${e.provider}/${e.id}`,label:e.name,provider:e.provider,detail:e.available===!0?Ie(e.provider):Ne(e.unavailableReason)??(this.nativeModelsStatus===`loading`&&e.available===void 0?l(`modelSetup.nativeModels.loading`):e.available===!1?l(`chat.modelControls.modelsUnavailable`):l(`modelSetup.nativeModels.unconfirmed`)),disabled:e.available!==!0})),disabled:this.options.blocked()||this.saving,onChange:e=>{this.nativeModel=e,this.host.requestUpdate()},onOpen:()=>{this.nativeModelsAbort||this.loadNativeModels(this.nativeModelsStatus===`idle`)}})}
      <button
        class="btn primary"
        ?disabled=${this.options.blocked()||this.saving||t?.available!==!0}
        @click=${()=>void this.useNativeModel()}
      >
        ${l(this.saving?`modelSetup.nativeModels.saving`:`modelSetup.nativeModels.use`)}
      </button>
      ${this.nativeModelError?_`<div class="callout danger" role="alert">${this.nativeModelError}</div>`:y}
      ${this.nativeCatalogError?_`
              <div class="callout danger" role="alert">
                ${this.nativeCatalogError}
                <button
                  class="btn btn--sm"
                  type="button"
                  ?disabled=${this.options.blocked()||this.saving||this.nativeModelsAbort!==null}
                  @click=${()=>void this.loadNativeModels(!0)}
                >
                  ${l(`common.retry`)}
                </button>
              </div>
            `:y}
    `)}}})))()}function q(e){return`provider-auto:${encodeURIComponent(e)}`}function bt(e,t){return{kind:q(e.id),modelRef:t,...e.modelTarget?{modelTarget:e.modelTarget}:{}}}function xt(e){return(e.prepareOptions??[]).filter(t=>!e.candidates.some(e=>e.credentials!==!1&&(e.kind===q(t.id)||e.modelRef.startsWith(`${t.brandId??t.id}/`))))}function St(e,t){return e.candidates.find(e=>e.kind===q(t)&&e.credentials!==!1)}function Ct(e,t,n){let r=e.find(e=>e.id===t),i=n.trim();return r&&i?{kind:`api-key`,authChoice:r.id,apiKey:i,...r.modelTarget?{modelTarget:r.modelTarget}:{}}:null}function wt(e){let t=e.querySelector(`.model-setup__manual input[type="password"]`);e.querySelector(`openclaw-modal-dialog`)?.setReturnFocusTarget(t),t?.scrollIntoView?.({block:`nearest`,behavior:`auto`})}function Tt(e){let t=e.currentTarget;if(t.open){if(e.key===`Tab`){e.preventDefault(),e.stopPropagation();let n=e.shiftKey?t.querySelector(`[slot="trigger"]`):t.closest(`.model-setup__manual`)?.querySelector(`input[type="password"]`);t.addEventListener(`wa-after-hide`,()=>n?.focus({preventScroll:!0}),{once:!0}),t.open=!1;return}e.key===`Escape`&&(e.preventDefault(),t.addEventListener(`wa-after-hide`,()=>t.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),{once:!0}))}}function Et(e,t,n){let r=e.detail.item,i=e.currentTarget,a=r.value??r.getAttribute(`value`);if(a){if(a!==t){i.addEventListener(`wa-after-hide`,()=>i.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),{once:!0}),n(a);return}e.preventDefault(),r.checked=!0,i.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),i.open=!1}}function J(e){return e.groupLabel?.trim()||e.label}function Dt(e){let t=e.label.trim();return t===J(e)?void 0:t}function Ot(e,t,n){let r=n?Dt(n):void 0,i=n?[J(n),r].filter(Boolean).join(`, `):l(`modelSetup.manual.selectProvider`);return _`
    <wa-dropdown
      class="model-setup-provider-select"
      placement="bottom-start"
      aria-label=${l(`modelSetup.manual.provider`)}
      @wa-select=${t=>Et(t,e.manualProviderId,e.onManualProviderChange)}
      @keydown=${Tt}
    >
      <button
        slot="trigger"
        type="button"
        class="model-setup-provider-select__trigger"
        aria-label=${`${l(`modelSetup.manual.provider`)}: ${i}`}
        ?disabled=${e.actionsDisabled||t.manualProviders.length===0}
      >
        ${n?V(e,n,`model-setup__icon--picker`):_`<span class="model-setup-provider-select__placeholder-icon" aria-hidden="true">
                ${p.key}
              </span>`}
        <span class="model-setup-provider-select__copy">
          <strong>
            ${n?J(n):l(`modelSetup.manual.selectProvider`)}
          </strong>
          ${n?r?_`<span>${r}</span>`:y:_`<span>${l(`modelSetup.manual.selectProviderHint`)}</span>`}
        </span>
        <span class="model-setup-provider-select__chevron" aria-hidden="true">
          ${p.chevronDown}
        </span>
      </button>
      ${t.manualProviders.toSorted((e,t)=>J(e).localeCompare(J(t))).map(t=>{let n=t.id===e.manualProviderId,r=Dt(t),i=[J(t),r,t.hint].filter(Boolean).join(`, `);return _`
            <wa-dropdown-item
              class="model-setup-provider-select__option"
              data-manual-provider=${t.id}
              ?data-selected=${n}
              aria-label=${i}
              .value=${t.id}
              type="checkbox"
              .checked=${n}
              ?disabled=${e.actionsDisabled}
              ?autofocus=${n&&!e.actionsDisabled}
              ${pe(e=>Re(e,n))}
            >
              <span slot="icon">
                ${V(e,t,`model-setup__icon--picker`)}
              </span>
              <span class="model-setup-provider-select__copy">
                <strong>${J(t)}</strong>
                ${r?_`<span>${r}</span>`:y}
                ${t.hint?_`<small>${t.hint}</small>`:y}
              </span>
            </wa-dropdown-item>
          `})}
    </wa-dropdown>
  `}function Y(){return(Y=e((()=>{b(),_e(),m(),ze(),f(),U()})))()}function kt(e,t){return new Fe(e,{autoRun:!1,args:()=>[null,null,null],task:async([e,n,r],{signal:i})=>{if(!e||!r)return w;let a=t.getHello();return{...await P(e,()=>e.request(`openclaw.setup.detect`,n?{agentId:n}:{},{timeoutMs:tt,signal:i})),agentId:n,hello:a,token:r}},onComplete:t.onComplete})}function At(e){return new Fe(e,{autoRun:!1,args:()=>[null,null,void 0],task:async([e,t,n],{signal:r})=>e?P(e,()=>e.request(`openclaw.setup.verify`,{...t?{agentId:t}:{},...n?{modelTarget:n}:{}},{timeoutMs:nt,signal:r})):w})}function jt(){return(jt=e((()=>{Pe(),F(),k()})))()}var X,Mt;function Nt(){return(Nt=e((()=>{Se(),fe(),ye(),X=e=>he(e)?e._$litType$.h:e.strings,Mt=ve(class extends Te{constructor(e){super(e),this.et=new WeakMap}render(e){return[e]}update(e,[t]){let n=me(this.it)?X(this.it):null,r=me(t)?X(t):null;if(n!==null&&(r===null||n!==r)){let t=v(e).pop(),r=this.et.get(n);if(r===void 0){let e=document.createDocumentFragment();r=xe(y,e),r.setConnected(!1),this.et.set(n,r)}we(r,[t]),ge(r,void 0,t)}if(r!==null){if(n===null||n!==r){let t=this.et.get(r);if(t!==void 0){let n=v(t).pop();be(e),ge(e,void 0,n),we(e,[n])}}this.it=t}else this.it=void 0;return this.render(t)}})})))()}function Pt(){return(Pt=e((()=>{Nt()})))()}function Ft(e){if(e.modelTarget===`utility`)return l(`modelSetup.utility.role`);let t=e.kind.startsWith(`saved-auth:`)?`detected`:e.recommended?`recommended`:e.credentials===void 0?`detected`:e.credentials?`credentialsReady`:`signInNeeded`;return l(`modelSetup.candidates.${t}`)}function It(e,t){let n=t.candidates.filter(e=>!(e.modelTarget===`utility`&&!e.kind.startsWith(`saved-auth:`)&&e.modelRef===(t.utilityModel??t.setupModel))&&(!t.configuredModel||e.kind!==`existing-model`&&(e.kind.startsWith(`saved-auth:`)||e.modelRef!==t.configuredModel)));return n.length===0?y:_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${l(`modelSetup.candidates.title`)}</h2>
      </div>
      <div class="model-setup__rows">
        ${n.toSorted((e,t)=>e.label.localeCompare(t.label)).map(n=>{let r=e.activation.phase===`testing`&&e.activation.targetId===O(n.kind,n.modelRef),i=e.activation.phase===`failure`&&e.activation.targetId===O(n.kind,n.modelRef)?e.activation:null;return _`
              <div class="model-setup__row" data-candidate-kind=${n.kind}>
                <div class="model-setup__row-main">
                  <div class="model-setup__row-title">
                    ${V(e,n)}
                    <strong>${n.label}</strong>
                    <span class="model-setup__chip">${Ft(n)}</span>
                  </div>
                  <div class="muted">
                    ${n.modelRef} · ${o(n.detail)}
                  </div>
                  ${n.modelTarget===`utility`?_`<div class="muted">${l(`modelSetup.utility.hint`)}</div>`:y}
                </div>
                <div class="model-setup__row-actions">
                  <button
                    type="button"
                    class=${`btn ${i?``:`primary`}`}
                    ?disabled=${e.actionsDisabled||e.detecting}
                    @click=${()=>e.onActivateCandidate(n)}
                  >
                    <span>
                      ${r?l(`modelSetup.candidates.testingButton`):i?l(`modelSetup.candidates.retry`):n.modelTarget===`utility`?l(t.configuredModel?`modelSetup.utility.useUtility`:`modelSetup.utility.useSetup`):l(e.embedded?`modelSetup.discovery.useForAgent`:`modelSetup.candidates.testAndUse`)}
                    </span>
                  </button>
                </div>
              </div>
            `})}
      </div>
    </section>
  `}function Lt(){return(Lt=e((()=>{b(),f(),j(),te(),U(),k(),A()})))()}function Rt(e){let t=e.result.utilityModel??e.result.setupModel;if(!t)return y;let n=e.canRepair?e.result.candidates.find(e=>e.modelTarget===`utility`&&e.modelRef===t&&e.kind.startsWith(`provider-auto:`)):void 0,r=n&&e.activation.phase===`testing`&&e.activation.targetId===O(n.kind,n.modelRef);return _`<section class="settings-section model-setup__utility">
    <div class="settings-section__header"><h2>${l(`modelSetup.utility.configured`)}</h2></div>
    <div class="model-setup__row">
      <div class="model-setup__row-main">
        <strong>${t}</strong>
        <div class="muted">
          ${l(e.result.configuredModel?`modelSetup.utility.primaryReady`:`modelSetup.utility.choosePrimary`)}
        </div>
      </div>
      <div class="model-setup__row-actions">
        ${n?_`<button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled}
                @click=${()=>e.onActivateCandidate(n)}
              >
                ${l(r?`modelSetup.candidates.testingButton`:`modelSetup.utility.repair`)}
              </button>`:y}
        <button
          type="button"
          class="btn primary"
          ?disabled=${e.actionsDisabled}
          @click=${e.onOpenAssistant}
        >
          ${l(`modelSetup.utility.openAssistant`)}
        </button>
      </div>
    </div>
  </section>`}function zt(e){let t={auth:l(`modelSetup.failure.auth`),rate_limit:l(`modelSetup.failure.rateLimit`),billing:l(`modelSetup.failure.billing`),timeout:l(`modelSetup.failure.timeout`),format:l(`modelSetup.failure.format`),unavailable:l(`modelSetup.failure.unavailable`),unknown:l(`modelSetup.failure.unknown`)};return t[e]??t.unknown}function Bt(e){let t={auth:l(`modelSetup.failureGuidance.auth`),rate_limit:l(`modelSetup.failureGuidance.rateLimit`),billing:l(`modelSetup.failureGuidance.billing`),timeout:l(`modelSetup.failureGuidance.timeout`),format:l(`modelSetup.failureGuidance.format`),unavailable:y,unknown:l(`modelSetup.failureGuidance.unknown`)};return t[e]??t.unknown}function Vt(e,t){return _`
    <div class="model-setup__failure" role="alert">
      <span class="model-setup__failure-icon" aria-hidden="true">${p.alertTriangle}</span>
      <span><strong>${zt(e)}.</strong> ${t} ${Bt(e)}</span>
    </div>
  `}function Ht(e){let t=e.indexOf(`/`);return t<0?e:e.slice(t+1)}function Ut(e,t){return e.candidates.find(e=>e.modelRef===t&&!e.kind.startsWith(`saved-auth:`))}function Wt(e,t){let n=Ht(t),r=e?.detail.trim();return!r||e?.kind===`existing-model`?n:r.toLowerCase().includes(n.toLowerCase())?r:`${n} · ${r}`}function Gt(e){switch(e.phase){case`checking`:return l(`modelSetup.verify.checkingButton`);case`failed`:return l(`modelSetup.verify.retry`);case`ok`:return l(`modelSetup.verify.checkAgain`);default:return l(`modelSetup.verify.button`)}}function Kt(e){let t=e.result.configuredModel,n=e.verify.phase===`ok`?e.verify.modelRef:t,r=E(n),i=n===t?Ut(e.result,t):void 0,a=r?Ie(r):n,o=Wt(i,n);return _`
    <section class="settings-section model-setup__current" data-verify-phase=${e.verify.phase}>
      <div class="settings-section__header">
        <h2>${l(`modelSetup.verify.title`)}</h2>
      </div>
      <div class="model-setup__row">
        <div class="model-setup__provider-copy">
          ${r?D(r,{className:`model-setup__icon`}):y}
          <div class="model-setup__current-copy">
            <strong>${a}</strong>
            <div class="muted">${o}</div>
            ${e.verify.phase===`checking`?_`<div class="model-setup__testing" role="status">
                    ${l(`modelSetup.verify.checking`,{modelRef:t})}
                  </div>`:e.verify.phase===`ok`?_`<div class="model-setup__verified" role="status">
                      ${e.verify.latencyMs===void 0?l(`modelSetup.verify.ready`):l(`modelSetup.verify.readyIn`,{latencyMs:String(e.verify.latencyMs)})}
                    </div>`:e.verify.phase===`failed`?Vt(e.verify.status,e.verify.error):y}
          </div>
        </div>
        <div class="model-setup__row-actions">
          ${e.canVerify?_`<button
                  type="button"
                  class="btn"
                  ?disabled=${e.actionsDisabled}
                  @click=${e.onVerify}
                >
                  ${Gt(e.verify)}
                </button>`:y}
          ${e.onContinue?_`<button type="button" class="btn primary" @click=${e.onContinue}>
                  ${p.messageSquare} ${l(`modelSetup.success.continueSetup`)}
                </button>`:y}
        </div>
      </div>
    </section>
  `}function qt(e){return e.phase===`testing`?_`<div class="model-setup__testing" role="status">${l(`modelSetup.testing`)}</div>`:e.phase===`failure`?Vt(e.status,e.error):y}function Z(){return(Z=e((()=>{b(),m(),T(),f(),j(),k(),A()})))()}function Q(e){return _`
    <section class=${`settings-section ${e.className??``}`.trim()}>
      <div class="settings-section__header"><h2>${e.title}</h2></div>
      ${e.intro?_`<p class="muted model-setup__loading-intro">${e.intro}</p>`:y}
      <div class="model-setup__rows">
        ${Array.from({length:e.rows??1},(t,n)=>_`
            <div class="model-setup__row model-setup__loading-row">
              <span class="model-setup__loading-icon skeleton"></span>
              <span class="model-setup__loading-copy">
                ${n===0&&e.status?_`<span class="model-setup__loading-status">${e.status}</span>`:_`<span class="skeleton skeleton-line skeleton-line--medium"></span>`}
                <span class="skeleton skeleton-line skeleton-line--long"></span>
              </span>
              <span class="model-setup__loading-action skeleton"></span>
            </div>
          `)}
      </div>
    </section>
  `}function Jt(e){return _`
    <div
      class="model-setup__loading"
      role="status"
      aria-busy="true"
      aria-label=${l(`modelSetup.loading`)}
    >
      <div class="model-setup__loading-sections" aria-hidden="true">
        ${e?Q({title:l(`modelSetup.verify.title`),className:`model-setup__loading-section--selected`,status:l(`modelSetup.loading`)}):y}
        ${yt()}
        ${Q({title:l(`modelSetup.candidates.title`),className:`model-setup__loading-section--candidates`,status:e?void 0:l(`modelSetup.loading`)})}
        ${Q({title:l(`modelSetup.prepare.title`),intro:l(`modelSetup.prepare.intro`),rows:2})}
        ${Q({title:l(`modelSetup.signIn.title`),className:`model-setup__loading-section--sign-in`})}
        ${Q({title:l(`modelSetup.manual.title`)})}
      </div>
    </div>
  `}function Yt(){return(Yt=e((()=>{b(),f(),j(),K(),A()})))()}function Xt(e,t,n,r,i=!1){let a=E(e.modelRef),o=a&&He(a)?a:null,s=e.modelTarget===`utility`,c=l(s?`modelSetup.utility.ready`:`modelSetup.success.title`),u=e.warning??l(s?`modelSetup.utility.verified`:`modelSetup.success.body`,{modelRef:e.modelRef}),d=s?l(`modelSetup.utility.openAssistant`):i?l(`modelSetup.discovery.returnToModels`):r?l(`modelSetup.success.continueSetup`):e.warning?l(`tabs.chat`):l(`modelSetup.success.openChat`);return _`
    <openclaw-modal-dialog label=${c} description=${u} @modal-cancel=${n}>
      <section class="model-setup-success" role="status">
        <div
          class=${`model-setup-success__icon${o?` model-setup-success__icon--provider`:``}`}
          aria-hidden="true"
        >
          ${o?_`
                  ${D(o,{className:`model-setup-success__provider-icon`})}
                  <span class="model-setup-success__status-badge">${p.check}</span>
                `:p.shieldCheck}
        </div>
        <div class="model-setup-success__copy">
          <h2>${c}</h2>
          ${e.warning?y:_`<p>${u}</p>`}
        </div>
        ${e.warning?_`<div class="model-setup-success__warning">${e.warning}</div>`:y}
        <div class="model-setup-success__summary">
          <span>${l(s?`modelSetup.utility.model`:`modelSetup.success.activeModel`)}</span>
          <strong>${e.modelRef}</strong>
          ${e.latencyMs===void 0?y:_`<span>
                  ${l(`modelSetup.success.latency`,{latencyMs:String(e.latencyMs)})}
                </span>`}
        </div>
        <footer class="model-setup-success__actions">
          ${i&&!s?y:_`<button type="button" class="btn" @click=${n}>
                  ${l(`modelSetup.success.stayHere`)}
                </button>`}
          <button type="button" class="btn primary" autofocus @click=${t}>
            ${i&&!s?y:p.messageSquare} ${d}
          </button>
        </footer>
      </section>
    </openclaw-modal-dialog>
  `}function Zt(){return(Zt=e((()=>{b(),m(),ie(),T(),f(),j(),A()})))()}function Qt(e,t){let n=t.recommendedInstalls??[];return e.nativeModels?.count||t.candidates.length>0||(t.authOptions?.length??0)>0||n.length===0?y:_`
    <section class="settings-section model-setup__empty">
      <div class="settings-section__header">
        <h2>${l(`modelSetup.empty.title`)}</h2>
      </div>
      <p class="muted">${l(`modelSetup.empty.intro`)}</p>
      <div class="model-setup__recommendations">
        ${n.map(t=>_`
            <div class="model-setup__recommendation" data-recommended-install=${t.id}>
              ${V(e,t,`model-setup__icon--recommendation`)}
              <div class="model-setup__row-main">
                <strong>${t.label}</strong>
                <div class="muted">${t.hint}</div>
                <a href=${t.website} target="_blank" rel="noopener">${t.website}</a>
              </div>
            </div>
          `)}
      </div>
    </section>
  `}function $t(e,t){return _`
    <div class="model-setup__row" data-auth-choice=${t.id}>
      <div class="model-setup__provider-copy">
        ${V(e,t)}
        <div>
          <strong>${t.label}</strong>
          ${t.groupLabel?_`<div class="muted">${t.groupLabel}</div>`:y}
          ${t.hint?_`<div class="muted">${t.hint}</div>`:y}
        </div>
      </div>
      <button
        type="button"
        class="btn"
        ?disabled=${e.actionsDisabled||e.detecting}
        @click=${()=>e.onStartAuth(t)}
      >
        ${t.kind===`install`?l(`modelSetup.signIn.install`):t.kind===`custom`?l(`modelSetup.signIn.custom`):l(`modelSetup.signIn.verify`)}
      </button>
    </div>
  `}function en(e,t){let n=(t.authOptions??[]).filter(t=>!e.embedded||!e.credentialChoices?.includes(t.id)).toSorted((e,t)=>e.label.localeCompare(t.label));if(n.length===0)return y;let r=n.filter(e=>e.featured||e.kind===`install`||e.kind===`custom`),i=n.filter(e=>!r.includes(e));return _`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${l(`modelSetup.signIn.title`)}</h2>
        <p>${l(`modelSetup.signIn.description`)}</p>
      </div>
      <div class="model-setup__rows">${r.map(t=>$t(e,t))}</div>
      ${i.length?_`<details
              class="model-setup__more"
              .open=${e.moreSignInOpen}
              @toggle=${t=>e.onMoreSignInToggle(t.currentTarget.open)}
            >
              <summary>${l(`modelSetup.signIn.more`)}</summary>
              <div class="model-setup__rows">
                ${i.map(t=>$t(e,t))}
              </div>
            </details>`:y}
    </section>
  `}function tn(e,t){if(!e.canPrepare)return y;let n=xt(t);return n.length===0?y:_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${l(`modelSetup.prepare.title`)}</h2>
      </div>
      <p class="muted">${l(`modelSetup.prepare.intro`)}</p>
      <div class="model-setup__rows">
        ${n.map(t=>_`
            <div class="model-setup__row" data-prepare-choice=${t.id}>
              <div class="model-setup__provider-copy">
                ${V(e,t)}
                <div>
                  <strong>${t.label}</strong>
                  ${t.hint?_`<div class="muted">${t.hint}</div>`:y}
                </div>
              </div>
              <button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled||e.detecting}
                @click=${()=>e.onStartPrepare(t)}
              >
                ${t.actionLabel??l(`modelSetup.prepare.ollamaButton`)}
              </button>
            </div>
          `)}
      </div>
    </section>
  `}function nn(e,t){return e.embedded===!0&&e.credentialChoices?.includes(t.id)===!0}function rn(e,t){let n=e.embedded?{...t,manualProviders:t.manualProviders.filter(t=>!nn(e,t))}:t;if(n.manualProviders.length===0&&e.embedded)return y;let r=n.manualProviders.find(t=>t.id===e.manualProviderId),i=`manual:${e.manualProviderId}`,a=e.embedded?`model-discovery-manual`:`model-setup-manual`,o=e.activation.phase===`testing`&&e.activation.targetId===i;return _`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${l(`modelSetup.manual.title`)}</h2>
      </div>
      <div class="model-setup__manual">
        <div class="field">
          <span>${l(`modelSetup.manual.provider`)}</span>
          ${Ot(e,n,r)}
        </div>
        <label class="field">
          <span>
            ${r?l(`modelSetup.manual.accessValueFor`,{provider:J(r)}):l(`modelSetup.manual.accessValue`)}
          </span>
          <input
            class="input"
            type="password"
            autocomplete="off"
            required
            aria-invalid=${e.manualError?`true`:y}
            aria-describedby=${`${a}-help${e.manualError?` ${a}-error`:``}`}
            .value=${e.manualApiKey}
            ?disabled=${e.actionsDisabled}
            placeholder=${l(`modelSetup.manual.accessValuePlaceholder`)}
            @input=${t=>e.onManualApiKeyChange(t.currentTarget.value)}
          />
        </label>
        <div id=${`${a}-help`} class="model-setup__manual-help">
          ${p.shieldCheck}
          <span>${l(`modelSetup.manual.verifyHint`)}</span>
        </div>
        ${e.manualError?_`<div id=${`${a}-error`} class="callout danger" role="alert">
                ${e.manualError}
              </div>`:y}
        <button
          type="button"
          class="btn primary"
          ?disabled=${e.actionsDisabled||e.detecting||!e.manualProviderId}
          @click=${e.onManualConnect}
        >
          ${l(o?`modelSetup.candidates.testingButton`:e.embedded?`modelSetup.discovery.connectForAgent`:`modelSetup.manual.connectAndVerify`)}
        </button>
      </div>
    </section>
  `}function an(e){e.querySelector(`.model-setup > .model-setup__testing, .model-setup > .model-setup__failure`)?.scrollIntoView?.({block:`nearest`,behavior:`auto`})}function on(e,t){return t.nativeSessionCatalogPreferenceRequired!==!0||!t.nativeSessionCatalogs?.length?y:_`
    <section class="settings-section model-setup__native-discovery">
      <div class="settings-section__header"><h2>${l(`modelSetup.nativeDiscovery.title`)}</h2></div>
      <p class="muted">${l(`modelSetup.nativeDiscovery.body`)}</p>
      <p>${t.nativeSessionCatalogs.map(e=>e.label).join(`, `)}</p>
      <label>
        <input
          type="checkbox"
          .checked=${e.nativeSessionCatalogsEnabled===!0}
          ?disabled=${e.actionsDisabled}
          @change=${t=>{let n=t.currentTarget;e.onNativeSessionCatalogsChange?.(n.checked)}}
        />
        ${l(`modelSetup.nativeDiscovery.enable`)}
      </label>
      <p class="muted">${l(`modelSetup.nativeDiscovery.decline`)}</p>
    </section>
  `}function sn(e,t){let n=e.firstRun&&t.setupComplete&&e.activation.phase!==`success`?e.onOpenChat:void 0,r=!e.embedded&&t.configuredModel?Kt({result:t,verify:e.verify.phase===`ok`&&e.verify.modelTarget===`utility`?{phase:`idle`}:e.verify,canVerify:e.canVerify,actionsDisabled:e.actionsDisabled||e.detecting===!0,onVerify:e.onVerify,onContinue:n}):y,i=_`${r}${Rt({result:t,activation:e.activation,canRepair:e.canAdmin&&!e.gatewayTooOld,actionsDisabled:e.actionsDisabled||e.detecting===!0||e.activationUnresolved===!0,onOpenAssistant:e.onOpenSetupAssistant??e.onOpenChat,onActivateCandidate:e.onActivateCandidate})}`;return e.canAdmin?e.gatewayTooOld?_`${i}
      <div class="callout warning" role="note">${l(`modelSetup.access.gatewayTooOld`)}</div>`:_`
    ${i} ${on(e,t)} ${Qt(e,t)}
    ${e.nativeModels?.render()} ${It(e,t)}
    ${tn(e,t)} ${en(e,t)} ${rn(e,t)}
  `:_`${i}
      <div class="callout warning" role="note">${l(`modelSetup.access.adminRequired`)}</div>`}function cn(e){let t;e.page.phase===`ready`?t=sn({...e,actionsDisabled:e.actionsDisabled||e.activationUnresolved===!0},e.page.result):e.canAdmin?e.gatewayTooOld?t=_`<div class="callout warning" role="note">
      ${l(`modelSetup.access.gatewayTooOld`)}
    </div>`:e.page.phase===`loading`?t=e.embedded?_`<div class="model-setup__loading" role="status">${l(`modelSetup.loading`)}</div>`:Jt(e.modelConfigured===!0):e.page.phase===`detect-error`&&(t=_`
      <div class="callout danger" role="alert">${e.page.message}</div>
      <button type="button" class="btn" ?disabled=${e.detecting} @click=${e.onDetect}>
        ${l(`modelSetup.retry`)}
      </button>
    `):t=_`<div class="callout warning" role="note">
      ${l(`modelSetup.access.adminRequired`)}
    </div>`;let n=_`
    <div
      class="model-setup"
      aria-busy=${e.detecting||e.page.phase===`loading`?`true`:`false`}
    >
      <div class="model-setup__intro">
        <div>
          ${e.embedded?_`<h2>${l(`modelSetup.discovery.title`)}</h2>
                  <p>
                    ${l(`modelSetup.discovery.description`,{agent:e.agentLabel??``})}
                  </p>`:_`<h1>${l(`modelSetup.heading`)}</h1>
                  <p>${l(`modelSetup.intro`)}</p>`}
        </div>
        ${e.connection?ut(e.connection,!0):y}
        ${e.page.phase===`ready`&&(e.embedded||!e.page.result.configuredModel)&&e.activation.phase!==`success`&&e.canAdmin&&!e.gatewayTooOld?_`<button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled||e.detecting}
                @click=${e.onDetect}
              >
                ${e.detecting?l(`modelSetup.verify.checkingButton`):l(`modelSetup.checkAgain`)}
              </button>`:y}
      </div>
      ${e.canAdmin&&!e.gatewayTooOld?qt(e.activation):y}
      ${e.refreshWarning?_`<div class="callout warning" role="alert">${e.refreshWarning}</div>`:y}
      ${e.activationUnresolved&&!e.actionsDisabled&&e.activation.phase!==`success`?_`<div class="model-setup__recovery">
              <p>${l(`modelSetup.recovery.unknown`)}</p>
              ${e.page.phase===`ready`&&(e.page.result.configuredModel||e.page.result.setupModel)&&e.canVerify&&e.onUseCurrentModel?_`<button
                      type="button"
                      class="btn primary"
                      @click=${e.onUseCurrentModel}
                    >
                      ${l(`modelSetup.recovery.useCurrent`)}
                    </button>`:y}
              <button type="button" class="btn" @click=${e.onDetect}>
                ${l(`modelSetup.checkAgain`)}
              </button>
            </div>`:y}
      ${ct(e.connection?.loginMessage)}
      ${e.detectionError?_`<div class="callout warning" role="alert">${e.detectionError}</div>`:y}
      ${e.detecting&&e.page.phase===`ready`?_`<div class="muted" role="status">${l(`modelSetup.loading`)}</div>`:y}
      ${t}
    </div>
  `,r=_`
    ${e.connection?.login}
    <div @modal-cancel=${e=>e.preventDefault()}>
      ${it({mode:e.wizardMode,state:e.wizard,refreshWarning:e.refreshWarning,cancellationNotice:e.cancellationNotice,value:e.wizardValue,onValueChange:e.onWizardValueChange,onAnswer:e.onWizardAnswer,onCancel:e.onWizardCancel,onClose:e.onWizardClose})}
    </div>
    ${e.activation.phase===`success`?Xt(e.activation,e.activation.modelTarget===`utility`?e.onOpenSetupAssistant??e.onOpenChat:e.onOpenChat,e.onSuccessClose,e.firstRun,e.embedded):y}
  `;if(e.embedded){let t=e.wizard.phase!==`idle`||e.activation.phase===`success`;return _`
      ${Mt(t?y:_`<openclaw-modal-dialog
              label=${l(`modelSetup.discovery.title`)}
              @modal-cancel=${()=>e.onClose?.()}
              @wa-after-show=${t=>t.target===t.currentTarget?e.onDiscoveryShown?.():void 0}
            >
              <div class="model-setup-wizard model-setup-discovery">
                <div class="model-setup-wizard__body">${n}</div>
                <div class="model-setup-wizard__footer">
                  <button class="btn" @click=${()=>e.onClose?.()}>
                    ${l(`common.close`)}
                  </button>
                </div>
              </div>
            </openclaw-modal-dialog>`)}
      ${r}
    `}return _`
    <section class="content-header" ${ce({toolbarHeader:!0})}>
      <div>
        <div class="page-title">${ae(`model-setup`)}</div>
        <div class="page-subtitle">
          ${oe(`model-setup`)} ${Ve(ln)}
        </div>
      </div>
    </section>
    ${Je(n)} ${r}
  `}var ln;function un(){return(un=e((()=>{b(),Pt(),le(),se(),m(),Be(),Ye(),f(),j(),dt(),Lt(),Z(),Yt(),U(),Y(),Zt(),at(),A(),ln=`https://docs.openclaw.ai/concepts/model-providers`})))()}var $;function dn(){return(dn=e((()=>{t(),Ce(),de(),h(),f(),Ee(),d(),u(),c(),lt(),z(),U(),F(),K(),Y(),jt(),k(),un(),st(),$=class extends re{constructor(...e){super(...e),this.actionsDisabled=()=>this.login.busy||this.nativeModels.saving||this.activationState.phase===`testing`||this.verifyState.phase===`checking`||this.wizardMutationActive||this.wizardState.phase!==`idle`&&this.wizardState.phase!==`error`&&this.wizardState.phase!==`cancelled`,this.embedded=!1,this.agentLabel=``,this.credentialChoices=[],this.pageState={phase:`loading`},this.activationState={phase:`idle`},this.verifyState={phase:`idle`},this.wizardState={phase:`idle`},this.wizardMode=`auth`,this.wizardDraft={stepId:null,value:void 0},this.manualProviderId=``,this.manualApiKey=``,this.manualError=null,this.moreSignInOpen=!1,this.nativeSessionCatalogsEnabled=!1,this.iconUrls={},this.setupRefreshWarning=null,this.detectionError=null,this.detectionRequest=null,this.cancellationNotice=null,this.observedConnection=null,this.pendingPrepareOption=null,this.wizardMutationGeneration=0,this.wizardMutationActive=!1,this.wizardReturnFocus=null,this.firstRun=new R({context:()=>this.context,routeData:()=>this.routeData,pageState:()=>this.pageState,activationState:()=>this.activationState,actionsDisabled:()=>this.actionsDisabled()||this.detectionRequest!==null,canUseSetup:e=>this.canUseSetup(e),canVerify:e=>this.canVerify(e),verify:e=>this.verifyConnection(e).then(()=>this.verifyTask.value),setVerifyState:e=>this.verifyState=e,setActivationState:e=>this.activationState=e,setRefreshWarning:e=>this.setupRefreshWarning=e,resumeWizard:(e,t)=>{this.wizard.restore(e,t),this.runWizardMutation(()=>this.wizard.resume())},closeWizard:()=>this.closeWizard(),notify:()=>this.requestUpdate()}),this.nativeModels=new G(this,{getContext:()=>this.context,getConnection:()=>this.observedConnection,canUseSetup:e=>this.canUseSetup(e),blocked:()=>this.actionsDisabled()||this.detectionRequest!==null||this.firstRun.unresolved,onSelected:()=>this.embedded?this.onClose?.():this.context.navigate(`chat`)}),this.iconLoader=new H(()=>this.context,()=>this.pageState,e=>this.iconUrls=e),this.login=new ft(this,{getScope:()=>({context:this.context,agentId:this.agentSelection.state.selectedId}),getManualProviders:()=>this.pageState.phase===`ready`?this.pageState.result.manualProviders:[],onManualProvider:e=>{this.selectManualProvider(e),wt(this.renderRoot)},canStart:()=>this.canUseSetup(this.context.gateway.snapshot.client)&&!this.firstRun.unresolved&&!this.actionsDisabled(),canContinue:()=>this.canUseSetup(this.context.gateway.snapshot.client)&&!this.firstRun.unresolved,refresh:()=>this.detect()}),this.subscriptions=new ne(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.synchronizeGateway(e.snapshot)).watch(()=>this.context&&this.agentSelection,(e,t)=>e.subscribe(t),()=>this.synchronizeGateway(this.context.gateway.snapshot)).watch(()=>this.firstRun,(e,t)=>e.subscribe(t)),this.wizard=new ot({getClient:()=>this.context?.gateway.snapshot.client??null,getAgentId:()=>this.agentSelection.state.selectedId??null,onChange:e=>{e.phase!==`starting`&&e.phase!==`done`&&(this.activationState={phase:`idle`}),this.wizardState=e.phase===`step`&&this.wizardMutationActive?{...e,busy:!0}:e,this.wizardDraft=$e(this.wizardDraft,e),e.phase===`idle`&&(this.cancellationNotice=null)},onStart:(e,t)=>e===`openclaw.setup.prepare.start`?void 0:this.firstRun.observeActivation(this.firstRun.beginActivation(t??{kind:`provider-auth`})),onBackgroundCompletion:e=>this.runWizardMutation(()=>Promise.resolve(e),!0),requestFailedMessage:()=>l(`modelSetup.errors.requestFailed`),cancelledMessage:()=>l(`modelSetup.wizard.cancelled`),sessionExpiredMessage:()=>l(`modelSetup.wizard.sessionExpired`)}),this.detectTask=kt(this,{getHello:()=>this.context.gateway.snapshot.hello,onComplete:e=>{if(this.detectionRequest===e.token&&this.context.gateway.snapshot.client===e.client&&this.context.gateway.snapshot.hello===e.hello&&this.agentSelection.state.selectedId===e.agentId){if(this.detectionRequest=null,`error`in e){let t=N(e.error);this.pageState.phase===`ready`?this.detectionError=t:(this.firstRun.setReadyConnection(null),this.pageState={phase:`detect-error`,message:t});return}this.detectionError=null,this.firstRun.setReadyConnection({client:e.client,hello:e.hello,agentId:e.agentId}),this.pageState={phase:`ready`,result:e.value},e.value.manualProviders.some(e=>e.id===this.manualProviderId)||(this.manualProviderId=``)}}}),this.verifyTask=At(this)}get agentSelection(){return I(this.context,this.routeData?.firstRun===!0)}disconnectedCallback(){this.firstRun.dispose(),this.resetActivity(),this.observedConnection=null,this.nativeModels.reset(),this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(){this.synchronizeGateway(this.context.gateway.snapshot)}updated(e){this.isConnected&&(e.has(`activationState`)&&this.activationState.phase!==`idle`&&an(this.renderRoot),this.wizardState.phase!==`idle`&&this.querySelector(`openclaw-modal-dialog`)?.setReturnFocusTarget(this.wizardReturnFocus),this.iconLoader.reconcile(),this.firstRun.start())}synchronizeGateway(e){let t=this.routeData;if(!this.isConnected||!t)return;let n=this.observedConnection,r=vt(n,L(this.context,t.firstRun,n?.recoveryScope));if(r.kind===`unchanged`)return;let i=r.connection;if(this.observedConnection=i,this.nativeModels.reset(),r.kind===`pending`){this.wizard.hasAdmittedSession||(this.pageState={phase:`loading`}),this.wizard.suspend();return}let a=n&&(!i.recoveryScope||i.recoveryScope!==n.recoveryScope),o=n&&(i.agentId!==n.agentId||i.selectionIntentRevision!==n.selectionIntentRevision||i.firstRun!==n.firstRun||i.connectionRevision!==n.connectionRevision||a),s=i.connected&&!g(e.hello?.auth??null);if((a||s)&&this.wizard.close({retireOwner:!0}),o&&(this.nativeSessionCatalogsEnabled=!1,this.manualProviderId=``,this.manualApiKey=``,this.manualError=null),n&&i.recoveryScope&&!o&&this.wizard.hasAdmittedSession){this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.wizard.suspend(),this.canUseSetup(i.client)&&(this.firstRun.reconnectActivation(i),this.runWizardMutation(()=>this.wizard.resume()));return}i.firstRun===n?.firstRun?this.firstRun.connectionChanged(i):this.firstRun.routeChanged(),this.resetActivity(),this.pageState={phase:`loading`},this.canUseSetup(i.client)&&this.detect()}resetActivity(){this.login.reset(),this.detectionRequest=null,this.detectionError=null,this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.detectTask.run([null,null,null]),this.activationState={phase:`idle`},this.resetVerify(),this.iconLoader.reset(),this.pendingPrepareOption=null,this.wizard.cancel()}canUseSetup(e){let t=this.context.gateway.snapshot;return!(!e||this.routeData?.firstRun!==!0&&this.agentSelection.state.selectedId===null||t.phase!==`connected`||!g(t.hello?.auth??null)||C(t,`openclaw.setup.detect`)!==!0)}async detect(){let e=this.context.gateway.snapshot.client;if(!this.canUseSetup(e)||this.detectionRequest)return null;this.resetVerify(),this.detectionError=null,this.pageState.phase!==`ready`&&(this.pageState={phase:`loading`});let t={};this.detectionRequest=t,await this.detectTask.run([e,this.agentSelection.state.selectedId,t]);let n=this.detectTask.value;return n?.token===t&&`value`in n?n.value:null}canVerify(e){let t=this.context.gateway.snapshot;return this.canUseSetup(e)&&C(t,`openclaw.setup.verify`)===!0}resetVerify(){this.verifyState={phase:`idle`},this.verifyTask.run([null,null,void 0])}async verifyConnection(e){let t=this.context.gateway.snapshot.client;!this.canVerify(t)||this.actionsDisabled()||this.detectionRequest||(this.verifyState={phase:`checking`},await this.verifyTask.run([t,this.agentSelection.state.selectedId,e]))}async activate(e,t){let n=this.context.gateway.snapshot.client;!this.canUseSetup(n)||this.actionsDisabled()||this.detectionRequest||this.firstRun.unresolved||(this.manualError=null,this.activationState={phase:`testing`,targetId:t},this.pendingPrepareOption=null,this.wizardMode=`activate`,await this.runWizardMutation(()=>this.wizard.activate({...e,...this.nativeSessionCatalogPreference()},t)))}nativeSessionCatalogPreference(){return this.pageState.phase===`ready`&&this.pageState.result.nativeSessionCatalogPreferenceRequired===!0?{nativeSessionCatalogsEnabled:this.nativeSessionCatalogsEnabled}:{}}connectManual(){let e=Ct(this.pageState.phase===`ready`?this.pageState.result.manualProviders:[],this.manualProviderId,this.manualApiKey);if(!e){this.manualError=l(`modelSetup.manual.required`);return}this.activate(e,`manual:${this.manualProviderId}`)}selectManualProvider(e){e!==this.manualProviderId&&(this.manualApiKey=``),this.manualProviderId=e,this.manualError=null}async handleWizardDone({startMethod:e,preparedModelRef:t,activationTargetId:n,modelActivation:r,isCurrent:i}){let a=e===`openclaw.setup.prepare.start`?this.pendingPrepareOption:null,o=this.nativeSessionCatalogPreference();if(this.pendingPrepareOption=null,a&&t){let e=bt(a,t);this.wizard.close(),this.activate({...e,...o},O(e.kind,t));return}if(e!==`openclaw.setup.prepare.start`){if(i?.()===!1){this.wizard.close();return}if(!r){this.wizard.fail(l(e===`openclaw.setup.activate.start`?`modelSetup.errors.activationFailed`:`modelSetup.wizard.notComplete`));return}this.wizard.close();let t={ok:!0,...r},a=n??`provider-auth`;this.activationState=Qe({result:t,targetId:a,fallbackError:l(`modelSetup.errors.activationFailed`),restartWarning:l(`labsPage.restartRequired`),refreshWarning:this.setupRefreshWarning}),this.activationState.phase===`success`&&(this.manualApiKey=``),this.firstRun.finishActivation(t,a,this.setupRefreshWarning);return}let s=await this.detect();if(!s){this.wizard.fail(l(`modelSetup.errors.requestFailed`));return}if(a){this.pageState=rt(s,a.modelTarget);let e=St(s,a.id);if(!e){this.wizard.fail(l(`modelSetup.prepare.providerNotReady`,{provider:a.label}));return}this.wizard.close(),this.activate({kind:e.kind,modelRef:e.modelRef,...e.modelTarget?{modelTarget:e.modelTarget}:{},...o},O(e.kind,e.modelRef));return}this.wizard.close()}closeWizard(){this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.pendingPrepareOption=null,this.wizard.close()}async runWizardMutation(e,t=!1){let n=this.context.gateway.snapshot.client;if((this.wizardMutationActive||this.detectionRequest!==null)&&!t||!this.canUseSetup(n)||this.wizard.state.phase===`idle`&&this.firstRun.unresolved)return;if(this.wizard.state.phase===`idle`){let e=this.ownerDocument.activeElement;this.wizardReturnFocus=e instanceof HTMLElement&&this.contains(e)?e:null}let r=++this.wizardMutationGeneration;this.wizardMutationActive=!0,this.requestUpdate();try{let t=await this.context.runtimeConfig.runExternalMutation(async t=>{if(t!==n)throw Error(`Connection changed before model setup continued.`);return await e()},{canDispatch:()=>r===this.wizardMutationGeneration&&this.context.gateway.snapshot.client===n&&this.canUseSetup(n),dispatchError:l(`modelSetup.errors.requestFailed`)});if(r!==this.wizardMutationGeneration){t.ok&&!t.refresh.ok&&this.isConnected&&(this.setupRefreshWarning=t.refresh.error),this.isConnected&&this.canUseSetup(this.context.gateway.snapshot.client)&&this.detect();return}if(!t.ok){this.wizard.fail(t.error);return}this.setupRefreshWarning=t.refresh.ok?null:t.refresh.error;let i=t.value;i?(this.wizardMutationActive=!1,await this.handleWizardDone(i)):this.wizardState.phase===`step`&&this.wizardState.busy&&(this.wizardState={...this.wizardState,busy:!1})}catch(e){r===this.wizardMutationGeneration&&this.wizard.fail(N(e))}finally{r===this.wizardMutationGeneration&&(this.wizardMutationActive=!1,this.requestUpdate())}}async cancelWizard(){let e=this.wizardMutationGeneration;this.cancellationNotice=null;try{let t=await this.wizard.requestCancellation();if(e!==this.wizardMutationGeneration)return;if(t===`running`){this.cancellationNotice=l(`modelSetup.wizard.finishingStep`);return}if(t!==`cancelled`)return;this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.pendingPrepareOption=null,this.activationState={phase:`idle`}}catch(t){e===this.wizardMutationGeneration&&(this.wizardState.phase===`starting`||this.wizardState.phase===`step`)&&(this.cancellationNotice=l(`modelSetup.wizard.cancelFailed`,{error:N(t)}))}}render(){let e=this.context.gateway.snapshot,t=g(e.hello?.auth??null),n=e.phase===`connected`&&C(e,`openclaw.setup.detect`)!==!0;return cn({detecting:this.detectionRequest!==null,detectionError:this.detectionError,embedded:this.embedded,agentLabel:this.agentLabel,credentialChoices:this.credentialChoices,onClose:this.onClose,onDiscoveryShown:()=>{this.wizardState.phase===`idle`&&(this.wizardReturnFocus?.focus({preventScroll:!0}),this.wizardReturnFocus=null)},page:this.firstRun.visiblePageState(this.verifyState.phase===`ok`&&this.verifyState.modelTarget!==`utility`),activation:this.activationState,verify:this.verifyState,connection:this.embedded?void 0:this.login.pageActions,wizard:this.wizardState,wizardMode:this.wizardMode,wizardValue:this.wizardDraft.value,canAdmin:t,canVerify:this.canVerify(e.client),canPrepare:this.canUseSetup(e.client)&&C(e,`openclaw.setup.prepare.start`)===!0,modelConfigured:ee(e)?.modelConfigured===!0,gatewayTooOld:n,refreshWarning:this.setupRefreshWarning,cancellationNotice:this.cancellationNotice,activationUnresolved:this.firstRun.unresolved,onUseCurrentModel:this.firstRun.canUseCurrentModel?()=>void this.firstRun.useCurrentModel():void 0,actionsDisabled:this.actionsDisabled(),manualProviderId:this.manualProviderId,manualApiKey:this.manualApiKey,manualError:this.manualError,moreSignInOpen:this.moreSignInOpen,nativeSessionCatalogsEnabled:this.nativeSessionCatalogsEnabled,nativeModels:this.nativeModels,onNativeSessionCatalogsChange:e=>this.nativeSessionCatalogsEnabled=e,firstRun:this.routeData?.firstRun===!0,iconUrls:this.iconUrls,onDetect:()=>{!this.detectionRequest&&this.firstRun.retryDetection()&&this.detect()},onVerify:()=>void this.firstRun.verify(),onActivateCandidate:({kind:e,modelRef:t,modelTarget:n})=>void this.activate({kind:e,modelRef:t,...n?{modelTarget:n}:{}},O(e,t)),onStartAuth:e=>{this.wizard.prepareSignIn(e.kind,e.label),this.pendingPrepareOption=null,this.wizardMode=`auth`,this.runWizardMutation(()=>this.wizard.start(e.id,`openclaw.setup.auth.start`,this.nativeSessionCatalogPreference(),e.modelTarget))},onStartPrepare:e=>{this.pendingPrepareOption=e,this.wizardMode=`prepare`,this.runWizardMutation(()=>this.wizard.start(e.id,`openclaw.setup.prepare.start`))},onManualProviderChange:e=>this.selectManualProvider(e),onManualApiKeyChange:e=>{this.manualApiKey=e,this.manualError=null},onManualConnect:()=>this.connectManual(),onMoreSignInToggle:e=>this.moreSignInOpen=e,onIconError:e=>this.iconLoader.invalidate(e),onOpenChat:()=>this.embedded?this.onClose?.():this.firstRun.continueSetup(),onOpenSetupAssistant:()=>this.firstRun.continueSetup(`utility`),onSuccessClose:()=>{if(this.embedded){this.onClose?.();return}this.activationState={phase:`idle`},this.detect()},onWizardValueChange:e=>this.wizardDraft={...this.wizardDraft,value:e},onWizardAnswer:(e,t)=>void this.runWizardMutation(()=>this.wizard.answer(e,t)),onWizardCancel:()=>void this.cancelWizard(),onWizardClose:()=>this.closeWizard()})}},n([r({context:ue,subscribe:!0})],$.prototype,`context`,void 0),n([S({attribute:!1})],$.prototype,`routeData`,void 0),n([S({type:Boolean})],$.prototype,`embedded`,void 0),n([S()],$.prototype,`agentLabel`,void 0),n([S({attribute:!1})],$.prototype,`credentialChoices`,void 0),n([S({attribute:!1})],$.prototype,`onClose`,void 0),n([x()],$.prototype,`pageState`,void 0),n([x()],$.prototype,`activationState`,void 0),n([x()],$.prototype,`verifyState`,void 0),n([x()],$.prototype,`wizardState`,void 0),n([x()],$.prototype,`wizardMode`,void 0),n([x()],$.prototype,`wizardDraft`,void 0),n([x()],$.prototype,`manualProviderId`,void 0),n([x()],$.prototype,`manualApiKey`,void 0),n([x()],$.prototype,`manualError`,void 0),n([x()],$.prototype,`moreSignInOpen`,void 0),n([x()],$.prototype,`nativeSessionCatalogsEnabled`,void 0),n([x()],$.prototype,`iconUrls`,void 0),n([x()],$.prototype,`setupRefreshWarning`,void 0),n([x()],$.prototype,`detectionError`,void 0),n([x()],$.prototype,`detectionRequest`,void 0),n([x()],$.prototype,`cancellationNotice`,void 0),customElements.get(`openclaw-model-setup-page`)||customElements.define(`openclaw-model-setup-page`,$)})))()}dn();export{$ as ModelSetupPage};