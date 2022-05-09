import React, { useContext, useEffect, useState, useCallback } from 'react';
import { save, setExercise, setWorkout } from './constants';
import { store } from './context';

import Workout from './components/workout/workout';
import Timer from './components/timer/timer';
import Burger from './components/burger/burger';
import Menu from './components/menu/menu';
import AddWorkoutModal from './components/addWorkoutModal/addWorkoutModal';
// import Login from './components/login/login';

import s from './App.module.scss';

const App = () => {
	const { state, dispatch } = useContext(store);
	const [addWorkoutModalOpen, setAddWorkoutModalOpen] = useState(false);
	const { workouts, activeExerciseIdx, activeWorkoutIdx } = state;

	const handleWorkoutClick = (i) => {
		dispatch({
			type: setWorkout,
			payload: i,
		});
	};

	useEffect(() => {
		// window.addEventListener('beforeunload', () => {
		// 	dispatch({
		// 		type: save,
		// 	});
		// });
		window.addEventListener('keydown', (evt) => {
			switch (evt.key) {
				case 'Escape':
					dispatch({
						type: activeExerciseIdx === null ? setExercise : setWorkout,
						payload: null,
					});
					break;
				default:
					break;
			}
		});
	}, [activeExerciseIdx, dispatch]);

	// if (!user) return <Login />;
	return (
		<div className={s.wrapper}>
			<Burger />
			<Menu />
			{/* <Timer /> */}

			{activeWorkoutIdx === null ? (
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
};

export default App;
