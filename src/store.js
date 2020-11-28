import React, { createContext, useReducer } from 'react';

import data from './defaultData.js';

const initialState = data;

const store = createContext(initialState);
const { Provider } = store;

function deletePropertyPath(obj, path) {
	if (!obj || !path) {
		return;
	}

	if (typeof path === 'string') {
		path = path.split('.');
	}

	for (var i = 0; i < path.length - 1; i++) {
		obj = obj[path[i]];

		if (typeof obj === 'undefined') {
			return;
		}
	}

	delete obj[path.pop()];
}

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		const { type, value } = action || {};

		return {
			...state,
			[type]: value,
		};
	}, initialState);

	const deleteSet = (workout = 0, exercise = 0, set = 0) => {
		state[workout].exercises[exercise].sets.splice(set, 1);

		dispatch({
			type: 'workouts',
			value: state[workout].exercises[exercise].sets.splice(set, 1),
		});
	};

	console.log(state);
	return <Provider value={{ state, deleteSet }}>{children}</Provider>;
};

export { store, StateProvider };
