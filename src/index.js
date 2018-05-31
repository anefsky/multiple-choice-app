import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import appReducer from './components/reducer';

var store = createStore( appReducer );

store.subscribe(showState);

function showState() {
	console.log(store.getState());
}

ReactDOM.render(
	<Provider store = { store }>
		<App />
	</Provider>, 
	document.getElementById('root')
);
