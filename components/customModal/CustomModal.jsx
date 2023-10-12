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
      <Modal footer={null} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};
export default CustomModal;