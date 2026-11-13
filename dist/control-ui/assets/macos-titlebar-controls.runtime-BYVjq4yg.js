import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{Ql as n,Zl as r,eu as i,hu as a,lu as o,ou as s,uu as c}from"./control-ui-core-pYNj5S1a.js";import{Gi as l,Ji as u,Wi as d,Xi as f,Zi as p,ca as m,qi as h,ua as g,wi as _}from"./control-ui-core-D6clmJs8.js";import{$ as v,X as y,Y as b,nt as x,ut as S}from"./lit-runtime-DZL1fcCI.js";var C;function w(){return(w=e((()=>{b(),x(),g(),c(),i(),o(),p(),d(),_(),C=class extends s{constructor(...e){super(...e),this.navCollapsed=!1,this.historyOnly=!1,this.canGoBack=!1,this.canGoForward=!1}render(){let e=this.navCollapsed?a(`nav.expand`):a(`nav.collapse`);return v`
      <nav class="macos-titlebar-controls" @mousedown=${m}>
        ${this.historyOnly?y:this.renderButton({label:e,icon:this.navCollapsed?f.panelLeftOpen:f.panelLeftClose,ariaExpanded:!this.navCollapsed,onClick:this.onToggleSidebar,className:`macos-titlebar-controls__sidebar-toggle`})}
        ${this.renderButton({label:a(`nav.back`),icon:f.chevronLeft,disabled:!this.canGoBack,onClick:()=>globalThis.history.back(),className:`macos-titlebar-controls__back`})}
        ${this.renderButton({label:a(`nav.forward`),icon:f.chevronRight,disabled:!this.canGoForward,onClick:()=>globalThis.history.forward(),className:`macos-titlebar-controls__forward`})}
        ${this.historyOnly?y:v`
                ${this.renderButton({label:a(`chat.openCommandPalette`),tooltip:a(`chat.commandPaletteTitle`),tooltipTemplate:u(a(`chat.commandPaletteTitle`).replace(`⌘K`,`{shortcut}`),l([`⌘`,`K`],{inline:!0})),icon:f.search,onClick:this.onOpenPalette,className:`macos-titlebar-controls__search`})}
                ${this.navCollapsed?this.renderButton({label:a(`chat.runControls.newSession`),tooltip:this.newSessionDisabledReason??`${a(`chat.runControls.newSession`)} (${n(r.newSession)})`,tooltipTemplate:this.newSessionDisabledReason==null?h(a(`chat.runControls.newSession`),r.newSession):void 0,icon:f.plus,disabled:!!this.newSessionDisabledReason,onClick:this.onOpenNewSession,className:`macos-titlebar-controls__new-session`}):y}
              `}
      </nav>
    `}renderButton(e){return v`
      <openclaw-tooltip
        .content=${e.tooltip??e.label}
        .contentTemplate=${e.tooltipTemplate}
      >
        <button
          type="button"
          class="topbar-icon-btn macos-titlebar-controls__button ${e.className}"
          aria-label=${e.label}
          aria-expanded=${e.ariaExpanded===void 0?y:String(e.ariaExpanded)}
          ?disabled=${e.disabled||!e.onClick}
          @click=${e.onClick}
        >
          ${e.icon}
        </button>
      </openclaw-tooltip>
    `}},t([S({attribute:!1})],C.prototype,`navCollapsed`,void 0),t([S({attribute:!1})],C.prototype,`historyOnly`,void 0),t([S({attribute:!1})],C.prototype,`canGoBack`,void 0),t([S({attribute:!1})],C.prototype,`canGoForward`,void 0),t([S({attribute:!1})],C.prototype,`newSessionDisabledReason`,void 0),t([S({attribute:!1})],C.prototype,`onToggleSidebar`,void 0),t([S({attribute:!1})],C.prototype,`onOpenPalette`,void 0),t([S({attribute:!1})],C.prototype,`onOpenNewSession`,void 0),customElements.get(`openclaw-macos-titlebar-controls`)||customElements.define(`openclaw-macos-titlebar-controls`,C)})))()}w();