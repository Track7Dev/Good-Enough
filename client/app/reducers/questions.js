import { ANSWER_QUESTION, SUBMIT_SURVEY } from '../constants/ActionTypes'

const initialState = {
	answers: []
}

export default function questions(state = initialState, action) {
  switch (action.type) {
  	case ANSWER_QUESTION:
  		// Need to fix: Currently mutating state (BAD)
  		state.answers[action.id] = action.answer;
  		return state
    case SUBMIT_SURVEY:
      fetch('https://api.github.com/users/hankcouture')
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            console.log('original: ', res)
            res.json().then(data => console.log('jsoned: ', data));
          } else {
            const error = new Error(res.statusText);
            error.res = res;
            throw error;
          }
        })
        .catch(error => { console.log('request failed', error); });
      
      const newObj = {};
      var type = "";
      newObj.IE = 30 - state.answers[3] - state.answers[7] - state.answers[11] + state.answers[15] - state.answers[19] + state.answers[23] + state.answers[27] - state.answers[31];
      newObj.SN = 12 + state.answers[4] + state.answers[8] + state.answers[12] + state.answers[16] + state.answers[20] - state.answers[24] - state.answers[28] + state.answers[32];
      newObj.FT = 30 - state.answers[2] + state.answers[6] + state.answers[10] - state.answers[14] - state.answers[18] + state.answers[22] - state.answers[26] - state.answers[30];
      newObj.JP = 18 + state.answers[1] + state.answers[5] - state.answers[9] + state.answers[13] - state.answers[17] + state.answers[21] - state.answers[25] + state.answers[29];
      type += newObj.IE<24 ? "I" : "E";
      type += newObj.SN<24 ? "S" : "N";
      type += newObj.FT<24 ? "F" : "T";
      type += newObj.JP<24 ? "J" : "P";
      console.log('type: ', type)
      console.log('submitting survey')
      return state
    default:
    	return state
  }
}
