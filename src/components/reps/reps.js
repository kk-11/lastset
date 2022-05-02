import React, { useContext } from 'react';
import { setReps } from '../../constants';
import { store } from '../../context';

import s from './reps.module.scss';

export default function Reps({ reps }) {
	const { dispatch } = useContext(store);
	const increment = (x) => {
		dispatch({
			type: setReps,
			payload: reps + x,
		});
	};
	return (
		<div className={s.wrapper}>
			<button className={s.btn} onClick={() => increment(-1)}>
				-
			</button>
			<h3 className={s.reps}>{reps}</h3>
			<button className={s.btn} onClick={() => increment(+1)}>
				+
			</button>
		</div>
	);
}
