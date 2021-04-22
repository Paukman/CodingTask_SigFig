import React, { useContext } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import { CompaniesContext } from "../CompaniesProvider/CompaniesProvider";
import CompanyCard from "./CompanyCard";
import SingleCompanyPage from "./SingleCompanyPage";
import AllCompaniesPage from "./AllCompaniesPage";
import { BASE_PATH } from "../utils/constants";

export const MainPagePreferencesSubView = ({ match }) => {
  switch (match.params.sectionName) {
    case "company":
      console.log("company");
      return <SingleCompanyPage />;
    case "view":
      console.log("view");
      return <AllCompaniesPage />;
    default:
      return null;
  }
};

export const MainPageSelection = () => {
  const { url } = useRouteMatch();
  console.log(url);
  const match = useRouteMatch(`${BASE_PATH}/:sectionName`);
  console.log(match);
  if (!match) return null;
  return <MainPagePreferencesSubView match={match} />;
};

const MainPage = () => {
  const { state } = useContext(CompaniesContext);
  let location = useLocation();

  console.log(location.pathname);

  //console.log(companies);
  console.log(state.companies);

  return (
    <div>
      <Container>
        <div>
          <MainPageSelection />
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
