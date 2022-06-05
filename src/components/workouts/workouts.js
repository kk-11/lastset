import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { store } from '../../context';
import Workout from '../workout/workout';
import { setWorkout, removeWorkout } from '../../constants';
import AddWorkoutModal from '../addWorkoutModal/addWorkoutModal';
import s from './workouts.module.scss';

export default function Workouts() {
	let timer;
	const { state, dispatch } = useContext(store);
	const [addWorkoutModalOpen, setAddWorkoutModalOpen] = useState(false);
	const [showDeleteButtons, setShowDeleteButtons] = useState(false);
	const { workouts, activeWorkoutIdx } = state;

	const handleWorkoutClick = (i) => {
		dispatch({
			type: setWorkout,
			payload: i,
		});
	};

	const handleTouchStart = () => {
		timer = setTimeout(() => setShowDeleteButtons(true), 1618);
	};
	const handleTouchEnd = () => {
		if (timer) clearTimeout(timer);
	};

	return (
		<div className={s.wrapper}>
			{(workouts && !workouts[activeWorkoutIdx]) ||
			activeWorkoutIdx === null ? (
				<>
					{workouts.map(({ name }, idx) => (
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
									onClick={() =>
										dispatch({
											type: removeWorkout,
											payload: { name },
										})
									}
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
				<Workout data={workouts[activeWorkoutIdx]} />
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
