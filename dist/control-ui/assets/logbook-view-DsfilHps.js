import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{F as t,Kl as n,R as r,hu as i,ql as a,uu as o}from"./control-ui-core-pYNj5S1a.js";import{Xi as s,Zi as c}from"./control-ui-core-D6clmJs8.js";import{$ as l,X as u,Y as d,r as f,t as p}from"./lit-runtime-DZL1fcCI.js";import{Ji as m,Xi as h}from"./control-ui-boot-shared-3Hl8ksFq.js";import{ar as g,rr as _}from"./control-ui-boot-shared-DJ4XCcp6.js";import{a as v,c as y,d as b,i as x,l as S,n as C,o as w,r as T,s as E,t as D,u as O}from"./logbook-controller-DtgSLweq.js";function k(e,n){return t(e,{hour:`2-digit`,minute:`2-digit`,timeZone:n},``)}function A(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;return Math.abs(t)%360}function j(e){let t=e.captureEnabled&&!e.capturePaused&&!e.lastCaptureError,r=e.capturePaused?i(`logbook.status.paused`):e.captureEnabled?i(`logbook.status.capturing`,{seconds:String(e.captureIntervalSeconds)}):i(`logbook.status.disabled`);return l`
    <div class="logbook__chips">
      <span class="logbook__chip ${t?`logbook__chip--ok`:`logbook__chip--warn`}">
        <span class="logbook__chip-dot"></span>
        ${r}
      </span>
      ${e.nodeName||e.nodeId?l`<span class="logbook__chip" title=${i(`logbook.status.nodeHelp`)}>
              ${s.monitor} ${e.nodeName??e.nodeId}
            </span>`:u}
      ${e.pendingFrames>0?l`<span class="logbook__chip" title=${i(`logbook.status.pendingHelp`)}>
              ${i(`logbook.status.pending`,{count:String(e.pendingFrames)})}
            </span>`:u}
      ${e.analysisRunning?l`<span class="logbook__chip logbook__chip--busy"
              >${i(`logbook.status.analyzing`)}</span
            >`:u}
      ${e.lastCaptureError?l`<span
              class="logbook__chip logbook__chip--error"
              title=${n(e.lastCaptureError)}
            >
              ${i(`logbook.status.captureError`)}
            </span>`:u}
      ${e.lastBatch?.status===`error`?l`<span
              class="logbook__chip logbook__chip--error"
              title=${n(e.lastBatch.error)}
            >
              ${i(`logbook.status.batchError`)}
            </span>`:u}
      ${e.visionModelSource===`missing`?l`<span
              class="logbook__chip logbook__chip--warn"
              title=${i(`logbook.status.modelMissingHelp`)}
            >
              ${i(`logbook.status.modelMissing`)}
            </span>`:u}
    </div>
  `}function M(e,t,r,a){let o=e.expandedCardIds.has(r.id),s=A(r.category),c=r.keyframeId!==void 0&&!e.framePreviewFailed.has(r.keyframeId)?r.keyframeId:void 0,d=c===void 0?void 0:e.framePreviews.get(c);return o&&c!==void 0&&!d&&w(e,t,c),l`
    <article
      class="logbook-card ${o?`logbook-card--expanded`:``}"
      style="--logbook-hue: ${s}"
    >
      <button
        class="logbook-card__header"
        type="button"
        @click=${()=>{let t=new Set(e.expandedCardIds);o?t.delete(r.id):t.add(r.id),e.expandedCardIds=t,e.requestUpdate?.()}}
      >
        <span class="logbook-card__time">
          ${k(r.startMs,a)}<span class="logbook-card__time-sep">–</span
          >${k(r.endMs,a)}
        </span>
        <span class="logbook-card__stripe" aria-hidden="true"></span>
        <span class="logbook-card__heading">
          <span class="logbook-card__title">${r.title}</span>
          <span class="logbook-card__summary">${r.summary}</span>
        </span>
        <span class="logbook-card__meta">
          <span class="logbook-card__category">${r.category}</span>
          ${r.appPrimary?l`<span class="logbook-card__app">${r.appPrimary}</span>`:u}
          <span class="logbook-card__duration"
            >${m(r.endMs-r.startMs)??`0s`}</span
          >
        </span>
      </button>
      ${o?l`
              <div class="logbook-card__body">
                ${d?l`<img
                        class="logbook-card__keyframe"
                        src=${d}
                        alt=${i(`logbook.card.keyframeAlt`)}
                      />`:c===void 0?u:l`<div class="logbook-card__keyframe logbook-card__keyframe--loading">
                          ${i(`common.loading`)}
                        </div>`}
                ${r.detail?l`<p class="logbook-card__detail">${n(r.detail)}</p>`:u}
                ${r.distractions.length>0?l`
                        <div class="logbook-card__distractions">
                          <span class="logbook-card__distractions-label">
                            ${i(`logbook.card.distractions`)}
                          </span>
                          ${r.distractions.map(e=>l`
                              <span class="logbook-card__distraction">
                                ${k(e.startMs,a)} · ${e.title}
                              </span>
                            `)}
                        </div>
                      `:u}
              </div>
            `:u}
    </article>
  `}function N(e){let t=e.timeline?.stats;if(!t||t.trackedMs<=0)return u;let n=Math.max(0,t.trackedMs-t.distractionMs),r=Math.round(n/t.trackedMs*100),a=t.categories[0]?.ms??1;return l`
    <section class="card logbook-side__card">
      <div class="card-title">${i(`logbook.stats.title`)}</div>
      <div class="logbook-stats__focus">
        <div class="logbook-stats__focus-bar">
          <div class="logbook-stats__focus-fill" style="width: ${r}%"></div>
        </div>
        <div class="logbook-stats__focus-legend">
          <span>${i(`logbook.stats.focus`,{pct:String(r)})}</span>
          <span
            >${i(`logbook.stats.tracked`,{duration:m(t.trackedMs)??`0s`})}</span
          >
        </div>
      </div>
      <div class="logbook-stats__categories">
        ${t.categories.slice(0,6).map(e=>l`
            <div
              class="logbook-stats__category"
              style="--logbook-hue: ${A(e.category)}"
            >
              <span class="logbook-stats__category-name">${e.category}</span>
              <span class="logbook-stats__category-bar">
                <span
                  class="logbook-stats__category-fill"
                  style="width: ${Math.max(6,Math.round(e.ms/a*100))}%"
                ></span>
              </span>
              <span class="logbook-stats__category-time"
                >${m(e.ms)??`0s`}</span
              >
            </div>
          `)}
      </div>
      ${t.apps.length>0?l`
              <div class="logbook-stats__apps">
                ${t.apps.slice(0,5).map(e=>l`<span class="logbook-stats__app">${e.domain}</span>`)}
              </div>
            `:u}
    </section>
  `}function P(e,t){return l`
    <section class="card logbook-side__card">
      <div class="logbook-side__card-header">
        <div class="card-title">${i(`logbook.standup.title`)}</div>
        <button
          class="btn btn--small"
          type="button"
          ?disabled=${e.standupLoading}
          @click=${()=>void E(e,t,e.standup!==null)}
        >
          ${e.standupLoading?i(`common.loading`):e.standup?i(`logbook.standup.refresh`):i(`logbook.standup.generate`)}
        </button>
      </div>
      ${e.standup?l`<div class="logbook-standup__body markdown-body">
              ${f(g(e.standup.text))}
            </div>`:l`<div class="card-sub">${i(`logbook.standup.empty`)}</div>`}
    </section>
  `}function F(e,t){return l`
    <section class="card logbook-side__card">
      <div class="card-title">${i(`logbook.ask.title`)}</div>
      <form
        class="logbook-ask__form"
        @submit=${n=>{n.preventDefault(),D(e,t)}}
      >
        <input
          class="logbook-ask__input"
          type="text"
          .value=${e.askQuestion}
          placeholder=${i(`logbook.ask.placeholder`)}
          @input=${t=>{e.askQuestion=t.target.value}}
        />
        <button class="btn btn--small" type="submit" ?disabled=${e.askLoading}>
          ${e.askLoading?i(`common.loading`):i(`logbook.ask.submit`)}
        </button>
      </form>
      ${e.askAnswer?l`<p class="logbook-ask__answer">${e.askAnswer}</p>`:u}
    </section>
  `}function I(e){let t=T(e.host);t.requestUpdate=e.onRequestUpdate??null;let n=e.connected;C(t,n?e.client:null,n),n&&!t.timeline&&!t.loading&&!t.error&&v(t,e.client);let r=t.status?.today??y(),a=t.day===r,o=t.status,c=t.timeline?.cards??[];return l`
    <section class="logbook">
      <header class="logbook__header">
        <div class="logbook__daynav">
          <button
            class="btn btn--small"
            type="button"
            aria-label=${i(`logbook.nav.previousDay`)}
            @click=${()=>void v(t,e.client,{day:b(t.day,-1)})}
          >
            ‹
          </button>
          <span class="logbook__day">${t.day}</span>
          <button
            class="btn btn--small"
            type="button"
            aria-label=${i(`logbook.nav.nextDay`)}
            ?disabled=${a}
            @click=${()=>void v(t,e.client,{day:b(t.day,1)})}
          >
            ›
          </button>
          ${a?u:l`<button
                  class="btn btn--small"
                  type="button"
                  @click=${()=>void v(t,e.client,{today:!0})}
                >
                  ${i(`logbook.nav.today`)}
                </button>`}
        </div>
        ${t.status?j(t.status):u}
        <div class="logbook__actions">
          ${t.status?l`<button
                  class="btn btn--small"
                  type="button"
                  ?disabled=${t.actionPending||!t.status.captureEnabled}
                  @click=${()=>void O(t,e.client,!t.status?.capturePaused)}
                >
                  ${t.status.capturePaused?i(`logbook.actions.resume`):i(`logbook.actions.pause`)}
                </button>`:u}
          <button
            class="btn btn--small"
            type="button"
            ?disabled=${t.actionPending}
            @click=${()=>void S(t,e.client)}
          >
            ${i(`logbook.actions.analyzeNow`)}
          </button>
          <button
            class="btn btn--small"
            type="button"
            ?disabled=${t.loading}
            @click=${()=>void v(t,e.client)}
          >
            ${s.refresh}
          </button>
        </div>
      </header>
      ${t.error?l`<div class="callout danger" role="alert">${t.error}</div>`:u}
      <div class="logbook__layout">
        <div class="logbook__timeline">
          ${t.loading&&c.length===0?l`<div class="card-sub">${i(`common.loading`)}</div>`:u}
          ${!t.loading&&c.length===0&&!t.error?l`
                  <div class="logbook__empty">
                    <div class="logbook__empty-title">${i(`logbook.empty.title`)}</div>
                    <div class="logbook__empty-sub">${i(`logbook.empty.subtitle`)}</div>
                  </div>
                `:u}
          ${o?c.map(n=>M(t,e.client,n,o.timeZone)):u}
        </div>
        <aside class="logbook__side">
          ${N(t)} ${P(t,e.client)}
          ${F(t,e.client)}
        </aside>
      </div>
    </section>
  `}function L(){return(L=e((()=>{d(),p(),c(),_(),o(),h(),a(),r(),x()})))()}L();export{I as renderLogbook};