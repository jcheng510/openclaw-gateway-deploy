import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Lr as t,Mr as n,Rr as r,Ui as i,qr as a}from"./control-ui-foundation-C3MHh_P-.js";import{Gc as o,Gl as s,Jc as c,Pc as l,Ul as u,Wl as d,bu as f,hu as p,it as m,lu as h,qc as g,ql as _,rt as v,su as y,uu as b,xu as x,zc as ee}from"./control-ui-core-pYNj5S1a.js";import{$i as te,Qi as ne,Xi as S,Zi as C}from"./control-ui-core-D6clmJs8.js";import{$ as w,F as T,M as re,N as ie,X as E,Y as D,c as ae,ct as oe,nt as se,s as ce,tt as le,ut as O}from"./lit-runtime-DZL1fcCI.js";import{Fn as ue,Pn as de,Xi as fe,Yi as pe,_a as k,ba as me,bi as he,da as A,ga as j,va as ge,xi as _e,ya as ve,yi as ye}from"./control-ui-boot-shared-3Hl8ksFq.js";import{L as be,R as xe,V as Se,z as Ce}from"./control-ui-boot-shared-D-LYw3KU.js";import{Ba as M,Mt as N,Ua as P,Va as F,_t as I}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as L,t as R}from"./en-settings-DlF4_5vi.js";import{n as we,t as Te}from"./wizard-login-controller-CVVvSr5l.js";import{n as Ee,t as De}from"./provider-usage-1TWMOVJN.js";function Oe(e,t){return{onPrimaryChange:n=>{t({primary:n,fallbacks:e().fallbacks.filter(e=>e!==n)})},onFallbackChange:n=>{t({fallbacks:n?[n,...e().fallbacks.slice(1).filter(e=>e!==n)]:[]})},onUtilityChange:e=>t({utilityModel:e}),onDecisionChange:e=>t({decisionModel:e}),onThinkingChange:e=>t({thinkingLevel:e,thinkingOverridden:!0}),onThinkingReset:()=>t({thinkingLevel:void 0,thinkingOverridden:!1}),onFastModeChange:e=>t({fastMode:e,fastModeOverridden:!0}),onFastModeReset:()=>t({fastMode:void 0,fastModeOverridden:!1})}}function ke(e){let t=e?.thinkingDefault,n=e?.fastModeDefault;return{thinkingLevel:typeof t==`string`?t:void 0,thinkingOverridden:e!==null&&Object.hasOwn(e,`thinkingDefault`),fastMode:n===`auto`||typeof n==`boolean`?n:void 0,fastModeOverridden:e!==null&&Object.hasOwn(e,`fastModeDefault`)}}function Ae(e){return{agents:{defaults:{...e.primary?{model:e.fallbacks.length>0?{primary:e.primary,fallbacks:[...e.fallbacks]}:e.primary}:{},utilityModel:e.utilityModel,...e.decisionModel===void 0?{}:{decisionModel:e.decisionModel},thinkingDefault:e.thinkingOverridden&&e.thinkingLevel?e.thinkingLevel:null,fastModeDefault:e.fastModeOverridden&&e.fastMode!==void 0?e.fastMode:null}}}}function je(e){return/method (?:not found|not supported)|unknown method/iu.test(z(e))}function Me(e,t){if(t.length===1)return t[0];let n=t.some(e=>e.status===`ok`)?`ok`:V.find(e=>t.some(t=>t.status===e))??`unknown`,r=t.find(e=>e.status===n)?.error;return{provider:e,status:n,...r?{error:r}:{},results:t.flatMap(e=>e.results.map(t=>({...t,label:`${e.provider}: ${t.label}`})))}}function Ne(e){let t=e.runtimeConfig.state,n=e.overlays.snapshot;return t.configLoading||t.configSaving||t.configApplying||n.updateRunning||n.updateReconciliationPending}function Pe(e){let t=e.gateway.snapshot;if(t.phase!==`connected`)return p(`modelProviders.readOnly.disconnected`);if(e.runtimeConfig.canPatch!==!0)return p(`modelProviders.readOnly.adminRequired`);let n=e.runtimeConfig.state;return!t.client||n.client!==t.client||!g(n)?p(`modelProviders.configUnavailable`):null}function z(e){return s(e,p(`modelProviders.requestFailed`))}async function Fe(e,t){let{runtimeConfig:n}=e;e.setBusy(!0),e.setMessage(null);try{if(await n.ensureLoaded(),!e.isCurrentClient())return;let r=await n.patch({raw:t.raw,note:t.note,...t.replacePaths?{replacePaths:t.replacePaths}:{}});if(!e.isCurrentClient())return;r||e.isCurrentAgent()&&e.setMessage({kind:`error`,text:n.state.lastError??p(`modelProviders.configUnavailable`)})}catch(t){e.isCurrentClient()&&e.isCurrentAgent()&&e.setMessage({kind:`error`,text:z(t)})}finally{e.isCurrentClient()&&e.isCurrentAgent()&&e.setBusy(!1)}}async function Ie(e,t){let n=()=>e.isCurrentClient()&&e.isCurrentAgent();e.setBusy(!0),e.setMessage(null);try{let r=await e.runtimeConfig.runExternalMutation(async e=>{if(e!==t.client)throw Error(p(`modelProviders.requestFailed`));let n={provider:t.provider,agentId:t.agentId},r=await(t.apiKey===null?e.request(`models.authLogout`,{...n,credentialType:`api_key`}):e.request(`models.authSetApiKey`,{...n,apiKey:t.apiKey}));return m(e),r},{canDispatch:()=>n()&&e.canMutate()});if(!n())return{ok:!1};if(!r.ok)return e.setMessage({kind:`error`,text:r.error}),{ok:!1};let i=r.value.warning?[r.value.warning]:[];if(!r.refresh.ok)i.push(r.refresh.error);else try{let t=await e.refreshProviders();t&&i.push(t)}catch(e){i.push(z(e))}if(!n())return{ok:!1};let a=i.length>0?i.join(` `):null;return e.setMessage({kind:`success`,text:t.success,...a?{warning:a}:{}}),{ok:!0,warning:a}}finally{n()&&e.setBusy(!1)}}function Le(e,t,n){return p(e===`add`?`modelProviders.add.saved`:t===null?`modelProviders.apiKey.removed`:`modelProviders.apiKey.saved`,{provider:n})}var B,V;function H(){return(H=e((()=>{b(),c(),_(),v(),B=[`agents.defaults.model.fallbacks`],V=[`auth`,`billing`,`rate_limit`,`timeout`,`format`,`no_model`,`unknown`]})))()}function U(e,t){return e.find(e=>t.some(t=>e.ids.has(t)))}function W(e,t,n){let r=U(e,[t]);if(r)return r;let i={ids:new Set([t]),card:{id:t,displayName:n,profiles:[],profileProviderIds:{},profileOrders:{},profileOrderExplicitProviders:[],profileOrderStoredProviders:[],profileOrderLocks:{},credentialProviderIds:[],logoutTargets:[],hasConfigApiKey:!1,modelCount:0,availableModelCount:0},hasModelAuth:!1};return e.push(i),i}function Re(e,t){let n=r(t);n&&!e.some(e=>r(e)===n)&&e.push(t)}function ze(e,t,n){if(n.length===0)return;let i=r(t),a=e.find(e=>r(e.provider)===i);if(!a){e.push({provider:t,profileIds:[...new Set(n)]});return}a.profileIds=[...new Set([...a.profileIds,...n])]}function Be(e){let t=[],n=new Map,r=new Map,i=new Set;for(let t of e.authStatus?.providerCapabilities??[]){let e=j(t.provider);e&&n.set(e,n.get(e)===!0||t.apiKeySupported)}for(let n of e.configProviderIds??[]){let e=j(n);e&&(W(t,e,F(e)).card.configKey??=n)}for(let n of e.configApiKeyProviderIds??[]){let e=j(n);if(e){let r=W(t,e,F(e)).card;r.configKey=n,r.hasConfigApiKey=!0,Re(r.credentialProviderIds,n)}}for(let[n,r]of Object.entries(e.configProviderAuthModes??{})){let e=j(n);e&&(W(t,e,F(e)).card.configAuthMode=r)}for(let n of e.pendingProviders??[]){let e=j(n);e&&(W(t,e,F(e)).card.checkingModels=!0)}for(let n of e.providerOutcomes??[]){let e=j(n.provider);if(!e)continue;let r=W(t,e,F(e)),i=r.catalogOutcome,a=n.profileId===void 0,o=Ge[a?`provider`:`profile`];(!i||(a===(i.profileId===void 0)?o.indexOf(n.status)<o.indexOf(i.status):a))&&(r.catalogOutcome=n)}for(let n of e.models??[]){let e=j(n.provider);if(!e)continue;let r=W(t,e,F(e));r.card.modelCount+=1,n.available===!0&&(r.card.availableModelCount+=1)}for(let a of e.authStatus?.providers??[]){let e=j(a.provider);if(!e)continue;let o=a.usage?j(a.usage.providerId):e,s=[...new Set([e,o])],c=U(t,s)??W(t,o,F(o));for(let e of s)c.ids.add(e);if(c.card.displayName=a.displayName||c.card.displayName,c.card.profiles.push(...a.profiles),a.profiles.length>0){let e=a.authProvider||a.provider;for(let t of a.profiles)c.card.profileProviderIds[t.profileId]=e;a.profileOrder!==void 0&&i.add(e);let t=a.profileOrder??a.profiles.map(e=>e.profileId);r.set(e,[...new Set([...r.get(e)??[],...t])]),c.card.profileOrders[e]=t,a.profileOrderStored===!0&&!c.card.profileOrderStoredProviders.includes(e)&&c.card.profileOrderStoredProviders.push(e),a.profileOrderLocked!==void 0&&(c.card.profileOrderLocks[e]??=a.profileOrderLocked)}(a.apiKey||a.profiles.length>0)&&Re(c.card.credentialProviderIds,a.provider),ze(c.card.logoutTargets,a.provider,a.profiles.filter(e=>e.logoutSupported===!0).map(e=>e.profileId)),c.card.apiKey??=a.apiKey,c.hasModelAuth||=ge(a)||n.has(e);let l=a.usage;l&&!c.card.usage&&(c.card.usage={provider:l.providerId,displayName:a.displayName,windows:l.windows,...l.summary?{summary:l.summary}:{},...l.plan?{plan:l.plan}:{},...l.billing?.length?{billing:l.billing}:{}})}for(let e of t){e.card.profileOrderExplicitProviders=Object.keys(e.card.profileOrders).filter(e=>i.has(e));for(let t of Object.keys(e.card.profileOrders)){let n=r.get(t);n&&(e.card.profileOrders[t]=n)}}for(let n of ve(e.authStatus?.providers??[])){let e=U(t,[j(n.provider)]);e&&(e.card.auth={kind:n.status===`static`?`api-key`:n.status,profileCount:n.profiles.length,...n.expiry?.label?{expiryLabel:n.expiry.label}:{}})}for(let n of e.providerUsage?.providers??[]){let e=j(n.provider);if(!e)continue;let r=U(t,[e])??W(t,e,n.displayName||F(e));r.ids.add(e),r.card.usage=n}for(let n of e.costByProvider??[]){let e=j(n.provider??``);if(!e)continue;let r=U(t,[e])??W(t,e,F(e)),i={totalCost:n.totals.totalCost,totalTokens:n.totals.totalTokens,messageCount:n.count},a=r.card.localCost;r.card.localCost=a?{totalCost:a.totalCost+i.totalCost,totalTokens:a.totalTokens+i.totalTokens,messageCount:a.messageCount+i.messageCount}:i}return t.filter(t=>t.hasModelAuth||(e.configProviderIds??[]).some(e=>j(e)===t.card.id)||!!t.card.usage||t.card.modelCount>0||!!t.catalogOutcome||t.card.checkingModels||(t.card.localCost?.totalTokens??0)>0).map(e=>{let t=n.get(e.card.id);return Object.assign({},e.card,e.catalogOutcome?{catalogStatus:e.catalogOutcome.status}:{},t===void 0?{}:{apiKeySupported:t})}).toSorted((e,t)=>e.displayName.localeCompare(t.displayName))}function Ve(e,t,n){if(e.retired||e.modelSelectionPolicy?.restricted)return{defaults:{...t,primary:e.modelSelectionPolicy?.defaultModel??``,fallbacks:[],utilityModel:null,decisionModel:null},configuredModels:e.models.filter(e=>e.manualSelectionAllowed!==!1)};let r=n??t;return{defaults:r,configuredModels:He(e.hasSnapshot?e.models:null,r)}}function G(e){return e.selectionRef===void 0?e.id.startsWith(`${e.provider}/`)?e.id:`${e.provider}/${e.id}`:e.selectionRef}function He(e,t){let r=new Set([t.primary,...t.fallbacks,t.utilityModel].filter(e=>typeof e==`string`&&e.length>0)),i=(e??[]).filter(e=>e.available!==!1||r.has(G(e))),a=new Set(i.map(G)),o=e===null?{}:{available:!1};for(let t of r){if(a.has(t))continue;let{model:r,profile:s}=n(t);if(s){let n=(e??[]).find(e=>G(e)===r);if(n){i.push({...n,selectionRef:t});continue}}let c=t.indexOf(`/`);if(c<=0||c===t.length-1){let n=t.trim().toLowerCase(),r=(e??[]).find(e=>e.alias?.trim().toLowerCase()===n||e.id.trim()===t.trim());i.push({...r??{provider:``,id:t,name:t,...o},selectionRef:t});continue}i.push({provider:t.slice(0,c),id:t.slice(c+1),name:t,...o})}return i}function Ue(e){let t=i(e?.models),n=i(t?.providers),r=i(e?.agents),a=i(r?.defaults),o=a?.model,s=i(o),c=typeof o==`string`?o:typeof s?.primary==`string`?s.primary:``,l=Array.isArray(s?.fallbacks)?s.fallbacks.filter(e=>typeof e==`string`):[];return{providerIds:Object.keys(n??{}),apiKeyProviderIds:Object.entries(n??{}).filter(([,e])=>{let t=i(e);return t?Object.hasOwn(t,`apiKey`)&&t.apiKey!=null:!1}).map(([e])=>e),providerAuthModes:Object.fromEntries(Object.entries(n??{}).flatMap(([e,t])=>{let n=i(t)?.auth;return typeof n==`string`?[[e,n]]:[]})),defaults:{primary:c,fallbacks:l,utilityModel:typeof a?.utilityModel==`string`?a.utilityModel:null,...typeof a?.decisionModel==`string`?{decisionModel:a.decisionModel}:{}}}}function We(e,t){let n=new Set(Array.from(t,j)),r=new Map;for(let t of e??[]){let e=j(t.provider);t.quickApiKeySetup&&e&&!n.has(e)&&!r.has(e)&&r.set(e,{id:e,displayName:F(e)})}return[...r.values()].toSorted((e,t)=>e.displayName.localeCompare(t.displayName))}var Ge;function K(){return(K=e((()=>{t(),M(),k(),Ge={provider:[`auth-rejected`,`unavailable`,`ready`],profile:[`ready`,`auth-rejected`,`unavailable`]}})))()}var q,Ke;function qe(){return(qe=e((()=>{x(),q={modelSetup:{discovery:{title:`On this Gateway`,description:`Find existing connections or prepare a local model for {agent}. Using a model here changes this agent, not the global defaults.`,useForAgent:`Test & use for this agent`,connectForAgent:`Connect & use for this agent`,connectProvider:`Connect provider`,returnToModels:`Return to Models`,otherSoftware:`Other detected software`},verify:{title:`Selected model`,button:`Check model`,retry:`Try again`,checkAgain:`Check again`,checkingButton:`Checking…`,checking:`Checking — asking {modelRef} for a quick reply…`,ready:`Ready`,readyIn:`Ready · {latencyMs} ms`,providerUnavailable:`{provider} isn’t responding.`},nativeDiscovery:{title:`Discover existing conversations`,body:`Show native assistant conversations from this Gateway host in OpenClaw. This is discovery, not an import or copy.`,enable:`Show existing native conversations`,decline:`Leave unchecked to keep native session catalogs off when you connect your AI provider. Existing installations are not changed.`},success:{title:`Connection verified`,body:`OpenClaw received a real reply from {modelRef}. You can start chatting now.`,activeModel:`Active model`,latency:`Verified in {latencyMs} ms`,openChat:`Start chatting`,continueSetup:`Continue setup`,stayHere:`Stay in settings`,configuredModel:`Configured model`},utility:{role:`Setup & utility`,hint:`Helps set up OpenClaw and handles lightweight tasks. Regular chats need a primary model.`,useSetup:`Use for setup`,useUtility:`Use as utility`,ready:`Setup & utility model ready`,configured:`Setup & utility model`,verified:`OpenClaw received a real reply from {modelRef}. This model is ready for setup and lightweight tasks.`,model:`Utility model`,choosePrimary:`Choose a primary model below for regular chats. Your setup assistant remains available.`,primaryReady:`This model handles setup and lightweight tasks. Regular chats use your primary model.`,openAssistant:`Open setup assistant`,repair:`Recheck & repair`}}},Ke=Object.assign(()=>{Object.assign(f.modelSetup,q.modelSetup)},{catalog:q})})))()}function Je({providers:e,authStatus:t,allowQuickApiKey:n,manualProviders:r}){let i=new Map,a=new Set;for(let r of t?.providerCapabilities??[])if(!e||e.includes(r.provider)){for(let e of r.loginOptions??[]){let t=i.get(e.brandId);t||(t={id:e.brandId,label:``,choices:[],authProviders:[]},i.set(t.id,t)),t.label||=e.groupLabel?.trim()??``,t.authProviders.includes(r.provider)||t.authProviders.push(r.provider),a.has(e.id)||(a.add(e.id),t.choices.push(e))}if(r.quickApiKeySetup&&n){let e=r.loginOptions?.length?r.loginOptions.map(e=>e.brandId):[r.provider];for(let t of new Set(e)){let e=i.get(t)??{id:t,label:``,choices:[],authProviders:[]};e.authProviders.includes(r.provider)||e.authProviders.push(r.provider),i.set(t,{...e,apiKeyProvider:e.apiKeyProvider??r.provider})}}}if(r)for(let t of r){let n=t.brandId??t.id;if(a.has(t.id)||e&&!e.includes(n))continue;let r=i.get(n)??{id:n,label:``,choices:[],authProviders:[]};r.label||=t.groupLabel?.trim()||t.label,r.authProviders.includes(n)||r.authProviders.push(n);let o=r.choices.some(e=>e.label===t.label);r.choices.push({...t,brandId:n,kind:`setup-secret`,featured:!1,...o?{label:p(`modelSetup.manual.accessValueFor`,{provider:t.label}),hint:p(`modelSetup.manual.accessValuePlaceholder`)}:{}}),a.add(t.id),i.set(n,r)}for(let e of i.values())e.label||=F(e.id);return[...i.values()].toSorted((e,t)=>e.label.localeCompare(t.label)||e.id.localeCompare(t.id))}function Ye(){return(Ye=e((()=>{M(),b()})))()}var J;function Xe(){return(Xe=e((()=>{be(),D(),se(),C(),De(),b(),_(),h(),J=class extends y{constructor(...e){super(...e),this.client=null,this.agentId=``,this.profileId=``,this.refresh=0,this.usage=new xe(this,{args:()=>[this.client,this.agentId,this.profileId,this.refresh],task:([e,t,n],{signal:r})=>e&&t&&n?e.request(`codex.accountUsage`,{agentId:t,profileId:n},{signal:r,timeoutMs:3e4}):Ce})}refreshUsage(){this.refresh+=1}render(){return this.client?w`
      <div class="model-providers__account-usage">
        <button
          class="model-providers__account-refresh"
          type="button"
          aria-label=${p(`common.refresh`)}
          title=${p(`common.refresh`)}
          ?disabled=${this.usage.status===Se.PENDING}
          @click=${()=>this.refreshUsage()}
        >
          ${S.refresh}
        </button>
        ${this.usage.render({pending:()=>w`<span>${p(`common.loading`)}</span>`,complete:e=>e.providers.length===0?w`<span>${p(`modelProviders.noStats`)}</span>`:e.providers.map(e=>w`
                    ${e.plan?w`<strong>${e.plan}</strong>`:E}
                    <div>
                      ${e.windows.length||e.billing?.length?Ee(e,{groupWindows:!0}):p(`modelProviders.noStats`)}
                    </div>
                  `),error:e=>w`<span class="provider-usage-error">${s(e)}</span>`})}
      </div>
    `:E}},a([O({attribute:!1})],J.prototype,`client`,void 0),a([O()],J.prototype,`agentId`,void 0),a([O()],J.prototype,`profileId`,void 0),a([oe()],J.prototype,`refresh`,void 0),customElements.get(`openclaw-model-account-usage`)||customElements.define(`openclaw-model-account-usage`,J)})))()}function Ze(e){d({placement:`bottom`,message:z(e),icon:S.alertTriangle,durationMs:12e3})}function Qe(e){d({placement:`bottom`,message:[p(`modelProviders.logout.done`),e].filter(Boolean).join(` `),icon:S.check})}function $e(e){switch(e.source){case`config`:return p(`modelProviders.profiles.sourceConfig`);case`external`:return e.displayName||p(`modelProviders.profiles.sourceExternal`);case`inherited`:return p(`modelProviders.profiles.sourceInherited`);case`saved`:return p(`modelProviders.profiles.sourceSaved`);default:return}}function Y(e){if(e.apiKey?.source===`config`)return p(`modelProviders.credentials.configKey`);if(e.apiKey?.source===`env`)return e.apiKey.envVar?p(`modelProviders.credentials.envKeyNamed`,{name:e.apiKey.envVar}):p(`modelProviders.credentials.envKey`)}function et(e){return p(e===`auth-config`?`modelProviders.profiles.priorityManagedByAuth`:`modelProviders.profiles.priorityManagedByProvider`)}function tt(e){let t=[],n=$e(e);return n&&e.source!==`saved`&&t.push(n),e.email&&e.displayName&&e.displayName!==n&&t.push(e.displayName),e.lastUsedAt&&t.push(p(`modelProviders.profiles.lastUsed`,{time:pe(Date.now()-e.lastUsedAt)})),t.join(` · `)}function nt(e){let t=(e.split(`@`)[0]??``).split(/[^a-z0-9]+/iu).filter(Boolean);return(t.length>1?`${t[0]?.[0]??``}${t.at(-1)?.[0]??``}`:t[0]?.slice(0,2)??``).toLocaleUpperCase()||`?`}function rt(e,t){switch(e.externallyManaged&&(e.status===`expired`||e.status===`expiring`)?`ok`:e.status){case`ok`:return N({kind:t?`muted`:`ok`,label:p(t?`modelProviders.status.configured`:`modelProviders.status.ok`)});case`static`:return N({kind:`ok`,label:p(`modelProviders.status.configured`)});case`expiring`:return N({kind:`warn`,label:p(`modelProviders.status.expiring`)});case`expired`:return N({kind:`danger`,label:p(`modelProviders.status.expired`)});default:return N({kind:`muted`,label:p(`modelProviders.status.missing`)})}}function it(e,t){return e.profiles.filter(n=>(e.profileProviderIds[n.profileId]??e.id)===t)}function at(e,t){return e.logoutTargets.find(e=>e.profileIds.includes(t))?.provider}function ot(e,t){let n=new Set(e.map(e=>e.profileId));return[...t.filter(e=>n.delete(e)),...e.flatMap(e=>n.delete(e.profileId)?[e.profileId]:[])]}function st(e,t){if(e.length!==t.length)return!1;let n=new Set(e.map(e=>e.profileId));return n.size===e.length&&t.every(e=>n.delete(e))}function ct(e,t){return[...new Set(e.profiles.map(t=>e.profileProviderIds[t.profileId]??e.id))].map(n=>{let r=it(e,n),i=t[n]??e.profileOrders[n]??[],a=e.profileOrderLocks[n],o=st(r,i),s=e.profileOrderStoredProviders.includes(n),c=t[n]!==void 0||e.profileOrderExplicitProviders.includes(n),l=a?et(a):o?void 0:p(s?`modelProviders.profiles.partialStoredOrder`:`modelProviders.profiles.partialOrder`),u=new Map(r.map(e=>[e.profileId,e]));return{provider:n,order:i,lock:a,complete:o,stored:s,explicit:c,explanation:l,profiles:ot(r,i).flatMap(e=>{let t=u.get(e);return t?[t]:[]})}})}function lt(e,t){return[...e.querySelectorAll(t)]}function ut(e){e.classList.remove(Z);for(let t of lt(e,`.model-providers__profile`))t.classList.remove(X),t.style.removeProperty(`translate`)}function dt(e){if(!e.canMove||e.event.button!==0)return;let t=e.event.currentTarget;if(!(t instanceof HTMLElement))return;let n=t.closest(`.model-providers__profile`),r=t.closest(`.model-providers__profiles`);if(!n||!r)return;let i=r.getBoundingClientRect().top,a=lt(r,`.model-providers__profile`).filter(t=>t.dataset.profileProvider===e.provider).map(e=>({element:e,bounds:e.getBoundingClientRect()})),o=a.find(e=>e.element===n);if(!o)return;let s=a.filter(e=>e!==o),c,l=`before`;e.event.preventDefault(),r.classList.add(Z),n.classList.add(X);try{t.setPointerCapture?.(e.event.pointerId)}catch{}let u=t=>{if(t.pointerId!==e.event.pointerId)return;let u=i-r.getBoundingClientRect().top,d=t.clientY-e.event.clientY+u;n.style.translate=`${t.clientX-e.event.clientX}px ${d}px`;let f=document.elementFromPoint(t.clientX,t.clientY),p=f?.closest(`.model-providers__profile`),m=t.clientY+u,h=f&&r.contains(f)&&(!p||p.dataset.profileProvider===e.provider)&&a.some(({bounds:e})=>t.clientX>=e.left&&t.clientX<=e.right&&m>=e.top&&m<=e.bottom),g=(d>0?o.bounds.bottom:o.bounds.top)+d;c=h?s.find(({bounds:e})=>g<e.top+e.height/2):void 0,l=c?`before`:`after`,h&&!c&&(c=s.at(-1));let _=c?A(a,o,c,l):a;_.indexOf(o)===a.indexOf(o)&&(c=void 0);let v=a[0]?.bounds.top??0;for(let e of _)e!==o&&(e.element.style.translate=`0px ${v-e.bounds.top}px`),v+=e.bounds.height},d=(n,i)=>{if(n.pointerId!==e.event.pointerId)return;u(n);let a=c?.element.dataset.profileId;ut(r),t.removeEventListener(`pointermove`,f),t.removeEventListener(`pointerup`,p),t.removeEventListener(`pointercancel`,m),t.removeEventListener(`lostpointercapture`,m),document.removeEventListener(`keydown`,h,!0);try{t.releasePointerCapture?.(e.event.pointerId)}catch{}i&&a&&e.move(a,l)},f=e=>u(e),p=e=>d(e,!0),m=e=>d(e,!1),h=t=>{t.key===`Escape`&&(t.preventDefault(),t.stopPropagation(),d(e.event,!1))};t.addEventListener(`pointermove`,f),t.addEventListener(`pointerup`,p),t.addEventListener(`pointercancel`,m),t.addEventListener(`lostpointercapture`,m),document.addEventListener(`keydown`,h,!0)}function ft(e,t){return e.email||e.displayName||p(`modelProviders.profiles.account`,{number:String(t+1)})}function pt(e,t,n){let r=tt(e);return w`
    <span class="model-providers__profile-avatar" aria-hidden="true"
      >${nt(t)}</span
    >
    <div class="model-providers__profile-copy">
      <strong>${t}</strong>
      ${r?w`<span>${r}</span>`:E}
      ${n?w`<details>
              <summary>${p(`modelProviders.profiles.details`)}</summary>
              <div>${e.profileId}</div>
              ${e.expiry?w`<span>${p(`modelProviders.expiresIn`,{time:e.expiry.label})}</span>`:E}
            </details>`:E}
    </div>
  `}function mt(e,t){let n=e.flatMap(e=>e.profiles.map(n=>({profile:n,authRejected:e.catalogStatus===`auth-rejected`,canUse:e.profileProviderIds[n.profileId]===t?.authProvider&&(n.source===`saved`||n.source===`inherited`)}))),r=[...new Set(e.map(Y).filter(Boolean))];return w`
    <section
      class="model-provider-login__accounts"
      aria-label=${p(`modelProviders.login.accounts`)}
    >
      <h3>${p(`modelProviders.login.accounts`)}</h3>
      ${n.length?w`
              <div role="list">
                ${n.map(({profile:e,authRejected:n,canUse:r},i)=>w`
                    <div
                      class="model-provider-login__account"
                      role="listitem"
                      data-profile-id=${e.profileId}
                    >
                      ${pt(e,ft(e,i),!1)}
                      ${rt(e,n)}
                      ${r&&t?w`<button
                              class="btn"
                              data-models-use-account
                              ?disabled=${t.disabled}
                              @click=${()=>t.onUse(e.profileId)}
                            >
                              ${p(`modelProviders.login.useAccount`)}
                            </button>`:E}
                    </div>
                  `)}
              </div>
            `:E}
      ${r.map(e=>w`<p class="muted">${e}</p>`)}
      ${!n.length&&!r.length?w`<p class="muted">${p(`modelProviders.login.noAccounts`)}</p>`:E}
    </section>
  `}function ht(e,t){if(e.profiles.length===0)return E;let n=ct(e,t.profileOrders),r=new Map(e.profiles.map((e,t)=>[e.profileId,ft(e,t)])),i=n.flatMap(e=>e.profiles.map(t=>({group:e,profile:t}))),a=n.some(e=>!e.lock&&e.complete&&e.order.length>1),o=[...new Set(n.flatMap(e=>e.explanation?[e.explanation]:[]))],s=Y(e);return w`
    <section
      class="model-providers__profiles"
      aria-label=${`${p(`modelProviders.profiles.title`)}: ${e.displayName}`}
    >
      <div class="model-providers__profiles-heading">
        <div class="model-providers__profiles-heading-copy">
          <strong>${p(`modelProviders.profiles.title`)}</strong>
          <span
            >${p(i.length===1?`modelProviders.profiles.accountOne`:`modelProviders.profiles.accounts`,{count:String(i.length)})}${s?` · ${s}`:``}</span
          >
          ${a?w`<span>${p(`modelProviders.profiles.reorderHint`)}</span>`:E}
          ${o.map(e=>w`<span>${e}</span>`)}
        </div>
        <div class="model-providers__profiles-heading-actions">
          ${e.profileOrderStoredProviders.map(n=>w`<button
              type="button"
              class="btn btn--sm btn--ghost"
              ?disabled=${!t.canMutate}
              title=${t.canMutate?p(`modelProviders.profiles.resetOrderHint`):t.mutationBlockedReason??``}
              @click=${()=>t.onProfileOrderChange(e.id,n,null)}
            >
              ${p(`modelProviders.profiles.resetOrder`)}
            </button>`)}
          ${t.onAddAccount?w`<button
                  type="button"
                  class="btn btn--sm"
                  ?disabled=${t.addAccountDisabled}
                  @click=${t.onAddAccount}
                >
                  ${p(`modelProviders.profiles.addAccount`)}
                </button>`:E}
        </div>
      </div>
      <div class="model-providers__profile-list" role="list">
        ${ae(i,({profile:e})=>e.profileId,({profile:n,group:i})=>{let{provider:a,order:o,complete:s,lock:c,stored:l,explicit:u}=i,d=o.indexOf(n.profileId),f=t.canMutate&&!c&&s&&o.length>1&&d>=0,m=!c&&(s||l)&&o.length>1,h=r.get(n.profileId),g=at(e,n.profileId),_=p(`modelProviders.logout.actionFor`,{account:h}),v=t.canMutate?_:t.mutationBlockedReason??``,y=t.canMutate?i.explanation??``:t.mutationBlockedReason??``,b=(r,i)=>{f&&t.onProfileOrderChange(e.id,a,A(o,n.profileId,r,i))},x=(e,t)=>{let n=o[d+t];if(!f||!n)return;let r=e.currentTarget,i=r instanceof HTMLButtonElement&&document.activeElement===r;b(n,t<0?`before`:`after`),i&&queueMicrotask(()=>{r.isConnected&&document.activeElement===document.body&&r.focus({preventScroll:!0})})};return w`
              <div
                class="model-providers__profile"
                role="listitem"
                data-profile-id=${n.profileId}
                data-profile-provider=${a}
              >
                <span class="model-providers__profile-order">
                  ${m?w`<button
                          type="button"
                          class="model-providers__profile-grip"
                          ?disabled=${!f}
                          aria-label=${p(`modelProviders.profiles.reorder`,{account:h,position:String(d+1)})}
                          aria-keyshortcuts=${f?`ArrowUp ArrowDown`:E}
                          title=${y||p(`modelProviders.profiles.reorderHint`)}
                          @pointerdown=${e=>dt({event:e,canMove:f,provider:a,move:b})}
                          @keydown=${e=>{(e.key===`ArrowUp`||e.key===`ArrowDown`)&&(e.preventDefault(),x(e,e.key===`ArrowUp`?-1:1))}}
                        >
                          ${S.gripVertical}
                        </button>`:w`<span aria-hidden="true"></span>`}
                  ${u&&s&&d>=0?w`<span
                          class="model-providers__profile-position"
                          aria-label=${p(`modelProviders.profiles.priority`,{position:String(d+1)})}
                          title=${p(`modelProviders.profiles.priority`,{position:String(d+1)})}
                          >${d+1}</span
                        >`:E}
                </span>
                ${pt(n,h,!0)}
                ${a===`openai`&&n.type!==`api_key`?w`<openclaw-model-account-usage
                        .client=${t.usageClient??null}
                        .agentId=${t.usageAgentId??``}
                        .profileId=${n.profileId}
                      ></openclaw-model-account-usage>`:E}
                <span class="model-providers__profile-status"
                  >${rt(n,e.catalogStatus===`auth-rejected`)}</span
                >
                <span class="model-providers__profile-actions">
                  ${n.logoutSupported===!0&&g?w`<button
                          type="button"
                          class="model-providers__profile-logout"
                          aria-label=${_}
                          title=${v}
                          ?disabled=${!t.canMutate||t.busy[`logout:${e.id}`]}
                          @click=${()=>t.onRequestLogout({cardId:e.id,label:h,target:{provider:g,profileIds:[n.profileId]}})}
                        >
                          ${gt}
                        </button>`:E}
                </span>
              </div>
            `})}
      </div>
    </section>
  `}var X,Z,gt;function Q(){return(Q=e((()=>{D(),Xe(),ce(),ne(),C(),I(),b(),R(),fe(),u(),H(),L(),X=`model-providers__profile--dragging`,Z=`model-providers__profiles--sorting`,gt=te(le` <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" x2="9" y1="12" y2="12" />`)})))()}function _t(){return(_t=e((()=>{})))()}var vt;function $(){return($=e((()=>{t(),D(),re(),M(),we(),b(),R(),l(),c(),_e(),_(),v(),k(),K(),Ye(),Q(),L(),vt=class{constructor(e,t){this.host=e,this.options=t,this.picker=null,this.searchInput=ie(),this.methodChoices=ie(),this.focusPicker=null,this.generation=0,this.mutationActive=!1,this.refreshWarning=null,this.mode=`auth`,e.addController(this),this.wizard=new Te(e,{getClient:()=>t.getScope().context.gateway.snapshot.client,getAgentId:()=>t.getScope().agentId,onClose:()=>this.reset(),onAnswer:(e,t)=>void this.run(()=>this.runner.answer(e,t)),onBackgroundCompletion:e=>this.run(()=>Promise.resolve(e),!0),requestFailedMessage:()=>p(`modelProviders.requestFailed`),sessionExpiredMessage:()=>p(`modelProviders.login.sessionExpired`)}),this.runner=this.wizard.runner}get busy(){return this.picker!==null||this.mutationActive||this.wizard.cancelling||this.runner.state.phase!==`idle`}get providerActions(){return{canMutate:this.options.canStart(),loginBusy:this.busy,onConnect:e=>this.open([e.id,...e.credentialProviderIds]),canConnect:e=>this.loginProviders([e.id,...e.credentialProviderIds]).length>0}}get pageActions(){return{selectedAgentId:this.options.getScope().agentId,onConnect:()=>this.open(),connectDisabled:!this.options.canStart()||this.busy,login:this.render(),loginMessage:this.message}}selectedModel(){let{context:e,agentId:t}=this.options.getScope(),{entry:n,defaults:r}=ee(g(e.runtimeConfig.state),t??``);return o(n?.model)??o(r?.model)}missingSelection(){let e=this.selectedModel(),{authStatus:t}=this.options.getScope();if(!e||!t?.ts||t.unavailable)return null;let{model:i,profile:a}=n(e),o=i.indexOf(`/`);if(!a||o<1||t.providers.some(e=>e.profiles.some(e=>e.profileId===a)))return null;let s=r(i.slice(0,o)),c=t.providers.find(e=>r(e.provider)===s)?.authProvider??s;return{model:i,provider:j(s),authProvider:c}}renderRecovery(){let e=this.missingSelection(),t=this.options.getScope().authStatus?.providerCapabilities?.filter(t=>j(t.provider)===e?.provider).map(e=>e.provider);return e?w`<div class="callout warning" role="status" data-models-account-recovery>
          <p>${p(`modelProviders.login.missingSelection`,{model:e.model})}</p>
          <button
            class="btn"
            data-models-recover-account
            ?disabled=${!this.options.canStart()||this.busy}
            @click=${()=>void this.open(t)}
          >
            ${p(`modelProviders.login.chooseAccount`)}
          </button>
        </div>`:E}async activateSavedProfile(e,t){let n=this.selectedModel();if(!this.options.canStart()||this.mutationActive||this.missingSelection()?.model!==t)return;this.picker=null,this.mode=`activate`,this.message=void 0,this.refreshWarning=null;let r=`saved-auth:${encodeURIComponent(e)}`;await this.run(()=>{if(this.selectedModel()!==n)throw Error(p(`modelProviders.login.selectionChanged`));return this.runner.activate({kind:r,modelRef:t},e)})}loginProviders(e,t=this.options.getScope().authStatus){return Je({providers:e,authStatus:t,allowQuickApiKey:!!this.options.onApiKey,manualProviders:this.options.onManualProvider?this.options.getManualProviders?.():void 0})}async open(e,t){if(!this.options.canStart()||this.busy)return;let n=this.options.getScope(),{client:r,hello:i}=n.context.gateway.snapshot;if(!r||!n.agentId)return;let a=++this.generation,o=new AbortController;this.inventoryRequest=o;let c=()=>{let e=this.options.getScope();return a===this.generation&&e.context.gateway.snapshot.client===r&&e.context.gateway.snapshot.hello===i&&e.agentId===n.agentId&&this.options.canContinue()};this.picker={phase:`loading`,providers:e,providerId:``,query:``,isCurrent:c},this.focusPicker=null,this.message=void 0,this.host.requestUpdate();try{let i=n.authStatus??await me(r,{agentId:n.agentId,signal:o.signal});if(c()){let r=this.loginProviders(e,i),a=t?r.find(e=>e.choices.some(e=>e.id===t)):e&&r.length===1?r[0]:void 0;this.picker={phase:`ready`,providers:e,authStatus:i,providerId:a?.id??``,query:``,isCurrent:c},n.authStatus||(this.focusPicker=a?`method`:`search`)}}catch(t){c()&&(this.picker={phase:`error`,isCurrent:c,providers:e,providerId:``,query:``,message:s(t,p(`modelProviders.requestFailed`))})}finally{a===this.generation&&(this.inventoryRequest=void 0,c()||(this.picker=null),this.host.requestUpdate())}}reset(){this.generation+=1,this.inventoryRequest?.abort(),this.inventoryRequest=void 0,this.picker=null,this.focusPicker=null,this.mutationActive=!1,this.refreshWarning=null,this.message=void 0,this.mode=`auth`,this.wizard.reset()}hostDisconnected(){this.reset()}hostUpdated(){if(!this.focusPicker||!this.picker)return;let e=this.methodChoices.value,t=this.focusPicker===`search`?this.searchInput.value:e?.querySelector(`button`)??e;this.focusPicker=null,t?.focus({preventScroll:!0})}render(){let e=this.picker;if(e){let t=()=>this.picker===e&&e.phase===`ready`&&e.isCurrent(),n=e.phase===`ready`?this.loginProviders(e.providers,e.authStatus):[],r=n.find(t=>t.id===e.providerId),i=r&&e.phase===`ready`?Be({authStatus:e.authStatus,models:null,providerUsage:null,costByProvider:null}).filter(e=>r.authProviders.some(t=>e.id===j(t))):[],a=r?.choices.find(e=>e.docsUrl)?.docsUrl??`https://docs.openclaw.ai/concepts/model-providers`,o=this.missingSelection(),s=o&&i.some(e=>e.id===o.provider)?o:null,c=e.query.trim().toLocaleLowerCase(),l=n.filter(e=>[e.id,e.label,...e.apiKeyProvider?[p(`modelProviders.status.apiKey`)]:[],...e.choices.flatMap(e=>[e.label,e.hint??``])].some(e=>e.toLocaleLowerCase().includes(c)));return w`
        <openclaw-modal-dialog
          label=${r?.label??p(`modelProviders.login.title`)}
          @modal-cancel=${()=>this.reset()}
        >
          <div class="model-setup-wizard model-provider-login">
            <div class="model-setup-wizard__header">
              <h2 class="model-provider-login__provider">
                ${r?w`${P(r.id,{className:`model-providers__icon`})} ${r.label}`:p(`modelProviders.login.title`)}
              </h2>
            </div>
            <div class="model-setup-wizard__body">
              <p>
                ${s?p(`modelProviders.login.useAccountDescription`,{model:s.model}):this.options.onManualProvider?p(`modelProviders.login.setupDescription`):p(`modelProviders.login.description`)}
              </p>
              ${e.phase===`loading`?w`<div role="status">${p(`common.loading`)}</div>`:e.phase===`error`?w`<div role="alert">${e.message}</div>`:r?w`
                          ${e.phase===`ready`&&e.authStatus.unavailable?w`<p role="status">${e.authStatus.unavailable.message}</p>`:mt(i,s?{authProvider:s.authProvider,disabled:!e.isCurrent()||!this.options.canStart(),onUse:t=>{this.picker===e&&e.isCurrent()&&this.activateSavedProfile(t,s.model)}}:void 0)}
                          <section class="model-provider-login__methods" ${T(this.methodChoices)}>
                            <h3>${p(`modelProviders.login.connectAccount`)}</h3>
                            <div data-models-login-choice>
                              ${r.choices.map(n=>w`
                                  <button
                                    type="button"
                                    class="btn model-provider-login__option"
                                    ?disabled=${e.phase!==`ready`||!e.isCurrent()}
                                    @click=${()=>{if(t()){if(n.kind===`setup-secret`){this.reset(),this.options.onManualProvider?.(n.id);return}this.picker=null,this.mode=`auth`,this.refreshWarning=null,this.runner.prepareSignIn(n.kind,n.label),this.run(()=>this.runner.start(n.id,`models.authLogin`))}}}
                                  >
                                    <span class="model-provider-login__copy">
                                      <strong>${n.label}</strong>
                                      ${n.hint?w`<span>${n.hint}</span>`:E}
                                    </span>
                                  </button>
                                `)}
                            </div>
                            ${r.apiKeyProvider?w`
                                    <button
                                      type="button"
                                      class="btn model-provider-login__option"
                                      data-models-login-api-key
                                      ?disabled=${e.phase!==`ready`||!e.isCurrent()}
                                      @click=${()=>{t()&&r.apiKeyProvider&&(this.reset(),this.options.onApiKey?.(r.apiKeyProvider))}}
                                    >
                                      <span class="model-provider-login__copy">
                                        <strong>${p(`modelProviders.status.apiKey`)}</strong>
                                        <span>${p(`modelProviders.login.apiKeyHint`)}</span>
                                      </span>
                                    </button>
                                  `:E}
                            <a
                              class="learn-more-link"
                              href=${a}
                              target=${ye}
                              rel=${he()}
                              >${p(`modelProviders.login.compareMethods`)}</a
                            >
                          </section>
                        `:w`
                          <label class="field">
                            <span>${p(`modelProviders.search`)}</span>
                            <input
                              type="search"
                              data-models-login-search
                              autofocus
                              autocomplete="off"
                              ${T(this.searchInput)}
                              .value=${e.query}
                              @input=${t=>{e.query=t.currentTarget.value,this.host.requestUpdate()}}
                            />
                          </label>
                          <ul
                            class="model-provider-login__providers"
                            aria-label=${p(`modelSetup.manual.provider`)}
                          >
                            ${l.map(n=>w`
                                <li>
                                  <button
                                    type="button"
                                    class="btn model-provider-login__option"
                                    data-models-login-provider=${n.id}
                                    ?disabled=${e.phase!==`ready`||!e.isCurrent()}
                                    @click=${()=>{t()&&(e.providerId=n.id,this.focusPicker=`method`,this.host.requestUpdate())}}
                                  >
                                    ${P(n.id,{className:`model-providers__icon`})}
                                    <span class="model-provider-login__copy">
                                      <strong>${n.label}</strong>
                                      <span>
                                        ${[...n.choices.map(e=>e.label),...n.apiKeyProvider?[p(`modelProviders.status.apiKey`)]:[]].join(` · `)}
                                      </span>
                                    </span>
                                  </button>
                                </li>
                              `)}
                          </ul>
                          ${l.length?E:w`
                                  <p class="muted" role="status">
                                    ${p(c?`modelProviders.noMatches`:`modelProviders.login.noProviders`)}
                                  </p>
                                `}
                        `}
            </div>
            <div class="model-setup-wizard__footer">
              ${r?w`
                      <button
                        class="btn model-provider-login__secondary"
                        data-models-login-back
                        @click=${()=>{t()&&(e.providers=void 0,e.providerId=``,this.focusPicker=`search`,this.host.requestUpdate())}}
                      >
                        ${p(`common.back`)}
                      </button>
                    `:!e.providers&&this.options.onDiscover?w`
                        <button
                          class="btn model-provider-login__secondary"
                          data-models-login-discover
                          ?disabled=${!e.isCurrent()}
                          @click=${()=>{this.picker===e&&e.isCurrent()&&(this.reset(),this.options.onDiscover?.())}}
                        >
                          ${p(`modelProviders.login.discover`)}
                        </button>
                      `:E}
              <button class="btn" @click=${()=>this.reset()}>${p(`common.cancel`)}</button>
            </div>
          </div>
        </openclaw-modal-dialog>
      `}return this.wizard.render({mode:this.mode,busy:this.mutationActive,refreshWarning:this.refreshWarning})}async complete(e){let t=e.startMethod===`openclaw.setup.activate.start`;if(t&&!e.modelActivation){this.runner.fail(p(`modelSetup.errors.activationFailed`));return}let n=this.runner.state.authLabel;this.runner.close(),this.message={kind:`success`,text:t?p(`modelProviders.login.activated`):[n,p(`modelProviders.login.done`)].filter(Boolean).join(`: `),warning:[e.modelActivation?.gatewayRestartRequired?p(`labsPage.restartRequired`):null,this.refreshWarning].filter(Boolean).join(`
`)||void 0},this.host.requestUpdate(),await this.options.refresh()}async run(e,t=!1){let n=this.options.getScope().context.gateway.snapshot.client;if(!n||this.mutationActive&&!t||!this.options.canContinue())return;let r=++this.generation;this.mutationActive=!0,this.host.requestUpdate();try{let t=await this.options.getScope().context.runtimeConfig.runExternalMutation(async t=>{if(t!==n)throw Error(p(`modelProviders.requestFailed`));let r=await e();return r&&m(t),r},{canDispatch:()=>r===this.generation&&this.options.getScope().context.gateway.snapshot.client===n&&this.options.canContinue(),dispatchError:p(`modelProviders.requestFailed`)});if(r!==this.generation)return;if(!t.ok){this.runner.fail(t.error);return}this.refreshWarning=t.refresh.ok?null:t.refresh.error,t.value&&t.value.isCurrent?.()!==!1&&await this.complete(t.value)}catch(e){r===this.generation&&this.runner.fail(s(e,p(`modelProviders.requestFailed`)))}finally{r===this.generation&&(this.mutationActive=!1,this.host.requestUpdate())}}}})))()}function yt(e){let t=e.auth;if(!t)return E;let n=Tt[t.kind],r=p(n.labelKey),i=t.expiryLabel?p(`modelProviders.expiresIn`,{time:t.expiryLabel}):void 0;return w`
    <span title=${i??r}> ${N({kind:n.kind,label:r})} </span>
  `}function bt(e){return e.hasConfigApiKey||!!e.apiKey||e.profiles.length>0}function xt(e){return e.catalogStatus===`ready`&&e.auth?.kind!==`expired`&&e.auth?.kind!==`missing`&&e.auth?.kind!==`expiring`}function St(e){if(e.checkingModels)return N({kind:`muted`,label:p(`chat.modelControls.checkingProviderModels`,{providers:e.displayName})});if(e.auth?.kind===`expired`||e.auth?.kind===`missing`||e.auth?.kind===`expiring`)return yt(e);if(e.catalogStatus===`auth-rejected`)return N({kind:`danger`,label:p(`modelProviders.status.denied`)});if(e.catalogStatus===`unavailable`)return N({kind:`warn`,label:p(`modelProviders.status.modelsUnavailable`)});if(!bt(e))return yt(e);let t=xt(e),n=t&&e.availableModelCount>0;return N({kind:n?`ok`:`muted`,label:p(n?`modelProviders.status.ready`:t?`modelProviders.status.ok`:`modelProviders.status.configured`)})}function Ct(e){return e?w`
    <div class="callout ${e.kind}" role=${e.kind===`error`?`alert`:`status`}>
      ${e.text}
    </div>
    ${e.warning?w`<div class="callout warning" role="status">${e.warning}</div>`:E}
  `:E}function wt(e,t=!1){return w`<button
    class=${t?`btn primary`:`btn`}
    data-models-connect
    ?disabled=${e.connectDisabled}
    @click=${e.onConnect}
  >
    ${p(`modelProviders.login.action`)}
  </button>`}var Tt;function Et(){return(Et=e((()=>{D(),I(),b(),de(),ue(),Tt={ok:{kind:`ok`,labelKey:`modelProviders.status.ok`},expiring:{kind:`warn`,labelKey:`modelProviders.status.expiring`},expired:{kind:`danger`,labelKey:`modelProviders.status.expired`},missing:{kind:`danger`,labelKey:`modelProviders.status.missing`},"api-key":{kind:`muted`,labelKey:`modelProviders.status.apiKey`}}})))()}export{Ne as A,B as C,Me as D,je as E,Fe as F,z as M,ke as N,Oe as O,Ie as P,Ve as S,H as T,Be as _,Ct as a,G as b,$ as c,Q as d,ht as f,Ke as g,qe as h,wt as i,Pe as j,Le as k,_t as l,Qe as m,xt as n,St as o,Ze as p,Et as r,vt as s,bt as t,Y as u,We as v,Ae as w,Ue as x,K as y};