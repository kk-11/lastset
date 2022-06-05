import React, { useContext } from 'react';
import classNames from 'classnames';
import { toggleMenu } from '../../constants';
import { store } from '../../context';
import Button from '../../ui/button';
import s from './burger.module.scss';

export default function Burger() {
	const { state, dispatch } = useContext(store);
	const { menuOpen } = state;
	return (
		<Button
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
		</Button>
	);
}
