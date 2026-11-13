import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ji as t,Vi as n,qr as r}from"./control-ui-foundation-C3MHh_P-.js";import{Ci as i,Ei as a,Si as o,Ti as s,_i as c,gi as l,hu as u,lu as d,pu as f,su as p,uu as m,vi as h,wi as g,xi as _,yi as v}from"./control-ui-core-pYNj5S1a.js";import{Qn as y,Xi as b,Xn as x,Zi as S,Zn as C,qn as w}from"./control-ui-core-D6clmJs8.js";import{$ as T,B as E,F as D,M as O,R as k,X as A,Y as j,c as ee,ct as M,nt as N,s as P,ut as F,z as I}from"./lit-runtime-DZL1fcCI.js";import{Ct as L,Et as R,Ft as z,Pt as te,_t as B,it as V,rt as ne,xt as re,yt as ie}from"./control-ui-boot-shared-DJ4XCcp6.js";import{i as ae,n as oe,r as se,t as ce}from"./config-form.tiers-a7YfkSZr.js";import{a as le,c as ue,f as de,i as fe,l as pe,n as me,o as he,r as ge,s as _e,t as ve,u as ye}from"./config-form.search-By3YxbhJ.js";import{A as be,B as H,C as xe,D as Se,E as Ce,F as we,I as Te,L as Ee,M as De,N as U,O as Oe,P as ke,R as Ae,S as je,T as Me,U as W,W as Ne,_ as Pe,a as Fe,b as Ie,c as Le,d as Re,f as ze,g as Be,h as Ve,i as He,j as G,k as K,l as q,m as Ue,n as J,o as We,p as Ge,r as Ke,s as qe,t as Je,u as Ye,v as Xe,w as Ze,x as Y,y as Qe,z as $e}from"./config-form.node.shared-nwEUEYxd.js";import{i as et,n as tt,r as nt,t as rt}from"./phone-runtime-ZUS6orP4.js";function it(e,t,n,r){let i=t[n];if(i===void 0)return{ok:!1};let a=n===t.length-1;if(typeof i==`number`){if(e!=null&&!Array.isArray(e))return{ok:!1};let o=Array.isArray(e)?[...e]:[];if(a)return r===void 0?o.splice(i,1):o[i]=r,{ok:!0,value:o};let s=it(o[i],t,n+1,r);return s.ok?(o[i]=s.value,{ok:!0,value:o}):s}if(e!=null&&(typeof e!=`object`||Array.isArray(e)))return{ok:!1};let o=e?{...e}:{},s=a?{ok:!0,value:r}:it(Object.hasOwn(o,i)?o[i]:void 0,t,n+1,r);return s.ok?(a&&s.value===void 0?delete o[i]:Object.defineProperty(o,i,{value:s.value,enumerable:!0,configurable:!0,writable:!0}),{ok:!0,value:o}):s}function at(e,t,n){return t.length===0?{ok:!0,value:n}:it(e,t,0,n)}function ot(e){if(e.value!==void 0||e.isRequired===!0||e.structuredDraftOwner===!0)return;let n=s(e.schema);if(n!==`object`&&n!==`array`)return;let r=e.schema.default,i=n===`object`?{}:[];return(n===`object`&&t(r)||n===`array`&&Array.isArray(r))&&(i=structuredClone(r)),U(e.schema,i)?void 0:i}var st;function ct(){return(ct=e((()=>{j(),N(),m(),d(),G(),W(),st=class extends p{constructor(...e){super(...e),this.error=``}willUpdate(e){if(!e.has(`props`))return;let t=e.get(`props`),n=this.props;n&&(!t||t.identity!==n.identity||!Object.is(t.sourceIdentity,n.sourceIdentity))&&(this.draftValue=structuredClone(n.initialValue),this.error=``)}patchDraft(e,n){let r=this.props,i=this.draftValue;if(!r||!i)return!1;let a=r.params.path;if(e.length<a.length||!a.every((t,n)=>t===e[n]))return!1;let o=at(i,e.slice(a.length),n);if(!o.ok)return!1;let c=o.value,l=s(r.params.schema);return l===`object`&&!t(c)||l===`array`&&!Array.isArray(c)?!1:(this.draftValue=c,this.error=``,!U(r.params.schema,c)||r.params.onPatch(a,c)!==!1||(this.error=u(`configForm.draftRejected`),!1))}render(){let e=this.props,t=this.draftValue;if(!e||!t)return A;let n=H(e.params.path,`structured-draft-error`);return T`
      ${e.renderNode({...e.params,value:t,sourceIdentity:t,controlIdentity:t,structuredDraftOwner:!0,onPatch:(e,t)=>this.patchDraft(e,t),onRemove:e=>this.patchDraft(e,void 0)})}
      ${this.error?T`
              <div class="settings-row settings-row--stacked cfg-structured-draft__error">
                <div class="settings-row__control">
                  <span id=${n} class="cfg-field__error" role="alert">${this.error}</span>
                </div>
              </div>
            `:A}
    `}},r([F({attribute:!1})],st.prototype,`props`,void 0),r([M()],st.prototype,`draftValue`,void 0),r([M()],st.prototype,`error`,void 0),customElements.get(`openclaw-config-form-structured-draft`)||customElements.define(`openclaw-config-form-structured-draft`,st)})))()}function lt(e,t){return t.length>e.length&&e.every((e,n)=>K(e,t[n]))}function ut(e){let{schema:t,value:n,minimumItems:r,maximumItems:i,uniqueItems:a,isUnset:o,isRequired:s,itemSchemaAt:c}=e,l=Math.max(1,r-n.length),u=l>100?1:l,d=[];for(let e=0;e<u;e+=1){let t=be(c(n.length+e));if(t===Ze){d.length=0;break}d.push(t)}let f=d.length===u?[...n,...d]:void 0,p=f!==void 0&&!a&&(i===void 0||f.length<=i)&&(f.length<r||U(t,f))?f:void 0,m=U(t,n),h=Me(t).find(e=>U(t,e)&&(o||!m||lt(n,e)))??(o&&s&&i===0&&U(t,[])?[]:void 0);return{atomicCandidate:Array.isArray(h)?structuredClone(h):void 0,autoCandidate:p}}function dt(){return(dt=e((()=>{G()})))()}var ft;function pt(){return(pt=e((()=>{G(),ft=class{constructor(){this.identities=new WeakMap,this.previous=[]}read(e){let t=this.identities.get(e);if(t?.length===e.length)return this.previous=e,t;let n=this.identities.get(this.previous)??[],r=new Set(this.previous.flatMap((t,n)=>K(t,e[n])?[]:[n])),i=e.map((e,t)=>{let i=K(e,this.previous[t])?t:[...r].find(t=>K(e,this.previous[t]));return i===void 0?Symbol(`array-row`):(r.delete(i),n[i])});return this.identities.set(e,i),this.previous=e,i}patch(e,t,n){let r=this.previous;this.identities.set(e,t);let i=n(e)!==!1;return i||(this.identities.delete(e),this.previous=r),i}}})))()}function mt(e,t){let n=e.currentTarget;if(!(n instanceof HTMLElement))return;let r=n.closest(`.cfg-block`);Array.from(r?.getElementsByTagName(`openclaw-config-form-collection-draft`)??[]).find(e=>e.parentElement===r&&e.id===t)?.openDraft?.()}var X;function ht(){return(ht=e((()=>{j(),N(),m(),d(),G(),x(),W(),X=class extends p{constructor(...e){super(...e),this.draftOpen=!1,this.draftKey=``,this.draftValue=``,this.draftIsNull=!1,this.error=``,this.invalidTarget=null}willUpdate(e){let t=e.get(`props`),n=this.props;t&&(!n||t.identity!==n.identity||!Object.is(t.sourceIdentity,n.sourceIdentity)&&!K(t.sourceIdentity,n.sourceIdentity))&&this.closeDraft()}openDraft(){this.props?.disabled||(this.draftOpen=!0,this.updateComplete.then(()=>{this.querySelector(`[data-collection-draft-value]`)?.focus()}))}clearError(){this.error=``,this.invalidTarget=null}closeDraft(){this.draftOpen=!1,this.draftKey=``,this.draftValue=``,this.draftIsNull=!1,this.clearError()}fail(e,t){this.invalidTarget=e,this.error=t,this.updateComplete.then(()=>{this.querySelector(e===`key`?`[data-collection-draft-key]`:`[data-collection-draft-value]`)?.focus()})}parseValue(e){if(this.draftIsNull)return{ok:!0,value:null};let t=s(e),n=e.anyOf??e.oneOf??[],r=n.some(g)&&n.some(e=>[`number`,`integer`].includes(s(e)??``));if(t===`string`)return{ok:!0,value:this.draftValue};if(t===`number`||t===`integer`){let e=w(this.draftValue,t===`integer`);return typeof e==`number`?{ok:!0,value:e}:{ok:!1,message:u(`configForm.invalidNumber`)}}try{let t=JSON.parse(this.draftValue);if(typeof t==`number`){let t=w(this.draftValue,!1);return typeof t==`number`?{ok:!0,value:t}:r&&U(e,this.draftValue)?{ok:!0,value:this.draftValue}:{ok:!1,message:u(`configForm.invalidNumber`)}}return{ok:!0,value:t}}catch{return r&&U(e,this.draftValue)?{ok:!0,value:this.draftValue}:{ok:!1,message:u(`configForm.invalidJson`)}}}commit(){let e=this.props;if(!e||e.disabled)return;let t=this.parseValue(e.schema);if(!t.ok){this.fail(`value`,t.message);return}if(!U(e.schema,t.value)){this.fail(`value`,[`number`,`integer`].includes(s(e.schema)??``)?u(`configForm.invalidNumber`):u(`configForm.invalidString`));return}if(e.existingValues?.some(e=>K(e,t.value))||e.validateValue?.(t.value)===!1){this.fail(`value`,u(`configForm.invalidString`));return}let n=this.draftKey.trim();if(e.existingKeys&&(!n||e.existingKeys.includes(n)||e.validateKey?.(n)===!1)){this.fail(`key`,u(`configForm.invalidString`));return}this.dispatchEvent(new CustomEvent(`config-collection-draft-commit`,{bubbles:!0,composed:!0,cancelable:!0,detail:{...e.existingKeys?{key:n}:{},value:t.value}}))?this.closeDraft():this.fail(`value`,u(`configForm.invalidString`))}updated(){let e=this.querySelector(`[data-collection-draft-key]`),t=this.querySelector(`[data-collection-draft-value]`);e?.setCustomValidity(this.invalidTarget===`key`?this.error:``),t?.setCustomValidity(this.invalidTarget===`value`?this.error:``)}render(){let e=this.props;if(!e||!this.draftOpen||e.disabled)return A;let t=s(e.schema),n=U(e.schema,null),r=t===`string`||t===`number`||t===`integer`,i=`${this.id}-error`,a=`${u(`configForm.add`)}: ${e.label}`,o=r?T`
          <input
            data-collection-draft-value
            type=${t===`string`?`text`:`number`}
            class="settings-input"
            aria-label=${a}
            aria-describedby=${i}
            aria-invalid=${this.invalidTarget===`value`?`true`:`false`}
            .value=${this.draftValue}
            ?disabled=${this.draftIsNull}
            @input=${e=>{this.draftValue=e.currentTarget.value,this.clearError()}}
          />
        `:T`
          <textarea
            data-collection-draft-value
            class="settings-input"
            aria-label=${a}
            aria-describedby=${i}
            aria-invalid=${this.invalidTarget===`value`?`true`:`false`}
            placeholder=${u(`configForm.jsonValue`)}
            rows="2"
            .value=${this.draftValue}
            ?disabled=${this.draftIsNull}
            @input=${e=>{this.draftValue=e.currentTarget.value,this.clearError()}}
          ></textarea>
        `;return T`
      <div class="settings-row settings-row--stacked cfg-collection-draft">
        <div class="settings-row__control">
          <div class="cfg-collection-draft__controls">
            ${e.existingKeys?T`
                    <input
                      data-collection-draft-key
                      type="text"
                      class="settings-input"
                      aria-label=${u(`configForm.key`)}
                      aria-describedby=${i}
                      aria-invalid=${this.invalidTarget===`key`?`true`:`false`}
                      placeholder=${u(`configForm.key`)}
                      .value=${this.draftKey}
                      @input=${e=>{this.draftKey=e.currentTarget.value,this.clearError()}}
                    />
                  `:A}
            ${n?T`
                    <label class="field checkbox">
                      <input
                        data-collection-draft-null
                        type="checkbox"
                        .checked=${this.draftIsNull}
                        @change=${e=>{this.draftIsNull=e.currentTarget.checked,this.clearError()}}
                      />
                      <span>${u(`configForm.nullValue`)}</span>
                    </label>
                  `:A}
            ${o}
            <span id=${i} class="cfg-field__error" role="alert" ?hidden=${!this.error}
              >${this.error}</span
            >
            <div class="cfg-collection-draft__actions">
              <button type="button" class="btn btn--sm" @click=${()=>this.commit()}>
                ${e.existingKeys?u(`configForm.addEntry`):u(`configForm.add`)}
              </button>
              <button type="button" class="btn btn--sm" @click=${()=>this.closeDraft()}>
                ${u(`common.cancel`)}
              </button>
            </div>
          </div>
        </div>
      </div>
    `}},r([F({attribute:!1})],X.prototype,`props`,void 0),r([M()],X.prototype,`draftOpen`,void 0),r([M()],X.prototype,`draftKey`,void 0),r([M()],X.prototype,`draftValue`,void 0),r([M()],X.prototype,`draftIsNull`,void 0),r([M()],X.prototype,`error`,void 0),r([M()],X.prototype,`invalidTarget`,void 0),customElements.get(`openclaw-config-form-collection-draft`)||customElements.define(`openclaw-config-form-collection-draft`,X)})))()}function gt(e,t){let{schema:n,value:r,path:i,hints:a,rawAvailable:o,maskSensitive:s,unsupported:c,disabled:d,reservedKeys:f,validateKey:p,onPatch:m,searchCriteria:h,revealSensitive:g,isSensitivePathRevealed:_,onToggleSensitivePath:v}=e,y=e.showLabel!==!1||f.size>0,x=Fe(n),S=x?{}:be(n),C=H(i,`map-draft`),w={schema:n,label:u(`configForm.customEntries`),disabled:d,identity:JSON.stringify(i.filter(e=>typeof e==`string`)),sourceIdentity:e.sourceIdentity??r,existingKeys:[...new Set([...Object.keys(r),...f])],validateKey:p},E=Object.entries(r??{}).filter(([e])=>!f.has(e)),D=h&&ve(h)?E.filter(([e,t])=>fe({schema:n,value:t,path:[...i,e],hints:a,criteria:h})):E;return h&&ve(h)&&D.length===0?A:T`
    <div class="cfg-block cfg-map">
      <div class="settings-row">
        ${y?T`<div class="settings-row__text">
                <span class="settings-row__title">${u(`configForm.customEntries`)}</span>
              </div>`:A}
        <div class="settings-row__control">
          <button
            type="button"
            class="btn btn--sm"
            aria-controls=${C}
            ?disabled=${d}
            @click=${e=>{if(S===Ze){mt(e,C);return}let t={...r},n=1,a=`custom-${n}`;for(;a in t;)n+=1,a=`custom-${n}`;t[a]=S,m(i,t)===!1&&mt(e,C)}}
          >
            ${u(`configForm.addEntry`)}
          </button>
        </div>
      </div>

      <openclaw-config-form-collection-draft
        id=${C}
        .props=${w}
        @config-collection-draft-commit=${e=>{let t=e.detail.key;(!t||Object.hasOwn(r,t)||f.has(t)||m(i,{...r,[t]:e.detail.value})===!1)&&e.preventDefault()}}
      ></openclaw-config-form-collection-draft>
      ${D.length===0?A:T`
              <div class="settings-subrows">
                ${D.map(([f,y])=>{let S=[...i,f],C=Ke({path:S,value:y,hints:a,revealSensitive:g??!1,isSensitivePathRevealed:_});return T`
                    <div class="settings-row">
                      <div class="settings-row__text">
                        <input
                          type="text"
                          class="settings-input"
                          placeholder=${u(`configForm.key`)}
                          aria-label=${`${u(`configForm.key`)}: ${f}`}
                          .value=${f}
                          ?disabled=${d}
                          @change=${e=>{let t=e.currentTarget;if(!(t instanceof HTMLInputElement))return;let n=t.value.trim();if(!n||n===f){t.value=f;return}let a=p(n)?l(r[f])?u(`configForm.renameRedactedBlocked`):``:u(`configForm.invalidString`);if(n in r||a){t.value=f,a&&(t.setCustomValidity(a),t.reportValidity(),t.setCustomValidity(``));return}let o={...r,[n]:r[f]};delete o[f],m(i,o)===!1&&(t.value=f)}}
                        />
                      </div>
                      <div class="settings-row__control">
                        <openclaw-tooltip .content=${u(`configForm.removeEntry`)}>
                          <button
                            type="button"
                            class="btn btn--icon"
                            style="width:28px;height:28px;padding:0;"
                            aria-label=${u(`configForm.removeEntry`)}
                            ?disabled=${d}
                            @click=${()=>{let e={...r};delete e[f],m(i,e)}}
                          >
                            ${b.trash}
                          </button>
                        </openclaw-tooltip>
                      </div>
                    </div>
                    ${x?q({label:f,showLabel:!1,stacked:!0,control:Ye({schema:n,path:S,ariaLabel:`${f}: ${u(`configForm.jsonValue`)}`,sourceValue:y,fallback:qe(y),rows:2,sensitiveState:C,disabled:d,isRequired:!0,onToggleSensitivePath:v,onPatch:m})}):t({schema:n,value:y,path:S,hints:a,rawAvailable:o,maskSensitive:s,unsupported:c,disabled:d,compact:e.compact,commitOnBlur:e.commitOnBlur,isRequired:!0,sourceIdentity:y,controlIdentity:r,searchCriteria:h,showLabel:!1,revealSensitive:g,isSensitivePathRevealed:_,onToggleSensitivePath:v,onPatch:m})}
                  `})}
              </div>
            `}
    </div>
  `}function _t(){return(_t=e((()=>{j(),S(),m(),v(),ht(),G(),He(),me(),W()})))()}function vt(e){let{schema:r,value:o,path:s,hints:l,unsupported:u,disabled:d,onPatch:f,onRemove:p,rawAvailable:m,maskSensitive:h,revealSensitive:g,isSensitivePathRevealed:_,onToggleSensitivePath:v,searchCriteria:y}=e,b=y&&ve(y)&&le({schema:r,path:s,hints:l,criteria:y})?void 0:y,x=o===void 0&&r.default!==void 0,S=x?r.default:o,C=S===void 0?Ct:S,w=n(S),T=Ee(r).map(e=>[e,Ae(r,e)]).filter(e=>!!e[1]),E=$e(r),D=T.toSorted((e,t)=>{let n=c([...s,e[0]],l)?.order??0,r=c([...s,t[0]],l)?.order??0;return n===r?e[0].localeCompare(t[0]):n-r}),O=new Set(T.map(([e])=>e)),k=Te(r),A=!!k&&typeof k==`object`,j=(e,n)=>{if(e.length<s.length||!s.every((t,n)=>t===e[n]))return!1;let o,c=e.slice(s.length);if(c.length===0){if(!t(n))return!1;o=n}else{try{o=structuredClone(w)}catch{return!1}n===void 0?i(o,c):a(o,c,n)}return Oe(r,w,o)?x?f(s,o)!==!1:(n===void 0&&p?p(e):f(e,n))!==!1:!1};return{fields:D.map(([t,n])=>({schema:x&&Object.hasOwn(w,t)?{...n,default:w[t]}:n,value:x?void 0:w[t],path:[...s,t],hints:l,rawAvailable:m,maskSensitive:h,unsupported:u,disabled:d,compact:e.compact,commitOnBlur:e.commitOnBlur,isRequired:E.has(t),sourceIdentity:x?void 0:w[t],controlIdentity:e.controlIdentity??w,searchCriteria:b,revealSensitive:g,isSensitivePathRevealed:_,onToggleSensitivePath:v,onPatch:j})),additional:A?{...e,schema:k,value:w,sourceIdentity:C,reservedKeys:O,validateKey:e=>De(r,e),searchCriteria:b,onPatch:j}:null}}function yt(e,t){let{schema:n,path:r,hints:i}=e,{label:a,help:o}=_e(r,n,i),s=vt(e),c=T`
    ${s.fields.map(e=>t(e))}
    ${s.additional?gt(s.additional,t):A}
  `;return r.length===1||e.showLabel===!1?c:T`
    <details class="cfg-object cfg-block" ?open=${r.length<=2}>
      <summary class="settings-row cfg-object__summary">
        <div class="settings-row__text">
          <span class="settings-row__title">${a}</span>
          ${o?T`<span class="settings-row__desc">${o}</span>`:A}
        </div>
        <div class="settings-row__control">
          <span class="settings-row__chevron cfg-object__chevron">${b.chevronRight}</span>
        </div>
      </summary>
      <div class="settings-subrows">${c}</div>
    </details>
  `}function bt(e,t){return T`${Tt(e,t)}`}function xt(e,t,n){let{schema:r,value:i,path:a,hints:o,unsupported:s,disabled:c,onPatch:l,searchCriteria:d,rawAvailable:f,maskSensitive:p,revealSensitive:m,isSensitivePathRevealed:h,onToggleSensitivePath:g}=e,_=e.showLabel??!0,v=e.showHeaderMeta??_,{label:y,help:x}=_e(a,r,o),S=d&&ve(d)&&le({schema:r,path:a,hints:o,criteria:d})?void 0:d,C=Array.isArray(r.items)?r.items:void 0,w=Array.isArray(r.items)?r.items[0]??{}:r.items;if(!w)return q({label:y,showLabel:!0,control:A,error:u(`configForm.unsupportedArray`)});let E=i===void 0&&Array.isArray(r.default),D=Array.isArray(i)?i:Array.isArray(r.default)?r.default:[],O=Array.isArray(i)?i:Array.isArray(r.default)?r.default:St,k=Le(e,D),j=n.read(D),M=(e,t)=>n.patch(e,t,e=>l(a,e)),{minItems:N,maxItems:P,uniqueItems:F}=Ce(r),I=e=>ue(r,e)??(C?{}:w),{atomicCandidate:L,autoCandidate:R}=ut({schema:r,value:D,minimumItems:N,maximumItems:P,uniqueItems:F,isUnset:i===void 0,isRequired:e.isRequired??!1,itemSchemaAt:I}),z=P===void 0||D.length<P,te=L===void 0&&R===void 0,B=I(D.length),V=H(a,`array-draft`),ne={schema:B,label:y,disabled:c||!z,identity:JSON.stringify(a.filter(e=>typeof e==`string`)),sourceIdentity:O,existingValues:F?D:void 0,validateValue:e=>{let t=[...D,e];return(P===void 0||t.length<=P)&&(t.length<N||U(r,t))}},ie=(e,t)=>{if(e.length<=a.length||!a.every((t,n)=>t===e[n]))return!1;let n=e.slice(a.length),i=n[0];if(typeof i!=`number`||i<0||i>=D.length)return!1;let o=[...D],s=n.slice(1);if(s.length===0){if(t===void 0)return!1;o[i]=t}else{let e=at(D[i],s,t);if(!e.ok)return!1;o[i]=e.value}return Se(r,D,o,F,!0)?M(o,j):!1};return T`
    <div class="cfg-block cfg-array">
      <div class="settings-row">
        <div class="settings-row__text">
          ${_?T`<span class="settings-row__title">${y}</span>`:A}
          ${v&&x?T`<span class="settings-row__desc">${x}</span>`:A}
          ${v&&k!==A?T`<span class="settings-row__desc">${k}</span>`:A}
        </div>
        <div class="settings-row__control">
          ${e.compact?A:T`
                  <span class="settings-row__value"
                    >${u(D.length===1?`configForm.itemCountOne`:`configForm.itemCount`,{count:String(D.length)})}</span
                  >
                `}
          <button
            type="button"
            class=${e.compact?`btn btn--sm btn--icon`:`btn btn--sm`}
            aria-label=${u(`configForm.add`)}
            aria-controls=${V}
            ?disabled=${c||!z&&L===void 0}
            @click=${e=>{if(L)l(a,L)===!1&&mt(e,V);else if(te)mt(e,V);else if(R){let t=Array.from({length:R.length-D.length},()=>Symbol(`array-row`));M(R,[...j,...t])||mt(e,V)}}}
          >
            ${e.compact?b.plus:u(`configForm.add`)}
          </button>
        </div>
      </div>
      <openclaw-config-form-collection-draft
        id=${V}
        .props=${ne}
        @config-collection-draft-commit=${e=>{let t=[...D,e.detail.value],n=!(F&&D.some(t=>K(t,e.detail.value)))&&(P===void 0||D.length<P)&&U(B,e.detail.value)&&(t.length<N||U(r,t)),i=!1;n&&(i=M(t,[...j,Symbol(`array-row`)])),i||e.preventDefault()}}
      ></openclaw-config-form-collection-draft>
      ${D.length===0?e.compact?A:re(u(`configForm.noItems`)):T`
              <div class="settings-subrows">
                ${ee(D,(e,t)=>j[t],(n,i)=>{let l=I(i),d=D.toSpliced(i,1),_=Se(r,D,d,F,!1),v=T` <openclaw-tooltip
                      .content=${u(`configForm.removeItem`)}
                    >
                      <button
                        type="button"
                        class="btn btn--icon"
                        style="width:28px;height:28px;padding:0;"
                        aria-label=${u(`configForm.removeItem`)}
                        ?disabled=${c||D.length<=N||!_}
                        @click=${e=>{let t=e.currentTarget===document.activeElement,n=document.activeElement?.closest(`.cfg-array`)?.querySelector(`button[aria-controls]`);_&&M(d,j.toSpliced(i,1))&&t&&queueMicrotask(()=>{document.activeElement===document.body&&n?.focus()})}}
                      >
                        ${b.trash}
                      </button>
                    </openclaw-tooltip>`,y=t({schema:E?{...l,default:n}:l,value:E?void 0:n,path:[...a,i],hints:o,rawAvailable:f,maskSensitive:p,unsupported:s,disabled:c,compact:e.compact,commitOnBlur:e.commitOnBlur,isRequired:!0,sourceIdentity:E?void 0:n,controlIdentity:D,searchCriteria:S,showLabel:!1,revealSensitive:m,isSensitivePathRevealed:h,onToggleSensitivePath:g,onPatch:ie});return e.compact?T`<div class="cfg-array__item">
                        <div class="cfg-array__value">${y}</div>
                        ${v}
                      </div>`:T`
                      <div class="settings-row">
                        <div class="settings-row__text">
                          <span class="settings-row__title">#${i+1}</span>
                        </div>
                        <div class="settings-row__control">${v}</div>
                      </div>
                      ${y}
                    `})}
              </div>
            `}
    </div>
  `}var St,Ct,wt,Tt;function Et(){return(Et=e((()=>{j(),E(),P(),S(),m(),v(),dt(),pt(),ht(),de(),G(),_t(),He(),me(),W(),B(),St=Symbol(`unset-array-source`),Ct=Symbol(`unset-map-source`),wt=class extends I{constructor(...e){super(...e),this.rows=new ft,this.field=``}render(e,t){let n=JSON.stringify(e.path.filter(e=>typeof e==`string`));return n!==this.field&&(this.rows=new ft,this.field=n),xt(e,t,this.rows)}},Tt=k(wt)})))()}function Dt(e){let{schema:t,value:n,path:r,hints:i,disabled:a,onPatch:o}=e,s=Ue(e),c=qe(n===void 0?t.default:n),l=Ke({path:r,value:n,hints:i,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed}),u=Ye({schema:t,path:r,ariaLabel:s.label,descriptionId:s.helpId,sourceValue:e.sourceIdentity??n,fallback:c,rows:3,sensitiveState:l,disabled:a,isRequired:e.isRequired,onToggleSensitivePath:e.onToggleSensitivePath,onPatch:o});return q({...s,defaultDescription:l.isRedacted?A:Re(t,n),stacked:!0,control:u})}function Ot(){return(Ot=e((()=>{j(),He()})))()}function kt(e,t){let n=e.trim();if(n.startsWith(`+`))try{let e=tt(n,{extract:!1});if(!e?.isPossible())return;let r=e.formatInternational();return!e.country||At.has(e.countryCallingCode)?r:`${new Intl.DisplayNames(t?[t]:void 0,{type:`region`}).of(e.country)||e.country} · ${r}`}catch{return}}var At;function jt(){return(jt=e((()=>{rt(),nt(),At=new Set(Object.entries(et.country_calling_codes).filter(([,e])=>e.length>1).map(([e])=>e))})))()}function Mt(e,t,n,r){let i=e.trim(),a=t.anyOf??t.oneOf??[],o=U(t,e),c=r?r.branch:Ie(n),l=i===`true`||i!==`false`&&void 0;if(l!==void 0&&U(t,l)){let e=!1,t=!1;for(let n of a)(s(n)===`boolean`||typeof n.const==`boolean`||n.enum?.some(e=>typeof e==`boolean`))&&U(n,l)&&(e=!0,t||=Object.is(n.const,l)||!!n.enum?.some(e=>Object.is(e,l)));if(e&&(c!==`string`||t||!o))return l}let u;for(let n of a){let r=s(n);if(r!==`number`&&r!==`integer`)continue;let i=w(e,r===`integer`);if(typeof i==`number`&&U(t,i)){u=i;break}}if(c===`number`){if(u!==void 0)return u;if(C(e))return o&&y(i)?e:void 0}return c===`string`&&o?e:u??e}function Nt(e,t){return U(t,e)?``:u(`configForm.invalidNumber`)}function Z(e,{schema:t,isRequired:n}){let r=e.value;if(r.trim()===``)return{message:e.validity.badInput||n===!0?u(`configForm.invalidNumber`):``};let i=w(r,s(t)===`integer`);return typeof i==`number`?{parsed:i,message:Nt(i,t)}:{message:u(`configForm.invalidNumber`)}}function Pt(e,t,n){Y(e,t.message)&&n(t.parsed)}function Ft(e){let{schema:n,value:r,path:i,hints:a,disabled:o,onPatch:s,inputType:l}=e,d=c(i,a),p=Ue(e),{label:m,helpId:h}=p,g=H(i,`scalar-error`),_=Ke(e),v=We(r),y=e.rawAvailable??!0,b=_.isMasked,x=_.isRedacted&&!b||_.sentinelRedacted||v,S=x?v?u(y?`configForm.structuredSecretRaw`:`configForm.structuredSecretFile`):b?`••••••••`:Ne():d?.placeholder??(!b&&n.default!==void 0?u(`configForm.defaultValue`,{value:J(n.default)}):``),C=x?``:t(r)?qe(r):r??(e.compact?n.default:void 0)??``,w=r===void 0?n.default:r,E=Ie(w),O=b?`password`:_.isSensitive&&!x?`text`:l,k=d?.presentation===`phone-number`,j=k&&!x&&!b&&typeof r==`string`?kt(r,f.getLocale()):void 0,ee=e.controlIdentity??e.sourceIdentity??r,M=e.sourceIdentity??r,N=H(i.filter(e=>typeof e==`string`),`scalar-identity`),P=J(C),F=[x?`redacted`:`visible`,O,k?`phone`:`plain`,v?y?`secret-raw`:`secret-file`:`scalar`].join(`:`),I=(t,r)=>{let i=Mt(t,n,w,r),a=U(n,i),o=t===``&&!e.isRequired&&!a;return{candidate:o?void 0:i,message:a||o?``:u(`configForm.invalidString`)}},L=t=>{if(x){Y(t,``);return}if(l===`number`){Y(t,Z(t,e).message);return}Y(t,I(t.value,Qe(t,E)).message)},R=r,z=(e,t)=>s(i,t)===!1?(e.value=P,L(e),!1):(R=t,!0),te=t=>{if(x)return;let n=e=>K(R,e)||z(t,e);if(l===`number`){Pt(t,Z(t,e),n);return}let r=Be(t,E),i=t.value,a=I(i,r);if(!a.message&&!k){Y(t,``),n(a.candidate),Pe(t);return}let o=i.trim(),s=I(o,r);if(s.message){Y(t,a.message),Pe(t);return}t.value=o,Y(t,``),n(s.candidate),Pe(t)},B=T`
    <input
      ${D(e=>{je(e,N,F),xe(e,ee,M,N,F,P,L)})}
      type=${O}
      class="settings-input${x?` cfg-redacted`:``}"
      aria-label=${m}
      aria-describedby=${[h,g].filter(Boolean).join(` `)}
      aria-invalid="false"
      placeholder=${S}
      .value=${P}
      ?disabled=${o}
      ?readonly=${x}
      @click=${()=>{_.isRedacted&&!v&&e.onToggleSensitivePath&&e.onToggleSensitivePath(i)}}
      @input=${t=>{if(x)return;let n=t.target;if(e.commitOnBlur){Be(n,E),L(n);return}if(l===`number`){Pt(n,Z(n,e),e=>z(n,e));return}let r=I(n.value,Be(n,E));Y(n,r.message)&&z(n,r.candidate)}}
      @change=${t=>{!e.commitOnBlur&&l!==`number`&&te(t.target)}}
      @blur=${t=>{let n=t.target;e.commitOnBlur&&n.value!==P&&te(n),Pe(n)}}
    />
  `,V=v?A:Ge({path:i,state:_,disabled:o,onToggleSensitivePath:e.onToggleSensitivePath}),ne=Ve(B,V),re=k?T`
        <span class="settings-phone-presentation">
          ${ne}
          ${j?T`<span class="settings-phone-presentation__value">${j}</span>`:A}
        </span>
      `:ne;return q({...p,defaultDescription:x||b?A:Re(n,r),control:re,errorId:g})}function It(e){let{schema:t,value:n,path:r,hints:i,disabled:a,onPatch:o}=e,s=Ue(e),{label:l,helpId:d}=s,f=H(r,`scalar-error`),p=n??(e.compact?t.default:void 0)??``,m=n===void 0?t.default:n,h=we(t),g=typeof h.step==`number`?h.step:1,_=e.controlIdentity??e.sourceIdentity??n,v=e.sourceIdentity??n,y=H(r.filter(e=>typeof e==`string`),`scalar-identity`),b=J(p),x=t=>{Y(t,Z(t,e).message)},S=n,C=(e,t)=>o(r,t)===!1?(e.value=b,x(e),!1):(S=t,!0),w=e=>{if(a)return;let n=Number(m),i=ke((Number.isFinite(n)?n:0)+e*g,t);U(t,i)&&o(r,i)},E=t=>e.compact?A:T` <button
          type="button"
          class="btn btn--sm btn--icon"
          aria-label=${`${l}: ${t<0?`-`:`+`}${g}`}
          ?disabled=${a}
          @click=${()=>w(t)}
        >
          ${t<0?`−`:`+`}
        </button>`,O=T`
    ${E(-1)}
    <input
      ${D(e=>xe(e,_,v,y,`number`,b,x))}
      type="number"
      class="settings-input"
      aria-label=${l}
      aria-describedby=${[d,f].filter(Boolean).join(` `)}
      aria-invalid="false"
      placeholder=${c(r,i)?.placeholder??(t.default===void 0?A:u(`configForm.defaultValue`,{value:J(t.default)}))}
      min=${h.min??A}
      max=${h.max??A}
      step=${h.step}
      .value=${b}
      ?disabled=${a}
      @keydown=${t=>{!e.compact&&n===void 0&&m!==void 0&&(t.key===`ArrowUp`||t.key===`ArrowDown`)&&(t.preventDefault(),w(t.key===`ArrowUp`?1:-1))}}
      @input=${t=>{let n=t.target;if(e.commitOnBlur){x(n);return}Pt(n,Z(n,e),e=>C(n,e))}}
      @change=${n=>{if(e.commitOnBlur)return;let r=n.target,i=Z(r,e);if(i.parsed===void 0){Y(r,i.message);return}let a=ke(i.parsed,t);r.value=J(a),Y(r,Nt(a,t))&&!K(S,a)&&C(r,a)}}
      @blur=${n=>{let r=n.target;if(!e.commitOnBlur||r.value===b)return;let i=Z(r,e);i.parsed!==void 0&&(i.parsed=ke(i.parsed,t),i.message=Nt(i.parsed,t),r.value=J(i.parsed)),Pt(r,i,e=>{K(S,e)||C(r,e)})}}
    />
    ${E(1)}
  `;return q({...s,defaultDescription:Re(t,n),control:O,errorId:f})}function Lt(e){let{schema:t,value:n,path:r,hints:i,disabled:a,options:o,onPatch:s}=e,l=Ue(e),{label:d,helpId:f}=l,p=n===void 0&&t.default!==void 0,m=p?t.default:n,h=o.findIndex(e=>K(e,m)),g=`__unset__`,_=`__null__`,v=t.nullable&&t.enumIncludesNull,y=p?g:m===null&&v?_:h>=0?String(h):g,b=T`
    <select
      class="settings-select"
      aria-label=${d}
      aria-describedby=${f??A}
      ?disabled=${a}
      .value=${y}
      @change=${n=>{let i=n.target,a=i.value;if(a===g&&e.isRequired&&t.default===void 0){i.value=y;return}(a===g?e.isRequired&&t.default!==void 0?s(r,structuredClone(t.default)):e.onRemove?e.onRemove(r):s(r,void 0):s(r,a===_?null:o[Number(a)]))===!1&&(i.value=y)}}
    >
      <option
        value=${g}
        ?selected=${y===g}
        ?disabled=${e.isRequired&&t.default===void 0}
      >
        ${t.default===void 0?c(r,i)?.placeholder??u(`configForm.select`):u(`configForm.defaultValue`,{value:J(t.default)})}
      </option>
      ${v?T`
              <option value=${_} ?selected=${y===_}>
                ${u(`configForm.nullValue`)}
              </option>
            `:A}
      ${o.map((e,t)=>T`
          <option value=${String(t)} ?selected=${y===String(t)}>
            ${Je(e,o)}
          </option>
        `)}
    </select>
  `;return q({...l,defaultDescription:Re(t,n),control:b})}function Rt(){return(Rt=e((()=>{jt(),j(),O(),m(),G(),He(),x(),Xe(),W()})))()}function Q(e){let{schema:t,value:n,path:r,hints:i,unsupported:a,disabled:l,onPatch:d}=e,f=e.showLabel??!0,p=s(t),{label:m,help:h}=_e(r,t,i),g=o(r),_=e.searchCriteria;if(a.has(g)||[...a].some(e=>{if(!e.includes(`*`))return!1;let t=e.split(`.`);return t.length===r.length&&t.every((e,t)=>e===`*`||e===String(r[t]))}))return q({label:m,showLabel:!0,control:A,error:u(`configForm.unsupportedNode`)});if(_&&ve(_)&&!fe({schema:t,value:n,path:r,hints:i,criteria:_}))return A;let v=ot(e);if(v!==void 0){let t={identity:JSON.stringify(r.filter(e=>typeof e==`string`)),sourceIdentity:e.sourceIdentity??n,initialValue:v,params:e,renderNode:Q};return T`
      <openclaw-config-form-structured-draft
        class="cfg-structured-draft"
        .props=${t}
      ></openclaw-config-form-structured-draft>
    `}let y=(i,a=!1)=>i.length>5||a?Lt({...e,options:i}):q({label:m,help:h,defaultDescription:Re(t,n),showLabel:f,control:ze({options:i,resolvedValue:n===void 0?t.default:n,disabled:l,ariaLabel:m,descriptionId:e.descriptionId,onSelect:e=>d(r,e)})});if(t.anyOf||t.oneOf){let r=(t.anyOf??t.oneOf??[]).filter(e=>!(e.type===`null`||Array.isArray(e.type)&&e.type.includes(`null`)));if(r.length===1){let t=r[0];return t?Q({...e,schema:t}):A}let i=r.map(e=>e.const===void 0?e.enum?.length===1?e.enum[0]:void 0:e.const);if(i.every(e=>e!==void 0)&&i.length>0)return y(i);let a=new Set(r.flatMap(e=>{let t=s(e);return t?[t===`integer`?`number`:t]:[]}));if(e.maskSensitive===!0&&Array.isArray(t.type)&&a.size===2&&a.has(`string`)&&a.has(`object`)&&(n===void 0||typeof n==`string`||We(n)))return Ft({...e,inputType:`text`});if([...a].every(e=>[`string`,`number`,`boolean`].includes(e))){let n=a.has(`string`),r=a.has(`number`);if(a.has(`boolean`)&&a.size===1)return Q({...e,schema:{...t,type:`boolean`,anyOf:void 0,oneOf:void 0}});if(n||r)return Ft({...e,inputType:r&&!n?`number`:`text`})}return Dt(e)}if(t.enum)return y(t.enum,t.nullable&&t.enumIncludesNull);if(p===`object`)return yt(e,Q);if(p===`array`)return bt(e,Q);if(p===`boolean`){if(!e.isRequired&&c(r,i)?.placeholder)return Lt({...e,options:[!0,!1]});let a=typeof n==`boolean`?n:typeof t.default==`boolean`&&t.default,o=e=>d(r,e);if(e.compact)return q({label:m,help:h,showLabel:f,control:T`<input
          type="checkbox"
          aria-label=${m}
          aria-describedby=${e.descriptionId??A}
          .checked=${a}
          ?disabled=${l}
          @change=${e=>{let t=e.currentTarget;o(t.checked)===!1&&(t.checked=a)}}
        />`});if(!f)return q({label:m,help:h,showLabel:f,control:te({checked:a,disabled:l,ariaLabel:m,onChange:o})});let s=h||t.default!==void 0?T`
            ${h??A} ${h&&t.default!==void 0?T`<br />`:A}
            ${Re(t,n)}
          `:void 0;return z({title:m,description:s,checked:a,disabled:l,onChange:o})}return p===`number`||p===`integer`?It(e):p===`string`?Ft({...e,inputType:`text`}):Fe(t)?Dt(e):q({label:m,showLabel:!0,control:A,error:u(`configForm.unsupportedType`,{type:String(p)})})}function zt(){return(zt=e((()=>{j(),m(),ct(),Et(),Ot(),Rt(),He(),me(),W(),B()})))()}function Bt(e){let t=oe({schema:e.schema,path:e.path.map(String),hints:e.hints});return T`
    <div class="config-tier-groups">
      ${t.common||e.commonPrelude?T`<div class="settings-group">
              ${e.commonPrelude??A}${t.common?e.renderTier(t.common):A}
            </div>`:A}
      ${t.advanced?T`<details
              class="config-advanced-disclosure"
              ?open=${e.revealAdvanced}
              @toggle=${t=>{let n=t.currentTarget;n instanceof HTMLDetailsElement&&n.open!==e.revealAdvanced&&(n.open?e.onShowAdvanced():e.onHideAdvanced?e.onHideAdvanced():n.open=!0)}}
            >
              <summary class="settings-section__heading config-advanced-disclosure__summary">
                ${u(`configForm.advancedSettings`)}
              </summary>
              ${e.revealAdvanced?T`<div class="settings-group">${e.renderTier(t.advanced)}</div>`:A}
            </details>`:A}
    </div>
  `}function Vt(e){if(!e.schema)return T` <div class="muted">${u(`configForm.schemaUnavailable`)}</div> `;let t=e.schema,n=e.value??{};if(s(t)!==`object`||!t.properties)return T` <div class="callout danger">${u(`configForm.unsupportedSchema`)}</div> `;let r=new Set(e.unsupportedPaths??[]),i=t.properties,a=e.searchQuery??``,o=he(a),l=e.activeSection,d=e.activeSubsection??null,f=Object.entries(i).toSorted((t,n)=>{let r=c([t[0]],e.uiHints)?.order??50,i=c([n[0]],e.uiHints)?.order??50;return r===i?t[0].localeCompare(n[0]):r-i}).filter(([t,r])=>!(l&&t!==l||a&&!ge({key:t,schema:r,value:n[t],hints:e.uiHints,query:a,label:se[t]?.label,description:se[t]?.description}))),p=null;if(l&&d&&f.length===1){let e=f[0]?.[1];e&&s(e)===`object`&&e.properties&&e.properties[d]&&(p={sectionKey:l,subsectionKey:d,schema:e.properties[d]})}if(f.length===0)return e.embedded&&!a?A:R(re(a?u(`configForm.noSettingsMatch`,{query:a}):u(`configForm.noSettingsInSection`)));let m=t=>{let n=c(t.path.slice(0,1),e.uiHints),i=e.showSectionDocs===!1?void 0:n?.docsUrl,s=`settings-section-help-${t.id}`,l=e.showAdvanced===!0||e.forceAdvancedSection===t.path[0]||!!a;return T`
      <section class="settings-section" id=${t.id}>
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${t.label}</h2>
          ${e.sectionActions||i?T`<div class="settings-section__actions">
                  ${e.sectionActions??A}
                  ${i?T`
                          <span class="settings-section__docs">
                            ${L({id:s,label:u(`configForm.sectionHelp`,{section:t.label}),tooltip:u(`configForm.sectionHelp`,{section:t.label}),icon:`question`,popoverId:`settings-section-help-popover-${t.id}`})}
                            <wa-popover
                              ${D(V)}
                              id=${`settings-section-help-popover-${t.id}`}
                              class="settings-section__help-popover"
                              for=${s}
                              placement="bottom-end"
                            >
                              <div class="settings-section__help-panel">
                                ${t.description?T`<p>${t.description}</p>`:A}
                                ${ie(i)}
                              </div>
                            </wa-popover>
                          </span>
                        `:A}
                </div>`:A}
        </div>
        ${t.description?T`<p class="settings-section__desc">${t.description}</p>`:A}
        ${Bt({schema:t.node,path:t.path,hints:e.uiHints,revealAdvanced:l,onShowAdvanced:e.onShowAdvanced,onHideAdvanced:e.showAdvanced===!0&&e.forceAdvancedSection!==t.path[0]&&!a?e.onHideAdvanced:void 0,renderTier:n=>Q({schema:n,value:t.nodeValue,path:t.path,hints:e.uiHints,rawAvailable:e.rawAvailable??!0,unsupported:r,disabled:e.disabled??!1,showLabel:!1,showHeaderMeta:!0,searchCriteria:o,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed,onToggleSensitivePath:e.onToggleSensitivePath,onPatch:e.onPatch,onRemove:e.onRemove}),commonPrelude:e.sectionPrelude})}
      </section>
    `};return R(p?(()=>{let{sectionKey:t,subsectionKey:r,schema:i}=p,a=_([t,r],e.uiHints),o=a?.label??i.title??h(r),s=a?.help??i.description??``,c=n[t],l=c&&typeof c==`object`?c[r]:void 0;return m({id:`config-section-${t}-${r}`,label:o,description:s,node:i,nodeValue:l,path:[t,r]})})():f.map(([e,t])=>{let r=se[e]??{label:e.charAt(0).toUpperCase()+e.slice(1),description:t.description??``};return m({id:`config-section-${e}`,label:r.label,description:r.description,node:t,nodeValue:n[e],path:[e]})}))}function Ht(){return(Ht=e((()=>{j(),O(),m(),ae(),zt(),me(),W(),ce(),B(),ne()})))()}function Ut(e){return Object.keys(e??{}).every(e=>sn.has(e))}function Wt(e){let t=e.filter(e=>e!=null),n=t.length!==e.length;return{enumValues:Gt(t),nullable:n}}function Gt(e){let t=[];for(let n of e)t.some(e=>Object.is(e,n))||t.push(n);return t}function Kt(e,t=new Set){if(t.has(e))return new Set;t.add(e);let n=new Set,r=Array.isArray(e.type)?e.type:e.type?[e.type]:[];for(let e of r)e!==`null`&&n.add(e);n.size===0&&(e.properties||e.additionalProperties)&&n.add(`object`);for(let r of e.allOf??[])for(let e of Kt(r,t))n.add(e);return t.delete(e),n}function qt(e){if(e.size===1)return e.values().next().value;if(e.size>1&&[...e].every(e=>e===`number`||e===`integer`))return e.has(`integer`)?`integer`:`number`}function Jt(e){return e.size>1&&qt(e)===void 0}function Yt(e){return qt(Kt(e))}function Xt(e){return!!(Yt(e)||e.items||e.enum||e.anyOf||e.oneOf||e.allOf)}function Zt(e){if(!Qt(e,ln))return!1;if(e.not===void 0)return!0;if(Yt(e)!==`object`||!t(e.not))return!1;let n=e.not.required;return Array.isArray(n)&&n.length>0&&n.every(e=>typeof e==`string`)&&Object.keys(e.not).every(e=>e===`required`||sn.has(e))}function Qt(e,n){return Object.keys(e).every(r=>n.has(r)||r===`propertyNames`&&t(e.propertyNames)&&g(e.propertyNames)&&$({type:`string`,...e.propertyNames},[]).unsupportedPaths.length===0)}function $t(e,t=new Set){if(t.has(e))return!1;t.add(e);let n=Array.isArray(e.type)?e.type:e.type?[e.type]:[],r=e.nullable===!0||n.length===0||n.includes(`null`);return e.const!==void 0&&(r&&=e.const===null),e.enum&&(r&&=e.enum.some(e=>e===null)),e.allOf&&(r&&=e.allOf.every(e=>$t(e,t))),e.anyOf&&(r&&=e.anyOf.some(e=>$t(e,t))),e.oneOf&&(r&&=e.oneOf.filter(e=>$t(e,t)).length===1),t.delete(e),r}function en(e){let t=ye(e);if(t.length<=1)return!1;let n=new Set(t.flatMap(e=>Object.keys(e.properties??{})));return t.some(e=>{let t=e.additionalProperties;return!!t&&typeof t==`object`&&Object.keys(t).length>0&&[...n].some(t=>!Object.hasOwn(e.properties??{},t))})}function tn(e){return!e||typeof e!=`object`?{schema:null,unsupportedPaths:[`<root>`]}:$(e,[])}function $(e,t,n=!1,r,i){let a=e;if(!n&&!e.anyOf&&!e.oneOf&&!e.allOf&&Array.isArray(e.type)&&new Set(e.type.filter(e=>e!==`null`)).size>1&&(e.type.every(e=>e===`null`||un.has(e))||e.type.every(e=>[`string`,`object`,`null`].includes(e)))){let t=e.type.includes(`object`)?[`string`,...e.type.filter(e=>e!==`string`)]:e.type;a={...e,type:t.includes(`object`)?t:void 0,anyOf:t.map(e=>({type:e}))}}let s=new Set,c={...a},l=o(t)||`<root>`;if(Zt(a)||s.add(l),a.anyOf||a.oneOf){let e=on(a,t);return e?{schema:e.schema,unsupportedPaths:Array.from(new Set([...s,...e.unsupportedPaths]))}:{schema:a,unsupportedPaths:[l]}}let u=Array.isArray(a.type)?a.type.filter(e=>e!==`null`):[],d=Kt(a),f=n&&!!r&&a.type===void 0&&d.size===0;f&&r&&d.add(r),n&&r&&d.size>0&&Jt(new Set([...d,r]))&&s.add(l),(new Set(u).size>1||Jt(d))&&s.add(l);let p=qt(d),m=$t(a)&&(i===void 0||i);if(a.allOf){let e=[];for(let n of a.allOf){if(!n||typeof n!=`object`){s.add(l);continue}if(!Xt(n)){e.push(n),Qt(n,cn)||s.add(l);continue}let r=$(n,t,!0,p,m);e.push(r.schema??n);for(let e of r.unsupportedPaths)s.add(e)}c.allOf=e}c.type=p??a.type,c.nullable=m;let h=a.properties!==void 0||a.additionalProperties!==void 0,g=a.items!==void 0||a.additionalItems!==void 0;if(c.enum){let{enumValues:e,nullable:t}=Wt(c.enum);c.enum=e,c.enumIncludesNull=t&&m,e.length===0&&s.add(l)}a.allOf&&m&&!c.enumIncludesNull&&s.add(l);let _=(e,t,r)=>{if(n&&r!==void 0&&!Xt(e))return Qt(e,cn)||s.add(r),e;let i=$(e,t,n);for(let e of i.unsupportedPaths)s.add(e);return i.schema};if(p===`object`&&(!f||h)){let e=a.properties??{},n=new Set(Ee(a)),r=Te(a);[...$e(a)].some(e=>!n.has(e))&&!r&&s.add(l),en(a)&&s.add(l);let i={};for(let[n,r]of Object.entries(e)){let e=[...t,n],a=_(r,e,o(e)||`<root>`);a!==null&&(i[n]=a)}if(c.properties=i,a.allOf)for(let e of Ee(a)){let n=Ae(a,e);if(!n)continue;let r=$(n,[...t,e]);for(let e of r.unsupportedPaths)s.add(e)}a.additionalProperties===!0?c.additionalProperties={}:a.additionalProperties===!1?c.additionalProperties=!1:a.additionalProperties&&typeof a.additionalProperties==`object`&&(Ut(a.additionalProperties)||(c.additionalProperties=_(a.additionalProperties,[...t,`*`])??a.additionalProperties))}else if(p===`array`&&(!f||g)){if(Array.isArray(a.items)){let e=[];for(let n=0;n<a.items.length;n+=1){let r=a.items[n];if(!r){s.add(l);continue}e.push(_(r,[...t,n],l)??r)}c.items=e,c.additionalItems=a.additionalItems&&typeof a.additionalItems==`object`?_(a.additionalItems,[...t,`*`],l)??a.additionalItems:a.additionalItems}else a.items?c.items=_(a.items,[...t,`*`],l)??a.items:s.add(l);if(a.allOf)for(let e of pe(a)){let n=ue(a,e);if(!n)continue;let r=$(n,[...t,e]);for(let e of r.unsupportedPaths)s.add(e)}}else(!f||p!==`object`&&p!==`array`)&&p!==`string`&&p!==`number`&&p!==`integer`&&p!==`boolean`&&!c.enum&&!(n&&a.allOf)&&s.add(l);return{schema:c,unsupportedPaths:Array.from(s)}}function nn(e){if(s(e)!==`object`)return!1;let t=e.properties?.source,n=e.properties?.provider,r=e.properties?.id;return!t||!n||!r?!1:typeof t.const==`string`&&s(n)===`string`&&s(r)===`string`}function rn(e){let t=e.oneOf??e.anyOf;return!!(t?.length&&t.every(nn))}function an(e){if(e.length!==2)return;let t=e.findIndex(e=>s(e)===`string`);if(!(t<0))return rn(e[1-t])?e[t]:void 0}function on(e,t){if(e.allOf)return null;let n=e.anyOf??e.oneOf;if(!n)return null;let r=[],i=[],a=!1;for(let e of n){if(!e||typeof e!=`object`)return null;if(Array.isArray(e.enum)){let{enumValues:t,nullable:n}=Wt(e.enum);r.push(...t),a||=n;continue}if(`const`in e){if(e.const==null){a=!0;continue}r.push(e.const);continue}if(s(e)===`null`){a=!0;continue}i.push(e)}a&&=$t(e);let o=an(i)??(r.length===0&&i.length===1?i[0]:void 0);if(o)return $({...e,...o,nullable:a||o.nullable,anyOf:void 0,oneOf:void 0,allOf:void 0},t);if(r.length>0&&i.length>0){let t=i.length===1?i[0]:void 0;if(t?.type!==`boolean`||Object.keys(t).length!==1||r.includes(`true`)||r.includes(`false`)||e.anyOf===void 0&&r.some(e=>typeof e==`boolean`))return i.every(e=>e.type===`string`)&&r.every(e=>typeof e==`string`||typeof e==`boolean`)&&!$t(e)?{schema:{...e,nullable:a},unsupportedPaths:[]}:null;i.pop(),r.unshift(!0,!1)}return r.length>0&&i.length===0?{schema:{...e,enum:Gt(r),nullable:a,enumIncludesNull:a,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}:i.length>0&&r.length===0&&i.every(e=>{let t=s(e);return!!t&&dn.has(String(t))})?{schema:{...e,nullable:a},unsupportedPaths:[]}:null}var sn,cn,ln,un,dn;function fn(){return(fn=e((()=>{de(),G(),W(),sn=new Set([`$id`,`$schema`,`title`,`description`,`default`,`deprecated`,`nullable`,`enumIncludesNull`,`examples`,`readOnly`,`tags`,`writeOnly`,`x-tags`]),cn=new Set([...sn,`const`,`required`,`additionalProperties`,`minimum`,`maximum`,`exclusiveMinimum`,`exclusiveMaximum`,`multipleOf`,`minLength`,`maxLength`,`pattern`,`format`,`minItems`,`maxItems`,`uniqueItems`]),ln=new Set([...cn,`type`,`properties`,`items`,`additionalItems`,`enum`,`anyOf`,`oneOf`,`allOf`,`not`]),un=new Set([`string`,`number`,`integer`,`boolean`]),dn=new Set([...un,`object`,`array`])})))()}function pn(){return(pn=e((()=>{Ht(),fn(),zt(),W()})))()}export{Vt as a,Q as c,Et as d,vt as f,ot as g,ct as h,Ht as i,kt as l,gt as m,tn as n,Bt as o,_t as p,fn as r,zt as s,pn as t,jt as u};