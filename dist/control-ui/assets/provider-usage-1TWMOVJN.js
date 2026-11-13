import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kl as t,R as n,T as r,hu as i,ql as a,uu as o}from"./control-ui-core-pYNj5S1a.js";import{$ as s,X as c,Y as l}from"./lit-runtime-DZL1fcCI.js";function u(e){return/\b\d+(?:m|h)\b/iu.test(e)&&!/\b168h\b/iu.test(e)?0:/\b(?:week|168h)\b/iu.test(e)?1:2}function d(e){let t=new Map;for(let n of e){let e=n.groupLabel??``,r=t.get(e)??[];r.push(n),t.set(e,r)}for(let e of t.values())e.sort((e,t)=>u(e.label)-u(t.label));return t}function f(e){let t=e.trim().toUpperCase();if([`USD`,`EUR`,`GBP`,`CNY`,`JPY`].includes(t)){let e=new Intl.NumberFormat(void 0,{style:`currency`,currency:t,maximumFractionDigits:t===`JPY`?0:2});return t=>e.format(t)}let n=new Intl.NumberFormat(void 0,{maximumFractionDigits:2});return t=>`${n.format(t)} ${e}`}function p(e){return!e||!Number.isFinite(e)?null:new Intl.DateTimeFormat(void 0,{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`}).format(new Date(e))}function m(e){return(e.billing??[]).map(e=>{let t=e.label??(e.type===`balance`?i(`usage.providerUsage.balance`):e.type===`spend`?i(`usage.providerUsage.spend`):i(`usage.providerUsage.budget`)),n=f(e.unit),r=e.type===`budget`?`${n(e.used)} / ${n(e.limit)}`:n(e.amount);return s`
      <div class="provider-usage-billing-row">
        <span>${t}</span>
        <strong>${r}</strong>
      </div>
    `})}function h(e,t){let n=e.costHistory;if(!n)return 0;let r=new Date,i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate()),a=i-(Math.max(1,t)-1)*864e5;return n.daily.reduce((e,t)=>{let n=Date.parse(`${t.date}T00:00:00Z`);return Number.isFinite(n)&&n>=a&&n<=i?e+t.amount:e},0)}function g(e,t,n){return t.length>0?s`<div class="provider-cost-breakdown">
        <span class="provider-cost-breakdown__title">${e}</span>
        ${t.slice(0,3).map(e=>s`<div>
              <span>${e.name}</span><strong>${n(e)}</strong>
            </div>`)}
      </div>`:c}function _(e){let t=e.costHistory;if(!t||t.daily.length===0)return c;let n=0,a=0,o={requests:0,input:0,cache:0,output:0};for(let e of t.daily)n=Math.max(n,e.amount),a+=e.amount,o.requests+=e.requests??0,o.input+=e.inputTokens,o.cache=o.cache+e.cacheReadTokens+e.cacheWriteTokens,o.output+=e.outputTokens;let l=r(o.input),u=r(o.cache),d=r(o.output),p=[[i(`usage.providerUsage.today`),h(e,1)],[i(`usage.providerUsage.last7Days`),h(e,7)],[i(`usage.providerUsage.lastDays`,{count:String(t.periodDays)}),a]],m=f(t.unit);return s`
    <div class="provider-cost-history">
      <div class="provider-cost-windows">
        ${p.map(([e,t])=>s`
            <div class="provider-cost-window">
              <span>${e}</span>
              <strong>${m(t)}</strong>
            </div>
          `)}
      </div>
      <div
        class="provider-cost-chart"
        role="group"
        aria-label=${i(`usage.providerUsage.dailyCost`)}
      >
        ${t.daily.map(e=>{let t=e.amount>0&&n>0?Math.max(3,e.amount/n*100):0,r=`${e.date}: ${m(e.amount)}`;return s`<span
            role="img"
            style=${`height: ${t}%`}
            title=${r}
            aria-label=${r}
          ></span>`})}
      </div>
      <div class="provider-cost-tokens">
        ${o.requests>0?s`<span
                >${i(`usage.providerUsage.requests`,{count:new Intl.NumberFormat().format(o.requests)})}</span
              >`:c}
        <span>${i(`usage.providerUsage.inputTokens`,{count:l})}</span>
        <span>${i(`usage.providerUsage.cacheTokens`,{count:u})}</span>
        <span>${i(`usage.providerUsage.outputTokens`,{count:d})}</span>
      </div>
      ${t.models.length>0||t.categories.length>0?s`
              <div class="provider-cost-breakdowns">
                ${g(i(`usage.providerUsage.topModels`),t.models,e=>r(e.totalTokens))}
                ${g(i(`usage.providerUsage.costCategories`),t.categories,e=>m(e.amount))}
              </div>
            `:c}
    </div>
  `}function v(e){let t=Math.max(0,Math.min(100,e.usedPercent)),n=Math.max(0,100-t),r=n<=10?`danger`:n<=25?`warn`:`ok`,a=i(`usage.providerUsage.remaining`,{percent:n.toFixed(0)}),o=p(e.resetAt);return s`
    <div class="provider-usage-window">
      <div class="provider-usage-window__meta">
        <span>${e.label}</span>
        <strong>${a}</strong>
      </div>
      <div
        class=${`provider-usage-progress provider-usage-progress--${r}`}
        role="progressbar"
        aria-label=${e.label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${n.toFixed(0)}
        aria-valuetext=${a}
      >
        <span style=${`width: ${n}%`}></span>
      </div>
      ${o?s`<div class="provider-usage-reset">
              ${i(`usage.providerUsage.resets`,{date:o})}
            </div>`:c}
    </div>
  `}function y(e,n={}){return e.error?s`<div class="provider-usage-error">${t(e.error)}</div>`:s`
    ${e.windows.length>0?n.groupWindows?s`
              <div class="provider-usage-windows provider-usage-windows--grouped">
                ${Array.from(d(e.windows),([e,t])=>s`
                    <div
                      class="provider-usage-window-group"
                      role="group"
                      aria-label=${e||c}
                    >
                      ${e?s`<div class="provider-usage-window-group__title">${e}</div>`:c}
                      <div class="provider-usage-window-group__windows">
                        ${t.map(e=>v(e))}
                      </div>
                    </div>
                  `)}
              </div>
            `:s`
              <div class="provider-usage-windows">
                ${e.windows.map(e=>v(e))}
              </div>
            `:c}
    ${e.billing&&e.billing.length>0?s`<div class="provider-usage-billing">${m(e)}</div>`:c}
    ${_(e)}
    ${e.summary?s`<div class="provider-usage-summary">${e.summary}</div>`:c}
  `}function b(){return(b=e((()=>{l(),o(),a(),n()})))()}export{y as n,b as t};