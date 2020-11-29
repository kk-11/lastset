import React, { useState, useContext } from 'react';

import { store } from './store';

import WorkoutView from './components/workoutView/workoutView';

import s from './App.module.scss';

const App = () => {
	const { state } = useContext(store);
	const { workouts } = state;
	const [workoutIdx, setWorkoutIdx] = useState(null);

	const handleClick = (i) => {
		setWorkoutIdx(i);
	};

	return (
		<div className={s.wrapper}>
			{workoutIdx === null ? (
				workouts.map(({ name }, idx) => (
					<button key={name} onClick={() => handleClick(idx)}>
						{name}
					</button>
				))
			) : (
				<WorkoutView data={workouts[workoutIdx]} />
			)}
		</div>
	);
};

export default App;
