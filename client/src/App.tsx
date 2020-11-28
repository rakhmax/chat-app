import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/Login';
import MessagesPage from './pages/Messages';

const App: FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/messages">
        <MessagesPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
