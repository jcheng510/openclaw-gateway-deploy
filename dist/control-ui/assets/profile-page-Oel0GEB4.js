const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./user-prefs-request-CEn5UIdZ.js","./user-prefs-request-DAKs9Z7i.js","./gateway-runtime-iOL78mIi.js","./control-ui-core-D-VUH4Gq.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Br as n,Gi as r,qr as i,zi as a,zr as o}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as s,Il as c,Jc as l,Pc as u,Rl as ee,Vc as te,at as ne,bu as d,c as f,cc as re,et as ie,hu as p,la as ae,lu as m,ou as oe,qc as se,ql as h,rt as ce,s as le,sc as ue,su as g,tt as de,u as _,uu as v,xu as fe}from"./control-ui-core-pYNj5S1a.js";import{Ft as pe,Ma as me,Nt as he,Pt as ge,_r as y,co as _e,fo as ve,fr as ye,gr as b,hr as be,ja as xe,kt as Se,or as Ce,sr as we,va as Te,vi as x,yi as S}from"./control-ui-core-D6clmJs8.js";import{$ as C,X as w,Y as T,ct as E,nt as D,ut as O}from"./lit-runtime-DZL1fcCI.js";import{Ct as Ee,St as De,bt as Oe,xt as ke}from"./control-ui-boot-shared-CES8Ypkl.js";import{Jo as Ae,Yo as je,bi as Me,g as k,h as A,xi as Ne,yi as Pe}from"./control-ui-boot-shared-3Hl8ksFq.js";import{At as j,Ba as Fe,Et as Ie,Ft as Le,It as M,Kr as Re,Mt as N,Ot as P,Qa as ze,St as F,Tt as Be,Ua as Ve,Va as I,_t as L,eo as He,ia as Ue,jt as We,qr as Ge,wt as Ke,xt as R,yt as z}from"./control-ui-boot-shared-DJ4XCcp6.js";import{r as qe,t as Je}from"./wizard-step-controls-DGymql-W.js";import{o as B,r as V}from"./settings-targets-B7PGvUUs.js";import{n as Ye,t as Xe}from"./settings-workspace-DKW0BVnu.js";import{a as Ze,c as Qe,d as $e,i as et,l as tt,n as nt,r as rt,s as it,t as at,u as ot}from"./github-identity-view-CdBbHmfG.js";var H,U,W;function G(){return(G=e((()=>{fe(),H=d.profilePage.identity,U={profilePage:{access:{title:`Your access`,admin:`You have permission to manage this server.`,write:`You have permission to send messages and make changes.`,read:`You have permission to view server information.`,sessionWrite:`You have permission to work in your own sessions.`,sessionRead:`You have permission to view your own sessions.`,limited:`This connection has a limited set of permissions.`,limits:`Sessions, browsers, and tools may have additional restrictions.`,help:`Missing something you need?`,nextStep:`Ask your server administrator to review your access. Reconnect after they make changes.`,reconnect:`Reconnect`,connecting:`Connecting… Your access will appear when the connection is ready.`,details:`Technical details`,description:`These permissions were granted when you connected. A role can limit them, but does not grant extra permissions.`,scopes:`Granted scopes`,unknown:`Your permissions could not be confirmed.`,none:`This connection has no permissions.`},identity:{title:H.title,menuLabel:H.menuLabel,menuButtonLabel:H.menuButtonLabel,description:H.description,loading:`Loading your identity…`,profileUnavailable:`Your identity profile could not be loaded.`,unidentified:`This connection has no personal profile; sign in through Cloudflare Access, Tailscale Serve, or a trusted proxy to set a name and avatar.`,writeRequired:`Your current access does not allow profile editing.`,avatar:H.avatar,avatarDescription:`PNG, JPEG, or WebP. Images are resized to 256 × 256 or smaller.`,chooseAvatar:H.chooseAvatar,processingAvatar:`Processing…`,displayName:H.displayName,displayNameDescription:`Shown to other people using this gateway.`,linkedEmails:H.linkedEmails,linkedEmailsDescription:`Email addresses connected to this profile.`,githubAccount:`GitHub account`,githubAccountDescription:`Verified sign-in identity, not permission to publish. Manage publishing access under GitHub connections below.`,githubVerified:`Verified from your GitHub-backed sign-in`,githubUnavailable:`Unavailable`,githubUnavailableDescription:`GitHub-backed sign-in is unavailable. Refresh to retry.`,ownerGithubDescription:`GitHub-backed sign-in through Cloudflare Access or Tailscale Serve provides this identity.`,gitCoauthor:`Git co-author credit`,gitCoauthorDescription:`Adds this account's public GitHub noreply address to commits created from shared sessions. Turning it off affects future commits only.`,gitCoauthorUnavailable:`Available after your GitHub-backed sign-in is verified. Refresh to retry.`,ownerGitCoauthorDescription:`Requires GitHub-backed sign-in through Cloudflare Access or Tailscale Serve.`,avatarErrors:{invalid:`That image could not be processed.`,sourceTooLarge:`Choose an image that is 10 MB or smaller.`,tooLarge:`The processed avatar is larger than 512 KB.`}}}},W=Object.assign(()=>{d.profilePage.access=U.profilePage.access,Object.assign(d.profilePage.identity,U.profilePage.identity)},{catalog:U})})))()}var K;function st(){return(st=e((()=>{n(),T(),D(),_e(),S(),y(),L(),v(),ot(),l(),m(),B(),tt(),at(),K=class extends g{constructor(...e){super(...e),this.purpose=`personal`,this.setupOpen=!1,this.snapshot=null,this.revision=0,this.canRead=!1,this.canAdmin=!1,this.profileId=null,this.subscriptions=[],this.personal=new Qe({requestUpdate:()=>this.requestUpdate(),authorizationSucceeded:()=>{this.setupOpen=!1}}),this.system=new Qe({requestUpdate:()=>this.requestUpdate(),authorizationSucceeded:()=>{this.setupOpen=!1},runExternalMutation:(e,t)=>this.context.runtimeConfig.runExternalMutation(e,t)})}connectedCallback(){super.connectedCallback(),this.subscriptions=[this.context.gateway.subscribe(e=>this.applySnapshot(e)),this.context.agents.subscribe(()=>this.syncControllers()),this.context.settingsAgentSelection.subscribe(()=>this.syncControllers()),this.context.runtimeConfig.subscribe(()=>this.syncControllers())],this.applySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){for(let e of this.subscriptions)e();this.subscriptions=[],this.personal.dispose(),this.system.dispose(),this.snapshot=null,this.revision+=1,super.disconnectedCallback()}applySnapshot(e){let t=this.snapshot,n=!t||t.client!==e.client||t.phase!==e.phase||t.hello!==e.hello||this.profileId!==(e.selfUser?.id??null);this.snapshot=e,this.profileId=e.phase===`connected`?e.selfUser?.id??null:null,this.canRead=e.phase===`connected`&&!!e.hello?.auth&&be(e.hello?.auth??null),this.canAdmin=this.canRead&&ye(e.hello?.auth??null),n&&(this.revision+=1,this.setupOpen=!1,this.purpose=this.profileId?`personal`:`system`),this.syncControllers(),this.canAdmin&&this.context.runtimeConfig.ensureLoaded()}syncControllers(){let e=this.snapshot;if(!e)return;let t={client:e.client,connected:e.phase===`connected`,clientRevision:this.revision};this.personal.sync({...t,target:this.profileId?{kind:`personal`,profileId:this.profileId}:null,statusReadable:this.canRead&&this.profileId!==null,authorizable:this.canRead&&this.profileId!==null,configurable:!1});let n=this.context.settingsAgentSelection.state.selectedId;this.system.sync({...t,target:n?{kind:`shared`,scope:`system`,agentId:n,config:se(this.context.runtimeConfig.state)}:null,statusReadable:this.canAdmin,authorizable:this.canAdmin,configurable:this.canAdmin}),this.personal.statusReadable&&!this.personal.personal&&!this.personal.loading&&!this.personal.error&&this.personal.verify(),n&&this.canAdmin&&!this.system.status&&!this.system.loading&&!this.system.error&&this.system.verify(),this.requestUpdate()}get locked(){return this.personal.loading||this.system.loading||this.personal.authorizationActive||this.system.authorizationActive||this.personal.busy||this.system.busy}openSetup(e){this.locked||(e===`personal`?!this.profileId||!this.canRead:!this.canAdmin)||(this.purpose=e,this.setupOpen=!0)}render(){let e=this.personal.personal,t=this.system.status?.selected.identity??this.personal.system,n=this.context.settingsAgentSelection.state.selectedId,r=this.context.agents.state.agentsList?.agents?.find(e=>e.id===n),i=this.system.status?.effective??null,a=this.purpose===`personal`?this.personal:this.system,o=this.setupOpen||this.personal.authorizationActive||this.system.authorizationActive,s=e?.state===`connected`,c=e?.state===`unavailable`||e?.refreshState===`expired`||e?.refreshState===`failed`,l=this.profileId?p(c?`githubConnections.reconnectRequired`:s?`githubConnections.connected`:`githubConnections.disconnected`):p(`githubConnections.signInRequired`);return C`<div id=${V.githubConnections}>
      ${j({title:p(`githubConnections.title`),description:p(`githubConnections.description`),actions:this.canRead&&(this.profileId||this.canAdmin)?C`<button
                    class="btn btn--sm"
                    ?disabled=${this.locked||!this.profileId&&!this.system.status}
                    @click=${()=>this.openSetup(this.profileId?`personal`:`system`)}
                  >
                    ${p(`githubConnections.manage`)}
                  </button>
                  <button
                    class="btn btn--sm"
                    ?disabled=${this.locked}
                    @click=${()=>{this.personal.verify(),this.system.verify()}}
                  >
                    ${p(`agentTools.githubVerify`)}
                  </button>`:void 0},C`
          <div data-github-connection="personal">
            ${P({title:p(`githubConnections.mine`),description:this.profileId?C`${e?.account?`@${e.account.login} · `:``}${p(`githubConnections.personalDescription`)}`:p(`githubConnections.unboundDescription`),control:C`${this.profileId&&!e?it(this.personal):N({kind:c?`warn`:s?`ok`:`muted`,label:l})}
              ${this.profileId&&this.canRead&&e?C`<button
                      class="btn btn--sm"
                      ?disabled=${this.locked}
                      @click=${()=>this.openSetup(`personal`)}
                    >
                      ${p(s?`githubConnections.changeMine`:`githubConnections.connectMine`)}
                    </button>`:w}`})}
          </div>
          <div data-github-connection="system">
            ${P({title:p(`githubConnections.system`),description:C`${t?.account?`@${t.account.login} · `:``}${p(`githubConnections.systemDescription`)}`,control:C`${Ze(t,{loading:this.system.loading||this.personal.loading,error:this.system.error??this.personal.error})}${this.canAdmin?C`<button
                      class="btn btn--sm"
                      ?disabled=${this.locked||!this.system.status}
                      @click=${()=>this.openSetup(`system`)}
                    >
                      ${p(`githubConnections.changeSystem`)}
                    </button>`:M(p(`githubConnections.adminManaged`))}`})}
          </div>
          ${this.canAdmin&&n?C`<div data-github-connection="agent">
                  ${P({title:p(`githubConnections.agentFor`,{agent:r?.identity?.name??r?.name??n}),description:C`${i?.account?`@${i.account.login} · `:``}${i?p(i.source===`agent-override`?`githubConnections.agentOverride`:`githubConnections.system`):``}<br />${p(`githubConnections.agentDescription`)}`,control:C`${Ze(i,this.system)}<button
                        class="btn btn--sm"
                        @click=${()=>this.context.navigate(`agents`,{pathname:ve(n,`tools`,this.context.basePath)})}
                      >
                        ${p(`githubConnections.viewAgent`)}
                      </button>`})}
                </div>`:w}
          ${nt(this.personal.error??this.system.error,C`<button
              class="btn btn--sm"
              ?disabled=${this.locked}
              @click=${()=>{this.personal.verify(),this.system.verify()}}
            >
              ${p(`common.retry`)}
            </button>`)}
          ${o?C`<div class="settings-subrows" data-github-setup>
                  ${P({title:p(`githubConnections.purpose`),control:this.profileId&&this.canAdmin&&this.system.status?We({value:this.purpose,options:[{value:`personal`,label:p(`githubConnections.forMe`)},{value:`system`,label:p(`githubConnections.forSystem`)}],disabled:this.locked,ariaLabel:p(`githubConnections.purpose`),onChange:e=>this.openSetup(e)}):M(this.purpose===`personal`?p(`githubConnections.forMe`):p(`githubConnections.forSystem`))})}
                  ${rt(a)}
                  ${this.locked?w:P({title:p(`githubConnections.purposeHint`),control:C`<button
                            class="btn btn--sm"
                            @click=${()=>{this.setupOpen=!1,a.hidePatFallback()}}
                          >
                            ${p(`common.close`)}
                          </button>`})}
                </div>`:w}
          <details class="settings-row settings-row--stacked">
            <summary class="settings-row__title">${p(`githubConnections.usage`)}</summary>
            <div class="settings-row__desc">${p(`githubConnections.usageDescription`)}</div>
            ${et(t)}
          </details>
          ${this.canAdmin&&this.system.status?.selected.configured?P({title:p(`agentTools.githubUseNativeNewRuns`),description:p(`agentTools.githubSystemMutationHint`),control:C`<button
                    class="btn btn--sm"
                    ?disabled=${this.locked}
                    @click=${()=>void this.system.inherit()}
                  >
                    ${p(`agentTools.githubUseNativeNewRuns`)}
                  </button>`}):w}
        `)}
      ${this.profileId&&this.canRead&&e&&e.state!==`disconnected`?j({danger:!0},P({title:p(`githubConnections.disconnectMine`),description:p(`githubConnections.disconnectDescription`),control:C`<button
                  class="btn btn--sm"
                  ?disabled=${this.locked}
                  @click=${()=>void this.personal.disconnect()}
                >
                  ${p(`githubConnections.disconnectMine`)}
                </button>`})):w}
    </div>`}},i([o({context:x,subscribe:!1})],K.prototype,`context`,void 0),i([E()],K.prototype,`purpose`,void 0),i([E()],K.prototype,`setupOpen`,void 0),customElements.get(`openclaw-github-connections`)||customElements.define(`openclaw-github-connections`,K),$e()})))()}function ct(e,t){if(!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0)throw new J(`invalid-image`);let n=Math.min(e,t),r=Math.min(1,pt/n);return{sourceEdge:n,sourceX:Math.max(0,Math.round((e-n)/2)),sourceY:Math.max(0,Math.round((t-n)/2)),edge:Math.max(1,Math.round(n*r))}}async function lt(e){let t=URL.createObjectURL(e);try{let e=new Image;return e.decoding=`async`,e.src=t,await e.decode(),e}catch{throw new J(`invalid-image`)}finally{URL.revokeObjectURL(t)}}function ut(e,t,n){return new Promise(r=>{e.toBlob(r,t,n)})}async function dt(e,t){if(e.size>q)throw new J(`too-large`);let n=new Uint8Array(await e.arrayBuffer()),r=ae(n);if(r.length>mt)throw new J(`too-large`);return{mime:t,avatarBase64:r,byteLength:n.byteLength}}async function ft(e){if(![`image/png`,`image/jpeg`,`image/webp`].includes(e.type))throw new J(`invalid-image`);if(e.size>ht)throw new J(`source-too-large`);let t=await lt(e),n=ct(t.naturalWidth,t.naturalHeight),r=document.createElement(`canvas`);r.width=n.edge,r.height=n.edge;let i=r.getContext(`2d`);if(!i)throw new J(`invalid-image`);i.drawImage(t,n.sourceX,n.sourceY,n.sourceEdge,n.sourceEdge,0,0,n.edge,n.edge);let a=e.type===`image/webp`?`image/webp`:`image/png`,o=await ut(r,a,a===`image/webp`?.9:void 0);if((!o||o.type!==a||o.size>q)&&(a=`image/webp`,o=await ut(r,a,.82)),!o||o.type!==a)throw new J(`invalid-image`);return dt(o,a)}var pt,q,mt,ht,J;function gt(){return(gt=e((()=>{pt=512,q=524288,mt=7e5,ht=10485760,J=class extends Error{constructor(e){super(e),this.code=e,this.name=`ProfileAvatarError`}}})))()}function _t(e){return e.target.value}function vt(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch{return p(`profilePage.modelAccounts.gatewayUnavailable`)}}function yt(e,t){return e.some(e=>e.authProfileId!==t.authProfileId&&e.provider===t.provider&&e.label===t.label)?C` <code>${t.authProfileId}</code>`:``}function bt(e,t){let n=e.accounts.find(e=>e.authProfileId===t.authProfileId);return P({title:C`
      <span class="model-accounts__id"
        >${n?.label??p(`profilePage.modelAccounts.gatewayAccount`)}</span
      >
      <span class="model-accounts__provider">${I(t.provider)}</span>
    `,description:C`${p(`profilePage.modelAccounts.linkedDescription`)}${n?yt(e.accounts,n):``}`,control:C`
      ${N({kind:`ok`,label:p(`profilePage.modelAccounts.linkedStatus`)})}
      <button
        type="button"
        class="btn btn--sm profile-auth-link-unlink"
        aria-label=${`${p(`profilePage.modelAccounts.unlinkAction`)}: ${I(t.provider)} · ${n?.label??t.authProfileId}`}
        ?disabled=${e.busy}
        @click=${()=>e.onUnlink(t.provider)}
      >
        ${p(`profilePage.modelAccounts.unlinkAction`)}
      </button>
    `})}function xt(e,t){return P({title:C`
      <span class="model-accounts__id">${t.label}</span>
      <span class="model-accounts__provider">${I(t.provider)}</span>
    `,description:C`${p(`profilePage.modelAccounts.authTypes.${t.authType}`)}${yt(e.accounts,t)}`,control:C`
      <button
        type="button"
        class="btn btn--sm profile-auth-account-select"
        data-auth-profile-id=${t.authProfileId}
        aria-label=${`${p(`profilePage.modelAccounts.selectAction`)}: ${I(t.provider)} · ${t.label} (${t.authProfileId})`}
        ?disabled=${e.busy}
        @click=${()=>e.onSelectAccount(t.authProfileId)}
      >
        ${p(`profilePage.modelAccounts.selectAction`)}
      </button>
    `})}function St(e){let t=e.signIn;if(!t)return``;let n=t.providers.find(e=>e.id===t.provider),r=e.connectFlow,i=r?.step,a=C`<button
    type="button"
    class="btn btn--sm profile-auth-connect-cancel"
    ?disabled=${e.cancelBusy}
    @click=${r?e.onConnectCancel:e.onCloseSignIn}
  >
    ${p(`profilePage.modelAccounts.cancelAction`)}
  </button>`;return P({title:r?r.step?.title??n?.label??p(`profilePage.modelAccounts.connectAction`):p(`profilePage.modelAccounts.addAccount`),stacked:!0,control:r?C`<div class="model-accounts-flow">
          ${i?qe({step:i,value:e.stepValue,busy:e.busy,inputId:`profile-account-auth-answer`,leadingAction:a,onValueChange:t=>e.onStepValueChange(i.id,t),onAnswer:t=>e.onStepAnswer(i.id,t)}):C`<span role="status">${p(`common.loading`)}</span>${a}`}
          ${e.statusUnavailable?C`<button
                  type="button"
                  class="btn btn--sm profile-auth-connect-check"
                  ?disabled=${e.cancelBusy}
                  @click=${e.onConnectCheck}
                >
                  ${p(`profilePage.modelAccounts.checkStatusAction`)}
                </button>`:``}
        </div>`:C`<div class="model-accounts-choice">
          ${Ge({label:p(`profilePage.modelAccounts.provider`),className:`profile-auth-provider`,value:t.provider||null,options:t.providers.map(e=>({value:e.id,label:e.label})),disabled:e.busy,renderLeading:e=>Ve(e.value),onChange:e.onProviderChange})}
          ${n?Ge({label:p(`profilePage.modelAccounts.method`),className:`profile-auth-method`,value:t.method||null,options:n.methods.map(e=>({value:e.id,label:e.label,description:e.hint})),disabled:e.busy,onChange:e.onMethodChange}):``}
          ${!e.busy&&!e.error&&t.providers.length===0?C`<span>${p(`profilePage.modelAccounts.noMethods`)}</span>`:``}
          <div class="wizard-step__actions">
            ${a}
            <button
              type="button"
              class="btn btn--sm primary profile-auth-connect-start"
              ?disabled=${e.busy||!t.method}
              @click=${e.onConnectStart}
            >
              ${p(`profilePage.modelAccounts.connectAction`)}
            </button>
          </div>
        </div>`})}function Ct(e){return P({title:p(`profilePage.modelAccounts.inputLabel`),description:p(`profilePage.modelAccounts.inputDescription`),stackedOnNarrow:!0,control:C`
      <form
        class="model-accounts-form"
        @submit=${t=>{t.preventDefault(),e.onLink()}}
      >
        <input
          class="settings-input profile-auth-link-input"
          type="text"
          aria-label=${p(`profilePage.modelAccounts.inputLabel`)}
          .value=${e.linkDraft}
          placeholder=${p(`profilePage.modelAccounts.inputPlaceholder`)}
          ?disabled=${e.busy}
          @input=${t=>e.onLinkDraftInput(_t(t))}
        />
        <button
          type="submit"
          class="btn btn--sm profile-auth-link-submit"
          ?disabled=${e.busy||!e.linkDraft.trim()}
        >
          ${p(`profilePage.modelAccounts.linkAction`)}
        </button>
      </form>
    `})}function wt(e){return C`
    ${e.links.length===0?R(p(`profilePage.modelAccounts.empty`)):e.links.map(t=>bt(e,t))}
    ${e.accounts.filter(e=>!e.selected).map(t=>xt(e,t))}
    ${e.hasMore?P({title:p(`profilePage.modelAccounts.savedAccounts`),control:C`<button
              type="button"
              class="btn btn--sm profile-auth-accounts-more"
              ?disabled=${e.busy}
              @click=${e.onLoadMore}
            >
              ${p(`profilePage.modelAccounts.loadMore`)}
            </button>`}):``}
    ${St(e)} ${e.showManualLink?Ct(e):``}
    ${e.notice?C`<div class="settings-row model-accounts-notice" role="status">
            <span class="settings-row__desc">${e.notice}</span>
          </div>`:``}
    ${e.error?C`<div class="settings-row model-accounts-error" role="alert">
            <span class="settings-row__desc">${e.error}</span>
          </div>`:``}
    ${e.inventoryError?C`<div class="settings-row model-accounts-error" role="alert">
            ${p(`profilePage.modelAccounts.inventoryFailed`)} ${e.inventoryError}
          </div>`:``}
  `}function Tt(e,t){let n=C`
    ${P({title:p(`profilePage.modelAccounts.gateway`),stackedOnNarrow:!0,control:M(vt(e.gatewayUrl),{mono:!0})})}
    ${P({title:p(`profilePage.modelAccounts.person`),stackedOnNarrow:!0,control:M(e.personLabel??p(`profilePage.modelAccounts.noPerson`))})}
    ${P({title:p(`profilePage.modelAccounts.scope`),description:p(`profilePage.modelAccounts.personalDescription`),control:M(p(`profilePage.modelAccounts.personal`))})}
    ${t?wt(t):P({title:p(`profilePage.modelAccounts.signInUnavailable`),description:p(`profilePage.modelAccounts.unavailable.${e.unavailableReason}`),stacked:!0,control:C`
              <button type="button" class="btn btn--sm" @click=${e.onConnectionSettings}>
                ${p(`profilePage.modelAccounts.connectionSettings`)}
              </button>
              ${z(`https://docs.openclaw.ai/concepts/multi-user#per-person-model-accounts`)}
            `})}
  `;return j({title:p(`profilePage.modelAccounts.title`),description:p(`profilePage.modelAccounts.description`),actions:t?C`${t.signIn?``:C`<button
                    type="button"
                    class="btn btn--sm primary profile-auth-add-account"
                    ?disabled=${t.busy}
                    @click=${t.onAddAccount}
                  >
                    ${p(`profilePage.modelAccounts.addAccount`)}
                  </button>`}<button
              type="button"
              class="btn btn--sm profile-auth-accounts-refresh"
              ?disabled=${t.inventoryLoading}
              @click=${t.onRefresh}
            >
              ${p(`common.refresh`)}
            </button>`:void 0},n)}function Et(){return(Et=e((()=>{T(),Fe(),Re(),L(),Je(),v(),A(),k()})))()}var Y;function Dt(){return(Dt=e((()=>{n(),T(),D(),S(),y(),v(),A(),h(),ce(),m(),Et(),k(),Y=class extends oe{constructor(...e){super(...e),this.identityId=null,this.profileId=null,this.personLabel=null,this.links=[],this.accounts=[],this.inventoryLoading=!1,this.inventoryError=null,this.action=null,this.error=null,this.notice=null,this.linkDraft=``,this.signIn=null,this.connectFlow=null,this.statusUnavailable=!1,this.target=null,this.generation=0,this.inventoryRequest=0,this.unsubscribe=null,this.unsubscribeEvents=null,this.pollTimer=null}connectedCallback(){super.connectedCallback(),this.unsubscribe=this.context.gateway.subscribe(e=>{this.applySnapshot(e),this.requestUpdate()}),this.unsubscribeEvents=this.context.gateway.subscribeEvents(e=>{ne(e)&&this.loadAccounts()}),this.applySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){this.unsubscribe?.(),this.unsubscribe=null,this.unsubscribeEvents?.(),this.unsubscribeEvents=null,this.generation+=1,this.target=null,this.stopPoll(),super.disconnectedCallback()}willUpdate(e){(e.has(`profileId`)||e.has(`identityId`))&&this.isConnected&&this.applySnapshot(this.context.gateway.snapshot)}applySnapshot(e){let t=e.phase===`connected`&&b(e.hello?.auth??null),n=t?e.client:null,r=e.selfUser?.id??null,i=n&&r===this.identityId?this.profileId:null,a=t&&ye(e.hello?.auth??null);(this.target?.client!==n||this.target?.identityId!==r||this.target?.profileId!==i||this.target?.canAdmin!==a)&&(this.generation+=1,this.stopPoll(),this.target=n&&r&&i?{client:n,identityId:r,profileId:i,canAdmin:a}:null,this.links=[],this.accounts=[],this.nextCursor=void 0,this.inventoryRequest+=1,this.inventoryLoading=!1,this.inventoryError=null,this.action=null,this.error=null,this.notice=null,this.linkDraft=``,this.signIn=null,this.connectFlow=null,this.stepValue=void 0,this.statusUnavailable=!1,this.target&&this.loadAccounts())}applyLinks(e){this.links=e,this.accounts=this.accounts.map(t=>({...t,selected:e.some(e=>e.authProfileId===t.authProfileId)}))}async loadAccounts(e){let t=this.target;if(!t)return;let n=++this.inventoryRequest,r=()=>this.isConnected&&this.target===t&&n===this.inventoryRequest;this.inventoryLoading=!0,this.inventoryError=null;try{let n=await t.client.request(`users.listModelAccounts`,{profileId:t.profileId,...e?{cursor:e}:{}});r()&&(this.accounts=e?[...this.accounts,...n.accounts]:n.accounts,this.nextCursor=n.nextCursor,this.applyLinks(n.links))}catch(e){r()&&(this.inventoryError=s(e))}finally{r()&&(this.inventoryLoading=!1)}}isCurrent(e,t){return this.isConnected&&this.target===e&&this.generation===t}async runAction(e,t,n){let r=this.target;if(!r||this.action&&(e!==`cancel`||this.action!==`answer`))return;let i=++this.generation;this.stopPoll(),this.action=e,this.error=null,this.notice=null,this.statusUnavailable=!1;try{let e=await t(r);this.isCurrent(r,i)&&n(e)}catch(e){this.isCurrent(r,i)&&(this.error=s(e,p(`profilePage.modelAccounts.actionFailed`)))}finally{this.isCurrent(r,i)&&(this.action=null,this.schedulePoll(this.connectFlow?.step?2e3:0))}}updateLink(e){let t=`authProfileId`in e;(!t||e.authProfileId&&this.target?.canAdmin)&&this.runAction(`request`,n=>n.client.request(t?`users.linkAuthProfile`:`users.unlinkAuthProfile`,{profileId:n.profileId,...e}),e=>{this.applyLinks(e.links),this.linkDraft=``,this.notice=t?`selected`:`cleared`,this.loadAccounts()})}selectAccount(e){this.runAction(`request`,t=>t.client.request(`users.selectModelAccount`,{profileId:t.profileId,authProfileId:e}),e=>{this.applyLinks(e.links),this.notice=`selected`,this.loadAccounts()})}openSignIn(){this.signIn={providers:[],provider:``,method:``},this.runAction(`request`,e=>e.client.request(`users.authConnect.catalog`,{profileId:e.profileId}),e=>{this.signIn={providers:e.providers,provider:``,method:``}})}selectProvider(e){let t=this.signIn,n=t?.providers.find(t=>t.id===e);t&&n&&!this.action&&!this.connectFlow&&(this.signIn={...t,provider:e,method:n.methods.length===1?n.methods[0]?.id??``:``})}startConnect(){let e=this.signIn;e?.providers.some(t=>t.id===e.provider&&t.methods.some(t=>t.id===e.method))&&this.runAction(`request`,t=>t.client.request(`users.authConnect.start`,{profileId:t.profileId,provider:e.provider,method:e.method}),e=>{this.connectFlow=e,this.stepValue=void 0})}applyConnectStatus(e){if(e.status===`pending`){e.error&&(this.error=s(e.error)),this.connectFlow&&=(this.connectFlow.step?.id!==e.step?.id&&(this.stepValue=e.step?.sensitive?void 0:e.step?.initialValue),{...this.connectFlow,step:e.step});return}if(this.error=null,this.statusUnavailable=!1,this.stopPoll(),this.signIn=null,this.connectFlow=null,this.stepValue=void 0,e.status===`failed`){this.error=p(`profilePage.modelAccounts.connectErrors.${e.reason}`);return}e.status===`connected`&&(this.applyLinks(e.links),this.loadAccounts()),this.notice=e.status}connectStatus(e){let t=this.connectFlow;t&&this.runAction(e===`status`?`request`:e,n=>n.client.request(`users.authConnect.${e}`,{profileId:n.profileId,connectId:t.connectId}),e=>this.applyConnectStatus(e))}answerStep(e,t){let n=this.connectFlow,r=n?.step;n&&r&&r.id===e&&r.type!==`progress`&&(r.sensitive&&(this.stepValue=void 0),this.runAction(`answer`,e=>e.client.request(`users.authConnect.answer`,{profileId:e.profileId,connectId:n.connectId,stepId:r.id,...t===void 0?{}:{value:t}}),e=>this.applyConnectStatus(e)))}stopPoll(){this.pollTimer!==null&&(clearTimeout(this.pollTimer),this.pollTimer=null)}schedulePoll(e=2e3){this.stopPoll();let t=this.connectFlow;if(!t||!this.target||this.action)return;let n=Math.max(0,Math.min(e,t.expiresAtMs-Date.now()));this.pollTimer=setTimeout(()=>{this.pollTimer=null,this.pollStatus()},n)}async pollStatus(){let e=this.target,t=this.connectFlow,n=this.generation;if(e&&t&&!this.action)try{let r=await e.client.request(`users.authConnect.status`,{profileId:e.profileId,connectId:t.connectId});if(!this.isCurrent(e,n)||this.connectFlow?.connectId!==t.connectId)return;this.applyConnectStatus(r),this.connectFlow&&(Date.now()>=t.expiresAtMs?(this.statusUnavailable=!0,this.error=p(`profilePage.modelAccounts.statusTimedOut`)):this.schedulePoll())}catch(t){this.isCurrent(e,n)&&(this.statusUnavailable=!0,this.error=s(t,p(`profilePage.modelAccounts.statusFailed`)))}}render(){let e=this.context.gateway.snapshot;if(e.phase!==`connected`||!e.client)return w;let t=e.selfUser?.id===this.identityId?e.selfUser:null;return Tt({gatewayUrl:(this.target?.client??e.client).gatewayUrl,personLabel:t?this.personLabel||t.name||t.email||p(`profilePage.modelAccounts.currentPerson`):null,unavailableReason:t?b(e.hello?.auth??null)?`profile`:`write`:`identity`,onConnectionSettings:()=>this.context.navigate(`connection`)},this.target?{links:this.links,accounts:this.accounts,hasMore:!!this.nextCursor,inventoryLoading:this.inventoryLoading,inventoryError:this.inventoryError,showManualLink:this.target.canAdmin,busy:this.inventoryLoading||this.action!==null,cancelBusy:this.action!==null&&this.action!==`answer`,error:this.error,notice:this.notice?p(`profilePage.modelAccounts.notices.${this.notice}`):null,statusUnavailable:this.statusUnavailable,linkDraft:this.linkDraft,signIn:this.signIn,connectFlow:this.connectFlow,stepValue:this.stepValue,onLinkDraftInput:e=>{this.linkDraft=e},onLink:()=>this.updateLink({authProfileId:this.linkDraft.trim()}),onUnlink:e=>this.updateLink({provider:e}),onSelectAccount:e=>this.selectAccount(e),onLoadMore:()=>void this.loadAccounts(this.nextCursor),onRefresh:()=>void this.loadAccounts(),onAddAccount:()=>this.openSignIn(),onProviderChange:e=>this.selectProvider(e),onMethodChange:e=>{this.signIn&&!this.action&&!this.connectFlow&&(this.signIn={...this.signIn,method:e})},onCloseSignIn:()=>{!this.action&&!this.connectFlow&&(this.signIn=null,this.error=null)},onConnectStart:()=>this.startConnect(),onStepValueChange:(e,t)=>{this.connectFlow?.step?.id===e&&(this.stepValue=t)},onStepAnswer:(e,t)=>this.answerStep(e,t),onConnectCancel:()=>this.connectStatus(`cancel`),onConnectCheck:()=>this.connectStatus(`status`)}:null)}},i([o({context:x,subscribe:!1})],Y.prototype,`context`,void 0),i([O({attribute:!1})],Y.prototype,`identityId`,void 0),i([O({attribute:!1})],Y.prototype,`profileId`,void 0),i([O({attribute:!1})],Y.prototype,`personLabel`,void 0),i([E()],Y.prototype,`links`,void 0),i([E()],Y.prototype,`accounts`,void 0),i([E()],Y.prototype,`nextCursor`,void 0),i([E()],Y.prototype,`inventoryLoading`,void 0),i([E()],Y.prototype,`inventoryError`,void 0),i([E()],Y.prototype,`action`,void 0),i([E()],Y.prototype,`error`,void 0),i([E()],Y.prototype,`notice`,void 0),i([E()],Y.prototype,`linkDraft`,void 0),i([E()],Y.prototype,`signIn`,void 0),i([E()],Y.prototype,`connectFlow`,void 0),i([E()],Y.prototype,`stepValue`,void 0),i([E()],Y.prototype,`statusUnavailable`,void 0),customElements.get(`openclaw-model-accounts`)||customElements.define(`openclaw-model-accounts`,Y)})))()}var X,Ot;function kt(){return(kt=e((()=>{fe(),X={profilePage:{personalInstructions:{signIn:`Sign in with your personal profile to edit your instructions. This requires operator.read access.`,noAgents:`No agents are available on this connection.`,guidance:`{count} / 4,000 characters. Keep it brief: preferences, context, and working style.`,missing:`Your personal file will be created when you save.`,tooLong:`Shorten your instructions to 4,000 characters before saving.`,reload:`Reload`,dirty:`Unsaved changes`,saved:`Saved`,discard:`Discard your unsaved instructions and load the saved file?`,failureHint:`Your draft is unchanged. If the file changed elsewhere, copy your draft, then reload before saving again.`,contextChanged:`The returned file does not match this profile and agent. Reload before trying again.`}}},Ot=Object.assign(()=>{Object.assign(d.profilePage.personalInstructions,X.profilePage.personalInstructions)},{catalog:X})})))()}var Z;function At(){return(At=e((()=>{n(),T(),D(),S(),y(),L(),v(),kt(),h(),m(),B(),Ot(),Z=class extends g{constructor(...e){super(...e),this.agentId=``,this.file=null,this.draft=``,this.busy=null,this.error=null,this.saved=!1,this.client=null,this.profileId=null,this.connectionId=null,this.gatewayUrl=null,this.available=!1,this.multipleProfiles=!1,this.generation=0,this.subscriptions=[],this.drafts=new Map}connectedCallback(){super.connectedCallback(),this.subscriptions=[this.context.gateway.subscribe(()=>this.syncContext()),this.context.agents.subscribe(()=>this.syncContext()),this.context.settingsAgentSelection.subscribe(()=>this.syncContext())],this.syncContext(),this.context.agents.ensureList()}disconnectedCallback(){this.subscriptions.forEach(e=>e()),this.subscriptions=[],this.generation+=1,this.client=null,this.available=!1,super.disconnectedCallback()}get agents(){return this.context.agents.state?.agentsList?.agents??[]}get dirty(){return this.file!==null&&this.draft!==this.file.content}syncContext(){let e=this.context.gateway.snapshot,t=e.phase===`connected`,n=e.selfUser?.id??this.profileId,r=this.context.gateway.connection.gatewayUrl,i=e.hello?.server?.connId??null;this.multipleProfiles=e.hello?.policy?.hasMultipleSessionSharingIdentities===!0;let a=t&&this.multipleProfiles&&!!e.selfUser?.id&&be(e.hello?.auth??null),o=n!==this.profileId||r!==this.gatewayUrl,s=o||e.client!==this.client||i!==this.connectionId||a!==this.available;s&&(this.generation+=1,this.client=e.client,this.connectionId=i,this.gatewayUrl=r,this.profileId=n,this.available=a,this.busy=null,this.error=null,this.saved=!1,o&&(this.file=null,this.draft=``,this.agentId=``,this.drafts.clear()));let c=this.context.settingsAgentSelection.state.selectedId,l=this.agents.some(e=>e.id===c)?c:``,u=l!==this.agentId;if(u){this.dirty&&this.file?this.drafts.set(this.agentId,{file:this.file,content:this.draft}):this.drafts.delete(this.agentId),this.generation+=1,this.busy=null,this.error=null,this.saved=!1,this.agentId=l;let e=this.drafts.get(l);this.drafts.delete(l),this.file=e?.file??null,this.draft=e?.content??``}this.available&&this.agentId&&!this.dirty&&(s||u)&&this.load(),this.requestUpdate()}async load(){let e=this.client,t=this.agentId,n=this.profileId;if(!e||!this.available||!t||this.busy)return;let r=++this.generation;this.busy=`load`,this.error=null,this.saved=!1;try{let i=await e.request(`users.personalFile.get`,{agentId:t});if(r!==this.generation)return;if(i.agentId!==t||i.profileId!==n)throw Error(p(`profilePage.personalInstructions.contextChanged`));this.file=i,this.draft=i.content,this.drafts.delete(t)}catch(e){r===this.generation&&(this.error=s(e))}finally{r===this.generation&&(this.busy=null)}}async save(){let e=this.client,t=this.file;if(!e||!t||!this.available||this.busy||!this.dirty||t.agentId!==this.agentId||this.draft.length>4e3||!this.agents.some(e=>e.id===t.agentId))return;let n=++this.generation,r=this.draft;this.busy=`save`,this.error=null,this.saved=!1;try{let i=await e.request(`users.personalFile.set`,{agentId:t.agentId,content:r,expectedHash:t.hash});if(n!==this.generation)return;if(i.agentId!==t.agentId||i.profileId!==t.profileId)throw Error(p(`profilePage.personalInstructions.contextChanged`));this.file=i,this.draft=i.content,this.drafts.delete(i.agentId),this.saved=!0}catch(e){n===this.generation&&(this.error=s(e))}finally{n===this.generation&&(this.busy=null)}}reload(){(!this.dirty||window.confirm(p(`profilePage.personalInstructions.discard`)))&&this.load()}render(){return this.multipleProfiles?C`<div id=${V.personalInstructions}>
      ${j({title:p(`profilePage.personalInstructions.title`),description:p(`profilePage.personalInstructions.description`)},this.available?this.agents.length?C`
                <div class="personal-instructions">
                  ${this.file?C`
                          <textarea
                            id="personal-instructions-content"
                            class="settings-input personal-instructions__editor"
                            rows="7"
                            .value=${this.draft}
                            ?disabled=${this.busy!==null}
                            aria-label=${p(`profilePage.personalInstructions.title`)}
                            aria-describedby="personal-instructions-guidance"
                            @input=${e=>{e.currentTarget instanceof HTMLTextAreaElement&&(this.draft=e.currentTarget.value,this.saved=!1)}}
                          ></textarea>
                          <div id="personal-instructions-guidance" class="settings-row__desc">
                            ${p(`profilePage.personalInstructions.guidance`,{count:String(this.draft.length)})}
                            ${this.file.missing?p(`profilePage.personalInstructions.missing`):w}
                          </div>
                          ${this.draft.length>4e3?C`<div role="alert">${p(`profilePage.personalInstructions.tooLong`)}</div>`:w}
                        `:w}
                  ${this.error?C`<div class="personal-instructions__error" role="alert">${this.error} ${p(`profilePage.personalInstructions.failureHint`)}</div>`:w}
                  <div class="personal-instructions__actions">
                    <button
                      class="btn"
                      ?disabled=${!this.file||!this.dirty||this.busy!==null||this.draft.length>4e3||!this.agents.some(e=>e.id===this.agentId)}
                      @click=${()=>void this.save()}
                    >
                      ${this.busy===`save`?p(`common.saving`):p(`common.save`)}
                    </button>
                    ${this.error?C`<button
                            class="btn"
                            ?disabled=${this.busy!==null}
                            @click=${()=>this.reload()}
                          >
                            ${p(`profilePage.personalInstructions.reload`)}
                          </button>`:w}
                    <span class="settings-row__desc" role="status"
                      >${this.dirty?p(`profilePage.personalInstructions.dirty`):this.saved?p(`profilePage.personalInstructions.saved`):w}</span
                    >
                  </div>
                </div>
              `:R(p(`profilePage.personalInstructions.noAgents`)):R(p(`profilePage.personalInstructions.signIn`)))}
    </div>`:w}},i([o({context:x,subscribe:!1})],Z.prototype,`context`,void 0),i([E()],Z.prototype,`agentId`,void 0),i([E()],Z.prototype,`file`,void 0),i([E()],Z.prototype,`draft`,void 0),i([E()],Z.prototype,`busy`,void 0),i([E()],Z.prototype,`error`,void 0),i([E()],Z.prototype,`saved`,void 0),customElements.get(`openclaw-personal-instructions`)||customElements.define(`openclaw-personal-instructions`,Z)})))()}function jt(e,t){return{id:e.id,name:e.displayName??void 0,email:e.emails[0],avatarUrl:t??void 0,watchedSessions:[]}}function Mt(e){let t=e.canWrite!==!1,n=e.profile.displayName??``,r=e.displayName.trim()!==n,i=e.profile.emails.join(`, `),a=e.profile.githubIdentity,o=e.profile.id===Oe;return C`<div id=${V.identity}>
    ${j({title:p(`profilePage.identity.title`),description:p(`profilePage.identity.description`)},C`
        ${t?w:P({title:p(`profilePage.identity.writeRequired`)})}
        ${P({title:p(`profilePage.identity.avatar`),description:p(`profilePage.identity.avatarDescription`),control:C`
            <span class="identity-avatar-control">
              <openclaw-viewer-avatar
                .user=${jt(e.profile,e.avatarUrl)}
                variant="profile"
              ></openclaw-viewer-avatar>
              ${t&&_(e.config)?C`<button
                        type="button"
                        class="btn btn--sm"
                        ?disabled=${!t||e.busy!==null}
                        @click=${n=>{let r=n.currentTarget,i=r instanceof HTMLButtonElement?r.nextElementSibling:null;t&&_(e.config)&&i instanceof HTMLInputElement&&i.click()}}
                      >
                        ${e.busy===`avatar`?p(`profilePage.identity.processingAvatar`):p(`profilePage.identity.chooseAvatar`)}
                      </button>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        hidden
                        ?disabled=${!t||e.busy!==null}
                        @change=${n=>{let r=n.currentTarget,i=r.files?.[0];r.value=``,i&&t&&_(e.config)&&e.onAvatarSelect(i)}}
                      />`:w}
            </span>
          `})}
        ${P({title:p(`profilePage.identity.displayName`),description:p(`profilePage.identity.displayNameDescription`),control:C`
            <form
              class="identity-name-control"
              @submit=${t=>{t.preventDefault(),e.onSaveDisplayName()}}
            >
              <input
                class="settings-input"
                type="text"
                maxlength="256"
                aria-label=${p(`profilePage.identity.displayName`)}
                .value=${e.displayName}
                ?disabled=${!t||e.busy!==null}
                @input=${t=>e.onDisplayNameInput(t.currentTarget.value)}
              />
              <button
                type="submit"
                class="btn btn--sm"
                ?disabled=${!t||e.busy!==null||!r}
              >
                ${e.busy===`display-name`?p(`common.saving`):p(`common.save`)}
              </button>
            </form>
          `})}
        ${o?w:P({title:p(`profilePage.identity.linkedEmails`),description:p(`profilePage.identity.linkedEmailsDescription`),control:i?M(i):w})}
        ${P({title:p(`profilePage.identity.githubAccount`),description:p(o?`profilePage.identity.ownerGithubDescription`:a?`profilePage.identity.githubAccountDescription`:`profilePage.identity.githubUnavailableDescription`),control:a?C`
                <a
                  class="settings-account"
                  href=${a.profileUrl}
                  target=${Pe}
                  rel=${Me()}
                >
                  <img class="settings-account__avatar" src=${a.avatarUrl} alt="" />
                  <span class="settings-row__value settings-row__value--mono"
                    >@${a.login}</span
                  >
                </a>
                ${N({kind:`ok`,label:p(`profilePage.identity.githubVerified`)})}
              `:N({kind:`muted`,label:p(`profilePage.identity.githubUnavailable`)})})}
        ${Le({title:p(`profilePage.identity.gitCoauthor`),description:p(o?`profilePage.identity.ownerGitCoauthorDescription`:a?`profilePage.identity.gitCoauthorDescription`:`profilePage.identity.gitCoauthorUnavailable`),checked:!!(a&&e.gitCoauthorEnabled),disabled:!t||e.busy!==null||!a,onChange:e.onGitCoauthorChange})}
        ${e.error?C`<div class="settings-row identity-error" role="alert">
                <span class="settings-row__desc">${e.error}</span>
              </div>`:w}
      `)}
  </div>`}function Nt(){return(Nt=e((()=>{T(),De(),L(),v(),G(),Ne(),Ue(),f(),B(),W()})))()}function Pt(e,t){if(e.user)return C`<openclaw-viewer-avatar
      .user=${{...e.user,name:t,watchedSessions:[]}}
      variant="profile"
    ></openclaw-viewer-avatar>`;let n=ee(e.row,e.identity);return He({id:e.row.id,name:t,avatar:n?e.avatarLoader.resolve(n):null,textAvatar:te(e.row,e.identity)},``,n?e.avatarLoader.imageErrorHandler(n):void 0)}function Ft(e){let t=e.user?e.user.name?.trim()||e.user.email||p(`nav.owner`):e.identity?.name?.trim()||e.row.identity?.name?.trim()||e.row.name?.trim()||e.row.id,n=e.user?e.user.email:`@${e.row.id}`;return F(C`
    <section class="profile-hero">
      <div class="profile-hero__avatar">${Pt(e,t)}</div>
      <div class="profile-hero__name">${t}</div>
      <div class="profile-hero__handle">
        ${n?C`<span class="profile-hero__email">${n}</span>`:w}
        <span class="profile-hero__badge">OpenClaw</span>
      </div>
    </section>
  `)}function It(){return(It=e((()=>{T(),ze(),L(),v(),u(),c(),Ue()})))()}function Lt(e){return s(e,p(`profilePage.identity.profileUnavailable`))}var Rt,Q;function $(){return($=e((()=>{n(),T(),D(),De(),Te(),S(),y(),Ce(),he(),L(),Xe(),v(),A(),G(),h(),je(),f(),m(),re(),B(),st(),gt(),Dt(),At(),Nt(),ie(),It(),t(),k(),W(),Rt=`https://docs.openclaw.ai/concepts/user-model`,Q=class extends g{constructor(){super(),this.selfUser=null,this.ownProfile=null,this.displayName=``,this.gitCoauthorEnabled=!0,this.identityLoading=!1,this.identityBusy=null,this.identityError=null,this.client=null,this.connected=!1,this.connecting=!1,this.canWrite=!1,this.connectionScopes=null,this.heroAvatarLoader=new Ae(this),this.identityRequestId=0,this.subscriptions=[],new ue(this).watch(()=>this.context?.config,(e,t)=>e.subscribe(t))}connectedCallback(){super.connectedCallback(),this.subscriptions=[this.context.gateway.subscribe(e=>this.applyGatewaySnapshot(e)),this.context.gateway.subscribeEvents(e=>{!this.identityBusy&&e.event===`sessions.changed`&&r(e.payload)?.reason===`profile-identity`&&(this.identityRequestId+=1,this.identityLoading=!1,this.loadIdentity())}),this.context.agents.subscribe(()=>this.requestUpdate()),this.context.agentIdentity.subscribe(()=>this.requestUpdate())],this.applyGatewaySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){for(let e of this.subscriptions)e();this.subscriptions=[],this.identityRequestId+=1,this.client=null,this.connected=!1,this.connecting=!1,this.canWrite=!1,this.connectionScopes=null,super.disconnectedCallback()}applyGatewaySnapshot(e){let t=e.client!==this.client,n=e.phase===`connected`,r=n&&b(e.hello?.auth??null),i=r!==this.canWrite,a=n!==this.connected,o=n?Se({snapshotUser:e.selfUser}):null,s=o?.id!==this.selfUser?.id||o?.identity?.id!==this.selfUser?.identity?.id,c=t||a||s||i;this.client=e.client,this.connected=n,this.connecting=e.phase===`connecting`||e.phase===`reconnecting`,this.canWrite=r,this.connectionScopes=n?e.hello?.auth?.scopes??null:null,this.selfUser=o,this.requestUpdate(),c&&(this.identityRequestId+=1,this.ownProfile=null,this.displayName=``,this.gitCoauthorEnabled=!0,this.identityLoading=!1,this.identityBusy=null,this.identityError=null),n&&e.client&&(c&&this.loadIdentity(),this.context.agents.ensureList().then(e=>{e&&this.context.agentIdentity.ensure([e.defaultId])}))}async loadIdentity(){let e=this.client;if(!e||!this.connected||this.identityLoading)return;let t=++this.identityRequestId,n=this.ownProfile,r=this.displayName,i=n!==null&&r.trim()!==(n.displayName??``);this.identityLoading=!0,this.identityError=null;try{let n=await this.context.gateway.loadSelfProfile();if(t!==this.identityRequestId||(this.ownProfile=n,!n))return;if(this.displayName=i?r:n.displayName??``,this.gitCoauthorEnabled=!0,n.githubIdentity){let{loadUserPreferences:r}=await a(async()=>{let{loadUserPreferences:e}=await import(`./user-prefs-request-CEn5UIdZ.js`);return{loadUserPreferences:e}},__vite__mapDeps([0,1,2,3]),import.meta.url);if(t!==this.identityRequestId)return;let i=await r(e,n.id,{keys:[ke]});if(t!==this.identityRequestId)return;this.gitCoauthorEnabled=i.status===`ok`&&Ee(i.entries[`git.coauthor.enabled`])}}catch(e){t===this.identityRequestId&&(this.identityError=Lt(e))}finally{t===this.identityRequestId&&(this.identityLoading=!1)}}async saveIdentity(e){let t=this.client,n=this.ownProfile;if(!t||!n||!this.canWrite||this.identityBusy||this.identityLoading||e.kind===`git-coauthor`&&!n.githubIdentity)return;this.identityBusy=e.kind,this.identityError=null;let r=this.identityRequestId,i=()=>t===this.client&&r===this.identityRequestId;try{switch(e.kind){case`display-name`:{let e=await t.request(`users.setDisplayName`,{profileId:n.id,displayName:this.displayName.trim()||null});if(!i())return;this.ownProfile=e.profile,this.displayName=e.profile.displayName??``,this.context.gateway.updateSelfUser?.({name:e.profile.displayName??void 0});break}case`avatar`:{le(this.context.config);let r=this.displayName,a=r.trim()!==(n.displayName??``),o=this.selfUser?.id===n.id?this.selfUser.avatarUrl:void 0,s=await ft(e.file);if(!i())return;le(this.context.config);let c=await t.request(`users.setAvatar`,{profileId:n.id,mime:s.mime,avatarBase64:s.avatarBase64});if(!i())return;this.ownProfile=c.profile,this.displayName=a?r:c.profile.displayName??``;let l=de(this.context.gateway.connection.gatewayUrl,c.profile.id,c.avatarRevision,this.context.resourceBasePath),u=this.selfUser?.id===c.profile.id&&this.selfUser.avatarUrl!==o;l&&!u&&this.context.gateway.updateSelfUser?.({avatarUrl:l});break}case`git-coauthor`:{let n=await pe(t,{entries:{[ke]:e.enabled}});if(!i())return;if(n.status!==`ok`)throw Error(p(`profilePage.identity.profileUnavailable`));this.gitCoauthorEnabled=e.enabled;return}}}catch(t){i()&&(this.identityError=e.kind===`avatar`&&t instanceof J?p(t.code===`too-large`?`profilePage.identity.avatarErrors.tooLarge`:t.code===`source-too-large`?`profilePage.identity.avatarErrors.sourceTooLarge`:`profilePage.identity.avatarErrors.invalid`):Lt(t));return}finally{i()&&this.identityBusy===e.kind&&(this.identityBusy=null)}i()&&this.loadIdentity()}renderIdentity(){if(!this.selfUser||!this.ownProfile)return C`<div id=${V.identity}>
        ${j({title:p(`profilePage.identity.title`)},this.identityLoading?Ke({label:p(`profilePage.identity.loading`),rows:2}):R(this.identityError??p(this.selfUser?`profilePage.identity.profileUnavailable`:`profilePage.identity.unidentified`)))}
      </div>`;let e=this.selfUser?.id===this.ownProfile.id&&this.selfUser.avatarUrl?this.selfUser.avatarUrl:de(this.context.gateway.connection.gatewayUrl,this.ownProfile.id,this.ownProfile.updatedAt,this.context.resourceBasePath);return Mt({config:this.context.config,profile:this.ownProfile,canWrite:this.canWrite,avatarUrl:e,displayName:this.displayName,gitCoauthorEnabled:this.gitCoauthorEnabled,busy:this.identityLoading?`loading`:this.identityBusy,error:this.identityError,onDisplayNameInput:e=>{this.displayName=e},onSaveDisplayName:()=>void this.saveIdentity({kind:`display-name`}),onAvatarSelect:e=>void this.saveIdentity({kind:`avatar`,file:e}),onGitCoauthorChange:e=>void this.saveIdentity({kind:`git-coauthor`,enabled:e})})}renderConnectionAccess(){let e=this.connectionScopes,t=e===null?`unknown`:e.length===0?`none`:[[`operator.admin`,`admin`],[`operator.write`,`write`],[`operator.sessions.write`,`sessionWrite`],[`operator.read`,`read`],[`operator.sessions.read`,`sessionRead`]].find(([t])=>e.includes(t))?.[1]??`limited`;return C`<div id="settings-profile-access">
      ${j({title:p(`profilePage.access.title`)},C`
          ${P({title:p(`profilePage.access.${t}`),description:p(`profilePage.access.limits`)})}
          ${P({title:p(`profilePage.access.help`),description:p(`profilePage.access.nextStep`),stackedOnNarrow:!0,control:C`<button
              type="button"
              class="btn"
              ?disabled=${this.identityBusy!==null}
              @click=${()=>this.context.gateway.connect()}
            >
              ${p(`profilePage.access.reconnect`)}
            </button>`})}
          <details class="settings-row settings-row--stacked">
            <summary>${p(`profilePage.access.details`)}</summary>
            ${P({title:p(`profilePage.access.scopes`),description:p(`profilePage.access.description`),stacked:!0,control:M(e===null?p(`profilePage.access.unknown`):e.length===0?p(`profilePage.access.none`):e.join(`, `),{mono:e!==null&&e.length>0})})}
          </details>
        `)}
    </div>`}renderModelAccounts(){return C`<openclaw-model-accounts
      .identityId=${this.selfUser?.id??null}
      .profileId=${this.ownProfile?.id??null}
      .personLabel=${this.ownProfile?this.ownProfile.displayName?.trim()||this.ownProfile.emails[0]||p(`profilePage.modelAccounts.currentPerson`):null}
    ></openclaw-model-accounts>`}refreshManually(){this.connected&&!this.identityBusy&&!this.identityLoading&&(this.client&&ge(this.client),this.loadIdentity())}renderHero(){let e=this.context.agents.state.agentsList,t=e?.defaultId??`main`;return Ft({row:e?.agents.find(e=>e.id===t)??{id:t},user:this.selfUser,identity:this.context.agentIdentity.get(t),avatarLoader:this.heroAvatarLoader})}renderBody(){let e=this.connected&&this.client!==null,t=this.context.gateway.snapshot.hello?.policy?.hasMultipleSessionSharingIdentities===!0;return Ie(C`
      ${e?C`${this.renderHero()} ${this.renderConnectionAccess()} ${this.renderIdentity()}`:F(this.connecting?C`<div role="status">
                    ${R(p(`profilePage.access.connecting`))}
                  </div>`:R(p(`profilePage.offline`)))}
      <openclaw-personal-instructions
        ?hidden=${!e||!t}
      ></openclaw-personal-instructions>
      ${e?C`
              ${this.renderModelAccounts()}
              <openclaw-github-connections></openclaw-github-connections>
              ${F(Be({title:p(`profilePage.usageStatistics`),description:p(`profilePage.usageStatisticsDescription`),onClick:()=>this.context.navigate(`usage`)}))}
            `:w}
    `)}render(){return this.heroAvatarLoader.withActiveRoutes(()=>this.renderContent())}renderContent(){return C`
      <section class="content-header" ${we({toolbarHeader:!0})}>
        <div>
          <h1 class="page-title">${me(`profile`)}</h1>
          <div class="page-subtitle">
            ${xe(`profile`)} ${z(Rt)}
          </div>
        </div>
        ${this.connected?C`<button
                class="btn profile-refresh"
                ?disabled=${this.identityLoading||this.identityBusy!==null}
                @click=${()=>this.refreshManually()}
              >
                ${this.identityLoading?p(`common.refreshing`):p(`common.refresh`)}
              </button>`:w}
      </section>
      ${Ye(this.renderBody())}
    `}},i([o({context:x,subscribe:!1})],Q.prototype,`context`,void 0),i([E()],Q.prototype,`selfUser`,void 0),i([E()],Q.prototype,`ownProfile`,void 0),i([E()],Q.prototype,`displayName`,void 0),i([E()],Q.prototype,`gitCoauthorEnabled`,void 0),i([E()],Q.prototype,`identityLoading`,void 0),i([E()],Q.prototype,`identityBusy`,void 0),i([E()],Q.prototype,`identityError`,void 0),customElements.get(`openclaw-profile-page`)||customElements.define(`openclaw-profile-page`,Q)})))()}$();