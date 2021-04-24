import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../Api";
import {
  COMPANY_PATH,
  COMPANIES_URL,
  BASE_URL,
  BASE_PATH,
  LOAD_EMPLOYEES,
  CREATE_COMPANY,
  CREATE_EMPLOYEE,
} from "../utils/constants";
import useIsMounted from "../utils/useIsMounted";
import CreateCompanyModal from "../Company/CreateCompanyModal";

const useCompanies = () => {
  const [state, setState] = useState({
    companies: [],
    selectedCompany: "",
    employees: [],
    selectedEmployee: "",
    modalToRender: false,
  });
  const history = useHistory();
  const isMounted = useIsMounted();

  const updateCompanies = useCallback((data) => {
    /*const tempObject = {
      companies: [
        {
          details: {},
        },
      ],
    };

    data.forEach((element) => {
      tempObject.companies.push({ details: element });
    });

    console.log(tempObject); */
    setState((prevState) => ({
      ...prevState,
      companies: data,
    }));
    console.log("data loaded");
  }, []);

  const uploadTestData = async (id) => {
    const url = `${BASE_URL}importPeopleForCompany/${id}`;
    console.log(url);
    const response = await api.get(url);
    console.log(response.data);
  };

  const onShowEmployees = async (id) => {
    const url = `${COMPANIES_URL}/${id}/people`;
    console.log(url);
    const response = await api.get(`${COMPANIES_URL}/${id}/people`);
    history.push(`${COMPANY_PATH}/${id}/employees`);
    console.log(response.data);
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

  const onMenuClicked = ({ item, id }) => {
    console.log(item, id);
    if (item === CREATE_COMPANY) {
      setState((prevState) => ({
        ...prevState,
        modalToRender: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        modalToRender: false,
      }));
    }
  };

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
    uploadTestData,
    onMenuClicked,
  };
};

export default useCompanies;
