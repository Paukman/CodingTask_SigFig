import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";
import api from "../utils/Api";
import {
  COMPANY_PATH,
  COMPANIES_URL,
  BASE_URL,
  BASE_PATH,
  LOAD_TEST_EMPLOYEES,
  CREATE_COMPANY,
  CREATE_EMPLOYEE,
  UPDATE_COMPANY,
  UPDATE_EMPLOYEE,
} from "../utils/constants";
import useIsMounted from "../utils/useIsMounted";
import { loadCompanies, loadEmployees } from "./useLoadCompanies";
import { getCompanyById, getEmployeeById } from "../utils/utils";

const useCompanies = () => {
  const [state, setState] = useState({
    companies: [],
    selectedCompany: "",
    employees: [],
    selectedEmployee: "",
    companyModalToRender: false,
    companyToUpdate: "",
    employeeModalToRender: false,
    employeeToUpdate: "",
  });
  const history = useHistory();
  const isMounted = useIsMounted();

  // general method to update state value
  const onChange = ({ name, value }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateEmployees = (employees) => {
    employees.sort((a, b) => (a.name > b.name ? 1 : -1)); // sort
    onChange({ name: "employees", value: employees });
  };

  const updateCompanies = useCallback((data) => {
    data.sort((a, b) => (a.name > b.name ? 1 : -1)); // sort
    onChange({ name: "companies", value: data });
  }, []);

  const uploadTestEmployees = async (id) => {
    const response = await api.get(`${BASE_URL}/importPeopleForCompany/${id}`);
    console.log(" employees for id:", id, " are ", response.data);
  };

  const onShowEmployees = async (id) => {
    const employees = await loadEmployees(id);
    updateEmployees(employees);
    history.push(`${COMPANY_PATH}/${id}/employees`);
    onChange({
      name: "selectedCompany",
      value: getCompanyById(id, state.companies),
    });
  };

  const onShowCompany = (id) => {
    // we have this data, just show CompanyPage
    setState((prevState) => ({
      ...prevState,
      selectedCompany: getCompanyById(id, prevState.companies),
    }));
    history.push(`${COMPANY_PATH}/${id}`);
    // we have this data, just show CompanyPage
    console.log("GET /companies/{id}: ", id);
    console.log();
  };

  const onUpdateCompany = async (values, id) => {
    const body = {
      name: values.name,
      address: values.address,
      revenue: values.revenue,
      phone: values.phone,
    };
    console.log(body, id);
    setState((prevState) => ({
      ...prevState,
      companyModalToRender: false,
    }));

    try {
      console.log("updating company");

      const response = await api.put(`${COMPANIES_URL}/${id}`, body);
      console.log(response.data);
      const updatedData = await loadCompanies(); // reaload companies
      updateCompanies(updatedData);
    } catch (error) {
      console.log("error ", error);
      Modal.error({
        centered: true, // required to center info and confirm
        title: "Error",
        content: `Error updating new company: ${error}`,
      });
    }
  };
  const onUpdateEmployee = (id) => {};

  const onCreateNewCompany = async (values) => {
    const body = {
      name: values.name,
      address: values.address,
      revenue: values.revenue,
      phone: values.phone,
    };
    setState((prevState) => ({
      ...prevState,
      companyModalToRender: false,
    }));

    try {
      const response = await api.post(`${COMPANIES_URL}`, body);
      const updatedData = await loadCompanies(); // reaload companies
      updateCompanies(updatedData);
    } catch (error) {
      Modal.error({
        centered: true, // required to center info and confirm
        title: "Error",
        content: `Error creating new company: ${error}`,
      });
    }
  };
  const onCreateNewEmployee = async (values, companyId) => {
    console.log(values);
    const body = {
      name: values.name,
      email: values.email,
      companyId: companyId,
    };
    setState((prevState) => ({
      ...prevState,
      employeeModalToRender: false,
    }));
    try {
      const response = await api.post(`${BASE_URL}/person`, body);
      console.log(response.data);
      // update employees
      const employees = await loadEmployees(companyId);
      updateEmployees(employees);
    } catch (error) {
      Modal.error({
        centered: true, // required to center info and confirm
        title: "Error",
        content: `Error creating new employee: ${error}`,
      });
    }
  };
  const onDeleteEmployee = (id) => {};
  const backToCompanyPage = () => {};
  const backToMainPage = () => {};

  const cleanState = () => {
    setState((prevState) => ({
      ...prevState,
      companyToUpdate: "",
      companyModalToRender: false,
      employeeToUpdate: "",
      employeeModalToRender: false,
    }));
  };

  const onMenuClicked = ({ item, id, employeeId }) => {
    cleanState();
    console.log(item, id);
    if (item === CREATE_COMPANY) {
      setState((prevState) => ({
        ...prevState,
        companyModalToRender: true,
      }));
    }
    if (item === CREATE_EMPLOYEE) {
      setState((prevState) => ({
        ...prevState,
        employeeModalToRender: true,
        companyToUpdate: getCompanyById(id, prevState.companies),
      }));
    }
    if (item === UPDATE_COMPANY) {
      const companyToUpdate = state.companies.find(
        (company) => company._id === id
      );
      setState((prevState) => ({
        ...prevState,
        companyToUpdate: getCompanyById(id, prevState.companies),
        companyModalToRender: true,
      }));
    }
    if (item === UPDATE_EMPLOYEE) {
      setState((prevState) => ({
        ...prevState,
        employeeModalToRender: true,
        companyToUpdate: getCompanyById(id, prevState.companies),
        employeeToUpdate: getEmployeeById(employeeId, prevState.employees),
      }));
    }
    if (item === LOAD_TEST_EMPLOYEES) {
      uploadTestEmployees(id);
    }
  };

  const onCancelModal = () => {
    setState((prevState) => ({
      ...prevState,
      companyModalToRender: false,
      employeeModalToRender: false,
    }));
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
    uploadTestEmployees,
    onMenuClicked,
    onCancelModal,
  };
};

export default useCompanies;
