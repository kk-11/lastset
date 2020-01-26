import React from 'react';
import clnms from 'classnames';
import Reps from './reps/reps.js';
import Weight from './weight/weight.js';
import s from './set.module.scss';

export default class Set extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeSet: 0
		}
	}
	render() {
		const {
			set,
			activeSet,
			updateTopState,
			topState,
			routineName,
			exerciseIndex
		} = this.props;

		const {
			weight,
			unit,
			reps
		} = set;

		return(
			<div class={s.set}>
				<h2 class={s.index}>{activeSet + 1}</h2>
				{weight &&
					<Weight
						exerciseIndex={exerciseIndex}
						routineName={routineName}
						activeSet={activeSet}
						topState={topState}
						updateTopState={updateTopState}
						weight={weight}
						unit={unit}
					/>
				}
				{reps &&
					<Reps
						exerciseIndex={exerciseIndex}
						activeSet={activeSet}
						routineName={routineName}
						topState={topState}
						updateTopState={updateTopState}
						reps={reps}
						unit={unit}
					/>
				}
			</div>
		)
	}
}
