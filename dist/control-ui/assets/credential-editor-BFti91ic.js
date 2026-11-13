import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as n,hu as r,lu as i,ql as a,su as o,uu as s,yi as c}from"./control-ui-core-pYNj5S1a.js";import{Br as l,Xi as u,Zi as d}from"./control-ui-core-D6clmJs8.js";import{$ as f,C as p,T as m,X as h,Y as g,ct as _,nt as v,ut as y}from"./lit-runtime-DZL1fcCI.js";import{di as b,fi as x}from"./control-ui-boot-shared-3Hl8ksFq.js";import{i as S,n as C,r as w}from"./ref-contract-BvtmleBi.js";function T(e,t,n){return f`<openclaw-plugin-credential-editor
    .field=${e}
    .descriptor=${t}
    .context=${n}
  ></openclaw-plugin-credential-editor>`}var E,D;function O(){return(O=e((()=>{g(),v(),p(),C(),d(),l(),s(),b(),c(),a(),i(),x(),E=[`env`,`file`,`exec`,`store`],D=class extends o{constructor(...e){super(...e),this.inspection=null,this.loading=!1,this.error=``,this.dialogOpen=!1,this.reference={source:`env`,provider:`default`,id:``},this.literal=``,this.revealed=!1,this.saving=!1,this.cancelling=!1,this.referenceSubmitted=!1,this.generation=0,this.identity=``,this.fieldIdentity=``,this.connection=null}willUpdate(e){if(!this.context||!this.field||!this.descriptor)return;let t=JSON.stringify([this.context.pluginId,this.field.path,this.context.baseHash,this.context.gateway.epoch,this.context.canInspect]);if(t===this.identity&&this.binding===this.context.gateway)return;let n=JSON.stringify([this.context.pluginId,this.field.path]),i=this.binding!==this.context.gateway||this.fieldIdentity!==n||!this.context.canInspect||this.connection&&!this.context.gateway.isCurrent(this.connection),a=this.dialogOpen;if(this.identity=t,this.fieldIdentity=n,this.binding=this.context.gateway,this.revealed=!1,i&&(this.literal=``,this.dialogOpen=!1,this.saving=!1,this.cancelling=!1,this.referenceSubmitted=!1,this.reference={source:`env`,provider:`default`,id:``}),this.inspection=null,this.generation++,a&&!this.saving&&!i){this.error=r(`pluginsPage.credentials.stale`),this.loading=!1;return}this.inspect()}disconnectedCallback(){this.generation++,this.inspection=null,this.revealed=!1,this.literal=``,this.reference={source:`env`,provider:`default`,id:``},this.referenceSubmitted=!1,super.disconnectedCallback()}async inspect(e=!1){let{gateway:t,pluginId:i,baseHash:a,canInspect:o}=this.context,s=t.capture(),c=++this.generation;if(this.connection=s,this.error=``,this.loading=!1,o&&s&&a){this.loading=!0;try{let n=await s.client.request(`plugins.credentials.inspect`,{pluginId:i,path:this.field.path,baseHash:a,...e?{reveal:!0}:{}});if(c!==this.generation||!t.isCurrent(s))return;if(n.baseHash!==this.context.baseHash){this.error=r(`pluginsPage.credentials.stale`);return}this.inspection=n.credential.kind===`literal`&&!e?{kind:`literal`}:n.credential,this.revealed=e&&n.credential.kind===`literal`&&n.credential.value!==void 0,this.dialogOpen&&n.credential.kind===`reference`&&(this.reference={...n.credential.ref})}catch(e){c===this.generation&&t.isCurrent(s)&&(this.error=n(e))}finally{c===this.generation&&t.isCurrent(s)&&(this.loading=!1)}}}toggleReveal(){this.revealed?(this.revealed=!1,this.inspection?.kind===`literal`&&(this.inspection={kind:`literal`})):this.literal?this.revealed=!0:this.inspect(!0)}openReference(){this.referenceSubmitted=!1;let e=this.inspection;this.reference=e?.kind===`reference`?{...e.ref}:{source:`env`,provider:`default`,id:``},this.dialogOpen=!0}async patch(e){if(this.field.disabled||this.saving||!this.context.canInspect||!this.connection||!this.context.gateway.isCurrent(this.connection))return;let t=this.context.gateway,i=this.connection,a=JSON.stringify([this.context.pluginId,this.field.path]),o=()=>this.isConnected&&this.context.gateway===t&&t.isCurrent(i)&&JSON.stringify([this.context.pluginId,this.field.path])===a;this.saving=!0,this.referenceSubmitted||=this.dialogOpen,this.error=``;try{let t=await this.context.onCommit(this.field.path,e);if(!o())return;t?(this.referenceSubmitted=!1,this.dialogOpen=!1,this.literal=``,await this.inspect()):this.error=this.context.saveError||r(`pluginsPage.credentials.saveFailed`)}catch(e){o()&&(this.error=n(e))}finally{o()&&(this.saving=!1)}}async cancelReference(){if(this.saving||this.cancelling)return;if(!this.referenceSubmitted){this.dialogOpen=!1;return}let e=this.context.gateway,t=this.connection,i=this.fieldIdentity,a=()=>this.isConnected&&this.context.gateway===e&&t!==null&&e.isCurrent(t)&&this.fieldIdentity===i;this.cancelling=!0;try{let e=await this.context.onDiscard();if(!a())return;e?(this.referenceSubmitted=!1,this.dialogOpen=!1,await this.inspect()):this.error=this.context.saveError||r(`configView.discardUnconfirmed`)}catch(e){a()&&(this.error=n(e))}finally{a()&&(this.cancelling=!1)}}renderDialog(){if(!this.dialogOpen)return h;let e=this.inspection?.kind===`environment`?this.inspection.envVar:null,t=this.field.disabled||this.loading||this.saving||this.cancelling||!this.inspection,n=this.error||this.context.saveError;return f`<openclaw-modal-dialog
      .label=${`${r(`pluginsPage.credentials.referenceTitle`)}: ${this.descriptor.label}`}
      @modal-cancel=${e=>{e.preventDefault(),this.cancelReference()}}
    >
      <section class="plugin-credential__dialog">
        <h2>${r(`pluginsPage.credentials.referenceTitle`)}</h2>
        ${e?f`<p>${r(`pluginsPage.credentials.environmentHelp`,{name:e})}</p>`:f`
                <p>${r(`pluginsPage.credentials.referenceHelp`)}</p>
                <label
                  >${r(`pluginsPage.credentials.source`)}<select
                    autofocus
                    class="settings-input"
                    aria-label=${r(`pluginsPage.credentials.source`)}
                    .value=${this.reference.source}
                    ?disabled=${t}
                    @change=${e=>{if(e.currentTarget instanceof HTMLSelectElement){let t=e.currentTarget.value,n=E.find(e=>e===t);n&&(this.reference={...this.reference,source:n})}}}
                  >
                    ${E.map(e=>f`<option value=${e} ?selected=${e===this.reference.source}>${r(`pluginsPage.credentials.sources.${e}`)}</option>`)}
                  </select></label
                >
                <label
                  >${r(`pluginsPage.credentials.provider`)}<input
                    class="settings-input"
                    .value=${this.reference.provider}
                    ?disabled=${t}
                    @input=${e=>{e.currentTarget instanceof HTMLInputElement&&(this.reference={...this.reference,provider:e.currentTarget.value})}}
                /></label>
                <label
                  >${r(`pluginsPage.credentials.identifier`)}<input
                    class="settings-input"
                    .value=${this.reference.id}
                    ?disabled=${t}
                    @input=${e=>{e.currentTarget instanceof HTMLInputElement&&(this.reference={...this.reference,id:e.currentTarget.value})}}
                /></label>
                <p class="muted">${r(`pluginsPage.credentials.help.${this.reference.source}`)}</p>
                ${this.inspection?.kind===`reference`&&this.inspection.unresolved?f`<p class="callout warn">${r(`pluginsPage.credentials.unresolved`)}</p>`:h}
              `}
        ${n?f`<p role="alert" class="callout danger">${n}</p>`:h}
        <footer>
          <button
            class="btn"
            ?disabled=${this.saving||this.cancelling}
            @click=${()=>this.cancelReference()}
          >
            ${r(`common.cancel`)}
          </button>
          ${!this.inspection&&!this.loading?f`<button class="btn" @click=${()=>this.inspect()}>${r(`common.retry`)}</button>`:h}
          ${e?h:f`<button class="btn primary" ?disabled=${t||!S(this.reference)} @click=${()=>this.patch({...this.reference})}>${this.saving?r(`common.saving`):r(`common.save`)}</button>`}
        </footer>
      </section>
    </openclaw-modal-dialog>`}render(){if(!this.field||!this.descriptor||!this.context)return h;let e=this.inspection,t=this.field.value===`__OPENCLAW_REDACTED__`||e?.kind===`literal`,n=e?.kind===`reference`||w(this.field.value),i=e?.kind===`environment`,a=this.field.disabled||this.saving||!this.context.canInspect||!this.context.gateway.connected||!this.context.baseHash;return f`<div class="plugin-credential">
      ${n||i?f`<div class="plugin-credential__reference">
              <span
                >${i?r(`pluginsPage.credentials.environment`,{name:e.envVar}):r(`pluginsPage.credentials.fromSource`,{source:e?.kind===`reference`?e.ref.source:w(this.field.value)?this.field.value.source:``})}</span
              >
              ${e?.kind===`reference`?f`<code>${e.ref.id}</code>`:h}
              <button
                class="btn btn--sm"
                aria-label=${`${r(i?`pluginsPage.credentials.viewSource`:`pluginsPage.credentials.editReference`)}: ${this.descriptor.label}`}
                aria-describedby=${m(this.field.descriptionId)}
                ?disabled=${this.loading||!e||!this.context.canInspect}
                @click=${()=>this.openReference()}
              >
                ${r(i?`pluginsPage.credentials.viewSource`:`pluginsPage.credentials.editReference`)}
              </button>
            </div>`:f`
              <div
                class="plugin-credential__input settings-secret"
                @focusout=${e=>{e.relatedTarget instanceof Element&&e.relatedTarget.closest(`.plugin-credential__input`)===e.currentTarget||this.literal&&this.patch(this.literal)}}
              >
                <input
                  class="settings-input"
                  aria-label=${this.descriptor.label}
                  aria-describedby=${m(this.field.descriptionId)}
                  autocomplete="off"
                  spellcheck="false"
                  type=${this.revealed?`text`:`password`}
                  .value=${this.literal||(this.revealed&&e?.kind===`literal`?e.value??``:``)}
                  placeholder=${t?r(`pluginsPage.credentials.stored`):this.descriptor.placeholder??``}
                  ?disabled=${a}
                  @input=${e=>{e.currentTarget instanceof HTMLInputElement&&(this.literal=e.currentTarget.value)}}
                  @keydown=${e=>{e.key===`Enter`&&this.literal&&(e.preventDefault(),this.patch(this.literal))}}
                />
                <button
                  class="settings-secret__toggle"
                  type="button"
                  aria-label=${`${r(this.revealed?`pluginsPage.credentials.hide`:`pluginsPage.credentials.reveal`)}: ${this.descriptor.label}`}
                  aria-pressed=${this.revealed}
                  ?disabled=${a||this.loading||!this.literal&&e?.kind!==`literal`}
                  @click=${()=>this.toggleReveal()}
                >
                  ${this.revealed?u.eyeOff:u.eye}
                </button>
              </div>
              <div class="plugin-credential__links">
                ${this.descriptor.signupUrl?f`<a href=${this.descriptor.signupUrl} target="_blank" rel="noopener noreferrer">${r(`pluginsPage.credentials.signup`)}${u.externalLink}</a>`:h}<button
                  class="btn btn--ghost btn--sm"
                  aria-label=${`${r(`pluginsPage.credentials.useReference`)}: ${this.descriptor.label}`}
                  aria-describedby=${m(this.field.descriptionId)}
                  ?disabled=${a||this.loading||!e||!this.context.canInspect}
                  @click=${()=>this.openReference()}
                >
                  ${r(`pluginsPage.credentials.useReference`)}
                </button>
              </div>
              ${t?f`<small>${r(`pluginsPage.credentials.replace`)}</small>`:h}
            `}
      ${this.loading?f`<span role="status" class="muted">${r(`common.loading`)}</span>`:h}
      ${e?.kind===`invalid`?f`<span role="alert">${r(`pluginsPage.credentials.invalidStored`)}</span>`:h}
      ${!this.dialogOpen&&(this.error||this.context.saveError)?f`<div role="alert">${this.error||this.context.saveError}<button class="btn btn--sm" @click=${()=>this.literal?this.patch(this.literal):this.inspect()}>${r(`common.retry`)}</button></div>`:h}
      ${this.renderDialog()}
    </div>`}},t([y({attribute:!1})],D.prototype,`field`,void 0),t([y({attribute:!1})],D.prototype,`descriptor`,void 0),t([y({attribute:!1})],D.prototype,`context`,void 0),t([_()],D.prototype,`inspection`,void 0),t([_()],D.prototype,`loading`,void 0),t([_()],D.prototype,`error`,void 0),t([_()],D.prototype,`dialogOpen`,void 0),t([_()],D.prototype,`reference`,void 0),t([_()],D.prototype,`literal`,void 0),t([_()],D.prototype,`revealed`,void 0),t([_()],D.prototype,`saving`,void 0),t([_()],D.prototype,`cancelling`,void 0),customElements.define(`openclaw-plugin-credential-editor`,D)})))()}export{T as n,O as t};