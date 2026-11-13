import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{Zl as n,eu as r,hu as i,lu as a,nu as o,ou as s,uu as c}from"./control-ui-core-pYNj5S1a.js";import{Br as l}from"./control-ui-core-D6clmJs8.js";import{$ as u,X as d,Y as f,at as p,ct as m,nt as h,ut as g}from"./lit-runtime-DZL1fcCI.js";import{D as _,E as v,O as y,T as b,gi as x,hi as S,w as C}from"./control-ui-boot-shared-DJ4XCcp6.js";function w(e){let t=e.queue.filter(t=>t.id!==e.activeId);return t.length===0?d:u`
    <div class="exec-approval-list" aria-label=${i(`execApproval.otherPending`)}>
      <div class="exec-approval-list__heading">${i(`execApproval.otherPending`)}</div>
      ${t.map(t=>{let n=S(t.request.command),r=t.request.agentId?.trim()||`—`;return u`
          <button
            class="exec-approval-list__item"
            type="button"
            aria-label=${i(`execApproval.reviewRequest`,{agent:r,command:n})}
            @click=${()=>e.onSelect(t.id)}
          >
            <span class="exec-approval-list__agent">${r}</span>
            <span class="exec-approval-list__command mono">${n}</span>
            <openclaw-approval-countdown
              class="exec-approval-list__expiry"
              aria-hidden="true"
              .expiresAtMs=${t.expiresAtMs}
              .compact=${!0}
            ></openclaw-approval-countdown>
          </button>
        `})}
    </div>
  `}function T(e){return e.composedPath().some(e=>e instanceof Element&&e.closest(`input, textarea, [contenteditable]:not([contenteditable='false'])`)!==null)}function E(e){return T(e)?null:o(n.approveAlways,e)?`allow-always`:o(n.modifiedEnter,e)?`allow-once`:o(n.denyApproval,e)?`deny`:null}var D;function O(){return(O=e((()=>{f(),h(),x(),c(),r(),a(),v(),l(),D=class extends s{constructor(...e){super(...e),this.selectedApprovalId=null,this.explicitlyOpen=!1}show(){this.props?.queue.length&&(this.explicitlyOpen=!0,this.updateComplete.then(()=>this.dialog?.show()))}get dialogOpen(){return this.explicitlyOpen&&(this.props?.queue.length??0)>0}handleKeydown(e,t){if(e.defaultPrevented||e.repeat||this.props?.busy||!this.props?.canGrant)return;let n=E(e);n&&y(t).includes(n)&&(e.preventDefault(),this.props?.onDecision(t.id,n))}willUpdate(e){if(e.get(`props`)?.queue.length&&!this.props?.queue.length){this.explicitlyOpen=!1,this.selectedApprovalId=null;return}let t=this.props?.queue??[];t.some(e=>e.id===this.selectedApprovalId)||(this.selectedApprovalId=t.at(0)?.id??null)}render(){let e=this.props,t=e?.queue??[],n=t.find(e=>e.id===this.selectedApprovalId)??t.at(0);return!e||!this.explicitlyOpen||!n?d:u`
      <openclaw-modal-dialog
        label=${b(n)}
        description=${C(n.expiresAtMs,Date.now())}
        @keydown=${e=>this.handleKeydown(e,n)}
        @modal-cancel=${t=>{if(e.busy){t.preventDefault();return}this.explicitlyOpen=!1}}
      >
        <div class="exec-approval-modal-stack">
          ${_({approval:n,busy:e.busy,canGrant:e.canGrant,error:e.errors.get(n.id)??null,variant:`modal`,queueCount:t.length,onDecision:e.onDecision})}
          ${w({queue:t,activeId:n.id,onSelect:e=>{this.selectedApprovalId=e}})}
        </div>
      </openclaw-modal-dialog>
    `}},t([g({attribute:!1})],D.prototype,`props`,void 0),t([p(`openclaw-modal-dialog`)],D.prototype,`dialog`,void 0),t([m()],D.prototype,`selectedApprovalId`,void 0),t([m()],D.prototype,`explicitlyOpen`,void 0),customElements.get(`openclaw-exec-approval`)||customElements.define(`openclaw-exec-approval`,D)})))()}O();