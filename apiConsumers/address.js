export async function addNewAddress(body) {
    try {
      const response = await fetch('/api/address/addAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        //   user_id: userId,
          ...body
        //   line_1: line1,
        //   line_2: line2,
        //   line_3: line3,
        //   mob: mob,
        //   nick_name: nickName,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  }
  
  export async function getUserAddresses(userId) {
    try {
      const response = await fetch(`/api/address/getAddress?user_id=${userId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user addresses:', error);
      throw error;
    }
  }
  