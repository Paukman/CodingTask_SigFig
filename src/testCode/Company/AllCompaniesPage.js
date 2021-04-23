import React, { useContext } from "react";
import { Container } from "reactstrap";
import { CompaniesContext } from "../CompaniesProvider/CompaniesProvider";
import CompanyCard from "./CompanyCard";

const AllCompaniesPage = () => {
  const { state } = useContext(CompaniesContext);

  console.log("in AllCompaniesPage");

  return (
    <div>
      <Container>
        <div>
          {state.companies.map((company) => (
            <div key={company._id}>
              {<CompanyCard company={company}></CompanyCard>}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllCompaniesPage;

