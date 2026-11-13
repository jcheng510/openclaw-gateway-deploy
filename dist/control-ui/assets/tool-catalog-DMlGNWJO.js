import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Br as t,Oi as n,Ui as r,gi as i,hi as a,ii as o,qr as s,ro as c,zr as l}from"./control-ui-foundation-C3MHh_P-.js";import{F as u,Gl as d,Jc as ee,R as te,bu as ne,cc as re,gu as ie,hu as f,li as ae,lu as oe,pu as p,qc as se,ql as m,sc as ce,su as le,ui as ue,uu as h,xu as de}from"./control-ui-core-pYNj5S1a.js";import{Br as fe,or as pe,sr as me,vi as he,yi as ge}from"./control-ui-core-D6clmJs8.js";import{$ as g,X as _,Y as v,ct as y,nt as _e,r as ve,t as ye,ut as be}from"./lit-runtime-DZL1fcCI.js";import{c as xe,d as Se,l as Ce}from"./gateway-runtime-iOL78mIi.js";import{no as we,ro as Te}from"./control-ui-boot-shared-3Hl8ksFq.js";import{To as Ee,_ as b,_t as De,ar as Oe,bt as ke,g as Ae,rr as je,wo as Me}from"./control-ui-boot-shared-DJ4XCcp6.js";import{n as Ne,t as Pe}from"./en-settings-DlF4_5vi.js";import{b as Fe,f as Ie,l as Le,u as Re,x as ze}from"./control-ui-boot-new-CaEHEcx2.js";import{n as Be,r as Ve,t as He}from"./slots-A5O32RGG.js";var x,S;function C(){return(C=e((()=>{de(),x={dreaming:{tabs:{scene:`Scene`,diary:`Diary`,advanced:`Advanced`},header:{refresh:`Refresh`,refreshing:`Refreshing…`,on:`Dreaming On`,off:`Dreaming Off`,engineOff:`Memory engine is Off. Choose an engine in Settings to enable dreaming.`},toggleConfirmation:{subtitle:`Dreaming is a global setting; it is not scoped to this agent.`,enableTitle:`Turn On Dreaming for All Agents`,enableDetail:`The nightly dreaming sweep will run across every configured agent workspace, promoting short-term recalls into long-term memory. This applies right away.`,enableConfirm:`Turn On Dreaming`,disableTitle:`Turn Off Dreaming for All Agents`,disableDetail:`The nightly dreaming sweep will stop for every configured agent, not just this one. Memories already written stay; nothing new gets promoted. This applies right away.`,disableConfirm:`Turn Off Dreaming`,saving:`Saving…`,failed:`Could not apply change. Check your connection and try again.`},status:{active:`Dreaming Active`,idle:`Dreaming Idle`,promotedSuffix:`promoted`,nextSweepPrefix:`next sweep`},scene:{backfill:`Backfill`,dedupeDiary:`Dedupe Diary`,reset:`Reset`,clearGrounded:`Clear Replayed`,repairCache:`Repair Dream Cache`,working:`Working…`},phase:{light:`Light`,deep:`Deep`,rem:`Rem`,off:`off`},advanced:{eyebrow:`Review`,title:`Daily Log Review`,description:`Review what came from the daily log, what is waiting for promotion, and what was promoted recently.`,summaryFromDailyLog:`from daily log`,summaryWaiting:`waiting`,summaryPromotedToday:`promoted today`,stagedTitle:`From the Daily Log`,stagedDescription:`Replay candidates pulled from older daily log entries.`,shortTermTitle:`Waiting for Promotion`,shortTermDescription:`Current short-term candidates waiting to graduate into real memory.`,sortRecent:`Most recent`,sortSignals:`Strongest support`,originDailyLog:`replayed`,originLive:`live`,originMixed:`mixed`,promotedTitle:`Recent Promotions`,promotedDescription:`Items that already made it through promotion.`,emptyGrounded:`No staged grounded replay entries right now.`,emptyShortTerm:`No short-term entries to inspect.`,emptyPromoted:`No recent promotions to inspect.`,updatedPrefix:`updated`},stats:{grounded:`Grounded`,signals:`Signals`},diary:{title:`Dream Diary`,noDreamsYet:`No dreams yet`,noDreamsHint:`Dreams will appear here after the first dreaming cycle runs.`,waitingTitle:`The diary is waiting`,waitingHint:`Narrative entries will appear after the next dreaming cycle.`,reload:`Reload`,reloading:`Reloading…`},actions:{dedupeRemovedOneAndKept:`Removed {removed} duplicate dream entry and kept {kept}.`,dedupeRemovedManyAndKept:`Removed {removed} duplicate dream entries and kept {kept}.`,dedupeRemovedOne:`Removed {removed} duplicate dream entry.`,dedupeRemovedMany:`Removed {removed} duplicate dream entries.`,repairArchivedThreadCorpus:`archived session corpus`,repairArchivedIngestionState:`archived ingestion state`,repairArchivedDreamDiary:`archived dream diary`,repairNoChanges:`Dream cache repair finished with no changes.`,repairCompleteWithArchive:`Dream cache repair complete: {actions}. Archive: {archiveDir}`,repairComplete:`Dream cache repair complete: {actions}.`,backfillComplete:`Backfilled {count} dream diary entries.`,resetDiaryComplete:`Removed {count} backfilled dream diary entries.`,clearReplayedComplete:`Cleared {count} replayed short-term entries.`,complete:`Dream diary action complete.`,confirmRepairDescription:`This archives derived dream cache files and rebuilds them from clean inputs. Your dream diary stays untouched.`,confirmDedupeDescription:`This rewrites DREAMS.md and removes only exact duplicate diary entries.`,archivePathCopied:`Archive path copied.`,archivePathCopyFailed:`Could not copy archive path.`,updateFailed:`Could not update dreaming settings.`,unsupportedPlugin:`Selected memory plugin "{pluginId}" does not support dreaming settings.`,configHashMissing:`Config hash missing; refresh and retry.`},wiki:{previewFallbackTitle:`Wiki page`,close:`Close`,loadingPage:`Loading wiki page…`,dreamsTab:`Dreams`,insightsTab:`Imported Insights`,wikiTab:`Memory Wiki`,dreamsExplainer:`This is the raw dream diary the system writes while replaying and consolidating memory; use it to inspect what the memory system is noticing, and where it still looks noisy or thin.`,insightsExplainer:`These are imported insights clustered from external history; use them to review what imports surfaced before any of it graduates into durable memory.`,wikiExplainer:`This is the compiled memory wiki surface the system can search and reason over; use it to inspect actual memory pages, claims, open questions, and contradictions rather than raw imported source chats.`,copyArchivePath:`Copy archive path`,loadingInsights:`Loading imported insights…`,noInsights:`No imported insights yet`,noInsightsHint:`Run a ChatGPT import with apply to surface clustered imported insights here.`,candidateSignals:`Potentially useful signals`,corrections:`Corrections or revisions`,importDetails:`Import details`,startedWith:`Started with:`,endedOn:`Ended on:`,messages:`Messages:`,riskReasons:`Risk reasons:`,labels:`Labels:`,openSourcePage:`Open source page`,loadingWiki:`Loading memory wiki…`,emptyWiki:`Memory wiki is not populated yet`,emptyWikiHint:`Right now the wiki mostly has raw source imports and operational reports. This tab becomes useful once syntheses, entities, or concepts start getting written.`,claims:`Claims`,openQuestions:`Open questions`,contradictions:`Contradictions`,pageDetails:`Page details`,wikiPage:`Wiki page:`,id:`Id:`,openWikiPage:`Open wiki page`,unavailable:`Memory Wiki is not enabled`,unavailablePluginPrefix:`Imported Insights and Memory Wiki are provided by the bundled`,unavailablePluginSuffix:`plugin.`,enablePrefix:`Enable`,enableSuffix:`, then reload this tab.`,openConfig:`Open Config`,howToEnable:`How to enable`,pageTypes:{entity:`entity`,concept:`concept`,source:`source`,synthesis:`synthesis`,report:`report`},pageGroups:{sources:`Sources`,syntheses:`Syntheses`,reports:`Reports`,entities:`Entities`,concepts:`Concepts`},counts:{pageOne:`{count} page`,pages:`{count} pages`,claimRowOne:`{count} claim row`,claimRows:`{count} claim rows`,openQuestionOne:`{count} open question`,openQuestions:`{count} open questions`,contradictionOne:`{count} contradiction`,contradictions:`{count} contradictions`,chats:`{count} chats`,sensitive:`{count} sensitive`,signals:`{count} signals`,messages:`{count} messages`,userMessages:`{count} user`,assistantMessages:`{count} assistant`},pageGroupSummary:`{label} · {count}`,noPagesYet:`No pages yet`,sectionPageSummary:`{label}: {count}`,questionCountOnPages:`{questionCount} on {pageCount}`,risk:{needsReview:`needs review`,low:`low risk`,medium:`medium risk`,high:`high risk`,unknown:`unknown risk`},pageNotFound:`No wiki page found for {lookup}.`,previewTruncated:`Showing the first chunk of this page.`,previewTruncatedWithTotal:`Showing the first chunk of this page ({count} total lines).`,boundedResults:`Showing the newest {returned} of {total} items.`,importedClusterSummary:`Imported chats clustered around {label}.`,withheldDigestOne:`{count} digest was withheld pending review.`,withheldDigests:`{count} digests were withheld pending review.`,details:`Details`,hideDetails:`Hide details`,vault:`Vault`,fullVaultBreakdown:`Full vault breakdown: {breakdown}.`,selectedSection:`Selected section: {summary}.`,latestUpdate:`Latest update {date}.`,noContent:`No wiki content available.`},phrases:{consolidatingMemories:`consolidating memories…`,tidyingKnowledgeGraph:`tidying the knowledge graph…`,replayingConversations:`replaying today's conversations…`,weavingShortTerm:`weaving short-term into long-term…`,defragmentingMemoryLane:`defragmenting memory lane…`,filingLooseThoughts:`filing away loose thoughts…`,connectingDots:`connecting distant dots…`,compostingContext:`composting old context windows…`,alphabetizingSubconscious:`alphabetizing the subconscious…`,promotingHunches:`promoting promising hunches…`,forgettingNoise:`forgetting what doesn't matter…`,dreamingEmbeddings:`dreaming in embeddings…`,reorganizingAttic:`reorganizing the memory attic…`,indexingDay:`softly indexing the day…`,nurturingInsights:`nurturing fledgling insights…`,simmeringIdeas:`simmering half-formed ideas…`,whisperingVectorStore:`whispering to the vector store…`}}},S=Object.assign(()=>{ne.dreaming=x.dreaming},{catalog:x})})))()}function w(e,t,n){let r=n?.enabledByDefault??!0,i=e?.config;if(!i||typeof i!=`object`||Array.isArray(i))return r;let a=`plugins`in i&&i.plugins&&typeof i.plugins==`object`?i.plugins:null;if(a?.enabled===!1||(Array.isArray(a?.deny)&&a.deny.every(e=>typeof e==`string`)?a.deny:[]).includes(t))return!1;let o=Array.isArray(a?.allow)&&a.allow.every(e=>typeof e==`string`)?a.allow:[];if(o.length>0&&!o.includes(t))return!1;let s=(a&&`entries`in a&&a.entries&&typeof a.entries==`object`?a.entries:null)?.[t];if(!s||typeof s!=`object`||Array.isArray(s))return r;let c=s.enabled;return typeof c==`boolean`?c:r}function T(e={}){return{client:e.client??null,connected:e.connected??!1,hello:e.hello??null,configSnapshot:e.configSnapshot??null,applySessionKey:e.applySessionKey??`main`,selectedAgentId:e.selectedAgentId??null,resourceRequests:{},dreamingStatusLoading:!1,dreamingStatusError:null,dreamingStatus:null,dreamingModeSaving:!1,dreamDiaryLoading:!1,dreamDiaryActionLoading:!1,dreamDiaryActionMessage:null,dreamDiaryActionArchivePath:null,dreamDiaryError:null,dreamDiaryPath:null,dreamDiaryContent:null,wikiImportInsightsLoading:!1,wikiImportInsightsError:null,wikiImportInsights:null,wikiOverviewLoading:!1,wikiOverviewError:null,wikiOverview:null,lastError:null}}function Ue(e){return w(e.configSnapshot,I,{enabledByDefault:!1})}function We(e,t){let n=Se(e,t);return n===null?Ue(e):n}function E(e,t,n,r){return xe({client:e.client,hello:e.hello,phase:e.connected?`connected`:`offline`},t,n,r)}function Ge(e,t){switch(e){case`doctor.memory.dedupeDreamDiary`:{let e=typeof t?.dedupedEntries==`number`?t.dedupedEntries:typeof t?.removedEntries==`number`?t.removedEntries:0,n=typeof t?.keptEntries==`number`?t.keptEntries:void 0;return n===void 0?f(e===1?`dreaming.actions.dedupeRemovedOne`:`dreaming.actions.dedupeRemovedMany`,{removed:String(e)}):f(e===1?`dreaming.actions.dedupeRemovedOneAndKept`:`dreaming.actions.dedupeRemovedManyAndKept`,{removed:String(e),kept:String(n)})}case`doctor.memory.repairDreamingArtifacts`:{let e=[],n=c(t?.archiveDir);return t?.archivedSessionCorpus===!0&&e.push(f(`dreaming.actions.repairArchivedThreadCorpus`)),t?.archivedSessionIngestion===!0&&e.push(f(`dreaming.actions.repairArchivedIngestionState`)),t?.archivedDreamsDiary===!0&&e.push(f(`dreaming.actions.repairArchivedDreamDiary`)),e.length===0?f(`dreaming.actions.repairNoChanges`):n?f(`dreaming.actions.repairCompleteWithArchive`,{actions:e.join(`, `),archiveDir:n}):f(`dreaming.actions.repairComplete`,{actions:e.join(`, `)})}case`doctor.memory.backfillDreamDiary`:return f(`dreaming.actions.backfillComplete`,{count:String(typeof t?.written==`number`?t.written:0)});case`doctor.memory.resetDreamDiary`:return f(`dreaming.actions.resetDiaryComplete`,{count:String(typeof t?.removedEntries==`number`?t.removedEntries:0)});case`doctor.memory.resetGroundedShortTerm`:return f(`dreaming.actions.clearReplayedComplete`,{count:String(typeof t?.removedShortTermEntries==`number`?t.removedShortTermEntries:0)})}return f(`dreaming.actions.complete`)}function D(e){return c(e.selectedAgentId)??null}function O(e){let t=r(r(e?.plugins)?.slots),n=Ve(`memory`,t?.memory),i=n.kind===`off`?He(`memory`):n.pluginId,a=r(e?.plugins),o=r(a?.entries),s=r(o?.[i]),c=r(s?.config),l=r(c?.dreaming),u=typeof l?.enabled==`boolean`;return{pluginId:i,enabled:n.kind!==`off`&&l?.enabled!==!1,overridden:u,engineOff:n.kind===`off`}}async function k(e,t,n=rt[t]){let r=D(e),i=`${t}Loading`,a=`${t}Error`,o=`${t}AgentId`;if(!r)return;let s=e.client;if(!s||!e.connected)return;if(e[o]!==r&&n.clear(e),(t===`wikiImportInsights`||t===`wikiOverview`)&&!We(e,n.method)){delete e.resourceRequests[t],e[i]=!1,e[a]=null,n.clear(e);return}if(e.resourceRequests[t]?.agentId===r&&e[i])return;let c={agentId:r};e.resourceRequests[t]=c,e[i]=!0,e[a]=null;try{let i=await s.request(n.method,{agentId:r});if(e.resourceRequests[t]!==c||D(e)!==r)return;n.apply(e,i),e[o]=r}catch(n){e.resourceRequests[t]===c&&D(e)===r&&(e[a]=d(n))}finally{e.resourceRequests[t]===c&&(delete e.resourceRequests[t],e[i]=!1)}}async function A(e){await k(e,`dreamingStatus`)}async function j(e){await k(e,`dreamDiary`)}async function M(e){await k(e,`wikiImportInsights`)}async function N(e){await k(e,`wikiOverview`)}async function P(e,t,n){let r=e.client,i=D(e);if(!r||!i||!E(e,t,`operator.write`)||e.dreamDiaryActionLoading)return!1;e.dreamDiaryActionLoading=!0,e.dreamingStatusError=null,e.dreamDiaryError=null,e.dreamDiaryActionMessage=null,e.dreamDiaryActionArchivePath=null;try{let a=await r.request(t,{agentId:i});return n?.reloadDiary!==!1&&await j(e),await A(e),e.dreamDiaryActionArchivePath=t===`doctor.memory.repairDreamingArtifacts`?c(a?.archiveDir)??null:null,e.dreamDiaryActionMessage={kind:`success`,text:Ge(t,a)},!0}catch(t){let n=d(t);return e.dreamingStatusError=n,e.lastError=n,e.dreamDiaryActionArchivePath=null,e.dreamDiaryActionMessage={kind:`error`,text:n},!1}finally{e.dreamDiaryActionLoading=!1}}async function Ke(e){return P(e,`doctor.memory.backfillDreamDiary`)}async function qe(e){return P(e,`doctor.memory.resetDreamDiary`)}async function Je(e){return P(e,`doctor.memory.resetGroundedShortTerm`,{reloadDiary:!1})}async function Ye(e){return P(e,`doctor.memory.repairDreamingArtifacts`,{reloadDiary:!1})}async function Xe(e){let t=e.dreamDiaryActionArchivePath;return t?await ae(t)?(e.dreamDiaryActionMessage={kind:`success`,text:f(`dreaming.actions.archivePathCopied`)},!0):(e.dreamDiaryActionMessage={kind:`error`,text:f(`dreaming.actions.archivePathCopyFailed`)},!1):!1}async function Ze(e){return P(e,`doctor.memory.dedupeDreamDiary`)}async function Qe(e,t,n,r){if(e.dreamingModeSaving||!r()||!E(e,`config.patch`,`operator.admin`))return!1;e.dreamingModeSaving=!0,e.dreamingStatusError=null;try{let i=await t.patch({raw:n,note:`Dreaming settings updated from the Dreaming tab.`,canDispatch:r});return i||(e.dreamingStatusError=t.state.lastError??e.lastError??f(`dreaming.actions.updateFailed`)),i}finally{e.dreamingModeSaving=!1}}function $e(e){let t=r(e),n=Array.isArray(t?.children)?t.children:[];for(let e of n){let t=r(e);if(c(t?.key)===`dreaming`)return!0}return!1}function et(e){let t=r(e);return r(t?.schema)?.additionalProperties===!1}async function F(e,t){if(!e.state.client||!e.state.connected)return`unknown`;try{let n=await e.lookupSchemaPath(`plugins.entries.${t}.config`);return $e(n)?`supported`:et(n)?`unsupported`:`supported`}catch{return`unknown`}}async function tt(e,t,n){if(await F(t,n)!==`unsupported`)return!0;let r=f(`dreaming.actions.unsupportedPlugin`,{pluginId:n});return e.dreamingStatusError=r,e.lastError=r,!1}async function nt(e,t,n,i=()=>!0){if(e.dreamingModeSaving||!i())return!1;if(!t.state.configSnapshot?.hash)return e.dreamingStatusError=f(`dreaming.actions.configHashMissing`),!1;let{pluginId:a}=O(r(t.state.configSnapshot?.config)??null);if(!await tt(e,t,a)||!i())return!1;let o=await Qe(e,t,{plugins:{entries:{[a]:{config:{dreaming:{enabled:n}}}}}},i);return o&&e.dreamingStatus&&(e.dreamingStatus={...e.dreamingStatus,enabled:n}),o}var I,rt;function L(){return(L=e((()=>{Be(),h(),C(),ue(),m(),Ce(),S(),I=`memory-wiki`,rt={dreamingStatus:{method:`doctor.memory.status`,clear:e=>{e.dreamingStatus=null},apply:(e,t)=>{e.dreamingStatus=t.dreaming??null}},dreamDiary:{method:`doctor.memory.dreamDiary`,clear:e=>{e.dreamDiaryPath=null,e.dreamDiaryContent=null},apply:(e,t)=>{e.dreamDiaryPath=t.path,e.dreamDiaryContent=t.found?t.content??``:null}},wikiImportInsights:{method:`wiki.importInsights`,clear:e=>{e.wikiImportInsights=null},apply:(e,t)=>{e.wikiImportInsights=t}},wikiOverview:{method:`wiki.overview`,clear:e=>{e.wikiOverview=null},apply:(e,t)=>{e.wikiOverview=t}}}})))()}function it(e){if(!e.open)return _;let t=e.enabling?f(`dreaming.toggleConfirmation.enableTitle`):f(`dreaming.toggleConfirmation.disableTitle`),n=f(`dreaming.toggleConfirmation.subtitle`),r=e.enabling?f(`dreaming.toggleConfirmation.enableDetail`):f(`dreaming.toggleConfirmation.disableDetail`),i=e.enabling?f(`dreaming.toggleConfirmation.enableConfirm`):f(`dreaming.toggleConfirmation.disableConfirm`);return g`
    <openclaw-modal-dialog label=${t} description=${n} @modal-cancel=${()=>{e.loading||e.onCancel()}}>
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div id=${`dreaming-toggle-confirmation-title`} class="exec-approval-title">${t}</div>
            <div id=${`dreaming-toggle-confirmation-description`} class="exec-approval-sub">${n}</div>
          </div>
        </div>
        <div class="callout ${e.enabling?`info`:`warn`}" style="margin-top: 12px;">
          ${r}
        </div>
        ${e.hasError?g`<div class="exec-approval-error">
                ${f(`dreaming.toggleConfirmation.failed`)}
              </div>`:_}
        <div class="exec-approval-actions">
          <button
            class="btn ${e.enabling?`primary`:`danger`}"
            ?disabled=${e.loading}
            @click=${e.onConfirm}
          >
            ${e.loading?f(`dreaming.toggleConfirmation.saving`):i}
          </button>
          <button class="btn" ?disabled=${e.loading} @click=${e.onCancel}>
            ${f(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function at(){return(at=e((()=>{v(),h(),fe(),C(),S()})))()}function ot(e){let t=e,n=Bt.exec(e),r=Vt.exec(e);n&&r&&r.index>n.index&&(t=e.slice(n.index+n[0].length,r.index));let i=[],a=t.split(/\n---\n/).filter(e=>e.trim().length>0);for(let e of a){let t=e.trim().split(`
`),n=``,r=[];for(let e of t){let t=e.trim();if(!n&&t.startsWith(`*`)&&t.endsWith(`*`)&&t.length>2){n=t.slice(1,-1);continue}t.startsWith(`#`)||t.startsWith(`<!--`)||t.length>0&&r.push(t)}r.length>0&&i.push({date:n,body:r.join(`
`)})}return i}function st(e){let t=i(e);if(t===void 0)return e;let n=new Date(t);return`${n.getMonth()+1}/${n.getDate()}`}function ct(){return{dreamIndex:Math.floor(Math.random()*W.length),dreamLastSwap:0,activeSubTab:`scene`,activeDiarySubTab:`dreams`,advancedWaitingSort:`recent`,expandedInsightCards:new Set,expandedWikiCards:new Set,diaryPage:0,wikiPreviewRequestId:0,wikiPreviewOpen:!1,wikiPreviewLoading:!1,wikiPreviewTitle:``,wikiPreviewPath:``,wikiPreviewUpdatedAt:null,wikiPreviewContent:``,wikiPreviewTotalLines:null,wikiPreviewTruncated:!1,wikiPreviewError:null}}function lt(e,t,n){e.diaryPage=Math.max(0,Math.min(t,Math.max(0,n-1)))}function ut(e){let t=Date.now();return t-e.dreamLastSwap>Ht&&(e.dreamLastSwap=t,e.dreamIndex=(e.dreamIndex+1)%W.length),f(W[e.dreamIndex]??W[0])}function dt(e){let t=Le(ze(e)),n=`--lob-shell:${t.palette.shell};--lob-claw:${t.palette.claw}`;return g`
    <div class="dreams__lobster" style=${n}>${Ie(t,{sleeping:!0})}</div>
  `}function ft(e){let t=e.viewState,n=!e.active,r=e.dreamingOf??ut(t);return g`
    <div class="dreams-page">
      <div class="dreams__topbar">
        ${b({id:`dreams`,active:t.activeSubTab,tabs:[{value:`scene`,label:f(`dreaming.tabs.scene`)},{value:`diary`,label:f(`dreaming.tabs.diary`)},{value:`advanced`,label:f(`dreaming.tabs.advanced`)}],ariaLabel:f(`memoryPage.tabs.dreams`),panelId:`dreams-panel`,variant:`sub`,onSelect:n=>{t.activeSubTab=n,e.onViewStateChange()}})}
      </div>

      <div
        id="dreams-panel"
        class="dreams__panel"
        role="tabpanel"
        aria-labelledby=${`dreams-tab-${t.activeSubTab}`}
      >
        ${t.activeSubTab===`scene`?ht(e,n,r):t.activeSubTab===`diary`?zt(e):jt(e)}
      </div>
    </div>
  `}function pt(e){return e.split(`
`).map(e=>e.trim()).filter(e=>e.length>0&&e!==`What Happened`&&e!==`Reflections`&&e!==`Candidates`&&e!==`Possible Lasting Updates`).map(e=>e.replace(/\s*\[memory\/[^\]]+\]/g,``)).map(e=>e.replace(/^(?:\d+\.\s+|-\s+(?:\[[^\]]+\]\s+)?(?:[a-z_]+:\s+)?)/i,``).replace(/^(?:likely_durable|likely_situational|unclear):\s+/i,``).trim()).filter(e=>e.length>0)}function mt(e){return e?new Date(e).toLocaleTimeString([],{hour:`numeric`,minute:`2-digit`}):`—`}function ht(e,t,n){return g`
    <section class="dreams ${t?`dreams--idle`:``}">
      ${Ut.map(e=>g`
          <div
            class="dreams__star"
            style="
              top: ${e.top}%;
              left: ${e.left}%;
              width: ${e.size}px;
              height: ${e.size}px;
              background: ${e.hue===`accent`?`var(--accent-muted)`:`var(--text)`};
              animation-delay: ${e.delay}s;
            "
          ></div>
        `)}

      <div class="dreams__moon"></div>

      ${e.active?g`
              <div class="dreams__bubble">
                <span class="dreams__bubble-text">${n}</span>
              </div>
              <div
                class="dreams__bubble-dot"
                style="top: calc(50% - 160px); left: calc(50% - 120px); width: 12px; height: 12px; animation-delay: 0.2s;"
              ></div>
              <div
                class="dreams__bubble-dot"
                style="top: calc(50% - 120px); left: calc(50% - 90px); width: 8px; height: 8px; animation-delay: 0.4s;"
              ></div>
            `:_}

      <div class="dreams__glow"></div>
      ${dt(e.selectedAgentId)}
      <span class="dreams__z">z</span>
      <span class="dreams__z">z</span>
      <span class="dreams__z">Z</span>

      <div class="dreams__status">
        <span class="dreams__status-label"
          >${e.active?f(`dreaming.status.active`):f(`dreaming.status.idle`)}</span
        >
        <div class="dreams__status-detail">
          <div class="dreams__status-dot"></div>
          <span>
            ${e.promotedCount} ${f(`dreaming.status.promotedSuffix`)}
            ${e.nextCycle?g`· ${f(`dreaming.status.nextSweepPrefix`)} ${e.nextCycle}`:_}
            ${e.timezone?g`· ${e.timezone}`:_}
          </span>
        </div>
      </div>

      <div class="dreams__phases">
        ${Object.keys(G).map(t=>{let n=e.phases?.[t],r=n!==void 0,i=n?.enabled===!0,a=mt(n?.nextRunAtMs),o=f(G[t]),s=r?i?a:f(`dreaming.phase.off`):`—`;return g`
              <div class="dreams__phase ${r&&!i?`dreams__phase--off`:``}">
                <div class="dreams__phase-dot ${i?`dreams__phase-dot--on`:``}"></div>
                <span class="dreams__phase-name">${o}</span>
                <span class="dreams__phase-next">${s}</span>
              </div>
            `})}
      </div>

      ${e.statusError?g`<div class="dreams__controls-error">${e.statusError}</div>`:_}
    </section>
  `}function gt(e,t,n){return t===n?`${e}:${t}`:`${e}:${t}-${n}`}function R(e){let t=i(e);return t===void 0?e:new Date(t).toLocaleString([],{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`})}function _t(e){return e.replace(/\\/g,`/`).split(`/`).findLast(Boolean)??e}function vt(e){return f(`dreaming.wiki.pageTypes.${e}`)}function z(e,t){return f(`dreaming.wiki.counts.${e}${t===1?`One`:`s`}`,{count:String(t)})}function yt(e){let t=Wt.map(([t,n])=>{let r=e[t];return r>0?f(`dreaming.wiki.pageGroupSummary`,{label:f(`dreaming.wiki.pageGroups.${n}`),count:z(`page`,r)}):null}).filter(e=>e!==null);return t.length>0?t.join(`; `):f(`dreaming.wiki.noPagesYet`)}function bt(e){let t=[f(`dreaming.wiki.sectionPageSummary`,{label:e.label,count:z(`page`,e.itemCount)})];if(e.claimCount>0&&t.push(z(`claimRow`,e.claimCount)),e.questionCount>0){let n=e.items.filter(e=>e.questionCount>0).length,r=z(`openQuestion`,e.questionCount);t.push(n>0?f(`dreaming.wiki.questionCountOnPages`,{questionCount:r,pageCount:z(`page`,n)}):r)}return e.contradictionCount>0&&t.push(z(`contradiction`,e.contradictionCount)),t.join(` · `)}function xt(e){return f(e.digestStatus===`withheld`?`dreaming.wiki.risk.needsReview`:`dreaming.wiki.risk.${e.riskLevel}`)}function St(e,t,n){e.has(t)?e.delete(t):e.add(t),n()}async function Ct(e,t){let n=t.viewState,r=++n.wikiPreviewRequestId;n.wikiPreviewOpen=!0,n.wikiPreviewLoading=!0,n.wikiPreviewTitle=_t(e),n.wikiPreviewPath=e,n.wikiPreviewUpdatedAt=null,n.wikiPreviewContent=``,n.wikiPreviewTotalLines=null,n.wikiPreviewTruncated=!1,n.wikiPreviewError=null,t.onViewStateChange();try{let i=await t.onOpenWikiPage(e);if(n.wikiPreviewRequestId!==r||!n.wikiPreviewOpen)return;if(!i){n.wikiPreviewError=f(`dreaming.wiki.pageNotFound`,{lookup:e});return}n.wikiPreviewTitle=i.title,n.wikiPreviewPath=i.path,n.wikiPreviewUpdatedAt=i.updatedAt??null,n.wikiPreviewContent=i.content,n.wikiPreviewTotalLines=typeof i.totalLines==`number`?i.totalLines:null,n.wikiPreviewTruncated=i.truncated===!0}catch(e){n.wikiPreviewRequestId===r&&n.wikiPreviewOpen&&(n.wikiPreviewError=d(e))}finally{n.wikiPreviewRequestId===r&&n.wikiPreviewOpen&&(n.wikiPreviewLoading=!1,t.onViewStateChange())}}function B(e){e.wikiPreviewRequestId+=1,e.wikiPreviewOpen=!1,e.wikiPreviewLoading=!1,e.wikiPreviewTitle=``,e.wikiPreviewPath=``,e.wikiPreviewUpdatedAt=null,e.wikiPreviewContent=``,e.wikiPreviewTotalLines=null,e.wikiPreviewTruncated=!1,e.wikiPreviewError=null}function wt(e){B(e.viewState),e.onViewStateChange()}function Tt(e){let t=e.viewState;return t.wikiPreviewOpen?g`
    <openclaw-modal-dialog
      .label=${t.wikiPreviewTitle||f(`dreaming.wiki.previewFallbackTitle`)}
      style="--openclaw-modal-width: 1120px"
      @modal-cancel=${()=>wt(e)}
    >
      <div class="dreams-diary__preview-panel">
        <div class="dreams-diary__preview-header">
          <div>
            <div class="dreams-diary__preview-title">
              ${t.wikiPreviewTitle||f(`dreaming.wiki.previewFallbackTitle`)}
            </div>
            <div class="dreams-diary__preview-meta">
              ${t.wikiPreviewPath}
              ${t.wikiPreviewUpdatedAt?` · ${R(t.wikiPreviewUpdatedAt)}`:``}
            </div>
          </div>
          <button
            type="button"
            class="btn btn--subtle btn--sm"
            @click=${()=>wt(e)}
          >
            ${f(`dreaming.wiki.close`)}
          </button>
        </div>
        <div class="dreams-diary__preview-body">
          ${t.wikiPreviewLoading?g`<div class="dreams-diary__empty-text">${f(`dreaming.wiki.loadingPage`)}</div>`:t.wikiPreviewError?g`<div class="dreams-diary__error">${t.wikiPreviewError}</div>`:g`
                    ${t.wikiPreviewTruncated?g`
                            <div class="dreams-diary__preview-hint">
                              ${t.wikiPreviewTotalLines===null?f(`dreaming.wiki.previewTruncated`):f(`dreaming.wiki.previewTruncatedWithTotal`,{count:String(t.wikiPreviewTotalLines)})}
                            </div>
                          `:_}
                    <pre class="dreams-diary__preview-pre">${t.wikiPreviewContent}</pre>
                  `}
        </div>
      </div>
    </openclaw-modal-dialog>
  `:_}function Et(e){return i(e)??-1/0}function Dt(e,t){let n=Et(e.lastRecalledAt),r=Et(t.lastRecalledAt);return r===n?t.totalSignalCount===e.totalSignalCount?e.path.localeCompare(t.path):t.totalSignalCount-e.totalSignalCount:r-n}function Ot(e,t){return t.totalSignalCount===e.totalSignalCount?t.phaseHitCount===e.phaseHitCount?Dt(e,t):t.phaseHitCount-e.phaseHitCount:t.totalSignalCount-e.totalSignalCount}function kt(e,t){return t===`signals`?e.toSorted(Ot):e.toSorted(Dt)}function At(e){let t=e.groundedCount>0,n=e.recallCount>0||e.dailyCount>0;return f(t&&n?`dreaming.advanced.originMixed`:t?`dreaming.advanced.originDailyLog`:`dreaming.advanced.originLive`)}function V(e){return g`
    <section class="dreams-advanced__section">
      <div class="dreams-advanced__section-header">
        <div class="dreams-advanced__section-copy">
          <span class="dreams-advanced__section-title">${f(e.titleKey)}</span>
          <p class="dreams-advanced__section-description">${f(e.descriptionKey)}</p>
        </div>
        <div class="dreams-advanced__section-toolbar">
          ${e.controls??_}
          <span class="dreams-advanced__section-count">${e.entries.length}</span>
        </div>
      </div>
      ${e.entries.length===0?g`<div class="dreams-advanced__empty">${f(e.emptyKey)}</div>`:g`
              <div class="dreams-advanced__list">
                ${e.entries.map(t=>g`
                    <article class="dreams-advanced__item" data-entry-key=${t.key}>
                      ${e.badge?(()=>{let n=e.badge?.(t);return n?g`<span class="dreams-advanced__badge">${n}</span>`:_})():_}
                      <div class="dreams-advanced__snippet">${t.snippet}</div>
                      <div class="dreams-advanced__source">
                        ${gt(t.path,t.startLine,t.endLine)}
                      </div>
                      <div class="dreams-advanced__meta">
                        ${e.meta(t).filter(e=>e.length>0).join(` · `)}
                      </div>
                    </article>
                  `)}
              </div>
            `}
    </section>
  `}function jt(e){let t=e.viewState,n=e.shortTermEntries.filter(e=>e.groundedCount>0),r=kt(e.shortTermEntries,t.advancedWaitingSort),i=f(`dreaming.advanced.description`),a=[`${n.length} ${f(`dreaming.advanced.summaryFromDailyLog`)}`,`${e.shortTermCount} ${f(`dreaming.advanced.summaryWaiting`)}`,`${e.promotedCount} ${f(`dreaming.advanced.summaryPromotedToday`)}`].join(` · `);return g`
    <section class="dreams-advanced">
      <div class="dreams-advanced__header">
        <div class="dreams-advanced__intro">
          <span class="dreams-advanced__eyebrow">${f(`dreaming.advanced.eyebrow`)}</span>
          <h2 class="dreams-advanced__title">${f(`dreaming.advanced.title`)}</h2>
          ${i?g`<p class="dreams-advanced__description">${i}</p>`:_}
          <div class="dreams-advanced__summary">${a}</div>
        </div>
        <div class="dreams-advanced__actions">
          ${[{label:f(`dreaming.scene.dedupeDiary`),onClick:e.onDedupeDreamDiary,allowed:e.access.canDedupeDreamDiary},{label:f(`dreaming.scene.repairCache`),onClick:e.onRepairDreamingArtifacts,allowed:e.access.canRepairDreamingArtifacts},{label:f(e.dreamDiaryActionLoading?`dreaming.scene.working`:`dreaming.scene.backfill`),onClick:e.onBackfillDiary,allowed:e.access.canBackfillDiary},{label:f(`dreaming.scene.reset`),onClick:e.onResetDiary,allowed:e.access.canResetDiary},{label:f(`dreaming.scene.clearGrounded`),onClick:e.onResetGroundedShortTerm,allowed:e.access.canResetGroundedShortTerm}].map(({label:t,onClick:n,allowed:r})=>g`
              <button
                class="btn btn--subtle btn--sm"
                ?disabled=${!r||e.modeSaving||e.dreamDiaryActionLoading}
                @click=${()=>n()}
              >
                ${t}
              </button>
            `)}
        </div>
      </div>
      ${e.dreamDiaryActionMessage?g`
              <div
                class="callout ${e.dreamDiaryActionMessage.kind===`success`?`success`:`danger`}"
                role="status"
              >
                <div class="row wrap items-center gap-2">
                  <span>${e.dreamDiaryActionMessage.text}</span>
                  ${e.dreamDiaryActionArchivePath?g`
                          <button
                            class="btn btn--subtle btn--sm"
                            ?disabled=${e.dreamDiaryActionLoading}
                            @click=${()=>e.onCopyDreamingArchivePath()}
                          >
                            ${f(`dreaming.wiki.copyArchivePath`)}
                          </button>
                        `:_}
                </div>
              </div>
            `:_}

      <div class="dreams-advanced__sections">
        ${V({titleKey:`dreaming.advanced.stagedTitle`,descriptionKey:`dreaming.advanced.stagedDescription`,emptyKey:`dreaming.advanced.emptyGrounded`,entries:n,controls:g`
            <button
              class="btn btn--subtle btn--sm"
              ?disabled=${!e.access.canResetGroundedShortTerm||e.modeSaving||e.dreamDiaryActionLoading}
              @click=${()=>e.onResetGroundedShortTerm()}
            >
              ${f(`dreaming.scene.clearGrounded`)}
            </button>
          `,badge:()=>f(`dreaming.advanced.originDailyLog`),meta:e=>[e.groundedCount>0?`${e.groundedCount} ${f(`dreaming.stats.grounded`).toLowerCase()}`:``,e.recallCount>0?`${e.recallCount} recall`:``,e.dailyCount>0?`${e.dailyCount} daily`:``]})}
        ${V({titleKey:`dreaming.advanced.shortTermTitle`,descriptionKey:`dreaming.advanced.shortTermDescription`,emptyKey:`dreaming.advanced.emptyShortTerm`,entries:r,controls:g`
            <div class="dreams-advanced__sort">
              ${[[`recent`,`dreaming.advanced.sortRecent`],[`signals`,`dreaming.advanced.sortSignals`]].map(([n,r])=>g`
                  <button
                    class="dreams-advanced__sort-btn ${t.advancedWaitingSort===n?`dreams-advanced__sort-btn--active`:``}"
                    @click=${()=>{t.advancedWaitingSort=n,e.onViewStateChange()}}
                  >
                    ${f(r)}
                  </button>
                `)}
            </div>
          `,badge:At,meta:e=>[`${e.totalSignalCount} ${f(`dreaming.stats.signals`).toLowerCase()}`,e.recallCount>0?`${e.recallCount} recall`:``,e.dailyCount>0?`${e.dailyCount} daily`:``,e.groundedCount>0?`${e.groundedCount} ${f(`dreaming.stats.grounded`).toLowerCase()}`:``,e.phaseHitCount>0?`${e.phaseHitCount} phase hit`:``]})}
        ${V({titleKey:`dreaming.advanced.promotedTitle`,descriptionKey:`dreaming.advanced.promotedDescription`,emptyKey:`dreaming.advanced.emptyPromoted`,entries:e.promotedEntries,badge:At,meta:e=>[e.promotedAt?`${f(`dreaming.advanced.updatedPrefix`)} ${R(e.promotedAt)}`:``,e.groundedCount>0?`${e.groundedCount} ${f(`dreaming.stats.grounded`).toLowerCase()}`:``,e.totalSignalCount>0?`${e.totalSignalCount} ${f(`dreaming.stats.signals`).toLowerCase()}`:``]})}
      </div>

      ${e.statusError?g`<div class="dreams__controls-error">${e.statusError}</div>`:_}
    </section>
  `}function H(e,t){return t.length>0?g`
        <div class="dreams-diary__insight-list">
          <strong>${f(e)}</strong>
          ${t.map(e=>g`<p class="dreams-diary__insight-line">• ${e}</p>`)}
        </div>
      `:_}function U(e,t){return t?g`
        <p class="dreams-diary__insight-line">
          <strong>${f(e)}</strong>
          ${t}
        </p>
      `:_}function Mt(e,t){if(e.kind===`import`){let n=e.item;return g`
      <p class="dreams-diary__insight-line">${n.summary}</p>
      ${H(`dreaming.wiki.candidateSignals`,n.candidateSignals)}
      ${H(`dreaming.wiki.corrections`,n.correctionSignals)}
      ${t?g`
              <div class="dreams-diary__insight-list">
                <strong>${f(`dreaming.wiki.importDetails`)}</strong>
                ${U(`dreaming.wiki.startedWith`,n.firstUserLine)}
                ${U(`dreaming.wiki.endedOn`,n.lastUserLine===n.firstUserLine?void 0:n.lastUserLine)}
                ${U(`dreaming.wiki.messages`,`${f(`dreaming.wiki.counts.userMessages`,{count:String(n.userMessageCount)})} · ${f(`dreaming.wiki.counts.assistantMessages`,{count:String(n.assistantMessageCount)})}`)}
                ${U(`dreaming.wiki.riskReasons`,n.riskReasons.join(`, `))}
                ${U(`dreaming.wiki.labels`,n.labels.join(`, `))}
              </div>
            `:_}
      ${n.preferenceSignals.length>0?g`
              <div class="dreams-diary__insight-signals">
                ${n.preferenceSignals.map(e=>g`<span class="dreams-diary__insight-signal">${e}</span>`)}
              </div>
            `:_}
    `}let n=e.item;return g`
    ${n.snippet?g`<p class="dreams-diary__insight-line">${n.snippet}</p>`:_}
    ${H(`dreaming.wiki.claims`,n.claims)}
    ${H(`dreaming.wiki.openQuestions`,n.questions)}
    ${H(`dreaming.wiki.contradictions`,n.contradictions)}
    ${t?g`
            <div class="dreams-diary__insight-list">
              <strong>${f(`dreaming.wiki.pageDetails`)}</strong>
              ${U(`dreaming.wiki.wikiPage`,n.pagePath)}
              ${U(`dreaming.wiki.id`,n.id)}
            </div>
          `:_}
  `}function Nt(e,t){let n=e.viewState,r=t.item,i=t.kind===`import`?n.expandedInsightCards:n.expandedWikiCards,a=i.has(r.pagePath),o=t.kind===`import`?t.item.riskLevel:`wiki`,s=t.kind===`import`?xt(t.item):vt(t.item.kind),c=t.kind===`import`?t.item.activeBranchMessages>0?` · ${f(`dreaming.wiki.counts.messages`,{count:String(t.item.activeBranchMessages)})}`:``:` · ${r.pagePath}`;return g`
    <article
      class="dreams-diary__insight-card dreams-diary__insight-card--clickable"
      data-import-page=${t.kind===`import`?r.pagePath:_}
      data-wiki-page=${t.kind===`wiki`?r.pagePath:_}
      @click=${()=>{if(t.kind===`wiki`&&t.item.kind===`report`){Ct(r.pagePath,e);return}St(i,r.pagePath,e.onViewStateChange)}}
    >
      <div class="dreams-diary__insight-topline">
        <div class="dreams-diary__insight-title">${r.title}</div>
        <span class="dreams-diary__insight-badge dreams-diary__insight-badge--${o}">
          ${s}
        </span>
      </div>
      <div class="dreams-diary__insight-meta">
        ${r.updatedAt?R(r.updatedAt):_t(r.pagePath)}${c}
      </div>
      ${Mt(t,a)}
      <div class="dreams-diary__insight-actions">
        <button
          class="btn btn--subtle btn--sm"
          @click=${t=>{t.stopPropagation(),St(i,r.pagePath,e.onViewStateChange)}}
        >
          ${f(a?`dreaming.wiki.hideDetails`:`dreaming.wiki.details`)}
        </button>
        <button
          class="btn btn--subtle btn--sm"
          @click=${t=>{t.stopPropagation(),Ct(r.pagePath,e)}}
        >
          ${f(t.kind===`import`?`dreaming.wiki.openSourcePage`:`dreaming.wiki.openWikiPage`)}
        </button>
      </div>
    </article>
  `}function Pt(e,t,n){let r=e.viewState;return g`
    <div class="dreams-diary__daychips">
      ${t.map((i,a)=>g`
          <button
            class="dreams-diary__day-chip ${a===n?`dreams-diary__day-chip--active`:``}"
            @click=${()=>{lt(r,a,t.length),e.onViewStateChange()}}
          >
            ${i}
          </button>
        `)}
    </div>
  `}function Ft(e,t){let{clusters:r}=t;if(r.length===0)return g`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-text">
          ${f(t.loading?t.loadingKey:t.emptyKey)}
        </div>
        ${t.loading?_:g`<div class="dreams-diary__empty-hint">${f(t.emptyHintKey)}</div>`}
      </div>
    `;let i=e.viewState,a=Math.max(0,Math.min(i.diaryPage,r.length-1)),o=n(r[a],t.kind===`imports`?`selected imported insight cluster`:`selected memory overview cluster`),s=r.reduce((e,t)=>e+t.itemCount,0);return{navigation:Pt(e,r.map(e=>e.label),a),content:g`
      <article class="dreams-diary__entry" key="${t.kind}-${o.key}">
        <div class="dreams-diary__accent"></div>
        <div class="dreams-diary__date">${t.date(o)}</div>
        ${t.truncated?g`<p class="dreams-diary__para dreams-diary__bounded-result">
                ${f(`dreaming.wiki.boundedResults`,{returned:s.toLocaleString(p.getLocale()),total:t.totalItems.toLocaleString(p.getLocale())})}
              </p>`:_}
        <div class="dreams-diary__prose">${t.prose(o)}</div>
        <div class="dreams-diary__insights">${o.items.map(t.renderItem)}</div>
      </article>
    `}}function It(e){return Ft(e,{kind:`imports`,clusters:e.wikiImportInsights?.clusters??[],totalItems:e.wikiImportInsights?.totalItems??0,truncated:e.wikiImportInsights?.truncated??!1,loading:e.wikiImportInsightsLoading,loadingKey:`dreaming.wiki.loadingInsights`,emptyKey:`dreaming.wiki.noInsights`,emptyHintKey:`dreaming.wiki.noInsightsHint`,date:e=>{let t=[f(`dreaming.wiki.counts.chats`,{count:String(e.itemCount)}),...e.highRiskCount>0?[f(`dreaming.wiki.counts.sensitive`,{count:String(e.highRiskCount)})]:[],...e.preferenceSignalCount>0?[f(`dreaming.wiki.counts.signals`,{count:String(e.preferenceSignalCount)})]:[]];return`${e.label} · ${t.join(` · `)}`},prose:e=>{let t=[f(`dreaming.wiki.importedClusterSummary`,{label:e.label.toLowerCase()}),...e.withheldCount>0?[f(e.withheldCount===1?`dreaming.wiki.withheldDigestOne`:`dreaming.wiki.withheldDigests`,{count:String(e.withheldCount)})]:[]];return g`<p class="dreams-diary__para">${t.join(` `)}</p>`},renderItem:t=>Nt(e,{kind:`import`,item:t})})}function Lt(e){let t=e.wikiOverview;return Ft(e,{kind:`wiki`,clusters:t?.clusters??[],totalItems:t?.totalItems??0,truncated:t?.truncated??!1,loading:e.wikiOverviewLoading,loadingKey:`dreaming.wiki.loadingWiki`,emptyKey:`dreaming.wiki.emptyWiki`,emptyHintKey:`dreaming.wiki.emptyWikiHint`,date:()=>{let e=[z(`page`,t?.totalPages??0),...(t?.totalClaims??0)>0?[z(`claimRow`,t.totalClaims)]:[],...(t?.totalQuestions??0)>0?[z(`openQuestion`,t.totalQuestions)]:[],...(t?.totalContradictions??0)>0?[z(`contradiction`,t.totalContradictions)]:[]];return`${f(`dreaming.wiki.vault`)} · ${e.join(` · `)}`},prose:e=>g`
      <p class="dreams-diary__para">
        ${f(`dreaming.wiki.fullVaultBreakdown`,{breakdown:t?yt(t.pageCounts):f(`dreaming.wiki.noPagesYet`)})}
      </p>
      <p class="dreams-diary__para">
        ${f(`dreaming.wiki.selectedSection`,{summary:bt(e)})}
        ${e.updatedAt?` ${f(`dreaming.wiki.latestUpdate`,{date:R(e.updatedAt)})}`:``}
      </p>
    `,renderItem:t=>Nt(e,{kind:`wiki`,item:t})})}function Rt(e){let t=e.viewState;if(typeof e.dreamDiaryContent!=`string`)return g`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-moon">
          <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
            <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="0.5" opacity="0.2" />
            <path d="M20 8a10 10 0 0 1 0 16 10 10 0 1 0 0-16z" fill="currentColor" opacity="0.08" />
          </svg>
        </div>
        <div class="dreams-diary__empty-text">${f(`dreaming.diary.noDreamsYet`)}</div>
        <div class="dreams-diary__empty-hint">${f(`dreaming.diary.noDreamsHint`)}</div>
      </div>
    `;let r=ot(e.dreamDiaryContent);if(r.length===0)return g`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-text">${f(`dreaming.diary.waitingTitle`)}</div>
        <div class="dreams-diary__empty-hint">${f(`dreaming.diary.waitingHint`)}</div>
      </div>
    `;let i=r.toReversed(),a=Math.max(0,Math.min(t.diaryPage,i.length-1)),o=n(i[a],`selected dreaming diary entry`);return{navigation:Pt(e,i.map(e=>st(e.date)),a),content:g`
      <article class="dreams-diary__entry" key="${a}">
        <div class="dreams-diary__accent"></div>
        ${o.date?g`<time class="dreams-diary__date">${o.date}</time>`:_}
        <div class="dreams-diary__prose">
          ${pt(o.body).map((e,t)=>g`<p class="dreams-diary__para" style="animation-delay: ${.3+t*.15}s;">
                ${ve(Oe(e))}
              </p>`)}
        </div>
      </article>
    `}}function zt(e){let t=e.viewState,n=t.activeDiarySubTab,r={dreams:{error:e.dreamDiaryError,loading:e.dreamDiaryLoading,refresh:e.onRefreshDiary,render:Rt,explainer:`dreaming.wiki.dreamsExplainer`},insights:{error:e.wikiImportInsightsError,loading:e.wikiImportInsightsLoading,refresh:e.onRefreshImports,render:It,explainer:`dreaming.wiki.insightsExplainer`},wiki:{error:e.wikiOverviewError,loading:e.wikiOverviewLoading,refresh:e.onRefreshWikiOverview,render:Lt,explainer:`dreaming.wiki.wikiExplainer`}}[n],i=n!==`dreams`&&!e.memoryWikiEnabled;if(r.error&&!i)return g`
      <section class="dreams-diary">
        <div class="dreams-diary__error">${r.error}</div>
      </section>
    `;let a=r.render(e),o=`navigation`in a?a.navigation:_,s=`content`in a?a.content:a;return g`
    <section class="dreams-diary">
      <div class="dreams-diary__chrome">
        <div class="dreams-diary__header">
          <span class="dreams-diary__title">${f(`dreaming.diary.title`)}</span>
          ${b({id:`dream-diary`,active:n,tabs:[{value:`dreams`,label:f(`dreaming.wiki.dreamsTab`)},{value:`insights`,label:f(`dreaming.wiki.insightsTab`)},{value:`wiki`,label:f(`dreaming.wiki.wikiTab`)}],ariaLabel:f(`dreaming.diary.title`),panelId:`dream-diary-panel`,variant:`sub`,onSelect:n=>{B(t),t.activeDiarySubTab=n,t.diaryPage=0,e.onViewStateChange()}})}
          <button
            class="btn btn--subtle btn--sm"
            ?disabled=${i?!e.access.canOpenConfig:e.modeSaving||r.loading}
            @click=${()=>{t.diaryPage=0,i?e.onOpenConfig():r.refresh()}}
          >
            ${i?f(`dreaming.wiki.howToEnable`):n===`dreams`?r.loading?f(`dreaming.diary.reloading`):f(`dreaming.diary.reload`):r.loading?`Reloading…`:`Reload`}
          </button>
        </div>
        <p class="dreams-diary__explainer">${f(r.explainer)}</p>
        ${i?_:o}
      </div>

      <div
        id="dream-diary-panel"
        role="tabpanel"
        aria-labelledby=${`dream-diary-tab-${n}`}
      >
        ${i?g`
                <div class="dreams-diary__empty">
                  <div class="dreams-diary__empty-text">${f(`dreaming.wiki.unavailable`)}</div>
                  <div class="dreams-diary__empty-hint">
                    ${f(`dreaming.wiki.unavailablePluginPrefix`)}
                    <code>memory-wiki</code> ${f(`dreaming.wiki.unavailablePluginSuffix`)}
                  </div>
                  <div class="dreams-diary__empty-hint">
                    ${f(`dreaming.wiki.enablePrefix`)}
                    <code>plugins.entries.memory-wiki.enabled = true</code>${f(`dreaming.wiki.enableSuffix`)}
                  </div>
                  <div class="dreams-diary__empty-actions">
                    <button
                      class="btn btn--subtle btn--sm"
                      ?disabled=${!e.access.canOpenConfig}
                      @click=${()=>e.onOpenConfig()}
                    >
                      ${f(`dreaming.wiki.openConfig`)}
                    </button>
                  </div>
                </div>
              `:s}
      </div>
      ${Tt(e)}
    </section>
  `}var Bt,Vt,W,G,Ht,Ut,Wt;function Gt(){return(Gt=e((()=>{o(),a(),v(),ye(),Ae(),Fe(),Re(),je(),fe(),h(),C(),Pe(),m(),Ne(),S(),Bt=/<!--\s*openclaw:dreaming:diary:start\s*-->/,Vt=/<!--\s*openclaw:dreaming:diary:end\s*-->/,W=[`dreaming.phrases.consolidatingMemories`,`dreaming.phrases.tidyingKnowledgeGraph`,`dreaming.phrases.replayingConversations`,`dreaming.phrases.weavingShortTerm`,`dreaming.phrases.defragmentingMemoryLane`,`dreaming.phrases.filingLooseThoughts`,`dreaming.phrases.connectingDots`,`dreaming.phrases.compostingContext`,`dreaming.phrases.alphabetizingSubconscious`,`dreaming.phrases.promotingHunches`,`dreaming.phrases.forgettingNoise`,`dreaming.phrases.dreamingEmbeddings`,`dreaming.phrases.reorganizingAttic`,`dreaming.phrases.indexingDay`,`dreaming.phrases.nurturingInsights`,`dreaming.phrases.simmeringIdeas`,`dreaming.phrases.whisperingVectorStore`],G={light:`dreaming.phase.light`,deep:`dreaming.phase.deep`,rem:`dreaming.phase.rem`},Ht=6e3,Ut=[{top:8,left:15,size:3,delay:0,hue:`neutral`},{top:12,left:72,size:2,delay:1.4,hue:`neutral`},{top:22,left:35,size:3,delay:.6,hue:`accent`},{top:18,left:88,size:2,delay:2.1,hue:`neutral`},{top:35,left:8,size:2,delay:.9,hue:`neutral`},{top:45,left:92,size:2,delay:1.7,hue:`neutral`},{top:55,left:25,size:3,delay:2.5,hue:`accent`},{top:65,left:78,size:2,delay:.3,hue:`neutral`},{top:75,left:45,size:2,delay:1.1,hue:`neutral`},{top:82,left:60,size:3,delay:1.8,hue:`accent`},{top:30,left:55,size:2,delay:.4,hue:`neutral`},{top:88,left:18,size:2,delay:2.3,hue:`neutral`}],Wt=[[`source`,`sources`],[`synthesis`,`syntheses`],[`report`,`reports`],[`entity`,`entities`],[`concept`,`concepts`]]})))()}function Kt(e){return u(e,{hour:`numeric`,minute:`2-digit`},``)||null}function qt(e){let t=Object.values(e?.phases??{}).filter(e=>e.enabled&&typeof e.nextRunAtMs==`number`).map(e=>e.nextRunAtMs).toSorted((e,t)=>e-t)[0];return t===void 0?null:Kt(t)}function Jt(e,t){let n=e&&typeof e==`object`?e:null,r=typeof n?.title==`string`&&n.title.trim()?n.title.trim():t,i=typeof n?.path==`string`&&n.path.trim()?n.path.trim():t,a=typeof n?.content==`string`&&n.content.length>0?n.content:f(`dreaming.wiki.noContent`),o=typeof n?.updatedAt==`string`&&n.updatedAt.trim()?n.updatedAt.trim():void 0,s=typeof n?.totalLines==`number`&&Number.isFinite(n.totalLines)?Math.max(0,Math.floor(n.totalLines)):void 0;return{title:r,path:i,content:a,...s===void 0?{}:{totalLines:s},...n?.truncated===!0?{truncated:!0}:{},...o?{updatedAt:o}:{}}}var K;function Yt(){return(Yt=e((()=>{t(),v(),_e(),ge(),pe(),Me(),De(),h(),C(),ee(),te(),Te(),oe(),re(),L(),at(),Gt(),S(),K=class extends le{constructor(...e){super(...e),this.agentId=``,this.dreaming=T(),this.toggleConfirmOpen=!1,this.toggleConfirmLoading=!1,this.pendingEnabled=null,this.viewState=ct(),this.gateway=new we(this,{getGateway:()=>this.context?.gateway,onSnapshot:({snapshot:e,initial:t,sourceChanged:n})=>this.applyGatewaySnapshot(e,t?`initial`:n?`replacement`:void 0)}),this.selectedAgentId=null,this.subscriptions=new ce(this).effect(()=>this.context?.runtimeConfig,e=>(this.syncConfigSnapshot(),e.subscribe(()=>{this.syncConfigSnapshot(),this.requestUpdate()})))}updated(e){e.has(`agentId`)&&this.applyAgentId()}disconnectedCallback(){this.subscriptions.clear(),this.resetTransientState(),this.dreaming=T(),super.disconnectedCallback()}captureTaskScope(){let e=this.gateway.gateway;return e?{gateway:e,epoch:this.gateway.epoch,state:this.dreaming}:null}isTaskScopeCurrent(e){return this.isConnected&&this.gateway.gateway===e.gateway&&this.gateway.epoch===e.epoch&&this.context.gateway===e.gateway&&this.dreaming===e.state}resetTransientState(){B(this.viewState),this.toggleConfirmOpen=!1,this.toggleConfirmLoading=!1,this.pendingEnabled=null}createGatewayState(e=this.context.gateway.snapshot){return T({client:e.client,connected:e.phase===`connected`,hello:e.hello,configSnapshot:this.context.runtimeConfig.state.configSnapshot,applySessionKey:e.sessionKey,selectedAgentId:this.selectedAgentId})}applyGatewaySnapshot(e,t){let n=this.dreaming.client!==e.client,r=this.dreaming.connected!==(e.phase===`connected`),i=e.phase===`connected`&&!this.dreaming.connected,a=t===`replacement`||n||r;a?(this.dreaming=this.createGatewayState(e),t!==`initial`&&this.resetTransientState()):(this.dreaming.connected=e.phase===`connected`,this.dreaming.hello=e.hello,this.dreaming.applySessionKey=e.sessionKey),e.phase===`connected`&&this.selectedAgentId&&(a||i)&&this.loadAll(),this.requestUpdate()}applyAgentId(){let e=this.agentId.trim()||null;this.selectedAgentId!==e&&(this.selectedAgentId=e,this.gateway.invalidate(),this.resetTransientState(),this.dreaming=this.createGatewayState(),e&&this.dreaming.connected&&this.loadAll())}syncConfigSnapshot(){this.dreaming.configSnapshot=this.context.runtimeConfig.state.configSnapshot}async runDreamingTask(e,t=this.captureTaskScope()){if(!t||!this.isTaskScopeCurrent(t))return;let n=e(t.state);this.requestUpdate();try{let e=await n;return this.isTaskScopeCurrent(t)?e:void 0}finally{this.isTaskScopeCurrent(t)&&this.requestUpdate()}}async confirmDreamingTask(e,t){let n=this.captureTaskScope();n&&await Ee(t)&&this.isTaskScopeCurrent(n)&&await this.runDreamingTask(e,n)}async loadAll(e=!1){let t=this.captureTaskScope();if(!t||!t.state.client||!t.state.connected||!t.state.selectedAgentId)return;let n=this.context.runtimeConfig;e?await n.refresh():await n.ensureLoaded(),this.isTaskScopeCurrent(t)&&this.context.runtimeConfig===n&&(this.syncConfigSnapshot(),await Promise.all([this.runDreamingTask(A,t),this.runDreamingTask(j,t),this.runDreamingTask(M,t),this.runDreamingTask(N,t)]))}setEnabled(e,t){!E(this.dreaming,`config.patch`,`operator.admin`)||this.dreaming.dreamingModeSaving||this.toggleConfirmLoading||this.toggleConfirmOpen||t===e||(this.pendingEnabled=e,this.toggleConfirmOpen=!0,this.dreaming.dreamingStatusError=null)}cancelToggle(){this.toggleConfirmLoading||(this.toggleConfirmOpen=!1,this.pendingEnabled=null,this.dreaming.dreamingStatusError=null)}async confirmToggle(){let e=this.pendingEnabled;if(e==null||this.toggleConfirmLoading||!E(this.dreaming,`config.patch`,`operator.admin`))return;this.toggleConfirmLoading=!0,this.dreaming.dreamingStatusError=null;let t=this.captureTaskScope(),n=this.context.runtimeConfig;if(!t){this.toggleConfirmLoading=!1;return}try{let r=()=>this.isTaskScopeCurrent(t)&&this.context.runtimeConfig===n&&E(t.state,`config.patch`,`operator.admin`),i=await this.runDreamingTask(t=>nt(t,n,e,r),t);if(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)return;if(!i){this.dreaming.dreamingStatusError??=f(`dreaming.toggleConfirmation.failed`);return}if(await n.refresh(),!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n||(this.syncConfigSnapshot(),await this.runDreamingTask(A,t),!this.isTaskScopeCurrent(t)))return;this.toggleConfirmOpen=!1,this.pendingEnabled=null}finally{this.isTaskScopeCurrent(t)&&(this.toggleConfirmLoading=!1)}}async openWikiPage(e){let t=this.captureTaskScope(),n=t?.state.client,r=t?.state.selectedAgentId;if(!t||!n||!t.state.connected||!r)return null;let i=await n.request(`wiki.get`,{lookup:e,fromLine:1,lineCount:5e3,agentId:r});return!this.isTaskScopeCurrent(t)||t.state.selectedAgentId!==r?null:Jt(i,e)}async refreshWikiData(e){let t=this.captureTaskScope();if(!t?.state.selectedAgentId)return;let n=this.context.runtimeConfig;await n.refresh(),this.isTaskScopeCurrent(t)&&this.context.runtimeConfig===n&&(this.syncConfigSnapshot(),await this.runDreamingTask(e,t))}render(){let e=this.dreaming,t=this.context.runtimeConfig.state,n=O(se(t)),r=n.engineOff?null:e.dreamingStatus,i=r?.enabled??n.enabled,a=e.dreamingStatusLoading||e.dreamingModeSaving,o=E(e,`config.patch`,`operator.admin`),s=e.dreamingStatusLoading||e.dreamDiaryLoading,c=e.selectedAgentId??``;return g`
      <section
        class="content-header content-header--page agent-memory-panel__header"
        ${me({toolbarHeader:!0})}
      >
        <div class="page-meta">
          <div class="dreaming-header-controls">
            <button
              class="btn btn--subtle btn--sm"
              ?disabled=${a||e.dreamDiaryLoading}
              @click=${()=>void this.loadAll(!0)}
            >
              ${f(s?`dreaming.header.refreshing`:`dreaming.header.refresh`)}
            </button>
            <span class="muted">
              ${n.engineOff?f(`dreaming.header.engineOff`):ke(f(`common.enabled`),n.overridden)}
            </span>
            <button
              class="dreams__phase-toggle ${i?`dreams__phase-toggle--on`:``}"
              ?disabled=${!o||a||n.engineOff}
              @click=${()=>this.setEnabled(!i,i)}
            >
              <span class="dreams__phase-toggle-dot"></span>
              <span class="dreams__phase-toggle-label">
                ${f(i?`dreaming.header.on`:`dreaming.header.off`)}
              </span>
            </button>
          </div>
        </div>
      </section>
      ${ft({access:{canOpenConfig:E(e,`config.openFile`,`operator.admin`,{requireAdvertisement:!1}),canBackfillDiary:E(e,`doctor.memory.backfillDreamDiary`,`operator.write`),canDedupeDreamDiary:E(e,`doctor.memory.dedupeDreamDiary`,`operator.write`),canResetDiary:E(e,`doctor.memory.resetDreamDiary`,`operator.write`),canResetGroundedShortTerm:E(e,`doctor.memory.resetGroundedShortTerm`,`operator.write`),canRepairDreamingArtifacts:E(e,`doctor.memory.repairDreamingArtifacts`,`operator.write`)},viewState:this.viewState,active:i,selectedAgentId:c,shortTermCount:r?.shortTermCount??0,promotedCount:r?.promotedToday??0,phases:r?.phases??void 0,shortTermEntries:r?.shortTermEntries??[],promotedEntries:r?.promotedEntries??[],dreamingOf:null,nextCycle:qt(r),timezone:r?.timezone??null,statusError:e.dreamingStatusError,modeSaving:e.dreamingModeSaving,dreamDiaryLoading:e.dreamDiaryLoading,dreamDiaryActionLoading:e.dreamDiaryActionLoading,dreamDiaryActionMessage:e.dreamDiaryActionMessage,dreamDiaryActionArchivePath:e.dreamDiaryActionArchivePath,dreamDiaryError:e.dreamDiaryError,dreamDiaryContent:e.dreamDiaryContent,memoryWikiEnabled:w(t.configSnapshot,`memory-wiki`,{enabledByDefault:!1}),wikiImportInsightsLoading:e.wikiImportInsightsLoading,wikiImportInsightsError:e.wikiImportInsightsError,wikiImportInsights:e.wikiImportInsights,wikiOverviewLoading:e.wikiOverviewLoading,wikiOverviewError:e.wikiOverviewError,wikiOverview:e.wikiOverview,onRefreshDiary:()=>void this.runDreamingTask(j),onRefreshImports:()=>void this.refreshWikiData(M),onRefreshWikiOverview:()=>void this.refreshWikiData(N),onOpenConfig:()=>void this.context.runtimeConfig.openFile(),onOpenWikiPage:e=>this.openWikiPage(e),onBackfillDiary:()=>void this.runDreamingTask(Ke),onCopyDreamingArchivePath:()=>void this.runDreamingTask(Xe),onDedupeDreamDiary:()=>void this.confirmDreamingTask(Ze,{title:f(`dreaming.scene.dedupeDiary`),message:f(`dreaming.actions.confirmDedupeDescription`),confirmLabel:f(`dreaming.scene.dedupeDiary`),danger:!0}),onResetDiary:()=>void this.runDreamingTask(qe),onResetGroundedShortTerm:()=>void this.runDreamingTask(Je),onRepairDreamingArtifacts:()=>void this.confirmDreamingTask(Ye,{title:f(`dreaming.scene.repairCache`),message:f(`dreaming.actions.confirmRepairDescription`),confirmLabel:f(`dreaming.scene.repairCache`)}),onViewStateChange:()=>this.requestUpdate()})}
      ${it({open:this.toggleConfirmOpen,enabling:this.pendingEnabled===!0,loading:this.toggleConfirmLoading,onConfirm:()=>void this.confirmToggle(),onCancel:()=>this.cancelToggle(),hasError:!!e.dreamingStatusError})}
    `}},s([l({context:he,subscribe:!0})],K.prototype,`context`,void 0),s([be({attribute:!1})],K.prototype,`agentId`,void 0),s([y()],K.prototype,`dreaming`,void 0),s([y()],K.prototype,`toggleConfirmOpen`,void 0),s([y()],K.prototype,`toggleConfirmLoading`,void 0),s([y()],K.prototype,`pendingEnabled`,void 0),customElements.get(`openclaw-agent-memory-panel`)||customElements.define(`openclaw-agent-memory-panel`,K)})))()}var Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,q,sn,cn,ln;function un(){return(un=e((()=>{Xt=`Run shell now.`,Zt=`Inspect/control exec sessions.`,Qt=`Schedule reminders, automations, wake events.`,$t=`List visible sessions; filters/previews.`,en=`Read sanitized session history.`,tn=`Search past session transcripts.`,nn=`Run same-Gateway session/agent.`,rn=`Spawn hidden subagent (ephemeral) or visible work session (durable).`,an=`Wait for collector subagents.`,on=`Show session status/model/usage.`,q=`Ask the user and wait for an answer.`,sn=`Suggest follow-up work for operator approval.`,cn=`Withdraw a pending task suggestion.`,ln=`Author reusable skills under the available tool's publication and review policy. Read one complete artifact when it fits the model budget.`})))()}var dn;function J(){return(J=e((()=>{dn=`automations`})))()}function Y(e){return X.filter(t=>t.profiles.includes(e)).map(e=>e.id)}function fn(){let e=new Map;for(let t of X){if(t.includeInSectionGroup===!1)continue;let n=`group:${t.sectionId}`,r=e.get(n)??[];r.push(t.id),e.set(n,r)}return{"group:openclaw":X.filter(e=>e.includeInOpenClawGroup).map(e=>e.id),...Object.fromEntries(e.entries())}}function pn(e){if(!e)return;let t=_n[e];if(t?.allow||t?.deny)return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function mn(e){let t=e?.swarmEnabled===!0;return gn.map(n=>({id:n.id,label:n.label,tools:n.tools.filter(n=>(n.id!==`agents_wait`||t)&&(n.id!==`personal_instructions`||e?.personalInstructionsEnabled===!0)).map(e=>({id:e.id,label:e.id,description:e.description}))})).filter(e=>e.tools.length>0)}var hn,X,gn,_n,vn;function Z(){return(Z=e((()=>{un(),J(),hn=[{id:`fs`,label:`Files`},{id:`runtime`,label:`Runtime`},{id:`web`,label:`Web`},{id:`memory`,label:`Memory`},{id:`sessions`,label:`Sessions`},{id:`ui`,label:`UI`},{id:`messaging`,label:`Messaging`},{id:`automation`,label:`Automation`},{id:`nodes`,label:`Nodes`},{id:`agents`,label:`Agents`},{id:`media`,label:`Media`}],X=[{id:`decision_evaluate`,description:`Evaluate explicit evidence with the agent's decision model`,sectionId:`agents`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`ls`,description:`List directory entries`,sectionId:`fs`,profiles:[`coding`]},{id:`read`,description:`Read file contents`,sectionId:`fs`,profiles:[`coding`]},{id:`write`,description:`Create or overwrite files`,sectionId:`fs`,profiles:[`coding`]},{id:`edit`,description:`Make precise edits`,sectionId:`fs`,profiles:[`coding`]},{id:`apply_patch`,description:`Patch files`,sectionId:`fs`,profiles:[`coding`]},{id:`exec`,description:Xt,sectionId:`runtime`,profiles:[`coding`]},{id:`process`,description:Zt,sectionId:`runtime`,profiles:[`coding`]},{id:`code_execution`,description:`Run sandboxed remote analysis`,sectionId:`runtime`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`secrets`,description:`Request and manage write-only credentials`,sectionId:`runtime`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`web_search`,description:`Search the web`,sectionId:`web`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`web_fetch`,description:`Fetch web content`,sectionId:`web`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`x_search`,description:`Search X posts`,sectionId:`web`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`memory_search`,description:`Semantic search`,sectionId:`memory`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`memory_get`,description:`Read memory files`,sectionId:`memory`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`personal_instructions`,description:`Edit the requesting user’s personal instructions`,sectionId:`memory`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`presence`,description:`Online people, connected devices, recent activity, and connection location`,sectionId:`sessions`,profiles:[`minimal`,`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions`,description:`Session settings: label, pin, archive, groups`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_list`,description:$t,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_history`,description:en,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_search`,description:tn,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`conversations_list`,description:`List exact external conversation addresses`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`conversations_send`,description:`Send to an exact external conversation`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`conversations_turn`,description:`Send and wait for a correlated external reply`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_send`,description:nn,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_spawn`,description:rn,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`github_identity_status`,description:`Inspect the effective GitHub identity and credential health`,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`github_publish`,description:`Publish the reconciled session worktree as a draft GitHub pull request`,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`agents_wait`,description:an,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`sessions_yield`,description:`End turn to receive sub-agent results`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`subagents`,description:`Background work: subagents, media gen, automation runs. list/cancel.`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`session_status`,description:on,sectionId:`sessions`,profiles:[`minimal`,`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`suggest_task`,description:sn,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`dismiss_task`,description:cn,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`browser`,description:`Control web browser`,sectionId:`ui`,profiles:[],includeInOpenClawGroup:!0},{id:`screen`,description:`Drive operator web UI`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`theme`,description:`List, select, and create appearance themes`,sectionId:`ui`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`dashboard`,description:`Read and arrange the session dashboard`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`terminal`,description:`Use shared operator terminals with policy-governed input`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`portal`,description:`Expose local web apps through the gateway`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`canvas`,description:`Control node Canvas surfaces when the Canvas plugin is enabled`,sectionId:`ui`,profiles:[]},{id:`show_widget`,description:`Show an interactive widget on chat or an auto-fitting dashboard`,sectionId:`ui`,profiles:[],includeInOpenClawGroup:!0},{id:`message`,description:`Send messages`,sectionId:`messaging`,profiles:[`messaging`],includeInOpenClawGroup:!0},{id:`heartbeat_respond`,description:`Accept heartbeat outcomes for post-turn handling`,sectionId:`automation`,profiles:[],includeInOpenClawGroup:!0},{id:dn,description:Qt,sectionId:`automation`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`gateway`,description:`Update OpenClaw; read Gateway config/schema when permitted`,sectionId:`automation`,profiles:[`minimal`,`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`plugins`,description:`Manage and reload plugins`,sectionId:`automation`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`openclaw`,description:`Delegate OpenClaw setup and repair`,sectionId:`automation`,profiles:[],includeInOpenClawGroup:!0},{id:`nodes`,description:`Nodes + devices`,sectionId:`nodes`,profiles:[],includeInOpenClawGroup:!0},{id:`computer`,description:`Control the Gateway desktop or a paired computer`,sectionId:`nodes`,profiles:[],includeInOpenClawGroup:!0},{id:`mobile_ui`,description:`Observe and control a paired Android app`,sectionId:`nodes`,profiles:[],includeInOpenClawGroup:!0},{id:`agents_list`,description:`List agents`,sectionId:`agents`,profiles:[],includeInOpenClawGroup:!0},{id:`get_goal`,description:`Get current thread goal`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`create_goal`,description:`Create a thread goal`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`update_goal`,description:`Complete or block a thread goal`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`progress_card`,description:`Maintain the session progress card`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`ask_user`,description:q,sectionId:`agents`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`skill_workshop`,description:ln,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`view_image`,description:`Image understanding`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`image_generate`,description:`Image generation`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`music_generate`,description:`Music generation`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`video_generate`,description:`Video generation`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`transcripts`,description:`Inspect and manage meeting transcript captures`,sectionId:`media`,profiles:[],includeInSectionGroup:!1},{id:`tts`,description:`Text-to-speech conversion`,sectionId:`media`,profiles:[],includeInOpenClawGroup:!0},{id:`pdf`,description:`PDF reading and extraction`,sectionId:`media`,profiles:[],includeInOpenClawGroup:!0}],new Map(X.map(e=>[e.id,e])),gn=hn.map(({id:e,label:t})=>({id:e,label:t,tools:X.filter(t=>t.sectionId===e)})),_n={minimal:{allow:Y(`minimal`)},coding:{allow:[...Y(`coding`),`bundle-mcp`]},messaging:{allow:[...Y(`messaging`),`bundle-mcp`]},full:{allow:[`*`]}},vn=fn()})))()}function yn(e){return e===`automations`?`cron`:e===`view_image`?`image`:e.replace(/_([a-z])/gu,(e,t)=>t.toUpperCase())}function bn(e){return e?.groups?.length?e.groups.map(e=>{let t=$.get(e.id);return{id:e.id,label:t?f(`agents.toolCatalog.groups.${t}`):e.label,source:e.source,pluginId:e.pluginId,tools:e.tools.map(e=>({id:e.id,label:e.label,description:e.description,source:e.source,pluginId:e.pluginId,optional:e.optional,defaultProfiles:[...e.defaultProfiles]}))}}):mn().map(e=>({id:e.id,label:f(`agents.toolCatalog.groups.${$.get(e.id)}`),tools:e.tools.map(e=>({...e,description:ie(`agents.toolCatalog.descriptions.${yn(e.id)}`)??e.description}))}))}function xn(e){return e?.profiles?.length?e.profiles.map(e=>{let t=Sn.get(e.id);return t?{id:e.id,label:f(t)}:e}):Q.map(e=>({id:e.id,label:f(e.labelKey)}))}var Q,$,Sn;function Cn(){return(Cn=e((()=>{Z(),J(),h(),Q=[{id:`minimal`,labelKey:`agents.toolCatalog.profiles.minimal`},{id:`coding`,labelKey:`agents.toolCatalog.profiles.coding`},{id:`messaging`,labelKey:`agents.toolCatalog.profiles.messaging`},{id:`full`,labelKey:`agents.toolCatalog.profiles.full`}],$=new Map(mn().map(e=>[e.id,e.id===`fs`?`files`:e.id])),Sn=new Map(Q.map(e=>[e.id,e.labelKey]))})))()}export{vn as a,Yt as c,F as d,bn as i,L as l,Cn as n,Z as o,xn as r,pn as s,Q as t,O as u};