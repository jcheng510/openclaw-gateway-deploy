import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{d as t,f as n}from"./control-ui-foundation-C3MHh_P-.js";import{Gl as r,hu as i,ql as a,uu as o}from"./control-ui-core-pYNj5S1a.js";import{Br as s,Ct as c,pt as l,ut as u,xt as d}from"./control-ui-core-D6clmJs8.js";import{$ as f,X as p,Y as m,Z as h}from"./lit-runtime-DZL1fcCI.js";import{Ao as g,ko as _}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as v,t as y}from"./en-update-actions-BxVjPC46.js";import{t as b}from"./update-run-view-DoYR45zB.js";function x(e,t){let n=e?.currentVersion?.trim(),r=n?i(`updates.target.version`,{version:n}):null,a=u(t,e);if(r&&a){let n=t?.install?.git,o=n?.status===`behind`||n?.status===`diverged`||t?.target?.kind===`git`||e?.commitsBehind!==void 0;return i(o?`updates.confirm.versionsBehind`:`updates.confirm.versions`,{available:a,installed:r})}return r??a??void 0}function S(e){return i(e?`updates.dialog.installing`:`updates.dialog.disconnected`)}async function C(e){if(E)return;let t=document.createElement(`div`);document.body.append(t),document.body.classList.add(T);let a=e.viaNativeApp?{confirmLabel:i(`updates.confirm.macAction`),message:i(`updates.confirm.macMessage`),title:i(`chat.sidebar.updateMacAndGateway`)}:{confirmLabel:i(`updates.confirm.action`),message:i(`updates.confirm.message`),title:i(`chat.sidebar.updateGateway`)},o=x(e.updateAvailable,e.updateSchedule);await new Promise(s=>{let l=e.existingRun?{kind:`run`,run:e.existingRun}:{kind:`confirm`},u=!1,d,m,_=!1,v,y=`idle`,b=()=>{u||(u=!0,d?.(),m!==void 0&&globalThis.clearTimeout(m),h(p,t),t.remove(),document.body.classList.remove(T),E=!1,s())},x=()=>{!u&&l.kind===`run`&&l.run.status!==`running`&&e.onAcknowledge?.(),b()},C=(e,t)=>{let n=e(e=>{if(!u){if(v=e,l.kind===`run`&&!e.run){b();return}t(e)}});u?n():d=n};E=!0;let D=()=>{if(u)return;let r=l,s=r.kind===`run`?r.run:null,c=r.kind===`run`?v?.readError:null,m=r.kind===`working`||s?.status===`running`,_=s!==null&&s.status!==`running`,b=r.kind===`failed`||s!==null&&n(s),C=y===`pending`,w=typeof y==`object`?y.error:null,T=b||!!c||y!==`idle`,E=v?.connected===!1,A=r.kind===`run`?c??``:r.kind===`failed`?r.message:r.kind===`working`?S(!E):`${a.message} ${i(`updates.confirm.impact`)}`;h(f`
          <openclaw-modal-dialog label=${a.title} description=${A} @modal-cancel=${x}>
            <div class="exec-approval-card update-run-dialog">
              <div class="exec-approval-header">
                <div>
                  <div class="exec-approval-title">${a.title}</div>
                  <div class="exec-approval-sub" style="white-space: pre-line">${A}</div>
                </div>
              </div>
              <div role="status" aria-live="polite" class="exec-approval-sub">
                ${E&&T?i(`updates.dialog.checkStatusDisconnected`):y===`success`&&!c?i(`updates.dialog.statusRefreshed`):p}
              </div>
              ${w?f`<div role="alert" class="exec-approval-sub">${w}</div>`:p}
              ${o&&r.kind===`confirm`?f`<div class="exec-approval-command mono update-confirmation-details">
                      <div>${o}</div>
                      ${g(e.updateSchedule,e.updateAvailable)}
                    </div>`:p}
              ${r.kind===`run`?f`<openclaw-update-run-view
                      .run=${r.run}
                      .connected=${!E}
                    ></openclaw-update-run-view>`:p}
              <div class="exec-approval-actions">
                ${_||T?f` ${T&&e.onCheckStatus?f`<button
                                type="button"
                                class="btn ${C?`btn--busy`:``}"
                                ?disabled=${C||E}
                                @click=${O}
                              >
                                ${C?f`<span class="btn__spinner" aria-hidden="true"></span>${i(`updates.dialog.checkingStatus`)}`:i(`updates.dialog.checkStatus`)}
                              </button>`:p}
                        ${b?f`<button
                                type="button"
                                class="btn primary"
                                ?disabled=${C||E}
                                @click=${()=>{l={kind:`confirm`},y=`idle`,d?.(),D()}}
                              >
                                ${i(`updates.dialog.retryUpdate`)}
                              </button>`:p}
                        ${b&&e.onReviewUpdate?f`<button
                                type="button"
                                class="btn"
                                @click=${()=>{x(),e.onReviewUpdate?.()}}
                              >
                                ${i(`updates.reviewUpdate`)}
                              </button>`:p}
                        <button type="button" class="btn" autofocus @click=${x}>
                          ${i(`common.close`)}
                        </button>`:f`
                        <button
                          type="button"
                          class="btn danger ${m?`btn--busy`:``}"
                          ?disabled=${m}
                          @click=${k}
                        >
                          ${m?f`<span class="btn__spinner" aria-hidden="true"></span>${i(`chat.updating`)}`:a.confirmLabel}
                        </button>
                        <button type="button" class="btn" autofocus @click=${x}>
                          ${i(m?`common.close`:`common.cancel`)}
                        </button>
                      `}
              </div>
            </div>
          </openclaw-modal-dialog>
        `,t)};async function O(){if(y!==`pending`&&v?.connected!==!1&&e.onCheckStatus){y=`pending`,D();try{y=await e.onCheckStatus()?`success`:v?.readError?`idle`:{error:i(`updates.dialog.statusNotRefreshed`)}}catch(e){y={error:r(e)}}finally{D()}}}function k(){if(l.kind!==`confirm`)return;if(e.viaNativeApp&&c()){x();return}let t=e.watchUpdateProgress;if(!t){e.startGatewayUpdate(),x();return}_=!1,m!==void 0&&globalThis.clearTimeout(m),l={kind:`working`},D(),e.startGatewayUpdate();let n=!0;C(t,e=>{let t=n;if(n=!1,l.kind===`confirm`)return;if(e.run&&(!t||e.run.status===`running`)){_=!0,l={kind:`run`,run:e.run},D();return}let r=e.failure&&e.readError?`${e.failure}\n${e.readError}`:e.failure??e.readError;if(r&&!t){l={kind:`failed`,message:r},D();return}_||=e.busy,l={kind:`working`},D()}),!u&&(m=globalThis.setTimeout(()=>{u||_||l.kind!==`working`||(l={kind:`failed`,message:i(`updates.dialog.notStarted`)},D())},w))}e.existingRun&&e.watchUpdateProgress&&C(e.watchUpdateProgress,e=>{e.run&&(l={kind:`run`,run:e.run},D())}),D()})}var w,T,E;function D(){return(D=e((()=>{m(),t(),_(),o(),y(),s(),b(),a(),d(),l(),v(),w=4e3,T=`update-dialog-open`,E=!1})))()}D();export{C as confirmAndStartUpdateRuntime};