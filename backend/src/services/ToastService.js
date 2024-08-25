const fetch = require('node-fetch');

class ToastService {
  // Method to authenticate with the Toast API
  async authenticate(clientId, clientSecret) {
    try {
      const response = await fetch('https://toast-api-server/authentication/v1/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          clientSecret,
          userAccessType: 'TOAST_MACHINE_CLIENT',
        }),
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.token; // Return the authentication token
    } catch (error) {
      console.error('Error during Toast API authentication:', error);
      throw error;
    }
  }

  // Method to fetch menu data from Toast
  async getMenu(token, restaurantId) {
    try {
      const response = await fetch(`https://toast-api-server/menus/v3/menus`, {
        method: 'GET',
        headers: {
          'Toast-Restaurant-External-ID': restaurantId,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch menu data: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract and return relevant menu data along with images
      return data.map(menu => ({
        ...menu,
        groups: menu.groups.map(group => ({
          ...group,
          imageUrl: group.images?.[0]?.url || null,
          items: group.items.map(item => ({
            ...item,
            imageUrl: item.images?.[0]?.url || null,
          })),
        })),
      }));
    } catch (error) {
      console.error('Error during menu retrieval from Toast:', error);
      throw error;
    }
  }
}

module.exports = new ToastService();
