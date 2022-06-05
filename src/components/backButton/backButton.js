import React, { useContext } from 'react';
import { setExercise, setWorkout } from '../../constants';
import { store } from '../../context';
import s from './backButton.module.scss';

export default function BackButton() {
	const { state, dispatch } = useContext(store);
	const { menuOpen, workoutIdx, exerciseIdx } = state;

	const handleBack = () => {
		dispatch({
			type: exerciseIdx === null ? setWorkout : setExercise,
			payload: null,
		});
	};

	if (menuOpen || workoutIdx === null) return null;

	return <button className={s.backButton} onClick={() => handleBack()} />;
}
