import { LOG_IN, SAVE_LOGIN_INPUT, LOG_IN_FAILED, LOG_IN_RESTART } from '../constants/Login_ActionTypes'
import { addAuthToken } from '../helpers'

const initialState = {
  loggedStatus: true,
  userData: {
    email: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined,
    gender: undefined,
  	answers: []
  }
}

export default function LogIn(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOGIN_INPUT:
      var newState = Object.assign({}, state)
      newState.userData[action.input] = action.value
      return newState

    case LOG_IN:
      var newState = Object.assign({}, state)
      addAuthToken(JSON.stringify(action.tokenData))
      newState.loggedStatus = true;
      return newState

    case LOG_IN_FAILED:
      var newState = Object.assign({}, state)
      newState.loggedStatus = false;
      return newState

    case LOG_IN_RESTART:
      var newState = Object.assign({}, state)
      newState.loggedStatus = true;
      return newState

    default:
    	return state

  }
}
