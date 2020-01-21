import React from 'react';
import clnms from 'classnames';
import Routine from './components/routine/routine.js';
import s from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.openRoutine = this.openRoutine.bind(this);
		this.updateFullState = this.updateFullState.bind(this);
		this.state = {
			routine: null,
			fullData: props.data
		}
	}

	updateFullState(newState) {
		this.setState({
			fullData: newState
		});
	}

	openRoutine(routine) {
		this.setState({
			routine: routine
		});
	}

	render() {
		const routines = this.props.data.routines;
		const routinesArr = Object.keys(routines);
		return (
		  <div className={clnms(s.wrapper)}>
			{!this.state.routine ? (
				routinesArr.map((key, idx) => {
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
					fullData={this.state.fullData}
					updateFullState={this.updateFullState}
					updateStorage={this.props.updateStorage}
					routine={routines[this.state.routine]}
					name={this.state.routine}
				/>
			)}
		  </div>
		);
	}
}
