import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Oi as n,ii as r,qr as i,zr as a}from"./control-ui-foundation-C3MHh_P-.js";import{N as o,R as ee,cc as te,hu as s,li as c,lu as l,pu as u,sc as d,su as f,ui as p,uu as m}from"./control-ui-core-pYNj5S1a.js";import{Ma as ne,Ui as re,Vi as h,Xi as g,Zi as ie,ia as ae,or as oe,sr as se,ta as ce,va as _,vi as v,wi as y,yi as b}from"./control-ui-core-D6clmJs8.js";import{$ as x,X as S,Y as C,ct as w,nt as T}from"./lit-runtime-DZL1fcCI.js";import{_i as E,bi as D,vi as O,xi as k,yi as A}from"./control-ui-boot-shared-3Hl8ksFq.js";import{At as j,Et as M,It as N,Ot as P,_t as F}from"./control-ui-boot-shared-DJ4XCcp6.js";import{c as I,d as le,f as L,m as R,p as z,u as B}from"./control-ui-boot-new-CaEHEcx2.js";import{n as V,t as H}from"./settings-workspace-DKW0BVnu.js";import{n as U,t as W}from"./brand-icons-C3i78qLU.js";function ue(e,t){if(!e)return null;let n=new Date(e);return Number.isNaN(n.getTime())?null:new Intl.DateTimeFormat(t,{dateStyle:`medium`,timeZone:`UTC`}).format(n)}function de(e){return s(e===`copying`?`aboutPage.copyingCommit`:e===`copied`?`aboutPage.copiedCommit`:e===`error`?`aboutPage.copyCommitFailed`:`aboutPage.copyCommit`)}function fe(e){return e===`copied`?s(`aboutPage.copiedCommit`):e===`error`?s(`aboutPage.copyCommitFailed`):``}function G(){return x`<span class="muted">${s(`aboutPage.unavailable`)}</span>`}function pe(e){if(!e)return S;let t=Date.parse(e);if(!Number.isFinite(t))return S;let n=new Intl.DateTimeFormat(u.getLocale(),{dateStyle:`medium`,timeStyle:`short`}).format(new Date(t));return x`
    <time class="about-commit__age" dir="auto" datetime=${e} title=${n}
      >${o(t,{fallback:``})}</time
    >
  `}function K(e){let t=e.buildInfo.commit;if(!t)return G();let n=de(e.copyState);return x`
    <span class="about-commit">
      <code dir="ltr" title=${t}>${t.slice(0,q)}</code>
      ${pe(e.buildInfo.commitAt)}
      <openclaw-tooltip .content=${n}>
        <button
          type="button"
          class="about-commit__copy"
          aria-label=${n}
          aria-busy=${e.copyState===`copying`?`true`:S}
          ?disabled=${e.copyState===`copying`}
          @click=${e.onCopyCommit}
        >
          <span aria-hidden="true">${e.copyState===`copied`?g.check:g.copy}</span>
        </button>
      </openclaw-tooltip>
      <span class="sr-only" role="status" aria-live="polite">${fe(e.copyState)}</span>
    </span>
  `}function me(e){let t=z.find(e=>e.id===`crimson`)??n(z[0],`about lobster palette`),r=I(t);return x`
    <section class="about-hero">
      ${ae().mascot===`none`?x`<span class="about-hero__mark--neutral" aria-hidden="true">${g.mark}</span>`:x`<button
              type="button"
              class="about-hero__clawd ${e.clawdWaving?`about-hero__clawd--wave`:``}"
              style=${le(r)}
              aria-label=${s(`aboutPage.waveHello`)}
              @click=${e.onPokeClawd}
            >
              ${L(r)}
            </button>`}
      <h2 class="about-hero__name">${s(`aboutPage.productName`)}</h2>
      <p class="about-hero__tagline">${s(`aboutPage.tagline`)}</p>
      ${e.buildInfo.version?x`<code class="about-hero__version" dir="ltr">v${e.buildInfo.version}</code>`:S}
      <nav class="about-hero__links" aria-label=${s(`aboutPage.linksLabel`)}>
        ${J.map(e=>x`
            <a
              class="about-hero__link"
              href=${e.href}
              target=${A}
              rel=${D()}
            >
              <span class="about-hero__link-icon" aria-hidden="true">${e.icon}</span>
              <span>${e.label()}</span>
            </a>
          `)}
      </nav>
    </section>
  `}function he(e){let t=ue(e.buildInfo.builtAt,u.getLocale()),n=x`
    <dl class="settings-kv about-build-grid" aria-label=${s(`aboutPage.artifactDetails`)}>
      <dt>${s(`aboutPage.version`)}</dt>
      <dd>
        ${e.buildInfo.version?x`<code dir="ltr" title=${e.buildInfo.version}
                >${e.buildInfo.version}</code
              >`:G()}
      </dd>
      <dt>${s(`aboutPage.commit`)}</dt>
      <dd>${K(e)}</dd>
      ${e.buildInfo.branch?x`
              <dt>${s(`aboutPage.branch`)}</dt>
              <dd>
                <code dir="ltr" title=${e.buildInfo.branch}
                  >${e.buildInfo.branch}${e.buildInfo.dirty===!0?`*`:``}</code
                >
              </dd>
            `:S}
      <dt>${s(`aboutPage.built`)}</dt>
      <dd>
        ${t&&e.buildInfo.builtAt?x`<time
                dir="auto"
                datetime=${e.buildInfo.builtAt}
                title=${e.buildInfo.builtAt}
                >${t}</time
              >`:G()}
      </dd>
    </dl>
  `;return M([me(e),j({title:s(`aboutPage.artifactTitle`),description:s(`aboutPage.artifactSubtitle`)},n),j({},P({title:s(`aboutPage.gatewayVersion`),description:s(`aboutPage.gatewayVersionHint`),control:e.gatewayVersion?N(x`<code dir="ltr" title=${e.gatewayVersion}>${e.gatewayVersion}</code>`,{mono:!0}):N(s(`aboutPage.unavailable`))})),x`<p class="about-footer">${s(`aboutPage.license`)}</p>`])}var q,J;function Y(){return(Y=e((()=>{r(),C(),ie(),B(),R(),ce(),F(),y(),m(),k(),ee(),O(),U(),q=12,J=[{href:`https://openclaw.ai`,icon:g.globe,label:()=>s(`aboutPage.linkWebsite`)},{href:`https://docs.openclaw.ai`,icon:g.book,label:()=>s(`aboutPage.linkDocs`)},{href:`https://github.com/openclaw/openclaw`,icon:W.github,label:()=>s(`aboutPage.linkGitHub`)},{href:E,icon:W.discord,label:()=>s(`aboutPage.linkDiscord`)},{href:`https://x.com/openclaw`,icon:W.x,label:()=>s(`aboutPage.linkX`)},{href:`https://docs.openclaw.ai/releases`,icon:g.scrollText,label:()=>s(`aboutPage.linkChangelog`)}]})))()}var X,Z,Q;function $(){return($=e((()=>{t(),C(),T(),_(),b(),oe(),re(),H(),p(),l(),te(),Y(),X=1800,Z=1400,Q=class extends f{constructor(...e){super(...e),this.copyState=`idle`,this.clawdWaving=!1,this.copyResetTimer=null,this.waveResetTimer=null,this.subscriptions=new d(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.subscriptions.clear(),this.copyResetTimer!==null&&(globalThis.clearTimeout(this.copyResetTimer),this.copyResetTimer=null),this.waveResetTimer!==null&&(globalThis.clearTimeout(this.waveResetTimer),this.waveResetTimer=null),super.disconnectedCallback()}pokeClawd(){this.clawdWaving||(this.clawdWaving=!0,this.waveResetTimer=globalThis.setTimeout(()=>{this.waveResetTimer=null,this.clawdWaving=!1},Z))}async copyCommit(){let e=h.commit;if(!e||this.copyState===`copying`)return;globalThis.clearTimeout(this.copyResetTimer??void 0),this.copyResetTimer=null,this.copyState=`copying`;let t=await c(e);this.isConnected&&(this.copyState=t?`copied`:`error`,this.copyResetTimer=globalThis.setTimeout(()=>{this.copyResetTimer=null,this.copyState=`idle`},X))}render(){let e=this.context.gateway.snapshot,t=e.phase===`connected`&&e.hello?.server?.version?.trim()||null,n=he({buildInfo:h,gatewayVersion:t,copyState:this.copyState,onCopyCommit:()=>void this.copyCommit(),clawdWaving:this.clawdWaving,onPokeClawd:()=>this.pokeClawd()});return x`
      <section class="content-header" ${se({toolbarHeader:!0})}>
        <div>
          <h1 class="page-title">${ne(`about`)}</h1>
        </div>
      </section>
      ${V(n)}
    `}},i([a({context:v,subscribe:!0})],Q.prototype,`context`,void 0),i([w()],Q.prototype,`copyState`,void 0),i([w()],Q.prototype,`clawdWaving`,void 0),customElements.get(`openclaw-about-page`)||customElements.define(`openclaw-about-page`,Q)})))()}$();