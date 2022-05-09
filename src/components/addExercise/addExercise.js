import React, { useState, useContext } from 'react';
import { store } from '../../context';
import { addExercise } from '../../constants';
import s from './addExercise.module.scss';
import Modal from '../modal/modal';

export function AddExercisePanel({ closeModal }) {
	const { dispatch } = useContext(store);
	const [name, setName] = useState('');
	const [weight, setWeight] = useState('');
	const [reps, setReps] = useState('');

	const handleAddExercise = () => {
		if (typeof closeModal === 'function') {
			closeModal();
		}
		dispatch({
			type: addExercise,
			payload: {
				name,
				weight,
				reps,
			},
		});
	};

	return (
		<>
			Add Exercise
			<input
				placeholder="name"
				className={s.inputField}
				value={name}
				onChange={(evt) => setName(evt.target.value)}
			/>
			<input
				placeholder="weight"
				className={s.inputField}
				weight={weight}
				onChange={(evt) => setWeight(evt.target.value)}
			/>
			<input
				placeholder="reps"
				className={s.inputField}
				reps={reps}
				onChange={(evt) => setReps(evt.target.value)}
			/>
			<button className={s.addExerciseBtn} onClick={handleAddExercise}>
				Add
			</button>
		</>
	);
}

export default function AddExerciseModal({ open, closeModal, children }) {
	return (
		<Modal open={open} closeModal={closeModal}>
			<AddExercisePanel closeModal={closeModal} />
		</Modal>
	);
}
