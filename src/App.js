import React from 'react';
import clnms from 'classnames';
import Routine from './components/routine/routine.js';
import Menu from './components/shared/menu/menu.js';
import Header from './components/shared/header/header.js';
import ExerciseView from './components/shared/exerciseView/exerciseView.js';
import s from './App.module.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.openRoutine = this.openRoutine.bind(this);
		this.updateTopState = this.updateTopState.bind(this);
		this.activeView = this.activeView.bind(this);
		this.setView = this.setView.bind(this);
		this.state = {
			activeRoutine: null,
			topState: props.data,
			menuActive: false,
			activeView: ''
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
			activeRoutine: routine,
			activeView: 'set'
		});
	}
	setView (view) {
		this.setState({
			menuActive: false,
			activeView: view
		});
	}

	activeView() {
		const {
			topState,
			menuActive,
			activeRoutine,
			activeView
		} = this.state;


		switch (activeView) {
			case 'exercises':
				return <ExerciseView />;
				break;
			case 'set':
				const set = <Routine
					menuActive={menuActive}
					routineName={activeRoutine}
					activeRoutine={topState.routines[activeRoutine]}
					topState={topState}
					updateTopState={this.updateTopState}
					updateStorage={this.props.updateStorage}
				/>
				return set;
				break;

		}
	}

	render() {
		const {
			topState,
			activeView,
			menuActive,
			activeRoutine
		} = this.state;

		return (
			<div className={s.wrapper}>
				<Menu active={menuActive} toggleMenu={this.toggleMenu}/>
				<Header active={menuActive} setView={this.setView} activeView={activeView}/>
				{ !this.state.activeRoutine ? (
					Object.keys(topState.routines).map((key, idx) => {
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
					this.activeView()
				)
				}
			</div>
		);
	}
}
