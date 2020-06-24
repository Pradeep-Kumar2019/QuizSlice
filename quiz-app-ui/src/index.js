import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Notfound from './components/Notfound'
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Quiz from './components/Quiz'
import Result from './components/Result'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'


const routing = (
  <Router>
    <div>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/quiz" component={Quiz}/>
      <Route path="/result" component={Result}/>
      <Route component={Notfound} />
    </Switch>
   </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
