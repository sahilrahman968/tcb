export async function updateCart({user_id, product_id, count}) {
    const url = '/api/cart/addOrUpdateCart'; // Update the URL accordingly
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          product_id,
          count,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error.message);
    }
}



export const getCartProducts = async (userId) => {
  console.log("userId454",userId)
  try {
    const response = await fetch(`/api/cart/getCartProducts?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const cartProducts = await response.json();
      return cartProducts
    } else if (response.status === 404) {
      console.error('Cart not found');
    } else {
      const error = await response.json();
      console.error(error.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage:
// const userId = '123'; // replace with the actual user ID
// fetchUserCart(userId);
