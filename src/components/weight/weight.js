import React from 'react';

import s from './weight.module.scss';

// const kgToLbs = 2.20462;
export default function Weight({ weight, increment }) {
	return (
		<div className={s.wrapper}>
			<button className={s.btn} onClick={() => increment(-1)}>
				-
			</button>
			<h3 className={s.weight}>{weight}</h3>
			<button className={s.btn} onClick={() => increment(+1)}>
				+
			</button>
		</div>
	);
}
