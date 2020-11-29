import React, { useState, useEffect, useContext } from 'react';

import { store } from '../../store';

import s from './reps.module.scss';

export default function Reps({ reps }) {
	const [tempReps, setTempReps] = useState(reps);
	useEffect(() => {
		setTempReps(reps);
	}, [reps]);

	const increment = (value) => {
		setTempReps(tempReps + value);
	};

	return (
		<div>
			<button onClick={() => increment(-1)}>-</button>
			<h3 style={{ display: 'inline-block' }}>{tempReps} Reps</h3>
			<button onClick={() => increment(+1)}>+</button>
		</div>
	);
}
