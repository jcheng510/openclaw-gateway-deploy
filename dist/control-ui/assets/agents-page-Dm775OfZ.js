import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ar as t,Ba as n,Br as r,Ga as i,Ji as a,Oi as o,Sr as s,Ua as c,Xa as l,eo as u,ii as d,kr as f,qr as p,zr as m}from"./control-ui-foundation-C3MHh_P-.js";import{Ac as h,Bc as g,Bi as _,Gc as v,Gl as y,Hc as ee,Hi as b,Ii as x,Il as S,Jc as C,Ji as w,Kc as T,Kl as E,Mc as te,N as D,Na as O,Nc as k,Ni as A,Ou as j,Pc as M,R as N,Rc as ne,Rl as re,Uc as ie,Ui as ae,Vc as oe,Vi as se,Wc as ce,Wi as le,bu as P,c as ue,cc as de,dl as fe,hr as pe,hu as F,jc as me,l as he,lu as ge,nl as _e,pr as ve,qc as ye,qi as be,ql as I,s as xe,sc as Se,su as Ce,u as L,uu as R,xu as we,zc as Te,zi as Ee}from"./control-ui-core-pYNj5S1a.js";import{$n as De,Br as Oe,Ma as ke,Xi as z,Zi as Ae,co as je,er as Me,fo as Ne,go as Pe,ja as Fe,or as Ie,sr as Le,va as Re,vi as ze,wi as Be,yi as Ve,zr as He}from"./control-ui-core-D6clmJs8.js";import{$ as B,B as Ue,F as We,I as Ge,M as Ke,Q as qe,R as Je,X as V,Y as H,ct as U,g as Ye,i as Xe,m as Ze,nt as Qe,o as $e,p as et,r as tt,t as nt,ut as W}from"./lit-runtime-DZL1fcCI.js";import{c as rt,l as it}from"./gateway-runtime-iOL78mIi.js";import{Aa as at,Ea as ot,Jo as st,Oa as ct,Pa as lt,Va as ut,Wn as dt,Ya as ft,Yo as pt,ct as mt,dt as ht,lt as gt,mt as _t,no as vt,pt as yt,ro as bt,st as xt}from"./control-ui-boot-shared-3Hl8ksFq.js";import{I as St,bt as Ct}from"./control-ui-boot-shared-D-LYw3KU.js";import{$r as wt,At as G,Ba as Tt,Di as Et,Ei as Dt,Hr as Ot,It as kt,Jr as At,Mt as jt,Oi as Mt,Ot as K,Pt as Nt,Qa as Pt,Qr as Ft,Ti as It,Tt as Lt,Ua as Rt,Vr as zt,Yr as Bt,_ as Vt,_t as q,ar as Ht,eo as Ut,g as Wt,ki as Gt,rr as Kt,wi as qt,wt as Jt,xt as J,yt as Yt}from"./control-ui-boot-shared-DJ4XCcp6.js";import{St as Xt}from"./control-ui-boot-shared-TgR3hRAg.js";import{n as Zt,t as Qt}from"./en-settings-DlF4_5vi.js";import"./css-agents-plugins-skill-workshop-skills-DvcafeYi.js";import{n as $t,t as en}from"./settings-workspace-DKW0BVnu.js";import{c as tn,l as nn,o as rn,t as an}from"./github-identity-view-CdBbHmfG.js";import{a as on,c as sn,i as cn,n as ln,o as un,r as dn,s as fn}from"./tool-catalog-DMlGNWJO.js";import{n as pn,t as mn}from"./model-picker-Cr4HKWDk.js";import{n as hn,t as gn}from"./decision-model-picker-BMoJj1QJ.js";import{a as _n,n as vn,o as yn,r as bn,s as xn,t as Sn}from"./skills-shared-DTad9IFK.js";import{n as Cn,t as wn}from"./cron-jobs-pagination-Ct12nXg4.js";import{a as Tn,n as En,r as Dn,s as On,t as kn}from"./presenter-CQuBX6tH.js";function An(e){e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileBaseVersions={},e.agentFileVersions={},e.agentFileConflict=null,e.agentFileDrafts={},e.agentFileWriteRevisions.clear(),e.agentFilesLoading=!1,e.agentFileSaving=!1}function jn(e,t){return Object.hasOwn(e.agentFileContents,t)||Object.hasOwn(e.agentFileDrafts,t)}function Mn(e){let t=Object.entries(e.agentFileDrafts).filter(([t,n])=>n!==e.agentFileContents[t]||e.agentFileConflict===t);return t.length===0?null:{drafts:Object.fromEntries(t),versions:Object.fromEntries(t.flatMap(([t])=>e.agentFileVersions[t]===void 0?[]:[[t,e.agentFileVersions[t]]])),active:e.agentFileActive,conflict:e.agentFileConflict}}function Nn(e,t,n){let r={...e};return n===void 0?delete r[t]:r[t]=n,r}async function Y(e,t,n,r){let i=r.kind===`write`,a=i?`agentFileSaving`:`agentFilesLoading`,o=e.client,s=e.agents;if(!o||!e.connected||e[a]||i&&!jn(e,n))return!1;if(r.kind===`read`&&!r.force&&Object.hasOwn(e.agentFileContents,n))return!0;let c=e.requestGeneration,l=()=>e.client===o&&e.agents===s&&e.connected&&e.requestGeneration===c,u=()=>{e.agentFileWriteRevisions.set(n,(e.agentFileWriteRevisions.get(n)??0)+1)};i&&u();let d=e.agentFileWriteRevisions.get(n),f=()=>l()&&(i||e.agentFileWriteRevisions.get(n)===d),p=e.agentFileVersions[n],m=r.kind===`read`?r.resolution:void 0;e[a]=!0,e.agentFilesError=null;try{let a=await o.request(i?`agents.files.set`:`agents.files.get`,{agentId:t,name:n,...r.kind===`write`?{content:r.content,...p&&(`hash`in p?{expectedHash:p.hash}:{expectedMissing:!0})}:{}});if(a?.file&&f()){let t=r.kind===`write`?r.content:a.file.content??``,o=e.agentFileContents[n],c=e.agentFileDrafts[n],l=a.file.missing?{missing:!0}:a.file.hash?{hash:a.file.hash}:void 0;e.agentFileContents={...e.agentFileContents,[n]:t},e.agentFileBaseVersions=Nn(e.agentFileBaseVersions,n,l);let u=m===`draft`||!Object.hasOwn(e.agentFileDrafts,n)||c===t||!i&&c===o;return u&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:t}),(i||m!==void 0||u)&&(e.agentFileVersions=Nn(e.agentFileVersions,n,l),e.agentFileConflict===n&&(e.agentFileConflict=null)),e.agentFilesError=null,s.recordFile(a),!0}}catch(t){return f()&&(e.agentFilesError=y(t),Pn(t)&&(e.agentFileConflict=n)),!1}finally{l()&&(i&&u(),e[a]=!1)}return!1}function Pn(e){return e instanceof De&&a(e.details)&&e.details.type===`agent_file_conflict`}function Fn(e,t,n,r){return Y(e,t,n,{kind:`read`,force:r?.force})}function In(e,t,n,r){return Y(e,t,n,{kind:`write`,content:r})}function Ln(e,t){Object.hasOwn(e.agentFileContents,t)&&(e.agentFileDrafts={...e.agentFileDrafts,[t]:e.agentFileContents[t]??``},e.agentFileVersions=Nn(e.agentFileVersions,t,e.agentFileBaseVersions[t]),e.agentFileConflict===t&&(e.agentFileConflict=null,e.agentFilesError=null))}function Rn(e,t,n){return Y(e,t,n,{kind:`read`,force:!0,resolution:`draft`})}async function zn(e,t,n,r){let i=e.client,a=e.agents,o=e.requestGeneration;return!await Y(e,t,n,{kind:`read`,force:!0,resolution:`hash`})||!e.connected||e.client!==i||e.agents!==a||e.requestGeneration!==o?!1:await Y(e,t,n,{kind:`write`,content:r})}function Bn(){return(Bn=e((()=>{Me(),I()})))()}function Vn(e){return e?e.length<=qn?{ok:!0,dataUrl:e}:Xn:Yn}function Hn(e,t){return xe(t),new Promise(t=>{let n=new FileReader;n.addEventListener(`load`,()=>t(Vn(typeof n.result==`string`?n.result:null))),n.addEventListener(`error`,()=>t(Yn)),n.readAsDataURL(e)})}function Un(e,t){return e.startsWith(`data:${t}`)&&e.length<=qn}function Wn(e,t,n){let{data:r}=e.getImageData(0,0,t,n);for(let e=3;e<r.length;e+=4)if(r[e]!==255)return!1;return!0}async function Gn(e,t){if(xe(t),!e.type.startsWith(`image/`)||e.size>2097152)return Yn;try{let n=await createImageBitmap(e);try{let r=document.createElement(`canvas`),i=r.getContext(`2d`);if(!i)return await Hn(e,t);let a=e=>{let t=Math.min(1,e/Math.max(n.width,n.height));r.width=Math.max(1,Math.round(n.width*t)),r.height=Math.max(1,Math.round(n.height*t)),i.clearRect(0,0,r.width,r.height),i.drawImage(n,0,0,r.width,r.height)};a(Kn);let o=r.toDataURL(`image/webp`,.8);if(o.startsWith(`data:image/webp`))return Vn(o);if(Wn(i,r.width,r.height)){let e=r.toDataURL(`image/jpeg`,.85);if(Un(e,`image/jpeg`))return{ok:!0,dataUrl:e}}for(let e of Jn){a(e);let t=r.toDataURL(`image/png`);if(Un(t,`image/png`))return{ok:!0,dataUrl:t}}return Xn}finally{n.close()}}catch{return Hn(e,t)}}var Kn,qn,Jn,Yn,Xn;function Zn(){return(Zn=e((()=>{s(),ue(),Kn=96,qn=16e3,Jn=[Kn,64,48],Yn={ok:!1,reason:`unusable`},Xn={ok:!1,reason:`too-detailed`}})))()}function Qn(e){let t=(X.get(e)??0)+1;return X.set(e,t),t}function $n(e){Qn(e),e.identityDraft={name:null,emoji:null,avatar:null},e.identitySaving=!1,e.identityError=null}function er(e,t,n){e.identityDraft={...e.identityDraft,[t]:n},e.identityError=null}function tr(e,t,n){let r=Qn(e);if(!L(n)){e.identityError=he();return}Gn(t,n).then(t=>{if(X.get(e)===r){if(!L(n)){e.identityError=he();return}t.ok?(e.identityDraft={...e.identityDraft,avatar:t.dataUrl},e.identityError=null):e.identityError=F(ir[t.reason])}}).catch(t=>{X.get(e)===r&&(e.identityError=y(t))})}async function nr(e){let{host:t,expectedClient:n,agentId:r,agents:i,agentIdentity:a,runtimeConfig:o}=e,s=t.identityDraft,c=s.name?.trim(),l=s.emoji?.trim(),u=s.avatar??void 0;if(!(s.name!==null&&!c||s.emoji!==null&&!l)){if(!c&&!l&&!u){$n(t);return}t.identitySaving=!0,t.identityError=null;try{u&&xe(e.config);let s=await o.runExternalMutation(t=>{if(t!==n)throw Error(`Connection changed before the agent identity update started.`);return u&&xe(e.config),ae(t,{agentId:r,name:c,emoji:l,avatar:u})},{canDispatch:e.canDispatch,dispatchError:`Access changed before the agent identity update started.`});if(!s.ok)throw Error(s.error);let d=s.refresh.ok?[]:[s.refresh.error];a.invalidate([r]);try{await i.refreshList()}catch(e){d.push(`Agent identity was saved, but the agent list refresh failed: ${y(e)}`)}try{await a.ensure([r])}catch(e){d.push(`Agent identity was saved, but the identity refresh failed: ${y(e)}`)}e.isCurrent()&&($n(t),e.onSaved(),t.identityError=d.length>0?d.join(` `):null)}catch(n){e.isCurrent()&&(t.identityError=y(n))}finally{e.isCurrent()&&(t.identitySaving=!1)}}}function rr(e,t){let n=e.snapshot.pinnedAgentIds,r=n.includes(t)?n.filter(e=>e!==t):[...n,t];e.update({pinnedAgentIds:r})}var ir,X;function ar(){return(ar=e((()=>{R(),Ee(),I(),ue(),Zn(),ir={unusable:`agents.identity.imageUnusable`,"too-detailed":`agents.identity.imageTooDetailed`},X=new WeakMap})))()}function or(e){return{onModelChange:(t,n)=>{e.canUpdate(t)&&(ur(e.getRuntimeConfig(),t,n),e.onPrimaryChanged())},onDecisionModelChange:(t,n)=>{e.canUpdate(t)&&sr(e.getRuntimeConfig(),t,n)},onModelFallbacksChange:(t,n)=>{e.canUpdate(t)&&dr(e.getRuntimeConfig(),t,n)}}}function sr(e,t,n){let r=e.agentEntry(t,{ensure:n!==null});if(!r)return;let i=[...r.path,`decisionModel`];n===null?e.removeFormValue(i):e.patchForm(i,n)}function cr(e,t,n,r){n&&r?e.patchForm(t,{primary:n,fallbacks:r}):n?e.patchForm(t,n):r?e.patchForm(t,{fallbacks:r}):e.removeFormValue(t)}function lr(e){if(typeof e==`string`)return{primary:e.trim()||null,fallbacks:null};if(e&&typeof e==`object`){let t=e;return{primary:typeof t.primary==`string`&&t.primary.trim()||null,fallbacks:Array.isArray(t.fallbacks)?t.fallbacks:null}}return{primary:null,fallbacks:null}}function ur(e,t,n){let r=e.agentEntry(t,{ensure:!!n});r&&cr(e,[...r.path,`model`],n,lr(r.entry.model).fallbacks)}function dr(e,t,n){let r=e.agentEntry(t,{ensure:!0});r&&cr(e,[...r.path,`model`],lr(r.entry.model).primary,i(n))}function fr(){return(fr=e((()=>{n()})))()}function pr(e,t,n){let r=t?.canonicalLocation;if(!r)return``;let i=`${t.location.pathname}${t.location.search}${t.location.hash}`;return n!==i&&e.replace(`agents`,r),i}function mr(e,t,n,r){n!==t&&e.navigate(`agents`,{pathname:Ne(t,r===`overview`?null:r,e.basePath)})}function hr(e,t,n,r){t&&r!==n&&e.navigate(`agents`,{pathname:Ne(t,r,e.basePath)})}function gr(){return(gr=e((()=>{je(),j()})))()}async function _r(e,t){let n=e.client;if(!n||!e.connected||e.agentSkillsLoading)return;let r=e.requestGeneration,i=()=>e.client===n&&e.connected&&e.requestGeneration===r;e.agentSkillsLoading=!0,e.agentSkillsError=null;try{let r=await O(n,t);r&&i()&&(e.agentSkillsReport=r,e.agentSkillsAgentId=t)}catch(t){i()&&(e.agentSkillsError=y(t))}finally{i()&&(e.agentSkillsLoading=!1)}}async function vr(e,t,n=()=>!0){let r=e.agentEntry(t);if(!r||!Array.isArray(r.entry.skills)||!n())return!1;let i=r.path[2];return typeof i==`string`&&e.patch({raw:{agents:{entries:{[i]:{skills:null}}}},note:`Reset agent skills to inherited defaults`,replacePaths:[`agents.entries.${i}.skills`],canDispatch:n})}function yr(){return(yr=e((()=>{I()})))()}function br(e){let t=e.trim();return t?t.split(/\s+/).length:0}function xr(e){return e.length===0?0:e.split(/\r?\n/).length}function Sr(e){return e<=0?F(`agents.files.emptyDraft`):F(`agents.files.minRead`,{count:String(Math.max(1,Math.round(e/220)))})}function Cr(e,t){if(!(e instanceof HTMLElement))return;let n=F(t?`agents.files.collapsePreview`:`agents.files.expandPreview`);e.classList.toggle(`is-fullscreen`,t),e.setAttribute(`aria-pressed`,String(t)),e.setAttribute(`aria-label`,n),e.closest(`openclaw-tooltip`)?.setAttribute(`content`,n)}function wr(e){e.querySelector(`.md-preview-dialog__panel`)?.classList.remove(`fullscreen`),Cr(e.querySelector(`.md-preview-expand-btn`),!1),e.classList.remove(`fullscreen`)}function Tr(){return(Tr=e((()=>{R()})))()}var Er,Dr;function Or(){return(Or=e((()=>{H(),Ye(),Ue(),Oe(),Er=class extends Ge{constructor(...e){super(...e),this.show=e=>{e.target===this.modal&&this.isConnected&&this.content&&this.setValue(this.content())}}render(e,t){return qe}update(e,[t,n]){if(!this.modal){let t=e.parentNode;if(!(t instanceof He))throw Error(`Agent file preview must be a modal child`);this.modal=t,t.addEventListener(`wa-show`,this.show)}let r=!this.scope||t.some((e,t)=>e!==this.scope?.[t]);return this.scope=t,this.content=n,r||this.modal.isConnected&&this.modal.open?n():qe}disconnected(){this.modal?.removeEventListener(`wa-show`,this.show)}reconnected(){this.modal?.addEventListener(`wa-show`,this.show)}},Dr=Je(Er)})))()}function kr(e){let t=e.conflictName;return t?B`<div class="callout danger">
    <span>${e.error??F(`agents.files.conflictHint`)}</span>
    <div class="agent-file-actions">
      <button
        class="btn btn--sm"
        type="button"
        ?disabled=${e.busy}
        @click=${()=>e.onReload(t)}
      >
        ${F(`common.reload`)}
      </button>
      <button
        class="btn btn--sm"
        type="button"
        ?disabled=${e.busy||!e.canWrite}
        @click=${()=>e.onOverwrite(t)}
      >
        ${F(`agents.files.overwrite`)}
      </button>
    </div>
  </div>`:e.error?B`<div class="callout danger">${e.error}</div>`:V}function Ar(){return(Ar=e((()=>{H(),R()})))()}function jr(e){let t=e.split(`.`).pop()?.trim().toLowerCase();return t===`md`||t===`markdown`?F(`agents.files.markdownPreview`):t?F(`agents.files.extensionPreview`,{ext:t.toUpperCase()}):F(`agents.files.preview`)}function Mr(e,t){let n=e.trim(),r=t?.trim();if(!n)return``;if(r&&n===r)return`.`;if(r&&n.startsWith(`${r}/`))return n.slice(r.length+1)||`.`;let i=n.split(/[\\/]+/);for(let e=i.length-1;e>=0;--e){let t=i[e];if(t)return t}return n}function Nr(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`preview`}function Pr(e){let t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],r=e.agentFileActive??null,i=e=>e.missing&&e.expectedAbsent===!0&&e.name!==r,a=n.filter(e=>!i(e)),o=n.filter(i),s=r?n.find(e=>e.name===r)??null:null,c=r&&e.agentFileConflict===r?r:null,l=s?.missing&&!c,u=r?jn(e,r):!1,d=r?Object.hasOwn(e.agentFileContents,r):!1,f=r?e.agentFileContents[r]??``:``,p=r?e.agentFileDrafts[r]??f:``,m=u&&(!d||p!==f);return B`
    ${kr({error:e.agentFilesError,conflictName:c,busy:e.agentFilesLoading||e.agentFileSaving,canWrite:e.canWrite,onReload:e.onFileReload,onOverwrite:e.onFileOverwrite})}
    ${G({title:F(`agents.files.coreFilesTitle`),description:t?B`${F(`agents.files.coreFilesSubtitle`)} ${F(`agents.files.workspace`)}:
              <code>${t.workspace}</code>`:F(`agents.files.coreFilesSubtitle`),actions:B`
          <button
            class="btn btn--sm"
            ?disabled=${e.agentFilesLoading}
            @click=${()=>e.onLoadFiles(e.agentId)}
          >
            ${e.agentFilesLoading?F(`common.loading`):F(`common.refresh`)}
          </button>
        `},t?n.length===0?J(F(`agents.files.empty`)):B`
              <div class="agents-panel-body">
                <div class="agent-file-tabs">
                  ${Vt({id:`agent-files`,active:r,tabs:a.map(t=>({value:t.name,label:t.name.replace(/\.md$/i,``),badge:t.missing&&t.expectedAbsent!==!0&&t.name!==c?F(`agents.files.missing`):void 0,disabled:e.agentFilesLoading})),ariaLabel:F(`agents.files.coreFilesTitle`),panelId:`agent-file-panel`,variant:`sub`,onSelect:e.onSelectFile})}
                  ${o.length===0?V:B`
                          <select
                            class="agent-tab-add"
                            aria-label=${F(`agents.files.addFile`)}
                            .value=${``}
                            ?disabled=${e.agentFilesLoading}
                            @change=${t=>{let n=t.currentTarget;if(!(n instanceof HTMLSelectElement))return;let r=n.value;n.value=``,r&&e.onSelectFile(r)}}
                          >
                            <option value="">${F(`agents.files.addFile`)}</option>
                            ${o.map(e=>B`<option value=${e.name}>
                                  ${e.name.replace(/\.md$/i,``)}
                                </option>`)}
                          </select>
                        `}
                </div>
                <div
                  id="agent-file-panel"
                  role="tabpanel"
                  aria-labelledby=${r?`agent-files-tab-${r}`:V}
                >
                  ${s?B`
                          <div class="agent-file-header">
                            <div>
                              <div class="agent-file-sub mono">${s.path}</div>
                            </div>
                            <div class="agent-file-actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${!u}
                                @click=${e=>{let t=e.currentTarget;t instanceof HTMLElement&&t.closest(`.settings-group`)?.querySelector(`openclaw-modal-dialog`)?.show()}}
                              >
                                ${z.eye} ${F(`agents.files.preview`)}
                              </button>
                              <button
                                class="btn btn--sm"
                                ?disabled=${!e.canWrite||!d||!m}
                                @click=${()=>e.onFileReset(s.name)}
                              >
                                ${F(`common.reset`)}
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${!e.canWrite||!u||e.agentFileSaving||!m}
                                @click=${()=>e.onFileSave(s.name)}
                              >
                                ${e.agentFileSaving?F(`common.saving`):F(`common.save`)}
                              </button>
                            </div>
                          </div>
                          ${l?B`<div class="callout info">
                                  ${s.expectedAbsent===!0?F(`agents.files.createHint`):F(`agents.files.missingHint`)}
                                </div>`:V}
                          <label class="field agent-file-field">
                            <span>${F(`agents.files.content`)}</span>
                            <textarea
                              class="agent-file-textarea"
                              ?disabled=${!e.canWrite||!u}
                              placeholder=${u?V:e.agentFilesLoading?F(`common.loading`):F(`agents.files.loadHint`)}
                              .value=${p}
                              @input=${t=>{t.currentTarget instanceof HTMLTextAreaElement&&e.onFileDraftChange(s.name,t.currentTarget.value)}}
                            ></textarea>
                          </label>
                          <openclaw-modal-dialog
                            class="agent-file-preview"
                            manual
                            label=${s.name}
                            style="--openclaw-modal-width: min(1040px, calc(100vw - 32px));"
                            @modal-cancel=${e=>{e.currentTarget instanceof HTMLElement&&wr(e.currentTarget)}}
                          >
                            ${Dr([e.agentId,s.name,u],()=>{let e=s?Ht(p,{codeBlockChrome:`none`,mode:`document`}):``,n=k(new TextEncoder().encode(p).length),r=br(p),i=xr(p),a=s?Mr(s.path,t?.workspace):``,o=s?`agent-file-preview-title-${Nr(s.name)}`:``,u=F(l?`agents.files.willCreateOnSave`:m||c?`agents.files.liveDraftPreview`:`agents.files.savedPreview`),d=l?`is-missing`:m||c?`is-dirty`:`is-synced`,f=s?.updatedAtMs?F(`agents.files.updated`,{time:D(s.updatedAtMs)}):F(l?`agents.files.notCreatedYet`:`agents.files.updatedUnknown`);return B`<div class="md-preview-dialog__panel">
                                  <div class="md-preview-dialog__header">
                                    <div class="md-preview-dialog__header-main">
                                      <div class="md-preview-dialog__eyebrow">
                                        ${z.scrollText}
                                        <span>${jr(s.name)}</span>
                                      </div>
                                      <div class="md-preview-dialog__title-wrap">
                                        <div
                                          id=${o}
                                          class="md-preview-dialog__title"
                                          translate="no"
                                        >
                                          ${s.name}
                                        </div>
                                        <div class="md-preview-dialog__path mono" translate="no">
                                          ${a}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="md-preview-dialog__actions">
                                      <openclaw-tooltip .content=${F(`agents.files.expandPreview`)}>
                                        <button
                                          type="button"
                                          class="btn btn--sm md-preview-icon-btn md-preview-expand-btn"
                                          aria-label=${F(`agents.files.expandPreview`)}
                                          aria-pressed="false"
                                          @click=${e=>{let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=t.closest(`.md-preview-dialog__panel`);if(!n)return;let r=n.classList.toggle(`fullscreen`);t.closest(`openclaw-modal-dialog`)?.classList.toggle(`fullscreen`,r),Cr(t,r)}}
                                        >
                                          <span class="when-normal" aria-hidden="true"
                                            >${z.maximize}</span
                                          ><span class="when-fullscreen" aria-hidden="true"
                                            >${z.minimize}</span
                                          >
                                        </button>
                                      </openclaw-tooltip>
                                      <openclaw-tooltip .content=${F(`agents.files.editFile`)}>
                                        <button
                                          type="button"
                                          class="btn btn--sm md-preview-icon-btn"
                                          aria-label=${F(`agents.files.editFile`)}
                                          @click=${e=>{let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=t.closest(`openclaw-modal-dialog`),r=n?.closest(`.settings-group`)?.querySelector(`.agent-file-textarea`);n?.setReturnFocusTarget(r??null),n?.hide(),n&&wr(n)}}
                                        >
                                          <span aria-hidden="true">${z.edit}</span>
                                        </button>
                                      </openclaw-tooltip>
                                      <openclaw-tooltip .content=${F(`agents.files.closePreview`)}>
                                        <button
                                          type="button"
                                          class="btn btn--sm md-preview-icon-btn"
                                          aria-label=${F(`agents.files.closePreview`)}
                                          @click=${e=>{let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=t.closest(`openclaw-modal-dialog`);n?.hide(),n&&wr(n)}}
                                        >
                                          <span aria-hidden="true">${z.x}</span>
                                        </button>
                                      </openclaw-tooltip>
                                    </div>
                                  </div>
                                  <div class="md-preview-dialog__meta">
                                    <div
                                      class="md-preview-dialog__chip ${d}"
                                      data-priority="essential"
                                    >
                                      <strong>${u}</strong>
                                    </div>
                                    <div class="md-preview-dialog__chip" data-priority="essential">
                                      <strong>${Sr(r)}</strong>
                                      <span
                                        >${F(`agents.files.words`,{count:String(r)})}</span
                                      >
                                    </div>
                                    <div class="md-preview-dialog__chip" data-priority="secondary">
                                      <strong>${i}</strong>
                                      <span>${F(`agents.files.lines`)}</span>
                                    </div>
                                    <div class="md-preview-dialog__chip" data-priority="essential">
                                      <strong>${n}</strong>
                                      <span>${f}</span>
                                    </div>
                                  </div>
                                  <div class="md-preview-dialog__body">
                                    <article class="md-preview-dialog__reader sidebar-markdown">
                                      ${tt(e)}
                                    </article>
                                  </div>
                                </div> `})}
                          </openclaw-modal-dialog>
                        `:B`<div class="muted">${F(`agents.files.selectFile`)}</div>`}
                </div>
              </div>
            `:J(F(`agents.files.loadHint`)))}
  `}function Fr(){return(Fr=e((()=>{H(),nt(),Wt(),Ae(),Kt(),Oe(),Be(),q(),R(),M(),N(),Tr(),Or(),Ar(),Bn()})))()}function Ir(){return Rr+=1,`openclaw-multi-select-${Rr}`}function Lr(e){let t=e.indexOf(`/`);return t>0?e.slice(0,t):void 0}var Rr,zr,Z;function Br(){return(Br=e((()=>{St(),d(),n(),H(),Qe(),Xe(),Ke(),R(),ge(),wt(),Ae(),Tt(),At(),Rr=0,zr=e=>e.preventDefault(),Z=class extends Ce{constructor(...e){super(...e),this.options=[],this.value=[],this.isExcluded=()=>!1,this.getValueKey=e=>e,this.placeholder=``,this.accessibleLabel=``,this.allowCustom=!1,this.disabled=!1,this.onChange=()=>{},this.onOpen=()=>{},this.open=!1,this.query=``,this.activeIndex=0,this.listboxId=Ir(),this.field=null,this.input=null,this.setField=e=>{this.field=e instanceof HTMLElement?e:null},this.setInput=e=>{this.input=e instanceof HTMLInputElement?e:null},this.configurePopup=e=>{e instanceof Ct&&this.field&&(Ft(e,this.field,`bottom`),e.sync=`width`)},this.handleFieldClick=e=>{this.disabled||e.target instanceof Element&&e.target.closest(`button`)||(this.input?.focus(),this.openMenu())},this.handleInput=e=>{e.currentTarget instanceof HTMLInputElement&&(this.query=e.currentTarget.value,this.activeIndex=0,this.openMenu())},this.handleKeydown=e=>{if(!(this.disabled||e.isComposing))switch(e.key){case`ArrowDown`:case`ArrowUp`:{if(e.preventDefault(),!this.open){this.openMenu();return}let t=this.rows(),n=t.flatMap((e,t)=>e.disabled?[]:[t]);if(n.length>0){let r=n.indexOf(this.activeRowIndex(t)),i=e.key===`ArrowDown`?1:n.length-1;this.activeIndex=o(n[(r+i)%n.length],`selectable option index`)}return}case`Enter`:{if(!this.open)return;let t=this.rows(),n=t[this.activeRowIndex(t)];n&&(e.preventDefault(),this.selectRow(n));return}case`,`:this.allowCustom&&(e.preventDefault(),this.commitTypedQuery());return;case`Escape`:this.open&&(e.preventDefault(),e.stopPropagation(),this.closeMenu());return;case`Backspace`:!this.query&&this.value.length>0&&(e.preventDefault(),this.removeAt(this.value.length-1))}},this.handleFocusOut=e=>{let t=e.relatedTarget;t instanceof Node&&this.contains(t)||this.closeMenu()}}willUpdate(e){e.has(`disabled`)&&this.disabled&&this.open&&this.closeMenu(),this.open&&(e.has(`options`)||e.has(`value`)||e.has(`isExcluded`)||e.has(`getValueKey`))&&(this.activeIndex=Math.min(this.activeIndex,Math.max(0,this.rows().length-1)))}updated(e){if(!this.open||![`open`,`query`,`activeIndex`,`options`,`value`,`isExcluded`,`getValueKey`].some(t=>e.has(t)))return;let t=this.querySelector(`.multi-select__menu`),n=t?.querySelector(`[aria-selected="true"]`);t&&n&&Bt(t,n)}optionFor(e){let t=this.getValueKey(e);return this.options.find(e=>this.getValueKey(e.value)===t)}rows(){let e=new Set(this.value.map(e=>this.getValueKey(e))),t=this.query.trim(),n=this.getValueKey(t),r=t.toLowerCase(),i=[],a=null;for(let t of this.options){let o=this.getValueKey(t.value);if(e.has(o)||this.isExcluded(t.value))continue;if(o===n){a=t;continue}let s=[t.label,t.value,t.provider,t.detail];(!r||s.some(e=>e?.toLowerCase().includes(r)))&&i.push(t)}return a?i.unshift(a):this.allowCustom&&t&&!e.has(n)&&!this.isExcluded(t)&&i.push({value:t,label:t,provider:Lr(t),custom:!0}),i}openMenu(){this.disabled||this.open||(this.open=!0,this.activeIndex=0,this.onOpen())}activeRowIndex(e){let t=e[this.activeIndex];return t&&!t.disabled?this.activeIndex:e.findIndex(e=>!e.disabled)}closeMenu(){this.open=!1,this.query=``,this.activeIndex=0}commit(e){if(this.disabled)return;let t=new Set(this.value.map(e=>this.getValueKey(e))),n=[];for(let r of e){let e=r.trim(),i=this.getValueKey(e);e&&!t.has(i)&&!this.isExcluded(e)&&!this.optionFor(e)?.disabled&&(t.add(i),n.push(e))}n.length>0&&this.onChange([...this.value,...n]),this.query=``,this.activeIndex=0}commitTypedQuery(){this.commit(c(this.query))}selectRow(e){e.disabled||(e.custom?this.commitTypedQuery():this.commit([e.value]))}removeAt(e){this.disabled||(this.onChange(this.value.filter((t,n)=>n!==e)),this.input?.focus())}renderChip(e,t){let n=this.optionFor(e),r=n?.provider??Lr(e),i=n?.label??e;return B`
      <span class="chip multi-select__chip" data-value=${e} title=${e}>
        ${r?Rt(r,{className:`multi-select__chip-icon`}):V}
        <span class="multi-select__chip-label">${i}</span>
        <button
          type="button"
          class="chip-remove"
          aria-label=${F(`common.multiSelect.remove`,{value:i})}
          ?disabled=${this.disabled}
          @click=${()=>this.removeAt(t)}
        >
          ${z.x}
        </button>
      </span>
    `}render(){let e=this.open?this.rows():[],t=this.activeRowIndex(e),n=this.accessibleLabel||this.placeholder;return B`
      <div
        class=${this.open?`multi-select multi-select--open`:`multi-select`}
        ?data-disabled=${this.disabled}
        @click=${this.handleFieldClick}
        @focusout=${this.handleFocusOut}
        ${We(this.setField)}
      >
        ${this.value.map((e,t)=>this.renderChip(e,t))}
        <input
          ${We(this.setInput)}
          class="multi-select__input"
          type="text"
          role="combobox"
          autocomplete="off"
          spellcheck="false"
          aria-label=${n}
          aria-expanded=${this.open?`true`:`false`}
          aria-controls=${this.listboxId}
          aria-autocomplete="list"
          aria-activedescendant=${t>=0?`${this.listboxId}-${t}`:V}
          placeholder=${this.value.length===0?this.placeholder:``}
          .value=${$e(this.query)}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
          @keydown=${this.handleKeydown}
        />
        <span class="multi-select__chevron" aria-hidden="true">${z.chevronDown}</span>
      </div>
      <wa-popup class="multi-select__popup" ?active=${this.open} ${We(this.configurePopup)}>
        <div class="multi-select__menu" role="listbox" id=${this.listboxId} aria-label=${n}>
          ${e.map((e,n)=>B`
              <div
                class="multi-select__option"
                role="option"
                id=${`${this.listboxId}-${n}`}
                aria-selected=${n===t?`true`:`false`}
                aria-disabled=${e.disabled?`true`:`false`}
                data-value=${e.value}
                ?data-custom=${!!e.custom}
                @mousedown=${zr}
                @mousemove=${()=>{!e.disabled&&this.activeIndex!==n&&(this.activeIndex=n)}}
                @click=${()=>this.selectRow(e)}
              >
                ${e.provider?Rt(e.provider,{className:`multi-select__option-icon`}):V}
                <span class="picker-select__copy">
                  <span class="picker-select__label">
                    ${e.custom?F(`common.multiSelect.addCustom`,{value:e.value}):e.label}
                  </span>
                  ${e.detail?B`<span class="picker-select__description">${e.detail}</span>`:V}
                </span>
              </div>
            `)}
          ${e.length===0?B`<div class="multi-select__empty">${F(`common.multiSelect.noMatches`)}</div>`:V}
        </div>
      </wa-popup>
    `}},p([W({attribute:!1})],Z.prototype,`options`,void 0),p([W({attribute:!1})],Z.prototype,`value`,void 0),p([W({attribute:!1})],Z.prototype,`isExcluded`,void 0),p([W({attribute:!1})],Z.prototype,`getValueKey`,void 0),p([W({attribute:!1})],Z.prototype,`placeholder`,void 0),p([W({attribute:!1})],Z.prototype,`accessibleLabel`,void 0),p([W({attribute:!1})],Z.prototype,`allowCustom`,void 0),p([W({attribute:!1})],Z.prototype,`disabled`,void 0),p([W({attribute:!1})],Z.prototype,`onChange`,void 0),p([W({attribute:!1})],Z.prototype,`onOpen`,void 0),p([U()],Z.prototype,`open`,void 0),p([U()],Z.prototype,`query`,void 0),p([U()],Z.prototype,`activeIndex`,void 0)})))()}function Vr(){return(Vr=e((()=>{Br(),customElements.get(`openclaw-multi-select`)||customElements.define(`openclaw-multi-select`,Z)})))()}function Hr(e){let{agent:n,configForm:r,agentFilesList:i,configLoading:a,configSaving:o,configDirty:s,onConfigReload:c,onConfigSave:l,onModelChange:u,onModelFallbacksChange:d,onSelectPanel:f}=e,p=e.modelCatalogRetired||e.modelSelectionPolicy?.restricted,m=p?null:r,g=p?{...n,model:e.modelSelectionPolicy?.defaultModel?{primary:e.modelSelectionPolicy.defaultModel}:void 0}:n,_=h(g,m,i,e.defaultId,e.agentIdentity),y=_.isDefault,b=Te(m,n.id),x=g.model,S=ce(b.defaults?.model??x),C=v(b.entry?.model),w=v(b.defaults?.model)||(S===`-`?null:ne(S))||(m?null:v(x)),T=C??w??null,E=y?T:C,D=ee(b.entry?.model,b.defaults?.model)??(m?null:ie(x))??[],O=!e.canUpdateConfig||!m||a||o,k=n.thinkingDefault??`-`,A=e.identityDraft,j=A.name??e.agentIdentity?.name??n.identity?.name??n.name??``,M=A.emoji??e.agentIdentity?.emoji??n.identity?.emoji??``,N=A.avatar?null:re(n,e.agentIdentity),ae=A.avatar??(N?e.identityAvatarLoader.resolve(N):null),se=A.name!==null||A.emoji!==null||A.avatar!==null,le=A.name!==null&&!A.name.trim()||A.emoji!==null&&!A.emoji.trim(),P=e.identitySaving||!e.canUpdateIdentity,ue=t=>{let n=t.target,r=n.files?.[0];n.value=``,r&&L(e.applicationConfig)&&e.onIdentityAvatarSelect(r)},de=me(m,null,e.modelCatalog,n.id),fe=te(m,T,n.id);return B`
    ${G({title:F(`agents.identity.title`),description:F(`agents.identity.subtitle`)},B`
        <div class="settings-row settings-row--stacked">
          <div class="agent-identity-editor">
            <span class="agent-identity-editor__avatar" aria-hidden="true">
              ${Ut({id:n.id,avatar:ae,textAvatar:A.emoji??oe(n,e.agentIdentity)},``,N?e.identityAvatarLoader.imageErrorHandler(N):void 0)}
            </span>
            <div class="agent-identity-editor__fields">
              <label class="field">
                <span>${F(`agents.identity.name`)}</span>
                <input
                  type="text"
                  maxlength="64"
                  .value=${j}
                  placeholder=${F(`agents.identity.namePlaceholder`)}
                  ?disabled=${P}
                  @input=${t=>e.onIdentityFieldChange(`name`,t.target.value)}
                />
              </label>
              <label class="field agent-identity-editor__emoji">
                <span>${F(`agents.identity.emoji`)}</span>
                <input
                  type="text"
                  maxlength="8"
                  .value=${M}
                  placeholder="🦞"
                  ?disabled=${P}
                  @input=${t=>e.onIdentityFieldChange(`emoji`,t.target.value)}
                />
              </label>
            </div>
          </div>
          ${e.identityError?B`<div class="settings-row__desc" role="alert" style="color: var(--danger);">
                  ${e.identityError}
                </div>`:V}
          <div class="agent-identity-editor__actions">
            ${L(e.applicationConfig)?B`<button
                      type="button"
                      class="btn btn--sm"
                      ?disabled=${P}
                      @click=${t=>{let n=t.currentTarget,r=n instanceof HTMLButtonElement?n.nextElementSibling:null;L(e.applicationConfig)&&r instanceof HTMLInputElement&&r.click()}}
                    >
                      ${F(ae?`agents.identity.replaceImage`:`agents.identity.chooseImage`)}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ?disabled=${P}
                      @change=${ue}
                    />`:V}
            <button
              type="button"
              class="btn btn--sm primary"
              ?disabled=${P||!se||le||A.avatar!==null&&!L(e.applicationConfig)}
              @click=${()=>e.onIdentitySave()}
            >
              ${e.identitySaving?F(`common.saving`):F(`common.save`)}
            </button>
          </div>
          <div class="settings-row__desc agent-identity-editor__hint">
            ${L(e.applicationConfig)?F(`agents.identity.fileHint`):V}
          </div>
        </div>
      `)}
    ${G({title:F(`agents.overview.title`),description:F(`agents.overview.subtitle`)},B`
        <dl class="settings-kv">
          <dt>${F(`agents.context.workspace`)}</dt>
          <dd>
            <openclaw-tooltip .content=${F(`agents.context.openFilesTab`)}>
              <button
                type="button"
                class="workspace-link mono"
                @click=${()=>f(`files`)}
                aria-label=${F(`agents.context.openFilesTab`)}
              >
                ${_.workspace}
              </button>
            </openclaw-tooltip>
          </dd>
          <dt>${F(`agents.context.primaryModel`)}</dt>
          <dd><code>${_.model}</code></dd>
          <dt>${F(`agents.context.runtime`)}</dt>
          <dd><code>${_.runtime}</code></dd>
          <dt>${F(`agents.context.thinkingDefault`)}</dt>
          <dd><code>${k}</code></dd>
          <dt>${F(`agents.context.skillsFilter`)}</dt>
          <dd>${_.skillsLabel}</dd>
        </dl>
      `)}
    ${s?B`<div class="callout warn">${F(`agents.overview.unsavedConfig`)}</div>`:V}
    ${G({title:F(`agents.overview.modelSelection`),notice:Gt({status:e.modelCatalogStatus}),actions:B`
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${a}
            @click=${c}
          >
            ${F(`common.reloadConfig`)}
          </button>
          <button
            type="button"
            class="btn btn--sm primary"
            ?disabled=${!e.canUpdateConfig||o||!s}
            @click=${l}
          >
            ${F(o?`common.saving`:`common.save`)}
          </button>
        `},B`
        ${K({title:F(y?`agents.overview.primaryModelDefault`:`agents.overview.primaryModel`),control:pn({label:F(y?`agents.overview.primaryModelDefault`:`agents.overview.primaryModel`),value:E??``,options:[{value:``,label:y?F(`agents.overview.notSet`):w?F(`agents.overview.inheritDefaultModel`,{model:w}):F(`agents.overview.inheritDefault`)},...me(m,T??void 0,e.modelCatalog,n.id)],disabled:O,onChange:e=>u(n.id,e||null),onOpen:e.onModelCatalogOpen})})}
        ${K({title:F(`chat.modelControls.decisionLabel`),description:F(`chat.modelControls.decisionAgentHelp`),control:hn({id:`agent-decision-model`,models:e.decisionModels,value:typeof b.entry?.decisionModel==`string`?b.entry.decisionModel:void 0,inherit:{model:typeof b.defaults?.decisionModel==`string`?b.defaults.decisionModel:void 0},disabled:O,onChange:t=>e.onDecisionModelChange(n.id,t),onOpen:e.onModelCatalogOpen})})}
        ${K({title:F(`agents.overview.fallbacks`),stacked:!0,control:B`
            <openclaw-multi-select
              class="agent-fallbacks"
              .options=${de}
              .value=${D}
              .isExcluded=${fe}
              .getValueKey=${t}
              .placeholder=${F(`agents.overview.addFallback`)}
              .accessibleLabel=${F(`agents.overview.fallbacks`)}
              .allowCustom=${!p}
              .disabled=${O}
              .onChange=${e=>d(n.id,e)}
              .onOpen=${e.onModelCatalogOpen}
            ></openclaw-multi-select>
          `})}
      `)}
  `}function Ur(e,t,n){return G({title:F(`agents.context.title`),description:t},B`
      <dl class="settings-kv">
        <dt>${F(`agents.context.workspace`)}</dt>
        <dd>
          <button type="button" class="workspace-link mono" @click=${()=>n(`files`)}>
            ${e.workspace}
          </button>
        </dd>
        <dt>${F(`agents.context.primaryModel`)}</dt>
        <dd><code>${e.model}</code></dd>
        <dt>${F(`agents.context.runtime`)}</dt>
        <dd><code>${e.runtime}</code></dd>
        <dt>${F(`agents.context.identityName`)}</dt>
        <dd>${e.identityName}</dd>
        <dt>${F(`agents.context.identityAvatar`)}</dt>
        <dd>${e.identityAvatar}</dd>
        <dt>${F(`agents.context.skillsFilter`)}</dt>
        <dd>${e.skillsLabel}</dd>
        <dt>${F(`agents.context.default`)}</dt>
        <dd>${e.isDefault?F(`common.yes`):F(`common.no`)}</dd>
      </dl>
    `)}function Wr(){return(Wr=e((()=>{H(),f(),gn(),Pt(),Vr(),mn(),Mt(),Be(),q(),R(),M(),S(),ue()})))()}function Gr(e){let t=e.canUpdateConfig&&!!e.configForm&&!e.configLoading&&!e.configSaving,n=Te(e.configForm,e.agentId),r=Array.isArray(n.entry?.skills)?i(n.entry.skills):void 0,a=g(e.configForm,e.agentId),o=new Set(a??[]),s=a!==void 0,c=r===void 0&&s,l=e.canPatchConfig&&r!==void 0&&!!e.configForm&&!e.configLoading&&!e.configSaving,d=!!(e.report&&e.activeAgentId===e.agentId),f=d?e.report?.skills??[]:[],p=u(e.filter),m=p?f.filter(e=>u([e.name,e.description,e.source].join(` `)).includes(p)):f,h=yn(m),_=s?f.filter(e=>o.has(e.name)).length:f.length,v=f.length;return B`
    ${e.configForm?V:B`<div class="callout info">${F(`agents.skillsPanel.loadConfig`)}</div>`}
    ${s?B`<div class="callout info">
            ${F(c?`agents.skillsPanel.inheritedAllowlist`:`agents.skillsPanel.customAllowlist`)}
          </div>`:B`<div class="callout info">${F(`agents.skillsPanel.allEnabled`)}</div>`}
    ${!d&&!e.loading?B`<div class="callout info">${F(`agents.skillsPanel.loadAgent`)}</div>`:V}
    ${e.error?B`<div class="callout danger">${e.error}</div>`:V}
    ${G({title:F(`agents.skillsPanel.title`),description:B`${F(`agents.skillsPanel.subtitle`)}
        ${v>0?B`<span class="mono">${_}/${v}</span>`:V}`,actions:B`
          <button
            class="btn btn--sm"
            ?disabled=${!t}
            @click=${()=>e.onDisableAll(e.agentId)}
          >
            ${F(`agentTools.disableAll`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!l}
            @click=${()=>e.onClear(e.agentId)}
          >
            ${F(`common.reset`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            ${F(`common.reloadConfig`)}
          </button>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?F(`common.loading`):F(`common.refresh`)}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${!e.canUpdateConfig||e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?F(`common.saving`):F(`common.save`)}
          </button>
        `},B`
        ${K({title:F(`agents.skillsPanel.filter`),description:F(`agents.skillsPanel.shown`,{count:String(m.length)}),control:B`
            <input
              class="settings-input"
              aria-label=${F(`agents.skillsPanel.filter`)}
              .value=${e.filter}
              @input=${t=>{let n=t.currentTarget;n instanceof HTMLInputElement&&e.onFilterChange(n.value)}}
              placeholder=${F(`agents.skillsPanel.searchPlaceholder`)}
              autocomplete="off"
              name="agent-skills-filter"
            />
          `})}
        ${m.length===0?J(F(`agents.skillsPanel.empty`)):B`
                <div class="agents-panel-body agent-skills-groups">
                  ${h.map(n=>Kr(n,{agentId:e.agentId,allowSet:o,usingAllowlist:s,editable:t,filterActive:!!p,onToggle:e.onToggle}))}
                </div>
              `}
      `)}
  `}function Kr(e,t){let n=!t.filterActive&&(e.id===`workspace`||e.id===`built-in`);return B`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(e=>qr(e,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function qr(e,t){let n=!t.usingAllowlist||t.allowSet.has(e.name),r=Sn(e),i=vn(e);return B`
    <div class="settings-row agent-skill-row">
      <div class="settings-row__text">
        <span class="settings-row__title"
          >${e.emoji?`${e.emoji} `:``}${e.name}</span
        >
        <span class="settings-row__desc">${e.description}</span>
        ${_n({skill:e})}
        ${r.length>0?B`<span class="settings-row__desc">
                ${F(`agents.skillsPanel.missing`,{items:r.join(`, `)})}
              </span>`:V}
        ${i.length>0?B`<span class="settings-row__desc">
                ${F(`agents.skillsPanel.reason`,{items:i.join(`, `)})}
              </span>`:V}
      </div>
      <div class="settings-row__control">
        ${Nt({checked:n,disabled:!t.editable,ariaLabel:e.name,onChange:n=>t.onToggle(t.agentId,e.name,n)})}
      </div>
    </div>
  `}function Jr(){return(Jr=e((()=>{n(),H(),q(),R(),Qt(),M(),xn(),bn(),Zt()})))()}function Yr(e,t){let n=e.channelMeta?.find(e=>e.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Xr(e){if(!e)return[];let t=new Set([...e.channelOrder??[],...(e.channelMeta??[]).map(e=>e.id),...Object.keys(e.channelAccounts??{})]);return Array.from(t,t=>({id:t,label:Yr(e,t),accounts:e.channelAccounts?.[t]??[]}))}function Zr(e){let t=0,n=0,r=0;for(let i of e){let e=i.probe&&typeof i.probe==`object`&&`ok`in i.probe?!!i.probe.ok:!1,a=typeof i.connected==`boolean`||typeof i.running==`boolean`;(i.connected===!0||i.running===!0||!a&&e)&&(t+=1),i.configured&&(n+=1),i.enabled&&(r+=1)}return{total:e.length,connected:t,configured:n,enabled:r}}function Qr(e){let t=Xr(e.snapshot),n=e.lastSuccess?D(e.lastSuccess):F(`common.never`);return B`
    ${Ur(e.context,F(`agents.context.configurationSubtitle`),e.onSelectPanel)}
    ${e.error?B`<div class="callout danger">${e.error}</div>`:V}
    ${e.snapshot?V:B`<div class="callout info">${F(`agents.channels.loadHint`)}</div>`}
    ${G({title:F(`agents.channels.title`),description:B`${F(`agents.channels.subtitle`)}
        ${F(`agents.channels.lastRefresh`,{time:n})}`,actions:B`
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?F(`common.refreshing`):F(`common.refresh`)}
          </button>
        `},t.length===0?J(F(`agents.channels.empty`)):t.map(t=>{let n=Zr(t.accounts),r=n.total?F(`agents.channels.connectedCount`,{connected:String(n.connected),total:String(n.total)}):F(`agents.channels.noAccounts`),i=n.configured?F(`agents.channels.configuredCount`,{count:String(n.configured)}):F(`agents.channels.notConfigured`),a=n.total?F(`agents.channels.enabledCount`,{count:String(n.enabled)}):F(`common.disabled`),o=x({configForm:e.configForm,channelId:t.id,fields:ei}),s=[t.id,i,a,...o.map(e=>`${e.label}: ${e.value}`)];return K({title:t.label,description:s.join(` · `),control:B`
                ${n.configured===0?B`
                        <a
                          class="settings-row__value"
                          href="https://docs.openclaw.ai/channels"
                          target="_blank"
                          rel="noopener"
                          >${F(`agents.channels.setupGuide`)}</a
                        >
                      `:V}
                ${jt({kind:n.connected>0?`ok`:n.total?`warn`:`muted`,label:r})}
              `})}))}
  `}function $r(e){return B`
    ${Ur(e.context,F(`agents.context.schedulingSubtitle`),e.onSelectPanel)}
    ${e.error?B`<div class="callout danger">${e.error}</div>`:V}
    ${G({title:F(`agents.cronPanel.schedulerTitle`),description:F(`agents.cronPanel.schedulerSubtitle`),actions:B`
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?F(`common.refreshing`):F(`common.refresh`)}
          </button>
        `},B`
        ${K({title:F(`common.enabled`),control:kt(e.status?e.status.enabled?F(`common.yes`):F(`common.no`):F(`common.na`))})}
        ${K({title:F(`agents.cronPanel.jobs`),control:kt(e.scopedTotal??F(`common.na`))})}
        ${K({title:F(`agents.cronPanel.nextWake`),control:kt(Tn(e.status?.enabled===!1?null:e.scopedNextWakeAtMs))})}
      `)}
    ${G({title:F(`agents.cronPanel.agentJobsTitle`),description:F(`agents.cronPanel.agentJobsSubtitle`)},e.jobs.length===0?J(F(`agents.cronPanel.noJobs`)):B`
            ${e.jobs.map(t=>{let n=[t.description,En(t),t.sessionTarget,Dn(t),kn(t)].filter(Boolean);return K({title:t.name,description:n.join(` · `),control:B`
                  ${jt({kind:t.enabled?`ok`:`warn`,label:t.enabled?F(`common.enabled`):F(`common.disabled`)})}
                  <a
                    class="btn btn--sm"
                    href=${`${Pe(`cron`,e.basePath)}?job=${encodeURIComponent(t.id)}`}
                    aria-label=${F(`agents.cronPanel.editJob`,{name:t.name})}
                  >
                    ${F(`agents.cronPanel.edit`)}
                  </a>
                  <button
                    class="btn btn--sm"
                    ?disabled=${!e.canRunNow}
                    @click=${()=>e.onRunNow(t.id)}
                  >
                    ${F(`agents.cronPanel.runNow`)}
                  </button>
                `})})}
            ${Cn({jobsShown:e.jobs.length,jobsTotal:e.jobsTotal,hasMore:e.jobsHasMore,loading:e.loading,loadingMore:e.jobsLoadingMore,onLoadMore:e.onLoadMore})}
          `)}
  `}var ei;function ti(){return(ti=e((()=>{H(),je(),wn(),q(),R(),A(),N(),On(),Wr(),ei=[`groupPolicy`,`streamMode`,`dmPolicy`]})))()}function ni(e){let t=e.normalize(e.raw);return t?t===`*`?{kind:`all`}:t.includes(`*`)?{kind:`regex`,value:RegExp(`^${Xt(t).replaceAll(`\\*`,`.*`)}$`)}:{kind:`exact`,value:t}:{kind:`exact`,value:``}}function ri(e){return Array.isArray(e.raw)?e.raw.map(t=>ni({raw:t,normalize:e.normalize})).filter(e=>e.kind!==`exact`||e.value):[]}function ii(e,t){for(let n of t)if(n.kind===`all`||n.kind===`exact`&&e===n.value||n.kind===`regex`&&n.value.test(e))return!0;return!1}function ai(){return(ai=e((()=>{})))()}function oi(e){return e[ui]}function Q(e){let t=u(e);return li.get(t)??t}function si(e){return e?e.map(Q).filter(Boolean):[]}function ci(e){let t=si(e),n=[];for(let e of t){let t=Object.hasOwn(di,e)?di[e]:void 0;if(t){n.push(...t);continue}n.push(e)}return l(n)}var li,ui,di;function fi(){return(fi=e((()=>{n(),un(),li=new Map([[`bash`,`exec`],[`apply-patch`,`apply_patch`],[`cron`,`automations`]]),ui=Symbol.for(`openclaw.toolAllowlistIntersection`),di={...on}})))()}function pi(e,t=!0){if(!e)return()=>!0;let n=e.allow&&oi(e.allow);if(n){let r=n.map(n=>n.length>0?pi({...e,allow:n},t):()=>!1);return e=>r.every(t=>t(e))}let r=ri({raw:ci(e.deny??[]),normalize:Q}),i=ri({raw:ci(e.allow??[]),normalize:Q});return e=>{let n=Q(e);return!ii(n,r)&&!!(i.length===0||ii(n,i)||t&&n===`apply_patch`&&ii(`write`,i))}}function mi(e,t=!0){let n=(e===void 0?[]:oi(e)??[e]).map(e=>e.length>0?pi({allow:e},t):()=>!1);return e=>n.every(t=>t(e))}function hi(){return(hi=e((()=>{ai(),fi()})))()}var gi,_i;function vi(){return(vi=e((()=>{we(),gi={agentTools:{off:`Off`,unverified:`Unverified`,sessionRestricted:`Denied by this session’s tool restrictions.`,allowedByConfig:`Allowed by configuration`,unsavedAvailability:`Save your changes to refresh the preview.`,checked:`Based on`,checkedLive:`Session preview`,checkedLocal:`Local configuration`,policySources:`Policy sources`,profileInheritance:`Profile inheritance`,profileGlobal:`Global`,profileAgent:`Agent`,profileAgentOverride:`Agent override`,profileGlobalProvider:`Global provider`,profileAgentProvider:`Agent provider`,profileAgentProviderOverride:`Agent provider override`,activeProfile:`Active`}},_i=Object.assign(()=>Object.assign(P.agentTools,gi.agentTools),{catalog:gi})})))()}function yi(e){let t=e.filter(e=>e.source===`tools.profile`||e.source.endsWith(`.tools.profile`)),n=e.filter(e=>!t.includes(e)),r=(e,t)=>B`
    <div class="agent-profile-tree__label">${t}</div>
    <div class="agent-profile-tree__details">
      <div class="agent-profile-tree__value">
        <code>${e.profile}</code>
        ${e.active?B`<span class="chip">${F(`agentTools.activeProfile`)}</span>`:V}
      </div>
      <div class="agent-profile-tree__source">
        <code
          >${e.source.split(`.`).map((e,t)=>B`${t>0?B`.<wbr />`:V}${e}`)}</code
        >
      </div>
    </div>
  `;return B`
    <ul class="agent-profile-tree" role="list">
      ${[t,n].map((e,t)=>{let n=e.find(e=>e.source.startsWith(`tools.`)),i=e.find(e=>!e.source.startsWith(`tools.`)),a=n??i;if(!a)return V;let o=F(t===0?`agentTools.profileGlobal`:`agentTools.profileGlobalProvider`),s=F(t===0?`agentTools.profileAgent`:`agentTools.profileAgentProvider`),c=F(t===0?`agentTools.profileAgentOverride`:`agentTools.profileAgentProviderOverride`);return B`
          <li class=${n&&i?`agent-profile-tree__branch`:``}>
            ${r(a,n?o:s)}
            ${n&&i?B`<ul role="list">
                    <li>${r(i,c)}</li>
                  </ul>`:V}
          </li>
        `})}
    </ul>
  `}function bi(e,t,n,r){if(r)return r;if(n)return F(`agentTools.unverified`);if(t?.deniedBySession)return F(`agentTools.off`);switch(e?.status){case`excluded`:return F(`agentTools.off`);case`allowed`:return F(`agentTools.allowedByConfig`);case`unavailable`:return F(`agentTools.notListed`);case`available`:return F(`agentTools.inPreview`);default:return F(t?`agentTools.inPreview`:`agentTools.notListed`)}}function xi(e,t,n,r){return{summary:bi(e,t,n,r),reason:r?void 0:n??(t?.deniedBySession?F(`agentTools.sessionRestricted`):e?.reasons.map(e=>E(e.label)).join(` · `))}}function Si(e,t){return!e||!t?V:B`
    <div class="agent-tool-policy">
      <dl class="settings-kv">
        <dt>${F(`agentTools.checked`)}</dt>
        <dd>
          ${F(t.checked===`live-session`?`agentTools.checkedLive`:`agentTools.checkedLocal`)}
        </dd>
        ${e.reasons.length>0?B`
                <dt>${F(`agentTools.policySources`)}</dt>
                <dd>
                  ${e.reasons.map(e=>B`
                      <div>
                        ${E(e.label)}${e.source?B` · <code>${e.source}</code>`:V}
                      </div>
                    `)}
                </dd>
              `:V}
        ${t.profiles.length>0?B`
                <dt>${F(`agentTools.profileInheritance`)}</dt>
                <dd>${yi(t.profiles)}</dd>
              `:V}
      </dl>
    </div>
  `}function Ci(e){let t=e.runtimeSessionMatchesSelectedAgent?e.toolsEffectiveLoading?F(`agentTools.previewLoading`):e.toolsEffectiveError?F(`agentTools.previewUnavailable`):e.toolsEffectiveResult?null:F(`agentTools.previewNotLoaded`):F(`agentTools.otherAgent`),n=t?null:e.toolsEffectiveResult,r=t??(e.configDirty?F(`agentTools.unsavedAvailability`):null),i=r?null:n?.toolAccess??null;return{previewStatus:t,previewResult:n,unverifiedReason:r,toolAccess:i,diagnosticMap:new Map(i?.tools.map(e=>[Q(e.id),e]))}}function wi(){return(wi=e((()=>{H(),fi(),R(),vi(),I(),_i()})))()}function Ti(e){return e.length===0?V:B`
    <div class="agent-tool-badges">
      ${e.map(e=>B`<span class="settings-row__value">${e}</span>`)}
    </div>
  `}function Ei(e,t,n){let r=t.source??e.source,i=t.pluginId??e.pluginId,a=[];return n&&!n.deniedBySession&&a.push(F(`agentTools.inPreview`)),r===`plugin`&&i?a.push(F(`agentTools.plugin`,{id:i})):r===`core`&&a.push(F(`agentTools.builtIn`)),t.optional&&a.push(F(`agentTools.optional`)),a}function Di(e){let[t,n]=e.denied?[`agentTools.disabledByOverride`,`agentTools.overrideOff`]:e.allowed?e.baseAllowed?[`agentTools.enabledByProfile`,`agentTools.enabled`]:[`agentTools.enabledByOverride`,`agentTools.overrideOn`]:[`agentTools.notIncluded`,`agentTools.profileOff`];return{state:F(t),summary:F(n)}}function Oi(e,t){let n=t.source??e.source,r=t.pluginId??e.pluginId;return n===`plugin`&&r?F(`agentTools.plugin`,{id:r}):F(`agentTools.builtIn`)}function ki(e){return`agent-tool-${Q(e).replace(/[^a-z0-9_-]+/g,`-`)}`}function Ai(e){let t=e.currentTarget;if(t instanceof HTMLDetailsElement&&!t.open)for(let e of t.querySelectorAll(`.agent-tool-card[open]`))e.open=!1}function ji(e,t){let n=document.getElementById(t);if(!(n instanceof HTMLDetailsElement))return;e.preventDefault();let r=n.closest(`.agent-tools-group`);r&&(r.open=!0),n.open=!0;let i=new URL(window.location.href);i.hash=t,window.history.replaceState(null,``,i),requestAnimationFrame(()=>{n.scrollIntoView?.({block:`center`,behavior:dt()}),n.querySelector(`summary`)?.focus()})}function Mi(e){let t=e?.notices??[];return t.length===0?V:B`
    <div class="agent-tools-notices">
      ${t.map(e=>B`
          <div
            class="callout ${e.severity===`warning`?`warning`:`info`}"
            style="margin-top: 12px"
          >
            ${E(e.message)}
          </div>
        `)}
    </div>
  `}function Ni(e){return e.source===`plugin`?e.pluginId?F(`agentTools.plugin`,{id:e.pluginId}):F(`agentTools.pluginSource`):e.source===`channel`?e.channelId?F(`agentTools.channelSource`,{id:e.channelId}):F(`agentTools.channel`):e.source===`mcp`?`MCP`:F(`agentTools.builtIn`)}function Pi(e){let t=Te(e.configForm,e.agentId),n=t.entry?.tools??{},r=t.globalTools??{},i=n.profile??r.profile??`full`,a=dn(e.toolsCatalogResult),o=cn(e.toolsCatalogResult),s=n.profile?F(`agentTools.profileSourceAgent`):r.profile?F(`agentTools.profileSourceGlobal`):F(`agentTools.profileSourceDefault`),c=Array.isArray(n.allow)&&n.allow.length>0,l=Array.isArray(r.allow)&&r.allow.length>0,u=e.canUpdateConfig&&!!e.configForm&&!e.configLoading&&!e.configSaving&&!c&&!(e.toolsCatalogLoading&&!e.toolsCatalogResult&&!e.toolsCatalogError),d=c?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],f=Array.isArray(n.deny)?n.deny:[],p=c?[]:f,m=c?{allow:n.allow??[],deny:f}:fn(i),h=o.flatMap(e=>e.tools.map(e=>e.id)),g=pi(m),_=mi(d),v=mi(p,!1),y=e=>{let t=g(e),n=_(e),r=v(e);return{allowed:(t||n)&&!r,baseAllowed:t,denied:r}},ee=h.filter(e=>y(e).allowed).length,{previewStatus:b,previewResult:x,unverifiedReason:S,toolAccess:C,diagnosticMap:w}=Ci(e),T=(x?.groups??[]).flatMap(e=>e.tools),E=Array.from(new Map(T.filter(e=>!e.deniedBySession).map(e=>[Q(e.id),e])).values()),te=E.slice(0,Fi),D=Math.max(0,E.length-te.length),O=new Map(T.map(e=>[Q(e.id),e])),k=new Set(E.map(e=>Q(e.id))),A=e=>e.toSorted((e,t)=>{let n=Q(e.id),r=Q(t.id),i=+!!k.has(n),a=+!!k.has(r);if(i!==a)return a-i;let o=+!!y(e.id).allowed,s=+!!y(t.id).allowed;return o===s?e.label.localeCompare(t.label):s-o}),j=(t,n)=>{let r=new Set(si(d)),i=new Set(si(p));for(let e of t){let t=y(e).baseAllowed,a=Q(e);n?(i.delete(a),t||r.add(a)):(r.delete(a),i.add(a))}e.onOverridesChange(e.agentId,[...r],[...i])},M=e.runtimeSessionMatchesSelectedAgent?e.toolsEffectiveLoading?Jt({label:F(`agentTools.loadingPreview`),rows:2}):e.toolsEffectiveError?J(F(`agentTools.previewError`)):x?E.length===0?J(F(`agentTools.emptyPreview`)):B`
                <div class="agents-panel-body">
                  <div class="agent-tools-runtime">
                    ${te.map(e=>{let t=ki(e.id);return B`
                        <a
                          class="agent-tools-runtime-chip"
                          href="#${t}"
                          @click=${e=>ji(e,t)}
                        >
                          <span class="mono" translate="no">${e.label}</span>
                          <span class="agent-tools-runtime-chip__meta"
                            >${Ni(e)}</span
                          >
                        </a>
                      `})}
                    ${D>0?B`
                            <span
                              class="agent-tools-runtime-chip agent-tools-runtime-chip--more"
                              title=${F(`agentTools.morePreviewTitle`,{count:String(D)})}
                            >
                              ${F(`agentTools.morePreview`,{count:String(D)})}
                            </span>
                          `:V}
                  </div>
                </div>
              `:J(F(`agentTools.previewNotLoaded`)):J(F(`agentTools.switchAgent`));return B`
    ${e.configForm?V:B`<div class="callout info">${F(`agentTools.loadConfig`)}</div>`}
    ${c?B`<div class="callout info">${F(`agentTools.explicitAllowlist`)}</div>`:V}
    ${l?B`<div class="callout info">${F(`agentTools.globalAllowlist`)}</div>`:V}
    ${e.toolsCatalogError?B`<div class="callout info">${F(`agentTools.catalogFallback`)}</div>`:V}
    ${G({title:F(`agentTools.title`),description:B`${F(`agentTools.subtitle`)}
          <span class="mono"
            >${F(`agentTools.enabledSummary`,{enabled:String(ee),total:String(h.length)})}</span
          >`,actions:B`
          <button
            class="btn btn--sm"
            ?disabled=${!u}
            @click=${()=>j(h,!0)}
          >
            ${F(`agentTools.enableAll`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!u}
            @click=${()=>j(h,!1)}
          >
            ${F(`agentTools.disableAll`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            ${F(`common.reloadConfig`)}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${!e.canUpdateConfig||e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?F(`common.saving`):F(`common.save`)}
          </button>
        `},B`
        <dl class="settings-kv">
          <dt>${F(`agentTools.profile`)}</dt>
          <dd><code>${i}</code></dd>
          <dt>${F(`agentTools.source`)}</dt>
          <dd>${s}</dd>
          <dt>${F(`agentTools.enabled`)}</dt>
          <dd><code>${ee}/${h.length}</code></dd>
          <dt>${F(`agentTools.listed`)}</dt>
          <dd><code>${b??E.length}</code></dd>
          <dt>${F(`agentTools.status`)}</dt>
          <dd>
            ${e.configSaving?F(`agentTools.statusSaving`):e.configDirty?F(`agentTools.statusUnsaved`):F(`agentTools.statusSaved`)}
          </dd>
        </dl>
        ${K({title:F(`agentTools.quickPresets`),stacked:!0,control:B`
            <div class="agent-tools-buttons">
              ${a.map(t=>B`
                  <button
                    class="btn btn--sm ${i===t.id?`active`:``}"
                    ?disabled=${!u}
                    @click=${()=>e.onProfileChange(e.agentId,t.id,!0)}
                  >
                    ${t.label}
                  </button>
                `)}
              <button
                class="btn btn--sm"
                ?disabled=${!u}
                @click=${()=>e.onProfileChange(e.agentId,null,!1)}
              >
                ${F(`agentTools.inherit`)}
              </button>
            </div>
          `})}
      `)}
    ${G({title:F(`agentTools.previewTitle`),description:B`${F(`agentTools.previewSubtitle`)}
          <span class="mono">${e.runtimeSessionKey||F(`agentTools.noSession`)}</span>`},B`${Mi(x)}${M}`)}
    ${rn(e.githubIdentity,e.onOpenGitHubConnections)}
    ${G({title:F(`agentTools.catalogTitle`)},B`
        ${e.toolsCatalogLoading&&!e.toolsCatalogResult&&!e.toolsCatalogError?Jt({label:F(`agentTools.loadingCatalog`)}):V}
        <div
          class="agents-panel-body agent-tools-grid"
          ?hidden=${e.toolsCatalogLoading&&!e.toolsCatalogResult&&!e.toolsCatalogError}
        >
          ${o.map(e=>{let t=A(e.tools),n=e.tools.filter(e=>y(e.id).allowed).length,r=e.tools.filter(e=>k.has(Q(e.id))).length,i=t.slice(0,4),a=Math.max(0,t.length-i.length);return B`
              <details class="agent-tools-group" @toggle=${Ai}>
                <summary class="agent-tools-group__summary">
                  <span class="agent-tools-group__summary-main">
                    <span class="agent-tools-group__title">
                      ${e.label}
                      ${e.source===`plugin`&&e.pluginId?B`<span class="settings-row__value"
                              >${F(`agentTools.plugin`,{id:e.pluginId})}</span
                            >`:V}
                    </span>
                    <span
                      class="agent-tools-group__preview"
                      aria-label=${F(`agentTools.toolPreview`)}
                    >
                      ${i.map(e=>B`<span class="mono" translate="no" title=${e.label}
                            >${e.label}</span
                          >`)}
                      ${a>0?B`<span
                              >${F(`agentTools.more`,{count:String(a)})}</span
                            >`:V}
                    </span>
                  </span>
                  <span class="agent-tools-group__counts">
                    <span
                      >${F(e.tools.length===1?`agentTools.toolsOne`:`agentTools.tools`,{count:String(e.tools.length)})}</span
                    >
                    <span
                      >${F(n===1?`agentTools.enabledToolsOne`:`agentTools.enabledTools`,{count:String(n)})}</span
                    >
                    ${r>0?B`<span
                            >${F(r===1?`agentTools.listedToolsOne`:`agentTools.listedTools`,{count:String(r)})}</span
                          >`:V}
                  </span>
                </summary>
                <div class="agent-tools-list agent-tools-list--stacked">
                  ${t.map(t=>{let n=ki(t.id),r=y(t.id),i=O.get(Q(t.id))??null,a=t.defaultProfiles??[],o=Ei(e,t,i),s=Di(r),c=w.get(Q(t.id))??null,{summary:l,reason:d}=xi(c,i,S,b);return B`
                      <details class="agent-tool-card" id=${n}>
                        <summary class="agent-tool-summary">
                          <div class="agent-tool-summary__main">
                            <div class="agent-tool-summary__title-row">
                              <span class="agent-tool-title mono" translate="no"
                                >${t.label}</span
                              >
                            </div>
                            <div class="agent-tool-sub">${t.description}</div>
                          </div>
                          <dl class="agent-tool-summary__facts">
                            <div class="agent-tool-summary__fact">
                              <dt class="label">${F(`agentTools.access`)}</dt>
                              <dd>${s.summary}</dd>
                            </div>
                            <div class="agent-tool-summary__fact">
                              <dt class="label">${F(`agentTools.previewTitle`)}</dt>
                              <dd>
                                ${l}
                                ${d?B`<div class="muted">${d}</div>`:V}
                              </dd>
                            </div>
                          </dl>
                          <div class="agent-tool-summary__badges">
                            ${Ti(o)}
                          </div>
                          <span
                            class="agent-tool-toggle"
                            @click=${e=>e.stopPropagation()}
                            @keydown=${e=>e.stopPropagation()}
                          >
                            ${Nt({checked:r.allowed,disabled:!u,ariaLabel:F(r.allowed?`agentTools.disableNamed`:`agentTools.enableNamed`,{name:t.label}),onChange:e=>j([t.id],e)})}
                          </span>
                        </summary>
                        <div class="agent-tool-details">
                          <div class="agent-tool-details-strip">
                            <div class="agent-tool-detail agent-tool-detail--inline">
                              <div class="label">${F(`agentTools.access`)}</div>
                              <div>${s.state}</div>
                            </div>
                            <div class="agent-tool-detail agent-tool-detail--inline">
                              <div class="label">${F(`agentTools.source`)}</div>
                              <div>${Oi(e,t)}</div>
                            </div>
                            ${a.length>0?B`
                                    <div class="agent-tool-detail agent-tool-detail--inline">
                                      <div class="label">${F(`agentTools.defaultPresets`)}</div>
                                      ${Ti(a)}
                                    </div>
                                  `:V}
                            <div class="agent-tool-detail agent-tool-detail--inline">
                              <div class="label">${F(`agentTools.previewTitle`)}</div>
                              <div>
                                ${S??(i?.deniedBySession?F(`agentTools.sessionRestricted`):i?F(`agentTools.previewVia`,{source:Ni(i)}):d||l)}
                              </div>
                            </div>
                            <a class="agent-tool-jump" href="#${n}">
                              ${F(`agentTools.linkTool`)}
                            </a>
                          </div>
                          ${Si(c,C)}
                        </div>
                      </details>
                    `})}
                </div>
              </details>
            `})}
        </div>
      `)}
  `}var Fi;function Ii(){return(Ii=e((()=>{H(),hi(),fi(),q(),an(),R(),Qt(),M(),ln(),I(),wi(),Zt(),Fi=12})))()}function Li(){return B`
    <section class="content-header" ${Le({toolbarHeader:!0})}>
      <div>
        <div class="page-title">${ke(`agents`)}</div>
        <div class="page-subtitle">
          ${Fe(`agents`)} ${Yt(Bi)}
        </div>
      </div>
    </section>
  `}function Ri(e){let t=ye(e.config),n=e.agentsList?.agents??[],r=e.agentsList?.selectionRequired?null:e.agentsList?.defaultId??null,i=e.selectedAgentId,a=i?n.find(e=>e.id===i)??null:null,o=i&&e.agentSkills.agentSkillsAgentId===i?e.agentSkills.agentSkillsReport?.skills?.length??null:null,s=e.channels.channelsSnapshot?Object.keys(e.channels.channelsSnapshot.channelAccounts??{}).length:null,c=i?e.cron.cronJobsTotal:null,l={files:e.agentFiles.agentFilesList?.files?.length??null,skills:o,channels:s,cron:c||null};return B`
    <div class="agents-layout">
      <section class="agents-toolbar">
        <div class="agents-toolbar-row">
          <div class="agents-toolbar-actions">
            ${e.access.canCreateAgent?B`
                    <button
                      class="btn btn--sm btn--ghost agents-create-btn"
                      ?disabled=${e.loading}
                      @click=${e.onCreateAgent}
                    >
                      ${F(`custodian.newAgent`)}
                    </button>
                  `:V}
            ${a?B`
                    ${Ze(a.id,B`
                        <button
                          type="button"
                          class="btn btn--sm btn--ghost"
                          @click=${e=>void zt(e,a.id,F(`agents.copyId`))}
                        >
                          <span data-copy-label>${F(`agents.copyId`)}</span>
                        </button>
                      `)}
                    <button
                      type="button"
                      class="btn btn--sm btn--ghost"
                      ?disabled=${!e.access.canUpdateConfig||!!(r&&a.id===r)}
                      @click=${()=>e.onSetDefault(a.id)}
                    >
                      ${r&&a.id===r?F(`agents.default`):F(`agents.setDefault`)}
                    </button>
                    <button
                      type="button"
                      class="btn btn--sm btn--ghost"
                      @click=${()=>e.onTogglePinnedAgent(a.id)}
                    >
                      ${e.pinnedAgentIds.includes(a.id)?F(`agents.unpinFromSwitcher`):F(`agents.pinToSwitcher`)}
                    </button>
                  `:V}
            <button
              class="btn btn--sm agents-refresh-btn"
              ?disabled=${e.loading}
              @click=${e.onRefresh}
            >
              ${e.loading?F(`common.loading`):F(`common.refresh`)}
            </button>
          </div>
        </div>
        ${e.error?B`<div class="callout danger" style="margin-top: 8px;">${e.error}</div>`:V}
      </section>
      <section class="agents-main">
        <div class="settings-group">
          ${Lt({title:F(`agents.defaults.title`),description:F(`agents.defaults.description`),onClick:e.onOpenAgentDefaults})}
        </div>
        ${a?B`
                ${zi(e.activePanel,t=>e.onSelectPanel(t),l)}
                <div
                  id="agent-panel"
                  class="settings-stack"
                  role="tabpanel"
                  aria-labelledby=${`agents-tab-${e.activePanel}`}
                >
                  ${e.config.lastError?B`<div class="callout danger" role="alert">
                          ${e.config.lastError}
                        </div>`:V}
                  ${e.activePanel===`overview`?Ze(a.id,Hr({applicationConfig:e.applicationConfig,agent:a,basePath:e.basePath,defaultId:r,configForm:t,agentFilesList:e.agentFiles.agentFilesList,agentIdentity:e.agentIdentityById[a.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,identityDraft:e.identityDraft,identityAvatarLoader:e.identityAvatarLoader,identitySaving:e.identitySaving,identityError:e.identityError,canUpdateConfig:e.access.canUpdateConfig,canUpdateIdentity:e.access.canUpdateIdentity,configLoading:e.config.configLoading,configSaving:e.config.configSaving,configDirty:e.config.configFormDirty,modelCatalog:e.modelCatalog.models,decisionModels:e.modelCatalog.decisionModels??[],modelSelectionPolicy:e.modelCatalog.modelSelectionPolicy,modelCatalogRetired:e.modelCatalog.retired,modelCatalogStatus:e.modelCatalogStatus,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onIdentityFieldChange:e.onIdentityFieldChange,onIdentityAvatarSelect:e.onIdentityAvatarSelect,onIdentitySave:e.onIdentitySave,onModelChange:e.onModelChange,onDecisionModelChange:e.onDecisionModelChange,onModelFallbacksChange:e.onModelFallbacksChange,onModelCatalogOpen:e.onModelCatalogOpen,onSelectPanel:e.onSelectPanel})):V}
                  ${e.activePanel===`files`?Pr({agentId:a.id,agentFilesList:e.agentFiles.agentFilesList,agentFilesLoading:e.agentFiles.agentFilesLoading,agentFilesError:e.agentFiles.agentFilesError??e.agentFilesListError,agentFileActive:e.agentFiles.agentFileActive,agentFileContents:e.agentFiles.agentFileContents,agentFileDrafts:e.agentFiles.agentFileDrafts,agentFileSaving:e.agentFiles.agentFileSaving,agentFileConflict:e.agentFiles.agentFileConflict,canWrite:e.access.canWriteFiles,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave,onFileReload:e.onFileReload,onFileOverwrite:e.onFileOverwrite}):V}
                  ${e.activePanel===`tools`?Pi({agentId:a.id,configForm:t,configLoading:e.config.configLoading,configSaving:e.config.configSaving,configDirty:e.config.configFormDirty,toolsCatalogLoading:e.tools.toolsCatalogLoading,toolsCatalogError:e.tools.toolsCatalogError,toolsCatalogResult:e.tools.toolsCatalogResult,toolsEffectiveLoading:e.tools.toolsEffectiveLoading,toolsEffectiveError:e.tools.toolsEffectiveError,toolsEffectiveResult:e.tools.toolsEffectiveResult,runtimeSessionKey:e.runtimeSessionKey,runtimeSessionMatchesSelectedAgent:e.runtimeSessionMatchesSelectedAgent,canUpdateConfig:e.access.canUpdateConfig,githubIdentity:e.githubIdentity,onOpenGitHubConnections:e.onOpenGitHubConnections,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):V}
                  ${e.activePanel===`skills`?Gr({agentId:a.id,report:e.agentSkills.agentSkillsReport,loading:e.agentSkills.agentSkillsLoading,error:e.agentSkills.agentSkillsError,activeAgentId:e.agentSkills.agentSkillsAgentId,configForm:t,configLoading:e.config.configLoading,configSaving:e.config.configSaving,configDirty:e.config.configFormDirty,filter:e.agentSkills.skillsFilter,canPatchConfig:e.access.canPatchConfig,canUpdateConfig:e.access.canUpdateConfig,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):V}
                  ${e.activePanel===`channels`?Qr({context:h(a,t,e.agentFiles.agentFilesList,r,e.agentIdentityById[a.id]??null),configForm:t,snapshot:e.channels.channelsSnapshot,loading:e.channels.channelsLoading,error:e.channels.channelsError,lastSuccess:e.channels.channelsLastSuccess,onRefresh:e.onChannelsRefresh,onSelectPanel:e.onSelectPanel}):V}
                  ${e.activePanel===`cron`?$r({basePath:e.basePath,context:h(a,t,e.agentFiles.agentFilesList,r,e.agentIdentityById[a.id]??null),agentId:a.id,jobs:e.cron.cronJobs,jobsTotal:e.cron.cronJobsTotal,jobsHasMore:e.cron.cronJobsHasMore,jobsLoadingMore:e.cron.cronJobsLoadingMore,status:e.cron.cronStatus,scopedTotal:e.cron.cronScopedTotal,scopedNextWakeAtMs:e.cron.cronScopedNextWakeAtMs,loading:e.cron.cronLoading,error:e.cron.cronError,canRunNow:e.access.canRunCron,onRefresh:e.onCronRefresh,onLoadMore:e.onCronLoadMore,onRunNow:e.onCronRunNow,onSelectPanel:e.onSelectPanel}):V}
                  ${e.activePanel===`memory`?B`
                          <div class="settings-group agent-memory-import-row">
                            ${Lt({title:F(`tabs.memory`),description:F(`subtitles.memory`),onClick:()=>e.onOpenMemorySettings?.()})}
                            ${Lt({title:F(`tabs.memoryImport`),description:F(`subtitles.memoryImport`),onClick:()=>e.onOpenMemoryImport?.()})}
                          </div>
                          <openclaw-agent-memory-panel
                            .agentId=${a.id}
                          ></openclaw-agent-memory-panel>
                        `:V}
                </div>
              `:G({title:F(`agents.selectTitle`)},J(F(`agents.selectSubtitle`)))}
      </section>
    </div>
  `}function zi(e,t,n){let r=[{id:`overview`,label:F(`agents.tabs.overview`)},{id:`files`,label:F(`agents.tabs.files`)},{id:`tools`,label:F(`agents.tabs.tools`)},{id:`skills`,label:F(`agents.tabs.skills`)},{id:`channels`,label:F(`agents.tabs.channels`)},{id:`cron`,label:F(`agents.tabs.cronJobs`)},{id:`memory`,label:F(`agents.tabs.memory`)}];return Vt({id:`agents`,active:e,tabs:r.map(e=>({value:e.id,label:e.label,count:n[e.id]})),ariaLabel:F(`tabs.agents`),panelId:`agent-panel`,onSelect:t})}var Bi;function Vi(){return(Vi=e((()=>{H(),et(),Re(),Ie(),Ot(),Wt(),q(),sn(),R(),M(),C(),Fr(),Wr(),Jr(),ti(),Ii(),Bi=`https://docs.openclaw.ai/concepts/multi-agent`})))()}var $,Hi,Ui;function Wi(){return(Wi=e((()=>{r(),H(),Qe(),je(),Ve(),Mt(),en(),nn(),R(),M(),Ee(),j(),C(),ct(),I(),ve(),it(),pt(),xt(),_e(),bt(),ge(),de(),Bn(),ar(),fr(),gr(),yr(),Vi(),$=class extends Ce{constructor(...e){super(...e),this.agentsList=null,this.agentsSelectedId=null,this.toolsCatalogLoading=!1,this.toolsCatalogLoadingAgentId=null,this.toolsCatalogError=null,this.toolsCatalogResult=null,this.toolsEffectiveLoading=!1,this.toolsEffectiveLoadingKey=null,this.toolsEffectiveResultKey=null,this.toolsEffectiveError=null,this.toolsEffectiveResult=null,this.chatModelCatalogStatus=Dt(),this.chatModelCatalogPending=null,this.chatModelCatalogRequest=null,this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileBaseVersions={},this.agentFileVersions={},this.agentFileConflict=null,this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentFileWriteRevisions=new Map,this.retainedFileDrafts=new Map,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.identityDraft={name:null,emoji:null,avatar:null},this.identityAvatarLoader=new st(this),this.identitySaving=!1,this.identityError=null,this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.skillsFilter=``,this.cron=ot(),this.routeDataInitialized=!1,this.applyingRouteSelection=!1,this.routeSelectionSuperseded=!1,this.hasBoundAgents=!1,this.agentsSource=null,this.hasBoundAgentIdentity=!1,this.agentIdentitySource=null,this.hasBoundSessions=!1,this.sessionsSource=null,this.chatModelCatalogSubscription=null,this.normalizedLocation=``,this.githubProfileId=null,this.githubIdentity=new tn({requestUpdate:()=>this.requestUpdate(),runExternalMutation:(e,t)=>this.context.runtimeConfig.runExternalMutation(e,t)}),this.gateway=new vt(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetForSourceChange(),invalidateRequests:e=>{e.identityChanged||(this.invalidateTransientRequests(),this.resetModelCatalog())},onSnapshot:({becameAvailable:e,becameConnected:t})=>{if(this.syncGatewayState(),e&&!t){let e=this.chatModelCatalogSubscription;Promise.resolve(this.chatModelCatalogPending).then(()=>{let t=this.gateway.snapshot,n=this.chatModelCatalogStatus;e?.isCurrent()&&t&&pe(t)&&(n.awaitingGateway||n.error!==null)&&this.ensureModelCatalog({refresh:!0})})}},ensureInitialData:()=>this.ensureInitialData()}),this.subscriptions=new Se(this).watch(()=>this.context?.config,(e,t)=>e.subscribe(t)).watch(()=>this.client,yt).effect(()=>this.context?.settingsAgentSelection,e=>(this.syncSettingsSelection(),e.subscribe(()=>{if(this.context.settingsAgentSelection!==e)return;let t=this.agentsSelectedId;this.syncSettingsSelection();let n=this.agentsSelectedId,r=this.context.router.getState();!this.applyingRouteSelection&&this.routeDataInitialized&&this.routeData&&n&&r.matches[0]?.routeId===`agents`&&(!r.pendingMatches.length||r.pendingMatches[0]?.routeId===`agents`)&&mr(this.context,n,t,this.agentsPanel),this.loadActivePanelData(),this.requestUpdate()}))).effect(()=>this.context?.agents,e=>{let t=this.hasBoundAgents;this.hasBoundAgents=!0,this.agentsSource=e,t&&this.resetForSourceChange(),this.syncAgentState(e),this.ensureInitialData();let n=e.subscribe(()=>{this.agentsSource===e&&this.context.agents===e&&(this.syncAgentState(e),this.ensureAgentIdentities(),this.loadActivePanelData(),this.requestUpdate())});return()=>{n(),this.agentsSource===e&&(this.agentsSource=null)}}).effect(()=>this.context?.agentIdentity,e=>{let t=this.hasBoundAgentIdentity;this.hasBoundAgentIdentity=!0,this.agentIdentitySource=e,t&&(this.invalidateTransientRequests(),this.agentIdentityError=null),this.ensureAgentIdentities(),this.ensureInitialData();let n=e.subscribe(()=>{this.agentIdentitySource===e&&this.context.agentIdentity===e&&this.requestUpdate()});return()=>{n(),this.agentIdentitySource===e&&(this.agentIdentitySource=null)}}).watch(()=>this.context?.channels,(e,t)=>e.subscribe(t)).watch(()=>this.context?.navigation,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.sessions,e=>{let t=this.hasBoundSessions;this.hasBoundSessions=!0,this.sessionsSource=e,t&&(this.invalidateTransientRequests(),w(this),this.loadActivePanelData());let n=e.subscribe(()=>{this.sessionsSource===e&&this.context.sessions===e&&(be(this),this.requestUpdate())});return()=>{n(),this.sessionsSource===e&&(this.sessionsSource=null)}})}get modelCatalog(){return ht(this.connected?this.client:null,this.agentsSelectedId)}get sessions(){return this.context.sessions}get agents(){return this.context.agents}get client(){return this.gateway.client}get connected(){return this.gateway.connected}get requestGeneration(){return this.gateway.epoch}get sessionsResult(){return this.context.sessions.state.result}get sessionKey(){return this.context.gateway.snapshot.sessionKey}get agentsPanel(){return this.routeData?.panel??`overview`}disconnectedCallback(){this.githubIdentity.dispose(),this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.syncCanonicalLocation(),this.ensureInitialData())}syncGatewayState(){(this.cron.client!==this.client||this.cron.connected!==this.connected)&&(this.cron={...this.cron,client:this.client,connected:this.connected})}canCall(e,t){return rt(this.context?.gateway?.snapshot,e,t)}syncAgentState(e=this.context.agents){let t=e.state;this.agentsList=t.agentsList?T(t.agentsList):null,this.syncSettingsSelection(),this.syncCurrentAgentFiles(e)}syncSettingsSelection(){let e=this.context.settingsAgentSelection.state.selectedId;if(e!==this.agentsSelectedId){if(this.agentsSelectedId){let e=Mn(this);e&&this.retainedFileDrafts.set(this.agentsSelectedId,e)}this.agentsSelectedId=e,this.resetSelectionState();let t=e?this.retainedFileDrafts.get(e):void 0;t&&e&&(this.retainedFileDrafts.delete(e),this.agentFileDrafts=t.drafts,this.agentFileVersions=t.versions,this.agentFileActive=t.active,this.agentFileConflict=t.conflict)}}syncCurrentAgentFiles(e=this.context.agents){let t=this.agentsSelectedId;if(!t||this.agentsPanel!==`files`)return;let n=e.files(t);n.list&&(this.agentFilesList=n.list,this.selectDefaultAgentFile(t))}async selectDefaultAgentFile(e,t=!1){let n=this.agentFilesList?.files??[];(!this.agentFileActive||!n.some(e=>e.name===this.agentFileActive))&&(this.agentFileActive=n.find(e=>e.name===`AGENTS.md`)?.name??null),this.agentFileActive&&await Fn(this,e,this.agentFileActive,{force:t})}resetForSourceChange(){this.retainedFileDrafts.clear(),this.agentsList=null,this.agentsSelectedId=null,this.resetSelectionState()}invalidateTransientRequests(){this.gateway.invalidate(),this.agentFilesLoading=!1,this.agentFileSaving=!1,this.identitySaving=!1,this.agentIdentityLoading=!1,this.agentSkillsLoading=!1,this.toolsCatalogLoading=!1,this.toolsCatalogLoadingAgentId=null,w(this),this.cron={...this.cron,cronLoading:!1,cronJobsLoadingMore:!1,cronJobsReloadPending:!1,cronJobsReloadPendingTableFilters:!1,cronRunsLoadingMore:!1,cronBusy:!1}}applyRouteData(){let e=this.routeData;if(!e){this.routeDataInitialized=!1;return}this.routeDataInitialized=!0,this.gateway.isRouteDataCurrent(e)&&e.agentsList&&(this.agentsList=e.agentsList);let t=this.context.settingsAgentSelection,n=e.settingsAgentSelection===t&&e.selectionIntentRevision===t.intentRevision;if(this.routeSelectionSuperseded=!n,e.requestedAgentId&&n){this.applyingRouteSelection=!0;try{t.set(e.requestedAgentId)}finally{this.applyingRouteSelection=!1}}this.syncSettingsSelection(),!n&&e.requestedAgentId&&this.agentsSelectedId&&this.context.replace(`agents`,{...e.canonicalLocation??e.location,pathname:Ne(this.agentsSelectedId,e.panel===`overview`?null:e.panel,this.context.basePath)})}syncCanonicalLocation(){this.routeSelectionSuperseded||(this.normalizedLocation=pr(this.context,this.routeData,this.normalizedLocation))}chatAgentId(){return fe(this.sessionKey)?.agentId??this.context.gateway.snapshot.assistantAgentId??this.agentsList?.defaultId??`main`}agentIdentityById(){return Object.fromEntries(this.context.agentIdentity.entries().map(e=>[e.agentId,e]))}ensureInitialData(){if(this.connected&&this.client&&this.routeDataInitialized&&this.routeData){if(!this.context.runtimeConfig.state.configSnapshot&&!this.context.runtimeConfig.state.configLoading&&this.context.runtimeConfig.ensureLoaded(),!this.agentsList&&!this.context.agents.state.agentsLoading){this.loadAgentsAndCommit();return}this.ensureAgentIdentities(),this.loadActivePanelData()}}isCurrentRequest(e,t,n,r={}){return this.client===e&&this.connected&&this.requestGeneration===t&&(!r.agents||this.context.agents===r.agents)&&(!r.agentIdentity||this.context.agentIdentity===r.agentIdentity)&&(!r.sessions||this.context.sessions===r.sessions)&&(!n||this.agentsSelectedId===n)}ensureAgentIdentities(){let e=this.client,t=this.context.agentIdentity,n=this.agentsList?.agents.map(e=>e.id).filter(e=>!t.get(e))??[];if(!e||!this.connected||n.length===0||this.agentIdentityLoading)return;let r=this.requestGeneration;this.agentIdentityLoading=!0,this.agentIdentityError=null,t.ensure(n).catch(n=>{this.isCurrentRequest(e,r,void 0,{agentIdentity:t})&&(this.agentIdentityError=y(n))}).finally(()=>{this.isCurrentRequest(e,r,void 0,{agentIdentity:t})&&(this.agentIdentityLoading=!1)})}loadActivePanelData(){if(!this.routeData)return;let e=this.agentsSelectedId;if(e){if(this.agentsPanel===`overview`){this.ensureModelCatalog();return}if(this.agentsPanel===`files`&&this.agentFilesList?.agentId!==e){this.loadAgentFiles(e);return}if(this.agentsPanel===`skills`&&this.agentSkillsAgentId!==e){_r(this,e);return}if(this.agentsPanel===`tools`){this.syncGitHubIdentity(e),this.toolsCatalogResult?.agentId!==e&&!this.toolsCatalogLoading&&_(this,e),this.loadEffectiveToolsForAgent(e),this.githubIdentity.statusReadable&&!this.githubIdentity.status&&!this.githubIdentity.loading&&!this.githubIdentity.error&&this.githubIdentity.verify();return}if(this.agentsPanel===`channels`&&!this.context.channels.state.channelsSnapshot){this.context.channels.refresh(!1);return}this.agentsPanel===`cron`&&(this.cron.cronAgentId!==e&&(this.cron=ot({client:this.client,connected:this.connected}),this.cron.cronAgentId=e),!this.cron.cronLoading&&!this.cron.cronStatus&&this.refreshCron())}}syncGitHubIdentity(e){let t=this.context.gateway.snapshot,n=t.selfUser?.id??null;n!==this.githubProfileId&&(this.githubIdentity.dispose(),this.githubProfileId=n);let r=(e,n)=>rt(t,e,n,{requireAdvertisement:!1});this.githubIdentity.sync({client:this.client,connected:this.connected,target:e?{kind:`shared`,scope:`agent`,agentId:e,config:ye(this.context.runtimeConfig.state)}:null,statusReadable:r(`tools.github.status`,`operator.read`),configurable:r(`tools.github.configure`,`operator.admin`),authorizable:[`tools.github.authorize.start`,`tools.github.authorize.poll`,`tools.github.authorize.cancel`].every(e=>r(e,`operator.admin`)),clientRevision:this.requestGeneration})}resetModelCatalog(){this.chatModelCatalogRequest?.abort(),this.chatModelCatalogRequest=null,this.chatModelCatalogSubscription?.unsubscribe(),this.chatModelCatalogSubscription=null,this.chatModelCatalogStatus=Dt(),this.chatModelCatalogPending=null}ensureModelCatalog(e={}){let t=this.client,n=this.agentsSelectedId;if(!t||!this.connected||!n)return;if(!this.chatModelCatalogSubscription?.isCurrent()){this.resetModelCatalog();let e=this.requestGeneration,r=this.context?.gateway,i=this.context?.agents,a={isCurrent:()=>this.chatModelCatalogSubscription===a&&this.context?.gateway===r&&this.isCurrentRequest(t,e,n,{agents:i}),unsubscribe:_t(this.context.gateway,()=>{a.isCurrent()&&(this.chatModelCatalogRequest?.abort(),this.chatModelCatalogRequest=null,this.chatModelCatalogPending=null,this.ensureModelCatalog({refresh:!0}))})};this.chatModelCatalogSubscription=a}if(this.chatModelCatalogPending||!e.refresh&&this.chatModelCatalogStatus.hasLoaded)return;let r=this.chatModelCatalogSubscription,i=new AbortController;this.chatModelCatalogRequest=i;let a=()=>r?.isCurrent()&&this.chatModelCatalogRequest===i;this.chatModelCatalogStatus=qt(this.chatModelCatalogStatus);let o=mt(t,{agentId:n,signal:i.signal}).then(e=>{if(!a())return;let t=gt(e);this.chatModelCatalogStatus=t?Et(It(),Error(t),this.gateway.snapshot):It()},e=>{a()&&(this.chatModelCatalogStatus=Et(this.chatModelCatalogStatus,e,this.gateway.snapshot))}).finally(()=>{this.chatModelCatalogPending===o&&(this.chatModelCatalogPending=null,this.chatModelCatalogRequest=null)});this.chatModelCatalogPending=o}async loadAgentsAndCommit(){let e=this.client,t=this.requestGeneration,n=this.context.agents;e&&(await n.ensureList(),this.isCurrentRequest(e,t,void 0,{agents:n})&&(this.syncAgentState(n),this.ensureAgentIdentities(),this.loadActivePanelData()))}async loadAgentFiles(e,t=!1){let n=this.client,r=this.context.agents;if(!n||!this.connected||this.agentFilesLoading)return;if(r.files(e).list&&!t){this.syncCurrentAgentFiles(r);return}let i=this.requestGeneration;this.agentFilesLoading=!0,this.agentFilesError=null;try{let a=t?await r.refreshFiles(e):await r.ensureFiles(e);if(!this.isCurrentRequest(n,i,e,{agents:r}))return;this.agentFilesList=a??r.files(e).list}finally{this.isCurrentRequest(n,i,e,{agents:r})&&(this.agentFilesLoading=!1)}this.isCurrentRequest(n,i,e,{agents:r})&&await this.selectDefaultAgentFile(e,t)}async refreshCron(){let e=this.cron;e.connected&&e.client&&!e.cronLoading&&await Promise.all([this.runCronTask(e=>at(e)),this.runCronTask(e=>ut(e)),this.runCronTask(e=>ft(e,{tableFilters:!0}))])}async runCronTask(e){let t=this.cron;try{let n=e(t);return this.cron===t&&this.requestUpdate(),await n}finally{this.cron===t&&this.requestUpdate()}}saveIdentityDraft(){if(!this.canCall(`agents.update`,`operator.admin`))return;let e=this.client,t=this.agentsSelectedId;if(!e||!t||this.identitySaving)return;let n=this.requestGeneration,r=this.context.agents,i=this.context.agentIdentity;nr({host:this,config:this.context.config,expectedClient:e,agentId:t,agents:r,agentIdentity:i,runtimeConfig:this.context.runtimeConfig,canDispatch:()=>this.canCall(`agents.update`,`operator.admin`)&&this.isCurrentRequest(e,n,t,{agents:r,agentIdentity:i}),isCurrent:()=>this.isCurrentRequest(e,n,t,{agents:r,agentIdentity:i}),onSaved:()=>this.syncAgentState(r)})}resetSelectionState(){this.gateway.invalidate(),this.resetModelCatalog(),An(this),this.agentSkillsReport=null,this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsAgentId=null,this.agentIdentityLoading=!1,this.agentIdentityError=null,$n(this),this.toolsCatalogResult=null,this.toolsCatalogError=null,this.toolsCatalogLoading=!1,this.toolsCatalogLoadingAgentId=null,w(this),this.cron=ot({client:this.client,connected:this.connected})}toolsPath(e,t){if(e!==this.agentsSelectedId)return null;let n=this.context.runtimeConfig.agentEntry(e,{ensure:t});return n?[...n.path,`tools`]:null}loadEffectiveToolsForAgent(e){if(e!==this.chatAgentId()){w(this);return}let t=le(this,{agentId:e,sessionKey:this.sessionKey});(this.toolsEffectiveResultKey!==t||this.toolsEffectiveError)&&se(this,{agentId:e,sessionKey:this.sessionKey})}refreshAgents(){let e=this.client,t=this.requestGeneration,n=this.context.agents;e&&(async()=>{await n.refreshList(),this.isCurrentRequest(e,t,void 0,{agents:n})&&(this.syncAgentState(n),this.loadActivePanelData())})()}saveAgentConfig(){let e=this.client;if(!e||!this.canCall(`config.set`,`operator.admin`))return;let t=this.requestGeneration,n=this.context.agents;(async()=>{await this.context.runtimeConfig.save()&&(await n.refreshList(),this.isCurrentRequest(e,t,void 0,{agents:n})&&(w(this),this.syncAgentState(n),this.ensureAgentIdentities(),this.loadActivePanelData()))})()}setDefaultAgent(e){if(!this.canCall(`config.set`,`operator.admin`))return;let t=this.client,n=this.requestGeneration,r=this.context.agents,i=this.context.runtimeConfig;if(!t)return;let a=()=>this.context.runtimeConfig===i&&this.isCurrentRequest(t,n,void 0,{agents:r})&&this.canCall(`config.set`,`operator.admin`);(async()=>{await i.ensureLoaded(),a()&&await b(i,e,()=>r.refreshList(),a)})()}saveSelectedAgentFile(e,t,n){e===this.agentsSelectedId&&this.canCall(`agents.files.set`,`operator.admin`)&&In(this,e,t,n)}overwriteSelectedAgentFile(e,t,n){e===this.agentsSelectedId&&this.canCall(`agents.files.set`,`operator.admin`)&&zn(this,e,t,n)}clearAgentSkills(e){if(!this.canCall(`config.patch`,`operator.admin`))return;let t=this.client,n=this.requestGeneration,r=this.context.agents,i=this.context.runtimeConfig;if(!t)return;let a=()=>this.context.runtimeConfig===i&&this.isCurrentRequest(t,n,e,{agents:r})&&this.canCall(`config.patch`,`operator.admin`);vr(i,e,a).then(t=>{if(a()){if(!t){this.agentSkillsError=i.state.lastError??F(`agents.skillsPanel.updateError`);return}this.agentSkillsError=null,_r(this,e)}})}runCronJobNow(e){this.canCall(`cron.run`,`operator.admin`)&&this.cron.cronJobs.some(t=>t.id===e)&&this.runCronTask(t=>lt(t,e,`force`))}render(){let e=this.context.runtimeConfig.state,t=this.context.agents.state,n=this.agentsSelectedId,r={canCreateAgent:this.canCall(`openclaw.chat`,`operator.admin`),canPatchConfig:this.canCall(`config.patch`,`operator.admin`),canUpdateConfig:this.canCall(`config.set`,`operator.admin`),canUpdateIdentity:this.canCall(`agents.update`,`operator.admin`),canWriteFiles:this.canCall(`agents.files.set`,`operator.admin`),canRunCron:this.canCall(`cron.run`,`operator.admin`)};return this.syncGitHubIdentity(n),B`
      ${Li()}
      ${$t(this.identityAvatarLoader.withActiveRoutes(()=>Ri({applicationConfig:this.context.config,access:r,basePath:this.context.basePath,loading:t.agentsLoading,error:t.agentsError,agentsList:this.agentsList,selectedAgentId:n,activePanel:this.agentsPanel,config:e,channels:this.context.channels.state,cron:this.cron,agentFiles:this,agentFilesListError:this.context.agents.files(n).error,agentIdentityLoading:this.agentIdentityLoading,agentIdentityError:this.agentIdentityError,agentIdentityById:this.agentIdentityById(),identityDraft:this.identityDraft,identityAvatarLoader:this.identityAvatarLoader,identitySaving:this.identitySaving,identityError:this.identityError,agentSkills:this,tools:this,githubIdentity:this.githubIdentity,onOpenGitHubConnections:()=>this.context.navigate(`profile`,{hash:`#settings-profile-github-connections`}),runtimeSessionKey:this.sessionKey,runtimeSessionMatchesSelectedAgent:n===this.chatAgentId(),modelCatalog:this.modelCatalog,modelCatalogStatus:this.chatModelCatalogStatus,pinnedAgentIds:this.context.navigation.snapshot.pinnedAgentIds,onTogglePinnedAgent:e=>rr(this.context.navigation,e),onRefresh:()=>this.refreshAgents(),onCreateAgent:()=>{this.canCall(`openclaw.chat`,`operator.admin`)&&this.context.navigate(`custodian`,{search:`?intent=new-agent`})},onSelectPanel:e=>hr(this.context,n,this.agentsPanel,e),onLoadFiles:e=>void this.loadAgentFiles(e,!0),onSelectFile:e=>{this.agentFileActive=e,n&&Fn(this,n,e)},onFileDraftChange:(e,t)=>{n===this.agentsSelectedId&&(this.agentFileDrafts={...this.agentFileDrafts,[e]:t})},onFileReset:e=>{n===this.agentsSelectedId&&Ln(this,e)},onFileSave:e=>{n&&this.saveSelectedAgentFile(n,e,this.agentFileDrafts[e]??this.agentFileContents[e]??``)},onFileReload:e=>{n&&Rn(this,n,e)},onFileOverwrite:e=>{n&&this.overwriteSelectedAgentFile(n,e,this.agentFileDrafts[e]??this.agentFileContents[e]??``)},onToolsProfileChange:(e,t,n)=>{if(!this.canCall(`config.set`,`operator.admin`))return;let r=this.toolsPath(e,!!(t||n));r&&(t?this.context.runtimeConfig.patchForm([...r,`profile`],t):this.context.runtimeConfig.removeFormValue([...r,`profile`]),n&&this.context.runtimeConfig.removeFormValue([...r,`allow`]))},onToolsOverridesChange:(e,t,n)=>{if(!this.canCall(`config.set`,`operator.admin`))return;let r=this.toolsPath(e,t.length>0||n.length>0);r&&(t.length?this.context.runtimeConfig.patchForm([...r,`alsoAllow`],t):this.context.runtimeConfig.removeFormValue([...r,`alsoAllow`]),n.length?this.context.runtimeConfig.patchForm([...r,`deny`],n):this.context.runtimeConfig.removeFormValue([...r,`deny`]))},onConfigReload:()=>void this.context.runtimeConfig.discardDraft({reloadOnly:!0}),onConfigSave:()=>this.saveAgentConfig(),onIdentityFieldChange:(e,t)=>{n===this.agentsSelectedId&&this.canCall(`agents.update`,`operator.admin`)&&er(this,e,t)},onIdentityAvatarSelect:e=>{n===this.agentsSelectedId&&this.canCall(`agents.update`,`operator.admin`)&&tr(this,e,this.context.config)},onIdentitySave:()=>this.saveIdentityDraft(),onChannelsRefresh:()=>void this.context.channels.refresh(!1),onOpenMemoryImport:()=>this.context.navigate(`memory-import`),onOpenMemorySettings:()=>this.context.navigate(`memory`),onOpenAgentDefaults:()=>this.context.navigate(`ai-agents`),onCronRefresh:()=>void this.refreshCron(),onCronLoadMore:()=>void this.runCronTask(e=>ft(e,{append:!0,tableFilters:!0})),onCronRunNow:e=>this.runCronJobNow(e),onSkillsFilterChange:e=>this.skillsFilter=e,onSkillsRefresh:()=>{n&&_r(this,n)},onAgentSkillToggle:(e,t,n)=>{if(e!==this.agentsSelectedId||!this.canCall(`config.set`,`operator.admin`))return;let r=this.context.runtimeConfig.agentEntry(e,{ensure:!0});if(!r||!t.trim())return;let i=g(ye(this.context.runtimeConfig.state),e)??this.agentSkillsReport?.agentSkillFilter??this.agentSkillsReport?.skills?.map(e=>e.name).filter(Boolean)??[],a=new Set(i);n?a.add(t.trim()):a.delete(t.trim()),this.context.runtimeConfig.patchForm([...r.path,`skills`],[...a])},onAgentSkillsClear:e=>this.clearAgentSkills(e),onAgentSkillsDisableAll:e=>{if(e!==this.agentsSelectedId||!this.canCall(`config.set`,`operator.admin`))return;let t=this.context.runtimeConfig.agentEntry(e,{ensure:!0});t&&this.context.runtimeConfig.patchForm([...t.path,`skills`],[])},...or({getRuntimeConfig:()=>this.context.runtimeConfig,canUpdate:e=>e===this.agentsSelectedId&&this.canCall(`config.set`,`operator.admin`),onPrimaryChanged:()=>void be(this)}),onModelCatalogOpen:()=>this.ensureModelCatalog({refresh:!0}),onSetDefault:e=>this.setDefaultAgent(e)})))}
    `}},p([m({context:ze,subscribe:!0})],$.prototype,`context`,void 0),p([W({attribute:!1})],$.prototype,`routeData`,void 0),p([U()],$.prototype,`agentsList`,void 0),p([U()],$.prototype,`agentsSelectedId`,void 0),p([U()],$.prototype,`toolsCatalogLoading`,void 0),p([U()],$.prototype,`toolsCatalogLoadingAgentId`,void 0),p([U()],$.prototype,`toolsCatalogError`,void 0),p([U()],$.prototype,`toolsCatalogResult`,void 0),p([U()],$.prototype,`toolsEffectiveLoading`,void 0),p([U()],$.prototype,`toolsEffectiveLoadingKey`,void 0),p([U()],$.prototype,`toolsEffectiveResultKey`,void 0),p([U()],$.prototype,`toolsEffectiveError`,void 0),p([U()],$.prototype,`toolsEffectiveResult`,void 0),p([U()],$.prototype,`chatModelCatalogStatus`,void 0),p([U()],$.prototype,`agentFilesLoading`,void 0),p([U()],$.prototype,`agentFilesError`,void 0),p([U()],$.prototype,`agentFilesList`,void 0),p([U()],$.prototype,`agentFileContents`,void 0),p([U()],$.prototype,`agentFileBaseVersions`,void 0),p([U()],$.prototype,`agentFileVersions`,void 0),p([U()],$.prototype,`agentFileConflict`,void 0),p([U()],$.prototype,`agentFileDrafts`,void 0),p([U()],$.prototype,`agentFileActive`,void 0),p([U()],$.prototype,`agentFileSaving`,void 0),p([U()],$.prototype,`agentIdentityLoading`,void 0),p([U()],$.prototype,`agentIdentityError`,void 0),p([U()],$.prototype,`identityDraft`,void 0),p([U()],$.prototype,`identitySaving`,void 0),p([U()],$.prototype,`identityError`,void 0),p([U()],$.prototype,`agentSkillsLoading`,void 0),p([U()],$.prototype,`agentSkillsError`,void 0),p([U()],$.prototype,`agentSkillsReport`,void 0),p([U()],$.prototype,`agentSkillsAgentId`,void 0),p([U()],$.prototype,`skillsFilter`,void 0),p([U()],$.prototype,`cron`,void 0),Hi=!0,Ui=e=>B`<openclaw-agents-page .routeData=${e}></openclaw-agents-page>`,customElements.get(`openclaw-agents-page`)||customElements.define(`openclaw-agents-page`,$)})))()}Wi();export{Hi as header,Ui as render};