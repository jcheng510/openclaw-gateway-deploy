const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./input-dialog-BFYyIfPn.js","./input-dialog-CLHItaSF.js","./control-ui-core-D-VUH4Gq.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ba as t,Bi as n,Br as r,Ja as i,Ji as a,Ka as o,Ki as s,St as c,Ti as l,b as u,bt as d,eo as f,hi as ee,li as p,no as te,ot as ne,qa as re,qr as m,ro as h,yt as g,zi as ie,zr as ae}from"./control-ui-foundation-C3MHh_P-.js";import{C as _,Gl as oe,Jc as se,N as v,P as ce,Qi as le,R as y,Ul as ue,Wl as de,Xi as fe,cc as pe,hu as b,j as x,li as me,lu as he,qc as ge,ql as _e,sc as ve,su as ye,ui as be,uu as S}from"./control-ui-core-pYNj5S1a.js";import{Ma as xe,Ot as C,Xi as w,Zi as T,_r as Se,fr as Ce,ja as we,mr as Te,nn as Ee,or as De,rn as Oe,rt as ke,sr as Ae,st as je,va as Me,vi as Ne,yi as Pe}from"./control-ui-core-D6clmJs8.js";import{$ as E,X as D,Y as O,c as Fe,ct as k,i as Ie,nt as Le,o as A,s as Re,ut as ze}from"./lit-runtime-DZL1fcCI.js";import{ct as Be,st as Ve}from"./control-ui-boot-shared-CES8Ypkl.js";import{d as He,l as Ue}from"./gateway-runtime-iOL78mIi.js";import{Ji as We,Ki as Ge,Nr as Ke,Pr as qe,Xi as Je,no as Ye,qi as Xe,ro as Ze}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as Qe,R as j,V as $e,z as M}from"./control-ui-boot-shared-D-LYw3KU.js";import{C as et,S as N,g as tt,k as nt}from"./config-runtime-CgOgfOrG.js";import{At as P,Et as rt,Hr as it,It as at,Mt as F,Ot as I,Pt as ot,To as st,Wr as ct,Ya as lt,_t as L,wo as ut,wt as dt,xt as ft,yt as pt}from"./control-ui-boot-shared-DJ4XCcp6.js";import{A as mt,M as ht,O as gt,gt as _t,j as R,k as vt}from"./control-ui-boot-new-CaEHEcx2.js";import{n as yt,t as bt}from"./desktop-focus-window-BTBanODK.js";import{_ as xt,a as St,c as Ct,d as wt,f as Tt,g as Et,h as Dt,i as z,l as Ot,m as kt,n as At,o as B,p as jt,r as Mt,s as Nt,t as Pt,u as Ft,v as It}from"./page-operations-BF3Go8p-.js";import{n as Lt,t as Rt}from"./settings-workspace-DKW0BVnu.js";import{n as zt,r as Bt}from"./system-info-BXt4emol.js";import{n as Vt,t as Ht}from"./capacity-meter-8ZQIkt5P.js";import{n as Ut,t as Wt}from"./en-devices-l_IXqKvo.js";function Gt(e){return Oe(void 0,({render:t,finish:n})=>{let r=!1,i=()=>n(),a=t=>{if(!e.secret){i();return}t.preventDefault(),!r&&(r=!0,s())},o=e.secret?`btn primary`:`btn secret-reveal__dismiss`,s=()=>{t(()=>E`
          <openclaw-modal-dialog
            label=${e.title}
            description=${e.message}
            @modal-cancel=${a}
          >
            <div class="exec-approval-card">
              <div class="secret-reveal__header">
                ${e.status===`success`?E`<span class="secret-reveal__status" aria-hidden="true"
                        >${w.check}</span
                      >`:D}
                <div class="exec-approval-title">${e.title}</div>
              </div>
              <div class="secret-reveal__body"><p>${e.message}</p></div>
              ${e.callout?E`<div class="callout info secret-reveal__callout">${e.callout}</div>`:D}
              ${e.secret?E`
                      <div class="secret-reveal__value">
                        <code class="secret-reveal__code">${e.secret}</code>
                        ${ct(e.secret,b(`common.copy`))}
                      </div>
                    `:D}
              ${r?E`<p class="secret-reveal__hint" role="status">${e.dismissHint}</p>`:D}
              ${e.note?E`<p class="secret-reveal__note">${e.note}</p>`:D}
              <div class="exec-approval-actions">
                <button type="button" class=${o} autofocus @click=${i}>
                  ${e.acknowledgeLabel}
                </button>
              </div>
            </div>
          </openclaw-modal-dialog>
        `)};s()})}function Kt(){return(Kt=e((()=>{O(),S(),it(),T(),Ee()})))()}function qt(e){if(!a(e))return;if(e.status===`missing`&&Object.keys(e).length===1)return{status:`missing`};let t=h(e.version);return e.status===`installed`&&t&&Object.keys(e).length===2?{status:`installed`,version:t}:void 0}function Jt(e){let t=h(e.nodeId);if(!t)return null;let n=h(e.approvalState);return{nodeId:t,displayName:h(e.displayName),platform:h(e.platform),deviceFamily:h(e.deviceFamily),version:h(e.version),coreVersion:h(e.coreVersion),uiVersion:h(e.uiVersion),modelIdentifier:h(e.modelIdentifier),clientId:h(e.clientId),clientMode:h(e.clientMode),remoteIp:h(e.remoteIp),caps:o(e.caps),commands:o(e.commands),approvalState:n&&ln.has(n)?n:void 0,pendingRequestId:h(e.pendingRequestId),workerSlots:Be(e.workerSlots)??void 0,workerBundle:qt(e.workerBundle),hostStats:cn.safeParse(e.hostStats).data,connected:e.connected===!0,paired:e.paired===!0,connectedAtMs:p(e.connectedAtMs),lastSeenAtMs:p(e.lastSeenAtMs),approvedAtMs:p(e.approvedAtMs)}}function Yt(...e){let t;for(let n of e)n!==void 0&&(t===void 0||n>t)&&(t=n);return t}function Xt(e,t,n,r){let a=t?i([...t.roles??[],t.role]):[];n?.paired&&!a.includes(`node`)&&a.push(`node`);let s=h(t?.operatorLabel),c=h(t?.displayName)??h(n?.displayName),l=h(t?.clientId)??n?.clientId;return{id:e,name:s??c??l??e,displayName:c,clientId:l,clientMode:h(t?.clientMode)??n?.clientMode,platform:h(r?.platform)??h(t?.platform)??n?.platform,deviceFamily:h(r?.deviceFamily)??h(t?.deviceFamily)??n?.deviceFamily,version:h(r?.version)??n?.version,modelIdentifier:h(r?.modelIdentifier)??n?.modelIdentifier,remoteIp:h(t?.remoteIp)??n?.remoteIp,roles:a,scopes:o(t?.scopes),connected:n?.connected===!0||t?.connected===!0,autoApproved:t?.approvedVia===`silent`||t?.approvedVia===`trusted-cidr`||t?.approvedVia===`ssh-verified`,lastSeenAtMs:Yt(t?.lastSeenAtMs,n?.lastSeenAtMs,n?.connectedAtMs,p(r?.ts)),approvedAtMs:Yt(t?.approvedAtMs,n?.approvedAtMs),presence:r,device:t,node:n}}function Zt(e){let t=e.displayName?.trim().toLowerCase();if(t)return`name:${t}`;let n=e.clientId?.trim().toLowerCase(),r=e.clientMode?.trim().toLowerCase();return n||r?`client:${n??``}:${r??``}`:`id:${e.id}`}function Qt(e){return e.lastSeenAtMs??e.approvedAtMs??0}function $t(e,t){if(e.connected!==t.connected)return e.connected?-1:1;let n=Qt(t)-Qt(e);return n===0?e.id.localeCompare(t.id):n}function en(e,t){let n=$t(e.primary,t.primary);return n===0?e.name.localeCompare(t.name):n}function tn(e){let t=new Map;for(let n of e.nodes){let e=Jt(n);e&&t.set(e.nodeId,e)}let n=new Map;for(let t of e.presence??[])for(let e of[t.deviceId,t.instanceId]){let r=h(e)?.toLowerCase();r&&n.set(r,t)}let r=[],i=new Set;for(let a of e.paired){let e=h(a.deviceId);e&&!i.has(e)&&(i.add(e),r.push(Xt(e,a,t.get(e),n.get(e.toLowerCase()))))}for(let[e,a]of t)i.has(e)||r.push(Xt(e,void 0,a,n.get(e.toLowerCase())));let a=new Map;for(let e of r){let t=Zt(e),n=a.get(t);n?n.push(e):a.set(t,[e])}let o=[];for(let[e,t]of a){let n=t.toSorted($t),r=n[0];r&&o.push({key:e,name:r.name,primary:r,duplicates:n.slice(1)})}return o.toSorted(en)}function nn(e){return e.flatMap(e=>e.duplicates.filter(e=>!e.connected&&(e.autoApproved||e.device!==void 0&&e.device.approvedVia===void 0)))}function rn(e){return e.find(e=>h(e.mode)?.toLowerCase()===`gateway`)}function an(e,t){let n=new Set;for(let e of t)for(let t of[e.primary,...e.duplicates])n.add(t.id.toLowerCase());return e.filter(e=>{if(h(e.mode)?.toLowerCase()===`gateway`||h(e.reason)?.toLowerCase()===`disconnect`)return!1;let t=[e.deviceId,e.instanceId].map(e=>h(e)?.toLowerCase()).filter(e=>e!==void 0);return t.length===0&&!h(e.host)&&!h(e.mode)?!1:!t.some(e=>n.has(e))})}function on(e){let t=e.roles.includes(`node`),n=e.roles.filter(e=>e!==`node`);return{removeNode:t||e.node?.paired===!0,removeDevice:!!e.device&&(n.length>0||e.roles.length===0)}}function sn(e){let t=new Map;for(let n of e){let e=(n.deviceId??n.instanceId)?.trim().toLowerCase();if(!e||n.mode?.trim().toLowerCase()===`gateway`)continue;let r=n.roles?.includes(`node`)?`${e}:node`:e;t.set(r,n.reason?.trim().toLowerCase()===`disconnect`?`offline`:`connected`)}return JSON.stringify([...t].toSorted(([e],[t])=>e.localeCompare(t)))}var cn,ln;function V(){return(V=e((()=>{ee(),t(),tt(),Ve(),cn=et({cpuCount:N().int().positive(),loadAverage:nt([N().nonnegative(),N().nonnegative(),N().nonnegative()]).optional(),memoryTotalBytes:N().positive(),memoryFreeBytes:N().nonnegative(),diskTotalBytes:N().positive().optional(),diskAvailableBytes:N().nonnegative().optional(),updatedAtMs:N().nonnegative()}).refine(e=>e.memoryFreeBytes<=e.memoryTotalBytes&&(e.diskAvailableBytes===void 0||e.diskTotalBytes===void 0||e.diskAvailableBytes<=e.diskTotalBytes)),ln=new Set([`approved`,`pending-approval`,`pending-reapproval`,`unapproved`])})))()}var un;function dn(){return(dn=e((()=>{ut(),S(),_e(),z(),n(),un=class{constructor(e){this.host=e,this.pending=null}cancel(){this.pending?.abort(),this.pending=null}async editAlias(e){if(!this.host.canManagePairing()||this.pending)return;let t=new AbortController;this.pending=t;try{let{showInputDialog:n}=await ie(async()=>{let{showInputDialog:e}=await import(`./input-dialog-BFYyIfPn.js`);return{showInputDialog:e}},__vite__mapDeps([0,1,2]),import.meta.url);await n({signal:t.signal,title:b(`devices.inventory.renameTitle`,{name:e.name}),label:b(`devices.inventory.renamePrompt`),defaultValue:e.operatorLabel??``,requireValue:!0,requireChange:!0,submit:t=>this.host.canManagePairing()?this.host.runPageTask(n=>kt(n,{deviceId:e.id,label:t})):Promise.resolve(b(`devices.readOnly.pairingRequired`))})}catch(e){this.host.setDevicesError(oe(e))}finally{this.pending===t&&(this.pending=null)}}confirmInventoryRemoval(e){if(!this.host.canManagePairing())return Promise.resolve();if(e.kind===`entry`){let t=e.entry;return this.confirmDestructiveAction({title:b(`devices.inventory.removePromptTitle`,{name:t.name}),message:b(`devices.inventory.removePromptBody`),details:b(`devices.inventory.deviceId`,{id:t.id}),confirmLabel:b(`devices.inventory.remove`)},e=>Tt(e,t))}let t=e.entries;return this.confirmDestructiveAction({title:b(t.length===1?`devices.inventory.removeStalePromptTitleOne`:`devices.inventory.removeStalePromptTitle`,{count:String(t.length)}),message:b(`devices.inventory.removeStalePromptBody`),confirmLabel:b(`devices.inventory.remove`)},e=>jt(e,t))}confirmPairingReject(e,t){return this.host.canManagePairing()?this.confirmDestructiveAction({title:b(e===`device`?`devices.inventory.rejectDevicePromptTitle`:`devices.inventory.rejectNodePromptTitle`),message:b(`devices.inventory.rejectPromptBody`),confirmLabel:b(`devices.inventory.reject`)},n=>e===`device`?Ot(n,t):Ft(n,t)):Promise.resolve()}confirmTokenRevoke(e,t){return this.host.canManagePairing()?this.confirmDestructiveAction({title:b(`devices.inventory.revokePromptTitle`,{role:t}),message:b(`devices.inventory.revokePromptBody`),details:b(`devices.inventory.deviceId`,{id:e}),confirmLabel:b(`devices.inventory.revoke`)},n=>Dt(n,{deviceId:e,gatewayUrl:this.host.gatewayUrl(),role:t})):Promise.resolve()}async confirmDestructiveAction(e,t){if(this.pending)return;let n=new AbortController;this.pending=n;let r=this.host.requestGeneration(),i=this.host.gatewayClient(),a=await st({...e,danger:!0,signal:n.signal});this.pending===n&&(this.pending=null),a&&!n.signal.aborted&&r===this.host.requestGeneration()&&i===this.host.gatewayClient()&&this.host.gatewayConnected()&&this.host.canManagePairing()&&await this.host.runPageTask(t)}}})))()}function fn(e){let t=s(e);return Array.isArray(t.nodes)?t.nodes:[]}function pn(){return(pn=e((()=>{})))()}function mn(e){return f(e.normalize(`NFC`)).replace(/(?=\p{M})\p{Emoji_Component}/gu,``).replace(/(?<![\p{L}\p{M}\p{N}])\p{M}+/gu,``).replace(/[^\p{L}\p{M}\p{N}]+/gu,`-`).replace(/^-+/,``).replace(/-+$/,``)}function hn(e){return e.map(e=>e.displayName||e.remoteIp||e.nodeId).filter(Boolean).join(`, `)}function gn(e){let t=e.displayName||e.remoteIp||e.nodeId,n=[`node=${e.nodeId}`],r=h(e.clientId);return r&&n.push(`client=${r}`),`${t} [${n.join(`, `)}]`}function _n(e){return(te(e)??``).startsWith(`openclaw-`)}function vn(e){let t=te(e)??``;return t.startsWith(`clawdbot-`)||t.startsWith(`moldbot-`)}function yn(e){let t=e.filter(e=>_n(e.clientId));if(t.length!==1)return;let n=e.filter(e=>vn(e.clientId)).length;if(n!==0&&t.length+n===e.length)return t[0]}function bn(e,t,n,r){let i=typeof e.displayName==`string`?e.displayName:``,a=i?mn(i):``;return a&&a===n?2e3:r!==void 0&&a&&a.replace(/-/g,``)===r?1900:t.length>=6&&e.nodeId.startsWith(t)?1e3:0}function xn(e,t,n=!1){let r=t.trim();if(!r)throw Error(`node required`);let i=e.filter(e=>e.nodeId===r);if(i.length===0&&(i=e.filter(e=>e.remoteIp===r)),i.length===0){let t=mn(r),a=n?t.replace(/-/g,``):void 0,o=0;e.forEach(e=>{let n=bn(e,r,t,a);n>o&&(o=n,i.length=0),n>0&&n===o&&i.push(e)})}if(i.length===0){let t=hn(e);throw Error(`unknown node: ${r}${t?` (known: ${t})`:``}`)}let a=i.filter(e=>e.connected===!0),o=a.length>0?a:i;if(o.length===1)return o[0]?.nodeId??``;let s=yn(o);if(s)return s.nodeId;throw Error(`ambiguous node: ${r} (matches: ${o.map(gn).join(`, `)})`)}function Sn(){return(Sn=e((()=>{})))()}function Cn(e){let t=a(e?.agents)?e.agents:null,n=a(t?.entries)?t.entries:{},r=[];for(let[e,t]of Object.entries(n)){if(!a(t))continue;let n=h(t.name),i=t.default===!0;r.push({id:e,name:n,isDefault:i,record:t})}return r}function wn(e,t){let n=[];for(let r of e){let e=Array.isArray(r.commands)?r.commands:[],i=new Set(e.map(String));if(!t.every(e=>i.has(e)))continue;let a=h(r.nodeId)??``;if(!a)continue;let o=h(r.displayName)??a;n.push({id:a,label:o===a?a:`${o} · ${a}`})}return n.sort((e,t)=>e.label.localeCompare(t.label)),n}function Tn(e){let t=e.platform?.trim().toLowerCase()??``,n=e.modelIdentifier?.trim()??``,r=e.clientId?.trim().toLowerCase()??``,i=e.clientMode?.trim().toLowerCase()??``;if(n.startsWith(`Watch`)||En.test(t)||r===g.WATCHOS_APP)return R.watch;if(n.startsWith(`iPad`)||Dn.test(t))return R.tablet;if(n.startsWith(`iPhone`)||On.test(t)||kn.has(r))return R.smartphone;if(An.has(r)||i===d.WEBCHAT)return R.browser;if(jn.has(i)||Mn.has(r))return R.terminal;if(i===`gateway`)return R.server;switch(mt(n)){case`laptop`:return R.laptop;case`mini`:return R.macMini;case`studio`:case`pro`:return R.pcCase;case`imac`:return R.allInOne;default:return w.monitor}}function H(e){return E`
    <div class="device-entry__tile" aria-hidden="true">
      <span class="device-entry__tile-icon">${e}</span>
    </div>
  `}var En,Dn,On,kn,An,jn,Mn;function U(){return(U=e((()=>{O(),c(),ht(),T(),gt(),En=/\bwatchos\b/,Dn=/\b(ipados|ipad)\b/,On=/\b(ios|android|iphone)\b/,kn=new Set([g.IOS_APP,g.ANDROID_APP]),An=new Set([g.CONTROL_UI,g.WEBCHAT_UI,g.WEBCHAT]),jn=new Set([d.CLI,d.BACKEND,d.PROBE,d.TEST]),Mn=new Set([g.CLI,g.TUI])})))()}function Nn(e){return e===`allowlist`||e===`full`||e===`deny`?e:`deny`}function Pn(e){return e===`always`||e===`off`||e===`on-miss`?e:`on-miss`}function Fn(e,t,n){let r=e?.defaults??{},i=n?e?.agents?.[`*`]??{}:{};return{security:Nn(i.security??r.security??t?.security),ask:Pn(i.ask??r.ask??t?.ask),askFallback:Nn(i.askFallback??r.askFallback??t?.askFallback??`deny`),autoAllowSkills:i.autoAllowSkills??r.autoAllowSkills??t?.autoAllowSkills??!1}}function In(e,t){let n=Cn(e),r=Object.keys(t?.agents??{}),i=new Map;n.forEach(e=>i.set(e.id,e)),r.forEach(e=>{i.has(e)||i.set(e,{id:e})});let a=Array.from(i.values());return a.length===0&&a.push({id:`main`,isDefault:!0}),a.sort((e,t)=>{if(e.isDefault&&!t.isDefault)return-1;if(!e.isDefault&&t.isDefault)return 1;let n=e.name?.trim()?e.name:e.id,r=t.name?.trim()?t.name:t.id;return n.localeCompare(r)}),a}function Ln(e,t){return e===W?W:e&&t.some(t=>t.id===e)?e:W}function Rn(e){let t=e.execApprovalsSnapshot,n=St(t)?t:null,r=t&&!St(t)?t:null,i=n?null:e.execApprovalsForm??r?.file??null,a=!!(i||n),o=In(e.configForm,i),s=wn(e.nodes,[`system.execApprovals.get`,`system.execApprovals.set`]),c=e.execApprovalsTarget,l=c===`node`&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;c===`node`&&l&&!s.some(e=>e.id===l)&&(l=null);let u=Ln(e.execApprovalsSelectedAgent,o),d=Fn(i,r?.resolvedDefaults,u!==W),f=u===W?null:(i?.agents??{})[u]??null,ee=Array.isArray(f?.allowlist)?f.allowlist??[]:[];return{ready:a,disabled:!e.canAdmin||e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:i,nativePolicy:n,defaults:d,selectedScope:u,selectedAgent:f,agents:o,allowlist:ee,target:c,targetNodeId:l,targetNodes:s,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals,canAdmin:e.canAdmin}}function zn(e){let t=e.ready,n=e.target!==`node`||!!e.targetNodeId,r=E`
    <button
      class="btn"
      ?disabled=${e.disabled||!e.dirty||!n||!!e.nativePolicy}
      @click=${e.onSave}
    >
      ${e.saving?b(`common.saving`):b(`common.save`)}
    </button>
  `,i=E`
    ${e.canAdmin?E`
            ${Vn(e)}
            ${t?e.nativePolicy?Bn(e.nativePolicy):E`${Hn(e)} ${Wn(e)}`:I({title:b(`devices.execApprovals.loadHint`),control:E`
                      <button
                        class="btn"
                        ?disabled=${e.loading||!n}
                        @click=${e.onLoad}
                      >
                        ${e.loading?b(`common.loading`):b(`common.loadApprovals`)}
                      </button>
                    `})}
          `:I({title:b(`devices.readOnly.adminRequired`)})}
  `;return E`
    ${P({title:b(`devices.execApprovals.title`),description:E`
          ${b(`devices.execApprovals.subtitlePrefix`)}
          <span class="mono">exec host=gateway/node</span>.
        `,actions:r},i)}
    ${e.canAdmin&&t&&!e.nativePolicy&&e.selectedScope!==W?Gn(e):D}
  `}function Bn(e){let t=e.enabled&&Array.isArray(e.rules)?e.rules:[],n=e.enabled?e.defaultAction:e.message??`unavailable`;return E`
    ${I({title:b(`devices.execApprovals.hostNativePolicy`),description:b(`devices.execApprovals.hostNativeHint`),control:at(b(`devices.execApprovals.native`))})}
    ${I({title:b(`devices.execApprovals.defaultAction`),description:n,control:at(b(t.length===1?`devices.execApprovals.rule`:`devices.execApprovals.rules`,{count:String(t.length)}))})}
    ${t.map(e=>I({title:e.pattern,description:E`
          ${e.action} · ${e.shells?.join(`, `)||b(`devices.execApprovals.allShells`)} ·
          ${e.enabled===!1?b(`devices.execApprovals.off`):b(`devices.execApprovals.on`)}
          ${e.description?E`<br />${_(e.description,120)}`:D}
        `}))}
  `}function Vn(e){let t=e.targetNodes.length>0,n=e.targetNodeId??``;return E`
    ${I({title:b(`devices.execApprovals.target`),description:b(`devices.execApprovals.targetHint`),control:E`
        <select
          class="settings-select"
          aria-label=${b(`devices.execApprovals.host`)}
          .value=${A(e.target)}
          ?disabled=${e.disabled}
          @change=${t=>{if(t.target.value===`node`){let t=e.targetNodes[0]?.id??null;e.onSelectTarget(`node`,n||t)}else e.onSelectTarget(`gateway`,null)}}
        >
          <option value="gateway" ?selected=${e.target===`gateway`}>
            ${b(`devices.execApprovals.gateway`)}
          </option>
          <option value="node" ?selected=${e.target===`node`}>
            ${b(`devices.execApprovals.node`)}
          </option>
        </select>
      `})}
    ${e.target===`node`?I({title:b(`devices.execApprovals.node`),description:t?void 0:b(`devices.execApprovals.noNodes`),control:E`
              <select
                class="settings-select"
                aria-label=${b(`devices.execApprovals.node`)}
                .value=${A(n)}
                ?disabled=${e.disabled||!t}
                @change=${t=>{let n=t.target.value.trim();e.onSelectTarget(`node`,n||null)}}
              >
                <option value="" ?selected=${n===``}>
                  ${b(`devices.execApprovals.selectNode`)}
                </option>
                ${e.targetNodes.map(e=>E`<option value=${e.id} ?selected=${n===e.id}>
                      ${e.label}
                    </option>`)}
              </select>
            `}):D}
  `}function Hn(e){let t=[{value:W,label:b(`devices.execApprovals.defaults`),icon:w.settings},...e.agents.map(e=>({value:e.id,label:e.name?.trim()?`${e.name} (${e.id})`:e.id,agent:{id:e.id,...e.name?{name:e.name}:{}},badge:e.isDefault?b(`agents.default`):void 0}))];return I({title:b(`devices.execApprovals.scope`),stacked:!0,control:E`
      <openclaw-agent-select
        class="agent-select--settings"
        .options=${t}
        .value=${e.selectedScope}
        .accessibleLabel=${b(`devices.execApprovals.scope`)}
        .disabled=${e.disabled}
        .onSelect=${e.onSelectScope}
      ></openclaw-agent-select>
    `})}function Un(e,t){return E`
    <select
      class="settings-select"
      aria-label=${t.ariaLabel}
      .value=${A(t.currentValue)}
      ?disabled=${e.disabled}
      @change=${n=>{let r=n.target.value;!t.isDefaults&&r===`__default__`?e.onRemove([...t.basePath,t.key]):e.onPatch([...t.basePath,t.key],r)}}
    >
      ${t.isDefaults?D:E`<option value="__default__" ?selected=${t.currentValue===`__default__`}>
              ${b(`devices.execApprovals.useDefaultValue`,{value:t.defaultValue})}
            </option>`}
      ${t.values.map(e=>E`<option value=${e.value} ?selected=${t.currentValue===e.value}>
            ${b(e.labelKey)}
          </option>`)}
    </select>
  `}function Wn(e){let t=e.selectedScope===W,n=e.defaults,r=e.selectedAgent??{},i=t?[`defaults`]:[`agents`,e.selectedScope],a=typeof r.autoAllowSkills==`boolean`?r.autoAllowSkills:void 0,o=a??n.autoAllowSkills,s=a==null;return E`
    ${[{key:`security`,descriptionKey:`devices.execApprovals.defaultSecurity`,ariaLabelKey:`devices.execApprovals.mode`,values:G},{key:`ask`,descriptionKey:`devices.execApprovals.defaultPrompt`,ariaLabelKey:`devices.execApprovals.mode`,values:qn},{key:`askFallback`,descriptionKey:`devices.execApprovals.promptUnavailable`,ariaLabelKey:`devices.execApprovals.fallback`,values:G}].map(({key:a,descriptionKey:o,ariaLabelKey:s,values:c})=>{let l=typeof r[a]==`string`?r[a]:void 0;return I({title:b(`devices.execApprovals.${a}`),description:t?b(o):l===void 0?void 0:b(`devices.execApprovals.defaultValue`,{value:n[a]}),control:Un(e,{key:a,ariaLabel:b(s),values:c,currentValue:t?n[a]:l??`__default__`,defaultValue:n[a],isDefaults:t,basePath:i})})})}
    ${I({title:b(`devices.execApprovals.autoAllowSkills`),description:t?b(`devices.execApprovals.autoAllowSkillsHint`):s?void 0:b(`devices.execApprovals.override`,{value:b(o?`devices.execApprovals.on`:`devices.execApprovals.off`)}),control:E`
        ${!t&&!s?E`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,`autoAllowSkills`])}
              >
                ${b(`devices.execApprovals.useDefault`)}
              </button>`:D}
        ${ot({checked:o,disabled:e.disabled,ariaLabel:b(`devices.execApprovals.autoAllowSkills`),onChange:t=>e.onPatch([...i,`autoAllowSkills`],t)})}
      `})}
  `}function Gn(e){let t=[`agents`,e.selectedScope,`allowlist`],n=e.allowlist;return P({title:b(`devices.execApprovals.allowlist`),description:b(`devices.execApprovals.allowlistHint`),actions:E`
        <button
          class="btn btn--sm"
          ?disabled=${e.disabled}
          @click=${()=>{let r=[...n,{pattern:``}];e.onPatch(t,r)}}
        >
          ${b(`devices.execApprovals.addPattern`)}
        </button>
      `},n.length===0?ft(b(`devices.execApprovals.emptyAllowlist`)):n.map((t,n)=>Kn(e,t,n)))}function Kn(e,t,n){let r=t.lastUsedAt?v(t.lastUsedAt):b(`common.never`),i=t.lastUsedCommand?_(t.lastUsedCommand,120):null,a=t.lastResolvedPath?_(t.lastResolvedPath,120):null;return I({title:t.pattern?.trim()?t.pattern:b(`devices.execApprovals.newPattern`),description:E`
      ${b(`devices.execApprovals.lastUsed`,{time:r})}
      ${i?E`<br /><span class="mono">${i}</span>`:D}
      ${a?E`<br /><span class="mono">${a}</span>`:D}
    `,control:E`
      <input
        class="settings-input"
        type="text"
        aria-label=${b(`devices.execApprovals.pattern`)}
        .value=${t.pattern??``}
        ?disabled=${e.disabled}
        @input=${t=>{let r=t.target;e.onPatch([`agents`,e.selectedScope,`allowlist`,n,`pattern`],r.value)}}
      />
      <button
        class="btn btn--sm danger"
        ?disabled=${e.disabled}
        @click=${()=>{if(e.allowlist.length<=1){e.onRemove([`agents`,e.selectedScope,`allowlist`]);return}e.onRemove([`agents`,e.selectedScope,`allowlist`,n])}}
      >
        ${b(`devices.execApprovals.remove`)}
      </button>
    `})}var W,G,qn;function Jn(){return(Jn=e((()=>{O(),Ie(),_t(),T(),L(),S(),y(),z(),U(),W=`__defaults__`,G=[{value:`deny`,labelKey:`devices.execApprovals.options.deny`},{value:`allowlist`,labelKey:`devices.execApprovals.options.allowlist`},{value:`full`,labelKey:`devices.execApprovals.options.full`}],qn=[{value:`off`,labelKey:`devices.execApprovals.options.off`},{value:`on-miss`,labelKey:`devices.execApprovals.options.onMiss`},{value:`always`,labelKey:`devices.execApprovals.options.always`}]})))()}function Yn(e){let t=e.workerSlots;if(t){let n=e.unavailable?null:t.total-t.available,r=n===null?b(`capacityMeter.unavailable`):b(`capacityMeter.workerSlots`,{used:String(n),total:String(t.total)}),i=e.unavailable?`stale`:t.available===0?`warn`:`accent`;return{label:r,title:n===null?void 0:r,meter:Vt({mode:`discrete`,total:t.total,used:n,tone:i,label:r})}}if(!(e.capabilities?.some(e=>e===`codex.exec-server`||e===`codex.exec-server.stdio.v1`)||e.commands?.includes(`codex.exec-server.stdio.v1`)))return;let n=b(`capacityMeter.execHost`);return{label:n,title:n,meter:E`<span class="capacity-meter-exec" role="img" aria-label=${n}>
      <span aria-hidden="true">${w.terminal}</span>${n}
    </span>`}}function Xn(){return(Xn=e((()=>{O(),S(),Ht(),T()})))()}function Zn(e,t,n){return E`
    <span class="device-capability" role="listitem" title=${n}>
      <span class="device-capability__icon" aria-hidden="true">${e}</span>
      <span>${t}</span>
    </span>
  `}function Qn(e){if(e.length===0)return D;let t=[...new Set(e.map(e=>e===`codex-cli-session-source`?`codex-cli-sessions`:e))],n=t.filter(e=>K.has(e)),r=t.filter(e=>!K.has(e)),i=r.slice(0,er-+(n.length>0)),a=r.length-i.length,o=b(n.length===1?`devices.capabilities.runtime`:`devices.capabilities.runtimes`,{count:String(n.length)}),s=n.join(`, `);return E`
    <div class="device-capabilities" role="list" aria-label=${b(`devices.inventory.capabilities`)}>
      ${n.length>0?Zn(w.squareTerminal,o,s):D}
      ${i.map(e=>{let t=$n.get(e);return Zn(t?.icon??w.puzzle,t?b(`devices.capabilities.${t.key}.label`):e,t?b(`devices.capabilities.${t.key}.description`):e)})}
      ${a>0?E`<span
              class="device-capability device-capability--overflow"
              role="listitem"
              title=${b(`devices.capabilities.overflow`,{count:String(a)})}
              >+${a}</span
            >`:D}
    </div>
  `}var $n,K,er;function tr(){return(tr=e((()=>{O(),T(),S(),Wt(),Ut(),$n=new Map(Object.entries({browser:{icon:w.globe,key:`browser`},canvas:{icon:w.panelsTopLeft,key:`canvas`},screen:{icon:w.monitor,key:`screen`},computer:{icon:w.monitorSmartphone,key:`computer`},file:{icon:w.folder,key:`file`},system:{icon:w.terminal,key:`system`},mcp:{icon:w.plug,key:`mcp`},"local-inference":{icon:w.cpu,key:`localInference`},camera:{icon:w.camera,key:`camera`},talk:{icon:w.mic,key:`talk`},location:{icon:w.target,key:`location`},notifications:{icon:w.bell,key:`notifications`},contacts:{icon:w.users,key:`contacts`},calendar:{icon:w.calendarClock,key:`calendar`},reminders:{icon:w.listChecks,key:`reminders`},device:{icon:w.smartphone,key:`device`},photos:{icon:w.image,key:`photos`},sms:{icon:w.messageSquare,key:`sms`},health:{icon:w.activity,key:`health`},motion:{icon:w.radio,key:`motion`}})),K=new Set([`claude-sessions`,`codex-cli-sessions`,`codex-app-server-threads`,`opencode-sessions`,`pi-sessions`]),er=16})))()}function nr(e,t){return e.desktopEnvironments?.find(e=>e.id===t&&e.desktop===!0)?.id}async function rr(e){let t=await me(e);de({message:b(t?`devices.inventory.deviceIdCopied`:`common.copyFailed`)})}function q(e,t){if(!t.deviceId&&!t.desktopEnvironment)return D;let n=e.canManagePairing?D:b(`devices.readOnly.pairingRequired`);return E`
    <wa-dropdown
      placement="bottom-end"
      @wa-select=${n=>{switch(n.detail.item.value){case`desktop`:t.desktopEnvironment&&yt(e.basePath,t.desktopEnvironment);break;case`copy`:t.deviceId&&rr(t.deviceId);break;case`editAlias`:e.canManagePairing&&t.onEditAlias?.();break;case`approve`:e.canManagePairing&&t.pendingRequestId&&e.onNodeApprove(t.pendingRequestId);break;case`reject`:e.canManagePairing&&t.pendingRequestId&&e.onNodeReject(t.pendingRequestId);break;case`remove`:e.canManagePairing&&t.onRemove?.()}}}
    >
      <button
        slot="trigger"
        type="button"
        class="btn btn--sm btn--ghost device-entry__menu-trigger"
        aria-label=${b(`devices.inventory.actionsName`,{name:t.name})}
        title=${b(`devices.inventory.actions`)}
      >
        ${w.moreHorizontal}
      </button>
      ${t.desktopEnvironment?E`<wa-dropdown-item value="desktop"
              >${b(`devices.inventory.openDesktop`)}</wa-dropdown-item
            >`:D}
      ${t.pendingRequestId?E`
              <wa-dropdown-item
                value="approve"
                ?disabled=${!e.canManagePairing}
                title=${n}
                >${b(`devices.inventory.approve`)}</wa-dropdown-item
              >
              <wa-dropdown-item
                value="reject"
                ?disabled=${!e.canManagePairing}
                title=${n}
                >${b(`devices.inventory.reject`)}</wa-dropdown-item
              >
            `:D}
      ${t.deviceId?E`<wa-dropdown-item value="copy"
              >${b(`devices.inventory.copyDeviceId`)}</wa-dropdown-item
            >`:D}
      ${t.onEditAlias?E`<wa-dropdown-item
              value="editAlias"
              ?disabled=${!e.canManagePairing}
              title=${n}
              >${b(`devices.inventory.editAlias`)}</wa-dropdown-item
            >`:D}
      ${t.onRemove?E`<wa-dropdown-item
              value="remove"
              variant="danger"
              ?disabled=${!e.canManagePairing}
              title=${n}
              >${b(`devices.inventory.removeAction`)}</wa-dropdown-item
            >`:D}
    </wa-dropdown>
  `}function J(){return(J=e((()=>{O(),bt(),T(),lt(),S(),be(),ue()})))()}function Y(e){return l(e,{style:`legacy-binary`,maxUnit:`tera`,separator:` `,fractionDigits:(e,t)=>+(t===`tera`||e<10)})}function X(e,t,n,r,i,a=80,o=90){let s=i===void 0?t<a?`ok`:t<o?`warn`:`danger`:`stale`,c=i===void 0?n:`${n} · ${i}`,l=i===void 0?r:`${r} · ${b(`devices.inventory.lastKnown`,{time:i})}`;return E`<span class="device-resource device-resource--${e}" title=${l}>
    <span class="device-resource__label">${c}</span>
    ${Vt({mode:`continuous`,percent:Math.min(100,Math.max(0,t)),tone:s,label:l})}
  </span>`}function ir(e,t){if(!e)return D;let n=t===void 0?void 0:ce(Math.max(0,Date.now()-t)),r=[];if(e.loadAverage&&e.cpuCount>0){let t=b(`devices.inventory.loadTitle`,{averages:e.loadAverage.map(e=>e.toFixed(2)).join(` / `),cores:String(e.cpuCount)});r.push(X(`load`,e.loadAverage[0]/e.cpuCount*100,b(`devices.inventory.loadLabel`,{load:e.loadAverage[0].toFixed(1)}),t,n,70,100))}if(e.memoryTotalBytes>0&&e.memoryFreeBytes>=0){let t=e.memoryTotalBytes-e.memoryFreeBytes,i=Y(t),a=Y(e.memoryTotalBytes),o=a.slice(a.lastIndexOf(` `)),s=i.endsWith(o)?i.slice(0,-o.length):i;r.push(X(`memory`,t/e.memoryTotalBytes*100,`${s} / ${a}`,b(`devices.inventory.memoryTitle`,{used:i,total:a}),n))}if(e.diskTotalBytes!=null&&e.diskTotalBytes>0&&e.diskAvailableBytes!=null){let t=Y(e.diskAvailableBytes),i=Y(e.diskTotalBytes);r.push(X(`disk`,(1-e.diskAvailableBytes/e.diskTotalBytes)*100,b(`devices.inventory.diskLabel`,{available:t}),b(`devices.inventory.diskTitle`,{available:t,total:i}),n))}return r.length?E`<div class="device-resources">${r}</div>`:D}function ar(){return(ar=e((()=>{O(),Ht(),S(),y()})))()}function Z(...e){let t=new Set;for(let n of e)for(let e of re(n))t.add(e);return[...t].toSorted()}function or(e,t){let n=new Set(e);return t.every(e=>n.has(e))}function sr(e){return{roles:Z(e.roles,e.role),scopes:ne(e.scopes)}}function cr(e){let t=Z(e.roles,e.role),n=Array.isArray(e.tokens)?e.tokens:e.tokens?Object.values(e.tokens):void 0;return{roles:n===void 0?t:Z(n.filter(e=>!e.revokedAtMs).flatMap(e=>e.role??[])).filter(e=>t.includes(e)),scopes:ne(e.scopes)}}function lr(e,t){let n=sr(e),r=t?cr(t):null;return r?or(r.roles,n.roles)?or(r.scopes,n.scopes)?{kind:`re-approval`,requested:n,approved:r}:{kind:`scope-upgrade`,requested:n,approved:r}:{kind:`role-upgrade`,requested:n,approved:r}:{kind:`new-pairing`,requested:n,approved:null}}function ur(){return(ur=e((()=>{t()})))()}function dr(e,t,n){let r=new Map(t.map(e=>[h(e.deviceId),e]).filter(e=>!!e[0]));return e.map(e=>hr(e,n,fr(r,e)))}function fr(e,t){let n=h(t.deviceId);if(!n)return;let r=e.get(n);if(!r)return;let i=h(t.publicKey),a=h(r.publicKey);if(!(i&&a&&i!==a))return r}function pr(e){return e?b(`devices.inventory.rolesAndScopes`,{roles:x(e.roles),scopes:x(e.scopes)}):b(`devices.inventory.none`)}function mr(e){switch(e){case`scope-upgrade`:return b(`devices.inventory.scopeUpgrade`);case`role-upgrade`:return b(`devices.inventory.roleUpgrade`);case`re-approval`:return b(`devices.inventory.reapproval`);case`new-pairing`:return b(`devices.inventory.newPairing`)}throw Error(`unsupported pending approval kind`)}function hr(e,t,n){let r=h(e.displayName)||e.deviceId,i=typeof e.ts==`number`?v(e.ts):b(`common.na`),a=lr(e,n),o=e.isRepair?` · ${b(`devices.inventory.repair`)}`:``;return E`
    <div class="settings-row device-entry">
      ${H(w.monitorSmartphone)}
      <div class="device-entry__body">
        <div class="device-entry__heading">
          <span class="settings-row__title">${r}</span>
          <span class="device-entry__status"
            >${F({kind:`warn`,label:b(`devices.inventory.pendingApproval`)})}</span
          >
        </div>
        <span class="settings-row__desc">
          ${b(`devices.inventory.requestedAt`,{note:mr(a.kind),time:i})}${o}
        </span>
      </div>
      <div class="settings-row__control">
        <button
          class="btn btn--sm"
          ?disabled=${!t.canManagePairing}
          @click=${()=>t.onDeviceApprove(e.requestId)}
        >
          ${b(`devices.inventory.approve`)}
        </button>
        <button
          class="btn btn--sm"
          ?disabled=${!t.canManagePairing}
          @click=${()=>t.onDeviceReject(e.requestId)}
        >
          ${b(`devices.inventory.reject`)}
        </button>
        ${q(t,{name:r,deviceId:e.deviceId})}
      </div>
      <details class="device-entry__details">
        <summary>${b(`devices.inventory.details`)}</summary>
        <dl class="device-entry__facts">
          <dt class="settings-row__desc">${b(`devices.inventory.deviceIdLabel`)}</dt>
          <dd class="settings-row__value settings-row__value--mono" title=${e.deviceId}>
            ${e.deviceId}
          </dd>
          ${e.remoteIp?E`<dt class="settings-row__desc">${b(`devices.inventory.remoteIpLabel`)}</dt>
                  <dd class="settings-row__value settings-row__value--mono">${e.remoteIp}</dd>`:D}
          <dt class="settings-row__desc">${b(`devices.inventory.requestedAccessLabel`)}</dt>
          <dd class="settings-row__value">${pr(a.requested)}</dd>
          ${a.approved?E`<dt class="settings-row__desc">
                    ${b(`devices.inventory.approvedAccessLabel`)}
                  </dt>
                  <dd class="settings-row__value">${pr(a.approved)}</dd>`:D}
        </dl>
      </details>
    </div>
  `}function gr(){return(gr=e((()=>{O(),ur(),T(),L(),S(),y(),J(),U()})))()}function _r(e){let t=on(e);return{id:e.id,name:e.name,...t}}function vr(e,t,n){if(n&&e.length===0)return``;let r=e.filter(e=>e.primary.connected).length,i=[b(`devices.inventory.summaryConnected`,{connected:String(r),total:String(e.length)})];return t>0&&i.push(b(`devices.inventory.summaryPending`,{count:String(t)})),i.join(` · `)}function yr(e){let t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],r=Array.isArray(t.paired)?t.paired:[],i=tn({paired:r,nodes:e.nodes,presence:e.presence}),a=rn(e.presence),o=an(e.presence,i),s=nn(i),c=e.loading||e.devicesLoading,l=E`
    ${s.length>0?E`
            <button
              class="btn btn--sm danger"
              title=${e.canManagePairing?``:b(`devices.readOnly.pairingRequired`)}
              ?disabled=${!e.canManagePairing}
              @click=${()=>e.onInventoryCleanup(s.map(_r))}
            >
              ${w.trash} ${b(`devices.inventory.cleanupStale`,{count:String(s.length)})}
            </button>
          `:D}
    <button
      class="btn"
      title=${e.canPairDevice?``:b(`devices.pairing.adminRequired`)}
      ?disabled=${!e.canPairDevice}
      @click=${e.onDevicePairSetupOpen}
    >
      ${w.plus} ${b(`devices.pairing.button`)}
    </button>
  `,u=i.length===0&&!a,d=E`
    ${a?Ar({kind:`gateway`,entry:a},e):D}
    ${c&&i.length===0?dt():u?ft(b(`devices.inventory.empty`)):i.map(t=>br(t,e))}
  `;return E`
    ${e.devicesError?E`<div class="callout danger">${e.devicesError}</div>`:D}
    ${e.lastError?E`<div class="callout danger">${e.lastError}</div>`:D}
    ${n.length>0?P({title:b(`devices.inventory.pendingApproval`),count:n.length},dr(n,r,e)):D}
    ${P({title:b(`devices.inventory.title`),description:vr(i,n.length,c),actions:l},d)}
    ${o.length>0?P({title:b(`devices.inventory.connectedWithoutPairing`)},o.map(t=>Ar({kind:`unpaired`,entry:t},e))):D}
  `}function br(e,t){return e.duplicates.length===0?Q(e.primary,t):E`
    ${Q(e.primary,t)}
    <details class="device-group__dups">
      <summary>
        ${b(e.duplicates.length===1?`devices.inventory.olderPairing`:`devices.inventory.olderPairings`,{count:String(e.duplicates.length),name:e.name})}
      </summary>
      ${e.duplicates.map(e=>Q(e,t))}
    </details>
  `}function xr(e){let t=h(e)?.toLowerCase();return t===`win32`||t===`windows`||t?.startsWith(`windows `)===!0}function Sr(e){let t=e.node;return t?.paired?t.approvalState===void 0||t.approvalState===`approved`:!1}function Cr(e){let t=h(e.node?.coreVersion);if(t)return t;if(h(e.node?.uiVersion))return;let n=h(e.node?.platform)?.toLowerCase();return n===`darwin`||n===`linux`||n===`win32`||n===`windows`?h(e.node?.version):void 0}function wr(e,t){let n=[],r=Sr(e),i=Cr(e),a=h(t);if(r&&i&&a&&i!==a){let e=b(`devices.inventory.versionDriftTitle`,{nodeVersion:i,gatewayVersion:a});n.push(E`<span title=${e}>
        ${F({kind:`warn`,label:b(`devices.inventory.versionDrift`)})}
      </span>`)}e.node?.workerBundle?.status===`missing`&&n.push(E`<span title=${b(`devices.inventory.workerMissingTitle`)}>
        ${F({kind:`warn`,label:b(`devices.inventory.workerMissing`)})}
      </span>`),r&&e.node?.connected===!1&&xr(e.platform)&&n.push(E`<span title=${b(`devices.inventory.manualWakeTitle`)}>
        ${F({kind:`warn`,label:b(`devices.inventory.manualWake`)})}
      </span>`);let o=e.node?.approvalState;return(o===`pending-approval`||o===`pending-reapproval`)&&n.push(F({kind:`warn`,label:b(`devices.inventory.approvalNeeded`)})),n}function Tr(e){return b(`devices.inventory.inputAgo`,{time:ce(e*1e3,{suffix:!1})})}function Er(e){let t=[];if(e.platform&&t.push(qe(e.platform,e.deviceFamily)),e.modelIdentifier){let n=vt(e.modelIdentifier);n&&t.push(n),t.push(e.modelIdentifier)}return e.version&&t.push(e.version),t}function Dr(e){let t=Er(e);e.node?.workerBundle?.status===`installed`&&t.push(b(`devices.inventory.workerVersion`,{version:e.node.workerBundle.version})),e.connected&&e.presence?.lastInputSeconds!=null?t.push(Tr(e.presence.lastInputSeconds)):!e.connected&&e.lastSeenAtMs?t.push(b(`devices.inventory.seen`,{time:v(e.lastSeenAtMs)})):!e.connected&&e.approvedAtMs&&t.push(b(`devices.inventory.approved`,{time:v(e.approvedAtMs)}));for(let n of e.roles)t.push(n);return e.autoApproved&&t.push(b(`devices.inventory.autoPaired`)),t.join(` · `)}function Or(e){if(e.length===0)return D;let t=e.slice(0,Nr),n=e.length-t.length,r=n>0?` +${n}`:``;return E`<dt class="settings-row__desc">${b(`devices.inventory.commands`)}</dt>
    <dd class="settings-row__value settings-row__value--mono">${x(t)}${r}</dd>`}function kr(e,t){let n=e.device?.tokens??[],r=e.node?.commands??[],i=e.scopes;return E`
    <details class="device-entry__details">
      <summary>${b(`devices.inventory.details`)}</summary>
      <dl class="device-entry__facts">
        <dt class="settings-row__desc">${b(`devices.inventory.deviceIdLabel`)}</dt>
        <dd class="settings-row__value settings-row__value--mono" title=${e.id}>${e.id}</dd>
        ${e.remoteIp?E`<dt class="settings-row__desc">${b(`devices.inventory.remoteIpLabel`)}</dt>
                <dd class="settings-row__value settings-row__value--mono">${e.remoteIp}</dd>`:D}
        ${i.length>0?E`<dt class="settings-row__desc">${b(`devices.inventory.scopesLabel`)}</dt>
                <dd class="device-entry__scopes">
                  ${i.map(e=>E`<span class="device-capability device-capability--scope"
                        >${e}</span
                      >`)}
                </dd>`:D}
        ${n.length>0?E`<dt class="settings-row__desc">${b(`devices.inventory.tokens`)}</dt>
                <dd class="device-entry__tokens">
                  <table
                    class="device-token-table settings-table--stacked"
                    role="table"
                    aria-label=${b(`devices.inventory.tokens`)}
                  >
                    <thead>
                      <tr>
                        <th scope="col">${b(`devices.inventory.tokenRole`)}</th>
                        <th scope="col">${b(`devices.inventory.tokenStatus`)}</th>
                        <th scope="col">${b(`devices.inventory.scopesLabel`)}</th>
                        <th scope="col">${b(`devices.inventory.tokenAge`)}</th>
                        <th scope="col">${b(`devices.inventory.actions`)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${n.map(n=>Mr({id:e.id,name:e.name},n,t))}
                    </tbody>
                  </table>
                </dd>`:D}
        ${Or(r)}
      </dl>
    </details>
  `}function Q(e,t){let n=Yn({workerSlots:e.node?.workerSlots,capabilities:e.node?.caps,commands:e.node?.commands,unavailable:e.node?.connected!==!0||!Sr(e)}),r=e.node?.approvalState===`pending-approval`||e.node?.approvalState===`pending-reapproval`?e.node.pendingRequestId:void 0,i=nr(t,`node:${e.id}`),a=e.node?.connected??e.connected,o=F(a?{kind:`ok`,label:b(`devices.inventory.connected`)}:{kind:`muted`,label:b(`devices.inventory.offline`)});return E`
    <div class="settings-row device-entry" title=${n?.title??D}>
      ${H(Tn(e))}
      <div class="device-entry__body">
        <div class="device-entry__heading">
          <span class="settings-row__title">${e.name}</span>
          <span class="device-entry__status">${o}</span>
        </div>
        <span class="settings-row__desc">${Dr(e)}</span>
        ${ir(e.node?.hostStats,a?void 0:e.node?.hostStats?.updatedAtMs)}
        ${Qn(e.node?.caps??[])}
      </div>
      <div class="settings-row__control">
        ${n?.meter??D} ${wr(e,t.gatewayVersion)}
        ${jr(t,i,e.node?.commands)}
        ${q(t,{name:e.name,deviceId:e.id,desktopEnvironment:i,pendingRequestId:r,onEditAlias:e.device?()=>t.onDeviceRename({id:e.id,name:e.name,operatorLabel:e.device?.operatorLabel}):void 0,onRemove:()=>t.onInventoryRemove(_r(e))})}
      </div>
      ${kr(e,t)}
    </div>
  `}function Ar(e,t){let{entry:n}=e,r=e.kind===`gateway`,i=Er(n);n.lastInputSeconds!=null&&i.push(Tr(n.lastInputSeconds)),r&&t.gatewaySystemInfo&&i.push(b(`devices.inventory.uptime`,{time:We(t.gatewaySystemInfo.uptimeMs)??``})),!r&&Array.isArray(n.roles)&&i.push(...n.roles.filter(Boolean));let a=r?w.server:Tn({clientMode:n.mode??void 0,platform:n.platform??void 0,modelIdentifier:n.modelIdentifier??void 0}),o=r?n.host??b(`devices.execApprovals.gateway`):n.host??n.mode??b(`devices.inventory.unknownClient`),s=r?nr(t,`gateway`):void 0;return E`
    <div class="settings-row device-entry">
      ${H(a)}
      <div class="device-entry__body">
        <div class="device-entry__heading">
          <span class="settings-row__title">${o}</span>
          <span class="device-entry__status">
            ${F(r?{kind:`accent`,label:b(`devices.inventory.gateway`)}:{kind:`muted`,label:b(`devices.inventory.unpaired`)})}
          </span>
        </div>
        ${i.length>0?E`<span class="settings-row__desc">${i.join(` · `)}</span>`:D}
        ${r?ir(t.gatewaySystemInfo):D}
      </div>
      <div class="settings-row__control">
        ${jr(t,s)}
        ${q(t,{name:o,deviceId:n.deviceId,desktopEnvironment:s})}
      </div>
    </div>
  `}function jr(e,t,n){return t?E`<button
      class="btn btn--sm device-entry__desktop"
      title=${b(`devices.inventory.desktopOpenWindow`)}
      @click=${()=>yt(e.basePath,t)}
    >
      ${w.monitor} ${b(`devices.inventory.desktop`)}
    </button>`:n?.includes(`desktop.stream`)?E`<span
        class="device-capability device-capability--disabled"
        aria-disabled="true"
        title=${b(`devices.inventory.desktopEnableHint`)}
        >${w.monitor} ${b(`devices.inventory.desktop`)}</span
      >`:D}function Mr(e,t,n){let r=t.revokedAtMs?b(`devices.inventory.revoked`):b(`devices.inventory.active`),i=x(t.scopes),a=v(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return E`
    <tr>
      <td data-label=${b(`devices.inventory.tokenRole`)}>${t.role}</td>
      <td data-label=${b(`devices.inventory.tokenStatus`)}>${r}</td>
      <td data-label=${b(`devices.inventory.scopesLabel`)}>${i}</td>
      <td data-label=${b(`devices.inventory.tokenAge`)}>${a}</td>
      <td data-label=${b(`devices.inventory.actions`)}>
        <div class="device-entry__token-actions">
          <button
            class="btn btn--sm"
            ?disabled=${!n.canManagePairing}
            @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
          >
            ${b(`devices.inventory.rotate`)}
          </button>
          ${t.revokedAtMs?D:E`
                  <button
                    class="btn btn--sm danger"
                    ?disabled=${!n.canManagePairing}
                    @click=${()=>n.onDeviceRevoke(e.id,t.role)}
                  >
                    ${b(`devices.inventory.revoke`)}
                  </button>
                `}
        </div>
      </td>
    </tr>
  `}var Nr;function Pr(){return(Pr=e((()=>{O(),bt(),T(),L(),Xn(),S(),Je(),y(),gt(),V(),Ke(),tr(),J(),ar(),gr(),U(),Nr=16})))()}function Fr(e){let t=Ir(e),n=Rn(e);return rt(E`
      ${!e.canManagePairing||!e.canAdmin?E`<div class="callout info" role="note">
              ${b(!e.canManagePairing&&!e.canAdmin?`devices.readOnly.pairingAndAdminRequired`:e.canManagePairing?`devices.readOnly.adminRequired`:`devices.readOnly.pairingRequired`)}
            </div>`:D}
      ${yr(e)} ${zn(n)}
      ${Lr(t)}
    `,{wide:!0})}function Ir(e){return{...e,...Br(e.configForm),ready:!!e.configForm,disabled:!e.canAdmin||e.configLoading||e.configSaving||e.configFormMode===`raw`,nodes:wn(e.nodes,[`system.run`]),inventory:fn({nodes:e.nodes})}}function Lr(e){let t=e.nodes.length>0,n=E`
    <button
      class="btn"
      ?disabled=${e.disabled||!e.configDirty}
      @click=${e.onSaveBindings}
    >
      ${e.configSaving?b(`common.saving`):b(`common.save`)}
    </button>
  `,r=E`
    ${e.canAdmin?D:I({title:b(`devices.readOnly.adminRequired`)})}
    ${e.configFormMode===`raw`?I({title:b(`devices.binding.formModeHint`)}):D}
    ${e.ready?E`
            ${I({title:b(`devices.binding.defaultBinding`),description:t?b(`devices.binding.defaultBindingHint`):E`${b(`devices.binding.defaultBindingHint`)} ${b(`devices.binding.noNodes`)}`,control:zr(null,e)})}
            ${e.agents.length===0?I({title:b(`devices.binding.noAgents`)}):e.agents.map(t=>Rr(t,e))}
          `:I({title:b(`devices.binding.loadConfigHint`),control:E`
              <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
                ${e.configLoading?b(`common.loading`):b(`common.loadConfig`)}
              </button>
            `})}
  `;return P({title:b(`devices.binding.execNodeBinding`),description:b(`devices.binding.execNodeBindingSubtitle`),actions:n},r)}function Rr(e,t){let n=e.binding??`__default__`,r=e.name?.trim()?`${e.name} (${e.id})`:e.id;return I({title:r,description:E`
      ${e.isDefault?b(`devices.binding.defaultAgent`):b(`devices.binding.agent`)} ·
      ${n===`__default__`?b(`devices.binding.usesDefault`,{node:t.defaultBinding??b(`devices.binding.any`)}):b(`devices.binding.override`,{node:e.binding??``})}
    `,control:zr(e,t)})}function zr(e,t){let n=e===null,r=n?``:`__default__`,i=n?t.defaultBinding??``:e.binding??`__default__`,a;if(i!==r)try{a=xn(t.inventory,i)}catch{}let o=t.nodes.map(e=>({...e,id:e.id===a?i:e.id,disabled:!1}));return i!==r&&!o.some(e=>e.id===i)&&o.push({id:i,label:`${i} (${b(`devices.binding.unavailable`)})`,disabled:!0}),E`
    <select
      class="settings-select"
      aria-label=${b(n?`devices.binding.node`:`devices.binding.binding`)}
      .value=${A(i)}
      ?disabled=${t.disabled||t.nodes.length===0&&i===r}
      @change=${n=>{let r=n.target.value.trim();e===null?t.onBindDefault(r||null):t.onBindAgent(e.id,r===`__default__`?null:r)}}
    >
      <option value=${r} ?selected=${i===r}>
        ${b(n?`devices.binding.anyNode`:`devices.binding.useDefault`)}
      </option>
      ${Fe(o,e=>e.id,e=>E`<option
            value=${e.id}
            ?selected=${i===e.id}
            ?disabled=${e.disabled}
          >
            ${e.label}
          </option>`)}
    </select>
  `}function Br(e){let t={id:`main`,name:void 0,isDefault:!0,binding:null};if(!e||typeof e!=`object`)return{defaultBinding:null,agents:[t]};let n=(e.tools??{}).exec??{},r=typeof n.node==`string`&&n.node.trim()?n.node.trim():null,i=Cn(e).map(e=>{let t=(e.record.tools??{}).exec??{},n=typeof t.node==`string`&&t.node.trim()?t.node.trim():null;return{id:e.id,name:e.name,isDefault:e.isDefault,binding:n}});return i.length===0?{defaultBinding:r,agents:[t]}:{defaultBinding:r,agents:i}}function Vr(){return(Vr=e((()=>{O(),Ie(),Re(),pn(),Sn(),L(),S(),Jn(),Pr(),U()})))()}var Hr,Ur,Wr,$;function Gr(){return(Gr=e((()=>{r(),Qe(),O(),Le(),u(),Me(),Pe(),Se(),ke(),De(),Kt(),L(),Rt(),S(),se(),fe(),Ue(),V(),z(),zt(),Ze(),he(),Xe(),pe(),dn(),Vr(),Hr=`https://docs.openclaw.ai/nodes`,Ur=3e4,Wr=6e4,$=class extends ye{constructor(...e){super(...e),this.presence=[],this.gatewaySystemInfo=null,this.desktopEnvironments=[],this.systemInfoUnavailable=!1,this.pageState=Mt(),this.canPairDevice=!1,this.canManagePairing=!1,this.canAdmin=!1,this.execApprovalsTarget=`gateway`,this.execApprovalsTargetNodeId=null,this.dialogs=new un({canManagePairing:()=>this.canManagePairing,gatewayConnected:()=>this.gateway.connected,requestGeneration:()=>this.requestGeneration,gatewayClient:()=>this.gateway.client,gatewayUrl:()=>this.context.gateway.connection.gatewayUrl,runPageTask:e=>this.runPageTask(e),setDevicesError:e=>{this.pageState.devicesError=e,this.requestUpdate()}}),this.routeDataInitialized=!1,this.gateway=new Ye(this,{getGateway:()=>this.context?.gateway,onIdentityChange:e=>this.resetServerState(e.snapshot),invalidateRequests:e=>{this.pageState.requestGeneration=this.gateway.epoch,!e.identityChanged&&e.snapshot.phase!==`connected`&&this.resetServerState(e.snapshot),this.presenceTask.run([null,null])},onSnapshot:e=>this.handleGatewaySnapshot(e),ensureInitialData:()=>this.ensureInitialData()}),this.presenceTask=new j(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?t.request(`system-presence`,{},{signal:n}):M,onComplete:e=>{Array.isArray(e)&&(this.presence=e)},onError:e=>{le(e)&&(this.presence=[])}}),this.systemInfoTask=new j(this,{args:()=>[this.gateway.gateway,this.canLoadSystemInfo?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?Bt(e,n).then(e=>e.value):M,onComplete:e=>{this.gatewaySystemInfo=e,this.systemInfoPolling.stop(),this.systemInfoPolling.start()},onError:e=>{le(e)&&(this.gatewaySystemInfo=null,this.systemInfoUnavailable=!0,this.systemInfoPolling.stop())}}),this.environmentsTask=new j(this,{args:()=>[this.gateway.gateway,this.canLoadDesktopEnvironments?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?t.request(`environments.list`,{},{signal:n}):M,onComplete:e=>{this.desktopEnvironments=e.environments},onError:()=>{this.desktopEnvironments=[]}}),this.systemInfoPolling=new Ge(this,Wr,()=>this.refreshSystemInfo(),!1,`visible`),this.polling=new Ge(this,Ur,()=>{this.refreshNodeInventory(!0),this.canManagePairing&&this.runPageTask(e=>B(e,{quiet:!0}))},!1,`visible`),this.subscriptions=new ve(this).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{if(this.gateway.gateway!==e||this.context.gateway!==e)return;let n=t.event===`presence`?C(t.payload):null;if(n){let e=sn(n)!==sn(this.presence);this.presenceTask.run([null,null]),this.presence=n,e&&(this.canManagePairing&&this.runPageTask(e=>B(e,{quiet:!0})),this.refreshNodeInventory(!0))}(t.event===`device.pair.changed`||t.event===`device.pair.requested`||t.event===`device.pair.resolved`)&&this.canManagePairing&&this.runPageTask(e=>B(e,{quiet:!0})),(t.event===`node.pair.requested`||t.event===`node.pair.resolved`||t.event===`node.runnerInventory.changed`||t.event===`node.hostStats`)&&this.refreshNodeInventory(!0)}))}willUpdate(e){e.has(`routeData`)&&this.applyRouteData()}updated(e){e.has(`routeData`)&&this.ensureInitialData()}disconnectedCallback(){this.dialogs.cancel(),this.subscriptions.clear(),this.presenceTask.run([null,null]),this.resetInventoryDetails(),this.presence=[],this.canPairDevice=!1,this.canManagePairing=!1,this.canAdmin=!1,super.disconnectedCallback()}get requestGeneration(){return this.pageState.requestGeneration}handleGatewaySnapshot(e){let t=e.snapshot;if(this.pageState.client=t.client,this.pageState.connected=t.phase===`connected`,this.pageState.requestGeneration=this.gateway.epoch,this.syncGatewayState(t),this.canLoadSystemInfo||(this.systemInfoTask.run([null,null]),this.gatewaySystemInfo=null),this.canLoadDesktopEnvironments||(this.environmentsTask.run([null,null]),this.desktopEnvironments=[]),this.routeDataInitialized&&t.phase===`connected`&&t.client&&(e.identityChanged||e.connectionChanged)){let e=C(t.hello?.snapshot);this.presence=e??[],this.loadPresence()}this.syncPolling()}syncGatewayState(e){let t=e.phase===`connected`,n=e.hello?.auth??null;this.canAdmin=t&&Ce(n),this.canManagePairing=t&&(!n||Te(n)),this.canPairDevice=this.canAdmin}applyRouteData(){let e=this.routeData;if(!e)return;this.routeDataInitialized=!0;let t=this.context.gateway.snapshot;if(!this.gateway.isRouteDataCurrent(e)){this.resetServerState(t),this.presence=C(t.hello?.snapshot)??[],this.loadPresence(),this.ensureInitialData();return}this.pageState={...e.devices,client:t.client,connected:t.phase===`connected`,requestGeneration:this.gateway.epoch};let n=C(t.hello?.snapshot);n&&(this.presence=n),this.loadPresence()}resetServerState(e){this.dialogs.cancel(),this.pageState.requestGeneration+=1;let t=Mt({client:e.client,connected:e.phase===`connected`});t.requestGeneration=this.gateway.epoch,this.pageState=t,this.presenceTask.run([null,null]),this.presence=[],this.resetInventoryDetails()}async runPageTask(e){let t=this.pageState;try{let n=e(t);return this.pageState===t&&this.requestUpdate(),await n}finally{this.pageState===t&&this.requestUpdate()}}ensureInitialData(){let e=this.pageState;if(!e.connected||!e.client||!this.routeDataInitialized)return;!e.nodes.length&&!e.nodesLoading&&this.refreshNodeInventory(),this.canManagePairing&&!e.devicesList&&!e.devicesLoading&&this.runPageTask(e=>B(e));let t=this.context.runtimeConfig.state;!t.configSnapshot&&!t.configLoading&&this.context.runtimeConfig.refresh(),this.canAdmin&&!e.execApprovalsSnapshot&&!e.execApprovalsLoading&&this.runPageTask(e=>Nt(e,this.resolveExecApprovalsTarget()))}syncPolling(){if(this.canLoadSystemInfo?this.systemInfoPolling.start():this.systemInfoPolling.stop(),this.gateway.connected&&this.gateway.client){this.polling.start();return}this.polling.stop()}get canLoadSystemInfo(){let e=this.gateway.snapshot;return this.isConnected&&e?.phase===`connected`&&!this.systemInfoUnavailable&&He(e,`system.info`)===!0}get canLoadDesktopEnvironments(){let e=this.gateway.snapshot;return this.isConnected&&!!(e&&je(e))}refreshSystemInfo(){this.canLoadSystemInfo&&this.systemInfoTask.status!==$e.PENDING&&this.systemInfoTask.run()}refreshNodeInventory(e=!1){this.refreshSystemInfo(),this.canLoadDesktopEnvironments&&this.environmentsTask.status!==$e.PENDING&&this.environmentsTask.run(),this.runPageTask(t=>Ct(t,{quiet:e}))}resetInventoryDetails(){this.systemInfoTask.run([null,null]),this.environmentsTask.run([null,null]),this.systemInfoPolling.stop(),this.gatewaySystemInfo=null,this.desktopEnvironments=[],this.systemInfoUnavailable=!1}loadPresence(){let e=this.gateway.gateway,t=this.gateway.client;return!e||!this.gateway.connected||!t?Promise.resolve():this.presenceTask.run([e,t])}async reportRotationOutcome(e,t,n){if(!this.canManagePairing)return;let r=await this.runPageTask(r=>Et(r,{deviceId:e.id,gatewayUrl:this.context.gateway.connection.gatewayUrl,role:t,scopes:n}));r&&await(r.delivery===`in-band`?Gt({title:b(`devices.inventory.rotatePromptTitle`,{role:t}),message:b(`devices.inventory.rotatePromptBody`),secret:r.token,acknowledgeLabel:b(`devices.inventory.rotateAcknowledge`),dismissHint:b(`devices.inventory.rotateDismissHint`)}):Gt({title:b(`devices.inventory.rotateWithheldTitle`,{device:e.name}),status:`success`,message:b(`devices.inventory.rotateWithheldNext`),callout:b(`devices.inventory.rotateWithheldException`),acknowledgeLabel:b(`common.close`),note:b(`devices.inventory.rotateWithheldNote`)}))}resolveExecApprovalsTarget(){return this.execApprovalsTarget===`node`&&this.execApprovalsTargetNodeId?{kind:`node`,nodeId:this.execApprovalsTargetNodeId}:{kind:`gateway`}}render(){let e=this.pageState,t=this.context.runtimeConfig.state,n=this.context.gateway.snapshot,r=n.phase===`connected`&&n.hello?.server?.version?.trim()||null;return E`
      <section class="content-header" ${Ae({toolbarHeader:!0})}>
        <div>
          <div class="page-title">${xe(`devices`)}</div>
          <div class="page-subtitle">
            ${we(`devices`)} ${pt(Hr)}
          </div>
        </div>
      </section>
      ${Lt(Fr({loading:e.nodesLoading,nodes:e.nodes,presence:this.presence,gatewayVersion:r,basePath:this.context.basePath,gatewaySystemInfo:this.gatewaySystemInfo,desktopEnvironments:this.desktopEnvironments,lastError:e.lastError,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,canPairDevice:this.canPairDevice,canManagePairing:this.canManagePairing,canAdmin:this.canAdmin,configForm:ge(t),configLoading:t.configLoading,configSaving:t.configSaving,configDirty:t.configFormDirty,configFormMode:t.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:this.execApprovalsTarget,execApprovalsTargetNodeId:this.execApprovalsTargetNodeId,onDevicePairSetupOpen:()=>{this.canAdmin&&this.context.overlays.openDevicePairSetup()},onDeviceApprove:e=>{this.canManagePairing&&this.runPageTask(t=>Pt(t,e))},onDeviceReject:e=>void this.dialogs.confirmPairingReject(`device`,e),onNodeApprove:e=>{this.canManagePairing&&this.runPageTask(t=>At(t,e))},onNodeReject:e=>void this.dialogs.confirmPairingReject(`node`,e),onInventoryRemove:e=>void this.dialogs.confirmInventoryRemoval({kind:`entry`,entry:e}),onInventoryCleanup:e=>{e.length>0&&this.dialogs.confirmInventoryRemoval({kind:`stale`,entries:e})},onDeviceRotate:(e,t,n)=>void this.reportRotationOutcome(e,t,n),onDeviceRevoke:(e,t)=>void this.dialogs.confirmTokenRevoke(e,t),onDeviceRename:e=>void this.dialogs.editAlias(e),onLoadConfig:()=>void this.context.runtimeConfig.discardDraft({reloadOnly:!0}),onLoadExecApprovals:()=>this.canAdmin?void this.runPageTask(e=>Nt(e,this.resolveExecApprovalsTarget())):void 0,onBindDefault:e=>{this.canAdmin&&(e?this.context.runtimeConfig.patchForm([`tools`,`exec`,`node`],e):this.context.runtimeConfig.removeFormValue([`tools`,`exec`,`node`]))},onBindAgent:(e,t)=>{if(!this.canAdmin)return;let n=this.context.runtimeConfig.agentEntry(e,{ensure:!!t});if(!n)return;let r=[...n.path,`tools`,`exec`,`node`];t?this.context.runtimeConfig.patchForm(r,t):this.context.runtimeConfig.removeFormValue(r)},onSaveBindings:()=>{this.canAdmin&&this.context.runtimeConfig.save()},onExecApprovalsTargetChange:(t,n)=>{this.execApprovalsTarget=t,this.execApprovalsTargetNodeId=n,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null,this.requestUpdate()},onExecApprovalsSelectAgent:t=>{e.execApprovalsSelectedAgent=t,this.requestUpdate()},onExecApprovalsPatch:(e,t)=>this.canAdmin?void this.runPageTask(n=>It(n,e,t)):void 0,onExecApprovalsRemove:e=>this.canAdmin?void this.runPageTask(t=>wt(t,e)):void 0,onSaveExecApprovals:()=>this.canAdmin?void this.runPageTask(e=>xt(e,this.resolveExecApprovalsTarget())):void 0}))}
    `}},m([ae({context:Ne,subscribe:!0})],$.prototype,`context`,void 0),m([ze({attribute:!1})],$.prototype,`routeData`,void 0),m([k()],$.prototype,`presence`,void 0),m([k()],$.prototype,`gatewaySystemInfo`,void 0),m([k()],$.prototype,`desktopEnvironments`,void 0),m([k()],$.prototype,`pageState`,void 0),m([k()],$.prototype,`canPairDevice`,void 0),m([k()],$.prototype,`canManagePairing`,void 0),m([k()],$.prototype,`canAdmin`,void 0),m([k()],$.prototype,`execApprovalsTarget`,void 0),m([k()],$.prototype,`execApprovalsTargetNodeId`,void 0),customElements.get(`openclaw-devices-page`)||customElements.define(`openclaw-devices-page`,$)})))()}Gr();