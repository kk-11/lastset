import React from 'react';
import clnms from 'classnames';
import Routine from './components/routine/routine.js';
import Menu from './components/shared/menu/menu.js';
import Header from './components/shared/header/header.js';
import s from './App.module.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.openRoutine = this.openRoutine.bind(this);
		this.updateTopState = this.updateTopState.bind(this);
		this.state = {
			activeRoutine: null,
			topState: props.data,
			menuActive: false,
		}
	}

	updateTopState(newState) {
		this.props.updateLocalStorage(newState);
		this.setState({
			topState: newState
		});
	}

	toggleMenu() {
		this.setState({
			menuActive: !this.state.menuActive
		});
	}
	openRoutine(routine) {
		this.setState({
			activeRoutine: routine
		});
	}

	render() {
		const {
			topState,
			menuActive,
			activeRoutine
		} = this.state;
		const routines = topState.routines;
		console.log(activeRoutine)
		return (
			<div className={s.wrapper}>
				<Menu active={menuActive} toggleMenu={this.toggleMenu}/>
				<Header active={menuActive} />
				{!activeRoutine ? (
					Object.keys(routines).map((key, idx) => {
						return(
							<div
								className={`${s.routine} ${s[key]} ${menuActive ? s.blur : ''}`}
								onClick={() => this.openRoutine(key)}
								key={key}
							>
								{key}
							</div>
						);
					})
				) : (
					<Routine
						menuActive={menuActive}
						routineName={activeRoutine}
						activeRoutine={routines[activeRoutine]}
						topState={this.state.topState}
						updateTopState={this.updateTopState}
						updateStorage={this.props.updateStorage}
					/>
				)}
			</div>
		);
	}
}
