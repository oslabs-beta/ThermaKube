import * as types from '../constants/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
	//define state  variables

	switch (action.type) {
		case types.SOMETHING:
			//do stuff

			return {
				...state,
			};
		default:
			return state;
	}
};

export default reducer;
