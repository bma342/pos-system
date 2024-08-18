const Order = require('../models/Order');
const OrderHistory = require('../models/OrderHistory');
const Guest = require('../models/Guest');

// Endpoint for syncing menus from the POS system
exports.syncMenus = async (req, res) => {
  try {
    // Placeholder logic for syncing menus
    res.json({ message: 'Menus synced successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing menus', error });
  }
};

// Endpoint for syncing orders from the POS system
exports.syncOrders = async (req, res) => {
  try {
    // Placeholder logic for syncing orders
    res.json({ message: 'Orders synced successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing orders', error });
  }
};

// Endpoint for syncing inventory from the POS system
exports.syncInventory = async (req, res) => {
  try {
    // Placeholder logic for syncing inventory
    res.json({ message: 'Inventory synced successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing inventory', error });
  }
};

// Endpoint for reporting completed in-store orders from the POS system
exports.reportInStoreOrder = async (req, res) => {
  const { guestPhone, items, totalAmount, paymentMethod, locationId } = req.body;

  try {
    // Find the guest by phone number
    const guest = await Guest.findOne({ where: { phone: guestPhone } });

    if (!guest) {
      return res.status(404).json({ message: 'Guest not found.' });
    }

    // Save the order details
    const order = await Order.create({
      guestId: guest.id,
      locationId,
      paymentMethod,
      totalAmount,
      orderDetails: items,
    });

    // Save the order history
    await OrderHistory.create({
      orderId: order.id,
      guestId: guest.id,
      locationId,
      paymentMethod,
      action: 'In-Store Order Reported',
      orderDetails: items,
    });

    // Update guest's loyalty points and apply any provider bonuses
    let loyaltyPointsEarned = calculateLoyaltyPoints(totalAmount);
    loyaltyPointsEarned *= guest.providerLoyaltyBonuses?.instore || 1; // Apply in-store bonus if configured
    guest.loyaltyPoints += loyaltyPointsEarned;
    await guest.save();

    res.json({
      message: 'In-store order reported successfully.',
      orderId: order.id,
      loyaltyPointsEarned,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting in-store order', error });
  }
};

// Helper function to calculate loyalty points
function calculateLoyaltyPoints(amount) {
  return Math.floor(amount / 10); // Example: 1 point for every $10 spent
}
