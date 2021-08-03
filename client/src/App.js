import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./containers/LandingPage";
import Home from "./containers/Home";
import CountryDetails from "./containers/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/country/:id" exact component={CountryDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
