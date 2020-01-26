import React from 'react';
import s from './menu.module.scss';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.props.toggleMenu();
	}


	render() {
		const menuClass = this.props.active && s.active;
		return (
			<div className={`${s.menu} ${menuClass}`} onClick={this.toggleMenu}>
			</div>
		);
	}
}
