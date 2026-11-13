import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{qr as t}from"./control-ui-foundation-C3MHh_P-.js";import{cu as n,lu as r,su as i}from"./control-ui-core-pYNj5S1a.js";import{$ as a,Y as o,ct as s,mt as c,nt as l,ut as u}from"./lit-runtime-DZL1fcCI.js";import{at as d,rt as f}from"./control-ui-boot-shared-CES8Ypkl.js";import{_a as p,ga as m,ha as h,va as g,ya as _}from"./control-ui-boot-shared-DJ4XCcp6.js";import"./control-ui-boot-shared-DCY2wZcy.js";var v,y;function b(){return(b=e((()=>{o(),l(),f(),r(),g(),m(),v=class extends i{constructor(...e){super(...e),this.mode=`grid`,this.customIcon=``}select(e,t){this.props.disabled||this.props.onChange({icon:e,color:t})}showGrid(){this.mode=`grid`,this.customIcon=``,this.updateComplete.then(()=>{this.isConnected&&this.querySelector(`.session-menu__icon-choice--custom`)?.focus()})}render(){return p({inline:!0,clearable:this.props.clearable,mode:this.mode,currentIcon:this.props.icon,currentColor:this.props.color,disabled:this.props.disabled??!1,colorDisabled:this.props.disabled??!1,customIconValue:this.customIcon,onSelectColor:(e,t)=>this.select(this.props.icon,t),onSelect:(e,t)=>this.select(t,this.props.color),onReset:()=>this.select(null,null),onShowCustom:()=>{this.mode=`custom`,this.customIcon=``,this.updateComplete.then(()=>{this.isConnected&&this.querySelector(`.session-menu__icon-custom-input`)?.focus()})},onBack:()=>this.showGrid(),onInput:e=>{e.currentTarget instanceof HTMLTextAreaElement&&(this.customIcon=e.currentTarget.value)},onApply:()=>{let e=d(this.customIcon);e&&!this.props.disabled&&(this.select(e,this.props.color),this.showGrid())},onGridKeydown:h})}},t([u({attribute:!1})],v.prototype,`props`,void 0),t([s()],v.prototype,`mode`,void 0),t([s()],v.prototype,`customIcon`,void 0),y=class extends n{static{this.styles=c`
    :host {
      color: var(--appearance-color, inherit);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
    }
    svg,
    img {
      width: 100%;
      height: 100%;
    }
    img {
      object-fit: contain;
    }
  `}render(){let e=this.props.icon?.trim();return a`${e?_(e)??e:this.props.fallback}`}},t([u({attribute:!1})],y.prototype,`props`,void 0),customElements.get(`openclaw-appearance-picker`)||customElements.define(`openclaw-appearance-picker`,v),customElements.get(`openclaw-appearance-glyph`)||customElements.define(`openclaw-appearance-glyph`,y)})))()}b();export{y as AppearanceGlyph,v as AppearancePicker};