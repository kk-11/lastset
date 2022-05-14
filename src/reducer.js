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
	toggleMenu,
} from './constants';
import { updateLocalStorage } from './utils/updateLocalStorage.js';

export const reducer = (state, action) => {
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
		case toggleMenu:
			return {
				...state,
				menuOpen: payload,
			};
		default:
			return state;
	}
};
