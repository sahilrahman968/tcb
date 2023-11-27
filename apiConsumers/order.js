export const createOrUpdateOrder = async (orderData) => {
    try {
        const response = await fetch('/api/orders/addOrUpdateOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            const result = await response.json();
        } else if (response.status === 404) {
            const result = await response.json();
            console.error(result.message); // Order not found
        } else {
            const error = await response.json();
            console.error(error.error); // or do something with the error message
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateOrderStatus = async ({orderId,statusId}) => {
    try {
      const response = await fetch(`/api/orders/updateOrderStatus?orderId=${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status_id: statusId }),
      });

      const data = await response.json();
      return data
      if (response.ok) {
      } else {
      }
    } catch (error) {
    }
  };


export const fetchOrders = async (params) => {
    const statusId = params?.statusId ?? ""
    const userId = params?.userId ?? ""
    try {
      let queryParamsString = '';
      if (statusId) {
        queryParamsString += `status_id=${statusId}&`;
      }
      if (userId) {
        queryParamsString += `user_id=${userId}`;
      }
  
      const response = await fetch(`/api/orders/getOrders?${queryParamsString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const orders = await response.json();
        return orders
      } else {
        const error = await response.json();
        console.error(error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  