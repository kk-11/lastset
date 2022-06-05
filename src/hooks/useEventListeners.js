import { useContext, useEffect } from 'react';
import { store } from '../context';
import { save, setWorkout } from '../constants';

export const useEventListeners = () => {
	const { state, dispatch } = useContext(store);
	const { activeExerciseIdx } = state;
	useEffect(() => {
		// window.addEventListener('beforeunload', () => {
		// 	dispatch({
		// 		type: save,
		// 	});
		// });
		window.addEventListener('keydown', (evt) => {
			switch (evt.key) {
				case 'Escape':
					dispatch({
						type: setWorkout,
						payload: null,
					});
					break;
				default:
					break;
			}
		});
	}, [activeExerciseIdx, dispatch]);
};
