import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../Api";
import { COMPANY_PATH, COMPANIES_URL } from "../utils/constants";
import useIsMounted from "../utils/useIsMounted";

const useCompanies = () => {
  const [state, setState] = useState({
    companies: [],
    selectedCompany: "",
    employees: [],
  });
  const history = useHistory();
  const isMounted = useIsMounted();

  const updateCompanies = useCallback((data) => {
    console.log(data);
    setState((prevState) => ({
      ...prevState,
      companies: data,
    }));
  }, []);

  const onShowEmployees = async (id) => {
    console.log("GET /companies/{companyId}/people: ", id);
    history.push(`${COMPANY_PATH}/${id}/employees`);
    // switch to EmployeePage
  };

  const onShowCompany = (id) => {
    // we have this data, just show CompanyPage
    setState((prevState) => ({
      ...prevState,
      selectedCompany: id,
    }));
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
