import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{cc as i,hu as a,lu as o,sc as s,su as c,uu as l}from"./control-ui-core-pYNj5S1a.js";import{Ma as u,Xi as d,Zi as f,va as p,vi as m,yi as h}from"./control-ui-core-D6clmJs8.js";import{$ as g,X as _,Y as v}from"./lit-runtime-DZL1fcCI.js";import{At as y,Dt as b,Et as x,Ft as S,Mt as C,Ot as w,_t as T,jt as E,xt as D,yt as O}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as k,t as A}from"./en-settings-DlF4_5vi.js";import{n as j,t as M}from"./settings-workspace-DKW0BVnu.js";var N;function P(){return(P=e((()=>{t(),v(),p(),h(),f(),T(),M(),l(),A(),o(),i(),k(),N=class extends c{constructor(...e){super(...e),this.subscriptions=new s(this).watch(()=>this.context?.nativeDeviceSettings,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}renderPermissions(e){let t=this.context.nativeDeviceSettings,{permissions:n}=e,r=n.location,i=r?.preciseEditable??e.device.platform===`macos`;return g`
      ${n.entries.length>0?y({title:a(`configPage.deviceSettings.systemAccess`)},n.entries.map(({id:n,status:r})=>{let i=a(`configPage.deviceSettings.permissions.${n}.title`),o=e.device.platform===`macos`&&(n===`screenRecording`||n===`accessibility`)&&r===`notDetermined`;return w({title:i,description:a(`configPage.deviceSettings.permissions.${n}.hint`),stackedOnNarrow:!0,control:g`
                    <div class="settings-permission-control">
                      ${C({kind:`muted`,dot:!1,label:g`${r===`granted`?g`<span class="settings-permission-check" aria-hidden="true">${d.check}</span>`:_}${a(`configPage.deviceSettings.permissionStatuses.${o?`notGranted`:r}`)}`})}
                      ${r===`notDetermined`?g`<button type="button" class="btn" aria-label=${`${a(`configPage.deviceSettings.grant`)}: ${i}`} @click=${()=>t?.requestPermission(n)}>${a(`configPage.deviceSettings.grant`)}</button>`:r===`denied`?g`<button type="button" class="btn" aria-label=${`${a(`configPage.deviceSettings.openSystemSettings`)}: ${i}`} @click=${()=>t?.openSystemSettings(n)}>${a(`configPage.deviceSettings.openSystemSettings`)}</button>`:_}
                      ${o?g`<button type="button" class="btn settings-permission-recovery" aria-label=${`${a(`configPage.deviceSettings.openSystemSettings`)}: ${i}`} @click=${()=>t?.openSystemSettings(n)}>${a(`configPage.deviceSettings.openSystemSettings`)}</button>`:_}
                    </div>
                  `})})):_}
      ${r?y({title:a(`configPage.deviceSettings.location`)},g`
                ${w({title:a(`configPage.deviceSettings.locationAccess`),description:a(`configPage.deviceSettings.locationHint`),stackedOnNarrow:!0,control:E({value:r.mode,ariaLabel:a(`configPage.deviceSettings.locationAccess`),options:[`off`,`whileUsing`,`always`].map(e=>({value:e,label:a(`configPage.deviceSettings.locationModes.${e}`)})),onChange:e=>t?.set(`permissions.location.mode`,e)})})}
                ${i?S({title:a(`configPage.deviceSettings.preciseLocation`),description:a(`configPage.deviceSettings.preciseLocationHint`),checked:r.precise,disabled:r.mode===`off`,onChange:e=>t?.set(`permissions.location.precise`,e)}):w({title:a(`configPage.deviceSettings.preciseLocation`),description:a(`configPage.deviceSettings.preciseLocationReadOnlyHint`),stackedOnNarrow:!0,control:g`
                          <div class="settings-permission-control">
                            ${C({kind:`muted`,dot:!1,label:a(r.precise?`configPage.deviceSettings.preciseLocationStatuses.enabled`:`configPage.deviceSettings.preciseLocationStatuses.disabled`)})}
                            <button
                              type="button"
                              class="btn"
                              aria-label=${`${a(`configPage.deviceSettings.openSettings`)}: ${a(`configPage.deviceSettings.preciseLocation`)}`}
                              @click=${()=>t?.openSystemSettings(`location`)}
                            >
                              ${a(`configPage.deviceSettings.openSettings`)}
                            </button>
                          </div>
                        `})}
              `):_}
      ${e.capabilities?.activeComputerPresenceEnabled===void 0?_:y({title:a(`configPage.deviceSettings.privacy`)},S({title:a(`configPage.deviceSettings.activePresence`),description:a(`configPage.deviceSettings.activePresenceHint`),checked:e.capabilities.activeComputerPresenceEnabled,onChange:e=>t?.set(`capabilities.activeComputerPresenceEnabled`,e)}))}
    `}render(){let e=this.context?.nativeDeviceSettings,t=e?.snapshot,n=e?t?this.renderPermissions(t):D(a(`configPage.deviceSettings.loading`)):D(a(`configPage.deviceSettings.appOnly`));return g`
      ${b({title:u(`device-permissions`),subtitle:g`${a(t?.device.platform===`macos`?`configPage.deviceSettings.permissionsIntro`:`configPage.deviceSettings.permissionsIntroIos`)}
        ${O(`https://docs.openclaw.ai/platforms/${t?.device.platform??`macos`}`)}`})}
      ${j(x(n))}
    `}},n([r({context:m,subscribe:!0})],N.prototype,`context`,void 0),customElements.get(`openclaw-device-permissions-page`)||customElements.define(`openclaw-device-permissions-page`,N)})))()}P();