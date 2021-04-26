import React, { useContext, useEffect } from "react";
import { Col } from "antd";
import { CompaniesContext } from "../../CompaniesProvider/CompaniesProvider";
import CompanyCard from "../Cards/CompanyCard";
import CreateEditCompanyModal from "../Modals/CreateEditCompanyModal";
import CreateEditEmployeeModal from "../Modals/CreateEditEmployeeModal";
import { useRouteMatch, useHistory } from "react-router-dom";
import { COMPANY_PATH } from "../../utils/constants";

const SingleCompanyPage = () => {
  const { state } = useContext(CompaniesContext);

  const match = useRouteMatch(`${COMPANY_PATH}/:id`);
  let company = state.selectedCompany;
  const history = useHistory();

  if (
    match?.params?.id &&
    state &&
    state.companies &&
    state.companies.length &&
    !state.selectedCompany
  ) {
    const selectedCompany = state.companies.find(
      (company) => company._id === match.params.id
    );
    console.log(selectedCompany);
    console.log(state);
    if (selectedCompany) {
      company = selectedCompany;
    }
    if (!selectedCompany) {
      history.push("/pageNotFound");
      return null;
    }
  }

  return (
    <div>
      <Col span={12} offset={4}>
        <div>{<CompanyCard company={company}></CompanyCard>}</div>
      </Col>
      <div>
        {state.companyModalToRender ? <CreateEditCompanyModal /> : null}
      </div>
      <div>
        {state.employeeModalToRender ? <CreateEditEmployeeModal /> : null}
      </div>
    </div>
  );
};

export default SingleCompanyPage;
