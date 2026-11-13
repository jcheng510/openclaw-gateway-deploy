import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Gl as t,hu as n,ql as r,uu as i}from"./control-ui-core-pYNj5S1a.js";import{Xi as a,Zi as o,nn as s,rn as c}from"./control-ui-core-D6clmJs8.js";import{$ as l,F as u,M as d,X as f,Y as p}from"./lit-runtime-DZL1fcCI.js";import{Al as m,jl as h}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Xa as g,Ya as _,it as v,rt as y}from"./control-ui-boot-shared-DJ4XCcp6.js";import{h as b}from"./control-ui-boot-shared-DCY2wZcy.js";import{$ as x,Q as S,Z as C,at as w,et as T,tt as E}from"./control-ui-boot-new-CaEHEcx2.js";import"./css-new-session-BGJnpiJ5.js";function D(e){return O?Promise.resolve():(O=!0,c(void 0,({host:r,render:i,finish:o})=>{let s=e.defaults.cwd,c=!1,d=`checking`,p=0,m=!1,h=null,_=!1,y=new x(e.listDirectory,F),C=()=>{y.reset(),p+=1,o(),O=!1},T=async n=>{if(n.preventDefault(),!(m||d===`checking`||d===`unavailable`)){m=!0,h=null,F();try{h=await e.submit({cwd:s.trim(),worktree:d===`git`&&c})}catch(e){h=t(e)}if(!h){C();return}m=!1,F()}},E=()=>{let e=r.querySelector(`wa-popover.session-group-defaults__folder-popover`);e&&(e.open=!1)},D=()=>{y.reset(),_=!1,F()},k=e=>{s=e.trim(),D(),E(),A(!1)},A=async t=>{let n=++p;d=`checking`,c=!1,h=null,F();try{let r=await e.inspectRepository(s.trim()||void 0);if(n!==p)return;d=r,c=r===`git`&&t&&e.defaults.worktree}catch{if(n!==p)return;d=`unavailable`,c=!1}F()},j=e=>{c=e,h=null,F()},M=e=>{let t=e.detail.item.getAttribute(`value`);(t===`local`||t===`worktree`)&&j(t===`worktree`)},N=e=>{if(!(e.currentTarget instanceof HTMLElement))return;let t=e.currentTarget;e.key===`Escape`&&t.open&&(e.preventDefault(),e.stopPropagation(),t.open=!1,t.querySelector(`#session-group-defaults-mode-trigger`)?.focus({preventScroll:!0}))},P=()=>{_=!0,y.navigate(s||void 0)};function F(){let t=s.trim(),r=t?b(t):n(`sessionsView.groupDefaultsCwdPlaceholder`),o=d===`checking`?`checking`:d===`git`?`git`:`local`,p=[{value:`local`,label:n(`sessionsView.groupDefaultsLocal`),description:n(`newSession.checkoutCurrentNote`),icon:a.monitor},{value:`worktree`,label:n(`sessionsView.groupDefaultsWorktree`),description:n(`sessionsView.groupDefaultsWorktreeHint`),icon:a.gitBranch}],x=p[+!!c];i(()=>l`
          <openclaw-modal-dialog
            label=${n(`sessionsView.groupDefaultsTitle`,{group:e.group})}
            @modal-cancel=${e=>{if(m){e.preventDefault();return}C()}}
          >
            <form class="exec-approval-card session-group-defaults" @submit=${T}>
              <div class="exec-approval-header">
                <div>
                  <div class="exec-approval-title">
                    ${n(`sessionsView.groupDefaultsTitle`,{group:e.group})}
                  </div>
                  <div class="exec-approval-sub">${n(`sessionsView.groupDefaultsDescription`)}</div>
                </div>
              </div>
              <div class="session-group-defaults__fields">
                <div class="field">
                  <span>${n(`sessionsView.groupDefaultsCwd`)}</span>
                  <button
                    id="session-group-defaults-folder-trigger"
                    type="button"
                    class="new-session-page__trigger session-group-defaults__folder"
                    aria-label="${n(`sessionsView.groupDefaultsCwd`)}: ${r}"
                    aria-haspopup="dialog"
                    ?disabled=${m}
                  >
                    <span class="new-session-page__target-icon" aria-hidden="true"
                      >${a.folder}</span
                    >
                    <span class="session-group-defaults__folder-copy">
                      <strong>${r}</strong>
                      <small title=${t||f}
                        >${t||n(`sessionsView.groupDefaultsCwdHint`)}</small
                      >
                    </span>
                    <span class="new-session-page__trigger-chevron" aria-hidden="true"
                      >${a.chevronDown}</span
                    >
                  </button>
                  <wa-popover
                    ${u(v)}
                    class="new-session-page__select new-session-page__project-popover new-session-page__picker-popover session-group-defaults__folder-popover"
                    for="session-group-defaults-folder-trigger"
                    placement="bottom-start"
                    without-arrow
                    @wa-hide=${D}
                  >
                    ${_?S({browser:y,id:`session-group-defaults-browser`,label:n(`newSession.gateway`),registerProjectPath:null,registeringProject:!1,onBack:D,onRegisterProject:()=>void 0,onClose:D,onApplyFolder:k}):l`
                            <div class="new-session-page__picker-root">
                              ${w({value:`agent-workspace`,label:n(`sessionsView.groupDefaultsCwdPlaceholder`),icon:a.folder,checked:!t,onSelect:()=>k(``)},m)}
                              <button
                                type="button"
                                class="session-menu__item"
                                data-value="browse"
                                aria-pressed="false"
                                ?disabled=${m}
                                @click=${P}
                              >
                                <span class="session-menu__check" aria-hidden="true"></span>
                                <span class="session-menu__text">${n(`newSession.browse`)}</span>
                                <span class="new-session-page__menu-chevron" aria-hidden="true"
                                  >${a.chevronRight}</span
                                >
                              </button>
                            </div>
                          `}
                  </wa-popover>
                </div>
                <div class="field">
                  <span>${n(`sessionsView.groupDefaultsMode`)}</span>
                  <div
                    class="session-group-defaults__environment"
                    data-session-group-environment=${o}
                    aria-live="polite"
                  >
                    ${d===`git`?l`
                            <wa-dropdown
                              class="session-group-defaults__mode-dropdown"
                              placement="bottom-start"
                              aria-label=${n(`sessionsView.groupDefaultsMode`)}
                              @wa-select=${M}
                              @keydown=${N}
                            >
                              <button
                                id="session-group-defaults-mode-trigger"
                                slot="trigger"
                                type="button"
                                class="session-group-defaults__resolved-mode session-group-defaults__mode-trigger"
                                data-value=${x.value}
                                aria-label=${`${n(`sessionsView.groupDefaultsMode`)}: ${x.label}`}
                                ?disabled=${m}
                              >
                                <span class="new-session-page__target-icon" aria-hidden="true"
                                  >${x.icon}</span
                                >
                                <span class="session-group-defaults__resolved-copy">
                                  <strong>${x.label}</strong>
                                  <small>${x.description}</small>
                                </span>
                                <span class="new-session-page__trigger-chevron" aria-hidden="true"
                                  >${a.chevronDown}</span
                                >
                              </button>
                              ${p.map(e=>{let t=e===x;return l`
                                  <wa-dropdown-item
                                    class="session-group-defaults__mode-option"
                                    data-environment-mode=${e.value}
                                    ?data-selected=${t}
                                    aria-label=${`${e.label}, ${e.description}`}
                                    value=${e.value}
                                    type="checkbox"
                                    .checked=${t}
                                    ?disabled=${m}
                                    ?autofocus=${t&&!m}
                                    ${u(e=>g(e,t))}
                                  >
                                    <span
                                      slot="icon"
                                      class="new-session-page__target-icon session-group-defaults__mode-option-icon"
                                      aria-hidden="true"
                                      >${e.icon}</span
                                    >
                                    <span class="session-group-defaults__resolved-copy">
                                      <strong>${e.label}</strong>
                                      <small>${e.description}</small>
                                    </span>
                                  </wa-dropdown-item>
                                `})}
                            </wa-dropdown>
                          `:l`
                            <div
                              class="session-group-defaults__resolved-mode"
                              role=${d===`checking`?`status`:f}
                            >
                              <span class="new-session-page__target-icon" aria-hidden="true"
                                >${d===`checking`?a.gitBranch:a.monitor}</span
                              >
                              <span class="session-group-defaults__resolved-copy">
                                <strong
                                  >${n(d===`checking`?`newSession.checkingGit`:`sessionsView.groupDefaultsLocal`)}</strong
                                >
                                ${d===`checking`?f:l`<small
                                        >${n(d===`unavailable`?`newSession.gitCheckUnavailable`:`newSession.checkoutCurrentNote`)}</small
                                      >`}
                              </span>
                            </div>
                          `}
                  </div>
                </div>
              </div>
              ${h?l`<div class="exec-approval-error" role="alert">${h}</div>`:f}
              <div class="exec-approval-actions">
                <button
                  type="submit"
                  class="btn primary"
                  ?disabled=${m||d===`checking`||d===`unavailable`}
                >
                  ${n(`common.save`)}
                </button>
                ${d===`unavailable`?l`
                        <button
                          type="button"
                          class="btn"
                          ?disabled=${m}
                          @click=${()=>void A(s.trim()===e.defaults.cwd.trim())}
                        >
                          ${n(`common.retry`)}
                        </button>
                      `:f}
                <button type="button" class="btn" ?disabled=${m} @click=${C}>
                  ${n(`common.cancel`)}
                </button>
              </div>
            </form>
          </openclaw-modal-dialog>
        `)}A(!0)}))}var O;function k(){return(k=e((()=>{p(),d(),i(),m(),r(),E(),T(),C(),o(),s(),y(),_(),h(),O=!1})))()}k();export{D as showSessionGroupDefaultsDialog};