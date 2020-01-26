import React from 'react';
import clnms from 'classnames';
import Set from './set/set.js';
import s from './exercise.module.scss';

export default class Exercise extends React.Component {
	constructor(props) {
		super(props);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleRename = this.handleRename.bind(this);
		this.incrementSet = this.incrementSet.bind(this);
		this.timesUp = this.timesUp.bind(this);
		this.checkToNotify = this.checkToNotify.bind(this);

		this.state = {
			name: '',
			setIndex: 0,
			set: {},
			notify: false
		}
	}

	checkToNotify() {
		const timeStart = window.localStorage.getItem('kk11timer') || -1;
		const timeEnd = new Date().getMinutes();
		if (timeStart > timeEnd) {
			this.setState({
				notify: true
			});
		}
	}
	componentDidMount() {
		this.checkToNotify();
		setInterval(this.checkToNotify, 1000);
		const {
			topState,
			setIndex,
			routineName,
			exerciseIndex,
			updateTopState
		} = this.props;

		let name = topState.routines[routineName][exerciseIndex].name;
		this.setState({
			name: name
		});
	}

	componentDidUpdate(nextProps) {
		const {
			topState,
			activeSet,
			routineName,
			exerciseIndex,
			updateTopState
		} = this.props;

		// if(name.topState.routines[routineName][exerciseIndex] !== nextProps.topState.routines) {
		// 	this.setState({
		// 		name: nextProps.activeExercise.name,
		// 		setIndex: 0
		// 	});
		// }
	}

	handleUpdate(evt) {
		evt.preventDefault();
		clearTimeout(this.timer);
		this.setState({
			notify: false
		});
		this.timer = setTimeout(this.timesUp, 60000);
		const timeStart = new Date().getMinutes();
		window.localStorage.setItem('kk11timer', timeStart)

		this.incrementSet();
	}

	timesUp() {
		clearTimeout(this.timer);
		this.setState({
			notify: true
		});
	}

	handleRename(evt) {
		const {
			topState,
			setIndex,
			routineName,
			exerciseIndex,
			updateTopState
		} = this.props;

		let newState = topState;
		newState.routines[routineName][exerciseIndex].name = evt.target.value;
		updateTopState(newState);
		this.setState({
			name: evt.target.value
		});
	}

	incrementSet() {

		if (this.state.setIndex === this.props.activeExercise.sets.length - 1) {
			this.props.nextExercise();
		} else {
			this.setState({
				setIndex: this.state.setIndex + 1
			})
		}
	}

	render() {
		const {
			activeExercise,
			topState,
			updateTopState,
			routineName,
			exerciseIndex
		}= this.props;
		 console.log(exerciseIndex);

		const isSeconds = topState.routines[routineName][exerciseIndex].sets[this.state.setIndex].reps > 20;
		const nextStart = isSeconds ? 'START' : 'NEXT';

		return (
			<div className={clnms(s.exercise, this.state.notify && s.alert)}>
				<form class={s.form} onSubmit={this.handleSubmit}>
					<textarea
						className={s.name}
						onChange={this.handleRename}
						value={this.state.name}
					/>
				</form>
				{topState.routines[routineName][exerciseIndex].sets.map((set, idx) => {
					if (idx === this.state.setIndex) {
						return(
							<Set
								exerciseIndex={exerciseIndex}
								routineName={routineName}
								isSeconds={isSeconds}
								topState={topState}
								updateTopState={updateTopState}
								setIndex={this.state.setIndex}
								set={topState.routines[routineName][exerciseIndex].sets[this.state.setIndex]} />
						);
					}
				})}
				<button class={s.log} onClick={(evt) => this.handleUpdate(evt)}>{nextStart}</button>
			</div>
		);
	}
}
