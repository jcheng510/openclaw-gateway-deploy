import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,to as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as a,Xi as o,Zi as s,bs as c,bu as l,hu as u,lu as ee,ql as d,su as te,uu as f,xu as ne}from"./control-ui-core-pYNj5S1a.js";import{Xi as p,Zi as re,_r as ie,co as ae,go as m,gr as oe,hr as h,or as g,sr as _,vi as se,yi as ce}from"./control-ui-core-D6clmJs8.js";import{$ as v,X as y,Y as b,c as x,ct as S,i as le,nt as ue,o as C,r as de,s as fe,t as pe,ut as me}from"./lit-runtime-DZL1fcCI.js";import{Ji as w,Ki as he,Xi as ge,no as _e,qi as ve,ro as T}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as E,R as D,V as O,z as k}from"./control-ui-boot-shared-D-LYw3KU.js";import{_ as A,ar as j,g as M,rr as N}from"./control-ui-boot-shared-DJ4XCcp6.js";import{N as P,P as F}from"./markdown-runtime-Hc-lvqnn.js";import{a as ye,o as be}from"./settings-targets-B7PGvUUs.js";import{n as xe,t as Se}from"./en-transcripts-WNUnclke.js";function I(e){let t=new URLSearchParams(e);return{limit:50,query:t.get(`query`)?.slice(0,256)||void 0,providerId:t.get(`providerId`)||void 0,accountId:t.get(`accountId`)||void 0,agentId:t.get(`agentId`)||void 0,startedAfter:L(t.get(`startedAfter`)),startedBefore:L(t.get(`startedBefore`)),cursor:t.get(`cursor`)||void 0}}function L(e){if(e)return/^\d{4}-\d{2}-\d{2}$/u.test(e)?`${e}T00:00:00.000Z`:e}function R(e,t){let n=new URLSearchParams(e);for(let[e,r]of Object.entries(t))r?n.set(e,r):n.delete(e);let r=n.toString();return r?`?${r}`:``}var z,B;function V(){return(V=e((()=>{z=[`providerId`,`accountId`,`agentId`,`startedAfter`,`startedBefore`],B=[`query`,...z]})))()}var H,U;function W(){return(W=e((()=>{ne(),H={meetings:{emptyTitle:`Your meeting notes, together`,docs:`Set up meeting transcripts`,inProgress:`In progress`,activeNotes:`Summaries are generated about every 5 minutes when new speech is captured. Follow the Transcript tab for speech as it is saved.`,liveCapture:`Live capture`,liveHint:`Updates automatically every 3 seconds.`,liveSummaryHint:`Summary so far · Updates about every 5 minutes when there is new speech. Final notes are saved when capture ends.`,liveRetrying:`Updates are delayed. Retrying automatically.`,waitingForSpeech:`Waiting for speech…`,noSpeech:`No speech captured`,listLabel:`Meetings by day`,newestFirst:`Newest first · grouped by meeting date`,loadingMeetings:`Loading meetings…`,loadingSummary:`Loading summary…`,loadingTranscript:`Loading transcript…`,summaryPending:`Summary updates about every 5 minutes as new speech is captured.`,summaryUnavailable:`No saved summary preview is available.`,noResults:`No meetings match your search`}},U=Object.assign(()=>{Object.assign(l,H)},{catalog:H})})))()}function Ce(e){let t=e.split(/\r\n?|\n/),n=Y.parse(e,{}),r=[],i=0,a=!1;for(let[e,o]of n.entries()){if(o.type!==`heading_open`||o.level!==0||o.tag!==`h1`&&o.tag!==`h2`||!o.map)continue;let s=o.map[0];a&&=(i=s,!1),o.tag===`h2`&&n[e+1]?.content.trim()===`Transcript`&&(r.push(t.slice(i,s).join(`
`)),a=!0)}return a||r.push(t.slice(i).join(`
`)),r.join(`
`)}function G(e){return e?new Date(e).toLocaleString():u(`transcripts.unknown`)}function we(e){let t=u(`transcripts.sourceTime`,{time:G(e)});return v`<time datetime=${e??y} title=${t} aria-label=${t}
    >${e?new Date(e).toLocaleTimeString():u(`transcripts.unknown`)}</time
  >`}function Te(e){return[e.providerId,e.accountId,e.guildId,e.channelId,e.meetingUrl,e.threadTs,e.fileId].filter(Boolean).join(` · `)}function K(e,t){let n=s(e);return v`<div class="transcripts-notice" role="alert" tabindex="-1">
    <h2>${u(n?`transcripts.forbidden`:`transcripts.loadError`)}</h2>
    <p>${n?u(`transcripts.forbiddenHint`):a(e)}</p>
    <button class="btn" @click=${t}>${u(`common.retry`)}</button>
  </div>`}function q(e){return v`<div class="meetings-loading" role="status" aria-live="polite">
    <span class="btn__spinner" aria-hidden="true"></span>
    <span>${e}</span>
  </div>`}function J(e){let t=new URLSearchParams(e.search),n=z.some(e=>t.get(e)),i=(t,n,r=`search`)=>v`<label class="field">
    <span>${n}</span
    ><input
      name=${t}
      type=${r}
      aria-label=${n}
      maxlength=${256}
      .value=${C(e.drafts[t]??``)}
      @input=${n=>e.onDraft(t,n.target.value)}
    />
  </label>`;return v`<form
    class="transcripts-filters"
    aria-label=${u(`transcripts.filters`)}
    @submit=${t=>{t.preventDefault();let n=new FormData(t.currentTarget),i={cursor:null};for(let e of B)i[e]=r(n.get(e));e.onNavigate(i)}}
  >
    ${i(`query`,u(`transcripts.titleFilter`))}
    <details ?open=${n}>
      <summary>${u(`transcripts.advancedFilters`)}</summary>
      <div class="transcripts-filters__advanced">
        ${i(`providerId`,u(`transcripts.sourceFilter`))}
        ${i(`accountId`,u(`transcripts.accountFilter`))}
        ${i(`agentId`,u(`transcripts.agentFilter`))}
        ${i(`startedAfter`,u(`transcripts.afterFilter`),`date`)}
        ${i(`startedBefore`,u(`transcripts.beforeFilter`),`date`)}
      </div>
      <p class="transcripts-caption">${u(`transcripts.filterHint`)}</p>
    </details>
    <div class="transcripts-actions">
      <button type="submit" class="btn">${p.search}${u(`transcripts.filter`)}</button>
      <button
        type="button"
        class="btn"
        @click=${()=>e.onNavigate(Object.fromEntries([...B,`cursor`].map(e=>[e,null])))}
      >
        ${u(`transcripts.clearFilters`)}
      </button>
    </div>
  </form>`}function Ee(e,t){let n=new URLSearchParams(t.search).get(`selector`),r=!e.active&&e.utteranceCount===0,i=e.participants.slice(0,3).join(`, `),a=e.participants.length-3,o=e.stoppedAt?w(Math.max(0,Date.parse(e.stoppedAt)-Date.parse(e.startedAt))):null,s={selector:e.selector,find:null,tab:null};return v`<li>
    <a
      class="transcripts-list__entry meetings-row ${r?`meetings-row--silent`:``}"
      aria-current=${e.selector===n?`page`:y}
      href=${m(`meetings`,t.basePath)+R(t.search,s)}
      @click=${e=>{c(e)&&(e.preventDefault(),t.onNavigate(s))}}
    >
      <span class="meetings-row__title"
        >${e.title||e.providerName||e.providerId}</span
      >
      <span class="meetings-row__meta">
        ${e.providerName||e.providerId} ·
        <time datetime=${e.startedAt}
          >${new Date(e.startedAt).toLocaleTimeString(void 0,{hour:`2-digit`,minute:`2-digit`})}</time
        >
        ${e.active?v`<span class="meetings-live">${u(`meetings.inProgress`)}</span>`:o?v` · ${o}`:y}
      </span>
      ${i?v`<span class="meetings-row__meta meetings-row__participants">${i}${a>0?` +${a}`:``}</span>`:y}
      <span class="meetings-row__meta"
        >${u(`transcripts.savedCount`,{count:String(e.utteranceCount)})}</span
      >
      <span class="meetings-row__overview"
        >${e.utteranceCount===0?u(e.active?`meetings.waitingForSpeech`:`meetings.noSpeech`):e.overview||u(e.active?`meetings.summaryPending`:`meetings.summaryUnavailable`)}</span
      >
    </a>
  </li>`}function De(e){if(e.listError)return K(e.listError,e.onRefresh);if(!e.list)return q(u(`meetings.loadingMeetings`));let t=new Map;for(let n of e.list.sessions){let e=new Date(n.startedAt).toLocaleDateString(void 0,{year:`numeric`,month:`long`,day:`numeric`}),r=t.get(e)??[];r.push(n),t.set(e,r)}return v` ${t.size?v`<section class="meetings-timeline" aria-label=${u(`meetings.listLabel`)}>
            <p class="transcripts-caption">${u(`meetings.newestFirst`)}</p>
            ${x(t,([e])=>e,([t,n])=>v`<section class="meetings-day">
                <h2>${t}</h2>
                <ol class="transcripts-list">
                  ${x(n,e=>e.selector,t=>Ee(t,e))}
                </ol>
              </section>`)}
          </section>`:v`<div class="transcripts-notice" role="status">
            <h2>
              ${u(B.some(t=>new URLSearchParams(e.search).has(t))?`meetings.noResults`:`meetings.emptyTitle`)}
            </h2>
            <p>${u(`transcripts.emptyHint`)}</p>
            <a
              href="https://docs.openclaw.ai/cli/transcripts"
              target="_blank"
              rel="noopener noreferrer"
              >${u(`meetings.docs`)}</a
            >
          </div>`}
    <nav class="transcripts-actions" aria-label=${u(`transcripts.pagination`)}>
      ${new URLSearchParams(e.search).has(`cursor`)?v`<button class="btn" @click=${()=>e.onNavigate({cursor:null})}>
              ${u(`transcripts.firstPage`)}
            </button>`:y}
      ${e.list.nextCursor?v`<button
              class="btn"
              @click=${()=>e.onNavigate({cursor:e.list?.nextCursor??null})}
            >
              ${u(`transcripts.nextPage`)}${p.chevronRight}
            </button>`:y}
    </nav>`}function Oe(e,t){let n=e.summary,r=`# ${e.session.title||e.session.sessionId}\n`,i=Ce(n?n.markdown.startsWith(r)?n.markdown.slice(r.length):n.markdown:``);return v`<section class="transcripts-summary">
    ${n?v`${e.session.active?v`<p class="transcripts-caption" role="status">${u(`meetings.liveSummaryHint`)}</p>`:y}
            <p class="transcripts-caption">
              ${n.source?v`${u(n.source===`model`?`transcripts.modelNotes`:`transcripts.heuristicNotes`)}${n.model?` · ${n.model}`:y} · `:y}
              ${u(`transcripts.generatedAt`,{time:G(n.generatedAt)})}
            </p>
            <div class="meetings-notes markdown">
              ${de(j(i,{mode:`document`,remoteImages:!1}))}
            </div>
            <p class="transcripts-caption">${u(`transcripts.summaryHint`)}</p>`:t.summaryGeneration?.kind===`loading`?q(u(`transcripts.generatingSummary`)):t.summaryGeneration?.kind===`error`?v`<div role="alert">
                <p>${u(`transcripts.summaryError`)} ${t.summaryGeneration.message}</p>
                <button class="btn" @click=${t.onSummaryRetry}>${u(`common.retry`)}</button>
              </div>`:v`<p role="status">
                ${u(e.session.utteranceCount===0?e.session.active?`meetings.waitingForSpeech`:`meetings.noSpeech`:`transcripts.noSummary`)}
              </p>`}
  </section>`}function ke(e){let t=new URLSearchParams(e.search),n=e.reader.pages.at(-1),i=e.reader.summary??n,a=e.readerTab===`summary`?e.reader.summary:n;return v`<article
    class="transcripts-reader"
    aria-label=${u(`transcripts.reader`)}
    aria-busy=${e.reader.loading}
  >
    <a
      class="transcripts-back"
      href=${m(`meetings`,e.basePath)+R(e.search,{selector:null,find:null,tab:null})}
      @click=${t=>{c(t)&&(t.preventDefault(),e.onNavigate({selector:null,find:null,tab:null}))}}
      >${p.arrowLeft}${u(`transcripts.back`)}</a
    >
    ${e.reader.error?K(e.reader.error,e.onReaderRetry):y}
    ${e.reader.loading&&!a?q(u(e.readerTab===`summary`?`meetings.loadingSummary`:`meetings.loadingTranscript`)):y}
    ${i?v`
            <header class="transcripts-reader__header">
              <h1 tabindex="-1">${i.session.title||i.session.sessionId}</h1>
              <p class="transcripts-caption">
                ${i.session.providerName||i.session.providerId} ·
                <time datetime=${i.session.startedAt}
                  >${G(i.session.startedAt)}</time
                >
                · ${u(`transcripts.savedCount`,{count:String(i.session.utteranceCount)})}
              </p>
              ${i.session.active?v`<div class="meetings-live-status" role="status">
                      <div class="meetings-live-status__heading">
                        <span class="meetings-live">${u(`meetings.liveCapture`)}</span>
                        <span class="meetings-live-status__elapsed" role="timer" aria-live="off"
                          >${w(Math.max(0,e.now-Date.parse(i.session.startedAt)))}</span
                        >
                      </div>
                      <p>
                        ${u(e.reader.error?`meetings.liveRetrying`:`meetings.liveHint`)}
                      </p>
                    </div>`:y}
              <details class="transcripts-source-details">
                <summary>${u(`transcripts.sourceDetails`)}</summary>
                <p class="transcripts-caption">${Te(i.session.source)}</p>
                <p class="transcripts-caption">
                  ${i.session.agentId??u(`transcripts.unattributed`)}
                </p>
                <p class="transcripts-caption">
                  ${u(`transcripts.lastUtterance`,{time:G(i.session.lastUtteranceAt)})}
                </p>
                <p class="transcripts-caption">
                  ${u(i.session.activeSubscription?`transcripts.armedHint`:`transcripts.inactiveHint`)}
                </p>
              </details>
              <div class="transcripts-actions">
                ${[`markdown`,`jsonl`].map(t=>v`<button
                      class="btn"
                      ?disabled=${e.exportState.kind===`loading`}
                      @click=${()=>e.onDownload(t)}
                    >
                      ${p.download}${u(`transcripts.download.${t}`)}
                    </button>`)}
              </div>
              ${e.exportState.kind===`error`?v`<p role="alert">
                      ${u(`transcripts.exportError`)} ${e.exportState.message}
                    </p>`:y}
              ${e.exportState.kind===`loading`||e.exportState.kind===`done`?v`<p role="status">
                      ${u(e.exportState.kind===`loading`?`transcripts.exporting`:`transcripts.downloadStarted`)}
                    </p>`:y}
            </header>
            ${A({id:`transcript-reader`,active:e.readerTab,tabs:[{value:`summary`,label:u(`transcripts.summary`)},{value:`text`,label:u(`transcripts.text`)}],ariaLabel:u(`transcripts.reader`),panelId:`transcript-reader-panel`,variant:`sub`,onSelect:e.onReaderTab})}
            <div
              id="transcript-reader-panel"
              role="tabpanel"
              aria-labelledby=${`transcript-reader-tab-${e.readerTab}`}
            >
              ${e.readerTab===`summary`?e.reader.summary?Oe(e.reader.summary,e):y:v`
                      <form
                        class="transcripts-search"
                        role="search"
                        @submit=${t=>{t.preventDefault();let n=r(new FormData(t.currentTarget).get(`find`));e.onNavigate({find:n,tab:`transcript`})}}
                      >
                        <label class="field">
                          <input
                            type="search"
                            name="find"
                            aria-label=${u(`transcripts.searchWithin`)}
                            placeholder=${u(`transcripts.searchWithin`)}
                            maxlength=${256}
                            .value=${C(e.drafts.find??``)}
                            @input=${t=>e.onDraft(`find`,t.target.value)}
                          />
                        </label>
                        <button class="btn" type="submit">
                          ${p.search}${u(`transcripts.search`)}
                        </button>
                        ${t.get(`find`)?v`<button
                                class="btn"
                                type="button"
                                @click=${()=>e.onNavigate({find:null})}
                              >
                                ${u(`transcripts.clearSearch`)}
                              </button>`:y}
                      </form>
                      ${t.get(`find`)?v`<p class="transcripts-caption" role="status">
                              ${u(`transcripts.searchResults`,{query:t.get(`find`)??``})}
                            </p>`:y}
                      <ol class="transcripts-utterances">
                        ${e.reader.pages.flatMap(e=>e.utterances??[]).map(e=>v`<li>
                              <div class="transcripts-utterance__byline">
                                <strong
                                  >${e.speakerLabel??e.speakerId??u(`transcripts.unknownSpeaker`)}</strong
                                >
                                ${we(e.startedAt??e.endedAt)}
                              </div>
                              <p>${e.text}</p>
                            </li>`)}
                      </ol>
                      ${n&&!e.reader.error&&!e.reader.pages.some(e=>e.utterances?.length)?v`<p role="status">
                              ${u(t.get(`find`)?`transcripts.noMatches`:i.session.active?`meetings.waitingForSpeech`:`transcripts.noUtterances`)}
                            </p>`:y}
                      ${e.reader.loading&&n?.nextCursor?q(u(`meetings.loadingTranscript`)):y}
                    `}
            </div>
          `:y}
  </article>`}function Ae(e){let t=!!new URLSearchParams(e.search).get(`selector`),n=ye.meetingCapture;return v`<section class="transcripts-workspace">
    <header
      class="content-header content-header--page"
      ${_({toolbarHeader:!0})}
    >
      <div>
        <h1 class="page-title">${u(`tabs.meetings`)}</h1>
        <p class="page-sub">${u(`subtitles.meetings`)}</p>
      </div>
      <div class="transcripts-actions">
        <a
          class="btn"
          href=${m(n.routeId,e.basePath)+n.search+n.hash}
          >${p.settings}${u(`meetingCapture.title`)}</a
        >
        <button
          class="btn"
          ?disabled=${!e.connected||!e.allowed||e.listLoading}
          @click=${e.onRefresh}
        >
          ${p.refresh}${u(`common.refresh`)}
        </button>
      </div>
    </header>
    ${e.connected?e.allowed?v`<div class="transcripts-layout ${t?`transcripts-layout--selected`:``}">
              <section
                class="transcripts-library"
                aria-label=${u(`transcripts.library`)}
                aria-busy=${e.listLoading}
              >
                ${J(e)}${De(e)}
              </section>
              ${t?ke(e):y}
            </div>`:v`<div class="transcripts-notice" role="alert">
              <h2>${u(`transcripts.forbidden`)}</h2>
              <p>${u(`transcripts.forbiddenHint`)}</p>
            </div>`:v`<div class="transcripts-notice" role="status">${u(`transcripts.disconnected`)}</div>`}
  </section>`}var Y;function X(){return(X=e((()=>{b(),le(),fe(),pe(),F(),ae(),g(),M(),re(),N(),f(),W(),Se(),ge(),d(),o(),be(),V(),xe(),U(),Y=new P(`commonmark`)})))()}var Z,Q;function $(){return($=e((()=>{t(),E(),b(),ue(),ce(),ie(),d(),o(),T(),ee(),ve(),V(),X(),Z=class extends te{constructor(){super(),this.routeSearch=``,this.drafts={},this.list=null,this.listDenial=null,this.readerDenial=null,this.accessGeneration=0,this.readerCursor=null,this.loadedReaderCursor=null,this.lastReaderRefresh=0,this.now=Date.now(),this.summary=null,this.summaryGeneration={kind:`idle`},this.summaryAbort=null,this.readerPages=[],this.exportState={kind:`idle`},this.exportAbort=null,this.focusSelection=!1,this.gateway=new _e(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetConnection(),onPageActivation:()=>this.refreshLive(!0),onSnapshot:({snapshot:{hello:e}})=>{(e!==this.connectionHello||e?.auth!==this.connectionAuth)&&(this.gateway.invalidate(),this.resetConnection()),this.connectionHello=e,this.connectionAuth=e?.auth}}),this.polling=new he(this,3e3,()=>this.refreshLive()),this.listTask=new D(this,{args:()=>[this.requestClient(),this.gateway.epoch,JSON.stringify(I(this.routeSearch)),this.selection.selector],task:async([e,,t,n],{signal:r})=>e?this.readArchive({client:e,method:`transcripts.list`,params:I(this.routeSearch),signal:r,current:()=>this.selection.selector===n&&JSON.stringify(I(this.routeSearch))===t,accept:e=>{this.listDenial=null,this.list=e}}):k}),this.summaryTask=new D(this,{args:()=>[this.requestClient(),this.gateway.epoch,this.selection.selector],task:async([e,,t],{signal:n})=>!e||!t?k:this.readArchive({client:e,method:`transcripts.get`,params:{selector:t},signal:n,current:()=>this.selection.selector===t,accept:e=>{this.readerDenial=null,this.summary=e,this.generateMissingSummary()}})}),this.readerTask=new D(this,{args:()=>[this.requestClient(),this.gateway.epoch,this.selection.selector,this.selection.query,this.readerCursor],task:async([e,,t,n,r],{signal:i})=>!e||!t?k:this.readArchive({client:e,method:`transcripts.get`,params:{selector:t,includeUtterances:!0,query:n||void 0,cursor:r??void 0,limit:50},signal:i,current:()=>this.selection.selector===t&&this.selection.query===n&&this.readerCursor===r,accept:e=>{this.readerDenial=null;let t=r?[...r===this.loadedReaderCursor?this.readerPages.slice(0,-1):this.readerPages,e]:[e];this.loadedReaderCursor=r,this.readerPages=t}})}),this.polling}requestClient(){let e=this.context?.gateway.snapshot;return this.isConnected&&e?.phase===`connected`&&h(e.hello?.auth??null)?e.client:null}get selection(){let e=new URLSearchParams(this.routeSearch);return{selector:e.get(`selector`)??``,query:(e.get(`find`)??``).slice(0,256)}}get readerTab(){let e=new URLSearchParams(this.routeSearch);return e.has(`tab`)?e.get(`tab`)===`transcript`?`text`:`summary`:this.selection.query?`text`:`summary`}async readArchive(e){let t=this.gateway.capture(),n=this.context.gateway,r=n.snapshot.hello,i=n.snapshot.hello?.auth,a=this.accessGeneration,o=()=>!e.signal.aborted&&this.requestClient()===e.client&&this.context.gateway===n&&n.snapshot.hello===r&&n.snapshot.hello?.auth===i&&t!==null&&this.gateway.isCurrent(t)&&this.accessGeneration===a&&e.current();try{let t=await e.client.request(e.method,e.params,{signal:e.signal});return o()?e.accept(t):k}catch(e){if(!o())return k;throw s(e)&&(this.accessGeneration++,this.cancelSummaryGeneration(),this.listDenial=e,this.readerDenial=e,this.list=null,this.summary=null,this.readerPages=[],this.cancelExport()),e}}willUpdate(e){if(e.has(`routeSearch`)){let t=new URLSearchParams(String(e.get(`routeSearch`)??``)),n=new URLSearchParams(this.routeSearch);t.get(`selector`)!==n.get(`selector`)&&(this.cancelSummaryGeneration(),this.summary=null,this.lastReaderRefresh=0),JSON.stringify(I(String(e.get(`routeSearch`)??``)))!==JSON.stringify(I(this.routeSearch))&&(this.list=null);for(let r of[...B,`find`])(t.get(r)!==n.get(r)||e.get(`routeSearch`)===void 0||r===`find`&&t.get(`selector`)!==n.get(`selector`))&&(this.drafts[r]=n.get(r)??``);(t.get(`selector`)!==(this.selection.selector||null)||t.get(`find`)!==(this.selection.query||null))&&(this.resetReader(),this.cancelExport(),this.focusSelection=e.get(`routeSearch`)!==void 0)}}updated(){let e=this.readerPages.at(-1)?.nextCursor;if(this.readerTask.status===O.COMPLETE&&document.visibilityState!==`hidden`&&!this.readerDenial&&e&&e!==this.readerCursor&&(this.readerCursor=e),!this.focusSelection)return;let t=this.selection.selector?this.querySelector(`.transcripts-reader h1, .transcripts-reader [role=alert]`):this.querySelector(`.transcripts-library input[name="query"]`);t&&(t.focus(),this.focusSelection=!1)}resetConnection(){this.cancelSummaryGeneration(),this.list=null,this.listDenial=null,this.readerDenial=null,this.summary=null,this.lastReaderRefresh=0,this.listTask.abort(),this.summaryTask.abort(),this.readerTask.abort(),this.cancelExport(),this.resetReader()}resetReader(){this.readerCursor=null,this.loadedReaderCursor=null,this.readerPages=[]}cancelExport(){this.exportAbort?.abort(),this.exportAbort=null,this.exportState={kind:`idle`}}cancelSummaryGeneration(){this.summaryAbort?.abort(),this.summaryAbort=null,this.summaryGeneration={kind:`idle`}}async generateMissingSummary(e=!1){let t=this.requestClient(),{selector:n}=this.selection,r=this.context.gateway,i=r.snapshot.hello,o=i?.auth,s=this.gateway.capture(),c=this.accessGeneration;if(!t||!n||!s||this.readerDenial||!oe(o??null)||!this.summary||this.summary.summary||this.summary.session.utteranceCount===0||this.summaryGeneration.kind===`loading`||!e&&this.summaryGeneration.kind!==`idle`)return;let l=new AbortController;this.summaryAbort=l,this.summaryGeneration={kind:`loading`};let u=()=>!l.signal.aborted&&this.summaryAbort===l&&this.requestClient()===t&&this.context.gateway===r&&r.snapshot.hello===i&&r.snapshot.hello?.auth===o&&this.gateway.isCurrent(s)&&this.accessGeneration===c&&this.selection.selector===n;try{let e=await t.request(`transcripts.summarize`,{selector:n},{signal:l.signal,timeoutMs:12e4});if(!u())return;this.summaryTask.abort(),this.summary=e,this.summaryGeneration={kind:`done`}}catch(e){u()&&(this.summaryGeneration={kind:`error`,message:a(e)})}finally{this.summaryAbort===l&&(this.summaryAbort=null)}}navigate(e){for(let[t,n]of Object.entries(e))this.drafts[t]=n??``;this.requestUpdate(),this.context.navigate(`meetings`,{search:R(this.routeSearch,e)})}refresh(){this.cancelExport(),this.summary=null,this.resetReader(),new URLSearchParams(this.routeSearch).has(`cursor`)?this.navigate({cursor:null}):this.listTask.run(),this.summaryTask.run(),this.readerTask.run()}refreshLive(e=!1){if(!this.requestClient()||document.visibilityState===`hidden`||this.listDenial||this.readerDenial||(this.now=Date.now(),this.listTask.status!==O.PENDING&&this.listTask.run(),!this.selection.selector))return;let t=this.summary?.session??this.readerPages.at(-1)?.session,n=this.summary?.summary,r=t?.stoppedAt&&n?.generatedAt&&Date.parse(n.generatedAt)<Date.parse(t.stoppedAt),i=t?.active||!n||r?3e3:15e3;!e&&this.now-this.lastReaderRefresh<i||(this.lastReaderRefresh=this.now,this.summaryTask.status!==O.PENDING&&this.summaryTask.run(),this.readerTask.status!==O.PENDING&&this.readerTask.run())}async download(e){let t=this.requestClient(),{selector:n}=this.selection;if(!t||!n||this.exportState.kind===`loading`)return;let r=new AbortController;this.exportAbort=r,this.exportState={kind:`loading`};try{await this.readArchive({client:t,method:`transcripts.export`,params:{selector:n,format:e},signal:r.signal,current:()=>this.selection.selector===n,accept:e=>{let t=Uint8Array.from(atob(e.data),e=>e.charCodeAt(0)),n=URL.createObjectURL(new Blob([t],{type:e.mimeType})),r=document.createElement(`a`);try{r.href=n,r.download=e.filename,document.body.append(r),r.click(),this.exportState={kind:`done`}}finally{r.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),1e3)}}})}catch(e){this.exportAbort===r&&!r.signal.aborted&&(this.exportState={kind:`error`,message:a(e)})}finally{this.exportAbort===r&&(this.exportAbort=null)}}render(){let e=this.context.gateway.snapshot,t=this.requestClient(),n=this.readerTab===`summary`?this.summaryTask:this.readerTask,r={summary:this.summary,pages:this.readerPages,loading:n.status===O.PENDING,error:this.readerDenial??(n.status===O.ERROR?n.error:null)};return Ae({basePath:this.context.basePath,now:this.now,search:this.routeSearch,drafts:this.drafts,onDraft:(e,t)=>{this.drafts[e]=t},connected:e.phase===`connected`,allowed:h(e.hello?.auth??null),list:t?this.list:null,listLoading:!this.listDenial&&this.listTask.status===O.PENDING,listError:this.listDenial??(this.listTask.status===O.ERROR?this.listTask.error:null),reader:r,readerTab:this.readerTab,summaryGeneration:this.summaryGeneration,onSummaryRetry:()=>void this.generateMissingSummary(!0),exportState:this.exportState,onNavigate:e=>this.navigate(e),onRefresh:()=>this.refresh(),onReaderRetry:()=>{if(this.readerTab===`summary`){this.summaryTask.run();return}this.readerPages.length||this.resetReader(),this.summary||this.summaryTask.run(),this.readerTask.run()},onReaderTab:e=>{this.navigate({tab:e===`text`?`transcript`:`summary`})},onDownload:e=>void this.download(e)})}},n([i({context:se,subscribe:!0})],Z.prototype,`context`,void 0),n([me({attribute:!1})],Z.prototype,`routeSearch`,void 0),n([S()],Z.prototype,`list`,void 0),n([S()],Z.prototype,`listDenial`,void 0),n([S()],Z.prototype,`readerDenial`,void 0),n([S()],Z.prototype,`readerCursor`,void 0),n([S()],Z.prototype,`now`,void 0),n([S()],Z.prototype,`summary`,void 0),n([S()],Z.prototype,`summaryGeneration`,void 0),n([S()],Z.prototype,`readerPages`,void 0),n([S()],Z.prototype,`exportState`,void 0),Q={header:!0,render:e=>v`<openclaw-meetings-page
      .routeSearch=${typeof e==`string`?e:``}
    ></openclaw-meetings-page>`},customElements.get(`openclaw-meetings-page`)||customElements.define(`openclaw-meetings-page`,Z)})))()}$();export{Q as meetingsPageComponent};