import React, { createContext } from "react";
import PropTypes from "prop-types";
import useCompanies from "./useCompanies";
import useLoadData from "./useLoadData";

export const CompaniesContext = createContext();

const CompaniesProvider = (props) => {
  CompaniesProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { children } = props;

  const companies = useCompanies();
  console.log(companies);
  useLoadData(companies.updateCompanies);

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
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};
export default CompaniesProvider;
