import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ji as t,Li as n,Pa as r,eo as i,qr as a}from"./control-ui-foundation-C3MHh_P-.js";import{Fc as o,Ic as s,Pc as c,Ti as l,bs as u,hu as d,nl as f,uu as p,yi as m}from"./control-ui-core-pYNj5S1a.js";import{Ca as h,Da as g,Gi as _,Ma as v,Na as ee,Oa as te,Sa as y,Ta as b,Wi as ne,Xi as x,Zi as S,c as re,co as C,ga as w,go as T,ia as ie,ja as ae,ka as E,la as oe,ma as se,po as ce,s as le,ta as ue,ua as de,va as D}from"./control-ui-core-D6clmJs8.js";import{$ as O,X as k,Y as A,ct as fe,nt as pe,ut as j}from"./lit-runtime-DZL1fcCI.js";import{v as M}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as N,t as P}from"./en-settings-DlF4_5vi.js";import{gt as F}from"./control-ui-boot-new-CaEHEcx2.js";import{a as I,o as L}from"./settings-targets-B7PGvUUs.js";import{i as R,n as z,r as B,t as me}from"./config-form.tiers-a7YfkSZr.js";import{n as he,o as ge,r as _e}from"./config-form.search-By3YxbhJ.js";import{_ as ve,h as ye,i as be,r as xe,s as Se,u as Ce}from"./setup-schema-DZqA992e.js";import"./settings-DdI5hVp3.js";function we(e,t){let n=d(e.labelKey),r=t?Object.entries(e.nativeSearchKeys??{}).filter(([,e])=>e(t)).map(([e])=>e):[];return{routeId:e.routeId,...e.search===void 0?{}:{search:e.search},hash:e.hash,label:n,searchText:[n,...[...e.searchKeys,...r].map(e=>d(e)),e.aliases??``].join(` `)}}function Te(e,t){let n=H[e],r=t.properties;if(!n||!r)return t;let i=new Set(n());return{...t,properties:Object.fromEntries(Object.entries(r).filter(([e])=>i.has(e)))}}function Ee(e){if(!e.query.trim())return[];let n=ge(e.query),r=n.tags.length===0&&n.text?V.filter(t=>(e.identityAvailable||!t.requiresIdentity)&&(e.multipleProfiles||!t.requiresMultipleProfiles)&&(e.nativeDeviceSettings||!t.requiresNativeDeviceSettings)&&y(t.routeId,e.canAdmin!==!1,e.nativeDeviceSettings)).map(t=>we(t,e.nativeDeviceSettings?.snapshot??null)).filter(e=>E(e.searchText,n.text)):[],i=t(e.schema)?e.schema:null;if(!i||l(i)!==`object`||!i.properties)return r;let a=U.get(i);(!a||a.hints!==e.uiHints)&&(a={hints:e.uiHints,sections:new Map},U.set(i,a));let o=e.value??{};for(let[t,n]of Object.entries(i.properties)){let i=ye(t);if(!y(i,e.canAdmin!==!1,e.nativeDeviceSettings))continue;let s=a.sections.get(t);if(!s){let r=t===`wizard`?be(n):Te(i,n);s={schema:r,tiers:z({schema:r,path:[t],hints:e.uiHints})},a.sections.set(t,s)}let{schema:c,tiers:l}=s,u=B[t],d=n=>!!(n&&_e({key:t,schema:n,value:o[t],hints:e.uiHints,query:e.query,label:u?.label,description:u?.description,textMatcher:E})),f=d(l.common),p=d(l.advanced);if(!f&&!p)continue;let m=encodeURIComponent(t),h=`#config-section-${m}`;r.push({routeId:i,label:u?.label??c.title??t,...i===`memory`?{pathname:ce(`settings`,e.basePath),hash:h}:i===`plugin-settings`?{search:`?tab=advanced`,hash:`#plugin-settings-advanced`}:{search:`?section=${m}${p||t===`wizard`?`&advanced=1`:``}`,hash:h}})}return r}var V,H,U;function W(){return(W=e((()=>{D(),C(),R(),he(),me(),p(),P(),m(),ve(),Se(),L(),xe(),N(),V=Object.values(I),H={memory:Ce,"plugin-settings":()=>[`enabled`,`allow`,`deny`,`load`,`slots`],updates:()=>[`channel`,`checkOnStart`,`auto`]},U=new WeakMap})))()}function G(e,t){return O`<button
    class="btn btn--xs settings-save-indicator__action"
    type="button"
    @click=${t}
  >
    ${e}
  </button>`}var K,q;function J(){return(J=e((()=>{A(),pe(),p(),S(),ue(),K=2e3,q=class extends n{constructor(...e){super(...e),this.savedVisible=!1}createRenderRoot(){return this}willUpdate(){let e=this.props?.status;this.previousStatus===`saving`&&e===`saved`?(this.clearSavedTimer(),this.savedVisible=!0,this.savedTimer=globalThis.setTimeout(()=>{this.savedTimer=void 0,this.savedVisible=!1},K)):e!==`saved`&&(this.clearSavedTimer(),this.savedVisible=!1),this.previousStatus=e}disconnectedCallback(){this.clearSavedTimer(),super.disconnectedCallback()}clearSavedTimer(){globalThis.clearTimeout(this.savedTimer),this.savedTimer=void 0}renderClaw(e){return O`<span class="settings-save-indicator__claw ${e}" aria-hidden="true"
      >${ie().mascot===`none`?x.mark:x.claw}</span
    >`}render(){let e=this.props;if(!e)return k;let t,n=``,r=``,i=``;if(e.applying)t=O` <span class="settings-save-indicator__spinner" aria-hidden="true"
          >${x.loader}</span
        >
        <span>${d(`configView.applying`)}</span>`;else if(e.status===`saving`)t=O` ${this.renderClaw(`settings-save-indicator__claw--saving`)}
        <span>${d(`configView.autoSaveSaving`)}</span>`;else if(e.status===`recovery`)n=` settings-save-indicator--danger settings-save-indicator--recovery`,t=O`<span>${e.lastError}</span>
        ${G(d(`configView.recoveryReload`),e.onReload)}`;else if(e.status===`rejected`)n=` settings-save-indicator--rejected`,t=O`<span>${d(`configView.autoSaveRejected`)}</span>
        <span>${d(`configView.autoSaveRejectedHint`)}</span>
        ${e.lastError?O`<details>
                <summary>${d(`configView.rejectionDetails`)}</summary>
                <span>${e.lastError}</span>
              </details>`:k}
        ${G(d(`configView.retry`),e.onRetry)}
        ${G(d(`configView.recoveryReload`),e.onReload)}`;else if(e.status===`error`)i=e.lastError?.trim()??``,r=i?`${d(`configView.autoSaveFailed`)}: ${i}`:``,n=` settings-save-indicator--danger`,t=O` <span>${d(`configView.autoSaveFailed`)}</span>
        ${G(d(`configView.retry`),e.onRetry)}`;else if(e.status===`paused`)t=O` <span>${d(`configView.autoSavePaused`)}</span>
        ${G(d(`configView.saveNow`),e.onSave)}`;else if(e.status===`conflict`)n=` settings-save-indicator--danger`,t=O` <span>${d(`configView.autoSaveConflict`)}</span>
        ${G(d(`common.reload`),e.onReload)}`;else if(this.savedVisible)n=` settings-save-indicator--saved`,t=O` ${this.renderClaw(`settings-save-indicator__claw--saved`)}
        <span class="settings-save-indicator__check" aria-hidden="true">${x.check}</span>
        <span>${d(`configView.autoSaveSaved`)}</span>`;else if(e.needsApply)t=O` <button
        class="btn btn--xs settings-save-indicator__apply"
        type="button"
        ?disabled=${e.applyDisabled}
        @click=${e.onApply}
      >
        ${d(`configView.applyChanges`)}
      </button>`;else return k;return O`<div
      class="settings-save-indicator${n}"
      role="status"
      aria-live="polite"
      aria-label=${r||k}
      title=${i||k}
    >
      ${t}
    </div>`}},a([j({attribute:!1})],q.prototype,`props`,void 0),a([fe()],q.prototype,`savedVisible`,void 0),customElements.get(`openclaw-settings-save-indicator`)||customElements.define(`openclaw-settings-save-indicator`,q)})))()}function De(e,t){if(t.pathname)return!1;let n=i(t.label);return[g(e),v(e)].some(e=>i(e)===n)}function Oe(e,t,n,r){let a=ee(n,r),o=t.filter(e=>y(e.routeId,n,r)),s=i(e);if(!s)return a.map(e=>({labelKey:e.labelKey,items:e.routes.map(e=>({routeId:e,blocks:[]}))}));let c=a.flatMap(e=>e.routes),l=[...new Set([...c,...se.filter(e=>y(e,n,r)),...o.map(e=>e.routeId)])],u=l.filter(e=>[g(e),v(e),ae(e)].some(e=>E(e,s))),f=new Set(u),p=a.flatMap(e=>e.labelKey&&E(d(e.labelKey),s)?e.routes.filter(e=>!f.has(e)&&(f.add(e),!0)):[]),m=new Map,h=new Set;for(let e of o){let t=`${e.routeId}\u0000${e.pathname??``}\u0000${e.search??``}\u0000${e.hash}`;if(h.has(t))continue;h.add(t);let n=m.get(e.routeId)??[];n.push(e),m.set(e.routeId,n)}let _=[...u,...p];return[..._.length>0?[{labelKey:null,items:_.map(e=>({routeId:e,blocks:(m.get(e)??[]).filter(t=>!De(e,t))}))}]:[],...l.filter(e=>!f.has(e)&&m.has(e)).map(e=>({labelKey:null,items:[{routeId:e,blocks:m.get(e)??[]}]}))]}function Y(e,t){let n=te(e.activeRouteId)===t;return O`
    <a
      href=${T(t,e.basePath)}
      class="settings-sidebar__item ${n?`settings-sidebar__item--active`:``}"
      aria-current=${n?`page`:k}
      @focus=${r=>b(e.preloadTimers,t,r,e.onPreload,n)}
      @blur=${t=>w(e.preloadTimers,t)}
      @pointerenter=${r=>b(e.preloadTimers,t,r,e.onPreload,n)}
      @pointerleave=${t=>w(e.preloadTimers,t)}
      @touchstart=${{handleEvent:r=>b(e.preloadTimers,t,r,e.onPreload,n,!0),passive:!0}}
      @click=${n=>{u(n)&&(n.preventDefault(),e.onNavigate(t))}}
    >
      <span class="settings-sidebar__item-icon" aria-hidden="true"
        >${x[h(t)]}</span
      >
      <span class="settings-sidebar__item-label"
        >${g(t,e.nativeDeviceSettings?.snapshot)}</span
      >
      ${e.presentation===`embed-list`?O`<span class="settings-row__chevron" aria-hidden="true">${x.chevronRight}</span>`:k}
    </a>
  `}function ke(e,t){let n=(t.pathname??T(t.routeId,e.basePath))+(t.search??``)+t.hash,r=e.activeRouteId===t.routeId&&(t.pathname===void 0||e.activePathname===t.pathname)&&e.activeHash===t.hash&&(t.search===void 0||e.activeSearch===t.search);return O`
    <a
      href=${n}
      class="settings-sidebar__subitem ${r?`settings-sidebar__subitem--active`:``}"
      aria-current=${r?`location`:k}
      @click=${n=>{u(n)&&(n.preventDefault(),e.onNavigate(t.routeId,{...t.pathname?{pathname:t.pathname}:{},...t.search?{search:t.search}:{},hash:t.hash}))}}
    >
      <span class="settings-sidebar__subitem-label">${t.label}</span>
    </a>
  `}function Ae(e){e.closest(`.settings-sidebar`)?.querySelector(`.settings-sidebar__search`)?.classList.toggle(`settings-sidebar__search--scrolled`,e.scrollTop>0)}function je(e){let t=new Map(e.map(e=>[e.id,e])),n=new Map,r=[];for(let i of e){let e=i.creatorAgentId;if(e&&e!==i.id&&t.has(e)){let t=n.get(e)??[];t.push(i),n.set(e,t)}else r.push(i)}let i=[],a=new Set,o=(e,t)=>{if(!a.has(e.id)){a.add(e.id),i.push({agent:e,...t>0&&e.creatorAgentId?{creatorAgentId:e.creatorAgentId}:{}});for(let r of n.get(e.id)??[])o(r,t+1)}};return r.forEach(e=>o(e,0)),e.forEach(e=>o(e,0)),i}function X(e){let t=o(e.agents).map(e=>Object.assign({},e,{id:r(e.id),creatorAgentId:e.creatorAgentId?r(e.creatorAgentId):e.creatorAgentId})),n=je(t).map(({agent:e,creatorAgentId:t})=>({value:e.id,label:s(e),agent:e,description:t?d(`agents.createdBy`,{id:t}):void 0}));return O`<div class="settings-sidebar__agent">
    <openclaw-agent-select
      .options=${n}
      .identityById=${Object.fromEntries(e.agentIdentity.entries().map(e=>[e.agentId,e]))}
      .value=${e.settingsAgentSelection.state.selectedId??``}
      .accessibleLabel=${d(`agentScope.label`)}
      .menuLabel=${d(`agentScope.label`)}
      .disabled=${n.length<=1}
      .onSelect=${t=>e.settingsAgentSelection.set(t)}
      @wa-show=${()=>void e.agentIdentity.ensure(t.map(e=>e.id))}
    ></openclaw-agent-select>
  </div>`}function Z(e){return e.connectionStatus===null?O`<openclaw-settings-save-indicator
        .props=${e.saveIndicator}
      ></openclaw-settings-save-indicator>`:re({kind:e.connectionStatus,lastError:e.lastError,onRetry:e.onRetryConnect})}function Q(e){return O`<header class="native-embed-header">
    ${e.presentation===`embed-page`?O`<button
            class="native-embed-header__back btn btn--ghost"
            type="button"
            aria-label=${d(`common.back`)}
            @click=${e.onExit}
          >
            <span aria-hidden="true">${x.chevronLeft}</span>${d(`common.back`)}
          </button>`:k}
    <h1 class="page-title">
      ${e.presentation===`embed-list`?d(`nav.settings`):g(e.activeRouteId,e.nativeDeviceSettings?.snapshot)}
    </h1>
    ${Z(e)}
  </header>`}function Me(e){if(e.presentation===`embed-page`)return O`${Q(e)} ${X(e)}`;let t=e.searchBlockMatches??(e.searchParams?Ee(e.searchParams):[]),n=Oe(e.searchQuery,t,e.canAdmin!==!1,e.nativeDeviceSettings??null),r=O` <nav
    class="settings-sidebar__nav"
    aria-label=${d(`common.settingsSections`)}
    @scroll=${e=>Ae(e.currentTarget)}
  >
    ${n.length===0?O`<p class="settings-sidebar__empty" role="status">
            ${d(`nav.settingsSearchNoResults`)}
          </p>`:n.map(t=>O`
              <div class="settings-sidebar__group">
                ${t.labelKey?O`<div class="settings-sidebar__group-label">${d(t.labelKey)}</div>`:k}
                ${t.items.map(t=>O`
                    ${Y(e,t.routeId)}
                    ${t.blocks.map(t=>ke(e,t))}
                  `)}
              </div>
            `)}
  </nav>`;return e.presentation===`embed-list`?O`<section class="settings-embed-list">
      ${Q(e)} ${X(e)} ${r}
    </section>`:O`
    <aside class="settings-sidebar">
      <header class="settings-sidebar__header" @mousedown=${oe}>
        <button type="button" class="settings-sidebar__back" @click=${()=>e.onExit()}>
          <span class="settings-sidebar__back-icon" aria-hidden="true">${x.arrowLeft}</span>
          ${d(`nav.exitSettings`)}
          ${_(`esc`,{className:`settings-sidebar__esc`,ariaHidden:!0})}
        </button>
        <h1 class="settings-sidebar__title">${d(`nav.settings`)}</h1>
      </header>
      ${X(e)}
      <div class="settings-sidebar__search" role="search">
        <span class="settings-sidebar__search-icon" aria-hidden="true">${x.search}</span>
        <input
          class="settings-sidebar__search-input"
          type="search"
          autocomplete="off"
          spellcheck="false"
          aria-label=${d(`nav.settingsSearchLabel`)}
          placeholder=${d(`nav.settingsSearchPlaceholder`)}
          .value=${e.searchQuery}
          @input=${t=>e.onSearchQueryChange(t.currentTarget.value)}
          @keydown=${t=>{if(t.key===`Escape`){if(t.preventDefault(),e.searchQuery){e.onSearchQueryChange(``);return}e.onExit()}}}
        />
        ${e.searchQuery?O`
                <button
                  type="button"
                  class="settings-sidebar__search-clear"
                  aria-label=${d(`nav.settingsSearchClear`)}
                  @click=${t=>{let n=t.currentTarget.parentElement?.querySelector(`input`);e.onSearchQueryChange(``),n?.focus()}}
                >
                  ${x.x}
                </button>
              `:k}
      </div>
      ${r}
      <footer class="settings-sidebar__footer">
        ${Z(e)}
        <openclaw-sidebar-build-chip
          .basePath=${e.basePath}
          .gatewayVersion=${e.gatewayVersion||null}
          .variant=${`settings`}
          .onNavigate=${()=>e.onNavigate(`about`)}
        ></openclaw-sidebar-build-chip>
      </footer>
    </aside>
  `}function $(){return($=e((()=>{A(),D(),C(),de(),p(),c(),f(),W(),le(),S(),ne(),F(),J(),M()})))()}$();export{Me as renderSettingsSidebar};