import loadable from '@loadable/component';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './components/Error';
import styled from 'styled-components';

// Routes
const Portal = loadable(() => import('./views/Portal'));
const Dashboard = loadable(() => import('./views/Dashboard'));

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FourOhFour = () => (
  <Container>
    <Error message={'This page could not be found'} />
  </Container>
);

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Switch>
            <Route path="/" exact={true} component={Portal} />
            <Route path="/portal" component={Portal} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
