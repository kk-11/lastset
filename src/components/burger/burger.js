import React, { useContext } from 'react';
import classNames from 'classnames';
import { store } from '../../context';
import s from './burger.module.scss';
import { toggleMenu } from '../../constants';

export default function Burger() {
	const { state, dispatch } = useContext(store);
	const { menuOpen } = state;
	return (
		<div
			className={classNames([s.wrapper, menuOpen && s.active])}
			onClick={() =>
				dispatch({
					type: toggleMenu,
					payload: !menuOpen,
				})
			}>
			<div className={classNames([s.line, s.top, menuOpen && s.active])}></div>
			<div
				className={classNames([s.line, s.bottom, menuOpen && s.active])}></div>
		</div>
	);
}
