import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{As as i,Gl as a,N as o,R as s,bc as c,bs as l,hc as u,hu as d,ks as f,lu as p,ql as m,su as h,uu as g,xc as _}from"./control-ui-core-pYNj5S1a.js";import{Ma as v,_r as y,ja as b,va as x,vi as S,vr as C,yi as w}from"./control-ui-core-D6clmJs8.js";import{$ as T,X as E,Y as D,ct as O,nt as k}from"./lit-runtime-DZL1fcCI.js";import{no as A,ro as j}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as M,R as N,V as P,z as F}from"./control-ui-boot-shared-D-LYw3KU.js";import{At as I,Et as L,Mt as R,Ot as z,To as B,_t as V,wo as H,xt as U,yt as W}from"./control-ui-boot-shared-DJ4XCcp6.js";import{z as G}from"./control-ui-boot-new-CaEHEcx2.js";import{n as K,t as q}from"./settings-workspace-DKW0BVnu.js";import{n as J,t as Y}from"./sessions-hub-header-SpHeIkgK.js";var X,Z;function Q(){return(Q=e((()=>{t(),M(),D(),k(),x(),w(),y(),H(),Y(),V(),q(),g(),m(),s(),f(),u(),j(),p(),X=`https://docs.openclaw.ai/concepts/managed-worktrees`,Z=class extends h{constructor(...e){super(...e),this.records=[],this.error=null,this.busyId=null,this.createOpen=!1,this.createRepoRoot=``,this.createName=``,this.createBaseRef=``,this.createBranches=[],this.creating=!1,this.gcLoading=!1,this.listClient=null,this.gateway=new A(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.records=[],this.error=null},invalidateRequests:e=>{(e.snapshot.phase!==`connected`||!e.snapshot.client)&&(this.listClient=null,this.listTask.run([null])),this.branchesTask.run([null,``]),this.invalidateOperations()},ensureInitialData:()=>void this.load(),onSnapshot:e=>{C(e.snapshot).canAdmin||(this.createOpen=!1)}}),this.listTask=new N(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null],task:([e],{signal:t})=>e?e.request(`worktrees.list`,{},{signal:t}):F,onComplete:e=>{this.records=e.worktrees.toSorted((e,t)=>t.lastActiveAt-e.lastActiveAt)},onError:e=>{this.error=a(e)}}),this.branchesTask=new N(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.createRepoRoot.trim()],task:([e,t],{signal:n})=>e&&t?e.request(`worktrees.branches`,{repoRoot:t},{signal:n}):F,onComplete:e=>{this.createBranches=e.branches.map(e=>e.name)},onError:()=>{this.createBranches=[]}})}disconnectedCallback(){this.listClient=null,this.listTask.run([null]),this.branchesTask.run([null,``]),super.disconnectedCallback()}invalidateOperations(){this.busyId=null,this.creating=!1,this.gcLoading=!1}get operationPending(){return this.loading||this.busyId!==null||this.creating}get loading(){return this.gcLoading||this.listTask.status===P.PENDING}get canAdmin(){return C(this.context.gateway.snapshot).canAdmin}get canWrite(){return C(this.context.gateway.snapshot).canWrite}async load(e={}){let t=this.gateway.client;!t||!this.gateway.connected||this.busyId!==null||this.creating||this.gcLoading||this.listTask.status===P.PENDING&&this.listClient===t||(this.listClient=t,e.preserveError||(this.error=null),await this.listTask.run([t]))}async runOperation(e,t){this.error=null;try{await t()}catch(t){this.gateway.isCurrent(e)&&(this.error=a(t))}finally{this.gateway.isCurrent(e)&&(this.invalidateOperations(),await this.load({preserveError:!0}))}}async removeWorktree(e){let t=this.gateway.capture();t&&this.canAdmin&&!this.operationPending&&await B({message:d(`worktrees.confirmDelete`,{name:e.name}),confirmLabel:d(`common.delete`),danger:!0})&&this.gateway.isCurrent(t)&&this.canAdmin&&!this.operationPending&&(this.busyId=e.id,await this.runOperation(t,async()=>{let n=await t.client.request(`worktrees.remove`,{id:e.id});if(!this.gateway.isCurrent(t)||n.removed)return;let r=n.snapshotError??``,i=await B({message:d(`worktrees.confirmForceDelete`,{error:r}),confirmLabel:d(`common.delete`),danger:!0});if(!this.gateway.isCurrent(t)||!this.canAdmin)return;if(!i){this.error=r||null;return}let a=await t.client.request(`worktrees.remove`,{id:e.id,force:!0});this.gateway.isCurrent(t)&&(this.error=a.snapshotError??null)}))}async restore(e){let t=this.gateway.capture();t&&this.canAdmin&&!this.operationPending&&(this.busyId=e.id,await this.runOperation(t,()=>t.client.request(`worktrees.restore`,{id:e.id})))}async gc(){let e=this.gateway.capture();e&&this.canAdmin&&!this.operationPending&&(this.gcLoading=!0,await this.runOperation(e,()=>e.client.request(`worktrees.gc`,{})))}toggleCreate(){if(this.canAdmin&&!this.creating&&(this.createOpen=!this.createOpen,this.createOpen&&!this.createRepoRoot)){let e=this.context.agents.state.agentsList,t=e?.agents.find(t=>t.id===e.defaultId);this.createRepoRoot=t?.workspace??``,this.loadCreateBranches()}}loadCreateBranches(){let e=this.gateway.connected?this.gateway.client:null,t=this.createRepoRoot.trim();if(!e||!t||!this.canWrite){this.createBranches=[],this.branchesTask.run([null,``]);return}this.branchesTask.run([e,t])}async createWorktree(){let e=this.gateway.capture(),t=this.createRepoRoot.trim();e&&this.canAdmin&&t&&!this.operationPending&&(this.creating=!0,await this.runOperation(e,async()=>{await G(e.client,{repoRoot:t,name:this.createName,baseRef:this.createBaseRef}),this.gateway.isCurrent(e)&&(this.createOpen=!1,this.createName=``)}))}renderOwner(e){if(e.ownerKind===`session`&&e.ownerId){let t=c(this.context,e.ownerId),n=_({context:this.context,face:t,sessionKey:e.ownerId,preferenceDerivedFace:!0});return T`<a
        href=${n.href}
        title=${e.ownerId}
        @click=${e=>{l(e)&&(e.preventDefault(),this.context.navigate(t,n.options))}}
        >${d(`worktrees.ownerSession`)}</a
      >`}return e.ownerKind===`workboard`?T`<span title=${e.ownerId??``}>${d(`worktrees.ownerWorkboard`)}</span>`:T`<span>${d(`worktrees.ownerManual`)}</span>`}renderCreateRows(){return this.createOpen?T`
      ${z({title:d(`worktrees.repo`),control:T`
          <input
            class="settings-input"
            type="text"
            aria-label=${d(`worktrees.repo`)}
            ?disabled=${this.creating}
            .value=${this.createRepoRoot}
            @change=${e=>{this.createRepoRoot=e.target.value,this.createBaseRef=``,this.loadCreateBranches()}}
          />
        `})}
      ${z({title:d(`worktrees.name`),control:T`
          <input
            class="settings-input"
            type="text"
            aria-label=${d(`worktrees.name`)}
            ?disabled=${this.creating}
            placeholder=${d(`worktrees.namePlaceholder`)}
            .value=${this.createName}
            @input=${e=>{this.createName=e.target.value}}
          />
        `})}
      ${z({title:d(`worktrees.baseBranch`),control:T`
          <input
            class="settings-input"
            type="text"
            aria-label=${d(`worktrees.baseBranch`)}
            ?disabled=${this.creating}
            placeholder=${d(`worktrees.baseBranchPlaceholder`)}
            list="worktrees-create-branches"
            .value=${this.createBaseRef}
            @input=${e=>{this.createBaseRef=e.target.value}}
          />
          <datalist id="worktrees-create-branches">
            ${this.createBranches.map(e=>T`<option value=${e}></option>`)}
          </datalist>
        `})}
      ${z({title:d(`worktrees.newWorktree`),control:T`
          <button
            class="btn btn--sm"
            ?disabled=${this.operationPending||!this.createRepoRoot.trim()}
            @click=${()=>void this.createWorktree()}
          >
            ${this.creating?d(`common.loading`):d(`common.create`)}
          </button>
        `})}
    `:E}renderRecordRow(e){return z({title:e.name,description:T`
        <span title=${e.repoRoot}>${i(e.repoRoot)}</span> · ${e.branch} ·
        ${this.renderOwner(e)} · ${o(e.lastActiveAt)}
      `,control:T`
        ${e.removedAt?R({kind:`muted`,label:d(`worktrees.restorable`)}):R({kind:`ok`,label:d(`common.active`)})}
        <button
          class=${e.removedAt?`btn btn--sm`:`btn btn--sm danger`}
          title=${this.canAdmin?``:d(`worktrees.adminRequired`)}
          ?disabled=${!this.canAdmin||this.operationPending}
          @click=${()=>void(e.removedAt?this.restore(e):this.removeWorktree(e))}
        >
          ${e.removedAt?d(`worktrees.restore`):d(`common.delete`)}
        </button>
      `})}render(){let e=T`
      <button
        class="btn"
        title=${this.canAdmin?``:d(`worktrees.adminRequired`)}
        aria-expanded=${String(this.createOpen)}
        ?disabled=${!this.canAdmin||this.creating}
        @click=${()=>this.toggleCreate()}
      >
        ${d(`worktrees.newWorktree`)}
      </button>
      <button
        class="btn"
        title=${this.canAdmin?``:d(`worktrees.adminRequired`)}
        ?disabled=${!this.canAdmin||this.operationPending}
        @click=${()=>void this.gc()}
      >
        ${this.loading?d(`common.loading`):d(`worktrees.cleanNow`)}
      </button>
    `,t=T`
      ${this.renderCreateRows()}
      ${this.records.length===0?U(d(`worktrees.empty`)):this.records.map(e=>this.renderRecordRow(e))}
    `,n=L(T`
        ${this.canAdmin?E:T`<div class="callout info" role="note">${d(`worktrees.adminRequired`)}</div>`}
        ${this.error?T`<div class="callout danger" role="alert">${this.error}</div>`:E}
        ${I({title:d(`worktrees.title`),description:d(`worktrees.subtitle`),actions:e},t)}
      `,{wide:!0});return T`
      ${J({active:`worktrees`,title:v(`sessions`),subtitle:T`${b(`worktrees`)} ${W(X)}`,onSelect:e=>{e!==`worktrees`&&this.context?.navigate(e)}})}
      ${K(n,{id:`sessions-hub-panel`})}
    `}},n([r({context:S,subscribe:!0})],Z.prototype,`context`,void 0),n([O()],Z.prototype,`records`,void 0),n([O()],Z.prototype,`error`,void 0),n([O()],Z.prototype,`busyId`,void 0),n([O()],Z.prototype,`createOpen`,void 0),n([O()],Z.prototype,`createRepoRoot`,void 0),n([O()],Z.prototype,`createName`,void 0),n([O()],Z.prototype,`createBaseRef`,void 0),n([O()],Z.prototype,`createBranches`,void 0),n([O()],Z.prototype,`creating`,void 0),n([O()],Z.prototype,`gcLoading`,void 0),customElements.get(`openclaw-worktrees-page`)||customElements.define(`openclaw-worktrees-page`,Z)})))()}Q();