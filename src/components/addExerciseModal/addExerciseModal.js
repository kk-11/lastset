import React, { useState, useContext } from 'react';
import { store } from '../../context';
import { addExercise } from '../../constants';
import classnames from 'classnames';
import s from './addExerciseModal.module.scss';

export default function AddExerciseModal({ open, closeModal }) {
	const { dispatch } = useContext(store);
	const [name, setName] = useState('');
	const [weight, setWeight] = useState('');
	const [reps, setReps] = useState('');
	return (
		<div className={s.wrapper}>
			<div className={classnames(s.addExerciseModal, open && s.open)}>
				Add Exercise
				<input
					placeholder="name"
					value={name}
					onChange={(evt) => setName(evt.target.value)}
				/>
				<input
					placeholder="weight"
					weight={weight}
					onChange={(evt) => setWeight(evt.target.value)}
				/>
				<input
					placeholder="reps"
					reps={reps}
					onChange={(evt) => setReps(evt.target.value)}
				/>
				<button
					onClick={() => {
						closeModal();
						dispatch({
							type: addExercise,
							payload: {
								name,
								weight,
								reps,
							},
						});
					}}>
					Add
				</button>
			</div>
		</div>
	);
}
