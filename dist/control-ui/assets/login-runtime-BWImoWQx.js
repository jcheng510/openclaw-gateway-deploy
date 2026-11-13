import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{ca as t,eo as n,ln as r,pn as i,qr as a}from"./control-ui-foundation-C3MHh_P-.js";import{Bt as o,It as s,Rt as c,Ss as l,Ul as u,Vt as d,bu as ee,hu as f,lu as p,ou as te,uu as m,xs as h,xu as g,zt as _}from"./control-ui-core-pYNj5S1a.js";import{Ia as v,Ii as y,Mi as b,Pa as x,Ri as S,Xi as C,Zi as w,ca as T,co as ne,ua as re,zi as ie}from"./control-ui-core-D6clmJs8.js";import{$ as E,X as D,Y as ae,ct as oe,nt as O,ut as k}from"./lit-runtime-DZL1fcCI.js";import{Ki as A,bi as j,qi as M,xi as N,yi as P}from"./control-ui-boot-shared-3Hl8ksFq.js";import{A as F,k as I}from"./control-ui-boot-shared-DJ4XCcp6.js";var L,R;function z(){return(z=e((()=>{g(),L={login:{heading:`Connect to OpenClaw`,lede:`Enter the Gateway URL and secret, or open the one-time link that openclaw dashboard prints on the Gateway host.`,gatewayUrl:`Gateway URL`,gatewaySettings:`Gateway settings`,secret:`Gateway secret`,setupCodeHint:`This is a device setup code for the OpenClaw mobile app, not the Gateway secret. Paste it in the app's Gateway settings instead; the Gateway secret comes from openclaw gateway auth-token --show on the Gateway host.`,secretPlaceholder:`Paste the token or type the password`,runOnHost:`Run on the Gateway host`,connection:{target:`Connecting to {host}`,secretEntered:`secret entered`,noSecret:`no secret`,change:`Change`},showSecret:`Show Gateway secret`,hideSecret:`Hide Gateway secret`,toggleSecretVisibility:`Toggle Gateway secret visibility`,failure:{rawError:`Raw error`,busy:{title:`Gateway busy, retrying…`,summary:`The Gateway is reachable, but the connection could not be opened. This page will retry automatically.`,countdown:`Retrying in {seconds}s…`,retrying:`Retrying now…`},profileUnavailable:{title:`Profile verification unavailable`,stepRetry:`Retry shortly.`,stepAdmin:`If this continues, ask a Gateway administrator to check the identity provider and GitHub API credential.`},verifiedUserRequired:{title:`Verified identity required`,summary:`This Gateway has named roles enabled. Device and setup tokens cannot identify a person.`,stepIdentity:`Reconnect through the trusted proxy or Tailscale so the Gateway can verify your identity.`,stepSharedSecret:`For trusted local operator access, use the shared Gateway token or password.`},accessDenied:{title:`No access to this Gateway`,summary:`You're signed in, but this Gateway hasn't granted your account access, or that access has ended.`,stepAdmin:`Ask a Gateway administrator to assign your profile a role, or to grant or restore your access.`,stepFindProfile:`Administrators can find your profile with openclaw users list --json, then assign a role with users.setRole.`,stepReconnect:`This page reconnects on its own once access is granted.`},authRequired:{title:`This Gateway expects its token`,passwordTitle:`This Gateway expects its password`,summary:`The Gateway at {host} is reachable, but it needs a matching token or password before this browser can connect.`,stepPaste:`Paste the token from openclaw gateway auth-token --show into Gateway secret.`,stepPassword:`Type the configured Gateway password into Gateway secret.`,stepGenerate:`If no token is configured, run openclaw doctor --generate-gateway-token on the gateway host.`,stepConnect:`Click Connect again after updating the Gateway secret.`},authFailed:{title:`Gateway secret rejected`,summary:`{host} rejected the supplied Gateway secret. Check that it belongs to this Gateway and try again.`,stepDashboard:`Run openclaw dashboard --no-open for a fresh URL, or openclaw gateway auth-token --show to recover the token.`,stepReplace:`Replace the Gateway secret with the token for this Gateway URL.`},bootstrapInvalid:{title:`Pairing link is no longer valid`,summary:`This one-time dashboard link may have expired or already been used. Request a fresh link instead of changing the Gateway secret.`,stepOpen:`Open the fresh link that the command opens or copies in this browser. Pairing links can be used only once and expire after ten minutes.`,stepJson:`If the browser or clipboard is unavailable, run openclaw dashboard --json on the Gateway host and open its browserUrl in this browser.`},trustedProxy:{title:`Proxy authentication required`,summary:`The Gateway is reachable, but it rejected the proxy identity or forwarding information.`,stepSignIn:`Open the configured authenticated proxy or SSO dashboard URL and sign in there, rather than visiting the Gateway directly.`,stepHeaders:`Ask the Gateway administrator to check for missing identity headers and required-header forwarding on WebSocket upgrade requests, and confirm your account is permitted.`,stepNoToken:`A Gateway token cannot replace proxy authentication.`},rateLimited:{title:`Too many failed attempts`,summary:`The Gateway is temporarily limiting authentication attempts for this client.`,stepStop:`Stop retrying from this tab for a moment.`,stepWait:`Wait for the auth limiter to cool down, then reconnect with the corrected credential.`,stepCheckClients:`If this is a shared host, check other clients for repeated bad retries.`},pairing:{title:`Approve this browser`,scopeTitle:`Approve the new access level`,roleTitle:`Approve the new role`,metadataTitle:`Re-approve this browser`,summary:`This browser passed Gateway auth at {host}, but the Gateway has not seen it before. A one-time approval on the Gateway host finishes pairing.`,upgradeSummary:`This browser is already paired with {host}, but it asked for access it was not approved for. Approve the new request on the Gateway host.`,stepDashboard:`Prefer a link? Run openclaw dashboard on the Gateway host and open the one-time URL it prints in this browser.`,stepLatest:`That command prints the exact approve command for the newest pending request; run that one as well.`,stepReconnect:`Once approved, click Connect.`,waiting:`Waiting for approval… this page connects on its own once the request is approved.`,checkNow:`Check now`},insecure:{title:`Secure browser context required`,summary:`This page is running over plain HTTP, so the browser cannot create the device identity the Gateway expects.`,stepHttps:`Use HTTPS/Tailscale Serve, or open http://127.0.0.1:18789 on the Gateway host.`,stepAvoidDisable:`Do not use a remote plain-HTTP URL; a token or password cannot replace browser device identity.`},origin:{title:`Browser origin not allowed`,summary:`The Gateway rejected this page origin before accepting the Control UI connection.`,stepAllowedOrigins:`Add this browser origin to gateway.controlUi.allowedOrigins.`,stepFullOrigin:`Use full origins such as http://localhost:5173, not wildcard patterns.`,stepRestart:`Restart or reload the Gateway after changing allowed origins.`},protocol:{title:`Protocol mismatch`,summary:`The served Control UI and the running Gateway do not agree on the supported connection protocol.`,refresh:`Refresh page`,stepDashboard:`Reopen the served dashboard with openclaw dashboard so the UI and Gateway come from the same install.`,stepDevUi:`If using pnpm ui:dev, rebuild or restart the dev UI against the current checkout.`,stepRestart:`Restart the Gateway after updating OpenClaw so it serves the current protocol.`},network:{title:`Gateway unreachable`,summary:`The browser could not reach {host}. Check the address and transport before retrying credentials.`,stepGateway:`Confirm the Gateway is running with openclaw status or openclaw gateway run.`,stepUrl:`Check the Gateway URL and use wss:// when the Gateway is behind HTTPS/Tailscale Serve.`,stepDashboard:`Reopen the dashboard with openclaw dashboard --no-open to recopy the current URL and auth details.`}}}},R=Object.assign(()=>{Object.assign(ee.login,L.login)},{catalog:L})})))()}function B(e){let t=e.trim(),n=t.toLowerCase().startsWith(`oc-pair://`)?t.slice(10):t;if(!/^[A-Za-z0-9_-]+$/u.test(n))return`unknown`;try{let e=Uint8Array.from(atob(n.replace(/-/g,`+`).replace(/_/g,`/`)),e=>e.charCodeAt(0)),t=JSON.parse(new TextDecoder().decode(e));return typeof t==`object`&&t&&`url`in t&&typeof t.url==`string`&&t.url.trim()!==``&&`bootstrapToken`in t&&typeof t.bootstrapToken==`string`&&t.bootstrapToken.trim()!==``?`setup-code`:`unknown`}catch{return`unknown`}}function V(){return(V=e((()=>{})))()}function H(e){return e===r.AUTH_PASSWORD_MISSING||e===r.AUTH_PASSWORD_MISMATCH||e===r.AUTH_PASSWORD_NOT_CONFIGURED}function U(e){let t=e.docsHref??`https://docs.openclaw.ai/web/dashboard`,n=c(e.rawError);return{kind:e.kind,placement:e.placement??`status`,tone:e.tone??`danger`,field:e.field,title:f(e.titleKey,e.stepParams),summary:e.summaryKey?f(e.summaryKey,e.stepParams):n,primaryCommand:e.primaryCommand,refreshAction:e.refreshAction,steps:e.stepKeys.map(t=>typeof t==`string`?{text:f(t,e.stepParams),commands:[]}:{text:f(t.key,e.stepParams),commands:t.commands}),docsHref:t,rawError:n}}function W(e){if(e.connected||!e.lastError)return null;let t=e.lastError,i=e.lastErrorCode??null,a=n(t),s=h(e.gatewayUrl);if(i===`GATEWAY_BUSY`&&e.reconnectPending)return U({kind:`busy`,tone:`pending`,rawError:t,titleKey:`login.failure.busy.title`,summaryKey:`login.failure.busy.summary`,stepKeys:[]});if(i===r.AUTH_BOOTSTRAP_TOKEN_INVALID)return U({kind:`bootstrap-invalid`,tone:`warn`,rawError:t,titleKey:`login.failure.bootstrapInvalid.title`,summaryKey:`login.failure.bootstrapInvalid.summary`,primaryCommand:`openclaw dashboard`,stepKeys:[`login.failure.bootstrapInvalid.stepOpen`,{key:`login.failure.bootstrapInvalid.stepJson`,commands:[`openclaw dashboard --json`]}],docsHref:`https://docs.openclaw.ai/cli/dashboard`});if(i===r.AUTHENTICATED_PROFILE_UNAVAILABLE)return U({kind:`profile-unavailable`,tone:`pending`,rawError:t,titleKey:`login.failure.profileUnavailable.title`,stepKeys:[`login.failure.profileUnavailable.stepRetry`,`login.failure.profileUnavailable.stepAdmin`],docsHref:`https://docs.openclaw.ai/concepts/user-model#gateway-profile-and-github-credit`});if(i===r.AUTH_VERIFIED_USER_REQUIRED)return U({kind:`verified-user-required`,rawError:t,titleKey:`login.failure.verifiedUserRequired.title`,summaryKey:`login.failure.verifiedUserRequired.summary`,stepKeys:[`login.failure.verifiedUserRequired.stepIdentity`,`login.failure.verifiedUserRequired.stepSharedSecret`],docsHref:`https://docs.openclaw.ai/gateway/operator-scopes`});if(i===r.OPERATOR_ACCESS_DENIED)return U({kind:`access-denied`,tone:`warn`,rawError:t,titleKey:`login.failure.accessDenied.title`,summaryKey:`login.failure.accessDenied.summary`,stepKeys:[`login.failure.accessDenied.stepAdmin`,{key:`login.failure.accessDenied.stepFindProfile`,commands:[`openclaw users list --json`]},`login.failure.accessDenied.stepReconnect`],docsHref:`https://docs.openclaw.ai/gateway/operator-scopes#named-operator-roles`});if(i===r.CONTROL_UI_BUILD_MISMATCH)return U({kind:`build-mismatch`,tone:`pending`,rawError:t,titleKey:`chat.sidebar.serverUpdatedTitle`,summaryKey:`chat.sidebar.serverUpdatedRefresh`,refreshAction:{label:f(`login.failure.protocol.refresh`)},stepKeys:[],docsHref:`https://docs.openclaw.ai/web/control-ui`});let c=o(!1,t,i);if(c)return U({kind:`pairing-required`,tone:`pending`,rawError:t,docsHref:`https://docs.openclaw.ai/web/control-ui#device-pairing-first-connection`,titleKey:c.kind===`scope-upgrade-pending`?`login.failure.pairing.scopeTitle`:c.kind===`role-upgrade-pending`?`login.failure.pairing.roleTitle`:c.kind===`metadata-upgrade-pending`?`login.failure.pairing.metadataTitle`:`login.failure.pairing.title`,summaryKey:c.kind===`pairing-required`?`login.failure.pairing.summary`:`login.failure.pairing.upgradeSummary`,primaryCommand:c.requestId?`openclaw devices approve ${c.requestId}`:`openclaw devices approve --latest`,stepKeys:[...c.requestId?[]:[`login.failure.pairing.stepLatest`],{key:`login.failure.pairing.stepDashboard`,commands:[`openclaw dashboard`]},...e.reconnectPending?[]:[`login.failure.pairing.stepReconnect`]],stepParams:{host:s}});if(i===r.AUTH_RATE_LIMITED||a.includes(`too many failed authentication attempts`)||a.includes(`rate limit`))return U({kind:`auth-rate-limited`,tone:`warn`,rawError:t,titleKey:`login.failure.rateLimited.title`,summaryKey:`login.failure.rateLimited.summary`,stepKeys:[`login.failure.rateLimited.stepStop`,`login.failure.rateLimited.stepWait`,`login.failure.rateLimited.stepCheckClients`]});if(d(!1,t,i))return U({kind:`insecure-context`,rawError:t,docsHref:`https://docs.openclaw.ai/web/control-ui#insecure-http`,titleKey:`login.failure.insecure.title`,summaryKey:`login.failure.insecure.summary`,stepKeys:[`login.failure.insecure.stepHttps`,`login.failure.insecure.stepAvoidDisable`]});if(i===r.CONTROL_UI_ORIGIN_NOT_ALLOWED||a.includes(`origin not allowed`))return U({kind:`origin-not-allowed`,rawError:t,docsHref:`https://docs.openclaw.ai/web/control-ui/development#debugging%2Ftesting%3A-dev-server-%2B-remote-gateway`,titleKey:`login.failure.origin.title`,summaryKey:`login.failure.origin.summary`,stepKeys:[`login.failure.origin.stepAllowedOrigins`,`login.failure.origin.stepFullOrigin`,`login.failure.origin.stepRestart`]});if(a.includes(`protocol mismatch`))return U({kind:`protocol-mismatch`,rawError:t,docsHref:`https://docs.openclaw.ai/web/control-ui/development#debugging%2Ftesting%3A-dev-server-%2B-remote-gateway`,titleKey:`login.failure.protocol.title`,summaryKey:`login.failure.protocol.summary`,refreshAction:{label:f(`login.failure.protocol.refresh`)},stepKeys:[{key:`login.failure.protocol.stepDashboard`,commands:[`openclaw dashboard`]},{key:`login.failure.protocol.stepDevUi`,commands:[`pnpm ui:dev`]},`login.failure.protocol.stepRestart`]});let l=_(e),u=H(i);return U(l===`trusted-proxy`?{kind:`trusted-proxy`,rawError:t,titleKey:`login.failure.trustedProxy.title`,summaryKey:`login.failure.trustedProxy.summary`,stepKeys:[`login.failure.trustedProxy.stepSignIn`,`login.failure.trustedProxy.stepHeaders`,`login.failure.trustedProxy.stepNoToken`],docsHref:`https://docs.openclaw.ai/gateway/trusted-proxy-auth`}:l===`required`?{kind:`auth-required`,placement:`form`,tone:`warn`,field:`credential`,rawError:t,titleKey:u?`login.failure.authRequired.passwordTitle`:`login.failure.authRequired.title`,summaryKey:`login.failure.authRequired.summary`,stepKeys:u?[`login.failure.authRequired.stepPassword`,`login.failure.authRequired.stepConnect`]:[{key:`login.failure.authRequired.stepPaste`,commands:[`openclaw gateway auth-token --show`]},{key:`login.failure.authRequired.stepGenerate`,commands:[`openclaw doctor --generate-gateway-token`]},`login.failure.authRequired.stepConnect`],stepParams:{host:s}}:l===`failed`?{kind:`auth-failed`,placement:`form`,field:`credential`,rawError:t,titleKey:u?`login.failure.authRequired.passwordTitle`:i===r.AUTH_TOKEN_MISMATCH?`login.failure.authRequired.title`:`login.failure.authFailed.title`,summaryKey:(i===r.AUTH_TOKEN_MISMATCH||i===r.AUTH_PASSWORD_MISMATCH)&&B(e.secret??``)===`setup-code`?`login.setupCodeHint`:`login.failure.authFailed.summary`,stepKeys:u?[`login.failure.authRequired.stepPassword`,`login.failure.authRequired.stepConnect`]:[{key:`login.failure.authFailed.stepDashboard`,commands:[`openclaw dashboard --no-open`,`openclaw gateway auth-token --show`]},`login.failure.authFailed.stepReplace`],stepParams:{host:s}}:{kind:`network`,placement:`form`,tone:`warn`,field:`url`,rawError:t,titleKey:`login.failure.network.title`,summaryKey:`login.failure.network.summary`,stepKeys:[{key:`login.failure.network.stepGateway`,commands:[`openclaw status`,`openclaw gateway run`]},`login.failure.network.stepUrl`,{key:`login.failure.network.stepDashboard`,commands:[`openclaw dashboard --no-open`]}],stepParams:{host:s}})}function G(){return(G=e((()=>{i(),m(),s(),l()})))()}function K({text:e,commands:t}){let n=new Set(t),r=[...n].map(t=>[t,e.indexOf(t)]).toSorted(([e,t],[n,r])=>t-r||n.length-e.length),i=[],a=0;for(let[t,o]of r)o<a||(i.push(e.slice(a,o),F(t)),n.delete(t),a=o+t.length);i.push(e.slice(a));for(let e of n)i.push(` `,F(e));return i}function q(e){return e.steps.length===0?D:E`
    <ol class="login-gate__failure-steps">
      ${e.steps.map(e=>E`<li>${K(e)}</li>`)}
    </ol>
  `}function J(e){return E`
    <footer class="login-gate__foot">
      <details class="login-gate__failure-detail">
        <summary>${f(`login.failure.rawError`)}</summary>
        <div class="login-gate__failure-raw mono">${e.rawError}</div>
      </details>
      <a
        class="session-link login-gate__failure-docs"
        href=${e.docsHref}
        target=${P}
        rel=${j()}
        >${f(`common.learnMore`)}</a
      >
    </footer>
  `}function se(e,t){return e.refreshAction?E`
    <button
      type="button"
      class="btn primary login-gate__failure-refresh"
      ?disabled=${t.state===`pending`}
      @click=${t.onRefresh}
    >
      ${t.state===`pending`?f(`common.refreshing`):t.state===`failed`?f(`common.retry`):e.refreshAction.label}
    </button>
  `:D}function ce(e,t,n){let[r,i,a]=t;return E`
    <openclaw-tooltip .content=${e?i:r}>
      <button
        type="button"
        class="settings-secret__toggle"
        aria-label=${a}
        aria-pressed=${e}
        @click=${n}
      >
        ${e?C.eye:C.eyeOff}
      </button>
    </openclaw-tooltip>
  `}function Y(e){let{props:t,feedback:n}=e,r=B(t.secret)===`setup-code`,i=n?.placement===`form`?n.field:void 0,a=e=>{e.key===`Enter`&&t.onConnect()};return E`
    <div class="login-gate__form">
      <div class="field">
        <label for="login-gate-url">${f(`login.gatewayUrl`)}</label>
        <input
          id="login-gate-url"
          inputmode="url"
          autocapitalize="none"
          autocorrect="off"
          autocomplete="off"
          spellcheck="false"
          enterkeyhint="go"
          aria-invalid=${i===`url`?`true`:D}
          .value=${t.gatewayUrl}
          @input=${e=>{t.onGatewayUrlChange(e.target.value)}}
          @keydown=${a}
          placeholder="wss://gateway.example:443"
        />
      </div>
      <div class="field">
        <label for="login-gate-credential">${f(`login.secret`)}</label>
        <span class="settings-secret">
          <input
            id="login-gate-credential"
            type=${t.showGatewaySecret?`text`:`password`}
            autocomplete="off"
            spellcheck="false"
            enterkeyhint="go"
            aria-invalid=${i===`credential`?`true`:D}
            aria-describedby=${r?`login-gate-secret-hint`:D}
            .value=${t.secret}
            @input=${e=>{t.onSecretChange(e.target.value)}}
            @keydown=${a}
            placeholder=${f(`login.secretPlaceholder`)}
          />
          ${ce(t.showGatewaySecret,[f(`login.showSecret`),f(`login.hideSecret`),f(`login.toggleSecretVisibility`)],t.onToggleGatewaySecret)}
        </span>
        ${r?E`<p id="login-gate-secret-hint" class="muted" role="status">${f(`login.setupCodeHint`)}</p>`:D}
      </div>
      ${e.withSubmit?E`
              <button class="btn primary login-gate__connect" @click=${t.onConnect}>
                ${f(`common.connect`)}
              </button>
            `:D}
    </div>
  `}function le(e){let t=h(e.gatewayUrl),n=e.secret.trim()?f(`login.connection.secretEntered`):f(`login.connection.noSecret`);return E`
    <summary>
      <span class="login-gate__connection-target">
        ${C.server}
        <span>${f(`login.connection.target`,{host:t})}</span>
      </span>
      <span class="login-gate__connection-cred">· ${n}</span>
      <span class="login-gate__connection-change">${f(`login.connection.change`)}</span>
    </summary>
  `}function X(e){let{props:t,feedback:n}=e,r=n.kind===`pairing-required`&&t.reconnectPending,i=Math.max(0,Math.ceil(((t.reconnectAt??0)-Date.now())/1e3));return E`
    <section
      class="login-gate__body login-gate__failure"
      role="status"
      aria-live="polite"
      data-kind=${n.kind}
      data-tone=${n.tone}
    >
      <div class="login-gate__status-head">
        <span class="login-gate__status-icon" aria-hidden="true">${Z[n.tone]}</span>
        <div class="login-gate__status-text">
          <h1 class="login-gate__failure-title">${n.title}</h1>
          <p class="login-gate__failure-summary">${n.summary}</p>
        </div>
      </div>
      ${n.primaryCommand?E`
              <div class="login-gate__hero">
                <span class="login-gate__hero-label">${f(`login.runOnHost`)}</span>
                ${F(n.primaryCommand,`hero`)}
              </div>
            `:D}
      ${q(n)}
      ${n.kind===`busy`?E`
              <p class="login-gate__retry" aria-live="off">
                ${i>0?f(`login.failure.busy.countdown`,{seconds:String(i)}):f(`login.failure.busy.retrying`)}
              </p>
            `:D}
      ${r?E`<p class="login-gate__failure-summary">
              <span class="session-run-spinner" aria-hidden="true"></span>
              ${f(`login.failure.pairing.waiting`)}
            </p>`:D}
      <div class="login-gate__actions">
        ${se(n,e.refreshAction)}
        <button class="btn login-gate__connect" @click=${t.onConnect}>
          ${f(r?`login.failure.pairing.checkNow`:`common.connect`)}
        </button>
      </div>
      <details class="login-gate__connection">
        ${le(t)} ${Y({...e,withSubmit:!1})}
      </details>
      ${J(n)}
    </section>
  `}function ue(e){let{feedback:t}=e;return E`
    <section
      class=${t?`login-gate__body login-gate__failure`:`login-gate__body`}
      role=${t?`status`:D}
      aria-live=${t?`polite`:D}
      data-kind=${t?.kind??D}
      data-tone=${t?.tone??D}
    >
      <div class="login-gate__status-text">
        <h1 class=${t?`login-gate__failure-title`:`login-gate__heading`}>
          ${t?.title??f(`login.heading`)}
        </h1>
        <p class=${t?`login-gate__failure-summary`:`login-gate__lede`}>
          ${t?.summary??f(`login.lede`)}
        </p>
      </div>
      ${Y({...e,withSubmit:!0})}
      ${t?E`${q(t)} ${J(t)}`:E`
              <details class="login-gate__help">
                <summary class="login-gate__help-title">${f(`connection.help.title`)}</summary>
                <ol class="login-gate__steps">
                  <li>
                    ${f(`connection.help.step1`)}${F(`openclaw gateway run`)}
                  </li>
                  <li>
                    ${f(`connection.help.step2`)} ${F(`openclaw dashboard`)}
                  </li>
                  <li>${f(`connection.help.step3`)}</li>
                </ol>
                <div class="login-gate__docs">
                  <a
                    class="session-link"
                    href="https://docs.openclaw.ai/web/dashboard"
                    target=${P}
                    rel=${j()}
                    >${f(`connection.help.docsLink`)}</a
                  >
                </div>
              </details>
            `}
    </section>
  `}function de(e,n){let r=t(e.resourceBasePath),i=x(`favicon.svg`,r),a=W(e),o=a?.placement===`status`?X({props:e,feedback:a,refreshAction:n}):ue({props:e,feedback:a});return E`
    <div
      class="login-gate"
      @mousedown=${e=>{e.target===e.currentTarget&&T(e)}}
    >
      <openclaw-toast-host></openclaw-toast-host>
      <div class="login-gate__card" data-mode=${a?.placement??`form`}>
        <header class="login-gate__brand">
          ${e.mascot===`none`?E`<span class="login-gate__logo login-gate__logo--neutral" aria-hidden="true"
                  >${C.mark}</span
                >`:E`<img class="login-gate__logo" src=${i} alt="" />`}
          <span class="login-gate__brand-name">OpenClaw</span>
        </header>
        ${o}
        ${e.onOpenGatewaySettings?E`<footer class="login-gate__recovery">
                <button type="button" class="btn btn--ghost" @click=${e.onOpenGatewaySettings}>
                  ${f(`login.gatewaySettings`)}
                </button>
              </footer>`:D}
      </div>
    </div>
  `}var Z,Q;function $(){return($=e((()=>{ae(),O(),ne(),ie(),re(),v(),b(),m(),u(),z(),N(),l(),p(),M(),I(),w(),G(),R(),Z={pending:C.shieldEllipsis,warn:C.clock,danger:C.shieldAlert},Q=class extends te{constructor(...e){super(...e),this.refreshState=`idle`,this.retryCountdown=new A(this,1e3,()=>this.requestUpdate(),!1,`visible`)}ownsRefresh(e){let t=this.props;return this.refreshAttempt===e&&this.isConnected&&t!==void 0&&!t.connected&&!t.reconnectPending&&[`lastError`,`lastErrorCode`,`lastErrorAuthReason`,`gatewayUrl`,`resourceBasePath`,`secret`].every(n=>t[n]===e.props[n])}cancelRefresh(){this.refreshAttempt=void 0,this.refreshState=`idle`}willUpdate(){this.props?.reconnectPending&&this.props.lastErrorCode===`GATEWAY_BUSY`&&(this.props.reconnectAt??0)>Date.now()?this.retryCountdown.start():this.retryCountdown.stop(),this.refreshAttempt&&!this.ownsRefresh(this.refreshAttempt)&&this.cancelRefresh()}disconnectedCallback(){this.cancelRefresh(),super.disconnectedCallback()}async refreshPage(){let e=this.props;if(!e||this.refreshAttempt||this.refreshState===`pending`||!this.isConnected||e.connected||e.reconnectPending||!W(e)?.refreshAction||!S(!0))return;let t={props:e};this.refreshAttempt=t,this.refreshState=`pending`;try{let e=await y({canReload:()=>this.ownsRefresh(t)});this.ownsRefresh(t)&&!e&&(this.refreshState=`failed`)}catch{this.ownsRefresh(t)&&(this.refreshState=`failed`)}finally{this.refreshAttempt===t&&(this.ownsRefresh(t)?this.refreshAttempt=void 0:this.cancelRefresh())}}render(){let e=this.props;return e?de({...e,onConnect:()=>{this.cancelRefresh(),e.onConnect()},onGatewayUrlChange:t=>{this.cancelRefresh(),e.onGatewayUrlChange(t)},onSecretChange:t=>{this.cancelRefresh(),e.onSecretChange(t)}},{state:this.refreshState,onRefresh:()=>void this.refreshPage()}):D}},a([k({attribute:!1})],Q.prototype,`props`,void 0),a([oe()],Q.prototype,`refreshState`,void 0),customElements.get(`openclaw-login-gate`)||customElements.define(`openclaw-login-gate`,Q)})))()}export{R as a,z as i,B as n,V as r,$ as t};