import React from 'react';
import ReactDOM from 'react-dom';

import { StateProvider, initialState } from './context';
import App from './App';

import './reset.css';
import './index.css';

ReactDOM.render(
	<StateProvider initialState={initialState}>
		<App />
	</StateProvider>,
	document.getElementById('root')
);
