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
  useLoadData(companies.updateState);

  return (
    <CompaniesContext.Provider
      value={{
        companies: {
          state: companies.state,
        },
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};
export default CompaniesProvider;
