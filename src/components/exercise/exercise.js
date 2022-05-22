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

	const handleRemove = () => {
		// eslint-disable-next-line no-restricted-globals
		const confirmed = confirm('Sure you want to remove');
		if (confirmed) {
			dispatch({
				type: removeExercise,
				payload: activeExerciseIdx,
			});
			if (activeExerciseIdx === amountOfExercises) {
				handleExerciseChange(-1);
			}
		}
	};

	const first = activeExerciseIdx === 0;
	const last = activeExerciseIdx === amountOfExercises;

	const handleExerciseChange = (inc) => {
		if (
			activeExerciseIdx + inc >= 0 &&
			activeExerciseIdx + inc <= amountOfExercises
		) {
			dispatch({
				type: setExercise,
				payload: activeExerciseIdx + inc,
			});
		}
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

				{weight !== null ? (
					<Weight weight={weight} />
				) : (
					<button>add weight</button>
				)}
				{reps !== null && <Reps reps={reps} />}

				<button className={s.btn} onClick={() => handleExerciseChange(+1)}>
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
