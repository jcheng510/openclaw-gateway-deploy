import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{F as n,P as r,R as i,ar as a,cc as o,hu as s,ir as c,lu as l,or as u,sc as d,su as f,uu as p}from"./control-ui-core-pYNj5S1a.js";import{Xi as m,Zi as h,wi as g}from"./control-ui-core-D6clmJs8.js";import{$ as _,F as v,M as y,X as b,Y as x,ct as S,nt as C,ut as w}from"./lit-runtime-DZL1fcCI.js";import{Ji as T,Xi as E}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Ar as D,Dr as O,Ya as ee,an as te,nn as ne,on as re,rn as ie}from"./control-ui-boot-shared-DJ4XCcp6.js";import{$n as k,Qn as A,Zn as j,an as M,b as N,cn as P,cr as F,er as I,in as L,nr as R,on as z,sn as B,ur as V}from"./control-ui-boot-shared-e4-xCIbb.js";import{n as H,t as U}from"./panel-empty-state-Dh18ZXJZ.js";function W(e){return e.draft.trim()||(e.attachments?.some(e=>e.mimeType.startsWith(`image/`))?s(`chat.rail.askImageQuestion`):``)}function G(e){let t=null,n=e=>{let n=e instanceof HTMLTextAreaElement?e:null;t&&t!==n&&A(t),t=n,n&&(I(n),R(n))};return{ref:n,dispose(){n()},syncDraft(e){t?.isConnected&&t.value!==e&&R(t)},handleKeydown:t=>{if(t.isComposing||t.keyCode===229)return;let n=e.sendShortcut()===`enter`||t.metaKey||t.ctrlKey;t.key===`Enter`&&!t.shiftKey&&n&&(t.preventDefault(),t.repeat||e.submit())},handleInput:t=>{let n=t.currentTarget;n instanceof HTMLTextAreaElement&&(j(n),e.onDraftChange(n.value))}}}function K(e){let{companion:t,connected:n,pending:r,sendShortcut:i,composer:a,attachmentProps:o,submit:c}=e,l=s(`chat.rail.askPlaceholder`);return _`
    <form
      class="agent-chat__input chat-session-rail__composer"
      @submit=${e=>{e.preventDefault(),c()}}
    >
      ${B(o)}
      ${P(o.attachmentReads?.pendingReads??0)}
      <div class="agent-chat__composer-input-row">
        <label class="agent-chat__composer-combobox chat-session-rail__prompt">
          <textarea
            class="chat-session-rail__input"
            rows="1"
            maxlength="400"
            autocomplete="off"
            aria-label=${s(`chat.rail.askLabel`)}
            aria-keyshortcuts=${i===`enter`?`Enter`:`Control+Enter Meta+Enter`}
            .value=${t.draft}
            placeholder=${l}
            ?disabled=${!n}
            @paste=${e=>{n&&(M(e,o,{imagesOnly:!0}),e.defaultPrevented&&e.stopPropagation())}}
            @keydown=${a.handleKeydown}
            @input=${a.handleInput}
            ${v(a.ref)}
          ></textarea>
          <span class="agent-chat__composer-placeholder" aria-hidden="true">${l}</span>
        </label>
      </div>
      <div class="agent-chat__composer-footer">
        <div class="agent-chat__composer-trail">
          <div class="agent-chat__composer-actions">
            <button
              class="chat-send-btn"
              type="submit"
              aria-label=${s(`chat.rail.askSubmit`)}
              ?disabled=${!n||r||!!o.attachmentReads?.pendingReads||!W(t)}
            >
              ${m.arrowUp}
            </button>
          </div>
        </div>
      </div>
    </form>
  `}function q(){return(q=e((()=>{x(),y(),h(),p(),z(),k()})))()}function J(e){return e.digest?e.running?e.activeRunId&&e.digest.runId===e.activeRunId?e.digest:null:e.digest:null}function ae(e,t){return(e.health===`done`||e.health===`failed`)&&(t??0)<e.updatedAt}function oe(e){let t=e.checks;return t?t.state===`passing`?s(`chat.rail.checksPassing`,{count:String(t.passed)}):t.state===`failing`?s(`chat.rail.checksFailing`,{count:String(t.failed)}):s(`chat.rail.checksPending`,{count:String(t.running)}):null}var Y,X,Z,Q;function $(){return($=e((()=>{N(),x(),C(),y(),h(),te(),D(),U(),ne(),g(),ee(),p(),E(),i(),l(),o(),c(),z(),F(),q(),Y=class{constructor(e=a()){this.displayPreference=e,this.autoExpandedRunIds=new Set,this.autoExpandedRunId=null,this.transientExpanded=!1,this.manualOpen=!1}resetTransientState(){this.transientExpanded=!1,this.autoExpandedRunId=null,this.manualOpen=!1}tryAutoOpen(){return this.displayPreference!==`off`&&(this.transientExpanded=!0,!0)}mode(e){let t=J(e),n=t!==null&&(e.running||ae(t,e.lastReadAt))||e.hasCompanionActivity||this.manualOpen||this.transientExpanded;if(this.displayPreference===`off`||!n)return this.autoExpandedRunId=null,`hidden`;let r=e.activeRunId??t?.runId??null;return(t?.health===`stuck`||t?.health===`waiting-on-user`)&&r&&!this.autoExpandedRunIds.has(r)&&(this.autoExpandedRunIds.add(r),this.autoExpandedRunId=r),this.displayPreference===`card`||this.transientExpanded||r!==null&&this.autoExpandedRunId===r?`expanded`:`pill`}expand(){this.displayPreference=`card`,this.transientExpanded=!1,this.autoExpandedRunId=null,u(`card`)}collapse(){this.displayPreference=`pill`,this.resetTransientState(),u(`pill`)}hide(){this.displayPreference=`off`,this.resetTransientState(),u(`off`)}openExplicitly(){this.displayPreference=`pill`,this.transientExpanded=!0,this.autoExpandedRunId=null,this.manualOpen=!0,u(`pill`)}},X=[`changed`,`stopped`,`remaining`],Z={busy:`chat.rail.askBusy`,"history-unavailable":`chat.rail.askHistoryUnavailable`,missing:`chat.rail.askMissing`,"model-unavailable":`chat.rail.askModelUnavailable`,"image-unsupported":`chat.rail.askImageUnsupported`,"rate-limited":`chat.rail.askRateLimited`,unavailable:`chat.rail.askUnavailable`},Q=class extends f{constructor(){super(),this.sessionKey=``,this.digest=null,this.running=!1,this.activeRunId=null,this.pullRequests=[],this.companion={turns:[],loading:!1,draft:``},this.connected=!1,this.sendShortcut=`enter`,this.command=null,this.consumedCommandGeneration=0,this.embedded=!1,this.presented=!1,this.now=Date.now(),this.railState=new Y,this.clock=null,this.renderedMode=`hidden`,this.reportedMode=null,this.terminalAgeReference=Date.now(),this.composer=G({submit:()=>this.submit(),onDraftChange:e=>this.onDraftChange?.(e),sendShortcut:()=>this.sendShortcut}),new d(this).watch(()=>this.uploadConfig,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.stopClock(),this.composer.dispose(),super.disconnectedCallback()}willUpdate(e){e.has(`sessionKey`)&&(this.terminalAgeReference=Date.now(),this.railState.resetTransientState()),e.has(`digest`)&&this.digest&&(this.digest.health===`done`||this.digest.health===`failed`)&&(this.terminalAgeReference=Date.now()),e.has(`command`)&&this.applyPaneCommand()}applyPaneCommand(){let e=this.command;if(!(!e||e.generation<=this.consumedCommandGeneration)){if(this.onCommandConsumed?.(e.generation),e.intent===`open`){this.railState.tryAutoOpen()&&this.onVisibilityChange?.(!0);return}if(this.renderedMode===`expanded`){this.railState.collapse();return}this.railState.openExplicitly(),this.onVisibilityChange?.(!0)}}updated(e){let t=e.has(`focusRequest`)?this.focusRequest?.():void 0;this.presented&&t&&this.querySelector(`.chat-session-rail__input:not(:disabled)`)?.focus({preventScroll:!0}),this.running&&this.startedAt!=null&&J(this.input())?this.scheduleClock():this.stopClock(),this.reportedMode!==this.renderedMode&&(this.reportedMode=this.renderedMode,this.onModeChange?.(this.renderedMode))}input(){return{running:this.running,activeRunId:this.activeRunId,digest:this.digest,lastReadAt:this.lastReadAt,hasCompanionActivity:this.companion.turns.length>0||this.companion.draft.length>0}}scheduleClock(){this.clock===null&&(this.clock=globalThis.setTimeout(()=>{this.clock=null,this.now=Date.now()},1e3))}stopClock(){this.clock!==null&&(globalThis.clearTimeout(this.clock),this.clock=null)}collapse(){this.railState.collapse(),this.requestUpdate()}expand(){this.railState.expand(),this.requestUpdate()}hide(){this.railState.hide(),this.onVisibilityChange?.(!1),this.requestUpdate()}submit(){let e=W(this.companion);e&&this.connected&&!this.companion.attachmentReads?.pendingReads&&!this.companion.turns.some(e=>e.status===`pending`)&&this.onSubmit?.(e)}renderStatus(e){let t=e.health===`done`||e.health===`failed`,n=e.health===`stuck`||e.health===`waiting-on-user`;return _`
      <span
        class="chat-session-rail__status ${n?`chat-session-rail__status--critical`:``}"
        data-health=${e.health}
      >
        ${t?_`<span class="chat-session-rail__status-icon" aria-hidden="true"
                >${e.health===`done`?m.check:m.x}</span
              >`:_`<span class="chat-session-rail__status-dot" aria-hidden="true"></span>`}
        <span>${s(`chat.rail.health.${e.health}`)}</span>
      </span>
    `}renderPullRequests(){let e=this.pullRequests.slice(0,2);return e.length===0?b:_`
      <div class="chat-session-rail__prs" aria-label=${s(`chat.rail.pullRequests`)}>
        ${e.map(e=>{let t=oe(e);return _`
            <a
              class="chat-session-rail__pr"
              href=${e.url}
              target="_blank"
              rel="noopener noreferrer"
              title=${e.title}
            >
              <span>#${e.number}</span>
              <span>${s(`chat.pullRequests.${e.state}`)}</span>
              ${t?_`<span class="chat-session-rail__pr-checks">${t}</span>`:b}
            </a>
          `})}
      </div>
    `}renderStarters(){return _`
      <div class="chat-session-rail__starters">
        ${X.map(e=>{let t=s(`chat.rail.starters.${e}`);return _`
            <button
              class="chip chat-session-rail__starter"
              type="button"
              ?disabled=${!this.connected}
              @click=${()=>this.onSubmit?.(t)}
            >
              ${m.spark}<span>${t}</span>
            </button>
          `})}
      </div>
    `}renderThread(e){let{turns:t}=this.companion,r=JSON.stringify(t.map(e=>[e.question,e.status]));return _`
      <div
        class="chat-session-rail__thread"
        aria-live="polite"
        @click=${O}
        ${re()}
        ${v(e=>{e instanceof HTMLElement&&e.dataset.railScrollKey!==r&&(e.dataset.railScrollKey=r,e.scrollTop=e.scrollHeight)})}
      >
        ${this.companion.loading&&t.length===0?ie(`chat`,s(`chat.thread.loading`)):b}
        ${!this.companion.loading&&t.length===0?H({icon:m.bot,heading:s(`chat.sidePanel.companion`),description:s(`chat.rail.empty`)}):b}
        ${t.map(t=>_`
            <article
              class="chat-session-rail__exchange ${t.status===`pending`?`chat-session-rail__exchange--pending`:t.status===`failed`?`chat-session-rail__exchange--error`:``}"
            >
              <div class="chat-group user chat-session-rail__message">
                <div class="chat-bubble chat-session-rail__question">
                  ${V(t.question,t.question,{role:`user`,isStreaming:!1},{codeBlockChrome:`none`,codeBlockInteraction:`static`})}
                </div>
              </div>
              ${t.status===`answered`?_`
                      <div class="chat-group assistant chat-session-rail__message">
                        <div class="chat-bubble chat-session-rail__answer">
                          ${V(t.answer,String(t.ts),{role:`assistant`,isStreaming:!1},{codeBlockInteraction:`interactive`})}
                        </div>
                      </div>
                      <time
                        class="chat-session-rail__timestamp"
                        datetime=${new Date(t.ts).toISOString()}
                      >
                        ${s(`chat.rail.asOf`,{time:n(t.ts,{hour:`numeric`,minute:`2-digit`},``)})}
                      </time>
                    `:_`
                      <div class="chat-session-rail__hint">
                        ${s(t.status===`pending`?`chat.rail.askPending`:Z[t.hint])}
                      </div>
                      ${t.status===`failed`&&t.retryable&&this.connected&&this.onSubmit?_`<button
                              class="btn btn--secondary chat-session-rail__retry"
                              type="button"
                              ?disabled=${e}
                              @click=${()=>this.onSubmit?.(t)}
                            >
                              ${s(`chat.rail.askRetry`)}
                            </button>`:b}
                    `}
            </article>
          `)}
      </div>
    `}render(){this.composer.syncDraft(this.companion.draft);let e=this.companion,t=e.attachmentReads,n=t?.readSignal,i={uploadConfig:this.uploadConfig,attachments:e.attachments,getAttachments:()=>e.attachments??[],attachmentReads:t,readSignal:n,attachmentLimits:this.attachmentLimits,selectionContextOnly:!0,imagesOnly:!0,disabled:!this.connected,onAttachmentsChange:this.onAttachmentsChange,onPendingReadsChange:e=>{n&&t?.updatePending(n,e)}},a=L({...i,canCompose:this.connected}),o=this.companion.turns.some(e=>e.status===`pending`),c=this.input(),l=this.embedded?`expanded`:this.railState.mode(c);if(this.renderedMode=l,l===`hidden`)return b;let u=J(c);if(l===`pill`)return _`
        <div class="chat-session-rail chat-session-rail--pill" aria-live="polite">
          ${u?this.renderStatus(u):b}
          <button
            class="chat-session-rail__expand"
            type="button"
            aria-label=${s(`chat.rail.expand`)}
            @click=${()=>this.expand()}
          >
            <span class="chat-session-rail__headline"
              >${u?.headline??s(`chat.rail.title`)}</span
            >
          </button>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__hide"
            type="button"
            aria-label=${s(`chat.rail.close`)}
            @click=${()=>this.hide()}
          >
            ${m.x}
          </button>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__toggle"
            type="button"
            aria-label=${s(`chat.rail.expand`)}
            @click=${()=>this.expand()}
          >
            ${m.chevronDown}
          </button>
        </div>
      `;let d=this.running&&this.startedAt!=null?T(Math.max(0,this.now-this.startedAt)):null,f=u&&(u.health===`done`||u.health===`failed`)?s(`chat.rail.finished`,{time:r(Math.max(0,this.terminalAgeReference-u.updatedAt))}):null;return _`
      <section
        class="chat-session-rail chat-session-rail--expanded ${this.embedded?`chat-session-rail--embedded`:``}"
        role="region"
        aria-label=${s(`chat.rail.title`)}
        tabindex="-1"
        @dragenter=${a.onDragenter}
        @dragleave=${a.onDragleave}
        @dragover=${a.onDragover}
        @drop=${a.onDrop}
        @keydown=${e=>{!this.embedded&&e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),this.collapse())}}
      >
        ${this.embedded?b:_`<header class="rail-header chat-session-rail__header">
                <div class="rail-header__copy chat-session-rail__header-copy">
                  <div class="chat-session-rail__status-row">
                    ${u?this.renderStatus(u):_`<strong>${s(`chat.rail.title`)}</strong>`}
                    ${d?_`<span class="chat-session-rail__timing">${d}</span>`:f?_`<span class="chat-session-rail__timing">${f}</span>`:b}
                  </div>
                  ${u?_`<strong class="chat-session-rail__headline"
                          >${u.headline}</strong
                        >`:_`<span class="chat-session-rail__subtitle"
                          >${s(`chat.rail.subtitle`)}</span
                        >`}
                </div>
                <div class="rail-header__actions chat-session-rail__actions">
                  <button
                    class="rail-header__action chat-session-rail__hide"
                    type="button"
                    aria-label=${s(`chat.rail.close`)}
                    @click=${()=>this.hide()}
                  >
                    ${m.x}
                  </button>
                  <button
                    class="rail-header__action chat-session-rail__toggle"
                    type="button"
                    aria-label=${s(`chat.rail.collapse`)}
                    @click=${()=>this.collapse()}
                  >
                    ${m.chevronUp}
                  </button>
                </div>
              </header>`}
        ${u?this.renderPullRequests():b} ${this.renderThread(o)}
        ${this.companion.turns.some(e=>e.status!==`failed`)?b:this.renderStarters()}
        <openclaw-chat-comment-controller
          .paneId=${`side-chat:${this.sessionKey}`}
          .props=${i}
          .sessionKey=${this.sessionKey}
          .presented=${this.presented}
        ></openclaw-chat-comment-controller>
        ${K({companion:e,connected:this.connected,pending:o,sendShortcut:this.sendShortcut,composer:this.composer,attachmentProps:i,submit:()=>this.submit()})}
      </section>
    `}},t([w({attribute:!1})],Q.prototype,`sessionKey`,void 0),t([w({attribute:!1})],Q.prototype,`digest`,void 0),t([w({attribute:!1})],Q.prototype,`running`,void 0),t([w({attribute:!1})],Q.prototype,`activeRunId`,void 0),t([w({attribute:!1})],Q.prototype,`startedAt`,void 0),t([w({attribute:!1})],Q.prototype,`lastReadAt`,void 0),t([w({attribute:!1})],Q.prototype,`pullRequests`,void 0),t([w({attribute:!1})],Q.prototype,`companion`,void 0),t([w({attribute:!1})],Q.prototype,`connected`,void 0),t([w({attribute:!1})],Q.prototype,`sendShortcut`,void 0),t([w({attribute:!1})],Q.prototype,`command`,void 0),t([w({attribute:!1})],Q.prototype,`consumedCommandGeneration`,void 0),t([w({attribute:!1})],Q.prototype,`onCommandConsumed`,void 0),t([w({attribute:!1})],Q.prototype,`onSubmit`,void 0),t([w({attribute:!1})],Q.prototype,`onDraftChange`,void 0),t([w({attribute:!1})],Q.prototype,`onAttachmentsChange`,void 0),t([w({attribute:!1})],Q.prototype,`attachmentLimits`,void 0),t([w({attribute:!1})],Q.prototype,`uploadConfig`,void 0),t([w({attribute:!1})],Q.prototype,`onModeChange`,void 0),t([w({attribute:!1})],Q.prototype,`onVisibilityChange`,void 0),t([w({type:Boolean})],Q.prototype,`embedded`,void 0),t([w({type:Boolean})],Q.prototype,`presented`,void 0),t([w({attribute:!1})],Q.prototype,`focusRequest`,void 0),t([S()],Q.prototype,`now`,void 0),customElements.get(`openclaw-chat-session-rail`)||customElements.define(`openclaw-chat-session-rail`,Q)})))()}$();export{Q as ChatSessionRailElement,Y as ChatSessionRailState};