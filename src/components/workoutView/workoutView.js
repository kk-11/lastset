import React, { useState } from 'react';

import Exercise from '../../components/exercise/exercise';

import s from './workoutView.module.scss';

export default function WorkoutView({ data }) {
	const { name, exercises } = data;
	const [exerciseIdx, setExerciseIdx] = useState(null);
	const handleClick = (i) => {
		setExerciseIdx(i);
	};

	const nextExercise = () => {
		if (exerciseIdx < exercises.length - 1) {
			setExerciseIdx(exerciseIdx + 1);
		} else {
			alert("you've finished the last exercise");
		}
	};

	return (
		<div className={s.wrapper}>
			<h2>{name}</h2>
			{exerciseIdx === null ? (
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
							nextExercise={nextExercise}
						/>
					))}
				</div>
			)}
		</div>
	);
}
