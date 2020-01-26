import React from 'react';

import s from './header.module.scss';

export default class Header extends React.Component {

	render() {
		const {
			setView,
			active,
			activeView
		} = this.props;

		const headerClass = active && s.active;
		console.log(activeView)
		return (
			<div className={`${s.header} ${headerClass}`}>
				{ activeView === 'set' &&
					<button
						class={s.item}
						onClick={() => setView('exercises')}
					>
						Exercise View
					</button>
				}
				{
					activeView && (
						<button class={s.item}>Back to routines</button>
					)
				}
			</div>
		);
	}
}
