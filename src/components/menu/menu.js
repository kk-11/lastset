import React, { useContext } from 'react';
import classNames from 'classnames';
import { toggleMenu, toggleMetric, dismissSignUp } from '../../constants';
import { store } from '../../context';
import s from './menu.module.scss';

export default function Menu() {
	const { state, dispatch } = useContext(store);
	const { menuOpen, useMetric } = state;

	return (
		<div className={classNames([s.wrapper, menuOpen && s.active])}>
			<button
				className={classNames([s.item])}
				onClick={() => {
					return dispatch({ type: toggleMetric, payload: !useMetric });
				}}>
				Default unit: {useMetric ? 'metric' : 'imperical'}
			</button>
			<button
				className={classNames([s.item])}
				onClick={() => {
					dispatch({ type: toggleMenu, value: !menuOpen });
					return dispatch({
						type: dismissSignUp,
						value: false,
					});
				}}>
				connect an email / sign in / last backup
			</button>
			<p>last backup: xx/xx/xx</p>
			{/* <button className={classNames([s.item])}>default timer</button> */}
		</div>
	);
}
