import React from 'react';
import clnms from 'classnames';
import s from './reps.module.css';

export default class Reps extends React.Component {
	constructor(props) {
		super(props);
		this.decrease = this.bump.bind(this, -1);
		this.increase = this.bump.bind(this, +1);
		this.state = {
			reps: 0
		}
	}
	componentDidMount() {
		this.setState({
			reps: this.props.reps
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.props.exercise !== prevProps.exercise) {
			this.setState({
				reps: this.props.reps
			});
		}
	}

	bump(vl) {
		const {
			topState,
			activeRoutine,
			activeExercise,
			activeSet,
			routineName,
			exerciseIndex
		} = this.props;

		let newState = topState;
		newState.routines[routineName][exerciseIndex].sets[activeSet].reps = this.state.reps;
		this.props.updateTopState(newState);
		
		this.setState({
			reps: this.state.reps + vl
		});
	}

	render() {
		return(
			<div className={s.container}>
				<button className={s.btn} onClick={this.decrease}>-</button>
				<p className={s.reps}>{this.state.reps}</p>
				<p
					className={clnms(s.unit)}
				>
					reps
				</p>
				<button className={s.btn} onClick={this.increase}>+</button>
			</div>
		)
	}
}
