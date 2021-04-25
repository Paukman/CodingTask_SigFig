import React, { useContext, useState } from "react";
import { CompaniesContext } from "../../CompaniesProvider/CompaniesProvider";
import { Modal, Input, Form, Button } from "antd";

const CreateEditEmployeeModal = () => {
  const {
    state,
    onCancelModal,
    onUpdateEmployee,
    onCreateNewEmployee,
  } = useContext(CompaniesContext);

  const onFinish = (values) => {
    if (state.employeeToUpdate) {
      onUpdateEmployee(
        values,
        state.employeeToUpdate._id,
        state.companyToUpdate._id
      );
    } else {
      onCreateNewEmployee(values, state.companyToUpdate._id);
    }
  };

  return (
    <>
      <Modal
        title={state.employeeToUpdate ? "Update employee" : "Add new employee"}
        visible
        centered
        footer={null}
        onCancel={onCancelModal}
        maskClosable={false}
      >
        <Form
          name="employeeModal"
          onFinish={onFinish}
          initialValues={{
            name: state.employeeToUpdate ? state.employeeToUpdate.name : "",
            email: state.employeeToUpdate ? state.employeeToUpdate.email : "",
            companyName: state.companyToUpdate.name,
          }}
        >
          <Form.Item label="Company" name="companyName">
            <Input readOnly disabled />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Button htmlType="submit">
            {state.employeeToUpdate ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditEmployeeModal;
