import {
	setWorkoutName,
	setWorkout,
	setExercise,
	setWeight,
	setReps,
	setName,
	save,
	removeExercise,
	removeWorkout,
	addExercise,
	addWorkout,
	toggleMenu,
	toggleMetric,
	dismissSignUp,
} from './constants';
import { updateLocalStorage } from './utils/updateLocalStorage.js';

export const reducer = (state, action) => {
	const { type, payload } = action || {};
	const { workouts, exerciseIdx, workoutIdx } = state;

	switch (type) {
		case setWorkout:
			return {
				...state,
				workoutIdx: payload,
			};
		case addWorkout:
			return {
				...state,
				...workouts.push(payload),
			};
		case setExercise:
			return {
				...state,
				exerciseIdx: payload,
			};
		case setWeight:
			return {
				...state,
				...(workouts[workoutIdx].exercises[exerciseIdx].weight = payload),
			};
		case setReps:
			return {
				...state,
				...(workouts[workoutIdx].exercises[exerciseIdx].reps = payload),
			};
		case setName:
			return {
				...state,
				...(workouts[workoutIdx].exercises[exerciseIdx].name = payload),
			};
		case save:
			updateLocalStorage(workouts);
			return {
				...state,
			};
		case setWorkoutName:
			return {
				...state,
				...(workouts[workoutIdx].name = payload),
			};
		case addExercise:
			return {
				...state,
				...workouts[workoutIdx].exercises.push(payload),
			};
		case removeExercise:
			return {
				...state,
				...(workouts[workoutIdx].exercises = workouts[
					workoutIdx
				].exercises.filter((_, i) => i !== exerciseIdx)),
			};
		case removeWorkout:
			return {
				...state,
				workouts: workouts.filter((workout) => {
					console.log(workout.name, payload.name);
					return workout.name !== payload.name;
				}),
			};
		case toggleMenu:
			return {
				...state,
				menuOpen: payload,
			};
		case toggleMetric:
			return {
				...state,
				useMetric: payload,
			};
		case dismissSignUp:
			return {
				...state,
				signUpDismissed: payload,
			};
		default:
			return state;
	}
};
