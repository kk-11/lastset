import React, { createContext, useReducer } from 'react';

import data from './defaultData.js';

const initialState = {
	workouts: data,
	workout: null,
	exercise: null,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		const { type, workout, exercise, set } = action || {};
		switch (type) {
			case 'DELETE_EXERCISE':
				state.workouts[workout].exercises.splice(exercise, 1);
				return state;
			case 'DELETE_SET':
				state.workouts[workout].exercises[exercise].sets.splice(set, 1);
				return state;
			default:
				return state;
		}
	}, initialState);

	function deleteExercise({ workout, exercise }) {
		dispatch({
			type: 'DELETE_EXERCISE',
			workout,
			exercise,
		});
	}

	function deleteSet({ workout, exercise, set }) {
		dispatch({
			type: 'DELETE_SET',
			workout,
			exercise,
			set,
		});
	}

	return (
		<Provider value={{ state, deleteExercise, deleteSet }}>
			{children}
		</Provider>
	);
};

export { StateProvider, store };
