import { Button, Space } from "antd";
import React, { useContext } from "react";
import { Container } from "reactstrap";
import { CompaniesContext } from "../../CompaniesProvider/CompaniesProvider";
import CompanyCard from "../Cards/CompanyCard";
import CreateEditCompanyModal from "../Modals/CreateEditCompanyModal";
import CreateEditEmployeeModal from "../Modals/CreateEditEmployeeModal";
import { Col } from "antd";

const AllCompaniesPage = () => {
  const { state, createTestData } = useContext(CompaniesContext);

  return (
    <div>
      <Col span={12} offset={4}>
        {state.companies.map((company) => (
          <div key={company._id}>
            {<CompanyCard company={company}></CompanyCard>}
          </div>
        ))}
        <div>
          {state.companyModalToRender ? <CreateEditCompanyModal /> : null}
        </div>
        <div>
          {state.employeeModalToRender ? <CreateEditEmployeeModal /> : null}
        </div>
      </Col>
    </div>
  );
};

export default AllCompaniesPage;
