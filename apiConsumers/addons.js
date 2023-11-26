export async function fetchAddons(product_id) {
    try {
      const response = await fetch(`/api/addon/getAddons?product_id=${product_id}`);
      if (!response.ok) {
      }
      const data = await response.json();
      return data;
    } catch (error) {
    }
}

export async function manageAddon({product_id, products}) {
    try {
      const response = await fetch('/api/addon/addOrUpdateAddon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id, products }),
      });
  
      if (!response.ok) {
      }
  
      const data = await response.json();
      console.log('Managed Addon:', data);
      return data;
    } catch (error) {
    }
  }
  