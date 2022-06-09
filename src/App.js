import { useEventListeners } from './hooks/useEventListeners';

import {
	ActionsBar,
	BackButton,
	Burger,
	Login,
	Menu,
	// TestSuite,
	// Timer,
	Workouts,
} from './components/';

import s from './App.module.scss';

const App = () => {
	useEventListeners();
	return (
		<main className={s.wrapper}>
			{/* <Burger /> */}
			{/* <Menu /> */}
			<BackButton />
			{/* <Login /> */}
			<Workouts />
			{/* <ActionsBar /> */}
			{/* <TestSuite /> */}
		</main>
	);
};

export default App;
