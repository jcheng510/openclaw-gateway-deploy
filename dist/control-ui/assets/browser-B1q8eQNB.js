import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Ui as n,qr as r,zr as i}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as a,cc as o,hu as s,lu as c,ql as l,sc as u,su as d,uu as f}from"./control-ui-core-pYNj5S1a.js";import{Qt as p,Yt as m,at as h,it as g,rt as _,vi as v,yi as y}from"./control-ui-core-D6clmJs8.js";import{$ as b,X as x,Y as S,ct as C,nt as w,ut as T}from"./lit-runtime-DZL1fcCI.js";import{Cr as E,Sr as D}from"./control-ui-boot-shared-3Hl8ksFq.js";import{I as O,N as k,Vn as A,kn as j}from"./control-ui-boot-shared-DJ4XCcp6.js";import{t as M}from"./browser-panel-Cd7fC8uP.js";var N;function P(){return(P=e((()=>{t(),S(),w(),y(),m(),_(),k(),j(),M(),f(),D(),c(),o(),l(),E(),N=class extends d{constructor(){super(),this.session={sessionKey:``},this.active=!0,this.pending=!1,this.generation=0,this.refreshNeeded=!1,new u(this).watch(()=>this.context?.gateway,(e,t)=>{let r=e.subscribe(t),i=e.subscribeEvents(e=>{let t=n(e.payload);e.event===`plugin.browser.dashboard_changed`&&t?.instanceId===this.widget?.instanceId&&t?.name===this.widget?.name&&(this.refreshNeeded=!0,this.active&&this.request(`inspect`))});return()=>{r(),i()}})}willUpdate(){let e=this.context?.gateway.snapshot.client??null,t=JSON.stringify([this.session,this.widget?.instanceId,this.widget?.name,this.widget?.props,this.context?.gateway.snapshot.hello?.auth]);(this.scope?.key!==t||this.scope.client!==e)&&(this.scope={key:t,client:e},this.generation+=1,this.dashboard=void 0,this.error=void 0,this.pending=!1,this.refreshNeeded=!1),this.active&&this.available&&!this.pending&&!this.error&&(this.refreshNeeded?this.request(`inspect`):(!this.dashboard||!this.dashboard.paused&&!this.dashboard.browserTab)&&this.request(`open`))}disconnectedCallback(){this.generation+=1,this.scope=void 0,super.disconnectedCallback()}get available(){return!!(this.context&&g(this.context.gateway.snapshot))}get sessionScoped(){return!(!this.context||h(this.context.gateway.snapshot))}async request(e){let t=this.context?.gateway.snapshot.client,n=this.widget?.instanceId;if(!t||!this.available||!this.widget||this.pending)return;if(!n){this.error=Error(s(`browser.dashboardMissingIdentity`));return}let r=++this.generation;e===`inspect`&&(this.refreshNeeded=!1),this.pending=!0,this.error=void 0;try{let i=await A(t,{...this.session,name:this.widget.name,instanceId:n,...this.sessionScoped?{sessionScoped:!0}:{}},e);this.isConnected&&r===this.generation&&t===this.scope?.client&&(this.dashboard=i)}catch(e){this.isConnected&&r===this.generation&&(this.error=e)}finally{this.isConnected&&r===this.generation&&(this.pending=!1,this.refreshNeeded&&this.active&&this.request(`inspect`))}}render(){let e=this.context?.gateway,t=this.dashboard;return!this.active&&!t?x:!e||!this.available?b`<p class="board-browser__notice">${s(`browser.dashboardUnavailable`)}</p>`:b`<div class="board-browser" data-chat-autotype-exempt>
      <div class="board-browser__content">
        ${t?.browserTab&&!t.paused?b`<openclaw-browser-panel
                embedded
                .client=${e.snapshot.client}
                .available=${this.available}
                .remoteAvailable=${this.available}
                .presented=${this.active}
                .sessionKey=${t.sessionKey}
                .fixedTab=${t.browserTab}
                .dashboardTarget=${{...this.session,name:t.name,instanceId:t.instanceId,...this.sessionScoped?{sessionScoped:!0}:{}}}
                .resourceBasePath=${this.context?.resourceBasePath??``}
                .authToken=${p({hello:e.snapshot.hello,password:e.connection.password,settings:{token:e.connection.token}})}
              ></openclaw-browser-panel>`:this.error?O(this.error,()=>void this.request(`open`)):b` <p class="board-browser__notice" role="status">
                  ${s(t?.stopping?`browser.dashboardStopping`:t?.paused?`browser.dashboardStopped`:`browser.loading`)}
                </p>`}
      </div>
      <div class="board-browser__footer">
        <span
          >${s(this.sessionScoped?`browser.dashboardSessionShared`:`browser.dashboardShared`)}</span
        >
        <div>
          <button
            type="button"
            class="btn btn--small"
            ?disabled=${this.pending}
            @click=${()=>void this.request(t?.stopping?`stop`:t?.paused?`resume`:`open`)}
          >
            ${s(t?.stopping?`browser.dashboardRetryStop`:t?.paused?`browser.dashboardResume`:`browser.dashboardReconnect`)}
          </button>
          ${t?.browserTab&&!t.paused?b`<button
                  type="button"
                  class="btn btn--small"
                  ?disabled=${this.pending}
                  @click=${()=>void this.request(`stop`)}
                >
                  ${s(`browser.dashboardStop`)}
                </button>`:x}
        </div>
      </div>
      ${this.error&&t?.browserTab?b`<p role="alert" class="board-browser__error">${a(this.error)}</p>`:x}
    </div>`}},r([i({context:v,subscribe:!0})],N.prototype,`context`,void 0),r([T({attribute:!1})],N.prototype,`widget`,void 0),r([T({attribute:!1})],N.prototype,`session`,void 0),r([T({type:Boolean})],N.prototype,`active`,void 0),r([C()],N.prototype,`dashboard`,void 0),r([C()],N.prototype,`error`,void 0),r([C()],N.prototype,`pending`,void 0),customElements.get(`openclaw-browser-dashboard-widget`)||customElements.define(`openclaw-browser-dashboard-widget`,N)})))()}P();