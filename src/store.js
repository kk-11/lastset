import React, { createContext, useReducer } from 'react';

import data from './defaultData.js';

const updateLocalStorage = (data) => {
	const stringified = JSON.stringify(data);
	window.localStorage.setItem('lastSetWTF', stringified);
};

let baseData = window.localStorage.getItem('lastSetWTF');
if (baseData === null) {
	updateLocalStorage(data);
} else {
	baseData = JSON.parse(baseData);
}

const initialState = {
	workouts: baseData,
	activeWorkout: null,
	activeExercise: null,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		const { type, workout, exercise, newWeight, newReps, newName } =
			action || {};
		switch (type) {
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
			case 'UPDATE_WEIGHT':
				state.workouts[state.activeWorkout].exercises[
					state.activeExercise
				].weight = newWeight;
				return state;
			case 'UPDATE_REPS':
				state.workouts[state.activeWorkout].exercises[
					state.activeExercise
				].reps = newReps;
				return state;
			case 'UPDATE_NAME':
				state.workouts[state.activeWorkout].exercises[
					state.activeExercise
				].name = newName;
				updateLocalStorage(state.workouts);
				return state;
			default:
				return state;
		}
	}, initialState);

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

	function updateWeight(newWeight) {
		dispatch({
			type: 'UPDATE_WEIGHT',
			newWeight,
		});
	}

	function updateReps(newReps) {
		dispatch({
			type: 'UPDATE_REPS',
			newReps,
		});
	}
	function updateName(newName) {
		dispatch({
			type: 'UPDATE_NAME',
			newName,
		});
	}

	return (
		<Provider
			value={{
				state,
				updateName,
				updateReps,
				setWorkout,
				setExercise,
				updateWeight,
			}}>
			{children}
		</Provider>
	);
};

export { StateProvider, store };
