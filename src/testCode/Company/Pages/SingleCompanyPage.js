import React, { useContext } from "react";
import { Col } from "antd";
import { CompaniesContext } from "../../CompaniesProvider/CompaniesProvider";
import CompanyCard from "../Cards/CompanyCard";
import CreateEditCompanyModal from "../Modals/CreateEditCompanyModal";
import CreateEditEmployeeModal from "../Modals/CreateEditEmployeeModal";

const SingleCompanyPage = () => {
  const { state } = useContext(CompaniesContext);
  const { selectedCompany } = state;

  return selectedCompany ? (
    <div>
      <Col span={12} offset={4}>
        <div>{<CompanyCard company={selectedCompany}></CompanyCard>}</div>
      </Col>
      <div>
        {state.companyModalToRender ? <CreateEditCompanyModal /> : null}
      </div>
      <div>
        {state.employeeModalToRender ? <CreateEditEmployeeModal /> : null}
      </div>
    </div>
  ) : null;
};

export default SingleCompanyPage;
