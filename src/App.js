import React from "react";
import "./App.css";
import AllCompaniesPage from "./testCode/Company/AllCompaniesPage";
import SingleCompanyPage from "./testCode/Company/SingleCompanyPage";
import AllEmployeesPage from "./testCode/Company/AllEmployeesPage";
import CompaniesProvider from "./testCode/CompaniesProvider/CompaniesProvider";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import SingleEmployeePage from "./testCode/Company/SingleEmployeePage";
import CreateCompanyModal from "./testCode/Company/CreateCompanyModal";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CompaniesProvider>
          <Switch>
            <Route exact path="/" component={AllCompaniesPage} />
            <Route exact path="/companies" component={AllCompaniesPage} />
            <Route
              path="/company/:id/employee/:employeeId?"
              component={SingleEmployeePage}
            />
            <Route path="/company/:id/employees" component={AllEmployeesPage} />
            <Route path="/company/:id" component={SingleCompanyPage} />
          </Switch>
        </CompaniesProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
