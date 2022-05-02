import React, { useContext, useEffect } from 'react';
import { save, setExercise, setWorkout } from './constants';
import { store } from './context';

import Workout from './components/workout/workout';
import Timer from './components/timer/timer';
// import Login from './components/login/login';

import s from './App.module.scss';

const App = () => {
	const { state, dispatch } = useContext(store);
	const { workouts, activeExerciseIdx, activeWorkoutIdx } = state;

	const handleWorkoutClick = (i) => {
		dispatch({
			type: setWorkout,
			payload: i,
		});
	};

	useEffect(() => {
		window.addEventListener('beforeunload', () => {
			dispatch({
				type: save,
			});
		});

		window.addEventListener('keydown', (evt) => {
			switch (evt.key) {
				case 'Escape':
					console.log(activeWorkoutIdx, activeExerciseIdx);
					// if (activeWorkoutIdx !== null && activeExerciseIdx === null) {
					// 	console.log(activeWorkoutIdx, activeExerciseIdx);
					// 	dispatch({
					// 		type: setWorkout,
					// 		payload: null,
					// 	});
					// }
					if (activeExerciseIdx !== null) {
						dispatch({
							type: setExercise,
							payload: null,
						});
					}

					break;
				default:
					break;
			}
		});
	});

	// if (!user) return <Login />;
	return (
		<div className={s.wrapper}>
			<Timer />
			{activeWorkoutIdx === null ? (
				workouts.map(({ name }, idx) => (
					<button
						className={s.workout}
						key={name}
						onClick={() => handleWorkoutClick(idx)}>
						{name}
					</button>
				))
			) : (
				<Workout data={workouts[activeWorkoutIdx]} />
			)}
		</div>
	);
};

export default App;
