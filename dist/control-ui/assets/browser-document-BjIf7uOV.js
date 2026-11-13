import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{hu as n,lu as r,ou as i,uu as a}from"./control-ui-core-pYNj5S1a.js";import{Qt as o,Yt as s,ai as c,at as l,oi as u,rt as d}from"./control-ui-core-D6clmJs8.js";import{$ as f,X as p,Y as m,nt as h,ut as g}from"./lit-runtime-DZL1fcCI.js";import{Bo as _,zo as v}from"./control-ui-boot-shared-DJ4XCcp6.js";import{t as y}from"./browser-panel-Cd7fC8uP.js";var b;function x(){return(x=e((()=>{m(),h(),s(),d(),a(),r(),c(),y(),v(),b=class extends i{constructor(...e){super(...e),this.props=null}render(){if(!this.props)return p;let{context:e,target:t,renderEscape:r}=this.props,i=e.gateway.snapshot,a=i.phase===`connected`,s=i.phase===`starting`?n(`common.gatewayStarting`):void 0,c=_(t.tab),d=!!(c&&l(i));return f`
      <openclaw-browser-panel
        embedded
        style=${d?`height: 100dvh;`:`display: none;`}
        .client=${a?i.client:null}
        .available=${d}
        .remoteAvailable=${d}
        .presented=${!0}
        .sessionKey=${t.sessionKey}
        .fixedTab=${c}
        .resourceBasePath=${e.resourceBasePath}
        .authToken=${o({hello:i.hello,settings:{token:e.gateway.connection.token},password:e.gateway.connection.password})}
      ></openclaw-browser-panel>
      ${!a&&i.lastError===null?u(s):p}
      ${!d&&(a||i.lastError)?f`<main class="connect-splash" role="status">
              <div class="stack">
                <span>${n(c?`browser.unavailable`:`focus.unsupported`)}</span>
                ${r(n(`common.back`))}
              </div>
            </main>`:p}
    `}},t([g({attribute:!1})],b.prototype,`props`,void 0),customElements.get(`openclaw-browser-document`)||customElements.define(`openclaw-browser-document`,b)})))()}x();