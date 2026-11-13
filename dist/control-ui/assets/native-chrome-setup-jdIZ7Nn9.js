import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,qr as n,zr as r}from"./control-ui-foundation-C3MHh_P-.js";import{cc as i,hu as a,lu as o,sc as s,su as c,uu as l}from"./control-ui-core-pYNj5S1a.js";import{vi as u,yi as d}from"./control-ui-core-D6clmJs8.js";import{$ as f,X as p,Y as m,ct as h,nt as g,ut as _}from"./lit-runtime-DZL1fcCI.js";import{n as v,t as y}from"./en-settings-DlF4_5vi.js";function b({result:e,legacyResult:t,running:n,failed:r}){if(r===`inspection`)return f`<p role="status">${a(`configPage.deviceSettings.chromeExtensionUnknown`)}</p>
      <p>${a(`configPage.deviceSettings.chromeExtensionStatusFailed`)}</p>`;if(n||r)return f`<p role="status">
      ${a(n?`configPage.deviceSettings.chromeExtensionPreparing`:`configPage.deviceSettings.chromeExtensionFailed`)}
    </p>`;let i=e?.installation??t;if(!i)return p;let o=(i.installedProfiles??i.discoveredProfiles)>0;return f`
    <p role="status">
      ${a(o?`configPage.deviceSettings.chromeExtensionDetected`:i.installedProfiles===void 0?`configPage.deviceSettings.chromeExtensionUnknown`:`configPage.deviceSettings.chromeExtensionNotInstalled`)}
    </p>
    ${o&&i.discoveredProfiles===0?f`<p>${a(`configPage.deviceSettings.chromeExtensionEnableHint`)}</p>`:p}
    ${e?f`
            <p role="status">
              ${a(`configPage.deviceSettings.chromeExtensionPhases.${e.phase}`)}
            </p>
            <p>
              ${a(`configPage.deviceSettings.chromeExtensionTarget`,{hostname:e.target.hostname,profile:e.target.profile,port:String(e.target.relayPort)})}
            </p>
            ${e.nextAction===`none`?p:f`<p>${a(`configPage.deviceSettings.chromeExtensionNextActions.${e.nextAction}`)}</p>`}
            ${e.connection.state===`connected`?f`<p>${a(`configPage.deviceSettings.chromeExtensionTabsHint`)}</p>`:p}
          `:f`
            <p>
              ${a(i.nativeHostRegistered?`configPage.deviceSettings.chromeExtensionPhases.waiting_for_connection`:`configPage.deviceSettings.chromeExtensionFailed`)}
            </p>
            ${!i.nativeHostRegistered||o?p:f`<p>${a(i.installRequested?`configPage.deviceSettings.chromeExtensionNextActions.open_chrome`:i.installedProfiles===void 0?`configPage.deviceSettings.chromeExtensionStatusUnsupported`:`configPage.deviceSettings.chromeExtensionNextActions.install_from_store`)}</p>`}
          `}
  `}function x(){return(x=e((()=>{m(),l(),y(),v()})))()}var S;function C(){return(C=e((()=>{t(),m(),g(),d(),l(),o(),i(),x(),S=class extends c{constructor(...e){super(...e),this.autoInspect=!1,this.running=!1,this.failed=null,this.result=null,this.legacyResult=null,this.generation=0,this.subscriptions=new s(this).watch(()=>this.context?.nativeDeviceSettings,(e,t)=>e.subscribe(t)).effect(()=>this.context?.nativeDeviceSettings,()=>()=>this.reset()).effect(()=>this.autoInspect&&this.capability?.snapshot?.browser?this.capability:void 0,()=>{let e=()=>void this.setup(`inspect`);return window.addEventListener(`focus`,e),e(),()=>{window.removeEventListener(`focus`,e),this.reset()}})}disconnectedCallback(){this.reset(),this.subscriptions.clear(),super.disconnectedCallback()}get capability(){return this.context?.nativeDeviceSettings}get actions(){let e=this.capability,t=e?.snapshot?.browser;return!e||!t?[]:t.chromeSetupActions?t.chromeSetupActions:e.snapshot?.device.platform===`macos`?[...e.installChromeExtension?[`install`]:[],...this.autoInspect&&e.chromeExtensionStatus?[`inspect`]:[]]:[]}get needsInstall(){let e=this.result?.installation??this.legacyResult;return!e||!e.nativeHostRegistered||(e.installedProfiles??e.discoveredProfiles)===0}reset(){this.generation+=1,this.running=!1,this.failed=null,this.result=null,this.legacyResult=null}async setup(e){let t=this.capability;if(!this.isConnected||!t||this.running||!this.actions.includes(e))return;let n=++this.generation,r=()=>this.isConnected&&this.capability===t&&this.generation===n;this.running=!0,this.failed=null,this.result=null,this.legacyResult=null;try{if(t.snapshot?.browser?.chromeSetupActions===void 0){let n;if(e===`inspect`&&t.chromeExtensionStatus)n=await t.chromeExtensionStatus();else if(e===`install`&&t.installChromeExtension)n=await t.installChromeExtension();else return;r()&&this.actions.includes(e)&&(this.legacyResult=n)}else{let n=await t.setupChromeExtension(e);r()&&this.actions.includes(e)&&(this.result=n)}}catch{r()&&(this.failed=this.autoInspect&&e===`inspect`?`inspection`:`setup`)}finally{r()&&(this.running=!1)}}render(){return this.capability?.snapshot?.browser?f`
      <div class="native-chrome-setup">
        <p>${a(`configPage.deviceSettings.chromeExtensionHint`)}</p>
        <div class="native-chrome-setup__actions">
          ${[[`install`,`chromeExtensionSetup`],[`inspect`,`chromeExtensionRefresh`],[`verify`,`chromeExtensionVerify`]].filter(([e])=>this.actions.includes(e)&&(e!==`install`||!this.autoInspect||this.needsInstall)).map(([e,t])=>f`
                <button
                  type="button"
                  class="btn"
                  ?disabled=${this.running}
                  @click=${()=>this.setup(e)}
                >
                  ${a(`configPage.deviceSettings.${t}`)}
                </button>
              `)}
        </div>
        ${b({result:this.result,legacyResult:this.legacyResult,running:this.running,failed:this.failed})}
      </div>
    `:p}},n([r({context:u,subscribe:!0})],S.prototype,`context`,void 0),n([_({type:Boolean,attribute:`auto-inspect`})],S.prototype,`autoInspect`,void 0),n([h()],S.prototype,`running`,void 0),n([h()],S.prototype,`failed`,void 0),n([h()],S.prototype,`result`,void 0),n([h()],S.prototype,`legacyResult`,void 0),customElements.get(`openclaw-native-chrome-setup`)||customElements.define(`openclaw-native-chrome-setup`,S)})))()}export{C as t};