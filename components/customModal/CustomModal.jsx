import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({isModalOpen, setIsModalOpen, children,title}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal footer={null} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{width:"100vw"}} width="100vw">
        {children}
      </Modal>
    </>
  );
};
export default CustomModal;