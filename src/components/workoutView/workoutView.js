import React, { useContext } from 'react';

import { store } from '../../store';

import Exercise from '../../components/exercise/exercise';

import s from './workoutView.module.scss';

export default function WorkoutView({ data }) {
	const { name, exercises } = data;
	const { state, setExercise } = useContext(store);
	const { activeExercise } = state;

	const handleClick = (i) => setExercise(i);

	const nextExercise = () => {
		if (activeExercise < exercises.length - 1) {
			setExercise(activeExercise + 1);
		} else {
			alert("you've finished the last exercise");
		}
	};
	return (
		<div className={s.wrapper}>
			<h2>{name}</h2>
			{activeExercise === null ? (
				exercises.map(({ name, sets }, idx) => (
					<div key={name}>
						<button onClick={() => handleClick(idx)}>{name}</button>
						<span>{sets[0].weight}</span>
						<span>{sets[0].reps}</span>
					</div>
				))
			) : (
				<div className={s.exercises}>
					{exercises.map((exercise, idx) => (
						<Exercise
							data={exercise}
							key={idx}
							active={idx === activeExercise}
							nextExercise={nextExercise}
						/>
					))}
				</div>
			)}
		</div>
	);
}
