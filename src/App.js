import React, { useContext } from 'react';

import { store } from './store';

import WorkoutView from './components/workoutView/workoutView';
import Login from './components/login/login';

import s from './App.module.scss';

const App = () => {
	const { user, setWorkout, state } = useContext(store);
	const { workouts, activeWorkout } = state;
	const handleClick = (i) => {
		setWorkout(i);
	};

	if (!user) return <Login />;

	return (
		<div className={s.wrapper}>
			{activeWorkout === null ? (
				workouts.map(({ name }, idx) => (
					<button
						className={s.workout}
						key={name}
						onClick={() => handleClick(idx)}>
						{name}
					</button>
				))
			) : (
				<WorkoutView data={workouts[activeWorkout]} />
			)}
		</div>
	);
};

export default App;
