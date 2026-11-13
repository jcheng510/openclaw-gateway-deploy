import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{hu as n,li as r,lu as i,pu as a,su as o,ui as s,uu as c}from"./control-ui-core-pYNj5S1a.js";import{Ma as l,Xi as u,Zi as d,or as f,sr as p,va as m}from"./control-ui-core-D6clmJs8.js";import{$ as h,X as g,Y as _,ct as v,nt as y}from"./lit-runtime-DZL1fcCI.js";import{C as b,S as x,_ as S,c as C,d as w,f as T,g as E,h as D,m as O,p as k,u as A}from"./control-ui-boot-new-CaEHEcx2.js";import{n as j,t as M}from"./settings-workspace-DKW0BVnu.js";function N(e){return new Date(e).toLocaleDateString(a.getLocale())}function P(e,t={}){let r=k.filter(t=>e.has(t.id)).length,i=r===k.length,a=n(`quickSettings.appearance.lobsterdexSeen`,{seen:String(r),total:String(k.length)});return h`
    <section class="lobsterdex-page">
      <header
        class="lobsterdex-page__header ${i?`lobsterdex-page__header--complete`:``}"
      >
        <div>
          <h2>${n(`tabs.lobsterdex`)}</h2>
          <p>${n(`subtitles.lobsterdex`)}</p>
        </div>
        <span class="lobsterdex-page__count">${a}</span>
      </header>
      <span class="sr-only" role="status">
        ${t.copyFeedback?.status===`copied`?n(`common.copied`):g}
      </span>
      ${t.copyFeedback?.status===`error`?h`<div class="callout danger" role="alert">${n(`common.copyFailed`)}</div>`:g}
      <section class="lobsterdex-page__grid" aria-label=${a}>
        ${k.map(r=>{let i=C(r),a=e.get(r.id),o=a!==void 0,s=o?a.name??S(r.id):`?`,c=D[r.id],l=o&&a.firstSeenAt!==null?n(`quickSettings.appearance.lobsterdexCardFirstVisited`,{date:N(a.firstSeenAt)}):null,d=a?.shinySeenAt==null?null:n(`quickSettings.appearance.lobsterdexCardShinySeen`,{date:N(a.shinySeenAt)});return h`
            <article
              id="lobsterdex-${r.id}"
              class="lobsterdex-page__card ${o?``:`lobsterdex-page__card--unseen`}"
            >
              <button
                type="button"
                class="lobsterdex-page__copy-link"
                aria-label=${n(`quickSettings.appearance.lobsterdexCardCopyLink`)}
                @click=${()=>t.onCopyLink?.(r.id)}
              >
                <span aria-hidden="true"
                  >${t.copyFeedback?.status===`copied`&&t.copyFeedback.paletteId===r.id?u.check:u.link}</span
                >
              </button>
              <div
                class="lobsterdex-page__sprite lobster-pet lobster-pet--palette-${r.id} ${o?``:`lobsterdex__mini--unseen`}"
                style=${w(i)}
              >
                ${T(i,{standalone:!0})}
                ${a?.shinySeenAt==null?g:h`<span
                        class="lobsterdex__mini-star lobsterdex-page__star"
                        aria-hidden="true"
                        >✦</span
                      >`}
              </div>
              <h3>${s}</h3>
              <p class="lobsterdex-page__lore">${o?c.flavor:c.hint}</p>
              <div class="lobsterdex-page__dates">
                ${l?h`<p class="lobsterdex-page__date"><time>${l}</time></p>`:g}
                ${d?h`<p class="lobsterdex-page__date"><time>${d}</time></p>`:g}
              </div>
            </article>
          `})}
      </section>
    </section>
  `}function F(){return(F=e((()=>{_(),d(),A(),E(),O(),c()})))()}var I;function L(){return(L=e((()=>{_(),y(),m(),f(),b(),O(),M(),s(),i(),F(),I=class extends o{constructor(...e){super(...e),this.copyFeedback=null,this.copyAttempt=0,this.copyResetTimer=null,this.copyLink=async e=>{let t=++this.copyAttempt;this.copyFeedback=null,this.copyResetTimer!==null&&(window.clearTimeout(this.copyResetTimer),this.copyResetTimer=null);let n=`${location.origin}${location.pathname}#lobsterdex-${e}`,i=await r(n,()=>this.isConnected&&t===this.copyAttempt);this.isConnected&&t===this.copyAttempt&&(this.copyFeedback={paletteId:e,status:i?`copied`:`error`},this.copyResetTimer=window.setTimeout(()=>{this.copyFeedback=null,this.copyResetTimer=null},1500))}}disconnectedCallback(){this.copyAttempt+=1,this.copyFeedback=null,this.copyResetTimer!==null&&(window.clearTimeout(this.copyResetTimer),this.copyResetTimer=null),super.disconnectedCallback()}firstUpdated(){if(!location.hash.startsWith(`#lobsterdex-`))return;let e=k.find(e=>e.id===location.hash.slice(12));if(!e)return;let t=this.querySelector(`#lobsterdex-${e.id}`);if(!t)return;let n=e=>{e.target===t&&e.animationName===`lobsterdex-card-highlight`&&(t.classList.remove(`lobsterdex-page__card--highlight`),t.removeEventListener(`animationend`,n))};t.addEventListener(`animationend`,n),t.classList.add(`lobsterdex-page__card--highlight`),requestAnimationFrame(()=>{requestAnimationFrame(()=>t.scrollIntoView({block:`center`}))})}render(){return h`
      <section class="content-header" ${p({toolbarHeader:!0})}>
        <h1 class="page-title">${l(`lobsterdex`)}</h1>
      </section>
      ${j(P(x(),{copyFeedback:this.copyFeedback,onCopyLink:e=>void this.copyLink(e)}))}
    `}},t([v()],I.prototype,`copyFeedback`,void 0),customElements.get(`openclaw-lobsterdex-page`)||customElements.define(`openclaw-lobsterdex-page`,I)})))()}L();