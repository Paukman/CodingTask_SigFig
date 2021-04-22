import React from "react";
import "./App.css";
import MainPage from "./testCode/Company/MainPage";
import CompaniesProvider from "./testCode/CompaniesProvider/CompaniesProvider";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CompaniesProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/companies/view" />
            </Route>
            <Route exact path="/companies">
              <Redirect to="/companies/view" />
            </Route>
            <Route path="/companies">
              <MainPage />
            </Route>
          </Switch>
        </CompaniesProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
