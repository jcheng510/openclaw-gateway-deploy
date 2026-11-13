import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Gl as t,hu as n,ql as r,uu as i}from"./control-ui-core-pYNj5S1a.js";import{nn as a,rn as o}from"./control-ui-core-D6clmJs8.js";import{$ as s,X as c,Y as l}from"./lit-runtime-DZL1fcCI.js";function u(e){return o({signal:e.signal,value:null},r=>{let{host:i,finish:a,render:o}=r,l=!1,u=null,d=t=>e.requireValue===!0?t.trim():t,f=t=>{let n=d(t);return e.requireValue===!0&&n.length===0||e.requireChange===!0&&n===(e.defaultValue??``)},p=f(e.defaultValue??``),m=()=>i.querySelector(`input[name="value"]`),h=e=>{let t=f(e.target.value);t!==p&&(p=t,y())};async function g(n){if(n.preventDefault(),l)return;let i=m()?.value;if(i===void 0||f(i))return;let o=d(i);if(!e.submit){a(o);return}l=!0,u=null,y();let s;try{s=await e.submit(o)}catch(e){s=t(e)}if(!r.settled){if(l=!1,s===null){a(o);return}u=s,y(),m()?.focus()}}function _(e){if(l){e.preventDefault();return}a(null)}let v=e.label??e.title;function y(){o(()=>s`
          <openclaw-modal-dialog
            label=${e.title}
            description=${v}
            @modal-cancel=${_}
          >
            <form class="exec-approval-card" @submit=${g}>
              <div class="exec-approval-header">
                <div class="exec-approval-title">${e.title}</div>
              </div>
              <label class="field input-dialog__field">
                <span>${v}</span>
                <input
                  name="value"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  .value=${e.defaultValue??``}
                  ?disabled=${l}
                  aria-invalid=${u?`true`:c}
                  @input=${h}
                  autofocus
                />
              </label>
              ${u?s`<div class="exec-approval-error" role="alert">${u}</div>`:c}
              <div class="exec-approval-actions">
                <button type="submit" class="btn primary" ?disabled=${l||p}>
                  ${e.submitLabel??n(`common.save`)}
                </button>
                <button
                  type="button"
                  class="btn"
                  ?disabled=${l}
                  @click=${()=>a(null)}
                >
                  ${e.cancelLabel??n(`common.cancel`)}
                </button>
              </div>
            </form>
          </openclaw-modal-dialog>
        `)}y()})}function d(e){return f?Promise.resolve(null):(f=!0,u(e).finally(()=>{f=!1}))}var f;function p(){return(p=e((()=>{l(),i(),r(),a(),f=!1})))()}export{d as n,p as t};