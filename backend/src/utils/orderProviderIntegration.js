const axios = require 'axios';
const { Order } = require '../models/Order';
const { Location } = require '../models/Location';

const sendMenuToProvider = async (provider, menuItems[]) => {
  const location = await Location.findByPk(provider.locationId);
  if (!location) {
    throw new Error('Location not found');
  }

  const upliftedMenuItems = menuItems.map((item) => ({
    ...item,
    price.price * (1 + provider.upliftPercentage / 100),
  }));

  try {
    await axios.post(`${provider.apiUrl}/menu`, {
      apiKey.apiKey,
      menu,
    });
  } catch (error) {
    console.error(`Failed to send menu to ${provider.name}:`, error);
    throw error;
  }
};

const handleIncomingOrder = async (provider, orderData) => {
  // Validate the incoming order data
  // Transform the order data to match your internal order structure
  const transformedOrder = transformOrderData(orderData);

  // Apply any necessary business logic (e.g., inventory checks)

  // Create the order in your system
  const order = await Order.create(transformedOrder);

  // Send the order to the POS system
  await sendOrderToPOS(order);

  return order;
};

const transformOrderData = (orderData) => {
  // Implement the logic to transform the order data from the provider's format to your internal format
  // This will depend on the specific structure of the incoming order data and your internal order model
  return {
    // Map the fields accordingly
  };
};

const sendOrderToPOS = async (order) => {
  // Implement the logic to send the order to the POS system
  // This will depend on your POS integration
};

const sendDoordashSSIOUpdate = async (provider, menuItems?[]) => {
  const location = await Location.findByPk(provider.locationId);
  if (!location) {
    throw new Error('Location not found');
  }

  const ssioPayload = {
    external_reference_id.doordashExternalReferenceId,
    store_id.doordashStoreId,
    menu_id.doordashMenuId,
    // Add other required SSIO fields here
  };

  if (menuItems) {
    ssioPayload.items = menuItems.map((item) => ({
      external_id.id,
      name.name,
      description.description,
      price.price * (1 + provider.upliftPercentage / 100),
      // Add other required item fields here
    }));
  }

  try {
    await axios.post('https://api.doordash.com/drive/v2/ssio/update', ssioPayload, {
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Failed to send SSIO update to Doordash:`, error);
    throw error;
  }
};