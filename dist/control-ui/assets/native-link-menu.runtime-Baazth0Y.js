import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{hu as n,li as r,lu as i,su as a,ui as o,uu as s}from"./control-ui-core-pYNj5S1a.js";import{Xi as c,Zi as l}from"./control-ui-core-D6clmJs8.js";import{$ as u,Y as d,nt as f,ut as p}from"./lit-runtime-DZL1fcCI.js";import{Ca as m,Oa as h,Sa as g,Ya as _,ba as v,ka as y,wa as b,xa as x}from"./control-ui-boot-shared-DJ4XCcp6.js";function S(e){let t=e.find(e=>e instanceof HTMLElement&&e.localName===`openclaw-modal-dialog`);if(t instanceof HTMLElement)return t;for(let t of e)if(t instanceof HTMLDialogElement&&t.open&&t.getRootNode()===document)return t;return document.body}function C(e){let t=S(e.path);if(!t.isConnected)return null;let n=document.createElement(`openclaw-native-link-menu`);return n.x=e.x,n.y=e.y,n.trigger=e.anchor,n.onClose=()=>e.close(n),n.onAction=t=>{t===`copy`?r(e.url.href):t===`inline`?e.openInline():e.openExternal()},t.append(n),x(n),n}var w;function T(){return(T=e((()=>{d(),f(),s(),o(),i(),y(),l(),m(),v(),_(),w=class extends a{constructor(...e){super(...e),this.x=0,this.y=0,this.trigger=null,this.onAction=()=>{},this.onClose=()=>{},this.menuLifecycle=new h(this,{getTrigger:()=>this.trigger,onClose:()=>this.onClose(),onKeydown:e=>g(this,e)})}runAction(e){this.onClose(),this.onAction(e)}render(){let e=Math.max(8,Math.min(this.x,window.innerWidth-264-8)),t=Math.max(8,Math.min(this.y,window.innerHeight-136-8));return u`
      <wa-dropdown
        class="session-menu native-link-menu"
        .open=${!0}
        placement="bottom-start"
        .distance=${0}
        aria-label=${n(`nativeLinkMenu.label`)}
        @wa-select=${e=>{e.preventDefault();let t=e.detail.item.value;t&&(this.trigger?.focus(),this.runAction(t))}}
        @wa-after-hide=${()=>{this.onClose()}}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${n(`nativeLinkMenu.label`)}
          style="position: fixed; left: ${e}px; top: ${t}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        <wa-dropdown-item
          class="session-menu__item"
          value="inline"
          data-shortcut="s"
          aria-keyshortcuts="S"
        >
          <span slot="icon" class="session-menu__icon" aria-hidden="true"
            >${c.panelRightOpen}</span
          >
          <span class="session-menu__text">${n(`nativeLinkMenu.openInline`)}</span>
          ${b(`s`)}
        </wa-dropdown-item>
        <wa-dropdown-item
          class="session-menu__item"
          value="external"
          data-new-tab-action
          data-shortcut="b"
          aria-keyshortcuts="B"
        >
          <span slot="icon" class="session-menu__icon" aria-hidden="true"
            >${c.externalLink}</span
          >
          <span class="session-menu__text">${n(`nativeLinkMenu.openExternal`)}</span>
          ${b(`b`)}
        </wa-dropdown-item>
        <div class="session-menu__separator" role="separator"></div>
        <wa-dropdown-item
          class="session-menu__item"
          value="copy"
          data-shortcut="c"
          aria-keyshortcuts="C"
        >
          <span slot="icon" class="session-menu__icon" aria-hidden="true">${c.copy}</span>
          <span class="session-menu__text">${n(`nativeLinkMenu.copy`)}</span>
          ${b(`c`)}
        </wa-dropdown-item>
      </wa-dropdown>
    `}},t([p({attribute:!1})],w.prototype,`x`,void 0),t([p({attribute:!1})],w.prototype,`y`,void 0),t([p({attribute:!1})],w.prototype,`trigger`,void 0),t([p({attribute:!1})],w.prototype,`onAction`,void 0),t([p({attribute:!1})],w.prototype,`onClose`,void 0),customElements.get(`openclaw-native-link-menu`)||customElements.define(`openclaw-native-link-menu`,w)})))()}T();export{w as NativeLinkMenu,C as mountNativeLinkMenu};