import React from 'react';
import clnms from 'classnames';
import Routine from './components/routine/routine.js';
import Menu from './components/shared/menu/menu.js';
import Header from './components/shared/header/header.js';
import swipedetect from './utils/utils.js';
import ExerciseView from './components/shared/exerciseView/exerciseView.js';
import s from './App.module.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.openRoutine = this.openRoutine.bind(this);
		this.updateTopState = this.updateTopState.bind(this);
		this.activeView = this.activeView.bind(this);
		this.nextExercise = this.nextExercise.bind(this);
		this.updateExercise = this.updateExercise.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleSwipe = this.handleSwipe.bind(this);
		this.setView = this.setView.bind(this);
		this.state = {
			activeRoutine: null,
			topState: props.data,
			menuActive: false,
			activeView: '',
			exerciseIndex: 0,
			routineName: ''
		}
	}
	componentDidMount() {
		window.addEventListener('touchmove', this.handleTouchMove)
		console.log(window.innerHeight)
		swipedetect(window, this.handleSwipe);
	}
	componentWillUnmount() {
		window.removeEventListener('touchmove', this.handleTouchMove)
	}
	handleTouchMove(evt) {
		evt.preventDefault();
	}

	handleSwipe(direction) {
		console.log(direction)
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
			activeView: 'set',
			menuActive: false
		});
	}
	updateExercise(idx) {
		this.setState({
			exerciseIndex: idx
		})
	}

	nextExercise() {
		const {
			topState,
			activeRoutine,
			routineName,
			exerciseIndex
		} = this.state;

		this.setState({
			exerciseIndex: exerciseIndex + 1
		});
		if (exerciseIndex === topState.routines[activeRoutine].length - 1) {
			//start over?
			//back to home screen?
			//
			this.setState({
				exerciseIndex: 0
			});
		}

	}
	setView(view) {
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
			exerciseIndex,
			activeView,
			routineName
		} = this.state;


		switch (activeView) {
			case 'exercises':
				return <ExerciseView
					activeRoutine={topState.routines[activeRoutine]}
					setView={this.setView}
					topState={topState}
					updateTopState={this.updateTopState}
					updateExercise={this.updateExercise}
					activeExercise={topState.routines[activeRoutine][exerciseIndex]}
					routineName={activeRoutine}
				/>;
				break;
			case 'set':
				const set = <Routine
					menuActive={menuActive}
					exerciseIndex={exerciseIndex}
					routineName={activeRoutine}
					activeRoutine={topState.routines[activeRoutine]}
					topState={topState}
					updateTopState={this.updateTopState}
					updateStorage={this.props.updateStorage}
					activeExercise={topState.routines[activeRoutine][exerciseIndex]}
					nextExercise={this.nextExercise}
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
				<Header
					active={menuActive}
					setView={this.setView}
					activeView={activeView}
					routineView={this.openRoutine}
				/>
				{ !activeRoutine ? (
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
