import React, { useContext } from 'react';
import { removeExercise, setExercise, setName } from '../../constants';

import { store } from '../../context';

import Reps from '../reps/reps';
import Weight from '../weight/weight';

import s from './exercise.module.scss';

export default function Exercise({ data, active }) {
	const { state, dispatch } = useContext(store);
	const { activeExerciseIdx, activeWorkoutIdx, workouts } = state;
	const { name, weight, reps } = data;

	const nextExercise = () => {
		if (activeExerciseIdx < workouts[activeWorkoutIdx].exercises.length - 1) {
			dispatch({
				type: setExercise,
				payload: activeExerciseIdx + 1,
			});
		}
	};
	const handleRemove = () => {
		alert('Sure you want to remove');
		// ....
		dispatch({
			type: removeExercise,
			payload: activeExerciseIdx,
		});
	};
	if (!active) return null;

	return (
		<div className={s.wrapper}>
			<button className={s.remove} onClick={handleRemove}>
				x
			</button>
			<textarea
				className={s.title}
				onChange={(evt) =>
					dispatch({
						type: setName,
						payload: evt.target.value,
					})
				}
				placeholder={name}
				value={name}
			/>

			{weight !== null && <Weight weight={weight} />}
			{reps !== null && <Reps reps={reps} />}

			<button className={s.btn} onClick={() => nextExercise()}>
				Enter
			</button>
		</div>
	);
}
