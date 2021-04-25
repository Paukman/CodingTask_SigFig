import React, { createContext } from "react";
import PropTypes from "prop-types";
import useCompanies from "./useCompanies";
import useLoadCompanies from "./useLoadCompanies";

export const CompaniesContext = createContext();

const CompaniesProvider = (props) => {
  CompaniesProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { children } = props;

  const companies = useCompanies();

  useLoadCompanies(companies.updateCompanies);

  return (
    <CompaniesContext.Provider
      value={{
        state: companies.state,
        companies: companies.state.companies,
        updateCompanies: companies.updateCompanies,
        onShowEmployees: companies.onShowEmployees,
        onShowCompany: companies.onShowCompany,
        onUpdateCompany: companies.onUpdateCompany,
        onUpdateEmployee: companies.onUpdateEmployee,
        onCreateNewCompany: companies.onCreateNewCompany,
        onCreateNewEmployee: companies.onCreateNewEmployee,
        onDeleteEmployee: companies.onDeleteEmployee,
        uploadTestEmployees: companies.uploadTestEmployees,
        onMenuClicked: companies.onMenuClicked,
        onCancelModal: companies.onCancelModal,
        onShowSingleEmployee: companies.onShowSingleEmployee,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};
export default CompaniesProvider;
