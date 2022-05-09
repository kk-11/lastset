import React, { useContext } from 'react';
import { removeExercise, setExercise, setName } from '../../constants';
import classnames from 'classnames';

import { store } from '../../context';

import Reps from '../reps/reps';
import Weight from '../weight/weight';

import s from './exercise.module.scss';

export default function Exercise({ data, active }) {
	const { state, dispatch } = useContext(store);
	const { activeExerciseIdx, activeWorkoutIdx, workouts } = state;
	const { name, weight, reps } = data;

	const amountOfExercises = workouts[activeWorkoutIdx].exercises.length - 1;

	const nextExercise = () => {
		if (activeExerciseIdx < amountOfExercises) {
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

	const first = activeExerciseIdx === 0;
	const last = activeExerciseIdx === amountOfExercises;

	const handleExerciseChange = (inc) => {
		dispatch({
			type: setExercise,
			payload: activeExerciseIdx + inc,
		});
	};

	if (!active) return null;

	return (
		<div className={s.wrapper}>
			<button
				onClick={() => handleExerciseChange(-1)}
				className={classnames(s.nextPrev, first && s.hide)}>
				prev
			</button>
			<div className={s.exercise}>
				<button
					className={s.exit}
					onClick={() =>
						dispatch({
							type: setExercise,
							payload: null,
						})
					}
				/>
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
				<button className={s.remove} onClick={handleRemove}>
					REMOVE
				</button>
			</div>
			<button
				onClick={() => handleExerciseChange(+1)}
				className={classnames(s.nextPrev, last && s.hide)}>
				next
			</button>
		</div>
	);
}
