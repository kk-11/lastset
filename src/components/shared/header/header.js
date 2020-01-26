import React from 'react';

import s from './header.module.scss';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	toggleMenu() {

		this.setState({
			active: !this.state.active
		});
	}


	render() {
		const headerClass = this.props.active && s.active;

		return (
			<div className={`${s.header} ${headerClass}`}>
				<ul>
					<li>Close</li>
				</ul>
			</div>
		);
	}
}
