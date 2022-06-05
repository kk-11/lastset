import React, { useContext } from 'react';
import { setReps } from '../../constants';
import { store } from '../../context';

import Button from '../../ui/button';

import s from './reps.module.scss';

export default function Reps({ reps }) {
	const { dispatch } = useContext(store);
	const increment = (x) => {
		dispatch({
			type: setReps,
			payload: reps + x,
		});
	};

	if (reps < 1) return null;
	return (
		<div className={s.wrapper}>
			<Button className={s.btn} onClick={() => increment(-1)} label="-" />
			<h3 className={s.reps}>{reps}</h3>
			<Button className={s.btn} onClick={() => increment(+1)} label="+" />
		</div>
	);
}
