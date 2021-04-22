import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  NavItem,
  CardText,
  NavLink,
  Nav,
} from "reactstrap";

const CompanyCard = ({ company }) => {
  return (
    <div style={{marginBottom: "10px",marginTop: "10px"}}>
      <Card>
        <CardHeader>{company.name}</CardHeader>
        <CardBody>
          <CardText style={{ fontWeight: "bold" }}>Address:</CardText>
          <CardText>{company.address}</CardText>
          <CardText style={{ fontWeight: "bold" }}>Revenue:</CardText>
          <CardText>{company.revenue}</CardText>
          <CardText style={{ fontWeight: "bold" }}>Phone:</CardText>
          <CardText>{company.phone}</CardText>
        </CardBody>
        <CardFooter>
          <Nav className="mr-auto">
            <NavItem>
              <NavLink href="#">Link</NavLink>
            </NavItem>
          </Nav>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyCard;
