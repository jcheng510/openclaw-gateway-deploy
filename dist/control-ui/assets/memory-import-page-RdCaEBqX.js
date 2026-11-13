import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Et as n,Tt as r,qr as i,zr as a}from"./control-ui-foundation-C3MHh_P-.js";import{Fc as o,Gl as s,Ic as ee,Kl as c,Pc as l,cc as te,hu as u,lu as ne,ql as d,sc as f,su as re,uu as p}from"./control-ui-core-pYNj5S1a.js";import{Br as m,Ma as ie,Xi as h,Zi as ae,_r as g,fr as _,ja as v,va as y,vi as b,yi as x}from"./control-ui-core-D6clmJs8.js";import{$ as S,X as C,Y as w,ct as T,nt as oe}from"./lit-runtime-DZL1fcCI.js";import{d as se,l as ce}from"./gateway-runtime-iOL78mIi.js";import{L as le,R as ue,V as E,z as de}from"./control-ui-boot-shared-D-LYw3KU.js";import{At as D,Ba as fe,Dt as O,Et as k,Ft as A,It as j,Mt as M,Ot as N,Ua as P,_t as F,xt as I,yt as L}from"./control-ui-boot-shared-DJ4XCcp6.js";import{gt as R}from"./control-ui-boot-new-CaEHEcx2.js";import{n as z,t as B}from"./settings-workspace-DKW0BVnu.js";import{n as V,t as pe}from"./en-memory-import-D52tmpPI.js";function me(e){return e.backfillRollbackPending?S`
    <openclaw-modal-dialog
      label=${u(`memoryImport.backfill.rollbackConfirmTitle`)}
      description=${u(`memoryImport.backfill.rollbackConfirmDescription`)}
      @modal-cancel=${e.onBackfillRollbackCancel}
    >
      <div class="exec-approval-card memory-import__confirm">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">
              ${u(`memoryImport.backfill.rollbackConfirmTitle`)}
            </div>
            <div class="exec-approval-sub">
              ${u(`memoryImport.backfill.rollbackConfirmDescription`)}
            </div>
          </div>
        </div>
        <div class="callout warn">${u(`memoryImport.backfill.rollbackWarning`)}</div>
        <div class="exec-approval-actions">
          <button
            class="btn danger"
            data-test-id="memory-backfill-rollback-confirm"
            ?disabled=${e.backfillBusy!==null||e.applyingProviderId!==null}
            @click=${e.onBackfillRollbackConfirm}
          >
            ${u(`memoryImport.backfill.rollback`)}
          </button>
          <button
            class="btn"
            ?disabled=${e.backfillBusy!==null||e.applyingProviderId!==null}
            @click=${e.onBackfillRollbackCancel}
          >
            ${u(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `:C}function H(){return(H=e((()=>{w(),m(),p()})))()}function U(e,t){let n=e.details?.[t];return typeof n==`string`&&n.trim()?n:void 0}function he(e){let t=new Map;for(let n of e){let e=U(n,`collectionId`)??n.id,r=U(n,`collectionLabel`)??U(n,`sourceLabel`)??u(`memoryImport.unknownCollection`),i=t.get(e)??{id:e,label:r,items:[]};i.items.push(n),t.set(e,i)}return[...t.values()].toSorted((e,t)=>e.label.localeCompare(t.label))}function W(e){return e.providerId===`claude`?u(`memoryImport.claudeCode`):e.label}function ge(e){return e.providerId===`codex`?u(`memoryImport.codexDescription`):e.providerId===`claude`?u(`memoryImport.claudeDescription`):u(`memoryImport.providerFallback`)}function G(e){return u(e===1?`memoryImport.fileCountOne`:`memoryImport.fileCount`,{count:String(e)})}function _e(e){return u(e===1?`memoryImport.backfill.processedDayCountOne`:`memoryImport.backfill.processedDayCount`,{count:String(e)})}function K(e){let t=U(e,`relativePath`);if(t)return t;let n=e.target??e.source??e.id;return n.split(/[\\/]/u).at(-1)??n}function ve(e,t,n,r,i){let a=t.items.filter(e=>e.status===`planned`).map(e=>e.id),o=a.length>0&&a.every(e=>n.has(e)),s=t.items.filter(e=>e.status===`conflict`).length;return S`
    <div class="settings-row settings-row--stacked memory-import__collection">
      <div class="memory-import__collection-header">
        <label class="memory-import__collection-choice">
          <input
            type="checkbox"
            .checked=${o}
            ?disabled=${a.length===0||i}
            @change=${t=>r(e.providerId,a,t.currentTarget.checked)}
          />
          <span>
            <strong>${t.label}</strong>
            <small>${G(t.items.length)}</small>
          </span>
        </label>
        ${s>0?M({kind:`warn`,label:u(`memoryImport.alreadyImported`,{count:String(s)})}):C}
      </div>
      <details ?open=${t.items.length<=4}>
        <summary>${u(`memoryImport.reviewFiles`)}</summary>
        <ul class="memory-import__files">
          ${t.items.map(e=>S`
              <li>
                <span class="memory-import__file-icon" aria-hidden="true">${h.fileText}</span>
                <code title=${e.source??K(e)}>${K(e)}</code>
                <span class="memory-import__file-status memory-import__file-status--${e.status}">
                  ${e.status===`planned`?u(`memoryImport.ready`):e.status===`conflict`?u(`memoryImport.existing`):e.status}
                </span>
              </li>
            `)}
        </ul>
      </details>
    </div>
  `}function ye(e){if(!e)return C;let t=e.summary.errors>0||e.summary.conflicts>0,n=e.items.filter(e=>e.status===`error`||e.status===`conflict`||U(e,`recoveryRecordPath`)!==void 0);return S`
    <div
      class="settings-row settings-row--stacked memory-import__result ${t?`memory-import__result--incomplete`:``}"
      role=${t?`alert`:`status`}
    >
      <span aria-hidden="true">${t?h.alertTriangle:h.check}</span>
      <div>
        <strong>
          ${u(t?`memoryImport.importIncomplete`:`memoryImport.importComplete`)}
        </strong>
        <span>
          ${t?u(`memoryImport.importedWithIssues`,{conflicts:String(e.summary.conflicts),errors:String(e.summary.errors),migrated:String(e.summary.migrated)}):u(`memoryImport.importedCount`,{count:String(e.summary.migrated)})}
        </span>
        ${e.reportDir?S`<span class="memory-import__result-path">
                ${u(`memoryImport.reportSaved`)}:
                <code title=${e.reportDir}>${e.reportDir}</code>
              </span>`:C}
        ${n.length>0?S`<ul class="memory-import__result-issues">
                ${n.map(e=>{let t=[{label:u(`memoryImport.recoveryFile`),path:U(e,`recoveryPath`)},{label:u(`memoryImport.recoveryJournal`),path:U(e,`recoveryRecordPath`)},{label:u(`memoryImport.itemBackup`),path:U(e,`backupPath`)}].filter(e=>!!e.path);return S`<li>
                    <strong>${K(e)}</strong>
                    <span>${c(e.reason??e.message,e.status)}</span>
                    ${t.map(e=>S`<span class="memory-import__result-artifact">
                        <span>${e.label}</span>
                        <code title=${e.path}>${e.path}</code>
                      </span>`)}
                  </li>`})}
              </ul>`:C}
      </div>
    </div>
  `}function q(e,t){let n=new Set(e.selectedByProvider[t.providerId]??[]),r=he(t.items),i=e.applyingProviderId===t.providerId,a=e.backfillBusy===`apply`||e.backfillBusy===`rollback`||e.backfillRollbackPending,o=t.error?S`<div class="callout danger" role="alert">${c(t.error)}</div>`:t.found?S`
          ${t.source?N({title:u(`memoryImport.source`),control:j(t.source,{mono:!0})}):C}
          ${t.target?N({title:u(`memoryImport.destination`),control:j(`${t.target}/memory/imports/`,{mono:!0})}):C}
          ${r.map(r=>ve(t,r,n,e.onToggleCollection,e.loading||e.applyingProviderId!==null||e.error!==null||a))}
          ${N({title:n.size>0?u(`memoryImport.selectedCount`,{count:String(n.size)}):u(`memoryImport.selectAtLeastOne`),control:S`
              <button
                class="btn primary"
                data-test-id="memory-import-provider-button"
                ?disabled=${n.size===0||e.applyingProviderId!==null||a||e.loading||e.error!==null}
                @click=${()=>e.onRequestImport(t.providerId)}
              >
                ${u(i?`common.importing`:`memoryImport.importSelected`)}
              </button>
            `})}
        `:I(t.message??u(`memoryImport.noMemoryFound`));return S`
    <div data-provider-id=${t.providerId}>
      ${D({title:S`<span class="memory-import__provider-title">
            ${P(t.providerId,{className:`memory-import__provider-icon`})}
            ${W(t)}
          </span>`,description:ge(t),actions:M({kind:t.found?`ok`:`muted`,label:t.found?G(t.items.length):u(`memoryImport.notFound`)})},S`${o}${ye(e.lastResults[t.providerId])}`)}
    </div>
  `}function be(e){let t=e.plan?.providers.find(t=>t.providerId===e.pendingProviderId);if(!t)return C;let n=e.selectedByProvider[t.providerId]?.length??0,r=u(`memoryImport.confirmTitle`,{provider:W(t)}),i=u(`memoryImport.confirmDescription`,{count:String(n)});return S`
    <openclaw-modal-dialog
      label=${r}
      description=${i}
      @modal-cancel=${()=>{e.applyingProviderId===null&&e.onCancelImport()}}
    >
      <div class="exec-approval-card memory-import__confirm">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${r}</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
        </div>
        <div class="callout ${e.replaceExisting?`warn`:``}">
          ${e.replaceExisting?u(`memoryImport.confirmReplace`):u(`memoryImport.confirmBackup`)}
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            data-test-id="memory-import-confirm"
            ?disabled=${e.applyingProviderId!==null}
            @click=${e.onConfirmImport}
          >
            ${u(`memoryImport.confirmImport`)}
          </button>
          <button
            class="btn"
            ?disabled=${e.applyingProviderId!==null}
            @click=${e.onCancelImport}
          >
            ${u(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function xe(e){let t=e.loading||e.applyingProviderId!==null||e.backfillBusy!==null;return D({title:u(`memoryImport.title`),description:u(`memoryImport.subtitle`),actions:S`
        <button class="btn btn--sm" ?disabled=${t} @click=${e.onRefresh}>
          ${e.loading?u(`common.refreshing`):u(`common.refresh`)}
        </button>
      `},S`
      ${e.agents.length>1?N({title:u(`memoryImport.agent`),control:S`
                <openclaw-agent-select
                  class="agent-select--settings"
                  name="memory-import-agent"
                  .options=${e.agents.map(e=>({value:e.id,label:ee(e),agent:e}))}
                  .value=${e.selectedAgentId??``}
                  .accessibleLabel=${u(`memoryImport.agent`)}
                  .disabled=${t}
                  .onSelect=${e.onSelectAgent}
                ></openclaw-agent-select>
              `}):C}
      ${A({title:u(`memoryImport.replaceExisting`),description:u(`memoryImport.replaceHint`),checked:e.replaceExisting,disabled:t,onChange:t=>e.onReplaceExisting(t)})}
    `)}function Se(e){let t=e.backfillBusy!==null||e.applyingProviderId!==null,n=e.backfillPreview,r=(e,n,r)=>S`<label>
    <span>${e}</span>
    <input
      class="input"
      type="date"
      .value=${n}
      ?disabled=${t}
      @input=${e=>r(e.currentTarget.value)}
    />
  </label>`,i=(e,n,r,i)=>S`<button
    class=${n}
    data-test-id=${`memory-backfill-${e}`}
    ?disabled=${t}
    @click=${i}
  >
    ${r}
  </button>`;return S`
    <div data-test-id="memory-session-backfill">
      ${D({title:u(`memoryImport.backfill.title`),description:u(`memoryImport.backfill.subtitle`)},S`
          ${e.backfillAvailable?S`
                  ${N({title:u(`memoryImport.backfill.dateRange`),description:u(`memoryImport.backfill.dateRangeHint`),control:S`<div class="memory-import__backfill-dates">
                      ${r(u(`memoryImport.backfill.from`),e.backfillFrom,e.onBackfillFromChange)}
                      ${r(u(`memoryImport.backfill.to`),e.backfillTo,e.onBackfillToChange)}
                    </div>`})}
                  ${N({title:u(`memoryImport.backfill.actions`),control:S`<div class="memory-import__backfill-actions">
                      ${i(`preview`,`btn`,u(e.backfillBusy===`preview`?`memoryImport.backfill.previewing`:`memoryImport.backfill.preview`),e.onBackfillPreview)}
                      ${i(`apply`,`btn primary`,u(e.backfillBusy===`apply`?`memoryImport.backfill.applying`:`memoryImport.backfill.apply`),e.onBackfillApply)}
                      ${i(`rollback`,`btn danger`,u(`memoryImport.backfill.rollback`),e.onBackfillRollbackRequest)}
                    </div>`})}
                  ${e.backfillError?S`<div class="callout danger" role="alert">${e.backfillError}</div>`:C}
                  ${n?S`<div
                          class="settings-row settings-row--stacked memory-import__backfill-preview"
                        >
                          <strong role="status">
                            ${u(`memoryImport.backfill.previewSummary`,{candidates:String(n.candidates),days:String(n.days)})}
                          </strong>
                          ${n.perDay.length>0?S`<ul>
                                  ${n.perDay.map(e=>S`<li>
                                      <div>
                                        <strong>${e.day}</strong>
                                        <span>
                                          ${u(`memoryImport.backfill.candidateCount`,{count:String(e.candidateCount)})}
                                        </span>
                                      </div>
                                      ${e.sample.length>0?S`<ul>
                                              ${e.sample.map(e=>S`<li>${e}</li>`)}
                                            </ul>`:C}
                                    </li>`)}
                                </ul>`:S`<span>${u(`memoryImport.backfill.noCandidates`)}</span>`}
                          ${n.truncated?S`<div class="callout warn">
                                  ${u(`memoryImport.backfill.previewTruncated`)}
                                </div>`:C}
                        </div>`:C}
                  ${e.backfillProgress?S`<div
                          class="settings-row settings-row--stacked memory-import__backfill-progress"
                          role="status"
                        >
                          <strong>
                            ${e.backfillProgress.complete?u(`memoryImport.backfill.complete`,{count:String(e.backfillProgress.staged)}):u(`memoryImport.backfill.progress`,{days:String(e.backfillProgress.days),staged:String(e.backfillProgress.staged)})}
                          </strong>
                          <span>
                            ${u(`memoryImport.backfill.processedCandidates`,{count:String(e.backfillProgress.candidates)})}
                            · ${_e(e.backfillProgress.days)}
                          </span>
                        </div>`:C}
                  ${e.backfillRollbackResult?S`<div class="settings-row settings-row--stacked" role="status">
                          <strong>${u(`memoryImport.backfill.rollbackComplete`)}</strong>
                          <span>
                            ${u(`memoryImport.backfill.rollbackCounts`,{diary:String(e.backfillRollbackResult.removedDiaryEntries),staged:String(e.backfillRollbackResult.removedStagedEntries)})}
                          </span>
                        </div>`:C}
                `:I(u(`memoryImport.backfill.unavailable`))}
        `)}
      ${me(e)}
    </div>
  `}function Ce(e){return e.connected?e.canAdmin?S`
    <div class="memory-import" data-test-id="memory-import-page">
      ${k(S`
        ${xe(e)} ${Se(e)}
        ${e.error?S`<div class="callout danger" role="alert">${e.error}</div>`:C}
        ${e.applyError?S`<div class="callout danger" role="alert">${e.applyError}</div>`:C}
        ${e.loading&&!e.plan?S`<div class="settings-group memory-import__loading" aria-busy="true">
                <div class="skeleton memory-import__skeleton"></div>
                <div class="skeleton memory-import__skeleton"></div>
              </div>`:(e.plan?.providers??[]).map(t=>q(e,t))}
        ${be(e)}
      `)}
    </div>
  `:k(I(u(`memoryImport.adminRequired`))):k(I(u(`memoryImport.disconnected`)))}function J(){return(J=e((()=>{w(),R(),m(),ae(),fe(),F(),p(),pe(),l(),d(),H(),V()})))()}function Y(e){return s(e,`request failed`)}var X,Z,Q;function $(){return($=e((()=>{t(),le(),w(),oe(),y(),x(),g(),F(),B(),l(),d(),ce(),n(),ne(),te(),J(),X=14,Z=`https://docs.openclaw.ai/install/migrating`,Q=class extends re{constructor(...e){super(...e),this.replaceExisting=!1,this.selectedByProvider={},this.applyingProviderId=null,this.pendingImport=null,this.applyError=null,this.lastResults={},this.backfillFrom=``,this.backfillTo=``,this.backfillBusy=null,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillRollbackPending=!1,this.applyEpoch=0,this.backfillEpoch=0,this.lastPlanValue=null,this.subscriptions=new f(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t)),this.planTask=new ue(this,{args:()=>{let e=this.context?.gateway.snapshot;return[this.isConnected&&e?.phase===`connected`?e.client??null:null,e?_(e.hello?.auth??null):!1,this.currentAgentId(),this.replaceExisting]},task:async([e,t,n,r],{signal:i})=>!e||!t||!n?de:{client:e,agentId:n,overwrite:r,plan:await e.request(`migrations.memory.plan`,{agentId:n,overwrite:r},{signal:i})},onComplete:e=>{let t=this.lastPlanValue;t&&(t.client!==e.client||t.agentId!==e.agentId||t.overwrite!==e.overwrite)&&(this.resetMutationState({preserveAttemptedImport:t.client!==e.client}),(t.client!==e.client||t.agentId!==e.agentId)&&this.resetBackfillState()),this.lastPlanValue=e;let{plan:n}=e;this.selectedByProvider=Object.fromEntries(n.providers.map(e=>[e.providerId,e.items.filter(e=>e.status===`planned`).map(e=>e.id)]))}})}disconnectedCallback(){this.planTask.run([null,!1,null,this.replaceExisting]),this.applyEpoch+=1,this.backfillEpoch+=1,this.subscriptions.clear(),super.disconnectedCallback()}updated(){let e=this.context.gateway.snapshot;this.pendingImport&&(e.phase!==`connected`||e.client!==(this.planTask.value??this.lastPlanValue)?.client||this.currentAgentId()!==this.pendingImport.agentId)&&this.resetMutationState({preserveAttemptedImport:!0}),e.phase!==`connected`&&(this.backfillBusy!==null||this.backfillRollbackPending)&&this.resetBackfillState()}currentAgentId(){let e=this.context.agents.state.agentsList;if(!e)return null;let t=o(e.agents),n=this.context.agentSelection.state.selectedId;return n&&t.some(e=>e.id===n)?n:t.some(t=>t.id===e.defaultId)?e.defaultId:t[0]?.id??null}get plan(){let e=this.planTask.value??this.lastPlanValue,t=this.context.gateway.snapshot,n=this.currentAgentId();return e&&t.phase===`connected`&&e.client===t.client&&e.agentId===n&&e.overwrite===this.replaceExisting?e.plan:null}get loading(){return this.planTask.status===E.PENDING}get error(){return this.planTask.status===E.ERROR?Y(this.planTask.error):null}get canAdmin(){return _(this.context.gateway.snapshot.hello?.auth??null)}resetMutationState(e={}){let t=e.preserveAttemptedImport&&this.pendingImport?.attempted?this.pendingImport:null;this.applyEpoch+=1,this.selectedByProvider={},this.applyingProviderId=null,this.pendingImport=t,this.applyError=null,this.lastResults={}}refresh(){return this.currentAgentId()?this.planTask.run():this.context.agents.ensureList().then(()=>void 0)}selectAgent(e){this.context.agentSelection.set(e),this.resetMutationState(),this.resetBackfillState()}setReplaceExisting(e){this.replaceExisting=e,this.resetMutationState()}toggleCollection(e,t,n){let r=new Set(this.selectedByProvider[e]??[]);for(let e of t)n?r.add(e):r.delete(e);this.selectedByProvider={...this.selectedByProvider,[e]:[...r]}}requestImport(e){if(!this.canAdmin)return;let t=this.currentAgentId(),n=this.plan?.providers.find(t=>t.providerId===e)?.planFingerprint,i=this.selectedByProvider[e]??[];!this.loading&&this.error===null&&this.applyingProviderId===null&&this.backfillBusy!==`apply`&&this.backfillBusy!==`rollback`&&!this.backfillRollbackPending&&t&&this.plan?.agentId===t&&n&&i.length!==0&&(this.applyError=null,this.pendingImport={providerId:e,agentId:t,planFingerprint:n,itemIds:[...i],overwrite:this.replaceExisting,idempotencyKey:r(),attempted:!1})}async confirmImport(){if(!this.canAdmin||this.applyingProviderId!==null||this.backfillBusy===`apply`||this.backfillBusy===`rollback`||this.backfillRollbackPending)return;let e=this.pendingImport,t=this.context.gateway.snapshot;if(!e||!t.client||this.currentAgentId()!==e.agentId||this.plan?.agentId!==e.agentId)return;let n={...e,attempted:!0},r=t.client;this.pendingImport=n;let i=++this.applyEpoch;this.applyingProviderId=n.providerId,this.applyError=null;try{let e=await r.request(`migrations.memory.apply`,{idempotencyKey:n.idempotencyKey,agentId:n.agentId,providerId:n.providerId,planFingerprint:n.planFingerprint,itemIds:n.itemIds,overwrite:n.overwrite});if(i!==this.applyEpoch||this.context.gateway.snapshot.phase!==`connected`||this.context.gateway.snapshot.client!==r||this.currentAgentId()!==n.agentId)return;this.lastResults={...this.lastResults,[n.providerId]:e},this.pendingImport=null,await this.refresh()}catch(e){i===this.applyEpoch&&(this.applyError=Y(e))}finally{i===this.applyEpoch&&(this.applyingProviderId=null)}}resetBackfillState(){this.backfillEpoch+=1,this.backfillFrom=``,this.backfillTo=``,this.backfillBusy=null,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillRollbackPending=!1}backfillRequest(e){return{agentId:e,...this.backfillFrom?{from:this.backfillFrom}:{},...this.backfillTo?{to:this.backfillTo}:{},limitDays:X}}isCurrentBackfillRequest(e,t,n){return e===this.backfillEpoch&&this.context.gateway.snapshot.phase===`connected`&&this.context.gateway.snapshot.client===t&&this.currentAgentId()===n}async runBackfill(e){let t=this.context.gateway.snapshot.client,n=this.currentAgentId();if(!this.canAdmin||!t||!n||this.backfillBusy!==null||this.applyingProviderId!==null||e===`rollback`&&!this.backfillRollbackPending)return;let r=++this.backfillEpoch,i=()=>this.isCurrentBackfillRequest(r,t,n);this.backfillBusy=e,this.backfillError=null,e!==`rollback`&&(this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null);try{if(e===`rollback`){let e=await t.request(`memory.sessionBackfill.rollback`,{agentId:n});i()&&(this.backfillRollbackResult=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackPending=!1)}else if(e===`preview`){let e=await t.request(`memory.sessionBackfill.preview`,this.backfillRequest(n));i()&&(this.backfillPreview=e)}else{let e={days:0,candidates:0,staged:0,complete:!1};this.backfillProgress=e;let r=new Set;for(;;){let a=await t.request(`memory.sessionBackfill.apply`,this.backfillRequest(n));if(!i())return;if(a.candidates>0&&a.cursor?.advanced!==!0)throw Error(`Session backfill stopped because the server cursor did not advance.`);if(a.candidates===0&&a.cursor?.exhausted!==!0)throw Error(`Session backfill stopped because the server cursor was not exhausted.`);for(let e of a.perDay)r.add(e.day);if(e={days:r.size,candidates:e.candidates+a.candidates,staged:e.staged+a.staged,complete:a.candidates===0},this.backfillProgress=e,a.candidates===0)break}}}catch(e){i()&&(this.backfillError=Y(e))}finally{i()&&(this.backfillBusy=null)}}render(){let e=this.context.gateway.snapshot,t=this.context.agents.state.agentsList,n=this.currentAgentId(),r=Ce({connected:e.phase===`connected`,canAdmin:this.canAdmin,agents:o(t?.agents??[]),selectedAgentId:n,plan:this.plan,loading:this.loading||this.context.agents.state.agentsLoading,error:(n?null:this.context.agents.state.agentsError)??this.error,applyError:this.applyError,replaceExisting:this.replaceExisting,selectedByProvider:this.selectedByProvider,applyingProviderId:this.applyingProviderId,pendingProviderId:this.pendingImport?.agentId===n?this.pendingImport.providerId:null,lastResults:this.lastResults,backfillAvailable:se(e,`memory.sessionBackfill.preview`)!==!1,backfillFrom:this.backfillFrom,backfillTo:this.backfillTo,backfillBusy:this.backfillBusy,backfillError:this.backfillError,backfillPreview:this.backfillPreview,backfillProgress:this.backfillProgress,backfillRollbackResult:this.backfillRollbackResult,backfillRollbackPending:this.backfillRollbackPending,onSelectAgent:e=>this.selectAgent(e),onReplaceExisting:e=>this.setReplaceExisting(e),onRefresh:()=>void this.refresh(),onToggleCollection:(e,t,n)=>this.toggleCollection(e,t,n),onRequestImport:e=>this.requestImport(e),onConfirmImport:()=>void this.confirmImport(),onCancelImport:()=>{this.applyingProviderId===null&&(this.pendingImport=null,this.applyError=null)},onBackfillFromChange:e=>{this.backfillFrom=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillError=null},onBackfillToChange:e=>{this.backfillTo=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillError=null},onBackfillPreview:()=>void this.runBackfill(`preview`),onBackfillApply:()=>void this.runBackfill(`apply`),onBackfillRollbackRequest:()=>{this.backfillBusy===null&&(this.backfillRollbackPending=!0,this.backfillError=null)},onBackfillRollbackConfirm:()=>void this.runBackfill(`rollback`),onBackfillRollbackCancel:()=>{this.backfillBusy===null&&(this.backfillRollbackPending=!1)}});return S`
      ${O({title:ie(`memory-import`),subtitle:S`${v(`memory-import`)}
        ${L(Z)}`})}
      ${z(r)}
    `}},i([a({context:b,subscribe:!0})],Q.prototype,`context`,void 0),i([T()],Q.prototype,`replaceExisting`,void 0),i([T()],Q.prototype,`selectedByProvider`,void 0),i([T()],Q.prototype,`applyingProviderId`,void 0),i([T()],Q.prototype,`pendingImport`,void 0),i([T()],Q.prototype,`applyError`,void 0),i([T()],Q.prototype,`lastResults`,void 0),i([T()],Q.prototype,`backfillFrom`,void 0),i([T()],Q.prototype,`backfillTo`,void 0),i([T()],Q.prototype,`backfillBusy`,void 0),i([T()],Q.prototype,`backfillError`,void 0),i([T()],Q.prototype,`backfillPreview`,void 0),i([T()],Q.prototype,`backfillProgress`,void 0),i([T()],Q.prototype,`backfillRollbackResult`,void 0),i([T()],Q.prototype,`backfillRollbackPending`,void 0),customElements.get(`openclaw-memory-import-page`)||customElements.define(`openclaw-memory-import-page`,Q)})))()}$();