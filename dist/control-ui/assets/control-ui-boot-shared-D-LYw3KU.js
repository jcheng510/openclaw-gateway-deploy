import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{An as t,Bn as n,Fn as r,Gn as i,Hn as a,Jn as o,Kn as s,Ln as c,Mn as l,Nn as u,Pn as d,Qn as f,Rn as p,Un as m,Vn as h,Wn as g,Xn as _,Yn as v,Zn as y,_r as b,ar as x,cr as S,dr as C,er as w,fr as T,gr as E,hr as D,ir as O,jn as k,lr as ee,mr as te,or as ne,pr as re,qn as A,rr as ie,sr as ae,tr as oe,ur as se,vr as ce,zn as le}from"./control-ui-foundation-C3MHh_P-.js";import{$ as j,B as ue,C as de,D as M,E as fe,I as pe,K as me,L as he,Q as ge,R as _e,T as ve,U as ye,Y as N,at as P,ct as be,dt as xe,et as Se,ft as Ce,i as we,mt as F,nt as I,o as Te,ut as L,vt as R}from"./lit-runtime-DZL1fcCI.js";import{ft as Ee,pt as De}from"./control-ui-boot-shared-C-yZTZmO.js";var Oe;function ke(){return(ke=e((()=>{N(),Oe=F`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    /* Inset box-shadow, not a border: Safari seams a clip-path edge that runs along a border. */
    &::part(arrow) {
      box-shadow: inset calc(-1 * var(--wa-tooltip-border-width)) calc(-1 * var(--wa-tooltip-border-width)) 0 0
        var(--wa-tooltip-border-color);
    }
  }
`})))()}var Ae;function je(){return(je=e((()=>{Ae=class extends Event{constructor(){super(`wa-reposition`,{bubbles:!0,cancelable:!1,composed:!0})}}})))()}var Me;function Ne(){return(Ne=e((()=>{N(),Me=F`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`})))()}function Pe(e,t,n){return z(e,Ze(t,n))}function Fe(e,t){return typeof e==`function`?e(t):e}function Ie(e){return e.split(`-`)[0]}function Le(e){return e.split(`-`)[1]}function Re(e){return e===`x`?`y`:`x`}function ze(e){return e===`y`?`height`:`width`}function Be(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function Ve(e){return Re(Be(e))}function He(e,t,n){n===void 0&&(n=!1);let r=Le(e),i=Ve(e),a=ze(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=qe(o)),[o,qe(o)]}function Ue(e){let t=qe(e);return[We(e),t,We(t)]}function We(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}function Ge(e,t,n){switch(e){case`top`:case`bottom`:return n?t?nt:tt:t?tt:nt;case`left`:case`right`:return t?rt:it;default:return[]}}function Ke(e,t,n,r){let i=Le(e),a=Ge(Ie(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(We)))),a}function qe(e){let t=Ie(e);return et[t]+e.slice(t.length)}function Je(e){return{top:e.top??0,right:e.right??0,bottom:e.bottom??0,left:e.left??0}}function Ye(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Je(e)}function Xe(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}var Ze,z,Qe,$e,B,et,tt,nt,rt,it;function at(){return(at=e((()=>{Ze=Math.min,z=Math.max,Qe=Math.round,$e=Math.floor,B=e=>({x:e,y:e}),et={left:`right`,right:`left`,bottom:`top`,top:`bottom`},tt=[`left`,`right`],nt=[`right`,`left`],rt=[`top`,`bottom`],it=[`bottom`,`top`]})))()}function ot(e,t,n){let{reference:r,floating:i}=e,a=Be(t),o=Ve(t),s=ze(o),c=Ie(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}let m=Le(t);return m&&(p[o]+=f*(m===`end`?1:-1)*(n&&l?-1:1)),p}async function st(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=Fe(t,e),p=Ye(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Xe(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Xe(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}async function ct(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Ie(n),s=Le(n),c=Be(n)===`y`,l=pt.has(o)?-1:1,u=a&&c?-1:1,d=Fe(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var lt,ut,dt,ft,pt,mt,ht,gt;function _t(){return(_t=e((()=>{at(),lt=50,ut=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:st},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=ot(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<lt&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=ot(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},dt=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=Fe(e,t)||{};if(l==null)return{};let d=Ye(u),f={x:n,y:r},p=Ve(i),m=ze(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=Ze(d[_],T),D=Ze(d[v],T),O=C-h[m]-D,k=C/2-h[m]/2+w,ee=Pe(E,k,O),te=!c.arrow&&Le(i)!=null&&k!==ee&&a.reference[m]/2-(k<E?E:D)-h[m]/2<0,ne=te?k<E?k-E:k-O:0;return{[p]:f[p]+ne,data:{[p]:ee,centerOffset:k-ee-ne,...te&&{alignmentOffset:ne}},reset:te}}}),ft=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=Fe(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Ie(r),_=Be(o),v=Ie(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[qe(o)]:Ue(o)),x=p!==`none`;!d&&x&&b.push(...Ke(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=He(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===Be(t)||T.every(e=>Be(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=Be(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}},pt=new Set([`left`,`top`]),mt=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await ct(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},ht=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Fe(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Be(i),p=Re(f),m=u[p],h=u[f],g=(e,t)=>Pe(t+d[e===`y`?`top`:`left`],t,t-d[e===`y`?`bottom`:`right`]);o&&(m=g(p,m)),s&&(h=g(f,h));let _=c.fn({...t,[p]:m,[f]:h});return{..._,data:{x:_.x-n,y:_.y-r,enabled:{[p]:o,[f]:s}}}}}},gt=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){let{placement:n,rects:r,platform:i,elements:a}=t,{apply:o=()=>{},...s}=Fe(e,t),c=await i.detectOverflow(t,s),l=Ie(n),u=Le(n),d=Be(n)===`y`,{width:f,height:p}=r.floating,m,h;l===`top`||l===`bottom`?(m=l,h=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?`start`:`end`)?`left`:`right`):(h=l,m=u===`end`?`top`:`bottom`);let g=p-c.top-c.bottom,_=f-c.left-c.right,v=Ze(p-c[m],g),y=Ze(f-c[h],_),b=t.middlewareData.shift,x=!b,S=v,C=y;b!=null&&b.enabled.x&&(C=_),b!=null&&b.enabled.y&&(S=g),x&&!u&&(d?C=f-2*z(c.left,c.right):S=p-2*z(c.top,c.bottom)),await o({...t,availableWidth:C,availableHeight:S});let w=await i.getDimensions(a.floating);return f!==w.width||p!==w.height?{reset:{rects:!0}}:{}}}}})))()}function vt(){return typeof window<`u`}function yt(e){return xt(e)?(e.nodeName||``).toLowerCase():`#document`}function V(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function bt(e){return((xt(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function xt(e){return vt()?e instanceof Node||e instanceof V(e).Node:!1}function H(e){return vt()?e instanceof Element||e instanceof V(e).Element:!1}function St(e){return vt()?e instanceof HTMLElement||e instanceof V(e).HTMLElement:!1}function Ct(e){return!vt()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof V(e).ShadowRoot}function wt(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=jt(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function Tt(e){return/^(table|td|th)$/.test(yt(e))}function Et(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}function Dt(e){let t=H(e)?jt(e):e;return zt(t.transform)||zt(t.translate)||zt(t.scale)||zt(t.rotate)||zt(t.perspective)||!kt()&&(zt(t.backdropFilter)||zt(t.filter))||Lt.test(t.willChange||``)||Rt.test(t.contain||``)}function Ot(e){let t=Nt(e);for(;St(t)&&!At(t);){if(Dt(t))return t;if(Et(t))return null;t=Nt(t)}return null}function kt(){return Bt??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),Bt}function At(e){return/^(html|body|#document)$/.test(yt(e))}function jt(e){return V(e).getComputedStyle(e)}function Mt(e){return H(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Nt(e){if(yt(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||Ct(e)&&e.host||bt(e);return Ct(t)?t.host:t}function Pt(e){let t=Nt(e);return At(t)?(e.ownerDocument||e).body:St(t)&&wt(t)?t:Pt(t)}function Ft(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Pt(e),i=r===e.ownerDocument?.body,a=V(r);if(i){let e=It(a);return t.concat(a,a.visualViewport||[],wt(r)?r:[],e&&n?Ft(e):[])}return t.concat(r,Ft(r,[],n))}function It(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}var Lt,Rt,zt,Bt;function Vt(){return(Vt=e((()=>{Lt=/transform|translate|scale|rotate|perspective|filter/,Rt=/paint|layout|strict|content/,zt=e=>!!e&&e!==`none`})))()}function Ht(e){let t=jt(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=St(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Qe(n)!==a||Qe(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Ut(e){return H(e)?e:e.contextElement}function Wt(e){let t=Ut(e);if(!St(t))return B(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Ht(t),o=(a?Qe(n.width):n.width)/r,s=(a?Qe(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}function Gt(e){let t=V(e);return!kt()||!t.visualViewport?mn:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Kt(e,t,n){return t===void 0&&(t=!1),!!n&&t&&n===V(e)}function qt(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Ut(e),o=B(1);t&&(r?H(r)&&(o=Wt(r)):o=Wt(e));let s=Kt(a,n,r)?Gt(a):B(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a&&r){let e=V(a),t=H(r)?V(r):r,n=e,i=It(n);for(;i&&t!==n;){let e=Wt(i),t=i.getBoundingClientRect(),r=jt(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=V(i),i=It(n)}}return Xe({width:u,height:d,x:c,y:l})}function Jt(e,t){let n=Mt(e).scrollLeft;return t?t.left+n:qt(bt(e)).left+n}function Yt(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Jt(e,n),y:n.top+t.scrollTop}}function Xt(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=bt(r),s=t?Et(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=B(1),u=B(0),d=St(r);if((d||!a)&&((yt(r)!==`body`||wt(o))&&(c=Mt(r)),d)){let e=qt(r);l=Wt(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Yt(o,c):B(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Zt(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Qt(e){let t=Mt(e),n=e.ownerDocument.body,r=z(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),i=z(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),a=-t.scrollLeft+Jt(e),o=-t.scrollTop;return jt(n).direction===`rtl`&&(a+=z(e.clientWidth,n.clientWidth)-r),{width:r,height:i,x:a,y:o}}function $t(e,t,n){n===void 0&&(n=`viewport`);let r=n===`layoutViewport`,i=V(e),a=bt(e),o=i.visualViewport,s=a.clientWidth,c=a.clientHeight,l=0,u=0;if(o){let e=!kt()||t===`fixed`;r?e||(l=-o.offsetLeft,u=-o.offsetTop):(s=o.width,c=o.height,e&&(l=o.offsetLeft,u=o.offsetTop))}if(Jt(a)<=0){let e=a.ownerDocument,t=e.body,n=getComputedStyle(t),r=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,i=Math.abs(a.clientWidth-t.clientWidth-r),o=getComputedStyle(a).scrollbarGutter===`stable both-edges`?i/2:i;o<=hn&&(s-=o)}return{width:s,height:c,x:l,y:u}}function en(e,t){let n=qt(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=Wt(e);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function tn(e,t,n){let r;if(t===`viewport`||t===`layoutViewport`)r=$t(e,n,t);else if(t===`document`)r=Qt(bt(e));else if(H(t))r=en(t,n);else{let n=Gt(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Xe(r)}function nn(e,t){let n=t.get(e);if(n)return n;let r=Ft(e,[],!1).filter(e=>H(e)&&yt(e)!==`body`),i=null,a=jt(e).position===`fixed`,o=a?Nt(e):e;for(;H(o)&&!At(o);){let e=jt(o),t=Dt(o),n=i?i.position:a?`fixed`:``;!t&&(n===`fixed`||n===`absolute`&&e.position===`static`)?r=r.filter(e=>e!==o):i=e,o=Nt(o)}return t.set(e,r),r}function rn(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Et(t)?[]:nn(t,this._c):[].concat(n),r],o=tn(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=tn(t,a[e],i);s=z(n.top,s),c=Ze(n.right,c),l=Ze(n.bottom,l),u=z(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function an(e){let{width:t,height:n}=Ht(e);return{width:t,height:n}}function on(e,t,n){let r=St(t),i=bt(t),a=n===`fixed`,o=qt(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=B(0);if((r||!a)&&((yt(t)!==`body`||wt(i))&&(s=Mt(t)),r)){let e=qt(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}!r&&i&&(c.x=Jt(i));let l=i&&!r&&!a?Yt(i,s):B(0);return{x:o.left+s.scrollLeft-c.x-l.x,y:o.top+s.scrollTop-c.y-l.y,width:o.width,height:o.height}}function sn(e){return jt(e).position===`static`}function cn(e,t){if(!St(e)||jt(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return bt(e)===n&&(n=n.ownerDocument.body),n}function ln(e,t){let n=V(e);if(Et(e))return n;if(!St(e)){let t=Nt(e);for(;t&&!At(t);){if(H(t)&&!sn(t))return t;t=Nt(t)}return n}let r=cn(e,t);for(;r&&Tt(r)&&sn(r);)r=cn(r,t);return r&&At(r)&&sn(r)&&!Dt(r)?n:r||Ot(e)||n}function un(e){return jt(e).direction===`rtl`}function dn(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function fn(e,t,n){let r=null,i,a=bt(e);function o(){var e;clearTimeout(i),(e=r)==null||e.disconnect(),r=null}function s(n,c){n===void 0&&(n=!1),c===void 0&&(c=1),o();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(n||t(),!f||!p)return;let m=$e(d),h=$e(a.clientWidth-(u+f)),g=$e(a.clientHeight-(d+p)),_=$e(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:z(0,Ze(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(!dn(l,e.getBoundingClientRect()))return s();if(n!==c){if(!y)return s();n?s(!1,n):i=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(b,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(b,v)}r.observe(e)}let c=V(e),l=()=>s(n);return c.addEventListener(`resize`,l),s(!0),()=>{c.removeEventListener(`resize`,l),o()}}function pn(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Ut(e),u=i||a?[...l?Ft(l):[],...t?Ft(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n),a&&e.addEventListener(`resize`,n)});let d=l&&s?fn(l,n,a):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?qt(e):null;c&&g();function g(){let t=qt(e);h&&!dn(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn;function wn(){return(wn=e((()=>{_t(),at(),Vt(),mn=B(0),hn=25,gn=async function(e){let t=this.getOffsetParent||ln,n=this.getDimensions,r=await n(e.floating);return{reference:on(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},_n={convertOffsetParentRelativeRectToViewportRelativeRect:Xt,getDocumentElement:bt,getClippingRect:rn,getOffsetParent:ln,getElementRects:gn,getClientRects:Zt,getDimensions:an,getScale:Wt,isElement:H,isRTL:un},vn=mt,yn=ht,bn=ft,xn=gt,Sn=dt,Cn=(e,t,n)=>{let r=new Map,i=n??{},a={..._n,...i.platform,_c:r};return ut(e,t,{...i,platform:a})}})))()}function Tn(e){return Dn(e)}function En(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Dn(e){for(let t=e;t;t=En(t))if(t instanceof Element&&getComputedStyle(t).display===`none`)return null;for(let t=En(e);t;t=En(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if(e.display!==`contents`&&(e.position!==`static`||Dt(e)||t.tagName===`BODY`))return t}return null}function On(){return(On=e((()=>{Vt()})))()}function kn(e){return typeof e==`object`&&!!e&&`getBoundingClientRect`in e&&(`contextElement`in e?e instanceof Element:!0)}var An,U;function jn(){return(jn=e((()=>{je(),Ne(),_(),A(),f(),wn(),On(),N(),I(),fe(),An=!!globalThis?.HTMLElement?.prototype.hasOwnProperty(`popover`),U=class extends v{constructor(){super(...arguments),this.localize=new s(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement=`top`,this.boundary=`viewport`,this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement=`anchor`,this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements=``,this.flipFallbackStrategy=`best-fit`,this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),n=this.placement.includes(`top`)||this.placement.includes(`bottom`),r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0;n?e.top<t.top?(r=e.left,i=e.bottom,a=e.right,o=e.bottom,s=t.left,c=t.top,l=t.right,u=t.top):(r=t.left,i=t.bottom,a=t.right,o=t.bottom,s=e.left,c=e.top,l=e.right,u=e.top):e.left<t.left?(r=e.right,i=e.top,a=t.left,o=t.top,s=e.right,c=e.bottom,l=t.left,u=t.bottom):(r=t.right,i=t.top,a=e.left,o=e.top,s=t.right,c=t.bottom,l=e.left,u=e.bottom),this.style.setProperty(`--hover-bridge-top-left-x`,`${r}px`),this.style.setProperty(`--hover-bridge-top-left-y`,`${i}px`),this.style.setProperty(`--hover-bridge-top-right-x`,`${a}px`),this.style.setProperty(`--hover-bridge-top-right-y`,`${o}px`),this.style.setProperty(`--hover-bridge-bottom-left-x`,`${s}px`),this.style.setProperty(`--hover-bridge-bottom-left-y`,`${c}px`),this.style.setProperty(`--hover-bridge-bottom-right-x`,`${l}px`),this.style.setProperty(`--hover-bridge-bottom-right-y`,`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=An,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has(`active`)&&(this.active?this.start():this.stop()),e.has(`anchor`)&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor==`string`){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchorEl=this.anchor instanceof Element||kn(this.anchor)?this.anchor:this.querySelector(`[slot="anchor"]`);this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){if(!this.anchorEl||!this.active||!this.isConnected)return;this.cleanup?.(),this.cleanup=void 0,this.popup?.showPopover?.();let e=pn(this.anchorEl,this.popup,()=>{this.reposition()});if(!this.active||!this.isConnected){e();return}this.cleanup=e}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute(`data-current-placement`),this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[vn({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(xn({apply:({rects:e})=>{let t=this.sync===`width`||this.sync===`both`,n=this.sync===`height`||this.sync===`both`;this.popup.style.width=t?`${e.reference.width}px`:``,this.popup.style.height=n?`${e.reference.height}px`:``}})):(this.popup.style.width=``,this.popup.style.height=``);let t;this.SUPPORTS_POPOVER&&!kn(this.anchor)&&this.boundary===`scroll`&&(t=Ft(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&e.push(bn({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy===`best-fit`?`bestFit`:`initialPlacement`,padding:this.flipPadding})),this.shift&&e.push(yn({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(xn({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{this.autoSize===`vertical`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-height`,`${t}px`):this.style.removeProperty(`--auto-size-available-height`),this.autoSize===`horizontal`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-width`,`${e}px`):this.style.removeProperty(`--auto-size-available-width`)}})):(this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`)),this.arrow&&e.push(Sn({element:this.arrowEl,padding:this.arrowPadding}));let n=this.SUPPORTS_POPOVER?e=>_n.getOffsetParent(e,Tn):_n.getOffsetParent;Cn(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.SUPPORTS_POPOVER?`absolute`:`fixed`,platform:{..._n,getOffsetParent:n}}).then(({x:e,y:t,middlewareData:n,placement:r})=>{let i=this.localize.dir()===`rtl`,a={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[r.split(`-`)[0]];if(this.setAttribute(`data-current-placement`,r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=n.arrow.x,t=n.arrow.y,r=``,o=``,s=``,c=``;if(this.arrowPlacement===`start`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;r=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``,o=i?n:``,c=i?``:n}else if(this.arrowPlacement===`end`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;o=i?``:n,c=i?n:``,s=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``}else this.arrowPlacement===`center`?(c=typeof e==`number`?`calc(50% - var(--arrow-size-diagonal))`:``,r=typeof t==`number`?`calc(50% - var(--arrow-size-diagonal))`:``):(c=typeof e==`number`?`${e}px`:``,r=typeof t==`number`?`${t}px`:``);Object.assign(this.arrowEl.style,{top:r,right:o,bottom:s,left:c,[a]:`calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))`})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Ae)}render(){return j`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${M({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${M({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?j`<div part="arrow" class="arrow" role="presentation"></div>`:``}
      </div>
    `}},U.css=Me,y([P(`.popup`)],U.prototype,`popup`,2),y([P(`.arrow`)],U.prototype,`arrowEl`,2),y([L({attribute:!1,type:Boolean})],U.prototype,`SUPPORTS_POPOVER`,2),y([L()],U.prototype,`anchor`,2),y([L({type:Boolean,reflect:!0})],U.prototype,`active`,2),y([L({reflect:!0})],U.prototype,`placement`,2),y([L()],U.prototype,`boundary`,2),y([L({type:Number})],U.prototype,`distance`,2),y([L({type:Number})],U.prototype,`skidding`,2),y([L({type:Boolean})],U.prototype,`arrow`,2),y([L({attribute:`arrow-placement`})],U.prototype,`arrowPlacement`,2),y([L({attribute:`arrow-padding`,type:Number})],U.prototype,`arrowPadding`,2),y([L({type:Boolean})],U.prototype,`flip`,2),y([L({attribute:`flip-fallback-placements`,converter:{fromAttribute:e=>e.split(` `).map(e=>e.trim()).filter(e=>e!==``),toAttribute:e=>e.join(` `)}})],U.prototype,`flipFallbackPlacements`,2),y([L({attribute:`flip-fallback-strategy`})],U.prototype,`flipFallbackStrategy`,2),y([L({type:Object})],U.prototype,`flipBoundary`,2),y([L({attribute:`flip-padding`,type:Number})],U.prototype,`flipPadding`,2),y([L({type:Boolean})],U.prototype,`shift`,2),y([L({type:Object})],U.prototype,`shiftBoundary`,2),y([L({attribute:`shift-padding`,type:Number})],U.prototype,`shiftPadding`,2),y([L({attribute:`auto-size`})],U.prototype,`autoSize`,2),y([L()],U.prototype,`sync`,2),y([L({type:Object})],U.prototype,`autoSizeBoundary`,2),y([L({attribute:`auto-size-padding`,type:Number})],U.prototype,`autoSizePadding`,2),y([L({attribute:`hover-bridge`,type:Boolean})],U.prototype,`hoverBridge`,2),U=y([R(`wa-popup`)],U)})))()}function Mn(e=``){return`${e}${De()}`}function Nn(){return(Nn=e((()=>{Ee()})))()}function Pn(e,t){for(;t;){if(t===e)return!0;t=t instanceof Element&&t.assignedSlot?t.assignedSlot:t.parentNode?t.parentNode:t instanceof ShadowRoot?t.host:null}return!1}var W;function Fn(){return(Fn=e((()=>{ke(),E(),te(),T(),se(),jn(),x(),Nn(),_(),f(),N(),I(),fe(),W=class extends v{constructor(){super(...arguments),this.dismissedByPress=!1,this.placement=`top`,this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger=`hover focus`,this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.openTransition={open:!1},this.handleTrigger=e=>{let t=e.type,n=t===`mouseover`||t===`mouseout`,r=t===`focus`||t===`mouseover`;if(t===`click`||t===`mousedown`){if(!this.hasTrigger(`click`)){this.hasTrigger(`manual`)||this.lightDismiss();return}if(t!==`click`)return;r=!this.open}else{if(!r){let t=e.relatedTarget;if(n&&t&&(this.anchor&&Pn(this.anchor,t)||Pn(this,t)))return;this.dismissedByPress=!1}if(this.dismissedByPress||!this.hasTrigger(n?`hover`:`focus`))return}let i=()=>r?this.show():this.hide();n?(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(i,r?this.showDelay:this.hideDelay)):i()},this.handleDocumentDismiss=e=>{if(!this.hasTrigger(`manual`)){if(e.type===`keydown`){if(e.key!==`Escape`||!this.open||!ne(this))return;e.preventDefault(),e.stopPropagation()}else if(this.anchor&&e.composedPath().includes(this.anchor))return;this.hide()}}}connectedCallback(){super.connectedCallback(),typeof document<`u`&&(this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener(`mouseout`,this.handleTrigger),this.dismissedByPress=!1,this.requestOpen(this.open),this.id||=Mn(`wa-tooltip-`),this.for&&(this.anchor=null,this.handleForChange()))}disconnectedCallback(){super.disconnectedCallback(),S(this),this.eventController.abort(null),clearTimeout(this.hoverTimeout),this.openTransition={open:!1,promise:this.openTransition.promise},this.popup?.popup?.classList.remove(`show-with-scale`,`hide-with-scale`),this.body&&(this.body.hidden=!0),this.popup&&(this.popup.active=!1),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}lightDismiss(){clearTimeout(this.hoverTimeout),this.dismissedByPress=!0,this.hide()}hasTrigger(e){return this.trigger.split(` `).includes(e)}addToAriaLabelledBy(e,t){let n=(e.getAttribute(`aria-labelledby`)||``).split(/\s+/).filter(Boolean);n.includes(t)||(n.push(t),e.setAttribute(`aria-labelledby`,n.join(` `)))}removeFromAriaLabelledBy(e,t){let n=(e.getAttribute(`aria-labelledby`)||``).split(/\s+/).filter(Boolean).filter(e=>e!==t);n.length>0?e.setAttribute(`aria-labelledby`,n.join(` `)):e.removeAttribute(`aria-labelledby`)}async handleOpenChange(){this.disabled&&(this.open=!1);let e=this.openTransition,t=this.open;if(!this.isConnected||e.open===t)return e.promise;let n=this.dispatchEvent(t?new D:new re);if(this.openTransition===e){if(!n&&!this.disabled)this.open=e.open;else if((this.open&&!this.disabled)===t){let n=this.openTransition={open:t},r=()=>this.openTransition===n&&(this.open&&!this.disabled)===t,i=t&&!this.hasTrigger(`manual`);for(let e of[`keydown`,`click`])document[i?`addEventListener`:`removeEventListener`](e,this.handleDocumentDismiss,{signal:this.eventController.signal});i?ae(this):S(this),t&&(this.body.hidden=!1,this.popup.active=!0),this.popup.popup.classList.remove(`show-with-scale`,`hide-with-scale`),n.promise=(async()=>{await e.promise,r()&&(await oe(this.popup.popup,t?`show-with-scale`:`hide-with-scale`),r()&&(t?this.popup.reposition():(this.popup.active=!1,this.body.hidden=!0),r()&&this.dispatchEvent(t?new ee:new C)))})()}}return this.openTransition.promise}handleForChange(){let e=this.getRootNode?.();if(!e)return;let t=this.for?e.getElementById?.(this.for):null,n=this.anchor;if(t===n)return;this.dismissedByPress=!1;let{signal:r}=this.eventController,i=[[`blur`,this.handleTrigger,!0],[`focus`,this.handleTrigger,!0],[`click`,this.handleTrigger],[`mousedown`,this.handleTrigger],[`mouseover`,this.handleTrigger],[`mouseout`,this.handleTrigger]];t&&this.addToAriaLabelledBy(t,this.id),n&&this.removeFromAriaLabelledBy(n,this.id);for(let[e,a,o]of i)t?.addEventListener(e,a,{capture:o,signal:r}),n?.removeEventListener(e,a,o);this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async requestOpen(e){if(this.isConnected)return this.open=e&&!this.disabled,await this.updateComplete,this.handleOpenChange()}show(){return this.requestOpen(!0)}hide(){return this.requestOpen(!1)}render(){return j`
      <wa-popup
        part="base tooltip"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${M({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body" hidden>
          <slot></slot>
        </div>
      </wa-popup>
    `}},W.css=Oe,W.dependencies={"wa-popup":U},y([P(`slot:not([name])`)],W.prototype,`defaultSlot`,2),y([P(`.body`)],W.prototype,`body`,2),y([P(`wa-popup`)],W.prototype,`popup`,2),y([L()],W.prototype,`placement`,2),y([L({type:Boolean,reflect:!0})],W.prototype,`disabled`,2),y([L({type:Number})],W.prototype,`distance`,2),y([L({type:Boolean,reflect:!0})],W.prototype,`open`,2),y([L({type:Number})],W.prototype,`skidding`,2),y([L({attribute:`show-delay`,type:Number})],W.prototype,`showDelay`,2),y([L({attribute:`hide-delay`,type:Number})],W.prototype,`hideDelay`,2),y([L()],W.prototype,`trigger`,2),y([L({attribute:`without-arrow`,type:Boolean,reflect:!0})],W.prototype,`withoutArrow`,2),y([L()],W.prototype,`for`,2),y([be()],W.prototype,`anchor`,2),y([w([`open`,`disabled`],{waitUntilFirstUpdate:!0})],W.prototype,`handleOpenChange`,1),y([w(`for`)],W.prototype,`handleForChange`,1),y([w([`distance`,`placement`,`skidding`])],W.prototype,`handleOptionsChange`,1),W=y([R(`wa-tooltip`)],W)})))()}function In(e,t){return new Promise(n=>{function r(i){i.target===e&&(e.removeEventListener(t,r),n())}e.addEventListener(t,r)})}function Ln(){return(Ln=e((()=>{Fn(),ke(),jn(),Ne(),_(),A(),o()})))()}function Rn(e,t=!1){return t?{h:Number(e&Hn),l:Number(e>>Un&Hn)}:{h:Number(e>>Un&Hn)|0,l:Number(e&Hn)|0}}function zn(e,t=!1){let n=e.length,r=new Uint32Array(n),i=new Uint32Array(n);for(let a=0;a<n;a++){let{h:n,l:o}=Rn(e[a],t);[r[a],i[a]]=[n,o]}return[r,i]}function Bn(e,t,n,r){let i=Wn(n),a=Gn(n);e.setUint32(t,r?a:i,r),e.setUint32(t+4,r?i:a,r)}function Vn(e,t,n,r){let i=(t>>>0)+(r>>>0);return{h:e+n+(i/2**32|0)|0,l:i|0}}var Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr;function ir(){return(ir=e((()=>{Hn=BigInt(2**32-1),Un=BigInt(32),Wn=e=>e/2**32|0,Gn=e=>e>>>0,Kn=(e,t,n)=>e>>>n,qn=(e,t,n)=>e<<32-n|t>>>n,Jn=(e,t,n)=>e>>>n|t<<32-n,Yn=(e,t,n)=>e<<32-n|t>>>n,Xn=(e,t,n)=>e<<64-n|t>>>n-32,Zn=(e,t,n)=>e>>>n-32|t<<64-n,Qn=(e,t,n)=>(e>>>0)+(t>>>0)+(n>>>0),$n=(e,t,n,r)=>t+n+r+(e/2**32|0)|0,er=(e,t,n,r)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0),tr=(e,t,n,r,i)=>t+n+r+i+(e/2**32|0)|0,nr=(e,t,n,r,i)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0)+(i>>>0),rr=(e,t,n,r,i,a)=>t+n+r+i+a+(e/2**32|0)|0})))()}function ar(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name===`Uint8Array`&&`BYTES_PER_ELEMENT`in e&&e.BYTES_PER_ELEMENT===1}function or(e,t=``){if(typeof e!=`number`)throw TypeError(_r(t)+`expected number, got `+typeof e);if(!Number.isSafeInteger(e)||e<0)throw RangeError(_r(t)+`expected integer >= 0, got `+e);return e}function sr(e,t,n=``){if(ar(e)&&(t===void 0||e.length===t))return e;t!==void 0&&or(t,`length`);let r=ar(e),i=t===void 0?``:` of length ${t}`,a=r?`length=${e.length}`:`type=${typeof e}`,o=_r(n)+`expected Uint8Array`+i+`, got `+a;throw r?RangeError(o):TypeError(o)}function cr(e){if(typeof e!=`function`||typeof e.create!=`function`)throw TypeError(`expected hash wrapped by utils.createHasher`);if(or(e.outputLen),or(e.blockLen),e.outputLen<1||e.blockLen<1)throw Error(`hash blockLen / outputLen must be >= 1`)}function lr(e,t=!0){if(e.destroyed)throw Error(`hash was destroyed`);if(t&&e.finished)throw Error(`digest() was already called`)}function ur(e,t){sr(e,void 0,`output`);let n=t.outputLen;if(!(e.length>=n))throw RangeError(`"output" expected length >= `+n)}function dr(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function fr(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function pr(e,t){return e<<32-t|e>>>t}function mr(e){if(sr(e),br)return e.toHex();let t=``;for(let n=0;n<e.length;n++)t+=xr[e[n]];return t}function hr(e,t,n=`opts`){return yr(e,`defaults`),t!==void 0&&yr(t,n),Object.assign(Object.create(null),e,t)}function gr(e,t={}){if(typeof e!=`function`)throw TypeError(`"hashCons" expected function, got type=`+typeof e);t=hr({},t,`info`);let n=(t,n)=>e(n).update(t).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=t=>e(t),Object.assign(n,t),Object.freeze(n)}var _r,vr,yr,br,xr,Sr;function Cr(){return(Cr=e((()=>{_r=e=>e?`"${e}" `:``,vr=(e,t)=>{if(typeof e!=`object`||!e||Array.isArray(e))throw TypeError((t===`object`?``:`"${t}" `)+`expected object, got type=`+typeof e)},yr=(e,t)=>{vr(e,t);let n=Object.getPrototypeOf(e);if(n!==Object.prototype&&n!==null)throw TypeError(`"${t}" expected plain object`);if(Object.hasOwn(e,`__proto__`))throw TypeError(`"${t}.__proto__" is not allowed`)},br=typeof Uint8Array.from([]).toHex==`function`&&typeof Uint8Array.fromHex==`function`,xr=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,`0`)),Sr=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])})})))()}function wr(e,t,n){return e&t^~e&n}function Tr(e,t,n){return e&t^e&n^t&n}var Er,Dr,Or,kr,Ar;function jr(){return(jr=e((()=>{ir(),Cr(),Er=class{blockLen;outputLen;canXOF=!1;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(e,t,n,r){this.blockLen=e,this.outputLen=t,this.padOffset=n,this.isLE=r,this.buffer=new Uint8Array(e),this.view=fr(this.buffer)}update(e){lr(this),sr(e);let{view:t,buffer:n,blockLen:r}=this,i=e.length,a=!1;for(let o=0;o<i;){let s=Math.min(r-this.pos,i-o);if(s===r){let t=fr(e);for(;r<=i-o;o+=r)this.process(t,o);a=!0;continue}n.set(o===0&&s===i?e:e.subarray(o,o+s),this.pos),this.pos+=s,o+=s,this.pos===r&&(this.process(t,0),this.pos=0,a=!0)}return this.length+=e.length,a&&this.roundClean(),this}digestInto(e){lr(this),ur(e,this),this.finished=!0;let{buffer:t,view:n,blockLen:r,isLE:i}=this,{pos:a}=this;t[a++]=128,t.fill(0,a),this.padOffset>r-a&&(this.process(n,0),t.fill(0)),Bn(n,r-8,this.length*8,i),this.process(n,0),this.roundClean();let o=e===t?n:fr(e),s=this.outputLen,c=s/4,l=this.get();if(s%4||c>l.length)throw Error(`invalid outputLen`);for(let e=0;e<c;e++)o.setUint32(4*e,l[e],i)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let n=e.slice(0,t);return this.destroy(),n}_cloneIntoMeta(e){let{buffer:t,length:n,finished:r,destroyed:i,pos:a}=this;return e.destroyed=i,e.finished=r,e.length=n,e.pos=a,a&&e.buffer.set(t),e}clone(){return this._cloneInto()}},Dr=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Or=Uint32Array.from([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),kr=Uint32Array.from([3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]),Ar=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209])})))()}var Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei;function ti(){return(ti=e((()=>{jr(),ir(),Cr(),Mr=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Nr=new Uint32Array(64),Pr=class extends Er{A=0;B=0;C=0;D=0;E=0;F=0;G=0;H=0;constructor(e,t){super(64,e,8,!1),this.A=t[0]|0,this.B=t[1]|0,this.C=t[2]|0,this.D=t[3]|0,this.E=t[4]|0,this.F=t[5]|0,this.G=t[6]|0,this.H=t[7]|0}get(){let{A:e,B:t,C:n,D:r,E:i,F:a,G:o,H:s}=this;return[e,t,n,r,i,a,o,s]}set(e,t,n,r,i,a,o,s){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0,this.F=a|0,this.G=o|0,this.H=s|0}_cloneInto(e){return(e||=new this.constructor).set(...this.get()),this._cloneIntoMeta(e)}process(e,t){for(let n=0;n<16;n++,t+=4)Nr[n]=e.getUint32(t,!1);for(let e=16;e<64;e++){let t=Nr[e-15],n=Nr[e-2],r=pr(t,7)^pr(t,18)^t>>>3,i=pr(n,17)^pr(n,19)^n>>>10;Nr[e]=i+Nr[e-7]+r+Nr[e-16]|0}let{A:n,B:r,C:i,D:a,E:o,F:s,G:c,H:l}=this;for(let e=0;e<64;e++){let t=pr(o,6)^pr(o,11)^pr(o,25),u=l+t+wr(o,s,c)+Mr[e]+Nr[e]|0,d=(pr(n,2)^pr(n,13)^pr(n,22))+Tr(n,r,i)|0;l=c,c=s,s=o,o=a+u|0,a=i,i=r,r=n,n=u+d|0}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,s=s+this.F|0,c=c+this.G|0,l=l+this.H|0,this.set(n,r,i,a,o,s,c,l)}roundClean(){dr(Nr)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),dr(this.buffer)}},Fr=class extends Pr{constructor(){super(32,Dr)}},Ir=class extends Pr{constructor(){super(28,Or)}},Lr=zn(`0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817`.split(`.`).map(e=>BigInt(e))),Rr=Lr[0],zr=Lr[1],Br=new Uint32Array(80),Vr=new Uint32Array(80),Hr=class extends Er{Ah=0;Al=0;Bh=0;Bl=0;Ch=0;Cl=0;Dh=0;Dl=0;Eh=0;El=0;Fh=0;Fl=0;Gh=0;Gl=0;Hh=0;Hl=0;constructor(e,t){super(128,e,16,!1),this.Ah=t[0]|0,this.Al=t[1]|0,this.Bh=t[2]|0,this.Bl=t[3]|0,this.Ch=t[4]|0,this.Cl=t[5]|0,this.Dh=t[6]|0,this.Dl=t[7]|0,this.Eh=t[8]|0,this.El=t[9]|0,this.Fh=t[10]|0,this.Fl=t[11]|0,this.Gh=t[12]|0,this.Gl=t[13]|0,this.Hh=t[14]|0,this.Hl=t[15]|0}get(){let{Ah:e,Al:t,Bh:n,Bl:r,Ch:i,Cl:a,Dh:o,Dl:s,Eh:c,El:l,Fh:u,Fl:d,Gh:f,Gl:p,Hh:m,Hl:h}=this;return[e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h]}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.Ah=e|0,this.Al=t|0,this.Bh=n|0,this.Bl=r|0,this.Ch=i|0,this.Cl=a|0,this.Dh=o|0,this.Dl=s|0,this.Eh=c|0,this.El=l|0,this.Fh=u|0,this.Fl=d|0,this.Gh=f|0,this.Gl=p|0,this.Hh=m|0,this.Hl=h|0}_cloneInto(e){return(e||=new this.constructor).set(...this.get()),this._cloneIntoMeta(e)}process(e,t){for(let n=0;n<16;n++,t+=4)Br[n]=e.getUint32(t),Vr[n]=e.getUint32(t+=4);for(let e=16;e<80;e++){let t=Br[e-15]|0,n=Vr[e-15]|0,r=Jn(t,n,1)^Jn(t,n,8)^Kn(t,n,7),i=Yn(t,n,1)^Yn(t,n,8)^qn(t,n,7),a=Br[e-2]|0,o=Vr[e-2]|0,s=Jn(a,o,19)^Xn(a,o,61)^Kn(a,o,6),c=Yn(a,o,19)^Zn(a,o,61)^qn(a,o,6),l=er(i,c,Vr[e-7],Vr[e-16]),u=tr(l,r,s,Br[e-7],Br[e-16]);Br[e]=u|0,Vr[e]=l|0}let{Ah:n,Al:r,Bh:i,Bl:a,Ch:o,Cl:s,Dh:c,Dl:l,Eh:u,El:d,Fh:f,Fl:p,Gh:m,Gl:h,Hh:g,Hl:_}=this;for(let e=0;e<80;e++){let t=Jn(u,d,14)^Jn(u,d,18)^Xn(u,d,41),v=Yn(u,d,14)^Yn(u,d,18)^Zn(u,d,41),y=u&f^~u&m,b=d&p^~d&h,x=nr(_,v,b,zr[e],Vr[e]),S=rr(x,g,t,y,Rr[e],Br[e]),C=x|0,w=Jn(n,r,28)^Xn(n,r,34)^Xn(n,r,39),T=Yn(n,r,28)^Zn(n,r,34)^Zn(n,r,39),E=n&i^n&o^i&o,D=r&a^r&s^a&s;g=m|0,_=h|0,m=f|0,h=p|0,f=u|0,p=d|0,{h:u,l:d}=Vn(c|0,l|0,S|0,C|0),c=o|0,l=s|0,o=i|0,s=a|0,i=n|0,a=r|0;let O=Qn(C,T,D);n=$n(O,S,w,E),r=O|0}({h:n,l:r}=Vn(this.Ah|0,this.Al|0,n|0,r|0)),{h:i,l:a}=Vn(this.Bh|0,this.Bl|0,i|0,a|0),{h:o,l:s}=Vn(this.Ch|0,this.Cl|0,o|0,s|0),{h:c,l}=Vn(this.Dh|0,this.Dl|0,c|0,l|0),{h:u,l:d}=Vn(this.Eh|0,this.El|0,u|0,d|0),{h:f,l:p}=Vn(this.Fh|0,this.Fl|0,f|0,p|0),{h:m,l:h}=Vn(this.Gh|0,this.Gl|0,m|0,h|0),{h:g,l:_}=Vn(this.Hh|0,this.Hl|0,g|0,_|0),this.set(n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_)}roundClean(){dr(Br,Vr)}destroy(){this.destroyed=!0,dr(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}},Ur=class extends Hr{constructor(){super(64,Ar)}},Wr=class extends Hr{constructor(){super(48,kr)}},Gr=Uint32Array.from([2352822216,424955298,1944164710,2312950998,502970286,855612546,1738396948,1479516111,258812777,2077511080,2011393907,79989058,1067287976,1780299464,286451373,2446758561]),Kr=Uint32Array.from([573645204,4230739756,2673172387,3360449730,596883563,1867755857,2520282905,1497426621,2519219938,2827943907,3193839141,1401305490,721525244,746961066,246885852,2177182882]),qr=class extends Hr{constructor(){super(28,Gr)}},Jr=class extends Hr{constructor(){super(32,Kr)}},Yr=gr(()=>new Fr,Sr(1)),Xr=gr(()=>new Ir,Sr(4)),Zr=gr(()=>new Ur,Sr(3)),Qr=gr(()=>new Wr,Sr(2)),$r=gr(()=>new Jr,Sr(6)),ei=gr(()=>new qr,Sr(5))})))()}function ni(e){let t=`&`+e+`;`;ri.innerHTML=t;let n=ri.textContent;return n.charCodeAt(n.length-1)===59&&e!==`semi`?!1:n!==t&&n}var ri;function ii(){return(ii=e((()=>{ri=document.createElement(`i`)})))()}function ai(){}function oi(){return(oi=e((()=>{})))()}var si;function ci(){return(ci=e((()=>{si=class extends Event{constructor(e){super(`wa-select`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}}})))()}function*li(e=document.activeElement){e!=null&&(yield e,`shadowRoot`in e&&e.shadowRoot&&e.shadowRoot.mode!==`closed`&&(yield*li(e.shadowRoot.activeElement)))}var ui;function di(){return(di=e((()=>{N(),ui=F`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet);
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`})))()}var fi,G;function pi(){return(pi=e((()=>{ci(),di(),E(),te(),T(),se(),x(),Nn(),le(),c(),_(),A(),f(),wn(),N(),I(),fi=new Set,G=class extends v{constructor(){super(...arguments),this.localize=new s(this),this.userTypedQuery=``,this.activeSubmenus=[],this.open=!1,this.size=`m`,this.placement=`bottom-start`,this.distance=0,this.skidding=0,this.handleDocumentKeyDown=e=>{let t=this.localize.dir()===`rtl`;if(e.key===`Escape`&&this.open&&ne(this)){let t=this.getTrigger();e.preventDefault(),e.stopPropagation(),this.open=!1,t?.focus({preventScroll:!0});return}let n=[...li()].find(e=>e.localName===`wa-dropdown-item`),r=this.getCurrentSubmenuItem(),i=r?this.getSubmenuItems(r):this.getItems(),a=i.find(e=>e===n)??(n?void 0:i.find(e=>e.active)),o=a?i.indexOf(a):-1,s;if(e.key===`ArrowUp`&&(e.preventDefault(),e.stopPropagation(),s=o>0?i[o-1]:i[i.length-1]),e.key===`ArrowDown`&&(e.preventDefault(),e.stopPropagation(),s=o!==-1&&o<i.length-1?i[o+1]:i[0]),e.key===(t?`ArrowLeft`:`ArrowRight`)&&n&&a&&a.hasSubmenu){e.preventDefault(),e.stopPropagation(),a.submenuOpen=!0;return}if(e.key===(t?`ArrowRight`:`ArrowLeft`)&&r){e.preventDefault(),e.stopPropagation(),r.closeSubmenu(),r.focus({preventScroll:!0});let t=this.getCurrentSubmenuItem();(t?this.getSubmenuItems(t,!0):this.getItems(!0)).forEach(e=>e.active=e===r);return}if((e.key===`Home`||e.key===`End`)&&(e.preventDefault(),e.stopPropagation(),s=e.key===`Home`?i[0]:i[i.length-1]),e.key===`Tab`&&(this.open=!1),e.key.length===1&&!(e.metaKey||e.ctrlKey||e.altKey)&&(e.key!==` `||this.userTypedQuery!==``)&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=``},1e3),this.userTypedQuery+=e.key,i.some(e=>{let t=(e.textContent||``).trim().toLowerCase(),n=this.userTypedQuery.trim().toLowerCase();return t.startsWith(n)?(s=e,!0):!1})),s){e.preventDefault(),e.stopPropagation(),i.forEach(e=>e.active=e===s),s.focus({preventScroll:!0}),s.scrollIntoView({block:`nearest`});return}(e.key===`Enter`||e.key===` `&&this.userTypedQuery===``)&&n&&a&&(e.preventDefault(),e.stopPropagation(),a.hasSubmenu?a.submenuOpen=!0:this.makeSelection(a,e))},this.handleDocumentPointerDown=e=>{e.composedPath().some(e=>e instanceof HTMLElement?e===this||e.closest(`wa-dropdown, [part="submenu"]`):!1)||(this.open=!1)},this.handleGlobalMouseMove=e=>{let t=this.activeSubmenus.at(-1),n=t?.item;if(!n?.submenuOpen||!n.submenuElement)return;let r=n.submenuElement.getBoundingClientRect(),i=this.localize.dir()===`rtl`,a=i?r.right:r.left,o=i?Math.max(e.clientX,a):Math.min(e.clientX,a),s=Math.max(r.top,Math.min(e.clientY,r.bottom));n.submenuElement.style.setProperty(`--safe-triangle-cursor-x`,`${o}px`),n.submenuElement.style.setProperty(`--safe-triangle-cursor-y`,`${s}px`);let c=e.composedPath(),l=n.matches(`:hover`),u=!!n.submenuElement?.matches(`:hover`),d=l||!!c.find(e=>e===n),f=u||!!c.find(e=>e instanceof HTMLElement&&e.closest(`[part="submenu"]`)===n.submenuElement);!d&&!f&&setTimeout(()=>{this.activeSubmenus.includes(t)&&!n.matches(`:hover`)&&!n.submenuElement.matches(`:hover`)&&(n.submenuOpen=!1)},100)}}handleSizeChange(){n(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.open&&this.updateMenuVisibility(!0)}disconnectedCallback(){super.disconnectedCallback(),this.menuTransition?.abort(),this.menu?.classList.remove(`show`,`hide`),this.popup&&(this.popup.active=!1),fi.delete(this),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),S(this)}firstUpdated(e){super.firstUpdated(e),this.syncAriaAttributes()}async updated(e){if(e.has(`open`)){let t=e.get(`open`);if(t===this.open||t===void 0&&this.open===!1)return;this.customStates.set(`open`,this.open),await this.updateMenuVisibility(this.open)}e.has(`size`)&&this.syncItemSizes()}getItems(e=!1){let t=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`);return e?t:t.filter(e=>!e.disabled)}getSubmenuItems(e,t=!1){let n=e.shadowRoot?.querySelector(`slot[name="submenu"]`)||e.querySelector(`slot[name="submenu"]`);if(!n)return[];let r=n.assignedElements({flatten:!0}).filter(e=>e.localName===`wa-dropdown-item`);return t?r:r.filter(e=>!e.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`).forEach(e=>e.size=this.size)}getCurrentSubmenuItem(){return this.activeSubmenus.at(-1)?.item}closeAllSubmenus(e=0){for(let{item:t,cleanup:n}of this.activeSubmenus.splice(e).reverse())n(),t.closeSubmenu()}getTrigger(){return this.querySelector(`[slot="trigger"]`)}async updateMenuVisibility(e){if(!this.isConnected||!this.popup||!this.menu||e&&!this.getTrigger())return;let t=e?new D:new re({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!e;return}if(!this.isConnected||this.open!==e||e&&fi.has(this))return;this.menuTransition?.abort(),this.menuTransition=new AbortController;let{signal:n}=this.menuTransition,r=()=>!n.aborted&&this.isConnected&&this.open===e;e?(fi.forEach(e=>e.open=!1),this.popup.active=!0,fi.add(this),ae(this),document.addEventListener(`keydown`,this.handleDocumentKeyDown,{signal:n}),document.addEventListener(`pointerdown`,this.handleDocumentPointerDown,{signal:n}),document.addEventListener(`mousemove`,this.handleGlobalMouseMove,{signal:n})):(this.closeAllSubmenus(),fi.delete(this),S(this)),this.syncAriaAttributes(),this.menu.classList.remove(`show`,`hide`);let i=[...li()].pop();if(await this.menuAnimation,r()){if(this.menuAnimation=oe(this.menu,e?`show`:`hide`),e){if(await this.popup.updateComplete,await new Promise(e=>requestAnimationFrame(()=>e())),!r())return;let e=this.getCurrentSubmenuItem(),t=e?this.getSubmenuItems(e,!0):this.getItems(!0),n=this.defaultSlot.assignedElements({flatten:!0}),a=e=>e instanceof HTMLElement&&e.closest(`wa-dropdown`)===this&&!e.matches(`:disabled, [disabled]`)&&n.some(t=>t.contains(e)),o=[...li()].find(a),s=o?void 0:[...this.querySelectorAll(`[autofocus]`)].find(e=>a(e)&&e.getClientRects().length>0),c=o??s??t.find(e=>!e.disabled);if(c&&(o||[...li()].pop()===i)&&(t.forEach(e=>e.active=e===c),c.localName===`wa-dropdown-item`&&(c.active=!0),o||c.focus({preventScroll:!0}),c.autofocus&&c.scrollIntoView({block:`nearest`})),!r())return}await this.menuAnimation,r()&&(e?this.dispatchEvent(new ee):(this.popup.active=!1,this.dispatchEvent(new C)))}}handleMenuClick(e){let t=e.target.closest(`wa-dropdown-item`);if(t&&!t.disabled){if(t.hasSubmenu){t.submenuOpen||=!0,e.stopPropagation();return}this.makeSelection(t,e)}}async handleMenuSlotChange(){let e=this.getItems(!0);await Promise.all(e.map(e=>e.updateComplete)),this.syncItemSizes();let t=e.some(e=>e.type===`checkbox`),n=e.some(e=>e.hasSubmenu);e.forEach((r,i)=>{r.setAttribute(`aria-posinset`,String(i+1)),r.setAttribute(`aria-setsize`,String(e.length)),r.active=i===0,r.checkboxAdjacent=t,r.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(e){e.stopPropagation();let t=e.composedPath(),n=t.slice(0,t.indexOf(this)).filter(e=>e instanceof HTMLElement&&e.localName===`wa-dropdown-item`).reverse();if(n.some(e=>!e.submenuOpen)){e.detail.item.closeSubmenu();return}let r=0;for(;r<n.length&&this.activeSubmenus[r]?.item===n[r];)r++;if(r!==n.length){this.closeAllSubmenus(r);for(let e of n.slice(r))this.activeSubmenus.push({item:e,cleanup:this.setupSubmenuPosition(e)})}}setupSubmenuPosition(e){let t=new AbortController,{signal:n}=t,r=pn(e,e.submenuElement,()=>{this.positionSubmenu(e,()=>!n.aborted),this.updateSafeTriangleCoordinates(e)});return e.addEventListener(`submenu-closing`,()=>{let t=this.activeSubmenus.findIndex(t=>t.item===e);t!==-1&&this.closeAllSubmenus(t)},{signal:n}),e.submenuElement.querySelector(`slot[name="submenu"]`)?.addEventListener(`slotchange`,()=>this.processSubmenuItems(e),{signal:n}),this.processSubmenuItems(e),()=>{t.abort(),r()}}processSubmenuItems(e){let t=this.getSubmenuItems(e,!0),n=t.some(e=>e.hasSubmenu),r=t.some(e=>e.type===`checkbox`);t.forEach(e=>{e.submenuAdjacent=n,e.checkboxAdjacent=r})}positionSubmenu(e,t){if(!e.submenuElement)return;let n=this.localize.dir()===`rtl`?`left-start`:`right-start`;Cn(e,e.submenuElement,{placement:n,middleware:[vn({mainAxis:0,crossAxis:-5}),bn({fallbackStrategy:`bestFit`}),yn({padding:8,crossAxis:!0})]}).then(({x:n,y:r,placement:i})=>{t()&&(e.submenuElement.setAttribute(`data-placement`,i),Object.assign(e.submenuElement.style,{left:`${n}px`,top:`${r}px`}))})}updateSafeTriangleCoordinates(e){if(!e.submenuElement||!e.submenuOpen)return;if(document.activeElement?.matches(`:focus-visible`)){e.submenuElement.style.setProperty(`--safe-triangle-visible`,`none`);return}e.submenuElement.style.setProperty(`--safe-triangle-visible`,`block`);let t=e.submenuElement.getBoundingClientRect(),n=this.localize.dir()===`rtl`;e.submenuElement.style.setProperty(`--safe-triangle-submenu-start-x`,`${n?t.right:t.left}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-start-y`,`${t.top}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-end-x`,`${n?t.right:t.left}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-end-y`,`${t.bottom}px`)}makeSelection(e,t){let n=this.getTrigger();if(e.disabled)return;e.type===`checkbox`&&(e.checked=!e.checked);let r=new si({item:e});this.dispatchEvent(r),r.defaultPrevented||(e.navigate(t),this.open=!1,n?.focus({preventScroll:!0}))}async syncAriaAttributes(){let e=this.getTrigger(),t;e&&(e.localName===`wa-button`?(await customElements.whenDefined(`wa-button`),await e.updateComplete,t=e.shadowRoot.querySelector(`[part~="base"]`)):t=e,t.hasAttribute(`id`)||t.setAttribute(`id`,Mn(`wa-dropdown-trigger-`)),t.setAttribute(`aria-haspopup`,`menu`),t.setAttribute(`aria-expanded`,this.open?`true`:`false`),this.menu?.setAttribute(`aria-expanded`,`false`))}render(){let e=this.didSSR&&!this.hasUpdated?this.open:this.popup?.active;return j`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${e}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}},G.css=[p,ui],y([P(`slot:not([name])`)],G.prototype,`defaultSlot`,2),y([P(`#menu`)],G.prototype,`menu`,2),y([P(`wa-popup`)],G.prototype,`popup`,2),y([L({type:Boolean,reflect:!0})],G.prototype,`open`,2),y([L({reflect:!0})],G.prototype,`size`,2),y([w(`size`)],G.prototype,`handleSizeChange`,1),y([L({reflect:!0})],G.prototype,`placement`,2),y([L({type:Number})],G.prototype,`distance`,2),y([L({type:Number})],G.prototype,`skidding`,2),G=y([R(`wa-dropdown`)],G)})))()}var mi;function hi(){return(hi=e((()=>{N(),mi=F`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:state(submenu-open)) {
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)),
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:state(submenu-open)),
  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  /* The link only exists to be clicked programmatically. */
  #link {
    display: none;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`})))()}var K;function gi(){return(gi=e((()=>{hi(),O(),le(),_(),f(),N(),I(),de(),K=class extends v{constructor(){super(...arguments),this.hasSlotController=new ie(this,`[default]`,`start`,`end`),this.submenuGeneration=0,this.active=!1,this.variant=`default`,this.size=`m`,this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type=`normal`,this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{let e=this.hasSlotController.test(`submenu`);e||this.closeSubmenu(),this.hasSubmenu=e,this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute(`aria-haspopup`,`menu`),this.setAttribute(`aria-expanded`,this.submenuOpen?`true`:`false`)):(this.removeAttribute(`aria-haspopup`),this.removeAttribute(`aria-expanded`))},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handlePointerEnter=e=>{e.pointerType===`mouse`&&this.hasSubmenu&&!this.disabled&&(this.submenuOpen=!0)}}handleSizeChange(){n(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.addEventListener?.(`click`,this.handleHostClick),this.addEventListener?.(`pointerenter`,this.handlePointerEnter),this.shadowRoot?.addEventListener?.(`click`,this.handleClick,{capture:!0}),this.shadowRoot?.addEventListener?.(`slotchange`,this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.submenuGeneration++,this.closeSubmenu();let e=this.submenuElement;e&&(e.classList.remove(`show`,`hide`),e.hidden=!0,e.removeAttribute(`data-visible`),e.hidePopover?.()),this.removeEventListener?.(`click`,this.handleHostClick),this.removeEventListener?.(`pointerenter`,this.handlePointerEnter),this.shadowRoot?.removeEventListener?.(`click`,this.handleClick,{capture:!0}),this.shadowRoot?.removeEventListener?.(`slotchange`,this.handleSlotChange)}firstUpdated(e){super.firstUpdated(e),this.setAttribute(`tabindex`,`-1`),this.hasSubmenu=this.hasSlotController.test(`submenu`),this.updateHasSubmenuState()}updated(e){if(e.has(`active`)&&(this.setAttribute(`tabindex`,this.active?`0`:`-1`),this.customStates.set(`active`,this.active)),e.has(`checked`)&&(this.type===`checkbox`?this.setAttribute(`aria-checked`,this.checked?`true`:`false`):this.removeAttribute(`aria-checked`),this.customStates.set(`checked`,this.checked)),e.has(`disabled`)&&(this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.customStates.set(`disabled`,this.disabled)),e.has(`type`)&&(this.type===`checkbox`?(this.setAttribute(`role`,`menuitemcheckbox`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`)):(this.setAttribute(`role`,`menuitem`),this.removeAttribute(`aria-checked`))),(e.has(`href`)||e.has(`hasSubmenu`))&&this.customStates.set(`link`,this.isLink()),e.has(`submenuOpen`)){this.customStates.set(`submenu-open`,this.submenuOpen);let e=this.submenuAnimation;this.submenuAnimation=this.updateSubmenuVisibility(e)}}updateHasSubmenuState(){this.customStates.set(`has-submenu`,this.hasSubmenu)}async openSubmenu(){if(this.hasSubmenu&&this.submenuElement&&this.isConnected)return this.submenuOpen=!0,await this.updateComplete,this.submenuAnimation}async updateSubmenuVisibility(e){let t=this.submenuElement;if(this.submenuOpen||this.dispatchEvent(new Event(`submenu-closing`)),!this.hasSubmenu||!t||!this.isConnected){await e;return}let n=this.submenuOpen,r=++this.submenuGeneration,i=()=>r===this.submenuGeneration&&this.isConnected&&this.submenuOpen===n;if(t.classList.remove(`show`,`hide`),n){if(this.notifyParentOfOpening(),!i())return;t.showPopover?.(),t.hidden=!1,t.setAttribute(`data-visible`,``)}if(this.setAttribute(`aria-expanded`,String(n)),await e,await this.updateComplete,i()){if(n){let e=this.getSubmenuItems();e.forEach((e,t)=>e.active=t===0),e[0]?.focus({preventScroll:!0})}await oe(t,n?`show`:`hide`),i()&&(n||(t.hidden=!0,t.removeAttribute(`data-visible`),t.hidePopover?.()))}}notifyParentOfOpening(){let e=new CustomEvent(`submenu-opening`,{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(e)}async closeSubmenu(){if(this.hasSubmenu&&this.submenuElement)return this.submenuOpen=!1,this.dispatchEvent(new Event(`submenu-closing`)),await this.updateComplete,this.submenuAnimation}isLink(){return!!this.href&&!this.hasSubmenu}navigate(e){let t=this.linkElement;this.isLink()&&!this.disabled&&t&&t.dispatchEvent(new MouseEvent(`click`,{bubbles:!1,cancelable:!0,composed:!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1,shiftKey:e?.shiftKey??!1}))}getSubmenuItems(){return((this.submenuElement?.querySelector(`slot[name="submenu"]`))?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`&&!e.disabled)}render(){return j`
      ${this.href?j`
            <a
              id="link"
              href=${this.href}
              target=${ve(this.target)}
              rel=${ve(this.rel)}
              download=${ve(this.download)}
              tabindex="-1"
              aria-hidden="true"
            ></a>
          `:``}
      ${this.type===`checkbox`?j`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:``}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?j`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:``}
      ${this.hasSubmenu?j`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:j`<slot name="submenu" hidden></slot>`}
    `}},K.css=mi,y([P(`#submenu`)],K.prototype,`submenuElement`,2),y([P(`#link`)],K.prototype,`linkElement`,2),y([L({type:Boolean})],K.prototype,`active`,2),y([L({reflect:!0})],K.prototype,`variant`,2),y([L({reflect:!0})],K.prototype,`size`,2),y([w(`size`)],K.prototype,`handleSizeChange`,1),y([L({attribute:`checkbox-adjacent`,type:Boolean,reflect:!0})],K.prototype,`checkboxAdjacent`,2),y([L({attribute:`submenu-adjacent`,type:Boolean,reflect:!0})],K.prototype,`submenuAdjacent`,2),y([L()],K.prototype,`value`,2),y([L({reflect:!0})],K.prototype,`type`,2),y([L({type:Boolean})],K.prototype,`checked`,2),y([L({type:Boolean,reflect:!0})],K.prototype,`disabled`,2),y([L({type:Boolean,reflect:!0})],K.prototype,`submenuOpen`,2),y([L({reflect:!0})],K.prototype,`href`,2),y([L()],K.prototype,`target`,2),y([L()],K.prototype,`rel`,2),y([L()],K.prototype,`download`,2),y([be()],K.prototype,`hasSubmenu`,2),K=y([R(`wa-dropdown-item`)],K)})))()}function _i(){return(_i=e((()=>{pi(),gi(),hi(),di(),jn(),Ne(),c(),t(),k(),_(),A(),o()})))()}function vi(){return(vi=e((()=>{gi(),hi(),t(),k(),_()})))()}var yi,bi;function xi(){return(xi=e((()=>{yi=class{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}},bi=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}}})))()}var Si,Ci,wi,Ti;function Ei(){return(Ei=e((()=>{Se(),ye(),he(),xi(),ue(),Si=e=>!me(e)&&typeof e.then==`function`,Ci=1073741823,wi=class extends pe{constructor(){super(...arguments),this._$Cwt=Ci,this._$Cbt=[],this._$CK=new yi(this),this._$CX=new bi}render(...e){return e.find(e=>!Si(e))??ge}update(e,t){let n=this._$Cbt,r=n.length;this._$Cbt=t;let i=this._$CK,a=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){let o=t[e];if(!Si(o))return this._$Cwt=e,o;e<r&&o===n[e]||(this._$Cwt=Ci,r=0,Promise.resolve(o).then(async e=>{for(;a.get();)await a.get();let t=i.deref();if(t!==void 0){let n=t._$Cbt.indexOf(o);n>-1&&n<t._$Cwt&&(t._$Cwt=n,t.setValue(e))}}))}return ge}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}},Ti=_e(wi)})))()}var Di,Oi,ki,Ai;function ji(){return(ji=e((()=>{Ce(),Di={INITIAL:0,PENDING:1,COMPLETE:2,ERROR:3},Oi=Symbol(),ki=class{get taskComplete(){return this.t||=this.i===1?new Promise(((e,t)=>{this.o=e,this.h=t})):this.i===3?Promise.reject(this.l):Promise.resolve(this.u),this.t}constructor(e,t,n){this.p=0,this.i=0,(this._=e).addController(this);let r=typeof t==`object`?t:{task:t,args:n};this.v=r.task,this.j=r.args,this.m=r.argsEqual??Ai,this.k=r.onComplete,this.A=r.onError,this.autoRun=r.autoRun??!0,`initialValue`in r&&(this.u=r.initialValue,this.i=2,this.O=this.T?.())}hostUpdate(){!0===this.autoRun&&this.S()}hostUpdated(){this.autoRun===`afterUpdate`&&this.S()}T(){if(this.j===void 0)return;let e=this.j();if(!Array.isArray(e))throw Error(`The args function must return an array`);return e}async S(){let e=this.T(),t=this.O;this.O=e,e===t||e===void 0||t!==void 0&&this.m(t,e)||await this.run(e)}async run(e){let t,n;e??=this.T(),this.O=e,this.i===1?this.q?.abort():(this.t=void 0,this.o=void 0,this.h=void 0),this.i=1,this.autoRun===`afterUpdate`?queueMicrotask((()=>this._.requestUpdate())):this._.requestUpdate();let r=++this.p;this.q=new AbortController;let i=!1;try{t=await this.v(e,{signal:this.q.signal})}catch(e){i=!0,n=e}if(this.p===r){if(t===Oi)this.i=0;else{if(!1===i){try{this.k?.(t)}catch{}this.i=2,this.o?.(t)}else{try{this.A?.(n)}catch{}this.i=3,this.h?.(n)}this.u=t,this.l=n}this._.requestUpdate()}}abort(e){this.i===1&&this.q?.abort(e)}get value(){return this.u}get error(){return this.l}get status(){return this.i}render(e){switch(this.i){case 0:return e.initial?.();case 1:return e.pending?.();case 2:return e.complete?.(this.value);case 3:return e.error?.(this.error);default:throw Error(`Unexpected status: `+this.i)}}},Ai=(e,t)=>e===t||e.length===t.length&&e.every(((e,n)=>!xe(e,t[n])))})))()}function Mi(){return(Mi=e((()=>{ji()})))()}function Ni(){return(Ni=e((()=>{jn(),Ne(),_(),A(),o()})))()}function Pi(e,t=!1){let n=e.length,r=0,i=``,a=0,o=16,s=0,c=0,l=0,u=0,d=0;function f(t,n){let i=0,a=0;for(;i<t||!n;){let t=e.charCodeAt(r);if(t>=48&&t<=57)a=a*16+t-48;else if(t>=65&&t<=70)a=a*16+t-65+10;else if(t>=97&&t<=102)a=a*16+t-97+10;else break;r++,i++}return i<t&&(a=-1),a}function p(e){r=e,i=``,a=0,o=16,d=0}function m(){let t=r;if(e.charCodeAt(r)===48)r++;else for(r++;r<e.length&&Li(e.charCodeAt(r));)r++;if(r<e.length&&e.charCodeAt(r)===46){if(r++,r<e.length&&Li(e.charCodeAt(r)))for(r++;r<e.length&&Li(e.charCodeAt(r));)r++;else return d=3,e.substring(t,r)}let n=r;if(r<e.length&&(e.charCodeAt(r)===69||e.charCodeAt(r)===101)){if(r++,(r<e.length&&e.charCodeAt(r)===43||e.charCodeAt(r)===45)&&r++,r<e.length&&Li(e.charCodeAt(r))){for(r++;r<e.length&&Li(e.charCodeAt(r));)r++;n=r}else d=3}return e.substring(t,n)}function h(){let t=``,i=r;for(;;){if(r>=n){t+=e.substring(i,r),d=2;break}let a=e.charCodeAt(r);if(a===34){t+=e.substring(i,r),r++;break}if(a===92){if(t+=e.substring(i,r),r++,r>=n){d=2;break}switch(e.charCodeAt(r++)){case 34:t+=`"`;break;case 92:t+=`\\`;break;case 47:t+=`/`;break;case 98:t+=`\b`;break;case 102:t+=`\f`;break;case 110:t+=`
`;break;case 114:t+=`\r`;break;case 116:t+=`	`;break;case 117:let e=f(4,!0);e>=0?t+=String.fromCharCode(e):d=4;break;default:d=5}i=r;continue}if(a>=0&&a<=31){if(Ii(a)){t+=e.substring(i,r),d=2;break}d=6}r++}return t}function g(){if(i=``,d=0,a=r,c=s,u=l,r>=n)return a=n,o=17;let t=e.charCodeAt(r);if(Fi(t)){do r++,i+=String.fromCharCode(t),t=e.charCodeAt(r);while(Fi(t));return o=15}if(Ii(t))return r++,i+=String.fromCharCode(t),t===13&&e.charCodeAt(r)===10&&(r++,i+=`
`),s++,l=r,o=14;switch(t){case 123:return r++,o=1;case 125:return r++,o=2;case 91:return r++,o=3;case 93:return r++,o=4;case 58:return r++,o=6;case 44:return r++,o=5;case 34:return r++,i=h(),o=10;case 47:let c=r-1;if(e.charCodeAt(r+1)===47){for(r+=2;r<n&&!Ii(e.charCodeAt(r));)r++;return i=e.substring(c,r),o=12}if(e.charCodeAt(r+1)===42){r+=2;let t=n-1,a=!1;for(;r<t;){let t=e.charCodeAt(r);if(t===42&&e.charCodeAt(r+1)===47){r+=2,a=!0;break}r++,Ii(t)&&(t===13&&e.charCodeAt(r)===10&&r++,s++,l=r)}return a||(r++,d=1),i=e.substring(c,r),o=13}return i+=String.fromCharCode(t),r++,o=16;case 45:if(i+=String.fromCharCode(t),r++,r===n||!Li(e.charCodeAt(r)))return o=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return i+=m(),o=11;default:for(;r<n&&_(t);)r++,t=e.charCodeAt(r);if(a!==r){switch(i=e.substring(a,r),i){case`true`:return o=8;case`false`:return o=9;case`null`:return o=7}return o=16}return i+=String.fromCharCode(t),r++,o=16}}function _(e){if(Fi(e)||Ii(e))return!1;switch(e){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return!1}return!0}function v(){let e;do e=g();while(e>=12&&e<=15);return e}return{setPosition:p,getPosition:()=>r,scan:t?v:g,getToken:()=>o,getTokenValue:()=>i,getTokenOffset:()=>a,getTokenLength:()=>r-a,getTokenStartLine:()=>c,getTokenStartCharacter:()=>a-u,getTokenError:()=>d}}function Fi(e){return e===32||e===9}function Ii(e){return e===10||e===13}function Li(e){return e>=48&&e<=57}var Ri;function zi(){return(zi=e((()=>{(function(e){e[e.lineFeed=10]=`lineFeed`,e[e.carriageReturn=13]=`carriageReturn`,e[e.space=32]=`space`,e[e._0=48]=`_0`,e[e._1=49]=`_1`,e[e._2=50]=`_2`,e[e._3=51]=`_3`,e[e._4=52]=`_4`,e[e._5=53]=`_5`,e[e._6=54]=`_6`,e[e._7=55]=`_7`,e[e._8=56]=`_8`,e[e._9=57]=`_9`,e[e.a=97]=`a`,e[e.b=98]=`b`,e[e.c=99]=`c`,e[e.d=100]=`d`,e[e.e=101]=`e`,e[e.f=102]=`f`,e[e.g=103]=`g`,e[e.h=104]=`h`,e[e.i=105]=`i`,e[e.j=106]=`j`,e[e.k=107]=`k`,e[e.l=108]=`l`,e[e.m=109]=`m`,e[e.n=110]=`n`,e[e.o=111]=`o`,e[e.p=112]=`p`,e[e.q=113]=`q`,e[e.r=114]=`r`,e[e.s=115]=`s`,e[e.t=116]=`t`,e[e.u=117]=`u`,e[e.v=118]=`v`,e[e.w=119]=`w`,e[e.x=120]=`x`,e[e.y=121]=`y`,e[e.z=122]=`z`,e[e.A=65]=`A`,e[e.B=66]=`B`,e[e.C=67]=`C`,e[e.D=68]=`D`,e[e.E=69]=`E`,e[e.F=70]=`F`,e[e.G=71]=`G`,e[e.H=72]=`H`,e[e.I=73]=`I`,e[e.J=74]=`J`,e[e.K=75]=`K`,e[e.L=76]=`L`,e[e.M=77]=`M`,e[e.N=78]=`N`,e[e.O=79]=`O`,e[e.P=80]=`P`,e[e.Q=81]=`Q`,e[e.R=82]=`R`,e[e.S=83]=`S`,e[e.T=84]=`T`,e[e.U=85]=`U`,e[e.V=86]=`V`,e[e.W=87]=`W`,e[e.X=88]=`X`,e[e.Y=89]=`Y`,e[e.Z=90]=`Z`,e[e.asterisk=42]=`asterisk`,e[e.backslash=92]=`backslash`,e[e.closeBrace=125]=`closeBrace`,e[e.closeBracket=93]=`closeBracket`,e[e.colon=58]=`colon`,e[e.comma=44]=`comma`,e[e.dot=46]=`dot`,e[e.doubleQuote=34]=`doubleQuote`,e[e.minus=45]=`minus`,e[e.openBrace=123]=`openBrace`,e[e.openBracket=91]=`openBracket`,e[e.plus=43]=`plus`,e[e.slash=47]=`slash`,e[e.formFeed=12]=`formFeed`,e[e.tab=9]=`tab`})(Ri||={})})))()}var q,Bi,Vi,Hi;function Ui(){return(Ui=e((()=>{q=Array(20).fill(0).map((e,t)=>` `.repeat(t)),Bi=200,Vi={" ":{"\n":Array(Bi).fill(0).map((e,t)=>`
`+` `.repeat(t)),"\r":Array(Bi).fill(0).map((e,t)=>`\r`+` `.repeat(t)),"\r\n":Array(Bi).fill(0).map((e,t)=>`\r
`+` `.repeat(t))},"	":{"\n":Array(Bi).fill(0).map((e,t)=>`
`+`	`.repeat(t)),"\r":Array(Bi).fill(0).map((e,t)=>`\r`+`	`.repeat(t)),"\r\n":Array(Bi).fill(0).map((e,t)=>`\r
`+`	`.repeat(t))}},Hi=[`
`,`\r`,`\r
`]})))()}function Wi(e,t,n){let r,i,a,o,s;if(t){for(o=t.offset,s=o+t.length,a=o;a>0&&!Ji(e,a-1);)a--;let c=s;for(;c<e.length&&!Ji(e,c);)c++;i=e.substring(a,c),r=Ki(i,n)}else i=e,r=0,a=0,o=0,s=e.length;let c=qi(n,e),l=Hi.includes(c),u=0,d=0,f;f=n.insertSpaces?q[n.tabSize||4]??Gi(q[1],n.tabSize||4):`	`;let p=f===`	`?`	`:` `,m=Pi(i,!1),h=!1;function g(){if(u>1)return Gi(c,u)+Gi(f,r+d);let e=f.length*(r+d);return!l||e>Vi[p][c].length?c+Gi(f,r+d):e<=0?c:Vi[p][c][e]}function _(){let e=m.scan();for(u=0;e===15||e===14;)e===14&&n.keepLines?u+=1:e===14&&(u=1),e=m.scan();return h=e===16||m.getTokenError()!==0,e}let v=[];function y(n,r,i){!h&&(!t||r<s&&i>o)&&e.substring(r,i)!==n&&v.push({offset:r,length:i-r,content:n})}let b=_();if(n.keepLines&&u>0&&y(Gi(c,u),0,0),b!==17){let e=m.getTokenOffset()+a;y(f.length*r<20&&n.insertSpaces?q[f.length*r]:Gi(f,r),a,e)}for(;b!==17;){let e=m.getTokenOffset()+m.getTokenLength()+a,t=_(),r=``,i=!1;for(;u===0&&(t===12||t===13);){let n=m.getTokenOffset()+a;y(q[1],e,n),e=m.getTokenOffset()+m.getTokenLength()+a,i=t===12,r=i?g():``,t=_()}if(t===2)b!==1&&d--,n.keepLines&&u>0||!n.keepLines&&b!==1?r=g():n.keepLines&&(r=q[1]);else if(t===4)b!==3&&d--,n.keepLines&&u>0||!n.keepLines&&b!==3?r=g():n.keepLines&&(r=q[1]);else{switch(b){case 3:case 1:d++,r=n.keepLines&&u>0||!n.keepLines?g():q[1];break;case 5:r=n.keepLines&&u>0||!n.keepLines?g():q[1];break;case 12:r=g();break;case 13:u>0?r=g():i||(r=q[1]);break;case 6:n.keepLines&&u>0?r=g():i||(r=q[1]);break;case 10:n.keepLines&&u>0?r=g():t===6&&!i&&(r=``);break;case 7:case 8:case 9:case 11:case 2:case 4:n.keepLines&&u>0?r=g():(t===12||t===13)&&!i?r=q[1]:t!==5&&t!==17&&(h=!0);break;case 16:h=!0}u>0&&(t===12||t===13)&&(r=g())}t===17&&(r=n.keepLines&&u>0?g():n.insertFinalNewline?c:``);let o=m.getTokenOffset()+a;y(r,e,o),b=t}return v}function Gi(e,t){let n=``;for(let r=0;r<t;r++)n+=e;return n}function Ki(e,t){let n=0,r=0,i=t.tabSize||4;for(;n<e.length;){let t=e.charAt(n);if(t===q[1])r++;else if(t===`	`)r+=i;else break;n++}return Math.floor(r/i)}function qi(e,t){for(let e=0;e<t.length;e++){let n=t.charAt(e);if(n===`\r`)return e+1<t.length&&t.charAt(e+1)===`
`?`\r
`:`\r`;if(n===`
`)return`
`}return e&&e.eol||`
`}function Ji(e,t){return`\r
`.indexOf(e.charAt(t))!==-1}function Yi(){return(Yi=e((()=>{zi(),Ui()})))()}function Xi(e,t=[],n=$i.DEFAULT){let r={type:`array`,offset:-1,length:-1,children:[],parent:void 0};function i(e){r.type===`property`&&(r.length=e-r.offset,r=r.parent)}function a(e){return r.children.push(e),e}Zi(e,{onObjectBegin:e=>{r=a({type:`object`,offset:e,length:-1,parent:r,children:[]})},onObjectProperty:(e,t,n)=>{r=a({type:`property`,offset:t,length:-1,parent:r,children:[]}),r.children.push({type:`string`,value:e,offset:t,length:n,parent:r})},onObjectEnd:(e,t)=>{i(e+t),r.length=e+t-r.offset,r=r.parent,i(e+t)},onArrayBegin:(e,t)=>{r=a({type:`array`,offset:e,length:-1,parent:r,children:[]})},onArrayEnd:(e,t)=>{r.length=e+t-r.offset,r=r.parent,i(e+t)},onLiteralValue:(e,t,n)=>{a({type:Qi(e),offset:t,length:n,parent:r,value:e}),i(t+n)},onSeparator:(e,t,n)=>{r.type===`property`&&(e===`:`?r.colonOffset=t:e===`,`&&i(t))},onError:(e,n,r)=>{t.push({error:e,offset:n,length:r})}},n);let o=r.children[0];return o&&delete o.parent,o}function Zi(e,t,n=$i.DEFAULT){let r=Pi(e,!1),i=[],a=0;function o(e){return e?()=>a===0&&e(r.getTokenOffset(),r.getTokenLength(),r.getTokenStartLine(),r.getTokenStartCharacter()):()=>!0}function s(e){return e?t=>a===0&&e(t,r.getTokenOffset(),r.getTokenLength(),r.getTokenStartLine(),r.getTokenStartCharacter()):()=>!0}function c(e){return e?t=>a===0&&e(t,r.getTokenOffset(),r.getTokenLength(),r.getTokenStartLine(),r.getTokenStartCharacter(),()=>i.slice()):()=>!0}function l(e){return e?()=>{a>0?a++:e(r.getTokenOffset(),r.getTokenLength(),r.getTokenStartLine(),r.getTokenStartCharacter(),()=>i.slice())===!1&&(a=1)}:()=>!0}function u(e){return e?()=>{a>0&&a--,a===0&&e(r.getTokenOffset(),r.getTokenLength(),r.getTokenStartLine(),r.getTokenStartCharacter())}:()=>!0}let d=l(t.onObjectBegin),f=c(t.onObjectProperty),p=u(t.onObjectEnd),m=l(t.onArrayBegin),h=u(t.onArrayEnd),g=c(t.onLiteralValue),_=s(t.onSeparator),v=o(t.onComment),y=s(t.onError),b=n&&n.disallowComments,x=n&&n.allowTrailingComma;function S(){for(;;){let e=r.scan();switch(r.getTokenError()){case 4:C(14);break;case 5:C(15);break;case 3:C(13);break;case 1:b||C(11);break;case 2:C(12);break;case 6:C(16)}switch(e){case 12:case 13:b?C(10):v();break;case 16:C(1);break;case 15:case 14:break;default:return e}}}function C(e,t=[],n=[]){if(y(e),t.length+n.length>0){let e=r.getToken();for(;e!==17;){if(t.indexOf(e)!==-1){S();break}if(n.indexOf(e)!==-1)break;e=S()}}}function w(e){let t=r.getTokenValue();return e?g(t):(f(t),i.push(t)),S(),!0}function T(){switch(r.getToken()){case 11:let e=r.getTokenValue(),t=Number(e);isNaN(t)&&(C(2),t=0),g(t);break;case 7:g(null);break;case 8:g(!0);break;case 9:g(!1);break;default:return!1}return S(),!0}function E(){return r.getToken()===10?(w(!1),r.getToken()===6?(_(`:`),S(),k()||C(4,[],[2,5])):C(5,[],[2,5]),i.pop(),!0):(C(3,[],[2,5]),!1)}function D(){d(),S();let e=!1;for(;r.getToken()!==2&&r.getToken()!==17;){if(r.getToken()===5){if(e||C(4,[],[]),_(`,`),S(),r.getToken()===2&&x)break}else e&&C(6,[],[]);E()||C(4,[],[2,5]),e=!0}return p(),r.getToken()===2?S():C(7,[2],[]),!0}function O(){m(),S();let e=!0,t=!1;for(;r.getToken()!==4&&r.getToken()!==17;){if(r.getToken()===5){if(t||C(4,[],[]),_(`,`),S(),r.getToken()===4&&x)break}else t&&C(6,[],[]);e?(i.push(0),e=!1):i[i.length-1]++,k()||C(4,[],[4,5]),t=!0}return h(),e||i.pop(),r.getToken()===4?S():C(8,[4],[]),!0}function k(){switch(r.getToken()){case 3:return O();case 1:return D();case 10:return w(!0);default:return T()}}return S(),r.getToken()===17?n.allowEmptyContent?!0:(C(4,[],[]),!1):k()?(r.getToken()!==17&&C(9,[],[]),!0):(C(4,[],[]),!1)}function Qi(e){switch(typeof e){case`boolean`:return`boolean`;case`number`:return`number`;case`string`:return`string`;case`object`:return e?Array.isArray(e)?`array`:`object`:`null`;default:return`null`}}var $i;function ea(){return(ea=e((()=>{zi(),(function(e){e.DEFAULT={allowTrailingComma:!1}})($i||={})})))()}function ta(e,t){return e.substring(0,t.offset)+t.content+e.substring(t.offset+t.length)}function na(){return(na=e((()=>{Yi(),ea()})))()}function ra(e,t,n){return Wi(e,t,n)}function ia(e,t){let n=t.slice(0).sort((e,t)=>{let n=e.offset-t.offset;return n===0?e.length-t.length:n}),r=e.length;for(let t=n.length-1;t>=0;t--){let i=n[t];if(i.offset+i.length<=r)e=ta(e,i);else throw Error(`Overlapping edit`);r=i.offset}return e}var aa,oa,sa,ca,la;function ua(){return(ua=e((()=>{Yi(),na(),zi(),ea(),aa=Pi,(function(e){e[e.None=0]=`None`,e[e.UnexpectedEndOfComment=1]=`UnexpectedEndOfComment`,e[e.UnexpectedEndOfString=2]=`UnexpectedEndOfString`,e[e.UnexpectedEndOfNumber=3]=`UnexpectedEndOfNumber`,e[e.InvalidUnicode=4]=`InvalidUnicode`,e[e.InvalidEscapeCharacter=5]=`InvalidEscapeCharacter`,e[e.InvalidCharacter=6]=`InvalidCharacter`})(oa||={}),(function(e){e[e.OpenBraceToken=1]=`OpenBraceToken`,e[e.CloseBraceToken=2]=`CloseBraceToken`,e[e.OpenBracketToken=3]=`OpenBracketToken`,e[e.CloseBracketToken=4]=`CloseBracketToken`,e[e.CommaToken=5]=`CommaToken`,e[e.ColonToken=6]=`ColonToken`,e[e.NullKeyword=7]=`NullKeyword`,e[e.TrueKeyword=8]=`TrueKeyword`,e[e.FalseKeyword=9]=`FalseKeyword`,e[e.StringLiteral=10]=`StringLiteral`,e[e.NumericLiteral=11]=`NumericLiteral`,e[e.LineCommentTrivia=12]=`LineCommentTrivia`,e[e.BlockCommentTrivia=13]=`BlockCommentTrivia`,e[e.LineBreakTrivia=14]=`LineBreakTrivia`,e[e.Trivia=15]=`Trivia`,e[e.Unknown=16]=`Unknown`,e[e.EOF=17]=`EOF`})(sa||={}),ca=Xi,(function(e){e[e.InvalidSymbol=1]=`InvalidSymbol`,e[e.InvalidNumberFormat=2]=`InvalidNumberFormat`,e[e.PropertyNameExpected=3]=`PropertyNameExpected`,e[e.ValueExpected=4]=`ValueExpected`,e[e.ColonExpected=5]=`ColonExpected`,e[e.CommaExpected=6]=`CommaExpected`,e[e.CloseBraceExpected=7]=`CloseBraceExpected`,e[e.CloseBracketExpected=8]=`CloseBracketExpected`,e[e.EndOfFileExpected=9]=`EndOfFileExpected`,e[e.InvalidCommentToken=10]=`InvalidCommentToken`,e[e.UnexpectedEndOfComment=11]=`UnexpectedEndOfComment`,e[e.UnexpectedEndOfString=12]=`UnexpectedEndOfString`,e[e.UnexpectedEndOfNumber=13]=`UnexpectedEndOfNumber`,e[e.InvalidUnicode=14]=`InvalidUnicode`,e[e.InvalidEscapeCharacter=15]=`InvalidEscapeCharacter`,e[e.InvalidCharacter=16]=`InvalidCharacter`})(la||={})})))()}var da,fa,pa,ma,ha;function ga(){return(ga=e((()=>{da=[161,161,164,164,167,168,170,170,173,174,176,180,182,186,188,191,198,198,208,208,215,216,222,225,230,230,232,234,236,237,240,240,242,243,247,250,252,252,254,254,257,257,273,273,275,275,283,283,294,295,299,299,305,307,312,312,319,322,324,324,328,331,333,333,338,339,358,359,363,363,462,462,464,464,466,466,468,468,470,470,472,472,474,474,476,476,593,593,609,609,708,708,711,711,713,715,717,717,720,720,728,731,733,733,735,735,768,879,913,929,931,937,945,961,963,969,1025,1025,1040,1103,1105,1105,8208,8208,8211,8214,8216,8217,8220,8221,8224,8226,8228,8231,8240,8240,8242,8243,8245,8245,8251,8251,8254,8254,8308,8308,8319,8319,8321,8324,8364,8364,8451,8451,8453,8453,8457,8457,8467,8467,8470,8470,8481,8482,8486,8486,8491,8491,8531,8532,8539,8542,8544,8555,8560,8569,8585,8585,8592,8601,8632,8633,8658,8658,8660,8660,8679,8679,8704,8704,8706,8707,8711,8712,8715,8715,8719,8719,8721,8721,8725,8725,8730,8730,8733,8736,8739,8739,8741,8741,8743,8748,8750,8750,8756,8759,8764,8765,8776,8776,8780,8780,8786,8786,8800,8801,8804,8807,8810,8811,8814,8815,8834,8835,8838,8839,8853,8853,8857,8857,8869,8869,8895,8895,8978,8978,9312,9449,9451,9547,9552,9587,9600,9615,9618,9621,9632,9633,9635,9641,9650,9651,9654,9655,9660,9661,9664,9665,9670,9672,9675,9675,9678,9681,9698,9701,9711,9711,9733,9734,9737,9737,9742,9743,9756,9756,9758,9758,9792,9792,9794,9794,9824,9825,9827,9829,9831,9834,9836,9837,9839,9839,9886,9887,9919,9919,9926,9933,9935,9939,9941,9953,9955,9955,9960,9961,9963,9969,9972,9972,9974,9977,9979,9980,9982,9983,10045,10045,10102,10111,11094,11097,12872,12879,57344,63743,65024,65039,65533,65533,127232,127242,127248,127277,127280,127337,127344,127373,127375,127376,127387,127404,917760,917999,983040,1048573,1048576,1114109],fa=[12288,12288,65281,65376,65504,65510],pa=[8361,8361,65377,65470,65474,65479,65482,65487,65490,65495,65498,65500,65512,65518],ma=[32,126,162,163,165,166,172,172,175,175,10214,10221,10629,10630],ha=[4352,4447,8986,8987,9001,9002,9193,9196,9200,9200,9203,9203,9725,9726,9748,9749,9776,9783,9800,9811,9855,9855,9866,9871,9875,9875,9889,9889,9898,9899,9917,9918,9924,9925,9934,9934,9940,9940,9962,9962,9970,9971,9973,9973,9978,9978,9981,9981,9989,9989,9994,9995,10024,10024,10060,10060,10062,10062,10067,10069,10071,10071,10133,10135,10160,10160,10175,10175,11035,11036,11088,11088,11093,11093,11904,11929,11931,12019,12032,12245,12272,12287,12289,12350,12353,12438,12441,12543,12549,12591,12593,12686,12688,12773,12783,12830,12832,12871,12880,42124,42128,42182,43360,43388,44032,55203,63744,64255,65040,65049,65072,65106,65108,65126,65128,65131,94176,94180,94192,94198,94208,101594,101631,101664,101760,101874,101888,102801,102816,102866,110576,110579,110581,110587,110589,110590,110592,110888,110898,110898,110928,110930,110933,110933,110948,110952,110960,111355,119552,119638,119648,119670,126980,126980,127183,127183,127374,127374,127377,127386,127406,127406,127488,127490,127504,127547,127552,127560,127568,127569,127584,127589,127744,127776,127789,127797,127799,127868,127870,127891,127904,127946,127951,127955,127968,127984,127988,127988,127992,128062,128064,128064,128066,128252,128255,128317,128331,128334,128336,128359,128378,128378,128405,128406,128420,128420,128507,128591,128640,128709,128716,128716,128720,128722,128725,128729,128732,128735,128747,128748,128756,128764,128986,128986,128992,129003,129008,129008,129292,129338,129340,129349,129351,129535,129648,129660,129664,129734,129736,129736,129740,129757,129759,129771,129775,129786,131072,196605,196608,262141]})))()}var _a;function va(){return(va=e((()=>{_a=(e,t)=>{let n=0,r=Math.floor(e.length/2)-1;for(;n<=r;){let i=Math.floor((n+r)/2),a=i*2;if(t<e[a])r=i-1;else if(t>e[a+1])n=i+1;else return!0}return!1}})))()}function ya(e){let t=e[0],n=e[1];for(let r=0;r<e.length;r+=2){let i=e[r],a=e[r+1];if(xa>=i&&xa<=a)return[i,a];a-i>n-t&&(t=i,n=a)}return[t,n]}function ba(e){return wa(e)?`ambiguous`:Ta(e)?`fullwidth`:Ea(e)?`halfwidth`:Da(e)?`narrow`:Oa(e)?`wide`:`neutral`}var xa,Sa,Ca,wa,Ta,Ea,Da,Oa;function ka(){return(ka=e((()=>{ga(),va(),xa=19968,[Sa,Ca]=ya(ha),wa=e=>e<161||e>1114109?!1:_a(da,e),Ta=e=>e<12288||e>65510?!1:_a(fa,e),Ea=e=>e<8361||e>65518?!1:_a(pa,e),Da=e=>e<32||e>10630?!1:_a(ma,e),Oa=e=>e>=Sa&&e<=Ca?!0:e<4352||e>262141?!1:_a(ha,e)})))()}function Aa(e){if(!Number.isSafeInteger(e))throw TypeError(`Expected a code point, got \`${typeof e}\`.`)}function ja(e){return Aa(e),ba(e)}function Ma(){return(Ma=e((()=>{ka()})))()}var Na,Pa,Fa;function Ia(){return(Ia=e((()=>{Na={emoji:`🧩`,detailKeys:[`command`,`path`,`url`,`targetUrl`,`targetId`,`ref`,`element`,`node`,`nodeId`,`id`,`requestId`,`to`,`channelId`,`guildId`,`userId`,`name`,`query`,`pattern`,`messageId`]},Pa=JSON.parse(`{"bash":{"emoji":"🛠️","title":"Bash","detailKeys":["command"]},"computer":{"emoji":"🖱️","title":"Computer","detailKeys":["action","coordinate","text","node","nodeId","screenIndex"]},"mobile_ui":{"emoji":"📱","title":"Mobile UI","detailKeys":["action","mobileAction","snapshotId","node","nodeId"]},"screen":{"emoji":"🖥️","title":"Screen","detailKeys":["action","sessionKey","dock"]},"theme":{"emoji":"🎨","title":"Theme","detailKeys":["action","id","mode"]},"terminal":{"emoji":"⌨️","title":"Terminal","detailKeys":["action","sessionId","command","cwd"]},"portal":{"emoji":"🌐","title":"Portal","detailKeys":["action","port","id","title","path"]},"process":{"emoji":"🧰","title":"Process","detailKeys":["sessionId"]},"gateway_process":{"emoji":"🧰","title":"Background Shell","detailKeys":["action","sessionId"]},"read":{"emoji":"📖","title":"Read","detailKeys":["path"]},"write":{"emoji":"✍️","title":"Write","detailKeys":["path"]},"edit":{"emoji":"📝","title":"Edit","detailKeys":["path"]},"personal_instructions":{"emoji":"📝","title":"Personal Instructions","detailKeys":["action","agentId"],"actions":{"get":{"label":"read","detailKeys":["agentId"]},"set":{"label":"save","detailKeys":["agentId"]}}},"presence":{"emoji":"🧩","title":"Presence"},"attach":{"emoji":"📎","title":"Attach","detailKeys":["path","url","fileName"]},"api":{"emoji":"🌐","title":"API","detailKeys":["url","endpoint","path","method","name"]},"browser":{"emoji":"🌐","title":"Browser","actions":{"status":{"label":"status"},"start":{"label":"start"},"stop":{"label":"stop"},"tabs":{"label":"tabs"},"open":{"label":"open","detailKeys":["targetUrl"]},"focus":{"label":"focus","detailKeys":["targetId"]},"close":{"label":"close","detailKeys":["targetId"]},"snapshot":{"label":"snapshot","detailKeys":["targetUrl","targetId","ref","element","format"]},"screenshot":{"label":"screenshot","detailKeys":["targetUrl","targetId","ref","element"]},"navigate":{"label":"navigate","detailKeys":["targetUrl","targetId"]},"console":{"label":"console","detailKeys":["level","targetId"]},"pdf":{"label":"pdf","detailKeys":["targetId"]},"upload":{"label":"upload","detailKeys":["paths","ref","inputRef","element","targetId"]},"dialog":{"label":"dialog","detailKeys":["accept","promptText","targetId"]},"act":{"label":"act","detailKeys":["request.kind","request.ref","request.selector","request.text","request.value"]}}},"canvas":{"emoji":"🖼️","title":"Canvas","actions":{"present":{"label":"present","detailKeys":["target","node","nodeId"]},"hide":{"label":"hide","detailKeys":["node","nodeId"]},"navigate":{"label":"navigate","detailKeys":["url","node","nodeId"]}}},"dashboard":{"emoji":"📋","title":"Dashboard","detailKeys":["action","tabId","name","title"]},"nodes":{"emoji":"📱","title":"Nodes","actions":{"status":{"label":"status"},"describe":{"label":"describe","detailKeys":["node","nodeId"]},"pending":{"label":"pending"},"approve":{"label":"approve","detailKeys":["requestId"]},"reject":{"label":"reject","detailKeys":["requestId"]},"notify":{"label":"notify","detailKeys":["node","nodeId","title","body"]},"camera_snap":{"label":"camera snap","detailKeys":["node","nodeId","facing","deviceId"]},"camera_list":{"label":"camera list","detailKeys":["node","nodeId"]},"camera_clip":{"label":"camera clip","detailKeys":["node","nodeId","facing","duration","durationMs"]},"camera_ptz":{"label":"camera PTZ","detailKeys":["ptzOperation","node","nodeId","deviceId"]},"screen_record":{"label":"screen record","detailKeys":["node","nodeId","duration","durationMs","fps","screenIndex"]},"screen_snapshot":{"label":"screen snapshot","detailKeys":["node","nodeId","screenIndex","maxWidth"]}}},"cron":{"emoji":"⏰","title":"Cron","actions":{"status":{"label":"status"},"list":{"label":"list"},"add":{"label":"add","detailKeys":["job.name","job.id","job.schedule","job.cron"]},"update":{"label":"update","detailKeys":["id"]},"remove":{"label":"remove","detailKeys":["id"]},"run":{"label":"run","detailKeys":["id"]},"runs":{"label":"runs","detailKeys":["id"]},"wake":{"label":"wake","detailKeys":["text","mode"]}}},"get_goal":{"emoji":"🎯","title":"Get Goal","detailKeys":[]},"create_goal":{"emoji":"🎯","title":"Create Goal","detailKeys":["objective","token_budget"]},"update_goal":{"emoji":"🎯","title":"Update Goal","detailKeys":["status"]},"progress_card":{"emoji":"🗺️","title":"Progress Card"},"ask_user":{"emoji":"❓","title":"Ask User","detailKeys":["questions.0.question"]},"secrets":{"emoji":"🔑","title":"Secrets","detailKeys":["action","name","kind"]},"suggest_task":{"emoji":"✨","title":"Suggest Task","detailKeys":["title","tldr","cwd"]},"dismiss_task":{"emoji":"🗑️","title":"Dismiss Task","detailKeys":["task_id","reason"]},"skill_workshop":{"emoji":"🧰","title":"Skill Workshop","detailKeys":["action","name","proposal_id"]},"openclaw":{"emoji":"🦀","title":"OpenClaw","detailKeys":["action","path","model"]},"gateway":{"emoji":"🔌","title":"Gateway","detailKeys":["action","path"]},"plugins":{"emoji":"🧩","title":"Plugins","detailKeys":["action","pluginId","packageName","query"]},"exec":{"emoji":"🛠️","title":"Exec","detailKeys":["command"]},"tool_call":{"emoji":"🧰","title":"Tool Call","detailKeys":[]},"tool_call_update":{"emoji":"🧰","title":"Tool Call","detailKeys":[]},"session_status":{"emoji":"📊","title":"Session Status","detailKeys":["sessionKey","model"]},"github_publish":{"emoji":"🔀","title":"GitHub Publish","detailKeys":["title"]},"github_identity_status":{"emoji":"🔐","title":"GitHub Identity Status","detailKeys":[]},"sessions":{"emoji":"🗂️","title":"Session Settings","actions":{"patch":{"label":"update","detailKeys":["sessionKey","label","pinned","archived","model","thinkingLevel"]},"group_list":{"label":"groups"},"group_set":{"label":"set groups","detailKeys":["names"]},"group_rename":{"label":"rename group","detailKeys":["name","to"]},"group_delete":{"label":"delete group","detailKeys":["name"]}}},"sessions_list":{"emoji":"🗂️","title":"Sessions","detailKeys":["kinds","label","agentId","search","limit","activeMinutes","includeDerivedTitles","includeLastMessage","messageLimit"]},"conversations_list":{"emoji":"💬","title":"Conversations","detailKeys":["channel","limit"]},"conversations_send":{"emoji":"📨","title":"Conversation Send","detailKeys":["conversationRef"]},"conversations_turn":{"emoji":"↔️","title":"Conversation Turn","detailKeys":["conversationRef","timeoutSeconds"]},"sessions_send":{"emoji":"📨","title":"Session Send","detailKeys":["label","sessionKey","agentId","timeoutSeconds"]},"sessions_history":{"emoji":"🧾","title":"Session History","detailKeys":["sessionKey","limit","includeTools"]},"sessions_search":{"emoji":"🔎","title":"Session Search","detailKeys":["query","sessionKey","limit"]},"transcripts":{"emoji":"🎙️","title":"Transcripts","actions":{"start":{"label":"start","detailKeys":["sessionId","title","providerId","accountId","guildId","channelId","meetingUrl"]},"stop":{"label":"stop","detailKeys":["sessionId"]},"status":{"label":"status"},"import":{"label":"import","detailKeys":["sessionId","title","providerId","meetingUrl","speakerLabel"]},"summarize":{"label":"summarize","detailKeys":["sessionId"]}}},"sessions_spawn":{"emoji":"🧑‍🔧","title":"Sub-agent","detailKeys":["label","taskName","agentId","model","thinking","runTimeoutSeconds","cleanup"]},"agents_wait":{"emoji":"⏳","title":"Wait for Agents","detailKeys":["ids","timeoutSeconds"]},"structured_output":{"emoji":"🧾","title":"Structured Output","detailKeys":["result"]},"subagents":{"emoji":"🤖","title":"Subagents","actions":{"list":{"label":"list","detailKeys":["recentMinutes"]},"kill":{"label":"kill","detailKeys":["target"]},"steer":{"label":"steer","detailKeys":["target"]}}},"agents_list":{"emoji":"🧭","title":"Agents","detailKeys":[]},"memory_search":{"emoji":"🧠","title":"Memory Search","detailKeys":["query"]},"memory_get":{"emoji":"📓","title":"Memory Get","detailKeys":["path","from","lines"]},"web_search":{"emoji":"🔎","title":"Web Search","detailKeys":["query","count"]},"web_fetch":{"emoji":"📄","title":"Web Fetch","detailKeys":["url","extractMode","maxChars"]},"code_execution":{"emoji":"🧮","title":"Code Execution","detailKeys":["task"]},"decision_evaluate":{"emoji":"⚖️","title":"Decision Evaluation","detailKeys":[]},"message":{"emoji":"✉️","title":"Message","actions":{"send":{"label":"send","detailKeys":["provider","to","media","replyTo","threadId"]},"poll":{"label":"poll","detailKeys":["provider","to","pollQuestion"]},"react":{"label":"react","detailKeys":["provider","to","messageId","emoji","remove"]},"reactions":{"label":"reactions","detailKeys":["provider","to","messageId","limit"]},"read":{"label":"read","detailKeys":["provider","to","limit"]},"edit":{"label":"edit","detailKeys":["provider","to","messageId"]},"delete":{"label":"delete","detailKeys":["provider","to","messageId"]},"pin":{"label":"pin","detailKeys":["provider","to","messageId"]},"unpin":{"label":"unpin","detailKeys":["provider","to","messageId"]},"list-pins":{"label":"list pins","detailKeys":["provider","to"]},"permissions":{"label":"permissions","detailKeys":["provider","channelId","to"]},"thread-create":{"label":"thread create","detailKeys":["provider","channelId","threadName"]},"thread-list":{"label":"thread list","detailKeys":["provider","guildId","channelId"]},"thread-reply":{"label":"thread reply","detailKeys":["provider","channelId","messageId"]},"search":{"label":"search","detailKeys":["provider","guildId","query"]},"sticker":{"label":"sticker","detailKeys":["provider","to","stickerId"]},"member-info":{"label":"member","detailKeys":["provider","guildId","userId"]},"role-info":{"label":"roles","detailKeys":["provider","guildId"]},"emoji-list":{"label":"emoji list","detailKeys":["provider","guildId"]},"emoji-upload":{"label":"emoji upload","detailKeys":["provider","guildId","emojiName"]},"sticker-upload":{"label":"sticker upload","detailKeys":["provider","guildId","stickerName"]},"role-add":{"label":"role add","detailKeys":["provider","guildId","userId","roleId"]},"role-remove":{"label":"role remove","detailKeys":["provider","guildId","userId","roleId"]},"channel-info":{"label":"channel","detailKeys":["provider","channelId"]},"channel-list":{"label":"channels","detailKeys":["provider","guildId"]},"voice-status":{"label":"voice","detailKeys":["provider","guildId","userId"]},"event-list":{"label":"events","detailKeys":["provider","guildId"]},"event-create":{"label":"event create","detailKeys":["provider","guildId","eventName"]},"timeout":{"label":"timeout","detailKeys":["provider","guildId","userId"]},"kick":{"label":"kick","detailKeys":["provider","guildId","userId"]},"ban":{"label":"ban","detailKeys":["provider","guildId","userId"]}}},"apply_patch":{"emoji":"🩹","title":"Apply Patch","detailKeys":[]},"image":{"emoji":"🖼️","title":"Image","detailKeys":["path","paths","url","urls","prompt","model"]},"view_image":{"emoji":"🖼️","title":"View Image","detailKeys":["path","paths","url","urls","prompt","model"]},"image_generate":{"emoji":"🎨","title":"Image Generation","actions":{"generate":{"label":"generate","detailKeys":["prompt","model","count","resolution","aspectRatio"]},"list":{"label":"list","detailKeys":["provider","model"]}}},"music_generate":{"emoji":"🎵","title":"Music Generation","actions":{"generate":{"label":"generate","detailKeys":["prompt","model","durationSeconds","format","instrumental"]},"list":{"label":"list","detailKeys":["provider","model"]}}},"video_generate":{"emoji":"🎬","title":"Video Generation","actions":{"generate":{"label":"generate","detailKeys":["prompt","model","durationSeconds","resolution","aspectRatio","audio","watermark"]},"list":{"label":"list","detailKeys":["provider","model"]}}},"pdf":{"emoji":"📑","title":"PDF","detailKeys":["path","paths","url","urls","prompt","pageRange","model"]},"sessions_yield":{"emoji":"⏸️","title":"Yield"},"tts":{"emoji":"🔊","title":"TTS","detailKeys":["text","channel"]}}`),Fa={version:1,fallback:Na,tools:Pa}})))()}var La;function Ra(){return(Ra=e((()=>{La=class extends Event{constructor(e){super(`wa-tab-show`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}}})))()}var za;function Ba(){return(Ba=e((()=>{za=class extends Event{constructor(e){super(`wa-tab-hide`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}}})))()}var Va;function Ha(){return(Ha=e((()=>{N(),Va=F`
  :host {
    --indicator-color: var(--wa-color-brand-fill-loud);
    --track-color: var(--wa-color-neutral-fill-normal);
    --track-width: 0.125rem;

    /* Private */
    --safe-track-width: max(0.5px, round(var(--track-width), 0.5px));

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tabs {
    display: flex;
    position: relative;
  }

  .indicator {
    position: absolute;
  }

  .tab-group-has-scroll-controls .nav-container {
    position: relative;
    padding: 0 1.5em;
  }

  .body {
    display: block;
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5em;
  }

  .scroll-button-start {
    inset-inline-start: 0;
  }

  .scroll-button-end {
    inset-inline-end: 0;
  }

  /*
    * Top
    */

  .tab-group-top {
    flex-direction: column;
  }

  .tab-group-top .nav-container {
    order: 1;
  }

  .tab-group-top .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-top .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-top .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-top .indicator {
    bottom: calc(-1 * var(--safe-track-width));
    border-bottom: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-top .body {
    order: 2;
  }

  .tab-group-top ::slotted(wa-tab[active]) {
    border-block-end: solid var(--safe-track-width) var(--indicator-color);
    margin-block-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-top .body slot::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Bottom
    */

  .tab-group-bottom {
    flex-direction: column;
  }

  .tab-group-bottom .nav-container {
    order: 2;
  }

  .tab-group-bottom .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-bottom .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-bottom .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-bottom .indicator {
    top: calc(-1 * var(--safe-track-width));
    border-top: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-bottom .body {
    order: 1;
  }

  .tab-group-bottom ::slotted(wa-tab[active]) {
    border-block-start: solid var(--safe-track-width) var(--indicator-color);
    margin-block-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-bottom .body slot::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Start
    */

  .tab-group-start {
    flex-direction: row;
  }

  .tab-group-start .nav-container {
    order: 1;
  }

  .tab-group-start .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-start .indicator {
    inset-inline-end: calc(-1 * var(--safe-track-width));
    border-right: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-start .body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group-start ::slotted(wa-tab[active]) {
    border-inline-end: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-start .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }

  /*
    * End
    */

  .tab-group-end {
    flex-direction: row;
  }

  .tab-group-end .nav-container {
    order: 2;
  }

  .tab-group-end .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-end .indicator {
    inset-inline-start: calc(-1 * var(--safe-track-width));
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-end .body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group-end ::slotted(wa-tab[active]) {
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-end .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }
`})))()}var J;function Ua(){return(Ua=e((()=>{Ra(),Ba(),Ha(),b(),_(),A(),f(),N(),I(),fe(),J=class extends v{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new s(this),this.hasScrollControls=!1,this.active=``,this.placement=`top`,this.activation=`auto`,this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(e=>![`aria-labelledby`,`aria-controls`].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels());let t=e.filter(e=>e.target.closest(`wa-tab-group`)===this);if(t.some(e=>e.attributeName===`disabled`))this.syncTabsAndPanels();else if(t.some(e=>e.attributeName===`active`)){let e=t.filter(e=>e.attributeName===`active`&&e.target.tagName.toLowerCase()===`wa-tab`).map(e=>e.target).find(e=>e.active);e&&e.closest(`wa-tab-group`)===this&&this.setActiveTab(e)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,t)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){let e=this.tabs.find(e=>e.panel===this.active);e&&this.setActiveTab(e)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});t.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector(`slot[name="nav"]`).assignedElements()].filter(e=>e.tagName.toLowerCase()===`wa-tab`)}getAllPanels(){return[...this.defaultSlot.assignedElements()].filter(e=>e.tagName.toLowerCase()===`wa-tab-panel`)}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let t=e.target.closest(`wa-tab`);t?.closest(`wa-tab-group`)===this&&t!==null&&this.setActiveTab(t,{scrollBehavior:`smooth`})}handleKeyDown(e){let t=e.target.closest(`wa-tab`);if(t?.closest(`wa-tab-group`)===this){if([`Enter`,` `].includes(e.key)){t!==null&&(this.setActiveTab(t,{scrollBehavior:`smooth`}),e.preventDefault());return}if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key)){let t=this.tabs.find(e=>e.matches(`:focus`)),n=this.localize.dir()===`rtl`,r=null;if(t?.tagName.toLowerCase()===`wa-tab`){if(e.key===`Home`)r=this.focusableTabs[0];else if(e.key===`End`)r=this.focusableTabs[this.focusableTabs.length-1];else if([`top`,`bottom`].includes(this.placement)&&e.key===(n?`ArrowRight`:`ArrowLeft`)||[`start`,`end`].includes(this.placement)&&e.key===`ArrowUp`){let e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,`backward`)}else if([`top`,`bottom`].includes(this.placement)&&e.key===(n?`ArrowLeft`:`ArrowRight`)||[`start`,`end`].includes(this.placement)&&e.key===`ArrowDown`){let e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,`forward`)}if(!r)return;r.tabIndex=0,r.focus({preventScroll:!0}),this.activation===`auto`?this.setActiveTab(r,{scrollBehavior:`smooth`}):this.tabs.forEach(e=>{e.tabIndex=e===r?0:-1}),[`top`,`bottom`].includes(this.placement)&&ce(r,this.nav,`horizontal`),e.preventDefault()}}}}findNextFocusableTab(e,t){let n=null,r=t===`forward`?1:-1,i=e+r;for(;e<this.tabs.length;){if(n=this.tabs[i]||null,n===null){n=t===`forward`?this.focusableTabs[0]:this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;i+=r}return n}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()===`rtl`?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:`smooth`})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()===`rtl`?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:`smooth`})}setActiveTab(e,t){if(t={emitEvents:!0,scrollBehavior:`auto`,...t},e.closest(`wa-tab-group`)===this&&e!==this.activeTab&&!e.disabled){let n=this.activeTab;this.active=e.panel,this.activeTab=e,this.tabs.forEach(e=>{e.active=e===this.activeTab,e.tabIndex=e===this.activeTab?0:-1}),this.panels.forEach(e=>e.active=e.name===this.activeTab?.panel),[`top`,`bottom`].includes(this.placement)&&ce(this.activeTab,this.nav,`horizontal`,t.scrollBehavior),t.emitEvents&&(n&&this.dispatchEvent(new za({name:n.panel})),this.dispatchEvent(new La({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(e=>{let t=this.panels.find(t=>t.name===e.panel);t&&(e.setAttribute(`aria-controls`,t.getAttribute(`id`)),t.setAttribute(`aria-labelledby`,e.getAttribute(`id`)))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){let e=this.tabs.find(e=>e.panel===this.active);e&&this.setActiveTab(e,{scrollBehavior:`smooth`})}updateScrollControls(){this.hasScrollControls=!this.withoutScrollControls&&[`top`,`bottom`].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){let e=this.hasUpdated?this.localize.dir()===`rtl`:this.dir===`rtl`;return j`
      <div
        part="base tab-group"
        class=${M({"tab-group":!0,"tab-group-top":this.placement===`top`,"tab-group-bottom":this.placement===`bottom`,"tab-group-start":this.placement===`start`,"tab-group-end":this.placement===`end`,"tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?j`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${e?`chevron-right`:`chevron-left`}
                    library="system"
                    variant="solid"
                    label=${this.localize.term(`scrollToStart`)}
                  ></wa-icon>
                </wa-button>
              `:``}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?j`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${e?`chevron-left`:`chevron-right`}
                    library="system"
                    variant="solid"
                    label=${this.localize.term(`scrollToEnd`)}
                  ></wa-icon>
                </wa-button>
              `:``}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `}},J.css=Va,y([P(`.tab-group`)],J.prototype,`tabGroup`,2),y([P(`.body slot`)],J.prototype,`defaultSlot`,2),y([P(`.nav`)],J.prototype,`nav`,2),y([be()],J.prototype,`hasScrollControls`,2),y([L({reflect:!0})],J.prototype,`active`,2),y([L()],J.prototype,`placement`,2),y([L()],J.prototype,`activation`,2),y([L({attribute:`without-scroll-controls`,type:Boolean})],J.prototype,`withoutScrollControls`,2),y([w(`active`)],J.prototype,`updateActiveTab`,1),y([w(`withoutScrollControls`,{waitUntilFirstUpdate:!0})],J.prototype,`updateScrollControls`,1),J=y([R(`wa-tab-group`)],J)})))()}var Wa;function Ga(){return(Ga=e((()=>{N(),Wa=F`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`})))()}var Ka,qa;function Ja(){return(Ja=e((()=>{Ga(),_(),f(),N(),I(),fe(),Ka=0,qa=class extends v{constructor(){super(...arguments),this.attrId=++Ka,this.componentId=`wa-tab-panel-${this.attrId}`,this.name=``,this.active=!1,this.role=`tabpanel`}connectedCallback(){super.connectedCallback(),this.id=(this.id||``).length>0?this.id:this.componentId}handleActiveChange(){this.setAttribute(`aria-hidden`,this.active?`false`:`true`)}render(){return j`
      <slot
        part="base"
        class=${M({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}},qa.css=Wa,y([L({reflect:!0})],qa.prototype,`name`,2),y([L({type:Boolean,reflect:!0})],qa.prototype,`active`,2),y([L({reflect:!0})],qa.prototype,`role`,2),y([w(`active`)],qa.prototype,`handleActiveChange`,1),qa=y([R(`wa-tab-panel`)],qa)})))()}var Ya;function Xa(){return(Xa=e((()=>{N(),Ya=F`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
    font-weight: var(--wa-font-weight-action);
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font: inherit;
    padding: 1em 1.5em;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);

    ::slotted(wa-icon:first-child) {
      margin-inline-end: 0.5em;
    }

    ::slotted(wa-icon:last-child) {
      margin-inline-start: 0.5em;
    }
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])) .tab {
      color: currentColor;
    }
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) .tab {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-border-width-l) - var(--wa-focus-ring-offset));
  }

  :host([active]:not([disabled])) {
    color: var(--wa-color-brand-on-quiet);
  }

  :host([disabled]) .tab {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    :host([active]:not([disabled])) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`})))()}var Za,Y;function Qa(){return(Qa=e((()=>{Xa(),_(),f(),N(),I(),fe(),Za=0,Y=class extends v{constructor(){super(...arguments),this.attrId=++Za,this.componentId=`wa-tab-${this.attrId}`,this.panel=``,this.active=!1,this.disabled=!1,this.tabIndex=0,this.slot=`nav`,this.role=`tab`}handleActiveChange(){this.setAttribute(`aria-selected`,this.active?`true`:`false`)}handleDisabledChange(){this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.tabIndex=this.disabled&&!this.active?-1:0}render(){return this.id=this.id?.length>0?this.id:this.componentId,j`
      <div
        part="base tab"
        class=${M({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}},Y.css=Ya,y([P(`.tab`)],Y.prototype,`tab`,2),y([L({reflect:!0})],Y.prototype,`panel`,2),y([L({type:Boolean,reflect:!0})],Y.prototype,`active`,2),y([L({type:Boolean,reflect:!0})],Y.prototype,`disabled`,2),y([L({type:Number,reflect:!0})],Y.prototype,`tabIndex`,2),y([L({reflect:!0})],Y.prototype,`slot`,2),y([L({reflect:!0})],Y.prototype,`role`,2),y([w(`active`)],Y.prototype,`handleActiveChange`,1),y([w(`disabled`)],Y.prototype,`handleDisabledChange`,1),Y=y([R(`wa-tab`)],Y)})))()}function $a(){return($a=e((()=>{Ua(),Ja(),Qa(),Xa(),Ha(),Ga(),d(),l(),u(),m(),h(),c(),r(),t(),k(),_(),A(),o()})))()}function eo(){return(eo=e((()=>{Ja(),Ga(),_()})))()}function to(){return(to=e((()=>{Qa(),Xa(),_()})))()}function no(){return Eo||=document.createElement(`div`).style}function ro(e){if(Oo[e])return Oo[e];let t=no();if(e in t)return Oo[e]=e;let n=e[0].toUpperCase()+e.slice(1),r=Do.length;for(;r--;){let i=`${Do[r]}${n}`;if(i in t)return Oo[e]=i}}function io(e,t){return parseFloat(t[ro(e)])||0}function ao(e,t,n=window.getComputedStyle(e)){let r=t===`border`?`Width`:``;return{left:io(`${t}Left${r}`,n),right:io(`${t}Right${r}`,n),top:io(`${t}Top${r}`,n),bottom:io(`${t}Bottom${r}`,n)}}function oo(e,t,n){e.style[ro(t)]=n}function so(e,t){oo(e,`transition`,`${ro(`transform`)} ${t.duration}ms ${t.easing}`)}function co(e,{x:t,y:n,scale:r,isSVG:i},a){if(oo(e,`transform`,`scale(${r}) translate(${t}px, ${n}px)`),i&&To){let t=window.getComputedStyle(e).getPropertyValue(`transform`);e.setAttribute(`transform`,t)}}function lo(e){let t=e.parentNode;(!t||t.nodeType!==1)&&(t=document.documentElement);let n=window.getComputedStyle(e),r=window.getComputedStyle(t),i=e.getBoundingClientRect(),a=t.getBoundingClientRect();return{elem:{style:n,width:i.width,height:i.height,top:i.top,bottom:i.bottom,left:i.left,right:i.right,margin:ao(e,`margin`,n),border:ao(e,`border`,n)},parent:{style:r,width:a.width,height:a.height,top:a.top,bottom:a.bottom,left:a.left,right:a.right,padding:ao(t,`padding`,r),border:ao(t,`border`,r)}}}function uo(e,t,n,r){ko[e].split(` `).forEach(e=>{t.addEventListener(e,n,r)})}function fo(e,t,n){ko[e].split(` `).forEach(e=>{t.removeEventListener(e,n)})}function po(e,t){let n=e.length;for(;n--;)if(e[n].pointerId===t.pointerId)return n;return-1}function mo(e,t){let n;if(t.touches){n=0;for(let r of t.touches)r.pointerId=n++,mo(e,r);return}n=po(e,t),n>-1&&e.splice(n,1),e.push(t)}function ho(e,t){if(t.touches){for(;e.length;)e.pop();return}let n=po(e,t);n>-1&&e.splice(n,1)}function go(e){e=e.slice(0);let t=e.pop(),n;for(;n=e.pop();)t={clientX:(n.clientX-t.clientX)/2+t.clientX,clientY:(n.clientY-t.clientY)/2+t.clientY};return t}function _o(e){if(e.length<2)return 0;let t=e[0],n=e[1];return Math.sqrt(Math.abs(n.clientX-t.clientX)**2+Math.abs(n.clientY-t.clientY)**2)}function vo(e){let t=e;for(;t&&t.parentNode;){if(t.parentNode===document)return!0;t=t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}return!1}function yo(e){return(e.getAttribute(`class`)||``).trim()}function bo(e,t){return e.nodeType===1&&` ${yo(e)} `.indexOf(` ${t} `)>-1}function xo(e,t){for(let n=e;n!=null;n=n.parentNode)if(bo(n,t.excludeClass)||t.exclude.indexOf(n)>-1)return!0;return!1}function So(e){return Ao.test(e.namespaceURI)&&e.nodeName.toLowerCase()!==`svg`}function Co(e){let t={};for(let n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function wo(e,t){if(!e)throw Error(`Panzoom requires an element as an argument`);if(e.nodeType!==1)throw Error(`Panzoom requires an element with a nodeType of 1`);if(!vo(e))throw Error(`Panzoom should be called on elements that have been attached to the DOM`);t={...jo,...t};let n=So(e),r=e.parentNode;r.style.overflow=t.overflow,r.style.userSelect=`none`,r.style.touchAction=t.touchAction,(t.canvas?r:e).style.cursor=t.cursor,e.style.userSelect=`none`,e.style.touchAction=t.touchAction,oo(e,`transformOrigin`,typeof t.origin==`string`?t.origin:n?`0 0`:`50% 50%`);function i(){r.style.overflow=``,r.style.userSelect=``,r.style.touchAction=``,r.style.cursor=``,e.style.cursor=``,e.style.userSelect=``,e.style.touchAction=``,oo(e,`transformOrigin`,``)}function a(n={}){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);(n.hasOwnProperty(`cursor`)||n.hasOwnProperty(`canvas`))&&(r.style.cursor=e.style.cursor=``,(t.canvas?r:e).style.cursor=t.cursor),n.hasOwnProperty(`overflow`)&&(r.style.overflow=n.overflow),n.hasOwnProperty(`touchAction`)&&(r.style.touchAction=n.touchAction,e.style.touchAction=n.touchAction)}let o=0,s=0,c=1,l=!1;h(t.startScale,{animate:!1,force:!0}),setTimeout(()=>{m(t.startX,t.startY,{animate:!1,force:!0})});function u(t,n,r){if(r.silent)return;let i=new CustomEvent(t,{detail:n});e.dispatchEvent(i)}function d(t,r,i){let a={x:o,y:s,scale:c,isSVG:n,originalEvent:i};return requestAnimationFrame(()=>{typeof r.animate==`boolean`&&(r.animate?so(e,r):oo(e,`transition`,`none`)),r.setTransform(e,a,r),u(t,a,r),u(`panzoomchange`,a,r)}),a}function f(n,r,i,a){let l={...t,...a},u={x:o,y:s,opts:l};if(!a?.force&&(l.disablePan||l.panOnlyWhenZoomed&&c===l.startScale))return u;if(n=parseFloat(n),r=parseFloat(r),l.disableXAxis||(u.x=(l.relative?o:0)+n),l.disableYAxis||(u.y=(l.relative?s:0)+r),l.contain){let t=lo(e),n=t.elem.width/c,r=t.elem.height/c,a=n*i,o=r*i,s=(a-n)/2,d=(o-r)/2;if(l.contain===`inside`){let e=(-t.elem.margin.left-t.parent.padding.left+s)/i,n=(t.parent.width-a-t.parent.padding.left-t.elem.margin.left-t.parent.border.left-t.parent.border.right+s)/i;u.x=Math.max(Math.min(u.x,n),e);let r=(-t.elem.margin.top-t.parent.padding.top+d)/i,c=(t.parent.height-o-t.parent.padding.top-t.elem.margin.top-t.parent.border.top-t.parent.border.bottom+d)/i;u.y=Math.max(Math.min(u.y,c),r)}else if(l.contain===`outside`){let e=(-(a-t.parent.width)-t.parent.padding.left-t.parent.border.left-t.parent.border.right+s)/i,n=(s-t.parent.padding.left)/i;u.x=Math.max(Math.min(u.x,n),e);let r=(-(o-t.parent.height)-t.parent.padding.top-t.parent.border.top-t.parent.border.bottom+d)/i,c=(d-t.parent.padding.top)/i;u.y=Math.max(Math.min(u.y,c),r)}}return l.roundPixels&&(u.x=Math.round(u.x),u.y=Math.round(u.y)),u}function p(n,r){let i={...t,...r},a={scale:c,opts:i};if(!r?.force&&i.disableZoom)return a;let o=t.minScale,s=t.maxScale;if(i.contain){let n=lo(e),r=n.elem.width/c,i=n.elem.height/c;if(r>1&&i>1){let e=n.parent.width-n.parent.border.left-n.parent.border.right,a=n.parent.height-n.parent.border.top-n.parent.border.bottom,c=e/r,l=a/i;t.contain===`inside`?s=Math.min(s,c,l):t.contain===`outside`&&(o=Math.max(o,c,l))}}return a.scale=Math.min(Math.max(n,o),s),a}function m(e,t,r,i){let a=f(e,t,c,r);return o!==a.x||s!==a.y?(o=a.x,s=a.y,d(`panzoompan`,a.opts,i)):{x:o,y:s,scale:c,isSVG:n,originalEvent:i}}function h(e,t,n){let r=p(e,t),i=r.opts;if(!t?.force&&i.disableZoom)return;e=r.scale;let a=o,l=s;if(i.focal){let t=i.focal;a=(t.x/e-t.x/c+o*e)/e,l=(t.y/e-t.y/c+s*e)/e}let u=f(a,l,e,{relative:!1,force:!0});return o=u.x,s=u.y,c=e,d(`panzoomzoom`,i,n)}function g(e,n){let r={...t,animate:!0,...n};return h(c*Math.exp((e?1:-1)*r.step),r)}function _(e){return g(!0,e)}function v(e){return g(!1,e)}function y(t,r,i,a){let o=lo(e),s={width:o.parent.width-o.parent.padding.left-o.parent.padding.right-o.parent.border.left-o.parent.border.right,height:o.parent.height-o.parent.padding.top-o.parent.padding.bottom-o.parent.border.top-o.parent.border.bottom},l=r.clientX-o.parent.left-o.parent.padding.left-o.parent.border.left-o.elem.margin.left,u=r.clientY-o.parent.top-o.parent.padding.top-o.parent.border.top-o.elem.margin.top;n||(l-=o.elem.width/c/2,u-=o.elem.height/c/2);let d={x:l/s.width*(s.width*t),y:u/s.height*(s.height*t)};return h(t,{...i,animate:!1,focal:d},a)}function b(e,n){e.preventDefault();let r={...t,...n,animate:!1},i=(e.deltaY===0&&e.deltaX?e.deltaX:e.deltaY)<0?1:-1,a=p(c*Math.exp(i*r.step/3),r).scale;return y(a,e,r,e)}function x(e){let n={...t,animate:!0,force:!0,...e};c=p(n.startScale,n).scale;let r=f(n.startX,n.startY,c,n);return o=r.x,s=r.y,d(`panzoomreset`,n)}let S,C,w,T,E,D,O=[];function k(e){if(xo(e.target,t))return;mo(O,e),l=!0,t.handleStartEvent(e),S=o,C=s,u(`panzoomstart`,{x:o,y:s,scale:c,isSVG:n,originalEvent:e},t);let r=go(O);w=r.clientX,T=r.clientY,E=c,D=_o(O)}function ee(e){if(!l||S===void 0||C===void 0||w===void 0||T===void 0)return;mo(O,e);let n=go(O),r=O.length>1,i=c;r&&(D===0&&(D=_o(O)),i=p((_o(O)-D)*t.step/80+E).scale,y(i,n,{animate:!1},e)),(!r||t.pinchAndPan)&&m(S+(n.clientX-w)/i,C+(n.clientY-T)/i,{animate:!1},e)}function te(e){O.length===1&&u(`panzoomend`,{x:o,y:s,scale:c,isSVG:n,originalEvent:e},t),ho(O,e),l&&(l=!1,S=C=w=T=void 0)}let ne=!1;function re(){ne||(ne=!0,uo(`down`,t.canvas?r:e,k),uo(`move`,document,ee,{passive:!0}),uo(`up`,document,te,{passive:!0}))}function A(){ne=!1,fo(`down`,t.canvas?r:e,k),fo(`move`,document,ee),fo(`up`,document,te)}return t.noBind||re(),{bind:re,destroy:A,eventNames:ko,getPan:()=>({x:o,y:s}),getScale:()=>c,getOptions:()=>Co(t),handleDown:k,handleMove:ee,handleUp:te,pan:m,reset:x,resetStyle:i,setOptions:a,setStyle:(t,n)=>oo(e,t,n),zoom:h,zoomIn:_,zoomOut:v,zoomToPoint:y,zoomWithWheel:b}}var To,Eo,Do,Oo,ko,Ao,jo;function Mo(){return(Mo=e((()=>{typeof window<`u`&&(window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),typeof window.CustomEvent!=`function`&&(window.CustomEvent=function(e,t){t||={bubbles:!1,cancelable:!1,detail:null};var n=document.createEvent(`CustomEvent`);return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n})),To=typeof document<`u`&&!!document.documentMode,Do=[`webkit`,`moz`,`ms`],Oo={},ko={down:`mousedown`,move:`mousemove`,up:`mouseup mouseleave`},typeof window<`u`&&(typeof window.PointerEvent==`function`?ko={down:`pointerdown`,move:`pointermove`,up:`pointerup pointerleave pointercancel`}:typeof window.TouchEvent==`function`&&(ko={down:`touchstart`,move:`touchmove`,up:`touchend touchcancel`})),Ao=/^http:[\w\.\/]+svg$/,jo={animate:!1,canvas:!1,cursor:`move`,disablePan:!1,disableZoom:!1,disableXAxis:!1,disableYAxis:!1,duration:200,easing:`ease-in-out`,exclude:[],excludeClass:`panzoom-exclude`,handleStartEvent:e=>{e.preventDefault(),e.stopPropagation()},maxScale:4,minScale:.125,overflow:`hidden`,panOnlyWhenZoomed:!1,pinchAndPan:!1,relative:!1,setTransform:co,startX:0,startY:0,startScale:1,step:.3,touchAction:`none`},wo.defaultOptions=jo})))()}var No;function Po(){return(Po=e((()=>{N(),No=F`
  :host {
    --checked-icon-color: var(--wa-form-control-activated-color);
    --checked-icon-scale: 0.7;

    color: var(--wa-form-control-value-color);
    display: inline-flex;
    flex-direction: row;
    align-items: top;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  :host(:not(:state(checked))) svg circle {
    opacity: 0;
  }

  [part~='label'] {
    display: inline;
  }

  [part~='hint'] {
    margin-block-start: 0.5em;
  }

  /* Default spacing for default appearance radios */
  :host([appearance='default']) {
    margin-block: 0.375em; /* Half of the original 0.75em gap on each side */
  }

  :host([appearance='default'][data-wa-radio-horizontal]) {
    margin-block: 0;
    margin-inline: 0.5em; /* Half of the original 1em gap on each side */
  }

  /* Remove margin from first/last items to prevent extra space */
  :host([appearance='default'][data-wa-radio-first]) {
    margin-block-start: 0;
    margin-inline-start: 0;
  }

  :host([appearance='default'][data-wa-radio-last]) {
    margin-block-end: 0;
    margin-inline-end: 0;
  }

  /* Button appearance have no spacing, they get handled by the overlap margins below */
  :host([appearance='button']) {
    margin: 0;
    align-items: center;
    min-height: var(--wa-form-control-height);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-border-radius-m);
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast);
  }

  /* Default appearance */
  :host([appearance='default']) {
    .control {
      flex: 0 0 auto;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      border-color: var(--wa-form-control-border-color);
      border-radius: 50%;
      border-style: var(--wa-form-control-border-style);
      border-width: var(--wa-form-control-border-width);
      background-color: var(--wa-form-control-background-color);
      color: transparent;
      transition:
        background var(--wa-transition-normal),
        border-color var(--wa-transition-fast),
        box-shadow var(--wa-transition-fast),
        color var(--wa-transition-fast);
      transition-timing-function: var(--wa-transition-easing);

      margin-inline-end: 0.5em;
    }

    .checked-icon {
      display: flex;
      fill: currentColor;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      scale: var(--checked-icon-scale);
    }
  }

  /* Button appearance */
  :host([appearance='button']) {
    .control {
      display: none;
    }
  }

  /* Checked */
  :host(:state(checked)) .control {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-background-color);
  }

  /* Focus */
  :host(:focus-visible) .control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Horizontal grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-first]) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Vertical grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-first]) {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  @media (hover: hover) {
    :host([appearance='button']:hover:not(:state(disabled), :state(checked))) {
      background-color: color-mix(in srgb, var(--wa-color-surface-default) 95%, var(--wa-color-mix-hover));
    }
  }

  :host([appearance='button']:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([appearance='button']:state(checked)) {
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-color-brand-fill-quiet);
  }

  :host([appearance='button']:state(checked):focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Button overlap margins */
  :host([appearance='button'][data-wa-radio-horizontal]:not([data-wa-radio-first])) {
    margin-inline-start: calc(-1 * var(--wa-form-control-border-width));
  }

  :host([appearance='button'][data-wa-radio-vertical]:not([data-wa-radio-first])) {
    margin-block-start: calc(-1 * var(--wa-form-control-border-width));
  }

  /* Ensure interactive states are visible above adjacent buttons */
  :host([appearance='button']:hover),
  :host([appearance='button']:state(checked)) {
    position: relative;
    z-index: 1;
  }

  :host([appearance='button']:focus-visible) {
    z-index: 2;
  }
`})))()}var Fo;function Io(){return(Io=e((()=>{N(),Fo=F`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint, .has-count) {
      display: none;
    }
  }
`})))()}var X;function Lo(){return(Lo=e((()=>{Po(),Io(),m(),le(),c(),f(),N(),I(),X=class extends a{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance=`default`,this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener(`click`,this.handleClick)}handleSizeChange(){n(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute(`role`,`radio`),this.tabIndex=0,this.setAttribute(`aria-disabled`,this.disabled||this.forceDisabled?`true`:`false`)}updated(e){if(super.updated(e),e.has(`checked`)&&(this.customStates.set(`checked`,this.checked),this.setAttribute(`aria-checked`,this.checked?`true`:`false`),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),e.has(`disabled`)||e.has(`forceDisabled`)){let e=this.disabled||this.forceDisabled;this.customStates.set(`disabled`,e),this.setAttribute(`aria-disabled`,e?`true`:`false`),this.tabIndex=e?-1:this.checked?0:-1}}setValue(){}render(){return j`
      <span part="control" class="control">
        ${this.checked?j`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:``}
      </span>

      <slot part="label" class="label"></slot>
    `}},X.css=[Fo,p,No],y([be()],X.prototype,`checked`,2),y([be()],X.prototype,`forceDisabled`,2),y([L({reflect:!0})],X.prototype,`value`,2),y([L({reflect:!0})],X.prototype,`appearance`,2),y([L({reflect:!0})],X.prototype,`size`,2),y([w(`size`)],X.prototype,`handleSizeChange`,1),y([L({type:Boolean})],X.prototype,`disabled`,2),X=y([R(`wa-radio`)],X),X.disableWarning?.(`change-in-update`)})))()}function Ro(){return(Ro=e((()=>{Lo(),Po(),Io(),m(),c(),t(),k(),_()})))()}var zo;function Bo(){return(Bo=e((()=>{N(),zo=F`
  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .label {
    padding: 0;
  }

  .radio-group-required .label::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  [part~='form-control-input'] {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0; /* Radios handle their own spacing */
  }

  /* Horizontal */
  :host([orientation='horizontal']) [part~='form-control-input'] {
    flex-direction: row;
  }

  /* Help text */
  [part~='hint'] {
    margin-block-start: 0.5em;
  }
`})))()}var Vo;function Ho(){return(Ho=e((()=>{Vo=(e={})=>{let{validationElement:t,validationProperty:n}=e;t||typeof document<`u`&&`createElement`in document&&(t=Object.assign(document.createElement(`input`),{required:!0})),n||=`value`;let r={observedAttributes:[`required`],message:t?.validationMessage,checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return(e.required??e.hasAttribute(`required`))&&(e[n]||(t.message=typeof r.message==`function`?r.message(e):r.message||``,t.isValid=!1,t.invalidKeys.push(`valueMissing`))),t}};return r}})))()}var Z;function Uo(){return(Uo=e((()=>{Bo(),Ho(),Io(),Nn(),m(),O(),le(),c(),f(),N(),I(),fe(),Z=class extends a{constructor(){super(),this.hasSlotController=new ie(this,`hint`,`label`),this.label=``,this.hint=``,this.name=null,this.disabled=!1,this.orientation=`vertical`,this._value=null,this.defaultValue=this.getAttribute(`value`)||null,this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=e=>{let t=e.target.closest(`wa-radio`);if(!t||t.disabled||t.forceDisabled||this.disabled)return;let n=this.value;this.value=t.value,t.checked=!0;let r=this.getAllRadios();for(let e of r)t!==e&&(e.checked=!1,e.setAttribute(`tabindex`,`-1`));this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})},this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleRadioClick)}static get validators(){let e=[Vo({validationElement:Object.assign(document.createElement(`input`),{required:!0,type:`radio`,name:Mn(`__wa-radio`)})})];return[...super.validators,...e]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){typeof e==`number`&&(e=String(e)),this.valueHasChanged=!0,this._value=e}handleSizeChange(){n(this.localName,this.size)}get validationTarget(){let e=this.querySelector(`:is(wa-radio):not([disabled])`);if(e)return e}updated(e){(e.has(`disabled`)||e.has(`size`)||e.has(`value`)||e.has(`defaultValue`))&&this.syncRadioElements()}formResetCallback(...e){this._value=null,super.formResetCallback(...e),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll(`wa-radio`)]}handleLabelClick(){this.focus()}async syncRadioElements(){let e=this.getAllRadios();if(e.forEach((t,n)=>{this.size&&t.setAttribute(`size`,this.size),t.toggleAttribute(`data-wa-radio-horizontal`,this.orientation!==`vertical`),t.toggleAttribute(`data-wa-radio-vertical`,this.orientation===`vertical`),t.toggleAttribute(`data-wa-radio-first`,n===0),t.toggleAttribute(`data-wa-radio-inner`,n!==0&&n!==e.length-1),t.toggleAttribute(`data-wa-radio-last`,n===e.length-1),t.forceDisabled=this.disabled}),await Promise.all(e.map(async e=>{await e.updateComplete,e.checked=!e.disabled&&e.value===this.value})),this.disabled)e.forEach(e=>{e.tabIndex=-1});else{let t=e.filter(e=>!e.disabled),n=t.find(e=>e.checked);t.length>0&&(n?t.forEach(e=>{e.tabIndex=e.checked?0:-1}):t.forEach((e,t)=>{e.tabIndex=t===0?0:-1})),e.filter(e=>e.disabled).forEach(e=>{e.tabIndex=-1})}}handleKeyDown(e){if(![`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,` `].includes(e.key)||this.disabled)return;let t=this.getAllRadios().filter(e=>!e.disabled);if(t.length<=0)return;e.preventDefault();let n=this.value,r=t.find(e=>e.checked)??t[0],i=e.key===` `?0:[`ArrowUp`,`ArrowLeft`].includes(e.key)?-1:1,a=t.indexOf(r)+i;a||=0,a<0&&(a=t.length-1),a>t.length-1&&(a=0);let o=t.some(e=>e.tagName.toLowerCase()===`wa-radio-button`);this.getAllRadios().forEach(e=>{e.checked=!1,o||e.setAttribute(`tabindex`,`-1`)}),this.value=t[a].value,t[a].checked=!0,o?t[a].shadowRoot.querySelector(`button`).focus():(t[a].setAttribute(`tabindex`,`0`),t[a].focus()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),e.preventDefault()}focus(e){if(this.disabled)return;let t=this.getAllRadios(),n=t.find(e=>e.checked),r=t.find(e=>!e.disabled),i=n||r;i&&i.focus(e)}render(){let e=this.hasSlotController.test(`label`,`withLabel`),t=this.hasSlotController.test(`hint`,`withHint`),n=this.label?!0:!!e,r=this.hint?!0:!!t;return j`
      <fieldset
        part="form-control"
        class=${M({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":n})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${M({label:!0,"has-label":n})}
          aria-hidden=${n?`false`:`true`}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${M({"has-slotted":r})}
          aria-hidden=${r?`false`:`true`}
          >${this.hint}</slot
        >
      </fieldset>
    `}},Z.css=[p,Fo,zo],Z.shadowRootOptions={...a.shadowRootOptions,delegatesFocus:!0},y([P(`slot:not([name])`)],Z.prototype,`defaultSlot`,2),y([L()],Z.prototype,`label`,2),y([L({attribute:`hint`})],Z.prototype,`hint`,2),y([L({reflect:!0})],Z.prototype,`name`,2),y([L({type:Boolean,reflect:!0})],Z.prototype,`disabled`,2),y([L({reflect:!0})],Z.prototype,`orientation`,2),y([be()],Z.prototype,`value`,1),y([L({attribute:`value`,reflect:!0})],Z.prototype,`defaultValue`,2),y([L({reflect:!0})],Z.prototype,`size`,2),y([w(`size`)],Z.prototype,`handleSizeChange`,1),y([L({type:Boolean,reflect:!0})],Z.prototype,`required`,2),y([L({type:Boolean,attribute:`with-label`})],Z.prototype,`withLabel`,2),y([L({type:Boolean,attribute:`with-hint`})],Z.prototype,`withHint`,2),Z=y([R(`wa-radio-group`)],Z),Z.disableWarning?.(`change-in-update`)})))()}function Wo(){return(Wo=e((()=>{Uo(),Lo(),Po(),Bo(),Io(),m(),c(),t(),k(),_()})))()}var Go;function Ko(){return(Ko=e((()=>{N(),Go=F`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  :host([did-ssr]:not(:defined)) .switch {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }
  .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / 2);
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ [part~='control'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }
  .checked .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / -2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`})))()}var Q;function qo(){return(qo=e((()=>{Ko(),Io(),i(),m(),O(),le(),c(),A(),f(),N(),I(),fe(),de(),we(),Q=class extends a{constructor(){super(...arguments),this.hasSlotController=new ie(this,`hint`),this.localize=new s(this),this.title=``,this.name=null,this._value=this.getAttribute(`value`)??null,this.size=`m`,this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute(`checked`),this.required=!1,this.hint=``,this.withHint=!1}static get validators(){return[...super.validators,g()]}get value(){return this._value??`on`}set value(e){this._value=e}handleSizeChange(){n(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}handleKeyDown(e){let t=this.localize.dir()===`rtl`;e.key===`ArrowLeft`&&(e.preventDefault(),this.checked=t,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))})),e.key===`ArrowRight`&&(e.preventDefault(),this.checked=!t,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))}))}willUpdate(e){super.willUpdate(e),(e.has(`value`)||e.has(`checked`)||e.has(`defaultChecked`)||e.has(`disabled`))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleValueOrCheckedChange()});return}this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set(`checked`,this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}setValue(e,t){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(e??`on`,t)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let e=this.hasSlotController.test(`hint`,`withHint`),t=this.hint?!0:!!e,n=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,r=this.didSSR&&!this.hasUpdated?null:Te(this.checked);return j`
      <label
        part="base switch"
        class=${M({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${ve(this.name)}
          value=${ve(this.value)}
          .checked=${ve(r)}
          ?checked=${n}
          ?disabled=${this.disabled}
          ?required=${this.required}
          role="switch"
          aria-checked=${this.checked?`true`:`false`}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${M({"has-slotted":t})}
        aria-hidden=${t?`false`:`true`}
        >${this.hint}</slot
      >
    `}},Q.shadowRootOptions={...a.shadowRootOptions,delegatesFocus:!0},Q.css=[Fo,p,Go],y([P(`input[type="checkbox"]`)],Q.prototype,`input`,2),y([L()],Q.prototype,`title`,2),y([L({reflect:!0})],Q.prototype,`name`,2),y([L({reflect:!0})],Q.prototype,`value`,1),y([L({reflect:!0})],Q.prototype,`size`,2),y([w(`size`)],Q.prototype,`handleSizeChange`,1),y([L({type:Boolean})],Q.prototype,`disabled`,2),y([L({type:Boolean,attribute:!1})],Q.prototype,`checked`,1),y([L({type:Boolean,attribute:`checked`,reflect:!0})],Q.prototype,`defaultChecked`,2),y([L({type:Boolean,reflect:!0})],Q.prototype,`required`,2),y([L({attribute:`hint`})],Q.prototype,`hint`,2),y([L({attribute:`with-hint`,type:Boolean})],Q.prototype,`withHint`,2),y([w([`checked`,`defaultChecked`])],Q.prototype,`handleStateChange`,1),y([w(`disabled`,{waitUntilFirstUpdate:!0})],Q.prototype,`handleDisabledChange`,1),Q=y([R(`wa-switch`)],Q),Q.disableWarning?.(`change-in-update`)})))()}function Jo(){return(Jo=e((()=>{qo(),Ko(),Io(),m(),c(),_(),A(),o()})))()}function Yo(e){return typeof e==`object`?e.key:e}function Xo(e,t){let n=e.length;return new Proxy(e,{get(e,r,i){if(typeof r==`string`){let i=r.charCodeAt(0);if(i>=48&&i<=57){let i=+r;if(Number.isInteger(i)&&i>=0&&i<n){let n=e[i];if(typeof n!=`object`){let r=t[i*2];n=e[i]={index:i,key:n,start:r,size:t[i*2+1],end:r+t[i*2+1],lane:0}}return n}}if(r===`length`)return n}return Reflect.get(e,r,i)}})}function Zo(e,t,n){let r=n.initialDeps??[],i,a=!0;function o(){let o=e();return o.length!==r.length||o.some((e,t)=>r[t]!==e)?(r=o,i=t(...o),n?.onChange&&!(a&&n.skipInitialOnChange)&&n.onChange(i),a=!1,i):i}return o.updateDeps=e=>{r=e},o}function Qo(e,t){if(e===void 0)throw Error(`Unexpected undefined${t?`: ${t}`:``}`);return e}var $o,es;function ts(){return(ts=e((()=>{$o=(e,t)=>Math.abs(e-t)<1.01,es=(e,t,n)=>{let r;return Object.assign(function(...i){e.clearTimeout(r),r=e.setTimeout(()=>t.apply(this,i),n)},{cancel:()=>{e.clearTimeout(r)}})}})))()}function ns(e,t,n,r){if(t===0)return!1;let i=r(0),a=new Set,o=0;for(;o<e;){let e=n(o);if(e===i)break;a.add(e),o++}let s=e-o;if(s===0||s>=t)return!1;for(let e=0;e<s;e++)if(r(e)!==n(o+e))return!1;for(let e=s;e<t;e++)if(a.has(r(e)))return!1;return!0}function rs(e,t,n){let r=0;for(;r<=t;){let i=(r+t)/2|0,a=e[i*2];if(a<n)r=i+1;else if(a>n)t=i-1;else return i}return r>0?r-1:0}function is(e,t,n,r,i){let a=e.length-1;if(e.length<=r)return{startIndex:0,endIndex:a};if(r===1&&i!==null){let e=rs(i,a,n),r=e,o=n+t;for(;r<a&&i[r*2]+i[r*2+1]<o;)r++;return{startIndex:e,endIndex:r}}let o=ys(0,a,t=>e[t].start,n),s=o;if(r===1)for(;s<a&&e[s].end<n+t;)s++;else if(r>1){let i=Array(r).fill(0);for(;s<a&&i.some(e=>e<n+t);){let t=e[s];i[t.lane]=t.end,s++}let c=Array(r).fill(n+t);for(;o>=0&&c.some(e=>e>=n);){let t=e[o];c[t.lane]=t.start,o--}o=Math.max(0,o-o%r),s=Math.min(a,s+(r-1-s%r))}return{startIndex:o,endIndex:s}}var as,os,ss,cs,ls,us,ds,fs,ps,ms,hs,gs,_s,vs,ys;function bs(){return(bs=e((()=>{ts(),os=()=>{if(as!==void 0)return as;if(typeof navigator>`u`)return as=!1;if(/iP(hone|od|ad)/.test(navigator.userAgent))return as=!0;let e=navigator.maxTouchPoints;return as=navigator.platform===`MacIntel`&&e!==void 0&&e>0},ss=e=>{let{offsetWidth:t,offsetHeight:n}=e;return{width:t,height:n}},cs=e=>e,ls=e=>{let t=Math.max(e.startIndex-e.overscan,0),n=Math.min(e.endIndex+e.overscan,e.count-1)-t+1,r=Array(n);for(let e=0;e<n;e++)r[e]=t+e;return r},us=(e,t)=>{let n=e.scrollElement;if(!n)return;let r=e.targetWindow;if(!r)return;let i=e=>{let{width:n,height:r}=e;t({width:Math.round(n),height:Math.round(r)})};if(i(ss(n)),!r.ResizeObserver)return()=>{};let a=new r.ResizeObserver(t=>{let r=()=>{let e=t[0];if(e?.borderBoxSize){let t=e.borderBoxSize[0];if(t){i({width:t.inlineSize,height:t.blockSize});return}}i(ss(n))};e.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(r):r()});return a.observe(n,{box:`border-box`}),()=>{a.unobserve(n)}},ds={passive:!0},fs=typeof window>`u`||`onscrollend`in window,ps=(e,t,n)=>{let r=e.scrollElement;if(!r)return;let i=e.targetWindow;if(!i)return;let a=e.options.useScrollendEvent&&fs,o=0,s=a?null:es(i,()=>t(n(r),!1),e.options.isScrollingResetDelay),c=e=>()=>{o=n(r),s?.(),t(o,e)},l=c(!0),u=c(!1);return r.addEventListener(`scroll`,l,ds),a&&r.addEventListener(`scrollend`,u,ds),()=>{r.removeEventListener(`scroll`,l),a&&r.removeEventListener(`scrollend`,u),s?.cancel()}},ms=(e,t)=>ps(e,t,t=>{let{horizontal:n,isRtl:r}=e.options;return n?t.scrollLeft*(r&&-1||1):t.scrollTop}),hs=(e,t,n)=>{if(n.options.useCachedMeasurements){let t=n.indexFromElement(e),r=n.options.getItemKey(t);return n.itemSizeCache.get(r)??n.options.estimateSize(t)}if(t?.borderBoxSize){let e=t.borderBoxSize[0];if(e)return Math.round(e[n.options.horizontal?`inlineSize`:`blockSize`])}if(!t){let t=n.indexFromElement(e),r=n.options.getItemKey(t),i=n.itemSizeCache.get(r);if(i!==void 0)return i}return e[n.options.horizontal?`offsetWidth`:`offsetHeight`]},gs=(e,{adjustments:t=0,behavior:n},r)=>{var i,a;(a=(i=r.scrollElement)?.scrollTo)==null||a.call(i,{[r.options.horizontal?`left`:`top`]:e+t,behavior:n})},_s=gs,vs=class{constructor(e){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollState=null,this.measurementsCache=[],this._singleLaneMeasurements=null,this.itemSizeCache=new Map,this.itemSizeCacheVersion=0,this.laneAssignments=new Map,this.pendingMin=null,this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.pendingScrollAnchor=null,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this._iosDeferredAdjustment=0,this._iosTouching=!1,this._iosJustTouchEnded=!1,this._iosTouchEndTimerId=null,this._intendedScrollOffset=null,this._clampedAdjustment=null,this.elementsCache=new Map,this.now=()=>{var e;return((e=this.targetWindow?.performance)?.now)?.call(e)??Date.now()},this.observer=(()=>{let e=null,t=()=>e||(!this.targetWindow||!this.targetWindow.ResizeObserver?null:e=new this.targetWindow.ResizeObserver(e=>{e.forEach(e=>{let t=()=>{let t=e.target,n=this.indexFromElement(t);if(!t.isConnected){this.observer.unobserve(t);for(let[e,n]of this.elementsCache)if(n===t){this.elementsCache.delete(e);break}return}this.isIndexInRange(n)&&this.shouldMeasureDuringScroll(n)&&this.resizeItem(n,this.options.measureElement(t,e,this))};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(t):t()})}));return{disconnect:()=>{var n;(n=t())==null||n.disconnect(),e=null},observe:e=>t()?.observe(e,{box:`border-box`}),unobserve:e=>t()?.unobserve(e)}})(),this.range=null,this.setOptions=e=>{let t={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:cs,rangeExtractor:ls,onChange:()=>{},measureElement:hs,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:`data-index`,initialMeasurementsCache:[],lanes:1,anchorTo:`start`,followOnAppend:!1,scrollEndThreshold:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,laneAssignmentMode:`estimate`,useCachedMeasurements:!1};for(let n in e){let r=e[n];r!==void 0&&(t[n]=r)}let n=this.options,r=null,i=null,a=!1;if(n!==void 0&&n.enabled&&t.enabled&&t.anchorTo===`end`&&this.scrollElement!==null){let e=n.count,o=t.count,s=this.getMeasurements(),c=this._singleLaneMeasurements?.items??s,l=e=>Yo(c[e]),u=e>0?l(0):null,d=e>0?l(e-1):null;if(o!==e||e>0&&o>0&&(t.getItemKey(0)!==u||t.getItemKey(o-1)!==d)){a=!0;let c=e>0?this.getVirtualItemForOffset(this.getScrollOffset())??s[0]:null;c&&(r=[c.key,this.getScrollOffset()-c.start]);let u=t.followOnAppend===!0?`auto`:t.followOnAppend||null;u&&o>0&&this.isAtEnd(n.scrollEndThreshold)&&(e===0||t.getItemKey(o-1)!==d)&&(o>e||ns(e,o,l,t.getItemKey))&&(i=u)}}this.options=t,a&&(this.pendingMin=0,this.itemSizeCacheVersion++);let o=!1,s=0;if(r&&this.scrollOffset!==null){let[e,t]=r,n=this.getMeasurements(),{count:a,getItemKey:c}=this.options,l=0;for(;l<a&&c(l)!==e;)l++;if(l<a){let e=n[l];if(e){let n=Math.max(0,e.start+t);!i&&n!==this.scrollOffset&&(s=n-this.scrollOffset,this.scrollOffset=n,o=!0)}}}(o||i)&&(this.pendingScrollAnchor=[o?r[0]:null,o?r[1]:0,i,s])},this.notify=e=>{var t,n;(n=(t=this.options).onChange)==null||n.call(t,this,e)},this.maybeNotify=Zo(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.observer.disconnect(),this.rafId!=null&&this.targetWindow&&(this.targetWindow.cancelAnimationFrame(this.rafId),this.rafId=null),this.scrollState=null,this.isScrolling=!1,this.scrollDirection=null,this._iosDeferredAdjustment=0,this._iosTouching=!1,this._iosJustTouchEnded=!1,this._clampedAdjustment=null,this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{let e=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==e){if(this.cleanup(),!e){this.maybeNotify();return}if(this.scrollElement=e,this.targetWindow=this.scrollElement&&`ownerDocument`in this.scrollElement?this.scrollElement.ownerDocument.defaultView:this.scrollElement?.window??null,this.elementsCache.forEach(e=>{this.observer.observe(e)}),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(e,t)=>{if(t&&this._intendedScrollOffset===null&&e===this.scrollOffset)return;this._intendedScrollOffset!==null&&Math.abs(e-this._intendedScrollOffset)<1.5&&(e=this._intendedScrollOffset),this._intendedScrollOffset=null,this._clampedAdjustment!==null&&Math.abs(e-this._clampedAdjustment.maxAtWrite)>=1.5&&(this._clampedAdjustment=null),this.scrollAdjustments=0;let n=this.getScrollOffset();this.scrollDirection=t?n===e?this.scrollDirection:n<e?`forward`:`backward`:null,this.scrollOffset=e,this.isScrolling=t,this._flushIosDeferredIfReady(),this.scrollState&&this.scheduleScrollReconcile(),this.maybeNotify()})),`addEventListener`in this.scrollElement){let e=this.scrollElement,t=()=>{this._iosTouching=!0,this._iosJustTouchEnded=!1,this._iosTouchEndTimerId!==null&&this.targetWindow!=null&&(this.targetWindow.clearTimeout(this._iosTouchEndTimerId),this._iosTouchEndTimerId=null)},n=()=>{this._iosTouching=!1,os()&&this.targetWindow!=null&&(this._iosJustTouchEnded=!0,this._iosTouchEndTimerId=this.targetWindow.setTimeout(()=>{this._iosJustTouchEnded=!1,this._iosTouchEndTimerId=null,this._flushIosDeferredIfReady()},150))};e.addEventListener(`touchstart`,t,ds),e.addEventListener(`touchend`,n,ds),this.unsubs.push(()=>{e.removeEventListener(`touchstart`,t),e.removeEventListener(`touchend`,n),this._iosTouchEndTimerId!==null&&this.targetWindow!=null&&(this.targetWindow.clearTimeout(this._iosTouchEndTimerId),this._iosTouchEndTimerId=null)})}this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})}let t=this.pendingScrollAnchor;if(this.pendingScrollAnchor=null,t&&this.scrollElement&&this.options.enabled){let[e,n,r,i]=t;e!==null&&!r&&(os()&&(this.isScrolling||this._iosTouching||this._iosJustTouchEnded)?i!==0&&(this._iosDeferredAdjustment+=i):this.scrollState?.behavior===`smooth`&&!$o(this.getScrollOffset()-i,this.scrollState.lastTargetOffset)||this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})),r&&this.scrollToEnd({behavior:r})}this._retryClampedAdjustment()},this._retryClampedAdjustment=()=>{if(this._clampedAdjustment===null||!this.scrollElement||!this.options.enabled)return;let{target:e,maxAtWrite:t}=this._clampedAdjustment,n=this.getMaxScrollOffset();n>t+.5&&(this._clampedAdjustment=e>n+.5?{target:e,maxAtWrite:n}:null,this._scrollToOffset(e,{adjustments:void 0,behavior:void 0}))},this._flushIosDeferredIfReady=()=>{if(this._iosDeferredAdjustment===0||this.isScrolling||this._iosTouching||this._iosJustTouchEnded)return;let e=this.getScrollOffset(),t=this.getMaxScrollOffset();if(e<0||e>t)return;if(this._iosDeferredAdjustment<0&&e>=t-1){this._iosDeferredAdjustment=0;return}let n=this._iosDeferredAdjustment;this._iosDeferredAdjustment=0,this._scrollToOffset(e,{adjustments:this.scrollAdjustments+=n,behavior:void 0})},this.rafId=null,this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?`width`:`height`]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??(typeof this.options.initialOffset==`function`?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getMeasurementOptions=Zo(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes,this.options.laneAssignmentMode,this.options.gap],(e,t,n,r,i,a,o,s)=>(this.prevLanes!==void 0&&this.prevLanes!==a&&(this.lanesChangedFlag=!0),this.prevLanes=a,this.pendingMin=null,{count:e,paddingStart:t,scrollMargin:n,getItemKey:r,enabled:i,lanes:a,laneAssignmentMode:o,gap:s}),{key:!1}),this.isIndexInRange=e=>e>=0&&e<this.options.count,this.getMeasurements=Zo(()=>[this.getMeasurementOptions(),this.itemSizeCacheVersion],({count:e,paddingStart:t,scrollMargin:n,getItemKey:r,enabled:i,lanes:a,laneAssignmentMode:o,gap:s},c)=>{let l=this.itemSizeCache;if(!i)return this.measurementsCache=[],this._singleLaneMeasurements=null,this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>e)for(let t of this.laneAssignments.keys())t>=e&&this.laneAssignments.delete(t);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this._singleLaneMeasurements=null,this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMin=null),this.measurementsCache.length===0&&!this.lanesSettling&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(e=>{this.itemSizeCache.set(e.key,e.size)}));let u=this.lanesSettling?0:this.pendingMin??0;if(this.pendingMin=null,this.lanesSettling&&this.measurementsCache.length===e&&(this.lanesSettling=!1),a===1){let i=e*2,a=this._singleLaneMeasurements?.flat;if(!a||a.length<i){let e=new Float64Array(i);a&&u>0&&e.set(a.subarray(0,u*2)),a=e}let o=u===0?Array(e):this._singleLaneMeasurements.items.slice(),c;if(u===0)c=t+n;else{let e=u-1;c=a[e*2]+a[e*2+1]+s}for(let t=u;t<e;t++){let e=r(t);o[t]=e;let n=l.get(e),i=typeof n==`number`?n:this.options.estimateSize(t);a[t*2]=c,a[t*2+1]=i,c+=i+s}this._singleLaneMeasurements={flat:a,items:o};let d=Xo(o,a);return this.measurementsCache=d,d}let d=this.measurementsCache.slice(0,u),f=Array(a).fill(void 0),p=new Float64Array(a),m=0;for(let e=0;e<u;e++){let t=d[e];t&&(f[t.lane]===void 0&&m++,f[t.lane]=e,p[t.lane]=t.end)}for(let i=u;i<e;i++){let e=r(i),c=this.laneAssignments.get(i),u,h,g=o===`estimate`||l.has(e);if(c!==void 0&&this.options.lanes>1){u=c;let e=f[u],r=e===void 0?void 0:d[e];h=r?r.end+s:t+n}else if(m===a){let e=0,t=p[0],n=f[0];for(let r=1;r<a;r++){let i=p[r];(i<t||i===t&&f[r]<n)&&(e=r,t=i,n=f[r])}u=e,h=t+s,g&&this.laneAssignments.set(i,u)}else u=i%this.options.lanes,h=t+n,g&&this.laneAssignments.set(i,u);let _=l.get(e),v=typeof _==`number`?_:this.options.estimateSize(i),y=h+v;d[i]={index:i,start:h,size:v,end:y,key:e,lane:u},f[u]===void 0&&m++,f[u]=i,p[u]=y}return this.measurementsCache=d,d},{key:!1,debug:()=>this.options.debug}),this.calculateRange=Zo(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(e,t,n,r)=>e.length===0||t===0?(this.range=null,null):(this.range=is(e,t,n,r,r===1&&this._singleLaneMeasurements!==null?this._singleLaneMeasurements.flat:null),this.range),{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=Zo(()=>{let e=null,t=null,n=this.calculateRange();return n&&(e=n.startIndex,t=n.endIndex),this.maybeNotify.updateDeps([this.isScrolling,e,t]),[this.options.rangeExtractor,this.options.overscan,this.options.count,e,t]},(e,t,n,r,i)=>r===null||i===null?[]:e({startIndex:r,endIndex:i,overscan:t,count:n}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{let t=this.options.indexAttribute,n=e.getAttribute(t);return n?parseInt(n,10):(console.warn(`Missing attribute name '${t}={index}' on measured element.`),-1)},this.shouldMeasureDuringScroll=e=>{if(!this.scrollState||this.scrollState.behavior!==`smooth`)return!0;let t=this.scrollState.index??this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)?.index;if(t!==void 0&&this.range){let n=Math.max(this.options.overscan,Math.ceil((this.range.endIndex-this.range.startIndex)/2)),r=Math.max(0,t-n),i=Math.min(this.options.count-1,t+n);return e>=r&&e<=i}return!0},this.measureElement=e=>{if(!e){this.elementsCache.forEach((e,t)=>{e.isConnected||(this.observer.unobserve(e),this.elementsCache.delete(t))});return}let t=this.indexFromElement(e);if(!this.isIndexInRange(t))return;let n=this.options.getItemKey(t),r=this.elementsCache.get(n);r!==e&&(r&&this.observer.unobserve(r),this.observer.observe(e),this.elementsCache.set(n,e)),(!this.isScrolling||this.scrollState)&&this.shouldMeasureDuringScroll(t)&&this.resizeItem(t,this.options.measureElement(e,void 0,this))},this.resizeItem=(e,t)=>{if(!this.isIndexInRange(e))return;let n,r,i,a=this._singleLaneMeasurements?.flat;if(this.options.lanes===1&&a!=null)i=this.options.getItemKey(e),r=a[e*2],n=a[e*2+1];else{let t=this.measurementsCache[e];if(!t)return;i=t.key,r=t.start,n=t.size}let o=this.itemSizeCache.get(i)??n,s=t-o;if(s!==0){let a=this.options.anchorTo===`end`&&this.scrollState?.behavior!==`smooth`&&this.getVirtualDistanceFromEnd()<=this.options.scrollEndThreshold,c=a?this.getTotalSize():0,l=this.getScrollOffset()+this.scrollAdjustments,u=this.itemSizeCache.has(i)?r+o<=l&&this.scrollDirection!==`backward`:r<l,d=this.scrollState?.behavior!==`smooth`&&(this.shouldAdjustScrollPositionOnItemSizeChange===void 0?u:this.shouldAdjustScrollPositionOnItemSizeChange(this.measurementsCache[e]??{index:e,key:i,start:r,size:n,end:r+n,lane:0},s,this));(this.pendingMin===null||e<this.pendingMin)&&(this.pendingMin=e),this.itemSizeCache.set(i,t),this.itemSizeCacheVersion++;let f=!1;a?f=this.applyScrollAdjustment(this.getTotalSize()-c):d&&(f=this.applyScrollAdjustment(s)),this.notify(f),this._retryClampedAdjustment()}},this.getVirtualItems=Zo(()=>[this.getVirtualIndexes(),this.getMeasurements()],(e,t)=>{let n=[];for(let r=0,i=e.length;r<i;r++){let i=t[e[r]];n.push(i)}return n},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{let t=this.getMeasurements();if(t.length===0)return;let n=this._singleLaneMeasurements?.flat,r=this.options.lanes===1&&n!=null;return Qo(t[ys(0,t.length-1,r?e=>n[e*2]:e=>Qo(t[e]).start,e)])},this.getMaxScrollOffset=()=>{if(!this.scrollElement)return 0;if(`scrollHeight`in this.scrollElement)return this.options.horizontal?this.scrollElement.scrollWidth-this.scrollElement.clientWidth:this.scrollElement.scrollHeight-this.scrollElement.clientHeight;{let e=this.scrollElement.document.documentElement;return this.options.horizontal?e.scrollWidth-this.scrollElement.innerWidth:e.scrollHeight-this.scrollElement.innerHeight}},this.getVirtualDistanceFromEnd=()=>Math.max(this.getTotalSize()-this.getSize()-this.getScrollOffset(),0),this.getDistanceFromEnd=()=>Math.max(this.getMaxScrollOffset()-this.getScrollOffset(),0),this.isAtEnd=(e=this.options.scrollEndThreshold)=>this.getDistanceFromEnd()<=e,this.getOffsetForAlignment=(e,t,n=0)=>{if(!this.scrollElement)return 0;let r=this.getSize(),i=this.getScrollOffset();t===`auto`&&(t=e>=i+r?`end`:`start`),t===`center`?e+=(n-r)/2:t===`end`&&(e-=r);let a=this.getMaxScrollOffset();return Math.max(Math.min(a,e),0)},this.getOffsetForIndex=(e,t=`auto`)=>{e=Math.max(0,Math.min(e,this.options.count-1));let n=this.getSize(),r=this.getScrollOffset(),i=this.measurementsCache[e];if(!i)return;if(t===`auto`){if(i.end>=r+n-this.options.scrollPaddingEnd)t=`end`;else if(i.start<=r+this.options.scrollPaddingStart)t=`start`;else return[r,t]}if(t===`end`&&e===this.options.count-1)return[this.getMaxScrollOffset(),t];let a=t===`end`?i.end+this.options.scrollPaddingEnd:i.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(a,t,i.size),t]},this.scrollToOffset=(e,{align:t=`start`,behavior:n=`auto`}={})=>{this._iosDeferredAdjustment=0;let r=this.getOffsetForAlignment(e,t),i=this.now();this.scrollState={index:null,align:t,behavior:n,startedAt:i,lastTargetOffset:r,stableFrames:0},this._scrollToOffset(r,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollToIndex=(e,{align:t=`auto`,behavior:n=`auto`}={})=>{this._iosDeferredAdjustment=0,e=Math.max(0,Math.min(e,this.options.count-1));let r=this.getOffsetForIndex(e,t);if(!r)return;let[i,a]=r,o=this.now();this.scrollState={index:e,align:a,behavior:n,startedAt:o,lastTargetOffset:i,stableFrames:0},this._scrollToOffset(i,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollBy=(e,{behavior:t=`auto`}={})=>{let n=this.getScrollOffset()+e,r=this.now();this.scrollState={index:null,align:`start`,behavior:t,startedAt:r,lastTargetOffset:n,stableFrames:0},this._scrollToOffset(n,{adjustments:void 0,behavior:t}),this.scheduleScrollReconcile()},this.scrollToEnd=({behavior:e=`auto`}={})=>{if(this.options.count>0){this.scrollToIndex(this.options.count-1,{align:`end`,behavior:e});return}this.scrollToOffset(Math.max(this.getTotalSize()-this.getSize(),0),{behavior:e})},this.getTotalSize=()=>{let e=this.getMeasurements(),t;if(e.length===0)t=this.options.paddingStart;else if(this.options.lanes===1){let n=e.length-1,r=this._singleLaneMeasurements?.flat;t=r==null?e[n]?.end??0:r[n*2]+r[n*2+1]}else{let n=Array(this.options.lanes).fill(null),r=e.length-1;for(;r>=0&&n.some(e=>e===null);){let t=e[r];n[t.lane]===null&&(n[t.lane]=t.end),r--}t=Math.max(...n.filter(e=>e!==null))}return Math.max(t-this.options.scrollMargin+this.options.paddingEnd,0)},this.takeSnapshot=()=>{let e=[];if(this.itemSizeCache.size===0)return e;let t=this.getMeasurements();for(let n of t)n&&this.itemSizeCache.has(n.key)&&e.push({index:n.index,key:n.key,start:n.start,size:n.size,end:n.end,lane:n.lane});return e},this._scrollToOffset=(e,{adjustments:t,behavior:n})=>{this._intendedScrollOffset=e+(t??0),this.options.scrollToFn(e,{behavior:n,adjustments:t},this)},this.measure=()=>{this.pendingMin=null,this.itemSizeCache.clear(),this.laneAssignments.clear(),this.itemSizeCacheVersion++,this.notify(!1)},this.setOptions(e)}applyScrollAdjustment(e,t){if(e===0)return!1;if(os()&&(this.isScrolling||this._iosTouching||this._iosJustTouchEnded))return this._iosDeferredAdjustment+=e,!1;{let n=this.getScrollOffset()+this.scrollAdjustments+e,r=this.scrollElement,i=r!==null&&(`scrollHeight`in r||`document`in r)?this.getMaxScrollOffset():null;return this._clampedAdjustment=i!==null&&n>i+.5?{target:n,maxAtWrite:i}:null,this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=e,behavior:t}),this.scrollOffset!==null&&(this.scrollOffset+=this.scrollAdjustments,this.scrollOffset<0&&(this.scrollOffset=0),this.scrollAdjustments=0),!0}}scheduleScrollReconcile(){if(!this.targetWindow){this.scrollState=null;return}this.rafId??=this.targetWindow.requestAnimationFrame(()=>{this.rafId=null,this.reconcileScroll()})}reconcileScroll(){if(!this.scrollState||!this.scrollElement)return;if(this.now()-this.scrollState.startedAt>5e3){this.scrollState=null;return}let e=this.scrollState.index==null?void 0:this.getOffsetForIndex(this.scrollState.index,this.scrollState.align),t=e?e[0]:this.scrollState.lastTargetOffset,n=t!==this.scrollState.lastTargetOffset;if(!n&&$o(t,this.getScrollOffset())){if(this.scrollState.stableFrames++,this.scrollState.stableFrames>=1){this.getScrollOffset()!==t&&this._scrollToOffset(t,{adjustments:void 0,behavior:`auto`}),this.scrollState=null;return}}else if(this.scrollState.stableFrames=0,n){let e=this.getSize()||600,n=Math.abs(t-this.getScrollOffset()),r=this.scrollState.behavior===`smooth`&&n>e;this.scrollState.lastTargetOffset=t,r||(this.scrollState.behavior=`auto`),this._scrollToOffset(t,{adjustments:void 0,behavior:r?`smooth`:`auto`})}this.scheduleScrollReconcile()}},ys=(e,t,n,r)=>{for(;e<=t;){let i=(e+t)/2|0,a=n(i);if(a<r)e=i+1;else if(a>r)t=i-1;else return i}return e>0?e-1:0}})))()}var xs,Ss;function Cs(){return(Cs=e((()=>{bs(),xs=class{constructor(e,t){this.cleanup=()=>{};let n={...t,onChange:(e,n)=>{var r;this.host.updateComplete.then(()=>this.host.requestUpdate()),(r=t.onChange)==null||r.call(t,e,n)}};this.virtualizer=new vs(n),(this.host=e).addController(this)}getVirtualizer(){return this.virtualizer}hostConnected(){this.cleanup=this.virtualizer._didMount()}hostUpdated(){this.virtualizer._willUpdate()}hostDisconnected(){this.cleanup()}},Ss=class extends xs{constructor(e,t){super(e,{observeElementRect:us,observeElementOffset:ms,scrollToFn:_s,...t})}}})))()}var ws;function Ts(){return(Ts=e((()=>{N(),ws=F`
  :host {
    --arrow-size: 0.375rem;
    --max-width: 25rem;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    display: contents;

    /** Defaults for inherited CSS properties */
    font-size: var(--wa-font-size-m);
    line-height: var(--wa-line-height-normal);
    text-align: start;
    white-space: normal;
  }

  /* The native dialog element */
  .dialog {
    display: none;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    pointer-events: none;

    &:focus {
      outline: none;
    }

    &[open] {
      display: block;
    }
  }

  /* The <wa-popup> element */
  .popover {
    --arrow-size: inherit;
    --popup-border-width: var(--wa-panel-border-width);
    --show-duration: inherit;
    --hide-duration: inherit;

    pointer-events: auto;

    /* Inset box-shadow, not a border: Safari seams a clip-path edge that runs along a border. */
    &::part(arrow) {
      background-color: var(--wa-color-surface-default);
      border: none;
      box-shadow: inset calc(-1 * var(--wa-panel-border-width)) calc(-1 * var(--wa-panel-border-width)) 0 0
        var(--wa-color-surface-border);
    }
  }

  .popover[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .popover[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .popover[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .popover[placement^='right']::part(popup) {
    transform-origin: left;
  }

  /* Body */
  .body {
    display: flex;
    flex-direction: column;
    width: auto;
    max-width: min(var(--max-width), 100vw);
    padding: var(--wa-space-l);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-l);
    color: var(--wa-color-text-normal);
    user-select: none;
    -webkit-user-select: none;
  }
`})))()}var Es,$;function Ds(){return(Ds=e((()=>{Ts(),E(),te(),T(),se(),jn(),x(),Nn(),_(),f(),N(),I(),fe(),Es=new Set,$=class extends v{constructor(){super(...arguments),this.anchor=null,this.placement=`top`,this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.pressStartedInside=!1,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=e=>{e.target.closest(`[data-popover="close"]`)&&(e.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&ne(this)&&(e.preventDefault(),e.stopPropagation(),this.open=!1,this.anchor&&typeof this.anchor.focus==`function`&&this.anchor.focus({preventScroll:!0}))},this.handleDocumentPointerDown=e=>{this.pressStartedInside=e.composedPath().includes(this)},this.handleDocumentClick=e=>{let t=this.pressStartedInside;this.pressStartedInside=!1,!t&&(this.anchor&&e.composedPath().includes(this.anchor)||e.composedPath().includes(this)||(this.open=!1))}}connectedCallback(){super.connectedCallback(),this.id||=Mn(`wa-popover-`),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.for&&this.anchor&&(this.anchor=null,this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,{capture:!0}),S(this),this.eventController.abort()}firstUpdated(e){super.firstUpdated(e),this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(e){e.has(`open`)&&this.customStates.set(`open`,this.open)}async handleOpenChange(){if(this.open){let e=new D;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}Es.forEach(e=>e.open=!1),document.addEventListener(`keydown`,this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener(`pointerdown`,this.handleDocumentPointerDown,{capture:!0,signal:this.eventController.signal}),document.addEventListener(`click`,this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.setAttribute(`open`,``),this.popup.active=!0,Es.add(this),ae(this),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e&&typeof e.focus==`function`?e.focus({preventScroll:!0}):this.dialog.focus({preventScroll:!0})}),await oe(this.popup.popup,`show-with-scale`),this.popup.reposition(),this.dispatchEvent(new ee)}else{let e=new re;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,{capture:!0}),document.removeEventListener(`click`,this.handleDocumentClick),this.pressStartedInside=!1,Es.delete(this),S(this),await oe(this.popup.popup,`hide-with-scale`),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new C)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,n=this.anchor;if(t===n)return;let{signal:r}=this.eventController;t&&t.addEventListener(`click`,this.handleAnchorClick,{signal:r}),n&&n.removeEventListener(`click`,this.handleAnchorClick),this.anchor=t,this.for&&!t&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,In(this,`wa-after-show`)}async hide(){if(this.open)return this.open=!1,In(this,`wa-after-hide`)}render(){return j`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${M({popover:!0,"popover-open":this.open})}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          shift-padding="8"
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `}},$.css=ws,$.dependencies={"wa-popup":U},y([P(`dialog`)],$.prototype,`dialog`,2),y([P(`.body`)],$.prototype,`body`,2),y([P(`wa-popup`)],$.prototype,`popup`,2),y([be()],$.prototype,`anchor`,2),y([L()],$.prototype,`placement`,2),y([L({type:Boolean,reflect:!0})],$.prototype,`open`,2),y([L({type:Number})],$.prototype,`distance`,2),y([L({type:Number})],$.prototype,`skidding`,2),y([L()],$.prototype,`for`,2),y([L({attribute:`without-arrow`,type:Boolean,reflect:!0})],$.prototype,`withoutArrow`,2),y([w(`open`,{waitUntilFirstUpdate:!0})],$.prototype,`handleOpenChange`,1),y([w(`for`)],$.prototype,`handleForChange`,1),y([w([`distance`,`placement`,`skidding`])],$.prototype,`handleOptionsChange`,1),$=y([R(`wa-popover`)],$)})))()}function Os(){return(Os=e((()=>{Ds(),Ts(),jn(),Ne(),_(),A(),o()})))()}export{Wr as $,Ma as A,ji as B,eo as C,ke as Ct,Ia as D,Ua as E,ca as F,vi as G,wi as H,Ni as I,ai as J,_i as K,Mi as L,aa as M,ra as N,Fa as O,ua as P,Fr as Q,ki as R,to as S,Ne as St,J as T,Ei as U,Di as V,Ti as W,ii as X,ni as Y,Ir as Z,Ro as _,Ln as _t,Cs as a,Yr as at,wo as b,U as bt,_s as c,ei as ct,ms as d,lr as dt,Ur as et,us as f,cr as ft,Ho as g,Cr as gt,Vo as h,dr as ht,Ss as i,Xr as it,ia as j,ja as k,bs as l,$r as lt,Wo as m,mr as mt,$ as n,Jr as nt,vs as o,Qr as ot,Jo as p,ur as pt,oi as q,Ds as r,ti as rt,ls as s,Zr as st,Os as t,qr as tt,hs as u,sr as ut,Fo as v,W as vt,$a as w,Mo as x,jn as xt,Io as y,Fn as yt,Oi as z};