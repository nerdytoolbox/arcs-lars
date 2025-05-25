import { ARCS_STATE, EMPTY_GAME_STATE } from "./constants.js";

export const loadState = () => {
	const emptyState = JSON.parse(JSON.stringify(EMPTY_GAME_STATE))
	if (localStorage.getItem(ARCS_STATE)) {
		const localStorageState = JSON.parse(localStorage.getItem(ARCS_STATE))
		return deepMerge(emptyState, localStorageState)
	} else {
		return emptyState
	}
}

function deepMerge(defaults, source) {
	const result = { ...defaults };
	for (const key in source) {
		if (
			source[key] &&
			typeof source[key] === 'object' &&
			!Array.isArray(source[key])
		) {
			result[key] = deepMerge(defaults[key] || {}, source[key]);
		} else {
			result[key] = source[key];
		}
	}
	return result;
}