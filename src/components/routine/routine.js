import React from 'react';
import Exercise from './exercise/exercise.js';
// - - -
import s from './routine.module.scss';

export default class Routine extends React.Component {
	constructor(props) {
		super(props);
	}


	render(props) {
		const {
			activeRoutine,
			topState,
			updateTopState,
			routineName,
			menuActive,
			exerciseIndex,
			activeExercise,
			nextExercise
		} = this.props;

		return (
			<div className={`${s.container} ${menuActive ? s.active : ''}`}>
				{activeRoutine.map((exercise, idx) => {
					if (idx === exerciseIndex) {
						return(
							<Exercise
								activeExercise={activeExercise}
								exerciseIndex={exerciseIndex}
								routineName={routineName}
								updateTopState={updateTopState}
								topState={topState}
								nextExercise={nextExercise}
							/>
						);
					}
				})}
			</div>
		);
	}
}
