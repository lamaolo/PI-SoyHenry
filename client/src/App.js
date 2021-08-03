import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './containers/LandingPage';
import Home from './containers/Home';
import CountryDetails from './containers/CountryDetails';
import CreateActivity from './containers/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/country/:id" exact component={CountryDetails} />
        <Route path="/create/activity" exact component={CreateActivity} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
