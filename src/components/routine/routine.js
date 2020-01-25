import React from 'react';
import Exercise from './exercise/exercise.js';
// - - -
import s from './routine.module.css';

export default class Routine extends React.Component {
	constructor(props) {
		super(props);
		this.nextExercise = this.nextExercise.bind(this);
		this.state = {
			activeExercise: 0,
		}
	}
	nextExercise() {
		this.setState({
			activeExercise: this.state.activeExercise + 1
		});

	}

	render(props) {
		const {
			activeRoutine,
			topState,
			updateTopState,
			routineName
		} = this.props;

		return (
			<div className={s.container}>
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
