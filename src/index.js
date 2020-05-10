import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import data from './defaultData.js';
import * as serviceWorker from './serviceWorker';

function updateLocalStorage(newData) {
	const stringified = JSON.stringify(newData)
	window.localStorage.setItem('lastSetWTF', stringified);
}

let baseData = window.localStorage.getItem('lastSetWTF');
if (baseData === null) {
	updateLocalStorage(data);
} else {
	baseData = JSON.parse(baseData);
}

ReactDOM.render(
	<App
		data={baseData || data}
		updateLocalStorage={updateLocalStorage} />, document.getElementById('root')
	);

serviceWorker.unregister();
