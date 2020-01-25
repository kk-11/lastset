import React from 'react';
import clnms from 'classnames';
import Set from './set/set.js';
import s from './exercise.module.css';

export default class Exercise extends React.Component {
	constructor(props) {
		super(props);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.incrementSet = this.incrementSet.bind(this);
		this.timesUp = this.timesUp.bind(this);

		this.state = {
			name: '',
			activeSet: 0,
			set: {}
		}
	}

	componentDidMount() {
		this.setState({
			name: this.props.activeExercise.name
		});
	}

	componentDidUpdate(nextProps) {
		if(this.props.activeExercise.name !== nextProps.activeExercise.name) {
			this.setState({
				name: nextProps.activeExercise.name,
				activeSet: 0
			});
		}
	}

	handleUpdate(evt) {
		evt.preventDefault();
		clearTimeout(this.timer);
		this.setState({
			notify: false
		});
		this.timer = setTimeout(this.timesUp, 60000);

		this.incrementSet();
	}

	timesUp() {
		clearTimeout(this.timer);
		this.setState({
			notify: true
		});
	}

	handleChange(evt) {
		this.setState({name: evt.target.value});
	}

	incrementSet() {
		if (this.state.activeSet === this.props.activeExercise.sets.length - 1) {
			this.props.nextExercise();
		} else {
			this.setState({
				activeSet: this.state.activeSet + 1
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


		return (
			<div className={clnms(s.exercise, this.state.notify && s.alert)}>
				<form onSubmit={this.handleSubmit}>
					<textarea
						className={s.name}
						onChange={this.handleChange}
						value={this.state.name}
					/>
				</form>
				{activeExercise.sets.map((set, idx) => {
					if (idx === this.state.activeSet) {
						return(
							<Set
								exerciseIndex={exerciseIndex}
								routineName={routineName}
								topState={topState}
								updateTopState={updateTopState}
								activeSet={this.state.activeSet}
								set={activeExercise.sets[this.state.activeSet]} />
						);
					}
				})}
				<button class={s.log} onClick={(evt) => this.handleUpdate(evt)}>Log</button>
			</div>
		);
	}
}
