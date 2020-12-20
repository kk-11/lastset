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
			{activeExercise === null ? (
				<>
					<h2 className={s.title}>{name}</h2>
					{exercises.map(({ name, weight, reps }, idx) => (
						<button
							key={name}
							className={s.exercise}
							onClick={() => handleClick(idx)}>
							<div className={s.name}>{name}</div>
							{weight !== null && <div>{weight} kg</div>}
							{reps !== null && <div>{reps} reps</div>}
						</button>
					))}
				</>
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
