import React from 'react';
import clnms from 'classnames';
import Reps from './../reps/reps.js';
import s from './exercise.module.css';

export default class Exercise extends React.Component {
	constructor(props) {
		super(props);
		this.reset = this.reset.bind(this);
		//move all this shit to utils ??
		this.incrementSet = this.incrementSet.bind(this);
		this.convertWeight = this.convertWeight.bind(this);
		this.decreaseReps = this.decreaseReps.bind(this);
		this.increaseReps = this.increaseReps.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.decreaseWeight = this.decreaseWeight.bind(this);
		this.increaseWeight = this.increaseWeight.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	//---
	handleSubmit(evt) {
		evt.preventDefault();
		// this.props.updateFullState(target, this.state.name)
	}
	handleChange(evt) {
		this.setState({name: evt.target.value});
	}

	increaseWeight() {
		this.setState({
			weight: this.state.weight + this.minimumIncrement
		})
	}
	decreaseWeight() {
		this.setState({
			weight: this.state.weight - this.minimumIncrement
		})
	}
	increaseReps() {
		this.setState({
			reps: this.state.reps + 1
		})
	}
	decreaseReps() {
		this.setState({
			reps: this.state.reps - 1
		})
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

	convertWeight(evt) {
		evt.preventDefault();
		const weight = this.state.weight;
		let converted;
		if(this.unit === 'kg') {
			converted = weight * 2.205;
			converted = Math.round(converted * 100) / 100
		}

		if(this.unit === 'lbs') {
			converted = weight / 2.205;
		}
		this.setState({
			weight: converted,
			unit: this.unit === 'kg' ? 'lbs' : 'kg'
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
	render() {
		const {
			exercise = '',
			updateStorage,
			fullData
		} = this.props;
		const showUnitClass = (this.state.unit !== (null || 's')) ? s.show : s.hide;

		let repsOrS = this.state.reps > 20 ? 's' : 'reps';
		return (
			<div className={clnms(s.wrapper, this.state.notify && s.alert)}>
				<div className={s.container}>
					<p className={s.set}>{this.state.set + 1}</p>
					<p className={s.unit}>set</p>
				</div>
				<form onSubmit={this.handleSubmit}>
					<textarea
						className={s.exercise}
						onChange={this.handleChange}
						value={this.state.name}
					/>
				</form>
				<div className={clnms(s.container, showUnitClass)}>
					<button className={s.btn} onClick={this.decreaseWeight}>-</button>
					<p
						className={s.weight}
						onMouseEnter={this.convertWeight}
						onMouseLeave={this.reset}
					>
						{this.state.weight}
					</p>
					<p
						className={s.unit}
					>
						{this.state.unit}
					</p>
					<button className={s.btn} onClick={this.increaseWeight}>+</button>
				</div>
				<Reps reps={this.props.exercise.sets[this.state.set] && this.props.exercise.sets[this.state.set].reps}/>
				<button class={s.log} onClick={(evt) => this.handleUpdate(evt)}>Log</button>
			</div>
		);
	}
}
