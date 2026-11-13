import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Ji as n,eo as r,no as i,qr as a,zr as o}from"./control-ui-foundation-C3MHh_P-.js";import{Qi as s,R as c,Xi as ee,Yi as te,hu as l,lu as u,su as d,uu as ne,w as re}from"./control-ui-core-pYNj5S1a.js";import{Ma as ie,ii as f,or as p,ri as ae,sr as oe,va as se,vi as m,yi as h}from"./control-ui-core-D6clmJs8.js";import{$ as g,X as _,Y as v,ct as y,nt as ce}from"./lit-runtime-DZL1fcCI.js";import{_ as b,g as le}from"./control-ui-boot-shared-CnK2ZXzW.js";import{Ki as x,_n as S,no as C,qi as w,ro as T}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as E,R as D,V as O,z as k}from"./control-ui-boot-shared-D-LYw3KU.js";import{Di as A,Ei as j,Mt as M,Oi as N,Ot as P,Pt as F,Ti as I,_t as L,ki as R,wi as z,xt as ue}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as B,t as V}from"./stream-auto-follow-controller-BZ0UzGsg.js";import{n as H,t as U}from"./settings-workspace-DKW0BVnu.js";function de(e){let t=[];for(let n of Object.keys(e)){if(!/^\d+$/.test(n))continue;let r=e[n];typeof r==`string`?t.push(r):r!=null&&t.push(JSON.stringify(r))}return t.join(` `)}function W(e){if(typeof e!=`string`||!e.trimStart().startsWith(`{`))return{};try{let t=JSON.parse(e);return{subsystem:typeof t.subsystem==`string`?t.subsystem:void 0,module:typeof t.module==`string`?t.module:void 0,plugin:typeof t.plugin==`string`?t.plugin:void 0}}catch{return{}}}function fe(e,t){let n=W(t?.name);if(t?.name===e[0])return n;let r=W(e[0]);return{subsystem:n.subsystem??r.subsystem,module:n.module??r.module,plugin:n.plugin??r.plugin}}function pe(e){try{let t=JSON.parse(e);if(!n(t))return null;let r=n(t._meta)?t._meta:void 0,a=fe(t,r),o=typeof r?.logLevelName==`string`?r.logLevelName:t.level;return{time:typeof t.time==`string`?t.time:typeof r?.date==`string`?r.date:void 0,level:i(o),subsystem:a.subsystem??(typeof t.subsystem==`string`?t.subsystem:void 0),module:a.module,plugin:a.plugin,message:typeof t.message==`string`?t.message:de(t),raw:e}}catch{return null}}function G(){return(G=e((()=>{})))()}function me(e){if(typeof e!=`string`)return null;let t=r(e);return q.has(t)?t:null}function he(e){let t=pe(e);if(!t)return{raw:e,message:b(e)};let n=t.subsystem??t.module;return{raw:t.raw,time:t.time??null,level:me(t.level),subsystem:n?b(n):null,message:b(t.message)}}var K,q;function J(){return(J=e((()=>{le(),G(),K={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},q=new Set([`trace`,`debug`,`info`,`warn`,`error`,`fatal`])})))()}function ge(e,t){if(!e)return``;let n=new Date(e);return Number.isNaN(n.getTime())?e:t(n.getTime())}function _e(e,t){return!t||r([e.message,e.subsystem,e.raw].filter(Boolean).join(` `)).includes(t)}function ve(e){let t=re({timeStyle:`short`}),n=r(e.filterText),i=Y.some(t=>!e.levelFilters[t]),a=e.entries.filter(t=>t.level&&!e.levelFilters[t.level]?!1:_e(t,n)),o=n||i?`filtered`:`visible`,s=l(`gatewayLogs.exportLabels.${o}`),c=e.status.hasLoaded?a.length===0?ue(l(`gatewayLogs.empty`)):a.map(e=>g`
            <div class="log-row">
              <div class="log-time mono">${ge(e.time,t)}</div>
              <div class="log-level ${e.level??``}">${e.level??``}</div>
              <div class="log-subsystem mono">${e.subsystem??``}</div>
              <div class="log-message mono">${e.message??e.raw}</div>
            </div>
          `):e.loading?f():_;return g`
    <div class="settings-section__header">
      <h2 class="settings-section__heading">${l(`gatewayLogs.title`)}</h2>
      <div class="settings-section__actions">
        <button class="btn" ?disabled=${e.refreshDisabled} @click=${e.onRefresh}>
          ${e.loading?l(`common.loading`):l(`common.refresh`)}
        </button>
        <button
          class="btn"
          ?disabled=${a.length===0}
          @click=${()=>e.onExport(a.map(e=>e.raw),o)}
        >
          ${l(`gatewayLogs.exportButton`,{label:s})}
        </button>
      </div>
    </div>
    <p class="settings-section__desc">${l(`gatewayLogs.subtitle`)}</p>
    ${R({status:e.status,className:`logs-refresh-status`})}
    <div class="settings-group logs-card">
      ${P({title:l(`gatewayLogs.filter`),description:e.file?l(`gatewayLogs.file`,{file:e.file}):void 0,control:g`
          <input
            class="settings-input"
            aria-label=${l(`gatewayLogs.filter`)}
            .value=${e.filterText}
            @input=${t=>e.onFilterTextChange(t.target.value)}
            placeholder=${l(`gatewayLogs.searchPlaceholder`)}
          />
        `})}
      <div class="settings-row">
        <div class="chip-row">
          ${Y.map(t=>g`
              <label class="chip log-chip ${t}">
                <input
                  type="checkbox"
                  .checked=${e.levelFilters[t]}
                  @change=${n=>e.onLevelToggle(t,n.target.checked)}
                />
                <span>${t}</span>
              </label>
            `)}
        </div>
        <div class="settings-row__control">
          ${F({checked:e.autoFollow,ariaLabel:l(`gatewayLogs.autoFollow`),onChange:t=>e.onToggleAutoFollow(t)})}
          <span class="settings-row__value">${l(`gatewayLogs.autoFollow`)}</span>
        </div>
      </div>
      ${e.truncated?g`
              <div class="settings-row">
                ${M({kind:`warn`,label:l(`gatewayLogs.truncated`)})}
              </div>
            `:_}
      <div
        class="log-stream"
        role="region"
        aria-label=${l(`gatewayLogs.title`)}
        tabindex="0"
        @scroll=${e.onScroll}
      >
        ${c}
      </div>
    </div>
  `}var Y;function X(){return(X=e((()=>{v(),ae(),N(),L(),ne(),c(),Y=[`trace`,`debug`,`info`,`warn`,`error`,`fatal`]})))()}var Z,Q;function $(){return($=e((()=>{t(),E(),v(),ce(),se(),h(),p(),N(),U(),ee(),T(),u(),w(),B(),J(),X(),Z=2e3,Q=class extends d{constructor(...e){super(...e),this.logsStatus=j(),this.logsFile=null,this.logsEntries=[],this.logsFilterText=``,this.logsLevelFilters={...K},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.polling=new x(this,Z,()=>{this.loadLogs({quiet:!0})},!1,`visible`),this.contentScrollFrame=null,this.logsTaskQuiet=!1,this.logsTask=new D(this,{autoRun:!1,args:()=>this.logsTaskArgs(),task:async([e,t,n,r,i],{signal:a})=>{if(!e||!t)return k;try{let e=e=>t.request(`logs.tail`,{cursor:e,limit:this.logsLimit,maxBytes:this.logsMaxBytes},{signal:a}),o=await e(i?void 0:n??void 0),s=!i&&r!==null&&o.file!==void 0&&o.file!==r;return s&&(o=await e()),{ok:!0,payload:o,cursor:n,reset:i||s}}catch(e){return{ok:!1,error:e}}},onComplete:e=>{if(!e.ok){s(e.error)?(this.logsEntries=[],this.logsStatus=A(j(),e.error,this.gateway.snapshot),this.logsStatus.error&&(this.logsStatus={...this.logsStatus,error:te(`logs`)})):this.logsStatus=A(this.logsStatus,e.error,this.gateway.snapshot);return}let t=(Array.isArray(e.payload.lines)?e.payload.lines.filter(e=>typeof e==`string`):[]).map(he),n=e.reset||e.payload.reset||e.cursor==null;this.logsEntries=n?t:[...this.logsEntries,...t].slice(-2e3),this.logsCursor=typeof e.payload.cursor==`number`?e.payload.cursor:this.logsCursor,this.logsFile=typeof e.payload.file==`string`?e.payload.file:this.logsFile,this.logsTruncated=!!e.payload.truncated,this.logsStatus=I()}}),this.gateway=new C(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.logsStatus=j(),this.logsFile=null,this.logsEntries=[],this.logsTruncated=!1,this.logsCursor=null,this.streamFollow.atBottom=!0},invalidateRequests:()=>{this.logsTaskQuiet=!1,this.logsTask.run([null,null,null,null,!1])},onSnapshot:()=>this.syncPolling(),ensureInitialData:()=>{let e=this.logsStatus.hasLoaded;this.loadLogs({reset:!0,quiet:e}).then(t=>{t&&!e&&this.streamFollow.schedule(!0)})}}),this.streamFollow=new V(this,{selector:`.log-stream`,isEnabled:()=>this.logsAutoFollow,captureCurrent:()=>{let e=this.gateway.gateway,t=this.gateway.epoch;return()=>this.isConnected&&this.gateway.connected&&e!==null&&this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.epoch===t}})}logsTaskArgs(e){return[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null,e?.reset?null:this.logsCursor,this.logsFile,e?.reset===!0]}firstUpdated(){this.resetContentScroll(),this.contentScrollFrame=requestAnimationFrame(()=>{this.contentScrollFrame=null,this.resetContentScroll()})}updated(e){let t=this.logsAutoFollow&&e.has(`logsAutoFollow`);(t||this.logsAutoFollow&&this.streamFollow.atBottom&&e.has(`logsEntries`))&&this.streamFollow.schedule(t)}disconnectedCallback(){this.logsTaskQuiet=!1,this.logsTask.run([null,null,null,null,!1]),this.contentScrollFrame!==null&&(cancelAnimationFrame(this.contentScrollFrame),this.contentScrollFrame=null),super.disconnectedCallback()}resetContentScroll(){let e=this.closest(`.content`);e&&(e.scrollTop=0,e.scrollLeft=0)}syncPolling(){if(!this.gateway.connected||!this.gateway.client){this.polling.stop();return}this.polling.start()}async loadLogs(e){let t=e?.quiet===!0,n=this.gateway.gateway;if(!n||!this.gateway.client||!this.gateway.connected||this.context.gateway!==n||this.logsTask.status===O.PENDING&&e?.reset!==!0)return!1;this.logsTaskQuiet=t,this.logsStatus=z(this.logsStatus,{clearError:!t});let r=this.gateway.epoch;return await this.logsTask.run(this.logsTaskArgs(e)),this.gateway.epoch===r&&this.logsTask.status===O.COMPLETE}render(){let e=ve({loading:this.logsTask.status===O.PENDING&&!this.logsTaskQuiet,refreshDisabled:!this.gateway.connected||this.logsTask.status===O.PENDING,status:this.logsStatus,file:this.logsFile,entries:this.logsEntries,filterText:this.logsFilterText,levelFilters:this.logsLevelFilters,autoFollow:this.logsAutoFollow,truncated:this.logsTruncated,onFilterTextChange:e=>this.logsFilterText=e,onLevelToggle:(e,t)=>{this.logsLevelFilters={...this.logsLevelFilters,[e]:t}},onToggleAutoFollow:e=>this.logsAutoFollow=e,onRefresh:()=>void this.loadLogs({reset:!0}).then(e=>{e&&this.streamFollow.schedule(!0)}),onExport:(e,t)=>{let n=new Date().toISOString().slice(0,19).replace(/[:T]/g,`-`);S(`openclaw-logs-${t}-${n}.log`,`${e.join(`
`)}\n`)},onScroll:e=>this.streamFollow.handleScroll(e)});return g`
      <section class="content-header" ${oe({toolbarHeader:!0})}>
        <div>
          <div class="page-title">${ie(`logs`)}</div>
        </div>
      </section>
      ${H(e,{fillHeight:!0})}
    `}},a([o({context:m,subscribe:!0})],Q.prototype,`context`,void 0),a([y()],Q.prototype,`logsStatus`,void 0),a([y()],Q.prototype,`logsFile`,void 0),a([y()],Q.prototype,`logsEntries`,void 0),a([y()],Q.prototype,`logsFilterText`,void 0),a([y()],Q.prototype,`logsLevelFilters`,void 0),a([y()],Q.prototype,`logsAutoFollow`,void 0),a([y()],Q.prototype,`logsTruncated`,void 0),customElements.get(`openclaw-logs-page`)||customElements.define(`openclaw-logs-page`,Q)})))()}$();