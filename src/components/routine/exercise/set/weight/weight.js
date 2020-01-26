import React from 'react';
import clnms from 'classnames';
import s from './weight.module.scss';

export default class Weight extends React.Component {
	constructor(props) {
		super(props);
		this.bump = this.bump.bind(this);
		this.convertWeight = this.convertWeight.bind(this);
		this.state = {
			weight: null,
			unit: null,
			converted: null
		}
	}
	componentDidMount() {
		this.setState({
			weight: this.props.weight,
			unit: this.props.unit,
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.props.exercise !== prevProps.exercise) {
			this.setState({
				weight: this.props.weight,
				unit: this.props.unit
			});
		}
	}

	convertWeight(evt) {
		evt.preventDefault();
		const weight = this.state.weight;
		let converted;
		if(this.state.unit === 'kg') {
			converted = weight * 2.205;
			converted = Math.round(converted * 100) / 100
		}

		if(this.state.unit === 'lbs') {
			converted = weight / 2.205;
		}
		this.setState({
			weight: converted,
			unit: this.state.unit === 'kg' ? 'lbs' : 'kg'
		});
	}

	bump(vl) {
		const {
			topState,
			activeSet,
			routineName,
			exerciseIndex,
			setIndex,
			updateTopState
		} = this.props;

		let newState = topState;
		console.log(vl)
		newState.routines[routineName][exerciseIndex].sets[setIndex].weight = this.state.weight + vl;
		updateTopState(newState);
		this.setState({
			weight: this.state.weight + vl
		});

		const showWeight = this.convert ? this.state.weight : this.state.converted;

	}

	render() {
		const unitClass = this.state.unit === 'kg' ? s.kg : s.lbs;
		const minimumIncrement = this.props.unit === 'kg' ? 1.25 : 2.5;
		return(
			<div className={s.container}>
				<button className={s.btn} onClick={() => this.bump(-minimumIncrement)}>-</button>
				<p
					onClick={this.convertWeight}
					className={s.weight}
				>
					{Math.ceil(this.state.weight / minimumIncrement) * minimumIncrement}
				</p>
				<p
					className={clnms(s.unit, unitClass)}
				>
					{this.state.unit}
				</p>
				<button className={s.btn} onClick={() => this.bump(+minimumIncrement)}>+</button>
			</div>
		)
	}
}
