import React from 'react';

import Set from './components/set/set.js';
import Reps from './components/reps/reps.js';
import Weight from './components/weight/weight.js';
import Exercise from './components/exercise/exercise.js';
import Routines from './components/routines/routines.js';

import s from './App.module.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.setSet = this.setSet.bind(this);
		this.increment = this.increment.bind(this);
		this.updateData = this.updateData.bind(this);
		this.setRoutine = this.setRoutine.bind(this);
		this.getExercise = this.getExercise.bind(this);
		this.state = {
			set: 0,
			reps: null,
			weight: null,
			routine: "home", // null,
			exerciseIdx: 0,
			view: 'routines',
			data: props.data
		}
	}

	updateData(newData) {
		this.props.updateLocalStorage(newData);
		this.setState({
			data: newData
		});
	}

	setSet(set) { this.setState({set: set}) }
	setRoutine(routine) { this.setState({routine: routine}) }

	getExercise(routines, routine) {
		if (routine === null) return;
		return(routines[routine])
	}

	increment(currentExercise) {
		let nextSet = this.state.set + 1;
		if(nextSet <= currentExercise.sets - 1) {
			this.setSet(nextSet);
		} else {
			this.setSet(0);
			this.setState({ exerciseIdx: this.state.exerciseIdx + 1 })
		}
	}

	render() {
		const {
			data,
			routine,
			exerciseIdx,
			set
		} = this.state;

		const exercise = this.getExercise(data.routines, routine) || [];
		const currentExercise = exercise[exerciseIdx];
		console.log(currentExercise);
		return (
			<div className={s.wrapper}>
				<Routines
					handleClick={this.setRoutine}
					routines={Object.keys(data.routines)}
					active={routine === null}
				/>
				{
					routine !== null && (
						<div className={s.set}>
							<Set set={set} sets={currentExercise.sets} setSet={this.setSet} />
							<Exercise exercise={currentExercise.name} />
							<Weight weight={currentExercise.weight} unit={currentExercise.unit} />
							<Reps reps={currentExercise.reps} />
						</div>
					)
				}
				<button onClick={() => this.increment(currentExercise)}>ENTER</button>
			</div>
		);
	}
}
