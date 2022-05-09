import React, { useContext } from 'react';
import classNames from 'classnames';
import { store } from '../../context';
import s from './menu.module.scss';

export default function Menu() {
	const { state } = useContext(store);
	const { menuOpen } = state;

	return (
		<div className={classNames([s.wrapper, menuOpen && s.active])}>
			<div className={classNames([s.item])}>settings</div>
			<div className={classNames([s.item])}>timer</div>
		</div>
	);
}
