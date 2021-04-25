import React, { useContext } from "react";
import { Card, Typography, Space, Row, Col, Menu } from "antd";

import "antd/dist/antd.css";
import { CompaniesContext } from "../../CompaniesProvider";
import CreateEditEmployeeModal from "../Modals/CreateEditEmployeeModal";

const { Link, Text } = Typography;
const { SubMenu } = Menu;

import {
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  LIST_EMPLOYEES,
} from "../../utils/constants";

const SingleEmployeePage = () => {
  const { state, onMenuClicked, onShowCompany } = useContext(CompaniesContext);
  const { selectedEmployee } = state;

  const onClickMenuItem = (e) => {
    onMenuClicked({
      item: e.key,
      id: state.selectedCompany._id,
      employeeId: state.selectedEmployee._id,
    });
  };

  return (
    <>
      <Col span={12} offset={4}>
        <Col className="company-card">
          <Row style>
            <Col span={14} className="top-card-row">
              <div style={{ paddingLeft: "10px" }}>
                {`${selectedEmployee.name} - `}
                <Link onClick={() => onShowCompany(state.selectedCompany._id)}>
                  {state.selectedCompany.name}
                </Link>
              </div>
            </Col>
            <Col span={10}>
              <Menu
                className="top-card-row"
                style={{ textAlign: "right" }}
                onClick={(e) => onClickMenuItem(e)}
                mode="horizontal"
              >
                <SubMenu key="SubMenu" title="More">
                  <Menu.Item key={UPDATE_EMPLOYEE}>Update employee</Menu.Item>
                  <Menu.Item key={DELETE_EMPLOYEE}>Delete employee</Menu.Item>
                  <Menu.Item key={LIST_EMPLOYEES}>Back to employees</Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
          <Row className="content-card">
            <Space direction="vertical">
              <div style={{ height: "5px" }} />
              <Text strong>Name:</Text>
              <Text>{selectedEmployee.name}</Text>
              <div style={{ height: "5px" }} />
              <Text strong>Email:</Text>
              <Text>{selectedEmployee.email}</Text>
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

export default SingleEmployeePage;
