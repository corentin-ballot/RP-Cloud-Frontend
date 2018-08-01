import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

const basePath = "/cloud";

ReactDOM.render(<BrowserRouter basename={basePath}>
    <Route render={(props)=>
        <App {...props} baseroute={basePath}/>
    }/>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
