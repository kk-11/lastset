import React from 'react';

import s from './reps.module.scss';

export default function Reps({ reps, increment }) {
	return (
		<div>
			<button className={s.btn} onClick={() => increment(-1)}>
				-
			</button>
			<h3 style={{ display: 'inline-block' }}>{reps} Reps</h3>
			<button className={s.btn} onClick={() => increment(+1)}>
				+
			</button>
		</div>
	);
}
