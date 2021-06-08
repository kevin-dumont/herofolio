import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Profile from '@/containers/Profile';
import About from '@/components/About';
import GlobalStyles from '@/components/Design/GlobalStyles';
import Skills from '@/containers/Skills';
import { store } from '@/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyles />

      <About />

      <Switch>
        <Route path="/" exact>
          <Profile />
        </Route>
        <Route path="/skills" exact>
          <Skills />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
