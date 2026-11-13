import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Ji as n,Ui as r,eo as i,io as a,qr as o,zr as s}from"./control-ui-foundation-C3MHh_P-.js";import{C as c,Gl as l,Kl as u,Na as d,R as ee,an as f,c as p,cc as te,cn as m,hu as h,l as g,lu as ne,ql as _,s as v,sc as re,su as ie,u as ae,uu as y}from"./control-ui-core-pYNj5S1a.js";import{$n as oe,Br as se,Ma as ce,Xi as b,Zi as x,er as le,ja as ue,va as de,vi as fe,yi as pe}from"./control-ui-core-D6clmJs8.js";import{$ as S,F as me,M as he,X as C,Y as w,c as T,ct as E,i as ge,nt as _e,o as ve,r as ye,s as D,t as be,ut as xe}from"./lit-runtime-DZL1fcCI.js";import{c as O,l as Se}from"./gateway-runtime-iOL78mIi.js";import{b as k,gt as Ce,ht as we,no as Te,ro as Ee,y as A}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as De,R as Oe,V as j,z as ke}from"./control-ui-boot-shared-D-LYw3KU.js";import{Ar as Ae,At as je,Dr as Me,Dt as Ne,Et as Pe,Mt as M,Pt as Fe,_ as Ie,_t as N,ar as Le,g as Re,jt as ze,rr as Be,xt as Ve}from"./control-ui-boot-shared-DJ4XCcp6.js";import{Ct as P,bt as He,gr as Ue,gt as We,ht as Ge,mt as Ke,or as qe,sr as Je,vt as Ye,xt as Xe,yr as Ze,yt as Qe}from"./control-ui-boot-shared-DCY2wZcy.js";import"./css-agents-plugins-skill-workshop-skills-DvcafeYi.js";import{n as $e,t as et}from"./settings-workspace-DKW0BVnu.js";import{a as tt,i as F,n as nt,o as rt,r as it,s as at,t as ot}from"./skills-shared-DTad9IFK.js";import{i as st,n as ct,r as lt,t as ut}from"./plugins-hub-header-BrNeEiya.js";function dt(e){return e===I.SECURITY_UNAVAILABLE||e===I.DOWNLOAD_BLOCKED}function ft(e){if(e.code||e.version||e.warning)return{...e.code?{clawhubTrustCode:e.code}:{},...e.version?{version:e.version}:{},...e.warning?{warning:e.warning}:{}}}function pt(e){if(n(e))return ft({code:dt(e.clawhubTrustCode)?e.clawhubTrustCode:void 0,version:a(e.version),warning:a(e.warning)})}var I;function mt(){return(mt=e((()=>{I={SECURITY_UNAVAILABLE:`clawhub_security_unavailable`,DOWNLOAD_BLOCKED:`clawhub_download_blocked`}})))()}function ht(e){return e.installRef??e.slug}async function gt(e,t,n){return(await e.request(`skills.search`,{query:t.trim()||void 0,limit:20},{signal:n}))?.results??[]}async function _t(e,t,n,r){let i,a=await e.runExternalMutation(async e=>{if(e!==t)throw Error(`Connection changed before the skill update started.`);try{return await e.request(`skills.update`,n)}catch(e){throw i=e instanceof Error?e:Error(String(e)),i}},{canDispatch:r,dispatchError:`Access changed before the skill update started.`});if(!a.ok)throw i??Error(a.error);return a.refresh.ok?null:a.refresh.error}function L(e,t,n){return e.connected&&e.client===t&&e.skillOperation===n}function vt(e,t){e.skillOperation===t&&(e.skillOperation=null)}function yt(e,t,n){t.trim()&&(e.skillMessages={...e.skillMessages,[t]:n})}function bt(e){if(e&&typeof e==`object`&&`details`in e)return pt(e.details)}function xt(e){return`${e.registry}\0${e.ownerHandle??``}\0${e.slug}\0${e.version}`}function St(e){return!!(e&&e.status===`linked`&&e.valid)}function Ct(e){if(!e.skillCard?.present)return;let t=St(e.clawhub)?e.clawhub.installedVersion:``;return`${e.skillCard.path}\0${e.skillCard.sizeBytes}\0${t}`}function R(e,t){let n=e.skillsReport?.skills.find(e=>e.skillKey===t);return n?Ct(n):void 0}function z(e){let t=e.skillsAgentId?.trim();return t?{agentId:t}:{}}function B(e){return{agentId:e.skillsAgentId,revision:e.skillsAgentRevision}}function V(e,t){return e.skillsAgentId===t.agentId&&e.skillsAgentRevision===t.revision}function H(e,t){let n=t?.trim()||null;e.skillsAgentId!==n&&(e.skillsAgentId=n,e.skillsAgentRevision++,e.skillsLoading=!1,e.skillsReport=null,e.skillsError=null,e.skillEdits={},e.skillMessages={},e.clawhubInstallMessage=null,e.clawhubVerdicts={},e.clawhubVerdictsLoading=!1,e.clawhubVerdictsError=null,e.skillCardContents={},e.skillCardContentKeys={},e.skillCardLoadingKey=null,e.skillCardErrors={})}function wt(e,t){t&&H(e,t.agents.some(t=>t.id===e.skillsAgentId)?e.skillsAgentId:t.agents.some(e=>e.id===t.defaultId)?t.defaultId:null)}async function U(e,t){let n=e.client,r=e.skillsAgentId?.trim();if(!n||!r||!e.connected||e.skillsLoading||e.skillOperation&&e.skillOperation!==t?.operation)return;t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={});let i=B(e),a=()=>e.client===n&&V(e,i)&&(!t?.operation||e.skillOperation===t.operation),o=()=>e.connected&&a();e.skillsLoading=!0,e.skillsError=null;try{let t=await d(n,r);if(!o())return;t&&Array.isArray(t.skills)&&(e.skillsReport=t,Dt(e,t),kt(e,t))}catch(t){if(!o())return;e.skillsError=l(t)}finally{a()&&(e.skillsLoading=!1)}}async function Tt(e,t,n,r=!1){let i=r;for(;L(e,t,n);){let r=B(e);if(await U(e,{clearMessages:i,operation:n}),i=!1,!L(e,t,n)||V(e,r))return}}async function Et(e,t){let n=e.client;if(!n||!e.connected||e.skillsLoading||e.skillOperation)return;let r={kind:`refresh`};e.skillOperation=r;try{if(await t(),!L(e,n,r))return;await Tt(e,n,r,!0)}finally{vt(e,r)}}function Dt(e,t){let n=new Map(t.skills.map(e=>[e.skillKey,Ct(e)]).filter(e=>e[1]!==void 0));e.skillCardContents=Object.fromEntries(Object.entries(e.skillCardContents).filter(([t])=>e.skillCardContentKeys[t]===n.get(t))),e.skillCardContentKeys=Object.fromEntries(Object.entries(e.skillCardContentKeys).filter(([e,t])=>t===n.get(e))),e.skillCardErrors=Object.fromEntries(Object.entries(e.skillCardErrors).filter(([e])=>n.has(e))),e.skillCardLoadingKey&&!n.has(e.skillCardLoadingKey)&&(e.skillCardLoadingKey=null)}async function Ot(e,t){if(!e.client||!e.connected||e.skillCardLoadingKey===t||e.skillCardContents[t]!==void 0&&e.skillCardContentKeys[t]===R(e,t))return;let n=R(e,t);if(!n)return;let r=B(e),i={...z(e),skillKey:t};e.skillCardLoadingKey=t;let{[t]:a,...o}=e.skillCardErrors;e.skillCardErrors=o;try{let a=await e.client.request(`skills.skillCard`,i);V(e,r)&&a?.skillKey===t&&typeof a.content==`string`&&R(e,t)===n&&(e.skillCardContents={...e.skillCardContents,[t]:a.content},e.skillCardContentKeys={...e.skillCardContentKeys,[t]:n})}catch(n){V(e,r)&&(e.skillCardErrors={...e.skillCardErrors,[t]:l(n)})}finally{V(e,r)&&e.skillCardLoadingKey===t&&(e.skillCardLoadingKey=null)}}async function kt(e,t){let n=e.client,r=B(e);if(!n||!e.connected||!t.skills.some(e=>St(e.clawhub))){e.clawhubVerdicts={},e.clawhubVerdictsLoading=!1,e.clawhubVerdictsError=null;return}e.clawhubVerdictsLoading=!0,e.clawhubVerdictsError=null;try{let t=await n.request(`skills.securityVerdicts`,z(e));if(!V(e,r))return;e.clawhubVerdicts=Object.fromEntries((t?.items??[]).map(e=>[xt({registry:e.registry,slug:e.requestedSlug,ownerHandle:e.requestedOwnerHandle,version:e.requestedVersion}),e]))}catch(t){if(!V(e,r))return;e.clawhubVerdicts={},e.clawhubVerdictsError=l(t)}finally{V(e,r)&&(e.clawhubVerdictsLoading=!1)}}function At(e,t,n){e.skillOperation||e.skillsLoading||(e.skillEdits={...e.skillEdits,[t]:n})}async function W(e,t,n){let r=e.client;if(!r||!e.connected||e.skillsLoading||e.skillOperation)return;let i=B(e),a=()=>L(e,r,t)&&V(e,i);e.skillOperation=t,t.kind===`skill`?e.skillsError=null:e.clawhubInstallMessage=null;try{let i=await n(r);if(!a()||(await U(e,{operation:t}),!a()))return;t.kind===`skill`?yt(e,t.skillKey,i):e.clawhubInstallMessage={kind:i.kind,text:i.message}}catch(n){if(!a())return;let r=l(n);if(t.kind===`skill`)e.skillsError=r,yt(e,t.skillKey,{kind:`error`,message:r});else{let t=bt(n);e.clawhubInstallMessage={kind:`error`,text:G(r,t?.warning)}}}finally{L(e,r,t)&&!V(e,i)&&await Tt(e,r,t),vt(e,t)}}async function jt(e,t,n,r=()=>!0){await Mt(e,t,{enabled:n},n?`Skill enabled`:`Skill disabled`,r)}async function Mt(e,t,n,r,i){await W(e,{kind:`skill`,skillKey:t},async a=>{let o=await _t(e.runtimeConfig,a,{skillKey:t,...n},i);return{kind:`success`,message:o?`${r}\n${o}`:r}})}async function Nt(e,t,n=()=>!0){let r=e.skillEdits[t]?.trim();r&&await Mt(e,t,{apiKey:r},`API key saved — stored in openclaw.json (skills.entries.${t})`,n)}async function Pt(e,t,n,r,i=!1){await W(e,{kind:`skill`,skillKey:t},async t=>{let a=await t.request(`skills.install`,{...z(e),name:n,installId:r,dangerouslyForceUnsafeInstall:i});return{kind:`success`,message:u(a?.message,`Installed`)}})}async function Ft(e,t){if(!e.client||!e.connected)return;let n=e.client,r=B(e);e.clawhubDetailRef=t,e.clawhubDetailLoading=!0,e.clawhubDetailError=null,e.clawhubDetail=null;let i=()=>e.connected&&e.client===n&&t===e.clawhubDetailRef&&V(e,r);try{let r=await n.request(`skills.detail`,{slug:t});if(!i())return;e.clawhubDetail=r??null}catch(t){if(!i())return;e.clawhubDetailError=l(t)}e.clawhubDetailLoading=!1}function It(e){e.clawhubDetailRef=null,e.clawhubDetail=null,e.clawhubDetailError=null,e.clawhubDetailLoading=!1}async function Lt(e,t,n){await W(e,{kind:`clawhub`,ref:t},async r=>{let i=await r.request(`skills.install`,{...z(e),source:`clawhub`,slug:t,...n?{version:n}:{}});return{kind:`success`,message:G(u(i?.message,`Installed ${t}`),i?.warning?u(i.warning):void 0)}})}var G;function K(){return(K=e((()=>{mt(),_(),G=(e,t)=>t?`${e}\n\n${t}`:e})))()}var Rt;function zt(){return(zt=e((()=>{le(),y(),_(),Se(),p(),Ye(),Rt=class{constructor(e,t,n,r,i=()=>void 0){this.host=e,this.gateway=t,this.selectedAgent=n,this.refreshWorkspace=r,this.config=i,this.list=null,this.view=null,this.loading=!1,this.busy=!1,this.error=null,this.notice=null,this.draft=null,this.importVisible=!1,this.importSlug=``,this.importSource=null,this.importSelection=[],this.newFilePath=``,this.query=``,this.readSequence=0}changed(){this.host.requestUpdate()}clearFeedback(){this.error=null,this.notice=null}get importOpen(){return this.importVisible}set importOpen(e){this.clearFeedback(),this.importVisible=e,e||(this.importSlug=``,this.importSource=null,this.importSelection=[])}reset(){this.readSequence++,this.list=null,this.view=null,this.loading=!1,this.busy=!1,this.draft=null,this.importOpen=!1,this.newFilePath=``,this.query=``}get showWorkspace(){return this.view===null||this.view===`workspace`}get uploadsEnabled(){return ae(this.config())}get canWrite(){return O(this.gateway.snapshot,`skills.library.save`,`operator.write`,{requireAdvertisement:!1})}get canTransfer(){return O(this.gateway.snapshot,`skills.library.mutate`,`operator.admin`,{requireAdvertisement:!1})}get createTarget(){return this.showWorkspace&&this.list?.canManageWorkspace?`workspace`:this.list?.profileId?`personal`:`unavailable`}get canCreate(){return this.loading?!1:this.createTarget===`workspace`?O(this.gateway.snapshot,`skills.proposals.create`,`operator.admin`,{requireAdvertisement:!1}):this.createTarget===`personal`&&this.canWrite}get canEdit(){return this.canWrite&&(this.draft?.entry?.canEdit??!0)}async load(){let e=this.gateway.capture();if(e&&!this.loading){this.loading=!0,this.error=null,this.changed();try{let t=await e.client.request(`skills.library.list`,{scope:`all`});if(!this.gateway.isCurrent(e))return;this.list=t,this.view??=t.defaultTarget===`personal`?`mine`:`workspace`}catch(t){this.gateway.isCurrent(e)&&(this.error=l(t))}finally{this.gateway.isCurrent(e)&&(this.loading=!1,this.changed())}}}create(){let e=this.gateway.capture();e&&this.canCreate&&this.createTarget!==`unavailable`&&(this.draft={target:this.createTarget,connection:e,agentId:this.selectedAgent(),entry:null,slug:``,description:``,content:``,files:[],baseFiles:[],revisions:[],selectedFile:`SKILL.md`,rollbackRevision:``,dirty:!1,proposal:null},this.clearFeedback(),this.newFilePath=``,this.changed())}close(){this.busy||this.draft?.dirty&&!window.confirm(h(`skillLibrary.discard`))||(this.readSequence++,this.draft=null,this.importOpen=!1,this.newFilePath=``,this.changed())}async open(e){if(this.draft?.dirty&&!window.confirm(h(`skillLibrary.discard`)))return;let t=this.gateway.capture();if(!t||this.busy)return;let n=++this.readSequence;await this.perform(async()=>{let r=await t.client.request(`skills.library.read`,{skillId:e});this.gateway.isCurrent(t)&&n===this.readSequence&&(this.draft={target:`personal`,connection:t,agentId:null,entry:r.entry,slug:r.entry.slug,description:r.entry.description,content:r.content,files:r.files,baseFiles:r.files.map(e=>({...e})),revisions:r.revisions,selectedFile:`SKILL.md`,rollbackRevision:``,dirty:!1,proposal:null})})}async perform(e){if(this.busy||this.loading)return;let t=this.gateway.capture();if(!t){this.error=h(`skillLibrary.connectionChanged`),this.changed();return}this.busy=!0,this.clearFeedback(),this.changed();try{await e()}catch(e){if(this.gateway.isCurrent(t)){let t=e instanceof oe?r(e.details)?.code:void 0;this.error=t===`SKILL_LIBRARY_CONFLICT`?h(`skillLibrary.conflict`):t===`SKILL_LIBRARY_IDENTITY_REQUIRED`?h(`skillLibrary.signIn`):l(e)}}finally{this.gateway.isCurrent(t)&&(this.busy=!1,this.changed())}}async receipt(e){this.notice=h(`skillLibrary.receipt.${e.state}`,{slug:e.entry.slug,target:e.target,owner:e.entry.ownerLabel})+` `+e.nextAction,await this.load()}async save(){let e=this.draft;e&&this.canEdit&&await this.perform(async()=>{if(!this.gateway.isCurrent(e.connection))throw Error(h(`skillLibrary.connectionChanged`));e.importedFiles&&v(this.config());let t=e.connection.client;if(e.target===`workspace`){if(e.files.length&&v(this.config()),!e.agentId)throw Error(h(`skillLibrary.selectAgent`));let n=e.files.map(e=>{let t=Qe(e);if(t===null||e.executable)throw Error(h(`skillLibrary.workspaceTextOnly`));return{path:e.path,content:t}}),r=await t.request(`skills.proposals.create`,{agentId:e.agentId,name:e.slug,description:e.description,content:e.content,supportFiles:n});if(!this.gateway.isCurrent(e.connection))return;e.proposal=r,e.importedFiles=!1,e.dirty=!1,this.notice=h(`skillLibrary.pending`,{id:r.record.id,agent:e.agentId});return}let n=e.files.map(e=>({...e})),r=new Map(e.baseFiles.map(e=>[e.path,e])),i=[],a=n.filter(t=>{let n=e.entry?r.get(t.path):void 0;return n&&n.content===t.content&&n.encoding===t.encoding&&n.executable===t.executable?(i.push(t.path),!1):!0});a.length&&v(this.config());let o=await t.request(`skills.library.save`,{...e.entry?{skillId:e.entry.skillId}:{},expectedRevision:e.entry?.revision??null,slug:e.slug,content:e.content,files:a,...i.length?{retainFiles:i}:{}});this.gateway.isCurrent(e.connection)&&(e.entry=o.entry,e.baseFiles=n,e.importedFiles=!1,e.dirty=!1,e.revisions=[{revision:o.entry.revision,createdAt:o.entry.updatedAt},...e.revisions.filter(e=>e.revision!==o.entry.revision)],await this.receipt(o))})}async applyWorkspace(){let e=this.draft,t=e?.proposal,n=e?.agentId;e&&t&&n&&await this.perform(async()=>{if(!this.gateway.isCurrent(e.connection))throw Error(h(`skillLibrary.connectionChanged`));let r=await e.connection.client.request(`skills.proposals.apply`,{agentId:n,proposalId:t.record.id,expectedRevisionHash:t.revisionHash});this.gateway.isCurrent(e.connection)&&(this.draft=null,this.notice=h(`skillLibrary.workspaceSaved`,{agent:n,state:r.record.status}),await this.refreshWorkspace())})}async mutate(e){let t=this.draft,n=t?.entry;t&&n&&this.canEdit&&!t.dirty&&(e!==`remove`&&e!==`transfer`||window.confirm(h(`skillLibrary.confirm.${e}`,{slug:t.slug})))&&await this.perform(async()=>{if(!this.gateway.isCurrent(t.connection))throw Error(h(`skillLibrary.connectionChanged`));let r=await t.connection.client.request(`skills.library.mutate`,{skillId:n.skillId,expectedRevision:n.revision,action:e,...e===`rollback`?{revision:t.rollbackRevision}:{}});if(this.gateway.isCurrent(t.connection)&&(e===`remove`&&(this.draft=null),await this.receipt(r),this.gateway.isCurrent(t.connection)&&e!==`remove`)){if(e===`rollback`){let e=await t.connection.client.request(`skills.library.read`,{skillId:r.entry.skillId,revision:r.entry.revision});if(!this.gateway.isCurrent(t.connection))return;t.content=e.content,t.files=e.files,t.baseFiles=e.files.map(e=>({...e})),t.revisions=e.revisions,t.selectedFile=`SKILL.md`,t.rollbackRevision=``}t.entry=r.entry}})}async importFiles(e){if(!e.length)return;let t=this.gateway.capture();t&&await this.perform(async()=>{v(this.config());let[n]=e;if(n&&e.length===1&&n.name.toLowerCase().endsWith(`.zip`)){if(this.createTarget===`workspace`)throw Error(h(`skillLibrary.workspaceTextOnly`));if(!this.list?.profileId)throw Error(h(`skillLibrary.signIn`));let e=await Xe(t.client,n,this.importSlug,()=>this.gateway.isCurrent(t),this.config());this.gateway.isCurrent(t)&&(this.importOpen=!1,await this.receipt(e));return}let r=await He(e,this.config());v(this.config()),this.gateway.isCurrent(t)&&(this.create(),this.draft&&(Object.assign(this.draft,r,{slug:this.importSlug,dirty:!0,importedFiles:!0}),this.importOpen=!1))})}async importClawHub(e,t,n){let r=this.gateway.capture();r&&this.list?.profileId&&this.canWrite&&await this.perform(async()=>{let i=await r.client.request(`skills.library.import`,{slug:e,source:{kind:`clawhub`,slug:t,...n?{version:n}:{}}});this.gateway.isCurrent(r)&&(this.importOpen=!1,await this.receipt(i))})}}})))()}function Bt(e,t){let n=e.list,r=[];return(n?.multipleProfiles||n?.entries.length||n?.defaultTarget===`personal`)&&(n?.profileId&&r.push({value:`mine`,label:h(`skillLibrary.mine`)}),(n?.multipleProfiles||n?.entries.some(e=>e.shared||e.ownerProfileId===null))&&r.push({value:`team`,label:h(`skillLibrary.team`)}),r.push({value:`all`,label:h(`skillLibrary.all`)},{value:`workspace`,label:h(`skillLibrary.inventory`)})),S`
    <div class="plugins-toolbar">
      ${t}
      <button
        type="button"
        class="btn"
        ?disabled=${!e.canCreate||e.busy}
        @click=${()=>e.create()}
      >
        ${h(`skillLibrary.create`)}
      </button>
      ${e.uploadsEnabled?S`<button
              type="button"
              class="btn"
              ?disabled=${!e.canCreate||e.busy}
              @click=${()=>{e.uploadsEnabled&&(e.importOpen=!0,e.importSource=null,e.changed())}}
            >
              ${h(`skillLibrary.import`)}
            </button>`:C}
    </div>
    ${r.length>0||!e.showWorkspace?S`<div class="plugins-toolbar">
            ${r.length>0?ze({value:e.view??`workspace`,ariaLabel:h(`skillLibrary.library`),options:r,onChange:t=>{e.view=t,e.changed()}}):C}
            ${e.showWorkspace?C:S`<button
                    type="button"
                    class="btn"
                    ?disabled=${e.loading||e.busy}
                    @click=${()=>void e.load()}
                  >
                    ${h(`common.refresh`)}
                  </button>`}
          </div>`:C}
  `}function Vt(){return(Vt=e((()=>{w(),N(),y()})))()}function Ht(e){return M({kind:e?`ok`:`muted`,label:h(e?`skillsPage.enabled`:`skillsPage.disabled`)})}function q(e,t){let n=e.clawhub;return n?.valid?t[xt({registry:n.registry,slug:n.slug,ownerHandle:n.ownerHandle,version:n.installedVersion})]??null:null}function Ut(e,t){let n=`clawhub`in e&&e.clawhub?.status===`invalid`?e.clawhub.reason:null,r=`eligible`in e?F(e):!e.disabled,i=t&&(!t.ok||t.decision!==`pass`),a=i&&t.securityStatus===`malicious`,o=n||a?`danger`:i?`warn`:e.disabled?`muted`:r?`ok`:`warn`,s=h(i?a?`skillsPage.verdict.blocked`:`skillsPage.verdict.review`:n?`skillsPage.invalidLink`:e.disabled?`skillsPage.tabs.disabled`:r?`eligible`in e?`skillsPage.tabs.ready`:`skillsPage.enabled`:`skillsPage.tabs.needsSetup`),c=`missing`in e?[...nt(e),...ot(e)]:[h(`skillDiscovery.libraryStatus`)],l=[s,n,...i?t.reasons??[]:[],...c].filter(Boolean).join(` · `);return S`<span
    class="plugin-catalog-card__status settings-status settings-status--${o}"
    role="img"
    tabindex="0"
    aria-label=${l}
    title=${l}
  >
    <span class="settings-status__dot" aria-hidden="true"></span>
  </span>`}function J(){return(J=e((()=>{w(),N(),y(),A(),it(),K(),k()})))()}function Wt(e,t){let n=e.list,r=e.query.toLowerCase().trim(),i=(n?.entries??[]).filter(t=>(e.view===`mine`?t.ownerProfileId===n?.profileId:e.view!==`team`||t.shared||t.ownerProfileId===null)&&(!r||`${t.slug} ${t.name} ${t.description} ${t.ownerLabel}`.toLowerCase().includes(r)));return S`
    ${Bt(e,t)}
    ${n?.defaultTarget===`unavailable`?S`<p class="muted">${h(`skillLibrary.signIn`)}</p>`:C}
    ${Gt(e)}
    ${n&&!e.showWorkspace?S`<p class="muted">
              ${h(`skillLibrary.defaultLimit`,{count:String(n.defaultSelectionLimit)})}
            </p>
            ${n.defaultSelectionNotice?S`<p class="callout" role="status">${n.defaultSelectionNotice}</p>`:C}`:C}
    ${e.showWorkspace?C:S`
            <label class="field"
              ><span>${h(`common.search`)}</span
              ><input
                class="settings-input"
                name="library-search"
                .value=${e.query}
                placeholder=${h(`skillLibrary.search`)}
                @input=${t=>{e.query=P(t,HTMLInputElement).value,e.changed()}}
            /></label>
            ${e.loading?S`<p role="status">${h(`common.loading`)}</p>`:je({title:h(`skillLibrary.${e.view}`),count:i.length},i.length===0?Ve(h(`skillLibrary.empty`)):T(i,e=>e.skillId,t=>S` <div class="settings-row">
                            <button
                              type="button"
                              class="settings-row__text plugins-item__detail-button"
                              ?disabled=${e.loading||e.busy}
                              @click=${()=>void e.open(t.skillId)}
                            >
                              <span class="settings-row__title">${t.slug}</span>
                              <span class="settings-row__desc">${t.description}</span>
                              <span class="settings-row__desc"
                                >${t.ownerLabel} ·
                                ${t.shared?h(`skillLibrary.shared`):h(`skillLibrary.private`)}
                                · ${t.revision.slice(0,8)}</span
                              >
                            </button>
                            <div class="settings-row__control">
                              ${Ht(t.enabled)}
                            </div>
                          </div>`))}
          `}
    ${X(e)}
  `}function Y(e,t=null){return S`
    ${e?S`<div class="callout danger" role="alert">${e}</div>`:C}
    ${t?S`<div class="callout success" role="status">${t}</div>`:C}
  `}function Gt(e){return Y(!e.draft&&!e.importOpen?e.error:null,e.draft?null:e.notice)}function Kt(e){let t=e.draft;if(!t)return C;let n=t.proposal!==null,r=!e.canEdit||e.busy||e.loading||n,i=t.importedFiles&&!e.uploadsEnabled,a=t.files.find(e=>e.path===t.selectedFile),o=t.selectedFile===`SKILL.md`?t.content:a?Qe(a):null,s=n=>{r||(t.selectedFile===`SKILL.md`?t.content=n:t.files=t.files.map(e=>e.path===t.selectedFile?{...e,content:n,encoding:`utf8`}:e),t.dirty=!0,e.changed())},c=r||t.dirty,l=(t,n=c)=>S`<button
      type="button"
      class=${t===`remove`?`btn danger`:`btn`}
      ?disabled=${n}
      @click=${()=>void e.mutate(t)}
    >
      ${h(`skillLibrary.${t}`)}
    </button>`;return S` <openclaw-modal-dialog
    label=${t.entry?.slug??h(`skillLibrary.create`)}
    style="--openclaw-modal-width: 960px;"
    @modal-cancel=${t=>{t.preventDefault(),e.close()}}
  >
    <form
      class="exec-approval-card skill-reader-dialog"
      @submit=${t=>{t.preventDefault(),e.save()}}
      @keydown=${e=>{(e.ctrlKey||e.metaKey)&&e.key===`Enter`&&!r&&(e.preventDefault(),P(e,HTMLFormElement).requestSubmit())}}
    >
      ${Ge(t.entry?.slug??h(`skillLibrary.create`),()=>e.close(),e.busy)}
      <div
        class="skill-reader-dialog__body"
        style="display: grid; gap: var(--space-4); min-width: 0;"
      >
        <p class="muted">
          ${t.target===`workspace`?h(`skillLibrary.workspaceTarget`,{agent:t.agentId??``}):t.entry?h(`skillLibrary.ownerRevision`,{owner:t.entry.ownerLabel,revision:t.entry.revision.slice(0,8)}):h(`skillLibrary.personalTarget`)}
        </p>
        ${t.entry?We(t.entry):C}
        ${e.canEdit?C:S`<p role="status">${h(`skillLibrary.readOnly`)}</p>`}
        <label class="field"
          ><span>${h(`skillLibrary.slug`)}</span
          ><input
            class="settings-input"
            name="library-slug"
            title=${h(`skillLibrary.slugHelp`)}
            required
            pattern="[a-z0-9][a-z0-9\\-]{0,62}"
            maxlength="63"
            ?disabled=${r}
            .value=${ve(t.slug)}
            @input=${n=>{t.slug=P(n,HTMLInputElement).value,t.dirty=!0,e.changed()}}
        /></label>
        ${t.target===`workspace`?S`<label class="field"
                ><span>${h(`skillLibrary.description`)}</span
                ><input
                  class="settings-input"
                  name="library-description"
                  required
                  ?disabled=${r}
                  .value=${t.description}
                  @input=${n=>{t.description=P(n,HTMLInputElement).value,t.dirty=!0,e.changed()}}
              /></label>`:C}
        <div class="plugins-toolbar">
          <label class="field" style="min-width: 0; flex: 1;"
            ><span>${h(`skillLibrary.file`)}</span
            ><select
              class="settings-select"
              aria-label=${h(`skillLibrary.file`)}
              .value=${t.selectedFile}
              @change=${n=>{t.selectedFile=P(n,HTMLSelectElement).value,e.changed()}}
            >
              <option value="SKILL.md" ?selected=${t.selectedFile===`SKILL.md`}>
                SKILL.md
              </option>
              ${t.files.map(e=>S`<option value=${e.path} ?selected=${t.selectedFile===e.path}>
                    ${e.path}${e.executable?` *`:``}
                  </option>`)}
            </select></label
          >
          ${a&&e.canEdit?S`<button
                  type="button"
                  class="btn"
                  ?disabled=${r}
                  @click=${()=>{window.confirm(h(`skillLibrary.deleteFileConfirm`,{path:a.path}))&&(t.files=t.files.filter(e=>e.path!==a.path),t.selectedFile=`SKILL.md`,t.dirty=!0,e.changed())}}
                >
                  ${h(`skillLibrary.deleteFile`)}
                </button>`:C}
        </div>
        ${a&&e.canEdit?S`<label class="field checkbox"
                ><input
                  type="checkbox"
                  name="library-file-executable"
                  ?disabled=${r}
                  .checked=${a.executable===!0}
                  @change=${n=>{let r=P(n,HTMLInputElement).checked;t.files=t.files.map(e=>e.path===a.path?{...e,executable:r}:e),t.dirty=!0,e.changed()}}
                /><span>${h(`skillLibrary.executable`)}</span></label
              >`:C}
        ${o===null?S`<p class="muted">${h(`skillLibrary.binary`)}</p>`:S`<label class="field"
                ><span>${t.selectedFile}</span
                ><textarea
                  name="library-content"
                  class="settings-input"
                  spellcheck="false"
                  rows="18"
                  style="font-family: var(--mono); min-width: 0; max-width: 100%; box-sizing: border-box; resize: vertical;"
                  ?readonly=${r}
                  .value=${ve(o)}
                  @input=${e=>s(P(e,HTMLTextAreaElement).value)}
                ></textarea>
              </label>`}
        ${r?C:S`<div class="plugins-toolbar">
                <label class="field" style="flex: 1; min-width: 0;"
                  ><span>${h(`skillLibrary.newFile`)}</span
                  ><input
                    class="settings-input"
                    name="library-file-path"
                    .value=${e.newFilePath}
                    @input=${t=>{e.newFilePath=P(t,HTMLInputElement).value,e.changed()}} /></label
                ><button
                  type="button"
                  class="btn"
                  ?disabled=${!e.newFilePath.trim()}
                  @click=${()=>{let n=e.newFilePath.trim();n===`SKILL.md`||t.files.some(e=>e.path===n)?e.error=h(`skillLibrary.fileExists`):(t.files=[...t.files,{path:n,content:``,encoding:`utf8`}],t.selectedFile=n,t.dirty=!0,e.newFilePath=``),e.changed()}}
                >
                  ${h(`skillLibrary.addFile`)}
                </button>
              </div>`}
        ${Y(e.error,e.notice)}
        <div class="plugins-toolbar">
          ${e.canEdit?n?S`<button
                    type="button"
                    class="btn primary"
                    ?disabled=${e.busy}
                    @click=${()=>void e.applyWorkspace()}
                  >
                    ${h(`skillLibrary.apply`)}
                  </button>`:S`<button
                    type="submit"
                    class="btn primary"
                    ?disabled=${r||i||!t.dirty||!t.content.trim()}
                  >
                    ${e.busy?h(`common.loading`):t.target===`workspace`?h(`skillLibrary.propose`):h(`skillLibrary.save`)}
                  </button>`:C}
          ${e.canEdit&&t.entry?S`
                  ${l(t.entry.enabled?`disable`:`enable`)}
                  ${t.entry.ownerProfileId?l(t.entry.shared?`unshare`:`share`):C}
                `:C}
        </div>
        ${e.canEdit&&t.entry&&t.revisions.length>1?S`<div class="plugins-toolbar">
                <label class="field" style="flex: 1; min-width: 0;"
                  ><span>${h(`skillLibrary.revision`)}</span
                  ><select
                    class="settings-select"
                    aria-label=${h(`skillLibrary.revision`)}
                    .value=${t.rollbackRevision}
                    ?disabled=${c}
                    @change=${n=>{t.rollbackRevision=P(n,HTMLSelectElement).value,e.changed()}}
                  >
                    <option value="" ?selected=${t.rollbackRevision===``}>
                      ${h(`skillLibrary.selectRevision`)}
                    </option>
                    ${t.revisions.filter(e=>e.revision!==t.entry?.revision).map(e=>S`<option
                            value=${e.revision}
                            ?selected=${t.rollbackRevision===e.revision}
                          >
                            ${new Date(e.createdAt).toLocaleString()} ·
                            ${e.revision.slice(0,8)}
                          </option>`)}
                  </select></label
                >${l(`rollback`,c||!t.rollbackRevision)}
              </div>`:C}
        ${e.canEdit&&t.entry?S`<div
                class="plugins-toolbar"
                style="border-top: 1px solid var(--border); padding-top: var(--space-4);"
              >
                ${e.canTransfer&&t.entry.ownerProfileId?l(`transfer`):C}
                ${l(`remove`)}
              </div>`:C}
      </div>
    </form>
  </openclaw-modal-dialog>`}function qt(e){if(!e.importOpen)return C;let t=e.importSelection,n=t.length?h(t.length===1?`skillLibrary.selectedFile`:`skillLibrary.selectedFiles`,{count:String(t.length),names:t.slice(0,2).map(e=>e.webkitRelativePath||e.name).join(`, `)+(t.length>2?`, …`:``)}):h(`skillLibrary.noFilesSelected`),r=()=>e.close();return S`<openclaw-modal-dialog
    label=${h(`skillLibrary.import`)}
    @modal-cancel=${e=>{e.preventDefault(),r()}}
  >
    <form
      class="exec-approval-card skill-reader-dialog"
      @submit=${t=>{t.preventDefault(),e.importSource?e.importClawHub(e.importSlug,e.importSource.slug,e.importSource.version):e.importFiles(e.importSelection)}}
    >
      ${Ge(h(`skillLibrary.import`),r,e.busy)}
      <div class="skill-reader-dialog__body skill-library-import">
        ${!e.importSource&&!e.uploadsEnabled?S`<p role="status">${g()}</p>`:C}
        <p class="muted">
          ${e.importSource?h(`skillLibrary.importClawHub`,{source:e.importSource.slug}):e.createTarget===`workspace`?h(`skillLibrary.importWorkspace`):h(`skillLibrary.importHelp`)}
        </p>
        <label class="field"
          ><span>${h(`skillLibrary.slug`)}</span
          ><input
            class="settings-input"
            required
            name="library-import-slug"
            title=${h(`skillLibrary.slugHelp`)}
            pattern="[a-z0-9][a-z0-9\\-]{0,62}"
            .value=${e.importSlug}
            ?disabled=${e.busy}
            @input=${t=>{e.importSlug=P(t,HTMLInputElement).value,e.changed()}}
        /></label>
        ${!e.importSource&&e.uploadsEnabled?S`<div class="field" role="group" aria-labelledby="library-import-files-label">
                <span id="library-import-files-label">${h(`skillLibrary.files`)}</span>
                <small id="library-import-files-help" class="settings-row__desc">
                  ${h(e.createTarget===`workspace`?`skillLibrary.workspaceFilesHelp`:`skillLibrary.filesHelp`)}
                </small>
                <div class="plugins-toolbar skill-library-import__pickers">
                  ${[!1,!0].map(t=>S`
                      <button
                        type="button"
                        class="btn"
                        aria-describedby="library-import-files-help library-import-selection"
                        ?disabled=${e.busy}
                        @click=${t=>{if(!e.uploadsEnabled)return;let n=P(t,HTMLButtonElement).nextElementSibling;n instanceof HTMLInputElement&&n.click()}}
                      >
                        ${h(t?`skillLibrary.chooseFolderButton`:`skillLibrary.chooseFilesButton`)}
                      </button>
                      <input
                        type="file"
                        hidden
                        ?webkitdirectory=${t}
                        multiple
                        name=${t?`library-import-directory`:`library-import-files`}
                        ?disabled=${e.busy}
                        @change=${t=>{let n=P(t,HTMLInputElement);e.importSelection=e.uploadsEnabled?Array.from(n.files??[]):[],n.value=``,e.changed()}}
                      />
                    `)}
                </div>
                <div class="plugins-toolbar">
                  <small
                    id="library-import-selection"
                    class="settings-row__desc"
                    aria-live="polite"
                  >
                    ${n}
                  </small>
                  ${t.length?S`<button
                          type="button"
                          class="btn btn--sm btn--ghost"
                          ?disabled=${e.busy}
                          @click=${()=>{e.importSelection=[],e.changed()}}
                        >
                          ${h(`skillLibrary.clearSelection`)}
                        </button>`:C}
                </div>
              </div>`:C}
        ${Y(e.error)}
        <button
          type="submit"
          class="btn primary"
          ?disabled=${e.busy||!e.importSource&&(!e.uploadsEnabled||t.length===0)}
        >
          ${e.busy?h(`common.loading`):h(`skillLibrary.import`)}
        </button>
      </div>
    </form>
  </openclaw-modal-dialog>`}var X;function Jt(){return(Jt=e((()=>{w(),ge(),D(),N(),se(),y(),p(),Ke(),Ye(),Vt(),J(),X=e=>S`${Kt(e)} ${qt(e)}`})))()}function Z(e){let t=e.clawhub;return t?.valid?t.requestedReference??(t.ownerHandle?`@${t.ownerHandle}/${t.slug}`:null):null}function Yt(e){let t=e.libraries.filter(e=>!e.removed).map(t=>({id:`library:${t.skillId}`,name:t.slug,description:t.description,attribution:t.ownerLabel,library:t,skill:e.skills.find(e=>e.source===`openclaw-library`&&e.name===t.name)})),n=new Set(e.libraries.map(e=>e.name));for(let r of e.skills)r.source===`openclaw-library`&&n.has(r.name)||t.push({id:`local:${r.skillKey}`,name:r.name,description:r.description,attribution:Z(r)??r.source,skill:r});let r=new Set;for(let n of e.results){let e=ht(n),i=`${n.registry}\n${e}`;if(r.has(i))continue;r.add(i);let a=t.find(t=>t.skill?.clawhub?.valid&&t.skill.clawhub.registry===n.registry&&Z(t.skill)===e);a?a.remote=n:t.push({id:`remote:${e}`,name:n.displayName,description:n.summary??``,attribution:e,remote:n})}let i=e.query.trim().toLowerCase();return t.filter(e=>e.remote||!i||`${e.name} ${e.description} ${e.attribution}`.toLowerCase().includes(i))}function Xt(){return(Xt=e((()=>{})))()}function Zt(e,t){let{state:n}=t,r=e.remote,i=r?ht(r):``,a=!!(e.skill||e.library),o=a||!r?.installOnly,s=r?.icon?n.clawhubIconUrls?.[r.icon]:void 0,c=n.skillOperation?.kind===`clawhub`&&n.skillOperation.ref===i;return S`<article
    class="plugin-catalog-card oc-card oc-card-interactive"
    data-skill-id=${e.id}
  >
    ${o?S`<button
            type="button"
            class="plugin-catalog-card__primary-link skill-discovery-card__open"
            aria-label=${h(`skillsPage.openDetails`,{name:e.name})}
            @click=${()=>e.library?t.onLibraryOpen?.(e.library.skillId):e.skill?t.onDetailOpen(e.skill.skillKey):t.onClawHubDetailOpen(i)}
          ></button>`:C}
    <div class="plugin-catalog-card__head">
      <div class="installed-plugins-card__head">
        <span class="installed-plugins-card__art plugin-catalog-card__art" aria-hidden="true">
          ${s?S`<img src=${s} alt="" loading="lazy" />`:e.skill?.emoji??b.bookOpenText}
        </span>
        <div class="installed-plugins-card__identity">
          <div class="plugin-card-title-row"><h2>${e.name}</h2></div>
          <span class="plugin-card-author">${e.attribution}</span>
        </div>
      </div>
      <div class="plugin-catalog-card__action">
        ${a?Ut(e.skill??{disabled:!e.library.enabled},e.skill?q(e.skill,n.clawhubVerdicts):null):S`<button
                type="button"
                class="btn btn--sm plugin-catalog-card__install oc-action oc-action-secondary"
                ?disabled=${!n.connected||!t.canInstall||t.loading||n.skillOperation!==null}
                aria-label=${h(`skillsPage.installNamed`,{name:e.name})}
                @click=${()=>t.onClawHubInstall(i)}
              >
                ${h(c?`skillsPage.installing`:`skillsPage.install`)}
              </button>`}
      </div>
    </div>
    ${Ze(e.description)}
    ${r?.trustState?S`<span class="muted skill-discovery-card__notice">${h(`skillsPage.notScannedByClawHub`)}</span>`:C}
  </article>`}function Qt(e){let{state:t}=e,n=Yt({skills:t.skillsReport?.skills??[],libraries:e.libraryEntries??[],results:t.clawhubSearchResults??[],query:t.clawhubSearchQuery});return S`<section
    class="plugin-catalog-results skill-discovery"
    aria-label=${h(`skillsPage.title`)}
  >
    <label class="plugin-catalog-search">
      <span aria-hidden="true">${b.search}</span>
      <input
        type="search"
        class="settings-input"
        name="skills-search"
        autocomplete="off"
        autofocus
        aria-label=${h(`skillDiscovery.search`)}
        placeholder=${h(`skillDiscovery.search`)}
        .value=${t.clawhubSearchQuery}
        @input=${t=>{e.onClawHubQueryChange(t.currentTarget.value)}}
        ${me(e=>{e instanceof HTMLInputElement&&!e.dataset.autofocused&&(e.dataset.autofocused=`true`,queueMicrotask(()=>{e.isConnected&&e.focus({preventScroll:!0})}))})}
      />
    </label>
    ${e.error?S`<div class="callout danger" role="alert">${e.error}</div>`:C}
    ${t.connected?C:S`<p role="status" class="muted">${h(`skillsPage.disconnected`)}</p>`}
    ${t.clawhubSearchError?S`<div class="callout danger" role="alert">
            ${t.clawhubSearchError}
            <button
              type="button"
              class="btn btn--sm"
              @click=${()=>e.onClawHubQueryChange(t.clawhubSearchQuery)}
            >
              ${h(`common.retry`)}
            </button>
          </div>`:C}
    ${t.clawhubInstallMessage?S`<div
            role=${t.clawhubInstallMessage.kind===`error`?`alert`:`status`}
            class="callout ${t.clawhubInstallMessage.kind===`error`?`danger`:`success`}"
          >
            ${t.clawhubInstallMessage.text}
          </div>`:C}
    <div
      class="plugin-catalog-grid plugin-catalog-grid--results"
      aria-busy=${e.loading||t.clawhubSearchLoading}
    >
      ${T(n,e=>e.id,t=>Zt(t,e))}
    </div>
    ${n.length===0&&!e.loading&&!t.clawhubSearchLoading&&t.connected&&!t.clawhubSearchError?S`<p class="muted" role="status">${h(`skillsPage.empty`)}</p>`:C}
  </section>`}function $t(){return($t=e((()=>{w(),he(),D(),x(),y(),A(),Ue(),Xt(),J(),k()})))()}function en(e){return e.disabled?`disabled`:F(e)?`ready`:`needs-setup`}function tn(e,t){if(!e)return t?{label:h(`skillsPage.refreshing`),kind:`muted`,chipClass:`chip`}:{label:h(`skillsPage.verdict.unavailable`),kind:`warn`,chipClass:`chip-warn`};let n=e.securityStatus?.trim()||null;return e.ok&&e.decision===`pass`?{label:n===`clean`||!n?h(`skillsPage.verdict.clean`):n,kind:`ok`,chipClass:`chip-ok`}:n===`pending`||n===`not-run`?{label:h(`skillsPage.verdict.pending`),kind:`muted`,chipClass:`chip`}:{label:h(n===`malicious`?`skillsPage.verdict.blocked`:n===`suspicious`?`skillsPage.verdict.review`:`skillsPage.verdict.unavailable`),kind:`warn`,chipClass:`chip-warn`}}function Q(e){return e.loading||e.state.skillOperation!==null}function nn(e){return Q(e)||!e.canInstall}function rn(e){let{state:t}=e,n=t.skillsReport?.skills??[],r={all:n.length,ready:0,"needs-setup":0,disabled:0};for(let e of n)r[en(e)]++;let a=t.skillsStatusFilter===`all`?n:n.filter(e=>en(e)===t.skillsStatusFilter),o=i(t.skillsFilter),s=o?a.filter(e=>i([e.name,e.description,e.source].join(` `)).includes(o)):a,c=rt(s),l=t.skillsDetailKey?n.find(e=>e.skillKey===t.skillsDetailKey)??null:null;return S`
    ${Pe(e.surface===`discovery`?S` ${Qt(e)} ${e.library??C} `:S`
            ${e.library??C}
            ${e.showInventory===!1?C:on(e,r,s.length)}
            ${e.error?S`<div class="callout danger" role="alert">${e.error}</div>`:C}
            ${e.showInventory===!1?C:s.length===0?Ve(!t.connected&&!t.skillsReport?h(`skillsPage.disconnected`):h(`skillsPage.empty`)):T(c,e=>e.id,t=>an(t,e))}
          `,{wide:!0,carapace:e.surface===`discovery`})}
    ${l?ln(l,e):C}
    ${t.clawhubDetailRef?sn(e):C}
  `}function an(e,t){return S`
    <details class="settings-section skills-group" open>
      <summary class="settings-section__header skills-group__summary">
        <h2 class="settings-section__heading">
          ${e.label} <span class="settings-count">${e.skills.length}</span>
        </h2>
        <span class="skills-group__chevron" aria-hidden="true">${b.chevronRight}</span>
      </summary>
      <div class="settings-group">
        ${T(e.skills,e=>e.skillKey,e=>cn(e,t))}
      </div>
    </details>
  `}function on(e,t,n){return S` <div class="plugins-toolbar plugins-toolbar--fields">
    ${ze({value:e.state.skillsStatusFilter,ariaLabel:h(`skillsPage.title`),options:fn.map(e=>({value:e.id,label:S`${h(e.labelKey)} <span class="settings-count">${t[e.id]}</span>`})),onChange:e.onStatusFilterChange})}
    <label class="plugins-field skills-toolbar__search">
      <span>${h(`common.search`)}</span>
      <input
        class="settings-input"
        .value=${e.state.skillsFilter}
        @input=${t=>e.onFilterChange(t.target.value)}
        placeholder=${h(`skillsPage.filterPlaceholder`)}
        autocomplete="off"
        name="skills-filter"
      />
    </label>
    <span class="plugins-toolbar__hint"
      >${h(`skillsPage.shown`,{count:String(n)})}</span
    >
    <button
      type="button"
      class="btn"
      ?disabled=${Q(e)||!e.state.connected}
      @click=${e.onRefresh}
    >
      ${e.loading?h(`common.loading`):h(`common.refresh`)}
    </button>
  </div>`}function sn(e){let{state:t}=e,n=t.clawhubDetail,r=n?.skill?.icon?t.clawhubIconUrls?.[n.skill.icon]:void 0,i=r||!n?.owner?.image?void 0:t.clawhubIconUrls?.[n.owner.image],a=r??i;return S`
    <openclaw-modal-dialog
      label=${n?.skill?.displayName??t.clawhubDetailRef??h(`skillsPage.notFound`)}
      style="--openclaw-modal-width: min(1040px, calc(100vw - 32px));"
      @modal-cancel=${e.onClawHubDetailClose}
    >
      <div class="exec-approval-card skill-reader-dialog">
        <div class="exec-approval-header">
          <div class="clawhub-skill-detail__identity">
            ${a?S`<img
                    class="clawhub-skill-icon clawhub-skill-icon--detail ${i?`clawhub-skill-icon--profile`:``}"
                    src=${a}
                    alt=""
                  />`:C}
            <div class="exec-approval-title">
              ${n?.skill?.displayName??t.clawhubDetailRef}
            </div>
          </div>
          <button
            type="button"
            class="btn btn--icon btn--ghost"
            aria-label=${h(`skillsPage.close`)}
            @click=${e.onClawHubDetailClose}
          >
            ${b.x}
          </button>
        </div>
        <div class="skill-reader-dialog__body clawhub-skill-detail__body">
          ${t.clawhubDetailLoading?S`<div class="muted" role="status">${h(`common.loading`)}</div>`:t.clawhubDetailError?S`<div class="callout danger skill-reader-dialog__error" role="alert">
                    <span aria-hidden="true">${b.alertTriangle}</span>
                    <span>${t.clawhubDetailError}</span>
                  </div>`:n?.skill?S`
                      <div>${n.skill.summary??``}</div>
                      ${n.owner?.displayName||n.latestVersion?S`<div
                              class="clawhub-skill-detail__meta muted"
                              style="letter-spacing: normal;"
                            >
                              ${n.owner?.displayName?S`${h(`skillsPage.by`)}
                                    ${n.owner.displayName}${n.owner.handle?S` (@${n.owner.handle})`:C}`:C}
                              ${n.owner?.displayName&&n.latestVersion?` · `:C}
                              ${n.latestVersion?h(`skillsPage.latest`,{version:n.latestVersion.version}):C}
                            </div>`:C}
                      ${n.latestVersion?.changelog?S`<article class="clawhub-skill-detail__changelog sidebar-markdown">
                              ${ye(Le(n.latestVersion.changelog,{codeBlockChrome:`none`,mode:`document`}))}
                            </article>`:C}
                      ${n.metadata?.os?S`<div class="clawhub-skill-detail__meta muted">
                              ${h(`skillsPage.platforms`,{platforms:n.metadata.os.join(`, `)})}
                            </div>`:C}
                      <div class="exec-approval-actions" style="margin-top: 0;">
                        <button
                          class="btn primary"
                          ?disabled=${nn(e)}
                          @click=${()=>{t.clawhubDetailRef&&e.onClawHubInstall(t.clawhubDetailRef)}}
                        >
                          ${t.skillOperation?.kind===`clawhub`&&t.skillOperation.ref===(t.clawhubDetailRef??``)?h(`skillsPage.installing`):e.showInventory===!1?h(`skillLibrary.import`):h(`skillsPage.installNamed`,{name:n.skill.displayName})}
                        </button>
                      </div>
                    `:S`<div class="muted" role="status">${h(`skillsPage.notFound`)}</div>`}
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function cn(e,t){let n=q(e,t.state.clawhubVerdicts);return S`
    <div class="settings-row plugins-item plugins-item--clickable">
      <button
        type="button"
        class="settings-row__text plugins-item__detail-button"
        aria-label=${h(`skillsPage.openDetails`,{name:e.name})}
        @click=${()=>t.onDetailOpen(e.skillKey)}
      >
        <span class="settings-row__title">
          ${e.emoji?S`<span>${e.emoji}</span> `:C}${e.name}
        </span>
        <span class="settings-row__desc">${c(e.description,140)}</span>
      </button>
      <div class="settings-row__control">
        ${Ut(e,n)}
        ${e.clawhub?.status===`linked`?M(tn(n,t.state.clawhubVerdictsLoading)):e.clawhub?.status===`invalid`?M({kind:`warn`,label:h(`skillsPage.invalidLink`)}):C}
      </div>
    </div>
  `}function ln(e,t){let{state:n}=t,r=Q(t)||!t.canUpdate,i=nn(t),a=n.skillOperation?.kind===`skill`&&n.skillOperation.skillKey===e.skillKey,o=m(e.homepage??``,window.location.href),s=n.skillEdits[e.skillKey]??``,c=n.skillMessages[e.skillKey]??null,l=new Set([...e.missing.bins,...e.missing.anyBins]),d=e.install.find(e=>e.bins.some(e=>l.has(e))),ee=e.bundled&&e.source!==`openclaw-bundled`,f=ot(e),p=nt(e),te=q(e,n.clawhubVerdicts),g=n.skillsDetailTab===`card`&&e.skillCard?.present?`card`:`overview`;return S`
    <openclaw-modal-dialog
      label=${e.name}
      style="--openclaw-modal-width: min(1040px, calc(100vw - 32px));"
      @modal-cancel=${t.onDetailClose}
    >
      <div class="exec-approval-card skill-reader-dialog">
        <div class="exec-approval-header">
          <div class="exec-approval-title" style="display: flex; align-items: center; gap: 8px;">
            <span
              class="statusDot ${e.disabled?`muted`:F(e)?`ok`:`warn`}"
            ></span>
            ${e.emoji?S`<span style="font-size: 18px;">${e.emoji}</span>`:C}
            <span>${e.name}</span>
          </div>
          <button
            type="button"
            class="btn btn--icon btn--ghost"
            aria-label=${h(`skillsPage.close`)}
            @click=${t.onDetailClose}
          >
            ${b.x}
          </button>
        </div>
        <div class="skill-reader-dialog__body" style="display: grid; gap: var(--space-4);">
          <div>
            <div style="font-size: 14px; line-height: 1.5; color: var(--text);">
              ${e.description}
            </div>
            ${tt({skill:e,showBundledBadge:ee})}
          </div>

          ${e.clawhub||e.skillCard?.present?S`
                  ${Ie({id:`skill-detail`,active:g,tabs:[{value:`overview`,label:h(`skillsPage.overview`)},...e.skillCard?.present?[{value:`card`,label:h(`skillsPage.skillCard`)}]:[]],ariaLabel:e.name,panelId:`skill-detail-panel`,variant:`sub`,onSelect:t.onDetailTabChange})}
                `:C}
          <div
            id="skill-detail-panel"
            role=${e.clawhub||e.skillCard?.present?`tabpanel`:C}
            aria-labelledby=${e.clawhub||e.skillCard?.present?`skill-detail-tab-${g}`:C}
          >
            ${g===`overview`?un(e,t,te):dn(e,t)}
          </div>
          ${f.length>0?S`
                  <div
                    class="callout"
                    style="border-color: var(--warn-subtle); background: var(--warn-subtle); color: var(--warn);"
                  >
                    <div style="font-weight: 600; margin-bottom: 4px;">
                      ${h(`skillsPage.missingRequirements`)}
                    </div>
                    <div>${f.join(`, `)}</div>
                  </div>
                `:C}
          ${p.length>0?S`
                  <div class="muted" style="font-size: 13px;">
                    ${h(`skillsPage.reason`,{reasons:p.join(`, `)})}
                  </div>
                `:C}

          <div style="display: flex; align-items: center; gap: 12px;">
            ${Fe({checked:!e.disabled,disabled:r,ariaLabel:e.name,onChange:()=>t.onToggle(e.skillKey,e.disabled)})}
            <span style="font-size: 13px; font-weight: 500;">
              ${e.disabled?h(`skillsPage.disabled`):h(`skillsPage.enabled`)}
            </span>
            ${d?S`<button
                    class="btn"
                    ?disabled=${i}
                    @click=${()=>t.onInstall(e.skillKey,e.name,d.id)}
                  >
                    ${a?h(`skillsPage.installing`):d.label}
                  </button>`:C}
          </div>

          ${c?S`<div
                  class="callout ${c.kind===`error`?`danger`:`success`}"
                  role=${c.kind===`error`?`alert`:`status`}
                >
                  ${u(c.message)}
                </div>`:C}
          ${e.primaryEnv?S`
                  <div style="display: grid; gap: 8px;">
                    <label class="field">
                      <span
                        >${h(`skillsPage.apiKey`)}
                        <span class="muted" style="font-weight: normal; font-size: 0.88em;"
                          >(${e.primaryEnv})</span
                        ></span
                      >
                      <input
                        type="password"
                        required
                        ?disabled=${r}
                        .value=${s}
                        @input=${n=>t.onEdit(e.skillKey,n.target.value)}
                      />
                    </label>
                    ${o?S`<div class="muted" style="font-size: 13px;">
                            ${h(`skillsPage.getKey`)}
                            <a href="${o}" target="_blank" rel="noopener noreferrer"
                              >${e.homepage}</a
                            >
                          </div>`:C}
                    <button
                      class="btn primary"
                      ?disabled=${r||!s.trim()}
                      @click=${()=>t.onSaveKey(e.skillKey)}
                    >
                      ${h(`skillsPage.saveKey`)}
                    </button>
                  </div>
                `:C}

          <div
            style="border-top: 1px solid var(--border); padding-top: 12px; display: grid; gap: 6px; font-size: 12px; color: var(--muted);"
          >
            <div>
              <span style="font-weight: 600;">${h(`skillsPage.source`)}</span> ${e.source}
            </div>
            <div style="font-family: var(--mono); word-break: break-all;">${e.filePath}</div>
            ${o?S`<div>
                    <a href="${o}" target="_blank" rel="noopener noreferrer"
                      >${e.homepage}</a
                    >
                  </div>`:C}
          </div>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function un(e,t,n){let r=e.clawhub;if(!r)return C;if(r.status===`invalid`)return S`<div class="callout danger">
      <div style="font-weight: 600; margin-bottom: 4px;">${h(`skillsPage.invalidLink`)}</div>
      <div>${u(r.reason)}</div>
    </div>`;let i=m(n?.securityAuditUrl??``,window.location.href),a=n?.reasons?.length?u(n.reasons.join(`, `)):null,o=tn(n,t.state.clawhubVerdictsLoading),s=`${r.ownerHandle?`@${r.ownerHandle}/`:``}${r.slug}@${r.installedVersion}`;return S`
    <div
      class="callout"
      style="display: grid; gap: 8px; border-color: var(--border); background: var(--panel-strong);"
    >
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span class="chip ${o.chipClass}">${o.label}</span>
        <span class="muted" style="font-size: 12px;">${s}</span>
        ${t.state.clawhubVerdictsLoading&&n?S`<span class="muted">${h(`skillsPage.refreshing`)}</span>`:C}
      </div>
      ${t.state.clawhubVerdictsError?S`<div class="muted" style="font-size: 13px;">
              ${t.state.clawhubVerdictsError}
            </div>`:a?S`<div class="muted" style="font-size: 13px;">${a}</div>`:C}
      ${i?S`<div style="font-size: 13px;">
              <a href="${i}" target="_blank" rel="noopener noreferrer"
                >${h(`skillsPage.fullSecurityReport`)}</a
              >
            </div>`:C}
    </div>
  `}function dn(e,t){if(!e.skillCard?.present)return C;let n=t.state.skillCardContents[e.skillKey];if(n===void 0){let n=t.state.skillCardErrors[e.skillKey];return n?S`<div class="callout danger" role="alert">${n}</div>`:S`<div class="muted" role="status" style="font-size: 13px;">
      ${t.state.skillCardLoadingKey===e.skillKey?h(`skillsPage.loadingSkillCard`):h(`skillsPage.skillCardNotLoaded`)}
    </div>`}return S`
    <article
      class="sidebar-markdown"
      style="max-width: 100%; overflow-wrap: anywhere;"
      @click=${Me}
    >
      ${ye(Le(n))}
    </article>
  `}var fn;function pn(){return(pn=e((()=>{w(),D(),be(),Re(),x(),Ae(),se(),Be(),N(),y(),we(),A(),_(),ee(),f(),at(),it(),$t(),J(),k(),Ce(),fn=[{id:`all`,labelKey:`skillsPage.tabs.all`},{id:`ready`,labelKey:`skillsPage.tabs.ready`},{id:`needs-setup`,labelKey:`skillsPage.tabs.needsSetup`},{id:`disabled`,labelKey:`skillsPage.tabs.disabled`}]})))()}var $;function mn(){return(mn=e((()=>{t(),De(),w(),_e(),de(),pe(),x(),N(),et(),y(),_(),Se(),K(),Ee(),ne(),te(),Je(),ut(),st(),zt(),Jt(),pn(),$=class extends ie{constructor(...e){super(...e),this.surface=`settings`,this.skillsAgentId=null,this.skillsAgentRevision=0,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillOperation=null,this.skillsFilter=``,this.skillsStatusFilter=`all`,this.skillEdits={},this.skillMessages={},this.skillsDetailKey=null,this.skillsDetailTab=`overview`,this.clawhubSearchQuery=``,this.clawhubDetail=null,this.clawhubDetailRef=null,this.clawhubDetailLoading=!1,this.clawhubDetailError=null,this.clawhubInstallMessage=null,this.clawhubVerdicts={},this.clawhubVerdictsLoading=!1,this.clawhubVerdictsError=null,this.skillCardContents={},this.skillCardContentKeys={},this.skillCardLoadingKey=null,this.skillCardErrors={},this.clawhubIconUrls={},this.clawhubSearchTimer=null,this.routeDataInitialized=!1,this.routeDataEnabled=!0,this.debouncedClawHubSearchQuery=``,this.gateway=new Te(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetLoadedSkillState(),ensureInitialData:()=>this.ensureInitialData()}),this.clawhubIcons=new qe({kind:`catalog`,getFetchContext:()=>({resourceBasePath:this.context.resourceBasePath,gatewayUrl:this.context.gateway.connection.gatewayUrl,auth:{hello:this.context.gateway.snapshot.hello,settings:{token:this.context.gateway.connection.token},password:this.context.gateway.connection.password}}),isConnected:()=>this.gateway.connected,onUrlsChange:e=>{this.clawhubIconUrls=e}}),this.library=new Rt(this,this.gateway,()=>this.skillsAgentId,()=>this.refreshPage(),()=>this.context?.config),this.clawhubSearchTask=new Oe(this,{args:()=>[this.gateway.connected&&!this.clawhubSearchTimer&&this.surface===`discovery`?this.gateway.client:null,this.debouncedClawHubSearchQuery,this.gateway.epoch],task:([e,t],{signal:n})=>e?gt(e,t,n):ke}),this.subscriptions=new re(this).watch(()=>this.context?.config,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agents,e=>{let t=e.subscribe(()=>{this.reconcileAgentState(),this.ensureInitialData(),this.requestUpdate()});return this.reconcileAgentState(),this.ensureInitialData(),t}).watch(()=>this.context&&this.agentSelection,(e,t)=>e.subscribe(t),()=>{let e=this.skillsAgentId;this.reconcileAgentState(),this.routeDataInitialized&&e!==this.skillsAgentId&&(this.routeDataEnabled=!1,this.ensureInitialData())})}get runtimeConfig(){return this.context.runtimeConfig}get client(){return this.gateway.client}get connected(){return this.gateway.connected}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.ensureInitialData())}updated(){this.clawhubIcons.syncCatalog([],[...(this.clawhubSearchResults??[]).flatMap(e=>e.icon?[e.icon]:[]),...this.clawhubDetail?.skill?.icon?[this.clawhubDetail.skill.icon]:[],...this.clawhubDetail?.owner?.image?[this.clawhubDetail.owner.image]:[]])}disconnectedCallback(){this.subscriptions.clear(),this.clawhubSearchTimer&&=(clearTimeout(this.clawhubSearchTimer),null),this.clawhubIcons.reset(),super.disconnectedCallback()}get agentSelection(){return this.surface===`settings`?this.context.settingsAgentSelection:this.context.agentSelection}reconcileAgentState(){let e=this.context.agents.state,t=this.skillsAgentId;H(this,this.agentSelection.state.selectedId),this.surface===`discovery`&&e.agentsList&&wt(this,e.agentsList),t!==this.skillsAgentId&&(this.skillsDetailKey=null,this.skillsDetailTab=`overview`,It(this))}resetLoadedSkillState(){this.library.reset(),this.clawhubSearchTask.abort(),this.clawhubSearchTimer&&=(clearTimeout(this.clawhubSearchTimer),null),this.routeDataInitialized&&(this.routeDataEnabled=!1),this.skillsAgentId=null,this.skillsAgentRevision++,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillOperation=null,this.skillEdits={},this.skillMessages={},this.skillsDetailKey=null,this.skillsDetailTab=`overview`,this.debouncedClawHubSearchQuery=this.clawhubSearchQuery.trim(),this.clawhubDetail=null,this.clawhubDetailRef=null,this.clawhubDetailLoading=!1,this.clawhubDetailError=null,this.clawhubInstallMessage=null,this.clawhubVerdicts={},this.clawhubVerdictsLoading=!1,this.clawhubVerdictsError=null,this.skillCardContents={},this.skillCardContentKeys={},this.skillCardLoadingKey=null,this.skillCardErrors={},this.clawhubIcons.reset()}applyRouteData(){let e=this.routeData;if(!e)return;if(this.routeDataInitialized=!0,this.routeDataEnabled=!0,!this.gateway.isRouteDataCurrent(e)||e.agents!==this.context.agents){this.routeDataEnabled=!1;return}let t=this.agentSelection.state;if(this.agentSelection.intentRevision!==e.selectionIntentRevision){this.routeDataEnabled=!1,this.reconcileAgentState();return}if(H(this,e.selectedAgentId),e.selectedAgentId&&t.selectedId!==e.selectedAgentId&&this.agentSelection.set(e.selectedAgentId),this.reconcileAgentState(),this.skillsAgentId!==e.selectedAgentId){this.routeDataEnabled=!1;return}this.routeDataEnabled=!0,this.skillsLoading=!1,this.skillsReport=e.report,this.skillsError=e.error,e.report&&kt(this,e.report),e.clawhubRef&&e.clawhubRef!==this.clawhubDetailRef&&Ft(this,e.clawhubRef)}ensureInitialData(){if(this.library&&!this.library.list&&!this.library.loading&&!this.library.error&&this.library.load(),this.routeDataEnabled||!this.routeDataInitialized||!this.gateway.connected||!this.gateway.client)return;let e=this.context.agents.state;if(!e.agentsList){e.agentsLoading||this.loadAgents();return}this.reconcileAgentState(),!this.skillsReport&&!this.skillsLoading&&U(this)}async loadAgents(){if(!this.gateway.client||!this.gateway.connected)return;let e=this.context.agents;e.state.agentsList||await e.ensureList(),this.context.agents===e&&(this.reconcileAgentState(),this.ensureInitialData())}async refreshPage(){await Promise.all([Et(this,()=>this.loadAgents()),this.library.load()])}changeClawHubQuery(e){this.clawhubSearchQuery=e,this.clawhubInstallMessage=null,this.clawhubSearchTimer&&clearTimeout(this.clawhubSearchTimer),this.clawhubSearchTimer=setTimeout(()=>{this.clawhubSearchTimer=null,this.debouncedClawHubSearchQuery=e.trim(),this.requestUpdate()},300),this.requestUpdate()}get clawhubSearchResults(){return this.clawhubSearchTask.status===j.COMPLETE&&this.debouncedClawHubSearchQuery===this.clawhubSearchQuery.trim()?this.clawhubSearchTask.value??null:null}get clawhubSearchLoading(){return this.clawhubSearchTimer!==null||this.clawhubSearchTask.status===j.PENDING}get clawhubSearchError(){if(this.clawhubSearchTask.status!==j.ERROR||this.debouncedClawHubSearchQuery!==this.clawhubSearchQuery.trim())return null;let e=this.clawhubSearchTask.error;return l(e)}changeDetailTab(e){this.skillsDetailTab=e,e===`card`&&this.skillsDetailKey&&Ot(this,this.skillsDetailKey)}canUpdateSkills(){return O(this.context?.gateway?.snapshot,`skills.update`,`operator.admin`)}canInstallSkills(){return O(this.context?.gateway?.snapshot,`skills.install`,`operator.admin`)}canInstallFromClawHub(){return this.library.list!==null&&!this.library.loading&&(this.library.showWorkspace?this.canInstallSkills():this.library.canWrite&&!!this.library.list.profileId)}selectHubTab(e){e!==`skills`&&this.context.navigate(e)}render(){let e=this.context.agents.state,t=this.skillsError??e.agentsError;return S`
      ${this.surface===`discovery`?ct({active:`skills`,onSelect:e=>this.selectHubTab(e),secondaryAction:{label:h(`skillDiscovery.settings`),icon:b.settings,onClick:()=>this.context.navigate(`skill-settings`,{search:this.skillsAgentId?`?agent=${encodeURIComponent(this.skillsAgentId)}`:``})}}):Ne({title:ce(`skill-settings`),subtitle:ue(`skill-settings`)})}
      ${$e(S`
        <div
          id=${this.surface===`discovery`?lt:C}
          role=${this.surface===`discovery`?`tabpanel`:C}
          aria-labelledby=${this.surface===`discovery`?`plugins-tab-skills`:C}
        >
          ${rn({state:this,surface:this.surface,libraryEntries:this.library.list?.entries??[],onLibraryOpen:e=>void this.library.open(e),library:this.surface===`discovery`?S`
                    ${Gt(this.library)}
                    ${X(this.library)}
                  `:Wt(this.library,S`
                      <button
                        type="button"
                        class="btn"
                        @click=${()=>this.context.navigate(`skills`,{search:this.skillsAgentId?`?agent=${encodeURIComponent(this.skillsAgentId)}`:``})}
                      >
                        ${b.search} ${h(`skillDiscovery.search`)}
                      </button>
                      <button
                        type="button"
                        class="btn"
                        @click=${()=>this.context.navigate(`skill-workshop`)}
                      >
                        ${h(`pluginsPage.workshopTab`)}
                      </button>
                    `),showInventory:this.library.showWorkspace,canUpdate:this.canUpdateSkills(),canInstall:this.canInstallFromClawHub(),loading:this.skillsLoading||e.agentsLoading||this.library.busy,error:t,onFilterChange:e=>this.skillsFilter=e,onStatusFilterChange:e=>this.skillsStatusFilter=e,onRefresh:()=>void this.refreshPage(),onToggle:(e,t)=>{this.canUpdateSkills()&&jt(this,e,t,()=>this.canUpdateSkills())},onEdit:(e,t)=>{this.canUpdateSkills()&&At(this,e,t)},onSaveKey:e=>{this.canUpdateSkills()&&Nt(this,e,()=>this.canUpdateSkills())},onInstall:(e,t,n)=>{this.canInstallSkills()&&Pt(this,e,t,n)},onDetailOpen:e=>{this.skillsDetailKey=e,this.skillsDetailTab=`overview`},onDetailClose:()=>this.skillsDetailKey=null,onDetailTabChange:e=>this.changeDetailTab(e),onClawHubQueryChange:e=>this.changeClawHubQuery(e),onClawHubDetailOpen:e=>void Ft(this,e),onClawHubDetailClose:()=>It(this),onClawHubInstall:(e,t)=>{this.canInstallFromClawHub()&&(this.library.showWorkspace?Lt(this,e,t):(this.clawhubDetailRef=null,this.library.importSource={slug:e,version:t},this.library.importSlug=``,this.library.importOpen=!0,this.requestUpdate()))}})}
        </div>
      `)}
    `}},o([s({context:fe,subscribe:!0})],$.prototype,`context`,void 0),o([xe({attribute:!1})],$.prototype,`routeData`,void 0),o([xe({attribute:!1})],$.prototype,`surface`,void 0),o([E()],$.prototype,`skillsAgentId`,void 0),o([E()],$.prototype,`skillsAgentRevision`,void 0),o([E()],$.prototype,`skillsLoading`,void 0),o([E()],$.prototype,`skillsReport`,void 0),o([E()],$.prototype,`skillsError`,void 0),o([E()],$.prototype,`skillOperation`,void 0),o([E()],$.prototype,`skillsFilter`,void 0),o([E()],$.prototype,`skillsStatusFilter`,void 0),o([E()],$.prototype,`skillEdits`,void 0),o([E()],$.prototype,`skillMessages`,void 0),o([E()],$.prototype,`skillsDetailKey`,void 0),o([E()],$.prototype,`skillsDetailTab`,void 0),o([E()],$.prototype,`clawhubSearchQuery`,void 0),o([E()],$.prototype,`clawhubDetail`,void 0),o([E()],$.prototype,`clawhubDetailRef`,void 0),o([E()],$.prototype,`clawhubDetailLoading`,void 0),o([E()],$.prototype,`clawhubDetailError`,void 0),o([E()],$.prototype,`clawhubInstallMessage`,void 0),o([E()],$.prototype,`clawhubVerdicts`,void 0),o([E()],$.prototype,`clawhubVerdictsLoading`,void 0),o([E()],$.prototype,`clawhubVerdictsError`,void 0),o([E()],$.prototype,`skillCardContents`,void 0),o([E()],$.prototype,`skillCardContentKeys`,void 0),o([E()],$.prototype,`skillCardLoadingKey`,void 0),o([E()],$.prototype,`skillCardErrors`,void 0),o([E()],$.prototype,`clawhubIconUrls`,void 0),customElements.get(`openclaw-skills-page`)||customElements.define(`openclaw-skills-page`,$)})))()}mn();