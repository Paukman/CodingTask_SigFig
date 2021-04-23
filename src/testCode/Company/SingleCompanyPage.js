import React, { useContext } from "react";
import { Container } from "reactstrap";
import { CompaniesContext } from "../CompaniesProvider/CompaniesProvider";
import CompanyCard from "./CompanyCard";

const SingleCompanyPage = () => {
  const { state } = useContext(CompaniesContext);

  const company = state.companies.find(
    (company) => company._id === state.selectedCompany
  );

  console.log("in SingleCompanyPage");

  return (
    <div>
      <Container>
        <div>{<CompanyCard company={company}></CompanyCard>}</div>
      </Container>
    </div>
  );
};

export default SingleCompanyPage;
