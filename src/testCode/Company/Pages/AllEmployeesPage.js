import React, { useContext } from "react";
import { Typography, Space, Row, Col, Menu } from "antd";

import "antd/dist/antd.css";
import { CompaniesContext } from "../../CompaniesProvider";
import CreateEditEmployeeModal from "../Modals/CreateEditEmployeeModal";

const { Link } = Typography;
const { SubMenu } = Menu;

import { LOAD_TEST_EMPLOYEES, CREATE_EMPLOYEE } from "../../utils/constants";

const AllEmployeePage = () => {
  const {
    state,
    onShowSingleEmployee,
    onShowCompany,
    onMenuClicked,
  } = useContext(CompaniesContext);

  const { selectedCompany } = state;

  const onClickMenuItem = (e) => {
    onMenuClicked({ item: e.key, id: selectedCompany._id });
  };

  return (
    <>
      <Col span={12} offset={4}>
        <Col className="company-card">
          <Row style>
            <Col span={14} className="top-card-row">
              <Link
                style={{ paddingLeft: "10px" }}
                onClick={() => onShowCompany(selectedCompany._id)}
              >
                {selectedCompany.name}
              </Link>
            </Col>
            <Col span={10}>
              <Menu
                className="top-card-row"
                style={{ textAlign: "right" }}
                onClick={(e) => onClickMenuItem(e)}
                mode="horizontal"
              >
                <SubMenu key="SubMenu" title="More">
                  <Menu.Item key={CREATE_EMPLOYEE}>Add new employee</Menu.Item>
                  <Menu.Item key={LOAD_TEST_EMPLOYEES}>
                    Reset employee list
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
          <Row className="content-card">
            <Space direction="vertical">
              <div style={{ height: "5px" }} />
              {state.employees.map((employee) => (
                <Link
                  key={employee._id}
                  onClick={() =>
                    onShowSingleEmployee(employee._id, selectedCompany._id)
                  }
                >
                  {employee.name}
                </Link>
              ))}
              <div style={{ height: "5px" }} />
            </Space>
          </Row>
        </Col>
      </Col>
      <div>
        {state.employeeModalToRender ? <CreateEditEmployeeModal /> : null}
      </div>
    </>
  );
};

export default AllEmployeePage;
