import React from 'react';

import Set from './components/set/set.js';
import Reps from './components/reps/reps.js';
import Weight from './components/weight/weight.js';
import Exercise from './components/exercise/exercise.js';
import Routines from './components/routines/routines.js';

import { swipedetect } from './utils/utils.js';

import s from './App.module.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.setSet = this.setSet.bind(this);
		this.updateSet = this.updateSet.bind(this);
		this.updateData = this.updateData.bind(this);
		this.setRoutine = this.setRoutine.bind(this);
		this.updateReps = this.updateReps.bind(this);
		this.getExercise = this.getExercise.bind(this);
		this.handleSwipe = this.handleSwipe.bind(this);
		this.state = {
			set: 0,
			routine: "home", // null,
			count: 0,
			exerciseIdx: 0,
			view: 'routines',
			data: props.data
		}
	}

	componentDidMount() {
		swipedetect(window, this.handleSwipe);
	}

	handleSwipe(dir) {
		const exercise = this.getExercise(this.state.data.routines, this.state.routine) || [];
		const currentExercise = exercise[this.state.exerciseIdx];
		switch (dir) {
			case 'left':
				this.updateSet(currentExercise);
				break;
			case 'left':
				console.log('swiped right');
				break;

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

	updateSet(currentExercise) {
		const timer = setInterval(
			() => {
				this.setState({
					count: this.state.count + 1
				})
			}, 1000);
		let nextSet = this.state.set + 1;
		if(nextSet <= currentExercise.sets - 1) {
			this.setSet(nextSet);
		} else {
			this.setSet(0);
			this.setState({ exerciseIdx: this.state.exerciseIdx + 1 })
		}
	}

	updateReps(value) {
		console.log(value);
	}

	render() {
		const {
			data,
			routine,
			exerciseIdx,
			set,
			count
		} = this.state;

		const exercise = this.getExercise(data.routines, routine) || [];
		const currentExercise = exercise[exerciseIdx];

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
							<div className={s.timer}>{count}</div>
							<Set set={set} sets={currentExercise.sets} setSet={this.setSet} />
							<Exercise exercise={currentExercise.name} />
							<Weight weight={currentExercise.weight} unit={currentExercise.unit} />
							<Reps reps={currentExercise.reps} bump={this.updateReps}/>
						</div>
					)
				}
			</div>
		);
	}
}
