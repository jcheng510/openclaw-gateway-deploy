import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{hu as t,uu as n}from"./control-ui-core-pYNj5S1a.js";import{Ma as r,ja as i,or as a,sr as o,va as s}from"./control-ui-core-D6clmJs8.js";import{$ as c,X as l,Y as u}from"./lit-runtime-DZL1fcCI.js";import{di as d,fi as f}from"./control-ui-boot-shared-3Hl8ksFq.js";import{_ as p,_t as m,g as h,yt as g}from"./control-ui-boot-shared-DJ4XCcp6.js";function _(){return(_=e((()=>{})))()}function v(e){return p({id:`plugins`,active:e.active,tabs:[{value:`plugins`,label:t(`tabs.plugins`)},{value:`skills`,label:t(`tabs.skills`)},{value:`skill-workshop`,label:t(`tabs.skillWorkshop`)}],ariaLabel:t(`pluginsPage.hubTablistLabel`),panelId:y,className:`plugins-tabs`,onSelect:e.onSelect})}var y;function b(){return(b=e((()=>{h(),n(),d(),f(),y=`plugins-hub-panel`})))()}function x(e){let t=S[e.active];return c`
    <section
      class="content-header content-header--stacked content-header--settings content-header--page hub-page-header plugins-hub-header"
      ${o({hubHeader:!0})}
    >
      <div class="hub-page-header__title">
        <h1 class="page-title">${r(t.route)}</h1>
        <div class="page-subtitle">
          ${i(t.route)} ${g(t.docsUrl)}
        </div>
      </div>
      <div class="hub-page-header__tabs">
        ${v({active:e.active,onSelect:e.onSelect})}
      </div>
      <div class="hub-page-header__actions">
        ${e.secondaryAction?c`<button
                type="button"
                class="btn btn--sm ${e.secondaryAction.icon?`btn--icon`:``} plugins-hub-header__secondary oc-action oc-action-secondary"
                aria-label=${e.secondaryAction.label}
                title=${e.secondaryAction.icon?e.secondaryAction.label:l}
                @click=${e.secondaryAction.onClick}
              >
                ${e.secondaryAction.icon??e.secondaryAction.label}
              </button>`:l}
      </div>
    </section>
  `}var S;function C(){return(C=e((()=>{u(),s(),a(),m(),b(),S={plugins:{route:`plugins`,docsUrl:`https://docs.openclaw.ai/plugins/manage-plugins`},skills:{route:`skills`,docsUrl:`https://docs.openclaw.ai/tools/skills`},"skill-workshop":{route:`skill-workshop`,docsUrl:`https://docs.openclaw.ai/tools/skill-workshop`}}})))()}export{_ as a,b as i,x as n,y as r,C as t};