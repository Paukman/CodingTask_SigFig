import React, { useContext, useState } from "react";
import { CompaniesContext } from "../CompaniesProvider/CompaniesProvider";
import { Modal, Input, Form, Button } from "antd";

const CreateEditCompanyModal = () => {
  console.log("in createCompanyModal");
  const {
    state,
    onCancelModal,
    onCreateNewCompany,
    onUpdateCompany,
  } = useContext(CompaniesContext);

  const onFinish = (values) => {
    if (state.companyToUpdate) {
      onUpdateCompany(values, state.companyToUpdate._id);
    } else {
      onCreateNewCompany(values);
    }
  };

  return (
    <>
      <Modal
        title={state.companyToUpdate ? "Update company" : "Add new company"}
        visible
        centered
        footer={null}
        onCancel={onCancelModal}
        maskClosable={false}
      >
        <Form
          name="companyModal"
          onFinish={onFinish}
          initialValues={{
            name: state.companyToUpdate ? state.companyToUpdate.name : "",
            address: state.companyToUpdate ? state.companyToUpdate.address : "",
            revenue: state.companyToUpdate ? state.companyToUpdate.revenue : "",
            phone: state.companyToUpdate ? state.companyToUpdate.phone : "",
          }}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Revenue" name="revenue">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Button htmlType="submit">
            {state.companyToUpdate ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditCompanyModal;
