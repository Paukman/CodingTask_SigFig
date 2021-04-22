import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../Api";
import { COMPANY_PATH } from "../utils/constants";

const COMPANIES_URL = "http://localhost:3001/companies";

const useCompanies = () => {
  const [state, setState] = useState({
    companies: [],
  });
  const history = useHistory();

  const updateCompanies = useCallback((data) => {
    console.log(data);
    setState((prevState) => ({
      ...prevState,
      companies: data,
    }));
  }, []);

  const onShowEmployees = (id) => {
    console.log("GET /companies/{companyId}/people: ", id);
    history.push(`${COMPANY_PATH}/${id}/employees`);
    // switch to EmployeePage
  };

  const onShowCompany = (id) => {
    //history.push(COMPANY_PATH);
    history.push(`${COMPANY_PATH}/${id}`);
    // we have this data, just show CompanyPage
    console.log("GET /companies/{id}: ", id);
    console.log();
  };

  const onUpdateCompany = (id) => {};
  const onUpdateEmployee = (id) => {};
  const onCreateNewCompany = () => {};
  const onCreateNewEmployee = (id) => {};
  const onDeleteEmployee = (id) => {};
  const backToCompanyPage = () => {};
  const backToMainPage = () => {};

  return {
    state,
    setState,
    updateCompanies,
    onShowEmployees,
    onShowCompany,
    onUpdateCompany,
    onUpdateEmployee,
    onCreateNewCompany,
    onCreateNewEmployee,
    onDeleteEmployee,
  };
};

export default useCompanies;
