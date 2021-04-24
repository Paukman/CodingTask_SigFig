import React, { useContext } from "react";
import { Modal, Input } from "antd";

const CreateCompanyModal = () => {
  console.log("in createCompanyModal");

  
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={true}
        
      >
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Modal>
    </>
  );
};

export default CreateCompanyModal;
