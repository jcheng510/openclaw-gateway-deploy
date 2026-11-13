import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{hu as t,uu as n}from"./control-ui-core-pYNj5S1a.js";import{or as r,sr as i}from"./control-ui-core-D6clmJs8.js";import{$ as a,X as o,Y as s}from"./lit-runtime-DZL1fcCI.js";import{_ as c,g as l}from"./control-ui-boot-shared-DJ4XCcp6.js";function u(e){return c({id:`sessions`,active:e.active,tabs:[{value:`sessions`,label:t(`tabs.sessions`)},{value:`worktrees`,label:t(`tabs.worktrees`)}],ariaLabel:t(`sessionsPage.hubTablistLabel`),panelId:`sessions-hub-panel`,onSelect:e.onSelect})}function d(){return(d=e((()=>{n(),l()})))()}function f(e){return a`
    <section
      class="content-header content-header--settings content-header--page hub-page-header sessions-hub-header"
      ${i({toolbarHeader:!0})}
    >
      <div class="hub-page-header__title">
        <div class="page-title">${e.title}</div>
        ${e.subtitle?a`<div class="page-subtitle">${e.subtitle}</div>`:o}
      </div>
      <div class="hub-page-header__tabs">
        ${u({active:e.active,onSelect:e.onSelect})}
      </div>
      <div class="hub-page-header__actions">${e.actions??o}</div>
    </section>
  `}function p(){return(p=e((()=>{s(),r(),d()})))()}export{f as n,p as t};