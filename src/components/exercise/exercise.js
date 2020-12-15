import React, { useState, useEffect, useContext } from 'react';

import { store } from '../../store';

import Reps from '../reps/reps';
import Weight from '../weight/weight';

import s from './exercise.module.scss';

export default function Exercise({ data, nextExercise, active }) {
	const { updateReps, updateWeight } = useContext(store);
	const { name, weight, reps } = data;
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
		nextExercise();
	};

	if (!active) return null;
	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>{name}</h3>
			<Weight weight={tempWeight} increment={incrementWeight} />
			<Reps reps={tempReps} increment={incrementReps} />
			<button className={s.btn} onClick={handleEnter}>
				Enter
			</button>
		</div>
	);
}
