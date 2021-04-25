import React, { useContext } from "react";
import { Card, Typography, Space, Row, Col, Menu } from "antd";
import "antd/dist/antd.css";
import { CompaniesContext } from "../../CompaniesProvider";
import "../../utils/styles.css";

const { Link, Text } = Typography;
const { Meta } = Card;
const { SubMenu } = Menu;

import {
  LOAD_TEST_EMPLOYEES,
  CREATE_COMPANY,
  CREATE_EMPLOYEE,
  UPDATE_COMPANY,
  LIST_EMPLOYEES,
} from "../../utils/constants";

const CompanyCard = ({ company }) => {
  const { onShowCompany, onMenuClicked } = useContext(CompaniesContext);

  const onClickMenuItem = (e) => {
    onMenuClicked({ item: e.key, id: company._id });
  };

  return (
    <>
      <Col className="company-card">
        <Row style>
          <Col span={14} className="top-card-row">
            <Link
              style={{ paddingLeft: "10px" }}
              onClick={() => onShowCompany(company._id)}
            >
              {company.name}
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
                <Menu.Item key={LIST_EMPLOYEES}>List employees</Menu.Item>
                <Menu.Item key={UPDATE_COMPANY}>Update company</Menu.Item>
                <Menu.Item key={CREATE_EMPLOYEE}>Add new employee</Menu.Item>
                <Menu.Item key={CREATE_COMPANY}>Add new company</Menu.Item>
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
            <Text strong>Address:</Text>
            <Text>{company.address}</Text>
            <div style={{ height: "5px" }} />
            <Text strong>Revenue:</Text>
            <Text>{company.revenue}</Text>
            <div style={{ height: "5px" }} />
            <Text strong>Phone:</Text>
            <Text>{company.phone}</Text>
            <div style={{ height: "5px" }} />
          </Space>
        </Row>
      </Col>
    </>
  );
};

export default CompanyCard;
