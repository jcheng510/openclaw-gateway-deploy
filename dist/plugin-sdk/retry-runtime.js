import { a as resolveRetryConfig } from "../src-DqaLEvc_.mjs";
import { t as parseRetryAfterHeaderSeconds } from "../retry-after-BhJMpI_1.mjs";
import { t as retryAsync } from "../retry-D6s4wlQo.mjs";
import { n as isTransientNetworkError } from "../retryable-network-errors-D2gJmBqw.mjs";
import { n as createChannelApiRetryRunner, r as createRateLimitRetryRunner, t as CHANNEL_API_RETRY_DEFAULTS } from "../retry-policy-SK1rhLUK.mjs";
import { t as classifyTransientNetworkErrorCode } from "../retry-runtime-DAe-p8d6.mjs";
export { CHANNEL_API_RETRY_DEFAULTS as TELEGRAM_RETRY_DEFAULTS, classifyTransientNetworkErrorCode, createChannelApiRetryRunner, createChannelApiRetryRunner as createTelegramRetryRunner, createRateLimitRetryRunner, isTransientNetworkError, parseRetryAfterHeaderSeconds, resolveRetryConfig, retryAsync };
