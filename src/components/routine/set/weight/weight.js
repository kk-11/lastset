import React from 'react';
import clnms from 'classnames';
import s from './weight.module.css';

export default class Weight extends React.Component {
	constructor(props) {
		super(props);
		this.minimumIncrement = 1;
		this.decrease = this.bump.bind(this, -this.minimumIncrement);
		this.increase = this.bump.bind(this +this.minimumIncrement);
		this.convertWeight = this.convertWeight.bind(this);
		this.state = {
			weight: null,
			unit: null
		}
	}
	componentDidMount() {
		this.minimumIncrement = this.props.unit === 'kg' ? 1.25 : 1.25;
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
		this.setState({
			weight: this.state.weight + vl
		});
	}

	render() {
		console.log(this.state.weight)
		const showUnitClass = (this.state.unit !== (null || 's')) ? s.show : s.hide;
		return(
			<div className={clnms(s.container, showUnitClass)}>
				<button className={s.btn} onClick={this.decrease}>-</button>
				<p
					className={s.weight}
					onMouseEnter={this.convert}
					onMouseLeave={this.reset}
				>
					{this.state.weight}
				</p>
				<p
					className={s.unit}
				>
					{this.state.unit}
				</p>
				<button className={s.btn} onClick={this.increase}>+</button>
			</div>
		)
	}
}
