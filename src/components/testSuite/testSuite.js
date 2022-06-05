import React, { useContext } from 'react';
import { store } from '../../context';
import {
	addWorkout,
	addExercise,
	removeWorkout,
	removeExercise,
	setWorkoutName,
	setWorkout,
	setExercise,
	setWeight,
	setReps,
	setName,
	save,
	toggleMenu,
} from '../../constants';
import s from './testSuite.module.scss';

export default function TestSuite() {
	const { state, dispatch } = useContext(store);
	const { menuOpen, workouts, activeWorkoutIdx } = state;
	const actions = [
		addWorkout,
		addExercise,
		removeWorkout,
		removeExercise,
		setWorkoutName,
		setWorkout,
		setExercise,
		setWeight,
		setReps,
		setName,
		save,
		toggleMenu,
	];

	const payloads = [
		{ name: 'test suite workout', exercises: [] },
		{
			name: 'test suite exercise',
			weight: 12,
			reps: 12,
		},
		{ name: workouts[activeWorkoutIdx]?.name || 'TEST' },
		removeExercise,
		setWorkoutName,
		setWorkout,
		setExercise,
		setWeight,
		setReps,
		setName,
		save,
		!menuOpen,
	];
	return (
		<div className={s.wrapper}>
			{actions.map((action, i) => (
				<button
					key={action}
					onClick={() => {
						console.log(action);
						return dispatch({
							type: action,
							payload: payloads[i],
						});
					}}>
					{action}
				</button>
			))}
		</div>
	);
}
