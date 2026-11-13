import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$ as t,X as n,Y as r}from"./lit-runtime-DZL1fcCI.js";import{Kr as i,ni as a,qr as o,ti as s}from"./control-ui-boot-shared-DJ4XCcp6.js";import{Br as c,Vr as l,zr as u}from"./control-ui-boot-shared-DCY2wZcy.js";function d(){return(d=e((()=>{})))()}function f(e,n,r,i={}){let a=r===`picker`?`tile`:r;return t`${s(i.pluginIconUrl,(o,s)=>{let[u,d]=o?[``,``]:c(e),f=`${r===`picker`?`--channels-art-size:24px;`:``}${o?``:`--channels-art-a:${u};--channels-art-b:${d}`}`,p=r===`cover`&&i.pluginIconUrl?` channels-cover--icon`:``;return t`<span
      class=${`channels-${a}${p}${o?``:` channels-${a}--fallback`}`}
      style=${f}
      aria-hidden="true"
    >
      ${o?t`<img src=${o} alt="" loading="lazy" decoding="async" @error=${s} />`:t`<span>${l(n)}</span>`}
    </span>`})}`}function p(){return(p=e((()=>{r(),u(),a()})))()}function m(e){return o({...e,className:`channel-picker`,renderLeading:e=>e.kind===`neutral`?n:f(e.value,e.label,`picker`)})}function h(){return(h=e((()=>{r(),p(),i()})))()}export{d as a,f as i,m as n,p as r,h as t};