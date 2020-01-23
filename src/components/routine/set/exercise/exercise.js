import React from 'react';
import clnms from 'classnames';
import s from './exercise.module.css';

export default class Exercise extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			exercise: ''
		}
	}

	componentDidMount() {
		this.setState({
			exercise: this.props.exercise
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.exercise !== prevProps.exercise) {
			this.setState({
				exercise: this.props.exercise
			});
		}
	}
	handleSubmit(evt) {
		evt.preventDefault();
		// this.props.updateFullState(target, this.state.exercise)
	}
	handleChange(evt) {
		this.setState({exercise: evt.target.value});
	}
	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<textarea
					className={s.exercise}
					onChange={this.handleChange}
					value={this.state.exercise}
				/>
			</form>
		)
	}
}
