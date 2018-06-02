import React from 'react';
import ReactDOM from 'react-dom';
import { 
  HashRouter as Router,
  Route
} from 'react-router-dom';

import Home from './views/Home';

const Main = function() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('app'));