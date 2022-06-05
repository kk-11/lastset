import { useEventListeners } from './hooks/useEventListeners';

import Burger from './components/burger/burger';
import Workouts from './components/workouts/workouts';
import Menu from './components/menu/menu';
import TestSuite from './components/testSuite/testSuite';

import Timer from './components/timer/timer';
import Login from './components/login/login';

import s from './App.module.scss';

const App = () => {
	useEventListeners();

	// if (!user) return <Login />;
	return (
		<main className={s.wrapper}>
			<TestSuite />
			<Burger />
			<Menu />
			<Workouts />
		</main>
	);
};

export default App;
