import React from 'react';
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
		this.state = {
			set: 0,
			weight: 0,
			reps: 1,
			unit: ''
		}
	}
	//--- LIFE
	componentDidMount() {
		this.sets = this.props.exercise.sets.length;
		console.log(this.sets, 'num sets')
		this.unit = this.props.exercise.sets[this.state.set].unit;

		this.minimumIncrement = this.unit === 'kg' ? 1.25 : 1.25;

		this.setState({
			weight: this.props.exercise.sets[this.state.set].weight,
			reps: this.props.exercise.sets[this.state.set].reps,
			name: this.props.exercise.name,
			unit: this.props.exercise.sets[this.state.set].unit
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.exercise.name !== prevProps.exercise.name) {
			this.setState({
				weight: this.props.exercise.sets[this.state.set].weight,
				reps: this.props.exercise.sets[this.state.set].reps,
				name: this.props.exercise.name,
				unit: this.props.exercise.sets[this.state.set].unit
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

	incrementSet(evt) {
		evt.preventDefault();
		if (this.state.set === this.sets - 1) {
			this.reset();
			this.props.nextExercise();
			return;
		}
		this.setState({
			set: this.state.set + 1,
			weight: this.state.weight + 1
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
		console.log(this.props.exercise.sets, this.state.set)
		this.setState({
			set: 0,
			weight: this.props.exercise.sets[this.state.set].weight,
			reps: this.props.exercise.sets[this.state.set].reps,
			name: this.props.exercise.name
		});
	}

	render() {
		const {
			exercise = '',
			updateStorage,
			fullData
		} = this.props;

		return (
			<div className={s.wrapper}>
				<p className={s.set}>{this.state.set + 1}</p>
				<form onSubmit={this.handleSubmit}>
					<input
						className={s.exercise}
						onChange={this.handleChange}
						value={this.state.name}
					/>
				</form>
				<div className={s.container}>
					<button onClick={this.decreaseWeight}>-</button>
					<p
						className={s.weight}
						onMouseEnter={this.convertWeight}
						onMouseLeave={this.reset}
					>
						{`${this.state.weight} ${this.state.unit}`}
					</p>
					<button onClick={this.increaseWeight}>+</button>
				</div>
				<div className={s.container}>
					<button onClick={this.decreaseReps}>-</button>
					<p className={s.reps}>{this.state.reps}</p>
					<button onClick={this.increaseReps}>+</button>
				</div>
				<button onClick={this.incrementSet}>Update</button>
			</div>
		);
	}
}
