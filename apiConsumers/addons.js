export async function fetchAddons(product_ids) {
    try {
      const response = await fetch(`/api/addon/getAddons?product_ids=${JSON.stringify(product_ids)}`);
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
      return data;
    } catch (error) {
    }
  }
  