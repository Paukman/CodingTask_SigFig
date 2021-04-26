import { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Modal } from "antd";
import api from "../utils/Api";
import {
  COMPANY_PATH,
  COMPANIES_URL,
  BASE_URL,
  LOAD_TEST_EMPLOYEES,
  CREATE_COMPANY,
  CREATE_EMPLOYEE,
  UPDATE_COMPANY,
  UPDATE_EMPLOYEE,
  LIST_EMPLOYEES,
  DELETE_EMPLOYEE,
} from "../utils/constants";
import { loadCompanies, loadEmployees } from "./useLoadData";
import { getCompanyById, getEmployeeById } from "../utils/utils";
import {
  onCompanyPageRefresh,
  onEmployeesPageRefresh,
  onSingleEmployeePageRefresh,
} from "./utils";

const useCompanies = () => {
  const [state, setState] = useState({
    companies: [],
    selectedCompany: "",
    employees: [],
    allEmployees: [],
    selectedEmployee: "",
    companyModalToRender: false,
    companyToUpdate: "",
    employeeModalToRender: false,
    employeeToUpdate: "",
  });
  const history = useHistory();

  const matchCompany = useRouteMatch({
    path: `${COMPANY_PATH}/:id`,
    strict: true,
  });
  const matchEmployees = useRouteMatch({
    path: `${COMPANY_PATH}/:id/:employees`,
    strict: true,
  });
  const matchSingleEmployee = useRouteMatch({
    path: `${COMPANY_PATH}/:id/:employee/:employeeId`,
    strict: true,
  });

  // handle page refresh
  useEffect(() => {
    onCompanyPageRefresh(state, setState, matchCompany, history);
    onEmployeesPageRefresh(state, setState, matchEmployees, history);
    onSingleEmployeePageRefresh(state, setState, matchSingleEmployee, history);
  }, [matchCompany, state, history, matchEmployees, matchSingleEmployee]);

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

  const updateCompaniesAndEmployees = useCallback(
    ({ companies, allEmployees }) => {
      console.log(allEmployees);
      companies.sort((a, b) => (a.name > b.name ? 1 : -1)); // sort
      onChange({ name: "companies", value: companies });
      onChange({ name: "allEmployees", value: allEmployees });
    },
    []
  );

  const updateCompanies = useCallback((data, companyId) => {
    data.sort((a, b) => (a.name > b.name ? 1 : -1)); // sort
    onChange({ name: "companies", value: data });
    if (companyId) {
      const selectedCompany = getCompanyById(companyId, data);
      onChange({ name: "selectedCompany", value: selectedCompany });
    }
  }, []);

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await api.delete(`${BASE_URL}/person/${employeeId}`);
    } catch (error) {
      Modal.error({
        centered: true,
        title: "Error",
        content: `Error deleting employee: ${error}`,
      });
    }
  };

  const onDeleteEmployee = async (companyId, employeeId) => {
    try {
      await deleteEmployee(employeeId);
      // update employees
      const employees = await loadEmployees(companyId);
      updateEmployees(employees);
      //go back to emplooyees page
      history.push(`${COMPANY_PATH}/${companyId}/employees`);
    } catch (error) {
      Modal.error({
        centered: true,
        title: "Error",
        content: `Error deleting employee: ${error}`,
      });
    }
  };

  const uploadTestEmployees = async (companyId) => {
    // delete existig employees if any
    try {
      const employees = await loadEmployees(companyId);
      employees.forEach((employee) => {
        deleteEmployee(employee._id);
      });
      const response = await api.get(
        `${BASE_URL}/importPeopleForCompany/${companyId}`
      );
      // update employees
      const testEmployees = await loadEmployees(companyId);
      updateEmployees(testEmployees);
    } catch (error) {
      Modal.error({
        centered: true,
        title: "Error",
        content: `Error uploading test employees: ${error}`,
      });
    }
  };

  const onShowEmployees = async (id) => {
    try {
      const employees = await loadEmployees(id);
      updateEmployees(employees);
      onChange({
        name: "selectedCompany",
        value: getCompanyById(id, state.companies),
      });
      history.push(`${COMPANY_PATH}/${id}/employees`);
    } catch (error) {
      Modal.error({
        centered: true,
        title: "Error",
        content: `Error loading employees: ${error}`,
      });
    }
  };

  const onShowSingleEmployee = async (id, companyId) => {
    onChange({
      name: "selectedEmployee",
      value: getEmployeeById(id, state.employees),
    });
    onChange({
      name: "selectedCompany",
      value: getCompanyById(companyId, state.companies),
    });
    history.push(`${COMPANY_PATH}/${companyId}/employee/${id}`);
  };

  const onShowCompany = (id) => {
    onChange({
      name: "selectedCompany",
      value: getCompanyById(id, state.companies),
    });
    history.push(`${COMPANY_PATH}/${id}`);
  };

  const onUpdateCompany = async (values, companyId) => {
    const body = {
      name: values.name,
      address: values.address,
      revenue: values.revenue,
      phone: values.phone,
    };
    onChange({ name: "companyModalToRender", value: false });

    try {
      await api.put(`${COMPANIES_URL}/${companyId}`, body);
      const updatedData = await loadCompanies(); // reload companies
      updateCompanies(updatedData, companyId);
    } catch (error) {
      Modal.error({
        centered: true,
        title: "Error",
        content: `Error updating new company: ${error}`,
      });
    }
  };

  const onCreateNewCompany = async (values) => {
    const body = {
      name: values.name,
      address: values.address,
      revenue: values.revenue,
      phone: values.phone,
    };
    onChange({ name: "companyModalToRender", value: false });
    try {
      await api.post(`${COMPANIES_URL}`, body);
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

  const onUpdateEmployee = async (values, employeeId, companyId) => {
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
      await api.put(`${BASE_URL}/person/${employeeId}`, body);
      // update employees
      const employees = await loadEmployees(companyId);
      updateEmployees(employees);
      const updatedEmployee = getEmployeeById(employeeId, employees);
      onChange({ name: "selectedEmployee", value: updatedEmployee });
    } catch (error) {
      Modal.error({
        centered: true, // required to center info and confirm
        title: "Error",
        content: `Error creating new employee: ${error}`,
      });
    }
  };

  const onCreateNewEmployee = async (values, companyId) => {
    const body = {
      name: values.name,
      email: values.email,
      companyId: companyId,
    };
    onChange({ name: "employeeModalToRender", value: false });
    try {
      await api.post(`${BASE_URL}/person`, body);
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
    switch (item) {
      case CREATE_COMPANY:
        setState((prevState) => ({
          ...prevState,
          companyModalToRender: true,
        }));
        break;
      case CREATE_EMPLOYEE:
        setState((prevState) => ({
          ...prevState,
          employeeModalToRender: true,
          companyToUpdate: getCompanyById(id, prevState.companies),
        }));
        break;
      case UPDATE_COMPANY:
        const companyToUpdate = state.companies.find(
          (company) => company._id === id
        );
        setState((prevState) => ({
          ...prevState,
          companyToUpdate: getCompanyById(id, prevState.companies),
          companyModalToRender: true,
        }));
        break;
      case UPDATE_EMPLOYEE:
        const company = getCompanyById(id, state.companies);
        setState((prevState) => ({
          ...prevState,
          employeeModalToRender: true,
          companyToUpdate: getCompanyById(id, prevState.companies),
          employeeToUpdate: getEmployeeById(employeeId, prevState.employees),
        }));
        break;
      case LOAD_TEST_EMPLOYEES:
        uploadTestEmployees(id);
        break;
      case LIST_EMPLOYEES:
        onShowEmployees(id);
        break;
      case DELETE_EMPLOYEE:
        onDeleteEmployee(id, employeeId);
        break;
      default:
        break;
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
    setState, // for testing
    onChange,
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
    onShowSingleEmployee,
    updateCompaniesAndEmployees,
  };
};

export default useCompanies;
