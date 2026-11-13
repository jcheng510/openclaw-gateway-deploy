import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{cc as i,hu as a,lu as o,sc as s,su as c,uu as l}from"./control-ui-core-pYNj5S1a.js";import{_a as u,va as d,vi as f,yi as p}from"./control-ui-core-D6clmJs8.js";import{$ as m,X as h,Y as g,ct as _,i as v,nt as y,o as b}from"./lit-runtime-DZL1fcCI.js";import{At as x,Dt as S,Et as C,Ft as w,It as T,Mt as E,Ot as D,_t as O,xt as k,yt as A}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as j,t as M}from"./en-settings-DlF4_5vi.js";import{n as N,t as P}from"./en-apps-Dcp-B6xB.js";import{n as F,t as I}from"./settings-workspace-DKW0BVnu.js";import{t as L}from"./native-chrome-setup-jdIZ7Nn9.js";function R(e){let t=B.get(e);if(t)return t;let n={domains:null,targetProfile:null};return B.set(e,n),n}function z(e,t,n){let r=B.get(e);r&&r[t]===n&&(r[t]=null,r.domains===null&&r.targetProfile===null&&B.delete(e))}var B,V;function H(){return(H=e((()=>{t(),g(),y(),v(),d(),p(),O(),I(),l(),P(),M(),o(),i(),L(),N(),j(),B=new WeakMap,V=class extends c{constructor(...e){super(...e),this.newDomain=``,this.targetProfileTimer=null,this.subscriptions=new s(this).watch(()=>this.context?.nativeDeviceSettings,(e,t)=>e.subscribe(t),e=>{this.targetProfileTimer&&this.targetProfileTimer.capability!==e&&this.flushTargetProfile()})}disconnectedCallback(){this.flushTargetProfile(),this.subscriptions.clear(),super.disconnectedCallback()}toggle(e,t,n,r,i=!1){return t===void 0?h:w({title:a(`configPage.deviceSettings.${n}`),description:r,checked:t,disabled:i,onChange:t=>this.context.nativeDeviceSettings?.set(e,t)})}editTargetProfile(e){let t=this.context.nativeDeviceSettings;t&&(this.targetProfileTimer!==null&&clearTimeout(this.targetProfileTimer.timer),R(t).targetProfile={value:e,sent:!1},this.targetProfileTimer={capability:t,timer:setTimeout(()=>this.flushTargetProfile(),400)},this.requestUpdate())}flushTargetProfile(){let e=this.targetProfileTimer;if(!e)return;clearTimeout(e.timer),this.targetProfileTimer=null;let t=B.get(e.capability)?.targetProfile;t&&!t.sent&&(t.sent=!0,e.capability.set(`browser.cookieSync.targetProfile`,t.value,()=>{z(e.capability,`targetProfile`,t)}))}updateDomains(e){let t=this.context.nativeDeviceSettings;if(!t)return;let n=B.get(t)?.domains??t.snapshot?.browser?.cookieSync?.domains;if(!n)return;let r=[...new Set(e(n).map(e=>e.trim().toLowerCase()).filter(Boolean))];R(t).domains=r,this.requestUpdate(),t.set(`browser.cookieSync.domains`,r,()=>{z(t,`domains`,r)})}renderBrowser(e){let t=this.context.nativeDeviceSettings,n=e.cookieSync,r=t?B.get(t):void 0,i=r?.domains??n?.domains??[],o=()=>{this.updateDomains(e=>[...e,this.newDomain]),this.newDomain=``};return m`
      ${x({title:a(`configPage.deviceSettings.chromeExtension`)},D({title:a(`configPage.deviceSettings.chromeExtensionSetup`),stacked:!0,control:m`
            <div class="device-extension-setup">
              <openclaw-native-chrome-setup auto-inspect></openclaw-native-chrome-setup>
              <div class="device-extension-setup__actions">
                <a
                  href="https://chromewebstore.google.com/detail/openclaw/kcdjddhmeafeomebliikmbpblkmkfoig"
                  target="_blank"
                  rel="noopener noreferrer"
                  >${a(`appsPage.ctaChromeWebStore`)}</a
                >
                ${A(`https://docs.openclaw.ai/tools/chrome-extension`)}
              </div>
            </div>
          `}))}
      ${e.importAvailable||n&&!n.available?x({title:a(`configPage.deviceSettings.browser`)},m`
                ${e.importAvailable?D({title:a(`configPage.deviceSettings.browserImport`),description:a(`configPage.deviceSettings.browserImportHint`),control:m`<button
                          type="button"
                          class="btn"
                          @click=${()=>t?.openPanel(`browser-import`)}
                        >
                          ${a(`configPage.deviceSettings.importBrowserLogins`)}
                        </button>`}):h}
                ${n&&!n.available?D({title:a(`configPage.deviceSettings.cookieSync`),description:a(`configPage.deviceSettings.cookieSyncUnavailable`)}):h}
              `):h}
      ${n?.available?x({title:a(e.importAvailable?`configPage.deviceSettings.cookieSync`:`configPage.deviceSettings.browser`),description:e.importAvailable?void 0:a(`configPage.deviceSettings.cookieSync`)},m`
                ${this.toggle(`browser.cookieSync.enabled`,n.enabled,`cookieSyncEnabled`,a(`configPage.deviceSettings.cookieSyncHint`))}
                ${D({title:a(`configPage.deviceSettings.domains`),description:a(`configPage.deviceSettings.domainsHint`),stacked:!0,control:m`<div class="device-domains">
                    ${i.map(e=>m`<div class="device-domain-entry">
                        ${T(e)}
                        <button
                          type="button"
                          class="btn small"
                          aria-label=${a(`configPage.deviceSettings.removeDomain`,{domain:e})}
                          @click=${()=>this.updateDomains(t=>t.filter(t=>t!==e))}
                        >
                          ${a(`common.remove`)}
                        </button>
                      </div>`)}
                    <form
                      class="device-domain-entry"
                      @submit=${e=>{e.preventDefault(),o()}}
                    >
                      <input
                        type="text"
                        class="settings-input"
                        aria-label=${a(`configPage.deviceSettings.addDomain`)}
                        .value=${b(this.newDomain)}
                        @input=${e=>{this.newDomain=e.currentTarget.value}}
                      />
                      <button type="submit" class="btn" ?disabled=${!this.newDomain.trim()}>
                        ${a(`configPage.deviceSettings.addDomain`)}
                      </button>
                    </form>
                  </div>`})}
                ${D({title:a(`configPage.deviceSettings.targetProfile`),description:a(`configPage.deviceSettings.targetProfileHint`),control:m`<input
                    type="text"
                    class="settings-input"
                    aria-label=${a(`configPage.deviceSettings.targetProfile`)}
                    .value=${b(r?.targetProfile?.value??n.targetProfile)}
                    @input=${e=>{this.editTargetProfile(e.currentTarget.value)}}
                    @change=${()=>this.flushTargetProfile()}
                  />`})}
                ${D({title:a(`configPage.deviceSettings.syncStatus`),description:n.detail??void 0,control:E({kind:n.state===`error`?`danger`:n.state===`running`?`accent`:`muted`,label:a(`configPage.deviceSettings.syncStates.${n.state}`)})})}
              `):h}
    `}renderSettings(e){let{app:t,capabilities:n}=e,r=this.context.nativeDeviceSettings;return m`
      ${t?x({title:a(`configPage.deviceSettings.app`)},m`
                ${this.toggle(`app.nativeExperienceEnabled`,t.nativeExperienceEnabled,`nativeExperience`,a(`configPage.deviceSettings.nativeExperienceHint`))}
                ${t.appearance===void 0?h:D({title:a(`configPage.deviceSettings.appearance`),control:m`<select
                          class="settings-select"
                          aria-label=${a(`configPage.deviceSettings.appearance`)}
                          .value=${b(t.appearance)}
                          @change=${e=>{let t=e.currentTarget.value;r?.set(`app.appearance`,t)}}
                        >
                          ${[`system`,`light`,`dark`].map(e=>m`<option value=${e} ?selected=${e===t.appearance}>${a(`configPage.deviceSettings.appearanceModes.${e}`)}</option>`)}
                        </select>`})}
                ${this.toggle(`app.notificationsEnabled`,t.notificationsEnabled,`notificationsEnabled`,a(`configPage.deviceSettings.notificationsEnabledHint`))}
                ${this.toggle(`app.showDockIcon`,t.showDockIcon,`showDockIcon`,a(`configPage.deviceSettings.showDockIconHint`))}
                ${t.iconStyle?D({title:a(`configPage.deviceSettings.iconStyle`),description:a(`configPage.deviceSettings.iconStyleHint`),control:m`<select
                          class="settings-select"
                          aria-label=${a(`configPage.deviceSettings.iconStyle`)}
                          .value=${b(t.iconStyle.selectedId)}
                          ?disabled=${t.iconStyle.available.length===0}
                          @change=${e=>{let t=e.currentTarget.value;r?.set(`app.iconStyle`,t)}}
                        >
                          ${t.iconStyle.available.map(e=>m`<option
                              value=${e.id}
                              ?selected=${e.id===t.iconStyle?.selectedId}
                            >
                              ${e.name}
                            </option>`)}
                        </select>`}):h}
                ${this.toggle(`app.iconAnimationsEnabled`,t.iconAnimationsEnabled,`iconAnimations`,a(`configPage.deviceSettings.iconAnimationsHint`))}
                ${this.toggle(`app.launchAtLogin`,t.launchAtLogin,`launchAtLogin`,t.launchAtLoginAvailable===!1?a(`configPage.deviceSettings.launchAtLoginUnavailable`):void 0,t.launchAtLoginAvailable===!1)}
                ${this.toggle(`app.quickChatEnabled`,t.quickChatEnabled,`quickChat`,a(`configPage.deviceSettings.quickChatHint`))}
                ${t.quickChatShortcut===void 0?h:D({title:a(`configPage.deviceSettings.quickChatShortcut`),control:m`
                          ${T(t.quickChatShortcut??a(`configPage.deviceSettings.notSet`))}
                          <button
                            type="button"
                            class="btn"
                            @click=${()=>r?.openPanel(`quick-chat-shortcut`)}
                          >
                            ${a(`configPage.deviceSettings.changeShortcut`)}
                          </button>
                        `})}
              `):h}
      ${n?x({title:a(`configPage.deviceSettings.capabilities`)},m`
                ${this.toggle(`capabilities.canvasEnabled`,n.canvasEnabled,`canvas`,a(`configPage.deviceSettings.canvasHint`))}
                ${this.toggle(`capabilities.cameraEnabled`,n.cameraEnabled,`camera`,a(`configPage.deviceSettings.cameraHint`))}
                ${this.toggle(`capabilities.keepAwakeEnabled`,n.keepAwakeEnabled,`keepAwake`,a(e.device.platform===`ios`?`configPage.deviceSettings.keepAwakeHint`:`configPage.deviceSettings.keepAwakeComputerHint`))}
                ${n.healthSummaryAvailable?this.toggle(`capabilities.healthSummaryEnabled`,n.healthSummaryEnabled,`healthSummary`,a(`configPage.deviceSettings.healthSummaryHint`)):h}
                ${this.toggle(`capabilities.computerControlEnabled`,n.computerControlEnabled,`computerControl`,a(`configPage.deviceSettings.computerControlHint`))}
                ${this.toggle(`capabilities.desktopSharingEnabled`,n.desktopSharingEnabled,`desktopSharing`,a(e.device.platform===`macos`?`configPage.deviceSettings.desktopSharingHint`:`configPage.deviceSettings.desktopSharingComputerHint`))}
                ${e.desktopSharing?D({title:a(`configPage.deviceSettings.desktopSharingStatus`),description:e.desktopSharing.detail,control:E({kind:e.desktopSharing.state===`error`?`danger`:e.desktopSharing.state===`running`?`ok`:`muted`,label:a(`configPage.deviceSettings.desktopSharingStates.${e.desktopSharing.state}`)})}):h}
                ${this.toggle(`capabilities.unattendedDesktopEnabled`,n.unattendedDesktopEnabled,`unattendedDesktop`,a(`configPage.deviceSettings.unattendedDesktopHint`))}
                ${e.desktopAvailability?D({title:a(`configPage.deviceSettings.desktopAvailability`),control:E({kind:e.desktopAvailability.state===`unlocked`?`ok`:`warn`,label:a(`configPage.deviceSettings.desktopStates.${e.desktopAvailability.state}`)})}):h}
                ${n.computerControlEnabled&&n.computerControlProvider!==void 0?D({title:a(`configPage.deviceSettings.computerControlProvider`),control:m`<select
                          class="settings-select"
                          aria-label=${a(`configPage.deviceSettings.computerControlProvider`)}
                          .value=${n.computerControlProvider}
                          @change=${e=>{let t=e.currentTarget.value;r?.set(`capabilities.computerControlProvider`,t)}}
                        >
                          <option
                            value="peekaboo"
                            ?selected=${n.computerControlProvider===`peekaboo`}
                          >
                            ${a(`configPage.deviceSettings.peekaboo`)}
                          </option>
                          <option
                            value="cua"
                            ?selected=${n.computerControlProvider===`cua`}
                            ?disabled=${!n.cuaDriverBundled}
                          >
                            ${a(n.cuaDriverBundled?`configPage.deviceSettings.cua`:`configPage.deviceSettings.cuaUnavailable`)}
                          </option>
                        </select>`}):h}
                ${this.toggle(`capabilities.peekabooBridgeEnabled`,n.peekabooBridgeEnabled,`peekabooBridge`,a(`configPage.deviceSettings.peekabooBridgeHint`),!n.computerControlEnabled)}
              `):h}
      ${e.browser?this.renderBrowser(e.browser):h}
      ${t?.debugPaneEnabled===void 0?h:x({title:a(`configPage.deviceSettings.developer`)},m`
                ${this.toggle(`app.debugPaneEnabled`,t.debugPaneEnabled,`debugTools`)}
                ${t.debugPaneEnabled?D({title:a(`configPage.deviceSettings.debugWindow`),control:m`<button type="button" class="btn" @click=${()=>r?.openPanel(`debug`)}>${a(`configPage.deviceSettings.openDebug`)}</button>`}):h}
              `)}
      ${e.device.platform===`ios`?x({title:a(`configPage.deviceSettings.device`)},m`${[`diagnostics`,`licenses`,`about`,`watch`].map(e=>D({title:a(`configPage.deviceSettings.panels.${e}`),control:m`<button
                    type="button"
                    class="btn"
                    @click=${()=>r?.openPanel(e)}
                  >
                    ${a(`configPage.deviceSettings.openPanel`)}
                  </button>`}))}`):h}
    `}render(){let e=this.context?.nativeDeviceSettings,t=e?.snapshot,n=e?t?this.renderSettings(t):k(a(`configPage.deviceSettings.loading`)):k(a(`configPage.deviceSettings.appOnly`));return m`
      ${S({title:a(u(t)),subtitle:m`${a(t?.device.platform===`macos`?`configPage.deviceSettings.intro`:`configPage.deviceSettings.introIos`)}
        ${A(`https://docs.openclaw.ai/platforms/${t?.device.platform??`macos`}`)}`})}
      ${F(C(n))}
    `}},n([r({context:f,subscribe:!0})],V.prototype,`context`,void 0),n([_()],V.prototype,`newDomain`,void 0),customElements.get(`openclaw-device-page`)||customElements.define(`openclaw-device-page`,V)})))()}H();