import React from 'react';

import s from './weight.module.scss';

const kgToLbs = 2.20462;
export default function Weight({ weight, increment }) {
	return (
		<div>
			<button className={s.btn} onClick={() => increment(-1)}>
				-
			</button>
			<h3 style={{ display: 'inline-block' }}>{weight} kg</h3>
			<button className={s.btn} onClick={() => increment(+1)}>
				+
			</button>
		</div>
	);
}
