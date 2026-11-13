import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ba as t,Br as n,Gi as r,Hi as i,Pa as a,Ui as o,X as s,Ya as c,Yi as l,br as u,eo as d,fi as f,hi as p,qr as m,ro as h,to as g,yr as ee,zr as te}from"./control-ui-foundation-C3MHh_P-.js";import{B as ne,Fr as re,Jl as ie,L as ae,Mt as oe,N as se,Ns as ce,Nt as le,P as ue,Pt as de,Qi as fe,R as _,Ur as pe,Xi as me,Xl as he,_l as ge,bs as _e,bu as ve,cc as ye,dl as be,dr as xe,fr as Se,gc as Ce,gl as we,hc as Te,hl as Ee,hu as v,jt as De,ks as Oe,lu as y,nl as b,ol as ke,ou as Ae,sc as je,su as Me,uu as x,vc as Ne,w as Pe,wl as Fe,xc as Ie,xu as Le,yc as Re}from"./control-ui-core-pYNj5S1a.js";import{T as ze,w as Be}from"./control-ui-boot-shared-DhhSjjdA.js";import{$n as Ve,Et as He,Ja as Ue,Ma as We,Mt as Ge,Ot as Ke,Qt as qe,Xi as S,Yt as Je,Zi as C,ao as Ye,co as Xe,er as Ze,go as Qe,ii as $e,io as et,jt as tt,or as nt,ri as rt,sr as it,va as at,vi as ot,wt as st,yi as ct,yr as lt}from"./control-ui-core-D6clmJs8.js";import{$ as w,F as ut,M as dt,S as ft,X as T,Y as E,c as pt,ct as D,nt as O,s as mt,ut as k,v as ht,y as gt}from"./lit-runtime-DZL1fcCI.js";import{c as _t,d as vt,l as yt}from"./gateway-runtime-iOL78mIi.js";import{Bo as bt,Ci as xt,Io as St,Ji as Ct,Lo as wt,Ti as Tt,Vo as A,Wo as Et,Xi as Dt}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Mt as j,Pt as Ot,_ as kt,_t as M,g as At,ia as jt,it as Mt,jt as Nt,rt as Pt}from"./control-ui-boot-shared-DJ4XCcp6.js";import{Ft,Pt as It}from"./control-ui-boot-shared-og7lWkK4.js";import{Ar as Lt,Mr as Rt,On as zt,Pr as Bt,Tn as Vt,dr as Ht,fr as Ut}from"./control-ui-boot-shared-e4-xCIbb.js";import{n as Wt,t as Gt}from"./stream-auto-follow-controller-BZ0UzGsg.js";import{n as Kt,t as qt}from"./settings-workspace-DKW0BVnu.js";import{n as Jt,t as Yt}from"./agent-row-chip-DpS83BWh.js";var Xt,N;function P(){return(P=e((()=>{Le(),Xt={activity:{images:{failed:`Couldn't load images`,older:`Older images`,incomplete:`Images too large to preview here`},pulse:{sessions:`sessions`,started:`started`,people:`people`,running:`running now`,hour:`{hour} · {count} sessions`,description:`{count} sessions today; peak hour {hour}`},git:{pullRequest:`{repository} pull request #{number}: {title} ({state})`,branchDiff:`{branch}: changes against the default branch, including uncommitted work`,stale:`Git status may be out of date`,open:`Open`,draft:`Draft`,merged:`Merged`,closed:`Closed`},title:`Activity`,visibleCount:`{visible} of {total}`,search:`Search`,searchPlaceholder:`Filter by activity, summary, run, session`,filters:`Filters`,toolFilter:`Tool`,allTools:`All tools`,statusFilters:`Status filters`,autoFollow:`Auto-follow`,expandAll:`Expand all`,collapseAll:`Collapse all`,clear:`Clear`,empty:`No activity yet. Only activity received while this view is open appears here.`,emptyFiltered:`No activity matches these filters.`,argumentHiddenOne:`1 argument hidden`,argumentsHidden:`{count} arguments hidden`,streamLabel:`Agent activity entries`,toolCallId:`Tool call`,runId:`Run`,session:`Session`,outputTruncated:`Preview redacted and truncated.`,noOutputPreview:`No output preview.`,currentWork:{title:`Active sessions`,loading:`Loading active sessions…`,empty:`No active sessions.`,disconnected:`Connect to the Gateway to load active sessions.`,loadFailed:`Could not load active sessions.`,queued:`Queued`,limit:`Showing {count} of {total} active sessions.`},answerCandidate:{title:`Answer candidate`,itemId:`Item`,candidate:`Candidate answer`,superseded:`Superseded answer`,selected:`Selected answer`},status:{running:`Running`,done:`Done`,error:`Error`},runInspector:{activityView:`Activity view`,liveMode:`Live activity`,mode:`Run inspector`,intro:`Durable Gateway-backed identity evidence for one run. Reloading this page queries the Gateway again.`,bestEffortWarning:`Best-effort audit warning: this view is for operational diagnostics, not a lossless compliance record. Absence of evidence does not prove that an action or run did not occur.`,evidenceStateLabel:`Evidence state: {state}`,evidenceState:{present:`Present`,absent:`Absent`,unknown:`Unknown`,unsupported:`Unsupported`},coverageStatusLabel:`Inspection coverage: {state}`,coverage:{enforced:{label:`Enforced`,description:`A decision receipt proves identity-aware evaluation; it does not by itself mean the action was allowed.`},attributionOnly:{label:`Attribution only`,description:`Identity facts were recorded, but no identity-aware policy or grant evaluation is proven.`},unattributed:{label:`Unattributed`,description:`The supported path was observed without a usable invoker principal.`},unknown:{label:`Unknown`,description:`Expected evidence is missing, corrupt, expired unexpectedly, or unreadable.`},unsupported:{label:`Unsupported`,description:`This path has no Phase 0 identity evidence contract.`}},facts:{trustDomain:`Trust domain`,ingress:`Ingress`,invoker:`Invoker`,representedSubject:`Represented subject`,sponsor:`Sponsor`,agentPrincipal:`Agent principal`,agentDefinition:`Agent definition`,runtimeInstance:`Runtime instance`,applicableGrants:`Applicable grants`,applicableGrant:`Applicable grant {index}`,assuranceEvidence:`Assurance evidence`,assuranceEvidenceItem:`Assurance evidence {index}`,lineage:`Lineage`},values:{label:`Label`,kind:`Kind`,operation:`Operation`,principalReference:`Principal reference`,domainReference:`Domain reference`,owningBoundary:`Owning boundary`,sourceReference:`Source reference`,relationshipReference:`Relationship reference`,definitionReference:`Definition reference`,revisionReference:`Revision reference`,runtimeReference:`Runtime reference`,grantReference:`Grant reference`,strength:`Strength`,evidenceReference:`Evidence reference`,depth:`Depth`,parentRunReference:`Parent run reference`,parentExecutionReference:`Parent execution reference`,parentContextReference:`Parent context reference`,delegationReference:`Delegation reference`},reasons:{absent:`No {label} was recorded at the owning boundary.`,unknown:`The {label} was expected, but its evidence is unavailable or unreadable.`,unsupported:`This execution path does not provide {label} evidence.`,invokerAbsent:`The supported ingress boundary recorded no usable invoker principal.`,noGrants:`No applicable grants were recorded for this run.`,noAssurance:`No assurance evidence was recorded for this run.`,noLineage:`No parent or subagent lineage was recorded for this run.`},identityHeading:`Identity and authority`,missingEvidenceHeading:`Missing evidence`,noMissingEvidence:`No missing evidence was reported for this projection.`,nextStepsHeading:`Next steps`,decisions:{heading:`Decision receipts`,none:`No decision receipts were returned for this bounded page.`,returned:`Showing {count} retained decision receipts.`,listLabel:`Decision receipt list`,inspectLabel:`{summary}. Outcome: {outcome}. Evidence classification: {classification}.`,detailHeading:`Receipt detail`,requestedHeading:`What was requested`,outcomeHeading:`What happened`,outcomeLabel:`Outcome`,classificationLabel:`Evidence classification`,reasonLabel:`Recorded reason`,occurredAtLabel:`Recorded at`,ownerHeading:`Display provenance`,durableOwnerLabel:`Verified producer`,boundaryLabel:`Decision boundary`,ownerNote:`The Gateway exposes explanations only from a verified owning call path. Receipt-controlled explanations and next steps are hidden; the Control UI does not infer trust from receipt metadata.`,evidenceHeading:`Evidence limits`,contextFieldsLabel:`Context fields used`,noContextFields:`No context fields were recorded as used.`,policyCountLabel:`Policy references used`,grantCountLabel:`Grant references used`,notFoundTitle:`Receipt not found on this page`,notFoundDescription:`The selected receipt is not present in this retained page. Return to the first page or use a current receipt link.`,readOnly:`Decision receipts are read-only. This view cannot approve, edit, or repeat an action.`,more:`Additional decision receipts are available.`,loadMore:`Load more receipts`,loadingMore:`Loading receipts…`,loadMoreError:`More receipts could not be loaded. The receipts already shown remain unchanged.`,bounded:`Decision inspection is bounded to at most 50 records per request.`,outcomes:{allowed:`Allowed`,denied:`Denied`,notApplicable:`Not applicable`,unknown:`Unknown`}},diagnosticReason:`Diagnostic reason:`,diagnostic:{notFound:{title:`Run not found`,description:`No retained run or identity record matched this reference. Missing best-effort evidence does not prove that the run never occurred.`},expired:{title:`Identity evidence expired`,description:`The Gateway found the run, but its identity context is outside the 30-day retention window.`},corrupt:{title:`Identity evidence is corrupt`,description:`The Gateway found evidence for this run but could not validate the stored identity context.`},ambiguous:{title:`Multiple executions match this run`,description:`A run reference can correlate more than one execution. The inspector will not guess which execution you meant.`},unsupported:{title:`Identity evidence unsupported`,description:`The run is known, but this execution path did not retain a supported identity context.`},unknown:{title:`Identity evidence unknown`,description:`The path promises evidence, but the expected record is missing, unreadable, or otherwise unavailable.`}},candidates:{listLabel:`Matching executions`,recorded:`Recorded {date}`,executionReference:`Inspect execution`,more:`More matching executions exist beyond this bounded page.`,loadMore:`Load more executions`,loadingMore:`Loading executions…`,loadMoreError:`More executions could not be loaded. Try again.`},panels:{empty:{title:`No run selected`,description:`Open a link shaped like /activity?view=run&run=<run-id> to inspect durable identity evidence.`},waiting:{title:`Waiting for the Gateway`,description:`The durable projection will load when this browser reconnects.`},loading:{title:`Loading run inspection`,description:`Reading the Gateway's retained identity projection…`},disconnected:{title:`Gateway disconnected`,description:`Run identity is durable on the Gateway, but it cannot be read while this browser is disconnected.`},unauthorized:{title:`Operator read access required`,description:`This connection does not have operator.read, so retained run identity cannot be loaded.`},unsupported:{title:`Run inspection unsupported`,description:`This Gateway does not offer audit.run.inspect. Upgrade the Gateway, enable execution identity collection, and record a new run.`},error:{title:`Run inspection failed`,description:`The Gateway could not return this diagnostic projection. No identity facts were inferred from Live activity.`}},restart:`Restart inspection`,retry:`Retry inspection`}}},N=Object.assign(()=>{ve.activity=Xt.activity},{catalog:Xt})})))()}function F(e){let t=we({},e.key,e.agentId??void 0),n=e.agentId??t.agentId;return JSON.stringify([n?a(n):null,t.sessionKey,e.sessionId??null])}function Zt(e){let t=pe(e);return!t?.sessionId||t.hasActiveRun===null&&t.activeRunIds===void 0&&t.status===null&&t.reason!==`delete`?null:{key:t.key,agentId:t.agentId,sessionId:t.sessionId,runId:t.runId,reason:t.reason,updatedAt:t.updatedAt,hasActiveRun:t.hasActiveRun,activeRunIds:t.activeRunIds,status:t.status}}function Qt(e,t){let n=new Map(e.sessions.map(e=>[F(e),{row:e,requiresRefresh:!1}])),r=new Set;for(let e of t){let t=F(e),i=n.get(t),a=e.status===`running`||e.status===`queued`?e.status:void 0,o=e.hasActiveRun===!0||e.hasActiveRun!==!1&&a!==void 0;if(!i){o?r.add(t):(e.hasActiveRun===!1||e.reason===`delete`)&&r.delete(t);continue}let{row:s}=i;if(e.updatedAt!==null&&(s.updatedAt??0)>e.updatedAt)continue;let c={...s,updatedAt:e.updatedAt??s.updatedAt};if(e.reason===`delete`)c.hasActiveRun=!1,c.activeRunIds=[];else if(o)c.hasActiveRun=!0,c.status=a??(s.status===`queued`?`queued`:`running`),e.activeRunIds===void 0?e.runId&&!s.activeRunIds?.includes(e.runId)&&(c.activeRunIds=void 0):c.activeRunIds=e.activeRunIds??void 0;else{let t=e.hasActiveRun===!1||e.status!==null;if(t&&s.hasActiveRun===!0&&e.runId&&!s.activeRunIds?.includes(e.runId)){i.requiresRefresh=!0;continue}if(e.hasActiveRun===!1&&(e.activeRunIds!==void 0||!e.runId)||e.activeRunIds?.length===0)c.hasActiveRun=!1,c.activeRunIds=[];else if(t){let t=e.activeRunIds??s.activeRunIds;if(!e.runId||!t?.includes(e.runId)){i.requiresRefresh=s.hasActiveRun===!0;continue}c.activeRunIds=t.filter(t=>t!==e.runId),c.hasActiveRun=c.activeRunIds.length>0}else e.activeRunIds!==void 0&&(c.activeRunIds=e.activeRunIds??void 0)}i.row=c,i.requiresRefresh=!1}let i=[...n.values()].filter(({row:e})=>e.hasActiveRun===!0),a=i.map(({row:e})=>e),o=!i.some(e=>e.requiresRefresh),s=!o||!e.hasMore&&r.size>0;return{result:{...e,count:a.length,sessions:a},requiresRefresh:s,canPublish:o}}function I(){return(I=e((()=>{re(),b()})))()}function $t(e,t){let n=w`<span class="activity-current-work__copy">
      <span class="activity-current-work__title">${ce(t.key,t)}</span>
      <span class="activity-current-work__agent"
        >${t.agentId?v(`activityFeed.agentLabel`,{value:t.agentId}):t.key}</span
      >
    </span>
    ${j({kind:`warn`,label:t.status===`queued`?v(`activity.currentWork.queued`):v(`activity.status.running`)})}`;if(!Ce(t.key,e.globalScope))return w`<div
      class="activity-current-work__row"
      data-session-key=${t.key}
      data-agent-id=${t.agentId??T}
    >
      ${n}
    </div>`;let r=Re(t),i=Ie({face:r,sessionKey:t.key,basePath:e.basePath,fallbackAgentId:t.agentId??e.fallbackAgentId,mainKey:e.mainKey,row:t});return w`<a
    class="activity-current-work__row"
    data-session-key=${t.key}
    data-agent-id=${t.agentId??T}
    href=${i.href}
    @click=${t=>{_e(t)&&(t.preventDefault(),e.navigate(r,i.options))}}
  >
    ${n}
  </a>`}function en(e){let t=e.connected&&!e.error?e.result?.sessions??[]:[],n=e.connected?e.error?v(`activity.currentWork.loadFailed`):!e.result||t.length===0&&e.incomplete?v(`activity.currentWork.loading`):t.length===0?v(`activity.currentWork.empty`):null:v(`activity.currentWork.disconnected`);return w`<section
    class="activity-current-work"
    aria-label=${v(`activity.currentWork.title`)}
    aria-busy=${e.loading}
  >
    <div class="settings-section__header">
      <h2 class="settings-section__heading">${v(`activity.currentWork.title`)}</h2>
    </div>
    <div class="settings-group activity-current-work__rows">
      ${n?w`<div class="activity-current-work__feedback" role="status">
              <span>${n}</span>
              ${e.error?w`<button type="button" class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRetry}>${v(`common.retry`)}</button>`:T}
            </div>`:pt(t,F,t=>$t(e,t))}
      ${e.result?.hasMore&&!n?w`<div class="activity-current-work__feedback">${v(`activity.currentWork.limit`,{count:String(t.length),total:String(e.result.totalCount??t.length)})}</div>`:T}
    </div>
  </section>`}function tn(){return(tn=e((()=>{E(),mt(),M(),x(),P(),Oe(),Te(),I(),N()})))()}function nn(e,t=Date.now()){let n=i(e),r=g(n?.runId),a=i(n?.data),o=n?.stream===`tool`,s=n?.stream===`item`&&g(a?.kind)===`answer_candidate`;if(!n||!o&&!s||!r||!a)return null;let c=g(n.sessionKey),l=g(n.agentId);return{stream:o?`tool`:`item`,runId:r,ts:typeof n.ts==`number`?n.ts:t,receivedAt:t,...c?{sessionKey:c}:{},...l?{agentId:l}:{},data:a}}function rn(e){if(typeof e==`string`)return e;if(typeof e==`number`||typeof e==`boolean`)return String(e);let t=i(e);if(!t)return null;if(typeof t.text==`string`)return t.text;let n=t.content;if(!Array.isArray(n))return null;let r=n.map(e=>{let t=i(e);return t?.type===`text`&&typeof t.text==`string`?t.text:null}).filter(e=>!!e);return r.length>0?r.join(`
`):null}function an(e){let t=rn(e);if(t!==null)return t;if(e==null)return null;try{return JSON.stringify(e,null,2)}catch{return ae(e)}}function on(e){let t=an(e);if(!t)return{truncated:!1};let n=he(t),r=ne(n,hn);return{text:Array.from(r.text).join(``),truncated:r.truncated}}function sn(e){if(e==null)return 0;if(Array.isArray(e))return e.length;let t=i(e);return t?Object.keys(t).length:1}function cn(e){return e?.isError===!0||e?.is_error===!0}function ln(e){if(g(e.phase)!==`result`)return`running`;let t=i(e.result);if(cn(e)||cn(t))return`error`;let n=g(e.status)??g(t?.status);if(n&&/error|fail|failed|failure/i.test(n))return`error`;let r=Number(t?.exitCode??e.exitCode);return Number.isFinite(r)&&r!==0?`error`:`done`}function un(e,t,n){let r=`${n} argument${n===1?``:`s`} hidden`;return`${e} ${gn[t]}; ${r}`}function dn(e,t){let n=t.data??{};if(t.stream===`item`)return pn(e,t);let r=g(n.toolCallId);if(!r)return e;let i=g(n.name)??`tool`,a=`${t.runId}:${r}`,o=t.receivedAt,s=typeof t.ts==`number`?t.ts:o,c=ln(n),l=on(n.phase===`update`?n.partialResult:n.phase===`result`?n.result:null),u=e.find(e=>e.id===a),d=n.args===void 0?u?.hiddenArgumentCount??0:sn(n.args),f=l.text??u?.outputPreview,p={id:a,toolCallId:r,runId:t.runId,...t.sessionKey?{sessionKey:t.sessionKey}:{},toolName:i,entryKind:`tool`,status:c,startedAt:u?.startedAt??s,updatedAt:o,durationMs:Math.max(0,o-(u?.startedAt??s)),outputTruncated:l.truncated||u?.outputTruncated===!0,summary:un(i,c,d),hiddenArgumentCount:d,...f?{outputPreview:f}:{}},m=u?e.map(e=>e.id===a?p:e):[...e,p];return m.length>mn?m.slice(-100):m}function fn(e){return e===`candidate`||e===`superseded`||e===`selected`?e:null}function pn(e,t){let n=g(t.data.itemId),r=fn(t.data.status);if(!n||!r)return e;let i=`${t.runId}:answer_candidate:${n}`,a=e.find(e=>e.id===i),o=t.receivedAt,s=a?.startedAt??t.ts,c=on(t.data.progressText),l={id:i,toolCallId:n,itemId:n,runId:t.runId,...t.sessionKey?{sessionKey:t.sessionKey}:{},toolName:`answer_candidate`,entryKind:`answer_candidate`,candidateStatus:r,status:r===`candidate`?`running`:`done`,startedAt:s,updatedAt:o,durationMs:Math.max(0,o-s),outputTruncated:c.truncated||a?.outputTruncated===!0,summary:`answer_candidate.${r}`,hiddenArgumentCount:0,...c.text?{outputPreview:c.text}:{}},u=a?e.map(e=>e.id===i?l:e):[...e,l];return u.length>mn?u.slice(-100):u}var mn,hn,gn;function _n(){return(_n=e((()=>{ie(),_(),mn=100,hn=2e3,gn={running:`running`,done:`completed`,error:`failed`}})))()}function vn(e,t){let n=[],r={entries:n,revision:0,error:null},i=new Map,a=e.eventLogRevision,o=!1,s=[],c=e.snapshot.client,l=document.visibilityState!==`hidden`,u=new Map,d=r=>{let a=u.get(r);u.delete(r),i.delete(r)&&h(n);let o=c;a?.then(n=>t.unsubscribeMessages(n).catch(()=>{e.snapshot.client===o&&e.snapshot.phase===`connected`&&e.connect()}),()=>void 0)},f=()=>{let r=e.snapshot.phase===`connected`;r||(s=[]);let a=new Map((l&&r&&!o?s.slice(0,100):[]).map(e=>[F({key:e.key,agentId:e.agentId}),e]));for(let t of u.keys())(!a.has(t)||c!==e.snapshot.client)&&d(t);c=e.snapshot.client;for(let[e,r]of a)if(!u.has(e)){let a=t.subscribeMessages(r.key,{agentId:be(r.key)?void 0:r.agentId});u.set(e,a),a.catch(t=>{u.get(e)===a&&(i.set(e,t instanceof Error?t.message:String(t)),h(n))})}},p=e=>{l=e.type!==`pagehide`&&document.visibilityState!==`hidden`,f()};document.addEventListener(`visibilitychange`,p),globalThis.addEventListener(`pagehide`,p),globalThis.addEventListener(`pageshow`,p);let m=new Set,h=(e,t=!1)=>{let a=i.values().next().value??null;(e!==n||t||r.error!==a)&&(n=e,r={entries:n,revision:r.revision+ +!!t,error:a},Ge(m,r,`activity`,e=>!o&&e===r))},g=()=>{let t=e.eventLogRevision;t!==a&&(a=t,s=[],f(),h([],!0))},ee=e.subscribe(()=>{o||(g(),f())}),te=e.subscribeEvents(t=>{if(o||t.event!==`agent`&&t.event!==`session.tool`)return;let r=e.snapshot.client,i=e.eventLogRevision;if(g(),o||r!==e.snapshot.client||i!==e.eventLogRevision)return;let a=nn(t.payload,Date.now());a?.sessionKey&&u.has(F({key:a.sessionKey,agentId:a.agentId}))&&h(dn(n,a))});return{get snapshot(){return r},subscribe(e){return m.add(e),()=>m.delete(e)},syncSessions(e){s!==e&&(s=e,f())},retry(){for(let e of i.keys())d(e);f()},clear(){h([],!0)},dispose(){o=!0,f(),document.removeEventListener(`visibilitychange`,p),globalThis.removeEventListener(`pagehide`,p),globalThis.removeEventListener(`pageshow`,p),ee(),te(),n=[],r={entries:n,revision:r.revision+1,error:null},m.clear()}}}function yn(){return(yn=e((()=>{tt(),b(),I(),_n()})))()}function L(e){let t=f(e.lastActivityAt),n=f(e.lastInteractionAt);return t!==void 0||n!==void 0?Math.max(t??0,n??0):f(e.updatedAt)??f(e.createdAt)??0}function bn(){return(bn=e((()=>{p()})))()}function xn(e){return e===`24h`||e===`7d`||e===`30d`||e===`all`}function Sn(e,t){let n=new URLSearchParams(e),r=n.get(`time`);return{personId:t??h(n.get(`person`))??null,query:n.get(`q`)?.trim()??``,time:xn(r)?r:Mn}}function Cn(e,t=``,n){let r=new URLSearchParams;e.time!==Mn&&r.set(`time`,e.time),e.query&&r.set(`q`,e.query);let i=r.toString(),a=i?`?${i}`:``;return{pathname:e.personId?Ye(e.personId,t,n).pathname:Qe(`activity`,t),search:a}}function wn(e,t,n,r){let i=new URLSearchParams(e.search),a=et(e.pathname,r),o=(a??i.get(`person`))?.replaceAll(`-`,``),s=o&&/^[0-9a-f]{8,32}$/.test(o)&&t.replaceAll(`-`,``).startsWith(o)?o.length:32,c=a&&!n?e.pathname:Ye(t,r,n,s).pathname;i.delete(Ue);let l=i.toString(),u=l?`?${l}`:``;return c===e.pathname&&u===e.search?null:{pathname:c,search:u,hash:e.hash}}function Tn(e,t){return L(t)-L(e)||(e.key<t.key?-1:+(e.key>t.key))}function En(e){let t=e.owner?.actor??e.createdActor,n=h(e.agentId),{resourceBasePath:r}=le();return{id:h(t?.id)??n??`system`,name:h(t?.label)??n,avatarUrl:t?h(t.avatarUrl):n?Be(`agentAvatar`,r,n):void 0,watchedSessions:[]}}function Dn(e){let t=new Date(e),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`);return`${t.getFullYear()}-${n}-${r}`}function On(e){let t=new Date(e);return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()}function kn(e){let t=e?.sessions??[],n=(e?.people??[]).map(e=>({id:e.identity.id,name:e.label,avatarUrl:e.avatarUrl,watchedSessions:[],count:e.sessionCount})),r=new Map;for(let e of t){let t=L(e),n=t>0?Dn(t):`unknown`,i=r.get(n);i?i.push(e):r.set(n,[e])}return{days:[...r.entries()].map(([e,t])=>({key:e,timestamp:e===`unknown`?null:On(L(t[0])),sessions:t})),matchedCount:e?.totalCount??t.length,people:n,sessions:t,timeCount:e?.peopleSessionCount??t.length}}function An(e,t){let n=new Set(e.watchedSessions);return t.filter(e=>n.has(e.key)).toSorted(Tn)}var jn,Mn;function R(){return(R=e((()=>{ze(),bn(),Xe(),oe(),jn=[`24h`,`7d`,`30d`,`all`],Mn=`7d`})))()}function Nn(e,t){let n=`?view=run&${e.kind}=${encodeURIComponent(e.id)}`;return t&&(n+=`&receipt=${encodeURIComponent(t.id)}`,t.decisionCursor&&(n+=`&decision=${encodeURIComponent(t.decisionCursor)}`)),n}function z(e,t,n){return`${Qe(`activity`,t)}${Nn(e,n)}`}function Pn(e,t){return z({kind:`run`,id:e},t)}function Fn(e,t){let n=new URLSearchParams(e);if(n.get(`view`)===`live`)return{mode:`live`,selector:null};if(n.get(`view`)!==`run`)return{mode:`sessions`,filters:Sn(e,t),selector:null};let r=n.get(`execution`),i=n.get(`receipt`)?.trim()||null,a=i&&n.get(`decision`)?.trim()||null;if(r?.trim())return{mode:`run`,selector:{kind:`execution`,id:r},selectorId:i,decisionCursor:a};let o=n.get(`run`);return{mode:`run`,selector:o?.trim()?{kind:`run`,id:o}:null,selectorId:i,decisionCursor:a}}function In(e,t){return new Map(e.map(e=>[e.selectorId,t]))}function Ln(e,t){if(e.identity.state!==`present`||t.identity.state!==`present`||e.run.executionId!==t.run.executionId||e.identity.context.contextId!==t.identity.context.contextId)return null;let n=new Map(e.decisionDisplays.map(e=>[e.selectorId,e]));for(let e of t.decisionDisplays)n.set(e.selectorId,e);return{...t,decisionDisplays:[...n.values()]}}function Rn(e){let t=e.identity;return t.state===`present`?`present`:t.state===`ambiguous`?`ambiguous`:t.reasonCode===`run_not_found`||t.reasonCode===`execution_not_found`?`not-found`:t.reasonCode===`identity_context_corrupt`?`corrupt`:t.state===`unsupported`&&t.remediation.some(e=>e.code===`run_again_after_expiry`)?`expired`:t.state}function B(){return(B=e((()=>{Xe(),R()})))()}function zn(e){return e===`attribution-only`?`attributionOnly`:e}function V(e){return v(`activity.runInspector.coverage.${zn(e)}.label`)}function H(e,t=!1,n){let r=w`<bdi
    class=${t?`run-inspector__ref mono`:`run-inspector__ref`}
    dir="ltr"
    >${e}</bdi
  >`;return n?w`<a href=${n}>${r}</a>`:r}function Bn(e,t,n){return n===6?w`<h6 id=${t}>${e}</h6>`:w`<h3 id=${t}>${e}</h3>`}function Vn(e,t={}){let n=t.headingId??`run-inspector-missing-heading`;return w`
    <section class="run-inspector__section" aria-labelledby=${n}>
      ${Bn(v(`activity.runInspector.missingEvidenceHeading`),n,t.headingLevel??3)}
      ${e.length===0?w`<p>${v(`activity.runInspector.noMissingEvidence`)}</p>`:w`<ul class="run-inspector__code-list">
              ${e.map(e=>w`<li>${H(e,!0)}</li>`)}
            </ul>`}
    </section>
  `}function Hn(e,t={}){if(e.length===0)return T;let n=t.headingId??`run-inspector-remediation-heading`;return w`
    <section class="run-inspector__section" aria-labelledby=${n}>
      ${Bn(v(`activity.runInspector.nextStepsHeading`),n,t.headingLevel??3)}
      <ul class="run-inspector__remediation-list">
        ${e.map(e=>w`<li>
            <span>${e.text}</span> ${H(e.code,!0)}
          </li>`)}
      </ul>
    </section>
  `}function U(e){return v(`activity.runInspector.decisions.outcomes.${e===`not-applicable`?`notApplicable`:e}`)}function Un(e,t){return e.length===0?w`<p class="run-inspector__reason">${t}</p>`:w`<ul class="run-inspector__code-list">
        ${e.map(e=>w`<li>${H(e,!0)}</li>`)}
      </ul>`}function Wn(e,t,n){return w`<div class="run-inspector__pagination">
    <span>${v(`activity.runInspector.${e}.more`)}</span>
    <button type="button" class="btn" ?disabled=${t===`loading`} @click=${n}>
      ${v(`activity.runInspector.${e}.${t===`loading`?`loadingMore`:`loadMore`}`)}
    </button>
    ${t===`error`?w`<span role="alert">${v(`activity.runInspector.${e}.loadMoreError`)}</span>`:T}
  </div>`}function Gn(e){let t=e.enforcement.coverageState;return w`
    <article
      class="run-inspector__receipt-detail"
      data-receipt-selector-id=${e.selectorId}
      aria-labelledby="run-inspector-receipt-detail"
    >
      <h4 id="run-inspector-receipt-detail">
        ${v(`activity.runInspector.decisions.detailHeading`)}
      </h4>
      <section aria-labelledby="run-inspector-receipt-requested">
        <h5 id="run-inspector-receipt-requested">
          ${v(`activity.runInspector.decisions.requestedHeading`)}
        </h5>
        ${e.action.summary?w`<p>${e.action.summary}</p>`:T}
        <dl class="run-inspector__values">
          <div>
            <dt>${v(`activity.runInspector.values.kind`)}</dt>
            <dd>${H(e.action.family)}</dd>
          </div>
          <div>
            <dt>${v(`activity.runInspector.values.operation`)}</dt>
            <dd>${H(e.action.operation)}</dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="run-inspector-receipt-outcome">
        <h5 id="run-inspector-receipt-outcome">
          ${v(`activity.runInspector.decisions.outcomeHeading`)}
        </h5>
        <div class="run-inspector__receipt-badges">
          <span
            class="run-inspector__receipt-badge run-inspector__receipt-badge--${e.decision.outcome}"
            role="img"
            aria-label=${`${v(`activity.runInspector.decisions.outcomeLabel`)}: ${U(e.decision.outcome)}`}
          >
            ${U(e.decision.outcome)}
          </span>
          <span
            class="run-inspector__receipt-badge run-inspector__receipt-badge--${t}"
            role="img"
            aria-label=${`${v(`activity.runInspector.decisions.classificationLabel`)}: ${V(t)}`}
          >
            ${V(t)}
          </span>
        </div>
        <p class="run-inspector__reason">
          ${v(`activity.runInspector.coverage.${zn(t)}.description`)}
        </p>
        <dl class="run-inspector__values">
          <div>
            <dt>${v(`activity.runInspector.decisions.reasonLabel`)}</dt>
            <dd>${H(e.decision.reasonCode,!0)}</dd>
          </div>
          <div>
            <dt>${v(`activity.runInspector.decisions.occurredAtLabel`)}</dt>
            <dd>${new Date(e.occurredAt).toLocaleString()}</dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="run-inspector-receipt-owner">
        <h5 id="run-inspector-receipt-owner">
          ${v(`activity.runInspector.decisions.ownerHeading`)}
        </h5>
        ${e.provenance.state===`verified`?w`<dl class="run-inspector__values">
                  <div>
                    <dt>${v(`activity.runInspector.decisions.durableOwnerLabel`)}</dt>
                    <dd>${H(e.provenance.producer)}</dd>
                  </div>
                </dl>
                <p class="run-inspector__reason">
                  ${v(`activity.runInspector.decisions.ownerNote`)}
                </p>`:w`<p class="run-inspector__reason">
                ${v(`activity.runInspector.decisions.ownerNote`)}
              </p>`}
      </section>
      <section aria-labelledby="run-inspector-receipt-evidence">
        <h5 id="run-inspector-receipt-evidence">
          ${v(`activity.runInspector.decisions.evidenceHeading`)}
        </h5>
        <dl class="run-inspector__values">
          <div>
            <dt>${v(`activity.runInspector.decisions.policyCountLabel`)}</dt>
            <dd>${e.enforcement.policyCount}</dd>
          </div>
          <div>
            <dt>${v(`activity.runInspector.decisions.grantCountLabel`)}</dt>
            <dd>${e.enforcement.grantCount}</dd>
          </div>
        </dl>
        <h6>${v(`activity.runInspector.decisions.contextFieldsLabel`)}</h6>
        ${Un(e.enforcement.contextFieldsUsed,v(`activity.runInspector.decisions.noContextFields`))}
        ${Vn(e.missingEvidence,{headingId:`run-inspector-receipt-missing-heading`,headingLevel:6})}
      </section>
      ${Hn(e.remediation,{headingId:`run-inspector-receipt-remediation-heading`,headingLevel:6})}
    </article>
  `}function Kn(e,t,n,r,i){let a=e.result,o=n?a.decisionDisplays.find(e=>e.selectorId===n):a.decisionDisplays[0];return w`
    <section class="run-inspector__section" aria-labelledby="run-inspector-decisions-heading">
      <h3 id="run-inspector-decisions-heading">${v(`activity.runInspector.decisions.heading`)}</h3>
      ${a.decisionDisplays.length===0?w`<p>${v(`activity.runInspector.decisions.none`)}</p>`:w`<p>
              ${v(`activity.runInspector.decisions.returned`,{count:String(a.decisionDisplays.length)})}
            </p>`}
      <div class="run-inspector__warning" role="note">
        ${v(`activity.runInspector.decisions.readOnly`)}
      </div>
      ${a.decisionDisplays.length>0&&t?w`<ol
              class="run-inspector__receipt-list"
              aria-label=${v(`activity.runInspector.decisions.listLabel`)}
            >
              ${a.decisionDisplays.map(n=>{let i=o?.selectorId===n.selectorId;return w`<li>
                  <a
                    href=${z(t,r,{id:n.selectorId,decisionCursor:e.receiptPageCursors.get(n.selectorId)})}
                    aria-current=${i?`true`:T}
                    aria-label=${v(`activity.runInspector.decisions.inspectLabel`,{summary:n.action.summary??`${n.action.family} · ${n.action.operation}`,outcome:U(n.decision.outcome),classification:V(n.enforcement.coverageState)})}
                  >
                    <span
                      >${n.action.summary??`${n.action.family} · ${n.action.operation}`}</span
                    >
                    <span class="run-inspector__receipt-badges" aria-hidden="true">
                      <span
                        class="run-inspector__receipt-badge run-inspector__receipt-badge--${n.decision.outcome}"
                        >${U(n.decision.outcome)}</span
                      >
                      <span
                        class="run-inspector__receipt-badge run-inspector__receipt-badge--${n.enforcement.coverageState}"
                        >${V(n.enforcement.coverageState)}</span
                      >
                    </span>
                  </a>
                </li>`})}
            </ol>`:T}
      ${a.nextDecisionCursor?Wn(`decisions`,e.decisionPageStatus,i):w`<div class="run-inspector__pagination" role="note">
              ${v(`activity.runInspector.decisions.bounded`)}
            </div>`}
      ${n&&!o?w`<div class="run-inspector__result-state" role="status">
              <h4>${v(`activity.runInspector.decisions.notFoundTitle`)}</h4>
              <p>${v(`activity.runInspector.decisions.notFoundDescription`)}</p>
              ${t?w`<a href=${z(t,r)}>
                      ${v(`activity.runInspector.decisions.heading`)}
                    </a>`:T}
            </div>`:o?Gn(o):T}
    </section>
  `}function qn(){return(qn=e((()=>{E(),x(),B()})))()}function Jn(e){return v(`activity.runInspector.evidenceState.${e}`)}function Yn(e,t){return t===`present`?void 0:v(`activity.runInspector.reasons.${t}`,{label:e.toLowerCase()})}function W(e){return e?[...G(v(`activity.runInspector.values.label`),e.displayLabel,!1),[v(`activity.runInspector.values.kind`),e.kind],[v(`activity.runInspector.values.principalReference`),e.principalRef,!0],[v(`activity.runInspector.values.domainReference`),e.domainRef,!0]]:[]}function G(e,t,n=!0){return t?[[e,t,n]]:[]}function Xn(e){let t=e.values??[],n=e.reason??Yn(e.label,e.state);return w`
    <div class="run-inspector__fact" data-state=${e.state}>
      <dt>
        <span>${e.label}</span>
        <span
          class="run-inspector__state run-inspector__state--${e.state}"
          role="img"
          aria-label=${v(`activity.runInspector.evidenceStateLabel`,{state:Jn(e.state)})}
        >
          ${Jn(e.state)}
        </span>
      </dt>
      <dd>
        ${t.length>0?w`<dl class="run-inspector__values">
                ${t.map(([e,t,n,r])=>w`
                    <div>
                      <dt>${e}</dt>
                      <dd>${H(t,n,r)}</dd>
                    </div>
                  `)}
              </dl>`:T}
        ${n?w`<p class="run-inspector__reason">${n}</p>`:T}
      </dd>
    </div>
  `}function Zn(e,t){let n=e.representedSubject,r=e.sponsor,i=e.lineage;return[{label:v(`activity.runInspector.facts.trustDomain`),state:e.trustDomain.state,values:[[v(`activity.runInspector.values.kind`),e.trustDomain.kind],[v(`activity.runInspector.values.domainReference`),e.trustDomain.domainRef,!0]]},{label:v(`activity.runInspector.facts.ingress`),state:e.ingress.state,values:[[v(`activity.runInspector.values.kind`),e.ingress.kind],[v(`activity.runInspector.values.owningBoundary`),e.ingress.boundary,!0],...G(v(`activity.runInspector.values.sourceReference`),e.ingress.sourceRef)]},{label:v(`activity.runInspector.facts.invoker`),state:e.invoker.state,values:W(e.invoker.principal),reason:e.invoker.state===`absent`?v(`activity.runInspector.reasons.invokerAbsent`):void 0},{label:v(`activity.runInspector.facts.representedSubject`),state:n?.state??`absent`,values:W(n?.principal)},{label:v(`activity.runInspector.facts.sponsor`),state:r?.state??`absent`,values:[...W(r?.principal),...G(v(`activity.runInspector.values.relationshipReference`),r?.relationshipRef)]},{label:v(`activity.runInspector.facts.agentDefinition`),state:e.agentDefinition.state,values:[[v(`activity.runInspector.values.definitionReference`),e.agentDefinition.definitionRef,!0],...G(v(`activity.runInspector.values.revisionReference`),e.agentDefinition.revisionRef)]},{label:v(`activity.runInspector.facts.agentPrincipal`),state:`present`,values:W(e.agentPrincipal)},{label:v(`activity.runInspector.facts.runtimeInstance`),state:e.runtimeInstance.state,values:[[v(`activity.runInspector.values.kind`),e.runtimeInstance.kind],[v(`activity.runInspector.values.runtimeReference`),e.runtimeInstance.runtimeRef,!0]]},...e.applicableGrants.length===0?[{label:v(`activity.runInspector.facts.applicableGrants`),state:`absent`,reason:v(`activity.runInspector.reasons.noGrants`)}]:e.applicableGrants.map((e,t)=>({label:v(`activity.runInspector.facts.applicableGrant`,{index:String(t+1)}),state:e.state,values:[[v(`activity.runInspector.values.grantReference`),e.grantRef,!0]]})),...e.assurance.length===0?[{label:v(`activity.runInspector.facts.assuranceEvidence`),state:`absent`,reason:v(`activity.runInspector.reasons.noAssurance`)}]:e.assurance.map((e,t)=>({label:v(`activity.runInspector.facts.assuranceEvidenceItem`,{index:String(t+1)}),state:`present`,values:[[v(`activity.runInspector.values.kind`),e.kind],[v(`activity.runInspector.values.strength`),e.strength],[v(`activity.runInspector.values.evidenceReference`),e.evidenceRef,!0]]})),{label:v(`activity.runInspector.facts.lineage`),state:i?`present`:`absent`,values:i?[[v(`activity.runInspector.values.depth`),i.depth],...i.parentRunId?[[v(`activity.runInspector.values.parentRunReference`),i.parentRunId,!0,z({kind:`run`,id:i.parentRunId},t)]]:[],...G(v(`activity.runInspector.values.parentExecutionReference`),i.parentExecutionId),...G(v(`activity.runInspector.values.parentContextReference`),i.parentContextId),...G(v(`activity.runInspector.values.delegationReference`),i.delegationRef),...W(i.parentAgentPrincipal)]:[],reason:i?void 0:v(`activity.runInspector.reasons.noLineage`)}]}function Qn(e){let t=Rn(e);if(t===`present`)return null;let n=t===`not-found`?`notFound`:t;return{title:v(`activity.runInspector.diagnostic.${n}.title`),description:v(`activity.runInspector.diagnostic.${n}.description`)}}function $n(e,t,n,r){let i=Qn(e);if(!i||e.identity.state===`present`)return T;let a=e.identity;return w`
    <div class="run-inspector__result-state" role="status" aria-label=${i.title}>
      <h3>${i.title}</h3>
      <p>${i.description}</p>
      <p>
        ${v(`activity.runInspector.diagnosticReason`)}
        ${H(a.reasonCode,!0)}
      </p>
    </div>
    ${a.state===`ambiguous`?w`
            <ol
              class="run-inspector__candidate-list"
              aria-label=${v(`activity.runInspector.candidates.listLabel`)}
            >
              ${a.candidates.map(e=>w`
                  <li>
                    <span
                      >${v(`activity.runInspector.candidates.recorded`,{date:new Date(e.createdAt).toLocaleString()})}</span
                    >
                    <a
                      href=${z({kind:`execution`,id:e.executionId},t)}
                    >
                      ${v(`activity.runInspector.candidates.executionReference`)}
                      ${H(e.executionId,!0)}
                    </a>
                  </li>
                `)}
            </ol>
            ${e.nextExecutionCursor?Wn(`candidates`,n,r):T}
          `:T}
    ${Vn(a.missingEvidence)}
    ${Hn(a.remediation)}
  `}function er(e,t,n,r,i,a){let o=e.result,s=V(o.coverage.state);return w`
    <div
      class="run-inspector__coverage run-inspector__coverage--${o.coverage.state}"
      role="status"
      aria-label=${v(`activity.runInspector.coverageStatusLabel`,{state:s})}
    >
      <strong>${s}</strong>
      <span>
        ${v(`activity.runInspector.coverage.${zn(o.coverage.state)}.description`)}
      </span>
    </div>
    ${o.identity.state===`present`?w`
            <section
              class="run-inspector__section"
              aria-labelledby="run-inspector-identity-heading"
            >
              <h3 id="run-inspector-identity-heading">
                ${v(`activity.runInspector.identityHeading`)}
              </h3>
              <dl class="run-inspector__facts">
                ${Zn(o.identity.context,t).map(Xn)}
              </dl>
            </section>
            ${Vn(o.coverage.missingEvidence)}
            ${Kn(e,n,r,t,i)}
          `:$n(o,t,e.executionPageStatus,a)}
  `}function tr(e,t){let n=t.status===`loading`&&t.waitingForGateway?`waiting`:t.status,r=t.status===`error`?t.recovery===`restart`?{label:v(`activity.runInspector.restart`),onClick:e.onRestart}:{label:v(`activity.runInspector.retry`),onClick:e.onRetry}:void 0;return w`
    <div
      class="run-inspector__panel"
      role=${t.status===`error`||t.status===`unauthorized`?`alert`:`status`}
    >
      <h3>${v(`activity.runInspector.panels.${n}.title`)}</h3>
      <p>${v(`activity.runInspector.panels.${n}.description`)}</p>
      ${r?w`<button type="button" class="btn" @click=${r.onClick}>
              ${r.label}
            </button>`:T}
    </div>
  `}function nr(e){let t=e.state,n=t.status===`ready`&&t.result.identity.state===`present`?t.result.identity.context:null,r=t.status===`ready`?er(t,e.basePath,e.selector,e.selectorId,e.onLoadMoreDecisions,e.onLoadMoreExecutions):tr(e,t);return w`
    <section
      id="activity-run-panel"
      class="run-inspector"
      data-run-id=${n?.runId??T}
      data-execution-id=${n?.executionId??T}
      aria-label=${v(`activity.runInspector.mode`)}
    >
      <div class="settings-section__header">
        <div>
          <h2 class="settings-section__heading">${v(`activity.runInspector.mode`)}</h2>
          <p class="run-inspector__intro">${v(`activity.runInspector.intro`)}</p>
        </div>
      </div>
      <div class="run-inspector__warning" role="note">
        ${v(`activity.runInspector.bestEffortWarning`)}
      </div>
      ${r}
    </section>
  `}function rr(){return(rr=e((()=>{E(),x(),P(),qn(),B(),N()})))()}function K(e){return JSON.stringify([e.agentId??be(e.key)?.agentId,e.key])}function ir(e){return JSON.stringify([e.sessionId,e.updatedAt,e.lastActivityAt,e.activitySummary?.updatedAt])}var ar,or,sr,cr;function lr(){return(lr=e((()=>{u(),Xe(),Se(),b(),I(),R(),ar=1e3,or=`sessions.activitySummary.ensure`,sr=20,cr=class{get loading(){return this.requestState!==`idle`||this.incomplete}get retrying(){return this.requestState===`retrying`}constructor(e){this.host=e,this.incomplete=!1,this.requestState=`idle`,this.client=null,this.summaryAttempts=new Map,this.summaryRetries=new Set,this.canEnsureSummaries=!1,this.filters=null,this.pendingChanges=[],this.changesOverflowed=!1,this.normalizedLocation=``,this.observesPageLifecycle=typeof document<`u`&&typeof globalThis.addEventListener==`function`,this.pageActive=!this.observesPageLifecycle||document.visibilityState!==`hidden`,this.eventRefresh=xe({active:this.pageActive,refresh:()=>this.load(this.client,this.filters,`refresh`)}),this.handlePageLifecycle=e=>{let t=e.type===`pagehide`,n=this.pending!==void 0||this.summaryPending!==void 0;this.pageActive=!t&&document.visibilityState!==`hidden`,this.pageActive||this.resetSummaries(),this.eventRefresh.setActive(this.pageActive,t||n)},e.addController(this)}hostConnected(){this.updatePageLifecycleListeners(!0),this.observesPageLifecycle&&this.handlePageLifecycle(new Event(`pageshow`))}hostDisconnected(){this.updatePageLifecycleListeners(!1),this.resetQuery()}resetSummaries(){this.summaryPending?.abort(),this.summaryPending=void 0,this.summaryAttempts.clear(),this.summaryRetries.clear()}resetQuery(){clearTimeout(this.dayRollover),this.dayRollover=void 0,this.eventRefresh.reset(),this.pending?.controller.abort(),this.pending=void 0,this.resetSummaries(),this.requestState=`idle`,this.incomplete=!1,this.error=void 0,this.client=null,this.queryKey=void 0,this.result=void 0,this.filters=null,this.pendingChanges.length=0,this.changesOverflowed=!1,this.normalizedLocation=``}retrySummary(e){this.canEnsureSummaries&&e.activitySummary?.canEnsure===!0&&this.result?.sessions.includes(e)&&(this.summaryAttempts.delete(K(e)),this.summaryRetries.add(K(e)),this.ensureSummaries())}needsSummary(e){let t=K(e);return e.activitySummary?.canEnsure===!0&&(this.summaryRetries.has(t)||e.activitySummary.state===`stale`)&&this.summaryAttempts.get(t)!==ir(e)}async ensureSummaries(){let e=this.client,t=this.queryKey;if(!e||!this.result||!this.canEnsureSummaries||this.filters===`current`||this.summaryPending)return;if(!this.pageActive){this.eventRefresh.schedule();return}let n=new Set(this.result.sessions.filter(e=>e.activitySummary?.canEnsure===!0).map(K));for(let e of new Set([...this.summaryAttempts.keys(),...this.summaryRetries]))n.has(e)||(this.summaryAttempts.delete(e),this.summaryRetries.delete(e));let r=this.result.sessions.filter(e=>this.needsSummary(e));if(r.length===0)return;let i=new AbortController;this.summaryPending=i;let a=()=>this.summaryPending===i&&this.client===e&&this.queryKey===t&&this.canEnsureSummaries&&!i.signal.aborted;try{for(let t=0;t<r.length&&a();t+=sr){let n=new Map(this.result.sessions.map(e=>[K(e),e])),o=r.slice(t,t+sr).flatMap(e=>{let t=n.get(K(e));return t&&t.sessionId===e.sessionId&&this.needsSummary(t)?[t]:[]});if(o.length!==0){for(let e of o){let t=K(e);this.summaryAttempts.set(t,ir(e)),this.summaryRetries.delete(t)}try{let t=await e.request(or,{sessions:o.map(e=>({key:e.key,...e.agentId?{agentId:e.agentId}:{}}))},{signal:i.signal});if(!a()||!this.result)return;let n=new Map(t.sessions.map(e=>[K(e),e.activitySummary]));this.result={...this.result,sessions:this.result.sessions.map(e=>o.includes(e)&&n.has(K(e))?{...e,activitySummary:n.get(K(e))}:e)}}catch{if(!a()||!this.result)return;this.result={...this.result,sessions:this.result.sessions.map(e=>o.includes(e)?{...e,activitySummary:{...e.activitySummary,state:`unavailable`}}:e)}}this.host.requestUpdate()}}}finally{this.summaryPending===i&&(this.summaryPending=void 0,this.host.requestUpdate(),this.ensureSummaries())}}personLabel(e,t){return this.result?.people?.find(t=>t.identity.id===e)?.label??t.find(t=>t.identity?.id===e)?.name}canonicalLocation(e,t,n){if(!this.filters||this.filters===`current`||!this.filters.personId||!this.result?.involvingProfileId||this.loading)return null;let r=this.result.involvingProfileId,i=wn(e,r,this.personLabel(r,n),t);if(!i)return this.normalizedLocation=``,null;let a=`${e.pathname}${e.search}${e.hash}`;return this.normalizedLocation===a?null:(this.normalizedLocation=a,i)}locationForFilters(e,t,n,r){let i=Cn(e,n,e.personId?this.personLabel(e.personId,r):void 0),a=this.result?.involvingProfileId??(this.filters===`current`?void 0:this.filters?.personId);return e.personId&&e.personId===a&&(i.pathname=et(t.pathname,n)?t.pathname:Ye(e.personId,n,this.personLabel(e.personId,r),32).pathname),i}updatePageLifecycleListeners(e){if(!this.observesPageLifecycle)return;let t=e?`addEventListener`:`removeEventListener`;document[t](`visibilitychange`,this.handlePageLifecycle),globalThis[t](`pagehide`,this.handlePageLifecycle),globalThis[t](`pageshow`,this.handlePageLifecycle)}invalidate(e){if(this.client&&this.filters){if(this.filters===`current`){let t=Zt(e);if(t){if(this.result){let e=Qt(this.result,[t]);this.result=e.result,this.incomplete||=e.requiresRefresh,this.host.requestUpdate()}this.pending&&(this.pendingChanges.length<ar?this.pendingChanges.push(t):this.changesOverflowed=!0)}}this.eventRefresh.schedule()}}load(e,t,n=`query`,r=this.canEnsureSummaries){if(this.canEnsureSummaries=r,r||this.resetSummaries(),!e||!t)return this.resetQuery(),this.host.requestUpdate(),Promise.resolve();let i=new Date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1).getTime();clearTimeout(this.dayRollover),this.dayRollover=void 0,t!==`current`&&typeof setTimeout==`function`&&(this.dayRollover=setTimeout(()=>this.eventRefresh.schedule(),a-Date.now()+1e3));let o=t===`current`?{activeOnly:!0,archived:`all`,includeGlobal:!0,includeUnknown:!0,includeDerivedTitles:!0,limit:100}:{archived:`all`,includeGlobal:!0,includeUnknown:!0,includePeople:!0,activityPulseSince:new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime(),activityPulseUntil:a,excludeSubagents:!0,includeActivitySummary:!0,includeDerivedTitles:!0,sortBy:`activity`,limit:100,...t.personId?{involvingProfileId:t.personId}:{},...t.query?{search:t.query}:{},...t.time===`all`?{}:{activeMinutes:t.time===`24h`?1440:t.time===`7d`?10080:43200}},s=JSON.stringify(o),c=this.client===e&&this.queryKey===s;if(c&&this.pending&&n!==`retry`)return n===`refresh`&&this.eventRefresh.schedule(),this.pending.completion.promise;if(n===`query`&&c)return this.ensureSummaries(),Promise.resolve();this.pending?.controller.abort(),this.eventRefresh.absorb();let l={controller:new AbortController,completion:ee()};return this.pending=l,this.client=e,this.queryKey=s,this.filters=t,this.pendingChanges.length=0,this.changesOverflowed=!1,this.requestState=n===`retry`?`retrying`:`loading`,this.error=void 0,c||(this.resetSummaries(),this.result=void 0,this.incomplete=!1),this.host.requestUpdate(),e.request(`sessions.list`,o,{signal:l.controller.signal}).then(e=>{if(this.pending===l){if(t===`current`){let t=Qt(e,this.pendingChanges);this.incomplete=this.changesOverflowed||t.requiresRefresh,this.incomplete&&this.eventRefresh.schedule(),!this.changesOverflowed&&t.canPublish&&(this.result=t.result)}else this.result=e,this.ensureSummaries()}}).catch(e=>{this.pending===l&&!l.controller.signal.aborted&&(t===`current`&&(this.result=void 0,this.incomplete=!1),this.error=e instanceof Error?e.message:String(e))}).finally(()=>{this.pending===l&&(this.pending=void 0,this.pendingChanges.length=0,this.requestState=`idle`,this.host.requestUpdate()),l.completion.resolve()}),l.completion.promise}}})))()}function ur(e){let t=r(e);if(t?.found!==!0)return{status:`absent`};let n=e=>e?.trim()?e:void 0,i=r(t.attribution),a=n(l(i,`text`)),o=n(l(i,`url`)),s=n(l(t,`city`)),c=n(l(t,`region`)),u=n(l(t,`country`)),d={...s?{city:s}:{},...c?{region:c}:{},...u?{country:u}:{},...a&&o?{attribution:{text:a,url:o}}:{}};return Object.keys(d).length>0?{status:`located`,location:d}:{status:`absent`}}async function dr(e){let{origin:t}=le();try{let n=await De(`${t??``}/plugins/geolocation/lookup?ip=${encodeURIComponent(e)}`,pr);return n.ok?ur(await n.json()):{status:`unavailable`}}catch{return{status:`unavailable`}}}function fr(e){let t=q.get(e);if(t)return t;let n=dr(e).then(t=>(t.status===`unavailable`&&q.get(e)===n&&q.delete(e),t));return s(q,255),q.set(e,n),n}var pr,q;function mr(){return(mr=e((()=>{oe(),pr=15e3,q=new Map,de(()=>q.clear())})))()}var hr,J;function gr(){return(gr=e((()=>{E(),O(),mr(),y(),C(),hr=[5e3,15e3,45e3],J=class extends Ae{constructor(...e){super(...e),this.location=null,this.retryAttempt=0}disconnectedCallback(){super.disconnectedCallback(),this.clearRetry()}willUpdate(){let e=this.ip?.trim();e!==this.requestedIp&&(this.clearRetry(),this.requestedIp=e,this.retryAttempt=0,this.location=null,e&&this.resolve(e))}clearRetry(){this.retryTimer!==void 0&&(clearTimeout(this.retryTimer),this.retryTimer=void 0)}resolve(e){fr(e).then(t=>{if(this.requestedIp!==e)return;if(t.status===`located`){this.location=t.location;return}if(t.status===`absent`)return;let n=hr[this.retryAttempt];n!==void 0&&(this.retryAttempt+=1,this.retryTimer=setTimeout(()=>{this.retryTimer=void 0,this.requestedIp===e&&this.isConnected&&this.resolve(e)},n))})}render(){let e=[this.location?.city,this.location?.region??this.location?.country].filter(Boolean).join(`, `);if(!e)return T;let t=this.location?.attribution;return w`<span class="activity-feed__device-location"
      >${e}${t?w`<a
              class="activity-feed__device-attribution"
              href=${t.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label=${t.text}
              title=${t.text}
              >${S.info}</a
            >`:T}</span
    >`}},m([k({attribute:!1})],J.prototype,`ip`,void 0),m([D()],J.prototype,`location`,void 0),globalThis.customElements&&(customElements.get(`openclaw-ip-location`)||customElements.define(`openclaw-ip-location`,J))})))()}function _r(e){return w`${e.additions===void 0?T:w`<span class="activity-feed__additions">+${e.additions.toLocaleString()}</span>`}${e.deletions===void 0?T:w`<span class="activity-feed__deletions">−${e.deletions.toLocaleString()}</span>`}`}function vr(e){return{url:e.url,title:e.title,subtitle:e.owner+`/`+e.repo+` #`+e.number,badge:{label:v(`activity.git.`+e.state),tone:e.state===`merged`?`accent`:e.state===`open`?`positive`:e.state===`closed`?`negative`:`neutral`},author:e.author?.login,authorUrl:e.author?.login?`https://github.com/`+encodeURIComponent(e.author.login):void 0,metadata:[...e.additions===void 0?[]:[{label:``,value:`+`+e.additions,tone:`positive`}],...e.deletions===void 0?[]:[{label:``,value:`−`+e.deletions,tone:`negative`}]]}}function yr(e){let t={open:S.gitPullRequest,draft:S.gitPullRequestDraft,merged:S.gitMerge,closed:S.gitPullRequestClosed}[e.state];return w`<a
    class="activity-feed__pr"
    data-state=${e.state}
    href=${e.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label=${v(`activity.git.pullRequest`,{repository:`${e.owner}/${e.repo}`,number:String(e.number),title:e.title,state:v(`activity.git.${e.state}`)})}
  >
    <span class="activity-feed__git-icon" aria-hidden="true">${t}</span>
    <span class="activity-feed__git-label">${e.repo}#${e.number}</span>
    ${_r(e)}
  </a>`}var Y;function br(){return(br=e((()=>{E(),O(),lt(),He(),C(),x(),P(),xt(),y(),ye(),N(),Y=class extends Me{constructor(...e){super(...e),this.sessionKey=``,this.agentId=``,this.subscriptions=new je(this).effect(()=>this.context?.gateway,e=>{let t=Tt(e),n=t.subscribe(()=>this.requestUpdate()),r=e.subscribe(()=>this.requestUpdate());return()=>{t.unwatch(this),n(),r()}})}willUpdate(){this.isConnected&&Tt(this.context.gateway).watch(this,[this.sessionKey],{foreground:!0})}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}render(){let e=this.context.gateway,t=Tt(e).get(this.sessionKey);if(!t)return T;let n=t.pullRequests.some(e=>e.state===`open`||e.state===`draft`)?void 0:t.branch;if(!n&&t.pullRequests.length===0)return T;let r=t.status!==`ready`||e.snapshot.phase!==`connected`;return w`<openclaw-link-reader-hovercard-provider
      .client=${e.snapshot.phase===`connected`?e.snapshot.client:null}
      .readers=${st(e.snapshot)}
      .agentId=${this.agentId}
      .previewSeeds=${t.pullRequests.map(vr)}
    >
      <div class="activity-feed__git">
        ${n?w`<span
                class="activity-feed__branch"
                title=${v(`activity.git.branchDiff`,{branch:n.branch})}
              >
                <span class="activity-feed__git-icon" aria-hidden="true">${S.gitBranch}</span>
                <span class="activity-feed__git-label">${n.branch}</span>
                ${_r(n)}
              </span>`:T}
        ${t.pullRequests.map(yr)}
        ${r?w`<span
                class="activity-feed__git-stale"
                role="img"
                aria-label=${v(`activity.git.stale`)}
                title=${v(`activity.git.stale`)}
                >${S.alertTriangle}</span
              >`:T}
      </div>
    </openclaw-link-reader-hovercard-provider>`}},m([k({attribute:!1})],Y.prototype,`context`,void 0),m([k()],Y.prototype,`sessionKey`,void 0),m([k()],Y.prototype,`agentId`,void 0),customElements.get(`openclaw-activity-session-git`)||customElements.define(`openclaw-activity-session-git`,Y)})))()}function xr(e,t){let n=Cr.get(e);return(!n||n.hello!==t)&&(n={hello:t,epoch:++wr,entries:new Map,running:0,queue:[]},Cr.set(e,n)),n}async function Sr(e,t,n){if(e.running>=2){let n=await new Promise(n=>{let r=e.queue.findIndex(e=>e.key===t),i=e.queue[r];i?(e.queue[r]={key:t,admit:n},i.admit(`superseded`)):e.queue.length<128?e.queue.push({key:t,admit:n}):n(`full`)});if(n!==`run`)return n}else e.running++;try{return await n(),`run`}finally{let t=e.queue.shift();t?t.admit(`run`):e.running--}}var Cr,wr,X;function Tr(){return(Tr=e((()=>{E(),O(),Je(),x(),P(),y(),ye(),Vt(),Ht(),Rt(),N(),Cr=new WeakMap,wr=0,X=class extends Me{constructor(...e){super(...e),this.sessionKey=``,this.agentId=``,this.revision=0,this.visible=!1,this.displayedImages=[],this.key=``,this.boundImageIdentity=``,this.lightbox=null,this.imageRequest=0,this.refresh=()=>this.requestUpdate(),this.subscriptions=new je(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)),this.closeImage=()=>{this.imageRequest++,this.lightbox?.release?.(),this.lightbox=null,this.requestUpdate()},this.load=()=>{let e=this.context.gateway,{client:t,hello:n}=e.snapshot,r=this.owner,i=this.entry,a=this.key,o=this.sessionKey,s=this.agentId;if(!t||!r||!i||i.pending)return;let c=()=>this.isConnected&&this.visible&&this.owner===r&&this.key===a&&e.snapshot.client===t&&e.snapshot.hello===n&&e.snapshot.phase===`connected`;i.error&&(i.cursor=void 0,i.images=[]),i.error=!1,i.pending=Sr(r,JSON.stringify([s,o]),async()=>{try{for(let e=0;e<3&&i.images.length<4&&c();e++){let e=await t.request(`artifacts.list`,{sessionKey:o,agentId:s,type:`image`,limit:4-i.images.length,...i.cursor?{cursor:i.cursor}:{}});if(!c())return;i.loaded=!0,i.cursor=e.nextCursor,i.omitted||=e.omittedOversized;for(let t of e.artifacts)t.image&&!i.images.some(e=>e.url===t.image?.url)&&i.images.push({url:t.image.url,artifactId:t.source===`session-transcript-preview`?void 0:t.id,alt:t.title});if(!i.cursor)break}}catch{c()&&(i.loaded=!0,i.error=!0)}}).then(e=>{e!==`run`&&c()&&(i.loaded=!0,i.error=e===`full`)}).finally(()=>{i.pending=void 0,this.requestUpdate()}),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),typeof IntersectionObserver<`u`&&(this.observer=new IntersectionObserver(e=>{this.visible=e.some(e=>e.isIntersecting),this.requestUpdate()},{rootMargin:`200px`}),this.observer.observe(this))}disconnectedCallback(){this.observer?.disconnect(),this.visible=!1,this.subscriptions.clear(),this.closeImage(),Bt(this.refresh),super.disconnectedCallback()}get imageIdentity(){return JSON.stringify([this.agentId,this.sessionKey,this.session?.sessionId,Lt(this.session)])}willUpdate(){let{client:e,hello:t,phase:n}=this.context.gateway.snapshot,r=e&&n===`connected`?xr(e,t):void 0,i=JSON.stringify([this.agentId,this.sessionKey,this.session?.sessionId,this.revision]),a=this.imageIdentity;if((r!==this.owner||a!==this.boundImageIdentity)&&(this.displayedImages=[],this.closeImage(),Bt(this.refresh),this.boundImageIdentity=a),(r!==this.owner||i!==this.key)&&(this.owner=r,this.key=i,this.entry=void 0,r&&(this.entry=r.entries.get(i),!this.entry&&(this.entry={images:[],loaded:!1},r.entries.set(i,this.entry),r.entries.size>128)))){let e=r.entries.keys().next().value;e&&r.entries.delete(e)}this.visible&&this.entry&&!this.entry.loaded&&!this.entry.pending&&this.load(),this.entry?.pending&&this.observedPending!==this.entry.pending&&(this.observedPending=this.entry.pending,this.observedPending.then(this.refresh)),this.entry?.loaded&&!this.entry.pending&&(!this.entry.error||this.displayedImages.length===0)&&(this.displayedImages=this.entry.images.slice(0,4))}render(){let e=this.entry,t=this.owner,n=this.context.gateway,{client:r,hello:i}=n.snapshot;if(!e||!t||!r)return T;let a=this.displayedImages.length>0,o=e.cursor&&e.images.length<4&&!e.error?[w`<button
              class="activity-feed__note-action"
              ?disabled=${!!e.pending}
              @click=${this.load}
            >
              ${e.pending?v(`common.loading`):v(`activity.images.older`)}
            </button>`]:[],s=!!(e.error||e.omitted)||!a&&!!e.cursor,c=w`${e.omitted?w`<span>${v(`activity.images.incomplete`)}</span>`:T}${e.error?w`<span role="status">${v(`activity.images.failed`)}</span
            ><button
              class="activity-feed__note-action"
              ?disabled=${!!e.pending}
              @click=${this.load}
            >
              ${v(`common.retry`)}
            </button>`:a?T:o}`,l=this.imageIdentity,u=this.agentId;return w`
      ${a||s?w`<div class="activity-feed__media">
              ${a?Ut(this.displayedImages,{sessionKey:this.sessionKey,agentId:this.agentId,connectionEpoch:t.epoch,policyKey:Lt(this.session),resourceBasePath:this.context.resourceBasePath,authToken:qe({hello:i,settings:{token:n.connection.token},password:n.connection.password}),onRequestUpdate:this.refresh,onRequestOpenImage:()=>++this.imageRequest,onOpenImage:(e,a)=>{if(!this.isConnected||this.owner!==t||this.imageIdentity!==l||n.snapshot.client!==r||n.snapshot.hello!==i||n.snapshot.phase!==`connected`||a!==this.imageRequest){e.release?.();return}this.lightbox?.release?.(),this.lightbox=e,this.requestUpdate()},resolveArtifactDownload:async e=>{let t=await r.request(`artifacts.download`,{...e,agentId:u});return n.snapshot.client===r&&n.snapshot.hello===i&&n.snapshot.phase===`connected`&&t.url?{url:t.url,expiresAt:t.expiresAt}:null}},o):T}
              ${s?w`<div class="activity-feed__note">${c}</div>`:T}
            </div>`:T}
      ${zt(this.lightbox,this.closeImage)}
    `}},m([k({attribute:!1})],X.prototype,`context`,void 0),m([k()],X.prototype,`sessionKey`,void 0),m([k()],X.prototype,`agentId`,void 0),m([k({type:Number})],X.prototype,`revision`,void 0),m([k({attribute:!1})],X.prototype,`session`,void 0),customElements.get(`openclaw-activity-session-media`)||customElements.define(`openclaw-activity-session-media`,X)})))()}function Er(e,t,n){let r=new Intl.DateTimeFormat(void 0,{hour:`numeric`}),i=t=>r.format(e.since+t*36e5),a=Math.max(0,Math.min(e.hours.length-1,Math.floor((t-e.since)/36e5))),o=e.hours.slice(0,a+1),s=Math.max(...o),c=[[`sessions`,e.sessions],[`started`,e.started],[`people`,e.people],[`running`,e.running]];return w`<section class="activity-pulse">
    <div class="activity-pulse__header">
      <div class="activity-pulse__heading">
        ${S.activity}<strong>${v(`activityFeed.today`)}</strong>
        <span
          >${new Intl.DateTimeFormat(void 0,{hour:`numeric`,minute:`2-digit`}).format(t)}</span
        >
      </div>
      <div class="activity-pulse__stats">
        ${c.filter(([,e])=>e!==void 0).map(([t,r],i)=>w`
              ${i?` · `:T}<span
                title=${t===`people`&&n.peopleIncomplete?v(`activityFeed.partialHistory`):T}
                >${t===`running`&&e.running>0?w`<i class="activity-pulse__running" aria-hidden="true"></i>`:T}<b
                  >${t===`people`&&n.peopleIncomplete?`${r}+`:r}</b
                >
                ${v(`activity.pulse.${t}`)}</span
              >
            `)}
      </div>
    </div>
    <div
      class="activity-pulse__bars"
      role="img"
      aria-label=${v(`activity.pulse.description`,{count:String(e.sessions),hour:i(o.indexOf(s))})}
    >
      ${e.hours.map((e,t)=>w`<span
          class="activity-pulse__bar"
          data-hour=${t===a?`current`:t<a?`past`:`future`}
          style=${`height: max(2px, ${t<=a&&s>0?e/s*100:0}%)`}
          title=${v(`activity.pulse.hour`,{hour:i(t),count:String(e)})}
        ></span>`)}
    </div>
    <div class="activity-pulse__axis" aria-hidden="true">
      ${[0,6,12,18].map(e=>w`<span>${i(e)}</span>`)}
      <span>${r.format(e.until)}</span>
    </div>
  </section>`}function Dr(){return(Dr=e((()=>{E(),C(),x(),P(),N()})))()}function Or(e,t){let n=e.activitySummary,r=n?.state===`current`&&!n.text?`missing`:n?.state??`missing`,i=r===`updating`,a=i?``:r===`stale`?v(n?.text?`activityFeed.recapStale`:`activityFeed.recapMissing`):r===`unavailable`?v(n?.text?`activityFeed.recapRefreshFailed`:`activityFeed.recapUnavailable`):r===`missing`?v(`activityFeed.recapMissing`):``;return w`<div
    class="activity-feed__recap"
    data-activity-recap=${e.key}
    data-state=${r}
    role="group"
    aria-busy=${String(i)}
    aria-label=${v(`activityFeed.recap`)}
    title=${n?.updatedAt?v(`activityFeed.recapUpdated`,{time:se(n.updatedAt,{fallback:``})}):T}
  >
    ${n?.text?w`<p class="activity-feed__recap-text">${n.text}</p>`:i?w`<div class="activity-feed__recap-skeleton" aria-hidden="true">
              <div class="skeleton skeleton-line skeleton-line--long"></div>
              <div class="skeleton skeleton-line skeleton-line--medium"></div>
            </div>`:T}
    ${i?w`<span class="sr-only" role="status">${v(`activityFeed.recapUpdating`)}</span>`:T}
    ${a?w`<div class="activity-feed__note">
            <span>${a}</span>
            ${t&&n?.canEnsure===!0&&(r===`unavailable`||r===`stale`)?w`<button class="activity-feed__note-action" @click=${()=>t(e)}>
                    ${v(`activityFeed.recapRetry`)}
                  </button>`:T}
          </div>`:T}
  </div>`}function kr(){return(kr=e((()=>{E(),x(),_()})))()}function Z(e){return!e.name&&!e.email&&A(e)===e.id}function Ar(e){return Z(e)&&e.id.length>8?`${e.id.slice(0,8)}…`:A(e)}function jr(e,t=!1){return Z(e)?w`<span
      class="viewer-avatar viewer-avatar--overflow activity-feed__unknown-avatar"
      aria-hidden="true"
      >${S.users}</span
    >`:w`<span class="activity-feed__person-avatar">
    <openclaw-viewer-avatar
      .identity=${{type:`profile`,id:e.id}}
      .user=${e}
      .markAsViewer=${!1}
      variant="footer"
    ></openclaw-viewer-avatar>
    ${t&&(e.entries?.length??0)>0?w`<span
            class="activity-feed__presence-dot"
            data-presence-activity=${bt(e)}
            role="img"
            aria-label=${wt(bt(e))}
          ></span>`:T}
  </span>`}function Mr(e,t,n){e.currentTarget instanceof Element&&e.currentTarget.closest(`wa-popover`)?.removeAttribute(`open`),t.onFiltersChange({...t.filters,personId:n})}function Nr(e,t){e.currentTarget instanceof Element&&e.currentTarget.parentElement?.querySelector(`.activity-feed__people-trigger`)?.setAttribute(`aria-expanded`,String(t))}function Pr(e,t){return w`<button
    type="button"
    class="session-menu__item activity-feed__people-row"
    data-activity-person=${e.id}
    aria-pressed=${String(t.filters.personId===e.id)}
    @click=${n=>Mr(n,t,e.id)}
  >
    ${jr(e,!0)}
    <span class="activity-feed__people-copy">
      <span class="activity-feed__people-name">${Ar(e)}</span>
    </span>
    <span class="activity-feed__people-count">${e.count}</span>
  </button>`}function Fr(e,t,n,r){let i=t.slice(0,3),a=t.length-i.length,o=t.filter(e=>!Z(e)),s=t.filter(Z);return w`<div class="activity-feed__people-control">
    <button
      id="activity-feed-people-trigger"
      type="button"
      class="btn btn--sm activity-feed__people-trigger"
      aria-label=${v(`activityFeed.peopleButtonLabel`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${n?w`${jr(n)}<span class="activity-feed__selected-person"
                >${Ar(n)}</span
              >`:w`<span class="activity-feed__facepile" aria-hidden="true">
              ${i.length>0?i.map(e=>jr(e)):w`<span
                      class="viewer-avatar viewer-avatar--overflow activity-feed__unknown-avatar"
                      >${S.users}</span
                    >`}
              ${a>0?w`<span class="viewer-avatar viewer-avatar--overflow">+${a}</span>`:T}
            </span>`}
    </button>
    ${n?w`<button
            type="button"
            class="btn btn--sm activity-feed__people-clear"
            aria-label=${v(`activityFeed.clearPersonFilter`)}
            @click=${()=>e.onFiltersChange({...e.filters,personId:null})}
          >
            ${S.x}
          </button>`:T}
    <wa-popover
      ${ut(Mt)}
      class="activity-feed__people-popover"
      for="activity-feed-people-trigger"
      aria-label=${v(`activityFeed.peopleButtonLabel`)}
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>Nr(e,!0)}
      @wa-hide=${e=>Nr(e,!1)}
    >
      <div class="activity-feed__people-panel">
        <button
          type="button"
          class="session-menu__item activity-feed__people-row"
          data-activity-person=""
          aria-pressed=${String(e.filters.personId===null)}
          @click=${t=>Mr(t,e,null)}
        >
          <span
            class="viewer-avatar viewer-avatar--overflow activity-feed__unknown-avatar"
            aria-hidden="true"
            >${S.users}</span
          >
          <span class="activity-feed__people-copy">
            <span class="activity-feed__people-name">${v(`activityFeed.everyone`)}</span>
          </span>
          <span class="activity-feed__people-count">${r}</span>
        </button>
        ${o.map(t=>Pr(t,e))}
        ${s.length>0?w`<div class="session-menu__separator" role="separator"></div>
                <div class="activity-feed__people-group-label">
                  ${v(`activityFeed.unresolvedIdentities`)}
                </div>
                <div data-activity-unresolved>
                  ${s.map(t=>Pr(t,e))}
                </div>`:T}
        ${e.result?.peopleIncomplete?w`<p class="activity-feed__footer" role="status">${v(`activityFeed.partialHistory`)}</p>`:T}
      </div>
    </wa-popover>
  </div>`}function Ir(e,t=Date.now()){if(e===null)return v(`activityFeed.unknownDate`);let n=new Date(t),r=new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime(),i=new Date(r);return i.setDate(i.getDate()-1),e===r?v(`activityFeed.today`):e===i.getTime()?v(`activityFeed.yesterday`):new Intl.DateTimeFormat(void 0,{day:`numeric`,month:`long`,year:`numeric`}).format(e)}function Q(e,t,n){let r=be(t.key)?.agentId??t.agentId??Ne(e),i=Re(t),a=Ce(t.key,ke({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello}))?Ie({face:i,sessionKey:t.key,fallbackAgentId:t.key===`global`?r:Ne(e),basePath:e.basePath,row:t,mainKey:Ee({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello})}):null,o=a?gt`a`:gt`div`,s=En(t),c=A(s),l=L(t),u=t.observerDigest?.runId,d=t.hasActiveRun===!0&&u&&t.activeRunIds?.includes(u)?u:void 0,f=d?t.observerDigest?.headline.trim():``,p=t.channel?v(`activityFeed.channelLabel`,{value:t.channel}):null,m=t.kind!==`global`||!!t.agentId,h=t.createdVia===`cron`?v(`activityFeed.automation`):null;return ft`<div
    class="activity-feed__session-row${a?` activity-feed__session-row--link`:``}"
  >
    <${o}
      class="activity-feed__session"
      data-activity-session=${t.key}
      href=${a?.href??T}
      @click=${t=>{a&&_e(t)&&(t.preventDefault(),e.navigate(i,a.options))}}
    >
      <span class="activity-feed__session-avatar">
        ${t.hasActiveRun===!0?w`<span
                class="activity-feed__presence-dot activity-feed__run-dot"
                aria-hidden="true"
              ></span>`:T}
        <openclaw-viewer-avatar
          .identity=${t.owner?.actor.identity??t.createdActor?.identity}
          .user=${s}
          .markAsViewer=${!1}
          variant="footer"
        ></openclaw-viewer-avatar>
      </span>
      <span class="activity-feed__session-main">
        <span class="activity-feed__session-title">${ce(t.key,t)}</span>
        <span class="activity-feed__session-meta">
          ${f?w`<span
                  class="activity-feed__session-headline"
                  data-health=${t.observerDigest?.health??T}
                  >${f}</span
                >`:w`<span>${c}</span>`}${h?w`<span class="activity-feed__session-source" data-activity-created-via="cron"
                  >· ${h}${p||m?` ·`:``}</span
                >`:T}${m?w`<span class="activity-feed__session-scope"
                  >${Jt(r)}</span
                >`:T}${p?w`<span class="activity-feed__session-scope">${p}</span>`:T}
        </span>
      </span>
      <span class="activity-feed__session-time">
        ${f?w`<span class="activity-feed__session-owner">${c}</span>`:T}
        ${l>0?w`<span>${se(l,{fallback:``})}</span>`:T}
      </span>
    </${o}>
    ${Or(t,n)}
    <openclaw-activity-session-git
      .context=${e}
      .sessionKey=${Fe(t.key,r)}
      .agentId=${r}
    ></openclaw-activity-session-git>
    <openclaw-activity-session-media
      .context=${e}
      .sessionKey=${Fe(t.key,r)}
      .agentId=${r}
      .revision=${t.updatedAt??0}
      .session=${t}
    ></openclaw-activity-session-media>
    ${d?w`<a
            class="activity-feed__inspect-run"
            href=${Pn(d,e.basePath)}
            >${v(`activityFeed.inspectRun`)}</a
          >`:T}
  </div>`}function Lr(e,t){if(e.filters.query||e.filters.personId)return t.sessions.map(t=>Q(e.context,t,e.onSummaryRetry));let n=t.sessions.filter(e=>e.hasAutomation===!0);if(n.length<2)return t.sessions.map(t=>Q(e.context,t,e.onSummaryRetry));let r=e.expandedAutomationDays.has(t.key);return w`
    ${t.sessions.filter(e=>e.hasAutomation!==!0).map(t=>Q(e.context,t,e.onSummaryRetry))}
    <button
      type="button"
      class="activity-feed__session activity-feed__automation-group"
      data-activity-automation-group=${t.key}
      aria-expanded=${String(r)}
      @click=${()=>e.onAutomationDayToggle(t.key)}
    >
      <span class="activity-feed__automation-group-icon" aria-hidden="true">${S.clock}</span>
      <span>${v(`activityFeed.automationGroup`,{count:String(n.length)})}</span>
      <span class="activity-feed__automation-group-chevron" aria-hidden="true"
        >${S.chevronRight}</span
      >
    </button>
    ${r?n.map(t=>Q(e.context,t,e.onSummaryRetry)):T}
  `}function Rr(e,t,n){let r=(t.entries?.length??0)>0,i=bt(t),a=r?wt(i):v(`activityFeed.offline`),o=t.entries??[],s=An(t,n);return w`
    <section class="activity-feed__identity" data-activity-identity=${t.id}>
      <div class="activity-feed__identity-main">
        <openclaw-viewer-avatar
          .identity=${{type:`profile`,id:t.id}}
          .user=${t}
          .markAsViewer=${!1}
          variant="profile"
        ></openclaw-viewer-avatar>
        <div class="activity-feed__identity-copy">
          <h2>${A(t)}</h2>
          ${t.email?w`<p>${t.email}</p>`:T}
        </div>
        ${j({kind:r&&i!==`unknown`?i===`idle`?`warn`:`ok`:`muted`,label:a})}
      </div>
      ${o.length>0?w`<div class="activity-feed__devices">
              ${o.map(e=>{let t=[e.deviceFamily,e.platform,e.ip,e.timeZone].filter(Boolean).join(` · `);return w`<div class="activity-feed__device">
                  <span class="activity-feed__device-name"
                    >${e.host??v(`activityFeed.unknownDevice`)}</span
                  >
                  ${t?w`<span>${t}</span>`:T}
                  ${e.ip?w`<openclaw-ip-location .ip=${e.ip}></openclaw-ip-location>`:T}
                  ${e.lastInputSeconds===void 0?T:w`<span
                          >${v(`activityFeed.lastInput`,{time:ue(e.lastInputSeconds*1e3,{suffix:!1})})}</span
                        >`}
                </div>`})}
            </div>`:T}
      <div class="activity-feed__viewing">
        <h3>${v(`activityFeed.viewingNow`)}</h3>
        ${s.length>0?w`<div class="activity-feed__viewing-list">
                ${s.map(t=>Q(e,t))}
              </div>`:w`<p class="activity-feed__empty-note">${v(`activityFeed.notViewing`)}</p>`}
      </div>
    </section>
  `}function zr(){return w`<section class="activity-feed__loading" aria-busy="true">
    <span class="sr-only" role="status">${v(`common.loading`)}</span>
    <div class="skeleton activity-pulse activity-pulse--loading" aria-hidden="true"></div>
    <div class="activity-feed__sessions" aria-hidden="true">
      ${Array.from({length:4},()=>w`
          <div class="activity-feed__session-row">
            <div class="activity-feed__session">
              <span class="skeleton activity-feed__loading-avatar"></span>
              <div class="activity-feed__session-main">
                <div class="skeleton skeleton-line skeleton-line--medium"></div>
                <div class="skeleton skeleton-line activity-feed__loading-meta"></div>
              </div>
            </div>
            <div class="activity-feed__recap activity-feed__recap-skeleton">
              <div class="skeleton skeleton-line skeleton-line--long"></div>
              <div class="skeleton skeleton-line skeleton-line--medium"></div>
            </div>
          </div>
        `)}
    </div>
  </section>`}function Br(e){let t=kn(e.result),n=new Map(e.presenceViewers.flatMap(e=>e.identity?[[e.identity.id,e]]:[])),r=e.filters.personId?n.get(e.filters.personId)??t.people.find(t=>t.id===e.filters.personId)??null:null,i=t.people.map(e=>{let t=n.get(e.id);return t?{...e,...t,count:e.count}:e}),a=e.filters.personId?i.find(t=>t.id===e.filters.personId)??r:null;return w`
    <div class="activity-feed">
      <div class="activity-feed__toolbar">
        <label class="data-table-search activity-feed__search">
          ${S.search}
          <input
            type="search"
            aria-label=${v(`activityFeed.searchPlaceholder`)}
            .value=${e.filters.query}
            placeholder=${v(`activityFeed.searchPlaceholder`)}
            @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onFiltersChange({...e.filters,query:t.currentTarget.value})}}
          />
        </label>
        ${Nt({mode:`buttons`,className:`activity-feed__time-filter`,value:e.filters.time,ariaLabel:v(`activityFeed.time`),options:jn.map(e=>({value:e,label:v(Vr[e]),ariaLabel:v(Vr[e]),compactLabel:e===`all`?v(Vr[e]):e})),onChange:t=>e.onFiltersChange({...e.filters,time:t}),onReselect:t=>e.onFiltersChange({...e.filters,time:t})})}
        ${Fr(e,i,a,t.timeCount)}
      </div>
      <div class="activity-feed__feedback">
        <span role=${e.error?`alert`:`status`} title=${e.error??T}>
          ${e.error??(e.retrying?v(`common.refreshing`):T)}
        </span>
        ${e.error||e.retrying?w`<button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRetry}>
                ${v(`common.retry`)}
              </button>`:T}
      </div>
      <div class="activity-feed__main">
        ${e.loading&&!e.result?zr():T}
        ${e.result?.activityPulse?Er(e.result.activityPulse,Date.now(),{peopleIncomplete:e.result.peopleIncomplete}):T}
        ${e.result&&e.filters.personId?r?Rr(e.context,r,t.sessions):w`<section class="activity-feed__not-found" role="status">
                  <h2>${v(`activityFeed.notFoundTitle`)}</h2>
                  <p>${v(`activityFeed.notFoundDescription`)}</p>
                </section>`:T}
        ${e.result&&(!e.filters.personId||r)?w`
                ${t.days.length>0?t.days.map(t=>w`<section class="activity-feed__day">
                          <h3>${Ir(t.timestamp)}</h3>
                          <div class="activity-feed__sessions">
                            ${Lr(e,t)}
                          </div>
                        </section>`):w`<section class="activity-feed__empty" role="status">
                        ${v(`activityFeed.noSessions`)}
                      </section>`}
                ${t.matchedCount>t.sessions.length?w`<p class="activity-feed__footer">${v(`activityFeed.showing`,{shown:String(t.sessions.length),total:String(t.matchedCount)})}</p>`:T}
              `:T}
      </div>
    </div>
  `}var Vr;function Hr(){return(Hr=e((()=>{E(),dt(),ht(),Yt(),C(),gr(),jt(),M(),Pt(),x(),_(),St(),Oe(),Te(),b(),br(),Tr(),B(),Dr(),kr(),R(),Vr={"24h":`activityFeed.time24h`,"7d":`activityFeed.time7d`,"30d":`activityFeed.time30d`,all:`activityFeed.timeAll`}})))()}function Ur(e){return!Number.isFinite(e)||e<0?v(`common.na`):Ct(e)??`0ms`}function Wr(e){return v(`activity.status.${e}`)}function Gr(e){return e===1?v(`activity.argumentHiddenOne`):v(`activity.argumentsHidden`,{count:String(e)})}function Kr(e){return e.entryKind===`answer_candidate`?v(`activity.answerCandidate.${e.candidateStatus??`candidate`}`):Gr(e.hiddenArgumentCount)}function qr(e){return e.entryKind===`answer_candidate`?v(`activity.answerCandidate.title`):e.toolName}function Jr(e,t){return!t||d([e.toolName,qr(e),e.candidateStatus,e.status,e.summary,Kr(e),e.outputPreview,e.runId,e.toolCallId,e.sessionKey].filter(Boolean).join(` `)).includes(t)}function Yr(e){let t=d(e.filterText);return e.entries.filter(n=>!e.statusFilters[n.status]||e.toolFilter&&n.toolName!==e.toolFilter?!1:Jr(n,t))}function Xr(e,t){return w`
    <label class="activity-status-filter">
      <input
        type="checkbox"
        .checked=${e.statusFilters[t]}
        @change=${n=>e.onStatusToggle(t,n.target.checked)}
      />
      <span>${Wr(t)}</span>
    </label>
  `}function Zr(e,t){e.currentTarget instanceof Element&&e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,String(t))}function Qr(e,t){let n=!!e.toolFilter;return w`
    <button
      id="activity-live-filter-trigger"
      type="button"
      class="btn btn--sm activity-live-filter-trigger ${n?`active`:``}"
      title=${v(`activity.filters`)}
      aria-label=${v(`activity.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${S.listFilter}
    </button>
    <wa-popover
      ${ut(Mt)}
      class="activity-live-filter-popover"
      for="activity-live-filter-trigger"
      aria-label=${v(`activity.filters`)}
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>Zr(e,!0)}
      @wa-hide=${e=>Zr(e,!1)}
    >
      <div class="activity-live-filter-popover__panel">
        <label class="field">
          <span>${v(`activity.toolFilter`)}</span>
          <select
            class="settings-select"
            aria-label=${v(`activity.toolFilter`)}
            .value=${e.toolFilter}
            @change=${t=>{t.currentTarget instanceof HTMLSelectElement&&e.onToolFilterChange(t.currentTarget.value)}}
          >
            <option value="">${v(`activity.allTools`)}</option>
            ${t.map(e=>w`<option value=${e}>${e}</option>`)}
          </select>
        </label>
      </div>
    </wa-popover>
  `}function $r(e,t){return w`
    <div class="activity-live-toolbar">
      <div class="activity-feed__search activity-live-search">
        <span aria-hidden="true">${S.search}</span>
        <input
          class="settings-input"
          type="search"
          aria-label=${v(`activity.search`)}
          .value=${e.filterText}
          placeholder=${v(`activity.searchPlaceholder`)}
          @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onFilterTextChange(t.currentTarget.value)}}
        />
      </div>
      <span role="group" aria-label=${v(`activity.statusFilters`)} class="activity-status-filters">
        ${ni.map(t=>Xr(e,t))}
      </span>
      <span class="activity-live-autofollow">
        <span>${v(`activity.autoFollow`)}</span>
        ${Ot({checked:e.autoFollow,ariaLabel:v(`activity.autoFollow`),onChange:t=>e.onToggleAutoFollow(t)})}
      </span>
      ${Qr(e,t)}
    </div>
  `}function ei(e,t,n){let r=e.expandedIds.has(t.id);return w`
    <details
      class="activity-entry activity-entry--${t.status}"
      .open=${r}
      @toggle=${n=>e.onEntryToggle(t.id,n.currentTarget.open)}
    >
      <summary class="activity-entry__summary">
        <span class="activity-entry__chevron" aria-hidden="true">${S.chevronRight}</span>
        <span class="activity-entry__main">
          <span class="activity-entry__title">
            ${j({kind:ri[t.status],label:Wr(t.status)})}
            <span class="activity-entry__tool mono">${qr(t)}</span>
          </span>
          <span class="activity-entry__text">${Kr(t)}</span>
        </span>
        <span class="activity-entry__meta">
          <span>${n(t.updatedAt)}</span>
          <span>${Ur(t.durationMs)}</span>
        </span>
      </summary>
      <div class="activity-entry__body">
        <div class="activity-entry__facts">
          ${t.entryKind===`answer_candidate`?w`<span class="mono"
                  >${v(`activity.answerCandidate.itemId`)}: ${t.itemId}</span
                >`:w`
                  <span>${Gr(t.hiddenArgumentCount)}</span>
                  <span class="mono">${v(`activity.toolCallId`)}: ${t.toolCallId}</span>
                `}
          <a
            class="activity-entry__run-link mono"
            href=${Pn(t.runId,e.basePath)}
            >${v(`activity.runId`)}: ${t.runId}</a
          >
          ${t.sessionKey?w`<span class="mono">${v(`activity.session`)}: ${t.sessionKey}</span>`:T}
        </div>
        ${t.outputPreview?w`
                <pre class="activity-entry__preview">${t.outputPreview}</pre>
                ${t.outputTruncated?w`<div class="activity-entry__note">${v(`activity.outputTruncated`)}</div>`:T}
              `:w`<div class="activity-entry__note">${v(`activity.noOutputPreview`)}</div>`}
      </div>
    </details>
  `}function ti(e){let t=Pe({hour:`numeric`,minute:`2-digit`,second:`2-digit`},``),n=c(e.entries.map(e=>e.toolName)),r=Yr(e),i=e.filterText.trim()||e.toolFilter||ni.some(t=>!e.statusFilters[t]);return w`
    <section class="activity-page" aria-label=${v(`activity.title`)}>
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${v(`activity.title`)}</h2>
        <div class="settings-section__actions">
          <span class="activity-count" aria-live="polite">
            ${v(`activity.visibleCount`,{visible:String(r.length),total:String(e.entries.length)})}
          </span>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${r.length===0}
            @click=${e.onExpandAll}
          >
            ${v(`activity.expandAll`)}
          </button>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${e.expandedIds.size===0}
            @click=${e.onCollapseAll}
          >
            ${v(`activity.collapseAll`)}
          </button>
          <button
            type="button"
            class="btn btn--sm danger"
            ?disabled=${e.entries.length===0}
            @click=${e.onClear}
          >
            ${v(`activity.clear`)}
          </button>
        </div>
      </div>
      <div class="settings-group activity-group">
        ${$r(e,n)}
        <div
          class="activity-stream"
          role="group"
          aria-label=${v(`activity.streamLabel`)}
          @scroll=${e.onScroll}
        >
          ${r.length===0?w`
                  <div class="activity-empty">
                    ${e.entries.length===0||!i?v(`activity.empty`):v(`activity.emptyFiltered`)}
                  </div>
                `:r.map(n=>ei(e,n,t))}
        </div>
      </div>
    </section>
  `}var ni,ri;function ii(){return(ii=e((()=>{t(),E(),dt(),C(),M(),Pt(),x(),P(),Dt(),_(),B(),N(),ni=[`running`,`done`,`error`],ri={running:`warn`,done:`ok`,error:`danger`}})))()}function ai(e){return e?.mode!==`run`||!e.selector?null:`${e.selector.kind}:${e.selector.id}:${e.decisionCursor??``}`}function oi(e){let t=o(e);return(t?.gatewayCode===`INVALID_REQUEST`||t?.code===`INVALID_REQUEST`)&&t.retryable!==!0}var $,si;function ci(){return(ci=e((()=>{n(),E(),O(),Ze(),at(),Xe(),ct(),nt(),At(),C(),rt(),M(),qt(),x(),me(),yt(),St(),re(),b(),y(),Ft(),Wt(),ye(),tn(),yn(),B(),rr(),lr(),Hr(),ii(),$=class extends Me{constructor(...e){super(...e),this.entries=[],this.filterText=``,this.statusFilters={running:!0,done:!0,error:!0},this.toolFilter=``,this.expandedIds=new Set,this.expandedAutomationDays=new Set,this.autoFollow=!0,this.runInspector={status:`empty`},this.activityExpiry=It(this,()=>Et(this.presencePayload).users),this.liveActivity=null,this.liveActivityRevision=-1,this.sessionActivity=new cr(this),this.sessionActivityRevision=-1,this.inspectorAbort=null,this.inspectorClient=null,this.inspectorEpoch=0,this.inspectorSelectorKey=null,this.presenceClient=null,this.streamFollow=new Gt(this,{selector:`.activity-stream`,isEnabled:()=>this.autoFollow}),this.subscriptions=new je(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).effect(()=>this.context?.gateway,e=>{let t=vn(e,this.context.sessions);this.liveActivity=t,this.entries=[],this.expandedIds=new Set;let n=t.subscribe(e=>{this.entries=e.entries,this.requestUpdate(),e.revision!==this.liveActivityRevision&&(this.liveActivityRevision=e.revision,this.expandedIds=new Set,this.streamFollow.atBottom=!0)});this.applyGatewaySnapshot(e,e.snapshot,!0);let r=e.subscribeEvents(t=>{this.applyGatewayEvent(e,t)}),i=e.subscribe(t=>this.applyGatewaySnapshot(e,t,!1));return()=>{n(),t.dispose(),this.liveActivity=null,i(),r()}})}willUpdate(e){this.activityExpiry.sync(),e.has(`routeLocation`)&&(this.routeData=this.routeLocation?Fn(this.routeLocation.search,et(this.routeLocation.pathname,this.context?.basePath)):void 0,this.routeLocation&&this.routeData&&(this.presentedRoute={location:this.routeLocation,data:this.routeData}),this.syncSessionActivity())}updated(e){this.liveActivity?.syncSessions(this.routeData?.mode===`live`?this.sessionActivity.result?.sessions??[]:[]),e.has(`routeLocation`)&&this.bindInspectorRoute();let t=this.routeLocation?this.sessionActivity.canonicalLocation(this.routeLocation,this.context.basePath,Et(this.presencePayload).users):null;t&&this.context.replace(`activity`,t);let n=this.autoFollow&&e.has(`autoFollow`);(n||this.autoFollow&&this.streamFollow.atBottom&&e.has(`entries`))&&this.streamFollow.schedule(n)}disconnectedCallback(){this.subscriptions.clear(),this.cancelInspectorRequest(),this.presentedRoute=void 0,super.disconnectedCallback()}applyGatewaySnapshot(e,t,n){if((n||e.eventLogRevision!==this.sessionActivityRevision)&&(this.sessionActivityRevision=e.eventLogRevision,this.presentedRoute=void 0,this.sessionActivity.load(null,null)),n||t.client!==this.presenceClient){this.presenceClient=t.client;let e=t.phase===`connected`?Ke(t.hello?.snapshot):void 0;this.presencePayload=e?{presence:e}:void 0}else t.phase!==`connected`&&this.presencePayload&&(this.presencePayload=void 0);this.syncRunInspector(e,t,n),this.syncSessionActivity()}syncSessionActivity(e=`query`){let t=this.context?.gateway.snapshot;this.sessionActivity.load(t?.phase===`connected`?t.client:null,this.routeData?.mode===`sessions`?this.routeData.filters:this.routeData?.mode===`live`?`current`:null,e,_t(t,or,`operator.write`,{requireAdvertisement:!1}))}bindInspectorRoute(){let e=this.routeData,t=e?.mode===`run`?e.selector:null,n=ai(e);(n!==this.inspectorSelectorKey||e?.mode!==`run`)&&(this.inspectorSelectorKey=n,this.cancelInspectorRequest(),this.inspectorClient=null,this.runInspector=t?{status:`loading`,waitingForGateway:!0}:{status:`empty`},e?.mode===`run`&&this.syncRunInspector(this.context.gateway,this.context.gateway.snapshot,!0))}cancelInspectorRequest(){this.inspectorEpoch+=1,this.inspectorAbort?.abort(),this.inspectorAbort=null}syncRunInspector(e,t,n=!1){let r=this.routeData;if(r?.mode!==`run`)return;let i=r.selector;if(!i){this.runInspector={status:`empty`};return}if(this.inspectorSelectorKey=ai(r),t.phase!==`connected`||!t.client){this.cancelInspectorRequest(),this.inspectorClient=null,this.runInspector={status:`disconnected`};return}if(vt(t,`audit.run.inspect`)===!1){this.cancelInspectorRequest(),this.inspectorClient=t.client,this.runInspector={status:`unsupported`};return}if(!_t(t,`audit.run.inspect`,`operator.read`)){this.cancelInspectorRequest(),this.inspectorClient=t.client,this.runInspector={status:`unauthorized`};return}(n||this.inspectorClient!==t.client||this.runInspector.status!==`loading`&&this.runInspector.status!==`ready`)&&this.loadRunInspector(e,t.client,i)}isUnknownInspectMethod(e){return e instanceof Ve&&e.gatewayCode===`INVALID_REQUEST`&&(e.message===`unknown method: audit.run.inspect`||e.message===`missing scope: operator.admin`)}async loadRunInspector(e,t,n,r,i=`executions`){this.cancelInspectorRequest();let a=this.inspectorEpoch,o=new AbortController;this.inspectorAbort=o,this.inspectorClient=t;let s=i===`decisions`?`decisionPageStatus`:`executionPageStatus`;this.runInspector=r?{...r,[s]:`loading`}:{status:`loading`,waitingForGateway:!1};let c=ai(this.routeData),l=()=>this.inspectorEpoch===a&&this.context.gateway===e&&e.snapshot.client===t&&e.snapshot.phase===`connected`&&this.routeData?.mode===`run`&&ai(this.routeData)===c,u=i===`decisions`?r?.result.nextDecisionCursor:this.routeData?.mode===`run`?this.routeData.decisionCursor:null;try{let e={...n.kind===`run`?{runId:n.id,executionLimit:50,...i===`executions`&&r?.result.nextExecutionCursor?{executionCursor:r.result.nextExecutionCursor}:{}}:{executionId:n.id},decisionLimit:50,...u?{decisionCursor:u}:{}},a=await t.request(`audit.run.inspect`,e,{signal:o.signal});if(l()){if(r&&i===`decisions`){let e=Ln(r.result,a);this.runInspector=e?{status:`ready`,result:e,receiptPageCursors:new Map([...r.receiptPageCursors,...In(a.decisionDisplays,u??void 0)])}:{...r,decisionPageStatus:`error`}}else if(r?.result.identity.state===`ambiguous`&&a.identity.state===`ambiguous`){let e=new Map(r.result.identity.candidates.map(e=>[e.executionId,e]));for(let t of a.identity.candidates)e.set(t.executionId,t);this.runInspector={status:`ready`,result:{...a,identity:{...a.identity,candidates:[...e.values()]}},receiptPageCursors:r.receiptPageCursors}}else this.runInspector={status:`ready`,result:a,receiptPageCursors:In(a.decisionDisplays,u??void 0)}}}catch(e){if(!l()||o.signal.aborted)return;this.runInspector=fe(e)?{status:`unauthorized`}:this.isUnknownInspectMethod(e)?{status:`unsupported`}:r?{...r,[s]:`error`}:{status:`error`,recovery:u&&oi(e)?`restart`:`retry`}}finally{this.inspectorAbort===o&&(this.inspectorAbort=null)}}loadMoreInspectorPage(e){let t=this.routeData,n=this.context.gateway,r=n.snapshot,i=this.runInspector;t?.mode===`run`&&t.selector&&r.phase===`connected`&&r.client&&i.status===`ready`&&(e===`executions`?t.selector.kind===`run`&&i.executionPageStatus!==`loading`&&i.result.identity.state===`ambiguous`&&i.result.nextExecutionCursor:i.decisionPageStatus!==`loading`&&i.result.identity.state===`present`&&i.result.nextDecisionCursor)&&this.loadRunInspector(n,r.client,t.selector,i,e)}restartRunInspector(){let e=this.routeData;e?.mode===`run`&&e.selector&&this.context.navigate(`activity`,{search:Nn(e.selector)})}selectMode(e){this.context.navigate(`activity`,{search:e===`live`?`?view=live`:``})}applyGatewayEvent(e,t){if(this.context.gateway!==e)return;let n=t.event===`session.message`?pe(t.payload):null,r=n&&(n.hasActiveRun===!1||n.status!==null&&n.status!==`running`&&n.status!==`queued`);if((t.event===`sessions.changed`||this.routeData?.mode===`live`&&r)&&this.sessionActivity.invalidate(t.payload),t.event===`presence`){let e=Ke(t.payload);this.presencePayload=e?{presence:e}:void 0}}clearEntries(){this.liveActivity?.clear()}renderMode(e,t,n){if(n&&e.mode===`run`)return $e();if(e.mode===`sessions`){let r=Et(this.presencePayload).users;return Br({context:this.context,expandedAutomationDays:this.expandedAutomationDays,filters:{...e.filters,personId:this.sessionActivity.result?.involvingProfileId??e.filters.personId},presenceViewers:r,result:this.sessionActivity.result,loading:n||this.sessionActivity.loading,retrying:this.sessionActivity.retrying,error:this.sessionActivity.error,onRetry:()=>this.syncSessionActivity(`retry`),onSummaryRetry:_t(this.context.gateway.snapshot,`sessions.activitySummary.ensure`,`operator.write`,{requireAdvertisement:!1})?e=>this.sessionActivity.retrySummary(e):void 0,onAutomationDayToggle:e=>{let t=new Set(this.expandedAutomationDays);t.has(e)?t.delete(e):t.add(e),this.expandedAutomationDays=t},onFiltersChange:e=>this.context.navigate(`activity`,this.sessionActivity.locationForFilters(e,t,this.context.basePath,r))})}if(e.mode===`run`)return w`<a
          class="activity-run-inspector-back"
          href=${Qe(`activity`,this.context.basePath)}
          >${S.arrowLeft}${v(`activityFeed.backToSessions`)}</a
        >
        ${nr({basePath:this.context.basePath,state:this.runInspector,onLoadMoreExecutions:()=>this.loadMoreInspectorPage(`executions`),onLoadMoreDecisions:()=>this.loadMoreInspectorPage(`decisions`),selectorId:e.selectorId,selector:e.selector,onRestart:()=>this.restartRunInspector(),onRetry:()=>this.syncRunInspector(this.context.gateway,this.context.gateway.snapshot,!0)})}`;let r={agentsList:this.context.agents.state.agentsList,hello:this.context.gateway.snapshot.hello};return w`<div id="activity-live-panel">
      ${en({basePath:this.context.basePath,fallbackAgentId:ge(r),mainKey:Ee(r),globalScope:ke(r),navigate:this.context.navigate,connected:this.context.gateway.snapshot.phase===`connected`,result:this.sessionActivity.result,loading:n||this.sessionActivity.loading,incomplete:this.sessionActivity.incomplete,error:this.sessionActivity.error,onRetry:()=>this.syncSessionActivity(`retry`)})}
      ${this.liveActivity?.snapshot.error?w`<div role="alert">
              ${j({kind:`danger`,label:this.liveActivity.snapshot.error})}
              <button type="button" class="btn btn--sm" @click=${()=>this.liveActivity?.retry()}>
                ${v(`common.retry`)}
              </button>
            </div>`:T}
      ${ti({basePath:this.context.basePath,entries:this.entries,filterText:this.filterText,statusFilters:this.statusFilters,toolFilter:this.toolFilter,expandedIds:this.expandedIds,autoFollow:this.autoFollow,onFilterTextChange:e=>this.filterText=e,onToolFilterChange:e=>this.toolFilter=e,onStatusToggle:(e,t)=>{this.statusFilters={...this.statusFilters,[e]:t}},onToggleAutoFollow:e=>this.autoFollow=e,onClear:()=>this.clearEntries(),onExpandAll:()=>{this.expandedIds=new Set(this.entries.map(e=>e.id))},onCollapseAll:()=>{this.expandedIds=new Set},onEntryToggle:(e,t)=>{let n=new Set(this.expandedIds);t?n.add(e):n.delete(e),this.expandedIds=n},onScroll:e=>this.streamFollow.handleScroll(e)})}
    </div>`}render(){let e=!this.routeData||!this.routeLocation,t=this.routeData??this.presentedRoute?.data,n=this.routeLocation??this.presentedRoute?.location;if(!t||!n)return $e();let r=t.mode,i=w`
      ${r===`run`?T:kt({id:`activity-mode`,active:r,tabs:[{value:`sessions`,label:v(`activityFeed.sessionsMode`)},{value:`live`,label:v(`activity.runInspector.liveMode`)}],ariaLabel:v(`activity.runInspector.activityView`),panelId:`activity-mode-panel`,className:`activity-mode-tabs`,variant:`sub`,onSelect:e=>this.selectMode(e)})}
      <div
        id="activity-mode-panel"
        role=${r===`run`?T:`tabpanel`}
        aria-labelledby=${r===`run`?T:`activity-mode-tab-${r}`}
      >
        ${this.renderMode(t,n,e)}
      </div>
    `;return w`
      <section class="content-header" ${it({toolbarHeader:!0})}>
        <div>
          <div class="page-title">${We(`activity`)}</div>
          ${r===`live`?T:w`<div class="page-sub">${v(`subtitles.activity`)}</div>`}
        </div>
      </section>
      ${Kt(i,{fillHeight:!0})}
    `}},m([te({context:ot,subscribe:!0})],$.prototype,`context`,void 0),m([k({attribute:!1})],$.prototype,`routeLocation`,void 0),m([D()],$.prototype,`entries`,void 0),m([D()],$.prototype,`filterText`,void 0),m([D()],$.prototype,`statusFilters`,void 0),m([D()],$.prototype,`toolFilter`,void 0),m([D()],$.prototype,`expandedIds`,void 0),m([D()],$.prototype,`expandedAutomationDays`,void 0),m([D()],$.prototype,`autoFollow`,void 0),m([D()],$.prototype,`runInspector`,void 0),m([D()],$.prototype,`presencePayload`,void 0),si={header:!0,render:e=>w`<openclaw-activity-page
      .routeLocation=${e}
      ${it({activityPage:!0})}
    ></openclaw-activity-page>`},customElements.get(`openclaw-activity-page`)||customElements.define(`openclaw-activity-page`,$)})))()}ci();export{si as activityPageComponent};