import { l as ChannelConfigSchema } from "./zod-schema.implicit-mentions-CP3tNlpK.js";
import { a as ChannelAgentPromptAdapter, b as ChannelMessagingAdapter, h as ChannelMessageActionAdapter, j as ChannelThreadingAdapter, k as ChannelStreamingAdapter, m as ChannelMentionAdapter, o as ChannelAgentTool, s as ChannelAgentToolFactory } from "./types.core-CuY7f6gy.js";
import { n as ChannelMessageAdapterShape } from "./types-w3LVMdJc.js";
import { A as ChannelPairingAdapter, D as ChannelSecurityAdapter, E as ChannelSecretsAdapter, O as ChannelStatusAdapter, S as ChannelLifecycleAdapter, T as ChannelResolverAdapter, _ as ChannelElevatedAdapter, a as ChannelCommandAdapter, b as ChannelGroupAdapter, d as ChannelDirectoryAdapter, f as ChannelDoctorAdapter, i as ChannelAuthAdapter, k as ChannelConversationBindingSupport, r as ChannelApprovalCapability, s as ChannelConfigAdapter, t as ChannelAllowlistAdapter, u as ChannelConfiguredBindingProvider, v as ChannelGatewayAdapter, x as ChannelHeartbeatAdapter } from "./types.adapters-BO35QcPm.js";
import { n as ChannelOutboundAdapter } from "./outbound.types-DjHzlueC.js";
import { n as ChannelSetupPlugin } from "./setup-wizard-types-BsfwWNbZ.js";
//#region src/gateway/operator-scopes.d.ts
declare const KNOWN_OPERATOR_SCOPE_VALUES: readonly ["operator.admin", "operator.read", "operator.write", "operator.sessions.read", "operator.sessions.write", "operator.approvals", "operator.questions", "operator.pairing", "operator.talk", "operator.talk.secrets"];
/** Operator privileges advertised by gateway auth and checked by method policy. */
type OperatorScope = (typeof KNOWN_OPERATOR_SCOPE_VALUES)[number];
//#endregion
//#region src/channels/plugins/types.plugin.d.ts
type ChannelGatewayMethodDescriptor = {
  name: string;
  scope?: OperatorScope;
  description?: string;
};
/** Full capability contract for a native channel plugin. */
type ChannelPlugin<ResolvedAccount = any, Probe = unknown, Audit = unknown> = Omit<ChannelSetupPlugin, "config"> & {
  defaults?: {
    queue?: {
      debounceMs?: number;
    };
  };
  reload?: {
    configPrefixes: string[];
    /** Published dynamic reads; `*` matches one nonempty dotted config key. */
    noopPrefixes?: string[];
    /**
     * Opt into restarting only the changed non-default named account.
     * Set only when sibling account resolution and lifecycle state are isolated and
     * account stop fully settles owned work. Shared, default, removed, or unresolved
     * account changes still restart the whole channel.
     */
    accountScopedRestart?: boolean;
  };
  config: ChannelConfigAdapter<ResolvedAccount>;
  configSchema?: ChannelConfigSchema;
  pairing?: ChannelPairingAdapter;
  security?: ChannelSecurityAdapter<ResolvedAccount>;
  groups?: ChannelGroupAdapter;
  mentions?: ChannelMentionAdapter;
  outbound?: ChannelOutboundAdapter;
  status?: ChannelStatusAdapter<ResolvedAccount, Probe, Audit>;
  gatewayMethods?: string[];
  gatewayMethodDescriptors?: ChannelGatewayMethodDescriptor[];
  gateway?: ChannelGatewayAdapter<ResolvedAccount>;
  auth?: ChannelAuthAdapter;
  approvalCapability?: ChannelApprovalCapability;
  elevated?: ChannelElevatedAdapter;
  commands?: ChannelCommandAdapter;
  lifecycle?: ChannelLifecycleAdapter;
  secrets?: ChannelSecretsAdapter;
  allowlist?: ChannelAllowlistAdapter;
  doctor?: ChannelDoctorAdapter;
  bindings?: ChannelConfiguredBindingProvider;
  conversationBindings?: ChannelConversationBindingSupport;
  streaming?: ChannelStreamingAdapter;
  threading?: ChannelThreadingAdapter;
  message?: ChannelMessageAdapterShape;
  messaging?: ChannelMessagingAdapter;
  agentPrompt?: ChannelAgentPromptAdapter;
  directory?: ChannelDirectoryAdapter;
  resolver?: ChannelResolverAdapter;
  actions?: ChannelMessageActionAdapter;
  heartbeat?: ChannelHeartbeatAdapter;
  agentTools?: ChannelAgentToolFactory | ChannelAgentTool[];
};
//#endregion
export { OperatorScope as n, ChannelPlugin as t };