import React from 'react';
import s from './exercise.module.scss';

export default function Exercise({ exercise }) {
	return (
		<div className={s.exercise}>
			{exercise}
		</div>
	);
}

// <form class={s.form} onSubmit={this.handleSubmit}>
// <textarea
// className={s.name}
// onChange={this.handleRename}
// value={this.state.name}
// />
// </form>
