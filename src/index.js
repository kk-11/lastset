import React from 'react';
import ReactDOM from 'react-dom';

import { StateProvider } from './context';
import App from './App';

import './reset.css';
import './index.css';

ReactDOM.render(
	<StateProvider>
		<App />
	</StateProvider>,
	document.getElementById('root')
);
