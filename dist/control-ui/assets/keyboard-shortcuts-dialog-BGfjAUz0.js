import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{Ar as n,Zl as r,cu as i,eu as a,hu as o,jr as s,lu as c,nu as l,uu as u}from"./control-ui-core-pYNj5S1a.js";import{Br as d,Ei as f,Ki as p,N as m,P as h,Ti as g,Wi as _,Xi as v,Zi as y}from"./control-ui-core-D6clmJs8.js";import{$ as b,X as x,Y as S,ct as C,mt as w,nt as T,ut as E}from"./lit-runtime-DZL1fcCI.js";import{l as D,u as O}from"./control-ui-boot-shared-3Hl8ksFq.js";var k;function A(){return(A=e((()=>{S(),T(),m(),u(),D(),a(),n(),c(),y(),g(),_(),d(),k=class extends i{constructor(...e){super(...e),this.sendShortcut=`enter`,this.open=!1,this.handleKeydown=async e=>{let t=e.currentTarget,n=document.openClawModalLayers;if(e.defaultPrevented||e.repeat||!this.open||!(t instanceof HTMLElement)||n?.size!==1||!n.has(t))return;let i=this.newSessionHost,a=i?.context,o=l(r.newSession,e)&&i&&!i.onboardingMode&&s(a?.gateway.snapshot,{method:`sessions.create`,params:{},sessionScope:!0}).allowed;(o||l(r.keyboardShortcuts,e))&&(e.preventDefault(),e.stopPropagation(),this.open=!1,await this.updateComplete,this.isConnected&&!this.open&&o&&i.isConnected&&i.context===a&&h(i,`shortcut`))}}static{this.styles=[f,w`
      :host {
        display: contents;
        --openclaw-modal-width: 560px;
      }

      .dialog {
        display: flex;
        max-height: min(720px, calc(100dvh - 64px));
        flex-direction: column;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: var(--card);
        color: var(--text);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 22px 16px;
        border-bottom: 1px solid var(--border);
      }

      h2 {
        margin: 0;
        color: var(--text-strong);
        font-size: 16px;
        font-weight: 600;
      }

      .close {
        display: grid;
        width: 28px;
        height: 28px;
        place-items: center;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--muted);
      }

      .close span {
        display: flex;
      }

      .close svg {
        width: 16px;
        height: 16px;
      }

      .close:hover {
        background: var(--bg-hover);
        color: var(--text);
      }

      .body {
        overflow: auto;
        padding: 8px 22px 18px;
      }

      section + section {
        margin-top: 12px;
        border-top: 1px solid var(--border);
      }

      h3 {
        margin: 18px 0 8px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .shortcut-row {
        display: flex;
        min-height: 34px;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        font-size: 13px;
      }

      .combos {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .combo {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      kbd {
        min-width: 22px;
        padding: 3px 6px;
        border: 1px solid var(--border-strong);
        border-radius: 5px;
        background: var(--bg-muted);
        color: var(--text);
        font: inherit;
        font-size: 12px;
        text-align: center;
      }
    `]}get isOpen(){return this.open}toggle(){this.open=!this.open}render(){if(!this.open)return x;let e=e=>{e.preventDefault(),this.open=!1};return b`
      <openclaw-modal-dialog
        label=${o(`shortcutsOverlay.title`)}
        @modal-cancel=${e}
        @keydown=${this.handleKeydown}
      >
        <div class="dialog">
          <header class="header">
            <h2>${o(`shortcutsOverlay.title`)}</h2>
            <button class="close" type="button" aria-label=${o(`common.close`)} @click=${e}>
              <span aria-hidden="true">${v.x}</span>
            </button>
          </header>
          <div class="body">
            ${O(this.sendShortcut).map(e=>b`
                <section>
                  <h3>${o(e.label)}</h3>
                  ${e.entries.map(e=>b`
                      <div class="shortcut-row">
                        <span>${o(e.label)}</span>
                        <span class="combos">
                          ${e.combos.map(e=>b`
                              <span class="combo">
                                ${p(e,{separateKeys:!0})}
                              </span>
                            `)}
                        </span>
                      </div>
                    `)}
                </section>
              `)}
          </div>
        </div>
      </openclaw-modal-dialog>
    `}},t([E({attribute:!1})],k.prototype,`sendShortcut`,void 0),t([E({attribute:!1})],k.prototype,`newSessionHost`,void 0),t([C()],k.prototype,`open`,void 0),customElements.get(`openclaw-keyboard-shortcuts-dialog`)||customElements.define(`openclaw-keyboard-shortcuts-dialog`,k)})))()}A();