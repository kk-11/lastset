import React, { useContext } from 'react';
import { store } from '../../context';
import { addExercise } from '../../constants';
import s from './actionsBar.module.scss';

export default function ActionsBar() {
	const { state, dispatch } = useContext(store);
	const { exerciseIdx, workoutIdx } = state;
	console.log(exerciseIdx, workoutIdx);
	return (
		<div className={s.wrapper}>
			<button className={s.primary}>+</button>
		</div>
	);
}
