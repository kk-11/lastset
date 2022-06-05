import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { store } from '../../context';
import { setWorkout, removeWorkout, toggleMetric } from '../../constants';
import { AddWorkoutModal, Workout } from '../';
import s from './workouts.module.scss';

export default function Workouts() {
	const [timer, setTimer] = useState();
	const { state, dispatch } = useContext(store);
	const [addWorkoutModalOpen, setAddWorkoutModalOpen] = useState(false);
	const [showDeleteButtons, setShowDeleteButtons] = useState(false);
	const { workouts = [], workoutIdx, useMetric } = state;

	const handleWorkoutClick = (i) => {
		if (timer) clearTimeout(timer);
		dispatch({
			type: setWorkout,
			payload: i,
		});
	};

	const handleTouchStart = () => {
		setTimer(setTimeout(() => setShowDeleteButtons(true), 1618));
	};
	const handleTouchEnd = () => {
		if (timer) clearTimeout(timer);
	};

	return (
		<div
			className={s.wrapper}
			onClick={() => setShowDeleteButtons(false)}
			onTouchStart={() => dispatch({ type: toggleMetric, payload: !useMetric })}
			onTouchEnd={() => dispatch({ type: toggleMetric, payload: !useMetric })}>
			{workoutIdx === null || !workouts[workoutIdx] ? (
				<>
					{workouts?.map(({ name }, idx) => (
						<div key={name} className={s.workoutButtons}>
							<button
								className={classnames([
									s.workout,
									showDeleteButtons && s.shake,
								])}
								onTouchStart={() => handleTouchStart()}
								onTouchEnd={() => handleTouchEnd()}
								onClick={() => handleWorkoutClick(idx)}>
								{name}
							</button>
							{showDeleteButtons && (
								<button
									className={s.deleteWorkoutX}
									onClick={(evt) => {
										evt.stopPropagation();
										return dispatch({
											type: removeWorkout,
											payload: { name },
										});
									}}
								/>
							)}
						</div>
					))}
					<button
						className={s.addWorkout}
						onClick={() => setAddWorkoutModalOpen(true)}>
						+
					</button>
				</>
			) : (
				<Workout data={workouts[workoutIdx]} />
			)}
			{addWorkoutModalOpen && (
				<AddWorkoutModal
					open={addWorkoutModalOpen}
					closeModal={() => setAddWorkoutModalOpen(false)}
				/>
			)}
		</div>
	);
}
