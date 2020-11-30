import React, { createContext, useReducer } from 'react';

import data from './defaultData.js';

const initialState = {
	workouts: data,
	activeWorkout: null,
	activeExercise: null,
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
				console.log('state: ', state);
			case 'ACTIVE_WORKOUT':
				return {
					...state,
					activeWorkout: workout,
				};
			case 'ACTIVE_EXERCISE':
				return {
					...state,
					activeExercise: exercise,
				};
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
		console.log(workout, exercise, set);
		dispatch({
			type: 'DELETE_SET',
			workout,
			exercise,
			set,
		});
	}

	function setWorkout(workout) {
		dispatch({
			type: 'ACTIVE_WORKOUT',
			workout,
		});
	}

	function setExercise(exercise) {
		dispatch({
			type: 'ACTIVE_EXERCISE',
			exercise,
		});
	}

	return (
		<Provider
			value={{
				state,
				setWorkout,
				setExercise,
				deleteExercise,
				deleteSet,
			}}>
			{children}
		</Provider>
	);
};

export { StateProvider, store };
