import React, { useState, useContext } from 'react';

import { store } from './store';

import WorkoutView from './components/workoutView/workoutView';

import s from './App.module.scss';

const App = () => {
	const { state } = useContext(store);

	const [activeWorkoutIdx, setActiveWorkoutIdx] = useState(null);

	const handleClick = (i) => {
		setActiveWorkoutIdx(i);
	};

	const activeWorkout = state[activeWorkoutIdx];

	return (
		<div className={s.wrapper}>
			{activeWorkoutIdx === null ? (
				state.map(({ name }, idx) => (
					<button key={name} onClick={() => handleClick(idx)}>
						{name}
					</button>
				))
			) : (
				<WorkoutView data={activeWorkout} />
			)}
		</div>
	);
};

export default App;
