import React from "react";
import "./App.css";
import MainPage from "./testCode/MainPage";
import CompaniesProvider from "./testCode/CompaniesProvider/CompaniesProvider"
;
function App() {
  return (
    <div className="App">
      <CompaniesProvider>
        <MainPage />
      </CompaniesProvider>
    </div>
  );
}

export default App;
