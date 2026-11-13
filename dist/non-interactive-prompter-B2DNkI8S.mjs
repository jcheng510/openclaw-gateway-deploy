//#region src/commands/non-interactive-prompter.ts
/** Builds a WizardPrompter for commands that must fail instead of prompting. */
function createNonInteractiveLoggingPrompter(runtime, formatPromptError) {
	const unavailable = async (params) => {
		throw new Error(formatPromptError(params.message));
	};
	return {
		async intro(title) {
			runtime.log(title);
		},
		async outro(message) {
			runtime.log(message);
		},
		async note(message, title) {
			runtime.log(title ? `${title}\n${message}` : message);
		},
		select: unavailable,
		multiselect: unavailable,
		text: unavailable,
		confirm: unavailable,
		progress(label) {
			runtime.log(label);
			return {
				update(message) {
					runtime.log(message);
				},
				stop(message) {
					if (message) runtime.log(message);
				}
			};
		}
	};
}
//#endregion
export { createNonInteractiveLoggingPrompter as t };
