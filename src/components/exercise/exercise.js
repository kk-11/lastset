import React, { useContext } from 'react';
import classnames from 'classnames';

import { removeExercise, setExercise, setName } from '../../constants';
import { store } from '../../context';

import Button from '../../ui/button';
import { Reps, Weight } from '../';

import s from './exercise.module.scss';

export default function Exercise({ data, active }) {
	const { state, dispatch } = useContext(store);
	const { exerciseIdx, workoutIdx, workouts } = state;
	const { name, weight, reps } = data;

	const amountOfExercises = workouts[workoutIdx].exercises.length - 1;

	const handleRemove = () => {
		// eslint-disable-next-line no-restricted-globals
		const confirmed = confirm('Sure you want to remove');
		if (confirmed) {
			dispatch({
				type: removeExercise,
				payload: exerciseIdx,
			});
			if (exerciseIdx === amountOfExercises) {
				handleExerciseChange(-1);
			}
		}
	};

	const first = exerciseIdx === 0;
	const last = exerciseIdx === amountOfExercises;

	const handleExerciseChange = (inc) => {
		if (exerciseIdx + inc >= 0 && exerciseIdx + inc <= amountOfExercises) {
			dispatch({
				type: setExercise,
				payload: exerciseIdx + inc,
			});
		}
	};

	if (!active) return null;

	return (
		<div className={s.wrapper}>
			<Button
				onClick={() => handleExerciseChange(-1)}
				className={classnames(s.nextPrev, first && s.hide)}
				label="prev"
			/>
			<div className={s.exercise}>
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

				{weight !== undefined && weight !== null ? (
					<Weight weight={weight} />
				) : (
					<Button label="add weight" />
				)}
				{reps !== null && <Reps reps={reps} />}

				<Button className={s.remove} onClick={handleRemove} label="REMOVE" />
			</div>
			<Button
				onClick={() => handleExerciseChange(+1)}
				className={classnames(s.nextPrev, last && s.hide)}
				label="next"
			/>
		</div>
	);
}
