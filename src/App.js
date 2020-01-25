import React from 'react';
import clnms from 'classnames';
import Routine from './components/routine/routine.js';
import s from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.openRoutine = this.openRoutine.bind(this);
		this.updateTopState = this.updateTopState.bind(this);
		this.state = {
			activeRoutine: null,
			topState: props.data
		}
	}

	updateTopState(newState) {
		this.setState({
			topState: newState
		});
	}



	openRoutine(routine) {
		this.setState({
			activeRoutine: routine
		});
	}

	render() {
		const routines = this.state.topState.routines;
		console.log('fdjkal', routines, this.state)
		return (
			<div className={s.wrapper}>
				{!this.state.activeRoutine ? (
					Object.keys(routines).map((key, idx) => {
						return(
							<div
								className={`${s.routine} ${s[key]}`}
								onClick={() => this.openRoutine(key)}
								key={key}
							>
								{key}
							</div>
						);
					})
				) : (
					<Routine
						routineName={this.state.activeRoutine}
						activeRoutine={routines[this.state.activeRoutine]}
						topState={this.state.topState}
						updateTopState={this.updateTopState}
						updateStorage={this.props.updateStorage}
					/>
				)}
			</div>
		);
	}
}
