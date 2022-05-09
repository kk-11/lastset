import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { store } from '../../context';
import Modal from '../modal/modal';
import { addWorkout } from '../../constants';
import s from './addWorkoutModal.module.scss';
import { AddExercisePanel } from '../addExercise/addExercise';

export default function AddWorkoutModal({ open, closeModal }) {
	const { dispatch } = useContext(store);
	const [newWorkoutName, setNewWorkoutName] = useState('');
	const [addExercises, setAddExercises] = useState(false);

	return (
		<Modal open={open} closeModal={closeModal}>
			<div
				className={classnames(s.wrapper, open && s.open)}
				onClick={(evt) => evt.stopPropagation()}>
				{!addExercises ? (
					<>
						<input
							placeholder="Workout Name"
							className={s.inputField}
							value={newWorkoutName}
							onChange={(evt) => setNewWorkoutName(evt.target.value)}
						/>
						<button
							onClick={() => {
								dispatch({
									type: addWorkout,
									payload: { name: newWorkoutName, exercises: [] },
								});
								setAddExercises(true);
							}}>
							Add exercises
						</button>
					</>
				) : (
					<AddExercisePanel />
				)}
			</div>
		</Modal>
	);
}
