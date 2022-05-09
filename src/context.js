import React, { createContext, useReducer } from 'react';

import data from './defaultData.js';

import {
	setWorkoutName,
	setWorkout,
	setExercise,
	setWeight,
	setReps,
	setName,
	save,
	removeExercise,
	addExercise,
	addWorkout,
} from './constants';

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
	activeWorkoutIdx: null,
	activeExerciseIdx: null,
	user: undefined,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		const { type, payload } = action || {};
		const { workouts, activeExerciseIdx, activeWorkoutIdx } = state;

		switch (type) {
			case setWorkout:
				return {
					...state,
					activeWorkoutIdx: payload,
				};
			case addWorkout:
				return {
					...state,
					...workouts.push(payload),
				};
			case setExercise:
				return {
					...state,
					activeExerciseIdx: payload,
				};
			case setWeight:
				return {
					...state,
					...(workouts[activeWorkoutIdx].exercises[activeExerciseIdx].weight =
						payload),
				};
			case setReps:
				return {
					...state,
					...(workouts[activeWorkoutIdx].exercises[activeExerciseIdx].reps =
						payload),
				};
			case setName:
				return {
					...state,
					...(workouts[activeWorkoutIdx].exercises[activeExerciseIdx].name =
						payload),
				};
			case save:
				updateLocalStorage(workouts);
				return {
					...state,
				};
			case setWorkoutName:
				return {
					...state,
					...(workouts[activeWorkoutIdx].name = payload),
				};
			case addExercise:
				return {
					...state,
					...workouts[activeWorkoutIdx].exercises.push(payload),
				};
			case removeExercise:
				return {
					...state,
					...(workouts[activeWorkoutIdx].exercises = workouts[
						activeWorkoutIdx
					].exercises.filter((_, i) => i !== activeExerciseIdx)),
				};
			default:
				return state;
		}
	}, initialState);

	const value = { state, dispatch };
	return <Provider value={value}>{children}</Provider>;
};

export { StateProvider, store };
