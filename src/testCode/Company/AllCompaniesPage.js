import { Button, Space } from "antd";
import React, { useContext } from "react";
import { Container } from "reactstrap";
import { CompaniesContext } from "../CompaniesProvider/CompaniesProvider";
import CompanyCard from "./CompanyCard";
import CreateEditCompanyModal from "./CreateEditCompanyModal";
import CreateEditEmployeeModal from "./CreateEditEmployeeModal";

const AllCompaniesPage = () => {
  const { state, createTestData } = useContext(CompaniesContext);

  console.log("in AllCompaniesPage");
  console.log(state);

  return (
    <div>
      <Space direction="vertical">
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
      </Space>
    </div>
  );
};

export default AllCompaniesPage;
