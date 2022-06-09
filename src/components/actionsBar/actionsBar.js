import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { store } from '../../context';
import { addExercise } from '../../constants';
import s from './actionsBar.module.scss';

export default function ActionsBar() {
	const { state, dispatch } = useContext(store);
	const [active, setActive] = useState(false);
	const { exerciseIdx, workoutIdx } = state;

	return (
		<div className={s.wrapper}>
			<button
				className={classnames([s.primary, active && s.active])}
				onClick={() => setActive(!active)}>
				+
			</button>
		</div>
	);
}
