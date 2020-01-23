import React from 'react';
import clnms from 'classnames';
import Reps from './reps/reps.js';
import Weight from './weight/weight.js';
import Exercise from './exercise/exercise.js';
import s from './set.module.css';

export default class Set extends React.Component {
	constructor(props) {
		super(props);
		this.reset = this.reset.bind(this);
		this.incrementSet = this.incrementSet.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.timesUp = this.timesUp.bind(this);

		this.state = {
			set: 0,
			weight: null,
			reps: 1,
			unit: '',
			notify: false,
		}
	}
	//--- LIFE
	componentDidMount() {
		this.unit = this.props.exercise.sets[this.state.set].unit;

		this.minimumIncrement = this.unit === 'kg' ? 1.25 : 1.25;

		this.setState({
			weight: this.props.exercise.sets[this.state.set].weight,
			reps: this.props.exercise.sets[this.state.set].reps,
			name: this.props.exercise.name,
			unit: this.props.exercise.sets[this.state.set].unit,
			sets: this.props.activeSets
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.exercise.name !== prevProps.exercise.name) {
			this.setState({
				weight: this.props.exercise.sets[this.state.set].weight,
				reps: this.props.exercise.sets[this.state.set].reps,
				name: this.props.exercise.name,
				unit: this.props.exercise.sets[this.state.set].unit,
				sets: this.props.activeSets
			});
		}
	}

	incrementSet() {
		if (this.state.set === this.state.sets - 1) {
			this.reset();
			this.props.nextExercise();
			return;
		}

		this.setState({
			set: this.state.set + 1,
			weight: this.props.exercise.sets[this.state.set] && this.props.exercise.sets[this.state.set].weight
		});
	}

	reset() {
		console.log(this.props.exercise.sets)
		this.setState({
			set: 0,
			weight: this.props.exercise.sets[this.state.set] && this.props.exercise.sets[this.state.set].weight,
			reps: this.props.exercise.sets[this.state.set] && this.props.exercise.sets[this.state.set].reps,
			name: this.props.exercise.name
		});
	}

	handleUpdate(evt) {
		clearTimeout(this.timer);
		this.setState({
			notify: false
		});
		evt.preventDefault();
		this.timer = setTimeout(this.timesUp, 60000);
		this.incrementSet();
	}

	timesUp() {
		clearTimeout(this.timer);
		this.setState({
			notify: true
		});
	}
	render(props) {
		const {
			exercise = '',
			updateStorage,
			fullData
		} = this.props;

		const {
			sets,
			name
		} = exercise;

		let repsOrS = this.state.reps > 20 ? 's' : 'reps';
		return (
			<div className={clnms(s.wrapper, this.state.notify && s.alert)}>
				<div className={s.container}>
					<p className={s.set}>{this.state.set + 1}</p>
					<p className={s.unit}>set</p>
				</div>
				<Exercise
					exercise={name}
				/>
				<Weight
					exercise={name}
					weight={sets[this.state.set] && sets[this.state.set].weight}
				/>
				<Reps
					exercise={name}
					reps={sets[this.state.set] && sets[this.state.set].reps}
				/>
				<button class={s.log} onClick={(evt) => this.handleUpdate(evt)}>Log</button>
			</div>
		);
	}
}
