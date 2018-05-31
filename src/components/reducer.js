function appReducer(state, action) {
	if(state === undefined) {
		return {
			questionIndex: 0,
			selections: []
		}
	}

	switch(action.type) {
		case "addAnswer" :
			let copySelections = state.selections.slice();
			copySelections[action.answer.questionIndex] = action.answer.answerIndex;
			return {
				...state,
				selections: copySelections
			}
		case "nextPage" :
			return {
				...state,
				questionIndex: state.questionIndex + 1
			}
		case "previousPage": 
			return {
				...state,
				questionIndex: state.questionIndex - 1
			}
		default :
			return state;
				
	}
}

export default appReducer;