import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{bu as i,hu as a,lu as o,su as s,uu as c,xu as l}from"./control-ui-core-pYNj5S1a.js";import{Xi as u,Zi as d,vi as f,yi as p}from"./control-ui-core-D6clmJs8.js";import{$ as m,X as h,Y as g,nt as _,ut as v}from"./lit-runtime-DZL1fcCI.js";import{D as y,M as b,O as x,g as S}from"./config-runtime-CgOgfOrG.js";import{I as C,N as w,gn as T}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as E,r as D}from"./board-layout-BmeSfx17.js";function O(e){let t=k.safeParse(e);if(!t.success)throw new E(`invalid_operation`,`Website props must contain only a valid HTTPS url of at most 2048 characters`);let n=new URL(t.data.url);if(n.username||n.password)throw new E(`invalid_operation`,`Website URLs must not contain embedded credentials`);return t.data}var k;function A(){return(A=e((()=>{S(),D(),k=y({url:x().max(2048).pipe(b({protocol:/^https$/,normalize:!0}).max(2048))})})))()}var j,M;function N(){return(N=e((()=>{l(),j={board:{widget:{websiteOpen:`Open website`,websiteEmbedHint:`If this site does not load here, open it in a new tab.`,websiteSameOrigin:`Open this website in a new tab. Gateway and Control UI pages cannot be embedded in a website widget.`}}},M=Object.assign(()=>Object.assign(i.board.widget,j.board.widget),{catalog:j})})))()}var P;function F(){return(F=e((()=>{t(),g(),_(),A(),p(),w(),d(),c(),N(),o(),M(),P=class extends s{constructor(...e){super(...e),this.active=!0,this.activated=!1}willUpdate(){this.activated||=this.active}render(){if(!this.activated)return h;let e;try{e=new URL(O(this.widget?.props).url)}catch(e){return C(e)}let t=T(this.context?.gateway.connection.gatewayUrl??``,window.location.origin),n=new URL(t).hostname,r=e.hostname===window.location.hostname||e.hostname===n;return m`<div class="board-website">
      ${r?m`<p class="board-website__notice" role="alert">
              ${a(`board.widget.websiteSameOrigin`)}
            </p>`:m`<iframe
              class="board-website__frame"
              title=${this.widget?.title||a(`board.widget.kindWebsite`)}
              src=${e.href}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerpolicy="no-referrer"
            ></iframe>`}
      <div class="board-website__footer">
        <span class="board-website__origin">${e.host}</span>
        <a
          href=${e.href}
          target="_blank"
          rel="noopener noreferrer"
          title=${a(`board.widget.websiteEmbedHint`)}
        >
          ${a(`board.widget.websiteOpen`)}${u.externalLink}
        </a>
      </div>
    </div>`}},n([r({context:f,subscribe:!0})],P.prototype,`context`,void 0),n([v({attribute:!1})],P.prototype,`widget`,void 0),n([v({type:Boolean})],P.prototype,`active`,void 0),customElements.get(`openclaw-website-widget`)||customElements.define(`openclaw-website-widget`,P)})))()}F();