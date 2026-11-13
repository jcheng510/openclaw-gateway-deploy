import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Et as t,Tt as n,qr as r}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as i,Kl as a,cc as o,hu as s,lu as c,ql as l,sc as u,su as d,uu as f}from"./control-ui-core-pYNj5S1a.js";import{Br as p,_r as m,fr as h}from"./control-ui-core-D6clmJs8.js";import{$ as g,X as _,Y as v,ct as y,nt as b,ut as x}from"./lit-runtime-DZL1fcCI.js";import{L as S,R as C,V as w,z as T}from"./control-ui-boot-shared-D-LYw3KU.js";function E(e){return e.items.filter(e=>e.status===`planned`)}function D(e){return e?.providers.filter(e=>e.found&&e.planFingerprint&&E(e).length>0)??[]}function O(){try{return globalThis.sessionStorage?.getItem(A)===`done`}catch{return!1}}function k(){try{globalThis.sessionStorage?.setItem(A,`done`)}catch{}}var A,j;function M(){return(M=e((()=>{S(),v(),b(),m(),f(),l(),t(),c(),o(),p(),A=`openclaw.onboarding.memory-import`,j=class extends d{constructor(...e){super(...e),this.active=!1,this.selectedByProvider={},this.applyingProviderId=null,this.results={},this.done=!1,this.closed=!1,this.subscriptions=new u(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t)),this.planTask=new C(this,{args:()=>{let e=this.context?.gateway.snapshot;return[this.active,this.closed,O(),this.isConnected&&e?.phase===`connected`?e.client??null:null,e?h(e.hello?.auth??null):!1,this.currentAgentId()]},task:async([e,t,n,r,i,a],{signal:o})=>{if(!e||t||n||!r||!i||!a||this.applyingProviderId!==null||this.done)return T;let s=await r.request(`migrations.memory.plan`,{agentId:a,overwrite:!1},{signal:o});return s.agentId!==a||D(s).length===0&&s.providers.some(e=>e.error)?T:{client:r,agentId:a,plan:s}},onComplete:({plan:e})=>{let t=D(e);if(t.length===0){e.providers.some(e=>e.error)||(k(),this.closed=!0);return}this.results={},this.done=!1,this.selectedByProvider=Object.fromEntries(t.map(e=>[e.providerId,!0]))}})}disconnectedCallback(){this.planTask.run([!1,!0,!0,null,!1,null]),this.subscriptions.clear(),super.disconnectedCallback()}updated(){if(this.context?.agents.state.agentsList)this.agentsListRequest=void 0;else if(this.context&&this.agentsListRequest!==this.context.agents){let e=this.context.agents;this.agentsListRequest=e,e.ensureList().catch(()=>null).then(()=>{this.context?.agents===e&&!e.state.agentsList&&(this.agentsListRequest=void 0)})}}currentAgentId(){let e=this.context?.agents.state.agentsList;if(!e)return null;let t=this.context?.agentSelection.state.selectedId;return t&&e.agents.some(e=>e.id===t)?t:e.defaultId??e.agents[0]?.id??null}get planBinding(){let e=this.planTask.value,t=this.context?.gateway.snapshot,n=this.currentAgentId();return this.planTask.status!==w.COMPLETE||!e?null:e.client===t?.client&&e.agentId===n?e:null}get plan(){return this.planBinding?.plan??null}toggleProvider(e,t){this.selectedByProvider={...this.selectedByProvider,[e]:t}}async importSelected(){let e=this.context,t=this.planBinding,r=t?.plan,a=t?.client,o=t?.agentId;if(!e||!a||!r||!o||this.applyingProviderId!==null||this.done)return;let c=D(r).filter(e=>this.selectedByProvider[e.providerId]);if(c.length!==0){for(let e of c){if(!this.isConnected||this.closed||this.context?.gateway.snapshot.client!==a||this.currentAgentId()!==o){this.results={...this.results,[e.providerId]:{kind:`error`,message:s(`onboarding.memoryImport.connectionChanged`)}};continue}let t=E(e).map(e=>e.id),r=e.planFingerprint;if(r&&t.length!==0){this.applyingProviderId=e.providerId;try{let i=await a.request(`migrations.memory.apply`,{idempotencyKey:n(),agentId:o,providerId:e.providerId,planFingerprint:r,itemIds:t,overwrite:!1});this.results={...this.results,[e.providerId]:{kind:i.summary.errors>0||i.summary.conflicts>0?`partial`:`success`,result:i}}}catch(t){this.results={...this.results,[e.providerId]:{kind:`error`,message:i(t,s(`onboarding.memoryImport.unknownError`))}}}}}this.applyingProviderId=null,this.done=this.context?.gateway.snapshot.client===a&&this.currentAgentId()===o,this.done||this.planTask.run()}}finish(){k(),this.closed=!0}reviewDetails(){this.finish(),this.context?.navigate(`memory-import`)}handleModalCancel(e){if(this.applyingProviderId!==null){e.preventDefault();return}this.finish()}renderProvider(e){let t=E(e).length,n=e.items.filter(e=>e.status===`conflict`).length,r=this.results[e.providerId],i=this.applyingProviderId===e.providerId;return g`
      <li class="onboarding-memory-import__provider" data-provider-id=${e.providerId}>
        <label>
          <input
            type="checkbox"
            .checked=${this.selectedByProvider[e.providerId]??!1}
            ?disabled=${this.applyingProviderId!==null||this.done}
            @change=${t=>this.toggleProvider(e.providerId,t.currentTarget.checked)}
          />
          <span class="onboarding-memory-import__provider-copy">
            <strong>${e.label}</strong>
            <code title=${e.source??``}
              >${e.source??s(`onboarding.memoryImport.sourceUnavailable`)}</code
            >
            <small>
              ${s(`onboarding.memoryImport.plannedCount`,{count:String(t)})}
              ${n>0?g`<span>
                      ${s(`onboarding.memoryImport.alreadyImported`,{count:String(n)})}
                    </span>`:_}
            </small>
          </span>
        </label>
        <div class="onboarding-memory-import__provider-status" aria-live="polite">
          ${i?s(`onboarding.memoryImport.importingProvider`):r?.kind===`success`?s(`onboarding.memoryImport.providerResult`,{migrated:String(r.result.summary.migrated),skipped:String(r.result.summary.skipped)}):r?.kind===`partial`?g`<span role="alert">
                      ${s(`onboarding.memoryImport.providerIncomplete`,{conflicts:String(r.result.summary.conflicts),errors:String(r.result.summary.errors),migrated:String(r.result.summary.migrated),skipped:String(r.result.summary.skipped)})}
                    </span>`:r?.kind===`error`?g`<span role="alert">
                        ${s(`onboarding.memoryImport.providerError`,{error:a(r.message)})}
                      </span>`:_}
        </div>
      </li>
    `}render(){let e=this.context,t=e?.gateway.snapshot,n=D(this.plan);if(!this.active||this.closed||O()||!e||t?.phase!==`connected`||!t.client||!h(t.hello?.auth??null)||n.length===0)return _;let r=n.filter(e=>this.selectedByProvider[e.providerId]).length,i=Object.values(this.results).filter(e=>e.kind!==`error`),a=i.reduce((e,t)=>e+t.result.summary.migrated,0),o=i.reduce((e,t)=>e+t.result.summary.skipped,0),c=s(`onboarding.memoryImport.title`),l=s(`onboarding.memoryImport.body`);return g`
      <openclaw-modal-dialog
        class="onboarding-memory-import-dialog"
        label=${c}
        description=${l}
        @modal-cancel=${e=>this.handleModalCancel(e)}
      >
        <section class="onboarding-memory-import">
          <header>
            <h2>${this.done?s(`onboarding.memoryImport.doneTitle`):c}</h2>
            <p>
              ${this.done?s(`onboarding.memoryImport.doneBody`,{migrated:String(a),skipped:String(o)}):l}
            </p>
          </header>
          <ul>
            ${n.map(e=>this.renderProvider(e))}
          </ul>
          <footer>
            ${this.done?g`<button
                    class="btn primary"
                    type="button"
                    data-test-id="onboarding-memory-import-continue"
                    @click=${()=>this.finish()}
                  >
                    ${s(`common.continue`)}
                  </button>`:g`
                    <button
                      class="btn primary"
                      type="button"
                      data-test-id="onboarding-memory-import-import"
                      ?disabled=${r===0||this.applyingProviderId!==null}
                      @click=${()=>void this.importSelected()}
                    >
                      ${this.applyingProviderId?s(`common.importing`):s(`onboarding.memoryImport.import`)}
                    </button>
                    <button
                      class="btn"
                      type="button"
                      data-test-id="onboarding-memory-import-skip"
                      ?disabled=${this.applyingProviderId!==null}
                      @click=${()=>this.finish()}
                    >
                      ${s(`onboarding.memoryImport.skip`)}
                    </button>
                    <button
                      class="btn btn--ghost onboarding-memory-import__review"
                      type="button"
                      ?disabled=${this.applyingProviderId!==null}
                      @click=${()=>this.reviewDetails()}
                    >
                      ${s(`onboarding.memoryImport.reviewDetails`)}
                    </button>
                  `}
          </footer>
        </section>
      </openclaw-modal-dialog>
    `}},r([x({attribute:!1})],j.prototype,`context`,void 0),r([x({type:Boolean})],j.prototype,`active`,void 0),r([y()],j.prototype,`selectedByProvider`,void 0),r([y()],j.prototype,`applyingProviderId`,void 0),r([y()],j.prototype,`results`,void 0),r([y()],j.prototype,`done`,void 0),r([y()],j.prototype,`closed`,void 0),customElements.get(`openclaw-onboarding-memory-import`)||customElements.define(`openclaw-onboarding-memory-import`,j)})))()}M();