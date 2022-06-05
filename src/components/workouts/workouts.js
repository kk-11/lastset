import React, { useContext, useState } from 'react';
import { store } from '../../context';
import Workout from '../workout/workout';
import { setWorkout } from '../../constants';
import AddWorkoutModal from '../addWorkoutModal/addWorkoutModal';
import s from './workouts.module.scss';

export default function Workouts() {
	const { state, dispatch } = useContext(store);
	const [addWorkoutModalOpen, setAddWorkoutModalOpen] = useState(false);
	const { workouts, activeWorkoutIdx } = state;

	const handleWorkoutClick = (i) => {
		dispatch({
			type: setWorkout,
			payload: i,
		});
	};

	return (
		<div className={s.wrapper}>
			{!workouts[activeWorkoutIdx] || activeWorkoutIdx === null ? (
				<>
					{workouts.map(({ name }, idx) => (
						<button
							key={name}
							className={s.workout}
							onClick={() => handleWorkoutClick(idx)}>
							{name}
						</button>
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
