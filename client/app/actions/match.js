import * as types from '../constants/Match_ActionTypes'

export function saveMatchData(match_id, data, profile_matches) {
  return { type: types.SAVE_MATCH_DATA, match_id, data, profile_matches }
}

export function sendMessage(convo) {
  return { type: types.SEND_MESSAGE, convo }
}

export function saveInput(value) {
	return { type: types.SAVE_INPUT, value };
}

export function logout() {
	return { type: types.LOGOUT }
}

export function clearCurrentMatchData() {
	return { type: types.CLEAR_CURRENT_MATCH_DATA }
}