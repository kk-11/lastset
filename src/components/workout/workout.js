import React, { useContext, useState } from 'react';
import { store } from '../../context';
import { setWorkoutName, setExercise } from '../../constants';

import AddExercise from '../addExercise/addExercise';
import Exercise from '../exercise/exercise';

import s from './workout.module.scss';

export default function Workout({ data }) {
	const { name, exercises } = data;
	const { state, dispatch } = useContext(store);
	const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
	const { activeExerciseIdx } = state;

	const handleExerciseClick = (i) =>
		dispatch({
			type: setExercise,
			payload: i,
		});

	return (
		<>
			{activeExerciseIdx === null ? (
				<div className={s.workout}>
					<textarea
						className={s.title}
						onChange={(evt) =>
							dispatch({
								type: setWorkoutName,
								payload: evt.target.value,
							})
						}
						placeholder={name}
						value={name}>
						{name}
					</textarea>
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
					<button
						className={s.addExerciseBtn}
						onClick={() => setAddExerciseModalOpen(true)}>
						+
					</button>
				</div>
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
			{addExerciseModalOpen && (
				<AddExercise
					open={addExerciseModalOpen}
					closeModal={() => setAddExerciseModalOpen(false)}
				/>
			)}
		</>
	);
}
