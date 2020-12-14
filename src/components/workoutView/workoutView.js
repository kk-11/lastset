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
				exercises.map(({ name, weight, reps }, idx) => (
					<button key={name} onClick={() => handleClick(idx)}>
						<div>{name}</div>
						<span>{weight} kg</span>
						<span>{reps} reps</span>
					</button>
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
