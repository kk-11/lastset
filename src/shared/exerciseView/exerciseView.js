import React from 'react';
import s from './exerciseView.module.scss';

export default class ExerciseView extends React.Component {
	constructor(props) {
		super(props);
		this.handleExerciseClick = this.handleExerciseClick.bind(this);
		this.handleDrag = this.handleDrag.bind(this);

	}
	handleDrag(ev) {
		console.log('drag')
		ev.dataTransfer.setData("text", ev.target.id);
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
					<div class={s.wrapper} draggable="true" onDragStart={this.handleDrag}>
						<div class={s.move}>move</div>
							<button class={s.item} onClick={() => this.handleExerciseClick(idx)}>
								{exercise.name}
							</button>
						<div class={s.delete}>delete</div>
					</div>
				)
			})}
			</div>
		)
	}
}
