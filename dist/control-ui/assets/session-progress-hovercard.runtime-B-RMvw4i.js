const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./channel-avatar-DawdLoLC.js","./gateway-runtime-iOL78mIi.js","./control-ui-boot-shared-DhhSjjdA.js","./control-ui-boot-shared-CnK2ZXzW.js","./control-ui-boot-shared-C-yZTZmO.js","./control-ui-boot-shared-D-LYw3KU.js","./control-ui-boot-shared-TgR3hRAg.js","./control-ui-boot-shared-CES8Ypkl.js","./plugin-contracts-runtime-DSgjMI0R.js","./markdown-runtime-Hc-lvqnn.js","./config-runtime-CgOgfOrG.js","./control-ui-boot-shared-og7lWkK4.js","./control-ui-boot-shared-e4-xCIbb.js","./control-ui-boot-shared-vP4joK1k.js","./control-ui-boot-shared-DCY2wZcy.js","./css-chat-Ckz95ikh.js","./chat-transcript-layout-hEyp1qZw.js","./css-chat-custodian-new-session-CbWc8vdc.js","./sidebar-update-runtime-BZGhWGH_.js","./control-ui-core-D-VUH4Gq.css","./control-ui-boot-shared-BJ_QKfFn.css","./css-chat-DCHf01mf.css","./css-chat-custodian-new-session-FmhgzIjj.css","./sidebar-update-runtime-ah7rgQE7.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Ji as n,X as r,ii as i,io as a,wi as o,zi as s}from"./control-ui-foundation-C3MHh_P-.js";import{Zc as c,bs as l,dl as u,hl as d,hu as f,nl as p,pu as m,uu as h,wl as g}from"./control-ui-core-pYNj5S1a.js";import{Xi as _,Yt as v,Zi as y,Zt as ee,_i as te,co as ne,gi as re,go as ie,wi as ae}from"./control-ui-core-D6clmJs8.js";import{$ as b,X as x,Y as S,Z as C,pt as oe}from"./lit-runtime-DZL1fcCI.js";import{Ci as se,Lt as ce,Ti as le,zt as ue}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Fa as de,G as fe,Ia as pe,Ii as me,Pi as he,U as ge,W as _e,Xn as ve,Yn as ye,Zn as be,aa as w,ca as xe,di as Se,ea as Ce,fi as T,gr as we,ia as Te,la as E,mi as D,nt as O,oa as k,pi as Ee,pr as De,ra as Oe,sa as ke,tt as Ae,ui as A,vr as je}from"./control-ui-boot-shared-DJ4XCcp6.js";import{T as Me,w as Ne}from"./control-ui-boot-chat-7MGT05MX.js";function j(e,t,n,r=x){return b`<div class="session-hovercard__context-row" aria-label=${n} title=${r}>
    <span class="session-hovercard__context-icon" aria-hidden="true">${e}</span>
    <span class="session-hovercard__context-value session-hovercard__context-text">${t}</span>
  </div>`}function Pe(e){if(!e)return x;let t=f(e.status===`in_progress`?`sessionProgressCard.status.inProgress`:e.status===`paused`?`sessionProgressCard.status.paused`:`sessionProgressCard.status.pending`);return b`<div
    class="session-hovercard__context-row session-hovercard__plan-row"
    aria-label=${f(`sessionProgressCard.stepLabel`,{status:t,step:e.step})}
    title=${e.step}
  >
    <span class="session-hovercard__context-icon" aria-hidden="true"
      >${e.status===`in_progress`?b`<span class="session-run-spinner"></span>`:_.clock}</span
    >
    <span class="session-hovercard__context-value session-hovercard__plan-step"
      >${e.step}</span
    >
    <span class="session-hovercard__plan-count">${e.completed}/${e.total}</span>
  </div>`}function Fe({row:e,automationLink:t},n){let r=e?.workContext,i=f(r?.kind===`project`?`sessionHovercard.projectLabel`:`sessionHovercard.workspaceLabel`),a=r?.kind===`project`?r.cwd:r?.path,o=a??r?.path,s=e?.placementProviderId&&e.placementProfileId?{label:`${e.placementProviderId} · ${e.placementProfileId}`,title:f(`sessionHovercard.runsOn`,{providerId:e.placementProviderId,profileId:e.placementProfileId})}:void 0,c=pe(e?.placementMachine),u=c.filter(Boolean).join(` · `);return b`<div class="session-hovercard__context">
    ${r?j(_.folder,r.name,`${i}: ${r.name}`,o?`${i}: ${o}`:x):x}
    ${r?.kind===`project`&&r.branch?j(_.gitBranch,r.branch,`${f(`sessionHovercard.branchLabel`)}: ${r.branch}`,a??x):x}
    ${s?j(_.server,s.label,s.title,s.title):x}
    ${s&&u?b`<div
            class="session-hovercard__machine"
            aria-label=${`${f(`sessionHovercard.machineLabel`)}: ${u}`}
          >
            ${c.map((e,t)=>e?b`<span class=${t===1?`session-hovercard__machine-class`:x}
                    >${e}</span
                  >`:x)}
          </div>`:x}
    ${e?.boardFace===`dashboard`?j(_.layoutDashboard,f(`sessionsView.opensAsDashboard`),f(`sessionsView.opensAsDashboard`)):x}
    ${e?.hasAutomation&&t?b`<a
            class="session-hovercard__context-row session-hovercard__automation-link"
            href=${t.href}
            @click=${e=>{l(e)&&(e.preventDefault(),t.navigate())}}
          >
            <span class="session-hovercard__context-icon" aria-hidden="true">${_.clock}</span>
            <span class="session-hovercard__context-value session-hovercard__context-text"
              >${f(`sessionsView.automationAttached`)}</span
            >
            <span class="session-hovercard__context-icon" aria-hidden="true"
              >${_.chevronRight}</span
            >
          </a>`:x}
    ${Pe(n)}
  </div>`}function M(){return(M=e((()=>{S(),h(),y(),de()})))()}function N(e){return e.label?.trim()||e.identity.id}function Ie(e,t,n){return e.identity.type===`profile`&&e.identity.id===n||JSON.stringify(e.identity)===JSON.stringify(t?.identity)}function P(){Ke??=s(()=>import(`./channel-avatar-DawdLoLC.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]),import.meta.url)}function Le(e){switch(e){case`open`:return _.gitPullRequest;case`draft`:return _.gitPullRequestDraft;case`merged`:return _.gitMerge;case`closed`:return _.gitPullRequestClosed;default:return e}}function F(e){return e.additions===void 0&&e.deletions===void 0?x:b`<span class="session-hovercard__diff">
    ${e.additions===void 0?x:b`<span class="session-hovercard__additions"
            >+${e.additions.toLocaleString()}</span
          >`}
    ${e.deletions===void 0?x:b`<span class="session-hovercard__deletions"
            >−${e.deletions.toLocaleString()}</span
          >`}
  </span>`}function Re(e){let t=Math.abs(e)/864e5;return t>=365?{value:Math.max(1,Math.round(t/365)),unit:`year`}:t>=28?{value:Math.max(1,Math.round(t/30)),unit:`month`}:t>=7?{value:Math.max(1,Math.round(t/7)),unit:`week`}:t>=1?{value:Math.max(1,Math.round(t)),unit:`day`}:o(Math.abs(e))}function I(e,t){if(typeof e!=`number`||!Number.isFinite(e))return``;let n=e-Date.now(),{value:r,unit:i}=Re(n);return t?i===`second`&&n<=0?f(`common.justNow`):new Intl.RelativeTimeFormat(m.getLocale(),{numeric:`always`,style:`narrow`}).format(n<=0?-r:r,i):m.getLocale().toLowerCase().startsWith(`en`)?`${r}${{second:`s`,minute:`m`,hour:`h`,day:`d`,week:`w`,month:`mo`,year:`y`}[i]}`:new Intl.NumberFormat(m.getLocale(),{style:`unit`,unit:i,unitDisplay:`short`,maximumFractionDigits:0}).format(r)}function ze(e,t){let n=e.createdActor,r=n?.label?.trim()||n?.id?.trim(),i=new Set,a=0,o=(e.expandedParticipants??e.participants??[]).filter(e=>{let r=JSON.stringify(e.identity);return!i.has(r)&&(i.add(r),!Ie(e,n,t)||(a+=1,!1))}),s=Math.max(o.length,(e.participantCount??0)-a);if(n&&r)return{creator:n,primaryIdentity:n.identity,primaryLabel:r,participants:o,otherCount:s};let c=o[0];if(c)return{primaryIdentity:c.identity,primaryLabel:N(c),participants:o,otherCount:Math.max(0,s-1)}}function Be(e,t,n){let r=Math.max(0,t-e.length);return b`<div
    slot="content"
    class="session-hovercard__participant-menu"
    role="list"
    style="min-width: 150px; max-height: min(280px, 60vh); overflow-y: auto;"
    aria-label=${f(`sessionHovercard.moreParticipantsLabel`,{count:String(t)})}
  >
    ${e.map(e=>{let t=N(e),r=e.identity.type===`profile`?k(e.identity.id,n,t):null;return b`<div role="listitem">
        ${E(t,r,`session-menu__item learn-more-link session-hovercard__participant-link`)}
      </div>`})}
    ${r>0?b`<div class="session-hovercard__more" role="listitem">
            ${f(`sessionHovercard.moreParticipantsLabel`,{count:String(r)})}
          </div>`:x}
  </div>`}function L({row:e,selfUserId:t,avatarAuth:n,personActivity:r}){if(!e)return x;let i=ze(e,t);if(!i)return x;let{creator:a,primaryIdentity:o,primaryLabel:s,participants:c,otherCount:l}=i,u=a?void 0:c[0],d=a??(u?{...u,id:u.identity.id}:void 0),p=o?.type===`profile`?k(o.id,r,s):null,m=a?Oe(a):``,h=m?b`<span class="session-hovercard__creator-avatar-fallback" aria-hidden="true"
        >${m}</span
      >`:x;a&&e.channelAvatarUrl&&P();let g=a&&e.channelAvatarUrl?b`<openclaw-channel-avatar
          class="session-hovercard__creator-avatar"
          .routeUrl=${e.channelAvatarUrl}
          .authTokens=${n?.authTokens??[]}
          .authReady=${n?.authReady??!1}
          .fallback=${h}
          aria-hidden="true"
        ></openclaw-channel-avatar>`:d?b`<openclaw-viewer-avatar
            class="session-hovercard__creator-avatar"
            .user=${{id:d.id,name:d.label,avatarUrl:d.avatarUrl,watchedSessions:[]}}
            .markAsViewer=${!1}
            .identity=${d.identity}
            variant="session"
            aria-hidden="true"
          ></openclaw-viewer-avatar>`:x,_=a?c:c.slice(1),v=[s,l>0?f(`sessionHovercard.moreParticipantsLabel`,{count:String(l)}):``].filter(Boolean).join(`, `),y=l>0?f(l===1?`sessionHovercard.attributionOther`:`sessionHovercard.attributionOthers`,{count:String(l)}):``;return b`<div class="session-hovercard__attribution" aria-label=${v}>
    <span class="session-hovercard__attribution-copy">
      ${E(s,p,`session-hovercard__attribution-name`)}
      ${l>0?_.length>0?b`<openclaw-tooltip
                class="session-hovercard__participants-tooltip"
                .describe=${!1}
                open-on-click
              >
                <button
                  type="button"
                  class="session-hovercard__attribution-others"
                  style="padding: 1px 3px; border: 0; border-radius: var(--radius-sm); background: transparent; font: inherit;"
                  aria-label=${f(`sessionHovercard.moreParticipantsLabel`,{count:String(l)})}
                >
                  ${y}
                </button>
                ${Be(_,l,r)}
              </openclaw-tooltip>`:b`<span class="session-hovercard__attribution-others">${y}</span>`:x}
    </span>
    <span class="session-hovercard__attribution-avatars">
      ${xe(g,p)}
      ${_.length>0?b`<openclaw-viewer-facepile
              .staticParticipants=${_}
              .totalCount=${l}
              .maxVisible=${Math.min(_.length,R)}
              .personActivity=${r}
            ></openclaw-viewer-facepile>`:x}
    </span>
  </div>`}function Ve(e){let t=e.row,n=t.channelPresentation,r=n?[...new Set([n.conversation,n.address].filter(e=>e&&e!==t.label))]:[],i=I(t.createdAt,!0),a=I(t.createdAt,!1);return b`<header class="session-hovercard__header">
    <span class="session-hovercard__heading">
      ${n?b`<span class="session-hovercard__channel"
              ><span aria-hidden="true">${_.link}</span
              >${f(`sessionHovercard.linkedChannel`,{channel:n.channelLabel})}</span
            >`:x}
      <span class="session-hovercard__title">${O(t.color)}${t.label}</span>
      ${n?b`<span class="session-hovercard__conversation">
              ${n.kind?b`<span>${n.topicId?f(`sessionHovercard.topicNumber`,{id:n.topicId}):f(`sessionHovercard.chatKinds.${n.kind}`)}</span>`:x}
              ${r.map(e=>b`<span>${e}</span>`)}
              ${n.account?b`<span>${f(`sessionHovercard.viaAccount`,{account:n.account})}</span>`:x}
            </span>`:L(e)}
    </span>
    ${a?b`<span class="session-hovercard__created-age" title=${i}>${a}</span>`:x}
  </header>`}function He(e){return e?.markdown?.trim()?b`<section
    class="session-hovercard__section session-hovercard__notepad"
    aria-label=${f(`sessionHovercard.agentNotepad`)}
  >
    <div class="session-hovercard__notepad-title">${f(`sessionHovercard.agentNotepad`)}</div>
    ${fe(e.markdown,{promoteProgress:!0})}
  </section>`:x}function Ue(e){let t=f(`sessionHovercard.states.${e.state}`),n=e.checks?f(`sessionHovercard.checks.${e.checks.state}`):null,r=[e.title,n,e.additions===void 0?null:`+${e.additions.toLocaleString()}`,e.deletions===void 0?null:`−${e.deletions.toLocaleString()}`].filter(e=>!!e);return b`<a
    class="session-hovercard__pr-row"
    data-state=${e.state}
    href=${e.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label=${`${f(`sessionHovercard.pullRequestLabel`,{number:String(e.number),state:t})}${r.length>0?`, ${r.join(`, `)}`:``}`}
  >
    <span
      class="session-hovercard__pr-state-icon"
      role="img"
      data-checks=${e.checks?.state??x}
      aria-label=${n?`${t} · ${n}`:t}
      title=${n?`${t} · ${n}`:t}
      >${Le(e.state)}</span
    >
    <span class="session-hovercard__pr-title">${e.title}</span>
    ${F(e)}
  </a>`}function We(e){if(!e)return x;if(e.pullRequests.length>0){let t=e.pullRequests.slice(0,1),n=e.pullRequests.length-t.length;return b`<div class="session-hovercard__pr-list">
      ${t.map(Ue)}
      ${n>0?b`<span class="session-hovercard__more"
              >${f(`sessionHovercard.more`,{count:String(n)})}</span
            >`:x}
    </div>`}let t=e.branch;if(!t)return x;let n=f(`chat.pullRequests.createPr`),r=f(`chat.pullRequests.createPrLabel`,{branch:t.branch});return b`<div class="session-hovercard__branch-row">
    <span class="session-hovercard__branch-icon" aria-hidden="true">${_.gitBranch}</span>
    ${t.createUrl?b`<a
            class="session-hovercard__branch-action"
            href=${t.createUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label=${r}
            title=${r}
            >${n}</a
          >`:b`<span class="session-hovercard__branch-label">${f(`chat.sessionDiff.title`)}</span>`}
    ${F(t)}
  </div>`}function Ge(e){let t=e.row?.channelPresentation?L(e):x,n=_e(e.progressCard,e.row?.status,e.row?.startedAt,e.row?.hasActiveRun??!1),r=!!(e.pullRequests&&(e.pullRequests.pullRequests.length>0||e.pullRequests.branch||e.pullRequests.status!==`ready`)),i=!!(e.row?.workContext||e.row?.placementProviderId&&e.row.placementProfileId||e.row?.boardFace===`dashboard`||e.row?.hasAutomation&&e.automationLink||n),a=e.progressCard?void 0:e.row?.lastMessagePreview?.trim()||void 0;return!e.row&&!r&&!e.progressCard?x:b`<div class="session-hovercard">
    ${e.row?b`<section class="session-hovercard__section session-hovercard__section--header">
            ${Ve(e)}
          </section>`:x}
    ${i?b`<section class="session-hovercard__section session-hovercard__section--metadata">
            ${Fe(e,n)}
          </section>`:x}
    ${r?b`<section class="session-hovercard__section session-hovercard__section--prs">
            ${We(e.pullRequests)}
            ${e.pullRequests?.status===`ready`?x:b`<div class="session-hovercard__more" role="status">
                    ${f(e.pullRequests?.status===`rate-limited`?`chat.pullRequests.rateLimited`:`chat.pullRequests.unavailable`)}
                  </div>`}
          </section>`:x}
    ${a?b`<section class="session-hovercard__section session-hovercard__section--optional">
            <div class="session-hovercard__excerpt">${a}</div>
          </section>`:x}
    ${e.row?.attention?.kind===`error`?b`<section class="session-hovercard__section session-hovercard__error">
            <span class="session-hovercard__error-icon" aria-hidden="true"
              >${_.alertTriangle}</span
            >
            <span>${me(e.row.attention)}</span>
          </section>`:x}
    ${He(e.progressCard)}
    ${t===x?x:b`<section
            class="session-hovercard__section session-hovercard__section--attribution"
            aria-label=${f(`sessionHovercard.sessionParticipants`)}
          >
            <div class="session-hovercard__attribution-label">
              ${f(`sessionHovercard.sessionParticipants`)}
            </div>
            ${t}
          </section>`}
  </div>`}var R,Ke;function z(){return(z=e((()=>{i(),S(),h(),y(),w(),he(),Ae(),M(),Ce(),ge(),ae(),Te(),t(),R=4})))()}function qe(e){if(!n(e)||e.status!==`ok`)throw Error(`Session title unavailable`);let t=a(e.sessionKey),r=a(e.agentId);if(!t||!r)throw Error(`Session title response was incomplete`);return{sessionKey:t,agentId:r,namespace:`chat`,title:a(e.title)??a(e.derivedTitle)}}var B,V,H,U;function W(){return(W=e((()=>{re(),p(),Me(),De(),T(),B=3e5,V=3e4,H=100,U=class{constructor(e){this.host=e,this.client=null,this.context=null,this.cache=new Map,this.observer=new MutationObserver(e=>{for(let t of e.flatMap(e=>[...e.addedNodes]))t instanceof HTMLElement&&this.refresh(t)})}connect(){this.observer.observe(this.host,{childList:!0,subtree:!0}),this.refresh()}refresh(e=this.host){let t=new Map;e.matches(`a.markdown-session-link, [data-session-href]`)&&this.decorate(e,!1,t);for(let n of e.querySelectorAll(Se))this.decorate(n,!1,t)}disconnect(){this.observer.disconnect()}async decorate(e,t=!1,n){let r=this.targetForAnchor(e,n),i=e instanceof HTMLAnchorElement?e:document.createElement(`a`);if(e!==i&&e.classList.contains(`markdown-session-link`)&&(i.dataset.sessionHref=e.dataset.sessionHref,i.setAttribute(`href`,e.getAttribute(`href`)??``),i.className=`markdown-session-link`,e.classList.remove(`markdown-session-link`),e.removeAttribute(`href`),e.removeAttribute(`data-session-href`),e.replaceWith(i),i.append(e)),!r)return;let a=this.cachedOrSeededEntry(r);if(this.stampAnchor(i,r,a?.value),t&&!a?.value)try{this.stampAnchor(i,r,await this.loadTitle(r))}catch{}}mainKey(){return d({agentsList:this.context?.agents.state.agentsList,hello:this.context?.gateway.snapshot.hello})}targetForAnchor(e,t){let n=e.dataset.sessionKey?.trim();if(n&&!e.dataset.sessionHref){let e=u(n);return e?{sessionKey:n,agentId:e.agentId,namespace:`chat`}:null}let r=je(e.dataset.sessionHref??e.getAttribute(`href`)??``,{basePath:this.context?.basePath,mainKey:this.mainKey(),publicOrigin:we(this.context)});if(!r)return null;let i=`${r.url.pathname}${r.url.search}${r.url.hash}`;e.getAttribute(`href`)!==i&&e.setAttribute(`href`,i),e.classList.contains(`markdown-session-link`)||e.classList.add(`markdown-session-link`),e.removeAttribute(`target`),e.removeAttribute(`rel`);let a=t?.get(r.url.pathname);if(a===void 0){let e=Ne(this.context?.sessions.state.result?.sessions??[],r.target,this.mainKey());a=e?{sessionKey:e.key,agentId:r.target.agentId,namespace:r.target.namespace}:null,t?.set(r.url.pathname,a)}return a||e.removeAttribute(`data-session-key`),a}setCacheEntry(e,t){this.cache.delete(e),this.cache.set(e,t),r(this.cache,H)}cachedOrSeededEntry(e){let t=Date.now(),n=this.cache.get(e.sessionKey);if(n&&n.expiresAt>t)return this.setCacheEntry(e.sessionKey,n),n;this.cache.delete(e.sessionKey);let r=this.context?.sessions.state.result?.sessions.find(t=>c(t.key,e.sessionKey));if(!r)return;let i={...e,sessionKey:r.key,agentId:r.agentId??u(r.key)?.agentId??e.agentId,title:r.displayName??r.derivedTitle},a={expiresAt:t+B,promise:Promise.resolve(i),value:i};return this.setCacheEntry(e.sessionKey,a),a}loadTitle(e){let t=this.cachedOrSeededEntry(e);if(t)return t.promise;let n={expiresAt:Date.now()+B,promise:Promise.resolve().then(async()=>{if(!this.client)throw Error(`Session title requires a connected Gateway`);return{...qe(await this.client.request(`controlUi.sessionPreview`,{sessionKey:e.sessionKey})),namespace:e.namespace}})};return n.promise=n.promise.then(e=>(n.value=e,e),e=>{throw n.expiresAt=Date.now()+V,e}),this.setCacheEntry(e.sessionKey,n),n.promise}stampAnchor(e,t,n){let r=n?.title,i=te(t.namespace,t.agentId,t.sessionKey,this.context?.basePath,{displayName:r,exactKey:!0,mainKey:this.mainKey()});if(e.dataset.sessionKey!==t.sessionKey&&(e.dataset.sessionKey=t.sessionKey),e.classList.contains(`markdown-session-link`)||e.classList.add(`markdown-session-link`),!e.dataset.sessionHref&&i&&e.getAttribute(`href`)!==i&&e.setAttribute(`href`,i),!r||e.classList.contains(`markdown-session-link--titled`))return;e.classList.add(`markdown-session-link--titled`);let a=e.querySelector(`:scope > .session-label`)??document.createElement(`span`);a.className=`session-label`,a.textContent=r,e.replaceChildren(a),e.title=t.sessionKey}}})))()}function G(e){return e.querySelector(`openclaw-session-menu, openclaw-catalog-session-menu`)!==null}var K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{S(),ne(),v(),h(),ce(),se(),p(),w(),be(),z(),W(),T(),K=450,q=80,J=300,Y=100,X=100,Z=0,Q=class extends oe{constructor(...e){super(...e),this.applicationClient=null,this.applicationContext=null,this.applicationGateway=null,this.progressCards=null,this.stopProgressCardUpdates=null,this.stopContextUpdates=null,this.pullRequests=null,this.stopPullRequestUpdates=null,this.activeTarget=null,this.activeTrigger=null,this.activeSession=null,this.open=!1,this.delayed=!0,this.animateNextOpen=!0,this.skipDelayTimer=null,this.lastProgressCard=null,this.hovercard=new ye(()=>this.close(!0),Y,()=>this.close()),this.sessionLinkTitler=new U(this),this.loadGeneration=0,this.activeTargetObserver=new MutationObserver(()=>{if(this.activeTarget&&(!this.contains(this.activeTarget)||G(this))){this.close();return}this.open&&this.showCurrent()}),this.handleSessionUpdate=()=>{this.sessionLinkTitler.refresh(),this.handleCardUpdate()},this.handleCardUpdate=()=>{this.open&&this.hovercard.held&&this.showCurrent()},this.handlePointerOver=e=>{if(e.pointerType===`touch`||!globalThis.matchMedia?.(`(hover: hover)`).matches)return;let t=D(e);if(!t||G(this))return;let n=this.delayed;this.activate(t,t,n?K:q,n),this.hovercard.pointerInside=!0},this.handlePointerOut=e=>{let t=D(e);t&&t===this.activeTarget&&(e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||this.hovercard.schedulePointerExit())},this.handleFocusIn=e=>{if(this.hovercard.restoringFocus)return;let t=D(e),n=e.target instanceof HTMLElement?e.target:null,r=t?.matches(`.sidebar-recent-session`)?n?.closest(`a.sidebar-recent-session__link`):n;t&&r&&!G(this)&&(this.activate(t,r,0,!1),this.hovercard.focusInside=!0)},this.handleFocusOut=e=>{this.activeTarget&&(e.relatedTarget instanceof Node&&this.activeTarget.contains(e.relatedTarget)||(this.hovercard.focusInside=!1,this.hovercard.scheduleClose()))},this.handleClick=e=>{D(e)&&this.close()},this.handleSessionMenuOpen=()=>{this.close()},this.handleCardPointerLeave=()=>{this.hovercard.pointerOverCard=!1,this.hovercard.scheduleClose()}}static{this.properties={client:{attribute:!1,noAccessor:!0},context:{attribute:!1,noAccessor:!0},gateway:{attribute:!1,noAccessor:!0}}}get activeArtifactKey(){return this.activeSession?g(this.activeSession.sessionKey,this.activeSession.agentId):null}get client(){return this.applicationClient}set client(e){this.applicationClient=e,this.sessionLinkTitler.client=e}get context(){return this.applicationContext}set context(e){this.stopContextUpdates?.(),this.stopContextUpdates=null,this.applicationContext=e,this.sessionLinkTitler.context=e,this.isConnected&&(this.sessionLinkTitler.refresh(),this.connectStore())}get gateway(){return this.applicationGateway}set gateway(e){e!==this.applicationGateway&&(this.disconnectStore(),this.applicationGateway=e,this.close(),this.isConnected&&this.connectStore())}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.style.display=`contents`,this.addEventListener(`pointerover`,this.handlePointerOver),this.addEventListener(`pointerout`,this.handlePointerOut),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut),this.addEventListener(`keydown`,this.hovercard.handleTriggerKeyDown),this.addEventListener(`click`,this.handleClick),this.addEventListener(A,this.handleSessionMenuOpen),this.sessionLinkTitler.connect(),this.connectStore()}disconnectedCallback(){this.removeEventListener(`pointerover`,this.handlePointerOver),this.removeEventListener(`pointerout`,this.handlePointerOut),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.removeEventListener(`keydown`,this.hovercard.handleTriggerKeyDown),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(A,this.handleSessionMenuOpen),this.sessionLinkTitler.disconnect(),this.disconnectStore(),this.close(),this.clearSkipDelayTimer(),super.disconnectedCallback()}connectStore(){if(this.applicationContext&&!this.stopContextUpdates){let e=this.applicationContext.sessions.subscribe(this.handleSessionUpdate),t=this.applicationContext.agentSelection.subscribe(()=>this.close());this.stopContextUpdates=()=>{e(),t()}}this.applicationGateway&&!this.progressCards&&(this.progressCards=ue(this.applicationGateway),this.stopProgressCardUpdates=this.progressCards.subscribe(this.handleCardUpdate))}disconnectStore(){this.progressCards?.unwatch(this),this.stopProgressCardUpdates?.(),this.stopProgressCardUpdates=null,this.stopContextUpdates?.(),this.stopContextUpdates=null,this.progressCards=null,this.releasePullRequestStore()}activate(e,t,n,r){let i=e.dataset.sessionKey;if(!i)return;let a=u(i)?.agentId??e.closest(`openclaw-app-sidebar`)?.expandedAgentId();if(!a)return;let o=g(i,a);if(e===this.activeTarget&&i===this.activeSession?.sessionKey&&o===this.activeArtifactKey){if(t!==this.activeTrigger){if(this.hovercard.reset(),this.activeTrigger=t,this.hovercard.markTrigger(t),this.open)this.showCurrent();else{this.animateNextOpen=r;let e=++this.loadGeneration;this.hovercard.scheduleOpen(n,()=>void this.loadAndShow(i,e))}}return}this.close(n>0),this.activeTarget=e,this.activeTrigger=t,this.activeSession={sessionKey:i,agentId:a},this.open=!1,this.animateNextOpen=r,this.lastProgressCard=null,this.progressCards?.watch(this,[this.activeSession]),this.hovercard.markTrigger(t),this.activeTargetObserver.observe(this,{attributes:!0,attributeFilter:[`aria-expanded`],childList:!0,subtree:!0});let s=++this.loadGeneration;this.hovercard.scheduleOpen(n,()=>void this.loadAndShow(i,s))}async loadAndShow(e,t){let n=this.activeTarget,r=this.activeArtifactKey,i=this.activeSession;if(n instanceof HTMLAnchorElement&&n.dataset.sessionKey===e&&this.sessionLinkTitler.decorate(n,!0),t===this.loadGeneration&&i?.sessionKey===e&&r&&i&&n&&!G(this)&&this.hovercard.held){this.open=!0,this.delayed=!1,this.clearSkipDelayTimer(),this.watchPullRequests(r),this.showCurrent();try{await this.progressCards?.load(i)}catch{}t===this.loadGeneration&&this.activeSession?.sessionKey===e&&this.hovercard.held&&this.showCurrent()}}watchPullRequests(e){let t=this.applicationGateway;t&&(this.releasePullRequestStore(),this.pullRequests=le(t),this.stopPullRequestUpdates=this.pullRequests.subscribe(this.handleCardUpdate),this.pullRequests.watch(this,[e],{foreground:!0}))}releasePullRequestStore(){this.pullRequests?.unwatch(this),this.stopPullRequestUpdates?.(),this.stopPullRequestUpdates=null,this.pullRequests=null}showCurrent(){let e=this.activeTarget,t=this.activeSession,n=t?.sessionKey,r=this.activeArtifactKey;if(!e||!t||!n||!r||!this.open)return;let i=this.querySelector(`openclaw-app-sidebar`)?.findSidebarHovercardRowByKey(n),a=this.pullRequests?.get(r),o=this.progressCards?.get(t);o!==void 0&&(this.lastProgressCard=o);let s=this.applicationGateway,c={authTokens:s?ee({hello:s.snapshot.hello,settings:{token:s.connection.token},password:s.connection.password}):[],authReady:!!(s&&(s.snapshot.hello||s.connection.token.trim()||s.connection.password.trim()))},l=JSON.stringify({progress:this.lastProgressCard?.revision??null,pullRequests:a?{branch:a.branch,pullRequests:a.pullRequests,status:a.status}:null,row:i?{label:i.label,color:i.color,attention:i.attention,boardFace:i.boardFace,hasAutomation:i.hasAutomation,hasActiveRun:i.hasActiveRun,channelAvatarUrl:i.channelAvatarUrl,channelPresentation:i.channelPresentation,lastMessagePreview:i.lastMessagePreview,createdActor:i.createdActor,participants:i.participants,expandedParticipants:i.expandedParticipants,participantCount:i.participantCount,workContext:i.workContext,placementMachine:i.placementMachine,createdAt:i.createdAt,startedAt:i.startedAt,updatedAt:i.updatedAt,status:i.status,endedAt:i.endedAt}:null});if(this.hovercard.card?.dataset.revision===l)return;let u=this.hovercard.card,d=u?.contains(document.activeElement)&&document.activeElement instanceof HTMLElement?document.activeElement:null,p=d?this.hovercard.focusables().indexOf(d):-1,m=d instanceof HTMLAnchorElement?d.href:null,h=!u&&this.animateNextOpen,g=u;if(g||(Z+=1,g=ve(`openclaw-session-progress-hovercard-${Z}`,`session-progress-hovercard`),this.animateNextOpen=!1,h?g.dataset.open=`false`:g.dataset.instant=`true`),g.dataset.revision=l,g.setAttribute(`aria-label`,f(`sessionHovercard.ariaLabel`)),C(Ge({row:i,selfUserId:this.applicationContext?.gateway.snapshot.selfUser?.id,avatarAuth:c,personActivity:this.personActivity(),automationLink:this.applicationContext?{href:`${ie(`cron`,this.applicationContext.basePath)}?${new URLSearchParams({session:n,agent:t.agentId})}`,navigate:()=>{let e=this.applicationContext;this.close(),e?.navigate(`cron`,{search:`?${new URLSearchParams({session:n,agent:t.agentId})}`})}}:void 0,pullRequests:a,progressCard:this.lastProgressCard}),g),!g.firstElementChild){this.hovercard.clearCard(),this.hovercard.pointerOverCard=!1,this.hovercard.cardFocusInside=!1;return}if(u){if(d&&!g.contains(document.activeElement)){let e=this.hovercard.focusables(),t=(m?e.find(e=>e instanceof HTMLAnchorElement&&e.href===m):void 0)??e[p];t?t.focus({preventScroll:!0}):(this.hovercard.cardFocusInside=!1,this.hovercard.returnFocus(this.activeTrigger),this.hovercard.focusInside=document.activeElement===this.activeTrigger)}this.hovercard.position();return}g.addEventListener(`pointerleave`,this.handleCardPointerLeave),g.addEventListener(`keydown`,this.hovercard.handleCardKeyDown),this.hovercard.mount(e,g,Ee(e),!1,()=>C(x,g)),h&&(g.offsetWidth,window.setTimeout(()=>{this.hovercard.card===g&&this.open&&(g.dataset.open=`true`)},0))}personActivity(){let e=this.applicationContext;return e?ke(e,()=>this.close()):void 0}close(e=!1){let t=this.open;this.hovercard.reset(e?X:0),this.loadGeneration+=1,this.open=!1,this.animateNextOpen=!0,this.lastProgressCard=null,this.activeTargetObserver.disconnect(),this.progressCards?.unwatch(this),this.releasePullRequestStore(),this.activeTarget=null,this.activeTrigger=null,this.activeSession=null,t&&(this.clearSkipDelayTimer(),this.skipDelayTimer=window.setTimeout(()=>{this.skipDelayTimer=null,this.delayed=!0},J))}clearSkipDelayTimer(){this.skipDelayTimer!==null&&(window.clearTimeout(this.skipDelayTimer),this.skipDelayTimer=null)}}})))()}$();export{Q as SessionProgressHovercardProvider};