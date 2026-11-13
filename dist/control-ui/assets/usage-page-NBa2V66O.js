import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Ii as n,Oi as r,bi as i,eo as a,ha as o,hi as s,ii as c,ja as l,qr as u,zr as d}from"./control-ui-foundation-C3MHh_P-.js";import{F as f,M as p,Qi as m,R as h,T as g,Ul as _,Wl as v,Xi as y,Yi as b,bu as x,cc as S,hr as C,hu as w,lu as T,pr as E,sc as ee,su as D,uu as O,w as k,xu as te,zi as A}from"./control-ui-core-pYNj5S1a.js";import{Ma as j,Xi as M,Zi as N,ja as P,va as F,vi as ne,wi as I,yi as re}from"./control-ui-core-D6clmJs8.js";import{$ as L,C as R,T as ie,X as z,Y as B,ct as V,m as ae,nt as oe,p as H,tt as U,ut as W}from"./lit-runtime-DZL1fcCI.js";import{Io as se,Ji as ce,Nl as le,Vo as ue,Xi as de,_n as fe,no as pe,ro as me}from"./control-ui-boot-shared-3Hl8ksFq.js";import{At as he,Di as ge,Dt as _e,Ei as ve,Et as ye,Hr as be,Oi as xe,Ti as Se,Vr as Ce,Ya as we,_t as G,ea as Te,jt as Ee,ki as De,na as Oe,wi as ke}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as Ae,t as je}from"./settings-workspace-DKW0BVnu.js";import{n as Me,t as Ne}from"./agent-row-chip-DpS83BWh.js";import{n as Pe,t as Fe}from"./agent-scope-control-DWOXrjh1.js";import{i as Ie,n as Le,r as Re}from"./usage-D4Pyumej.js";import{a as ze,i as Be,n as Ve,r as He}from"./usage-CNBIeCDY.js";import{n as Ue,t as We}from"./provider-usage-1TWMOVJN.js";import{a as Ge,c as Ke,d as qe,i as Je,l as Ye,n as Xe,o as Ze,r as Qe,s as $e,t as et,u as tt}from"./request-usage-snapshot-Ch3TD2kq.js";function nt(e,t){return[e,t].some(e=>e&&e.status!==`fresh`)}function rt(e){let t=e.cacheRefresh!==`complete`&&!e.totals?.totalTokens&&!e.totals?.totalCost&&!e.sessions.some(e=>e.usage?.computedAt!==void 0||e.usage?.totalTokens||e.usage?.totalCost)&&!e.costDaily.some(e=>e.totalTokens||e.totalCost);return{hasOverviewData:!t&&!!(e.totals||e.sessions.length||e.costDaily.length),loadingOverview:e.loading||t&&e.cacheRefresh===`retrying`}}function it(e,t){let n=0,r=0,i=[];for(let a of t?[e&&Object.hasOwn(e,t)?e[t]:void 0]:Object.values(e??{}))a&&(n=Math.max(n,a.usageUpdatedAt),r=Math.max(r,a.committedAt),a.usageRefreshFailed&&i.push(a));return{updatedAt:n,committedAt:r,failures:i}}function at(e,t,n){let r=m(t),i=ge(r?ve():e,t,n);return{clearData:r,status:r&&i.error?{...i,error:b(`usage details`)}:i}}function ot(){return(ot=e((()=>{xe(),y()})))()}function st(e,t){let n=null,r=(t,r)=>{if(n===t){n=null;try{r()}catch{}finally{e.requestUpdate()}}};return{get pending(){return n!==null},cancel:()=>{let t=n;n=null,t?.abort(),e.requestUpdate()},async run(i){let a=n,o=new AbortController;n=o,a?.abort(),e.requestUpdate();let s;try{s=await t.task(i,{signal:o.signal})}catch(e){r(o,()=>t.onError(e));return}r(o,()=>t.onComplete(s))}}}function ct(e,t){return e?.key===t.key&&e.agentId===t.agentId&&e.sessionId===t.sessionId}function lt(e,t,n,r,i,a){let o=null,s=ve(),c=null,u=0,d=st(e,{task:async([e,t],{signal:r})=>({target:t,data:await n(e,{key:t.key,...!l(t.key.trim())&&t.agentId?{agentId:t.agentId}:{}},r,t.sessionId)}),onComplete:e=>{c=null,o=e,s=Se()},onError:e=>{c=null;let n=at(s,e,t.snapshot);n.clearData&&o&&delete o.data,s=n.status}}),f=()=>{c&&t.snapshot&&!C(t.snapshot)&&(s=ge(s,void 0,t.snapshot)),c=null,u+=1,d.cancel()},p=e=>{o=e?{target:e}:null,s=ve(),a?.()};return{get data(){return o?.data??null},get status(){return s},get loading(){return c!==null},async recover(e,n=!1){let i=u,a=r(e);await c,i===u&&ct(a,r(e))&&t.snapshot&&C(t.snapshot)&&(s.awaitingGateway||s.error!==null||n&&!s.hasLoaded)&&this.load(e)},load(e,n=!0){let a=t.client;if(!a||!t.connected)return Promise.resolve();let l=!!e&&i?.(e)!==!1,m=r(e),h=ct(o?.target,m);return(!h||!l)&&p(l?m:void 0),l?!n&&h?c??Promise.resolve():(s=ke(s),u+=1,c=d.run([a,m])):(f(),Promise.resolve())},cancel:f,clear(){p(),f()}}}var ut;function dt(){return(dt=e((()=>{o(),xe(),O(),E(),ot(),ut=class{constructor(e,t,n,r,i){let a=e=>{let t=r().find(t=>t.key===e),i=t?.agentId??n().agentId;return{key:e,...i?{agentId:i}:{},sessionId:t?.sessionId}};this.timeSeries=lt(e,t,Ie,a,void 0,i),this.sessionLogs=lt(e,t,async(e,t)=>{let n=await Re(e,t);return Array.isArray(n.logs)?n.logs:null},a),this.contextWeight=lt(e,t,async(e,t,r,i)=>{let a=(await Le(e,{...n(),agentId:t.agentId},{key:t.key,includeContextWeight:!0,signal:r})).sessions[0];if(i!==void 0&&a?.sessionId!==void 0&&a.sessionId!==i)throw Error(w(`usage.details.contextOutOfDate`));return a?.contextWeight},a,e=>r().some(t=>t.key===e&&t.hasContextWeight))}load(e,t=!0){this.timeSeries.load(e,t),this.sessionLogs.load(e,t),this.contextWeight.load(e)}cancel(){this.timeSeries.cancel(),this.sessionLogs.cancel(),this.contextWeight.cancel()}clear(){this.timeSeries.clear(),this.sessionLogs.clear(),this.contextWeight.clear()}}})))()}var ft,pt;function mt(){return(mt=e((()=>{te(),ft={usage:{presets:{today:`Today`,last7d:`7d`,last30d:`30d`,last90d:`90d`,last1y:`1y`,all:`All`},scope:{instance:`Current instance`,instanceHint:`Show only the active session id for each logical session.`,family:`Historical lineage`,familyHint:`Roll up known rotated transcript-backed session ids.`,familyIncluded:`Historical lineage includes {count} session instances.`},filters:{rangeTitle:`Reporting range`,rangeHint:`Choose the dates to include in every chart and total.`,title:`Filters`,to:`to`,startDate:`Start date`,endDate:`End date`,timeZone:`Time zone`,timeZoneLocal:`Local`,timeZoneUtc:`UTC`,pin:`Pin`,pinned:`Pinned`,selectAll:`Select All`,clear:`Clear`,clearAll:`Clear All`,remove:`Remove filter`,removeDays:`Remove days filter`,removeHours:`Remove hours filter`,removeSession:`Remove session filter`,all:`All`,days:`Days`,hours:`Hours`,session:`Session`,agent:`Agent`,channel:`Channel`,provider:`Provider`,model:`Model`,tool:`Tool`,daysCount:`{count} days`,hoursCount:`{count} hours`,sessionsCount:`{count} sessions`},query:{placeholder:`Filter sessions (e.g. key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)`,apply:`Filter (client-side)`,matching:`{shown} of {total} sessions match`,inRange:`{total} sessions in range`,tip:`Tip: use filters or click bars to refine days.`},export:{label:`Export`,changed:`Session context changed while preparing the export. Refresh usage and try again.`,sessionsCsv:`Sessions CSV`,dailyCsv:`Daily CSV`,json:`JSON`},cacheStatus:{warning:`Usage data may be incomplete. Checking for updated totals automatically.`,paused:`Usage data may be incomplete. Automatic checks paused; select Refresh to check again.`},creators:{title:`Started by`,description:`Usage grouped by who started each session. This is session attribution, not per-turn billing.`,all:`All identities`,select:`Filter by session creator`,selected:`Selected identity`,identity:`Identity`,unattributed:`Unattributed`,system:`System`,empty:`No usage for these dates and filters.`,more:`Show {count} more identities`},empty:{title:`No usage in this date range`,subtitle:`Try a wider date range or another identity to explore more history.`,hint:`Choose a wider date range or another identity.`,noData:`No data`},daily:{title:`Daily Usage`,total:`Total`,byType:`By Type`,tokensTitle:`Daily Token Usage`,costTitle:`Daily Cost`,compressedScaleHint:`Square-root scale keeps low-usage days visible.`},costWindows:{title:`Cost Windows`,subtitle:`Calendar windows ending {date}`,selectedRange:`Selected Range`,lastDays:`Last {count} days`,perDay:`/ day`},overview:{messages:`Messages`,messagesHint:`Total user and assistant messages in range.`,messagesAbbrev:`msgs`,user:`user`,assistant:`assistant`,toolCalls:`Tool Calls`,toolCallsHint:`Total tool call count across sessions.`,toolsUsed:`tools used`,errors:`Errors`,errorsHint:`Total message and tool errors in range.`,toolResults:`tool results`,avgTokens:`Avg Tokens / Msg`,avgTokensHint:`Average tokens per message in this range.`,avgCost:`Avg Cost / Msg`,avgCostHint:`Average cost per message when providers report costs.`,avgCostHintMissing:`Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range.`,acrossMessages:`Across {count} messages`,sessions:`Sessions`,sessionsHint:`Distinct sessions in the range.`,sessionsInRange:`of {count} in range`,throughput:`Throughput`,throughputHint:`Throughput shows tokens per minute over active time. Higher is better.`,tokensPerMinute:`tok/min`,perMinute:`/ min`,errorRate:`Error Rate`,errorHint:`Error rate = errors / total messages. Lower is better.`,avgSession:`avg session`,cacheHitRate:`Cache Hit Rate`,cacheHint:`Cache hit rate = cache read / (input + cache read + cache write). Higher is better.`,cached:`cached`,prompt:`prompt`,calls:`calls`,costShare:`{percent}% of cost`,topModels:`Top Models`,topProviders:`Top Providers`,topTools:`Top Tools`,topAgents:`Top Agents`,topChannels:`Top Channels`,peakErrorDays:`Peak Error Days`,peakErrorHours:`Peak Error Hours`,noModelData:`No model data`,noProviderData:`No provider data`,noToolCalls:`No tool calls`,noAgentData:`No agent data`,noChannelData:`No channel data`,noErrorData:`No error data`},sessions:{title:`Sessions`,shown:`{count} shown`,total:`{count} total`,avg:`avg`,all:`All`,recent:`Recently viewed`,recentShort:`Recent`,sort:`Sort`,ascending:`Ascending`,descending:`Descending`,clearSelection:`Clear Selection`,noRecent:`No recent sessions`,noneInRange:`No sessions in range`,more:`+{count} more`,selected:`Selected ({count})`,copy:`Copy`,limitReached:`Showing first 1,000 sessions. Narrow date range for complete results.`},mosaic:{title:`Activity by Time`,subtitleEmpty:`Estimates require session timestamps.`,subtitle:`Estimated from session spans (first/last activity). Time zone: {zone}.`,noTimelineData:`No timeline data yet.`,dayOfWeek:`Day of Week`,midnight:`Midnight`,fourAm:`4am`,eightAm:`8am`,noon:`Noon`,fourPm:`4pm`,eightPm:`8pm`,legend:`Low → High token density`,sun:`Sun`,mon:`Mon`,tue:`Tue`,wed:`Wed`,thu:`Thu`,fri:`Fri`,sat:`Sat`}}},pt=Object.assign(()=>{let{overview:e,...t}=ft.usage;Object.assign(x.usage,t),Object.assign(x.usage.overview,e)},{catalog:ft})})))()}function ht({agentId:e,key:t,sessionId:n}){return JSON.stringify([e,t,n])}function gt(e,t,n){return st(e,{task:async(e,{signal:r})=>{let i=t.capture();if(!i)throw Error(w(`common.offline`));let a=`openclaw-usage-${Je()}.json`,o=new Map;if(e.sessions.some(e=>e.hasContextWeight)){let t=await Le(i.client,n(),{includeContextWeight:!0,signal:r});if(o=new Map(t.sessions.map(e=>[ht(e),e.contextWeight])),e.sessions.some(e=>e.hasContextWeight&&!o.get(ht(e))))throw Error(w(`usage.export.changed`))}return{connection:i,filename:a,data:{...e,sessions:e.sessions.map(e=>({...e,contextWeight:o.get(ht(e))??null}))}}},onComplete:({connection:e,filename:n,data:r})=>{t.isCurrent(e)&&fe(n,JSON.stringify(r,null,2),`application/json;charset=utf-8`)},onError:e=>{v({message:`${w(`usage.export.label`)}: ${tt(e)}`})}})}function _t(){return(_t=e((()=>{O(),mt(),_(),$e(),pt()})))()}function vt(e,t,n){let r=t?.sessions.map(e=>e.agentId).filter(e=>!!e?.trim())??[];return L`
    ${_e({title:j(`usage`),subtitle:P(`usage`),actions:Pe({agents:e.agents.state.agentsList?.agents??[],additionalAgentIds:r,selection:e.agentSelection})})}
    ${Ae(n)}
  `}function yt(e){return L`
    <span class="settings-status settings-status--accent">
      <span class="usage-loading-spinner" aria-hidden="true"></span>
      ${e}
    </span>
  `}function bt(e){return L`
    <section class="settings-group usage-panel usage-empty-state">
      <div class="usage-empty-state__title">${w(`usage.empty.title`)}</div>
      <div class="card-sub usage-empty-state__subtitle">${w(`usage.empty.subtitle`)}</div>
      <div class="usage-empty-state__actions">
        <button class="btn primary" @click=${e}>${w(`common.refresh`)}</button>
      </div>
    </section>
  `}function xt(e,t,n){return De({status:e,errorMessage:e.error?w(`usage.details.loadFailed`,{detail:a(w(t)),error:e.error}):void 0,className:`usage-callout usage-detail-error--${n}`})}function St(){return(St=e((()=>{B(),F(),Fe(),xe(),G(),je(),O()})))()}function K(){return{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}}function Ct(e,t){if(e.input+=t.input,e.output+=t.output,e.cacheRead+=t.cacheRead,e.cacheWrite+=t.cacheWrite,e.totalTokens+=t.totalTokens,e.totalCost+=t.totalCost,e.inputCost+=t.inputCost,e.outputCost+=t.outputCost,e.cacheReadCost+=t.cacheReadCost,e.cacheWriteCost+=t.cacheWriteCost,e.missingCostEntries+=t.missingCostEntries,t.missingCostByModel){e.missingCostByModel??={};for(let[n,r]of Object.entries(t.missingCostByModel))e.missingCostByModel[n]=(e.missingCostByModel[n]??0)+r}}function wt(e,t){return JSON.stringify([e??`unknown`,t??`unknown`])}function Tt(e,t,n){return JSON.stringify([e,t??`unknown`,n??`unknown`])}function Et(){return{count:0,sum:0,min:1/0,max:0,p95Max:0}}function Dt(e,t){e.count+=t.count,e.sum+=t.avgMs*t.count,e.min=Math.min(e.min,t.minMs),e.max=Math.max(e.max,t.maxMs),e.p95Max=Math.max(e.p95Max,t.p95Ms)}function Ot(e){return{count:e.count,avgMs:e.count?e.sum/e.count:0,minMs:e.min===1/0?0:e.min,maxMs:e.max,p95Ms:e.p95Max}}function kt(e,t,n,r){let i=e.get(t)??{provider:n.provider,model:r,count:0,totals:K()};i.count+=n.count,Ct(i.totals,n.totals),e.set(t,i)}function At(e,t,n){if(!t)return;let r=e.get(t)??K();Ct(r,n),e.set(t,r)}function jt(e,t){return t.totals.totalCost-e.totals.totalCost||t.totals.totalTokens-e.totals.totalTokens}function Mt(){let e=K(),t={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},n=new Map,r=new Map,i=new Map,a=new Map,o=new Map,s=new Map,c=new Map,l=new Map,u=new Map,d=new Map,f=Et(),p=0,m=0;function h(e){let t=c.get(e);return t||(t={date:e,tokens:0,cost:0,messages:0,toolCalls:0,errors:0},c.set(e,t)),t}function g({usage:c,agentId:g,channel:_,createdActor:v,creatorKey:y=Nt}){if(!c)return;Ct(e,c),m=Math.max(m,c.durationMs??0);let b=c.firstActivity!==void 0||(c.messageCounts?.total??0)>0;b&&(p+=1),c.messageCounts&&(t.total+=c.messageCounts.total,t.user+=c.messageCounts.user,t.assistant+=c.messageCounts.assistant,t.toolCalls+=c.messageCounts.toolCalls,t.toolResults+=c.messageCounts.toolResults,t.errors+=c.messageCounts.errors);for(let e of c.toolUsage?.tools??[])n.set(e.name,(n.get(e.name)??0)+e.count);for(let e of c.modelUsage??[])kt(r,wt(e.provider,e.model),e,e.model),kt(i,e.provider??`unknown`,e,void 0);At(a,g,c),At(o,_,c);let x=s.get(y)??{key:y,...v?{actor:v}:{},totals:K(),sessionCount:0,daily:new Map,sessionActivity:new Map};if(Ct(x.totals,c),b){x.sessionCount+=1;let e=[...new Set([...c.activityDates??[],...c.dailyBreakdown?.map(({date:e})=>e)??[],...c.dailyMessageCounts?.map(({date:e})=>e)??[]])].toSorted(),t=JSON.stringify(e),n=x.sessionActivity.get(t)??{dates:e,sessionCount:0};n.sessionCount+=1,x.sessionActivity.set(t,n)}s.set(y,x),c.latency&&c.latency.count>0&&Dt(f,c.latency);for(let e of c.dailyLatency??[]){let t=u.get(e.date)??Et();Dt(t,e),u.set(e.date,t)}for(let e of c.dailyBreakdown??[]){let t=h(e.date);t.tokens+=e.tokens,t.cost+=e.cost,At(l,e.date,e),At(x.daily,e.date,e)}for(let e of c.dailyMessageCounts??[]){let t=h(e.date);t.messages+=e.total,t.toolCalls+=e.toolCalls,t.errors+=e.errors}for(let e of c.dailyModelUsage??[]){let t=Tt(e.date,e.provider,e.model),n=d.get(t)??{date:e.date,provider:e.provider,model:e.model,tokens:0,cost:0,count:0};n.tokens+=e.tokens,n.cost+=e.cost,n.count+=e.count,d.set(t,n)}}function _(){let e=Array.from(n,([e,t])=>({name:e,count:t})).toSorted((e,t)=>t.count-e.count);return{sessionCount:p,...m>0?{longestSessionDurationMs:m}:{},messages:t,tools:{totalCalls:e.reduce((e,{count:t})=>e+t,0),uniqueTools:n.size,tools:e},byModel:Array.from(r.values()).toSorted(jt),byProvider:Array.from(i.values()).toSorted(jt),byAgent:Array.from(a,([e,t])=>({agentId:e,totals:t})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),byChannel:Array.from(o,([e,t])=>({channel:e,totals:t})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),byCreator:Array.from(s.values(),({daily:e,sessionActivity:t,...n})=>({...n,daily:Array.from(e,([e,t])=>({date:e,...t})).toSorted((e,t)=>e.date.localeCompare(t.date)),sessionActivity:Array.from(t.values()).toSorted((e,t)=>e.dates.join(`,`).localeCompare(t.dates.join(`,`)))})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost||t.totals.totalTokens-e.totals.totalTokens||e.key.localeCompare(t.key)),costDaily:Array.from(l,([e,t])=>({date:e,...t})).toSorted((e,t)=>e.date.localeCompare(t.date)),latency:f.count>0?Ot(f):void 0,dailyLatency:Array.from(u,([e,t])=>({date:e,...Ot(t)})).toSorted((e,t)=>e.date.localeCompare(t.date)),modelDaily:Array.from(d.values()).toSorted((e,t)=>e.date.localeCompare(t.date)||t.cost-e.cost),daily:Array.from(c.values()).toSorted((e,t)=>e.date.localeCompare(t.date))}}return{totals:e,add:g,finish:_}}var Nt;function Pt(){return(Pt=e((()=>{Nt=`["unknown"]`})))()}function Ft(e){return Math.round(e/rn)}function q(e){return g(e,{thousandsSuffix:`K`,trimTrailingZero:!1})}function J(e,t=2){return`$${e.toFixed(t)}`}function Y(e){let t=Math.abs(e);return J(e,t===0||t>=.01?2:t>=1e-4?4:6)}function It(e){return new Date(Date.UTC(1970,0,1,e)).toLocaleTimeString(void 0,{hour:`numeric`,timeZone:`UTC`})}function Lt(e,t,n){let r=e.usage;if(!r)return!1;let i=r.firstActivity??e.updatedAt,a=r.lastActivity??e.updatedAt;if(!i||!a)return!1;let o=Math.min(i,a),s=Math.max(i,a);if(o===s){let e=new Date(o);return n({usage:r,hour:zt(e,t),weekday:Bt(e,t),share:1}),!0}let c=s-o,l=o;for(;l<s;){let e=new Date(l),i=Math.min(Ut(e,t),s);n({usage:r,hour:zt(e,t),weekday:Bt(e,t),share:(i-l)/c}),l=i}return!0}function Rt(e,t){let n=Array.from({length:24},()=>0),r=Array.from({length:24},()=>0);for(let i of e){let e=i.usage;if(!e?.messageCounts||e.messageCounts.total===0)continue;let a=e.messageCounts;if(e.utcQuarterHourMessageCounts&&e.utcQuarterHourMessageCounts.length>0){let i={utcDateKey:void 0,utcWeekday:null,utcStartMs:0};for(let a of e.utcQuarterHourMessageCounts){let e=Ht(a.date,a.quarterIndex,t,i);e&&(n[e.hour]=(n[e.hour]??0)+a.errors,r[e.hour]=(r[e.hour]??0)+a.total)}continue}Lt(i,t,({hour:e,share:t})=>{n[e]=(n[e]??0)+(a.errors??0)*t,r[e]=(r[e]??0)+a.total*t})}return r.map((e,t)=>{let r=n[t]??0;return{hour:t,rate:e>0?r/e:0,errors:r,msgs:e}}).filter(e=>e.msgs>0&&e.errors>0).toSorted((e,t)=>t.rate-e.rate).slice(0,5).map(e=>({label:It(e.hour),value:`${(e.rate*100).toFixed(2)}%`,sub:`${Math.round(e.errors)} ${a(w(`usage.overview.errors`))} · ${Math.round(e.msgs)} ${w(`usage.overview.messagesAbbrev`)}`}))}function zt(e,t){return t===`utc`?e.getUTCHours():e.getHours()}function Bt(e,t){return t===`utc`?e.getUTCDay():e.getDay()}function Vt(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let[,n,r,i]=t,a=Number(n),o=Number(r),s=Number(i),c=new Date(Date.UTC(a,o-1,s));return Number.isNaN(c.valueOf())||c.getUTCFullYear()!==a||c.getUTCMonth()!==o-1||c.getUTCDate()!==s?null:c}function Ht(e,t,n,r){if(!Number.isInteger(t)||t<0||t>95)return null;if(e!==r.utcDateKey){r.utcDateKey=e;let t=Vt(e);r.utcWeekday=t?t.getUTCDay():null,r.utcStartMs=t?t.getTime():0}if(r.utcWeekday===null)return null;let i=n===`local`?new Date(r.utcStartMs+t*9e5):null;return{hour:i?zt(i,n):Math.floor((t+0)/4),weekday:i?Bt(i,n):r.utcWeekday}}function Ut(e,t){let n=e.getTime(),r=t===`utc`?e.getUTCMinutes():e.getMinutes(),i=t===`utc`?e.getUTCSeconds():e.getSeconds(),a=n+(60-r)*6e4-i*1e3-e.getMilliseconds();if(t===`utc`||new Date(a-1).getTimezoneOffset()===e.getTimezoneOffset())return a;let o=e.getTimezoneOffset(),s=n+1,c=a-1;for(;s<c;){let e=s+Math.floor((c-s)/2);new Date(e).getTimezoneOffset()===o?s=e+1:c=e}return s}function Wt(e,t,n){let r=e.usage?.utcQuarterHourTokenUsage;if(!r||r.length===0)return!1;let i=!1,a={utcDateKey:void 0,utcWeekday:null,utcStartMs:0};for(let e of r){if(e.totalTokens<=0)continue;let r=Ht(e.date,e.quarterIndex,t,a);if(r&&(i=!0,n({hour:r.hour,weekday:r.weekday,tokens:e.totalTokens})===!1))break}return i}function Gt(e,t,n){let r=e.usage,i=r?.firstActivity??e.updatedAt,a=r?.lastActivity??e.updatedAt;if(!i||!a)return!1;let o=Math.min(i,a),s=Math.max(i,a),c=o;for(;c<=s;){let e=new Date(c),r=zt(e,n);if(t.includes(r))return!0;if(c===s)break;c=Math.min(Ut(e,n),s)}return!1}function Kt(e,t,n){if(t.length===0)return!0;let r=!1;return Wt(e,n,({hour:e})=>(r=t.includes(e),!r))?r:Gt(e,t,n)}function qt(e,t){let n=Array.from({length:24},()=>0),r=Array.from({length:7},()=>0),i=0,a=!1;for(let o of e){let e=o.usage;if(!(!e||!e.totalTokens||e.totalTokens<=0)){if(i+=e.totalTokens,Wt(o,t,({hour:e,weekday:t,tokens:i})=>{n[e]=(n[e]??0)+i,r[t]=(r[t]??0)+i})){a=!0;continue}Lt(o,t,({usage:e,hour:t,weekday:i,share:a})=>{n[t]=(n[t]??0)+e.totalTokens*a,r[i]=(r[i]??0)+e.totalTokens*a})&&(a=!0)}}let o=[w(`usage.mosaic.sun`),w(`usage.mosaic.mon`),w(`usage.mosaic.tue`),w(`usage.mosaic.wed`),w(`usage.mosaic.thu`),w(`usage.mosaic.fri`),w(`usage.mosaic.sat`)].map((e,t)=>({label:e,tokens:r[t]??0}));return{hasData:a,totalTokens:i,hourTotals:n,weekdayTotals:o}}function Jt(e,t,n,r){let i=qt(e,t);if(!i.hasData)return he({title:w(`usage.mosaic.title`),description:w(`usage.mosaic.subtitleEmpty`),actions:L`
          <div class="usage-mosaic-total">
            ${q(0)} ${a(w(`usage.metrics.tokens`))}
          </div>
        `},L`
        <div class="usage-panel usage-mosaic">
          <div class="usage-empty-block usage-empty-block--compact">
            ${w(`usage.mosaic.noTimelineData`)}
          </div>
        </div>
      `);let o=Math.max(...i.hourTotals,1),s=Math.max(...i.weekdayTotals.map(e=>e.tokens),1);return he({title:w(`usage.mosaic.title`),description:w(`usage.mosaic.subtitle`,{zone:w(t===`utc`?`usage.filters.timeZoneUtc`:`usage.filters.timeZoneLocal`)}),actions:L`
        <div class="usage-mosaic-total">
          ${q(i.totalTokens)}
          ${a(w(`usage.metrics.tokens`))}
        </div>
      `},L`
      <div class="usage-panel usage-mosaic">
        <div class="usage-mosaic-grid">
          <div class="usage-mosaic-section">
            <div class="usage-mosaic-section-title">${w(`usage.mosaic.dayOfWeek`)}</div>
            <div class="usage-daypart-grid">
              ${i.weekdayTotals.map(e=>{let t=Math.min(e.tokens/s,1),n=e.tokens>0?`color-mix(in srgb, var(--accent) ${(12+t*60).toFixed(1)}%, transparent)`:`transparent`;return L`
                  <div class="usage-daypart-cell" style="background: ${n};">
                    <div class="usage-daypart-label">${e.label}</div>
                    <div class="usage-daypart-value">${q(e.tokens)}</div>
                  </div>
                `})}
            </div>
          </div>
          <div class="usage-mosaic-section">
            <div class="usage-mosaic-section-title">
              <span>${w(`usage.filters.hours`)}</span>
              <span class="usage-mosaic-sub">0 → 23</span>
            </div>
            <div class="usage-hour-grid">
              ${i.hourTotals.map((e,t)=>{let i=Math.min(e/o,1),s=e>0?`color-mix(in srgb, var(--accent) ${(8+i*70).toFixed(1)}%, transparent)`:`transparent`,c=`${t}:00 · ${q(e)} ${a(w(`usage.metrics.tokens`))}`,l=i>.7?`color-mix(in srgb, var(--accent) 60%, transparent)`:`color-mix(in srgb, var(--accent) 24%, transparent)`,u=n.includes(t);return L`
                  <button
                    type="button"
                    class="usage-hour-cell ${u?`selected`:``}"
                    style="background: ${s}; border-color: ${l};"
                    title="${c}"
                    aria-label=${c}
                    aria-pressed=${u?`true`:`false`}
                    @click=${e=>r(t,e.shiftKey)}
                  ></button>
                `})}
            </div>
            <div class="usage-hour-labels">
              <span>${w(`usage.mosaic.midnight`)}</span>
              <span>${w(`usage.mosaic.fourAm`)}</span>
              <span>${w(`usage.mosaic.eightAm`)}</span>
              <span>${w(`usage.mosaic.noon`)}</span>
              <span>${w(`usage.mosaic.fourPm`)}</span>
              <span>${w(`usage.mosaic.eightPm`)}</span>
            </div>
            <div class="usage-hour-legend">
              <span></span>
              ${w(`usage.mosaic.legend`)}
            </div>
          </div>
        </div>
      </div>
    `)}function Yt(e,t=`local`){let n=t===`utc`?e.getUTCFullYear():e.getFullYear(),r=(t===`utc`?e.getUTCMonth():e.getMonth())+1,i=t===`utc`?e.getUTCDate():e.getDate();return`${n}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`}function Xt(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let[,n,r,i]=t,a=Number(n),o=Number(r)-1,s=Number(i),c=new Date(a,o,s);return Number.isNaN(c.valueOf())||c.getFullYear()!==a||c.getMonth()!==o||c.getDate()!==s?null:c}function Zt(e){let t=Vt(e);return t?t.getTime()/an:null}function Qt(e){return new Date(e*an).toISOString().slice(0,10)}function $t(e){let t=Xt(e);return t?t.toLocaleDateString(void 0,{month:`short`,day:`numeric`}):e}function en(e){let t=Xt(e);return t?t.toLocaleDateString(void 0,{month:`long`,day:`numeric`,year:`numeric`}):e}function tn(e,t,n){let r=Zt(t),i=Zt(n);if(r===null||i===null||r>i)return null;let a=K();for(let t of e){let e=Zt(t.date);e!==null&&e>=r&&e<=i&&Ct(a,t)}return{days:i-r+1,startDate:t,endDate:n,totals:a}}function nn(e,t,n,r=[1,7,30,90]){let i=Zt(t),a=Zt(n);if(i===null||a===null||i>a)return[];let o=a-i+1;return Array.from(new Set(r.map(e=>Math.max(1,Math.trunc(e))))).filter(e=>e<o).toSorted((e,t)=>e-t).map(t=>tn(e,Qt(a-t+1),n)).filter(e=>e!==null)}var rn,an,on,sn;function X(){return(X=e((()=>{B(),Pt(),G(),O(),mt(),h(),pt(),rn=4,an=864e5,on=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};let n=Mt();for(let t of e)n.add(t);return n.finish()},sn=(e,t,n)=>{let r=0,i=0;for(let t of e){let e=t.usage?.durationMs??0;e>0&&(r+=e,i+=1)}let a=i?r/i:0,o=t&&r>0?t.totalTokens/(r/6e4):void 0,s=t&&r>0?t.totalCost/(r/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0;return{durationCount:i,avgDurationMs:a,throughputTokensPerMin:o,throughputCostPerMin:s,errorRate:c}}})))()}function cn(e){return/^[ \t\r\n]*[=+\-@\uFF0B\uFF0D\uFF1D\uFF20]/u.test(e)?`'${e}`:e}function ln(e,t=!0){let n=t?cn(e):e;return/[",\r\n]/.test(n)?`"${n.replaceAll(`"`,`""`)}"`:n}function un(e){return e.map(e=>e==null?``:ln(String(e),typeof e==`string`)).join(`,`)}function dn(e,t){let n=Object.values(t);return[un(Object.keys(t)),...e.map(e=>un(n.map(t=>t(e))))].join(`
`)}function fn(e,t,n,r=12){for(let i of t){if(e.length>=r)break;let t=n(i);t&&!e.includes(t)&&e.push(t)}}function pn(e,t){let n={agent:[],channel:[],provider:[],model:[],tool:[]};return fn(n.agent,e,e=>e.agentId,6),fn(n.channel,e,e=>e.channel),fn(n.provider,e,e=>e.modelProvider),fn(n.provider,e,e=>e.providerOverride),fn(n.provider,t?.byProvider??[],e=>e.provider),fn(n.model,e,e=>e.model),fn(n.model,t?.byModel??[],e=>e.model),fn(n.tool,t?.tools.tools??[],e=>e.name),n}var mn,hn,gn,_n,vn,yn;function bn(){return(bn=e((()=>{s(),$e(),mn=e=>dn(e,{key:e=>e.key,label:e=>e.label,agentId:e=>e.agentId,channel:e=>e.channel,provider:e=>e.modelProvider??e.providerOverride,model:e=>e.model??e.modelOverride,updatedAt:e=>i(e.updatedAt),durationMs:e=>e.usage?.durationMs,messages:e=>e.usage?.messageCounts?.total,errors:e=>e.usage?.messageCounts?.errors,toolCalls:e=>e.usage?.messageCounts?.toolCalls,inputTokens:e=>e.usage?.input,outputTokens:e=>e.usage?.output,cacheReadTokens:e=>e.usage?.cacheRead,cacheWriteTokens:e=>e.usage?.cacheWrite,totalTokens:e=>e.usage?.totalTokens,totalCost:e=>e.usage?.totalCost}),hn=e=>dn(e,{date:e=>e.date,inputTokens:e=>e.input,outputTokens:e=>e.output,cacheReadTokens:e=>e.cacheRead,cacheWriteTokens:e=>e.cacheWrite,totalTokens:e=>e.totalTokens,inputCost:e=>e.inputCost,outputCost:e=>e.outputCost,cacheReadCost:e=>e.cacheReadCost,cacheWriteCost:e=>e.cacheWriteCost,totalCost:e=>e.totalCost}),gn=(e,t)=>{let n=e.trim();if(!n)return[];let r=Ge(n).map(e=>e.raw).at(-1)??``,[i,o]=r.includes(`:`)?[r.slice(0,r.indexOf(`:`)),r.slice(r.indexOf(`:`)+1)]:[``,``],s=a(i),c=a(o);if(!s)return[`agent:`,`channel:`,`provider:`,`model:`,`tool:`,`has:errors`,`has:tools`,`minTokens:`,`maxCost:`].map(e=>({label:e,value:e}));let l;switch(s){case`agent`:case`channel`:case`provider`:case`model`:case`tool`:l=t[s].slice(0,6);break;case`has`:l=[`errors`,`tools`,`context`,`usage`,`model`,`provider`];break;default:return[]}return l.filter(e=>!c||a(e).includes(c)).map(e=>({label:`${s}:${e}`,value:`${s}:${e}`}))},_n=(e,t)=>{let n=e.trim();if(!n)return`${t} `;let r=Ge(n).map(e=>e.raw);return r[r.length-1]=t,`${r.join(` `)} `},vn=(e,t)=>{let n=Ge(e).map(e=>e.raw).filter(e=>e!==t);return n.length?`${n.join(` `)} `:``},yn=(e,t,n)=>{let r=a(t),i=new Map(n.map(e=>[a(e),e])),o=[];for(let t of Ge(e))(a(t.key??``)!==r||i.delete(a(t.value)))&&o.push(t.raw);let s=[...o,...Array.from(i.values(),e=>`${t}:${e}`)];return s.length?`${s.join(` `)} `:``}})))()}function xn(e,t,n){return{key:e,className:`usage-token-${e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}`,labelKey:`usage.breakdown.${e}`,hintKey:t,short:n}}function Sn(e,t){return t===0?0:e/t*100}function Cn(e,t,n,r){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),r(t,e.shiftKey,n))}function wn(e,t){let n=Date.parse(t.startDate),r=(Date.parse(t.endDate)-n)/864e5+1;if(!t.complete||!Number.isInteger(r)||r<1||r>366)return e.toSorted((e,t)=>e.date.localeCompare(t.date));let i=new Map(e.map(e=>[e.date,e]));return Array.from({length:r},(e,t)=>{let r=new Date(n+t*864e5).toISOString().slice(0,10);return i.get(r)??{...K(),date:r}})}function Tn(e,t,n,i,o,s,c){let l=wn(e,c);if(!l.length)return L`
      <div class="daily-chart-compact">
        <div class="card-title usage-section-title">${w(`usage.daily.title`)}</div>
        <div class="usage-empty-block">${w(`usage.empty.noData`)}</div>
      </div>
    `;let u=l.map(e=>e.date),d=n===`tokens`,f=l.map(e=>d?e.totalTokens:e.totalCost),p=Math.max(...f,0),m=p>0?p:d?1:1e-4,h=f.filter(e=>e>0),g=m/(h.length>0?Math.min(...h):m)>50,_=f.map(e=>{if(e<=0)return 0;let t=g?Math.sqrt(e/m):e/m;return Math.max(6,t*200)}),v=l.length>30?12:l.length>20?18:l.length>14?24:32,y=l.length<=14,b=new Set(t);return L`
    <div class="daily-chart-compact">
      <div class="daily-chart-header">
        ${Ee({mode:`buttons`,variant:`accent`,className:`small sessions-toggle`,value:i,onChange:o,onReselect:o,options:[{value:`total`,label:w(`usage.daily.total`)},{value:`by-type`,label:w(`usage.daily.byType`)}]})}
        <div class="card-title">
          ${w(d?`usage.daily.tokensTitle`:`usage.daily.costTitle`)}
          <div class="card-sub daily-chart-range">
            ${en(c.startDate)} – ${en(c.endDate)}
          </div>
          ${g?L`<span
                  class="daily-chart-scale-badge"
                  title=${w(`usage.daily.compressedScaleHint`)}
                  aria-label=${w(`usage.daily.compressedScaleHint`)}
                  >√</span
                >`:z}
        </div>
      </div>
      <div class="daily-chart">
        <div class="daily-chart-plot">
          <div class="daily-chart-scale" aria-hidden="true">
            ${(p>0?[p,p/(g?4:2),0]:[0]).map(e=>L`<span
                  >${d?q(e):e===0?J(0):Y(e)}</span
                >`)}
          </div>
          <div class="daily-chart-bars" style="--bar-max-width: ${v}px">
            ${l.map((e,t)=>{let n=r(_[t],`daily usage bar height`),o=b.has(e.date),c=$t(e.date),f=l.length<=14||t%Math.ceil(l.length/6)===0||t===l.length-1,p=c,m=f?`daily-bar-label`:`daily-bar-label daily-bar-label--hidden`,h=i===`by-type`?Z.map(({key:t,className:n,labelKey:r})=>({value:d?e[t]:e[`${t}Cost`]??0,className:n,labelKey:r})):[],g=h.map(({value:e,labelKey:t})=>`${w(t)} ${d?q(e):Y(e)}`),v=d?q(e.totalTokens):Y(e.totalCost),x=en(e.date),S=`${q(e.totalTokens)} ${a(w(`usage.metrics.tokens`))}`.trim(),C=Y(e.totalCost),T=h.reduce((e,t)=>e+t.value,0)||1;return L`
                <openclaw-tooltip
                  .content=${[x,S,C,...g].join(`
`)}
                >
                  <div
                    class="daily-bar-wrapper ${o?`selected`:``}"
                    role="button"
                    tabindex="0"
                    aria-pressed=${o?`true`:`false`}
                    aria-label=${`${x}: ${S}, ${C}`}
                    @keydown=${t=>Cn(t,e.date,u,s)}
                    @click=${t=>s(e.date,t.shiftKey,u)}
                  >
                    ${i===`by-type`?L`
                            <div
                              class="daily-bar daily-bar--stacked ${n===0?`daily-bar--empty`:``}"
                              style="height: ${n.toFixed(0)}px;"
                            >
                              ${h.map(({className:e,value:t})=>L`
                                  <div
                                    class="cost-segment ${e}"
                                    style="height: ${t/T*100}%"
                                  ></div>
                                `)}
                            </div>
                          `:L`
                            <div
                              class="daily-bar ${n===0?`daily-bar--empty`:``}"
                              style="height: ${n.toFixed(0)}px"
                            ></div>
                          `}
                    ${y?L`<div class="daily-bar-total">${v}</div>`:L`<div
                            class="daily-bar-total daily-bar-total--placeholder"
                            aria-hidden="true"
                          ></div>`}
                    <div class="${m}">${p}</div>
                  </div>
                </openclaw-tooltip>
              `})}
          </div>
        </div>
      </div>
    </div>
  `}function En(e,t){let n=t===`tokens`,r=n?e.totalTokens||1:e.totalCost||0,i=Z.map(({key:t,className:i,labelKey:a})=>{let o=n?e[t]:e[`${t}Cost`]||0;return{className:i,labelKey:a,percentage:Sn(o,r),formatted:n?q(o):Y(o)}});return L`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">
        ${w(n?`usage.breakdown.tokensByType`:`usage.breakdown.costByType`)}
      </div>
      <div class="cost-breakdown-bar">
        ${i.map(({className:e,labelKey:t,percentage:n,formatted:r})=>L`
            <div
              class="cost-segment ${e}"
              style="width: ${n.toFixed(1)}%"
              title="${w(t)}: ${r}"
            ></div>
          `)}
      </div>
      <div class="cost-breakdown-legend">
        ${i.map(({className:e,labelKey:t,formatted:n})=>L`
            <span class="legend-item"
              ><span class="legend-dot ${e}"></span>${w(t)} ${n}</span
            >
          `)}
      </div>
      <div class="cost-breakdown-total">
        ${w(`usage.breakdown.total`)}:
        ${n?q(e.totalTokens):Y(e.totalCost)}
      </div>
    </div>
  `}var Z;function Dn(){return(Dn=e((()=>{c(),B(),G(),O(),I(),X(),Z=[xn(`output`,`usage.details.assistantOutputTokens`,`Out`),xn(`input`,`usage.details.userToolInputTokens`,`In`),xn(`cacheWrite`,`usage.details.tokensWrittenToCache`,`CW`),xn(`cacheRead`,`usage.details.tokensReadFromCache`,`CR`)]})))()}function On({actor:e}){if(!e)return w(`usage.creators.unattributed`);let t=e.label?.trim()||e.identity?.id||e.id||w(e.type===`system`?`usage.creators.system`:`usage.common.unknown`);return e.identity?.type===`profile`?ue({id:e.identity.id,name:t}):t}function kn(e){let t=e.options.toSorted((e,t)=>On(e).localeCompare(On(t))).map(e=>({key:e.key,label:On(e)}));return e.selectedKey!==null&&!t.some(t=>t.key===e.selectedKey)&&t.push({key:e.selectedKey,label:w(`usage.creators.selected`)}),L`
    <select
      class="usage-select usage-creator-filter"
      aria-label=${w(`usage.creators.select`)}
      @change=${t=>{let n=t.currentTarget.value;e.onSelect(n||null)}}
    >
      <option value="" .selected=${e.selectedKey===null}>${w(`usage.creators.all`)}</option>
      ${t.map(t=>L`
          <option value=${t.key} .selected=${t.key===e.selectedKey}>
            ${t.label}
          </option>
        `)}
    </select>
  `}function An(e){let t=t=>e.mode===`tokens`?t.totals.totalTokens:t.totals.totalCost,n=e.groups.toSorted((e,n)=>t(n)-t(e)||On(e).localeCompare(On(n))),r=n.reduce((e,n)=>e+t(n),0),i=n=>L`
    <table class="usage-creators-table">
      <thead>
        <tr>
          <th scope="col">${w(`usage.creators.identity`)}</th>
          <th scope="col">${w(`usage.metrics.tokens`)}</th>
          <th scope="col">${w(`usage.metrics.cost`)}</th>
          <th scope="col">${w(`usage.metrics.sessions`)}</th>
        </tr>
      </thead>
      <tbody>
        ${n.map(n=>L`
            <tr class=${n.key===e.selectedKey?`selected`:``}>
              <th scope="row">
                <button
                  type="button"
                  class="usage-creator-select"
                  aria-pressed=${n.key===e.selectedKey}
                  @click=${()=>e.onSelect(n.key)}
                >
                  <span class="usage-creator-name">
                    <span aria-hidden="true">${Oe(n.actor,`row`)}</span>
                    <span>${On(n)}</span>
                  </span>
                  <span class="usage-creator-track" aria-hidden="true">
                    <span style=${`width: ${r>0?t(n)/r*100:0}%`}></span>
                  </span>
                </button>
              </th>
              <td class=${e.mode===`tokens`?`usage-creator-primary`:``}>
                ${q(n.totals.totalTokens)}
              </td>
              <td class=${e.mode===`cost`?`usage-creator-primary`:``}>
                ${J(n.totals.totalCost)}
              </td>
              <td>${n.sessionCount}</td>
            </tr>
          `)}
      </tbody>
    </table>
  `;return he({title:w(`usage.creators.title`),description:w(`usage.creators.description`)},L`
      <div class="usage-panel usage-creators">
        ${n.length>0?i(n.slice(0,8)):L`<div class="usage-empty-block usage-empty-block--compact">
                ${w(`usage.creators.empty`)}
              </div>`}
        ${n.length>8?L`
                <details class="usage-creators-more">
                  <summary>
                    ${w(`usage.creators.more`,{count:String(n.length-8)})}
                  </summary>
                  ${i(n.slice(8))}
                </details>
              `:z}
      </div>
    `)}function jn(){return(jn=e((()=>{B(),Te(),G(),O(),se(),X()})))()}var Mn;function Nn(){return(Nn=e((()=>{Mn=[`channel`,`agent`,`provider`,`model`,`messages`,`tools`,`errors`,`duration`]})))()}function Pn(e){let{sessionKey:t,displayLabel:n,meta:r,agentId:i,valueLabel:a,isSelected:o,onSelect:s}=e;return L`
    <div
      class="session-bar-row ${o?`selected`:``}"
      @click=${e=>{e.target instanceof Element&&e.target.closest(`button`)||s(e)}}
      title="${t}"
    >
      <button
        type="button"
        class="session-bar-selection"
        aria-label=${n}
        aria-pressed=${o?`true`:`false`}
        @click=${s}
      >
        <span class="session-bar-label">
          <span class="session-bar-title">${n}</span>
          ${i?Me(i):z}
          ${r.length>0?L`<span class="session-bar-meta">${r.join(` · `)}</span>`:z}
        </span>
      </button>
      <div class="session-bar-actions">
        ${ae(n,L`<button
            type="button"
            class="btn btn--sm btn--ghost"
            @click=${e=>{e.stopPropagation(),Ce(e,n,w(`usage.sessions.copy`))}}
          >
            <span data-copy-label>${w(`usage.sessions.copy`)}</span>
          </button>`)}
        <div class="session-bar-value">${a}</div>
      </div>
    </div>
  `}function Fn(){return(Fn=e((()=>{B(),H(),Ne(),be(),O()})))()}function In(e,t,r,i,a,o,s,c){if(!(e.length>0||t.length>0||r.length>0))return z;let l=r.at(0)??``,u=r.length===1?i.find(e=>e.key===l):null,d=u?n(u.label||u.key,20)+((u.label||u.key).length>20?`…`:``):r.length===1?n(l,8)+`…`:w(`usage.filters.sessionsCount`,{count:String(r.length)}),f=u?u.label||u.key:r.length===1?l:r.join(`, `),p=e.length===1?e[0]:w(`usage.filters.daysCount`,{count:String(e.length)}),m=t.length===1?`${t[0]}:00`:w(`usage.filters.hoursCount`,{count:String(t.length)}),h=[{active:e.length>0,labelKey:`usage.filters.days`,value:p,removeKey:`usage.filters.removeDays`,onClear:a},{active:t.length>0,labelKey:`usage.filters.hours`,value:m,removeKey:`usage.filters.removeHours`,onClear:o},{active:r.length>0,labelKey:`usage.filters.session`,value:d,removeKey:`usage.filters.removeSession`,onClear:s,title:f}];return L`
    <div class="active-filters">
      ${h.filter(({active:e})=>e).map(({labelKey:e,value:t,removeKey:n,onClear:r,title:i})=>L`
            <div class="filter-chip" title=${ie(i)}>
              <span class="filter-chip-label">${w(e)}: ${t}</span>
              <openclaw-tooltip .content=${w(`usage.filters.remove`)}>
                <button class="filter-chip-remove" @click=${r} aria-label=${w(n)}>
                  ${M.x}
                </button>
              </openclaw-tooltip>
            </div>
          `)}
      ${(e.length>0||t.length>0)&&r.length>0?L`
              <button class="btn btn--sm" @click=${c}>
                ${w(`usage.filters.clearAll`)}
              </button>
            `:z}
    </div>
  `}function Ln(e,t,n,r){let i=tn(e,t,n);if(!i||e.length===0)return z;let a=nn(e,t,n),o=Yt(new Date,r),s=(e,t)=>e===1?t===o?w(`usage.presets.today`):$t(t):w(`usage.costWindows.lastDays`,{count:String(e)}),c=[{label:w(`usage.costWindows.selectedRange`),summary:i,range:!0},...a.map(e=>({label:s(e.days,e.endDate),summary:e,range:!1}))];return L`
    <section class="cost-window-analysis">
      <div class="cost-window-header">
        <div>
          <div class="card-title usage-section-title">${w(`usage.costWindows.title`)}</div>
          <div class="card-sub">
            ${w(`usage.costWindows.subtitle`,{date:en(n)})}
          </div>
        </div>
        <div class="cost-window-range-label">
          ${$t(t)} – ${$t(n)}
        </div>
      </div>
      <div class="cost-window-grid">
        ${c.map(({label:e,summary:t,range:n})=>{let r=t.totals.totalCost/t.days;return L`
            <div class="cost-window-card ${n?`cost-window-card--range`:``}">
              <div class="cost-window-card__label">${e}</div>
              <div class="cost-window-card__value">
                ${Y(t.totals.totalCost)}
              </div>
              <div class="cost-window-card__meta">
                ${q(t.totals.totalTokens)} ${w(`usage.metrics.tokens`)} ·
                ${Y(r)} ${w(`usage.costWindows.perDay`)}
              </div>
            </div>
          `})}
      </div>
    </section>
  `}function Rn(e,t,n,r){let i=[`usage-insight-card`,r?.className].filter(Boolean).join(` `),a=[r?.error?`usage-error-list`:`usage-list`,r?.listClassName].filter(Boolean).join(` `);return L`
    <div class=${i}>
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?L`<div class="muted">${n}</div>`:L`
              <div class=${a}>
                ${t.map(e=>r?.error?L`
                        <div class="usage-error-row">
                          <div class="usage-error-date">${e.label}</div>
                          <div class="usage-error-rate">${e.value}</div>
                          ${e.sub?L`<div class="usage-error-sub">${e.sub}</div>`:z}
                        </div>
                      `:L`
                        <div class="usage-list-item">
                          <span
                            >${e.agentId?Me(e.agentId):e.label}</span
                          >
                          <span class="usage-list-value">
                            <span>${e.value}</span>
                            ${e.sub?L`<span class="usage-list-sub">${e.sub}</span>`:z}
                          </span>
                        </div>
                      `)}
              </div>
            `}
    </div>
  `}function zn(e){let t=e.currentTarget;t instanceof HTMLElement&&t.focus()}function Q(e){let t=`usage-summary-hint-${e.hintId}`,n=[`stat`,`usage-summary-card`,e.className,e.tone?`usage-summary-card--${e.tone}`:``].filter(Boolean).join(` `),r=[`stat-value`,`usage-summary-value`,e.tone??``,e.compactValue?`usage-summary-value--compact`:``].filter(Boolean).join(` `);return L`
    <div class=${n}>
      <div class="usage-summary-title">
        ${e.title}
        <openclaw-tooltip open-on-click>
          <button
            id=${t}
            type="button"
            class="usage-summary-hint"
            aria-label=${e.title}
            @click=${zn}
          >
            ?
          </button>
          <!-- Shared tooltips dismiss pointer activation so action buttons never
               strand one open. This hint exists only to be read, so it opts in to
               click-to-open; the click handler still normalizes browsers that do
               not focus buttons on pointer activation. -->
          <span slot="content">${e.hint}</span>
        </openclaw-tooltip>
      </div>
      <div class=${r}>${e.value}</div>
      <div class="usage-summary-sub">${e.sub}</div>
    </div>
  `}function Bn(e,t,n,r,i,o,s,c){if(!e)return z;let l=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,u=t.messages.total?e.totalCost/t.messages.total:0,d=e.input+e.cacheRead+e.cacheWrite,f=d>0?e.cacheRead/d:0,p=d>0?`${(f*100).toFixed(1)}%`:w(`usage.common.emptyValue`),m=n.errorRate*100,h=n.throughputTokensPerMin===void 0?w(`usage.common.emptyValue`):`${q(Math.round(n.throughputTokensPerMin))} ${w(`usage.overview.tokensPerMinute`)}`,g=n.throughputCostPerMin===void 0?w(`usage.common.emptyValue`):`${Y(n.throughputCostPerMin)} ${w(`usage.overview.perMinute`)}`,_=n.durationCount>0?ce(n.avgDurationMs)??w(`usage.common.emptyValue`):w(`usage.common.emptyValue`),v=t.daily.filter(e=>e.messages>0&&e.errors>0).map(e=>{let t=e.errors/e.messages;return{label:$t(e.date),value:`${(t*100).toFixed(2)}%`,sub:`${e.errors} ${a(w(`usage.overview.errors`))} · ${e.messages} ${w(`usage.overview.messagesAbbrev`)} · ${q(e.tokens)}`,rate:t}}).toSorted((e,t)=>t.rate-e.rate).slice(0,5).map(({rate:e,...t})=>t),y=t=>i&&e.totalCost>0?w(`usage.overview.costShare`,{percent:(t/e.totalCost*100).toFixed(1)}):null,b=(e,t,n)=>[y(e),q(t),n===void 0?null:`${n} ${w(`usage.overview.messagesAbbrev`)}`].filter(e=>e!==null).join(` · `),x=t.byModel.slice(0,5).map(e=>({label:e.model??w(`usage.common.unknown`),value:Y(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens,e.count)})),S=t.byProvider.slice(0,5).map(e=>({label:e.provider??w(`usage.common.unknown`),value:Y(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens,e.count)})),C=t.tools.tools.slice(0,6).map(e=>({label:e.name,value:`${e.count}`,sub:w(`usage.overview.calls`)})),T=t.byAgent.slice(0,5).map(e=>({label:e.agentId,agentId:e.agentId,value:Y(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens)})),E=t.byChannel.slice(0,5).map(e=>({label:e.channel,value:Y(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens)})),ee=[[`usage.overview.topModels`,x,`usage.overview.noModelData`],[`usage.overview.topProviders`,S,`usage.overview.noProviderData`],[`usage.overview.topTools`,C,`usage.overview.noToolCalls`],[`usage.overview.topAgents`,T,`usage.overview.noAgentData`],[`usage.overview.topChannels`,E,`usage.overview.noChannelData`]];return he({title:w(`usage.overview.title`)},L`
      <section class="usage-panel usage-overview-card">
        <div class="usage-overview-layout">
          <div class="usage-summary-grid">
            ${Q({hintId:`messages`,title:w(`usage.overview.messages`),hint:w(`usage.overview.messagesHint`),value:t.messages.total,sub:`${t.messages.user} ${a(w(`usage.overview.user`))} · ${t.messages.assistant} ${a(w(`usage.overview.assistant`))}`,className:`usage-summary-card--hero`})}
            ${Q({hintId:`throughput`,title:w(`usage.overview.throughput`),hint:w(`usage.overview.throughputHint`),value:h,sub:g,className:`usage-summary-card--hero usage-summary-card--throughput`,compactValue:!0})}
            ${Q({hintId:`tool-calls`,title:w(`usage.overview.toolCalls`),hint:w(`usage.overview.toolCallsHint`),value:t.tools.totalCalls,sub:`${t.tools.uniqueTools} ${w(`usage.overview.toolsUsed`)}`,className:`usage-summary-card--half`})}
            ${Q({hintId:`average-tokens`,title:w(`usage.overview.avgTokens`),hint:w(`usage.overview.avgTokensHint`),value:q(l),sub:w(`usage.overview.acrossMessages`,{count:String(t.messages.total||0)}),className:`usage-summary-card--half`})}
            ${Q({hintId:`cache-hit-rate`,title:w(`usage.overview.cacheHitRate`),hint:w(`usage.overview.cacheHint`),value:p,sub:`${q(e.cacheRead)} ${w(`usage.overview.cached`)} · ${q(d)} ${w(`usage.overview.prompt`)}`,tone:f>.6?`good`:f>.3?`warn`:`bad`,className:`usage-summary-card--medium`})}
            ${Q({hintId:`error-rate`,title:w(`usage.overview.errorRate`),hint:w(`usage.overview.errorHint`),value:`${m.toFixed(2)}%`,sub:`${t.messages.errors} ${a(w(`usage.overview.errors`))} · ${_} ${w(`usage.overview.avgSession`)}`,tone:m>5?`bad`:m>1?`warn`:`good`,className:`usage-summary-card--medium`})}
            ${Q({hintId:`average-cost`,title:w(`usage.overview.avgCost`),hint:w(r?`usage.overview.avgCostHintMissing`:`usage.overview.avgCostHint`),value:Y(u),sub:`${Y(e.totalCost)} ${a(w(`usage.breakdown.total`))}`,className:`usage-summary-card--compact`})}
            ${Q({hintId:`sessions`,title:w(`usage.overview.sessions`),hint:w(`usage.overview.sessionsHint`),value:s,sub:w(`usage.overview.sessionsInRange`,{count:String(c)}),className:`usage-summary-card--compact`})}
            ${Q({hintId:`errors`,title:w(`usage.overview.errors`),hint:w(`usage.overview.errorsHint`),value:t.messages.errors,sub:`${t.messages.toolResults} ${w(`usage.overview.toolResults`)}`,className:`usage-summary-card--compact`})}
          </div>
          <div class="usage-insights-grid">
            ${ee.map(([e,t,n])=>Rn(w(e),t,w(n)))}
            ${Rn(w(`usage.overview.peakErrorDays`),v,w(`usage.overview.noErrorData`),{error:!0})}
            ${Rn(w(`usage.overview.peakErrorHours`),o,w(`usage.overview.noErrorData`),{error:!0,className:`usage-insight-card--wide`,listClassName:`usage-error-list--hours`})}
          </div>
        </div>
      </section>
    `)}function Vn(e,t,n,r,i,o,s,c,l,u,d,f,p,m,h){let g=p??Mn,_=e=>g.includes(e),v=_(`agent`)||new Set(e.map(e=>e.agentId)).size>1,y=e=>{let t=e.label||e.key;return t.startsWith(`agent:`)&&t.includes(`?token=`)?t.slice(0,t.indexOf(`?token=`)):t},b=e=>[_(`channel`)&&e.channel&&`channel:${e.channel}`,_(`provider`)&&(e.modelProvider||e.providerOverride)&&`provider:${e.modelProvider??e.providerOverride}`,_(`model`)&&e.model&&`model:${e.model}`,_(`messages`)&&e.usage?.messageCounts&&`msgs:${e.usage.messageCounts.total}`,_(`tools`)&&e.usage?.toolUsage&&`tools:${e.usage.toolUsage.totalCalls}`,_(`errors`)&&e.usage?.messageCounts&&`errors:${e.usage.messageCounts.errors}`,_(`duration`)&&e.usage?.durationMs&&`dur:${ce(e.usage.durationMs)??`—`}`].filter(e=>typeof e==`string`&&e.length>0),x=new Set(n),S=e.map(e=>{let t=e.usage,n=t?.totalTokens??0,a=t?.totalCost??0,o=x.size>0?t?.dailyBreakdown:void 0;if(o?.length){n=0,a=0;for(let e of o)x.has(e.date)&&(n+=e.tokens,a+=e.cost)}let s;switch(i){case`recent`:s=e.updatedAt??0;break;case`messages`:s=t?.messageCounts?.total??0;break;case`errors`:s=t?.messageCounts?.errors??0;break;case`cost`:s=a;break;case`tokens`:s=n}return{session:e,displayLabel:y(e),value:r?n:a,sortValue:s}}).toSorted((e,t)=>{let n=t.sortValue-e.sortValue;if(n!==0)return n;let r=(t.session.updatedAt??0)-(e.session.updatedAt??0);return r===0?e.displayLabel.localeCompare(t.displayLabel):r}),C=o===`asc`?S.toReversed():S,T=C.reduce((e,t)=>e+t.value,0),E=C.length?T/C.length:0,ee=C.reduce((e,t)=>e+(t.session.usage?.messageCounts?.errors??0),0),D=new Set(t),O=C.filter(e=>D.has(e.session.key)),k=O.length,te=new Map(C.map(e=>[e.session.key,e])),A=s.map(e=>te.get(e)).filter(e=>e!==void 0),j=c===`recent`?A:C.slice(0,50),M=e=>{let t=e.map(e=>e.session.key);return e.map(e=>Pn({sessionKey:e.session.key,displayLabel:e.displayLabel,meta:b(e.session),agentId:v?e.session.agentId:void 0,valueLabel:r?q(e.value):Y(e.value),isSelected:D.has(e.session.key),onSelect:n=>l(e.session.key,n.shiftKey,t)}))};return he({title:w(`usage.sessions.title`)},L`
      <div class="usage-panel sessions-card">
        <div class="sessions-card-header">
          <div class="sessions-card-count">
            ${w(`usage.sessions.shown`,{count:String(j.length)})}
            ${m===j.length?``:` · ${w(`usage.sessions.total`,{count:String(m)})}`}
          </div>
        </div>
        <div class="sessions-card-meta">
          <div class="sessions-card-stats">
            <span>
              ${r?q(E):Y(E)}
              ${w(`usage.sessions.avg`)}
            </span>
            <span
              >${ee} ${a(w(`usage.overview.errors`))}</span
            >
          </div>
          ${Ee({mode:`buttons`,variant:`accent`,ariaPressed:!1,className:`small`,value:c,onChange:f,onReselect:f,options:[{value:`all`,label:w(`usage.sessions.all`)},{value:`recent`,label:w(`usage.sessions.recent`)}]})}
          <label class="sessions-sort">
            <span>${w(`usage.sessions.sort`)}</span>
            <select
              class="settings-select"
              @change=${e=>u(e.target.value)}
            >
              ${Object.entries({cost:`usage.metrics.cost`,errors:`usage.overview.errors`,messages:`usage.overview.messages`,recent:`usage.sessions.recentShort`,tokens:`usage.metrics.tokens`}).map(([e,t])=>L`<option value=${e} ?selected=${i===e}>
                    ${w(t)}
                  </option>`)}
            </select>
          </label>
          <openclaw-tooltip
            .content=${w(o===`desc`?`usage.sessions.descending`:`usage.sessions.ascending`)}
          >
            <button
              class="btn btn--sm"
              aria-label=${w(o===`desc`?`usage.sessions.descending`:`usage.sessions.ascending`)}
              @click=${()=>d(o===`desc`?`asc`:`desc`)}
            >
              ${o===`desc`?`↓`:`↑`}
            </button>
          </openclaw-tooltip>
          ${k>0?L`
                  <button class="btn btn--sm" @click=${h}>
                    ${w(`usage.sessions.clearSelection`)}
                  </button>
                `:z}
        </div>
        ${j.length===0?L`<div class="usage-empty-block">
                ${w(c===`recent`?`usage.sessions.noRecent`:`usage.sessions.noneInRange`)}
              </div>`:L`
                <div
                  class=${c===`recent`?`session-bars session-bars--recent`:`session-bars`}
                >
                  ${M(j)}
                  ${c===`all`&&e.length>j.length?L`
                          <div class="usage-more-sessions">
                            ${w(`usage.sessions.more`,{count:String(e.length-j.length)})}
                          </div>
                        `:z}
                </div>
              `}
        ${k>1?L`
                <div class="sessions-selected-group">
                  <div class="sessions-card-count">
                    ${w(`usage.sessions.selected`,{count:String(k)})}
                  </div>
                  <div class="session-bars session-bars--selected">
                    ${M(O)}
                  </div>
                </div>
              `:z}
      </div>
    `)}function Hn(){return(Hn=e((()=>{B(),R(),Ne(),N(),G(),O(),I(),de(),X(),Nn(),Fn()})))()}function Un(e,t,n){let r=t||e.usage;if(!r)return L` <div class="usage-empty-block">${w(`usage.details.noUsageData`)}</div> `;let i=e=>e?p(e):w(`usage.common.emptyValue`),o=n!==void 0,s=n?.filter(e=>e.timestamp>0),c=o?s?.length?s.reduce((e,{role:t})=>((t===`user`||t===`assistant`)&&(e[t]+=1,e.total+=1),e),{total:0,user:0,assistant:0}):void 0:r.messageCounts,l=[e.channel&&`channel:${e.channel}`,e.agentId&&`agent:${e.agentId}`,(e.modelProvider||e.providerOverride)&&`provider:${e.modelProvider??e.providerOverride}`,e.model&&`model:${e.model}`].filter(Boolean),u=r.toolUsage?.tools.slice(0,6)??[],d;if(s?.length){d=new Map;for(let e of s.filter(({role:e})=>e===`assistant`))for(let[t,n]of Ke(e.content).tools)d.set(t,(d.get(t)??0)+n)}let f=u.map(e=>({label:e.name,value:`${d?d.get(e.name)??0:o?w(`usage.common.emptyValue`):e.count}`,sub:w(`usage.overview.calls`)})),m=d?[...d.values()].reduce((e,t)=>e+t,0):o?w(`usage.common.emptyValue`):r.toolUsage?.totalCalls??0,h=d?d.size:o?w(`usage.common.emptyValue`):r.toolUsage?.uniqueTools??0,g=r.modelUsage?.slice(0,6).map(e=>({label:e.model??w(`usage.common.unknown`),value:J(e.totals.totalCost),sub:q(e.totals.totalTokens)}))??[],_=[{labelKey:`usage.overview.messages`,value:c?.total??(o?w(`usage.common.emptyValue`):0),meta:L`${o&&!c?w(`usage.common.emptyValue`):L`${c?.user??0}
            ${a(w(`usage.overview.user`))} ·
            ${c?.assistant??0}
            ${a(w(`usage.overview.assistant`))}`}${o?L`<br />${w(`usage.details.loadedIntervalMessages`)}`:z}`},{labelKey:`usage.overview.toolCalls`,value:m,meta:L`${h} ${w(`usage.overview.toolsUsed`)}`},{labelKey:`usage.overview.errors`,value:o?w(`usage.common.emptyValue`):r.messageCounts?.errors??0,meta:L`${o?w(`usage.common.emptyValue`):r.messageCounts?.toolResults??0}
      ${w(`usage.overview.toolResults`)}`},{labelKey:`usage.details.duration`,value:ce(r.durationMs)??w(`usage.common.emptyValue`),meta:L`${i(r.firstActivity)} → ${i(r.lastActivity)}`}];return L`
    ${l.length>0?L`<div class="usage-badges">
            ${l.map(e=>L`<span class="settings-row__value">${e}</span>`)}
          </div>`:z}
    <div class="session-summary-grid">
      ${_.map(({labelKey:e,value:t,meta:n})=>L`
          <div class="stat session-summary-card">
            <div class="session-summary-title">${w(e)}</div>
            <div class="stat-value session-summary-value">${t}</div>
            <div class="session-summary-meta">${n}</div>
          </div>
        `)}
    </div>
    <div class="usage-insights-grid usage-insights-grid--tight">
      ${Rn(w(`usage.overview.topTools`),f,w(`usage.overview.noToolCalls`))}
      ${Rn(w(`usage.details.modelMix`),g,w(`usage.overview.noModelData`))}
    </div>
  `}function Wn(){return(Wn=e((()=>{B(),O(),de(),h(),$e(),X(),Hn()})))()}function Gn(e,t,n){let r=Number(e.slice(0,4)),i=Number(e.slice(5,7))-1,a=Number(e.slice(8,10))+n;return t===`utc`?Date.UTC(r,i,a):new Date(r,i,a).getTime()}function Kn(e,t,n,i,o,s,c,l,u,d,p=`local`,m,h,g){if((t||n.awaitingGateway)&&!n.hasLoaded)return L`
      <div class="session-timeseries-compact">
        <div class="usage-empty-block">${w(`usage.loading.badge`)}</div>
      </div>
    `;let _=xt(n,`usage.details.usageOverTime`,`timeline`);if(n.error&&!n.hasLoaded)return L`
      <div class="session-timeseries-compact">
        <div class="card-title usage-section-title">${w(`usage.details.usageOverTime`)}</div>
        ${_}
      </div>
    `;if(!e||e.points.length<2)return L`
      <div class="session-timeseries-compact">
        ${_}
        <div class="usage-empty-block">${w(`usage.details.noTimeline`)}</div>
      </div>
    `;let v=e.points;if(l||u||d&&d.length>0){let t=l?Gn(l,p,0):0,n=u?Gn(u,p,1):1/0,r=d?.length?new Set(d):void 0;v=e.points.filter(e=>e.timestamp<t||e.timestamp>=n?!1:!r||r.has(Yt(new Date(e.timestamp),p)))}if(v.length<2)return L`
      <div class="session-timeseries-compact">
        ${_}
        <div class="usage-empty-block">${w(`usage.details.noDataInRange`)}</div>
      </div>
    `;let y=0,b=0;v=v.map(e=>(y+=e.totalTokens,b+=e.cost,{...e,cumulativeTokens:y,cumulativeCost:b}));let x=m!=null&&h!=null,S=x?Math.min(m,h):0,C=x?Math.max(m,h):1/0,T=0,E=v.length;if(x){T=v.findIndex(e=>e.timestamp>=S),T===-1&&(T=v.length);let e=v.findIndex(e=>e.timestamp>C);E=e===-1?v.length:e}let ee=x?v.slice(T,E):v,D={output:0,input:0,cacheRead:0,cacheWrite:0};for(let e of ee)for(let{key:t}of Z)D[t]+=e[t];let O={top:8,right:4,bottom:14,left:30},te=400-O.left-O.right,A=100-O.top-O.bottom,j=i===`cumulative`,M=i===`per-turn`&&s===`by-type`,N=p===`utc`?{timeZone:`UTC`}:{},P=k({month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,...N},``),F=Object.values(D).reduce((e,t)=>e+t,0),ne=v.map(e=>j?e.cumulativeTokens:M?e.input+e.output+e.cacheRead+e.cacheWrite:e.totalTokens),I=Math.max(...ne,1),re=te/v.length,R=Math.min(Jn,Math.max(1,re*qn)),ie=re-R,B=O.left+T*(R+ie),V=E>=v.length?O.left+(v.length-1)*(R+ie)+R:O.left+(E-1)*(R+ie)+R,ae=r(v[0],`time series first point`).timestamp,oe=r(v.at(-1),`time series last point`).timestamp,H=Math.max(ae,Math.min(oe,S)),W=Math.max(ae,Math.min(oe,C)),se=(e,t)=>{g?.(e===`left`?Math.max(ae,Math.min(t,W)):H,e===`right`?Math.min(oe,Math.max(t,H)):W)},ce=(e,t)=>{let n=t===`left`?H:W,r=t===`left`?ae:H,i=t===`left`?W:oe,a;switch(e.key){case`ArrowLeft`:case`ArrowDown`:a=v.findLast(e=>e.timestamp<n)?.timestamp??r;break;case`ArrowRight`:case`ArrowUp`:a=v.find(e=>e.timestamp>n)?.timestamp??i;break;case`Home`:a=r;break;case`End`:a=i;break;default:return}e.preventDefault(),se(t,a)};return L`
    <div class="session-timeseries-compact">
      <div class="timeseries-header-row">
        <div class="card-title usage-section-title">${w(`usage.details.usageOverTime`)}</div>
        <div class="timeseries-controls">
          ${x?L`
                  <div class="settings-segmented settings-segmented--accent small">
                    <button
                      class="btn btn--sm settings-segmented__btn settings-segmented__btn--active"
                      @click=${()=>g?.(null,null)}
                    >
                      ${w(`usage.details.reset`)}
                    </button>
                  </div>
                `:z}
          ${Ee({mode:`buttons`,variant:`accent`,className:`small`,value:i,onChange:o,onReselect:o,options:[{value:`per-turn`,label:w(`usage.details.perTurn`)},{value:`cumulative`,label:w(`usage.details.cumulative`)}]})}
          ${j?z:Ee({mode:`buttons`,variant:`accent`,className:`small`,value:s,onChange:c,onReselect:c,options:[{value:`total`,label:w(`usage.daily.total`)},{value:`by-type`,label:w(`usage.daily.byType`)}]})}
        </div>
      </div>
      ${_}
      <div class="timeseries-chart-wrapper">
        <svg viewBox="0 0 ${400} ${118}" class="timeseries-svg">
          ${[{x1:O.left,y1:O.top,x2:O.left,y2:O.top+A},{x1:O.left,y1:O.top+A,x2:400-O.right,y2:O.top+A}].map(({x1:e,y1:t,x2:n,y2:r})=>U`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="var(--border)" />`)}
          ${[{y:O.top+5,text:q(I)},{y:O.top+A,text:`0`}].map(({y:e,text:t})=>U`<text x="${O.left-4}" y="${e}" text-anchor="end" class="ts-axis-label">${t}</text>`)}
          <!-- X axis labels (first and last) -->
          ${U`
            <text x="${O.left}" y="${O.top+A+10}" text-anchor="start" class="ts-axis-label">${f(r(v[0],`time series first point`).timestamp,{hour:`2-digit`,minute:`2-digit`,...N},``)}</text>
            <text x="${400-O.right}" y="${O.top+A+10}" text-anchor="end" class="ts-axis-label">${f(r(v.at(-1),`time series last point`).timestamp,{hour:`2-digit`,minute:`2-digit`,...N},``)}</text>
          `}
          <!-- Bars -->
          ${v.map((e,t)=>{let n=r(ne[t],`time series bar total`),i=O.left+t*(R+ie),o=n/I*A,s=O.top+A-o,c=[P(e.timestamp),`${q(n)} ${a(w(`usage.metrics.tokens`))}`];M&&c.push(...Z.map(({key:t,short:n})=>`${n} ${q(e[t])}`));let l=c.join(` · `),u=x&&(t<T||t>=E);if(!M)return U`<rect x="${i}" y="${s}" width="${R}" height="${o}" class="ts-bar${u?` dimmed`:``}" rx="1" role="img" data-tooltip=${l} aria-label=${l}></rect>`;let d=O.top+A,f=u?` dimmed`:``;return U`
              ${Z.map(({key:t,className:r})=>{let a=e[t];if(a<=0||n<=0)return z;let s=a/n*o;return d-=s,U`<rect x="${i}" y="${d}" width="${R}" height="${s}" class="ts-bar ${r}${f}" rx="1" role="img" data-tooltip=${l} aria-label=${l}></rect>`})}
            `})}
          <!-- Selection highlight overlay (always visible between handles) -->
          ${U`
            <rect
              x="${B}"
              y="${O.top}"
              width="${Math.max(1,V-B)}"
              height="${A}"
              fill="var(--accent)"
              opacity="${Yn}"
              pointer-events="none"
            />
          `}
          ${[B,V].map(e=>U`
              <line x1="${e}" y1="${O.top}" x2="${e}" y2="${O.top+A}" stroke="var(--accent)" stroke-width="0.8" opacity="0.7" />
              <rect x="${e-Xn/2}" y="${O.top+A/2-Zn/2}" width="${Xn}" height="${Zn}" rx="1.5" fill="var(--accent)" class="cursor-handle" />
              ${[-.7,Qn].map(t=>U`<line x1="${e+t}" y1="${O.top+A/2-Zn/5}" x2="${e+t}" y2="${O.top+A/2+Zn/5}" stroke="var(--bg)" stroke-width="0.4" pointer-events="none" />`)}
            `)}
        </svg>
        <!-- Handle drag zones (only on handles, not full chart) -->
        ${(()=>{let e=e=>t=>{if(!g||!(t.currentTarget instanceof HTMLElement))return;t.preventDefault(),t.stopPropagation();let n=t.currentTarget.closest(`.timeseries-chart-wrapper`)?.querySelector(`svg`);if(!n)return;let r=n.getBoundingClientRect(),i=r.width,a=O.left/400*i,o=(400-O.right)/400*i-a,s=e=>{let t=Math.max(0,Math.min(1,(e-r.left-a)/o));return Math.min(Math.floor(t*v.length),v.length-1)},c=e===`left`?B:V,l=r.left+c/400*i,u=t.clientX-l;document.body.style.cursor=`col-resize`;let d=t=>{let n=t.clientX-u,r=s(n),i=v[r];i&&se(e,i.timestamp)},f=()=>{document.body.style.cursor=``,document.removeEventListener(`mousemove`,d),document.removeEventListener(`mouseup`,f)};document.addEventListener(`mousemove`,d),document.addEventListener(`mouseup`,f)};return L`
            ${[`left`,`right`].map(t=>{let n=t===`left`?B:V;return L`<div
                class="chart-handle-zone chart-handle-${t}"
                role="slider"
                tabindex="0"
                aria-label=${w(t===`left`?`usage.details.rangeStart`:`usage.details.rangeEnd`)}
                aria-valuemin=${t===`left`?ae:H}
                aria-valuemax=${t===`left`?W:oe}
                aria-valuenow=${t===`left`?H:W}
                aria-valuetext=${P(t===`left`?H:W)}
                style="left: ${(n/400*100).toFixed(1)}%;"
                @mousedown=${e(t)}
                @keydown=${e=>ce(e,t)}
              ></div>`})}
          `})()}
      </div>
      <div class="timeseries-summary">
        ${x?L`
                <span class="timeseries-summary__range">
                  ${w(`usage.details.turnRange`,{start:String(T+1),end:String(E),total:String(v.length)})}
                </span>
                ·
                ${f(S,{hour:`2-digit`,minute:`2-digit`,...N},``)}–${f(C,{hour:`2-digit`,minute:`2-digit`,...N},``)}
                · ${q(F)} ·
                ${J(ee.reduce((e,t)=>e+(t.cost||0),0))}
              `:L`${v.length} ${w(`usage.overview.messagesAbbrev`)} ·
              ${q(y)} · ${J(b)}`}
      </div>
      ${M?L`
              <div class="timeseries-breakdown">
                <div class="card-title usage-section-title">
                  ${w(`usage.breakdown.tokensByType`)}
                </div>
                <div class="cost-breakdown-bar cost-breakdown-bar--compact">
                  ${Z.map(({key:e,className:t})=>L`
                      <div
                        class="cost-segment ${t}"
                        style="width: ${(F>0?D[e]/F*100:0).toFixed(1)}%"
                      ></div>
                    `)}
                </div>
                <div class="cost-breakdown-legend">
                  ${Z.map(({key:e,className:t,labelKey:n,hintKey:r})=>L`
                      <div class="legend-item" title=${w(r)}>
                        <span class="legend-dot ${t}"></span>${w(n)}
                        ${q(D[e])}
                      </div>
                    `)}
                </div>
                <div class="cost-breakdown-total">
                  ${w(`usage.breakdown.total`)}: ${q(F)}
                </div>
              </div>
            `:z}
    </div>
  `}var qn,Jn,Yn,Xn,Zn,Qn;function $n(){return($n=e((()=>{c(),B(),G(),O(),h(),X(),St(),Dn(),qn=.75,Jn=8,Yn=.06,Xn=5,Zn=12,Qn=.7})))()}function er(e,t){return t>0?e/t*100:0}function tr(e){return e<0xe8d4a51000?e*1e3:e}function nr(e,t,n){if(!(e.timestamp>0))return!0;let r=tr(e.timestamp);return r>=Math.min(t,n)&&r<=Math.max(t,n)}function rr(e,t,n,i){let a=Math.min(n,i),o=Math.max(n,i),s=t.filter(e=>e.timestamp>=a&&e.timestamp<=o);if(s.length===0)return;let c=0,l=0,u={output:0,input:0,cacheWrite:0,cacheRead:0};for(let e of s){c+=e.totalTokens||0,l+=e.cost||0;for(let{key:t}of Z)u[t]+=e[t]||0}let d=r(s[0],`filtered usage first point`),f=r(s.at(-1),`filtered usage last point`);return{...e,...u,totalTokens:c,totalCost:l,durationMs:f.timestamp-d.timestamp,firstActivity:d.timestamp,lastActivity:f.timestamp,messageCounts:void 0}}function ir(e,t,r,i,o,s){let c=e.label||e.key,l=c.length>50?n(c,50)+`…`:c,u=e.usage,{timeSeriesCursorStart:d,timeSeriesCursorEnd:f}=t,p=d!==null&&f!==null,m=d!==null&&f!==null&&t.timeSeries?.points&&u?rr(u,t.timeSeries.points,d,f):void 0,h=m?{totalTokens:m.totalTokens,totalCost:m.totalCost}:{totalTokens:u?.totalTokens??0,totalCost:u?.totalCost??0},g=m?w(`usage.details.filtered`):``;return L`
    <div class="settings-group usage-panel session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">
            ${l}
            ${g?L`<span class="session-detail-indicator">${g}</span>`:z}
          </div>
        </div>
        <div class="session-detail-stats">
          ${u?L`
                  <span
                    ><strong>${q(h.totalTokens)}</strong>
                    ${a(w(`usage.metrics.tokens`))}${g}</span
                  >
                  <span
                    ><strong>${J(h.totalCost)}</strong
                    >${g}</span
                  >
                `:z}
        </div>
        <openclaw-tooltip .content=${w(`usage.details.close`)}>
          <button
            class="btn btn--sm btn--ghost session-detail-close"
            @click=${s}
            aria-label=${w(`usage.details.close`)}
          >
            ${M.x}
          </button>
        </openclaw-tooltip>
      </div>
      ${e.scope===`family`&&e.includedSessionIds?.length?L`
              <div class="usage-lineage-note">
                ${w(`usage.scope.familyIncluded`,{count:String(e.includedSessionIds.length)})}
              </div>
            `:z}
      <div class="session-detail-content">
        ${Un(e,m,p?t.sessionLogsStatus.hasLoaded&&t.sessionLogs?t.sessionLogs.filter(e=>nr(e,d,f)):null:void 0)}
        <div class="session-detail-row">
          ${Kn(t.timeSeries,t.timeSeriesLoading,t.timeSeriesStatus,t.timeSeriesMode,r.onTimeSeriesModeChange,t.timeSeriesBreakdownMode,r.onTimeSeriesBreakdownChange,i.startDate,i.endDate,i.selectedDays,i.timeZone,d,f,r.onTimeSeriesCursorRangeChange)}
        </div>
        <div class="session-detail-bottom">
          ${or(t.sessionLogs,t.sessionLogsLoading,t.sessionLogsStatus,t.sessionLogsExpanded,r.onToggleSessionLogsExpanded,t.logFilters,r.onLogFilterRolesChange,r.onLogFilterToolsChange,r.onLogFilterHasToolsChange,r.onLogFilterQueryChange,r.onLogFilterClear,p?d:null,p?f:null)}
          ${ar(t.context,u,o,r.onToggleContextExpanded)}
        </div>
      </div>
    </div>
  `}function ar({weight:e,loading:t,status:n},r,i,a){let o=xt(n,`usage.details.systemPromptBreakdown`,`context`);if(!e)return L`
      <div class="context-details-panel">
        ${o}
        ${n.error?z:L`<div class="usage-empty-block">
                ${w(t||n.awaitingGateway?`usage.loading.badge`:`usage.details.noContextData`)}
              </div>`}
      </div>
    `;let s=[{className:`skills`,labelKey:`usage.details.skills`,tokens:Ft(e.skills.promptChars),entries:e.skills.entries.map(({name:e,blockChars:t})=>({name:e,chars:t}))},{className:`tools`,labelKey:`usage.details.tools`,tokens:Ft(e.tools.listChars+e.tools.schemaChars),entries:e.tools.entries.map(({name:e,summaryChars:t,schemaChars:n})=>({name:e,chars:t+n}))},{className:`files`,labelKey:`usage.details.files`,tokens:Ft(e.injectedWorkspaceFiles.reduce((e,t)=>t.injectionStatus===`native_unverified`?e:e+t.injectedChars,0)),entries:e.injectedWorkspaceFiles.map(({name:e,injectedChars:t})=>({name:e,chars:t}))}].map(({className:e,labelKey:t,tokens:n,entries:r})=>({className:e,labelKey:t,tokens:n,entries:r.toSorted((e,t)=>e.chars===null?t.chars===null?0:1:t.chars===null?-1:t.chars-e.chars)})),c=[{className:`system`,labelKey:`usage.details.system`,tokens:Ft(e.systemPrompt.chars)},...s],l=c.reduce((e,{tokens:t})=>e+t,0),u=r&&r.totalTokens>0?r.input+r.cacheRead:0,d=u>0?`~${Math.min(l/u*100,100).toFixed(0)}% ${w(`usage.details.ofInput`)}`:w(`usage.details.baseContextPerMessage`),f=s.some(({entries:e})=>e.length>4);return L`
    <div class="context-details-panel">
      ${o}
      <div class="context-breakdown-header">
        <div class="card-title usage-section-title">
          ${w(`usage.details.systemPromptBreakdown`)}
        </div>
        ${f?L`<button class="btn btn--sm" @click=${a}>
                ${w(i?`usage.details.collapse`:`usage.details.expandAll`)}
              </button>`:z}
      </div>
      <p class="context-weight-desc">${d}</p>
      <div class="context-stacked-bar">
        ${c.map(({className:e,labelKey:t,tokens:n})=>L`
            <div
              class="context-segment ${e}"
              style="width: ${er(n,l).toFixed(1)}%"
              title="${w(t)}: ~${q(n)}"
            ></div>
          `)}
      </div>
      <div class="context-legend">
        ${c.map(({className:e,labelKey:t,tokens:n})=>L`
            <span class="legend-item"
              ><span class="legend-dot ${e}"></span>${w(e===`system`?`usage.details.systemShort`:t)}
              ~${q(n)}</span
            >
          `)}
      </div>
      <div class="context-total">
        ${w(`usage.breakdown.total`)}: ~${q(l)}
      </div>
      <div class="context-breakdown-grid">
        ${s.filter(({entries:e})=>e.length>0).map(({labelKey:e,entries:t})=>{let n=i?t:t.slice(0,4),r=t.length-n.length;return L`
              <div class="context-breakdown-card">
                <div class="context-breakdown-title">${w(e)} (${t.length})</div>
                <div class="context-breakdown-list">
                  ${n.map(({name:e,chars:t})=>L`
                      <div class="context-breakdown-item">
                        <span class="mono" title=${e}>${e}</span>
                        <span class="muted"
                          >${t===null?w(`usage.common.unknown`):`~${q(Ft(t))}`}</span
                        >
                      </div>
                    `)}
                </div>
                ${r>0?L`
                        <div class="context-breakdown-more">
                          ${w(`usage.sessions.more`,{count:String(r)})}
                        </div>
                      `:z}
              </div>
            `})}
      </div>
    </div>
  `}function or(e,t,n,r,i,o,s,c,l,u,d,f,p){if((t||n.awaitingGateway)&&!n.hasLoaded)return L`
      <div class="session-logs-compact">
        <div class="session-logs-header">${w(`usage.details.conversation`)}</div>
        <div class="usage-empty-block">${w(`usage.loading.badge`)}</div>
      </div>
    `;let m=xt(n,`usage.details.conversation`,`conversation`);if(n.error&&!n.hasLoaded)return L`
      <div class="session-logs-compact">
        <div class="session-logs-header">${w(`usage.details.conversation`)}</div>
        ${m}
      </div>
    `;if(!e||e.length===0)return L`
      <div class="session-logs-compact">
        <div class="session-logs-header">${w(`usage.details.conversation`)}</div>
        ${m}
        <div class="usage-empty-block">${w(`usage.details.noMessages`)}</div>
      </div>
    `;let h=k(),g=a(o.query),_=e.map(e=>{let t=Ke(e.content);return{log:e,toolInfo:t,cleanContent:t.cleanContent||e.content}}),v=Array.from(new Set(_.flatMap(e=>e.toolInfo.tools.map(([e])=>e)))).toSorted((e,t)=>e.localeCompare(t)),y=f!=null&&p!=null,b=_.filter(e=>(!y||nr(e.log,f,p))&&(o.roles.length===0||o.roles.includes(e.log.role))&&(!o.hasTools||e.toolInfo.tools.length>0)&&(o.tools.length===0||e.toolInfo.tools.some(([e])=>o.tools.includes(e)))&&(!g||a(e.cleanContent).includes(g))),x=o.roles.length>0||o.tools.length>0||o.hasTools||g||y?`${b.length} ${w(`usage.details.of`)} ${e.length}${y?` (${w(`usage.details.timelineFiltered`)})`:``}`:`${e.length}`,S=new Set(o.roles),C=new Set(o.tools);return L`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>
          ${w(`usage.details.conversation`)}
          <span class="session-logs-header-count">
            (${x} ${a(w(`usage.overview.messages`))})
          </span>
        </span>
        <button class="btn btn--sm" @click=${i}>
          ${w(r?`usage.details.collapseAll`:`usage.details.expandAll`)}
        </button>
      </div>
      ${m}
      <div class="usage-filters-inline session-log-filters">
        <select
          multiple
          size="4"
          aria-label=${w(`usage.details.filterByRole`)}
          @change=${e=>s(Array.from(e.target.selectedOptions).map(e=>e.value))}
        >
          ${[[`user`,`usage.overview.user`],[`assistant`,`usage.overview.assistant`],[`tool`,`usage.details.tool`],[`toolResult`,`usage.details.toolResult`]].map(([e,t])=>L`<option value=${e} ?selected=${S.has(e)}>
                ${w(t)}
              </option>`)}
        </select>
        <select
          multiple
          size="4"
          aria-label=${w(`usage.details.filterByTool`)}
          @change=${e=>c(Array.from(e.target.selectedOptions).map(e=>e.value))}
        >
          ${v.map(e=>L`<option value=${e} ?selected=${C.has(e)}>${e}</option>`)}
        </select>
        <label class="usage-filters-inline session-log-has-tools">
          <input
            type="checkbox"
            .checked=${o.hasTools}
            @change=${e=>l(e.target.checked)}
          />
          ${w(`usage.details.hasTools`)}
        </label>
        <input
          type="text"
          placeholder=${w(`usage.details.searchConversation`)}
          aria-label=${w(`usage.details.searchConversation`)}
          .value=${o.query}
          @input=${e=>u(e.target.value)}
        />
        <button class="btn btn--sm" @click=${d}>${w(`usage.filters.clear`)}</button>
      </div>
      <div class="session-logs-list">
        ${b.map(e=>{let{log:t,toolInfo:n,cleanContent:i}=e,a=t.role===`user`?`user`:`assistant`,o=t.role===`user`?w(`usage.details.you`):t.role===`assistant`?w(`usage.overview.assistant`):w(`usage.details.tool`);return L`
            <div class="session-log-entry ${a}">
              <div class="session-log-meta">
                <span class="session-log-role">${o}</span>
                <span>${h(t.timestamp)}</span>
                ${t.tokens?L`<span>${q(t.tokens)}</span>`:z}
              </div>
              <div class="session-log-content">${i}</div>
              ${n.tools.length>0?L`
                      <details class="session-log-tools" ?open=${r}>
                        <summary>${n.summary}</summary>
                        <div class="session-log-tools-list">
                          ${n.tools.map(([e,t])=>L`
                              <span class="session-log-tools-pill">${e} × ${t}</span>
                            `)}
                        </div>
                      </details>
                    `:z}
            </div>
          `})}
        ${b.length===0?L`
                <div class="usage-empty-block usage-empty-block--compact">
                  ${w(`usage.details.noMessagesMatch`)}
                </div>
              `:z}
      </div>
    </div>
  `}function sr(){return(sr=e((()=>{c(),B(),N(),O(),I(),h(),$e(),X(),St(),Dn(),Wn(),$n()})))()}function cr(e){return new Date(`${e}T12:00:00Z`).getTime()}function lr(e){return new Date(e).toISOString().slice(0,10)}function ur(e){let t=e.toSorted((e,t)=>e-t),n=e=>t[Math.min(t.length-1,Math.floor(t.length*e))]??0;return[n(.25),n(.5),n(.75)]}function dr(e,t){return e<=0?0:e<t[0]?1:e<t[1]?2:e<t[2]?3:4}function fr(e,t,n,r){let i=cr(n),a=Math.max(cr(t),i-363*pr),o=new Map(e.map(e=>[e.date,e.totalTokens])),s=e.filter(e=>{let t=cr(e.date);return e.totalTokens>0&&t>=a&&t<=i}).map(e=>e.totalTokens),c=s.length>0?ur(s):[0,0,0],l=a-new Date(a).getUTCDay()*pr,u=new Intl.DateTimeFormat(r,{month:`short`,timeZone:`UTC`}),d=[],f=[],p=-1;for(let e=l;e<=i;e+=7*pr){let t=[];for(let n=0;n<7;n+=1){let r=e+n*pr;if(r<a||r>i){t.push(null);continue}let s=lr(r),l=o.get(s)??0;t.push({date:s,tokens:l,level:dr(l,c)})}d.push({days:t});let r=cr(t.find(e=>e!==null)?.date??n),s=new Date(r).getUTCMonth();f.push(s===p?``:u.format(new Date(r))),p=s}return{weeks:d,monthLabels:f}}var pr;function mr(){return(mr=e((()=>{pr=864e5})))()}function hr(e){let t=yr+e.weeks.length*vr,n=new Intl.NumberFormat(void 0,{maximumFractionDigits:0}),r=new Intl.DateTimeFormat(void 0,{weekday:`short`,timeZone:`UTC`});return L`
    <svg
      class="usage-heatmap__svg"
      viewBox="0 0 ${t} ${116}"
      style="--usage-heatmap-width: ${t}px"
      role="group"
      aria-label=${w(`usage.heatmap.title`)}
    >
      ${e.monthLabels.map((e,t)=>e?U`<text class="usage-heatmap__month" x=${yr+t*vr} y="10">${e}</text>`:z)}
      ${xr.map(({row:e,utcDay:t})=>U`<text class="usage-heatmap__weekday" x=${24} y=${br+e*vr+_r-2}>${r.format(new Date(t))}</text>`)}
      ${e.weeks.map((e,t)=>e.days.map((e,r)=>{if(!e)return z;let i=`${en(e.date)} · ${w(`usage.heatmap.cellTokens`,{tokens:n.format(e.tokens)})}`;return U`
            <rect
              class="usage-heatmap__cell usage-heatmap__cell--l${e.level}"
              x=${yr+t*vr}
              y=${br+r*vr}
              width=${_r}
              height=${_r}
              rx="2.5"
              role="img"
              data-tooltip=${i}
              aria-label=${i}
            ></rect>
          `}))}
    </svg>
  `}function gr(e,t,n){if(e.length===0)return z;let r=fr(e,t,n),i=L`
    <div class="usage-heatmap__legend" aria-hidden="true">
      <span>${w(`usage.heatmap.less`)}</span>
      ${[0,1,2,3,4].map(e=>L`<span class="usage-heatmap__swatch usage-heatmap__cell--l${e}"></span>`)}
      <span>${w(`usage.heatmap.more`)}</span>
    </div>
  `;return he({title:w(`usage.heatmap.title`),description:w(`usage.heatmap.subtitle`),actions:i},L`<div class="usage-panel usage-heatmap">${hr(r)}</div>`)}var _r,vr,yr,br,xr;function Sr(){return(Sr=e((()=>{B(),G(),O(),mr(),X(),_r=11,vr=14,yr=30,br=18,xr=[{row:1,utcDay:Date.UTC(2024,0,1)},{row:3,utcDay:Date.UTC(2024,0,3)},{row:5,utcDay:Date.UTC(2024,0,5)}]})))()}function Cr(e,t,n,r,i){if(n.length===0)return z;let o=a(e),s=Ge(r).filter(e=>a(e.key??``)===o).map(e=>e.value).filter(Boolean),c=new Set(s.map(e=>a(e))),l=n.every(e=>c.has(a(e))),u=s.length;return L`
    <wa-dropdown
      class="usage-filter-select"
      placement="bottom-start"
      @wa-select=${t=>{t.preventDefault();let o=t.detail.item.value;if(o===`command:select-all`){i(yn(r,e,n));return}if(o===`command:clear`){i(yn(r,e,[]));return}if(o?.startsWith(`option:`)){let n=decodeURIComponent(o.slice(7));i(yn(r,e,t.detail.item.checked?[...s,n]:s.filter(e=>a(e)!==a(n))))}}}
    >
      <button slot="trigger" type="button" class="usage-filter-trigger">
        <span>${t}</span>
        ${u>0?L`<span class="settings-count">${u}</span>`:L` <span class="settings-count">${w(`usage.filters.all`)}</span> `}
      </button>
      <wa-dropdown-item value="command:select-all" ?disabled=${l}>
        ${w(`usage.filters.selectAll`)}
      </wa-dropdown-item>
      <wa-dropdown-item value="command:clear" ?disabled=${u===0}>
        ${w(`usage.filters.clear`)}
      </wa-dropdown-item>
      <div class="session-menu__separator" role="separator"></div>
      ${n.map(e=>{let t=c.has(a(e));return L`
          <wa-dropdown-item
            class="usage-filter-option"
            type="checkbox"
            value=${`option:${encodeURIComponent(e)}`}
            .checked=${t}
          >
            ${e}
          </wa-dropdown-item>
        `})}
    </wa-dropdown>
  `}function wr(){return(wr=e((()=>{B(),O(),$e(),bn()})))()}function Tr(e,t,n){let r=n?L`<div class="callout warning usage-callout">${w(`usage.providerUsage.stalled`)}</div>`:t?L`<div class="callout warning usage-callout">
          ${w(`usage.providerUsage.unavailable`)}
        </div>`:z;return e.length===0?r:he({title:w(`usage.providerUsage.title`),count:e.length,description:w(`usage.providerUsage.subtitle`)},L`
      ${r}
      <div class="usage-panel provider-usage-section">
        <div class="provider-usage-grid">
          ${e.map(e=>L`
              <article class="provider-usage-card">
                <div class="provider-usage-card__header">
                  <div>
                    <div class="provider-usage-card__name">${e.displayName}</div>
                    <div class="provider-usage-card__id">${e.provider}</div>
                  </div>
                  ${e.plan?L`<span class="provider-usage-plan">${e.plan}</span>`:z}
                </div>
                ${Ue(e)}
              </article>
            `)}
        </div>
      </div>
    `)}function Er(e){let{data:t,filters:n,display:r,detail:i,callbacks:a}=e,o=a.filters,s=a.display,c=a.details,{hasOverviewData:l,loadingOverview:u}=rt(t),d=r.chartMode===`tokens`,f=n.query.trim().length>0,p=n.queryDraft.trim().length>0,m=new Set(n.selectedDays),h=new Set(n.selectedSessions),g=t.sessions.toSorted((e,t)=>{let n=d?e.usage?.totalTokens??0:e.usage?.totalCost??0;return(d?t.usage?.totalTokens??0:t.usage?.totalCost??0)-n}),_=n.selectedHours.length>0?g.filter(e=>Kt(e,n.selectedHours,n.timeZone)):g,v=Ze(_,n.query),y=e=>m.size===0?!0:e.usage?.activityDates?.length?e.usage.activityDates.some(e=>m.has(e)):!!(e.updatedAt&&m.has(Yt(new Date(e.updatedAt),n.timeZone))),b=v.sessions.filter(y),x=v.warnings,S=pn(g,t.aggregates),C=gn(n.queryDraft,S),T=Ge(n.queryDraft),E=n.selectedSessions.length===1?t.sessions.find(e=>e.key===n.selectedSessions[0])??b.find(e=>e.key===n.selectedSessions[0]):null,ee=h.size?v.sessions.filter(e=>h.has(e.key)):v.sessions,D=ee.filter(y),O=h.size>0||f||n.selectedHours.length>0,k=O||m.size>0,te=e=>{let t=K();for(let n of e)n&&Ct(t,n);return t},A=O?(()=>{let e=new Map;for(let t of ee)for(let n of t.usage?.dailyBreakdown??[]){let t=e.get(n.date)??K();Ct(t,n),e.set(n.date,t)}return Array.from(e,([e,t])=>({date:e,...t})).toSorted((e,t)=>e.date.localeCompare(t.date))})():t.costDaily,j=l?m.size?te(A.filter(e=>m.has(e.date))):O?te(D.map(e=>e.usage)):t.totals:null,N=t.aggregates?.sessionCount??g.length,P=k?on(D):on([],t.aggregates),F=O?void 0:t.aggregates?.byCreator;m.size>0&&(P.byCreator=(F??P.byCreator??[]).flatMap(e=>{let t=e.daily.filter(e=>m.has(e.date)),n=e.sessionActivity.flatMap(e=>{let t=e.dates.filter(e=>m.has(e));return t.length?[{dates:t,sessionCount:e.sessionCount}]:[]}),r=n.reduce((e,t)=>e+t.sessionCount,0),i=te(t);return r||i.totalTokens||i.totalCost?[{...e,totals:i,sessionCount:r,daily:t,sessionActivity:n}]:[]}));let ne=m.size>0&&F?(P.byCreator??[]).reduce((e,t)=>e+t.sessionCount,0):k?D.length:t.aggregates?.sessionCount??D.length;m.size>0&&F&&(P.sessionCount=ne);let I=t.sessionsLimitReached&&!k,re=I?te(D.map(e=>e.usage)):j,R=I?on(D):P,ie=k?z:Ln(t.costDaily,n.startDate,n.endDate,n.timeZone),B=sn(D,re,R),V=t.cacheRefresh===`complete`&&t.totals!==null&&!t.loading&&!t.error&&t.sessions.length===0&&(t.totals?.totalTokens??0)===0,ae=(j?.missingCostEntries??0)>0,oe=[{label:w(`usage.presets.today`),days:1},{label:w(`usage.presets.last7d`),days:7},{label:w(`usage.presets.last30d`),days:30},{label:w(`usage.presets.last90d`),days:90},{label:w(`usage.presets.last1y`),days:365}],H=e=>{let t=new Date,r=new Date(t);return n.timeZone===`utc`?r.setUTCDate(r.getUTCDate()-(e-1)):r.setDate(r.getDate()-(e-1)),{start:Yt(r,n.timeZone),end:Yt(t,n.timeZone)}},U=e=>{let t=H(e);return n.startDate===t.start&&n.endDate===t.end},W=e=>{let t=H(e);o.onStartDateChange(t.start),o.onEndDateChange(t.end)},se=()=>{o.onStartDateChange(`1970-01-01`),o.onEndDateChange(Yt(new Date,n.timeZone))},ce=Yt(new Date);return ye(L`
      <div class="usage-page">
        <section class="settings-section">
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${w(`usage.filters.rangeTitle`)}</h2>
            <div class="settings-section__actions">
              ${u?yt(w(`usage.loading.badge`)):z}
              ${V?L`<span class="usage-query-hint">${w(`usage.empty.hint`)}</span>`:z}
            </div>
          </div>
          <div
            class="settings-group usage-panel usage-header ${r.headerPinned?`pinned`:``}"
          >
            <div class="usage-header-row">
              <div class="usage-controls">
                ${In(n.selectedDays,n.selectedHours,n.selectedSessions,t.sessions,o.onClearDays,o.onClearHours,o.onClearSessions,o.onClearFilters)}
                <div class="usage-presets">
                  ${oe.map(e=>L`
                      <button
                        class="btn btn--sm ${U(e.days)?`active`:``}"
                        aria-pressed=${U(e.days)}
                        @click=${()=>W(e.days)}
                      >
                        ${e.label}
                      </button>
                    `)}
                  <button
                    class="btn btn--sm ${n.startDate===`1970-01-01`?`active`:``}"
                    aria-pressed=${n.startDate===`1970-01-01`}
                    @click=${se}
                  >
                    ${w(`usage.presets.all`)}
                  </button>
                </div>
                <div class="usage-date-range">
                  <input
                    class="usage-date-input"
                    type="date"
                    .value=${n.startDate}
                    title=${w(`usage.filters.startDate`)}
                    aria-label=${w(`usage.filters.startDate`)}
                    @change=${e=>o.onStartDateChange(e.target.value)}
                  />
                  <span class="usage-separator">${w(`usage.filters.to`)}</span>
                  <input
                    class="usage-date-input"
                    type="date"
                    .value=${n.endDate}
                    title=${w(`usage.filters.endDate`)}
                    aria-label=${w(`usage.filters.endDate`)}
                    @change=${e=>o.onEndDateChange(e.target.value)}
                  />
                </div>
                <select
                  class="usage-select"
                  title=${w(`usage.filters.timeZone`)}
                  aria-label=${w(`usage.filters.timeZone`)}
                  .value=${n.timeZone}
                  @change=${e=>o.onTimeZoneChange(e.target.value)}
                >
                  <option value="local">${w(`usage.filters.timeZoneLocal`)}</option>
                  <option value="utc">${w(`usage.filters.timeZoneUtc`)}</option>
                </select>
              </div>
              <div class="usage-view-options">
                ${kn({options:t.creatorOptions,selectedKey:n.creatorKey,onSelect:o.onCreatorChange})}
                ${Ee({mode:`buttons`,variant:`accent`,value:n.scope,onChange:o.onScopeChange,onReselect:o.onScopeChange,options:[{value:`instance`,label:w(`usage.scope.instance`),title:w(`usage.scope.instanceHint`)},{value:`family`,label:w(`usage.scope.family`),title:w(`usage.scope.familyHint`)}]})}
                ${Ee({mode:`buttons`,variant:`accent`,value:d?`tokens`:`cost`,onChange:s.onChartModeChange,onReselect:s.onChartModeChange,options:[{value:`tokens`,label:w(`usage.metrics.tokens`)},{value:`cost`,label:w(`usage.metrics.cost`)}]})}
                <button
                  class="btn btn--sm primary"
                  @click=${o.onRefresh}
                  ?disabled=${t.loading}
                >
                  ${w(`common.refresh`)}
                </button>
              </div>
            </div>

            <div class="usage-header-row">
              <div class="usage-header-metrics">
                ${j?L`
                        <span class="usage-metric-badge">
                          <strong>${q(j.totalTokens)}</strong>
                          ${w(`usage.metrics.tokens`)}
                        </span>
                        <span class="usage-metric-badge">
                          <strong>${J(j.totalCost)}</strong>
                          ${w(`usage.metrics.cost`)}
                        </span>
                        <span class="usage-metric-badge">
                          <strong>${ne}</strong>
                          ${w(ne===1?`usage.metrics.session`:`usage.metrics.sessions`)}
                        </span>
                      `:z}
                <button
                  class="btn btn--sm usage-pin-btn ${r.headerPinned?`active`:``}"
                  @click=${o.onToggleHeaderPinned}
                >
                  ${r.headerPinned?w(`usage.filters.pinned`):w(`usage.filters.pin`)}
                </button>
                <wa-dropdown
                  class="usage-export-menu"
                  placement="bottom-end"
                  @wa-select=${e=>{switch(e.detail.item.value){case`sessions-csv`:fe(`openclaw-usage-sessions-${ce}.csv`,mn(D),`text/csv;charset=utf-8`);break;case`daily-csv`:fe(`openclaw-usage-daily-${ce}.csv`,hn(A),`text/csv;charset=utf-8`);break;case`json`:s.onExportJson({totals:j,sessions:D,daily:A,aggregates:P});break;case void 0:}}}
                >
                  <button
                    slot="trigger"
                    type="button"
                    class="btn btn--sm"
                    aria-busy=${t.exporting}
                  >
                    ${t.exporting?w(`common.loading`):w(`usage.export.label`)} ▾
                  </button>
                  <wa-dropdown-item
                    value="sessions-csv"
                    ?disabled=${D.length===0}
                  >
                    ${w(`usage.export.sessionsCsv`)}
                  </wa-dropdown-item>
                  <wa-dropdown-item value="daily-csv" ?disabled=${A.length===0}>
                    ${w(`usage.export.dailyCsv`)}
                  </wa-dropdown-item>
                  <wa-dropdown-item
                    value="json"
                    ?disabled=${t.exporting||t.loading||D.length===0&&A.length===0}
                  >
                    ${w(`usage.export.json`)}
                  </wa-dropdown-item>
                </wa-dropdown>
              </div>
            </div>

            <div class="usage-query-section">
              <div class="usage-query-bar">
                <input
                  class="usage-query-input"
                  type="text"
                  .value=${n.queryDraft}
                  aria-label=${w(`usage.query.placeholder`)}
                  placeholder=${w(`usage.query.placeholder`)}
                  @input=${e=>o.onQueryDraftChange(e.target.value)}
                  @keydown=${e=>{e.key===`Enter`&&(e.preventDefault(),o.onApplyQuery())}}
                />
                <div class="usage-query-actions">
                  <button
                    class="btn btn--sm"
                    @click=${o.onApplyQuery}
                    ?disabled=${t.loading||!p&&!f}
                  >
                    ${w(`usage.query.apply`)}
                  </button>
                  ${p||f?L`
                          <button class="btn btn--sm" @click=${o.onClearQuery}>
                            ${w(`usage.filters.clear`)}
                          </button>
                        `:z}
                  <span class="usage-query-hint">
                    ${l?f?w(`usage.query.matching`,{shown:String(b.length),total:String(N)}):w(`usage.query.inRange`,{total:String(N)}):z}
                  </span>
                </div>
              </div>
              <div class="usage-filter-row">
                ${Cr(`channel`,w(`usage.filters.channel`),S.channel,n.queryDraft,o.onQueryDraftChange)}
                ${Cr(`provider`,w(`usage.filters.provider`),S.provider,n.queryDraft,o.onQueryDraftChange)}
                ${Cr(`model`,w(`usage.filters.model`),S.model,n.queryDraft,o.onQueryDraftChange)}
                ${Cr(`tool`,w(`usage.filters.tool`),S.tool,n.queryDraft,o.onQueryDraftChange)}
                <span class="usage-query-hint">${w(`usage.query.tip`)}</span>
              </div>
              ${T.length>0?L`
                      <div class="usage-query-chips">
                        ${T.map(e=>{let t=e.raw;return L`
                            <span class="usage-query-chip">
                              ${t}
                              <openclaw-tooltip .content=${w(`usage.filters.remove`)}>
                                <button
                                  aria-label=${w(`usage.filters.remove`)}
                                  @click=${()=>o.onQueryDraftChange(vn(n.queryDraft,t))}
                                >
                                  ${M.x}
                                </button>
                              </openclaw-tooltip>
                            </span>
                          `})}
                      </div>
                    `:z}
              ${C.length>0?L`
                      <div class="usage-query-suggestions">
                        ${C.map(e=>L`
                            <button
                              class="usage-query-suggestion"
                              @click=${()=>o.onQueryDraftChange(_n(n.queryDraft,e.value))}
                            >
                              ${e.label}
                            </button>
                          `)}
                      </div>
                    `:z}
              ${x.length>0?L`
                      <div class="callout warning usage-callout usage-callout--tight">
                        ${x.join(` · `)}
                      </div>
                    `:z}
            </div>

            ${t.error?L`<div class="callout danger usage-callout">${t.error}</div>`:z}
            ${t.cacheRefresh===`complete`?z:L`
                    <div
                      class="callout ${t.cacheRefresh===`failed`?`warning`:``} usage-callout usage-cache-warning"
                      role="status"
                      aria-live="polite"
                    >
                      ${w(t.cacheRefresh===`failed`?`usage.cacheStatus.paused`:`usage.cacheStatus.warning`)}
                    </div>
                  `}
            ${t.sessionsLimitReached?L`
                    <div class="callout warning usage-callout">
                      ${w(`usage.sessions.limitReached`)}
                    </div>
                  `:z}
          </div>
        </section>

        ${l?V?bt(o.onRefresh):L`
                  <div class="settings-group usage-panel usage-left-card usage-trend-section">
                    ${Tn(A,n.selectedDays,r.chartMode,r.dailyChartMode,s.onDailyChartModeChange,o.onSelectDay,{startDate:n.startDate,endDate:n.endDate,complete:t.cacheRefresh===`complete`})}
                    ${j?En(j,r.chartMode):z}
                  </div>
                  ${An({groups:P.byCreator??[],selectedKey:n.creatorKey,mode:r.chartMode,onSelect:o.onCreatorChange})}
                  ${Bn(re,R,B,ae,n.selectedDays.length===0,Rt(D,n.timeZone),ne,N)}
                  ${ie}
                  ${gr(A,n.startDate,n.endDate)}
                  ${Jt(D,n.timeZone,n.selectedHours,o.onSelectHour)}

                  <div class="usage-grid">
                    <div class="usage-grid-column">
                      ${Vn(b,n.selectedSessions,n.selectedDays,d,r.sessionSort,r.sessionSortDir,r.recentSessions,r.sessionsTab,c.onSelectSession,s.onSessionSortChange,s.onSessionSortDirChange,s.onSessionsTabChange,void 0,N,o.onClearSessions)}
                    </div>
                    ${E?L`<div class="usage-grid-column">
                            ${ir(E,i,c,n,r.contextExpanded,o.onClearSessions)}
                          </div>`:z}
                  </div>
                `:u?L`<div class="usage-panel usage-loading-card">
                  <div class="usage-loading-grid">
                    <div class="skeleton usage-skeleton-block usage-skeleton-block--tall"></div>
                    <div class="skeleton usage-skeleton-block"></div>
                    <div class="skeleton usage-skeleton-block"></div>
                  </div>
                </div>`:z}
        ${Tr(t.providerUsage,t.providerUsageUnavailable,t.providerUsageStalled)}
      </div>
    `,{wide:!0})}function Dr(){return(Dr=e((()=>{B(),N(),We(),G(),I(),we(),O(),$e(),X(),St(),bn(),Dn(),jn(),sr(),Sr(),Hn(),wr()})))()}var $,Or;function kr(){return(kr=e((()=>{t(),B(),oe(),re(),A(),y(),Be(),me(),T(),S(),dt(),_t(),$e(),St(),He(),et(),Dr(),$=class extends D{constructor(...e){super(...e),this.usageSnapshot=null,this.providerUsageSummary=null,this.providerUsageUnavailable=!1,this.providerUsageIncomplete=!1,this.usageError=null,this.initialDateRange=Qe(),this.usageStartDate=this.initialDateRange.startDate,this.usageEndDate=this.initialDateRange.endDate,this.usageScope=`family`,this.usageAgentId=null,this.usageCreatorKey=null,this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode=`tokens`,this.usageDailyChartMode=`by-type`,this.usageTimeSeriesMode=`per-turn`,this.usageTimeSeriesBreakdownMode=`by-type`,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogsExpanded=!1,this.usageQuery=``,this.usageQueryDraft=``,this.usageSessionSort=`recent`,this.usageSessionSortDir=`desc`,this.usageRecentSessions=[],this.usageTimeZone=`local`,this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab=`all`,this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery=``,this.dateDebounceTimer=null,this.queryDebounceTimer=null,this.connectionEpoch={},this.usageUpdatedAt=0,this.acknowledgedUsageFailures=new WeakSet,this.routeDataInitialized=!1,this.routeDataEnabled=!0,this.refreshPolicy=new Ve({isLoading:()=>this.usageLoading,reload:e=>{e===`manual`&&(this.usageUpdatedAt=this.usagePublication.updatedAt),this.clearDateDebounce();let t=e===`manual`&&this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]:void 0;return this.loadUsage(t)},onIncompleteUsageExhausted:()=>this.requestUpdate()}),this.gateway=new pe(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetForClientChange(),invalidateRequests:e=>{e.snapshot.phase!==`connected`&&(this.refreshPolicy.interrupt(),this.usageRequest.cancel(),this.details.cancel(),this.usageExportRequest.cancel())},onSnapshot:e=>this.handleGatewaySnapshot(e),onPageActivation:()=>this.refreshPolicy.request(`focus`)}),this.observeAgentScope=le(e=>{this.routeDataInitialized&&this.usageAgentId!==e&&(this.usageAgentId=e,this.usageCreatorKey=null,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)),this.requestUpdate()}),this.usageRequest=st(this,{task:async([e,t],{signal:n})=>{this.refreshPolicy.beginLoad();let r=this.connectionEpoch,i=this.currentQuery;return{epoch:r,query:i,refreshSessionKey:t,snapshot:await Xe(e,i,n)}},onComplete:e=>{let t=e.snapshot,n=this.isCurrentQuery(e.query);if(n&&t.ok){this.usageSnapshot={query:e.query,result:t.value.result,costSummary:t.value.costSummary},this.usageError=null;let n=this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]:void 0;n&&this.details.load(n,e.refreshSessionKey===n)}else n&&!t.ok&&this.applyUsageError(t.error.cause);this.applyUsageLoadState(t.ok?t.value.providerUsage:t.error.providerUsage,e.epoch,n&&t.ok?void 0:null),this.refreshPolicy.flushPending()},onError:e=>{this.applyUsageError(e),this.applyUsageLoadState({state:`pending`},this.connectionEpoch,null),this.refreshPolicy.flushPending()}}),this.usageExportRequest=gt(this,this.gateway,()=>this.currentQuery),this.details=new ut(this,this.gateway,()=>this.currentQuery,()=>this.usageResult?.sessions??[],()=>{this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null}),this.subscriptions=new ee(this).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t))}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.ensureInitialData())}disconnectedCallback(){this.subscriptions.clear(),this.clearDateDebounce(),this.clearQueryDebounce(),this.refreshPolicy.dispose(),this.usageRequest.cancel(),this.details.cancel(),this.usageExportRequest.cancel(),super.disconnectedCallback()}applyRouteData(){let e=this.routeData;if(!e||(this.routeDataInitialized=!0,!this.routeDataEnabled))return;if(!this.gateway.isRouteDataCurrent(e)){this.routeDataEnabled=!1;return}let t=this.context.agentSelection.state.scopeId;if(e.query.agentId!==t){this.usageAgentId=t,this.clearSelectionsAndDetails(),this.resetProviderUsage(),this.refreshPolicy.request(`manual`);return}this.usageStartDate=e.query.startDate,this.usageEndDate=e.query.endDate,this.usageScope=e.query.scope,this.usageTimeZone=e.query.timeZone,this.usageAgentId=e.query.agentId,this.usageCreatorKey=e.query.creatorKey??null,this.usageSnapshot={query:this.currentQuery,result:e.result,costSummary:e.costSummary},this.applyUsageLoadState(e.providerUsage,this.connectionEpoch,e.loadedAtMs),this.usageError=e.error;let n=it(e.gatewaySnapshot.usagePublications,this.currentQuery.agentId).updatedAt;this.usagePublication.committedAt>n&&this.refreshPolicy.request(`publication`),this.refreshPolicy.flushPending()}ensureInitialData(){!this.routeDataEnabled&&this.routeDataInitialized&&this.gateway.client&&this.gateway.connected&&!this.usageLoading&&this.loadUsage()}resetForClientChange(){this.clearDateDebounce(),this.usageRequest.cancel(),this.routeDataInitialized&&(this.routeDataEnabled=!1),this.usageSnapshot=null,this.resetProviderUsage(),this.usageError=null,this.usageAgentId=this.context.agentSelection.state.scopeId,this.usageCreatorKey=null,this.clearSelectionsAndDetails()}resetProviderUsage(){this.providerUsageSummary=null,this.providerUsageUnavailable=!1,this.providerUsageIncomplete=!1,this.refreshPolicy.resetPayload()}applyUsageLoadState(e,t,n=Date.now()){if(e.state===`settled`){let t=e.result;this.providerUsageUnavailable=!t.ok,this.providerUsageIncomplete=!t.ok||ze(t.value),t.ok&&!this.providerUsageIncomplete&&(this.providerUsageSummary=t.value)}this.refreshPolicy.setLastLoadedAtMs(e.state===`pending`||this.usageCacheIncomplete?null:n,{incomplete:this.providerUsageIncomplete,connection:t})}get usagePublication(){return it(this.gateway.snapshot?.usagePublications,this.currentQuery.agentId)}get usageRefreshFailed(){return this.usagePublication.failures.some(e=>!this.acknowledgedUsageFailures.has(e))}get usageCacheIncomplete(){return nt(this.usageResult?.cacheStatus,this.usageCostSummary?.cacheStatus)}get currentQuery(){return{startDate:this.usageStartDate,endDate:this.usageEndDate,scope:this.usageScope,timeZone:this.usageTimeZone,agentId:a(this.usageAgentId??``)||void 0,creatorKey:this.usageCreatorKey??void 0}}isCurrentQuery(e){let t=this.currentQuery;return e.startDate===t.startDate&&e.endDate===t.endDate&&e.scope===t.scope&&e.timeZone===t.timeZone&&e.agentId===t.agentId&&e.creatorKey===t.creatorKey}get usageResult(){return this.usageSnapshot&&this.isCurrentQuery(this.usageSnapshot.query)?this.usageSnapshot.result:null}get usageCostSummary(){return this.usageSnapshot&&this.isCurrentQuery(this.usageSnapshot.query)?this.usageSnapshot.costSummary:null}get usageCreatorOptions(){return this.usageSnapshot?.query.agentId===this.currentQuery.agentId?this.usageSnapshot?.result?.creatorOptions??[]:[]}get providerUsageStalled(){return this.providerUsageIncomplete&&this.refreshPolicy.incompleteUsageExhausted}applyUsageError(e){let t=m(e);this.usageError=t?b(`usage`):tt(e),t&&(this.usageSnapshot=null)}get usageLoading(){return!this.routeDataInitialized||this.dateDebounceTimer!==null||this.usageRequest.pending}loadUsage(e){let t=this.gateway.client;return!t||!this.gateway.connected?(this.refreshPolicy.markLoadDeferred(),Promise.resolve()):(this.routeDataEnabled=!1,this.usageError=null,this.usageRequest.run([t,e]))}clearSelections(){this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageSelectedSessions=[]}clearSelectionsAndDetails(){this.usageExportRequest.cancel(),this.clearSelections(),this.details.clear()}clearDateDebounce(){this.dateDebounceTimer!==null&&(window.clearTimeout(this.dateDebounceTimer),this.dateDebounceTimer=null)}scheduleUsageLoad(){this.clearDateDebounce(),this.usageRequest.cancel(),this.usageError=null,this.refreshPolicy.resetPayload(),this.routeDataEnabled=!1,this.dateDebounceTimer=window.setTimeout(()=>{this.dateDebounceTimer=null,this.refreshPolicy.request(`manual`)},400)}handleGatewaySnapshot(e){if(!this.gateway.connected||!this.gateway.client)return;this.context.agents.ensureList();let t=this.usagePublication,n=t.committedAt>this.usageUpdatedAt;this.usageUpdatedAt=t.updatedAt,e.identityChanged||e.becameConnected?(this.connectionEpoch={},this.routeDataInitialized&&this.refreshPolicy.request(`reconnect`)):n&&this.routeDataInitialized&&this.refreshPolicy.request(`publication`);let r=this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]:void 0;if(e.becameAvailable&&r)for(let e of[this.details.timeSeries,this.details.sessionLogs,this.details.contextWeight])e.recover(r,e===this.details.contextWeight)}clearQueryDebounce(){this.queryDebounceTimer!==null&&(window.clearTimeout(this.queryDebounceTimer),this.queryDebounceTimer=null)}selectSession(e,t,n){if(this.details.clear(),this.usageRecentSessions=[e,...this.usageRecentSessions.filter(t=>t!==e)].slice(0,8),this.usageSelectedSessions=Ye(this.usageSelectedSessions,e,n,t),this.usageSelectedSessions.length===1){let e=this.usageSelectedSessions[0];e&&this.details.load(e)}}render(){let e=this.details.timeSeries.data,t={data:{loading:this.usageLoading,exporting:this.usageExportRequest.pending,error:this.usageError,sessions:this.usageResult?.sessions??[],creatorOptions:this.usageCreatorOptions,sessionsLimitReached:(this.usageResult?.sessions.length??0)>=1e3,totals:this.usageResult?.totals??null,aggregates:this.usageResult?.aggregates??null,costDaily:this.usageCostSummary?.daily??[],cacheRefresh:this.usageCacheIncomplete?this.usageRefreshFailed?`failed`:`retrying`:`complete`,providerUsage:this.providerUsageSummary?.providers??[],providerUsageStalled:this.providerUsageStalled,providerUsageUnavailable:this.providerUsageUnavailable},filters:{startDate:this.usageStartDate,endDate:this.usageEndDate,scope:this.usageScope,selectedSessions:this.usageSelectedSessions,selectedDays:this.usageSelectedDays,selectedHours:this.usageSelectedHours,creatorKey:this.usageCreatorKey,query:this.usageQuery,queryDraft:this.usageQueryDraft,timeZone:this.usageTimeZone},display:{chartMode:this.usageChartMode,dailyChartMode:this.usageDailyChartMode,sessionSort:this.usageSessionSort,sessionSortDir:this.usageSessionSortDir,recentSessions:this.usageRecentSessions,sessionsTab:this.usageSessionsTab,contextExpanded:this.usageContextExpanded,headerPinned:this.usageHeaderPinned},detail:{context:{weight:this.details.contextWeight.data,loading:this.details.contextWeight.loading,status:this.details.contextWeight.status},timeSeriesMode:this.usageTimeSeriesMode,timeSeriesBreakdownMode:this.usageTimeSeriesBreakdownMode,timeSeries:e,timeSeriesLoading:this.details.timeSeries.loading,timeSeriesStatus:this.details.timeSeries.status,timeSeriesCursorStart:this.usageTimeSeriesCursorStart,timeSeriesCursorEnd:this.usageTimeSeriesCursorEnd,sessionLogs:this.details.sessionLogs.data,sessionLogsLoading:this.details.sessionLogs.loading,sessionLogsStatus:this.details.sessionLogs.status,sessionLogsExpanded:this.usageSessionLogsExpanded,logFilters:{roles:this.usageLogFilterRoles,tools:this.usageLogFilterTools,hasTools:this.usageLogFilterHasTools,query:this.usageLogFilterQuery}},callbacks:{filters:{onStartDateChange:e=>{this.usageStartDate=e,this.clearSelectionsAndDetails(),this.scheduleUsageLoad()},onEndDateChange:e=>{this.usageEndDate=e,this.clearSelectionsAndDetails(),this.scheduleUsageLoad()},onScopeChange:e=>{this.usageScope=e,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)},onCreatorChange:e=>{this.usageCreatorKey=e,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)},onRefresh:()=>{for(let e of this.usagePublication.failures)this.acknowledgedUsageFailures.add(e);this.refreshPolicy.request(`manual`)},onTimeZoneChange:e=>{this.usageTimeZone=e,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)},onToggleHeaderPinned:()=>this.usageHeaderPinned=!this.usageHeaderPinned,onSelectHour:(e,t)=>{this.usageSelectedHours=qe(this.usageSelectedHours,e,Array.from({length:24},(e,t)=>t),t,!0)},onQueryDraftChange:e=>{this.usageQueryDraft=e,this.clearQueryDebounce(),this.queryDebounceTimer=window.setTimeout(()=>{this.usageQuery=this.usageQueryDraft,this.queryDebounceTimer=null},250)},onApplyQuery:()=>{this.clearQueryDebounce(),this.usageQuery=this.usageQueryDraft},onClearQuery:()=>{this.clearQueryDebounce(),this.usageQueryDraft=``,this.usageQuery=``},onSelectDay:(e,t,n)=>{this.usageSelectedDays=qe(this.usageSelectedDays,e,n,t,!1)},onClearDays:()=>this.usageSelectedDays=[],onClearHours:()=>this.usageSelectedHours=[],onClearSessions:()=>{this.usageSelectedSessions=[],this.details.clear()},onClearFilters:()=>this.clearSelectionsAndDetails()},display:{onExportJson:e=>{this.usageExportRequest.run(e)},onChartModeChange:e=>this.usageChartMode=e,onDailyChartModeChange:e=>this.usageDailyChartMode=e,onSessionSortChange:e=>this.usageSessionSort=e,onSessionSortDirChange:e=>this.usageSessionSortDir=e,onSessionsTabChange:e=>this.usageSessionsTab=e},details:{onToggleContextExpanded:()=>this.usageContextExpanded=!this.usageContextExpanded,onToggleSessionLogsExpanded:()=>this.usageSessionLogsExpanded=!this.usageSessionLogsExpanded,onLogFilterRolesChange:e=>{this.usageLogFilterRoles=e},onLogFilterToolsChange:e=>{this.usageLogFilterTools=e},onLogFilterHasToolsChange:e=>{this.usageLogFilterHasTools=e},onLogFilterQueryChange:e=>{this.usageLogFilterQuery=e},onLogFilterClear:()=>{this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery=``},onSelectSession:(e,t,n)=>this.selectSession(e,t,n),onTimeSeriesModeChange:e=>{this.usageTimeSeriesMode=e},onTimeSeriesBreakdownChange:e=>{this.usageTimeSeriesBreakdownMode=e},onTimeSeriesCursorRangeChange:(t,n)=>{this.details.timeSeries.data===e&&(this.usageTimeSeriesCursorStart=t,this.usageTimeSeriesCursorEnd=n)}}}};return vt(this.context,this.usageResult,Er(t))}},u([d({context:ne,subscribe:!0})],$.prototype,`context`,void 0),u([W({attribute:!1})],$.prototype,`routeData`,void 0),u([V()],$.prototype,`usageSnapshot`,void 0),u([V()],$.prototype,`providerUsageSummary`,void 0),u([V()],$.prototype,`providerUsageUnavailable`,void 0),u([V()],$.prototype,`providerUsageIncomplete`,void 0),u([V()],$.prototype,`usageError`,void 0),u([V()],$.prototype,`usageStartDate`,void 0),u([V()],$.prototype,`usageEndDate`,void 0),u([V()],$.prototype,`usageScope`,void 0),u([V()],$.prototype,`usageAgentId`,void 0),u([V()],$.prototype,`usageCreatorKey`,void 0),u([V()],$.prototype,`usageSelectedSessions`,void 0),u([V()],$.prototype,`usageSelectedDays`,void 0),u([V()],$.prototype,`usageSelectedHours`,void 0),u([V()],$.prototype,`usageChartMode`,void 0),u([V()],$.prototype,`usageDailyChartMode`,void 0),u([V()],$.prototype,`usageTimeSeriesMode`,void 0),u([V()],$.prototype,`usageTimeSeriesBreakdownMode`,void 0),u([V()],$.prototype,`usageTimeSeriesCursorStart`,void 0),u([V()],$.prototype,`usageTimeSeriesCursorEnd`,void 0),u([V()],$.prototype,`usageSessionLogsExpanded`,void 0),u([V()],$.prototype,`usageQuery`,void 0),u([V()],$.prototype,`usageQueryDraft`,void 0),u([V()],$.prototype,`usageSessionSort`,void 0),u([V()],$.prototype,`usageSessionSortDir`,void 0),u([V()],$.prototype,`usageRecentSessions`,void 0),u([V()],$.prototype,`usageTimeZone`,void 0),u([V()],$.prototype,`usageContextExpanded`,void 0),u([V()],$.prototype,`usageHeaderPinned`,void 0),u([V()],$.prototype,`usageSessionsTab`,void 0),u([V()],$.prototype,`usageLogFilterRoles`,void 0),u([V()],$.prototype,`usageLogFilterTools`,void 0),u([V()],$.prototype,`usageLogFilterHasTools`,void 0),u([V()],$.prototype,`usageLogFilterQuery`,void 0),customElements.get(`openclaw-usage-page`)||customElements.define(`openclaw-usage-page`,$),Or={header:!0,render:e=>L`<openclaw-usage-page .routeData=${e}></openclaw-usage-page>`}})))()}kr();export{Or as usagePageComponent};