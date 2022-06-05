import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { kgToLbs } from '../../constants';
import { setWeight } from '../../constants';
import { store } from '../../context';

import s from './weight.module.scss';

export default function Weight({ weight }) {
	const { state, dispatch } = useContext(store);
	const { useMetric } = state;
	const [isMetric, setIsMetric] = useState(useMetric);

	useEffect(() => {
		setIsMetric(useMetric);
	}, [useMetric]);

	const increment = (x) => {
		dispatch({
			type: setWeight,
			payload: +weight + x,
		});
	};

	const converted = isMetric ? weight : weight * kgToLbs;

	return (
		<div className={s.wrapper}>
			<button className={s.btn} onClick={() => increment(-1)}>
				-
			</button>
			<h3
				className={classnames(s.weight, isMetric && s.metric)}
				onTouchStart={() => setIsMetric(!isMetric)}
				onTouchEnd={() => setIsMetric(!isMetric)}>
				{Math.round(converted)}
			</h3>
			<button className={s.btn} onClick={() => increment(+1)}>
				+
			</button>
		</div>
	);
}
