import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Et as n,Gi as r,Gt as i,Kt as a,Tt as o,qr as s,zr as c}from"./control-ui-foundation-C3MHh_P-.js";import{$a as l,Gl as u,I as d,Kl as f,Qa as p,R as m,Si as h,Ti as g,Xa as _,Za as ee,_i as te,bs as v,cc as ne,hu as y,k as re,lu as ie,ou as ae,ql as b,sc as oe,su as se,uu as x}from"./control-ui-core-pYNj5S1a.js";import{$i as S,$n as C,Qi as ce,Xi as w,Yt as le,Zi as T,Zt as ue,_r as de,bo as fe,co as pe,er as me,fr as he,go as E,ho as ge,mo as _e,nn as ve,rn as ye,vi as be,yi as xe,yo as Se}from"./control-ui-core-D6clmJs8.js";import{$ as D,F as Ce,M as we,X as O,Y as k,c as A,ct as j,nt as M,r as Te,s as Ee,t as De,tt as N,ut as P}from"./lit-runtime-DZL1fcCI.js";import{$ as Oe,Q as ke,Z as Ae}from"./control-ui-boot-shared-CES8Ypkl.js";import{c as je,d as Me,l as Ne}from"./gateway-runtime-iOL78mIi.js";import{Wn as Pe,bn as Fe,di as F,fi as I,no as Ie,ro as Le,yn as Re}from"./control-ui-boot-shared-3Hl8ksFq.js";import{I as ze,L as Be,R as L,V as R,bt as Ve,z as He}from"./control-ui-boot-shared-D-LYw3KU.js";import{S as Ue,_ as We}from"./control-ui-boot-shared-C-yZTZmO.js";import{$r as Ge,Ar as Ke,At as qe,Dr as Je,Dt as Ye,Et as z,Ot as Xe,Qr as Ze,To as Qe,Ya as $e,_ as et,_t as B,ar as tt,b as nt,g as rt,rr as it,wo as at,wt as V,x as ot,xt as H}from"./control-ui-boot-shared-DJ4XCcp6.js";import{a as st,i as ct,o as lt,r as ut,t as dt}from"./plugin-contracts-runtime-DSgjMI0R.js";import{a as ft,r as pt,t as mt}from"./plugin-help-C6OGXfER.js";import{Hr as ht,_r as gt,br as _t,cr as vt,d as yt,f as bt,gr as xt,or as St,p as Ct,sr as wt,vr as Tt,xr as Et,yr as Dt,zr as Ot}from"./control-ui-boot-shared-DCY2wZcy.js";import"./css-agents-plugins-skill-workshop-skills-DvcafeYi.js";import{n as kt,t as At}from"./control-ui-disabled-Bz1XM6J8.js";import{n as jt,t as Mt}from"./panel-empty-state-Dh18ZXJZ.js";import{i as Nt,n as Pt,s as Ft}from"./config-form.search-By3YxbhJ.js";import{n as It,t as Lt}from"./settings-workspace-DKW0BVnu.js";import{c as Rt,d as zt,f as Bt,g as Vt,h as Ht,m as Ut,n as Wt,p as Gt,t as Kt}from"./config-form-Dai8zEXZ.js";import{B as qt,H as Jt,U as Yt,i as Xt,o as Zt}from"./config-form.node.shared-nwEUEYxd.js";import{n as Qt,t as $t}from"./wizard-login-controller-CVVvSr5l.js";import{a as en,i as tn,n as nn,r as rn,t as an}from"./settings-model-CBF6_YZP.js";import{i as on,n as sn,r as cn,t as ln}from"./plugins-hub-header-BrNeEiya.js";import{n as un,t as dn}from"./credential-editor-BFti91ic.js";import{t as fn}from"./file-preview-modal-registration-Wpn7NIIc.js";function pn(e){return e===`#configuration`?`configuration`:`readme`}function mn(e,t){let n=new URLSearchParams(e?.search);return t?n.set(`view`,`settings`):n.delete(`view`),{pathname:e?.pathname,search:n.size?`?${n}`:``,hash:``}}function hn(e,t,n){if(n){let r=e.catalog.categoryRanks?.[n]??2**53-1,i=t.catalog.categoryRanks?.[n]??2**53-1;if(r!==i)return r-i}let r=(t.catalog.downloads??0)-(e.catalog.downloads??0),i=e.catalog.packageName??e.id,a=t.catalog.packageName??t.id;return r||(i<a?-1:+(i>a))}function gn(e,t,n){return e.filter(e=>e.catalog[t]).toSorted((e,t)=>(e.catalog[n]??2**53-1)-(t.catalog[n]??2**53-1))}function _n(e,t){let n=new Map(e.map(e=>[e.id,e]));for(let e of t)n.set(e.id,e);return[...n.values()]}var vn,yn,bn,xn,Sn;function Cn(){return(Cn=e((()=>{Be(),b(),vn=100,yn=8,bn=null,xn=null,Sn=class{constructor(e,t){this.host=e,this.gateway=t,this.result=null,this.resultSelection=null,this.error=null,this.remoteError=null,this.categories=[],this.categoriesError=null,this.categoriesReady=!1,this.categoriesStarted=!1,this.featured=[],this.trending=[],this.loadMoreError=null,this.intent=`all`,this.category=null,this.query=``,this.committedQuery=``,this.searchTimer=null,this.categoriesTask=new L(e,{autoRun:!1,args:()=>[bn],task:([e],{signal:t})=>e?e.request(`plugins.catalog.categories`,{},{signal:t}):He,onComplete:({categories:e})=>{this.categories=e,this.categoriesReady=!0,this.categoriesError=null},onError:e=>{this.categoriesError=u(e)}}),this.browseTask=new L(e,{autoRun:!1,args:()=>[this.gateway.isConnected()?this.gateway.getClient():null,this.intent,this.category,this.committedQuery,!1],task:([e,t,n,r,i],{signal:a})=>e?this.fetchAvailablePage({client:e,intent:t,category:n,query:r,manual:i,signal:a}):He,onComplete:e=>{this.result={items:e.items,...e.nextCursor?{nextCursor:e.nextCursor}:{}},this.resultSelection=e.selection,this.remoteError=e.remoteError??null,e.overview&&(e.categories&&(this.categoriesTask.run([null]),this.categories=e.categories,this.categoriesReady=!0,this.categoriesError=null),this.featured=gn(e.items,`featured`,`featuredRank`).slice(0,yn),this.trending=gn(e.items,`trending`,`trendingRank`).slice(0,yn))},onError:e=>{this.error=u(e)}}),this.loadMoreTask=new L(e,{autoRun:!1,args:()=>[bn,this.intent,this.category,this.committedQuery,xn],task:([e,t,n,r,i],{signal:a})=>e&&i?this.fetchAvailablePage({client:e,intent:t,category:n,query:r,cursor:i,signal:a}):He,onComplete:e=>{if(!this.result||this.result.nextCursor!==e.requestedCursor)return;let t=_n(this.result.items,e.items);this.result={items:this.intent===`all`&&!this.committedQuery?t.toSorted((e,t)=>hn(e,t,this.category)):t,...e.nextCursor?{nextCursor:e.nextCursor}:{}},this.loadMoreError=e.remoteError??null},onError:e=>{this.loadMoreError=u(e)}})}get loading(){return this.gateway.isConnected()&&this.browseTask.status===R.PENDING&&(!this.result||this.resultSelection?.intent!==this.intent||this.resultSelection.category!==this.category||this.resultSelection.query!==this.committedQuery)}get categoriesLoading(){return this.gateway.isConnected()&&this.categoriesStarted&&!this.categoriesReady&&this.categoriesTask.status===R.PENDING}async ensureCategories(e=!1){let t=this.gateway.getClient();t&&this.gateway.isConnected()&&!this.categoriesReady&&(!this.categoriesStarted||this.categoriesTask.status!==R.PENDING&&e)&&(this.categoriesError=null,this.categoriesStarted=!0,await this.categoriesTask.run([t]))}get featuredLoading(){return this.isGroupedOverview()&&this.loading}get trendingLoading(){return this.isGroupedOverview()&&this.loading}get loadingMore(){return this.gateway.isConnected()&&this.loadMoreTask.status===R.PENDING}async fetchAvailablePage(e){let t=!e.cursor&&this.isGroupedOverview(e.intent,e.category,e.query),n=await e.client.request(`plugins.catalog.browse`,{intent:e.intent,...e.category?{category:e.category}:{},...e.query?{query:e.query}:{},...e.manual?{searchSource:`openclaw-control-ui`}:{},...e.cursor?{cursor:e.cursor}:{},pageSize:vn},e.signal?{signal:e.signal}:void 0);return{items:e.intent===`all`&&!e.query?n.items.toSorted((t,n)=>hn(t,n,e.category)):n.items,overview:t,selection:{intent:e.intent,category:e.category,query:e.query},...n.categories?{categories:n.categories}:{},...n.nextCursor&&!e.query?{nextCursor:n.nextCursor}:{},...n.remoteError?{remoteError:n.remoteError}:{},...e.cursor?{requestedCursor:e.cursor}:{}}}isGroupedOverview(e=this.intent,t=this.category,n=this.committedQuery){return e===`all`&&t===null&&!n}invalidate(){this.disconnect(),this.committedQuery=this.query.trim(),this.browseTask.run([null,this.intent,this.category,this.committedQuery,!1]),this.result=null,this.resultSelection=null,this.categories=[],this.categoriesReady=!1,this.categoriesError=null,this.error=null,this.remoteError=null,this.featured=[],this.trending=[],this.loadMoreError=null}disconnect(){this.categoriesStarted=!1,this.categoriesTask.run([null]),this.searchTimer&&=(clearTimeout(this.searchTimer),null),this.loadMoreTask.run([null,this.intent,this.category,this.committedQuery,null])}async refresh(e=!1){let t=this.gateway.getClient();t&&this.gateway.isConnected()&&(this.error=null,this.remoteError=null,this.loadMoreError=null,this.loadMoreTask.run([null,this.intent,this.category,this.committedQuery,null]),await this.browseTask.run([t,this.intent,this.category,this.committedQuery,e]))}async loadMore(){let e=this.gateway.getClient(),t=this.result?.nextCursor;e&&this.gateway.isConnected()&&t&&!this.committedQuery&&!this.isGroupedOverview()&&(this.loadMoreError=null,await this.loadMoreTask.run([e,this.intent,this.category,this.committedQuery,t]))}selectIntent(e){this.intent=e,this.category=null,this.refresh()}selectCategory(e){this.intent=`all`,this.category=e,this.refresh()}updateQuery(e){this.query=e,e.trim()&&(this.intent=`all`,this.category=null),this.host.requestUpdate(),this.searchTimer&&clearTimeout(this.searchTimer),this.searchTimer=setTimeout(()=>{this.searchTimer=null;let t=e.trim(),n=t!==this.committedQuery&&t.length>=2;this.committedQuery=t,this.refresh(n)},250)}}})))()}var wn;function Tn(){return(Tn=e((()=>{Yt(),Ne(),pt(),wn=class{constructor(e){e.addController(this)}get available(){return this.plugin!==void 0}update(e){let t=e.context;t!==this.context&&(this.release?.(),this.context=t);let n=e.result?.plugins.find(t=>t.installed&&t.id===e.detail?.pluginId),r=e.detail?.catalog??e.catalogDetail?.result,i=r?.plugin.local.pluginId??r?.detail.packageName,a=r?{tools:r.detail.contracts?.tools,providers:r.detail.providers,channels:r.detail.channels,contracts:r.detail.contracts?Object.entries(r.detail.contracts).filter(([e])=>e!==`tools`).flatMap(([e,t])=>t.map(t=>`${e}: ${t}`)):void 0,skills:r.detail.skills.map(e=>e.name),mcpServers:r.detail.mcpServers}:void 0;if(this.plugin=e.connected&&je(t.gateway.snapshot,`openclaw.chat`,`operator.admin`)?n?{id:n.id,name:n.name,declared:e.detail?.inspection?.declared??(n.catalogId===r?.plugin.id?a:void 0)}:r&&i?{id:i,name:r.plugin.catalog.name,declared:a}:void 0:void 0,!this.plugin){this.release?.(),this.release=void 0;return}this.release=ft(t,this,this.plugin,{installed:!!n,overview:!n||e.installedDetailTab!==`configuration`})}get ask(){if(!this.context||!this.plugin)return async()=>{};let e=mt(this.context,this.plugin);return t=>{let n=t?.value===void 0?t?.schema.default:t.value;return e(t?{path:t.path,label:t.label,value:n,sensitive:Jt(n,t.path,t.hints)}:void 0)}}hostDisconnected(){this.release?.(),this.release=void 0,this.plugin=void 0}}})))()}function En(e){return Qe({title:y(`pluginsPage.removeConfirmTitle`,{name:e}),message:y(`pluginsPage.removeConfirmMessage`),confirmLabel:y(`pluginsPage.remove`),danger:!0})}function Dn(){return(Dn=e((()=>{at(),x(),F(),I()})))()}var On;function kn(){return(kn=e((()=>{Qt(),x(),On=class{constructor(e,t,n){this.gateway=t,this.options=n,this.selection=null,this.dialog=new $t(e,{getClient:()=>t.client,getAgentId:()=>null,requestFailedMessage:()=>y(`pluginsPage.auth.requestFailed`),sessionExpiredMessage:()=>y(`pluginsPage.auth.sessionExpired`),onClose:()=>{let e=this.selection?.pluginId;this.reset(),e&&n.getDetail()?.pluginId===e&&n.refresh(e)},onAnswer:(e,t)=>{let n=this.selection;this.dialog.runner.answer(e,t).then(e=>{n===this.selection&&this.complete(e)})},onBackgroundCompletion:e=>this.complete(e)})}get busy(){return this.dialog.runner.state.phase!==`idle`}select(e){this.selection&&this.selection.pluginId!==e&&this.reset()}reset(){this.selection=null,this.dialog.reset()}render(){return this.dialog.render()}async start(e){let t=this.gateway.capture(),n=this.options.getDetail();if(!t||!n||!this.options.canSignIn()||this.busy||!n.inspection?.mcpAuth?.some(t=>t.serverName===e&&t.state!==`authorized`))return;let r={pluginId:n.pluginId,scope:t};this.selection=r,this.dialog.runner.prepareSignIn(`oauth`,this.options.getName(n.pluginId)??e);let i=await this.dialog.runner.startMcpLogin(e);r===this.selection&&await this.complete(i)}async complete(e){let t=this.selection;e&&e.isCurrent?.()!==!1&&t&&this.gateway.isCurrent(t.scope)&&this.options.getDetail()?.pluginId===t.pluginId&&(this.reset(),await this.options.refresh(t.pluginId))}}})))()}function U(e){return`plugin:${e}`}function W(e,t={}){return e?D`<div
    class="plugins-row-message plugins-row-message--${e.kind} oc-banner ${e.kind===`error`?`oc-banner-error`:`oc-banner-warning`}"
    role=${e.kind===`error`||e.installPolicyWarning?`alert`:`status`}
  >
    <div>
      ${e.text}
      ${e.installPolicyWarning?D`
              <p>${y(`pluginConsent.installPolicy.policyScope`)}</p>
              ${e.installPolicyWarning.details.findings?.map(e=>D`<div class="plugins-policy-review__finding">
                  <strong>${y(`pluginConsent.installPolicy.severity.${e.severity}`)}</strong>
                  <p>${f(e.message)}</p>
                  <details>
                    <summary>${y(`pluginConsent.installPolicy.technicalDetails`)}</summary>
                    <code>${e.ruleId}</code>
                    ${e.file?D`<code>${e.file}${e.line?`:${e.line}`:``}</code>`:O}
                    ${e.evidence?D`<p>${f(e.evidence)}</p>`:O}
                  </details>
                </div>`)}
              ${t.onContinue?D`<button
                      class="btn btn--sm oc-action oc-action-secondary"
                      type="button"
                      ?disabled=${t.busy}
                      @click=${()=>{t.busy||t.onContinue?.({...e.installPolicyWarning.request,acknowledgeInstallPolicyWarning:!0})}}
                    >
                      ${y(`pluginsPage.continueInstall`)}
                    </button>`:O}
            `:O}
    </div>
  </div>`:O}function G(){return(G=e((()=>{k(),x(),b()})))()}var An;function jn(){return(jn=e((()=>{dn(),An=class{constructor(e){this.options=e,this.patch=(e,t)=>{if(!this.options.canEdit())return!1;this.options.onEdit();let n=this.options.getContext().runtimeConfig;return t===void 0?n.removeFormValue(e):n.patchForm(e,t),this.options.getDetail()&&this.options.isSettings()&&(this.write=n.flushFormChanges()),!0},this.render=e=>{let t=this.options.getDetail(),n=t?.inspection?.credentials?.find(t=>t.path.length===e.path.length&&t.path.every((t,n)=>t===e.path[n]));if(!t||!n)return;let r=this.options.getContext().runtimeConfig;return un(e,n,{pluginId:t.pluginId,baseHash:r.state.configSnapshot?.hash??null,gateway:this.options.gateway,canInspect:this.options.canInspect(),saveError:r.state.lastError,onDiscard:()=>r.discardFormValue(e.path),onCommit:async(t,n)=>{let r=this.write;return e.onPatch(t,n)!==!1&&this.write&&this.write!==r?this.write:!1}})}}}})))()}function Mn(e,t){return e.request(`plugins.inspect`,{pluginId:t})}function Nn(e){if(e instanceof C)return lt(e.details)}function Pn(){return(Pn=e((()=>{st(),me()})))()}async function Fn(e,t,n){let r,i=n?e.addEventListener(e=>{e.event===`plugins.install.progress`&&Ue(dt,e.payload)&&e.payload.requestId===r&&n(e.payload)}):void 0;try{return await e.request(`plugins.install`,t,{onSent:e=>{r=e}})}finally{i?.()}}function In(){return(In=e((()=>{We(),Ae()})))()}function Ln(e){if(e instanceof C)return ct(e.details)}function Rn(){return(Rn=e((()=>{ut(),me()})))()}function zn(e,t){let n=[...(e.warnings??[]).map(e=>f(e)),t?y(`pluginsPage.configRefreshFailed`,{error:t}):null].filter(Boolean);return n.length?{kind:`warning`,text:n.join(`
`)}:null}var Bn;function Vn(){return(Vn=e((()=>{i(),me(),x(),b(),Pn(),In(),Rn(),G(),Bn=class{constructor(e){this.host=e,this.consent=null,this.inspection=null,this.inspectionLoading=!1,this.inspectionError=null,this.installProgress=new Map,this.mutationToken=0,this.mutationTokens=new Map,this.installPolicyScopes=new Map}getActiveInstall(e){let t=this.installProgress.get(e);if(t&&t.finishedAt===void 0)return t;let n=this.host.getResult()?.plugins.find(t=>U(t.id)===e),r=n?.catalogId?this.installProgress.get(`install:${n.catalogId}`):void 0;return r?.finishedAt===void 0?r:void 0}reset(){this.close(),this.mutationTokens.clear(),this.installProgress.clear(),this.installPolicyScopes.clear()}reconcileInstallMessages(e){let t={...this.host.getMessages()},n=this.host.getResult();for(let[r,i]of Object.entries(t)){let a=i.savedInstall;if(!a)continue;let o=e?.plugins.some(e=>e.id===a&&e.installed);(o||e&&n?.plugins.some(e=>e.id===a&&e.installed))&&(this.installProgress.get(r)?.finishedAt!==void 0&&this.installProgress.delete(r),(!o||r!==U(a))&&delete t[r])}return t}async runMutation(e,t,n,r,i=t=>{this.host.setMessage(e,{kind:`error`,text:u(t)})}){let a=this.host.gateway.capture(),o=()=>(r.canDispatch??this.host.canMutate)()&&!this.getActiveInstall(e);if(!a||!o()||this.host.isBusy(e)||r.confirm&&(!await r.confirm()||!this.host.gateway.isCurrent(a)||!o()||this.host.isBusy(e)))return;this.host.clearPageNotice();let s=++this.mutationToken;this.mutationTokens.set(e,s);let c=()=>this.host.gateway.isCurrent(a)&&this.mutationTokens.get(e)===s,l=()=>c()&&this.mutationToken===s;this.host.setBusy(e,r.action),r.preserveMessageWhilePending||this.host.setMessage(e,null);try{let e=await ee(this.host.getContext().runtimeConfig,a.client,t,{canDispatch:()=>c()&&o()});c()&&await n(e.value,e.refreshError,a.client,c,l)}catch(e){c()&&await i(e,a,c)}finally{this.mutationTokens.get(e)===s&&(this.mutationTokens.delete(e),this.host.setBusy(e,null))}}open(e,t,n){if(!this.host.canMutate())return;let r=this.host.getResult()?.plugins.find(e=>e.id===t);this.host.closeDetails(),this.inspection=null,this.inspectionError=null,this.inspectionLoading=!0,this.consent={intent:e,pluginId:t,fallback:{name:r?.name??t,...r?.version?{version:r.version}:{},...r?.origin===`official`?{official:!0}:{}},...n?{details:n}:{}},this.host.requestUpdate(),this.inspect()}close(){this.consent=null,this.inspection=null,this.inspectionLoading=!1,this.inspectionError=null,this.host.requestUpdate()}async inspect(){let e=this.consent,t=this.host.gateway.capture();if(e?.pluginId&&t){this.inspectionLoading=!0,this.inspectionError=null,this.host.requestUpdate();try{let n=await Mn(t.client,e.pluginId);this.host.gateway.isCurrent(t)&&this.consent===e&&(this.inspection=n)}catch(n){this.host.gateway.isCurrent(t)&&this.consent===e&&(this.inspectionError=u(n))}finally{this.host.gateway.isCurrent(t)&&this.consent===e&&(this.inspectionLoading=!1,this.host.requestUpdate())}}}confirm(){let e=this.consent?.intent,t=this.inspection?.reviewToken;e&&!this.inspectionLoading&&!this.inspectionError&&t&&(this.close(),this.mutateInstalledPlugin(e.pluginId,e.kind,e.rowKey,{acknowledgeCapabilities:{reviewToken:t}}))}async install(e,t){let n=this.host.getResult()?.plugins.find(t=>t.installed&&(e.source===`official`||e.source===`bundled`?t.id===e.pluginId:e.source===`clawhub`?t.packageName===e.packageName:`expectedPluginId`in e&&t.id===e.expectedPluginId)),i=this.host.getMessages();if((i[t]??(n?i[U(n.id)]:void 0))?.savedInstall)return;let o=this.installPolicyScopes.get(t);if(this.installPolicyScopes.delete(t),e.acknowledgeInstallPolicyWarning&&(!o||!this.host.gateway.isCurrent(o))){this.host.setMessage(t,{kind:`error`,text:y(`pluginsPage.installDestinationChanged`)});return}await this.runMutation(t,async n=>{let r=this.host.gateway.capture(),i={startedAt:Date.now(),activities:[]};this.installProgress.set(t,i),this.host.requestUpdate();let a=()=>r&&this.host.gateway.isCurrent(r)&&this.installProgress.get(t)===i,o=await Fn(n,e,e=>{if(!a())return;let n=i.activities.findIndex(t=>t.activityId===e.activityId);i={...i,activities:n<0?[...i.activities,e]:i.activities.map((t,r)=>r===n?e:t)},this.installProgress.set(t,i),this.host.requestUpdate()});return a()&&(this.installProgress.delete(t),this.host.applyMutationResult(o)),o},async(e,n,r)=>{let i=U(e.plugin.id);i!==t&&this.host.setMessage(t,null),this.host.setMessage(i,zn(e,n)),await this.host.refreshCatalogAfterMutation(r)},{action:`install`,preserveMessageWhilePending:e.acknowledgeInstallPolicyWarning===!0},async(n,i,o)=>{let s=n instanceof C?r(n.details):void 0,c=r(s?.persistence),l=Ln(n),d=a(n)&&!c&&!l,p=c?.operation===`install`&&typeof c.pluginId==`string`&&c.pluginId.trim()?c.pluginId:void 0,m=p?`saved`:s?.pluginInstallRejected===!0?`rejected`:d?`retry`:`unknown`,h={title:y(`pluginsPage.installProgress.${m}.title`),recovery:y(`pluginsPage.installProgress.${m}.recovery`),detail:u(n)},g=this.installProgress.get(t);if(g&&(this.installProgress.set(t,{...g,finishedAt:Date.now(),canRetry:d,...!l||p?{failure:h}:{}}),this.host.requestUpdate()),p){let e=p,a=U(e),c=r(s?.runtime),l=r(s?.runtimeAttempt)?.phase??c?.phase,d={kind:`error`,savedInstall:e,text:[y(c?.committed===!1?`pluginsPage.installSavedNotApplied`:`pluginsPage.installSaved`,{name:e,error:u(n)}),typeof l==`string`?y(`pluginsPage.runtimeFailurePhase`,{phase:f(l)}):null].filter(Boolean).join(`
`)};await this.reconcileCommittedFailure([t,a],d,i.client,o);return}if(l){this.installPolicyScopes.set(t,i),this.host.setMessage(t,{kind:`warning`,text:l.reason,installPolicyWarning:{details:l,request:e}});return}this.host.setMessage(t,{kind:`error`,text:`${h.recovery}\n${h.detail}`})})}async reconcileCommittedFailure(e,t,n,r){for(let n of e)this.host.setMessage(n,t);let i=this.host.getContext().runtimeConfig.refresh(),[a]=await Promise.allSettled([i,r()?this.host.refreshCatalogAfterMutation(n):Promise.resolve()]);if(r()&&a.status===`rejected`)for(let n of new Set(e))this.host.getMessages()[n]===t&&this.host.setMessage(n,{...t,text:`${t.text}\n${y(`pluginsPage.configRefreshFailed`,{error:u(a.reason)})}`})}async mutateInstalledPlugin(e,t,n=U(e),i={}){await this.runMutation(n,n=>p(n,e,t===`enable`,i),async(e,t,r)=>{this.host.applyMutationResult(e),this.host.setMessage(n,zn(e,t)),await this.host.refreshCatalogAfterMutation(r)},{action:t},async(i,a,o)=>{let s=i instanceof C?r(i.details):void 0,c=r(s?.runtime),l=Nn(i);if(t!==`disable`&&c?.committed!==!0&&l&&this.host.canMutate()){this.open({kind:t,pluginId:e,rowKey:n},l.pluginId,l);return}let d=r(s?.runtimeAttempt)?.phase??c?.phase,p=this.host.getMessages()[n]?.savedInstall,m={kind:`error`,...p?{savedInstall:p}:{},text:[u(i),typeof d==`string`?y(`pluginsPage.runtimeFailurePhase`,{phase:f(d)}):null].filter(Boolean).join(`
`)};c?.committed===!0?await this.reconcileCommittedFailure([n],m,a.client,o):this.host.setMessage(n,m)})}}})))()}async function Hn(e){let{pluginId:t,plugin:n,catalog:r,gateway:i}=e,a=e.getDetail(),o=a?.pluginId===t?a:null,s=t?{...o,pluginId:t,inspection:o?.inspection??null,catalog:o?.catalog??(r&&r.plugin.id===n?.catalogId?r:void 0),error:null}:null;e.onChange(s);let c=i.capture();if(!n?.installed||!s||!c||!e.canInspect)return;let l=s,{client:d}=c,f=()=>i.isCurrent(c)&&e.getDetail()===l,p=t=>{f()&&(l=t,e.onChange(t))},m=Me({hello:i.snapshot?.hello},`tools.catalog`)===!0?d.request(`tools.catalog`,{includePlugins:!0}).catch(()=>void 0):Promise.resolve(void 0);try{let e=await Mn(d,n.id);if(!f()||(p({...l,inspection:e,tools:void 0,catalog:e.catalog??l.catalog,catalogLoading:!(!n.catalogId||e.catalog||l.catalog)}),m.then(t=>{if(!t)return;let r=new Map(e.declared.tools.map(e=>[e,{name:e}]));for(let e of t.groups.filter(e=>e.pluginId===n.id))for(let t of e.tools)r.set(t.id,{name:t.id,description:t.fullDescription??t.description,parameters:t.parameters});p({...l,tools:[...r.values()]})}),!n.catalogId))return;try{let e=await _(d,n.catalogId,void 0,n.version);p({...l,catalog:e,catalogLoading:!1})}catch{p({...l,catalogLoading:!1})}}catch(e){p({...l,error:u(e)})}}async function Un(e){let{id:t,gateway:n,context:r,location:i,inventory:a}=e,o=e.getDetail();if(e.uninstalling&&o?.id===t)return;let s=o?.id===t?o.result:null;if(s?.detail.origin===`local`&&s.plugin.local.installed&&a&&!a.plugins.some(e=>e.id===s.plugin.local.pluginId)){e.onChange(null),e.showInstalled(null),r.replace(`plugins`,{pathname:E(`plugins`,r.basePath)});return}let c=t?{id:t,result:s,error:null}:null;o?.id!==t&&e.showInstalled(null),e.onChange(c);let l=n.capture();if(!c||!l)return;let d=a?.plugins.find(e=>e.installed&&e.catalogId===t),f=()=>{new URLSearchParams(i?.search).get(`action`)===`install`&&r.replace(`plugins`,{pathname:i?.pathname,search:``})};if(d){f(),await e.showInstalled(d.id);return}e.showInstalled(null);try{let t=await _(l.client,c.id);n.isCurrent(l)&&e.getDetail()===c&&(e.onChange({...c,result:t}),e.showInstalled(t.plugin.local.installed?t.plugin.local.pluginId??null:null),f())}catch(t){n.isCurrent(l)&&e.getDetail()===c&&e.onChange({...c,error:u(t)})}}function Wn(){return(Wn=e((()=>{pe(),b(),Ne(),Pn()})))()}function Gn(e){return new Set(Array.from(e.querySelectorAll(`[data-plugin-icon-id]`),e=>e.dataset.pluginIconId??``).filter(Boolean))}var Kn;function qn(){return(qn=e((()=>{le(),wt(),Kn=class{constructor(e){this.authCandidates=[],this.isInstalledLoading=e=>this.installed.isLoading(e),this.isCatalogLoading=e=>this.catalog.isLoading(e);let t={getFetchContext:()=>vt(e.getContext()),isConnected:e.isConnected,onLoadingChange:e.onLoadingChange};this.installed=new St({...t,onUrlsChange:e.onInstalledUrlsChange}),this.catalog=new St({kind:`catalog`,...t,onUrlsChange:e.onCatalogUrlsChange})}updateAuth(e){let t=ue(e),n=t.length!==this.authCandidates.length||t.some((e,t)=>e!==this.authCandidates[t]);return this.authCandidates=t,n}syncInstalled(e,t){this.installed.sync(e,Gn(t))}reconcileInstalled(e){this.installed.reconcile(e)}invalidateInstalled(e){this.installed.invalidate(e)}handleInstalledError(e){this.installed.handleError(e)}syncCatalog(e,t,n){let r=Gn(t);this.catalog.syncCatalog([...e.result?.items??[],...e.featured,...e.trending,...n?[n.plugin]:[]],n?.detail.author?.imageUrl?[n.detail.author.imageUrl]:[],r)}resetInstalled(){this.installed.reset()}reset(){this.installed.reset(),this.catalog.reset()}}})))()}function Jn(e,t){if(!e)return e;let n=e.plugins.findIndex(e=>e.id===t.id),r=[...e.plugins];return n>=0?r[n]=t:r.push(t),{...e,plugins:r}}function Yn(e){return e.connected?e.hasAdminAccess?e.mutationAllowed===!1?y(`pluginsPage.changesDisabled`):null:y(`pluginsPage.adminRequired`):y(`pluginsPage.connectToChange`)}function Xn(e){if(e.plugin.local.installed||e.plugin.local.action!==`install`)return null;if(e.plugin.local.install)return e.plugin.local.install;let t=e.detail.packageName?.trim();return t?{source:`clawhub`,packageName:t}:null}function Zn(){return(Zn=e((()=>{x(),F(),I()})))()}var K;function Qn(){return(Qn=e((()=>{ze(),k(),M(),Ge(),T(),x(),F(),m(),n(),ie(),I(),K=class extends se{constructor(...e){super(...e),this.busy=!1,this.disabled=!1,this.pluginName=``,this.buttonClass=``,this.primary=!1,this.onInstall=()=>{},this.open=!1,this.now=Date.now(),this.pinned=!1,this.hovering=!1,this.progressId=`plugin-install-progress-${o()}`,this.handleEscape=e=>{e.key===`Escape`&&this.open&&(this.dismiss(),e.stopPropagation())}}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleEscape)}disconnectedCallback(){clearInterval(this.timer),document.removeEventListener(`keydown`,this.handleEscape),super.disconnectedCallback()}updated(e){(e.has(`progress`)||e.has(`busy`))&&(this.configurePopup(),clearInterval(this.timer),this.timer=void 0,this.progress&&this.progress.finishedAt===void 0&&(this.timer=setInterval(()=>{this.now=Date.now()},1e3)),!this.progress&&!this.busy&&this.dismiss()),this.toggleAttribute(`open`,this.open&&!!this.progress)}dismiss(){this.pinned=!1,this.open=!1}configurePopup(){let e=this.querySelector(`wa-popup`),t=this.querySelector(`button`);e instanceof Ve&&t&&(Ze(e,t,`bottom`),e.distance=16,e.hoverBridge=!0)}render(){let e=this.progress,t=e?.finishedAt!==void 0,n=!!e||this.busy,r=!n||e?.canRetry===!0&&!this.busy,i=e?Math.max(0,Math.floor(((e.finishedAt??this.now)-e.startedAt)/1e3)):0;return D`<span
      class="plugin-install-action"
      @mouseenter=${()=>{this.hovering=!0,this.open=!0}}
      @mouseleave=${()=>{this.hovering=!1,!this.pinned&&!this.contains(document.activeElement)&&(this.open=!1)}}
      @focusin=${()=>{this.open=!0}}
      @focusout=${e=>{!this.pinned&&!this.hovering&&!(e.relatedTarget instanceof Node&&this.contains(e.relatedTarget))&&(this.open=!1)}}
    >
      <button
        type="button"
        class=${`${this.buttonClass} plugin-install-action__button ${this.primary&&!t?`primary oc-action-primary`:`oc-action-secondary`} ${t?`plugin-install-action__button--failed`:``}`}
        ?disabled=${this.disabled&&r}
        aria-label=${this.pluginName&&(r||t)?y(r?t?`pluginsPage.retryInstallNamed`:`pluginsPage.installNamed`:`pluginsPage.viewInstallStatusNamed`,{name:this.pluginName}):O}
        aria-busy=${n&&!t?`true`:O}
        aria-expanded=${e?String(this.open):O}
        aria-controls=${e?this.progressId:O}
        @click=${e=>{e.preventDefault(),e.stopPropagation(),r?this.disabled||this.onInstall():(this.pinned=!this.pinned,this.open=this.pinned)}}
      >
        ${n&&!t?D`<span class="btn__spinner" aria-hidden="true"></span>`:O}
        ${y(r?t?`pluginsPage.retryInstall`:`pluginsPage.install`:t?`pluginsPage.installProgress.viewStatus`:`pluginsPage.installing`)}
        ${e?w.chevronDown:O}
      </button>
      ${e?D`<wa-popup class="plugin-install-action__popup" ?active=${this.open}>
              <section
                class="plugin-install-progress"
                id=${this.progressId}
                role="status"
                aria-label=${y(`pluginsPage.installProgress.title`)}
              >
                <div class="plugin-install-progress__header">
                  <strong
                    >${e.failure?.title??y(t?`pluginsPage.installProgress.stopped`:`pluginsPage.installProgress.title`)}</strong
                  ><span aria-hidden="true"
                    >${d({value:i,unit:`second`})}</span
                  >
                </div>
                ${e.failure&&!e.canRetry?D`<p class="plugin-install-progress__recovery">${e.failure.recovery}</p>`:O}
                <ol class="plugin-install-progress__activities">
                  ${e.activities.map(e=>D`<li
                      class=${`plugin-install-progress__activity plugin-install-progress__activity--${e.status}`}
                    >
                      <span class="plugin-install-progress__icon" aria-hidden="true"
                        >${e.status===`completed`?w.check:e.status===`failed`?`!`:O}</span
                      >
                      <span
                        >${y(`pluginsPage.installProgress.${e.stage}.${e.status}`)}</span
                      >
                    </li>`)}
                  ${t&&!e.activities.some(e=>e.status===`failed`)?D`<li class="plugin-install-progress__activity plugin-install-progress__activity--failed"><span class="plugin-install-progress__icon" aria-hidden="true">!</span><span>${y(`pluginsPage.installProgress.failure`)}</span></li>`:O}
                </ol>
                ${e.failure?D`<details class="plugin-install-progress__failure">
                        <summary>${y(`pluginsPage.installProgress.details`)}</summary>
                        <p>${e.failure.detail}</p>
                      </details>`:O}
              </section>
            </wa-popup>`:O}
    </span>`}},s([P({attribute:!1})],K.prototype,`progress`,void 0),s([P({attribute:!1})],K.prototype,`busy`,void 0),s([P({attribute:!1})],K.prototype,`disabled`,void 0),s([P({attribute:!1})],K.prototype,`pluginName`,void 0),s([P({attribute:!1})],K.prototype,`buttonClass`,void 0),s([P({attribute:!1})],K.prototype,`primary`,void 0),s([P({attribute:!1})],K.prototype,`onInstall`,void 0),s([j()],K.prototype,`open`,void 0),s([j()],K.prototype,`now`,void 0),customElements.get(`openclaw-plugin-install-action`)||customElements.define(`openclaw-plugin-install-action`,K)})))()}function $n(e){return D`<nav class="plugins-settings-breadcrumb" aria-label=${y(`pluginsPage.breadcrumb`)}>
    <a
      class="plugins-settings-breadcrumb__parent"
      href=${e.backHref}
      @click=${t=>{v(t)&&(t.preventDefault(),e.onBack())}}
      >${e.backLabel}</a
    >
    <span class="plugins-settings-breadcrumb__chevron" aria-hidden="true"
      >${w.chevronRight}</span
    >
    <span class="plugins-settings-breadcrumb__current" aria-current="page">${e.name}</span>
  </nav>`}function er(e){let t=`${e.id}-title`;return D`<section
    class="plugin-catalog-detail ${e.sidebar?``:`plugin-catalog-detail--no-sidebar`}"
    aria-labelledby=${t}
  >
    ${$n(e)}
    <div class="plugin-catalog-detail__hero">
      ${e.icon?D`<div class="plugin-catalog-detail__icon" aria-hidden="true">${e.icon}</div>`:O}
      <div class="plugin-catalog-detail__heading">
        <div class="plugin-catalog-detail__title-row">
          <h1 id=${t}>${e.name}</h1>
        </div>
        ${e.identity}
        ${e.summary?D`<p class="plugin-catalog-detail__summary">${e.summary}</p>`:O}
        <div class="plugin-catalog-detail__actions">${e.titleAction??O}</div>
      </div>
    </div>
    <div class="plugin-catalog-detail__content">
      <section class="plugin-catalog-detail__panel">${e.panel}</section>
      ${e.sidebar?D`<aside class="plugin-catalog-detail__sidebar">${e.sidebar}</aside>`:O}
      ${e.readme?D`<section class="plugin-catalog-detail__readme-section">${e.readme}</section>`:O}
    </div>
  </section>`}function tr(){return(tr=e((()=>{k(),T(),x(),F(),I()})))()}function nr(e){return e&&hr[e]||w.box}function rr(e,t){let n=ht({pluginId:e.local.pluginId,imageUrl:e.catalog.imageUrl},t);return bt(e.local.pluginId??e.id,e.catalog.name,{iconUrl:n??void 0,whiteBackground:e.catalog.official&&!!n,loading:!!(e.local.pluginId&&t.pluginIconLoading?.(e.local.pluginId)||e.catalog.imageUrl&&t.iconLoading?.(e.catalog.imageUrl))})}function ir(e){if(e<1e3)return new Intl.NumberFormat().format(e);if(e<1e6){let t=e/1e3;return`${t>=100?Math.round(t):Number(t.toFixed(1))}k`}let t=e/1e6;return`${t>=100?Math.round(t):Number(t.toFixed(1))}m`}function ar(e,t){let n=e.local.state===`not-installed`?null:e.local.state,r=t.installProgress?.get(`install:${e.id}`),i=!!(r&&r.finishedAt===void 0),a=e.local.installed&&n!==null&&!i,o=!!t.busy?.[`install:${e.id}`],s=t.canInstall&&e.local.action===`install`&&!o&&!t.messages?.[`install:${e.id}`]?.savedInstall;return D`<article
    class="plugin-catalog-card oc-card oc-card-interactive"
    data-plugin-id=${e.id}
  >
    <a
      class="plugin-catalog-card__primary-link"
      href=${t.entryHref(e.id)}
      aria-label=${e.catalog.name}
      @click=${n=>{v(n)&&(n.preventDefault(),t.onOpenEntry(e.id))}}
    ></a>
    <div class="plugin-catalog-card__head">
      <div class="installed-plugins-card__head">
        <span
          class="installed-plugins-card__art plugin-catalog-card__art"
          aria-hidden="true"
          data-plugin-icon-id=${e.local.pluginId??O}
        >
          ${rr(e,t)}
        </span>
        ${Tt({name:e.catalog.name,attribution:{...e.catalog.author?{author:e.catalog.author}:{},official:e.catalog.official},linkedAuthor:!0})}
      </div>
      <div class="plugin-catalog-card__action">
        ${a?Et(n,`plugin-catalog-card__status`):D`<openclaw-plugin-install-action
                .buttonClass=${`btn btn--sm plugin-catalog-card__install oc-action oc-action-secondary`}
                .pluginName=${e.catalog.name}
                .busy=${o}
                .disabled=${!s}
                .progress=${r}
                .onInstall=${()=>t.onInstall(e.id)}
              ></openclaw-plugin-install-action>`}
      </div>
    </div>
    ${Dt(e.catalog.summary||y(`pluginsPage.optionalCapability`))}
    ${W(t.messages?.[`install:${e.id}`],{busy:o,onContinue:t.canInstall&&t.onContinueInstall?n=>t.onContinueInstall?.(e.id,n):void 0})}
  </article>`}function or(e){return D`<div
    class="plugin-catalog-grid plugin-catalog-grid--skeleton"
    role="status"
    aria-busy="true"
    aria-label=${e.label??y(`common.loading`)}
  >
    ${Array.from({length:e.cards},()=>D`<div
        class="plugin-catalog-card oc-card plugin-catalog-card--skeleton"
        aria-hidden="true"
      >
        <div class="plugin-catalog-card__head">
          <div class="installed-plugins-card__head">
            <span class="skeleton plugin-catalog-card__skeleton-art"></span>
            <div class="installed-plugins-card__identity">
              <span class="skeleton plugin-catalog-card__skeleton-title"></span>
            </div>
          </div>
          <div class="plugin-catalog-card__action">
            <span class="skeleton plugin-catalog-card__skeleton-action"></span>
          </div>
        </div>
        <span class="plugin-catalog-card__skeleton-summary">
          <span class="skeleton plugin-catalog-card__skeleton-line"></span>
          <span class="skeleton plugin-catalog-card__skeleton-line"></span>
        </span>
      </div>`)}
  </div>`}function q(e,t){return D`<div class="callout danger oc-banner oc-banner-error" role="alert">
    <span>${f(e)}</span>
    <button
      type="button"
      class="btn btn--sm oc-action oc-action-secondary oc-banner-action"
      @click=${t}
    >
      ${y(`pluginsPage.tryAgain`)}
    </button>
  </div>`}function sr(e){return!e.loading&&!e.error&&e.items.length===0?O:D`<section
    class="plugin-catalog-section ${e.onViewAll?`plugin-catalog-section--expandable`:``}"
    data-catalog-section=${e.id}
  >
    <header class="plugin-catalog-section__header">
      <h2>${e.title}</h2>
      ${e.onViewAll?D`<button
              type="button"
              class="btn btn--sm plugin-catalog-section__view-all oc-action oc-action-ghost"
              @click=${e.onViewAll}
            >
              ${y(`pluginsPage.viewAllInstalledPlugins`)}
            </button>`:O}
    </header>
    ${e.loading?or({cards:fr}):e.error&&e.onRetry?q(e.error,e.onRetry):D`<div class="plugin-catalog-grid">
              ${A(e.onViewAll?e.items.slice(0,fr):e.items,e=>e.id,t=>ar(t,e.props))}
            </div>`}
  </section>`}function cr(e){return D`<div
    class="plugin-catalog-chips"
    role="group"
    aria-label=${y(`pluginsPage.categoriesLabel`)}
  >
    ${[[`all`,`pluginsPage.intentAll`,w.layoutGrid],...mr].map(([t,n,r])=>{let i=e.intent===t&&(t!==`all`||e.category===null);return D`<button
          type="button"
          class="plugin-catalog-chip ${i?`is-active`:``}"
          aria-pressed=${i}
          @click=${()=>e.onIntentChange(t)}
        >
          <span aria-hidden="true">${r}</span>${y(n)}
        </button>`})}
    ${e.categoriesLoading?D`<span class="sr-only" role="status">${y(`pluginsPage.loadingCategories`)}</span>
            ${Array.from({length:pr},()=>D`<span
                class="skeleton plugin-catalog-chip--skeleton"
                aria-hidden="true"
              ></span>`)} `:O}
    ${A(e.categories.filter(e=>e.slug!==`other`).toSorted((e,t)=>e.order-t.order),e=>e.slug,t=>D`<button
        type="button"
        class="plugin-catalog-chip ${e.category===t.slug?`is-active`:``}"
        aria-pressed=${e.category===t.slug}
        @click=${()=>e.onCategoryChange(t.slug)}
      >
        <span aria-hidden="true">${nr(t.icon)}</span>${t.label}
      </button>`)}
  </div>`}function lr(e){let t=e.result?.items??[];if(e.loading)return or({label:y(`pluginsPage.loadingDiscovery`),cards:fr});if(e.error)return q(e.error,e.onRetry);if(!e.connected)return D`<p class="plugin-catalog-results__empty">${y(`pluginsPage.discoveryOffline`)}</p>`;if(t.length===0)return jt({icon:w.search,heading:y(`pluginsPage.noDiscoveryResults`),description:y(`pluginsPage.noDiscoveryResultsHint`)});let n=t.filter(e=>e.catalog.official),r=t.filter(e=>!e.catalog.official);return D`
    ${e.query.trim()&&n.length>0&&r.length>0?D`
            ${sr({id:`official`,title:y(`pluginsPage.official`),items:n,props:e})}
            ${sr({id:`community`,title:y(`pluginsPage.community`),items:r,props:e})}
          `:D`<div class="plugin-catalog-grid plugin-catalog-grid--results">
            ${A(t,e=>e.id,t=>ar(t,e))}
          </div>`}
    ${e.loadMoreError?q(e.loadMoreError,e.onLoadMore):O}
    ${e.result?.nextCursor?D`<div class="plugin-catalog-load-more">
            <button
              type="button"
              class="btn btn--sm oc-action oc-action-secondary"
              ?disabled=${e.loadingMore}
              @click=${e.onLoadMore}
            >
              ${e.loadingMore?y(`pluginsPage.loadingMore`):y(`pluginsPage.loadMore`)}
            </button>
          </div>`:O}
  `}function ur(e){let t=e.result?.items??[],n=e.categories.filter(e=>e.slug!==`other`).toSorted((e,t)=>e.order-t.order);return!(e.featured.length>0||e.trending.length>0||t.some(e=>n.some(t=>e.catalog.categories.includes(t.slug))))&&!e.loading&&!e.featuredLoading&&!e.trendingLoading&&!e.error&&!e.remoteError?jt({icon:w.search,heading:y(`pluginsPage.noDiscoveryResults`),description:y(`pluginsPage.noDiscoveryResultsHint`)}):D`
    ${e.error?q(e.error,e.onRetry):O}
    ${mr.map(([t,n])=>sr({id:t,title:y(n),items:e[t],loading:e[`${t}Loading`],onViewAll:()=>e.onIntentChange(t),props:e}))}
    ${A(n,e=>e.slug,n=>sr({id:n.slug,title:n.label,items:t.filter(e=>e.catalog.categories.includes(n.slug)).toSorted((e,t)=>hn(e,t,n.slug)),onViewAll:()=>e.onCategoryChange(n.slug),props:e}))}
  `}function dr(e){let t=!e.query.trim()&&e.intent===`all`&&e.category===null;return D`<section class="plugin-catalog-results" aria-label=${y(`pluginsPage.exploreTitle`)}>
    <label class="plugin-catalog-search">
      <span aria-hidden="true">${w.search}</span>
      <input
        type="search"
        class="oc-input"
        autofocus
        aria-label=${y(`pluginsPage.searchPlugins`)}
        placeholder=${y(`pluginsPage.searchPlugins`)}
        .value=${e.query}
        ${Ce(e=>{e instanceof HTMLInputElement&&!e.dataset.autofocused&&(e.dataset.autofocused=`true`,e.focus(),requestAnimationFrame(()=>requestAnimationFrame(()=>{e.isConnected&&e.focus()})))})}
        @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onQueryChange(t.currentTarget.value)}}
      />
    </label>
    ${cr(e)}
    ${e.categoriesError?q(e.categoriesError,e.onRetryCategories):O}
    ${e.remoteError?D`<div class="callout warning oc-banner" role="status">
            <span>${f(e.remoteError)}</span>
            <button
              type="button"
              class="btn btn--sm oc-action oc-action-secondary oc-banner-action"
              @click=${e.onRetry}
            >
              ${y(`pluginsPage.tryAgain`)}
            </button>
          </div>`:O}
    <div class="plugin-catalog-results__body">
      ${t?ur(e):lr(e)}
    </div>
  </section>`}var fr,pr,mr,hr;function gr(){return(gr=e((()=>{k(),we(),Qn(),Ee(),ce(),T(),Mt(),x(),b(),yt(),xt(),G(),Ot(),fr=8,pr=22,mr=[[`featured`,`pluginsPage.featuredTitle`,w.star],[`trending`,`pluginsPage.intentTrending`,w.barChart]],hr={activity:w.activity,"book-open":w.book,brain:w.brain,bot:w.bot,database:S(N` <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />`),"git-branch":w.gitPullRequest,globe:w.globe,"message-circle":w.messageSquare,"message-square":w.messageSquare,mic:w.mic,monitor:w.monitor,package:w.box,palette:w.palette,shield:w.shield,wrench:w.settings,plug:w.plug,"code-xml":S(N` <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />`),server:w.server,files:S(N` <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" />
    <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" />`),inbox:w.inbox,"list-todo":S(N` <path d="M13 5h8" />
    <path d="M13 12h8" />
    <path d="M13 19h8" />
    <path d="m3 17 2 2 4-4" />
    <rect x="3" y="4" width="6" height="6" rx="1" />`),"calendar-days":S(N` <path d="M8 2v3" />
    <path d="M16 2v3" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 13h.01" />
    <path d="M12 13h.01" />
    <path d="M16 13h.01" />
    <path d="M8 17h.01" />
    <path d="M12 17h.01" />
    <path d="M16 17h.01" />`),"wallet-cards":S(N` <path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" />
    <path d="M3 7h18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />`),megaphone:S(N` <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
    <path d="M8 6v8" />`),"chart-no-axes-combined":S(N` <path d="M12 16v5" />
    <path d="M16 14.639V21" />
    <path d="M20 10.656V21" />
    <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
    <path d="M4 18.463V21" />
    <path d="M8 14.656V21" />`),workflow:S(N` <rect width="8" height="8" x="3" y="3" rx="2" />
    <path d="M7 11v4a2 2 0 0 0 2 2h4" />
    <rect width="8" height="8" x="13" y="13" rx="2" />`),search:w.search}})))()}function _r(e){return/^(?:clean|pass|safe|benign|cleared)$/iu.test(e)?`pass`:/^(?:suspicious|warning|review)$/iu.test(e)?`warning`:/^(?:blocked|danger|fail|malicious)$/iu.test(e)?`danger`:`unknown`}function vr(e,t){let n=_r(e),r={pass:3,warning:2,danger:1,unknown:0}[n];return D`<a
    class="plugin-catalog-detail__security plugin-catalog-detail__security--${n}"
    href=${t??O}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2>
      ${y(`pluginsPage.detailSecurity`)}
      <span title=${y(`pluginsPage.detailSecurityAudit`)}>${w.info}</span>
    </h2>
    <div class="plugin-catalog-detail__security-score">
      <strong>${n===`pass`?`Clean`:n===`warning`?`Review`:e}</strong>
      ${[0,1,2].map(e=>D`<span class=${e<r?`is-filled`:``} aria-hidden="true"></span>`)}
    </div>
  </a>`}function yr(){return(yr=e((()=>{k(),T(),x(),F(),I()})))()}function br(e){if(!e)return null;try{let t=new URL(e);return/^https?:$/u.test(t.protocol)&&!t.username&&!t.password?t:null}catch{return null}}function xr(e){if(!e)return null;let t=br(/^[\w.-]+\/[\w.-]+$/u.test(e)?`https://github.com/${e}`:e.replace(/^git\+/u,``));if(!t)return null;let n=t.hostname===`github.com`,[r,i]=t.pathname.split(`/`).filter(Boolean);if(n&&r&&i){let e=`${r}/${i.replace(/\.git$/u,``)}`;return{href:`https://github.com/${e}`,name:e,github:n}}return{href:t.href,name:t.hostname+t.pathname.replace(/\/$/u,``),github:n}}function Sr(e,t){let n=e?.detail.author,r=n?.handle??e?.plugin.catalog.author,i=n?.displayName??t;return!i&&!r?O:D`<div class="plugin-catalog-detail__publisher">
    <span class="plugin-catalog-detail__publisher-name">
      ${i?D`<strong>${i}</strong>`:gt(r,{linked:!0})}
      ${n?.official===!0?_t():O}
    </span>
    ${i?gt(r,{linked:!0}):O}
  </div>`}function Cr(e,t,n,r=!1){let i=e?.detail,a=e?.plugin.catalog,o=xr(n?.repositoryUrl??i?.repositoryUrl??i?.verification?.sourceRepo),s=br(n?.documentationUrl??i?.documentationUrl),c=[[y(`pluginsPage.catalogDownloadsColumn`),a?.downloads===void 0?void 0:ir(a.downloads)],[y(`pluginsPage.detailPublished`),i?.createdAt===void 0?void 0:re(i.createdAt,{dateStyle:`medium`})],[y(t?`pluginsPage.detailInstalledVersion`:`pluginsPage.version`),t??a?.latestVersion],[y(`pluginsPage.detailUpdated`),i?.updatedAt===void 0?void 0:re(i.updatedAt,{dateStyle:`medium`})]],l=a?.categories??[],u=D`<span
    class="plugin-metadata__placeholder skeleton"
    aria-hidden="true"
  ></span>`;return D`
    ${r?D`<section class="plugin-metadata__loading" role="status" aria-label=${y(`pluginsPage.detailLoading`)}><span class="plugin-metadata__placeholder skeleton" aria-hidden="true"></span>${u}</section>`:O}
    ${i?.security?vr(i.security.verdict??`unknown`,i.security.auditUrl):O}
    ${r||c.some(([,e])=>e!==void 0)?D`<dl class="plugin-metadata__facts">
            ${c.filter(([,e])=>r||e!==void 0).map(([e,t])=>D`<div>
                    <dt>${e}</dt>
                    <dd>${t??u}</dd>
                  </div>`)}
          </dl>`:O}
    ${l.length?D`<section class="plugin-metadata__section">
            <h2>${y(`pluginsPage.detailCategories`)}</h2>
            <div class="plugin-metadata__categories">
              ${l.map(e=>D`<span class="chip">${e}</span>`)}
            </div>
          </section>`:O}
    ${o?D`<section class="plugin-metadata__section">
            <h2>${y(`pluginsPage.detailRepository`)}</h2>
            <a
              class="plugin-metadata__repository"
              href=${o.href}
              target="_blank"
              rel="noopener noreferrer"
              >${o.github?w.github:w.externalLink}<span
                >${o.name}</span
              ></a
            >
          </section>`:O}
    ${s?D`<section class="plugin-metadata__section">
            <h2>${y(`pluginsPage.detailDocumentation`)}</h2>
            <a href=${s.href} target="_blank" rel="noopener noreferrer"
              >${y(`pluginsPage.detailDocumentation`)} ${w.arrowUpRight}</a
            >
          </section>`:O}
  `}function J(e,t,n){return D`${t.length?D`<section class="plugin-capabilities">
          <h2>${e}<span>${t.length}</span></h2>
          <div>
            ${t.map(e=>{let t=e.onOpen,r=D`<span class="plugin-capability__icon" aria-hidden="true"
                  >${n}</span
                ><span class="plugin-capability__copy"
                  ><strong>${e.name}</strong
                  >${e.description?D`<span>${e.description}</span>`:O}</span
                >${e.trailing?D`<span class="plugin-capability__trailing">${e.trailing}</span>`:O}${t?w.chevronRight:O}`;return D`<div class="plugin-capability">
                ${t?D`<button type="button" @click=${t}>${r}</button>`:D`<div class="plugin-capability__static">${r}</div>`}
              </div>`})}
          </div>
        </section>`:O}`}function wr(e,t){return J(y(`pluginsPage.detailCapabilities`),[...Er.filter(t=>e?.[t]?.length).map(e=>({name:y(`pluginsPage.capabilityFamilies.${e}.name`),description:y(`pluginsPage.capabilityFamilies.${e}.description`)})),...ke.filter(e=>t?.includes(e)).map(e=>({name:y(`pluginsPage.uiCapabilities.${e}.name`),description:y(`pluginsPage.uiCapabilities.${e}.description`)}))],w.layers)}function Tr(e,t=!0){return e?D`<button
        type="button"
        class="btn oc-action ${t?`primary oc-action-primary`:`oc-action-secondary`}"
        @click=${e}
      >
        ${y(`nav.askOpenClaw`)}
      </button>`:O}var Er;function Y(){return(Y=e((()=>{k(),Oe(),T(),x(),m(),gr(),xt(),yr(),Er=[`speechProviders`,`realtimeTranscriptionProviders`,`realtimeVoiceProviders`,`mediaUnderstandingProviders`,`imageGenerationProviders`,`videoGenerationProviders`,`musicGenerationProviders`,`embeddingProviders`,`webSearchProviders`,`webFetchProviders`,`webContentExtractors`,`documentExtractors`,`transcriptSourceProviders`,`migrationProviders`]})))()}function Dr(e){let t=e?tt(e,{mode:`document`}).replaceAll(`<h1`,`<h2`).replaceAll(`</h1>`,`</h2>`):null;return e?D`<article
        class="plugin-catalog-detail__readme sidebar-markdown"
        @click=${Je}
      >
        ${Te(t)}
      </article>`:D`<p class="plugin-catalog-detail__empty">${y(`pluginsPage.detailNoReadme`)}</p>`}function Or(e,t){let{plugin:n,detail:r}=e,i=!!(t.installProgress&&t.installProgress.finishedAt===void 0),a=n.catalog.imageUrl?t.iconUrls[n.catalog.imageUrl]:void 0,o=r.author?.imageUrl?t.iconUrls[r.author.imageUrl]:void 0;return er({id:`plugin-catalog-detail`,name:n.catalog.name,summary:n.catalog.summary,backHref:t.backHref,backLabel:y(`tabs.plugins`),onBack:t.onBack,icon:bt(n.id,n.catalog.name,{iconUrl:a,authorIconUrl:o,whiteBackground:n.catalog.official&&!!a,loading:!!(n.catalog.imageUrl&&t.iconLoading?.(n.catalog.imageUrl)||r.author?.imageUrl&&t.iconLoading?.(r.author.imageUrl))}),titleAction:D`${n.local.action===`install`||i?ot(t.installBlockedReason,D`<openclaw-plugin-install-action
              .buttonClass=${`btn oc-action plugin-catalog-detail__install`}
              .primary=${!0}
              .disabled=${!t.canInstall}
              .busy=${!!t.busy}
              .progress=${t.installProgress}
              .onInstall=${t.onInstall}
            ></openclaw-plugin-install-action>`):O}${Tr(t.onAskPlugin,n.local.action!==`install`&&!i)}`,identity:Sr(e),sidebar:Cr(e),panel:D`${W(t.message,{busy:t.busy,onContinue:t.canInstall?t.onContinueInstall:void 0})}
    ${wr(r.contracts,r.uiCapabilities)}
    ${t.skillsSection??J(y(`pluginsPage.detailTabs.skills`),r.skills,w.bookOpenText)}
    ${J(y(`pluginsPage.detailTools`),(r.contracts?.tools??[]).map(e=>({name:e})),w.wrench)}
    ${J(y(`pluginsPage.detailMcpServers`),r.mcpServers.map(e=>({name:e})),w.plug)}`,readme:r.readme?Dr(r.readme):void 0})}function kr(e){return z(e.error?D`<div class="callout danger oc-banner oc-banner-error" role="alert">
          <span>${f(e.error)}</span>
          <button type="button" class="btn btn--sm" @click=${e.onRetry}>
            ${y(`pluginsPage.tryAgain`)}
          </button>
        </div>`:e.connected?e.result?Or(e.result,e):D`<section
              class="plugin-catalog-detail plugin-catalog-detail--loading"
              aria-label=${y(`pluginsPage.detailLoading`)}
            >
              <div class="plugin-catalog-detail__back skeleton"></div>
              <div class="plugin-catalog-detail__hero">
                <div class="plugin-catalog-detail__icon skeleton"></div>
                <div>
                  <div class="plugin-catalog-detail__loading-title skeleton"></div>
                  <div class="plugin-catalog-detail__loading-publisher skeleton"></div>
                  <div class="plugin-catalog-detail__loading-summary skeleton"></div>
                </div>
              </div>
              <div class="plugin-catalog-detail__content">
                <div class="plugin-catalog-detail__panel" aria-hidden="true">
                  <div class="plugin-catalog-detail__loading-card skeleton"></div>
                  <div class="plugin-catalog-detail__loading-card skeleton"></div>
                </div>
                <aside class="plugin-catalog-detail__sidebar">
                  ${Cr(void 0,void 0,void 0,!0)}
                </aside>
              </div>
            </section>`:D`<p class="plugin-catalog-detail__empty">${y(`pluginsPage.discoveryOffline`)}</p>`,{wide:!0,carapace:!0})}function Ar(){return(Ar=e((()=>{Qn(),k(),De(),T(),Ke(),it(),nt(),B(),x(),b(),yt(),tr(),Y(),G()})))()}var X;function jr(){return(jr=e((()=>{t(),k(),M(),xe(),B(),x(),ie(),ne(),At(),X=class extends ae{constructor(){super(),this.reloading=!1,this.reloadError=``,new oe(this).watch(()=>this.context?.plugins,(e,t)=>e.subscribe(t))}render(){let e=this.context?.plugins;if(!e)return O;let t=e.registrations(`replacements`);if(!t.length&&!e.errors.length&&!(e.hasPlugins&&e.canReload))return O;let n=[...new Set(t.map(e=>e.value.surface))];return qe({title:y(`pluginUi.customize`),carapace:!0},D`
        ${Xe({title:y(`pluginUi.selectionScope`),carapace:!0,stackedOnNarrow:!0,control:D`
            ${e.canReload?D`<button
                    class="btn btn--sm oc-action oc-action-secondary"
                    type="button"
                    ?disabled=${this.reloading}
                    @click=${async()=>{this.reloading=!0,this.reloadError=``;try{await e.reload()}catch(e){this.reloadError=e instanceof Error?e.message:String(e)}finally{this.reloading=!1}}}
                  >
                    ${y(`pluginUi.reload`)}
                  </button>`:O}
            <button
              class="btn btn--sm oc-action oc-action-secondary"
              type="button"
              @click=${()=>void e.refresh()}
            >
              ${y(`common.retry`)}
            </button>
          `})}
        ${n.map(n=>Xe({title:y(`pluginUi.surface.${n}`),carapace:!0,stackedOnNarrow:!0,control:D`<select
              class="settings-select oc-select"
              aria-label=${y(`pluginUi.surface.${n}`)}
              @change=${t=>e.selectReplacement(n,t.currentTarget.value||null)}
            >
              <option value="" .selected=${!e.selectedReplacement(n)}>
                ${y(`pluginUi.builtin`)}
              </option>
              ${t.filter(e=>e.value.surface===n).map(t=>D`<option
                    value=${t.key}
                    .selected=${e.selectedReplacement(n)?.key===t.key}
                  >
                    ${t.value.label} (${t.pluginId})
                  </option>`)}
            </select>`}))}
        ${e.errors.map(e=>{let t=kt(this.context,e.pluginId);return Xe({title:e.pluginId,carapace:!0,stacked:!0,role:t?`status`:`alert`,control:t??D`<span>${e.message}</span>`})})}
        ${this.reloadError?Xe({title:this.reloadError,role:`alert`,carapace:!0}):O}
      `)}},s([c({context:be,subscribe:!0})],X.prototype,`context`,void 0),s([j()],X.prototype,`reloading`,void 0),s([j()],X.prototype,`reloadError`,void 0),customElements.get(`openclaw-plugin-manager`)||customElements.define(`openclaw-plugin-manager`,X)})))()}function Mr(e,t){let n=t.trim().toLocaleLowerCase();return!n||[e.name,e.id,e.description,e.packageName].some(e=>e?.toLocaleLowerCase().includes(n))}function Nr(e,t,n=[]){let{label:r,help:i}=Ft(e.path,e.schema,e.hints),a=[...n,r],o=Vt(e);return g(e.schema)===`object`&&e.schema.properties&&Object.keys(e.schema.properties).length>0&&e.schema.additionalProperties===!1&&!e.schema.anyOf&&!e.schema.oneOf&&!e.schema.enum&&!Zt(e.value)&&!e.unsupported.has(h(e.path))&&o===void 0?Bt(e).fields.flatMap(e=>Nr(e,t,a)):[{...e,property:t,label:a.join(`: `),help:i}]}var Z;function Pr(){return(Pr=e((()=>{k(),M(),Ee(),Ht(),Gt(),zt(),Xt(),Pt(),Yt(),Kt(),T(),B(),x(),$e(),F(),ie(),tr(),an(),I(),Z=class extends se{constructor(...e){super(...e),this.query=``}willUpdate(e){e.has(`model`)&&e.get(`model`)?.pluginId!==this.model?.pluginId&&(this.query=``)}renderField(e){let{label:t,help:n,path:r,disabled:i}=e,a=this.onAskSetting,o=e.value===void 0?e.effectiveValue??e.schema.default:e.value,s=!te(r,e.hints)?.placeholder&&g(e.schema)===`boolean`&&!e.schema.enum&&!e.schema.anyOf&&!e.schema.oneOf,c=qt(r,`plugin-help`),l={...e,value:e.value===void 0?e.effectiveValue:e.value,descriptionId:n?c:void 0},u=this.renderCredential?.(l)??Rt({...l,showLabel:!1,hints:{...e.hints,[h(r)]:{...te(r,e.hints),label:t}}});return D`<div
      class="plugin-editor__row"
      data-setting=${r.slice(r[3]===`config`?4:3).join(`.`)}
      @click=${t=>{if(!s||i||getSelection()?.toString())return;let n=t.target;n instanceof Element&&!n.closest(`button,a,input,select,textarea,label,wa-switch,wa-checkbox,wa-dropdown,summary,[contenteditable]`)&&e.onPatch(r,!o)}}
    >
      <div class="plugin-editor__menu">
        <wa-dropdown
          placement="bottom-start"
          @wa-select=${t=>{t.detail.item.value===`reset`&&!i&&e.onPatch(r,e.isRequired?structuredClone(e.schema.default):void 0),t.detail.item.value===`ask`&&a?.({...e,value:o})}}
        >
          <button
            slot="trigger"
            type="button"
            class="btn btn--icon btn--ghost"
            aria-label=${y(`pluginsPage.editor.actions`,{name:t})}
          >
            ${w.moreHorizontal}
          </button>
          <wa-dropdown-item
            value="reset"
            ?disabled=${i||e.value===void 0||e.isRequired&&e.schema.default===void 0}
            >${y(`pluginsPage.editor.reset`)}</wa-dropdown-item
          >
          ${a?D`<wa-dropdown-item value="ask">${y(`pluginsPage.editor.ask`)}</wa-dropdown-item>`:O}
        </wa-dropdown>
      </div>
      <div class="plugin-editor__copy">
        <span class="plugin-editor__title">${t}</span
        >${n?D`<p id=${c}>${n}</p>`:O}
      </div>
      <div class="plugin-editor__control">${u}</div>
    </div>`}renderPermissions(){if(!this.permissions)return O;let e=this.query.trim().toLocaleLowerCase(),t=this.permissions.fields.filter(t=>!e||`${y(`pluginsPage.editor.permissions`)} ${t.label} ${t.help??``}`.toLocaleLowerCase().includes(e)||Nt({...t,criteria:{text:e,tags:[]}}));return this.permissions.loading&&!e?V({rows:3,carapace:!0}):t.length?D`${A(t,e=>JSON.stringify(e.path),e=>this.renderField(e))}`:O}renderGroups(e,t){let n=t!==O,r=g(e.schema)!==`object`||e.schema.anyOf||e.schema.oneOf||e.schema.enum||e.unsupported.has(h(e.path))?{fields:[e],additional:void 0}:Bt(e),i=(te(e.path,e.hints)?.groups??[]).toSorted((e,t)=>(e.order??0)-(t.order??0)),a=this.query.trim().toLocaleLowerCase(),o=r.fields.flatMap(e=>Nr(e,String(e.path.at(-1)))).filter(e=>!a||Nt({...e,criteria:{text:a,tags:[]}})||[e.path.slice(4).join(`.`),e.label,e.help,i.find(t=>t.properties.includes(e.property))?.title].join(` `).toLocaleLowerCase().includes(a)),s=i.map(e=>({id:e.id,title:e.title,fields:e.properties.flatMap(e=>o.filter(t=>t.property===e))})),c=o.filter(e=>!i.some(t=>t.properties.includes(e.property)));s.push({id:`__ungrouped`,title:i.length?y(`pluginsPage.editor.other`):``,fields:c});let l=r.additional?Ut({...r.additional,searchCriteria:a?{text:a,tags:[]}:void 0},Rt):O,u=t=>qt([...e.path,t],`section`),d=s.filter(e=>e.fields.length&&e.title);return n&&d.push({id:`__permissions`,title:y(`pluginsPage.editor.permissions`),fields:[]}),D`<div class="plugin-editor__layout">
      ${i.length?D`<nav class="plugin-editor__nav" aria-label=${y(`pluginsPage.editor.navigation`)}>
              ${d.map(e=>D`<a
                    href=${`#${u(e.id)}`}
                    @click=${t=>{t.preventDefault();let n=this.querySelector(`#${CSS.escape(u(e.id))}`);n?.scrollIntoView({block:`start`,behavior:Pe()}),n?.focus({preventScroll:!0})}}
                    >${e.title}</a
                  >`)}
            </nav>`:O}
      <div class="plugin-editor__sections">
        ${s.map(e=>e.fields.length?D`<section
                class="plugin-editor__section"
                id=${u(e.id)}
                tabindex="-1"
              >
                ${e.title?D`<h2>${e.title}</h2>`:O}
                <div class="plugin-editor__group">
                  ${A(e.fields,e=>JSON.stringify(e.path),e=>this.renderField(e))}
                </div>
              </section>`:O)}
        ${l===O?O:D`<section class="plugin-editor__section"><div class="plugin-editor__group">${l}</div></section>`}
        ${n?D`<section
                class="plugin-editor__section"
                id=${u(`__permissions`)}
                tabindex="-1"
              >
                <h2>${y(`pluginsPage.editor.permissions`)}</h2>
                <div class="plugin-editor__group">${t}</div>
              </section>`:O}
        ${!o.length&&l===O&&!n?D`<p class="plugin-editor__empty">${y(a?`pluginsPage.editor.noMatches`:`pluginsPage.editor.empty`)}</p>`:O}
      </div>
    </div>`}render(){let e=this.model;if(!e)return O;let t=e.result?.plugins.find(t=>t.id===e.pluginId)?.name??e.pluginId,n=this.renderPermissions(),r=n!==O,i=e.configSchema?{schema:e.configSchema,value:tn(e.configValue,e.pluginId).config,path:[`plugins`,`entries`,e.pluginId,`config`],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.connected||!e.canEditConfig||e.configBusy,compact:!0,commitOnBlur:!0,showLabel:!1,maskSensitive:!0,rawAvailable:!1,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove}:null,a=i?Vt(i):void 0,o=i&&a!==void 0?D`<openclaw-config-form-structured-draft
            .props=${{identity:JSON.stringify(i.path),sourceIdentity:i.value,initialValue:a,params:i,renderNode:e=>this.renderGroups(e,n)}}
          ></openclaw-config-form-structured-draft>`:i?this.renderGroups(i,n):O;return D`<section class="plugin-editor">
      <header class="plugin-editor__header">
        ${$n({name:y(`pluginsPage.detailSettings`),backHref:e.backHref,backLabel:t,onBack:e.onBack})}
      </header>
      <label class="plugin-editor__search"
        >${w.search}<input
          type="search"
          class="settings-input"
          aria-label=${y(`pluginsPage.editor.search`)}
          placeholder=${y(`pluginsPage.editor.search`)}
          .value=${this.query}
          @input=${e=>{this.query=e.currentTarget.value}}
      /></label>
      ${e.configError?D`<div class="callout danger" role="alert">${e.configError}<button class="btn btn--sm" @click=${e.configValue&&e.configSchema?e.onConfigWriteRetry:e.onConfigReadRetry}>${y(`common.retry`)}</button></div>`:O}
      ${e.configSchemaLoading||!e.configValue?V({rows:2,carapace:!0}):o}
      ${r&&!i?D`<section class="plugin-editor__section">
              <h2>${y(`pluginsPage.editor.permissions`)}</h2>
              <div class="plugin-editor__group">${n}</div>
            </section>`:O}
    </section>`}},s([P({attribute:!1})],Z.prototype,`model`,void 0),s([P({attribute:!1})],Z.prototype,`permissions`,void 0),s([P({attribute:!1})],Z.prototype,`onAskSetting`,void 0),s([P({attribute:!1})],Z.prototype,`renderCredential`,void 0),s([j()],Z.prototype,`query`,void 0),customElements.define(`openclaw-plugin-settings-editor`,Z)})))()}function Fr(e,t){let n=U(t.id),r=e.busy[n],i=!!r,a=r===`enable`||r===`disable`?r:t.enabled?`disable`:`enable`,o=(e,n,a,o,s,c)=>ot(o,D`<button
        type="button"
        class=${`btn oc-action ${a}`}
        ?disabled=${!o&&(!s||i)}
        aria-disabled=${!s||i?`true`:O}
        aria-label=${`${n} ${t.name}`}
        aria-busy=${r===e?`true`:O}
        @click=${()=>{s&&!i&&c()}}
      >
        ${r===e?D`<span class="btn__spinner" aria-hidden="true"></span>`:O}${n}
      </button>`),s=Tr(e.onAskPlugin,t.enabled);return D`
    ${t.enabled?s:O}
    ${o(a,y(a===`disable`?`pluginsPage.detailDisable`:`pluginsPage.detailEnable`),t.enabled?`oc-action-secondary`:`primary oc-action-primary`,e.mutationBlockedReason??(t.state===`needs-setup`?y(`pluginsPage.setupRequiredNotice`):null),e.canMutate&&t.state!==`needs-setup`,()=>e.onSetEnabled(t.id,!t.enabled,n))}
    ${t.enabled?O:s}
    ${t.removable?o(`uninstall`,y(`pluginsPage.uninstall`),`oc-action-secondary`,e.mutationBlockedReason,e.canMutate,()=>e.onUninstall(t.id,n)):O}
    <a
      class="btn btn--icon oc-action oc-action-icon oc-action-secondary"
      href=${e.settingsHref}
      aria-label=${y(`pluginsPage.detailSettings`)}
      @click=${t=>{v(t)&&(t.preventDefault(),e.onSettings())}}
      >${w.settings}</a
    >
  `}function Ir(){return(Ir=e((()=>{k(),T(),nt(),x(),Y(),G()})))()}function Q(e,t){return D`<div
    class="callout danger plugins-settings-error oc-banner oc-banner-error"
    role="alert"
  >
    <span>${e}</span>
    <button type="button" class="btn btn--sm oc-action oc-action-secondary" @click=${t}>
      ${y(`pluginsPage.tryAgain`)}
    </button>
  </div>`}function Lr(e){return D`<button
    type="button"
    class="btn btn--xs btn--icon oc-action oc-action-icon oc-action-secondary"
    aria-label=${y(`common.reload`)}
    ?disabled=${e.configBusy||e.configSchemaLoading}
    @click=${e.onConfigReload}
  >
    ${w.refresh}
  </button>`}function Rr(e){return et({id:`plugin-settings`,active:e.tab,tabs:[{value:`installed`,label:y(`pluginsPage.settingsInstalled`)},{value:`advanced`,label:y(`pluginsPage.advanced`)}],ariaLabel:y(`pluginsPage.settingsTabs`),panelId:`plugin-settings-panel`,variant:`sub`,className:`plugins-settings-tabs`,carapace:!0,onSelect:e.onTabChange})}function zr(e){if(!e.connected)return H(y(`pluginsPage.connectToManage`),{carapace:!0});if(e.loading)return V({rows:4,carapace:!0});if(e.error&&!e.result)return Q(e.error,e.onRefresh);let t=e.error?Q(e.error,e.onRefresh):O,n=(e.result?.plugins??[]).filter(t=>t.installed&&Mr(t,e.query)).toSorted((e,t)=>e.name.localeCompare(t.name));return n.length===0?D`${t}${H(e.query?y(`pluginsPage.noSettingsMatches`):y(`pluginsPage.noInstalled`),{carapace:!0})}`:D`${t}${A(n,e=>e.id,t=>{let n=U(t.id);return D`
        <article
          class="settings-row settings-row--nav plugins-settings-row oc-settings-row"
          data-plugin-id=${t.id}
          @click=${n=>{let r=n.target;(!(r instanceof Element)||!r.closest(`button, a`))&&e.onOpenPlugin(t.id)}}
        >
          ${bt(t.id,t.name,{iconUrl:e.iconUrls[t.id],onIconError:()=>e.onIconError(t.id),loading:e.iconLoading?.(t.id)})}
          <a
            class="settings-row__text plugins-settings-row__link oc-settings-row-content"
            href=${e.pluginHref(t.id)}
            @click=${n=>{v(n)&&(n.preventDefault(),e.onOpenPlugin(t.id))}}
          >
            <span class="settings-row__title oc-settings-row-title">${t.name}</span>
            <span class="settings-row__desc oc-settings-row-description"
              >${t.description||y(`pluginsPage.optionalCapability`)}</span
            >
          </a>
          <div class="settings-row__control oc-settings-row-control">
            ${t.state===`not-installed`?O:Et(t.state,`plugins-settings-row__status`)}
            <span class="settings-row__chevron" aria-hidden="true">${w.chevronRight}</span>
          </div>
          ${W(e.messages[n])}
        </article>
      `})}`}function Br(e){return e.connected?!e.advancedSchema||!e.configValue?e.configError?Q(e.configError,e.onConfigReadRetry):e.configSchemaLoading||!e.configValue?V({rows:4,carapace:!0}):H(y(`pluginsPage.schemaUnavailable`),{carapace:!0}):D`
    ${Rt({rawAvailable:!1,maskSensitive:!0,schema:e.advancedSchema,value:e.configValue.plugins??{},path:[`plugins`],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.canEditConfig||e.configBusy,showLabel:!1,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove})}
    ${e.configError?Q(e.configError,e.onConfigWriteRetry):O}
  `:H(y(`pluginsPage.connectToManage`),{carapace:!0})}function Vr(e){let t=e.tab===`installed`?D`
          <label class="plugins-settings-search">
            <span class="settings-control__sr-label">${y(`pluginsPage.searchInstalled`)}</span>
            <span aria-hidden="true">${w.search}</span>
            <input
              class="settings-input oc-input"
              type="search"
              aria-label=${y(`pluginsPage.searchInstalled`)}
              placeholder=${y(`pluginsPage.searchInstalled`)}
              .value=${e.query}
              @input=${t=>{e.onQueryChange(t.currentTarget.value)}}
            />
          </label>
          <div class="settings-group oc-settings-group">${zr(e)}</div>
        `:D`<div id="plugin-settings-advanced" class="settings-stack">
          <openclaw-plugin-manager></openclaw-plugin-manager>
          ${qe({title:y(`pluginsPage.advanced`),description:y(`pluginsPage.advancedDescription`),actions:Lr(e),carapace:!0},Br(e))}
        </div>`;return z(D`
      ${Ye({title:y(`tabs.plugins`),subtitle:y(`pluginsPage.settingsDescription`)})}
      <div class="plugins-settings-content">
        ${Rr(e)}
        <wa-tab-panel
          id="plugin-settings-panel"
          name=${e.tab}
          active
          aria-labelledby=${`plugin-settings-tab-${e.tab}`}
        >
          ${t}
        </wa-tab-panel>
      </div>
    `,{carapace:!0})}function Hr(e){if(!e.inspection)return{fields:[],loading:!0};let t=e.hostControlsSchema&&e.configValue?Bt({rawAvailable:!1,maskSensitive:!0,schema:e.hostControlsSchema,value:tn(e.configValue,e.pluginId),path:[`plugins`,`entries`,e.pluginId],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.connected||!e.canEditConfig||e.configBusy,showLabel:!1,compact:!0,commitOnBlur:!0,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove}).fields.flatMap(e=>Nr(e,String(e.path.at(-1)))):[];for(let n of t){let t=n.path[4];if(n.path[3]!==`hooks`||n.path.length!==5||t!==`allowPromptInjection`&&t!==`allowConversationAccess`)continue;let r=t===`allowPromptInjection`?`promptContextAccess`:`conversationAccess`;n.label=y(`pluginsPage.${r}`),n.help=y(`pluginsPage.${r}Description`),n.effectiveValue=e.inspection.grants.hooks[t].effective}return{fields:t}}function Ur(e){let t=e.result?.plugins.find(t=>t.id===e.pluginId);if(!e.connected)return z(H(y(`pluginsPage.connectToManage`),{carapace:!0}),{carapace:!0});if(e.error&&!e.result)return z(Q(e.error,e.onRefresh),{carapace:!0});if(!e.result)return z(V({rows:5,carapace:!0}),{carapace:!0});if(!t?.installed)return z(D`
        <a
          class="btn btn--sm oc-action oc-action-secondary"
          href=${e.backHref}
          @click=${t=>{t.preventDefault(),e.onBack()}}
        >
          ${w.chevronLeft} ${e.backLabel}
        </a>
        ${H(y(`pluginsPage.pluginNotFound`),{carapace:!0})}
      `,{carapace:!0});let n=U(t.id),r=e.catalog??e.inspection?.catalog,i=e.inspection?.components,a=e.tab===`configuration`,o=D`${e.error?Q(e.error,e.onRefresh):O}
  ${e.inspectionError?Q(e.inspectionError,e.onRetryInspection):O}
  ${t.error?D`<div class="callout danger oc-banner oc-banner-error" role="alert">${f(t.error)}</div>`:O}
  ${W(e.messages[n])}`;if(a)return z(D`
        ${o}
        <openclaw-plugin-settings-editor
          .model=${e}
          .renderCredential=${e.renderCredential}
          .onAskSetting=${e.onAskSetting}
          .permissions=${Hr(e)}
        ></openclaw-plugin-settings-editor>
      `,{wide:!0,carapace:!0});let s=e=>(e??[]).map(e=>({name:e})),c=(i?.skills??[]).map(e=>({name:e,description:r?.detail.skills.find(t=>t.name===e)?.description})),l=e.tools??s(e.inspection?.declared.tools??r?.detail.contracts?.tools);return z(er({id:`plugin-installed-detail`,name:t.name,summary:t.description||r?.plugin.catalog.summary,backHref:e.backHref,backLabel:e.backLabel,onBack:e.onBack,icon:bt(t.id,t.name,{iconUrl:e.iconUrls[t.id]??(r?.plugin.catalog.imageUrl?e.catalogIconUrls?.[r.plugin.catalog.imageUrl]:void 0),onIconError:()=>e.onIconError(t.id),authorIconUrl:r?.detail.author?.imageUrl?e.catalogIconUrls?.[r.detail.author.imageUrl]:void 0,loading:!!(e.iconLoading?.(t.id)||e.catalogLoading||r?.plugin.catalog.imageUrl&&e.catalogIconLoading?.(r.plugin.catalog.imageUrl)||r?.detail.author?.imageUrl&&e.catalogIconLoading?.(r.detail.author.imageUrl))}),identity:Sr(r,e.inspection?.overview?.publisherName),titleAction:e.installProgress?D`<openclaw-plugin-install-action
              .buttonClass=${`btn oc-action plugin-catalog-detail__install`}
              .primary=${!0}
              .progress=${e.installProgress}
            ></openclaw-plugin-install-action
            >${Tr(e.onAskPlugin,!1)}`:Fr({...e,settingsHref:e.settingsHref??`#configuration`,onSettings:()=>e.onTabChange(`configuration`)},t),sidebar:r||t.version||e.inspection?.overview||e.catalogLoading?Cr(r,t.version,e.inspection?.overview,e.catalogLoading):void 0,panel:D`${o}
      ${!e.inspection&&!r&&!e.inspectionError?V({rows:2,carapace:!0}):O}
      ${J(y(`pluginsPage.auth.accounts`),(e.inspection?.mcpAuth??[]).map(t=>({name:t.serverName,trailing:D`${t.state===`authorized`?D`<span class="plugin-connection-status" role="status">
                    ${w.check} ${y(`pluginsPage.auth.connected`)}
                  </span>`:O}
            <button
              type="button"
              class="btn btn--sm oc-action oc-action-secondary"
              aria-label=${y(t.state===`authorized`?`pluginsPage.auth.editAccount`:`pluginsPage.auth.connectAccount`,{name:t.serverName})}
              ?disabled=${t.state===`authorized`?!e.onEditMcp:!e.canMcpLogin||e.mcpLoginBusy||!e.onMcpLogin}
              @click=${()=>t.state===`authorized`?e.onEditMcp?.():e.onMcpLogin?.(t.serverName)}
            >
              ${y(t.state===`authorized`?`pluginsPage.auth.edit`:`pluginsPage.auth.connect`)}
            </button>`})),w.circleUser)}
      ${J(y(`pluginsPage.auth.credentials`),(e.inspection?.credentials??[]).map(t=>({name:t.envVars.join(` / `)||t.label,trailing:D`${t.status===`configured`?D`<span class="plugin-connection-status" role="status">
                    ${w.check} ${y(`pluginsPage.auth.configured`)}
                  </span>`:O}
            <button
              type="button"
              class="btn btn--sm oc-action oc-action-secondary"
              aria-label=${y(t.status===`configured`?`pluginsPage.auth.editCredential`:`pluginsPage.auth.configureCredential`,{name:t.label})}
              @click=${()=>e.onTabChange(`configuration`)}
            >
              ${y(t.status===`configured`?`pluginsPage.auth.edit`:`pluginsPage.auth.configure`)}
            </button>`})),w.key)}
      ${wr(e.inspection?.overview?.capabilities?.contracts,e.inspection?.overview?.capabilities?.ui)}
      ${e.skillsSection??J(y(`pluginsPage.detailTabs.skills`),c,w.bookOpenText)}
      ${J(y(`pluginsPage.detailTools`),l.map(({name:t,description:n,parameters:r})=>({name:t,description:n,onOpen:(n?.trim()||r?.length)&&e.onOpenTool?()=>e.onOpenTool?.(t):void 0})),w.wrench)}
      ${J(y(`pluginsPage.detailMcpServers`),s(i?.mcpServers??r?.detail.mcpServers),w.plug)}`,readme:e.inspection?.overview?.readme||r?.detail.readme?Dr(e.inspection?.overview?.readme??r?.detail.readme):void 0}),{wide:!0,carapace:!0})}function Wr(){return(Wr=e((()=>{k(),Ee(),zt(),Kt(),rt(),T(),B(),x(),b(),jr(),Ar(),yt(),tr(),Y(),xt(),G(),Pr(),Ir(),an()})))()}function Gr(e,t){return!e.description?.trim()&&!e.parameters?.length?Promise.resolve():ye({signal:t,value:void 0},({render:t,finish:n})=>{t(()=>D`<openclaw-modal-dialog
        class="plugin-tool-dialog"
        label=${e.name}
        @modal-cancel=${()=>n(void 0)}
      >
        <article class="plugin-tool-preview">
          <header>
            <h2>${e.name}</h2>
            <button
              class="btn btn--icon"
              type="button"
              aria-label=${y(`common.close`)}
              @click=${()=>n(void 0)}
            >
              ${w.x}
            </button>
          </header>
          <div class="plugin-tool-preview__body">
            ${e.parameters?.length?D`<section class="plugin-tool-preview__parameters">
                    <h3>${y(`pluginsPage.detailToolInputs`)}</h3>
                    <dl>
                      ${e.parameters.map(e=>D`<div>
                          <dt>
                            <code>${e.name}</code>
                            <span
                              >${y(e.required?`pluginsPage.detailRequired`:`pluginsPage.detailOptional`)}</span
                            >
                            ${e.type?D`<span>${e.type}</span>`:``}
                          </dt>
                          ${e.description?D`<dd>${e.description}</dd>`:``}
                        </div>`)}
                    </dl>
                  </section>`:``}
            ${e.description?.trim()?D`<p>${e.description}</p>`:``}
          </div>
        </article>
      </openclaw-modal-dialog>`)})}function Kr(){return(Kr=e((()=>{k(),T(),ve(),x()})))()}function qr(e){let t=e.state;if(!t)return O;let n=t.result?.files.map(e=>({path:e.path,size:``,contents:e.content??``,...e.status!==`ready`&&e.status!==`deferred`?{message:y(`filePreview.bundle.${e.status}`)}:{}}))??[],r=t.result?.files.find(e=>e.path===t.activePath),i=t.fileErrors.get(t.activePath)??(r?.status===`unavailable`?y(`filePreview.bundle.unavailable`):``),a=t.result&&(!t.result.inventoryComplete||t.result.files.some(e=>e.status===`unavailable`||e.status===`too-large`));return D`<openclaw-file-preview-modal
    .label=${t.request.skillName}
    .files=${n}
    .directories=${t.result?.directories??[]}
    .activePath=${t.activePath}
    layout="document"
    .loading=${t.loading}
    .fileLoading=${t.pendingPaths.has(t.activePath)}
    .error=${t.error??(t.pendingPaths.has(t.activePath)?``:i)}
    .notice=${a?y(`filePreview.bundle.incomplete`):``}
    @file-preview-select=${t=>e.select(t.detail)}
    @file-preview-retry=${()=>e.retry()}
    @file-preview-close=${()=>e.close()}
  ></openclaw-file-preview-modal>`}function Jr(e,t){return D`<div class="plugin-skills-section">
    ${J(y(`pluginsPage.detailTabs.skills`),e.map(e=>({...e,onOpen:()=>t(e.name)})),w.bookOpenText)}
  </div>`}var Yr;function Xr(){return(Xr=e((()=>{k(),T(),fn(),x(),Re(),F(),b(),Y(),Kr(),Fe(),I(),Yr=class{constructor(e,t){this.host=e,this.gateway=t,this.state=null,this.sequence=0,this.toolAbort=new AbortController}async open(e){this.close();let t=this.sequence,n=this.gateway.capture();if(this.state={request:{...e},loading:!!n,error:n?null:y(`pluginsPage.connectToManage`),result:null,activePath:`SKILL.md`,pendingPaths:new Set,fileErrors:new Map},this.host.requestUpdate(),!n)return;let r=()=>this.sequence===t&&this.gateway.isCurrent(n);try{let t=await n.client.request(`plugins.skills.read`,e);r()&&this.state&&(this.state.result=t,this.state.activePath=t.entryPath,t.version&&(this.state.request={...this.state.request,version:t.version}))}catch(e){r()&&this.state&&(this.state.error=u(e))}finally{r()&&this.state&&(this.state.loading=!1,this.host.requestUpdate())}}openTool(e){this.close(),Gr(e,this.toolAbort.signal)}retry(){this.state?.result?this.select(this.state.activePath):this.state&&this.open(this.state.request)}async select(e){let t=this.state,n=t?.result?.files.find(t=>t.path===e);if(!t||!n||(t.activePath=e,this.host.requestUpdate(),t.pendingPaths.has(e)||n.status!==`deferred`&&n.status!==`unavailable`))return;let r=this.gateway.capture();if(!r){t.fileErrors.set(e,y(`pluginsPage.connectToManage`));return}let i=()=>this.state===t&&this.gateway.isCurrent(r);t.pendingPaths.add(e),t.fileErrors.delete(e);try{let n=await r.client.request(`plugins.skills.read`,{...t.request,path:e});if(!i()||!t.result)return;let a=n.files.find(t=>t.path===e);if(n.version!==t.result.version||n.rootPath!==t.result.rootPath||!a||a.status===`deferred`)throw Error(y(`filePreview.bundle.unavailable`));t.result={...t.result,files:t.result.files.map(t=>t.path===e?a:t)}}catch(n){i()&&t.fileErrors.set(e,u(n))}finally{i()&&(t.pendingPaths.delete(e),this.host.requestUpdate())}}close(){this.sequence++,this.toolAbort.abort(),this.toolAbort=new AbortController,this.state=null,this.host.requestUpdate()}}})))()}function Zr(e){e.help?.update(e);let t=e.help?.available?e.help.ask:void 0,n=t?()=>void t():void 0,{actions:r,catalogDetail:i,consentController:a,context:o,detail:s,discovery:c}=e,l=o.runtimeConfig.state,u=Wt(l.configSchema),d=i?.result,f=d?.plugin.catalog.latestVersion,p=d&&f&&d.detail.skills.length?Jr(d.detail.skills,e=>r.openSkill({source:`catalog`,catalogId:d.plugin.id,version:f,skillName:e})):void 0,m=s?.pluginId??null,h=i?a.getActiveInstall(`install:${i.id}`):void 0,g=new URLSearchParams(e.routeData?.location.search??``).get(`from`)===`plugins`?`plugins`:`plugin-settings`,_={connected:e.connected,loading:e.loading,result:e.result,error:e.error,busy:e.busy,messages:e.messages,iconUrls:e.iconUrls,iconLoading:e.iconLoading,canMutate:e.canMutate,mutationBlockedReason:e.mutationBlockedReason,configBusy:l.configLoading,configError:l.lastError,canEditConfig:e.canEditConfig,configValue:l.configForm,configHints:l.configUiHints,configSchemaLoading:l.configSchemaLoading,configUnsupportedPaths:u.unsupportedPaths,onIconError:r.handlePluginIconError,onSetEnabled:r.updateEnabled,onUninstall:r.uninstall,onConfigPatch:r.patchConfig,onConfigRemove:r.removeConfig,onConfigReload:r.reloadConfig,onConfigReadRetry:r.retryConfigRead,onConfigWriteRetry:r.retryConfigWrite,onRefresh:r.refreshCatalog,onAskPlugin:n,onAskSetting:t},ee=t=>{let n=s?.inspection?.components,i=n?.skillDetails??n?.skills.map(e=>({name:e}))??[],c=e.routeData?.location,l=new URLSearchParams(c?.search);l.set(`view`,`settings`);let d=e.installedDetailTab===`configuration`,f=new URLSearchParams(c?.search);f.delete(`view`);let m=`${c?.pathname??``}${f.size?`?${f}`:``}`;return Ur({..._,pluginId:t,installProgress:a.getActiveInstall(U(t)),inspection:s?.inspection??null,mcpLoginBusy:e.mcpLoginBusy,canMcpLogin:e.canMcpLogin,onMcpLogin:r.startMcpLogin,onEditMcp:()=>e.context.navigate(`mcp`),catalog:s?.catalog,inspectionError:s?.error??null,catalogLoading:s?.catalogLoading,catalogIconUrls:e.catalogIconUrls,catalogIconLoading:e.catalogIconLoading,renderCredential:e.renderCredential,tools:s?.tools,onOpenTool:r.openTool,skillsSection:i.length?Jr(i,e=>r.openSkill({source:`installed`,pluginId:t,skillName:e})):n?void 0:p,settingsHref:`${c?.pathname??``}?${l}`,configSchema:rn(u.schema,t),hostControlsSchema:en(u.schema,t),backHref:d?m:E(e.surface===`discovery`?`plugins`:g,o.basePath),backLabel:e.surface===`discovery`||g===`plugins`?y(`tabs.plugins`):y(`nav.settings`),tab:e.installedDetailTab,onBack:d?()=>r.selectInstalledDetailTab(`readme`):e.surface===`discovery`?r.closeCatalogDetail:()=>r.closeSettingsDetail(g),onRetryInspection:()=>r.retrySettingsDetail(t),onTabChange:r.selectInstalledDetailTab})};return D`
    ${e.surface===`discovery`&&!i?sn({active:`plugins`,onSelect:r.selectHubTab,secondaryAction:{label:y(`pluginsPage.pluginSettings`),icon:w.settings,onClick:()=>r.openPluginSettings(null,!1)}}):O}
    ${It(D`
      ${W(e.pageNotice??void 0)}
      ${e.surface===`discovery`?D`<wa-tab-panel
              id=${cn}
              name="plugins"
              active
              aria-labelledby="plugins-tab-plugins"
              >${i?m&&!h?ee(m):kr({onAskPlugin:n,connected:e.connected,skillsSection:p,result:i.result,error:i.error,backHref:E(`plugins`,o.basePath),onBack:r.closeCatalogDetail,onRetry:r.retryCatalogDetail,canInstall:e.canMutate&&!e.messages[`install:${i.id}`]?.savedInstall&&!!(i.result&&Xn(i.result)),installBlockedReason:e.mutationBlockedReason,onInstall:()=>r.installCatalogEntry(i.id),busy:!!e.busy[`install:${i.id}`],installProgress:a.installProgress.get(`install:${i.id}`),message:e.messages[`install:${i.id}`],onContinueInstall:e=>void a.install(e,`install:${i.id}`),iconUrls:e.catalogIconUrls,iconLoading:e.catalogIconLoading}):z(dr({connected:e.connected,loading:c.loading,result:c.result,error:c.error??e.error,remoteError:c.remoteError,categories:c.categories,categoriesLoading:c.categoriesLoading,categoriesError:c.categoriesError,onRetryCategories:()=>void c.ensureCategories(!0),featured:c.featured,featuredLoading:c.featuredLoading,trending:c.trending,trendingLoading:c.trendingLoading,loadingMore:c.loadingMore,loadMoreError:c.loadMoreError,intent:c.intent,category:c.category,query:c.query,iconUrls:e.catalogIconUrls,pluginIconUrls:e.iconUrls,iconLoading:e.catalogIconLoading,pluginIconLoading:e.iconLoading,canInstall:e.canMutate,installProgress:a.installProgress,entryHref:e=>_e(e,o.basePath),onIntentChange:e=>c.selectIntent(e),onCategoryChange:e=>c.selectCategory(e),onQueryChange:e=>c.updateQuery(e),onOpenEntry:e=>o.navigate(`plugins`,{pathname:_e(e,o.basePath)}),onInstall:r.installCatalogEntry,busy:e.busy,messages:e.messages,onContinueInstall:(e,t)=>void a.install(t,`install:${e}`),onLoadMore:()=>void c.loadMore(),onRetry:()=>void c.refresh()}),{wide:!0,carapace:!0})}</wa-tab-panel
            >`:m?ee(m):Vr({..._,tab:e.settingsTab,query:e.query,advancedSchema:nn(u.schema),onTabChange:r.selectSettingsTab,onQueryChange:r.setQuery,pluginHref:e=>ge(e,o.basePath),onOpenPlugin:e=>r.openPluginSettings(e,!1)})}
    `)}
    ${qr(e.skillPreview)} ${e.mcpLogin}
    ${a.consent?Ct({consent:a.consent,inspection:a.inspection,loading:a.inspectionLoading,error:a.inspectionError,iconUrl:a.consent.pluginId?e.iconUrls[a.consent.pluginId]:void 0,iconLoading:!!(a.consent.pluginId&&e.iconLoading?.(a.consent.pluginId)),canMutate:e.canMutate,mutationBlockedReason:e.mutationBlockedReason,busy:Object.values(e.busy).some(Boolean),onCancel:()=>a.close(),onConfirm:()=>a.confirm(),onRetry:()=>void a.inspect()}):O}
  `}function Qr(){return(Qr=e((()=>{k(),pe(),Kt(),T(),B(),Lt(),x(),Ar(),gr(),yt(),G(),ln(),on(),Zn(),an(),Wr(),Xr()})))()}var $;function $r(){return($r=e((()=>{t(),Be(),M(),pe(),xe(),de(),x(),b(),Ne(),Le(),ie(),ne(),Cn(),Tn(),Dn(),kn(),G(),jn(),Vn(),Wn(),qn(),Zn(),Qr(),Xr(),$=class extends se{constructor(...e){super(...e),this.surface=`settings`,this.result=null,this.error=null,this.query=``,this.settingsTab=`installed`,this.busy={},this.messages={},this.detail=null,this.iconUrls={},this.catalogIconUrls={},this.pageNotice=null,this.catalogDetail=null,this.installedDetailTab=`readme`,this.installRequestGeneration=0,this.help=new wn(this),this.configAutoSaveStatus=this.context?.runtimeConfig.state.configAutoSaveStatus??`idle`,this.pluginConfigEditPending=!1,this.routeDataConsumed=!1,this.icons=new Kn({getContext:()=>this.context,isConnected:()=>this.isConnected,onInstalledUrlsChange:e=>{this.iconUrls=e},onCatalogUrlsChange:e=>{this.catalogIconUrls=e},onLoadingChange:()=>this.requestUpdate()}),this.gateway=new Ie(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.result=null,this.error=null,this.messages={},this.pageNotice=null},invalidateRequests:e=>this.invalidateRequests(e.identityChanged||e.snapshot.phase!==`connected`||!e.snapshot.client),onSnapshot:e=>this.handleGatewaySnapshot(e)}),this.skillPreview=new Yr(this,this.gateway),this.mcpLogin=new On(this,this.gateway,{getDetail:()=>this.detail,getName:e=>this.result?.plugins.find(t=>t.id===e)?.name,canSignIn:()=>je(this.gateway.snapshot,`mcp.authLogin`,`operator.admin`),refresh:e=>this.showDetails(e)}),this.discovery=new Sn(this,{getClient:()=>this.gateway.client,isConnected:()=>this.gateway.connected}),this.settings=new An({gateway:this.gateway,getContext:()=>this.context,getDetail:()=>this.detail,canInspect:()=>he(this.context.gateway.snapshot.hello?.auth??null),canEdit:()=>this.canEditConfig(),onEdit:()=>{this.pluginConfigEditPending=!0},isSettings:()=>this.installedDetailTab===`configuration`}),this.consentController=new Bn({gateway:this.gateway,getContext:()=>this.context,getResult:()=>this.result,canMutate:()=>this.canMutate(),isBusy:e=>!!this.busy[e],setBusy:(e,t)=>this.setBusy(e,t),setMessage:(e,t)=>this.setMessage(e,t),getMessages:()=>this.messages,clearPageNotice:()=>{this.pageNotice=null},closeDetails:()=>this.skillPreview.close(),applyMutationResult:e=>this.applyMutationResult(e),refreshCatalogAfterMutation:e=>this.refreshCatalog(e),requestUpdate:()=>this.requestUpdate()}),this.catalogTask=new L(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null],task:([e],{signal:t})=>e?e.request(`plugins.list`,{},{signal:t}):He,onComplete:e=>{this.replaceResult(e),this.surface===`settings`&&this.showDetails(this.activeRoutePluginId)},onError:e=>{this.error=u(e)}}),this.subscriptions=new oe(this).effect(()=>this.context?.runtimeConfig,e=>(this.configAutoSaveStatus=e.state.configAutoSaveStatus,e.subscribe(()=>{let t=e.state.configAutoSaveStatus,n=this.configAutoSaveStatus===`saving`&&t===`saved`;this.configAutoSaveStatus=t,this.requestUpdate(),n&&this.pluginConfigEditPending&&(this.pluginConfigEditPending=!1,this.refreshCatalog())}))),this.handleDocumentKeydown=e=>{if(e.key!==`Escape`||document.querySelector(`.shell-nav[aria-modal='true']`)||e.target instanceof Element&&e.target.closest(`wa-dropdown[open]`))return;let t=this.querySelector(`openclaw-plugin-install-action[open]`);if(t){t.dismiss(),e.stopPropagation();return}if(this.consentController.consent){this.consentController.close(),e.stopPropagation();return}if(!(this.skillPreview.state||document.querySelector(`openclaw-modal-dialog`))){if(this.querySelector(`:focus`)?.blur(),this.catalogDetail){this.closeCatalogDetail(),e.stopPropagation();return}this.detail&&(this.detail=null,this.surface===`settings`&&this.context.replace(`plugin-settings`,{pathname:E(`plugin-settings`,this.context.basePath)}),e.stopPropagation())}}}willUpdate(e){e.has(`routeData`)&&(this.skillPreview.close(),e.get(`routeData`)?.location.pathname!==this.routeData?.location.pathname&&(this.installRequestGeneration+=1,this.mcpLogin.reset()),this.applyRouteData())}updated(){this.icons.syncInstalled(this.result,this),this.icons.syncCatalog(this.discovery,this,this.detail?.catalog??this.catalogDetail?.result)}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleDocumentKeydown,!0)}disconnectedCallback(){this.mcpLogin.reset(),document.removeEventListener(`keydown`,this.handleDocumentKeydown,!0),this.skillPreview.close(),this.discovery.disconnect(),this.subscriptions.clear(),this.icons.reset(),super.disconnectedCallback()}handleGatewaySnapshot(e){let t=e.snapshot,n=t.pluginCapabilities?.generation,r=n!==void 0&&n!==this.pluginGeneration;this.pluginGeneration=n,!e.initial&&r&&this.skillPreview.close();let i=this.icons.updateAuth({hello:t.hello,settings:{token:this.context.gateway.connection.token},password:this.context.gateway.connection.password}),a=!e.initial&&(e.identityChanged||e.connectionChanged||i||r)&&t.phase===`connected`&&this.routeDataConsumed;!e.initial&&i&&!e.identityChanged&&!e.connectionChanged&&(this.gateway.invalidate(),this.invalidateRequests(t.phase!==`connected`||!t.client)),!e.initial&&(e.identityChanged||e.connectionChanged||i)&&(this.icons.reset(),this.busy={}),a&&this.refreshCatalog(),this.ensureInitialData()}applyRouteData(){let e=this.routeData;if(!e)return;this.routeDataConsumed=!0;let t=this.surface===`settings`?this.activeRoutePluginId:null,n=this.surface===`discovery`?this.activeRoutePluginId:null;this.surface===`settings`&&!t&&(this.settingsTab=new URLSearchParams(e.location.search).get(`tab`)===`advanced`?`advanced`:`installed`),(t||n)&&(this.installedDetailTab=new URLSearchParams(e.location.search).get(`view`)===`settings`?`configuration`:pn(e.location.hash)),this.gateway.isRouteDataCurrent(e)&&(this.pluginGeneration!==void 0&&(e.result?.generation??-1)<this.pluginGeneration?this.refreshCatalog():(this.replaceResult(e.result),this.error=e.error)),this.surface===`settings`&&t!==this.detail?.pluginId&&this.showDetails(t),n!==this.catalogDetail?.id&&this.showCatalogDetail(n),this.ensureInitialData()}invalidateRequests(e=!0){this.mcpLogin.reset(),e&&(this.catalogTask.run([null]),this.discovery.invalidate()),this.skillPreview.close(),this.detail=null,this.catalogDetail=null,this.installRequestGeneration+=1,this.consentController.reset()}replaceResult(e){this.uninstallingSelection||(this.detail&&e&&!e.plugins.some(e=>e.id===this.detail?.pluginId&&e.installed)&&(this.pageNotice=this.messages[U(this.detail.pluginId)]??this.pageNotice),this.result?.generation===e?.generation?this.icons.reconcileInstalled(e):this.icons.resetInstalled(),this.messages=this.consentController.reconcileInstallMessages(e),this.result=e,e&&this.surface===`discovery`&&this.refreshDiscovery())}get loading(){return this.gateway.connected&&(!this.routeDataConsumed||this.catalogTask.status===R.PENDING)}get activeRoutePluginId(){let e=this.routeData?.location.pathname??``;return this.surface===`settings`?fe(e,this.context.basePath):Se(e,this.context.basePath)}get uninstallingSelection(){return!!(this.detail&&this.busy[U(this.detail.pluginId)]===`uninstall`&&this.activeRoutePluginId===(this.surface===`settings`?this.detail.pluginId:this.catalogDetail?.id))}ensureInitialData(){this.surface===`discovery`&&!this.activeRoutePluginId&&this.discovery.ensureCategories(),this.routeDataConsumed&&this.gateway.connected&&this.gateway.client&&((this.surface===`settings`||this.activeRoutePluginId&&this.installedDetailTab===`configuration`)&&(this.context.runtimeConfig.ensureLoaded(),this.context.runtimeConfig.ensureSchemaLoaded()),!this.loading&&!this.result&&!this.error&&this.refreshCatalog())}async refreshCatalog(e=this.gateway.connected?this.gateway.client:null){e&&(this.error=null,await this.catalogTask.run([e]))}async refreshDiscovery(){if(this.surface!==`discovery`)return;let e=this.activeRoutePluginId;e?await this.showCatalogDetail(e):await this.discovery.refresh()}selectHubTab(e){(e!==`plugins`||this.surface!==`discovery`)&&this.context.navigate(e)}accessBlockedReason(e,t=this.gateway.connected){return Yn({connected:t,hasAdminAccess:he(this.context.gateway.snapshot.hello?.auth??null),mutationAllowed:e})}canMutate(){return this.result?.mutationAllowed===!0&&this.accessBlockedReason()===null}canEditConfig(){let e=this.context.runtimeConfig;return this.accessBlockedReason(e.canSet,e.state.connected)===null}setBusy(e,t){let n=t===`uninstall`||this.busy[e]===`uninstall`,r={...this.busy};t?r[e]=t:delete r[e],this.busy=r,n&&this.detail&&e===U(this.detail.pluginId)&&(t===`uninstall`?(this.catalogDetail=this.catalogDetail?{...this.catalogDetail}:null,this.showDetails(this.detail.pluginId)):this.refreshCatalog())}setMessage(e,t){let n={...this.messages};t?n[e]=t:delete n[e],this.messages=n}applyMutationResult(e){this.icons.invalidateInstalled(e.plugin.id),this.replaceResult(Jn(this.result,e.plugin))}showDetails(e){return this.mcpLogin.select(e),Hn({pluginId:e,plugin:this.result?.plugins.find(t=>t.id===e),catalog:this.catalogDetail?.result,gateway:this.gateway,canInspect:!e||this.busy[U(e)]!==`uninstall`,getDetail:()=>this.detail,onChange:e=>{this.detail=e}})}async showCatalogDetail(e){if(this.surface!==`discovery`){this.catalogDetail=null;return}return Un({id:e,gateway:this.gateway,context:this.context,location:this.routeData?.location,inventory:this.result,uninstalling:this.uninstallingSelection,getDetail:()=>this.catalogDetail,onChange:e=>{this.catalogDetail=e},showInstalled:e=>this.showDetails(e)})}async installCatalogEntry(e){let t=this.gateway.capture(),n=`install:${e}`;if(!t||!this.canMutate()||this.busy[n])return;let r=++this.installRequestGeneration;this.setBusy(n,`install`);try{let i=this.catalogDetail?.result?.plugin.id===e?this.catalogDetail.result:await _(t.client,e);if(!this.gateway.isCurrent(t)||r!==this.installRequestGeneration)return;let a=Xn(i);this.setBusy(n,null),a?await this.consentController.install(a,n):this.setMessage(n,{kind:`warning`,text:y(`pluginsPage.installAvailabilityChanged`)})}catch(e){this.gateway.isCurrent(t)&&r===this.installRequestGeneration&&this.setMessage(n,{kind:`error`,text:u(e)})}finally{this.gateway.isCurrent(t)&&this.setBusy(n,null)}}closeCatalogDetail(){this.catalogDetail=null,this.detail=null,this.context.navigate(`plugins`,{pathname:E(`plugins`,this.context.basePath)})}async uninstall(e,t){let n=this.result?.plugins.find(t=>t.id===e)?.name??e;await this.consentController.runMutation(t,t=>l(t,e),async(t,n,r,i,a)=>{this.detail?.pluginId===e&&(this.detail=null),a()&&(this.pageNotice=zn(t,n),this.activeRoutePluginId===e&&this.context.replace(`plugin-settings`,{pathname:E(`plugin-settings`,this.context.basePath)})),await this.refreshCatalog(r)},{action:`uninstall`,confirm:()=>En(n)})}render(){let e=this.accessBlockedReason(this.result?.mutationAllowed);return Zr({mcpLogin:this.mcpLogin.render(),mcpLoginBusy:this.mcpLogin.busy,canMcpLogin:je(this.gateway.snapshot,`mcp.authLogin`,`operator.admin`),help:this.help,context:this.context,routeData:this.routeData,surface:this.surface,connected:this.gateway.connected,loading:this.loading,result:this.result,error:this.error,query:this.query,settingsTab:this.settingsTab,busy:this.busy,messages:this.messages,detail:this.detail,pageNotice:this.pageNotice,iconUrls:this.iconUrls,catalogIconUrls:this.catalogIconUrls,iconLoading:this.icons.isInstalledLoading,catalogIconLoading:this.icons.isCatalogLoading,catalogDetail:this.catalogDetail,installedDetailTab:this.installedDetailTab,canMutate:this.canMutate(),mutationBlockedReason:e,canEditConfig:this.canEditConfig(),discovery:this.discovery,consentController:this.consentController,renderCredential:this.settings.render,skillPreview:this.skillPreview,actions:{startMcpLogin:e=>void this.mcpLogin.start(e),selectHubTab:e=>this.selectHubTab(e),closeCatalogDetail:()=>this.closeCatalogDetail(),retryCatalogDetail:()=>void this.showCatalogDetail(this.catalogDetail?.id??null),installCatalogEntry:e=>void this.installCatalogEntry(e),openSkill:e=>void this.skillPreview.open(e),openTool:e=>this.skillPreview.openTool(this.detail?.tools?.find(t=>t.name===e)??{name:e}),setQuery:e=>{this.query=e},refreshCatalog:()=>void this.refreshCatalog(),openPluginSettings:(e,t)=>{this.context.navigate(`plugin-settings`,{pathname:e?ge(e,this.context.basePath):E(`plugin-settings`,this.context.basePath),search:t&&e?`?from=plugins`:``})},handlePluginIconError:e=>this.icons.handleInstalledError(e),updateEnabled:(e,t,n)=>void this.consentController.mutateInstalledPlugin(e,t?`enable`:`disable`,n),uninstall:(e,t)=>void this.uninstall(e,t),patchConfig:(e,t)=>this.settings.patch(e,t),removeConfig:e=>this.settings.patch(e,void 0),reloadConfig:()=>{this.pluginConfigEditPending=!1;let e=this.context.runtimeConfig;e.discardDraft({reloadOnly:!0}).then(()=>e.ensureSchemaLoaded())},retryConfigRead:()=>{this.context.runtimeConfig.refresh(),this.context.runtimeConfig.refreshSchema()},retryConfigWrite:()=>{this.context.runtimeConfig.retry()},closeSettingsDetail:e=>{this.detail=null,this.installedDetailTab=`readme`,this.context.navigate(e,{pathname:E(e,this.context.basePath)})},retrySettingsDetail:e=>void this.showDetails(e),selectInstalledDetailTab:e=>{this.installedDetailTab=e,this.context.navigate(this.surface===`discovery`?`plugins`:`plugin-settings`,mn(this.routeData?.location,e===`configuration`))},selectSettingsTab:e=>{this.settingsTab=e,this.context.replace(`plugin-settings`,{pathname:E(`plugin-settings`,this.context.basePath),search:e===`advanced`?`?tab=advanced`:``})}}})}},s([c({context:be,subscribe:!0})],$.prototype,`context`,void 0),s([P({attribute:!1})],$.prototype,`routeData`,void 0),s([P({attribute:!1})],$.prototype,`surface`,void 0),s([j()],$.prototype,`result`,void 0),s([j()],$.prototype,`error`,void 0),s([j()],$.prototype,`query`,void 0),s([j()],$.prototype,`settingsTab`,void 0),s([j()],$.prototype,`busy`,void 0),s([j()],$.prototype,`messages`,void 0),s([j()],$.prototype,`detail`,void 0),s([j()],$.prototype,`iconUrls`,void 0),s([j()],$.prototype,`catalogIconUrls`,void 0),s([j()],$.prototype,`pageNotice`,void 0),s([j()],$.prototype,`catalogDetail`,void 0),s([j()],$.prototype,`installedDetailTab`,void 0),customElements.get(`openclaw-plugins-page`)||customElements.define(`openclaw-plugins-page`,$)})))()}$r();