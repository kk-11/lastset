import React, { useContext } from 'react';
import classnames from 'classnames';
import { kgToLbs, setWeight } from '../../constants';
import { store } from '../../context';

import Button from '../../ui/button';
import s from './weight.module.scss';

export default function Weight({ weight }) {
	const { state, dispatch } = useContext(store);
	const { useMetric } = state;

	const increment = (x) => {
		dispatch({
			type: setWeight,
			payload: +weight + x,
		});
	};

	const converted = useMetric ? weight : weight * kgToLbs;
	if (weight < 1) return null;
	return (
		<div className={s.wrapper}>
			<Button className={s.btn} onClick={() => increment(-1)} label="-" />
			<h3 className={classnames(s.weight, useMetric && s.metric)}>
				{Math.round(converted)}
			</h3>
			<Button className={s.btn} onClick={() => increment(+1)} label="+" />
		</div>
	);
}
