import React from 'react';

import s from './reps.module.scss';

export default function Reps({ reps, increment }) {
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
