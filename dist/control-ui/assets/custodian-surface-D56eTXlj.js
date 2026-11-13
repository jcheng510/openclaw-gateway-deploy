import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Da as n,Et as r,Ji as i,Li as a,Pa as o,Tt as s,Ui as c,qr as l,to as u,zr as d}from"./control-ui-foundation-C3MHh_P-.js";import{$s as f,Gl as p,Kl as ee,Su as m,Ys as te,cc as ne,ec as re,hc as ie,hl as ae,hr as h,hu as g,lu as oe,nl as _,pr as se,ql as ce,sc as le,su as ue,tc as de,uu as v,vc as fe,xc as pe}from"./control-ui-core-pYNj5S1a.js";import{$n as me,$r as he,To as ge,Wr as _e,Xi as y,Zi as b,bt as ve,co as ye,d as be,er as xe,hi as Se,l as Ce,mi as we,so as Te,u as Ee,vi as De,xt as Oe,yi as ke}from"./control-ui-core-D6clmJs8.js";import{$ as x,X as S,Y as C,ct as Ae,nt as je,ut as w}from"./lit-runtime-DZL1fcCI.js";import{Gt as Me,Kt as Ne}from"./control-ui-boot-shared-CES8Ypkl.js";import{c as T,d as E,l as D,u as Pe}from"./gateway-runtime-iOL78mIi.js";import{Fs as Fe,Ls as Ie,di as Le,fi as Re,li as ze,ni as Be,oi as Ve,ui as He}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Ar as Ue,Di as We,Dr as Ge,Ei as O,Oi as k,Ti as Ke,an as qe,in as Je,ki as Ye,lr as Xe,on as Ze,ur as Qe,wi as $e}from"./control-ui-boot-shared-DJ4XCcp6.js";import{i as et,n as A,o as tt,r as nt,t as rt}from"./plugin-help-C6OGXfER.js";import{J as it,Y as at}from"./control-ui-boot-shared-TgR3hRAg.js";import{$n as ot,Fr as st,Gn as ct,Ir as lt,Qn as ut,Un as dt,Zn as ft,er as pt}from"./control-ui-boot-shared-e4-xCIbb.js";import{n as mt,t as j}from"./custodian-alert-store-D3-kKDhQ.js";import{r as ht,t as gt}from"./wizard-step-controls-DGymql-W.js";import"./css-cron-custodian-new-session-DdqVeFqw.js";import"./chat-transcript-styles-BVZgOT1t.js";import"./control-ui-boot-chat-7MGT05MX.js";import"./css-chat-custodian-new-session-CbWc8vdc.js";function _t(e){if(!i(e))return;let t=e.code;return t===M.INFERENCE_UNAVAILABLE?{code:t}:void 0}function vt(e){if(!i(e))return;let t=e.code;return t===M.SESSION_INVALIDATED?{code:t}:void 0}var M;function yt(){return(yt=e((()=>{M={INFERENCE_UNAVAILABLE:`system_agent_inference_unavailable`,SESSION_INVALIDATED:`system_agent_session_invalidated`}})))()}var bt;function xt(){return(xt=e((()=>{te(),nt(),bt=class{constructor(){this.ordinary={value:``},this.sensitive={value:``},this.context=null,this.cleanup=null}connect(e,t){this.cleanup?.(),this.context=e,this.cleanup=f(e,t)}resetPrompt(e,t){this.sensitive={value:``},[e.wizardValue,e.wizardSecretVisible]=[void 0,!1],e.sensitive=t}get pluginReference(){return this.context?A(this.context):void 0}reconcile(e){if(!this.context||e.sensitive||e.wizardInputPending||e.hasUnresolvedQuestion())return;let t=tt(this.context);t&&(this.ordinary={value:[this.ordinary.value,t].filter(Boolean).join(`

`)})}}})))()}function St(e,t,n){t===`chat`&&n===`utility`?e?.navigate(`model-setup`,{search:`?firstRun=1`}):e?.navigate(t)}async function Ct(e){let{context:t}=e,r=t.gateway.snapshot.sessionKey?.trim();if(e.agentId){let i=await t.agents.refreshList();if(!e.isCurrent())return`stale`;r=n({agentId:e.agentId,mainKey:i?.mainKey}),Se({selection:t.agentSelection,gateway:t.gateway,sessionKey:r,agentId:e.agentId})}if(!r)return`exit-setup`;let i=pe({face:`chat`,sessionKey:r,fallbackAgentId:fe(t),basePath:t.basePath,mainKey:ae({agentsList:t.agents.state.agentsList,hello:t.gateway.snapshot.hello}),focusComposer:!e.hatchDraft});return t.navigate(`chat`,{pathname:i.options.pathname,...e.hatchDraft?{search:`?draft=${encodeURIComponent(g(`custodian.hatchDraft`))}`}:i.options.search?{search:i.options.search}:{}}),window.dispatchEvent(new CustomEvent(_e,{detail:{open:!1}})),`navigated`}function wt(){return(wt=e((()=>{we(),he(),v(),ie(),_()})))()}function Tt(e,t){return t===`received`?`sent`:e instanceof me||t===`unsent`?`rejected`:`unknown`}function Et(e,t){return t===`sent`?!1:t===`unknown`||e}function Dt(e,t,n){return n!==`rejected`&&e!==null&&e.severity===t.severity&&e.message===t.message}function Ot(e,t,n){return n.event===`health`?[Ft(n.payload),t]:[e,t]}function kt(e){if(e.kind===`config-reload`)return g(`custodian.nudge.configReload`);let t=e.channelLabel??g(`custodian.nudge.channelFallback`);return e.kind===`channel-auth`?g(`custodian.nudge.channelAuth`,{channel:t}):e.kind===`channel-disconnected`?g(`custodian.nudge.channelDisconnected`,{channel:t}):g(`custodian.nudge.channelDegraded`,{channel:t})}function At(e){return x`<div class="custodian__nudge" role="status">
    <button
      class="custodian__nudge-action"
      type="button"
      ?disabled=${e.disabled}
      @click=${e.onSend}
    >
      ${kt(e.nudge)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${g(`custodian.nudge.dismiss`)}
      @click=${e.onDismiss}
    >
      ${y.x}
    </button>
  </div>`}function jt(e){return x`<div class="custodian__nudge custodian__nudge--channel-onboarding" role="status">
    <div class="custodian__nudge-copy">
      <strong>${g(`custodian.nudge.channelSetupTitle`)}</strong>
      <span>${g(`custodian.nudge.channelSetupBody`)}</span>
    </div>
    <button
      class="btn btn--sm primary custodian__nudge-cta"
      type="button"
      @click=${e.onOpenChannels}
    >
      ${g(`custodian.nudge.channelSetupAction`)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${g(`custodian.nudge.channelSetupDismiss`)}
      @click=${e.onDismiss}
    >
      ${y.x}
    </button>
  </div>`}function Mt(e){return x`<div class="custodian__nudge custodian__nudge--channel-onboarding" role="alert">
    <div class="custodian__nudge-copy">
      <strong>${g(`custodian.nudge.channelStatusErrorTitle`)}</strong>
      <span>${g(`custodian.nudge.channelStatusErrorBody`)}</span>
    </div>
    <button
      class="btn btn--sm primary custodian__nudge-cta"
      type="button"
      ?disabled=${e.retrying}
      @click=${e.onRetry}
    >
      ${e.retrying?g(`common.loading`):g(`common.retry`)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${g(`custodian.nudge.channelSetupDismiss`)}
      @click=${e.onDismiss}
    >
      ${y.x}
    </button>
  </div>`}function Nt(e){return P.some(t=>e[t]===`configured_unavailable`)}function Pt(e,t,n){if(n.configured===!1||n.enabled===!1)return null;let r=e.toLowerCase();if(Nt(n))return{severity:3,kind:`channel-auth`,channelLabel:t,message:`what happened with ${r} authentication?`};let i=typeof n.healthState==`string`?n.healthState.trim().toLowerCase():void 0;if(i===`terminal-disconnect`||c(n.probe)?.ok===!1)return{severity:3,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`};if(i===`not-running`&&n.running===!1){let e=typeof n.reconnectAttempts==`number`?n.reconnectAttempts:0,t=typeof n.lastStartAt==`number`?n.lastStartAt:void 0,r=typeof n.lastStopAt==`number`?n.lastStopAt:void 0;if(n.restartPending===!1&&r!==void 0&&(t===void 0||r>=t)&&e<10)return null}return n.connected!==!0&&i!==`healthy`&&typeof n.lastError==`string`&&n.lastError.trim()?{severity:3,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`}:n.connected===!1&&n.running===!0?{severity:2,kind:`channel-disconnected`,channelLabel:t,message:`what happened with ${r}?`}:i&&N.has(i)?{severity:1,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`}:null}function Ft(e){let t=c(e);if(!t)return null;if(c(t.configReload)?.hotReloadStatus===`disabled`)return{severity:3,kind:`config-reload`,message:`what happened with configuration reload?`};let n=c(t.channels);if(!n)return null;let r=c(t.channelLabels),i=null;for(let[e,t]of Object.entries(n)){let n=c(t);if(!n)continue;let a=typeof r?.[e]==`string`?r[e]:e,o=c(n.accounts),s=o?Object.values(o).map(c).filter(e=>e!==null):[],l=s.length>0?s:[n];for(let t of l){let n=Pt(e,a,t);n&&(!i||n.severity>i.severity)&&(i=n)}}return i}var N,P;function F(){return(F=e((()=>{C(),xe(),b(),v(),N=new Set([`disconnected`,`stale-socket`,`stuck`,`terminal-disconnect`]),P=[`tokenStatus`,`botTokenStatus`,`appTokenStatus`,`signingSecretStatus`,`userTokenStatus`]})))()}function It(e,t){e.activeVariant!==`caretaker`||e.eventNudgeClosed||([e.eventNudge,e.eventNudgePending]=Ot(e.eventNudge,e.eventNudgePending,t),e.requestNudgeUpdate())}async function Lt(e){let t=e.eventNudge;if(!t||e.sensitive||e.hasUnresolvedQuestion())return;e.eventNudgePending=t,e.requestNudgeUpdate();let n=await e.send(t.message);if(e.eventNudgePending===t){e.eventNudgePending=null;let r=Dt(e.eventNudge,t,n);[e.eventNudgeClosed,e.eventNudge]=[r,r?null:e.eventNudge],e.requestNudgeUpdate()}}function Rt(e){[e.eventNudge,e.eventNudgeClosed]=[null,!0],e.requestNudgeUpdate()}function zt(e,t){e.channelOnboardingNudgeClosed=!0,e.requestNudgeUpdate(),t()}function Bt(e,t,n){e.channelOnboardingNudgeClosed=!0,t(),e.requestNudgeUpdate(),n()}function I(){return(I=e((()=>{F()})))()}function Vt(e){return e!==null&&e.length<=512&&e.trim().length>0}function L(){return`control-ui-onboarding-${s()}`}function R(e){try{m()?.setItem(z,e)}catch{}}function Ht(){let e=null;try{e=m()?.getItem(z)??null}catch{}if(Vt(e))return{sessionId:e,restored:!0};let t=L();return R(t),{sessionId:t,restored:!1}}var z;function B(){return(B=e((()=>{r(),z=`openclaw.custodian.session.v1`})))()}function Ut(e){if(!e||e.gateway.snapshot.phase!==`connected`)return`unresolved`;let t=e.agents.state.agentsList;if(!t)return`unresolved`;let n=o(e.gateway.snapshot.assistantAgentId??t.defaultId??``),r=t.agents.find(e=>o(e.id)===n);return r?r.model?.primary?.trim()?`ready`:r.utilityModel?.trim()?`utility`:`required`:`unresolved`}function V(){return(V=e((()=>{_()})))()}function H(e,t){return e.options?.find(e=>Object.is(e.value,t))}function Wt(e,t){if(e.type===`note`||e.type===`action`||e.type===`progress`)return{answer:{stepId:e.id},display:g(`common.continue`)};if(e.type===`text`)return typeof t==`string`?{answer:{stepId:e.id,value:t},display:t}:null;if(e.type===`confirm`)return typeof t==`boolean`?{answer:{stepId:e.id,value:t},display:g(t?`common.yes`:`common.no`)}:null;if(e.type===`select`){let n=H(e,t);return n?{answer:{stepId:e.id,value:t},display:n.label}:null}if(!Array.isArray(t))return null;if(t.length===0)return{answer:{stepId:e.id,value:[]},display:g(`common.none`)};let n=t.map(t=>H(e,t)?.label);return n.every(e=>e!==void 0)?{answer:{stepId:e.id,value:t},display:n.join(`, `)}:null}function Gt(e){return e.type===`multiselect`?Array.isArray(e.initialValue)?[...e.initialValue]:[]:e.initialValue}function Kt(e){return Pe(e?.gateway.snapshot??{},Me.SYSTEM_AGENT_WIZARD_CANCEL)??!1}function U(){return(U=e((()=>{Ne(),v(),D()})))()}function qt(e,t){return e?`onboarding`:t?`new-agent`:`caretaker`}function W(e,t,n){let r=e===`caretaker`?{}:{welcomeVariant:e};if(t===void 0)return r;let i=window.location.pathname,a=ge(i,Te(i));return{...r,message:t,...a?{context:{page:a,...n?{plugin:n}:{}}}:{}}}function G(e){return e.message!==void 0||e.wizardAnswer!==void 0||e.wizardCancel!==void 0}function Jt(e){let t=e&&typeof e==`object`?e.details:void 0;return{inferenceUnavailable:_t(t)!==void 0,sessionInvalidated:vt(t)!==void 0}}function K(){return(K=e((()=>{yt(),ye()})))()}var q;function Yt(){return(Yt=e((()=>{C(),je(),v(),q=class extends a{constructor(...e){super(...e),this.selectedValue=``,this.requestKey=``,this.focusPreselection=!1}createRenderRoot(){return this}willUpdate(){let e=this.props,t=e?JSON.stringify([e.header??``,e.question,e.options.map(e=>[e.value,e.label,e.recommended===!0])]):``;t!==this.requestKey&&(this.requestKey=t,this.selectedValue=e?.options.slice(0,4).find(e=>e.recommended)?.value??``,this.focusPreselection=!!this.selectedValue)}updated(e){if(!this.focusPreselection||this.props?.disabled)return;this.focusPreselection=!1;let t=this.ownerDocument.activeElement;(!t||t===this.ownerDocument.body||this.contains(t))&&[...this.querySelectorAll(`.option-card__choice`)].find(e=>e.dataset.optionValue===this.selectedValue)?.focus({preventScroll:!0})}select(e){this.props?.disabled||(this.selectedValue=e,this.props?.onSelect?.(e),this.dispatchEvent(new CustomEvent(`option-select`,{bubbles:!0,composed:!0,detail:{value:e}})))}skip(){this.props?.disabled||(this.props?.onSkip?.(),this.dispatchEvent(new CustomEvent(`option-skip`,{bubbles:!0,composed:!0})))}render(){let e=this.props;if(!e)return S;let t=e.options.slice(0,4),n=t.findIndex(e=>e.recommended===!0);return x`
      <section class="option-card" role="group" aria-label=${e.question}>
        ${e.header?x`<div class="option-card__chip">${e.header}</div>`:S}
        <div class="option-card__question">${e.question}</div>
        <div class="option-card__choices" role="radiogroup">
          ${t.map((t,r)=>{let i=r===n,a=t.value===this.selectedValue;return x`
              <button
                class=${`option-card__choice ${i?`option-card__choice--recommended`:``} ${a?`option-card__choice--selected`:``}`}
                type="button"
                role="radio"
                aria-checked=${a?`true`:`false`}
                data-option-value=${t.value}
                ?disabled=${e.disabled}
                @click=${()=>this.select(t.value)}
              >
                <span class="option-card__choice-copy">
                  <strong>${t.label}</strong>
                  ${t.description?x`<span class="option-card__description">${t.description}</span>`:S}
                </span>
                ${i?x`<span class="option-card__recommended">
                        ${g(`optionCard.recommended`)}
                      </span>`:S}
              </button>
            `})}
        </div>
        <button
          class="option-card__skip"
          type="button"
          ?disabled=${e.disabled}
          @click=${()=>this.skip()}
        >
          ${g(`optionCard.skip`)}
        </button>
      </section>
    `}},l([w({attribute:!1})],q.prototype,`props`,void 0),l([Ae()],q.prototype,`selectedValue`,void 0),customElements.get(`openclaw-option-card`)||customElements.define(`openclaw-option-card`,q)})))()}function Xt(e){return x`<div class="custodian__option-card">
    <openclaw-option-card
      .props=${{header:e.question.header,question:e.question.question,options:e.question.options.map(e=>({value:e.label,label:e.label,description:e.description,recommended:e.recommended})),disabled:e.disabled,onSelect:e.onSelect,onSkip:e.onSkip}}
    ></openclaw-option-card>
  </div>`}function Zt(){return(Zt=e((()=>{C(),Yt()})))()}function Qt(e){if(!e||typeof e!=`object`)return null;let t=u(e.id),n=u(e.header),r=u(e.question);if(!t||!n||!r||!Array.isArray(e.options)||e.options.length<2||e.options.length>4)return null;let i=[];for(let t of e.options){let e=u(t?.label);if(!e)return null;let n=u(t.description??null),r=u(t.reply??null);i.push({label:e,...n?{description:n}:{},...t.recommended===!0?{recommended:!0}:{},...r?{reply:r}:{}})}return new Set(i.map(e=>e.label.toLocaleLowerCase())).size!==i.length||i.filter(e=>e.recommended).length>1?null:{id:t,header:n,question:r,options:i,isOther:e.isOther===!0,...e.skipAction===`exit`?{skipAction:`exit`}:{}}}function $t(){return($t=e((()=>{})))()}function en(e,t,n,r=null,i=null){return{id:e,role:t,text:n,at:Date.now(),question:r,step:i}}function tn(e,t){let n=t.step??null,r=n?null:Qt(t.question),i=dn.test(t.reply);return i&&!r&&!n?null:{...en(e,`assistant`,i?``:t.reply,r,n),optionalWelcome:t.optionalWelcome===!0}}function nn(e,t,n,r,i){return r||i||e.some(e=>e.question!==null&&e.question.id!==`system-agent-quick-actions`&&!t.has(`${e.id}:${e.question.id}`)&&!n.has(`${e.id}:${e.question.id}`))}function rn(e,t){let n=new Set(t);for(let t of e)t.question&&n.add(`${t.id}:${t.question.id}`);return n}function J(e){return p(e,g(`custodian.requestFailed`))}function an(e){let t=`msg-${e.id}`,n={role:e.role,content:e.text},r=Ie(n),i=Ve(n,r);return{kind:`group`,key:t,role:e.role,messages:[{message:n,key:t,hasVisibleContent:i===`non-text`||!!He(n,r).trim()}],visibleContent:i,timestamp:e.at,isStreaming:!1}}async function on(e){try{return{ok:!0,turns:(await e.request(`openclaw.chat.history`,{},{timeoutMs:un})).turns}}catch(e){return{ok:!1,error:e}}}function sn(e,t){let n=t;return{messages:e.map(e=>({id:n++,role:e.role,text:e.role===`user`&&e.text===pn?g(`custodian.sensitiveReply`):e.text,at:e.at,question:null,step:null})),nextMessageId:n}}function cn(e,t){return e.id===t?lt({kind:`divider`,key:`custodian-earlier`,label:g(`custodian.earlier`),timestamp:e.at}):S}function ln(e){let t=e.message.question,n=e.message.step;return x`
    ${e.message.text?ct(an(e.message),{showReasoning:!1,showToolCalls:!1,assistantName:g(`custodian.title`),agentId:it}):S}
    ${cn(e.message,e.boundaryAfterId)}
    ${e.showQuestion&&t?Xt({question:t,disabled:e.questionDisabled,onSelect:e.onSelect,onSkip:e.onSkip}):S}
    ${e.showWizardStep&&n?x`<section
            class="custodian__wizard-step"
            aria-label=${ee(n.title??n.message,`Setup`)}
          >
            ${n.title?x`<strong class="custodian__wizard-title"
                    >${ee(n.title)}</strong
                  >`:S}
            ${ht({step:n,value:e.wizardValue,busy:e.wizardDisabled,inputId:`custodian-wizard-input-${e.message.id}`,sensitiveRevealed:e.wizardSecretVisible,onValueChange:e.onWizardValueChange,onAnswer:e.onWizardAnswer,leadingAction:e.showWizardCancel?x`<button
                    class="btn btn--ghost custodian__wizard-cancel"
                    type="button"
                    ?disabled=${e.wizardDisabled}
                    @click=${e.onWizardCancel}
                  >
                    ${g(`custodian.cancel`)}
                  </button>`:void 0,onToggleSensitiveVisibility:e.onToggleWizardSecretVisibility})}
          </section>`:S}
  `}var un,dn,fn,pn;function Y(){return(Y=e((()=>{C(),at(),k(),gt(),v(),ze(),Fe(),Be(),ce(),se(),st(),dt(),Zt(),$t(),un=15e3,dn=/^\s*NO_REPLY\s*$/,fn=class{constructor(e,t){this.onStatusChange=e,this.getGatewaySnapshot=t,this.status=O(),this.generation=0,this.recoveryPending=!1,this.inFlight=null}get refreshing(){return this.inFlight!==null}deferRecovery(){this.recoveryPending=!0}clearRecovery(){this.recoveryPending=!1}settleRecovery(e,t){this.recoveryPending&&!e&&(this.clearRecovery(),t())}watchAvailability(e){let t=this.getGatewaySnapshot();return()=>{let n=this.getGatewaySnapshot(),r=n&&h(n)&&(!t||!h(t));t=n,r&&this.recover(e)}}async recover(e){let t=this.generation;await this.inFlight?.promise;let n=this.getGatewaySnapshot();t===this.generation&&n&&h(n)&&(this.status.awaitingGateway||this.status.error!==null)&&e()}invalidate(){this.generation+=1,this.inFlight=null}reset(){this.clearRecovery(),this.invalidate(),this.status=O()}async read(e,t,n){let r=this.inFlight;if(r&&r.client===e&&r.epoch===t)return await r.promise,null;let i=++this.generation;this.status=$e(this.status,{clearError:!1});let a=on(e);this.inFlight={client:e,epoch:t,promise:a},this.onStatusChange();try{let e=await a;return!n()||i!==this.generation?null:(this.status=e.ok?Ke():We(this.status,e.error,this.getGatewaySnapshot()),e)}finally{this.inFlight?.promise===a&&(this.inFlight=null,this.onStatusChange())}}async loadMessages(e,t,n,r){this.clearRecovery();let i=await this.read(e,t,r);return i?.ok&&r()?sn(i.turns,n):null}},pn=`<redacted secret>`})))()}var X,mn,Z;function Q(){return(Q=e((()=>{v(),D(),xt(),wt(),I(),B(),de(),V(),U(),F(),K(),Y(),X=19e4,mn=class{constructor(){this.messages=[],this.sending=!1,this.sensitive=!1,this.wizardInputPending=!1,this.wizardSecretVisible=!1,this.questionReplyUncertain=!1,this.error=null,this.transcript=new fn(()=>this.emit(),()=>this.context?.gateway.snapshot),this.dismissedQuestions=new Set,this.answeredQuestions=new Set,this.activeClient=null,this.chatAvailable=!1,this.eventNudge=null,this.eventNudgePending=null,this.eventNudgeClosed=!1,this.channelOnboardingNudgeClosed=!1,this.earlierBoundaryAfterId=null,this.abandonedTurnOutcomeUnknown=!1,this.inferenceState=`unverified`,this.inputDrafts=new bt,this.context=null,this.variant=`caretaker`,this.sessionVariant=null,this.restoredIdentity=Ht(),this.sessionId=this.restoredIdentity.sessionId,this.rejoinBarrierPending=this.restoredIdentity.restored,this.requestEpoch=0,this.requestAbort=null,this.nextMessageId=1,this.retryParams=null,this.sessionClient=null,this.sessionOwnershipKey=null,this.sessionOwner=new re,this.sessionStarted=!1,this.configuredInferenceState=`unresolved`,this.gatewayCleanup=null,this.agentCleanup=null,this.eventCleanup=null,this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}connect(e,t){let n=this.context!==e;if(n||this.variant!==t){if(n){this.gatewayCleanup?.(),this.agentCleanup?.(),this.eventCleanup?.(),this.context=e,this.inputDrafts.connect(e,()=>this.emit());let t=this.transcript.watchAvailability(()=>void this.refreshTranscriptIfIdle());this.gatewayCleanup=e.gateway.subscribe(()=>{t(),this.synchronizeClient(),this.emit()}),this.agentCleanup=e.agents.subscribe(()=>{this.synchronizeClient(),this.emit()}),this.eventCleanup=e.gateway.subscribeEvents(e=>It(this,e))}this.variant=t,this.synchronizeClient(),this.emit()}}get input(){return this.inputDrafts[this.sensitive?`sensitive`:`ordinary`].value}set input(e){this.inputDrafts[this.sensitive?`sensitive`:`ordinary`]={value:e}}setInput(e){this.input=e,this.emit()}setWizardValue(e){this.wizardValue=e,this.emit()}toggleWizardSecretVisibility(){this.wizardSecretVisible=!this.wizardSecretVisible,this.emit()}hasRealUserTurn(){return this.messages.some(e=>e.role===`user`)}get activeVariant(){return this.variant}hasUnresolvedQuestion(){return nn(this.messages,this.dismissedQuestions,this.answeredQuestions,this.wizardInputPending,this.questionReplyUncertain)}get transcriptBlocked(){return this.sending||this.hasUnresolvedQuestion()||this.transcript.refreshing}async refreshTranscriptIfIdle(){let e=this.activeClient;if(e&&this.sessionStarted&&this.chatAvailable){if(this.transcriptBlocked){(this.transcript.status.awaitingGateway||this.transcript.status.error!==null)&&this.transcript.deferRecovery();return}await this.refreshTranscriptHistory(e,this.requestEpoch)&&this.abandonedTurnOutcomeUnknown&&(this.abandonedTurnOutcomeUnknown=!1,this.emit())}}canRetry(){return this.retryParams!==null&&!G(this.retryParams)}get setupRequired(){return this.configuredInferenceState===`required`}get canSend(){return this.activeClient!==null&&this.chatAvailable&&!this.sending&&(this.configuredInferenceState===`ready`||this.configuredInferenceState===`utility`)&&this.inferenceState===`ready`}get wizardCancelAvailable(){return Kt(this.context)}retry(){let e=this.activeClient,t=this.retryParams;e&&t&&!G(t)&&this.chatAvailable&&!this.sending&&this.initializeSession(e,t,!1)}async send(e,t,n=this.hasUnresolvedQuestion(),r){let i=e??this.input,a=this.sensitive?i:i.trim(),o=this.activeClient;if(!a.trim()||!o||!this.canSend)return this.emit(),`rejected`;let s=this.sensitive?g(`custodian.sensitiveReply`):t??a,c={sessionId:this.sessionId,...W(this.variant,a,this.inputDrafts.pluginReference)};return await this.sendUserTurn(o,c,s,n,()=>r&&(!r.isCurrent()||!r.admit())?!1:(e===void 0&&(this.input=``),!0))}async sendUserTurn(e,t,n,r,i){let a=[this.answeredQuestions,this.questionReplyUncertain],o,s=await this.requestReply(e,t,()=>{let e=this.inputDrafts.ordinary;if(i&&!i())return!1;let t=this.inputDrafts.ordinary;this.inputDrafts.resetPrompt(this,this.sensitive),o=this.requestEpoch,r&&(this.questionReplyUncertain=!0),this.abandonedTurnOutcomeUnknown=!1,this.answeredQuestions=rn(this.messages,this.answeredQuestions);let s=en(this.nextMessageId++,`user`,n);return this.messages=[...this.messages,s],()=>{this.messages=this.messages.filter(e=>e!==s),this.answeredQuestions=a[0],e!==t&&this.inputDrafts.ordinary===t&&(this.inputDrafts.ordinary=e)}});return r&&this.requestEpoch===o&&(this.questionReplyUncertain=Et(a[1],s),s===`rejected`&&(this.answeredQuestions=a[0]),this.emit()),s}requestNudgeUpdate(){this.emit()}sendEventNudge(){return Lt(this)}dismissEventNudge(){Rt(this)}dismissChannelOnboardingNudge(){zt(this,()=>this.context?.replace(`custodian`))}openChannelsFromOnboarding(){Bt(this,()=>this.revokeNavigationAuthority(),()=>this.context?.navigate(`channels`))}async dismissQuestion(e){let t=e.question;if(t){if(t.skipAction===`exit`){this.exitSetup();return}await this.send(t.isOther?g(`optionCard.skip`):`cancel`,g(`optionCard.skip`),!0)!==`rejected`&&this.messages.includes(e)&&(this.dismissedQuestions=new Set(this.dismissedQuestions).add(`${e.id}:${t.id}`),this.emit())}}answerQuestion(e,t){let n=e.question;if(!n)return;let r=n.options.find(e=>e.label===t);this.send(r?.reply??t,t,!0)}answerWizardStep(e,t){if(!e.step||!this.wizardInputPending)return;let n=Wt(e.step,t),r=this.activeClient;if(!n||!r||!this.canSend){this.emit();return}let i=e.step.sensitive?g(`custodian.sensitiveReply`):n.display;this.sendUserTurn(r,{sessionId:this.sessionId,wizardAnswer:n.answer},i,!0)}cancelWizardStep(e){let t=e.step,n=this.activeClient;if(!t||!this.wizardInputPending||!n||!this.canSend||!this.wizardCancelAvailable){this.emit();return}this.sendUserTurn(n,{sessionId:this.sessionId,wizardCancel:{stepId:t.id}},g(`custodian.cancel`),!0)}exitSetup(e=`chat`){this.revokeNavigationAuthority(),St(this.context,e,this.configuredInferenceState)}revokeNavigationAuthority(){this.requestAbort?.abort(),this.requestAbort=null,this.transcript.clearRecovery(),this.advanceRequestEpoch(),this.sending=!1,this.questionReplyUncertain=!1,this.retryParams=null,this.error=null}advanceRequestEpoch(){return this.transcript.invalidate(),++this.requestEpoch}emit(){this.inputDrafts.reconcile(this),this.transcript.settleRecovery(this.transcriptBlocked,()=>void this.refreshTranscriptIfIdle());for(let e of this.listeners)e()}startSession(e,t){this.sessionVariant=this.variant,this.sessionClient=e,this.sessionOwnershipKey=this.sessionOwner.key(this.context?.gateway??null),this.sessionStarted=!0,this.initializeSession(e,{sessionId:this.sessionId,...W(this.variant)},t)}replaceSessionId(e){e===void 0&&(this.rejoinBarrierPending=!1),this.sessionId=e??L(),R(this.sessionId)}abandonPendingUserTurn(e){e&&G(e)&&(this.retryParams=null,this.abandonedTurnOutcomeUnknown=!0)}restartVolatileSession(e){this.replaceSessionId(),this.answeredQuestions=rn(this.messages,this.answeredQuestions),this.inputDrafts.resetPrompt(this,!1),this.wizardInputPending=this.questionReplyUncertain=!1,this.earlierBoundaryAfterId=this.messages.at(-1)?.id??null,this.startSession(e,!1)}synchronizeClient(){let e=this.context;if(!e)return;let t=e.gateway.snapshot,n=t.phase===`connected`?t.client:null,r=n!==null&&T(t,`openclaw.chat`,`operator.admin`),i=E(t,`openclaw.chat`)===!1,a=Ut(this.context),o=a!==this.configuredInferenceState;this.configuredInferenceState=a;let s=this.sessionStarted&&this.sessionVariant!==this.variant,c=this.sessionOwner.key(e.gateway),l=this.sessionStarted&&n!==null&&this.activeClient===null,u=this.sessionStarted&&n!==null&&this.sessionClient!==null&&n!==this.sessionClient,d=this.sessionOwnershipKey!==null&&c!==this.sessionOwnershipKey;if(n===this.activeClient&&!s&&!u&&!d&&this.chatAvailable===(r&&a!==`unresolved`)&&!o)return;let f=this.sending&&this.retryParams!==null,p=f?this.retryParams:null;if((n!==this.activeClient||d)&&this.transcript.clearRecovery(),this.activeClient=n,this.advanceRequestEpoch(),this.sending=!1,this.chatAvailable=!1,s||d)d&&this.replaceSessionId(),[this.eventNudge,this.eventNudgePending]=[null,null],this.eventNudgeClosed=!1,this.abandonedTurnOutcomeUnknown=!1,this.sessionStarted=!1,this.clearConversation();else if(n&&(u||l)){if(!r){this.sessionStarted=!1,this.abandonPendingUserTurn(p),this.error=i?g(`custodian.unsupportedGateway`):null;return}this.chatAvailable=!0,this.abandonPendingUserTurn(p),this.requestAbort?.abort(),this.requestAbort=null,this.sessionClient=n,this.sessionOwnershipKey=c,this.questionReplyUncertain||this.abandonedTurnOutcomeUnknown?(this.questionReplyUncertain=!1,this.wizardInputPending=!1,this.abandonedTurnOutcomeUnknown=!1,this.rejoinBarrierPending=!0,this.initializeSession(n,{sessionId:this.sessionId,...W(this.variant)})):this.refreshTranscriptIfIdle();return}else f&&(p?.message===void 0&&(this.error=g(`custodian.connectionChanged`)),this.abandonPendingUserTurn(p));if(n){if(!r){this.error=i?g(`custodian.unsupportedGateway`):null;return}if(a!==`unresolved`){if(this.chatAvailable=!0,a===`required`){this.sessionStarted=!1,this.clearConversation();return}if(this.sessionStarted){this.retryParams||(this.error=f?this.error:null);return}this.clearConversation(!0),this.startSession(n,!0)}}}async initializeSession(e,t,n=!0){let r=this.advanceRequestEpoch();this.sending=!0,this.inferenceState=`unverified`,this.error=null,this.retryParams=t,this.emit(),n&&await this.refreshTranscriptHistory(e,r),r===this.requestEpoch&&e===this.activeClient&&await this.requestReply(e,t)}async refreshTranscriptHistory(e,t){let n=this.context;if(!n||E(n.gateway.snapshot,`openclaw.chat.history`)!==!0)return!1;let r=await this.transcript.loadMessages(e,t,this.nextMessageId,()=>t===this.requestEpoch&&e===this.activeClient);return r?([this.messages,this.nextMessageId]=[r.messages,r.nextMessageId],this.earlierBoundaryAfterId=this.messages.at(-1)?.id??null,this.emit(),!0):!1}clearConversation(e=!1){this.messages=[],this.dismissedQuestions=new Set,this.answeredQuestions=new Set,this.retryParams=null,this.error=null,this.transcript.reset(),this.inferenceState=`unverified`,e||(this.inputDrafts.ordinary={value:``}),this.inputDrafts.resetPrompt(this,!1),this.wizardInputPending=this.questionReplyUncertain=!1,this.earlierBoundaryAfterId=null}async requestReply(e,t,n){let r=this.context;if(!r)return`rejected`;let i=()=>e===this.activeClient&&r.gateway.snapshot.client===e&&T(r.gateway.snapshot,`openclaw.chat`,`operator.admin`);if(!i())return`rejected`;this.requestAbort?.abort();let a=new AbortController;this.requestAbort=a;let o=this.advanceRequestEpoch(),s=`unsent`,c;this.sending=!0,this.error=null,this.retryParams=t,this.emit();try{if(o!==this.requestEpoch||!i()||(c=n?.())===!1)return this.retryParams===t&&(this.retryParams=null),`rejected`;let l=e.request(`openclaw.chat`,t,{timeoutMs:X,onSent:()=>{s=`sent`},signal:a.signal});this.emit();let u=await l;if(s=`received`,o!==this.requestEpoch||e!==this.activeClient||(this.replaceSessionId(u.sessionId),this.inputDrafts.resetPrompt(this,u.sensitive===!0),this.wizardInputPending=u.wizardInputPending===!0,this.retryParams=null,this.inferenceState=`ready`,this.rejoinBarrierPending&&!G(t)&&(this.rejoinBarrierPending=!1,await this.refreshTranscriptHistory(e,o),o!==this.requestEpoch||e!==this.activeClient)))return`sent`;this.wizardValue=u.step?Gt(u.step):void 0;let d=tn(this.nextMessageId,u);return d&&(this.nextMessageId+=1,this.messages=[...this.messages,d]),u.handoff?.kind===`model-accounts`?this.exitSetup(`profile`):u.action===`open-agent`?await Ct({context:r,...u.agentId?{agentId:u.agentId}:{},hatchDraft:u.agentDraft===`hatch`,isCurrent:()=>o===this.requestEpoch&&e===this.activeClient})===`exit-setup`&&this.exitSetup():u.action===`exit`&&this.exitSetup(),`sent`}catch(n){if(o===this.requestEpoch&&e===this.activeClient){s===`unsent`&&c&&c(),this.error=J(n);let{inferenceUnavailable:r,sessionInvalidated:i}=Jt(n);r&&(this.inferenceState=`unverified`,this.retryParams={sessionId:this.sessionId,...W(this.variant)}),i&&G(t)?(this.restartVolatileSession(e),this.error=g(`custodian.sessionRestarted`,{error:J(n)})):i&&(this.replaceSessionId(),this.retryParams={...t,sessionId:this.sessionId},this.error=g(`custodian.sessionRestarted`,{error:J(n)}))}return G(t)&&this.retryParams===t&&(this.retryParams=null),Tt(n,s)}finally{this.requestAbort===a&&(this.requestAbort=null),o===this.requestEpoch&&(this.sending=!1),this.emit()}}},Z=new mn})))()}function hn(){return(hn=e((()=>{})))()}function gn(e,t,n){e.kind===`navigate`?t.navigate(e.routeId):n&&Ce({startGatewayUpdate:()=>void t.overlays.runUpdate(),watchUpdateProgress:Ee(t),onAcknowledge:()=>t.overlays.acknowledgeUpdateRun(),onCheckStatus:()=>t.overlays.refreshUpdateStatus(),onReviewUpdate:()=>t.navigate(`updates`),updateAvailable:t.overlays.snapshot.updateAvailable,updateSchedule:t.overlays.snapshot.updateSchedule,viaNativeApp:ve()})}function _n(e){let{action:t}=e.alert,n=T(e.context.gateway.snapshot,`update.run`,`operator.admin`),r=t?.target.kind===`update`&&!n;return x`<article class="custodian__nudge custodian__alert-card" role="status">
    <div class="custodian__alert-heading">
      <strong>${e.alert.title}</strong>
      <button
        class="custodian__nudge-dismiss"
        type="button"
        aria-label=${g(`common.dismiss`)}
        @click=${e.onDismiss}
      >
        ${y.x}
      </button>
    </div>
    <ul class="custodian__alert-facts">
      ${e.alert.facts.map(e=>x`<li>${e}</li>`)}
    </ul>
    ${t?x`<button
            class="btn btn--sm primary custodian__alert-action"
            type="button"
            title=${r?g(`updates.adminRequired`):S}
            ?disabled=${r}
            @click=${()=>gn(t.target,e.context,n)}
          >
            ${t.label}
          </button>`:S}
  </article>`}function vn(){return(vn=e((()=>{C(),Oe(),be(),b(),v(),D()})))()}var $;function yn(){return(yn=e((()=>{t(),C(),je(),ke(),b(),qe(),Ue(),Qe(),k(),Je(),v(),Le(),oe(),ne(),ot(),vn(),mt(),Q(),F(),nt(),K(),Y(),Re(),$=class extends ue{constructor(){super(),this.store=Z,this.onboarding=!1,this.newAgentIntent=!1,this.showChannelOnboardingNudge=!1,this.channelOnboardingError=null,this.channelOnboardingRetrying=!1,this.onRetryChannelOnboarding=()=>void 0,this.compact=!1,this.historyContent=S,this.composerTextarea=null,this.lastMessageId=null,this.lastPluginHelpFocus=0,new le(this).watch(()=>this.store,(e,t)=>e.subscribe(t)).watch(()=>j,(e,t)=>e.subscribe(t))}async getUpdateComplete(){let e=await super.getUpdateComplete();return await Promise.all(Array.from(this.querySelectorAll(`openclaw-option-card`)).map(e=>e.updateComplete)),e}willUpdate(){this.store.connect(this.context,qt(this.onboarding,this.newAgentIntent))}disconnectedCallback(){this.composerTextarea&&=(ut(this.composerTextarea),null),super.disconnectedCallback()}updated(){let e=this.store,t=this.querySelector(`textarea`);this.composerTextarea&&this.composerTextarea!==t&&ut(this.composerTextarea),this.composerTextarea=t,t&&(pt(t),ft(t)),e.canSend&&!e.sensitive&&!e.hasUnresolvedQuestion()&&j.askIfReady((t,n,r)=>void e.send(t,r,!1,n));let n=et(this.context);n>0&&n!==this.lastPluginHelpFocus&&!e.sensitive&&!e.wizardInputPending&&e.chatAvailable&&(this.lastPluginHelpFocus=n,t?.focus());let r=this.querySelector(`.custodian__messages`),i=this.store.messages.at(-1)?.id??null;if(i!==this.lastMessageId){this.lastMessageId=i;let e=r?.lastElementChild;e instanceof HTMLElement&&e.scrollIntoView?.({block:`nearest`})}}handleComposerKeydown(e){e.key!==`Enter`||e.shiftKey||e.isComposing||(e.preventDefault(),this.store.send())}render(){let e=this.store,t=A(this.context),n=t?g(`custodian.pluginPlaceholder`,{plugin:t.name}):g(`custodian.placeholder`),r=j.alert?_n({alert:j.alert,context:this.context,onDismiss:()=>j.dismiss()}):S;if(e.setupRequired)return x`
        <section
          class="custodian-surface custodian-surface--setup-required ${this.compact?`custodian-surface--panel`:``}"
        >
          ${r}
          <div class="custodian__setup-state" role="alert">
            <openclaw-mascot mood="idle" .size=${this.compact?72:96}></openclaw-mascot>
            <h2>${g(`modelSetup.required.title`)}</h2>
            <p>${g(`modelSetup.required.body`)}</p>
            <div class="custodian__setup-actions">
              <button
                class="btn primary"
                type="button"
                @click=${()=>e.exitSetup(`model-setup`)}
              >
                ${g(`modelSetup.required.action`)}
              </button>
            </div>
          </div>
        </section>
      `;let i=e.messages.length===0&&e.error!==null&&!e.sending,a=e.wizardInputPending?e.messages.findLast(e=>e.step!==null):void 0,o=t&&e.activeVariant===`caretaker`&&!e.sensitive&&!e.hasUnresolvedQuestion(),s=o&&!e.hasRealUserTurn(),c=s?rt(this.context,t):void 0;return x`
      <section
        class="custodian-surface ${this.compact?`custodian-surface--panel`:``} ${i?`custodian-surface--empty-error`:``}"
      >
        <div
          class="custodian__messages"
          ${Ze()}
          aria-live="polite"
          @click=${e=>{Ge(e),Xe(e)}}
        >
          ${r}
          ${this.channelOnboardingError?Mt({retrying:this.channelOnboardingRetrying,onRetry:this.onRetryChannelOnboarding,onDismiss:()=>e.dismissChannelOnboardingNudge()}):this.showChannelOnboardingNudge?jt({onOpenChannels:()=>e.openChannelsFromOnboarding(),onDismiss:()=>e.dismissChannelOnboardingNudge()}):S}
          ${!this.onboarding&&e.eventNudge&&!e.eventNudgePending?At({nudge:e.eventNudge,disabled:!e.canSend||e.sensitive||e.hasUnresolvedQuestion(),onSend:()=>void e.sendEventNudge(),onDismiss:()=>e.dismissEventNudge()}):S}
          ${s?x`<div class="custodian__plugin-intro">
                  <h2>${g(`custodian.pluginIntroTitle`,{plugin:t.name})}</h2>
                  <div class="custodian__plugin-starters">
                    ${[{label:g(`custodian.pluginStarterPurpose`),prompt:g(`custodian.pluginPromptPurpose`,{plugin:t.name})},{label:g(`custodian.pluginStarterTools`),prompt:g(`custodian.pluginPromptTools`,{plugin:t.name})},{label:g(`custodian.pluginStarterSetup`),prompt:g(`custodian.pluginPromptSetup`,{plugin:t.name})}].map(({label:e,prompt:t})=>x`<button
                        class="btn"
                        type="button"
                        @click=${()=>void c?.({question:t})}
                      >
                        ${e}
                      </button>`)}
                  </div>
                </div>`:S}
          ${e.messages.filter(e=>!o||!e.optionalWelcome).map(t=>{let n=t.question?`${t.id}:${t.question.id}`:``,r=t.question!==null&&!e.dismissedQuestions.has(n);return ln({message:t,boundaryAfterId:e.earlierBoundaryAfterId,showQuestion:r,questionDisabled:!e.canSend||e.answeredQuestions.has(n),onSelect:n=>e.answerQuestion(t,n),onSkip:()=>void e.dismissQuestion(t),showWizardStep:t===a,wizardValue:e.wizardValue,wizardDisabled:!e.canSend,wizardSecretVisible:e.wizardSecretVisible,onWizardValueChange:t=>e.setWizardValue(t),onWizardAnswer:n=>e.answerWizardStep(t,n),showWizardCancel:e.wizardCancelAvailable,onWizardCancel:()=>e.cancelWizardStep(t),onToggleWizardSecretVisibility:()=>e.toggleWizardSecretVisibility()})})}
          ${e.sending?x`<div class="chat-group assistant custodian__thinking-row" role="status">
                  <div class="chat-avatar assistant custodian__mascot-avatar" aria-hidden="true">
                    <openclaw-mascot mood="thinking" .size=${26}></openclaw-mascot>
                  </div>
                  <div class="chat-group-messages custodian__thinking">
                    <span></span><span></span><span></span>
                    <span class="sr-only">${g(`custodian.thinking`)}</span>
                  </div>
                </div>`:S}
          ${e.abandonedTurnOutcomeUnknown?x`<div class="custodian__error" role="alert">
                  <span>${g(`custodian.connectionChanged`)}</span>
                </div>`:S}
          ${Ye({status:e.transcript.status,className:`custodian__transcript-status`})}
          ${e.error&&!(e.abandonedTurnOutcomeUnknown&&e.error===g(`custodian.connectionChanged`))?x`<div class="custodian__error" role="alert">
                  <span>${e.error}</span>
                  ${e.activeClient&&e.chatAvailable&&e.canRetry()?x`<button
                          class="btn btn--sm"
                          type="button"
                          @click=${()=>e.retry()}
                        >
                          ${g(`common.retry`)}
                        </button>`:S}
                </div>`:S}
        </div>

        ${this.historyContent}
        ${a?S:x`<div class="agent-chat__composer-shell">
                <div class="agent-chat__input">
                  <div class="agent-chat__composer-input-row">
                    <div class="agent-chat__composer-combobox">
                      ${e.sensitive?x`<input
                              type="password"
                              .value=${e.input}
                              autocomplete="off"
                              placeholder=${g(`custodian.sensitivePlaceholder`)}
                              aria-label=${g(`custodian.sensitivePlaceholder`)}
                              ?disabled=${!e.canSend}
                              @input=${t=>e.setInput(t.target.value)}
                              @keydown=${e=>this.handleComposerKeydown(e)}
                            />`:x`<textarea
                              rows="1"
                              .value=${e.input}
                              autocomplete="on"
                              placeholder=${n}
                              aria-label=${n}
                              ?disabled=${!e.chatAvailable}
                              @input=${t=>e.setInput(t.target.value)}
                              @keydown=${e=>this.handleComposerKeydown(e)}
                            ></textarea>`}
                      <span class="agent-chat__composer-placeholder" aria-hidden="true"
                        >${e.sensitive?g(`custodian.sensitivePlaceholder`):n}</span
                      >
                    </div>
                    <div class="agent-chat__composer-actions">
                      <button
                        class="chat-send-btn"
                        type="button"
                        aria-label=${g(`custodian.send`)}
                        ?disabled=${!e.input.trim()||!e.canSend}
                        @click=${()=>void e.send()}
                      >
                        ${y.arrowUp}
                        <span class="agent-chat__control-label">${g(`custodian.send`)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`}
      </section>
    `}},l([d({context:De,subscribe:!0})],$.prototype,`context`,void 0),l([w({attribute:!1})],$.prototype,`store`,void 0),l([w({attribute:!1})],$.prototype,`onboarding`,void 0),l([w({attribute:!1})],$.prototype,`newAgentIntent`,void 0),l([w({attribute:!1})],$.prototype,`showChannelOnboardingNudge`,void 0),l([w({attribute:!1})],$.prototype,`channelOnboardingError`,void 0),l([w({attribute:!1})],$.prototype,`channelOnboardingRetrying`,void 0),l([w({attribute:!1})],$.prototype,`onRetryChannelOnboarding`,void 0),l([w({attribute:!1})],$.prototype,`compact`,void 0),l([w({attribute:!1})],$.prototype,`historyContent`,void 0),customElements.get(`openclaw-custodian-surface`)||customElements.define(`openclaw-custodian-surface`,$)})))()}export{Q as i,hn as n,Z as r,yn as t};