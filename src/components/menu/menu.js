import React, { useContext } from 'react';
import classNames from 'classnames';
import { toggleMetric } from '../../constants';
import { store } from '../../context';
import s from './menu.module.scss';

export default function Menu() {
	const { state, dispatch } = useContext(store);
	const { menuOpen, useMetric } = state;

	return (
		<div className={classNames([s.wrapper, menuOpen && s.active])}>
			<button
				className={classNames([s.item])}
				onClick={() => dispatch({ type: toggleMetric, payload: !useMetric })}>
				Default unit: {useMetric ? 'metric' : 'imperical'}
			</button>
		</div>
	);
}
