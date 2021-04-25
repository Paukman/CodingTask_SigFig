import React, { useContext } from "react";
import { Container } from "reactstrap";
import { CompaniesContext } from "../CompaniesProvider/CompaniesProvider";
import CompanyCard from "./CompanyCard";

const SingleCompanyPage = () => {
  const { state } = useContext(CompaniesContext);

  console.log("in SingleCompanyPage");

  return (
    <div>
      <Container>
        <div>{<CompanyCard company={state.selectedCompany}></CompanyCard>}</div>
      </Container>
    </div>
  );
};

export default SingleCompanyPage;
