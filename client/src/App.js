import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LandingPage } from './containers/LandingPage';
import { Home } from './containers/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
