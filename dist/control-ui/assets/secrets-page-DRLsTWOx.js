import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,ii as n,qr as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as a,N as o,R as ee,hu as s,lu as c,pu as l,ql as u,su as d,uu as f}from"./control-ui-core-pYNj5S1a.js";import{Br as p,Ma as m,Yi as h,Zi as g,va as _,vi as v,yi as y}from"./control-ui-core-D6clmJs8.js";import{$ as b,X as x,Y as S,c as te,ct as C,nt as ne,s as re}from"./lit-runtime-DZL1fcCI.js";import{c as ie,d as ae,l as oe}from"./gateway-runtime-iOL78mIi.js";import{no as se,ro as ce}from"./control-ui-boot-shared-3Hl8ksFq.js";import{At as le,Dt as ue,Et as de,To as fe,Ya as w,_t as T,vt as E,wo as D,wt as O,xt as k}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as A,t as j}from"./settings-workspace-DKW0BVnu.js";import{n as M,t as N}from"./ref-contract-BvtmleBi.js";function P(){return(P=e((()=>{n(),M()})))()}function F(e){return I.test(e)}var I;function L(){return(L=e((()=>{I=/_?(API_KEY|TOKEN|PASSWORD|PRIVATE_KEY|SECRET)$/i})))()}function R(e){let t={},n=e.replace(/\r\n?/gu,`
`);z.lastIndex=0;let r;for(;(r=z.exec(n))!==null;){let e=r[1];if(!e)continue;let n=(r[2]??``).trim(),i=n[0];n=n.replace(/^(['"`])([\s\S]*)\1$/gmu,`$2`),i===`"`&&(n=n.replace(/\\n/gu,`
`).replace(/\\r/gu,`\r`)),t[e]=n}return t}var z;function B(){return(B=e((()=>{z=/^\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?$/gmu})))()}function V(e={}){return{client:e.client??null,connected:e.connected??!1,entries:[],loaded:!1,loading:!1,busy:!1,error:null}}async function H(e,t){let n=await t.request(`secrets.store.list`,{});return e.client!==t||!e.connected?!1:(e.entries=n.entries,e.loaded=!0,!0)}async function U(e){let t=e.client;if(!t||!e.connected||e.loading)return!1;e.loading=!0,e.error=null;try{return await H(e,t)}catch(n){return e.client===t&&(e.error=a(n)),!1}finally{e.client===t&&(e.loading=!1)}}async function W(e,t){let n=e.client;if(!n||!e.connected||e.busy)return null;e.busy=!0,e.error=null;let r=null,i;try{r=await t(n)}catch(e){i=e}try{await H(e,n)}catch(e){i??=e}finally{e.client===n&&(e.busy=!1,e.error=i?a(i):null)}return i?null:r}function pe(e,t){return W(e,e=>e.request(`secrets.store.set`,{name:t.name,value:t.value,kind:t.kind,...t.kind===`secret`?{allowedHosts:t.allowedHosts.split(/[\s,]+/u).filter(Boolean)}:{}}))}function me(e,t){return W(e,e=>e.request(`secrets.store.delete`,{name:t}))}function he(e,t){let n=R(e),r=Object.keys(n).filter(e=>!N.test(e));return{entries:Object.entries(n).map(([e,n])=>({name:e,value:n,kind:t&&F(e)?`secret`:`env`})),invalidNames:r}}async function ge(e,t){let n=e.client;if(!n||!e.connected||e.busy||t.length===0)return null;e.busy=!0,e.error=null;let r=0,i=0,o;try{for(let a of t){let t=await n.request(`secrets.store.set`,a);r+=1,i=Math.max(i,t.warningCount??0),await H(e,n)}}catch(e){o=Error(s(`secretsStore.partial`,{saved:String(r),total:String(t.length),error:a(e)}))}try{o&&await H(e,n)}catch(e){o??=e}finally{e.client===n&&(e.busy=!1,e.error=o?a(o):null)}return o?null:{saved:r,warningCount:i}}function G(){return(G=e((()=>{P(),L(),B(),f(),u()})))()}function _e(e){let t=o(e.updatedAtMs,{fallback:s(`common.unknown`)});return e.updatedBy?s(`secretsStore.by`,{time:t,name:e.updatedBy}):t}function ve(e,t){return!e.canSet&&!e.canDelete?b``:b`
    <wa-dropdown
      class="secrets-store__menu"
      placement="bottom-end"
      @wa-select=${n=>{n.detail.item.value===`edit`&&e.canSet?e.onOpenEdit(t):n.detail.item.value===`delete`&&e.canDelete&&e.onDelete(t)}}
    >
      <button
        slot="trigger"
        type="button"
        class="btn btn--sm btn--ghost secrets-store__menu-trigger"
        aria-label=${`${s(`secretsStore.actions`)}: ${t.name}`}
        title=${s(`secretsStore.actions`)}
        ?disabled=${e.busy}
      >
        ${h(`moreHorizontal`)}
      </button>
      ${e.canSet?b`<wa-dropdown-item value="edit">${s(`secretsStore.edit`)}</wa-dropdown-item>`:x}
      ${e.canDelete?b`<wa-dropdown-item value="delete" variant="danger"
              >${s(`common.delete`)}</wa-dropdown-item
            >`:x}
    </wa-dropdown>
  `}function ye(e){return e.canList?e.loading&&!e.entries.length?O():e.entries.length?b`
    <div class="secrets-store__table-wrap">
      <table class="secrets-store__table settings-table--stacked" role="table">
        <thead>
          <tr>
            <th scope="col">${s(`secretsStore.name`)}</th>
            <th scope="col">${s(`secretsStore.access`)}</th>
            <th scope="col">${s(`secretsStore.value`)}</th>
            <th scope="col">${s(`secretsStore.allowedHosts`)}</th>
            <th scope="col">${s(`secretsStore.updated`)}</th>
            <th scope="col" class="secrets-store__actions-heading">
              <span class="settings-control__sr-label">${s(`secretsStore.actions`)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${te(e.entries,e=>e.name,t=>b`
              <tr tabindex="0" aria-label=${t.name}>
                <td data-label=${s(`secretsStore.name`)}>
                  <code class="secrets-store__name" title=${t.name}>${t.name}</code>
                </td>
                <td data-label=${s(`secretsStore.access`)}>
                  <span class="secrets-store__mode secrets-store__mode--${t.kind}"
                    >${s(t.kind===`secret`?`secretsStore.protectedSecret`:`secretsStore.agentReadable`)}</span
                  >
                </td>
                <td data-label=${s(`secretsStore.value`)}>
                  <span
                    class="secrets-store__value ${t.kind===`secret`?`secrets-store__value--secret`:``}"
                    title=${t.kind===`env`?t.value:x}
                    >${t.kind===`env`?t.value:Y}</span
                  >
                </td>
                <td data-label=${s(`secretsStore.allowedHosts`)}>
                  <span class="secrets-store__hosts">
                    ${t.kind===`secret`&&(t.allowedHosts?.length??0)>0?t.allowedHosts?.join(`, `):s(`secretsStore.noAllowedHosts`)}
                  </span>
                </td>
                <td data-label=${s(`secretsStore.updated`)}>
                  <time
                    class="secrets-store__updated"
                    datetime=${new Date(t.updatedAtMs).toISOString()}
                    title=${new Intl.DateTimeFormat(l.getLocale(),{dateStyle:`medium`,timeStyle:`short`}).format(new Date(t.updatedAtMs))}
                    >${_e(t)}</time
                  >
                </td>
                <td class="secrets-store__actions-cell" data-label=${s(`secretsStore.actions`)}>
                  ${ve(e,t)}
                </td>
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `:b`
      <div class="secrets-store__empty">
        ${k(s(`tabs.secrets`))} ${E(J,s(`common.docs`))}
      </div>
    `:k(s(`secretsStore.unavail`))}function be(e){if(!e.dialogMode)return x;let t=e.dialogMode===`edit`;return b`
    <openclaw-modal-dialog
      label=${s(t?`secretsStore.edit`:`secretsStore.add`)}
      description=${s(`secretsStore.hint`)}
      @modal-cancel=${e.onCloseDialog}
    >
      <form
        class="secrets-store-dialog"
        aria-busy=${e.busy?`true`:`false`}
        @submit=${t=>{t.preventDefault(),e.onSubmitDraft()}}
      >
        <div class="secrets-store-dialog__header">
          <h2>${s(t?`secretsStore.edit`:`secretsStore.add`)}</h2>
        </div>
        <label class="secrets-store-field">
          <span>${s(`secretsStore.name`)}</span>
          <input
            class="settings-input mono"
            name="name"
            autocomplete="off"
            spellcheck="false"
            autofocus
            ?readonly=${t}
            ?disabled=${e.busy}
            .value=${e.draft.name}
            @input=${t=>e.onDraftNameChange(t.currentTarget.value)}
          />
        </label>
        <label class="secrets-store-field">
          <span>${s(`secretsStore.value`)}</span>
          <textarea
            class="settings-input secrets-store-dialog__value"
            name="value"
            autocomplete="off"
            spellcheck="false"
            ?disabled=${e.busy}
            .value=${e.draft.value}
            @input=${t=>e.onDraftValueChange(t.currentTarget.value)}
          ></textarea>
        </label>
        <fieldset class="secrets-store-modes">
          <legend>${s(`secretsStore.accessMode`)}</legend>
          ${[`secret`,`env`].map(t=>{let n=t===`secret`?`secrets-store-mode--selected`:`secrets-store-mode--selected secrets-store-mode--risk`;return b`<label
              class="secrets-store-mode ${e.draft.kind===t?n:``}"
            >
              <input
                type="radio"
                name="access-mode"
                value=${t}
                .checked=${e.draft.kind===t}
                ?disabled=${e.busy}
                @change=${()=>e.onDraftKindChange(t)}
              />
              <span>
                <strong
                  >${s(t===`secret`?`secretsStore.protectedSecret`:`secretsStore.agentReadable`)}</strong
                >
                <small
                  >${s(t===`secret`?`secretsStore.protectedSecretHint`:`secretsStore.agentReadableHint`)}</small
                >
              </span>
            </label>`})}
        </fieldset>
        ${e.draft.kind===`secret`?b`
                <label class="secrets-store-field">
                  <span>${s(`secretsStore.allowedHosts`)}</span>
                  <textarea
                    class="settings-input secrets-store-dialog__hosts mono"
                    name="allowed-hosts"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder=${s(`secretsStore.allowedHostsPlaceholder`)}
                    ?disabled=${e.busy}
                    .value=${e.draft.allowedHosts}
                    @input=${t=>e.onDraftAllowedHostsChange(t.currentTarget.value)}
                  ></textarea>
                  <small>${s(`secretsStore.allowedHostsHint`)}</small>
                </label>
              `:x}
        ${q(e,e.onCloseDialog)}
      </form>
    </openclaw-modal-dialog>
  `}function K(e){return e.bulkOpen?b`
    <openclaw-modal-dialog label=${s(`secretsStore.bulk`)} @modal-cancel=${e.onCloseBulk}>
      <form
        class="secrets-store-dialog"
        aria-busy=${e.busy?`true`:`false`}
        @submit=${t=>{t.preventDefault(),e.onSubmitBulk()}}
      >
        <div class="secrets-store-dialog__header">
          <h2>${s(`secretsStore.bulk`)}</h2>
        </div>
        <label class="secrets-store-field">
          <span>${s(`secretsStore.value`)}</span>
          <textarea
            class="settings-input secrets-store-dialog__bulk"
            name="bulk-values"
            autocomplete="off"
            spellcheck="false"
            autofocus
            ?disabled=${e.busy}
            .value=${e.bulkRaw}
            @input=${t=>e.onBulkRawChange(t.currentTarget.value)}
          ></textarea>
        </label>
        <div class="secrets-store-bulk__summary" aria-live="polite">
          ${s(e.bulkSecretCount===1?`secretsStore.detectedOne`:`secretsStore.detected`,{count:String(e.bulkSecretCount)})}
        </div>
        <label class="secrets-store-checkbox">
          <input
            type="checkbox"
            .checked=${e.bulkAutoDetect}
            ?disabled=${e.busy}
            @change=${t=>e.onBulkAutoDetectChange(t.currentTarget.checked)}
          />
          <span>
            <strong>${s(`secretsStore.detect`)}</strong>
          </span>
        </label>
        ${e.bulkInvalidNames.length?b`<div class="callout danger" role="alert">
                ${s(`secretsStore.badName`)} ${e.bulkInvalidNames.join(`, `)}
              </div>`:x}
        ${q(e,e.onCloseBulk,!e.bulkEntryCount||e.bulkInvalidNames.length>0)}
      </form>
    </openclaw-modal-dialog>
  `:x}function q(e,t,n=!1){return b`
    ${e.formError?b`<div class="callout danger" role="alert">${e.formError}</div>`:x}
    <div class="secrets-store-dialog__actions">
      <button class="btn primary" type="submit" ?disabled=${e.busy||n}>
        ${e.busy?s(`common.saving`):s(`common.save`)}
      </button>
      <button class="btn" type="button" ?disabled=${e.busy} @click=${t}>
        ${s(`common.cancel`)}
      </button>
    </div>
  `}function xe(e){let t=e.canSet?b`
        <button
          class="btn btn--sm"
          type="button"
          ?disabled=${e.busy}
          @click=${e.onOpenBulk}
        >
          ${s(`secretsStore.bulk`)}
        </button>
        <button
          class="btn btn--sm primary"
          type="button"
          ?disabled=${e.busy}
          @click=${e.onOpenAdd}
        >
          ${h(`plus`)} ${s(`secretsStore.add`)}
        </button>
      `:void 0;return b`
    ${de(b`
        ${e.error?b`<div class="callout danger secrets-store__message" role="alert">
                <span>${e.error}</span>
                ${e.canList?b`<button class="btn btn--sm" type="button" @click=${e.onRefresh}>
                        ${s(`common.retry`)}
                      </button>`:x}
              </div>`:x}
        ${e.notice?b`<div
                class="callout success secrets-store__message"
                role="status"
                aria-live="polite"
              >
                ${e.notice}
              </div>`:x}
        ${le({title:s(`tabs.secrets`),actions:t,count:e.entries.length},ye(e))}
      `,{wide:!0})}
    ${be(e)} ${K(e)}
  `}var J,Y;function X(){return(X=e((()=>{S(),re(),g(),p(),T(),w(),f(),ee(),J=`https://docs.openclaw.ai/gateway/secrets#shared-secret-store`,Y=`••••••••`})))()}var Z,Q;function $(){return($=e((()=>{t(),S(),ne(),P(),L(),_(),y(),D(),T(),j(),f(),oe(),G(),ce(),c(),X(),Z=65536,Q=class extends d{constructor(...e){super(...e),this.store=V(),this.dialogMode=null,this.draft={name:``,value:``,kind:`env`,allowedHosts:``},this.secretKindOverridden=!1,this.bulkOpen=!1,this.bulkRaw=``,this.bulkAutoDetect=!0,this.formError=null,this.notice=null,this.gateway=new se(this,{getGateway:()=>this.context?.gateway,invalidateRequests:e=>this.resetGatewayState(e.snapshot),onSnapshot:e=>{e.initial&&this.resetGatewayState(e.snapshot)},ensureInitialData:()=>this.ensureInitialData()})}resetGatewayState(e){this.store=V({client:e?.client??null,connected:e?.phase===`connected`}),this.dialogMode=null,this.bulkOpen=!1,this.formError=null,this.notice=null}get canList(){return this.canCall(`secrets.store.list`)}get canSet(){return this.canCall(`secrets.store.set`)}get canDelete(){return this.canCall(`secrets.store.delete`)}canCall(e){return ae(this.gateway.snapshot??{},e)===!0&&ie(this.gateway.snapshot,e,`operator.admin`)}ensureInitialData(){this.canList&&!this.store.loaded&&!this.store.loading&&this.runStoreTask(e=>U(e))}async runStoreTask(e){let t=this.store;try{let n=e(t);return this.requestUpdate(),await n}finally{this.store===t&&this.requestUpdate()}}refresh(){this.canList&&this.runStoreTask(e=>U(e))}openAdd(){this.canSet&&(this.notice=null,this.formError=null,this.secretKindOverridden=!1,this.draft={name:``,value:``,kind:`env`,allowedHosts:``},this.dialogMode=`add`)}openEdit(e){this.canSet&&(this.notice=null,this.formError=null,this.secretKindOverridden=!0,this.draft={name:e.name,value:e.kind===`env`?e.value:``,kind:e.kind,allowedHosts:e.kind===`secret`?(e.allowedHosts??[]).join(`
`):``},this.dialogMode=`edit`)}closeDialog(){this.store.busy||(this.dialogMode=null,this.formError=null)}patchDraft(e){this.draft={...this.draft,...e},this.formError=null}changeDraftName(e){let t=e.toUpperCase();this.patchDraft({name:t,...this.secretKindOverridden?{}:{kind:F(t)?`secret`:`env`}})}validateValue(e,t){return t===`secret`&&e.length===0?s(`secretsStore.required`):new TextEncoder().encode(e).byteLength>Z?s(`secretsStore.tooLarge`):null}validateDraft(){return N.test(this.draft.name)?this.validateValue(this.draft.value,this.draft.kind):s(`secretsStore.badName`)}submitDraft(){if(!this.canSet||!this.dialogMode)return;let e=this.validateDraft();if(e){this.formError=e;return}let t={...this.draft};this.runStoreTask(async e=>{let n=await pe(e,t);if(this.store!==e)return;if(!n){this.formError=e.error;return}this.dialogMode=null,this.formError=null;let r=s(t.kind===`secret`?`secretsStore.savedProtected`:`secretsStore.savedReadable`,{name:t.name});this.notice=n.warningCount?`${r} ${s(`secretsStore.warnings`,{count:String(n.warningCount)})}`:r})}openBulk(){this.canSet&&(this.notice=null,this.formError=null,this.bulkRaw=``,this.bulkAutoDetect=!0,this.bulkOpen=!0)}closeBulk(){this.store.busy||(this.bulkOpen=!1,this.formError=null)}get bulkParsed(){return he(this.bulkRaw,this.bulkAutoDetect)}submitBulk(){if(!this.canSet||!this.bulkOpen)return;let e=this.bulkParsed;if(e.invalidNames.length>0){this.formError=`${s(`secretsStore.badName`)} ${e.invalidNames.join(`, `)}`;return}if(e.entries.length===0){this.formError=s(`secretsStore.required`);return}for(let t of e.entries){let e=this.validateValue(t.value,t.kind);if(e){this.formError=`${t.name}: ${e}`;return}}this.runStoreTask(async t=>{let n=await ge(t,e.entries);if(this.store!==t)return;if(!n){this.formError=t.error;return}this.bulkOpen=!1,this.formError=null;let r=s(`secretsStore.savedMany`,{count:String(n.saved),protected:String(e.entries.filter(e=>e.kind===`secret`).length),readable:String(e.entries.filter(e=>e.kind===`env`).length)});this.notice=n.warningCount?`${r} ${s(`secretsStore.warnings`,{count:String(n.warningCount)})}`:r})}async removeEntry(e){let t=this.context.gateway,n=this.store.client;if(n&&this.canDelete&&await fe({title:s(`common.delete`),message:s(`secretsStore.confirmDelete`,{name:e.name}),confirmLabel:s(`common.delete`),danger:!0})){if(this.notice=null,this.context.gateway!==t||this.store.client!==n||!this.canDelete){this.store.error=s(`secretsStore.deleteFailed`),this.requestUpdate();return}await this.runStoreTask(async t=>{await me(t,e.name)&&this.store===t&&(this.notice=s(`secretsStore.deleted`,{name:e.name}))})}}render(){let e=this.bulkParsed,t=xe({entries:this.store.entries,loading:this.store.loading,busy:this.store.busy,error:this.store.error,notice:this.notice,canList:this.canList,canSet:this.canSet,canDelete:this.canDelete,dialogMode:this.dialogMode,draft:this.draft,formError:this.formError,bulkOpen:this.bulkOpen,bulkRaw:this.bulkRaw,bulkAutoDetect:this.bulkAutoDetect,bulkSecretCount:e.entries.filter(e=>e.kind===`secret`).length,bulkEntryCount:e.entries.length,bulkInvalidNames:e.invalidNames,onRefresh:()=>this.refresh(),onOpenAdd:()=>this.openAdd(),onOpenEdit:e=>this.openEdit(e),onCloseDialog:()=>this.closeDialog(),onDraftNameChange:e=>this.changeDraftName(e),onDraftValueChange:e=>this.patchDraft({value:e}),onDraftAllowedHostsChange:e=>this.patchDraft({allowedHosts:e}),onDraftKindChange:e=>{this.secretKindOverridden=!0,this.patchDraft({kind:e})},onSubmitDraft:()=>this.submitDraft(),onOpenBulk:()=>this.openBulk(),onCloseBulk:()=>this.closeBulk(),onBulkRawChange:e=>{this.bulkRaw=e,this.formError=null},onBulkAutoDetectChange:e=>{this.bulkAutoDetect=e,this.formError=null},onSubmitBulk:()=>this.submitBulk(),onDelete:e=>void this.removeEntry(e)});return b`
      ${ue({title:m(`secrets`),subtitle:s(`secretsStore.hint`)})}
      ${A(t)}
    `}},r([i({context:v,subscribe:!0})],Q.prototype,`context`,void 0),r([C()],Q.prototype,`store`,void 0),r([C()],Q.prototype,`dialogMode`,void 0),r([C()],Q.prototype,`draft`,void 0),r([C()],Q.prototype,`secretKindOverridden`,void 0),r([C()],Q.prototype,`bulkOpen`,void 0),r([C()],Q.prototype,`bulkRaw`,void 0),r([C()],Q.prototype,`bulkAutoDetect`,void 0),r([C()],Q.prototype,`formError`,void 0),r([C()],Q.prototype,`notice`,void 0),customElements.get(`openclaw-secrets-page`)||customElements.define(`openclaw-secrets-page`,Q)})))()}$();