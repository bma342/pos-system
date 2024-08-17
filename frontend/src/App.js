import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Orders from './components/Orders';
import RoleManagement from './components/RoleManagement';
import Login from './components/Login';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {user ? (
          <>
            <Route path="/orders" component={Orders} />
            <Route path="/roles" component={RoleManagement} />
            <Redirect from="/" to="/orders" />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
