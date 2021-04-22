import React, { useContext } from "react";
import { Card, Typography, Space, Row, Col } from "antd";
import "antd/dist/antd.css";
import Grid from "antd/lib/card/Grid";
import { CompaniesContext } from "../CompaniesProvider";

const { Link, Text } = Typography;
const { Meta } = Card;

const CompanyCard = ({ company }) => {
  const { onShowEmployees, onShowCompany } = useContext(CompaniesContext);

  return (
    <>
      <Grid style={{ maxWidth: "350px", marginBottom: "10px" }}>
        <Col>
          <Row style={{ backgroundColor: "lightgray" }}>
            <Link onClick={() => onShowCompany(company._id)}>
              {company.name}
            </Link>
          </Row>
          <Row style={{ textAlign: "left" }}>
            <Space direction="vertical">
              <Text strong>Address:</Text>
              <Text>{company.address}</Text>
              <Text strong>Revenue:</Text>
              <Text>{company.revenue}</Text>
              <Text strong>Phone:</Text>
              <Text>{company.phone}</Text>
            </Space>
          </Row>
          <Row style={{ backgroundColor: "lightgray" }}>
            <Link onClick={() => onShowEmployees(company._id)}>
              People who work here
            </Link>
          </Row>
        </Col>
      </Grid>
    </>
  );
};

export default CompanyCard;
