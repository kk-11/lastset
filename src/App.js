import React, { useContext } from 'react';

import { store } from './store';

import WorkoutView from './components/workoutView/workoutView';

import s from './App.module.scss';

const App = () => {
	const { setWorkout, state } = useContext(store);
	const { workouts, activeWorkout } = state;
	const handleClick = (i) => {
		setWorkout(i);
	};
	console.log(activeWorkout);
	return (
		<div className={s.wrapper}>
			{activeWorkout === null ? (
				workouts.map(({ name }, idx) => (
					<button key={name} onClick={() => handleClick(idx)}>
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
