import React from 'react';
// import clnms from 'classnames';
import s from './reps.module.scss';

export default class Reps extends React.Component {
	constructor(props) {
		super(props);
		this.decrease = this.bump.bind(this, -1);
		this.increase = this.bump.bind(this, +1);
	}

	bump(vl) {
		this.props.updateReps(this.props.reps + vl);
	}

	render() {
		return(
			<div className={s.container}>
				<button className={s.btn} onClick={this.decrease}>-</button>
				<p className={s.reps}>{this.props.reps}</p>
				<button className={s.btn} onClick={this.increase}>+</button>
			</div>
		)
	}
}
