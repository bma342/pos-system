const getDiscountsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const discounts = await DiscountService.getDiscountsByLocation(locationId);
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discounts', error: error.message });
  }
};

// ... other controller methods

module.exports = {
  getDiscountsByLocation,
  // ... other exported methods
};