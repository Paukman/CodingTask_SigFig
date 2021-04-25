import PropTypes from "prop-types";
import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { useHistory } from "react-router-dom";

import { BASE_PATH } from "../../utils/constants";

import "../../utils/styles.css";

const { Header, Content, Footer } = Layout;

const WithHeader = ({ children }) => {
  WithHeader.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const history = useHistory();

  const onClickMenuItem = (e) => {
    history.push(BASE_PATH);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <div className="sigfig">SIGFIG</div>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={(e) => onClickMenuItem(e)}
        >
          <Menu.Item key="home">Home</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "25px 100px 25px 100px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Aleksandar Trkulja ©2021 SIGFIG Coding Task
      </Footer>
    </Layout>
  );
};

export default WithHeader;
