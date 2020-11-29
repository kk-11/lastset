import React, { useState, useContext } from 'react';

import { store } from '../../store';

import Reps from '../reps/reps';

import s from './exercise.module.scss';

export default function Exercise({ data, nextExercise }) {
	const { deleteSet, addSet } = useContext(store);
	const [set, setSet] = useState(0);
	const { name, sets } = data;

	const { weight, reps } = sets[set];

	const enterSet = () => {
		if (set < sets.length - 1) {
			setSet(set + 1);
		} else {
			nextExercise();
		}
	};
	const workout = 0;
	const exercise = 0;

	return (
		<div className={s.wrapper}>
			<h3>{name}</h3>
			<div>
				<button>-</button>
				<h3 style={{ display: 'inline-block' }}>{weight}</h3>
				<button>+</button>
			</div>
			<Reps reps={reps} />
			<div>
				<button onClick={() => deleteSet({ workout, exercise, set })}>
					delete set
				</button>
				<button onClick={enterSet}>Enter</button>
				<button onClick={addSet}>add set</button>
			</div>
		</div>
	);
}
