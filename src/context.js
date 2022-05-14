import React, { createContext, useReducer } from 'react';

import data from './defaultData.js';
import { updateLocalStorage } from './utils/updateLocalStorage.js';

import { reducer } from './reducer';

let baseData = window.localStorage.getItem('lastSetWTF');
if (baseData === null) {
	updateLocalStorage(data);
} else {
	baseData = JSON.parse(baseData);
}

export const initialState = {
	workouts: baseData,
	activeWorkoutIdx: null,
	activeExerciseIdx: null,
	user: undefined,
	menuOpen: false,
};

const store = createContext();
const { Provider } = store;

const StateProvider = ({ children, initialState }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = { state, dispatch };
	return <Provider value={value}>{children}</Provider>;
};

export { StateProvider, store };
