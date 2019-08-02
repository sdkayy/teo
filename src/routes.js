import loadable from '@loadable/component';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './components/Error';
import styled from 'styled-components';

// Routes
const Search = loadable(() => import('./views/Search'));
const Tournament = loadable(() => import('./views/Tournament'));

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
            <Route path="/" exact={true} component={Search} />
            <Route path="/tournament/:id" component={Tournament} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
