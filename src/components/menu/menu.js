import React, { useContext } from 'react';
import classNames from 'classnames';
import { toggleMenu, toggleMetric, toggleSignUp } from '../../constants';
import { store } from '../../context';
import s from './menu.module.scss';

export default function Menu() {
	const { state, dispatch } = useContext(store);
	const { menuOpen, useMetric, signUpDismissed } = state;

	const menuItemClick = (action) => {
		console.log(action);
		dispatch({ type: toggleMenu, value: !menuOpen });
		dispatch(action);
	};

	return (
		<div className={classNames([s.wrapper, menuOpen && s.active])}>
			<button
				className={classNames([s.item])}
				onClick={() =>
					menuItemClick({ type: toggleMetric, payload: !useMetric })
				}>
				Default unit: {useMetric ? 'metric' : 'imperical'}
			</button>
			<button
				className={classNames([s.item])}
				onClick={() =>
					menuItemClick({
						type: toggleSignUp,
						value: !signUpDismissed,
					})
				}>
				connect an email / sign in / last backup
			</button>
			<p>last backup: xx/xx/xx</p>
			{/* <button className={classNames([s.item])}>default timer</button> */}
		</div>
	);
}
