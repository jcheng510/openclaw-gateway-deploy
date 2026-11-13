import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$ as t,Y as n}from"./lit-runtime-DZL1fcCI.js";import{Ot as r,_t as i}from"./control-ui-boot-shared-DJ4XCcp6.js";function a(e){return r({title:e.title,description:e.description,control:t`
      <select
        class="settings-select"
        ?data-settings-send-shortcut=${e.setting===`send-shortcut`}
        ?data-settings-follow-up-mode=${e.setting===`follow-up-mode`}
        ?data-settings-catalog-open-target=${e.setting===`catalog-open-target`}
        aria-label=${e.title}
        ?disabled=${e.disabled??!1}
        .value=${e.value}
        @change=${t=>e.onChange(t.currentTarget.value)}
      >
        ${e.options.map(n=>t`
            <option value=${n.value} ?selected=${e.value===n.value}>
              ${n.label}
            </option>
          `)}
      </select>
    `})}function o(){return(o=e((()=>{n(),i()})))()}export{a as n,o as t};