import React from 'react';
import Exercise from './exercise/exercise.js';
// - - -
import s from './routine.module.scss';

export default class Routine extends React.Component {
	constructor(props) {
		super(props);
		this.nextExercise = this.nextExercise.bind(this);
		this.state = {
			activeExercise: 0,
		}
	}
	nextExercise() {
		const {
			topState,
			activeRoutine,
			routineName
		} = this.props;

		this.setState({
			activeExercise: this.state.activeExercise + 1
		});
		if (this.state.activeExercise === topState.routines[routineName].length - 1) {
			//start over?
			//back to home screen?
			//
			this.setState({
				activeExercise: 0
			});
		}

	}

	render(props) {
		const {
			activeRoutine,
			topState,
			updateTopState,
			routineName,
			menuActive
		} = this.props;

		return (
			<div className={`${s.container} ${menuActive ? s.active : ''}`}>
				{activeRoutine.map((exercise, idx) => {
					if (idx === this.state.activeExercise) {
						return(
							<Exercise
								exerciseIndex={this.state.activeExercise}
								routineName={routineName}
								updateTopState={updateTopState}
								topState={topState}
								nextExercise={this.nextExercise}
								activeExercise={exercise}
							/>
						);
					}
				})}
			</div>
		);
	}
}
