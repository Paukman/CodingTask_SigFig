import React, { useContext } from "react";
import { Container } from "reactstrap";
import { CompaniesContext } from "./CompaniesProvider/CompaniesProvider";
import CompanyCard from "./Company/CompanyCard";

const MainPage = () => {
  const { companies } = useContext(CompaniesContext);
  const { state } = companies;

  //console.log(companies);
  console.log(state);
  console.log("some state");

  return (
    <div>
      <Container>
        {state.map((company) => (
          <div key={company._id}>
            {<CompanyCard company={company}></CompanyCard>}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default MainPage;
