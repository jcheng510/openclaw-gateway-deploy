import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{Ai as i,N as a,Ni as o,R as s,cc as c,hu as l,lu as u,sc as d,su as f,uu as p}from"./control-ui-core-pYNj5S1a.js";import{vi as m,yi as h}from"./control-ui-core-D6clmJs8.js";import{$ as g,X as _,Y as v,ct as y,nt as b,ut as x}from"./lit-runtime-DZL1fcCI.js";import{d as S,l as C}from"./gateway-runtime-iOL78mIi.js";import{_t as w,in as T,wt as E}from"./control-ui-boot-shared-DJ4XCcp6.js";import{i as D,r as O,t as k}from"./custodian-surface-D56eTXlj.js";import"./settings-DdI5hVp3.js";function A(e){switch(e){case`system-agent`:return l(`custodian.history.sources.systemAgent`);case`doctor`:return l(`custodian.history.sources.doctor`);case`config-rpc`:return l(`custodian.history.sources.settings`);case`external`:return l(`custodian.history.sources.manualEdit`);case`cli`:return l(`custodian.history.sources.cli`);case`plugin-install`:return l(`custodian.history.sources.pluginInstall`);case`unknown`:return l(`custodian.history.sources.unknown`)}return e}function j(e){return g`
    <article class="custodian__change-card ${e.invalid?`is-invalid`:``}">
      <div class="custodian__change-meta">
        <span class="custodian__change-source">${A(e.source)}</span>
        <time datetime=${new Date(e.at).toISOString()}
          >${a(e.at)}</time
        >
      </div>
      <div class="custodian__change-summary">${e.summary}</div>
      ${e.invalid?g`<div class="custodian__change-warning">${l(`custodian.history.invalidEdit`)}</div>`:_}
      ${e.opaqueChange?g`<div class="custodian__change-note">${l(`custodian.history.opaqueChange`)}</div>`:_}
      ${e.changedPaths?.length?g`<details class="custodian__change-paths">
              <summary>
                ${l(`custodian.history.changedPaths`,{count:String(e.changedPaths.length)})}
              </summary>
              <ul>
                ${e.changedPaths.map(e=>g`<li><code>${e}</code></li>`)}
              </ul>
            </details>`:_}
    </article>
  `}function M(e){return g`
    <section class="custodian__history" aria-label=${l(`custodian.history.title`)}>
      <div class="custodian__history-heading">
        <strong>${l(`custodian.history.title`)}</strong>
        <span>${l(`custodian.history.description`)}</span>
      </div>
      ${e.error?g`<div class="custodian__history-error" role="alert">
              <span>${e.error}</span>
              <button class="btn btn--sm" type="button" @click=${()=>e.onLoad(!0)}>
                ${l(`common.retry`)}
              </button>
            </div>`:_}
      ${e.loading&&e.entries.length===0?E({label:l(`custodian.history.loading`)}):g`<div class="custodian__change-list">
              ${e.entries.map(j)}
              ${e.loading?g`<div
                      class="custodian__history-state"
                      role="status"
                      aria-label=${l(`custodian.history.loading`)}
                    >
                      <span class="custodian__history-spinner" aria-hidden="true"></span>
                    </div>`:e.loaded&&e.entries.length===0&&!e.error?g`<div class="custodian__history-state" role="status">
                        ${l(`custodian.history.empty`)}
                      </div>`:_}
            </div>`}
      ${e.nextCursor?g`<button
              class="btn btn--ghost custodian__history-more"
              type="button"
              ?disabled=${e.loadingMore}
              @click=${()=>e.onLoad(!1)}
            >
              ${e.loadingMore?l(`custodian.history.loadingMore`):l(`custodian.history.loadMore`)}
            </button>`:_}
    </section>
  `}function N(){return(N=e((()=>{v(),w(),p(),s()})))()}var P,F;function I(){return(I=e((()=>{t(),v(),b(),h(),T(),p(),o(),C(),u(),c(),N(),D(),k(),P=50,F=class extends f{constructor(){super(),this.onboarding=!1,this.newAgentIntent=!1,this.store=O,this.historyAvailable=!1,this.historyOpen=!1,this.historyEntries=[],this.historyNextCursor=null,this.historyLoading=!1,this.historyLoadingMore=!1,this.historyError=null,this.historyLoaded=!1,this.historyClient=null,this.historyRequestEpoch=0,this.channelsSource=null,new d(this).watch(()=>this.store,(e,t)=>{let n=e.subscribe(t);return e.refreshTranscriptIfIdle(),n}).effect(()=>this.context?.channels,e=>{this.channelsSource=e;let t=e.subscribe(()=>{this.ensureOnboardingChannelStatus(),this.requestUpdate()});return this.ensureOnboardingChannelStatus(),()=>{t(),this.channelsSource===e&&(this.channelsSource=null)}})}async getUpdateComplete(){let e=await super.getUpdateComplete();return await this.querySelector(`openclaw-custodian-surface`)?.updateComplete,e}willUpdate(){this.synchronizeHistoryClient(),this.ensureOnboardingChannelStatus()}ensureOnboardingChannelStatus(){let e=this.channelsSource;if(!this.onboarding||this.store.channelOnboardingNudgeClosed||!e)return;let t=e.state;!t.connected||t.channelsSnapshot||t.channelsLoading||t.channelsError||e.refresh(!1)}synchronizeHistoryClient(){let e=this.context.gateway.snapshot,t=e.phase===`connected`?e.client:null,n=t!==null&&S(e,`openclaw.changes.list`)===!0;(t!==this.historyClient||n!==this.historyAvailable)&&(this.historyClient=t,this.historyAvailable=n,this.historyOpen=!1,this.resetHistory())}resetHistory(){this.historyRequestEpoch+=1,this.historyEntries=[],this.historyNextCursor=null,this.historyLoading=!1,this.historyLoadingMore=!1,this.historyError=null,this.historyLoaded=!1}toggleHistory(){this.historyOpen=!this.historyOpen,this.historyOpen&&!this.historyLoading&&!this.historyLoadingMore&&this.loadHistory(!0)}async loadHistory(e){let t=this.historyClient,n=e?void 0:this.historyNextCursor??void 0;if(!t||!this.historyAvailable||this.historyLoading||this.historyLoadingMore||!e&&!n)return;let r=++this.historyRequestEpoch;e?this.historyLoading=!0:this.historyLoadingMore=!0,this.historyError=null;let i=()=>this.isConnected&&this.historyClient===t&&this.historyRequestEpoch===r&&this.historyAvailable;try{let r=await t.request(`openclaw.changes.list`,{limit:P,...n?{beforeCursor:n}:{}});if(!i())return;this.historyEntries=e?r.entries:[...this.historyEntries,...r.entries],this.historyNextCursor=r.nextCursor??null,this.historyLoaded=!0}catch{i()&&(this.historyError=l(`custodian.history.requestFailed`),this.historyLoaded=!0)}finally{i()&&(this.historyLoading=!1,this.historyLoadingMore=!1)}}render(){let e=this.channelsSource?.state,t=e?.channelsSnapshot??null,n=this.onboarding&&!this.store.channelOnboardingNudgeClosed&&e?.connected?e?.channelsError??null:null,r=this.onboarding&&!this.store.channelOnboardingNudgeClosed&&e?.connected&&!e.channelsLoading&&n===null&&t!==null&&t.partial!==!0&&!i(t),a=this.historyOpen&&this.historyAvailable?M({entries:this.historyEntries,error:this.historyError,loaded:this.historyLoaded,loading:this.historyLoading,loadingMore:this.historyLoadingMore,nextCursor:this.historyNextCursor,onLoad:e=>void this.loadHistory(e)}):_;return g`
      <section
        class="custodian custodian--page ${this.store.setupRequired?`custodian--setup-required`:``}"
      >
        <header
          class="custodian__header custodian__column ${this.onboarding?`custodian__header--minimal`:``}"
        >
          ${this.onboarding?_:g`<div class="custodian__identity">
                  <div class="custodian__mark" aria-hidden="true">
                    <openclaw-mascot
                      .mood=${this.store.sending?`thinking`:`idle`}
                      .size=${38}
                    ></openclaw-mascot>
                  </div>
                  <div>
                    <h1>${l(`custodian.title`)}</h1>
                    <p>${l(`custodian.subtitleCaretaker`)}</p>
                  </div>
                </div>`}
          <div class="custodian__header-actions">
            ${this.onboarding?g`<openclaw-sidebar-attention></openclaw-sidebar-attention>`:_}
            ${this.historyAvailable?g`<button
                    class="btn btn--ghost custodian__history-toggle"
                    type="button"
                    aria-expanded=${this.historyOpen?`true`:`false`}
                    @click=${()=>this.toggleHistory()}
                  >
                    ${l(`custodian.history.button`)}
                  </button>`:_}
            ${this.onboarding?g`<button
                    class="btn btn--ghost"
                    type="button"
                    @click=${()=>this.store.exitSetup()}
                  >
                    ${l(`custodian.exitSetup`)}
                  </button>`:_}
          </div>
        </header>

        <openclaw-custodian-surface
          class="custodian__column"
          .store=${this.store}
          .onboarding=${this.onboarding}
          .newAgentIntent=${this.newAgentIntent}
          .showChannelOnboardingNudge=${r}
          .channelOnboardingError=${n}
          .channelOnboardingRetrying=${e?.channelsLoading??!1}
          .onRetryChannelOnboarding=${()=>void this.channelsSource?.refresh(!1)}
          .historyContent=${a}
        ></openclaw-custodian-surface>
      </section>
    `}},n([r({context:m,subscribe:!0})],F.prototype,`context`,void 0),n([x({attribute:!1})],F.prototype,`onboarding`,void 0),n([x({attribute:!1})],F.prototype,`newAgentIntent`,void 0),n([x({attribute:!1})],F.prototype,`store`,void 0),n([y()],F.prototype,`historyAvailable`,void 0),n([y()],F.prototype,`historyOpen`,void 0),n([y()],F.prototype,`historyEntries`,void 0),n([y()],F.prototype,`historyNextCursor`,void 0),n([y()],F.prototype,`historyLoading`,void 0),n([y()],F.prototype,`historyLoadingMore`,void 0),n([y()],F.prototype,`historyError`,void 0),customElements.get(`openclaw-custodian-page`)||customElements.define(`openclaw-custodian-page`,F)})))()}I();