import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Pa as n,qr as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{Dc as a,Tc as o,cc as s,hs as c,hu as l,lu as u,ms as d,nl as f,sc as p,su as m,uu as h,wc as g}from"./control-ui-core-pYNj5S1a.js";import{Oo as _,Xi as v,Zi as y,co as b,no as x,vi as S,wo as C,yi as w}from"./control-ui-core-D6clmJs8.js";import{$ as T,X as E,Y as D,m as O,nt as k,p as A,ut as j}from"./lit-runtime-DZL1fcCI.js";import{t as M}from"./terminal-panel-registration-BFe8wLaW.js";import{n as N,t as P}from"./panel-empty-state-Dh18ZXJZ.js";function F(e,t=``){let n=C(e,x),r=_(n.pathname,t);if(r)return{sessionId:r};let i=o(n.search);return i?{catalog:i}:null}function I(){return(I=e((()=>{b(),a()})))()}var L;function R(){return(R=e((()=>{t(),D(),k(),A(),w(),y(),P(),M(),h(),a(),f(),d(),u(),s(),I(),L=class extends m{constructor(){super(),this.location=null,new p(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.config,(e,t)=>e.subscribe(t)).watch(()=>this.context?.theme,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t))}render(){let e=this.context,t=e.gateway.snapshot,r=c(t,e.config.current.terminalEnabled??!1),i=e.agentSelection.state.selectedId??t.assistantAgentId,a=this.location?F(this.location,e.basePath):null,o=a?`sessionId`in a?a.sessionId:g(a.catalog):``;return O(o,T`<openclaw-terminal-panel
          ?hidden=${!r}
          embedded
          fullscreen
          .page=${!0}
          .routeTarget=${a}
          .client=${t.phase===`connected`?t.client:null}
          .available=${r}
          .agentId=${i?n(i):null}
          .basePath=${e.basePath}
          .themeMode=${e.theme.resolvedMode}
        ></openclaw-terminal-panel>
        ${r?E:N({icon:v.terminal,heading:l(`terminal.title`),description:l(`terminal.unavailable`),action:T`<button class="btn" @click=${()=>e.navigate(`new-session`)}>
                  ${l(`newSession.title`)}
                </button>`})}`)}},r([i({context:S,subscribe:!0})],L.prototype,`context`,void 0),r([j({attribute:!1})],L.prototype,`location`,void 0),customElements.define(`openclaw-terminal-page`,L)})))()}R();