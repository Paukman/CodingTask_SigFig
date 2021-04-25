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
  LIST_EMPLOYEES,
  DELETE_EMPLOYEE,
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

  const deleteEmployee = async (employeeId) => {
    const response = await api.delete(`${BASE_URL}/person/${employeeId}`);
  };

  const onDeleteEmployee = async (companyId, employeeId) => {
    deleteEmployee(employeeId);

    // update employees
    const employees = await loadEmployees(companyId);
    updateEmployees(employees);

    //go back to emplooyees page
    history.push(`${COMPANY_PATH}/${companyId}/employees`);
  };

  const uploadTestEmployees = async (id) => {
    // delete existig employees if any
    const employees = await loadEmployees(id);
    employees.forEach((employee) => {
      deleteEmployee(employee._id);
    });

    const response = await api.get(`${BASE_URL}/importPeopleForCompany/${id}`);

    // update employees
    const testEmployees = await loadEmployees(id);
    updateEmployees(testEmployees);
  };

  const onShowEmployees = async (id) => {
    const employees = await loadEmployees(id);
    updateEmployees(employees);
    onChange({
      name: "selectedCompany",
      value: getCompanyById(id, state.companies),
    });
    history.push(`${COMPANY_PATH}/${id}/employees`);
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
    // we have this data, just show CompanyPage
    setState((prevState) => ({
      ...prevState,
      selectedCompany: getCompanyById(id, prevState.companies),
    }));
    history.push(`${COMPANY_PATH}/${id}`);
  };

  const onUpdateCompany = async (values, id) => {
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
      const response = await api.put(`${COMPANIES_URL}/${id}`, body);
      const updatedData = await loadCompanies(); // reaload companies
      updateCompanies(updatedData);
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
      const response = await api.put(`${BASE_URL}/person/${employeeId}`, body);
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
    setState((prevState) => ({
      ...prevState,
      employeeModalToRender: false,
    }));
    try {
      const response = await api.post(`${BASE_URL}/person`, body);
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
    onShowSingleEmployee,
  };
};

export default useCompanies;
