import React from "react";
import "./App.css";
import AllCompaniesPage from "./testCode/Company/Pages/AllCompaniesPage";
import SingleCompanyPage from "./testCode/Company/Pages/SingleCompanyPage";
import AllEmployeesPage from "./testCode/Company/Pages/AllEmployeesPage";
import CompaniesProvider from "./testCode/CompaniesProvider/CompaniesProvider";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import SingleEmployeePage from "./testCode/Company/Pages/SingleEmployeePage";
import CreateEditCompanyModal from "./testCode/Company/Modals/CreateEditCompanyModal";
import WithHeader from "./testCode/Company/Pages/WithHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CompaniesProvider>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <WithHeader>
                  <AllCompaniesPage />
                </WithHeader>
              )}
            />
            <Route
              exact
              path="/companies"
              component={() => (
                <WithHeader>
                  <AllCompaniesPage />
                </WithHeader>
              )}
            />
            <Route
              path="/company/:id/employee/:employeeId"
              component={() => (
                <WithHeader>
                  <SingleEmployeePage />
                </WithHeader>
              )}
            />
            <Route
              path="/company/:id/employees"
              component={() => (
                <WithHeader>
                  <AllEmployeesPage />
                </WithHeader>
              )}
            />
            <Route
              path="/company/:id"
              component={() => (
                <WithHeader>
                  <SingleCompanyPage />
                </WithHeader>
              )}
            />
            <Route
              exact
              path="/pageNotFound"
              component={() => (
                <WithHeader>
                  <div>Page not found</div>
                </WithHeader>
              )}
            />
          </Switch>
        </CompaniesProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
