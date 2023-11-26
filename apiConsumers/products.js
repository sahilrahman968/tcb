export const fetchProducts = async (queryParams) => {
  try {
    const queryParamsString = queryParams ? Object.keys(queryParams)
      .map((key) => { return queryParams[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}` : "" })
      .join('&') : "";

    const response = await fetch(`/api/product/getProducts?${queryParamsString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const products = await response.json();
      console.log("products", products)
      return products?.data
    } else {
      const error = await response.json();
      console.error(error.err);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteProducts = async ({productId}) => {
  try {
    // const response = await axios.delete(`/api/product/deleteProduct?productId=${productId}`);
    const response = await fetch(`/api/product/deleteProduct?productId=${productId}`, {
      method: 'DELETE',
    });
    if (response.data.success) {
    } else {
    }
  } catch (error) {
  }
};
