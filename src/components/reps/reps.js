import React from 'react';
import clnms from 'classnames';
import s from './reps.module.scss';

export default class Reps extends React.Component {
	constructor(props) {
		super(props);
		this.decrease = this.props.bump.bind(this, -1);
		this.increase = this.props.bump.bind(this, +1);
	}

	render() {
		const {
			reps
		} = this.props;

		const isSeconds = reps > 20;
		return(
			<div className={s.container}>
				<button className={s.btn} onClick={this.decrease}></button>
				<p className={s.reps}>{reps}</p>
				<p
					className={clnms(s.unit, isSeconds ? s.seconds : s.reps)}
				>
					{isSeconds ? 'seconds' : 'reps'}
				</p>
				<button className={s.btn} onClick={this.increase}></button>
			</div>
		)
	}
}
