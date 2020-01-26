import React from 'react';
import s from './exerciseView.module.scss';

export default class ExerciseView extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		console.log('here')
		return(
			<div class={s.exerciseView}>
			beans
			</div>
		)
	}
}
