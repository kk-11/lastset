import React, { useState, useContext } from 'react';

import { store } from '../../store';

import s from './exercise.module.scss';

export default function Exercise({ data, nextExercise }) {
	const { deleteSet, addSet } = useContext(store);

	const [activeSet, setActiveSet] = useState(0);
	const { name, sets } = data;

	const { weight, reps } = sets[activeSet];

	const enterSet = () => {
		if (activeSet < sets.length - 1) {
			setActiveSet(activeSet + 1);
		} else {
			nextExercise();
		}
	};

	return (
		<div className={s.wrapper}>
			<h3>{name}</h3>
			<div>
				<button>-</button>
				<h3 style={{ display: 'inline-block' }}>{weight}</h3>
				<button>+</button>
			</div>
			<div>
				<button>-</button>
				<h3 style={{ display: 'inline-block' }}>{reps} Reps</h3>
				<button>+</button>
			</div>
			<div>
				<button onClick={() => deleteSet(activeSet)}>delete set</button>
				<button onClick={enterSet}>Enter</button>
				<button onClick={addSet}>add set</button>
			</div>
		</div>
	);
}
