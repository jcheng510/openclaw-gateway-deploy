import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Gl as t,hu as n,ql as r,uu as i}from"./control-ui-core-pYNj5S1a.js";import{Xi as a,Zi as o,nn as s,rn as c}from"./control-ui-core-D6clmJs8.js";import{$ as l,X as u,Y as d}from"./lit-runtime-DZL1fcCI.js";import{Al as f,jl as p}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Ba as m,La as h}from"./control-ui-boot-shared-DJ4XCcp6.js";import{G as g,K as _,at as v,it as y,nt as b,rt as x,tt as S}from"./control-ui-boot-new-CaEHEcx2.js";import"./css-new-session-BGJnpiJ5.js";function C(e){if(!e)return``;switch(e.kind){case`gateway`:return`gateway`;case`profile`:return`profile:${e.profileId}`;case`device`:return`device:${e.deviceId}`}throw Error(`Unknown session placement move target`)}function w(e){return T?Promise.resolve(null):(T=!0,c(void 0,({render:r,finish:i})=>{let o=!0,s=null,c={profiles:[],devices:[]},d=e.mode===`move`?{kind:`gateway`}:null,f=new g,p=e=>{i(e),T=!1},m=e=>{d=e,S()},_=e=>{if(e.preventDefault(),!d)return;if(d.kind!==`profile`){p(d);return}let t=f.resolve(d.profileId),n=f.resolveOs(d.profileId);p({...d,...t?{machineClass:t}:{},...n?{os:n}:{}})};function S(){let t=C(d),i=c.profiles.toSorted(h),g=e.mode===`restart`,w=e.mode===`dispatch`,T=n(`sessionsView.${e.mode}SessionTitle`),E=n(`sessionsView.${e.mode}SessionDescription`,{session:e.sessionLabel}),D=n(`sessionsView.${e.mode}SessionAction`);r(()=>l`
          <openclaw-modal-dialog label=${T} @modal-cancel=${()=>p(null)}>
            <form class="exec-approval-card" @submit=${_}>
              <div class="exec-approval-header">
                <div class="exec-approval-title">${T}</div>
                <div class="muted">${E}</div>
              </div>
              ${g?l`<div class="exec-approval-error" role="alert">
                      ${n(`sessionsView.restartSessionWarning`)}
                    </div>`:w?l`<div class="callout">${n(`sessionsView.dispatchSessionNotice`)}</div>`:e.activeRun?l`<div class="exec-approval-error" role="alert">
                          ${n(`sessionsView.moveSessionActiveRunWarning`)}
                        </div>`:l`<div class="callout">
                          ${n(`sessionsView.moveSessionNoReplayWarning`)}
                        </div>`}
              ${o?l`<div class="muted">${n(`common.loading`)}</div>`:s?l`<div class="exec-approval-error" role="alert">${s}</div>`:l`
                        <div class="new-session-page__picker-root">
                          ${w?u:v({value:`gateway`,label:n(`newSession.gateway`),icon:a.monitor,checked:t===`gateway`,disabled:!!e.gatewayDisabledReason,title:e.gatewayDisabledReason,onSelect:()=>m({kind:`gateway`})},!1)}
                          ${c.devices.length>0?l`
                                  <div class="new-session-page__menu-title">
                                    ${n(`newSession.yourDevices`)}
                                  </div>
                                  ${c.devices.map(n=>{let r=e.deviceDisabledReason??n.disabledReason;return v({value:`device:${n.deviceId}`,label:n.label,sub:n.subtitle,icon:a.monitor,facts:e.deviceDisabledReason?[e.deviceDisabledReason]:n.facts,checked:t===`device:${n.deviceId}`,disabled:!!e.deviceDisabledReason||!n.selectable,title:r,onSelect:()=>m({kind:`device`,deviceId:n.deviceId})},!1)})}
                                `:u}
                          ${c.profiles.length>0?l`
                                  <div class="new-session-page__menu-title">
                                    ${n(`newSession.cloud`)}
                                  </div>
                                  ${i.map(t=>{let r=d?.kind===`profile`&&d.profileId===t.id,i=f.machines(t),a=t.operatingSystems??[],o=f.resolve(t.id)||i.find(e=>e.default===!0)?.id||``;return l`
                                      ${y({profiles:[t],selectedId:r?t.id:``,submitting:!1,profileDisabledReason:e.profileDisabledReason,onSelect:e=>m({kind:`profile`,profileId:e})})}
                                      ${r&&a.length>=2?l`
                                              <div class="new-session-page__menu-title">
                                                ${n(`newSession.operatingSystem`)}
                                              </div>
                                              ${x({operatingSystems:a,selectedId:f.selectedOs(t),submitting:!1,onSelect:e=>f.selectOs(t.id,e,c.profiles,!1,S)})}
                                            `:u}
                                      ${r&&i.length>0?l`
                                              <div class="new-session-page__menu-title">
                                                ${n(`newSession.machine`)}
                                              </div>
                                              ${b({machines:i,selectedId:o,submitting:!1,onSelect:e=>f.select(t.id,e,c.profiles,!1,S)})}
                                            `:u}
                                    `})}
                                `:u}
                        </div>
                      `}
              <div class="exec-approval-actions">
                <button
                  type="submit"
                  class="btn primary"
                  ?disabled=${o||!!s||!d}
                >
                  ${D}
                </button>
                <button type="button" class="btn" @click=${()=>p(null)}>
                  ${n(`common.cancel`)}
                </button>
              </div>
            </form>
          </openclaw-modal-dialog>
        `)}S(),e.loadCatalog().then(e=>{c=e}).catch(e=>{s=t(e,n(`sessionsView.moveSessionCatalogFailed`))}).finally(()=>{o=!1,S()})}))}var T;function E(){return(E=e((()=>{d(),i(),f(),r(),S(),_(),o(),s(),m(),p(),T=!1})))()}E();export{w as showSessionPlacementTargetDialog};