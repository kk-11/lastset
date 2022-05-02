import React, { useContext } from 'react';
import classnames from 'classnames';
import { store } from '../../context';
import { setExercise, setWorkout } from '../../constants';

import Exercise from '../exercise/exercise';

import s from './workout.module.scss';

export default function Workout({ data }) {
	const { name, exercises } = data;
	const { state, dispatch } = useContext(store);
	const { activeExerciseIdx, activeWorkoutIdx, workouts } = state;

	const handleExerciseClick = (i) =>
		dispatch({
			type: setExercise,
			payload: i,
		});

	const first = activeWorkoutIdx === 0;
	const last = activeWorkoutIdx === workouts.length - 1;

	const handleWorkoutChange = (inc) => {
		dispatch({
			type: setWorkout,
			payload: activeWorkoutIdx + inc,
		});
	};

	return (
		<div className={s.wrapper}>
			<button
				onClick={() => handleWorkoutChange(-1)}
				className={classnames(s.nextPrev, first && s.hide)}>
				prev
			</button>
			<div className={s.workout}>
				{activeExerciseIdx === null ? (
					<>
						<h2 className={s.title}>{name}</h2>
						{exercises.map(({ name, weight, reps }, idx) => (
							<button
								key={name}
								className={s.exercise}
								onClick={() => handleExerciseClick(idx)}>
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
								active={idx === activeExerciseIdx}
							/>
						))}
					</div>
				)}
			</div>
			<button
				onClick={() => handleWorkoutChange(+1)}
				className={classnames(s.nextPrev, last && s.hide)}>
				next
			</button>
		</div>
	);
}
