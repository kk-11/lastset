import React, { useContext, useState } from 'react';
import { store } from '../../context';
import { setWorkoutName, setExercise, kgToLbs } from '../../constants';

import { AddExercise, Exercise } from '../';

import Button from '../../ui/button';

import s from './workout.module.scss';

export default function Workout({ data }) {
	const { name, exercises } = data;
	const { state, dispatch } = useContext(store);
	const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
	const { exerciseIdx, workouts, useMetric } = state;

	const handleExerciseClick = (i) =>
		dispatch({
			type: setExercise,
			payload: i,
		});

	return (
		<>
			{exerciseIdx === null ? (
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
					{exercises.length > 0 ? (
						exercises.map(({ name, weight, reps }, idx) => {
							const converted = useMetric ? weight : weight * kgToLbs;
							return (
								<Button
									key={name}
									className={s.exercise}
									onClick={() => handleExerciseClick(idx)}>
									<div className={s.name}>{name}</div>
									{weight !== null && weight !== undefined && weight > 0 && (
										<div>
											{Math.round(converted)} {useMetric ? 'kg' : 'lbs'}
										</div>
									)}
									{reps !== null && reps !== undefined && reps > 0 && (
										<div>{reps} reps</div>
									)}
								</Button>
							);
						})
					) : (
						<div>
							<p>no exercises</p>
							<Button
								onClick={() => setAddExerciseModalOpen(true)}
								label="add exercise"
							/>
						</div>
					)}
					<Button
						className={s.addExerciseBtn}
						onClick={() => setAddExerciseModalOpen(true)}
						label="+"
					/>
				</div>
			) : (
				<div className={s.exercises}>
					{workouts.length > 0 ? (
						exercises.map((exercise, idx) => (
							<Exercise
								data={exercise}
								key={idx}
								active={idx === exerciseIdx}
							/>
						))
					) : (
						<div>
							<p>no workouts</p>
							<Button label="add workout" />
						</div>
					)}
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
