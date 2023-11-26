import React from 'react'
import styles from "../../../styles/AdminDashboard.module.scss"
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Tabs } from 'antd';
import ProductsSection from '../../../components/products_admin/ProductsSection';
import OrdersSection from '../../../components/OrdersSection';
import { useUserContext } from '../../../providers/UserContextProvider';

const AdminDashboard = () => {
  const onChange = (key) => {
  };

  const items = [
    {
      key: '1',
      label: 'Products',
      children: <ProductsSection />,
    },
    {
      key: '2',
      label: 'Orders',
      children: <OrdersSection />,
    },
    {
      key: '3',
      label: 'Users',
      children: 'Coming Soon!!',
    },
  ];
  const { userData } = useUserContext()
  return (
    <div className={styles.container}>
      {
        userData?.is_admin ?
          <>
            <Header title="Admin Dasboard" />
            <div className={styles.section}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </> :
          <>
          </>
      }

      <Footer />
    </div>
  )
}

export default AdminDashboard