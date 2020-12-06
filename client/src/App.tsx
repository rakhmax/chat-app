import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import LoginPage from './pages/Login';
import MessagesPage from './pages/Messages';
import socket from './socket';

import AppContext from './context';
import getCurrentRoom from './helpers/getCurrentRoom';
import getUser from './helpers/getUser';

const App: FC = () => {
  const [user, setUser] = useState(getUser());
  const [room, setRoom] = useState(getCurrentRoom());

  const onUnload = useCallback(() => {
    socket.emit('leave', { room });
  }, [room]);

  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);
  }, [onUnload]);

  useEffect(() => () => {
    window.removeEventListener('beforeunload', onUnload);
  });

  return (
    <AppContext.Provider value={{
      user: { ...user, set: setUser },
      currentRoom: { ...room, set: setRoom },
    }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            {user.name ? <Redirect to="/messages" /> : <LoginPage />}
          </Route>
          <Route path="/messages">
            {!user.name ? <Redirect to="/" /> : <MessagesPage />}
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
