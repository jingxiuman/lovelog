import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router, IndexRoute } from 'react-router'
import Root from './Root';
import OwnList from './page/ownList/index';

import Detail from './page/detail/index'

import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Root}>
            <IndexRoute component={OwnList} />
            <Route path="/detail/:id" component={Detail} />
        </Route>
    </Router>,
    document.getElementById('root'));