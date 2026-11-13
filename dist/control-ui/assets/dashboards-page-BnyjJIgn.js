import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{Do as i,Gl as a,N as o,Ns as s,Oo as c,R as l,bs as u,cc as d,gc as f,hc as p,hu as m,ko as h,ks as g,lu as _,ql as ee,sc as te,su as v,uu as y,xc as ne}from"./control-ui-core-pYNj5S1a.js";import{Ai as b,Di as x,Ma as S,Xi as C,Zi as w,ki as T,or as re,sr as ie,va as ae,vi as oe,yi as se}from"./control-ui-core-D6clmJs8.js";import{$ as E,S as D,X as O,Y as k,c as A,ct as j,nt as M,s as N,ut as P,v as F,y as I}from"./lit-runtime-DZL1fcCI.js";import{Mi as L,Ni as R,no as z,ro as B}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Di as V,Oi as H,Ti as U,ki as ce}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as W,t as G}from"./near-viewport-observer-WgGck829.js";import{n as le,t as ue}from"./settings-workspace-DKW0BVnu.js";var K;function q(){return(q=e((()=>{k(),M(),W(),y(),_(),K=class extends v{constructor(...e){super(...e),this.sessionKey=``,this.error=null,this.visibility=new G(200,()=>this.requestUpdate()),this.observationFrame=0}connectedCallback(){super.connectedCallback(),window.cancelAnimationFrame(this.observationFrame),this.observationFrame=window.requestAnimationFrame(()=>this.visibility.observe(this))}disconnectedCallback(){window.cancelAnimationFrame(this.observationFrame),this.visibility.disconnect(),super.disconnectedCallback()}render(){return this.visibility.nearVisible?this.error?E`<div class="dashboard-preview__error">
          ${m(`dashboardDocument.loadFailed`,{error:this.error})}
        </div>`:E`<openclaw-board-document
          .passive=${!0}
          .gatewaySnapshot=${this.gatewaySnapshot}
          .preparedSession=${{sessionKey:this.sessionKey,agentId:this.agentId}}
        ></openclaw-board-document>`:O}},n([P({attribute:!1})],K.prototype,`gatewaySnapshot`,void 0),n([P({attribute:!1})],K.prototype,`sessionKey`,void 0),n([P({attribute:!1})],K.prototype,`agentId`,void 0),n([P({attribute:!1})],K.prototype,`error`,void 0),customElements.get(`openclaw-dashboard-preview`)||customElements.define(`openclaw-dashboard-preview`,K)})))()}function J(e,t){let n=e.createdActor??e.owner?.actor,r=n?.id?.trim()||e.agentId?.trim()||t;return{id:r,label:n?.label?.trim()||r}}function de(e,t,n){return E`<div class="dashboard-preview" aria-hidden="true" inert>
    <openclaw-dashboard-preview
      .gatewaySnapshot=${t}
      .sessionKey=${e.key}
      .agentId=${e.agentId}
      .error=${n}
    ></openclaw-dashboard-preview>
  </div>`}function fe(e,t){let n=t.query.trim().toLocaleLowerCase();return(e.result?.sessions??[]).filter(r=>{let i=J(r,e.fallbackAgentId);return t.ownerId&&i.id!==t.ownerId?!1:!n||[s(r.key,r),i.label,r.lastMessagePreview,r.key].filter(e=>typeof e==`string`).some(e=>e.toLocaleLowerCase().includes(n))}).toSorted((e,n)=>t.sort===`title`?s(e.key,e).localeCompare(s(n.key,n)):(n.updatedAt??0)-(e.updatedAt??0))}function pe(e,t,n,r,i){let a=f(t.key,e.globalScope)?ne({face:`dashboard`,sessionKey:t.key,fallbackAgentId:t.key===`global`&&t.agentId?.trim()||e.fallbackAgentId,basePath:e.basePath,row:t,mainKey:e.mainKey}):null,c=a?I`a`:I`div`,l=J(t,e.fallbackAgentId),d=s(t.key,t),p=l.label.trim().charAt(0).toLocaleUpperCase()||`?`;return D`<article class="dashboard-card" data-dashboard-session=${t.key}>
    <${c}
      class="dashboard-card__main"
      href=${a?.href??O}
      aria-label=${a?d:O}
      @click=${e=>{a&&n.onNavigate&&u(e)&&(e.preventDefault(),n.onNavigate(`dashboard`,a.options))}}
    >
      ${de(t,r,i)}
      <div class="dashboard-card__body">
        <div class="dashboard-card__heading">
          <h2>${d}</h2>
          ${t.status===`running`?E`<span class="dashboard-card__live"><i></i>${m(`dashboardsPage.live`)}</span>`:O}
        </div>
        <div class="dashboard-card__author">
          <span class="dashboard-card__avatar" aria-hidden="true">${p}</span>
          <span>${m(`dashboardsPage.byAuthor`,{author:l.label})}</span>
        </div>
      </div>
      <footer class="dashboard-card__footer">
        <span>
          ${t.updatedAt?m(`dashboardsPage.updated`,{time:o(t.updatedAt)}):m(`dashboardsPage.updatedUnknown`)}
        </span>
        ${a?E`<span class="dashboard-card__open" aria-hidden="true">${C.arrowUpRight}</span>`:O}
      </footer>
    </${c}>
  </article>`}function me(e,t,n,r,i){let a=e.result?.sessions??[];if(e.error&&!e.result)return O;if(a.length===0)return E`<section class="card stack" data-dashboards-empty role="status">
      <div class="list-title">${m(`dashboardsPage.emptyTitle`)}</div>
      <div class="card-sub">${m(`dashboardsPage.emptyDescription`)}</div>
    </section>`;let o=Array.from(new Map(a.map(t=>{let n=J(t,e.fallbackAgentId);return[n.id,n]})).values()).toSorted((e,t)=>e.label.localeCompare(t.label)),s=fe(e,t);return E`<section class="dashboards-gallery" aria-label=${S(`dashboards`)}>
    <div class="dashboards-toolbar">
      <label class="dashboards-search">
        <span aria-hidden="true">${C.search}</span>
        <span class="sr-only">${m(`dashboardsPage.searchLabel`)}</span>
        <input
          type="search"
          .value=${t.query}
          placeholder=${m(`dashboardsPage.searchPlaceholder`)}
          @input=${e=>{e.currentTarget instanceof HTMLInputElement&&n.onQueryChange(e.currentTarget.value)}}
        />
      </label>
      <label class="dashboards-select">
        <span>${m(`dashboardsPage.authorFilter`)}</span>
        <select
          .value=${t.ownerId}
          @change=${e=>{e.currentTarget instanceof HTMLSelectElement&&n.onOwnerChange(e.currentTarget.value)}}
        >
          <option value="">${m(`dashboardsPage.allAuthors`)}</option>
          ${o.map(e=>E`<option value=${e.id}>${e.label}</option>`)}
        </select>
      </label>
      <label class="dashboards-select">
        <span>${m(`dashboardsPage.sortLabel`)}</span>
        <select
          .value=${t.sort}
          @change=${e=>{e.currentTarget instanceof HTMLSelectElement&&(e.currentTarget.value===`updated`||e.currentTarget.value===`title`)&&n.onSortChange(e.currentTarget.value)}}
        >
          <option value="updated">${m(`dashboardsPage.sortUpdated`)}</option>
          <option value="title">${m(`dashboardsPage.sortTitle`)}</option>
        </select>
      </label>
    </div>
    <div class="dashboards-results" role="status">
      ${m(`dashboardsPage.resultCount`,{count:String(s.length)})}
    </div>
    ${s.length===0?E`<div class="dashboards-no-results" data-dashboards-no-results>
            <span aria-hidden="true">${C.search}</span>
            <strong>${m(`dashboardsPage.noResultsTitle`)}</strong>
            <span>${m(`dashboardsPage.noResultsDescription`)}</span>
          </div>`:E`<div class="dashboards-grid">
            ${A(s,e=>e.key,t=>pe(e,t,n,r,i))}
          </div>`}
  </section>`}function he(){return E`<section class="dashboards-gallery" aria-busy="true">
    <span class="sr-only" role="status">${m(`common.loading`)}</span>
    <div class="dashboards-loading" aria-hidden="true" inert>
      <div class="dashboards-toolbar">
        <div class="dashboards-search skeleton dashboards-loading__control"></div>
        ${[0,1].map(()=>E`<div class="dashboards-select dashboards-loading__select">
            <div class="skeleton skeleton-line dashboards-loading__label"></div>
            <div class="skeleton dashboards-loading__control"></div>
          </div>`)}
      </div>
      <div class="dashboards-results">
        <div class="skeleton skeleton-line dashboards-loading__label"></div>
      </div>
      <div class="dashboards-grid">
        ${Array.from({length:6},()=>E`<div class="dashboard-card">
            <div class="dashboard-preview skeleton"></div>
            <div class="dashboard-card__body">
              <div
                class="skeleton skeleton-line skeleton-line--long dashboards-loading__title"
              ></div>
              <div class="dashboard-card__author">
                <div class="dashboard-card__avatar skeleton"></div>
                <div class="skeleton skeleton-line skeleton-line--medium"></div>
              </div>
            </div>
            <div class="dashboard-card__footer">
              <div class="skeleton skeleton-line skeleton-line--medium"></div>
            </div>
          </div>`)}
      </div>
    </div>
  </section>`}function ge(e,t=Y,n=X,r,i=null){let a=e&&(e.result||e.error)?E`
          ${ce({status:{error:e.error,hasLoaded:e.result!==null,stale:e.result!==null&&e.error!==null,awaitingGateway:!1},errorMessage:e.error?m(`dashboardsPage.loadError`,{error:e.error}):void 0})}
          ${me(e,t,n,r,i)}
        `:he();return E`
    <section class="content-header dashboards-header" ${ie({toolbarHeader:!0})}>
      <div>
        <h1 class="page-title">${S(`dashboards`)}</h1>
        <div class="page-subtitle">${m(`subtitles.dashboards`)}</div>
      </div>
      ${e?.result?E`<div class="dashboards-header__count">
              <strong>${e.result.sessions.length}</strong>
              <span>${m(`dashboardsPage.totalLabel`)}</span>
            </div>`:O}
    </section>
    ${le(a)}
  `}var Y,X;function Z(){return(Z=e((()=>{k(),N(),F(),ae(),re(),w(),H(),ue(),y(),l(),g(),p(),q(),Y={query:``,ownerId:``,sort:`updated`},X={onQueryChange:()=>void 0,onOwnerChange:()=>void 0,onSortChange:()=>void 0}})))()}var Q;function $(){return($=e((()=>{t(),M(),se(),b(),H(),ee(),R(),B(),_(),d(),h(),Z(),Q=class extends v{constructor(...e){super(...e),this.filters={query:``,ownerId:``,sort:`updated`},this.previewError=null,this.listGeneration=0,this.gateway=new z(this,{getGateway:()=>this.context?.gateway}),this.subscriptions=new te(this).effect(()=>this.context?.agentSelection,e=>(this.bindList(),e.subscribe(()=>this.bindList())))}connectedCallback(){super.connectedCallback(),T(x.tagName,x.loadModule).then(()=>this.requestUpdate()).catch(e=>{this.previewError=a(e)})}disconnectedCallback(){this.listGeneration+=1,this.unsubscribeList?.(),this.unsubscribeList=void 0,this.observedSessions=void 0,this.observedScopeId=void 0,this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){e.has(`routeData`)&&(this.data=this.routeData),this.bindList()}bindList(){let e=this.context;if(!e)return;let t=e.sessions,n=e.agentSelection.state.scopeId?.trim()||null;if(t===this.observedSessions&&n===this.observedScopeId)return;this.unsubscribeList?.(),this.observedSessions=t,this.observedScopeId=n;let r=i(e),a=i=>{this.context!==e||this.observedSessions!==t||this.observedScopeId!==n||!i.result&&!i.error&&this.data?.result||(this.data=c(e,i),this.requestUpdate(),this.completeList(e,t,n,r,i))};this.unsubscribeList=t.subscribeList(r,a);let o=t.listSnapshot(r);a(o),!o.result&&!o.loading&&e.gateway.snapshot.phase===`connected`&&t.refreshList({...r,force:!0})}completeList(e,t,n,r,i){let a=i.result,o=++this.listGeneration,s=this.gateway.capture();if(!a?.hasMore||i.loading||i.error||!s)return;let l=()=>this.context===e&&this.observedSessions===t&&this.observedScopeId===n&&this.listGeneration===o&&this.gateway.isCurrent(s);L({initialResult:a,list:e=>t.list({...r,offset:e}),isCurrent:l,missingResultError:`dashboard enumeration returned no result`,stalledPaginationError:`dashboard enumeration did not advance`,incompletePaginationError:`dashboard enumeration was incomplete`}).then(t=>{t&&l()&&(this.data=c(e,{...i,result:{...a,count:t.length,hasMore:!1,nextOffset:null,sessions:t}}),this.requestUpdate())}).catch(t=>{if(!l())return;let n=V(U(),t,e.gateway.snapshot);this.data=c(e,{...i,error:n.error}),this.requestUpdate()})}render(){return ge(this.data,this.filters,{onQueryChange:e=>{this.filters={...this.filters,query:e}},onOwnerChange:e=>{this.filters={...this.filters,ownerId:e}},onSortChange:e=>{this.filters={...this.filters,sort:e}},onNavigate:this.context?.navigate},this.context?.gateway.snapshot,this.previewError)}},n([r({context:oe,subscribe:!0})],Q.prototype,`context`,void 0),n([P({attribute:!1})],Q.prototype,`routeData`,void 0),n([j()],Q.prototype,`filters`,void 0),n([j()],Q.prototype,`previewError`,void 0),customElements.get(`openclaw-dashboards-page`)||customElements.define(`openclaw-dashboards-page`,Q)})))()}$();