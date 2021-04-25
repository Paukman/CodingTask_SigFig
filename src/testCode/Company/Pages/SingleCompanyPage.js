import React, { useContext } from "react";
import { Col } from "antd";
import { CompaniesContext } from "../../CompaniesProvider/CompaniesProvider";
import CompanyCard from "../Cards/CompanyCard";

const SingleCompanyPage = () => {
  const { state } = useContext(CompaniesContext);

  return (
    <div>
      <Col span={12} offset={4}>
        <div>{<CompanyCard company={state.selectedCompany}></CompanyCard>}</div>
      </Col>
    </div>
  );
};

export default SingleCompanyPage;
