import React, { useState, useEffect, useContext } from 'react';

import { store } from '../../store';

import Reps from '../reps/reps';
import Weight from '../weight/weight';

import s from './exercise.module.scss';

export default function Exercise({ data, nextExercise, active }) {
	const { updateReps, updateWeight, updateName } = useContext(store);
	const { name, weight, reps } = data;
	const [tempName, setTempName] = useState(name);
	const [tempReps, setTempReps] = useState(reps);
	const [tempWeight, setTempWeight] = useState(weight);

	useEffect(() => {
		setTempReps(reps);
		setTempWeight(weight);
	}, [reps, weight]);

	const incrementReps = (value) => {
		setTempReps(tempReps + value);
	};

	const incrementWeight = (value) => {
		setTempWeight(tempWeight + value);
	};

	const handleEnter = () => {
		updateReps(tempReps);
		updateWeight(tempWeight);
		updateName(tempName);
		nextExercise();
	};

	if (!active) return null;
	return (
		<div className={s.wrapper}>
			<textarea
				className={s.title}
				onChange={(evt) => setTempName(evt.target.value)}
				placeholder={name}
				value={tempName}
			/>

			{tempWeight !== null && (
				<Weight weight={tempWeight} increment={incrementWeight} />
			)}
			{tempReps !== null && (
				<Reps reps={tempReps} increment={incrementReps} />
			)}

			<button className={s.btn} onClick={handleEnter}>
				Enter
			</button>
		</div>
	);
}
