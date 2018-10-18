import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'

const basePath = "/cloud";
const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter basename={basePath}>
        <Route render={(props)=>
            <App {...props} baseroute={basePath}/>
        }/>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
