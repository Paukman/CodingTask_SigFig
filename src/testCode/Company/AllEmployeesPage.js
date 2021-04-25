import React, { useContext } from "react";
import { Card, Typography, Space, Row, Col, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import Grid from "antd/lib/card/Grid";
import { CompaniesContext } from "../CompaniesProvider";
import CreateEditEmployeeModal from "./CreateEditEmployeeModal";

const { Link, Text } = Typography;
const { Meta } = Card;
const { SubMenu } = Menu;

import {
  LOAD_TEST_EMPLOYEES,
  CREATE_COMPANY,
  CREATE_EMPLOYEE,
  UPDATE_COMPANY,
} from "../utils/constants";

const AllEmployeePage = ({ company }) => {
  const { state, onShowEmployees, onShowCompany, onMenuClicked } = useContext(
    CompaniesContext
  );

  const onClickMenuItem = (e) => {
    onMenuClicked({ item: e.key, id: state.selectedCompany._id });
  };

  return (
    <>
      <Grid style={{ width: "400px", marginBottom: "10px" }}>
        <Col>
          <Row style={{ backgroundColor: "lightgray" }}>
            <Col>
              <Link onClick={() => onShowCompany(company._id)}>
                {state.selectedCompany.name}
              </Link>
            </Col>
            <Col>
              <Menu onClick={(e) => onClickMenuItem(e)} mode="horizontal">
                <SubMenu key="SubMenu" title="More ...">
                  <Menu.Item key={CREATE_EMPLOYEE}>Add new employee</Menu.Item>
                  <Menu.Item key={LOAD_TEST_EMPLOYEES}>
                    Reset employee list
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
          <Row style={{ textAlign: "left" }}>
            <Space direction="vertical">
              {state.employees.map((employee) => (
                <div key={employee._id}>{employee.name}</div>
              ))}
            </Space>
          </Row>
          <Row style={{ backgroundColor: "lightgray" }}>
            <Link onClick={() => onShowEmployees(company._id)}>
              People who work here
            </Link>
          </Row>
        </Col>
      </Grid>
      <div>
        {state.employeeModalToRender ? <CreateEditEmployeeModal /> : null}
      </div>
    </>
  );
};

export default AllEmployeePage;
