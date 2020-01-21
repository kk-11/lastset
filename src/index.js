import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import data from './defaultData.js';
import * as serviceWorker from './serviceWorker';

let baseData = window.localStorage.getItem('lastSetWTF');

//also check session storage??
if (baseData === null) {
	updateLocalStorage(data);
} else {
	baseData = JSON.parse(baseData);
}

function updateLocalStorage(newData) {
	const stringified = JSON.stringify(newData)
	window.localStorage.setItem('lastSetWTF', stringified);
}

ReactDOM.render(
	<App
		data={baseData || data}
		updateStorage={updateLocalStorage} />, document.getElementById('root')
	);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
