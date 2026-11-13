import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{O as t,R as n,hu as r,uu as i}from"./control-ui-core-pYNj5S1a.js";import{Br as a,Xi as o,Zi as s}from"./control-ui-core-D6clmJs8.js";import{$ as c,X as l,Y as u,m as d,p as f}from"./lit-runtime-DZL1fcCI.js";import{bi as p,xi as m,yi as h}from"./control-ui-boot-shared-3Hl8ksFq.js";import{Hr as g,Vr as _,Wr as v}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as y,t as b}from"./en-devices-l_IXqKvo.js";function x(e){return r(e===`limited`?`devices.pairing.limitedAccess`:e===`node`?`devices.pairing.nodeAccessSummary`:`devices.pairing.fullAccessSummary`)}function S(e){if(!e.open)return l;let n=e.lifecycle,i=r(`devices.pairing.title`),a=n.phase===`success`?r(`devices.pairing.pairedTitle`):n.phase===`delivery-uncertain`?r(`devices.pairing.deliveryUncertainTitle`):n.phase===`expired`?r(`devices.pairing.expiredTitle`):r(`devices.pairing.subtitle`),s=r(`devices.pairing.copySetupCode`),u=n.phase===`waiting`?n.setup:null,f=u?.gatewayUrls??(u?[u.gatewayUrl]:[]),m=n.access===`node`,g=m?w:C,y=u?`openclaw node run --pair "oc-pair://${u.setupCode}"`:``,b=!!(u&&u.expiresAtMs<=e.nowMs),S=n.phase!==`success`&&n.phase!==`delivery-uncertain`&&n.phase!==`reconciling`&&(n.phase!==`error`||n.source!==`status`),E=n.phase===`selection`||n.phase===`error`&&n.source===`create`;return c`
    <openclaw-modal-dialog label=${i} description=${a} @modal-cancel=${e.onClose}>
      <section class="device-pair-setup">
        <header class="device-pair-setup__header">
          <div class="device-pair-setup__phone" aria-hidden="true">
            ${m?o.server:o.smartphone}
          </div>
          <div>
            <h2>${i}</h2>
            <p>${a}</p>
            ${n.phase!==`success`&&!m?c`<p class="device-pair-setup__get-apps">
                    ${r(`devices.pairing.noApp`)}
                    <button type="button" @click=${e.onGetApps}>
                      ${r(`devices.pairing.getApps`)}
                    </button>
                  </p>`:l}
          </div>
          <button
            class="btn btn--icon btn--ghost device-pair-setup__close"
            type="button"
            aria-label=${r(`common.dismiss`)}
            @click=${e.onClose}
          >
            ${o.x}
          </button>
        </header>

        <div class="device-pair-setup__body">
          ${S?c`<fieldset class="device-pair-setup__access" ?disabled=${!E}>
                  <legend>${r(`devices.pairing.accessTitle`)}</legend>
                  ${T.map(([t,i,a])=>c`<label>
                      <input
                        type="radio"
                        name="device-pair-access"
                        .checked=${n.access===t}
                        @change=${()=>e.onAccessChange(t)}
                      />
                      <span>
                        <strong>${r(i)}</strong>
                        <small>${r(a)}</small>
                      </span>
                    </label>`)}
                </fieldset>`:l}
          ${n.phase===`selection`?c`
                  <button class="btn primary" type="button" @click=${e.onRefresh}>
                    ${m?o.server:o.smartphone}
                    ${r(`devices.pairing.generateCode`)}
                  </button>
                `:l}
          ${n.phase===`loading`||n.phase===`reconciling`?c`
                  <div class="device-pair-setup__loading" role="status" aria-live="polite">
                    <span class="device-pair-setup__spinner" aria-hidden="true"></span>
                    <span
                      >${r(n.phase===`loading`?`devices.pairing.generating`:`common.loading`)}</span
                    >
                  </div>
                `:l}
          ${n.phase===`error`?c`
                  <div class="callout danger device-pair-setup__error" role="alert">
                    <strong
                      >${r(n.source===`status`?`devices.pairing.statusFailed`:`devices.pairing.failed`)}</strong
                    >
                    <span>${n.message}</span>
                  </div>
                  <button class="btn primary" type="button" @click=${e.onRefresh}>
                    ${o.refresh} ${r(`common.reload`)}
                  </button>
                `:l}
          ${u?c`
                  ${m?c`<div class="device-pair-setup__command">
                          ${b?l:c`<div class="login-gate__command">
                                  <code>${y}</code>
                                  ${v(y,r(`connection.help.copyCommand`))}
                                </div>`}
                          <p class="device-pair-setup__waiting" role="timer" aria-live="off">
                            ${b?r(`devices.pairing.nodeExpired`):r(`devices.pairing.nodeExpiresIn`,{time:t(u.expiresAtMs,e.nowMs)})}
                          </p>
                        </div>`:c`<div class="device-pair-setup__qr-frame">
                          ${u.qrDataUrl?c`<img
                                  class="device-pair-setup__qr"
                                  src=${u.qrDataUrl}
                                  alt=${r(`devices.pairing.qrAlt`)}
                                  width="360"
                                  height="360"
                                  draggable="false"
                                />`:c`<div class="device-pair-setup__qr-unavailable">
                                  ${r(`devices.pairing.qrUnavailable`)}
                                </div>`}
                        </div>`}

                  <div class="device-pair-setup__meta">
                    <span class="settings-status settings-status--accent">
                      <span class="settings-status__dot"></span>
                      ${u.auth}
                    </span>
                    <div class="device-pair-setup__gateways">
                      ${f.map(e=>c`
                          <span class="device-pair-setup__gateway" title=${e}
                            >${e}</span
                          >
                        `)}
                    </div>
                  </div>

                  ${u.accessDowngraded?c`
                          <div class="callout warn device-pair-setup__access-warning" role="status">
                            <strong>${r(`devices.pairing.transportLimitedTitle`)}</strong>
                            <span>${r(`devices.pairing.transportLimitedHint`)}</span>
                          </div>
                        `:l}

                  <div class="device-pair-setup__actions">
                    ${m?l:d(u.setupCode,c`<button
                              class="btn primary"
                              type="button"
                              @click=${e=>void _(e,u.setupCode,s)}
                            >
                              ${o.copy} <span data-copy-label>${s}</span>
                            </button>`)}
                    <button class="btn" type="button" @click=${e.onRefresh}>
                      ${o.refresh} ${r(`devices.pairing.newCode`)}
                    </button>
                  </div>

                  <details class="device-pair-setup__fallback">
                    <summary>${r(`devices.pairing.showSetupCode`)}</summary>
                    <code>${u.setupCode}</code>
                  </details>

                  ${e.pendingCount>0?c`
                          <div class="callout warn device-pair-setup__pending">
                            <span>
                              ${r(`devices.pairing.pending`,{count:String(e.pendingCount)})}
                            </span>
                            <button class="btn btn--sm" @click=${e.onManageDevices}>
                              ${r(`devices.pairing.review`)}
                            </button>
                          </div>
                        `:c`<p class="device-pair-setup__waiting">
                          ${r(m?`devices.pairing.nodeWaiting`:`devices.pairing.waiting`)}
                        </p>`}
                `:l}
          ${n.phase===`success`?c`<div class="device-pair-setup__state" role="status" aria-live="polite">
                  <div
                    class="device-pair-setup__state-icon device-pair-setup__state-icon--success"
                    aria-hidden="true"
                  >
                    ${o.badgeCheck}
                  </div>
                  <h3>${n.deviceName??r(`devices.pairing.pairedTitle`)}</h3>
                  <p>
                    ${n.deviceName?c`${r(`devices.pairing.pairedTitle`)}
                            <span aria-hidden="true">·</span> `:l}${x(n.access)}
                  </p>
                  <button class="btn primary" type="button" @click=${e.onClose}>
                    ${r(`devices.pairing.done`)}
                  </button>
                </div>`:l}
          ${n.phase===`delivery-uncertain`?c`<div class="device-pair-setup__state" role="alert">
                  <div class="device-pair-setup__state-icon" aria-hidden="true">
                    ${o.alertTriangle}
                  </div>
                  <h3>${r(`devices.pairing.deliveryUncertainTitle`)}</h3>
                  <p>${r(`devices.pairing.deliveryUncertainHint`)}</p>
                  <div class="device-pair-setup__actions">
                    <button class="btn primary" type="button" @click=${e.onRefresh}>
                      ${o.refresh} ${r(`devices.pairing.generateNewCode`)}
                    </button>
                  </div>
                </div>`:l}
          ${n.phase===`expired`?c`<div class="device-pair-setup__state" role="status" aria-live="polite">
                  <div class="device-pair-setup__state-icon" aria-hidden="true">
                    ${o.refresh}
                  </div>
                  <h3>${r(`devices.pairing.expiredTitle`)}</h3>
                  <button class="btn primary" type="button" @click=${e.onRefresh}>
                    ${o.refresh} ${r(`devices.pairing.generateNewCode`)}
                  </button>
                </div>`:l}
        </div>

        <footer class="device-pair-setup__footer">
          <a
            href=${g}
            target=${h}
            rel=${p()}
            aria-label=${r(`devices.pairing.helpNewTab`)}
          >
            <span>${r(`devices.pairing.help`)}</span>
            <span class="device-pair-setup__external-icon" aria-hidden="true"
              >${o.externalLink}</span
            >
          </a>
          <button class="btn btn--ghost" type="button" @click=${e.onManageDevices}>
            ${r(`devices.pairing.manageDevices`)}
          </button>
        </footer>
      </section>
    </openclaw-modal-dialog>
  `}var C,w,T;function E(){return(E=e((()=>{u(),f(),g(),s(),a(),i(),b(),m(),n(),y(),C=`https://docs.openclaw.ai/channels/pairing#pair-from-the-control-ui-recommended`,w=`https://docs.openclaw.ai/gateway/pairing#one-paste-node-pairing`,T=[[`full`,`devices.pairing.fullAccess`,`devices.pairing.fullAccessHint`],[`limited`,`devices.pairing.limitedAccess`,`devices.pairing.limitedAccessHint`],[`node`,`devices.pairing.nodeAccess`,`devices.pairing.nodeAccessHint`]]})))()}E();export{S as renderDevicePairSetup};