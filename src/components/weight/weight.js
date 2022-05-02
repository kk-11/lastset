import React, { useContext } from 'react';
import { setWeight } from '../../constants';
import { store } from '../../context';

import s from './weight.module.scss';

// const kgToLbs = 2.20462;
export default function Weight({ weight }) {
	const { dispatch } = useContext(store);
	const increment = (x) => {
		dispatch({
			type: setWeight,
			payload: weight + x,
		});
	};
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
