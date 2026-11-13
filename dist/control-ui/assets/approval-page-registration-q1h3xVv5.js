import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Ji as n,qr as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{hu as a,lu as o,pu as s,su as c,uu as l}from"./control-ui-core-pYNj5S1a.js";import{$n as u,Ia as d,Pa as f,_r as p,er as m,vi as h,vr as g,yi as _}from"./control-ui-core-D6clmJs8.js";import{$ as v,X as y,Y as b,ct as x,nt as S,ut as C}from"./lit-runtime-DZL1fcCI.js";import{G as w,W as T,q as E}from"./control-ui-boot-shared-CES8Ypkl.js";import"./approval-BhCMRUNv.js";function D(e,t){return t?v`<div class="approval-page__meta-row">
        <dt>${e}</dt>
        <dd title=${t}><bdi dir="ltr">${t}</bdi></dd>
      </div>`:y}function O(e){return e.kind===`exec`?v`
      ${e.warningText?v`<div class="approval-page__warning" role="note">${e.warningText}</div>`:y}
      ${e.commandPreview?v`
              <div class="approval-page__preview-label">${a(`approvalPage.summaryLabel`)}</div>
              <div class="approval-page__summary mono" dir="ltr">
                ${e.commandPreview}
              </div>
            `:y}
      <div class="approval-page__preview-label">${a(`approvalPage.commandLabel`)}</div>
      <pre class="approval-page__preview mono" dir="ltr">${e.commandText}</pre>
      <dl class="approval-page__meta">
        ${D(a(`execApproval.labels.host`),e.host)}
        ${D(a(`approvalPage.nodeLabel`),e.nodeId)}
      </dl>
    `:v`
    <div class="approval-page__preview-label">${a(`approvalPage.requestLabel`)}</div>
    <div class=${`approval-page__preview approval-page__preview--prose`}>${e.description}</div>
    ${e.kind===`plugin`&&e.detail?v`<pre class="approval-page__preview mono" dir="ltr">${e.detail}</pre>`:y}
  `}function k(){return(k=e((()=>{b(),l()})))()}function A(e){return e instanceof u?(n(e.details)?e.details.reason:void 0)===`APPROVAL_NOT_FOUND`||e.gatewayCode===`APPROVAL_NOT_FOUND`||e.gatewayCode===`INVALID_REQUEST`:!1}function j(e){return new Intl.DateTimeFormat(s.getLocale(),{dateStyle:`medium`,timeStyle:`short`}).format(new Date(e))}function M(e){return a({"allow-once":`execApproval.allowOnce`,"allow-always":`execApproval.alwaysAllow`,deny:`execApproval.deny`}[e])}function N(e,t){return e.applied?t===`deny`?e.approval.status===`denied`:e.approval.status===`allowed`&&e.approval.decision===t:!0}function P(e,t){let n=t?.trim();return n?v`<span class="approval-page__chip mono" data-approval-chip=${e}>${n}</span>`:y}function F(e,t){return t===`elsewhere`&&(e.status===`allowed`||e.status===`denied`)?a(`approvalPage.resolvedElsewhere`):t===`here`&&e.status===`allowed`?a(`approvalPage.approvedHere`):t===`here`&&e.status===`denied`?a(`approvalPage.deniedHere`):a({allowed:`approvalPage.approved`,denied:`approvalPage.denied`,expired:`approvalPage.expired`,cancelled:`approvalPage.cancelled`,pending:`approvalPage.pending`}[e.status])}function I(e,t){return t===`elsewhere`&&(e.status===`allowed`||e.status===`denied`)?a(`approvalPage.resolvedElsewhereDescription`):e.status===`allowed`?a(e.decision===`allow-always`?`approvalPage.allowedAlwaysDescription`:`approvalPage.allowedOnceDescription`):a({denied:`approvalPage.deniedDescription`,expired:`approvalPage.expiredDescription`,cancelled:`approvalPage.cancelledDescription`,pending:`approvalPage.pendingDescription`}[e.status])}var L,R,z,B;function V(){return(V=e((()=>{t(),b(),S(),T(),m(),_(),p(),d(),l(),o(),k(),L=2e3,R=250,z=`operator.approvals`,B=class extends c{constructor(...e){super(...e),this.approvalId=``,this.approval=null,this.connected=!1,this.approvalsAccess=!0,this.approvalGrantAccess=!1,this.loading=!0,this.resolving=!1,this.resolvingDecision=null,this.requestError=null,this.resolutionOrigin=`observed`,this.client=null,this.operationGeneration=0,this.handleVisibilityChange=()=>{if(document.visibilityState!==`visible`){this.clearPollTimer();return}this.approval?.status===`pending`&&this.hasGatewayConnection&&this.hasApprovalAccess&&!this.resolving&&this.loadApproval({background:!0})}}connectedCallback(){this.replaceChildren(),super.connectedCallback(),document.addEventListener(`visibilitychange`,this.handleVisibilityChange),this.previousDocumentTitle=document.title,this.bindApprovalId(!0),this.stopGateway=this.context.gateway.subscribe(e=>this.applyGatewaySnapshot(e)),this.applyGatewaySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){document.removeEventListener(`visibilitychange`,this.handleVisibilityChange),this.stopGateway?.(),this.stopGateway=void 0,this.invalidateOperations(),this.clearPollTimer(),this.client=null,this.connected=!1,this.previousDocumentTitle!==void 0&&(!this.activeDocumentTitle||document.title===this.activeDocumentTitle)&&(document.title=this.previousDocumentTitle),this.previousDocumentTitle=void 0,this.activeDocumentTitle=void 0,super.disconnectedCallback()}updated(e){e.has(`approvalId`)&&this.bindApprovalId(),this.updateDocumentTitle()}bindApprovalId(e=!1){(e||this.boundApprovalId!==this.approvalId)&&(this.boundApprovalId=this.approvalId,this.invalidateOperations(),this.clearPollTimer(),this.approval=null,this.loading=!!this.approvalId,this.resolving=!1,this.resolvingDecision=null,this.requestError=this.approvalId?null:`unavailable`,this.resolutionOrigin=`observed`,this.approvalId&&this.connected&&this.client&&this.hasApprovalAccess&&this.loadApproval())}applyGatewaySnapshot(e){let t=e.client!==this.client,n=e.phase===`connected`!==this.connected,r=e.phase===`connected`&&!this.connected,i=g(e),a=i.canReviewApprovals,o=a!==this.approvalsAccess,s=i.canGrantApprovals!==this.approvalGrantAccess;if(this.client=e.client,this.connected=e.phase===`connected`,this.approvalsAccess=a,this.approvalGrantAccess=i.canGrantApprovals,(t||n||o||s)&&(this.invalidateOperations(),this.clearPollTimer(),this.resolving=!1,this.resolvingDecision=null),this.approvalsAccess||(this.approval=null),e.phase!==`connected`||!e.client){this.approvalId&&(this.loading=!1,this.requestError=!this.approval||this.approval.status===`pending`?`connection`:null);return}if(!this.approvalsAccess){this.approval=null,this.loading=!1,this.requestError=null;return}if(!this.approvalId){this.loading=!1,this.requestError=`unavailable`;return}if(t||r||o||!this.approval){this.loadApproval();return}this.schedulePoll()}invalidateOperations(){this.operationGeneration+=1}isCurrentOperation(e){return this.hasGatewayConnection&&this.hasApprovalAccess&&this.client===e.client&&this.approvalId===e.id&&this.operationGeneration===e.generation}get hasGatewayConnection(){return this.connected&&!!this.client}get hasApprovalAccess(){return this.approvalsAccess&&g(this.context.gateway.snapshot).canReviewApprovals}get hasApprovalGrantAccess(){return this.approvalGrantAccess&&g(this.context.gateway.snapshot).canGrantApprovals}async loadApproval(e={}){let t=this.client,n=this.approvalId;if(!t||!this.connected||!n||!this.hasApprovalAccess)return;let r=++this.operationGeneration,i=this.approval?.status,a=!1;this.clearPollTimer(),e.background||(this.loading=!0);try{let e=await t.request(`approval.get`,{id:n});if(!this.isCurrentOperation({client:t,generation:r,id:n}))return;if(!w(e)||e.approval.id!==n){this.approval=null,this.requestError=`unavailable`;return}this.requestError=null,this.approval=e.approval,e.approval.status===`pending`?this.resolutionOrigin=`observed`:i===`pending`&&this.resolutionOrigin===`observed`&&(this.resolutionOrigin=`elsewhere`,a=!0)}catch(e){if(!this.isCurrentOperation({client:t,generation:r,id:n}))return;A(e)?(this.approval=null,this.requestError=`unavailable`):this.requestError=`connection`}finally{this.isCurrentOperation({client:t,generation:r,id:n})&&(this.loading=!1,this.schedulePoll())}a&&this.isCurrentOperation({client:t,generation:r,id:n})&&await this.focusTerminalState()}async resolveApproval(e){let t=this.approval,n=this.client,r=this.approvalId;if(!n||!this.connected||!this.hasApprovalGrantAccess||!r||t?.status!==`pending`||!Array.prototype.includes.call(t.presentation.allowedDecisions,e)||this.resolving)return;let i=t.presentation.kind,a=++this.operationGeneration,o=()=>this.isCurrentOperation({client:n,generation:a,id:r})&&this.hasApprovalGrantAccess,s=!1,c=!1;this.clearPollTimer(),this.resolving=!0,this.resolvingDecision=e,this.requestError=null;try{let t=await n.request(`approval.resolve`,{id:r,kind:i,decision:e});if(!o())return;!E(t)||t.approval.id!==r||t.approval.presentation.kind!==i||!N(t,e)?(this.requestError=`connection`,c=!0):(this.approval=t.approval,this.resolutionOrigin=t.applied?`here`:`elsewhere`,s=!0)}catch(e){if(!o())return;this.requestError=A(e)?`unavailable`:`connection`}finally{o()&&(this.resolving=!1,this.resolvingDecision=null,this.schedulePoll())}if(c&&o()){await this.loadApproval({background:!0});return}s&&o()&&await this.focusTerminalState()}async focusTerminalState(){if(await this.updateComplete,this.approval?.status===`pending`)return;let e=this.querySelector(`#approval-page-title`);e?.focus({preventScroll:!0}),typeof e?.scrollIntoView==`function`&&e.scrollIntoView({behavior:`auto`,block:`center`,inline:`nearest`})}clearPollTimer(){this.pollTimer!==void 0&&(globalThis.clearTimeout(this.pollTimer),this.pollTimer=void 0)}schedulePoll(){this.clearPollTimer();let e=this.approval;if(!this.hasGatewayConnection||!this.hasApprovalAccess||this.resolving||this.requestError===`unavailable`||e?.status!==`pending`||document.visibilityState!==`visible`)return;let t=e.expiresAtMs-Date.now(),n=Math.max(R,Math.min(L,t+R));this.pollTimer=globalThis.setTimeout(()=>{this.pollTimer=void 0,this.loadApproval({background:!0})},n)}renderHeader(){return v`
      <header class="approval-page__brand">
        <img
          class="approval-page__logo"
          src=${f(`apple-touch-icon.png`,this.context.resourceBasePath)}
          alt=""
        />
        <div>
          <div class="approval-page__eyebrow">${a(`approvalPage.eyebrow`)}</div>
          <div class="approval-page__brand-name">${a(`approvalPage.brandName`)}</div>
        </div>
      </header>
    `}renderState(e){let t={loading:`approvalPage.loadingTitle`,unavailable:`approvalPage.unavailableTitle`,"missing-scope":`common.disabled`,connection:`approvalPage.connectionErrorTitle`}[e];return v`
      <div
        class="approval-page__state approval-page__state--${e===`missing-scope`?`unavailable`:e}"
        role=${e===`loading`?`status`:`alert`}
      >
        ${e===`loading`?v`<div class="approval-page__spinner" aria-hidden="true"></div>`:v`<div class="approval-page__state-mark" aria-hidden="true">!</div>`}
        <h1 id="approval-page-title">${a(t)}</h1>
        <p>
          ${e===`missing-scope`?v`<code>${z}</code>`:a({loading:`approvalPage.loadingDescription`,unavailable:`approvalPage.unavailableDescription`,connection:`approvalPage.connectionErrorDescription`}[e])}
        </p>
        ${e===`connection`?v`<button
                type="button"
                class="btn"
                ?disabled=${!this.hasGatewayConnection||!this.hasApprovalAccess||this.loading}
                @click=${()=>void this.loadApproval()}
              >
                ${a(`approvalPage.retry`)}
              </button>`:y}
      </div>
    `}renderConnectionError(){return v`
      <div class="approval-page__callout" role="alert">
        <div>
          <strong>${a(`approvalPage.connectionErrorTitle`)}</strong>
          <span>${a(`approvalPage.connectionErrorDescription`)}</span>
        </div>
        <button
          type="button"
          class="btn btn--sm"
          ?disabled=${!this.hasGatewayConnection||!this.hasApprovalAccess||this.loading}
          @click=${()=>void this.loadApproval()}
        >
          ${a(`approvalPage.retry`)}
        </button>
      </div>
    `}renderApproval(e){let t=e.status===`pending`,n=e.presentation,r=this.hasApprovalGrantAccess,i=t?n.kind===`plugin`?n.title:a(`approvalPage.execTitle`):F(e,this.resolutionOrigin),o=t?a(r?`approvalPage.pendingDescription`:`execApproval.reviewOnly`):I(e,this.resolutionOrigin);return v`
      <div class="approval-page__status" aria-live="polite" aria-atomic="true">
        <span
          class="approval-page__status-dot approval-page__status-dot--${e.status}"
          aria-hidden="true"
        ></span>
        ${t?a(`approvalPage.pending`):F(e,this.resolutionOrigin)}
      </div>
      <div class="approval-page__heading">
        <h1 id="approval-page-title" tabindex=${t?y:-1}>${i}</h1>
        <div class="approval-page__chips">
          ${n.kind===`plugin`?v`${P(`plugin`,n.pluginId)}
                ${P(`tool`,n.toolName)}`:y}
          ${P(`agent`,n.agentId)}
        </div>
        <p>${o}</p>
      </div>
      ${O(n)}
      <div class="approval-page__timing">
        <span>${a(t?`approvalPage.expiresLabel`:`approvalPage.resolvedLabel`)}</span>
        <time
          datetime=${new Date(t?e.expiresAtMs:e.resolvedAtMs).toISOString()}
        >
          ${j(t?e.expiresAtMs:e.resolvedAtMs)}
        </time>
      </div>
      ${this.requestError===`connection`?this.renderConnectionError():y}
      ${t?v`
              <div
                class="approval-page__actions"
                role="group"
                aria-label=${a(`approvalPage.actionsLabel`)}
              >
                ${n.allowedDecisions.map(e=>v`
                    <button
                      type="button"
                      class="btn approval-page__action approval-page__action--${e}"
                      data-decision=${e}
                      ?disabled=${this.resolving||!this.hasGatewayConnection||!r||this.requestError!==null}
                      @click=${()=>void this.resolveApproval(e)}
                    >
                      ${this.resolvingDecision===e?a(`approvalPage.resolvingDecision`,{decision:M(e)}):M(e)}
                    </button>
                  `)}
              </div>
            `:v`
              <div class="approval-page__terminal" role="status">
                ${a(`approvalPage.safeToClose`)}
              </div>
            `}
    `}render(){let e=this.connected&&!this.approvalsAccess,t=this.requestError===`unavailable`,n=this.requestError===`connection`&&!this.approval,r=e?`missing-scope`:t?`unavailable`:n?`connection-error`:this.approval?.status??`loading`,i=this.approval?.presentation,o=i?.kind===`plugin`?i.severity?.trim().toLowerCase():null,s=i?.kind===`exec`||o===`warning`||o===`warn`?`warning`:o===`danger`||o===`critical`||o===`error`?`danger`:`info`;return v`
      <main class="approval-page" data-state=${r}>
        <div class="approval-page__backdrop" aria-hidden="true"></div>
        <section
          class="approval-page__card approval-page__card--severity-${s}"
          aria-labelledby="approval-page-title"
          aria-busy=${this.loading||this.resolving?`true`:`false`}
        >
          ${this.renderHeader()}
          <div class="approval-page__content">
            ${e?this.renderState(`missing-scope`):this.loading&&!this.approval?this.renderState(`loading`):n?this.renderState(`connection`):t||!this.approval?this.renderState(`unavailable`):this.renderApproval(this.approval)}
          </div>
        </section>
        <a class="approval-page__back-link" href=${`${this.context.basePath}/chat`}>
          ${a(`approvalPage.openControlUi`)}
        </a>
      </main>
    `}updateDocumentTitle(){let e=`${this.connected&&!this.approvalsAccess?a(`common.disabled`):this.requestError===`unavailable`?a(`approvalPage.unavailableTitle`):this.requestError===`connection`&&!this.approval?a(`approvalPage.connectionErrorTitle`):this.approval?this.approval.status===`pending`?this.approval.presentation.kind===`plugin`?this.approval.presentation.title:a(`approvalPage.execTitle`):F(this.approval,this.resolutionOrigin):a(`approvalPage.loadingTitle`)} — ${a(`approvalPage.brandName`)}`;document.title=e,this.activeDocumentTitle=e}},r([i({context:h,subscribe:!1})],B.prototype,`context`,void 0),r([C({attribute:`approval-id`})],B.prototype,`approvalId`,void 0),r([x()],B.prototype,`approval`,void 0),r([x()],B.prototype,`connected`,void 0),r([x()],B.prototype,`approvalsAccess`,void 0),r([x()],B.prototype,`approvalGrantAccess`,void 0),r([x()],B.prototype,`loading`,void 0),r([x()],B.prototype,`resolving`,void 0),r([x()],B.prototype,`resolvingDecision`,void 0),r([x()],B.prototype,`requestError`,void 0),r([x()],B.prototype,`resolutionOrigin`,void 0)})))()}function H(){return(H=e((()=>{V(),customElements.get(`openclaw-approval-page`)||customElements.define(`openclaw-approval-page`,B)})))()}H();