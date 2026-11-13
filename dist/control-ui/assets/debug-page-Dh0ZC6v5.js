import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{F as i,Gl as a,R as o,Zl as s,cc as c,eu as ee,hu as l,lu as u,ql as d,sc as f,su as p,uu as m}from"./control-ui-core-pYNj5S1a.js";import{Ba as h,Ji as g,Ki as _,Ma as v,Wi as y,or as b,sr as te,va as ne,vi as re,yi as ie,za as ae}from"./control-ui-core-D6clmJs8.js";import{$ as x,X as S,Y as C,c as w,ct as T,d as E,nt as D,r as O,s as k,t as A,u as j}from"./lit-runtime-DZL1fcCI.js";import{Ki as M,no as N,qi as P,ro as F}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as I,R as L,V as R,z}from"./control-ui-boot-shared-D-LYw3KU.js";import{Ar as B,At as V,Et as oe,Mt as H,Ot as U,_t as W,kr as G,xt as K}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as q,t as se}from"./control-ui-boot-shared-DCY2wZcy.js";import{n as ce,t as le}from"./settings-workspace-DKW0BVnu.js";import{i as ue,s as de}from"./presenter-CQuBX6tH.js";import{a as fe,i as pe,n as me,t as he}from"./lane-table-5a-CLehZ.js";function J(e,t){return U({title:e,stacked:!0,control:x`<pre class="code-block" role="group" aria-label=${e} tabindex="0">
${E([t],()=>O(G(JSON.stringify(t??{},null,2))))}</pre>`})}function ge(e){let t=(e.status&&typeof e.status==`object`?e.status.securityAudit:null)?.summary??null;if(!t)return S;let n=t.critical??0,r=t.warn??0,i=t.info??0,a=n>0?`danger`:r>0?`warn`:`ok`,o=n>0?l(`debug.security.critical`,{count:String(n)}):r>0?l(`debug.security.warnings`,{count:String(r)}):l(`debug.security.noCriticalIssues`),s=i>0?` · ${l(`debug.security.info`,{count:String(i)})}`:``;return U({title:l(`debug.security.audit`),description:x`
      ${l(`debug.security.runPrefix`)}
      <span class="mono">openclaw security audit --deep</span>
      ${l(`debug.security.runSuffix`)}
    `,control:H({kind:a,label:`${o}${s}`})})}function _e(e){return e?x`
    <div class="settings-row" role="alert">
      <div class="settings-row__text">
        <span class="settings-row__title">
          ${H({kind:`danger`,label:l(`common.failed`)})}
        </span>
        <span class="settings-row__desc">${e}</span>
      </div>
    </div>
  `:S}function Y(e){return e.connected||!e.offlineStable?S:U({title:H({kind:`muted`,label:l(`common.offline`)}),description:l(`debug.offlineSnapshots`)})}function ve(e){return U({title:e.event,description:i(e.ts,void 0,``),stacked:!0,control:x`<pre class="code-block" role="group" aria-label=${e.event} tabindex="0">
${E([e.payload],()=>O(G(ue(e.payload))))}</pre>`})}function ye(e){let t=e.connected&&e.loading,n=V({title:l(`debug.snapshotsTitle`),description:l(`debug.snapshotsSubtitle`),actions:x`
        <button
          class="btn"
          ?disabled=${!e.connected||e.loading}
          @click=${e.onRefresh}
        >
          ${l(t?`common.refreshing`:`common.refresh`)}
        </button>
      `},x`
      ${Y(e)} ${_e(e.diagnosticsError)}
      ${ge(e)} ${J(l(`debug.status`),e.status)}
      ${J(l(`debug.health`),e.health)}
      ${J(l(`debug.lastHeartbeat`),e.heartbeat)}
    `),r=V({title:l(`debug.lanes.title`),description:l(`debug.lanes.subtitle`),actions:x`
        <button class="btn" @click=${e.onOpenOverlay}>
          ${h()?l(`debug.overlay.open`):g(l(`debug.overlay.openWithShortcut`,{shortcut:`{shortcut}`}),_(s.debugOverlay,{inline:!0}))}
        </button>
      `},x`
      <div class="data-table-container command-lanes-table-wrap">
        <table class="data-table command-lanes-table settings-table--stacked" role="table">
          <thead>
            <tr>
              <th scope="col">${l(`debug.lanes.lane`)}</th>
              <th scope="col">${l(`debug.lanes.active`)}</th>
              <th scope="col">${l(`debug.lanes.queued`)}</th>
              <th scope="col">${l(`debug.lanes.group`)}</th>
              <th scope="col">${l(`debug.lanes.blocked`)}</th>
            </tr>
          </thead>
          <tbody>
            ${me({lanes:e.lanes,dynamic:e.dynamic})}
          </tbody>
        </table>
      </div>
    `),i=V({title:l(`debug.manualRpcTitle`),description:l(`debug.manualRpcSubtitle`)},x`
      ${U({title:l(`debug.method`),control:x`
          <select
            class="settings-select"
            aria-label=${l(`debug.method`)}
            .value=${e.callMethod}
            @change=${t=>e.onCallMethodChange(t.target.value)}
          >
            ${e.callMethod?S:x` <option value="" disabled>${l(`debug.selectMethod`)}</option> `}
            ${e.methods.map(e=>x`<option value=${e}>${e}</option>`)}
          </select>
        `})}
      ${U({title:l(`debug.paramsJson`),stacked:!0,control:x`
          <textarea
            class="settings-input"
            aria-label=${l(`debug.paramsJson`)}
            .value=${e.callParams}
            @input=${t=>e.onCallParamsChange(t.target.value)}
            rows="6"
          ></textarea>
        `})}
      ${U({title:l(`common.call`),control:x`
          <button class="btn primary" @click=${e.onCall}>${l(`common.call`)}</button>
        `})}
      ${e.callError?x`
              <div class="settings-row settings-row--stacked" role="alert">
                ${H({kind:`danger`,label:l(`debug.callFailed`)})}
                <pre
                  class="code-block"
                  role="group"
                  aria-label=${l(`debug.callFailed`)}
                  tabindex="0"
                >
${e.callError}</pre>
              </div>
            `:S}
      ${e.callResult?x`
              <div class="settings-row settings-row--stacked">
                ${H({kind:`ok`,label:l(`common.ok`)})}
                <pre
                  class="code-block"
                  role="group"
                  aria-label=${`${e.callMethod}: ${l(`common.ok`)}`}
                  tabindex="0"
                >
${E([e.callResult],()=>O(G(e.callResult)))}</pre>
              </div>
            `:S}
    `),a=V({title:l(`debug.modelsTitle`),description:l(`debug.modelsSubtitle`)},x`
      <div class="settings-row settings-row--stacked">
        <pre class="code-block" role="group" aria-label=${l(`debug.modelsTitle`)} tabindex="0">
${E([e.models],()=>O(G(JSON.stringify(e.models??[],null,2))))}</pre>
      </div>
    `),o=V({title:l(`debug.eventLogTitle`),description:l(`debug.eventLogSubtitle`)},e.eventLog.length===0?K(l(`debug.noEvents`)):w(e.eventLog,e=>e,ve));return oe(x`${n} ${r} ${i} ${a} ${o}`,{wide:!0})}function X(){return(X=e((()=>{C(),j(),k(),A(),ae(),y(),B(),W(),m(),o(),ee(),de(),he()})))()}var Z,Q;function $(){return($=e((()=>{t(),I(),C(),D(),ne(),ie(),b(),le(),d(),F(),u(),P(),c(),se(),X(),Z=3e3,Q=class extends p{constructor(...e){super(...e),this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugLanes=[],this.debugDynamic=null,this.debugCallMethod=``,this.debugCallParams=`{}`,this.debugCallResult=null,this.debugCallError=null,this.debugDiagnosticsError=null,this.debugLiveError=null,this.eventLog=[],this.polling=new M(this,Z,()=>{this.loadLiveDiagnostics()},!1,`visible`),this.callEpoch=0,this.diagnosticsTaskActiveClient=null,this.diagnosticsAgentId=null,this.diagnosticsNeedsRefresh=!0,this.diagnosticsTask=new L(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.context?.settingsAgentSelection.state.selectedId??null],task:([e,t],{signal:n})=>e?fe(e,t,n):z,onComplete:e=>{this.diagnosticsTaskActiveClient=null,this.debugDiagnosticsError=null,this.debugLiveError=null,this.debugStatus=e.status,this.debugHealth=e.health,this.debugModels=e.models,this.debugHeartbeat=e.heartbeat,this.debugLanes=e.lanes,this.debugDynamic=e.dynamic},onError:e=>{this.diagnosticsTaskActiveClient=null,this.debugDiagnosticsError=a(e)}}),this.liveTask=new L(this,{autoRun:!1,task:async([e],{signal:t})=>{if(!e)return z;let[n,r]=await Promise.all([e.request(`last-heartbeat`,{},{signal:t}),pe(e,t)]);return{heartbeat:n,...r}},onComplete:e=>{this.debugHeartbeat=e.heartbeat,this.debugLanes=e.lanes,this.debugDynamic=e.dynamic,this.debugLiveError=null},onError:e=>{this.debugLiveError=a(e)}}),this.gateway=new N(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugLanes=[],this.debugDynamic=null,this.debugCallResult=null,this.debugCallError=null,this.debugDiagnosticsError=null,this.debugLiveError=null},invalidateRequests:()=>{this.diagnosticsTask.run([null,null]),this.liveTask.run([null]),this.diagnosticsTaskActiveClient=null,this.diagnosticsNeedsRefresh=!0,this.callEpoch+=1},onSnapshot:()=>{this.syncPolling(),this.ensureInitialDebug()}}),this.subscriptions=new f(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribeEventLog(t),e=>{this.eventLog=e.eventLog}).watch(()=>this.context?.settingsAgentSelection,(e,t)=>e.subscribe(t),e=>{let t=e.state.selectedId;t!==this.diagnosticsAgentId&&(this.diagnosticsAgentId=t,this.debugModels=[],this.diagnosticsTask.run([null,null]),this.diagnosticsTaskActiveClient=null,this.diagnosticsNeedsRefresh=!0,this.loadDiagnostics())})}disconnectedCallback(){this.subscriptions.clear(),this.diagnosticsTask.run([null,null]),this.liveTask.run([null]),this.diagnosticsTaskActiveClient=null,this.diagnosticsAgentId=null,this.diagnosticsNeedsRefresh=!0,this.callEpoch+=1,super.disconnectedCallback()}syncPolling(){if(!this.gateway.connected||!this.gateway.client){this.polling.stop();return}this.polling.start()}ensureInitialDebug(){this.gateway.connected&&this.gateway.client&&this.diagnosticsNeedsRefresh&&!this.diagnosticsTaskActiveClient&&this.loadDiagnostics()}loadDiagnostics(){let e=this.gateway.connected?this.gateway.client:null;return!e||this.diagnosticsTaskActiveClient?Promise.resolve():(this.liveTask.run([null]),this.diagnosticsTaskActiveClient=e,this.diagnosticsNeedsRefresh=!1,this.diagnosticsAgentId=this.context.settingsAgentSelection.state.selectedId,this.diagnosticsTask.run([e,this.context.settingsAgentSelection.state.selectedId]))}loadLiveDiagnostics(){let e=this.gateway.connected?this.gateway.client:null;return!e||this.diagnosticsTaskActiveClient||this.liveTask.status===R.PENDING?Promise.resolve():this.liveTask.run([e])}async callDebugMethod(){let e=this.gateway.connected?this.gateway.client:null;if(!e)return;this.debugCallError=null,this.debugCallResult=null;let t=this.gateway.gateway,n=++this.callEpoch,r=()=>this.gateway.connected&&this.gateway.client===e&&this.gateway.gateway===t&&this.context.gateway===t&&this.callEpoch===n;try{let t=this.debugCallParams.trim()?JSON.parse(this.debugCallParams):{},n=await e.request(this.debugCallMethod.trim(),t);r()&&(this.debugCallResult=JSON.stringify(n,null,2))}catch(e){r()&&(this.debugCallError=a(e))}}render(){let e=ye({connected:this.gateway.connected,offlineStable:this.gateway.snapshot?.offlineStable??!1,loading:this.diagnosticsTask.status===R.PENDING,status:this.debugStatus,health:this.debugHealth,models:this.debugModels,heartbeat:this.debugHeartbeat,lanes:this.debugLanes,dynamic:this.debugDynamic,diagnosticsError:this.debugDiagnosticsError??this.debugLiveError,eventLog:this.eventLog,methods:(this.context.gateway.snapshot.hello?.features?.methods??[]).toSorted(),callMethod:this.debugCallMethod,callParams:this.debugCallParams,callResult:this.debugCallResult,callError:this.debugCallError,onCallMethodChange:e=>this.debugCallMethod=e,onCallParamsChange:e=>this.debugCallParams=e,onRefresh:()=>void this.loadDiagnostics(),onOpenOverlay:q,onCall:()=>void this.callDebugMethod()});return x`
      <section class="content-header" ${te({toolbarHeader:!0})}>
        <div>
          <div class="page-title">${v(`debug`)}</div>
        </div>
      </section>
      ${ce(e)}
    `}},n([r({context:re,subscribe:!0})],Q.prototype,`context`,void 0),n([T()],Q.prototype,`debugStatus`,void 0),n([T()],Q.prototype,`debugHealth`,void 0),n([T()],Q.prototype,`debugModels`,void 0),n([T()],Q.prototype,`debugHeartbeat`,void 0),n([T()],Q.prototype,`debugLanes`,void 0),n([T()],Q.prototype,`debugDynamic`,void 0),n([T()],Q.prototype,`debugCallMethod`,void 0),n([T()],Q.prototype,`debugCallParams`,void 0),n([T()],Q.prototype,`debugCallResult`,void 0),n([T()],Q.prototype,`debugCallError`,void 0),n([T()],Q.prototype,`debugDiagnosticsError`,void 0),n([T()],Q.prototype,`debugLiveError`,void 0),n([T()],Q.prototype,`eventLog`,void 0),customElements.get(`openclaw-debug-page`)||customElements.define(`openclaw-debug-page`,Q)})))()}$();