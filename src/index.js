import React from 'react';
import ReactDOM from 'react-dom';

import { StateProvider } from './store';
import App from './App';

import './index.css';

// function updateLocalStorage(newData) {
// 	const stringified = JSON.stringify(newData);
// 	window.localStorage.setItem('lastSetWTF', stringified);
// }
//
// let baseData = window.localStorage.getItem('lastSetWTF');
// if (baseData === null) {
// 	updateLocalStorage(data);
// } else {
// 	baseData = JSON.parse(baseData);
// }

ReactDOM.render(
	<StateProvider>
		<App />
	</StateProvider>,
	document.getElementById('root')
);
