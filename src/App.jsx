// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

const content = document.getElementById('contents')
import IssueList from './components/IssueList.jsx';

const Home = () => <div><h1>Home</h1></div>

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const RoutedApp = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/issues">IssueList</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>
            <hr/>
            <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route path="/home" exact component={Home}/>
                <Route path="/issues" component={IssueList}/>
                <Route path="/topics" component={Topics}/>
                <Route path="*" exact render={() => <h3>No match</h3>}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(<RoutedApp />, content)

if (module.hot) {
    module.hot.accept();
}
