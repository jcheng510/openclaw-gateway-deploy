import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{hu as n,lu as r,ou as i,uu as a}from"./control-ui-core-pYNj5S1a.js";import{Xi as o,Zi as s,bt as c,d as l,l as u,lt as d,mt as f,pt as p,ut as m,wi as h,xt as g,yt as _}from"./control-ui-core-D6clmJs8.js";import{$ as v,X as y,Y as b,ct as x,nt as S,ut as C}from"./lit-runtime-DZL1fcCI.js";import{Ki as w,eo as T,qi as E,to as D}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Ao as O,Do as k,Eo as A,Ji as j,h as M,ko as N,m as P,qi as F}from"./control-ui-boot-shared-DJ4XCcp6.js";function I(){return(I=e((()=>{})))()}var L;function R(){return(R=e((()=>{b(),S(),g(),l(),A(),p(),a(),T(),r(),E(),s(),F(),P(),h(),N(),D(),L=class extends i{constructor(...e){super(...e),this.compact=!1,this.updateAvailable=null,this.updateSchedule=null,this.heldUpdateCampaignId=null,this.updateBusy=!1,this.updateRun=null,this.updateRunAcknowledged=!1,this.connected=!0,this.onCheckStatus=void 0,this.onAcknowledge=void 0,this.statusBanner=null,this.watchUpdateProgress=void 0,this.canUpdate=!1,this.canHoldUpdate=!1,this.onUpdate=()=>void 0,this.refreshRequired=!1,this.onRefresh=async()=>!1,this.onHoldUpdate=async()=>!1,this.onReviewUpdate=()=>void 0,this.onDismiss=void 0,this.holdingCampaignId=null,this.nativeUpdateAvailable=c(),this.refreshInFlight=!1,this.refreshFailed=!1,this.refreshAttempt=0,this.countdownPolling=new w(this,1e3,()=>this.requestUpdate(),!1),this.handleNativeUpdateAvailabilityChanged=()=>{this.nativeUpdateAvailable=c()},this.openRun=()=>{this.updateRun&&this.confirmUpdate(this.updateRun)},this.startUpdate=()=>{let e=this.updateSchedule?.campaign;!this.updateBusy&&e?.state!==`applying`&&this.canUpdate&&this.confirmUpdate()},this.holdUpdate=async e=>{this.holdingCampaignId=e,await this.onHoldUpdate(),this.holdingCampaignId=null},this.refreshControlUi=async()=>{if(this.refreshInFlight)return;this.refreshInFlight=!0,this.refreshFailed=!1;let e=++this.refreshAttempt,t=!1;try{t=await this.onRefresh()}catch{}e===this.refreshAttempt&&this.refreshRequired&&(t||(this.refreshInFlight=!1,this.refreshFailed=!0))}}connectedCallback(){super.connectedCallback(),this.nativeUpdateAvailable=c(),window.addEventListener(_,this.handleNativeUpdateAvailabilityChanged)}disconnectedCallback(){window.removeEventListener(_,this.handleNativeUpdateAvailabilityChanged),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),e.has(`refreshRequired`)&&!this.refreshRequired&&(this.refreshAttempt+=1,this.refreshInFlight=!1,this.refreshFailed=!1)}updated(e){if(super.updated(e),e.has(`updateSchedule`)){let e=this.updateSchedule?.campaign?.state;e===`countdown`||e===`waiting-for-idle`?this.countdownPolling.start():this.countdownPolling.stop()}}renderStatus(){let e=this.updateRun?null:this.statusBanner;return e?v`<div
          class="sidebar-update-card__status sidebar-update-card__status--${e.tone}"
          role="alert"
        >
          ${e.text}
        </div>`:y}confirmUpdate(e){u({existingRun:e,startGatewayUpdate:()=>this.onUpdate(),onCheckStatus:this.onCheckStatus,onReviewUpdate:this.onReviewUpdate,onAcknowledge:this.onAcknowledge,watchUpdateProgress:this.watchUpdateProgress,updateAvailable:this.updateAvailable,updateSchedule:this.updateSchedule,viaNativeApp:c()})}compactSummary(){if(this.refreshRequired)return{detail:n(`chat.sidebar.serverUpdatedRefresh`),icon:o.refresh,severity:`warning`,title:n(`chat.sidebar.serverUpdatedTitle`)};if(j(this.updateRun,this.updateRunAcknowledged)&&this.updateRun){let e=k(this.updateRun,this.connected);return{title:e.headline,detail:e.compactLabel,timestampMs:this.updateRun.status===`running`?this.updateRun.createdAtMs:this.updateRun.finishedAtMs,icon:this.updateRun.status===`running`?o.refresh:this.updateRun.status===`succeeded`?o.check:o.alertTriangle,severity:this.updateRun.status===`failed`?`error`:`warning`,critical:!1}}let e=this.updateSchedule?.campaign,t=this.updateBusy||e?.state===`applying`,r=this.updateRun?null:this.statusBanner;if(!r&&!f(this.updateAvailable,this.updateSchedule,t))return null;let i=m(this.updateSchedule,this.updateAvailable),a=d(this.updateSchedule),s=r&&r.tone!==`info`,c=r?.text.trim()||n(`updates.sidebar.blockedSummary`);return{timestampMs:e?.announcedAtMs,detail:s?e?.state===`waiting-for-idle`&&i?n(`updates.sidebar.blockedWaiting`,{target:i}):i?`${i} · ${c}`:c:a&&i?n(`updates.sidebar.campaignTarget`,{status:a,target:i}):a??i??r?.text??n(`updates.sidebar.availableSummary`),icon:r?o.alertTriangle:t?o.refresh:o.download,critical:!!s,severity:r?.tone===`danger`?`error`:`warning`,title:n(s?`updates.sidebar.blockedTitle`:t?`updates.sidebar.updating`:`updates.sidebar.availableTitle`)}}renderCompact(){let e=this.compactSummary();return e?M({...e,onDismiss:this.onDismiss,body:this.renderCompactDetails(),bodyClass:`sidebar-update-issue__body`}):y}renderCompactDetails(){let e=this.updateRun?null:this.statusBanner;return e?v`<div class="sidebar-update-card sidebar-update-card--compact-details">
      <p class="sidebar-update-card__compact-reason" title=${e.text}>
        ${e.text}
      </p>
      <div class="sidebar-update-card__compact-actions">
        <button
          class="sidebar-update-card__review sidebar-update-card__review--primary"
          type="button"
          @click=${this.onReviewUpdate}
        >
          ${n(`updates.reviewUpdate`)}
        </button>
        ${this.renderHoldUpdate()}
      </div>
    </div>`:this.renderCard()}renderHoldUpdate(){let e=this.updateSchedule?.campaign;return!e||e.state===`applying`||!this.canUpdate||!this.canHoldUpdate||this.updateBusy||e.holdUntilMs!==void 0&&e.holdUntilMs>Date.now()||this.heldUpdateCampaignId===e.id?y:v`<button
      class="sidebar-update-card__hold"
      type="button"
      ?disabled=${this.holdingCampaignId===e.id}
      @click=${()=>this.holdUpdate(e.id)}
    >
      ${n(`updates.holdOneHour`)}
    </button>`}renderCard(){if(this.refreshRequired)return v`
        <div class="sidebar-update-card" role="status" aria-live="polite">
          ${this.renderStatus()}
          ${this.refreshFailed?v`<div
                  class="sidebar-update-card__status sidebar-update-card__status--warn"
                  role="alert"
                >
                  ${n(`connection.actionsUnavailable`)}
                </div>`:y}
          <button
            class="sidebar-update-card__action ${this.refreshInFlight?`sidebar-update-card__action--busy`:``}"
            type="button"
            ?disabled=${this.refreshInFlight}
            aria-busy=${this.refreshInFlight?`true`:`false`}
            @click=${this.refreshControlUi}
          >
            <span class="sidebar-update-card__icon" aria-hidden="true">${o.refresh}</span>
            <span class="sidebar-update-card__text sidebar-update-card__text--stacked">
              <span class="sidebar-update-card__title"
                >${n(`chat.sidebar.serverUpdatedTitle`)}</span
              >
              <span class="sidebar-update-card__subtitle"
                >${this.refreshInFlight?n(`lazyView.reloading`):this.refreshFailed?n(`connection.retryNow`):n(`chat.sidebar.serverUpdatedRefresh`)}</span
              >
            </span>
          </button>
        </div>
      `;if(j(this.updateRun,this.updateRunAcknowledged)&&this.updateRun){let e=k(this.updateRun,this.connected);return v`<div class="sidebar-update-card" role="status" aria-live="polite">
        <button class="sidebar-update-card__action" type="button" @click=${this.openRun}>
          <span class="sidebar-update-card__icon" aria-hidden="true"
            >${this.updateRun.status===`running`?o.refresh:this.updateRun.status===`succeeded`?o.check:o.alertTriangle}</span
          >
          <span class="sidebar-update-card__text sidebar-update-card__text--stacked">
            <span class="sidebar-update-card__title">${e.headline}</span>
            ${e.compactLabel?v`<span class="sidebar-update-card__subtitle">${e.compactLabel}</span>`:y}
          </span>
        </button>
      </div>`}let e=this.updateAvailable,t=this.updateSchedule?.campaign,r=this.updateBusy||t?.state===`applying`,i=this.updateRun?null:this.statusBanner,a=f(e,this.updateSchedule,r);if(!i&&!a)return y;let s=this.nativeUpdateAvailable?n(`chat.sidebar.updateMacAndGateway`):n(`chat.sidebar.updateGateway`),c=e?.channel===`beta`?` (beta)`:``,l=d(this.updateSchedule),u=m(this.updateSchedule,e),p=l?u?n(`updates.sidebar.campaignTarget`,{status:l,target:u}):l:r?n(`updates.sidebar.updating`):u?`${s} · ${u}${c}`:s,h=t?.state===`countdown`||t?.state===`waiting-for-idle`,g=v`<button
      class="sidebar-update-card__action ${r?`sidebar-update-card__action--busy`:``}"
      type="button"
      aria-disabled=${this.canUpdate?y:`true`}
      ?disabled=${r}
      @click=${this.startUpdate}
    >
      <span class="sidebar-update-card__icon" aria-hidden="true"
        >${r?o.refresh:o.download}</span
      >
      <span
        class="sidebar-update-card__text"
        role=${h?`timer`:y}
        aria-live=${h?`off`:y}
        >${p}</span
      >
    </button>`;return v`
      <div
        class="sidebar-update-card"
        role=${t?y:`status`}
        aria-live=${t?y:`polite`}
      >
        ${this.renderStatus()}
        ${a?v`<div class="sidebar-update-card__actions">
                ${this.canUpdate?g:v`<openclaw-tooltip open-on-click .content=${n(`updates.adminRequired`)}>
                        ${g}
                      </openclaw-tooltip>`}
                ${this.renderHoldUpdate()}
              </div>`:y}
        ${i?v`<button
                class="sidebar-update-card__review"
                type="button"
                @click=${this.onReviewUpdate}
              >
                ${n(`updates.reviewUpdate`)}
              </button>`:y}
        ${a&&!r?O(this.updateSchedule,this.updateAvailable):y}
      </div>
    `}render(){return this.compact?this.renderCompact():this.renderCard()}},t([C({attribute:!1})],L.prototype,`compact`,void 0),t([C({attribute:!1})],L.prototype,`updateAvailable`,void 0),t([C({attribute:!1})],L.prototype,`updateSchedule`,void 0),t([C({attribute:!1})],L.prototype,`heldUpdateCampaignId`,void 0),t([C({attribute:!1})],L.prototype,`updateBusy`,void 0),t([C({attribute:!1})],L.prototype,`updateRun`,void 0),t([C({attribute:!1})],L.prototype,`updateRunAcknowledged`,void 0),t([C({attribute:!1})],L.prototype,`connected`,void 0),t([C({attribute:!1})],L.prototype,`onCheckStatus`,void 0),t([C({attribute:!1})],L.prototype,`onAcknowledge`,void 0),t([C({attribute:!1})],L.prototype,`statusBanner`,void 0),t([C({attribute:!1})],L.prototype,`watchUpdateProgress`,void 0),t([C({attribute:!1})],L.prototype,`canUpdate`,void 0),t([C({attribute:!1})],L.prototype,`canHoldUpdate`,void 0),t([C({attribute:!1})],L.prototype,`onUpdate`,void 0),t([C({attribute:!1})],L.prototype,`refreshRequired`,void 0),t([C({attribute:!1})],L.prototype,`onRefresh`,void 0),t([C({attribute:!1})],L.prototype,`onHoldUpdate`,void 0),t([C({attribute:!1})],L.prototype,`onReviewUpdate`,void 0),t([C({attribute:!1})],L.prototype,`onDismiss`,void 0),t([x()],L.prototype,`holdingCampaignId`,void 0),t([x()],L.prototype,`nativeUpdateAvailable`,void 0),t([x()],L.prototype,`refreshInFlight`,void 0),t([x()],L.prototype,`refreshFailed`,void 0),customElements.get(`openclaw-sidebar-update-card`)||customElements.define(`openclaw-sidebar-update-card`,L)})))()}export{I as n,R as t};