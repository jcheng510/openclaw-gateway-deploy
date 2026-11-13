const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./input-dialog-BFYyIfPn.js","./input-dialog-CLHItaSF.js","./control-ui-core-D-VUH4Gq.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Br as n,Da as r,Tr as i,eo as a,et as o,hi as s,qr as c,ro as l,vi as u,zi as d,zr as f}from"./control-ui-foundation-C3MHh_P-.js";import{$c as p,Ar as m,Fo as h,Gl as g,Gr as _,M as v,Ms as y,N as ee,No as b,Pc as te,Qc as x,R as S,Su as C,T as ne,Ul as re,Wl as w,Zc as ie,an as ae,bc as oe,bs as se,cc as ce,cr as le,dl as T,ei as ue,fl as de,hc as fe,hl as E,hu as D,il as pe,iu as me,jr as he,ks as ge,lu as _e,nl as O,on as ve,ql as k,ru as ye,sc as be,su as xe,uu as A,vc as Se,wl as Ce,xc as j,yc as we,zi as Te}from"./control-ui-core-pYNj5S1a.js";import{Ma as Ee,Xi as M,Zi as N,hi as De,ja as Oe,mi as ke,va as Ae,vi as je,wi as P,yi as Me}from"./control-ui-core-D6clmJs8.js";import{$ as F,F as Ne,M as Pe,X as I,Y as L,ct as R,nt as Fe,ut as Ie}from"./lit-runtime-DZL1fcCI.js";import{d as Le,l as Re}from"./gateway-runtime-iOL78mIi.js";import{$r as ze,B as Be,Ci as Ve,G as He,H as Ue,Ii as We,Io as Ge,Ji as Ke,K as qe,Li as Je,Mi as Ye,Ni as Xe,Nl as Ze,Qr as Qe,Ri as $e,Ti as et,U as tt,Vo as nt,Xi as rt,aa as z,an as it,ca as B,dl as at,ea as ot,in as V,nn as st,no as ct,oo as lt,ra as ut,ro as dt,so as ft,ul as pt,vo as H,yo as mt}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as ht,R as gt,z as _t}from"./control-ui-boot-shared-D-LYw3KU.js";import{At as U,Et as vt,Mt as W,To as G,Xi as yt,Xt as bt,Ya as xt,Zt as St,_t as K,ai as Ct,bi as wt,ii as Tt,it as Et,jt as Dt,rt as Ot,wo as kt,yi as At,yt as jt}from"./control-ui-boot-shared-DJ4XCcp6.js";import{a as Mt,n as Nt,o as Pt,r as Ft,t as It}from"./session-workspace-recovery.runtime-CguqxHrO.js";import{f as Lt,l as Rt}from"./control-ui-boot-shared-TgR3hRAg.js";import{a as zt,i as Bt,r as Vt}from"./control-ui-boot-shared-DCY2wZcy.js";import{n as Ht,t as Ut}from"./transcript-search-C6ZeM_PZ.js";import{n as Wt,t as Gt}from"./cloud-worker-stop.runtime-D557gbSb.js";import{n as Kt,t as qt}from"./settings-workspace-DKW0BVnu.js";import{n as Jt,t as Yt}from"./agent-row-chip-DpS83BWh.js";import{o as Xt,s as Zt}from"./presenter-CQuBX6tH.js";import{n as Qt,t as $t}from"./agent-scope-control-DWOXrjh1.js";import{n as en,t as tn}from"./capacity-meter-8ZQIkt5P.js";import{n as nn,t as rn}from"./sessions-hub-header-SpHeIkgK.js";function an(e){return[...new Set((e?.sessions??[]).map(e=>T(e.key)?.agentId).filter(e=>!!e))]}function on(e,t){return Object.fromEntries(an(e).map(e=>[e,t(e)]).filter(e=>!!e[1]))}function sn(e,t){if(!e||!t)return;let n=an(t).filter(t=>!e.get(t));n.length!==0&&e.ensure(n)}function cn(){return(cn=e((()=>{O()})))()}function ln(e,{key:t,sessionId:n,pinned:r},i){let a=e.captureConnectionScope();return a?o=>{e.isConnectionScopeCurrent(a)&&o.entry.sessionId===n&&w({message:D(`sessionsView.sessionArchived`),actionLabel:D(`common.undo`),onAction:()=>{e.isConnectionScopeCurrent(a)&&e.patch(t,{archived:!1,...r===!0?{pinned:!0}:{}},{agentId:i,expectedSessionId:n}).catch(t=>{e.isConnectionScopeCurrent(a)&&w({message:g(t)})})}})}:null}function un(){return(un=e((()=>{A(),k(),re()})))()}function dn(e,t){let n=(e?.sessions??[]).map(e=>e.category?.trim()).filter(e=>!!e);return[...new Set([...t,...n.toSorted((e,t)=>e.localeCompare(t))])]}async function fn(e){if(!e.sessions||e.knownCategories.includes(e.name))return`completed`;try{return await e.sessions.groupsPut([...e.sessions.state.groups??[],e.name])===`completed`&&e.isCurrent()?`completed`:`stale`}catch(t){return e.isCurrent()?(e.onError(g(t)),`failed`):`stale`}}function pn(){return(pn=e((()=>{k()})))()}function mn(e,t){let n=t.deepLinkSessionKey?.trim()||null,r=T(n)?.agentId??e.agentSelection.state.scopeId?.trim(),i=!n&&t.statusFilter===`active`?t.activeMinutes:void 0;return{limit:n?50:t.limit,...i?{activeMinutes:i}:{},...n||t.search?.trim()?{search:n??t.search.trim()}:{},includeGlobal:n?!0:t.includeGlobal,includeUnknown:n?!0:t.includeUnknown,includeDerivedTitles:!1,includeLastMessage:!1,archivedFilter:t.statusFilter,...r?{agentId:r}:{}}}function hn(){return(hn=e((()=>{le(),O()})))()}function gn(){return B(C()?.getItem(q))}function _n(e){try{C()?.setItem(q,e)}catch{}}var q;function vn(){return(vn=e((()=>{z(),q=`openclaw:sessions:group-by`})))()}function yn(e,t,n){let r=new Map(t.map(e=>[e.key,e])),i=new Map(e);for(let[e,t]of i){let a=r.get(e);(a?t.sessionId?.trim()&&a.sessionId===t.sessionId:n(t))||i.delete(e)}return i.size===e.size?e:i}function bn(e,t,n,r){let i=new Map(e);for(let e of n)if(r===`deselect`||r===`toggle`&&i.has(e))i.delete(e);else{let n=t.find(t=>t.key===e);n&&i.set(e,{...n})}return i}function xn(e){let{context:t,row:n}=e,r=t.gateway.snapshot,i=E({agentsList:t.agents.state.agentsList,hello:r.hello}),a=x(n,i),o=p([n],i),s=wt(n.placement),c=!(!s||s.blocksActiveRun&&n.hasActiveRun===!0||Le(r,s.method)!==!0),u=pe(n);return F`
    <openclaw-session-menu
      .session=${{label:l(n.label)??n.key,sessionId:l(n.sessionId)??null,pinned:n.pinned===!0,pinnable:u,unread:n.unread===!0,hiddenFromInvolvingMe:n.hiddenFromInvolvingMe,archived:n.archived===!0,archiving:t.sessions.archiveVisibility(n.key)===`pending`,category:l(n.category)??null,icon:l(n.icon)??null,color:l(n.color)??null,categoryClearReturnsToGroups:!1}}
      .anchor=${e.menu}
      .trigger=${e.trigger}
      .disabled=${e.disabled}
      .navigationAllowed=${!0}
      .copyMarkdownAllowed=${st(r)}
      .splitAllowed=${!1}
      .actionDisabledReasons=${St({snapshot:r,session:{...n,pinnable:u},cloudWorkerStopAction:s})}
      .forkDisabled=${n.modelSelectionLocked===!0}
      .forkFromLastCompleted=${n.hasActiveRun===!0}
      .archiveAllowed=${a}
      .deleteAllowed=${o}
      .cloudWorkerStopAllowed=${c}
      .groups=${e.groups}
      .work=${e.work}
      .pluginActions=${Bt(t.plugins,n)}
      .onClose=${e.onClose}
      .onAction=${e.onAction}
    ></openclaw-session-menu>
  `}function Sn(){return(Sn=e((()=>{L(),At(),bt(),Re(),O(),V(),Vt()})))()}function Cn(e,t){let n=l(e.category)??``,r=[...t.knownCategories];return n&&!r.includes(n)&&r.push(n),F`
    <td>
      <select
        ?disabled=${t.loading||!!t.groupWriteDisabledReason}
        title=${t.groupWriteDisabledReason??I}
        aria-label=${D(`sessionsView.moveToGroup`)}
        class="session-group-select"
        @change=${r=>{if(t.groupWriteDisabledReason)return;let i=r.currentTarget;if(i instanceof HTMLSelectElement){if(i.options[i.selectedIndex]?.dataset.action===`create`){i.value=n,t.onRequestNewCategory(e.key);return}t.onAssignCategory(e.key,i.value||null)}}}
      >
        <option value="" ?selected=${!n}>${D(`sessionsView.ungrouped`)}</option>
        ${r.map(e=>F`<option value=${e} ?selected=${n===e}>${e}</option>`)}
        <option data-action="create">${D(`sessionsView.newGroup`)}</option>
      </select>
    </td>
  `}function wn(){return(wn=e((()=>{L(),A()})))()}function Tn(e){let t=o(e),n=e.hasActiveRun===!1&&(!e.status||e.status===`running`),r=e.status===`queued`?D(`sessionsView.statusQueued`):t?D(`sessionsView.statusLive`):n?D(`sessionsView.statusIdle`):e.status?D(J[e.status]??`sessionsView.statusUnknown`):D(`sessionsView.statusUnknown`),i=e.status===`queued`?`warn`:t||e.status===`done`?`ok`:n||!e.status||e.status===`interrupted`?`muted`:`danger`,a=`${D(`sessionsView.status`)}: ${r}`;return F`
    <openclaw-tooltip .content=${a}>
      ${W({kind:i,label:r})}
    </openclaw-tooltip>
  `}var J;function En(){return(En=e((()=>{L(),K(),A(),J={queued:`sessionsView.statusQueued`,running:`sessionsView.statusRunning`,done:`sessionsView.statusDone`,failed:`sessionsView.statusFailed`,interrupted:`sessionsView.statusInterrupted`,killed:`sessionsView.statusKilled`,timeout:`sessionsView.statusTimeout`}})))()}function Dn(e){return D(Y[e]??Y.none)}function On(e){let t=[`session-filter-check`,`session-filter-toggle`,e.extraClass??``,e.checked?`session-filter-check--active`:``].filter(Boolean).join(` `);return F`
    <openclaw-tooltip .content=${e.title}>
      <label class=${t}>
        <input
          name=${e.name}
          class="session-filter-check__input"
          type="checkbox"
          .checked=${e.checked}
          @change=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onChange(t.currentTarget.checked)}}
        />
        <span class="session-filter-check__mark" aria-hidden="true">${M.check}</span>
        <span class="session-filter-check__label">${e.label}</span>
      </label>
    </openclaw-tooltip>
  `}function kn(e,t){e.currentTarget instanceof Element&&e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,String(t))}function An(e){let t=[[`activeMinutes`,`minutes`,D(`sessionsView.active`),D(`sessionsView.activeTooltip`,{count:e.activeMinutes.trim()}),D(`sessionsView.minutesPlaceholder`),e.statusFilter!==`active`],[`limit`,`limit`,D(`sessionsView.limit`),D(`sessionsView.limitTooltip`),I,!1]],n=[[`includeGlobal`,D(`sessionsView.global`),D(`sessionsView.globalTooltip`)],[`includeUnknown`,D(`sessionsView.unknown`),D(`sessionsView.unknownTooltip`)]],{activeMinutes:r,limit:i,includeGlobal:a,includeUnknown:o}=e,s=(t,n)=>e.onFiltersChange({activeMinutes:r,limit:i,includeGlobal:a,includeUnknown:o,[t]:n}),c=r.trim()!==``||i.trim()!==`50`||!a||o||e.groupBy!==`none`;return F`
    <button
      id="sessions-filter-popover-trigger"
      type="button"
      class="btn btn--sm sessions-filter-popover__trigger ${c?`active`:``}"
      title=${D(`sessionsView.filters`)}
      aria-label=${D(`sessionsView.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${M.listFilter}
    </button>
    <wa-popover
      ${Ne(Et)}
      class="sessions-filter-popover"
      for="sessions-filter-popover-trigger"
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>kn(e,!0)}
      @wa-hide=${e=>kn(e,!1)}
    >
      <div class="sessions-filter-popover__panel">
        <div class="sessions-filter-popover__fields">
          ${t.map(([t,n,r,i,a,o])=>F`
              <openclaw-tooltip .content=${i}>
                <label class="session-filter-field">
                  <span class="session-filter-label">${r}</span>
                  <input
                    class="session-filter-input session-filter-input--${n}"
                    placeholder=${a}
                    .value=${e[t]}
                    ?disabled=${o}
                    @input=${e=>{e.currentTarget instanceof HTMLInputElement&&s(t,e.currentTarget.value)}}
                  />
                </label>
              </openclaw-tooltip>
            `)}
        </div>
        <div
          class="session-filter-toggle-group"
          role="group"
          aria-label=${D(`sessionsView.sourceFilters`)}
        >
          ${n.map(([t,n,r])=>On({name:t,checked:e[t],label:n,title:r,onChange:e=>s(t,e)}))}
        </div>
        <label class="session-groupby">
          <span class="session-groupby__label">${D(`sessionsView.groupBy`)}</span>
          <select
            class="session-groupby__select"
            @change=${t=>{t.currentTarget instanceof HTMLSelectElement&&e.onGroupByChange(B(t.currentTarget.value))}}
          >
            ${ot.filter(t=>t!==`person`||e.personGroupingAvailable).map(t=>F`
                <option value=${t} ?selected=${e.groupBy===t}>
                  ${Dn(t)}
                </option>
              `)}
          </select>
        </label>
        ${e.groupBy===`category`?F`
                <button
                  class="btn btn--sm"
                  ?disabled=${!!e.groupWriteDisabledReason}
                  title=${e.groupWriteDisabledReason??I}
                  @click=${()=>e.onRequestNewCategory()}
                >
                  ${M.plus} ${D(`sessionsView.newGroup`)}
                </button>
              `:I}
      </div>
    </wa-popover>
  `}var Y;function jn(){return(jn=e((()=>{L(),Pe(),N(),P(),Ot(),A(),z(),b(),Y={none:`sessionsView.groupByNone`,category:`sessionsView.groupByCategory`,person:`sessionsView.groupByPerson`,channel:`sessionsView.groupByChannel`,kind:`sessionsView.groupByKind`,agent:`sessionsView.groupByAgent`,date:`sessionsView.groupByDate`}})))()}function Mn(e,t){let n=t.find(t=>t.key===e.sessionKey);return l(n?.label)??l(n?.displayName)??e.sessionKey}function Nn(e){let t=e.transcriptSearchQuery.trim().length>0,n=e.transcriptSearch,r=n.status===`results`?n.results:[],i=n.status===`results`?n.sessions:[],a=n.status===`loading`;return F`
    <section
      class="sessions-transcript-search"
      aria-label=${D(`sessionsView.transcriptSearchTitle`)}
    >
      <form
        class="sessions-transcript-search__form"
        role="search"
        aria-label=${D(`sessionsView.transcriptSearchTitle`)}
        @submit=${n=>{n.preventDefault(),e.transcriptSearchAvailable&&t&&!a&&e.onTranscriptSearch()}}
      >
        <div class="data-table-search sessions-transcript-search__input">
          <input
            type="search"
            maxlength="4096"
            aria-label=${D(`sessionsView.transcriptSearchInputLabel`)}
            placeholder=${D(`sessionsView.transcriptSearchPlaceholder`)}
            .value=${e.transcriptSearchQuery}
            ?disabled=${!e.transcriptSearchAvailable}
            @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onTranscriptSearchChange(t.currentTarget.value)}}
          />
        </div>
        <button
          class="btn primary"
          type="submit"
          ?disabled=${!e.transcriptSearchAvailable||!t||a}
        >
          ${D(a?`sessionsView.transcriptSearchSearching`:`sessionsView.transcriptSearchAction`)}
        </button>
        ${t?F`
                <button class="btn" type="button" @click=${e.onClearTranscriptSearch}>
                  ${D(`sessionsView.transcriptSearchClear`)}
                </button>
              `:I}
      </form>
      ${e.transcriptSearchAvailable?I:F`
              <div class="muted" role="status">
                ${D(`sessionsView.transcriptSearchUnavailable`)}
              </div>
            `}
      <div
        class="sessions-transcript-search__status"
        aria-live="polite"
        aria-busy=${a?`true`:`false`}
      >
        ${a?F`<span class="muted">${D(`sessionsView.transcriptSearchSearching`)}</span>`:I}
        ${n.status===`error`?F`
                <div
                  class="sessions-transcript-search__notice sessions-transcript-search__notice--danger"
                >
                  <span>${D(`sessionsView.transcriptSearchError`)}: ${n.message}</span>
                  <button class="btn btn--sm" type="button" @click=${e.onTranscriptSearch}>
                    ${D(`sessionsView.transcriptSearchRetry`)}
                  </button>
                </div>
              `:I}
        ${n.status===`results`&&n.indexing?F`
                <div class="sessions-transcript-search__notice">
                  <span>${D(`sessionsView.transcriptSearchIndexing`)}</span>
                  <button
                    class="btn btn--sm"
                    type="button"
                    ?disabled=${a}
                    @click=${e.onTranscriptSearch}
                  >
                    ${D(`sessionsView.transcriptSearchRetry`)}
                  </button>
                </div>
              `:I}
        ${n.status===`results`&&n.archivedTranscriptsExcluded>0?F`<div class="sessions-transcript-search__notice">
                ${D(`sessionsView.transcriptSearchArchivedExcluded`,{count:String(n.archivedTranscriptsExcluded)})}
              </div>`:I}
        ${n.status===`results`&&r.length===0&&!n.indexing?F`
                <div class="sessions-transcript-search__empty" role="status">
                  ${D(`sessionsView.transcriptSearchEmpty`)}
                </div>
              `:I}
        ${r.length>0?F`
                <div class="sessions-transcript-search__results">
                  <div class="sessions-transcript-search__summary">
                    <strong
                      >${D(`sessionsView.transcriptSearchMatches`,{count:String(r.length)})}</strong
                    >
                    ${n.status===`results`&&n.truncated?F`<span class="muted"
                            >${D(`sessionsView.transcriptSearchTruncated`)}</span
                          >`:I}
                  </div>
                  <div class="sessions-transcript-search__list">
                    ${r.map(t=>{let n=t.timestamp>0?ee(t.timestamp):D(`common.na`),r=t.timestamp>0?v(t.timestamp):n;return F`
                        <button
                          class="sessions-transcript-search__result"
                          type="button"
                          @click=${()=>e.onNavigateToChat?.(t.sessionKey)}
                        >
                          <span class="sessions-transcript-search__result-header">
                            <strong>${Mn(t,i)}</strong>
                            <span class="muted" title=${r}>
                              ${D(`sessionsView.${t.role}`)} · ${n}
                            </span>
                          </span>
                          <span class="sessions-transcript-search__snippet">${t.snippet}</span>
                          <span class="sessions-transcript-search__key">${t.sessionKey}</span>
                        </button>
                      `})}
                  </div>
                </div>
              `:I}
      </div>
    </section>
  `}function Pn(){return(Pn=e((()=>{L(),A(),pt(),S(),at()})))()}function Fn(e,t){return Object.hasOwn(e,t)?e[t]??null:null}function In(e,t){let n=qe({catalog:[],session:e,defaults:t,sessionKey:e.key,sessionsResult:null});return[{value:``,label:n.inherited.displayLabel},...n.options]}function Ln(e,t){return!t||e.some(e=>e.value===t)?[...e]:[...e,{value:t,label:Ue(t)}]}function X(e,t=!1){return e.map(e=>({value:e,label:D(e===``?`sessionsView.inherit`:t&&e===`off`?`sessionsView.offExplicit`:`sessionsView.${e}`)}))}function Rn(e){let t=y(e);return F`
    <span class="session-avatar session-avatar--${t}" aria-hidden="true">
      ${ar[t]??M.circle}
      ${o(e)?F`<span class="session-avatar__status"></span>`:I}
    </span>
  `}function zn(e){let t=e.totalTokens;if(typeof t!=`number`||!Number.isFinite(t))return F`<span class="muted">${D(`common.na`)}</span>`;let n=e.totalTokensFresh!==!1,r=`${n?``:`~`}${ne(t)}`,i=Be(e),a=i.tokens>0?i.tokens:null;if(!a)return F`<span class="session-tokens__value">${r}</span>`;let o=Math.min(100,Math.round(t/a*100)),s=n?o>=sr?`danger`:o>=or?`warn`:`ok`:`stale`,c=D(i.fromLastPrompt?n?`sessionsView.promptBudgetUsage`:`sessionsView.promptBudgetUsageApprox`:n?`sessionsView.contextUsage`:`sessionsView.contextUsageApprox`,{percent:String(o),used:t.toLocaleString(),context:a.toLocaleString()});return F`
    <openclaw-tooltip .content=${c}>
      <div class="session-tokens">
        <span class="session-tokens__value"
          >${r} / ${ne(a)}</span
        >
        ${en({mode:`continuous`,percent:o,tone:s,label:c})}
      </div>
    </openclaw-tooltip>
  `}function Bn(e,t,n){let r=e.filter(e=>e.unread===!0&&e.archived!==!0).length,i=e.filter(e=>e.archived===!0).length,a=[[String(t),D(`sessionsView.statusLive`),t>0],[String(r),D(`sessionsView.unread`),r>0]];return n!==`active`&&a.push([String(i),D(`sessionsView.archived`),!1]),F`
    <span class="sessions-heading-facts">
      ${a.map(([e,t,n],r)=>F`
          ${r>0?F`<span class="sessions-heading-fact__separator" aria-hidden="true">·</span>`:I}
          <span
            class=${n?`sessions-heading-fact sessions-heading-fact--active`:`sessions-heading-fact`}
          >
            <strong>${e}</strong> ${t}
          </span>
        `)}
    </span>
  `}function Vn(e){return Array.from({length:cr},(t,n)=>F`
      <tr class="session-skeleton-row" aria-hidden="true">
        ${Array.from({length:e},(e,t)=>t===0?F`<td class="data-table-checkbox-col"></td>`:F`<td>
                <span
                  class="session-skeleton ${t===1?`session-skeleton--key`:``}"
                  style=${`animation-delay: ${n*120}ms`}
                ></span>
              </td>`)}
      </tr>
    `)}function Hn(e){return a(e.searchQuery).length>0||u(e.activeMinutes)!==void 0||!e.includeGlobal}function Un(e){return typeof e!=`number`||!Number.isFinite(e)||e<0?null:Ke(e)??`0ms`}function Wn(e){if(!e)return I;let t=e.status===`active`||e.status===`complete`?`ok`:`warn`,n=Rt(e);return F`
    <openclaw-tooltip .content=${n}>
      <span tabindex="0" aria-label=${n}>
        ${W({kind:t,label:Lt(e)})}
      </span>
    </openclaw-tooltip>
  `}function Gn(e){let{row:t,updated:n}=e,r=[{label:D(`sessionsView.key`),value:t.key},{label:D(`sessionsView.kind`),value:y(t)},{label:D(`sessionsView.updated`),value:n},{label:D(`sessionsView.tokens`),value:Xt(t)}],a=(e,t)=>{let n=l(t);n&&r.push({label:e,value:n})};a(D(`sessionsView.group`),t.category),a(D(`sessionsView.status`),t.status),t.goal&&r.push({label:D(`sessionsView.goal`),value:Rt(t.goal)}),a(D(`sessionsView.goalNote`),t.goal?.lastStatusNote),a(D(`sessionsView.model`),t.model),a(D(`sessionsView.provider`),t.modelProvider),a(D(`sessionsView.runtime`),i(t.agentRuntime)),a(D(`sessionsView.runDuration`),Un(t.runtimeMs)),a(D(`sessionsView.surface`),t.surface),a(D(`sessionsView.subject`),t.subject),a(D(`sessionsView.room`),t.room),a(D(`sessionsView.space`),t.space),a(D(`sessionsView.sessionId`),t.sessionId),t.archiveReason&&r.push({label:D(`sessionsView.archiveReason`),value:Qe(t.archiveReason)});for(let[e,n]of[[D(`sessionsView.activeRun`),t.hasActiveRun],[D(`sessionsView.archived`),t.archived],[D(`sessionsView.pinned`),t.pinned]])typeof n==`boolean`&&r.push({label:e,value:D(n?`common.yes`:`common.no`)});return r}function Z(e){return e.groupBy===`category`?8:7}function Kn(e,t){let{id:n}=e;if(t.groupBy===`date`)return D({today:`sessionsView.dateToday`,yesterday:`sessionsView.dateYesterday`,week:`sessionsView.dateThisWeek`,older:`sessionsView.dateOlder`}[n]??`sessionsView.dateNoActivity`);if(n===``)return D(`sessionsView.ungrouped`);if(t.groupBy===`agent`){let e=Fn(t.agentIdentityById,n),r=l(e?.name);if(r){let t=l(e?.emoji);return t?`${t} ${r}`:r}}if(t.groupBy===`person`){let t=e.rows[0]?.owner?.actor;return t?.identity?.type===`profile`?nt({id:t.identity.id,name:t.label?.trim()||n}):t?.label?.trim()||n}return n}function Q(e,t){e.currentTarget?.classList.toggle(`session-drop-target--active`,t)}function qn(e,t){if(e.groupBy!==`category`||e.groupWriteDisabledReason)return{dragover:I,dragleave:I,drop:I};let n=e=>e.dataTransfer?.types.includes(H)===!0;return{dragover:e=>{n(e)&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),Q(e,!0))},dragleave:e=>Q(e,!1),drop:r=>{if(!n(r))return;r.preventDefault(),Q(r,!1);let i=r.dataTransfer?.getData(H);i&&e.onAssignCategory(i,t)}}}function Jn(e,t){let n=Kn(e,t),r=e.rows.length===1?D(`sessionsView.groupRowCountOne`,{count:`1`}):D(`sessionsView.groupRowCount`,{count:String(e.rows.length)}),i=qn(t,e.id===``?null:e.id);return F`
    <tr
      class="session-group-row"
      @dragover=${i.dragover}
      @dragleave=${i.dragleave}
      @drop=${i.drop}
    >
      <td colspan=${Z(t)}>
        <div class="session-group-row__header">
          <span class="session-group-row__icon" aria-hidden="true">${M.folder}</span>
          <span class="session-group-row__label">${n}</span>
          <span class="session-group-row__count">${r}</span>
        </div>
      </td>
    </tr>
  `}function Yn(e){return e instanceof Element&&!!e.closest(`a, button, input, label, select, textarea`)}function Xn(e){return F`
    <label class="session-override-field">
      <span class="session-override-field__label">${e.label}</span>
      <select
        class="settings-select"
        ?disabled=${e.disabled}
        title=${e.disabledReason??I}
        @change=${t=>e.onChange(t.target.value)}
      >
        ${e.options.map(t=>F`<option value=${t.value} ?selected=${e.current===t.value}>
              ${t.label}
            </option>`)}
      </select>
    </label>
  `}function Zn(e){let t=e.result?.sessions??[],n=e.sortDir===`asc`?1:-1,r=t.toSorted((t,r)=>{let i=(r.pinnedAt??0)-(t.pinnedAt??0);return i===0?(e.sortColumn===`kind`?y(t).localeCompare(y(r)):e.sortColumn===`key`?t.key.localeCompare(r.key):e.sortColumn===`updated`?(t.updatedAt??0)-(r.updatedAt??0):(t.totalTokens??t.inputTokens??t.outputTokens??0)-(r.totalTokens??r.inputTokens??r.outputTokens??0))*n:i}),i=r.length,a=Math.max(1,Math.ceil(i/e.pageSize)),s=Math.min(e.page,a-1),c=e.groupBy===`none`?null:ut({rows:r,mode:e.groupBy,knownCategories:e.knownCategories}),l=(c?c.flatMap(e=>e.rows):r).slice(s*e.pageSize,(s+1)*e.pageSize),u=t.length===0&&Hn(e),d=t.filter(e=>o(e)).length,f=t.filter(e=>e.archived===!0).length,p=e.statusFilter===`archived`?D(`sessionsView.noArchivedSessions`):e.statusFilter===`active`?D(`sessionsView.noActiveSessions`):D(`sessionsView.noSessions`),m=(t,n,r=``)=>{let i=e.sortColumn===t,a=i&&e.sortDir===`asc`?`desc`:`asc`;return F`
      <th
        class=${r}
        data-sortable
        data-sort-dir=${i?e.sortDir:``}
        aria-sort=${i?e.sortDir===`asc`?`ascending`:`descending`:I}
        @click=${()=>e.onSortChange(t,i?a:`desc`)}
      >
        <button class="data-table-sort-button" type="button">
          ${n}
          <span class="data-table-sort-icon" aria-hidden="true">${M.arrowUpDown}</span>
        </button>
      </th>
    `},h=F`
    ${D(`sessionsView.title`)}
    ${e.result?F`
            <openclaw-tooltip .content=${D(`sessionsView.store`,{path:e.result.path})}>
              <span class="settings-count">${t.length}</span>
            </openclaw-tooltip>
          `:I}
    ${e.result?Bn(t,d,e.statusFilter):I}
  `,g=F`
    ${e.statusFilter===`archived`?F`
            <button
              class="btn danger"
              ?disabled=${e.loading||f===0||!!e.deleteArchivedDisabledReason}
              title=${e.deleteArchivedDisabledReason??I}
              @click=${e.onDeleteAllArchived}
            >
              ${M.trash} ${D(`sessionsView.deleteAllArchived`)}
            </button>
          `:I}
    <button class="btn" ?disabled=${e.refreshing} @click=${e.onRefresh}>
      ${e.refreshing?D(`common.loading`):D(`common.refresh`)}
    </button>
  `,_=[e.error?F`<div class="sessions-error" role="alert">${e.error}</div>`:I,U({title:D(`sessionsView.transcriptSearchTitle`)},Nn(e)),U({title:h,actions:g},Qn(e,{paginated:l,groups:c,emptyBecauseFiltered:u,emptyMessage:p,totalRows:i,totalPages:a,page:s,sortHeader:m}))];return vt(_,{wide:!0})}function Qn(e,t){let{paginated:n,groups:r,emptyBecauseFiltered:i,emptyMessage:a,totalRows:o,totalPages:s,page:c}=t,l=t.sortHeader,u=i?D(`sessionsView.noSessionsMatchFilters`):a,d=r?new Set(n.map(e=>e.key)):null;return F`
    <div
      class="sessions-toolbar sessions-filter-bar"
      role="group"
      aria-label=${D(`sessionsView.filterControls`)}
    >
      <div class="data-table-search sessions-toolbar__search">
        ${M.search}
        <input
          type="text"
          aria-label=${D(`sessionsView.searchPlaceholder`)}
          placeholder=${D(`sessionsView.searchPlaceholder`)}
          .value=${e.searchQuery}
          @input=${t=>e.onSearchChange(t.target.value)}
        />
      </div>
      ${Dt({value:e.statusFilter,ariaLabel:D(`sessionsView.sessionState`),className:`sessions-view-segment`,options:[{value:`active`,label:D(`common.active`)},{value:`archived`,label:D(`sessionsView.archived`),title:D(`sessionsView.archivedOnlyTooltip`)},{value:`all`,label:D(`sessionsView.all`)}],onChange:t=>e.onStatusFilterChange(t)})}
      ${An(e)}
    </div>

    ${e.selectedKeys.size>0?F`
            <div class="data-table-bulk-bar">
              <span>${D(`sessionsView.selected`,{count:String(e.selectedKeys.size)})}</span>
              <button class="btn btn--sm" @click=${e.onDeselectAll}>
                ${D(`common.unselect`)}
              </button>
              <button
                class="btn btn--sm danger"
                ?disabled=${e.loading||!!e.deleteSelectedDisabledReason}
                title=${e.deleteSelectedDisabledReason??I}
                @click=${e.onDeleteSelected}
              >
                ${M.trash} ${D(`sessionsView.deleteSelected`)}
              </button>
            </div>
          `:I}

    <div class="data-table-container">
      <table class="data-table sessions-table">
        <thead>
          <tr>
            <th class="data-table-checkbox-col">
              ${n.length>0?F`<input
                      type="checkbox"
                      .checked=${n.length>0&&n.every(t=>e.selectedKeys.has(t.key))}
                      .indeterminate=${n.some(t=>e.selectedKeys.has(t.key))&&!n.every(t=>e.selectedKeys.has(t.key))}
                      @change=${()=>{n.every(t=>e.selectedKeys.has(t.key))?e.onDeselectPage(n.map(e=>e.key)):e.onSelectPage(n.map(e=>e.key))}}
                      aria-label=${D(`sessionsView.selectAllOnPage`)}
                    />`:I}
            </th>
            ${l(`key`,D(`sessionsView.key`),`data-table-key-col`)}
            ${e.groupBy===`category`?F`<th>${D(`sessionsView.group`)}</th>`:I}
            ${l(`kind`,D(`sessionsView.kind`))}
            <th class="session-status-col">${D(`sessionsView.status`)}</th>
            ${l(`updated`,D(`sessionsView.updated`))}
            ${l(`tokens`,D(`sessionsView.tokens`))}
            <th class="session-actions-col">
              <span class="sr-only">${D(`sessionsView.actions`)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${e.loading&&!e.result?Vn(Z(e)):n.length===0&&(e.loading||e.error||!e.result)?I:n.length===0?F`
                      <tr>
                        <td
                          colspan=${Z(e)}
                          class="data-table-empty-cell"
                        >
                          <div class="data-table-empty-state" role="status" aria-live="polite">
                            <div class="data-table-empty-state__message">
                              ${i?M.search:M.messageSquare}
                              <span>${u}</span>
                            </div>
                            ${i?F`
                                    <button class="btn btn--sm" @click=${e.onClearFilters}>
                                      ${D(`sessionsView.showAll`)}
                                    </button>
                                  `:I}
                          </div>
                        </td>
                      </tr>
                    `:r?r.flatMap(t=>{let n=t.rows.filter(e=>d?.has(e.key));if(n.length===0&&t.rows.length>0)return[];let r=n.flatMap(t=>$n(t,e));return r.unshift(Jn(t,e)),r}):n.flatMap(t=>$n(t,e))}
        </tbody>
      </table>
    </div>

    ${o>0?F`
            <div class="data-table-pagination">
              <div class="data-table-pagination__info">
                ${D(`sessionsView.pagination`,{start:String(c*e.pageSize+1),end:String(Math.min((c+1)*e.pageSize,o)),total:String(o)})}
              </div>
              <div class="data-table-pagination__controls">
                <select
                  class="data-table-pagination__size"
                  aria-label=${D(`sessionsView.pageSize`)}
                  .value=${String(e.pageSize)}
                  @change=${t=>e.onPageSizeChange(Number(t.target.value))}
                >
                  ${ir.map(t=>F`<option value=${t} ?selected=${t===e.pageSize}>
                        ${D(`sessionsView.rowsPerPage`,{count:String(t)})}
                      </option>`)}
                </select>
                ${e.result?.hasMore&&e.result.nextOffset!=null?F` <button ?disabled=${e.loading} @click=${e.onLoadMore}>
                        ${D(`chat.selectors.loadMoreRosterSessions`)}
                      </button>`:I}
                <button ?disabled=${c<=0} @click=${()=>e.onPageChange(c-1)}>
                  ${D(`common.previous`)}
                </button>
                <button
                  ?disabled=${c>=s-1}
                  @click=${()=>e.onPageChange(c+1)}
                >
                  ${D(`common.next`)}
                </button>
              </div>
            </div>
          `:I}
  `}function $n(e,t){let n=e.updatedAt?ee(e.updatedAt):D(`common.na`),r=t.expandedSessionKey===e.key,i=`session-details-${encodeURIComponent(e.key)}`,a=l(e.displayName)??null,o=l(e.label)??``,s=!!(a&&a!==e.key&&a!==o),c=de(e.key),u=c?Fn(t.agentIdentityById,c.agentId):null,d=l(u?.emoji)??``,f=l(u?.name)??``,p=f&&c?`${d?`${d} `:``}${f} (${c.channel})`:null,m=p??e.key,h=e.kind!==`global`,g=h?j({face:we(e),sessionKey:e.key,fallbackAgentId:t.agentId,basePath:t.basePath,row:e,mainKey:t.mainKey}).href:null,_=y(e),v=`session-kind session-kind--${_}`,b=[`session-data-row`,`session-data-row--expandable`,t.statusFilter===`all`&&e.archived===!0?`session-data-row--archived`:``,r?`session-data-row--expanded`:``,t.sessionMenu?.key===e.key?`session-data-row--menu-open`:``].filter(Boolean).join(` `),te=D(r?`sessionsView.hideSessionDetails`:`sessionsView.showSessionDetails`,{count:m}),x=t.groupBy===`category`,S=qn(t,l(e.category)??null),C=n=>ye(n,n instanceof KeyboardEvent?n.currentTarget.querySelector(`button[aria-haspopup="menu"]`):null,(n,r,i)=>t.onOpenSessionMenu(e,{x:r,y:i},n));return[F`<tr
      class=${b}
      tabindex="0"
      aria-controls=${r?i:I}
      draggable=${x?`true`:I}
      aria-description=${x?D(`sessionsView.dragSessionHint`):I}
      @dragstart=${x?t=>{t.dataTransfer?.setData(H,e.key),t.dataTransfer&&(t.dataTransfer.effectAllowed=`move`)}:I}
      @dragover=${S.dragover}
      @dragleave=${S.dragleave}
      @drop=${S.drop}
      @contextmenu=${C}
      @click=${n=>{Yn(n.target)||t.onToggleDetails(e.key)}}
      @keydown=${n=>{C(n),!n.defaultPrevented&&(Yn(n.target)||(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),t.onToggleDetails(e.key)))}}
    >
      <td class="data-table-checkbox-col">
        <input
          type="checkbox"
          .checked=${t.selectedKeys.has(e.key)}
          @change=${()=>t.onToggleSelect(e.key)}
          aria-label=${`${D(`sessionsView.selectSession`)}: ${e.key}`}
        />
      </td>
      <td class="data-table-key-col">
        <openclaw-tooltip .content=${m}>
          <div class=${p?`session-key-cell`:`mono session-key-cell`}>
            ${Rn(e)}
            <div class="session-key-cell__text">
              <span class="session-key-cell__primary">
                ${e.unread===!0?F`<span
                        class="session-unread-dot"
                        role="img"
                        aria-label=${D(`sessionsView.unread`)}
                      ></span>`:I}
                ${h?F`<a
                        href=${g}
                        class="session-link"
                        @click=${n=>{se(n)&&t.onNavigateToChat&&(n.preventDefault(),t.onNavigateToChat(e.key))}}
                        >${p??e.key}</a
                      >`:F`<span>${p??e.key}</span>`}
                ${o?F`<span class="session-label-chip" title=${o}
                        >${o}</span
                      >`:I}
              </span>
              ${e.kind===`global`&&!e.agentId?I:Jt(T(e.key)?.agentId??e.agentId)}
              ${s?F`<span class="muted session-key-display-name">${a}</span>`:I}
            </div>
          </div>
        </openclaw-tooltip>
      </td>
      ${x?Cn(e,t):I}
      <td>
        <span class=${v}>${_}</span>
      </td>
      <td class="session-status-col">
        <div class="session-status-stack">
          ${Tn(e)} ${Wn(e.goal)}
          ${t.statusFilter===`all`&&e.archived===!0?W({kind:`muted`,label:D(`sessionsView.archived`)}):I}
        </div>
      </td>
      <td>${n}</td>
      <td class="session-token-cell">${zn(e)}</td>
      <td class="session-actions-cell">
        <div class="session-actions">
          <button
            class="session-details-toggle"
            type="button"
            aria-expanded=${String(r)}
            aria-controls=${r?i:I}
            aria-label=${te}
            @click=${n=>{n.stopPropagation(),t.onToggleDetails(e.key)}}
          >
            ${M.chevronDown}
          </button>
          <button
            class="icon-btn"
            type="button"
            title=${D(`chat.sidebar.openSessionMenu`)}
            aria-label=${D(`chat.sidebar.openSessionMenu`)}
            aria-haspopup="menu"
            aria-expanded=${String(t.sessionMenu?.key===e.key)}
            @click=${n=>{n.stopPropagation();let r=n.currentTarget,i=r.getBoundingClientRect();t.onOpenSessionMenu(e,{x:i.right,y:i.bottom+4},r)}}
          >
            ${M.moreHorizontal}
          </button>
        </div>
      </td>
    </tr>`,...r?[er({row:e,props:t,detailsId:i,friendlyKeyLabel:p,displayName:a,showDisplayName:s,kindClass:v,updated:n})]:[]]}function er(e){let{row:t,props:n,detailsId:r,friendlyKeyLabel:i,displayName:a,showDisplayName:o,kindClass:s,updated:c}=e,u=n.labelDisabledReason?.(t),d=t.thinkingLevel??``,f=d?He(d):``,p=t.fastMode===`auto`?`auto`:t.fastMode===!0?`on`:t.fastMode===!1?`off`:``,m=[{label:D(`sessionsView.thinking`),current:f,options:In(t,n.result?.defaults),onChange:e=>n.onPatch(t.key,{thinkingLevel:e||null})},{label:D(`sessionsView.fast`),current:p,options:X(nr),onChange:e=>n.onPatch(t.key,{fastMode:e===``?null:e===`auto`?`auto`:e===`on`})},{label:D(`sessionsView.verbose`),current:t.verboseLevel??``,options:X(tr,!0),onChange:e=>n.onPatch(t.key,{verboseLevel:e||null})},{label:D(`sessionsView.reasoning`),current:t.reasoningLevel??``,options:X(rr),onChange:e=>n.onPatch(t.key,{reasoningLevel:e||null})}],h=Gn({row:t,updated:c});return F`<tr id=${r} class="session-details-row">
    <td colspan=${Z(n)}>
      <div class="session-details-panel">
        <div class="session-details-panel__hero">
          <div>
            <div class="session-details-panel__eyebrow">${D(`sessionsView.sessionDetails`)}</div>
            <div class="session-details-panel__title">${i??t.key}</div>
            ${o?F`<div class="muted session-details-panel__subtitle">${a}</div>`:I}
          </div>
          <div class="session-details-panel__badges">
            ${Tn(t)} ${Wn(t.goal)}
            <span class=${s}>${y(t)}</span>
          </div>
        </div>

        <div class="session-details-section">
          <div class="session-details-panel__eyebrow">${D(`sessionsView.overrides`)}</div>
          <div class="session-overrides-grid">
            <label class="session-override-field">
              <span class="session-override-field__label">${D(`sessionsView.label`)}</span>
              <input
                class="settings-input"
                .value=${t.label??``}
                ?disabled=${n.loading||!!u}
                title=${u??I}
                placeholder=${D(`sessionsView.optionalPlaceholder`)}
                @change=${e=>{let r=l(e.target.value)??null;n.onPatch(t.key,{label:r},{sessionScope:!0})}}
              />
            </label>
            ${m.map(e=>Xn({...e,options:Ln(e.options,e.current),disabled:n.loading||!!n.patchAdminDisabledReason,disabledReason:n.patchAdminDisabledReason}))}
          </div>
        </div>

        <div class="session-details-grid">
          ${h.map(e=>F`
              <div class="session-detail-stat">
                <div class="session-detail-stat__label">${e.label}</div>
                <openclaw-tooltip .content=${e.value}>
                  <div class="session-detail-stat__value">${e.value}</div>
                </openclaw-tooltip>
              </div>
            `)}
        </div>
      </div>
    </td>
  </tr>`}var tr,nr,rr,ir,ar,or,sr,cr;function lr(){return(lr=e((()=>{s(),L(),Yt(),tn(),N(),K(),A(),P(),xt(),te(),tt(),rt(),S(),me(),Ge(),Zt(),ge(),mt(),z(),fe(),ze(),O(),wn(),En(),jn(),Pn(),tr=[``,`off`,`on`,`full`],nr=[``,`auto`,`on`,`off`],rr=[``,`off`,`on`,`stream`],ir=[10,25,50,100],ar={cron:M.clock,direct:M.messageSquare,group:M.users,global:M.globe,unknown:M.circle},or=65,sr=85,cr=4})))()}var ur,dr,$;function fr(){return(fr=e((()=>{n(),ht(),s(),L(),Fe(),Ae(),ke(),Me(),$t(),Gt(),At(),kt(),Ct(),yt(),Nt(),rn(),K(),qt(),A(),Te(),lt(),k(),Re(),ae(),m(),Ve(),We(),le(),Xe(),fe(),O(),V(),b(),Ut(),Pt(),dt(),_e(),ce(),Vt(),cn(),un(),pn(),hn(),vn(),Sn(),lr(),t(),ur=`https://docs.openclaw.ai/concepts/session`,dr=200,$=class extends xe{constructor(...e){super(...e),this.result=null,this.loading=!1,this.refreshing=!1,this.error=null,this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!1,this.statusFilter=`active`,this.searchQuery=``,this.transcriptSearchQuery=``,this.submittedTranscriptSearchQuery=``,this.sortColumn=`updated`,this.sortDir=`desc`,this.groupBy=gn(),this.page=0,this.pageSize=25,this.selectedSessions=new Map,this.sessionMenu=null,this.sessionMenuWork=null,this.expandedSessionKey=null,this.deepLinkSessionKey=null,this.pageEpoch=0,this.pluginActionLifetime=new AbortController,this.routeDataEnabled=!0,this.sessionMutationPending=!1,this.sessionMenuTrigger=null,this.sessionMenuWorkVersion=0,this.observeAgentScope=Ze(()=>{this.retirePageOperations(),this.resetTranscriptSearchState(this.transcriptSearchQuery),this.deepLinkSessionKey||(this.page=0,this.selectedSessions=new Map,this.routeDataEnabled=!1,this.clearSearchTimer(),this.bindSessionList()),this.requestUpdate()}),this.subscriptions=new be(this).watch(()=>this.context?.agentIdentity,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).watch(()=>this.context?.plugins,(e,t)=>e.subscribe(t)),this.gatewayLifecycle=new ct(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{let e=this.listBinding?.sessions.listSnapshot(this.listBinding.query).result;this.resetProviderState(),this.appliedListResult=e},invalidateRequests:()=>this.invalidatePageWork()}),this.transcriptSearchTask=new gt(this,{args:()=>{let e=this.context,t=e?.gateway.snapshot;return[t?.phase===`connected`?t.client??null:null,this.submittedTranscriptSearchQuery,e??null,e?.agentSelection.state.scopeId??null]},task:async([e,t,n,r],{signal:i})=>{if(!e||!t||!n)return _t;let{sessions:a,results:o,indexing:s=!1,truncated:c=!1,archivedTranscriptsExcluded:l=0}=await Ht({client:e,query:t,listOptions:this.sessionListOptions(n,``),isCurrent:()=>!i.aborted});return{sessions:a,results:o,indexing:s,truncated:c,archivedTranscriptsExcluded:l}}}),this.dialogLifecycle=null}willUpdate(e){let t=this.context?.sessions;t&&this.listBinding&&this.listBinding.sessions!==t&&(this.unsubscribeList?.(),this.unsubscribeList=void 0,this.listBinding=void 0,this.invalidatePageWork(),this.resetProviderState()),(e.has(`routeData`)||e.has(`context`))&&this.applyRouteData(),this.bindSessionList()}disconnectedCallback(){this.unsubscribeList?.(),this.unsubscribeList=void 0,this.listBinding=void 0,this.subscriptions.clear(),this.invalidatePageWork(),this.dialogLifecycle?.abort(),super.disconnectedCallback()}retirePageOperations(){this.pluginActionLifetime.abort(),this.pluginActionLifetime=new AbortController,this.pageEpoch+=1,this.sessionMutationPending=!1,this.closeSessionMenu()}invalidatePageWork(){this.retirePageOperations(),this.clearSearchTimer(),this.listRequest=void 0,this.resetTranscriptSearchState(this.transcriptSearchQuery),this.loading=!1,this.refreshing=!1}resetProviderState(){this.result=null,this.error=null,this.loading=!1,this.refreshing=!1,this.resetTranscriptSearchState(``),this.selectedSessions=new Map,this.expandedSessionKey=null,this.deepLinkSessionKey=null,this.appliedListResult=void 0}captureRequestScope(){let e=this.context;if(!this.isConnected||!e)return null;let t=e.gateway,n=this.gatewayLifecycle.gateway===t?this.gatewayLifecycle.client:null;return!this.gatewayLifecycle.connected||!n?null:{epoch:this.pageEpoch,context:e,gateway:t,sessions:e.sessions,client:n}}isRequestScopeCurrent(e){let t=this.context,n=t?.gateway;return this.isConnected&&this.pageEpoch===e.epoch&&t===e.context&&n===e.gateway&&t.sessions===e.sessions&&n.snapshot.phase===`connected`&&n.snapshot.client===e.client}mutationDisabledReason(e){let t=he(this.context?.gateway.snapshot,e);return t.allowed?void 0:t.reason}requireMutationAccess(e,t){let n=he(e.gateway.snapshot,t);return n.allowed?!0:(this.error=n.reason,!1)}selectedDeleteDisabledReason(){for(let e of this.selectedSessions.values()){let t=this.mutationDisabledReason({method:`sessions.delete`,params:{key:e.key,...e.archived===!0?{archivedOnly:!0}:{}}});if(t)return t}}applyRouteData(){let e=this.routeData,t=this.context;e&&t&&(e!==this.appliedRouteData&&(this.appliedRouteData=e,this.routeDataEnabled=!0),this.routeDataEnabled&&(this.statusFilter=e.statusFilter,this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!!e.expandedSessionKey,e.expandedSessionKey&&(this.searchQuery=``,this.page=0,this.selectedSessions=new Map),this.expandedSessionKey=e.expandedSessionKey,this.deepLinkSessionKey=e.expandedSessionKey))}sessionAgentId(e,t=this.context){if(!t)return;let{agentId:n}=ue({assistantAgentId:t.agentSelection.state.selectedId,hello:t.gateway.snapshot.hello},e);return n}sessionPathAgentId(e,t){return this.sessionAgentId(e,t)??Se(t)}sessionListOptions(e,t=this.searchQuery){return mn(e,{activeMinutes:u(this.activeMinutes),limit:u(this.limit)??50,includeGlobal:this.includeGlobal,includeUnknown:this.includeUnknown,statusFilter:this.statusFilter,deepLinkSessionKey:this.deepLinkSessionKey,search:t})}bindSessionList(e=!0){let t=this.context;if(!t||!this.isConnected)return;let n=t.sessions,r=this.sessionListOptions(t),i=JSON.stringify(r),a=this.listBinding,o=JSON.stringify(this.sessionListOptions(t,``));(a?.sessions!==n||a.key!==i)&&(a?.sessions===n&&n.listSnapshot(a.query).loading&&this.loadSessionList(a),this.unsubscribeList?.(),this.unsubscribeList=void 0,(a?.sessions!==n||a.transcriptKey!==o)&&this.resetTranscriptSearchState(this.transcriptSearchQuery),this.result=null,this.error=null,this.selectedSessions=new Map,this.page=0,this.listBinding={sessions:n,query:r,key:i,transcriptKey:o},this.appliedListResult=void 0);let s=this.listBinding;if(this.unsubscribeList||(this.loading=t.gateway.snapshot.phase===`connected`,!this.captureRequestScope()||this.searchTimer!==void 0||this.listRequest))return s;let c=e=>{this.applyListSnapshot(s,e)};this.unsubscribeList=n.subscribeList(r,c);let l=n.listSnapshot(r);return c(l),e&&(!l.result||l.loading)&&this.loadSessionList(s),s}applyListSnapshot(e,t){if(this.listBinding!==e||this.context?.sessions!==e.sessions)return;this.loading=t.loading,this.error=t.error;let n=t.result;n&&(n!==this.appliedListResult&&(this.appliedListResult=n,this.result=_(n,{archivedFilter:this.statusFilter}),sn(this.context?.agentIdentity,this.result)),!t.loading&&!t.error&&this.result&&this.selectedSessions.size>0&&(this.selectedSessions=yn(this.selectedSessions,this.result.sessions,t=>e.sessions.deletionState(t.key,this.sessionAgentId(t.key),t.sessionId)===`pending`||e.sessions.archiveVisibility(t.key)===`pending`)))}async refreshSessionList(e=this.captureRequestScope()){if(!e)return;this.routeDataEnabled=!1,this.clearSearchTimer();let t=this.bindSessionList(!1);t&&t.sessions===e.sessions&&this.isRequestScopeCurrent(e)&&(await this.loadSessionList(t,{force:!0}),this.isRequestScopeCurrent(e)&&this.listBinding===t&&this.applyListSnapshot(t,t.sessions.listSnapshot(t.query)))}loadSessionList(e,t={}){if(this.listRequest)return t.force&&this.unsubscribeList&&e.sessions.refreshList({...e.query,...t}),this.listRequest;if(!this.captureRequestScope())return Promise.resolve();let n,r=new Promise(e=>{n=e}).finally(()=>{this.listRequest===r&&(this.listRequest=void 0,this.refreshing=!1,this.bindSessionList())});return this.listRequest=r,this.refreshing=!0,n(e.sessions.refreshList({...e.query,...t})),r}clearSearchTimer(){clearTimeout(this.searchTimer),this.searchTimer=void 0}adoptCurrentListSnapshot(){let e=this.listBinding;e&&this.applyListSnapshot(e,e.sessions.listSnapshot(e.query))}resetTranscriptSearchState(e){this.transcriptSearchQuery=e,this.submittedTranscriptSearchQuery=``,this.transcriptSearchTask.run()}updateTranscriptSearchQuery(e){e!==this.transcriptSearchQuery&&this.resetTranscriptSearchState(e)}async runTranscriptSearch(){let e=this.transcriptSearchQuery.trim();if(!e){this.resetTranscriptSearchState(``);return}this.captureRequestScope()&&(this.transcriptSearchQuery=e,this.submittedTranscriptSearchQuery=e,await this.transcriptSearchTask.run())}updateFilters(e){this.activeMinutes=e.activeMinutes,this.limit=e.limit,this.includeGlobal=e.includeGlobal,this.includeUnknown=e.includeUnknown,this.page=0,this.selectedSessions=new Map,this.deepLinkSessionKey=null,this.refreshSessionList()}updateStatusFilter(e){let t=this.context;e!==this.statusFilter&&t&&(this.statusFilter=e,this.clearSearchTimer(),this.page=0,this.selectedSessions=new Map,this.deepLinkSessionKey=null,this.loading=!0,this.error=null,t.navigate(`sessions`,e===`active`?void 0:{search:`?status=${e}`}))}updateSelection(e,t){this.selectedSessions=bn(this.selectedSessions,this.result?.sessions??[],e,t)}async deleteSelected(){let e=[...this.selectedSessions.values()];if(e.length===0||this.loading||this.sessionMutationPending)return;let t=this.captureRequestScope();if(!t)return;let n=D(e.length===1?`sessionsView.deleteSelectedConfirmOne`:`sessionsView.deleteSelectedConfirm`,{count:String(e.length)});await G({message:n,confirmLabel:D(`common.delete`),danger:!0,signal:this.pluginActionLifetime.signal})&&this.isRequestScopeCurrent(t)&&await this.deleteSessions(e.filter(e=>this.selectedSessions.get(e.key)===e))}async deleteSessions(e,t={}){if(e.length===0||this.loading||this.sessionMutationPending)return;let n=this.captureRequestScope();if(!n)return;let i=e.map(e=>({key:e.key,agentId:this.sessionAgentId(e.key,n.context),...t,...e.sessionId?{expectedSessionId:e.sessionId}:{},...e.archived===!0?{archivedOnly:!0}:{}}));for(let e of i)if(!this.requireMutationAccess(n,{method:`sessions.delete`,params:e}))return;this.sessionMutationPending=!0;let a=null;try{let t=async()=>{let t=await n.sessions.deleteMany(i);if(e.length===1&&t.errors.length>0)throw t.errors[0].error;return t},o=e[0],s=e.length===1?await Ft({action:`delete`,session:{...o,label:o.label||o.displayName||o.key,agentId:i[0].agentId},scope:{...n,signal:this.pluginActionLifetime.signal},isCurrent:()=>this.isRequestScopeCurrent(n),request:t}):await t();if(!this.isRequestScopeCurrent(n)||!s)return;if(s.preservedWorktrees.length>0&&window.alert(Mt(s.preservedWorktrees)),s.deleted.length>0){let e=new Set(s.deleted),t=new Map(this.selectedSessions);for(let e of s.deleted)t.delete(e);this.selectedSessions=t,this.expandedSessionKey&&e.has(this.expandedSessionKey)&&(this.expandedSessionKey=null),this.deepLinkSessionKey&&e.has(this.deepLinkSessionKey)&&(this.deepLinkSessionKey=null);let i=s.deleted.find(e=>ie(e,n.gateway.snapshot.sessionKey));if(i){let e=T(i)?.agentId??n.context.agentSelection.state.selectedId??`main`;De({selection:n.context.agentSelection,gateway:n.gateway,agentId:e,sessionKey:r({agentId:e,mainKey:E({agentsList:n.context.agents.state.agentsList,hello:n.gateway.snapshot.hello})})})}}await this.refreshSessionList(n),s.errors.length>0&&(a=s.errors.map(({error:e})=>It(e)).join(`; `))}catch(e){this.isRequestScopeCurrent(n)&&(a=g(e))}finally{this.isRequestScopeCurrent(n)&&(this.sessionMutationPending=!1,this.adoptCurrentListSnapshot(),a&&(this.error=a))}}async deleteAllArchived(){let e=this.captureRequestScope(),t=this.pluginActionLifetime.signal;if(!e||this.loading||this.sessionMutationPending)return;let n;try{let{search:t,agentId:r,...i}=this.sessionListOptions(e.context),a=e.context.agentSelection.state.scopeId?.trim(),o={...i,...a?{agentId:a}:{}},s=await Ye({list:t=>e.sessions.list({...o,limit:1e3,offset:t}),isCurrent:()=>this.isRequestScopeCurrent(e),missingResultError:e.sessions.state.error??`archived session enumeration returned no result`,stalledPaginationError:`archived session enumeration did not advance`,incompletePaginationError:`archived session enumeration was incomplete`});if(!s)return;n=s}catch(t){this.isRequestScopeCurrent(e)&&(this.error=g(t));return}let r=n.filter(e=>e.archived===!0);r.length!==0&&await G({message:D(`sessionsView.deleteAllArchivedConfirm`,{count:String(r.length)}),confirmLabel:D(`common.delete`),danger:!0,signal:t})&&this.isRequestScopeCurrent(e)&&await this.deleteSessions(r,{deleteTranscript:!0})}async deleteSessionFromMenu(e){let t=l(e.label)??e.key,n=this.captureRequestScope();n&&await G({message:D(`sessionsView.deleteSessionConfirm`,{session:t}),confirmLabel:D(`common.delete`),danger:!0,signal:this.pluginActionLifetime.signal})&&this.isRequestScopeCurrent(n)&&await this.deleteSessions([e])}async stopCloudWorker(e){let t=l(e.label)??e.key,n=wt(e.placement);if(!n||n.blocksActiveRun&&e.hasActiveRun===!0)return;let r=this.captureRequestScope();if(!r||!await G({message:D(`sessionsView.stopCloudWorkerConfirm`,{session:t}),confirmLabel:D(`sessionsView.stopCloudWorkerConfirmAction`),danger:!0,signal:this.pluginActionLifetime.signal})||!this.isRequestScopeCurrent(r)||!this.requireMutationAccess(r,n))return;this.sessionMutationPending=!0;let i=null;try{let t=T(e.key)?.agentId;await Wt(r.client,{key:e.key,...t?{agentId:t}:{}},r.context.placementStartup),this.isRequestScopeCurrent(r)&&await this.refreshSessionList(r)}catch(e){this.isRequestScopeCurrent(r)&&(i=g(e))}finally{this.isRequestScopeCurrent(r)&&(this.sessionMutationPending=!1,this.adoptCurrentListSnapshot(),i&&(this.error=i))}}knownCategories(){return dn(this.result,this.context?.sessions.state.groups??[])}setGroupBy(e){this.groupBy=e,this.page=0,_n(e)}async rememberCustomGroup(e,t=this.captureRequestScope()){return t?this.requireMutationAccess(t,{method:`sessions.groups.put`,requiredScope:`operator.write`})?fn({name:e,knownCategories:this.knownCategories(),sessions:t.sessions,isCurrent:()=>this.isRequestScopeCurrent(t),onError:e=>{this.error=e}}):`failed`:`stale`}assignCategory(e,t){let n=this.result?.sessions.find(t=>t.key===e);n&&(n.category?.trim()||null)!==t&&(t&&this.rememberCustomGroup(t),this.patchSession(e,{category:t}))}async withDialogLifecycle(e){let t=this.dialogLifecycle;if(t)return e(t.signal);let n=new AbortController;this.dialogLifecycle=n;try{return await e(n.signal)}finally{this.dialogLifecycle===n&&(this.dialogLifecycle=null)}}async loadInputDialog(){try{return(await d(async()=>{let{showInputDialog:e}=await import(`./input-dialog-BFYyIfPn.js`);return{showInputDialog:e}},__vite__mapDeps([0,1,2]),import.meta.url)).showInputDialog}catch(e){return this.error=g(e),null}}async requestNewCategory(e){let t=this.result?.sessions.find(t=>t.key===e);if(e&&!t?.sessionId){this.error=D(`common.refresh`);return}await this.withDialogLifecycle(async e=>{await(await this.loadInputDialog())?.({signal:e,title:D(`sessionsView.newGroupTitle`),label:D(`sessionsView.newGroupPrompt`),submitLabel:D(`sessionsView.newGroupCreate`),requireValue:!0,submit:e=>this.writeNewCategory(e,t)})})}async writeNewCategory(e,t){this.error=null;let n=this.captureRequestScope();if(!n)return D(`sessionsView.newGroupFailed`);let r=await this.rememberCustomGroup(e,n);if(r!==`completed`)return r===`failed`?this.error??D(`sessionsView.newGroupFailed`):D(`sessionsView.newGroupStale`);if(!t)return null;let i=await this.patchSession(t.key,{category:e},n,t.sessionId);return i===`failed`?this.error??D(`sessionsView.newGroupFailed`):i===`stale`?D(`sessionsView.newGroupStale`):null}async renameSession(e){let t=this.captureRequestScope();if(!t){this.error=D(`sessionsView.actionRequiresConnection`);return}let n=$e(e),r=this.pluginActionLifetime.signal,i=await this.withDialogLifecycle(async e=>await(await this.loadInputDialog())?.({signal:AbortSignal.any([e,r]),title:D(`sessionsView.renameSessionPrompt`),defaultValue:n})??null);if(i===null||!this.isRequestScopeCurrent(t))return;let a=Je(i,n,e.label);a&&await this.patchSession(e.key,a,t,e.sessionId,{sessionScope:!0})}async patchSession(e,t,n=this.captureRequestScope(),r,i={}){if(!n)return this.error=D(`sessionsView.actionRequiresConnection`),`failed`;if(typeof t.archived==`boolean`&&!r?.trim())return this.error=`Session lifecycle action requires a durable session identity.`,`failed`;let a=this.sessionAgentId(e,n.context),o=this.result?.sessions.find(t=>t.key===e);if(!this.requireMutationAccess(n,{method:`sessions.patch`,sessionScope:i.sessionScope,session:o,params:{key:e,...t,...a?{agentId:a}:{}}}))return`failed`;try{let s=()=>n.sessions.patch(e,t,{agentId:a,...r?{expectedSessionId:r}:{}}),c=t.archived===!0?await Ft({action:`archive`,session:{key:e,sessionId:r,label:o?.label||o?.displayName||e,agentId:a},scope:{...n,signal:this.pluginActionLifetime.signal},isCurrent:()=>this.isRequestScopeCurrent(n),request:s}):await s();if(c&&i.onConfirmed?.(c),!this.isRequestScopeCurrent(n))return`stale`;if(!c)return this.error=n.sessions.state.error,`failed`;if(await this.refreshSessionList(n),!this.isRequestScopeCurrent(n))return`stale`;let l=new Map(this.selectedSessions);return l.delete(e),this.selectedSessions=l,`completed`}catch(e){return this.isRequestScopeCurrent(n)?(this.error=g(e),`failed`):`stale`}}async archiveSessionWithUndo(e){let t=this.captureRequestScope();if(!t)return;let n=ln(t.sessions,e,this.sessionAgentId(e.key,t.context));if(!n)return;let r=t.sessions.beginArchive(e.key,e.sessionId);if(r)try{await this.patchSession(e.key,{archived:!0},t,e.sessionId,{onConfirmed:n,sessionScope:!0})}finally{r()}}async forkSession(e,t=!1){let n=this.captureRequestScope();if(!n)return;let r=this.sessionAgentId(e,n.context),i={parentSessionKey:e,fork:!0,...t?{forkFrom:`last-completed`}:{},...r?{agentId:r}:{}};if(this.requireMutationAccess(n,{method:`sessions.create`,params:i}))try{let e=await n.sessions.create(i);if(!this.isRequestScopeCurrent(n))return;e?n.context.navigate(`chat`,{...j({context:n.context,face:`chat`,sessionKey:e,agentId:r??this.sessionPathAgentId(e,n.context)}).options,hash:``}):n.sessions.state.error&&(this.error=n.sessions.state.error)}catch(e){this.isRequestScopeCurrent(n)&&(this.error=g(e))}}async toggleSessionDetails(e){if(!this.context)return;let t=this.deepLinkSessionKey!==null;if(this.deepLinkSessionKey=null,t&&this.refreshSessionList(),this.expandedSessionKey===e){this.expandedSessionKey=null;return}this.expandedSessionKey=e}openSessionMenu(e,t,n){if(this.sessionMenu?.key===e.key&&this.sessionMenu.sessionId===e.sessionId&&n){this.closeSessionMenu();return}this.sessionMenu={key:e.key,sessionId:e.sessionId,...t},this.sessionMenuTrigger=n,this.loadSessionMenuWork(e)}closeSessionMenu(){this.context&&et(this.context.gateway).unwatch(this),this.sessionMenu=null,this.sessionMenuTrigger=null,this.sessionMenuWorkVersion+=1,this.sessionMenuWork=null}loadSessionMenuWork(e){let t=++this.sessionMenuWorkVersion;if(!e.worktree){this.sessionMenuWork=null;return}this.sessionMenuWork={loading:!0,pullRequestUrl:null,worktreePath:null};let n=this.captureRequestScope();if(!n){this.sessionMenuWork={loading:!1,pullRequestUrl:null,worktreePath:null};return}let r=et(n.context.gateway),i=Ce(e.key,this.sessionAgentId(e.key,n.context));Tt({client:n.client,loadPullRequests:Le(n.context.gateway.snapshot,`controlUi.sessionPullRequests.subscribe`)===!0?()=>r.load(this,i):void 0,worktreeId:e.worktree.id,execNode:e.execNode}).then(e=>{t===this.sessionMenuWorkVersion&&(this.sessionMenuWork={loading:!1,...e})})}renderSessionMenu(){let e=this.sessionMenu,t=this.context,n=e?this.result?.sessions.find(t=>t.key===e.key&&t.sessionId===e.sessionId):null;return!e||!t||!n?I:xn({context:t,row:n,menu:e,trigger:this.sessionMenuTrigger,disabled:this.loading,groups:this.knownCategories(),work:this.sessionMenuWork,onClose:()=>this.closeSessionMenu(),onAction:r=>{switch(r.kind){case`open-pr`:ve(r.url);break;case`open-in`:ft(r.editor,r.path);break;case`copy-session-id`:case`copy-session-link`:case`copy-session-preview-link`:case`copy-markdown`:case`open-new-tab`:case`open-new-window`:case`split-right`:case`split-below`:it(r.kind,{context:t,session:n,agentId:n.agentId,isCurrent:()=>this.isConnected&&this.context===t});break;case`toggle-pin`:this.patchSession(n.key,{pinned:n.pinned!==!0},void 0,void 0,{sessionScope:!0});break;case`toggle-involving-me`:{let e=this.captureRequestScope();if(!e||!n.sessionId){this.error=D(`sessionsView.actionRequiresConnection`);break}h(e.client,{key:n.key,expectedSessionId:n.sessionId,agentId:n.agentId??this.sessionAgentId(n.key,e.context),hidden:!n.hiddenFromInvolvingMe}).then(async()=>{this.isRequestScopeCurrent(e)&&await this.refreshSessionList(e)}).catch(t=>{this.isRequestScopeCurrent(e)&&(this.error=g(t))});break}case`toggle-unread`:this.patchSession(n.key,{unread:n.unread!==!0});break;case`rename`:this.renameSession(n);break;case`set-color`:this.patchSession(n.key,{color:r.color});break;case`set-icon`:this.patchSession(n.key,{icon:r.icon});break;case`reset-appearance`:this.patchSession(n.key,{icon:null,color:null});break;case`fork`:this.forkSession(n.key,n.hasActiveRun===!0);break;case`plugin`:this.runPluginAction(r.id,e);break;case`move-to-group`:this.assignCategory(n.key,r.category);break;case`new-group`:this.requestNewCategory(n.key);break;case`toggle-archived`:n.archived===!0?this.patchSession(n.key,{archived:!1},void 0,n.sessionId,{sessionScope:!0}):this.archiveSessionWithUndo(n);break;case`assign-owner`:this.context?.sessions.assignOwner(n.key,r.owner);break;case`stop-cloud-worker`:this.stopCloudWorker(n);break;case`delete`:this.deleteSessionFromMenu(n)}}})}render(){let e=this.context,t=(this.result?.owners?.length??0)>1;return e?F`
      ${nn({active:`sessions`,title:Ee(`sessions`),subtitle:F`${Oe(`sessions`)} ${jt(ur)}`,actions:Qt({agents:e.agents.state.agentsList?.agents??[],selection:e.agentSelection}),onSelect:t=>{t!==`sessions`&&e.navigate(t)}})}
      ${Kt(Zn({loading:this.loading,refreshing:this.refreshing,result:this.result,error:this.error,activeMinutes:this.activeMinutes,limit:this.limit,includeGlobal:this.includeGlobal,includeUnknown:this.includeUnknown,statusFilter:this.statusFilter,basePath:e.basePath,agentId:Se(e),mainKey:E({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello}),searchQuery:this.searchQuery,transcriptSearchAvailable:e.gateway.snapshot.phase===`connected`,transcriptSearchQuery:this.transcriptSearchQuery,transcriptSearch:this.transcriptSearchTask.render({initial:()=>({status:`idle`}),pending:()=>({status:`loading`}),complete:e=>({status:`results`,...e}),error:e=>({status:`error`,message:g(e)})}),agentIdentityById:on(this.result,t=>e.agentIdentity.get(t)??void 0),sortColumn:this.sortColumn,sortDir:this.sortDir,groupBy:t||this.groupBy!==`person`?this.groupBy:`none`,personGroupingAvailable:t,knownCategories:this.knownCategories(),page:this.page,pageSize:this.pageSize,selectedKeys:new Set(this.selectedSessions.keys()),sessionMenu:this.sessionMenu,expandedSessionKey:this.expandedSessionKey,labelDisabledReason:e=>this.mutationDisabledReason({method:`sessions.patch`,params:{key:e.key,label:null},sessionScope:!0,session:e}),patchAdminDisabledReason:this.mutationDisabledReason({method:`sessions.patch`,params:{key:``,thinkingLevel:null}}),groupWriteDisabledReason:this.mutationDisabledReason({method:`sessions.groups.put`,requiredScope:`operator.write`}),deleteArchivedDisabledReason:this.mutationDisabledReason({method:`sessions.delete`,params:{key:``,archivedOnly:!0,deleteTranscript:!0}}),deleteSelectedDisabledReason:this.selectedDeleteDisabledReason(),onFiltersChange:e=>this.updateFilters(e),onClearFilters:()=>{this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!1,this.searchQuery=``,this.page=0,this.selectedSessions=new Map,this.deepLinkSessionKey=null,this.refreshSessionList()},onSearchChange:e=>{this.routeDataEnabled=!1,this.deepLinkSessionKey=null,this.searchQuery=e,this.page=0,this.selectedSessions=new Map,this.clearSearchTimer(),this.captureRequestScope()&&(this.searchTimer=setTimeout(()=>{this.searchTimer=void 0,this.bindSessionList()},dr)),this.bindSessionList()},onTranscriptSearchChange:e=>this.updateTranscriptSearchQuery(e),onTranscriptSearch:()=>void this.runTranscriptSearch(),onClearTranscriptSearch:()=>this.resetTranscriptSearchState(``),onSortChange:(e,t)=>{this.sortColumn=e,this.sortDir=t,this.page=0},onGroupByChange:e=>this.setGroupBy(e),onAssignCategory:(e,t)=>this.assignCategory(e,t),onRequestNewCategory:e=>void this.requestNewCategory(e),onLoadMore:()=>{let e=this.listBinding,t=this.result?.nextOffset;e&&this.result?.hasMore&&t!=null&&!this.loading&&this.loadSessionList(e,{offset:t,append:!0})},onPageChange:e=>{this.page=e},onPageSizeChange:e=>{this.pageSize=e,this.page=0},onRefresh:()=>void this.refreshSessionList(),onStatusFilterChange:e=>this.updateStatusFilter(e),onDeleteAllArchived:()=>void this.deleteAllArchived(),onPatch:(e,t,n)=>void this.patchSession(e,t,void 0,void 0,n),onToggleSelect:e=>this.updateSelection([e],`toggle`),onSelectPage:e=>this.updateSelection(e,`select`),onDeselectPage:e=>this.updateSelection(e,`deselect`),onDeselectAll:()=>{this.selectedSessions=new Map},onDeleteSelected:()=>void this.deleteSelected(),onNavigateToChat:t=>{let n=oe(e,t),r=j({context:e,face:n,sessionKey:t,agentId:this.sessionPathAgentId(t,e),preferenceDerivedFace:!0});e.navigate(n,r.options)},onOpenSessionMenu:(e,t,n)=>this.openSessionMenu(e,t,n),onToggleDetails:e=>void this.toggleSessionDetails(e)}),{id:`sessions-hub-panel`})}
      ${this.renderSessionMenu()}
    `:F``}async runPluginAction(e,t){let n=this.captureRequestScope();if(n)try{await zt({runtime:n.context.plugins,id:e,placement:`session`,sessionKey:t.key,session:this.result?.sessions.find(e=>e.key===t.key&&e.sessionId===t.sessionId),signal:this.pluginActionLifetime.signal})}catch(e){this.isRequestScopeCurrent(n)&&(this.error=g(e))}}},c([f({context:je,subscribe:!0})],$.prototype,`context`,void 0),c([Ie({attribute:!1})],$.prototype,`routeData`,void 0),c([R()],$.prototype,`result`,void 0),c([R()],$.prototype,`loading`,void 0),c([R()],$.prototype,`refreshing`,void 0),c([R()],$.prototype,`error`,void 0),c([R()],$.prototype,`activeMinutes`,void 0),c([R()],$.prototype,`limit`,void 0),c([R()],$.prototype,`includeGlobal`,void 0),c([R()],$.prototype,`includeUnknown`,void 0),c([R()],$.prototype,`statusFilter`,void 0),c([R()],$.prototype,`searchQuery`,void 0),c([R()],$.prototype,`transcriptSearchQuery`,void 0),c([R()],$.prototype,`submittedTranscriptSearchQuery`,void 0),c([R()],$.prototype,`sortColumn`,void 0),c([R()],$.prototype,`sortDir`,void 0),c([R()],$.prototype,`groupBy`,void 0),c([R()],$.prototype,`page`,void 0),c([R()],$.prototype,`pageSize`,void 0),c([R()],$.prototype,`selectedSessions`,void 0),c([R()],$.prototype,`sessionMenu`,void 0),c([R()],$.prototype,`sessionMenuWork`,void 0),c([R()],$.prototype,`expandedSessionKey`,void 0),customElements.get(`openclaw-sessions-page`)||customElements.define(`openclaw-sessions-page`,$)})))()}fr();