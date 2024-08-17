const updateReadyTime = (locationId, orderData) => {
  const { totalItems, totalAmount, totalOrders } = orderData;

  // Fetch location-specific throttle settings
  const location = await Location.findByPk(locationId);
  const throttleSettings = location.throttleSettings;

  // Apply the scaling logic based on the throttle settings
  let readyTimeIncrement = 0;

  if (totalItems >= throttleSettings.itemThreshold) {
    readyTimeIncrement += throttleSettings.itemIncrement; // e.g., 5 minutes
  }

  if (totalAmount >= throttleSettings.amountThreshold) {
    readyTimeIncrement += throttleSettings.amountIncrement; // e.g., 10 minutes
  }

  if (totalOrders >= throttleSettings.orderThreshold) {
    readyTimeIncrement += throttleSettings.orderIncrement; // e.g., 15 minutes
  }

  // Update the ready time for future orders at this location
  location.currentReadyTime += readyTimeIncrement;
  await location.save();

  return location.currentReadyTime;
};
