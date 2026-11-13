import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ba as t,Br as n,Ga as r,Ii as i,Ja as a,Ui as o,Wa as s,Xa as c,qr as l,zr as u}from"./control-ui-foundation-C3MHh_P-.js";import{Ct as d,Fc as f,Gl as p,Jc as ee,Jl as te,Kl as m,M as ne,N as h,Pc as re,R as ie,T as g,Xl as ae,bs as oe,cc as se,hu as _,lu as ce,pu as le,qc as ue,ql as v,sc as de,su as fe,uu as y,vt as pe,w as me,zi as he}from"./control-ui-core-pYNj5S1a.js";import{F as ge,M as _e,N as ve,_ as b,g as ye}from"./control-ui-boot-shared-DhhSjjdA.js";import{Ma as be,Xi as x,Yi as S,Zi as C,_r as xe,co as Se,go as Ce,ja as we,va as Te,vi as Ee,vr as De,wi as Oe,yi as ke}from"./control-ui-core-D6clmJs8.js";import{$ as w,C as Ae,F as je,M as Me,T,X as E,Y as D,c as O,ct as k,nt as Ne,r as Pe,s as Fe,t as Ie,ut as Le}from"./lit-runtime-DZL1fcCI.js";import{f as Re,p as ze,w as Be}from"./control-ui-boot-shared-CnK2ZXzW.js";import{$a as Ve,Aa as He,Da as Ue,Ea as We,Fa as Ge,Fs as Ke,Ga as qe,Ha as Je,Ia as Ye,Is as Xe,Ji as Ze,Ka as A,La as Qe,Ls as $e,Ma as et,Na as tt,Nl as nt,Oa as rt,Pa as it,Qa as at,Ra as ot,Ta as st,Ua as ct,Wa as j,Wn as lt,Xa as ut,Xi as dt,Ya as M,Yi as ft,ac as pt,bs as mt,ci as ht,ct as gt,gs as _t,ha as vt,hr as yt,hs as bt,ja as xt,ka as St,ls as Ct,lt as wt,ma as Tt,mr as Et,ms as Dt,ni as Ot,no as kt,oc as At,pa as N,ro as jt,st as Mt,wa as Nt,xs as Pt,ys as Ft,za as It}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Ar as Lt,At as P,Ba as Rt,Dt as zt,Et as Bt,Ft as Vt,Ha as Ht,Kr as Ut,Or as Wt,Ot as Gt,Pt as Kt,To as qt,Ya as Jt,_ as Yt,_t as Xt,ar as Zt,g as Qt,it as $t,jt as en,qr as tn,rr as nn,rt as rn,wo as an}from"./control-ui-boot-shared-DJ4XCcp6.js";import{H as on,V as sn,an as cn,en as ln,fn as un,in as dn,mn as fn,tn as pn,vt as mn,yt as hn}from"./control-ui-boot-shared-og7lWkK4.js";import{gt as gn,ht as _n}from"./control-ui-boot-shared-TgR3hRAg.js";import{Cr as vn,Sr as yn,cr as bn,f as xn,p as Sn,ur as Cn}from"./control-ui-boot-shared-e4-xCIbb.js";import{n as wn,t as Tn}from"./channel-picker-DrPxQAZi.js";import"./css-cron-custodian-new-session-DdqVeFqw.js";import{n as En,t as Dn}from"./settings-workspace-DKW0BVnu.js";import{n as On,t as kn}from"./agent-row-chip-DpS83BWh.js";import{n as An,t as jn}from"./model-picker-Cr4HKWDk.js";import{i as F,n as Mn,r as I,t as Nn}from"./cron-jobs-pagination-Ct12nXg4.js";import{n as Pn,s as Fn}from"./presenter-CQuBX6tH.js";import{n as In,t as Ln}from"./agent-scope-control-DWOXrjh1.js";function Rn(e,t){return(`deliveryMode`in t&&t.deliveryMode!==e.deliveryMode||`deliveryChannel`in t&&t.deliveryChannel!==e.deliveryChannel||`deliveryAccountId`in t&&t.deliveryAccountId!==e.deliveryAccountId||`deliveryTo`in t&&t.deliveryTo!==e.deliveryTo||`agentId`in t&&t.agentId!==e.agentId)&&t.deliveryThreadId===void 0?{...t,deliveryThreadId:void 0}:t}function zn(e,t){return t.deliveryMode!==e.deliveryMode||t.deliveryChannel!==e.deliveryChannel||t.agentId!==e.agentId}function Bn(e){return{mode:e.cronForm.deliveryMode,channel:e.cronForm.deliveryChannel.trim(),agentId:e.cronForm.agentId.trim()||e.cronAgentId?.trim()||``}}function Vn(e,t){return e!==null&&e.mode===t.mode&&e.channel===t.channel&&e.agentId===t.agentId}var Hn;function Un(){return(Un=e((()=>{v(),Hn=class{constructor(e){this.host=e,this.conversations=[],this.error=null,this.requestId=0,this.editorGeneration=0,this.readRoute=null}clear(e=this.host.currentCronState()){this.requestId+=1,this.conversations=[],this.error=null,this.readRoute=null,this.host.notify(e)}get generation(){return this.editorGeneration}retireEditor(e=this.host.currentCronState()){this.editorGeneration+=1,this.clear(e)}openEditor(){this.editorGeneration+=1,this.load()}retireExitedEditor(e,t,n){this.ownedBy(e,t,n)&&this.retireEditor(e)}afterSave(e,t,n,r){this.ownedBy(e,t,n)&&(this.clear(e),r?this.load(e):this.editorGeneration+=1)}reconcileRoute(e,t,n){Vn(this.readRoute,Bn(e))||this.afterSave(e,t,n,!!e.cronEditingJob)}ownedBy(e,t,n){return this.host.currentCronState()===e&&t!==null&&this.host.isCurrentConnection(t)&&this.host.canManage()&&(n===void 0||this.editorGeneration===n)}async load(e=this.host.currentCronState()){let t=++this.requestId;this.conversations=[],this.error=null,this.host.notify(e);let n=e.client,r=Bn(e);this.readRoute=r;let{mode:i,channel:a,agentId:o}=r;if(!this.host.canManage()||!n||i!==`announce`||!o||a===`last`)return;let s=this.host.captureConnection();if(!s)return;let c=()=>t===this.requestId&&this.ownedBy(e,s);try{let t=await n.request(`conversations.list`,{agentId:o,channel:a,limit:100});c()&&(this.conversations=t.conversations,this.error=null,this.host.notify(e))}catch(t){c()&&(this.conversations=[],this.error=`Could not load recipient suggestions: ${p(t)}`,this.host.notify(e))}}}})))()}var Wn;function Gn(){return(Gn=e((()=>{Wn=class{constructor(e){this.host=e,this.footer=null,this.scroller=null,this.observer=null,this.previousPadding=``,e.addController(this)}hostUpdated(){let e=this.host.querySelector(`.cron-editor-actions`),t=this.host.closest(`.content`);if(e===this.footer&&t===this.scroller||(this.hostDisconnected(),!e||!t))return;this.footer=e,this.scroller=t,this.previousPadding=t.style.scrollPaddingBlockEnd;let n=()=>{let n=getComputedStyle(t).paddingBlockEnd;t.style.scrollPaddingBlockEnd=`calc(${e.getBoundingClientRect().height}px + ${n})`};n(),typeof ResizeObserver==`function`&&(this.observer=new ResizeObserver(n),this.observer.observe(e),this.observer.observe(t))}hostDisconnected(){this.observer?.disconnect(),this.observer=null,this.scroller&&(this.scroller.style.scrollPaddingBlockEnd=this.previousPadding),this.footer=null,this.scroller=null}}})))()}function Kn(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return``}}function qn(){try{return Intl.supportedValuesOf?.(`timeZone`)??[]}catch{return[]}}function Jn(e,t=Kn(),n=qn()){let r=e.map(e=>e.schedule.kind===`cron`&&typeof e.schedule.tz==`string`?e.schedule.tz:``);return a([t,`UTC`,...r,...s(n)])}function Yn(){return(Yn=e((()=>{t()})))()}function Xn(e,t){let n=t.trim();return n?s(e.filter(e=>e.accountId===n).map(e=>e.target)):[]}function Zn(e){let t=ue(e.runtimeConfig),n=e.cron.cronForm.deliveryChannel.trim()||`last`,r=new Set((e.agentsList?.agents??[]).filter(e=>e.kind===`system`).map(e=>e.id.trim())),i=s([...f(e.agentsList?.agents??[]).map(e=>e.id.trim()),...e.cron.cronJobs.map(e=>typeof e.agentId==`string`&&!r.has(e.agentId.trim())?e.agentId.trim():``)]),a=s([...e.modelSuggestions,...tt(t),...e.cron.cronJobs.map(e=>{let t=ut(e);return t?.kind===`agentTurn`&&typeof t.model==`string`?t.model.trim():``})]),o=s(e.cron.cronJobs.map(e=>e.delivery?.to)),c=s([...o,...e.cron.cronForm.deliveryMode===`announce`?e.conversationTargets??[]:[]]),l=(n===`last`?Object.values(e.channels.channelsSnapshot?.channelAccounts??{}).flat():e.channels.channelsSnapshot?.channelAccounts?.[n]??[]).flatMap(e=>[e.accountId,e.name]).filter(e=>typeof e==`string`).map(e=>e.trim()).filter(Boolean);return{agentSuggestions:i,modelSuggestions:a,timezoneSuggestions:Jn(e.cron.cronJobs),accountTargets:l,failureAlertToSuggestions:e.cron.cronForm.deliveryMode===`webhook`?o.filter(e=>/^https?:\/\//i.test(e)):o,deliveryToSuggestions:e.cron.cronForm.deliveryMode===`webhook`?c.filter(e=>/^https?:\/\//i.test(e)):c}}var Qn;function $n(){return($n=e((()=>{t(),re(),ee(),rt(),Yn(),Qn=[`off`,`minimal`,`low`,`medium`,`high`]})))()}function er(e){let t=new URLSearchParams(e),n=t.get(`job`)?.trim()||null,r=t.get(`session`)?.trim(),i=t.get(`agent`)?.trim();return{jobId:n,runId:n&&t.get(`run`)?.trim()||null,...!n&&r&&i?{session:{sessionKey:r,sessionAgentId:i}}:{}}}function tr(e,t){if(t.runId===e)return!0;let n=nr.exec(e);return n!==null&&n[1]===t.jobId&&t.runAtMs===Number(n[2])}var nr;function L(){return(L=e((()=>{nr=/^cron:(.+):(\d+)$/u})))()}function rr(e){let t=cn(e);if(t)return t.externalSource?`external:${t.externalSource}`:t.id?`id:${t.id}`:t.sequence==null?void 0:`seq:${t.sequence}`}function ir(e,t){let n=new Set(t.map(rr).filter(Boolean)),r=e.findIndex(e=>{let t=rr(e);return t!==void 0&&n.has(t)});return{messages:[...e.slice(0,r<0?e.length:r),...t],hasOverlap:r>=0}}function ar(){return(ar=e((()=>{pn()})))()}function or(e){let t=[],n=[];for(let t of e){let e=o(t),r;if(Array.isArray(e?.content))for(let[t,n]of e.content.entries()){let i=o(n);i&&!ve(i.type)&&bt(i)&&(r??=e.content.slice(),r[t]={...i,type:`tool_call`})}n.push(r?{...e,content:r}:t)}for(let e of mn(ln(n))){if(e.kind!==`message`||Xe(e.message))continue;let n=$e(e.message),r=Ct(e.message),i=o(e.message)?.role,a=fn(e.message,typeof i==`string`?i:n.role),s=0,c,l=dn(e.message);for(let[i,u]of n.content.entries()){let d=`${e.key}:${i}`;if(bt(u)){let e=r[s++];if(!e)continue;let n=t.at(-1);n?.kind===`tools`?(n.calls.push({key:d,card:e}),e.activity&&n.activity.push(e.activity)):t.push({kind:`tools`,key:d,timestamp:l,calls:[{key:d,card:e}],activity:e.activity?[e.activity]:[]})}else if(ge(u.type)||[`thinking`,`commentary`].includes(u.type))continue;else if(u.type===`text`){if(gn(e.message)===`commentary`)continue;let r=n.role===`user`?Be(u.text??``):At(u.text??``);if(!r.trim())continue;if(a&&c?.cappedMessageId===a){c.text=`${c.text}\n\n${r}`;continue}let i={kind:n.role===`user`?`user`:`assistant`,key:d,timestamp:l,text:r,cappedMessageId:a,senderSession:n.role===`user`?void 0:n.senderSession};c=a?i:void 0,t.push(i)}else{let n=o(e.message),r=o(Array.isArray(n?.content)?n.content[i]:void 0),a=`attachment`in u?u.attachment.label:r?.fileName??r?.name;t.push({kind:`block`,key:d,timestamp:l,text:[u.type,typeof a==`string`?a:void 0].filter(Boolean).join(`: `)})}}}return t}function sr(e){switch(yt(e).kind){case`read`:return x.fileText;case`edit`:case`write`:return x.pencil;case`search`:case`fetch`:return x.search;default:return x.terminal}}function cr(e){let t=yt(e),n=ae((t.command??t.code??e.inputText??e.name).trim()),r=t.command?ze(t.command).command:void 0,a=i(ae(t.title??t.target??(r||t.command)?.split(`
`)[0]??e.name),160),o=Ft(e,!1),s=_(`chat.toolCards.${o===`succeeded`?`completed`:o===`unknown`?`outcomeUnknown`:o}`);return w`<details
    class="chat-task-feed__tool-line ${_t(e)?`chat-task-feed__error`:``}"
  >
    <summary>
      <span class="chat-task-feed__row-icon" aria-hidden="true">${sr(e)}</span>
      <span class="chat-task-feed__row-label">${a}</span>
      <span class="chat-task-feed__row-outcome" title=${s}
        >${o===`succeeded`?w`<span role="img" aria-label=${s}>${x.check}</span>`:s}</span
      >
      <span class="chat-task-feed__chevron" aria-hidden="true">${x.chevronRight}</span>
    </summary>
    <pre class="chat-task-feed__tool-line--full"><code>${n}</code></pre>
  </details>`}function lr(e){let t=mt(e.activity);return w`<details class="chat-task-feed__tool-group">
    <summary>
      <span class="chat-task-feed__overview">
        <span class="chat-task-feed__overview-heading">
          <strong
            >${t.total?_(`chat.toolCards.activity.title${t.total===1?`One`:`Many`}`,{count:String(t.total)}):_(`chat.toolCards.rawDetails`)}</strong
          >
          ${t.outcomes.map(({kind:e,label:t})=>w`<span class="chat-task-feed__outcome chat-task-feed__outcome--${e}">${t} </span>`)}
        </span>
        ${t.label?w`<span class="chat-task-feed__summary">${t.label}</span>`:E}
      </span>
      <span class="chat-task-feed__chevron" aria-hidden="true">${x.chevronRight}</span>
    </summary>
    <div class="chat-task-feed__calls">
      ${O(e.calls,({key:e})=>e,({card:e})=>cr(e))}
    </div>
  </details>`}function ur(e){return w`<div class="chat-task-feed">
    ${O(or(e),e=>e.key,e=>w` <div class="chat-task-feed__entry" data-task-feed-entry=${e.key}>
        <span class="chat-task-feed__icon" aria-hidden="true"
          >${e.kind===`tools`?sr(e.calls[0].card):e.kind===`user`?x.users:e.kind===`block`?x.paperclip:x.messageSquare}</span
        >
        <div class="chat-task-feed__body">
          ${e.kind===`assistant`&&e.senderSession?vn(e,{linkSource:!1}):e.kind===`user`||e.kind===`assistant`?w`<span class="sr-only">${_(`sessionsView.${e.kind}`)}: </span>`:E}
          ${e.kind===`tools`?lr(e):e.kind===`assistant`?Cn(e.text,e.key,{role:`assistant`,isStreaming:!1},{}):w`<div class="chat-task-feed__${e.kind}">${e.text}</div>`}
        </div>
        ${e.timestamp===null?E:w`<time class="chat-task-feed__time" datetime=${new Date(e.timestamp).toISOString()}>${new Date(e.timestamp).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,hour12:!1})}</time>`}
      </div>`)}
  </div>`}function dr(){return(dr=e((()=>{D(),Fe(),Re(),_e(),_n(),C(),y(),te(),Ke(),Pt(),Et(),Dt(),pt(),un(),pn(),hn(),yn(),bn()})))()}var fr;function pr(){return(pr=e((()=>{D(),y(),Ot(),v(),on(),ar(),xn(),dr(),fr=class{constructor(e,t){this.host=e,this.capture=t,this.attempt=0,this.entry=null,this.trigger=null,this.scope=null,this.messages=[],this.cursors=new Set,this.loading=!1,this.error=null,e.addController(this)}hostDisconnected(){this.close()}close(e=!1){let t=this.trigger;this.trigger=null,this.attempt++,this.entry=null,this.scope=null,this.messages=[],this.nextCursor=void 0,this.cursors.clear(),this.loading=!1,this.error=null,this.failedCursor=void 0,this.host.requestUpdate(),e&&t?.isConnected&&t.focus()}async open(e,t){this.close();let n=this.capture();if(!n||(this.entry=e,this.trigger=t,this.scope=n,await this.load(),this.entry!==e||this.scope!==n||!n.isCurrent())||(await this.host.updateComplete,this.entry!==e||this.scope!==n||!n.isCurrent()))return;let r=this.host.querySelector(`[data-cron-run-transcript]`);r?.focus({preventScroll:!0}),r?.scrollIntoView({block:`start`,behavior:`instant`})}async load(e){let{entry:t,scope:n,attempt:r}=this;if(!t||!n||this.loading||!n.isCurrent())return;let i=()=>this.attempt===r&&this.host.isConnected&&n.isCurrent();this.loading=!0,this.error=null,this.failedCursor=e,this.host.requestUpdate();try{if(!t.jobId||!t.runId&&(typeof t.runAtMs!=`number`||!Number.isFinite(t.runAtMs)))throw Error(_(`cron.runEntry.transcriptMissingMetadata`));let r=await n.client.request(`cron.history`,{id:t.jobId,...t.runId?{runId:t.runId}:{runAtMs:t.runAtMs},limit:100,...e?{cursor:e}:{}});if(!i())return;if(!Array.isArray(r.messages))throw Error(_(`cron.runEntry.transcriptUnavailable`));let a=ht(sn(r).messages);e&&this.cursors.add(e),this.messages=e?ir(a,this.messages).messages:a,this.nextCursor=r.nextCursor&&!this.cursors.has(r.nextCursor)?r.nextCursor:void 0,this.failedCursor=void 0}catch(e){if(!i())return;this.error=p(e,_(`cron.runEntry.transcriptUnavailable`))}i()&&(this.loading=!1,this.host.requestUpdate())}render(){return this.entry?w`<section
      class="card"
      role="region"
      tabindex="-1"
      aria-label=${_(`cron.runEntry.transcript`)}
      data-cron-run-transcript
    >
      <div class="row">
        <h2>${_(`cron.runEntry.transcript`)}</h2>
        <button class="btn btn--sm" @click=${()=>this.close(!0)}>${_(`common.close`)}</button>
      </div>
      ${this.error?w`<p role="alert">${this.error}</p>
              <button
                class="btn btn--sm"
                ?disabled=${this.loading}
                @click=${()=>void this.load(this.failedCursor)}
              >
                ${_(`common.retry`)}
              </button>`:E}
      ${this.loading?w`<p role="status">${_(`common.loading`)}</p>`:E}
      ${this.nextCursor?Sn({hasMore:!0,loading:this.loading,onShowEarlier:()=>void this.load(this.nextCursor)}):E}
      ${!this.loading&&!this.error&&this.messages.length===0?w`<p>${_(`cron.runEntry.transcriptEmpty`)}</p>`:E}
      ${ur(this.messages)}
    </section>`:E}}})))()}function R(e,t,n,r){return{id:e,emoji:t,nameKey:`cron.suggestions.ideas.${e}.name`,taglineKey:`cron.suggestions.ideas.${e}.tagline`,promptKey:`cron.suggestions.ideas.${e}.prompt`,scheduleKey:n,schedule:r}}function mr(e){return{name:_(e.nameKey),payloadText:_(e.promptKey),payloadKind:`agentTurn`,sessionTarget:`isolated`,wakeMode:`now`,deleteAfterRun:!1,enabled:!0,...e.schedule}}var z,B,hr,gr,_r;function vr(){return(vr=e((()=>{y(),I(),F(),z={scheduleKind:`cron`,cronExpr:`0 9 * * 1-5`},B={scheduleKind:`cron`,cronExpr:`0 8 * * *`},hr={scheduleKind:`cron`,cronExpr:`0 9 * * 1`},gr={scheduleKind:`every`,everyAmount:`1`,everyUnit:`hours`},_r=[R(`repoPulse`,`🐙`,`cron.suggestions.schedules.weekdayMornings`,z),R(`standupGhostwriter`,`👻`,`cron.suggestions.schedules.weekdayMornings`,z),R(`hackerNewsScout`,`🔭`,`cron.suggestions.schedules.everyMorning`,B),R(`dependencyRadar`,`🛰️`,`cron.suggestions.schedules.weekly`,hr),R(`watchdog`,`🦉`,`cron.suggestions.schedules.hourly`,gr),R(`polyglotMinute`,`🗣️`,`cron.suggestions.schedules.everyMorning`,B)]})))()}function V(e,t,n){return w`
    <label class="field">
      <span>${n.label}</span>
      <select
        class="settings-select"
        data-test-id=${T(n.testId)}
        .value=${n.value}
        @change=${n=>{if(n.currentTarget instanceof HTMLSelectElement)return e.onJobsFiltersChange({[t]:n.currentTarget.value})}}
      >
        ${n.options.map(({value:e,label:t})=>w`<option value=${e} ?selected=${e===n.value}>${t}</option>`)}
      </select>
    </label>
  `}function yr(e,t){return w`
    <button
      id="cron-jobs-filter-trigger"
      type="button"
      class="btn btn--sm cron-filter-popover__trigger ${t?`active`:``}"
      title=${_(`cron.list.filters`)}
      aria-label=${_(`cron.list.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${S(`listFilter`)}
    </button>
    <wa-popover
      ${je($t)}
      class="cron-filter-popover"
      for="cron-jobs-filter-trigger"
      aria-label=${_(`cron.list.filters`)}
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>{e.currentTarget instanceof Element&&e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,`true`)}}
      @wa-hide=${e=>{e.currentTarget instanceof Element&&e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,`false`)}}
    >
      <div class="cron-filter-popover__panel">
        ${V(e,`cronJobsScheduleKindFilter`,{label:_(`cron.jobs.schedule`),value:e.jobsScheduleKindFilter,testId:`cron-jobs-schedule-filter`,options:Object.entries(br).map(([e,t])=>({value:e,label:_(t)}))})}
        ${V(e,`cronJobsLastStatusFilter`,{label:_(`cron.jobs.lastRun`),value:e.jobsLastStatusFilter,testId:`cron-jobs-last-status-filter`,options:[{value:`all`,label:_(`cron.jobs.all`)},{value:`ok`,label:_(`cron.runs.runStatusOk`)},{value:`error`,label:_(`cron.runs.runStatusError`)},{value:`skipped`,label:_(`cron.runs.runStatusSkipped`)},{value:`unknown`,label:_(`cron.runs.runStatusUnknown`)}]})}
        ${V(e,`cronJobsTriggerFilter`,{label:_(`cron.jobs.condition`),value:e.jobsTriggerFilter,testId:`cron-jobs-trigger-filter`,options:[{value:`all`,label:_(`cron.jobs.all`)},{value:`conditional`,label:_(`cron.jobs.conditional`)},{value:`unconditional`,label:_(`cron.jobs.unconditional`)}]})}
        ${V(e,`cronJobsSortBy`,{label:_(`cron.jobs.sort`),value:e.jobsSortBy,options:[{value:`nextRunAtMs`,label:_(`cron.jobs.nextRun`)},{value:`updatedAtMs`,label:_(`cron.jobs.recentlyUpdated`)},{value:`name`,label:_(`cron.jobs.name`)}]})}
        ${V(e,`cronJobsSortDir`,{label:_(`cron.jobs.direction`),value:e.jobsSortDir,options:[{value:`asc`,label:_(`cron.jobs.ascending`)},{value:`desc`,label:_(`cron.jobs.descending`)}]})}
        <button
          class="btn btn--sm"
          data-test-id="cron-jobs-filters-reset"
          ?disabled=${!t}
          @click=${e.onJobsFiltersReset}
        >
          ${_(`cron.jobs.reset`)}
        </button>
      </div>
    </wa-popover>
  `}var br;function xr(){return(xr=e((()=>{D(),Ae(),Me(),C(),rn(),y(),I(),F(),br={all:`cron.jobs.all`,at:`cron.form.at`,every:`cron.form.every`,cron:`cron.form.cronOption`,"on-exit":`cron.form.repeatOnExit`,stream:`cron.form.repeatStream`}})))()}function H(e,t){return w`
    <div class="cron-condition-activity__metric">
      <dt>${e}</dt>
      <dd>${t}</dd>
    </div>
  `}function Sr(e){let t=h(e.lastCheckedAtMs,{fallback:_(`cron.runs.notChecked`)}),n=h(e.lastFiredAtMs,{fallback:_(`cron.runs.neverFired`)});return w`
    <div class="cron-condition-activity" data-test-id="cron-condition-activity">
      <div class="cron-condition-activity__intro">
        <div class="settings-row__title">
          <span class="cron-condition-activity__icon" aria-hidden="true">${S(`gitBranch`)}</span>
          ${_(`cron.runs.conditionActivity`)}
        </div>
        <div class="settings-row__desc">${_(`cron.runs.conditionActivityHint`)}</div>
      </div>
      <dl class="cron-condition-activity__metrics">
        ${H(_(`cron.runs.checks`),String(e.checkCount))}
        ${H(_(`cron.runs.lastChecked`),t)}
        ${H(_(`cron.runs.lastFired`),n)}
      </dl>
    </div>
  `}function Cr(e){if(e.checkCount===0)return _(`cron.runs.emptyConditionUnchecked`);let t=e.checkCount===1?`cron.runs.emptyConditionHintOne`:`cron.runs.emptyConditionHint`;return _(t,{count:String(e.checkCount)})}function wr(e,t,n){let r=new Set(e);return n?r.add(t):r.delete(t),Array.from(r)}function Tr(e,t){return e.length===0?t:e.length<=2?e.join(`, `):`${e[0]} +${e.length-1}`}function Er(e){let t=e.options.filter(t=>e.selected.includes(t.value)).map(e=>e.label),n=Tr(t,e.allLabel),r=t.length>2?`${n} (${new Intl.ListFormat(le.getLocale(),{style:`long`,type:`conjunction`}).format(t)})`:n;return w`
    <div class="cron-filter-dropdown" data-filter=${e.id}>
      <wa-dropdown
        class="cron-filter-dropdown__details"
        placement="bottom-start"
        @wa-select=${t=>{let n=t.detail.item.value;if(n===`${Mr}clear`){e.onClear();return}if(n?.startsWith(jr)){t.preventDefault();let r=n.slice(7);e.onToggle(r,!e.selected.includes(r))}}}
      >
        <button
          slot="trigger"
          type="button"
          class="btn btn--sm cron-filter-dropdown__trigger ${e.selected.length>0?`active`:``}"
          title=${e.title}
          aria-label=${`${e.title} ${r}`}
        >
          <span>${n}</span>
          ${S(`chevronDown`)}
        </button>
        ${e.options.map(t=>w`
            <wa-dropdown-item
              class="cron-filter-dropdown__option"
              type="checkbox"
              value=${`${jr}${t.value}`}
              .checked=${e.selected.includes(t.value)}
            >
              ${t.label}
            </wa-dropdown-item>
          `)}
        <div class="session-menu__separator" role="separator"></div>
        <wa-dropdown-item value=${`${Mr}clear`}>
          ${_(`cron.runs.clear`)}
        </wa-dropdown-item>
      </wa-dropdown>
    </div>
  `}function Dr(e){let t=me(),n=e.runs.toSorted((t,n)=>e.runsSortDir===`asc`?t.ts-n.ts:n.ts-t.ts),r=e.runsQuery.trim().length>0||e.runsStatuses.length>0||e.runsDeliveryStatuses.length>0,i=e.runsSortDir===`asc`?_(`cron.runs.oldestFirst`):_(`cron.runs.newestFirst`);return w`
    <div class="cron-runs" aria-busy=${String(e.runsState===`pending`)}>
      ${e.conditionActivity?Sr(e.conditionActivity):E}
      <div class="cron-run-filters">
        <div class="cron-search-box cron-run-filter-search">
          <span class="cron-search-box__icon" aria-hidden="true">${S(`search`)}</span>
          <input
            type="search"
            class="settings-input"
            .value=${e.runsQuery}
            aria-label=${_(`cron.runs.searchRuns`)}
            placeholder=${_(`cron.runs.searchPlaceholder`)}
            @input=${t=>e.onRunsFiltersChange({cronRunsQuery:t.target.value})}
          />
        </div>
        ${Er({id:`status`,title:_(`cron.runs.status`),allLabel:_(`cron.runs.allStatuses`),options:Array.from(U,([e,t])=>({value:e,label:_(t)})),selected:e.runsStatuses,onToggle:(t,n)=>{let r=wr(e.runsStatuses,t,n);e.onRunsFiltersChange({cronRunsStatuses:r})},onClear:()=>{e.onRunsFiltersChange({cronRunsStatuses:[]})}})}
        ${Er({id:`delivery`,title:_(`cron.runs.delivery`),allLabel:_(`cron.runs.allDelivery`),options:Array.from(W,([e,t])=>({value:e,label:_(t)})),selected:e.runsDeliveryStatuses,onToggle:(t,n)=>{let r=wr(e.runsDeliveryStatuses,t,n);e.onRunsFiltersChange({cronRunsDeliveryStatuses:r})},onClear:()=>{e.onRunsFiltersChange({cronRunsDeliveryStatuses:[]})}})}
        <div class="cron-filter-dropdown">
          <wa-dropdown
            class="cron-filter-dropdown__details"
            placement="bottom-start"
            @wa-select=${t=>{let n=t.detail.item.value;(n===`asc`||n===`desc`)&&e.onRunsFiltersChange({cronRunsSortDir:n})}}
          >
            <button
              slot="trigger"
              type="button"
              class="btn btn--sm cron-filter-dropdown__trigger cron-run-sort"
              aria-label=${`${_(`cron.jobs.sort`)} ${i}`}
            >
              <span>${i}</span>
              ${S(`chevronDown`)}
            </button>
            <wa-dropdown-item value="desc" aria-current=${String(e.runsSortDir===`desc`)}>
              ${_(`cron.runs.newestFirst`)}
              <span slot="details" aria-hidden="true">
                ${e.runsSortDir===`desc`?S(`check`):E}
              </span>
            </wa-dropdown-item>
            <wa-dropdown-item value="asc" aria-current=${String(e.runsSortDir===`asc`)}>
              ${_(`cron.runs.oldestFirst`)}
              <span slot="details" aria-hidden="true">
                ${e.runsSortDir===`asc`?S(`check`):E}
              </span>
            </wa-dropdown-item>
          </wa-dropdown>
        </div>
      </div>
      ${e.runsState===`failed`?w`<button class="btn btn--sm" @click=${e.onRefresh}>${_(`common.retry`)}</button>`:E}
      ${n.length===0?e.runsState===`pending`?w`<div
                class="cron-empty-state"
                role="status"
                aria-live="polite"
                data-test-id="cron-runs-loading"
              >
                ${_(`cron.list.loading`)}
              </div>`:e.runsState===`ready`?r?w`<div class="muted cron-runs__empty">${_(`cron.runs.noMatching`)}</div>`:w`
                    <div class="cron-empty-state">
                      <div class="cron-empty-state__title">
                        ${e.conditionActivity?_(`cron.runs.emptyConditionTitle`):_(`cron.runs.emptyTitle`)}
                      </div>
                      <div class="cron-empty-state__copy">
                        ${e.conditionActivity?Cr(e.conditionActivity):_(`cron.runs.emptyHint`)}
                      </div>
                    </div>
                  `:E:w`
              <div class="cron-runs__list">
                ${n.map(n=>Ar(n,t,e.highlightedRunId,e.onViewRunTranscript))}
              </div>
            `}
      ${e.runsHasMore?w`
              <button
                class="btn btn--sm cron-load-more"
                ?disabled=${e.runsLoadingMore}
                @click=${e.onLoadMoreRuns}
              >
                ${e.runsLoadingMore?_(`cron.list.loading`):_(`cron.runs.loadMore`)}
              </button>
            `:E}
    </div>
  `}function Or(e,t=Date.now()){let n=h(e);return _(e>t?`cron.runEntry.next`:`cron.runEntry.due`,{rel:n})}function kr(e,t){if(e===`ok`&&(t===`failed`||t===`unknown`)){let e=_(t===`failed`?`cron.runs.runStatusError`:`cron.runs.runStatusUnknown`);return`${_(`cron.runs.runStatusOk`)} · ${e}`}return _(U.get(e)??`cron.runs.runStatusUnknown`)}function Ar(e,t,n,r){let i=kr(e.status??`unknown`,e.completionStatus),a=_(W.get(e.deliveryStatus??`not-requested`)??`cron.runs.deliveryUnknown`),o=e.usage,s=o&&typeof o.total_tokens==`number`?`${g(o.total_tokens)} ${_(`usage.metrics.tokens`)}`:o&&typeof o.input_tokens==`number`&&typeof o.output_tokens==`number`?`${g(o.input_tokens)} in / ${g(o.output_tokens)} out`:null,c=e.summary||m(e.error)||_(`cron.runEntry.noSummary`),l=!!e.error&&!!e.summary,u=m(e.deliverySuppressionReason),d=[a,u?_(`cron.runEntry.deliverySuppression`,{reason:u}):null,e.model,e.provider,s].filter(Boolean),f=!!(n&&tr(n,e));return w`
    <div class="cron-run-entry ${f?`cron-run-entry--highlighted`:``}">
      <div class="cron-run-entry__header">
        <div class="cron-run-entry__main">
          <div class="cron-run-entry__title">
            ${e.jobName??e.jobId}
            <span class="muted"> · ${i}</span>
          </div>
          <div class="cron-run-entry__facts muted">${d.join(` · `)}</div>
        </div>
        <div class="cron-run-entry__meta">
          <div>${t(e.ts)}</div>
          ${typeof e.runAtMs==`number`?w`<div class="muted">
                  ${_(`cron.runEntry.runAt`)} ${t(e.runAtMs)}
                </div>`:E}
          <div class="muted">
            ${typeof e.durationMs==`number`&&Number.isFinite(e.durationMs)?Ze(e.durationMs)??ft(e.durationMs,_(`common.na`)):_(`common.na`)}
          </div>
          ${typeof e.nextRunAtMs==`number`?w`<div class="muted">${Or(e.nextRunAtMs)}</div>`:E}
          ${e.runId||e.runAtMs!==void 0||e.sessionKey?w`<div>
                  <button
                    class="btn btn--sm"
                    @click=${t=>{t.currentTarget instanceof HTMLButtonElement&&r?.(e,t.currentTarget)}}
                  >
                    ${_(`cron.runEntry.viewTranscript`)}
                  </button>
                </div>`:E}
          ${l?w`<div class="muted">${m(e.error)}</div>`:E}
          ${e.deliveryError?w`<div class="muted">${m(e.deliveryError)}</div>`:E}
        </div>
      </div>
      <div class="cron-run-entry__body chat-text">
        ${Pe(Zt(c))}
      </div>
    </div>
  `}var U,W,jr,Mr;function Nr(){return(Nr=e((()=>{D(),Ie(),C(),Jt(),nn(),y(),I(),dt(),v(),ie(),L(),F(),U=new Map([[`ok`,`cron.runs.runStatusOk`],[`error`,`cron.runs.runStatusError`],[`skipped`,`cron.runs.runStatusSkipped`]]),W=new Map([[`delivered`,`cron.runs.deliveryDelivered`],[`not-delivered`,`cron.runs.deliveryNotDelivered`],[`unknown`,`cron.runs.deliveryUnknown`],[`not-requested`,`cron.runs.deliveryNotRequested`]]),jr=`option:`,Mr=`command:`})))()}function Pr(e){return Object.entries({"cron-agent-suggestions":e.agentSuggestions,"cron-thinking-suggestions":e.thinkingSuggestions,"cron-tz-suggestions":e.timezoneSuggestions,"cron-delivery-to-suggestions":e.deliveryToSuggestions,"cron-failure-alert-to-suggestions":e.failureAlertToSuggestions,"cron-delivery-account-suggestions":e.accountSuggestions}).map(([e,t])=>{let n=c(r(t));return n.length===0?E:w`<datalist id=${e}>
          ${n.map(e=>w`<option value=${e}></option> `)}
        </datalist>`})}function Fr(){return(Fr=e((()=>{t(),D()})))()}function Ir(e){return[{value:`last`,label:`last`,kind:`neutral`},...c(e.channels.filter(Boolean)).map(t=>({value:t,label:e.channelMeta?.find(e=>e.id===t)?.label||e.channelLabels?.[t]||t}))]}function G(e){return`cron-error-${e}`}function K(e){return`cron-${e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}`}function Lr(e,t,n){return e===`payloadText`&&t.payloadKind===`systemEvent`?_(`cron.form.mainTimelineMessage`):_(e===`deliveryTo`&&n===`webhook`?`cron.form.webhookUrl`:Q[e])}function Rr(e,t,n){return Object.keys(Q).flatMap(r=>{let i=e[r];return i?[{label:Lr(r,t,n),message:i,inputId:K(r)}]:[]})}function zr(e){let t=document.getElementById(e);t instanceof HTMLElement&&(typeof t.scrollIntoView==`function`&&t.scrollIntoView({block:`center`,behavior:lt()}),t.focus())}function Br(e,t){return e?w`<div id=${T(t)} class="cron-help cron-error">${_(e)}</div>`:E}function Vr(e){return w`
    ${e}
    <span class="cron-required-marker" aria-hidden="true">*</span>
    <span class="cron-required-sr">${_(`cron.form.requiredSr`)}</span>
  `}function q(e){let t=e.wide?`cron-control cron-control--wide`:`cron-control`,n=w`<div class=${t}>
    ${e.control}${Br(e.error,e.errorId)}
  </div>`;return w`
    <div class=${e.stacked?`settings-row settings-row--stacked`:`settings-row`}>
      <label class="settings-row__text" for=${T(e.controlId||void 0)}>
        <span class="settings-row__title">
          ${e.required?Vr(e.label):e.label}
        </span>
        ${e.help?w`<span class="settings-row__desc">${e.help}</span>`:E}
      </label>
      <div class="settings-row__control">${n}</div>
    </div>
  `}function Hr(e,t,n){let r=n.errorKey?e.fieldErrors[n.errorKey]:void 0,i=r&&n.errorKey&&n.describeError!==!1?G(n.errorKey):void 0;return w`
    <input
      id=${K(t)}
      class=${n.mono?`settings-input mono`:`settings-input`}
      type=${T(n.type)}
      aria-required=${T(n.required?`true`:void 0)}
      .value=${e.form[t]}
      list=${T(n.list)}
      ?disabled=${n.disabled??!1}
      aria-invalid=${T(n.errorKey?r?`true`:`false`:void 0)}
      aria-describedby=${T(i)}
      placeholder=${T(n.placeholder)}
      @input=${n=>e.onFormChange({[t]:n.currentTarget.value})}
    />
  `}function J(e,t,n){let r=n.errorKey;return q({label:n.label,controlId:K(t),required:n.required,help:n.help,error:r?e.fieldErrors[r]:void 0,errorId:r?G(r):void 0,control:Hr(e,t,n)})}function Ur(e,t,n){let r=n.value??e.form[t];return(n.channel?wn:tn)({id:n.standalone?void 0:K(t),label:n.label,value:n.channel?r||`last`:r,options:n.options,disabled:n.disabled,onChange:n=>e.onFormChange({[t]:n})})}function Y(e,t,n){return q({label:n.label,controlId:K(t),help:n.help,control:Ur(e,t,n)})}function X(e,t,n){return Vt({title:n.label,description:n.help,checked:e.form[t],onChange:n=>e.onFormChange({[t]:n})})}function Wr(e){let t=e.editingJob?`job`:e.createOpen?`create`:`overview`;return w`
    ${t===`overview`?Kr(e):ai(e,t)}
    ${Pr(e)}
  `}function Gr(e){return e.canManage?E:w`<div class="cron-admin-note" role="note">
        <span aria-hidden="true">${S(`lock`)}</span>
        <span>${_(`cron.adminRequired`)}</span>
      </div>`}function Kr(e){let t=e.jobsScheduleKindFilter!==`all`||e.jobsLastStatusFilter!==`all`||e.jobsTriggerFilter!==`all`||e.jobsSortBy!==`nextRunAtMs`||e.jobsSortDir!==`asc`,n=t||e.jobsQuery.trim().length>0||e.jobsEnabledFilter!==`all`,r=!e.loading&&e.hasLoaded&&!e.listError&&!e.error&&e.jobsTotal===0&&!n&&e.canManage,i=[w`
      <div class="cron-overview-header">
        ${Gr(e)}
        ${e.status&&!e.status.enabled?w`
                <div class="cron-error-banner" data-test-id="cron-scheduler-banner">
                  <strong>${_(`cron.list.schedulerOff`)}</strong>
                  ${_(`cron.runNotStarted.stopped`)}
                </div>
              `:E}
        ${e.listError?w`<div class="cron-error-banner" role="alert">${e.listError}</div>`:E}
        ${e.error?w`<div class="cron-error-banner" role="alert">${e.error}</div>`:E}
        ${Jr(e,t)}
      </div>
    `,w`
      <div
        id="cron-list-panel"
        class="cron-tab-panel"
        role="tabpanel"
        aria-labelledby=${`cron-list-tab-${e.listTab===`activity`?`activity`:e.jobsEnabledFilter}`}
      >
        ${e.listTab===`activity`?P({},w`<div class="cron-activity">${Dr(e)}</div>`):[P({},Yr(e,n)),r?ii(e):E]}
      </div>
    `];return w`
    <section class="cron-page" data-panel-mode="overview">
      ${Bt(i,{wide:!0})}
    </section>
  `}function qr(e){return Yt({id:`cron-list`,panelId:`cron-list-panel`,className:`cron-tabs`,active:e.listTab===`activity`?`activity`:e.jobsEnabledFilter,tabs:[...vi.map(e=>({value:e.value,label:_(e.labelKey),testId:`cron-tab-${e.value}`})),{value:`activity`,label:_(`cron.list.activityTab`),testId:`cron-list-tab-activity`}],ariaLabel:_(`cron.list.viewLabel`),onSelect:t=>{if(t===`activity`){e.onListTabChange(`activity`);return}e.onListTabChange(`tasks`),t!==e.jobsEnabledFilter&&e.onJobsFiltersChange({cronJobsEnabledFilter:t})}})}function Jr(e,t){return w`
    <div class="cron-toolbar">
      ${e.listTab===`tasks`?w`
              <div class="cron-toolbar__filters">
                <div class="cron-search-box">
                  <span class="cron-search-box__icon" aria-hidden="true">${S(`search`)}</span>
                  <input
                    type="search"
                    class="settings-input"
                    .value=${e.jobsQuery}
                    aria-label=${_(`cron.list.searchPlaceholder`)}
                    placeholder=${_(`cron.list.searchPlaceholder`)}
                    @input=${t=>e.onJobsFiltersChange({cronJobsQuery:t.target.value})}
                  />
                </div>
                ${yr(e,t)}
              </div>
            `:E}
      <div class="cron-toolbar__primary">
        ${qr(e)}
        <div class="cron-toolbar__actions">
          <button
            type="button"
            class="btn btn--sm btn--ghost cron-refresh ${e.loading?`cron-refresh--loading`:``}"
            ?disabled=${e.loading}
            title=${e.loading?_(`cron.list.refreshing`):_(`cron.list.refresh`)}
            aria-label=${_(`cron.list.refresh`)}
            @click=${e.onRefresh}
          >
            ${S(`refresh`)}
          </button>
          ${e.canManage?w`
                  <button
                    type="button"
                    class="btn primary btn--sm cron-new-task"
                    data-test-id="cron-new-task"
                    @click=${()=>e.onOpenCreate()}
                  >
                    ${S(`plus`)} ${_(`cron.list.newTask`)}
                  </button>
                `:E}
        </div>
      </div>
    </div>
  `}function Yr(e,t){let n=e.loading&&!e.hasLoaded,r=e.loading||e.jobsLoadingMore,i=e.jobs.toSorted((e,t)=>Number(N(t))-Number(N(e)));return w`
    <div
      class="cron-table ${e.canManage?``:`cron-table--read-only`}"
      aria-busy=${r?`true`:E}
    >
      <div class="cron-table__head">
        <span>${_(`cron.jobs.name`)}</span>
        <span>${_(`cron.jobs.schedule`)}</span>
        <span>${_(`cron.jobs.nextRun`)}</span>
        <span>${_(`cron.jobs.lastRun`)}</span>
        ${e.canManage?w`<span aria-hidden="true"></span>`:E}
      </div>
      ${i.length===0?n?w`
                <div
                  class="cron-empty-state"
                  role="status"
                  aria-live="polite"
                  data-test-id="cron-jobs-loading"
                >
                  <div class="cron-empty-state__title">${_(`cron.list.loading`)}</div>
                </div>
              `:e.hasLoaded?w`
                  <div class="cron-empty-state">
                    <div class="cron-empty-state__title">
                      ${_(t?`cron.list.noMatching`:`cron.list.emptyTitle`)}
                    </div>
                    ${t?E:w`<div class="cron-empty-state__copy">
                            ${_(`cron.list.emptyHint`)}
                          </div>`}
                  </div>
                `:E:O(i,e=>e.id,t=>Xr(t,e))}
      ${Mn({jobsShown:e.jobs.length,jobsTotal:e.jobsTotal,hasMore:e.jobsHasMore,loading:e.loading,loadingMore:e.jobsLoadingMore,onLoadMore:e.onLoadMoreJobs})}
    </div>
  `}function Xr(e,t){let n=e.displayName??e.name,r=e.description?.trim(),i=b(e.declarationKey),a=e.state?.nextRunAtMs,o=typeof a==`number`&&Number.isFinite(a),s=Tt(e)?w`<span class="cron-table__running">${_(`cron.runs.runStatusRunning`)}</span>`:o?h(a):_(`common.na`);return w`
    <div
      class="cron-table__row ${e.enabled?``:`cron-table__row--paused`}"
      data-test-id=${`cron-row-${e.id}`}
      @click=${()=>t.onSelectJob(e)}
    >
      <button type="button" class="cron-table__name">
        ${Qr(e)}
        <span class="cron-table__name-copy">
          <span class="cron-table__name-line">
            <span class="cron-table__name-text">${n}</span>
            ${e.trigger?$r():E}
          </span>
          ${i?E:On(e.agentId)}
          ${r||!e.enabled?w`
                  <span class="cron-table__name-meta">
                    ${r?w`
                            <span
                              class="cron-table__description"
                              data-test-id=${`cron-row-description-${e.id}`}
                              title=${`${_(`cron.form.description`)}: ${r}`}
                              >${r}</span
                            >
                          `:E}
                    ${r&&!e.enabled?w`<span class="cron-table__meta-separator" aria-hidden="true">·</span>`:E}
                    ${e.enabled?E:ei(e)}
                  </span>
                `:E}
        </span>
      </button>
      ${Zr(`cron-table__schedule`,_(`cron.jobs.schedule`),Pn(e))}
      ${Zr(`cron-table__next`,_(`cron.jobs.nextRun`),s)}
      ${Zr(`cron-table__last`,_(`cron.jobs.lastRun`),ni(e))}
      ${t.canManage?w`
              <span class="cron-table__actions" @click=${e=>e.stopPropagation()}>
                <button
                  type="button"
                  class="btn btn--sm btn--ghost cron-row-run"
                  data-test-id=${`cron-row-run-${e.id}`}
                  title=${_(`cron.actions.runNowJob`,{name:n})}
                  aria-label=${_(`cron.actions.runNowJob`,{name:n})}
                  ?disabled=${t.busy}
                  @click=${()=>t.onRun(e,`force`)}
                >
                  ${S(`play`)}
                </button>
                ${i?E:si(t,e,{compact:!0,testId:`cron-row-toggle-${e.id}`})}
                ${ri(t,e)}
              </span>
            `:E}
    </div>
  `}function Zr(e,t,n){return w`<span class="cron-table__cell ${e}">
    <span class="cron-table__cell-label">${t}</span>
    <span class="cron-table__cell-value">${n}</span>
  </span>`}function Qr(e){let t=e.state?.autoDisabled,[n,r,i]=Tt(e)?[`running`,`loader`,_(`cron.runs.runStatusRunning`)]:t?[`error`,`lock`,ti(e)]:N(e)?[`error`,`alertTriangle`,_(`cron.runs.runStatusError`)]:e.enabled?[`active`,null,_(`cron.detail.active`)]:[`paused`,`pause`,_(`cron.list.paused`)];return w`<span
    class="cron-table__state cron-table__state--${n}"
    role="img"
    aria-label=${i}
    title=${i}
    >${r?S(r):w`<span class="cron-table__state-dot"></span>`}</span
  >`}function $r(){let e=_(`cron.form.triggerConfigured`);return w`<span class="cron-trigger-icon" role="img" aria-label=${e} title=${e}
    >${S(`gitBranch`)}</span
  >`}function ei(e){if(!e.state?.autoDisabled)return w`<span class="muted cron-table__paused-note">${_(`cron.list.paused`)}</span>`;let t=ti(e),n=e.state?.lastError?.trim();return w`<span
    class="cron-table__paused-note cron-table__auto-disabled"
    data-test-id=${`cron-row-auto-disabled-${e.id}`}
    title=${n?m(n):t}
    >${t}</span
  >`}function ti(e){let t=e.state?.autoDisabled;return t?_(t.reason===`schedule-errors`?`cron.list.autoDisabledScheduleErrors`:`cron.list.autoDisabledRunFailures`,{count:String(t.consecutiveErrors)}):_(`cron.list.paused`)}function ni(e){let t=vt(e),n=e.state?.lastRunAtMs,r=typeof n==`number`&&Number.isFinite(n)?h(n):null;if(t===`unknown`||!r)return w`<span class="muted">${_(`common.na`)}</span>`;let i=t===`ok`?w`<span class="cron-last-glyph cron-last-glyph--ok">${S(`check`)}</span>`:t===`error`?w`<span class="cron-last-glyph cron-last-glyph--error">${S(`x`)}</span>`:w`<span class="cron-last-glyph">${S(`cornerDownRight`)}</span>`,a=kr(t);return w`
    <span class="cron-table__last-run" role="img" aria-label=${a} title=${a}>
      ${i}
      <span class="cron-table__last-time">${r}</span>
    </span>
  `}function ri(e,t){if(!e.canManage)return E;let n=b(t.declarationKey),r=t.displayName??t.name;return w`
    <wa-dropdown
      class="cron-job-menu"
      placement="bottom-end"
      @wa-select=${r=>{if(e.canManage)switch(r.detail.item.value){case`run-if-due`:e.onRun(t,`due`);break;case`clone`:n||e.onClone(t);break;case`remove`:n||e.onRemove(t);break;case void 0:}}}
    >
      <button
        slot="trigger"
        type="button"
        class="btn btn--sm btn--ghost cron-job-menu__trigger"
        aria-label=${_(`cron.actions.moreJob`,{name:r})}
        title=${_(`cron.actions.moreJob`,{name:r})}
      >
        ${S(`moreHorizontal`)}
      </button>
      ${Z(e,`run-if-due`,_(`cron.actions.runIfDue`))}
      ${n?E:Z(e,`clone`,_(`cron.actions.clone`))}
      ${n?E:Z(e,`remove`,_(`cron.actions.remove`),{danger:!0})}
    </wa-dropdown>
  `}function ii(e){return P({title:_(`cron.suggestions.title`)},_r.map(t=>w`
        <button
          type="button"
          class="settings-row settings-row--nav cron-suggestion"
          data-suggestion=${t.id}
          @click=${()=>e.onOpenCreate(mr(t))}
        >
          <div class="settings-row__text">
            <span class="settings-row__title">
              <span aria-hidden="true">${t.emoji}</span> ${_(t.nameKey)}
            </span>
            <span class="settings-row__desc">${_(t.taglineKey)}</span>
          </div>
          <div class="settings-row__control">
            <span class="settings-row__value">${_(t.scheduleKey)}</span>
            <span class="settings-row__chevron">${x.chevronRight}</span>
          </div>
        </button>
      `))}function ai(e,t){let n=t===`job`?e.editingJob??void 0:void 0,r=t===`job`&&!!n,i=t===`job`&&e.detailTab===`history`,a=n?.trigger?{checkCount:n.state?.triggerEvalCount??0,lastCheckedAtMs:n.state?.lastTriggerEvalAtMs,lastFiredAtMs:n.state?.lastTriggerFireAtMs}:void 0,o=[w`
      <div class="cron-back-row">
        <button
          type="button"
          class="cron-back"
          data-test-id="cron-back"
          ?disabled=${e.busy}
          @click=${e.onClosePanel}
        >
          ${S(`arrowLeft`)} ${_(`cron.detail.back`)}
        </button>
      </div>
    `,oi(e,t,n),Gr(e),r?ci(e):E,e.error?w`<div class="cron-error-banner" role="alert">${e.error}</div>`:E,w`
      <div
        id="cron-detail-panel"
        class="cron-tab-panel"
        role=${r?`tabpanel`:E}
        aria-labelledby=${r?`cron-detail-tab-${e.detailTab}`:E}
      >
        ${i?P({title:_(`cron.detail.historyTitle`)},w`<div class="cron-history">
                  ${Dr({...e,conditionActivity:a})}
                </div>`):li(e,t)}
      </div>
    `];return w`
    <section class="cron-page cron-page--detail" data-panel-mode=${t}>
      ${Bt(o,{wide:!0})}
    </section>
  `}function oi(e,t,n){let r=t===`job`?n?.displayName??n?.name??e.form.name:_(`cron.detail.newTitle`),i=t===`job`?n?.description?.trim():void 0,a=b(n?.declarationKey),o=n?.state?.nextRunAtMs,s=typeof o==`number`&&Number.isFinite(o)?` · ${_(`cron.jobState.next`)} ${h(o)}`:``,c=t===`job`&&n?`${Pn(n)}${s}`:_(`cron.detail.newSubtitle`);return w`
    <div class="cron-detail-header">
      <div class="cron-detail-header__copy">
        <div class="cron-detail-title">${r}</div>
        ${i?w`<div class="cron-detail-description" data-test-id="cron-detail-description">
                <span class="cron-detail-description__label">${_(`cron.form.description`)}:</span>
                ${i}
              </div>`:E}
        <div class="cron-detail-meta">
          ${t===`job`&&n&&e.canManage&&!a?si(e,n):E}
          <span class="cron-detail-sub">${c}</span>
          ${n?.trigger?$r():E}
        </div>
      </div>
      <div class="cron-detail-actions">
        ${t===`job`&&n&&e.canManage?w`
                <button
                  type="button"
                  class="btn btn--sm"
                  data-test-id="cron-run-now"
                  ?disabled=${e.busy}
                  @click=${()=>e.onRun(n,`force`)}
                >
                  ${S(`play`)} ${_(`cron.actions.runNow`)}
                </button>
                ${ri(e,n)}
              `:E}
      </div>
    </div>
  `}function si(e,t,n){let r=t.enabled?_(`cron.detail.active`):_(`cron.detail.paused`),i=_(t.enabled?`cron.actions.pauseJob`:`cron.actions.resumeJob`,{name:t.displayName??t.name});return w`
    <span
      class="cron-enabled-toggle"
      data-test-id=${n?.testId??`cron-toggle-enabled`}
      title=${n?.compact?i:E}
    >
      ${Kt({checked:t.enabled,disabled:e.busy||!e.canManage,ariaLabel:n?.compact?i:r,onChange:n=>{e.canManage&&e.onToggle(t,n)}})}
      ${n?.compact?E:w`<span class="cron-detail-sub">${r}</span>`}
    </span>
  `}function ci(e){return Yt({id:`cron-detail`,panelId:`cron-detail-panel`,className:`cron-tabs`,variant:`sub`,active:e.detailTab,tabs:[{value:`settings`,label:_(`cron.detail.settingsTab`),testId:`cron-detail-tab-settings`},{value:`history`,label:_(`cron.detail.historyTitle`),testId:`cron-detail-tab-history`}],ariaLabel:_(`cron.detail.tabsLabel`),onSelect:e.onDetailTabChange})}function li(e,t){let n=e.form.payloadLocked,r=t===`job`&&b(e.editingJob?.declarationKey),i=!n&&e.form.payloadKind===`agentTurn`,a=e.form.sessionTarget!==`main`&&(e.form.payloadKind===`agentTurn`||n),o=e.form.deliveryMode===`announce`&&!a?`none`:e.form.deliveryMode,s=Rr(e.fieldErrors,e.form,o),c=e.canManage&&!e.busy&&s.length>0,l=c&&!e.canSubmit?s.length===1?_(`cron.form.fixFields`,{count:String(s.length)}):_(`cron.form.fixFieldsPlural`,{count:String(s.length)}):``;return w`
    <fieldset
      class="cron-editor"
      ?disabled=${e.busy||!e.canManage||r}
      aria-busy=${String(e.busy)}
    >
      ${ui(e,{payloadLocked:n,isAgentTurn:i})} ${di(e)}
      ${pi(e)}
      ${mi(e,{supportsAnnounce:a,selectedDeliveryMode:o})}
      ${hi(e,{mode:t,isAgentTurn:i,selectedDeliveryMode:o})}
      ${c?w`
              <div class="cron-form-status" role="status" aria-live="polite">
                <div class="cron-form-status__title">${_(`cron.form.cantAddYet`)}</div>
                <div class="cron-help">${_(`cron.form.fillRequired`)}</div>
                <ul class="cron-form-status__list">
                  ${s.map(e=>w`
                      <li>
                        <button
                          type="button"
                          class="cron-form-status__link"
                          @click=${()=>zr(e.inputId)}
                        >
                          ${e.label}: ${_(e.message)}
                        </button>
                      </li>
                    `)}
                </ul>
              </div>
            `:E}
      ${e.canManage&&!r?w`
              <div class="cron-editor-actions">
                <button
                  class="btn primary"
                  data-test-id="cron-submit"
                  ?disabled=${e.busy||!e.canSubmit}
                  @click=${e.onSubmit}
                >
                  ${e.busy?_(`cron.form.saving`):_(t===`job`?`cron.form.saveChanges`:`cron.form.createTask`)}
                </button>
                ${t===`create`?w`
                        <button
                          class="btn"
                          data-test-id="cron-submit-run"
                          ?disabled=${e.busy||!e.canSubmit}
                          @click=${e.onSubmitRunNow}
                        >
                          ${_(`cron.form.createAndRun`)}
                        </button>
                      `:E}
                <button class="btn" ?disabled=${e.busy} @click=${e.onClosePanel}>
                  ${_(`cron.form.cancel`)}
                </button>
                ${l?w`<div class="cron-submit-reason" aria-live="polite">
                        ${l}
                      </div>`:E}
              </div>
            `:E}
    </fieldset>
  `}function Z(e,t,n,r){return w`
    <wa-dropdown-item
      class=${r?.danger?`cron-job-menu__item danger`:`cron-job-menu__item`}
      value=${t}
      variant=${r?.danger?`danger`:`default`}
      ?disabled=${e.busy||!e.canManage}
    >
      ${n}
    </wa-dropdown-item>
  `}function ui(e,t){let n=e.form.payloadKind===`script`?_(`cron.form.script`):e.form.payloadKind===`heartbeat`?`Heartbeat monitor`:e.form.payloadKind===`agentTurn`?_(`cron.form.assistantTaskPrompt`):_(`cron.form.command`),r=t.payloadLocked?n:e.form.payloadKind===`systemEvent`?_(`cron.form.mainTimelineMessage`):_(`cron.form.assistantTaskPrompt`),i=t.payloadLocked?_(`cron.form.readOnlyPayloadHelp`):e.form.payloadKind===`systemEvent`?_(`cron.form.systemEventHelp`):_(`cron.form.agentTurnHelp`),a=t.payloadLocked?yi[e.form.payloadKind]:``,o=e.form.payloadKind===`heartbeat`?e.heartbeatScratch:e.form.payloadText,s=q({label:r,controlId:a?``:`cron-payload-text`,required:!0,help:i,stacked:!0,wide:!0,error:e.fieldErrors.payloadText,errorId:G(`payloadText`),control:a?w`
          <pre
            id="cron-payload-text"
            class="code-block cron-payload-code"
            data-test-id="cron-payload-code"
            tabindex="0"
            role="region"
            aria-label=${r}
          ><code class="hljs">${Pe(Wt(o,a))}</code></pre>
        `:w`
          <textarea
            id="cron-payload-text"
            class="settings-input"
            rows="6"
            .value=${o}
            ?readonly=${t.payloadLocked}
            aria-required="true"
            placeholder=${_(`cron.form.promptPlaceholder`)}
            aria-invalid=${e.fieldErrors.payloadText?`true`:`false`}
            aria-describedby=${T(e.fieldErrors.payloadText?G(`payloadText`):void 0)}
            @input=${t=>e.onFormChange({payloadText:t.target.value})}
          ></textarea>
        `}),l=_(`cron.form.action`),u=t.payloadLocked?q({label:l,controlId:K(`payloadKind`),control:w`
          <input
            id=${K(`payloadKind`)}
            class="settings-input"
            .value=${n}
            readonly
          />
        `}):Y(e,`payloadKind`,{label:l,options:[{value:`systemEvent`,label:_(`cron.form.systemEvent`)},{value:`agentTurn`,label:_(`cron.form.agentTurn`)}]}),d=_(`cron.form.model`),f=e.fieldErrors.payloadModel,p=c(e.modelSuggestions).map(e=>({value:e,label:e,provider:Ht(e)??void 0})),ee=t.isAgentTurn?w`
        ${q({label:d,controlId:``,help:_(`cron.form.modelHelp`),error:f,errorId:G(`payloadModel`),control:An({id:`cron-payload-model-picker`,label:d,value:e.form.payloadModel,options:[{value:``,label:_(`quickSettings.model.default`)},...p],custom:{id:K(`payloadModel`),label:_(`cron.form.customModel`),placeholder:_(`cron.form.modelPlaceholder`),invalid:!!f,describedBy:f?G(`payloadModel`):void 0},onChange:t=>e.onFormChange({payloadModel:t})})})}
        ${J(e,`payloadThinking`,{label:_(`cron.form.thinking`),help:_(`cron.form.thinkingHelp`),errorKey:`payloadThinking`,describeError:!1,list:`cron-thinking-suggestions`,placeholder:_(`cron.form.thinkingPlaceholder`)})}
      `:E;return P({},w`${s}${u}${ee}`)}function di(e){let t=e.form.sessionTarget,n=t===`main`||t===`isolated`;return P({title:_(`cron.detail.generalSection`)},w`
      ${J(e,`name`,{label:_(`cron.form.fieldName`),required:!0,errorKey:`name`,placeholder:_(`cron.form.namePlaceholder`)})}
      ${J(e,`agentId`,{label:_(`cron.form.agentId`),help:_(`cron.form.agentHelp`),list:`cron-agent-suggestions`,disabled:e.form.clearAgent,placeholder:_(`cron.form.agentPlaceholder`)})}
      ${Y(e,`sessionTarget`,{label:_(`cron.form.runsIn`),help:_(`cron.form.sessionHelp`),options:[{value:`main`,label:_(`cron.form.mainSession`)},{value:`isolated`,label:_(`cron.form.isolatedSession`)},...n?[]:[{value:t,label:t}]]})}
    `)}function fi(e){if(e.scheduleKind===`every`){let t=e.everyAmount.trim();if(Ve(t,e.everyUnit)===void 0)return null;let[n,r]=bi[e.everyUnit];return Number(t)===1?_(n):_(r,{amount:t})}if(e.scheduleKind===`at`){let t=Date.parse(e.scheduleAt);return Number.isFinite(t)?_(`cron.form.summaryOnce`,{at:ne(t)}):null}if(e.scheduleKind===`cron`){let t=e.cronExpr.trim();if(!t)return null;let n=e.cronTz.trim();return n?_(`cron.form.summaryCronTz`,{expr:t,tz:n}):_(`cron.form.summaryCron`,{expr:t})}return e.scheduleKind===`on-exit`?_(`cron.form.repeatOnExit`):e.scheduleKind===`stream`?_(`cron.form.repeatStream`):null}function pi(e){let t=e.form,n=t.scheduleKind===`on-exit`,r=t.scheduleKind===`stream`,i=n?{value:`on-exit`,label:_(`cron.form.repeatOnExit`)}:r?{value:`stream`,label:_(`cron.form.repeatStream`)}:null,a=[...i?[{...i,testId:`cron-schedule-kind-${i.value}`}]:[],{value:`every`,label:_(`cron.form.repeatInterval`),testId:`cron-schedule-kind-every`},{value:`at`,label:_(`cron.form.repeatOnce`),testId:`cron-schedule-kind-at`},{value:`cron`,label:_(`cron.form.cronOption`),testId:`cron-schedule-kind-cron`}],o=fi(t);return P({title:_(`cron.detail.scheduleSection`)},w`
      ${Gt({title:_(`cron.form.repeat`),description:n?_(`cron.form.onExitHelp`):void 0,stacked:!0,control:en({value:t.scheduleKind,options:a,ariaLabel:_(`cron.form.repeat`),onChange:n=>e.onFormChange({scheduleKind:n,...n===`at`&&(t.scheduleKind===`every`||t.scheduleKind===`cron`)?{deleteAfterRun:!0}:n===`every`||n===`cron`?{deleteAfterRun:!1}:{}})})})}
      ${t.scheduleKind===`at`?J(e,`scheduleAt`,{label:_(`cron.form.runAt`),required:!0,errorKey:`scheduleAt`,type:`datetime-local`}):E}
      ${t.scheduleKind===`every`?q({label:_(`cron.form.every`),controlId:`cron-every-amount`,required:!0,error:e.fieldErrors.everyAmount,errorId:G(`everyAmount`),control:w`
                <div class="cron-inline-controls">
                  ${Hr(e,`everyAmount`,{label:_(`cron.form.every`),required:!0,errorKey:`everyAmount`,placeholder:_(`cron.form.everyAmountPlaceholder`)})}
                  ${Ur(e,`everyUnit`,{label:_(`cron.form.unit`),standalone:!0,options:[{value:`seconds`,label:_(`cron.form.seconds`)},{value:`minutes`,label:_(`cron.form.minutes`)},{value:`hours`,label:_(`cron.form.hours`)},{value:`days`,label:_(`cron.form.days`)}]})}
                </div>
              `}):E}
      ${t.scheduleKind===`cron`?w`
              ${J(e,`cronExpr`,{label:_(`cron.form.expression`),required:!0,errorKey:`cronExpr`,mono:!0,placeholder:_(`cron.form.expressionPlaceholder`)})}
              ${J(e,`cronTz`,{label:_(`cron.form.timezoneOptional`),help:_(`cron.form.timezoneHelp`),list:`cron-tz-suggestions`,placeholder:_(`cron.form.timezonePlaceholder`)})}
            `:E}
      ${o?w` <div class="cron-schedule-summary">${S(`clock`)}<span>${o}</span></div> `:E}
    `)}function mi(e,t){let n=Ir(e);return P({title:_(`cron.detail.deliverySection`)},w`
      ${Y(e,`deliveryMode`,{label:_(`cron.form.deliveryModeLabel`),help:_(`cron.form.deliveryHelp`),value:t.selectedDeliveryMode,options:[...t.supportsAnnounce?[{value:`announce`,label:_(`cron.form.announceDefault`)}]:[],{value:`webhook`,label:_(`cron.form.webhookPost`)},{value:`none`,label:_(`cron.form.noneInternal`)}]})}
      ${t.selectedDeliveryMode===`announce`?w`
              ${Y(e,`deliveryChannel`,{label:_(`cron.form.channel`),help:_(`cron.form.channelHelp`),value:e.form.deliveryChannel||`last`,options:n,channel:!0})}
              ${J(e,`deliveryTo`,{label:_(`cron.form.to`),help:_(`cron.form.toHelp`),list:`cron-delivery-to-suggestions`,placeholder:_(`cron.form.toPlaceholder`)})}
            `:E}
      ${t.selectedDeliveryMode===`webhook`?J(e,`deliveryTo`,{label:_(`cron.form.webhookUrl`),required:!0,help:_(`cron.form.webhookHelp`),errorKey:`deliveryTo`,list:`cron-delivery-to-suggestions`,placeholder:_(`cron.form.webhookPlaceholder`)}):E}
    `)}function hi(e,t){let n=e.form.scheduleKind===`cron`,r=Ir(e);return w`
    <section class="settings-section">
      <details class="cron-advanced">
        <summary class="settings-section__heading cron-advanced__summary">
          ${_(`cron.form.advanced`)}
          ${e.form.triggerEnabled?w`<span class="cron-trigger-summary">
                  ${S(`gitBranch`)} ${_(`cron.form.triggerConfigured`)}
                </span>`:E}
        </summary>
        <p class="settings-section__desc">${_(`cron.form.advancedHelp`)}</p>
        <div class="settings-group">
          ${gi(e)}
          ${J(e,`description`,{label:_(`cron.form.description`),placeholder:_(`cron.form.descriptionPlaceholder`)})}
          ${t.mode===`create`?X(e,`enabled`,{label:_(`cron.form.startEnabled`)}):E}
          ${Y(e,`wakeMode`,{label:_(`cron.form.wakeMode`),help:_(`cron.form.wakeModeHelp`),options:[{value:`now`,label:_(`cron.form.now`)},{value:`next-heartbeat`,label:_(`cron.form.nextHeartbeat`)}]})}
          ${t.isAgentTurn?J(e,`timeoutSeconds`,{label:_(`cron.form.timeoutSeconds`),help:_(`cron.form.timeoutHelp`),errorKey:`timeoutSeconds`,placeholder:_(`cron.form.timeoutPlaceholder`)}):E}
          ${e.form.scheduleKind===`at`||e.form.scheduleKind===`on-exit`?X(e,`deleteAfterRun`,{label:_(`cron.form.deleteAfterRun`),help:_(`cron.form.deleteAfterRunHelp`)}):E}
          ${X(e,`clearAgent`,{label:_(`cron.form.clearAgentOverride`),help:_(`cron.form.clearAgentHelp`)})}
          ${J(e,`sessionKey`,{label:_(`cron.form.sessionKey`),help:_(`cron.form.sessionKeyHelp`),placeholder:`agent:main:main`})}
          ${n?w`
                  ${X(e,`scheduleExact`,{label:_(`cron.form.exactTiming`),help:_(`cron.form.exactTimingHelp`)})}
                  ${q({label:_(`cron.form.staggerWindow`),controlId:`cron-stagger-amount`,error:e.fieldErrors.staggerAmount,errorId:G(`staggerAmount`),control:w`
                      <div class="cron-inline-controls">
                        ${Hr(e,`staggerAmount`,{label:_(`cron.form.staggerWindow`),disabled:e.form.scheduleExact,errorKey:`staggerAmount`,placeholder:_(`cron.form.staggerPlaceholder`)})}
                        ${Ur(e,`staggerUnit`,{label:_(`cron.form.staggerUnit`),standalone:!0,disabled:e.form.scheduleExact,options:[{value:`seconds`,label:_(`cron.form.seconds`)},{value:`minutes`,label:_(`cron.form.minutes`)}]})}
                      </div>
                    `})}
                `:E}
          ${t.isAgentTurn?w`
                  ${J(e,`deliveryAccountId`,{label:_(`cron.form.accountId`),help:_(`cron.form.accountIdHelp`),list:`cron-delivery-account-suggestions`,disabled:t.selectedDeliveryMode!==`announce`,placeholder:`default`})}
                  ${X(e,`payloadLightContext`,{label:_(`cron.form.lightContext`),help:_(`cron.form.lightContextHelp`)})}
                  ${_i(e,r)}
                `:E}
          ${t.selectedDeliveryMode===`none`?E:X(e,`deliveryBestEffort`,{label:_(`cron.form.bestEffortDelivery`),help:_(`cron.form.bestEffortHelp`)})}
        </div>
      </details>
    </section>
  `}function gi(e){let t=e.form.payloadKind===`script`;return!t&&e.status===null?E:e.status?.triggersEnabled!==!0||t?Gt({title:_(`cron.form.conditionTrigger`),description:t?_(`cron.errors.triggerScriptPayloadUnsupported`):e.form.triggerEnabled?_(`cron.form.triggerDisabledConfigured`):_(`cron.form.triggerDisabled`),control:e.form.triggerEnabled?w`<button
            type="button"
            class="btn btn--sm"
            @click=${()=>e.onFormChange({triggerEnabled:!1})}
          >
            ${_(`cron.form.clearTrigger`)}
          </button>`:E}):w`
    ${X(e,`triggerEnabled`,{label:_(`cron.form.conditionTrigger`),help:_(`cron.form.conditionTriggerHelp`)})}
    ${e.form.triggerEnabled?w`
            ${q({label:_(`cron.form.triggerScript`),controlId:`cron-trigger-script`,required:!0,help:_(`cron.form.triggerScriptHelp`),error:e.fieldErrors.triggerScript,errorId:G(`triggerScript`),stacked:!0,wide:!0,control:w`<textarea
                id="cron-trigger-script"
                class="settings-input cron-trigger-script mono"
                rows="8"
                spellcheck="false"
                aria-invalid=${e.fieldErrors.triggerScript?`true`:`false`}
                aria-describedby=${T(e.fieldErrors.triggerScript?G(`triggerScript`):void 0)}
                .value=${e.form.triggerScript}
                @input=${t=>{let n=t.currentTarget;n instanceof HTMLTextAreaElement&&e.onFormChange({triggerScript:n.value})}}
              ></textarea>`})}
            ${X(e,`triggerOnce`,{label:_(`cron.form.triggerOnce`),help:_(`cron.form.triggerOnceHelp`)})}
          `:E}
  `}function _i(e,t){return w`
    ${Y(e,`failureAlertMode`,{label:_(`cron.form.failureAlerts`),help:_(`cron.form.failureAlertsHelp`),options:[{value:`inherit`,label:_(`cron.form.failureAlertInherit`)},{value:`disabled`,label:_(`cron.form.failureAlertDisabled`)},{value:`custom`,label:_(`cron.form.failureAlertCustom`)}]})}
    ${e.form.failureAlertMode===`custom`?w`
            ${J(e,`failureAlertAfter`,{label:_(`cron.form.failureAlertAfter`),help:_(`cron.form.failureAlertAfterHelp`),errorKey:`failureAlertAfter`,placeholder:_(`cron.form.failureAlertInherit`)})}
            ${J(e,`failureAlertCooldownSeconds`,{label:_(`cron.form.failureAlertCooldown`),help:_(`cron.form.failureAlertCooldownHelp`),errorKey:`failureAlertCooldownSeconds`,placeholder:_(`cron.form.failureAlertInherit`)})}
            ${Y(e,`failureAlertChannel`,{label:_(`cron.form.failureAlertChannel`),value:e.form.failureAlertChannel||`last`,options:t,channel:!0})}
            ${J(e,`failureAlertTo`,{label:_(`cron.form.failureAlertTo`),help:_(`cron.form.failureAlertToHelp`),list:`cron-failure-alert-to-suggestions`,placeholder:_(`cron.form.failureAlertToPlaceholder`)})}
            ${Y(e,`failureAlertDeliveryMode`,{label:_(`cron.form.failureAlertMode`),options:[{value:``,label:_(`cron.form.failureAlertInherit`)},{value:`announce`,label:_(`cron.form.failureAlertAnnounce`)},{value:`webhook`,label:_(`cron.form.failureAlertWebhook`)}]})}
            ${J(e,`failureAlertAccountId`,{label:_(`cron.form.failureAlertAccountId`),placeholder:_(`cron.form.failureAlertAccountPlaceholder`)})}
          `:E}
  `}var Q,vi,yi,bi;function xi(){return(xi=e((()=>{t(),D(),Ae(),Fe(),Ie(),ye(),kn(),Tn(),Nn(),Qt(),C(),Lt(),jn(),Rt(),Ut(),Oe(),Jt(),Xt(),y(),I(),at(),v(),ie(),Fn(),vr(),xr(),Nr(),Fr(),F(),Q={name:`cron.form.fieldName`,scheduleAt:`cron.form.runAt`,everyAmount:`cron.form.every`,cronExpr:`cron.form.expression`,staggerAmount:`cron.form.staggerWindow`,triggerScript:`cron.form.triggerScript`,payloadText:`cron.form.assistantTaskPrompt`,payloadModel:`cron.form.model`,payloadThinking:`cron.form.thinking`,timeoutSeconds:`cron.form.timeoutSeconds`,deliveryTo:`cron.form.to`,failureAlertAfter:`cron.form.failureAlertAfter`,failureAlertCooldownSeconds:`cron.form.failureAlertCooldown`},vi=[{value:`all`,labelKey:`cron.tabs.all`},{value:`enabled`,labelKey:`cron.tabs.active`},{value:`disabled`,labelKey:`cron.tabs.paused`}],yi={script:`javascript`,command:`bash`,heartbeat:``,systemEvent:``,agentTurn:``},bi={seconds:[`cron.form.summaryEverySecondOne`,`cron.form.summaryEverySeconds`],minutes:[`cron.form.summaryEveryMinuteOne`,`cron.form.summaryEveryMinutes`],hours:[`cron.form.summaryEveryHourOne`,`cron.form.summaryEveryHours`],days:[`cron.form.summaryEveryDayOne`,`cron.form.summaryEveryDays`]}})))()}var $,Si;function Ci(){return(Ci=e((()=>{n(),D(),Ne(),Te(),Se(),ke(),xe(),Ln(),an(),Xt(),Dn(),y(),I(),he(),rt(),ct(),v(),pe(),Mt(),jt(),ce(),se(),Un(),Gn(),$n(),L(),pr(),xi(),F(),$=class extends fe{constructor(){super(),this.routeSearch=``,this.cron=We(),this.agentsList=null,this.cronModelSuggestions=[],this.modelSuggestionsError=null,this.listTab=`tasks`,this.detailTab=`settings`,this.heartbeatScratch=``,this.runTranscript=new fr(this,()=>{let e=this.gateway.capture(),t=this.cron;return e?{client:e.client,epoch:this.gateway.epoch,isCurrent:()=>this.gateway.isCurrent(e)&&this.cron===t}:null}),this.pendingRouteData=null,this.routeJobRequested=!1,this.highlightedRunId=null,this.pendingRunScroll=!1,this.modelSuggestionsRequest=null,this.deliveryDirectory=new Hn({currentCronState:()=>this.cron,canManage:()=>this.canManageCron,captureConnection:()=>this.gateway.capture(),isCurrentConnection:e=>this.gateway.isCurrent(e),notify:e=>this.requestCronUpdate(e)}),this.heartbeatScratchRequest=0,this.pageHidden=document.visibilityState===`hidden`,this.gateway=new kt(this,{getGateway:()=>this.context?.gateway,invalidateRequests:e=>this.resetGatewayState(e.snapshot),onSnapshot:e=>{e.initial?this.resetGatewayState(e.snapshot):De(e.snapshot).canAdmin||(this.clearHeartbeatScratch(),this.deliveryDirectory.clear())},ensureInitialData:()=>this.ensureInitialData(),onPageActivation:()=>{let e=document.visibilityState===`hidden`,t=this.pageHidden&&!e;this.pageHidden=e,t&&this.ensureInitialData(!0)}}),this.observeAgentScope=nt(e=>{this.pendingRouteData=null,this.resetGatewayState(this.context.gateway.snapshot),this.cron.cronAgentId=e,this.listTab=`tasks`,this.detailTab=`settings`,this.ensureInitialData(),this.requestUpdate()}),this.subscriptions=new de(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),()=>this.syncAgentsState()).watch(()=>this.context?.channels,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.connected&&this.gateway.client&&(t.event===`cron`?this.refreshCron({tableFilters:!0,coalesce:!0}):d(t)&&this.loadModelSuggestions(this.cron))})),this.lastPanelKey=null,new Wn(this)}get canManageCron(){return De(this.context.gateway.snapshot).canAdmin}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}resetGatewayState(e){this.runTranscript.close(),this.clearHeartbeatScratch(),St(this.cron);let t=e?.phase===`connected`,n=We({client:e?.client??null,connected:t});n.canRefresh=()=>this.canRefreshCron(n),this.cron=n,n.cronSessionFilter=er(this.routeSearch).session,this.routeJobRequested=!1,this.pageHidden=document.visibilityState===`hidden`,this.cron.cronAgentId=this.context.agentSelection.state.scopeId,this.agentsList=t?this.context.agents.state.agentsList:null,this.cronModelSuggestions=[],this.deliveryDirectory.retireEditor(),this.modelSuggestionsError=null,this.modelSuggestionsRequest=null}syncAgentsState(){this.agentsList=this.context.agents.state.agentsList}canRefreshCron(e=this.cron){return this.isConnected&&this.cron===e&&document.visibilityState!==`hidden`}ensureInitialData(e=!1){this.canRefreshCron()&&this.cron.connected&&this.cron.client&&(!this.agentsList&&!this.context.agents.state.agentsLoading&&this.context.agents.ensureList(),e||!this.cron.cronStatus&&!this.cron.cronLoading?this.refreshCron({tableFilters:!0,coalesce:!0}):!this.cron.cronRuns.length&&!this.cron.cronRunsLoadingMore&&this.loadRuns(),this.modelSuggestionsRequest?.state!==this.cron&&this.loadModelSuggestions(this.cron))}requestCronUpdate(e=this.cron){this.cron===e&&this.requestUpdate()}willUpdate(e){if(e.has(`routeSearch`)){this.runTranscript.close(),this.cron.cronError=null;let e=er(this.routeSearch);JSON.stringify(this.cron.cronSessionFilter)!==JSON.stringify(e.session)&&(this.resetGatewayState(this.context.gateway.snapshot),this.ensureInitialData()),this.listTab=`tasks`,this.detailTab=`settings`,this.pendingRouteData=e.jobId||e.session?e:null,this.routeJobRequested=!1,this.highlightedRunId=null,this.pendingRunScroll=!1}let t=this.cron.cronEditingJob?.id??null,n=`${t?`job`:this.cron.cronCreateOpen?`create`:`overview`}:${t??``}`;if(n!==this.lastPanelKey){this.lastPanelKey=n,this.runTranscript.close(),this.detailTab=t&&this.highlightedRunId?`history`:`settings`;let e=this.closest(`.content`);e instanceof HTMLElement&&typeof e.scrollTo==`function`&&e.scrollTo({top:0})}}updated(){let e=this.pendingRouteData,t=this.cron.client;if(e?.session&&this.cron.cronJobsSnapshotRevision&&!this.cron.cronLoading){this.pendingRouteData=null;let[e]=this.cron.cronJobs;this.cron.cronJobsTotal===1&&e&&this.selectJob(e)}if(e?.jobId&&t&&this.cron.connected&&!this.routeJobRequested&&(this.routeJobRequested=!0,this.runCronTask(async n=>{let r=()=>this.isConnected&&this.cron===n&&this.pendingRouteData===e;try{let n=await t.request(`cron.get`,{id:e.jobId});r()&&this.selectJob(n,e.runId)}catch(e){r()&&(this.pendingRouteData=null,n.cronError=p(e))}})),this.pendingRunScroll){let e=this.querySelector(`.cron-run-entry--highlighted`);e&&(e.scrollIntoView?.({block:`nearest`}),this.pendingRunScroll=!1)}}async refreshCron(e){let t=this.cron;this.canRefreshCron(t)&&t.connected&&t.client&&(this.loadRuns(e.coalesce),this.context.channels.refresh(!1),await Promise.all([this.runCronTask(t=>He(t,e)),this.runCronTask(t=>M(t,{tableFilters:e.tableFilters}))]))}loadRuns(e=!1){return this.runCronTask(t=>j(t,{coalesce:e}))}async loadModelSuggestions(e){let t=e.client,n=this.context.agentSelection.state.selectedId;if(!t||!e.connected||!n)return;let r={state:e,agentId:n};this.modelSuggestionsRequest=r;let i=()=>this.cron===e&&this.modelSuggestionsRequest===r&&this.context.agentSelection.state.selectedId===n;try{let e=await gt(t,{agentId:n});i()&&(this.cronModelSuggestions=e.models.filter(e=>e.manualSelectionAllowed!==!1).map(e=>e.id),this.modelSuggestionsError=wt(e))}catch(e){i()&&(this.modelSuggestionsError=p(e))}}async runCronTask(e){let t=this.cron;try{let n=e(t);return this.requestCronUpdate(t),await n}finally{this.requestCronUpdate(t)}}runCronAdminTask(e){this.canManageCron&&this.runCronTask(e)}patchForm(e){if(!this.canManageCron)return;let t=this.cron.cronForm,n=Rn(t,e),r=xt({...this.cron.cronForm,...n},n);this.cron.cronForm=r,this.cron.cronFieldErrors=It(this.cron.cronForm),zn(t,r)&&this.deliveryDirectory.load(),this.requestCronUpdate()}selectJob(e,t=null){this.clearHeartbeatScratch(),this.pendingRouteData=null,this.highlightedRunId=t,this.pendingRunScroll=!!t,t&&(this.detailTab=`history`),this.cron.cronCreateOpen=!1,Ye(this.cron,e),this.deliveryDirectory.openEditor(),this.requestCronUpdate(),e.payload?.kind===`heartbeat`&&this.loadHeartbeatScratch(this.cron,e.id,this.heartbeatScratchRequest),this.runCronTask(async t=>{A(t,{cronRunsScope:`job`}),t.cronRunsJobId=e.id,await j(t)})}clearHeartbeatScratch(){this.heartbeatScratchRequest+=1,this.heartbeatScratch=``}async loadHeartbeatScratch(e,t,n){let r=e.client;if(!this.canManageCron||!r||!e.connected)return;let i=this.gateway.capture();if(!i)return;let a=()=>this.cron===e&&this.heartbeatScratchRequest===n&&this.gateway.isCurrent(i)&&this.canManageCron&&e.cronEditingJob?.id===t&&e.cronForm.payloadKind===`heartbeat`;try{let e=await r.request(`cron.scratch.get`,{id:t});a()&&(this.heartbeatScratch=e.scratch?.content??``)}catch(t){a()&&(e.cronError=p(t),this.requestCronUpdate(e))}}openCreate(e){if(this.canManageCron){if(this.clearHeartbeatScratch(),this.pendingRouteData=null,this.deliveryDirectory.retireEditor(),st(this.cron,this.context.agentSelection.state.selectedId),this.cron.cronCreateOpen=!0,e){this.patchForm(e);return}this.requestCronUpdate()}}cloneJob(e){this.canManageCron&&(this.clearHeartbeatScratch(),this.pendingRouteData=null,Ge(this.cron,e),this.cron.cronCreateOpen=!0,this.deliveryDirectory.openEditor(),this.requestCronUpdate())}async removeJob(e){let t=this.context,n=this.cron,r=this.gateway.capture(),i=this.canManageCron,a=n.cronEditingJob?.id===e.id?n.cronEditingJob:n.cronJobs.find(t=>t.id===e.id&&t.updatedAtMs===e.updatedAtMs);if(!r||!i||!a)return;let o=a.id,s=a.updatedAtMs,c=a.name,l=await qt({title:_(`cron.actions.removeConfirmTitle`,{name:c}),message:_(`cron.actions.removeConfirmMessage`),confirmLabel:_(`cron.actions.remove`),danger:!0}),u=n.cronEditingJob?.id===o?n.cronEditingJob:n.cronJobs.find(e=>e.id===o);if(!l||this.context!==t||this.cron!==n||!this.gateway.isCurrent(r)||!this.canManageCron||!u||u.updatedAtMs!==s)return;let d=this.deliveryDirectory.generation;await this.runCronTask(async e=>{let t=e.cronEditingJob?.id===o;await et(e,u),t&&e.cronEditingJob?.id!==o&&this.deliveryDirectory.retireExitedEditor(e,r,d),e.cronRunsScope===`job`&&e.cronRunsJobId===null&&(A(e,{cronRunsScope:`all`}),await j(e))})}closePanel(){this.clearHeartbeatScratch(),this.pendingRouteData=null,this.deliveryDirectory.retireEditor(),st(this.cron,this.context.agentSelection.state.selectedId),this.cron.cronCreateOpen=!1,this.requestCronUpdate(),this.runCronTask(async e=>{A(e,{cronRunsScope:`all`}),e.cronRunsJobId=null,await j(e)})}submitForm(e={}){let t=this.gateway.capture(),n=this.deliveryDirectory.generation;this.runCronAdminTask(async r=>{let i=!!r.cronEditingJob,a=await Nt(r);if(!a.saved){this.deliveryDirectory.reconcileRoute(r,t,n);return}let o=i||!!r.cronEditingJob;this.deliveryDirectory.afterSave(r,t,n,o),!o&&(e.runNow&&a.jobId&&await it(r,a.jobId,`force`),r.cronCreateOpen=!1,r.cronRunsScope===`job`&&(A(r,{cronRunsScope:`all`}),r.cronRunsJobId=null,await j(r)))})}render(){let e=this.context.channels.state,t=Zn({channels:e,runtimeConfig:this.context.runtimeConfig.state,cron:this.cron,agentsList:this.agentsList,modelSuggestions:this.cronModelSuggestions,conversationTargets:Xn(this.deliveryDirectory.conversations,this.cron.cronForm.deliveryAccountId)}),n=this.canManageCron;return w`
      ${zt({title:be(`cron`),subtitle:this.cron.cronSessionFilter?_(`cron.list.sessionFilter`):we(`cron`),actions:this.cron.cronSessionFilter?w`<a
              class="btn"
              href=${Ce(`cron`,this.context.basePath)}
              @click=${e=>{oe(e)&&(e.preventDefault(),this.context.navigate(`cron`,{search:``}))}}
              >${_(`cron.list.showAll`)}</a
            >`:In({agents:this.agentsList?.agents??[],selection:this.context.agentSelection})})}
      ${this.runTranscript.render()}
      ${En(Wr({loading:this.cron.cronLoading,hasLoaded:this.cron.cronJobsSnapshotRevision!==null,listError:this.cron.cronJobsError,canManage:n,status:this.cron.cronStatus,jobs:this.cron.cronJobs,jobsLoadingMore:this.cron.cronJobsLoadingMore,jobsTotal:this.cron.cronJobsTotal,jobsHasMore:this.cron.cronJobsHasMore,jobsQuery:this.cron.cronJobsQuery,jobsEnabledFilter:this.cron.cronJobsEnabledFilter,jobsScheduleKindFilter:this.cron.cronJobsScheduleKindFilter,jobsLastStatusFilter:this.cron.cronJobsLastStatusFilter,jobsTriggerFilter:this.cron.cronJobsTriggerFilter,jobsSortBy:this.cron.cronJobsSortBy,jobsSortDir:this.cron.cronJobsSortDir,editingJob:this.cron.cronEditingJob,createOpen:this.cron.cronCreateOpen,listTab:this.listTab,detailTab:this.detailTab,error:this.cron.cronError??this.cron.cronRunsError??this.deliveryDirectory.error??this.modelSuggestionsError,busy:this.cron.cronBusy,form:this.cron.cronForm,heartbeatScratch:n?this.heartbeatScratch:``,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(e=>e.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runs:this.cron.cronRuns,runsState:Je(this.cron),highlightedRunId:this.highlightedRunId,runsHasMore:this.cron.cronRunsHasMore,runsLoadingMore:this.cron.cronRunsLoadingMore,runsStatuses:this.cron.cronRunsStatuses,runsDeliveryStatuses:this.cron.cronRunsDeliveryStatuses,runsQuery:this.cron.cronRunsQuery,runsSortDir:this.cron.cronRunsSortDir,fieldErrors:this.cron.cronFieldErrors,canSubmit:!Ue(this.cron.cronFieldErrors),agentSuggestions:t.agentSuggestions,modelSuggestions:t.modelSuggestions,thinkingSuggestions:Qn,timezoneSuggestions:t.timezoneSuggestions,deliveryToSuggestions:t.deliveryToSuggestions,failureAlertToSuggestions:t.failureAlertToSuggestions,accountSuggestions:t.accountTargets,onListTabChange:e=>{this.listTab=e},onDetailTabChange:e=>{this.detailTab=e},onFormChange:e=>this.patchForm(e),onRefresh:()=>void this.refreshCron({tableFilters:!0}),onSubmit:()=>this.submitForm(),onSubmitRunNow:()=>this.submitForm({runNow:!0}),onSelectJob:e=>this.selectJob(e),onOpenCreate:e=>this.openCreate(e),onClosePanel:()=>this.closePanel(),onClone:e=>this.cloneJob(e),onToggle:(e,t)=>this.runCronAdminTask(n=>Qe(n,e,t)),onRun:(e,t)=>this.runCronAdminTask(n=>it(n,e.id,t??`force`)),onRemove:e=>void this.removeJob(e),onLoadMoreJobs:()=>void this.runCronTask(e=>M(e,{append:!0,tableFilters:!0})),onJobsFiltersChange:e=>void this.runCronTask(async t=>{ot(t,e),await M(t,{append:!1,tableFilters:!0})}),onJobsFiltersReset:()=>void this.runCronTask(async e=>{ot(e,{cronJobsScheduleKindFilter:`all`,cronJobsLastStatusFilter:`all`,cronJobsTriggerFilter:`all`,cronJobsSortBy:`nextRunAtMs`,cronJobsSortDir:`asc`}),await M(e,{append:!1,tableFilters:!0})}),onLoadMoreRuns:()=>void this.runCronTask(e=>qe(e)),onRunsFiltersChange:e=>void this.runCronTask(async t=>{A(t,e),await j(t)}),onViewRunTranscript:(e,t)=>void this.runTranscript.open(e,t)}))}
    `}},l([u({context:Ee,subscribe:!0})],$.prototype,`context`,void 0),l([Le({attribute:!1})],$.prototype,`routeSearch`,void 0),l([k()],$.prototype,`cron`,void 0),l([k()],$.prototype,`agentsList`,void 0),l([k()],$.prototype,`cronModelSuggestions`,void 0),l([k()],$.prototype,`modelSuggestionsError`,void 0),l([k()],$.prototype,`listTab`,void 0),l([k()],$.prototype,`detailTab`,void 0),l([k()],$.prototype,`heartbeatScratch`,void 0),Si={header:!0,render:e=>w`<openclaw-cron-page
    .routeSearch=${typeof e==`string`?e:``}
  ></openclaw-cron-page>`},customElements.get(`openclaw-cron-page`)||customElements.define(`openclaw-cron-page`,$)})))()}Ci();export{Si as cronPageComponent};