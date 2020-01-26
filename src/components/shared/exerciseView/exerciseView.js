import React from 'react';
import s from './exerciseView.module.scss';

export default class ExerciseView extends React.Component {
	constructor(props) {
		super(props);
		this.handleExerciseClick = this.handleExerciseClick.bind(this);

	}
	handleExerciseClick(idx) {
		const {
			topState,
			routineName,
			exerciseIndex,
			updateTopState,
			setView,
			updateExercise
		} = this.props;
		updateExercise(idx);
		let newState = topState;
		newState.routines[routineName][exerciseIndex] = idx;
		updateTopState(newState);
		setView('set')
	}
	render() {
		const {
			activeRoutine,
			setView,
			updateTopState
		} = this.props;

		return(
			<div class={s.exerciseView}>
			{activeRoutine.map((exercise, idx) => {
				return(
					<button class={s.item} onClick={() => this.handleExerciseClick(idx)}>
						{exercise.name}
					</button>
				)
			})}
			</div>
		)
	}
}
