const OrderProvider = require '../models/OrderProvider';
const LocationMenu = require '../models/LocationMenu';
const { AppError } = require '../utils/errorHandler';
const { sendMenuToProvider, handleIncomingOrder, sendDoordashSSIOUpdate } = require '../utils/orderProviderIntegration';
const { scheduleMenuSync } = require '../utils/menuSyncScheduler';
const ScheduledOrder = require '../models/ScheduledOrder';
const { scheduleJob } = require 'node-schedule';

const createOrderProvider = async (locationId, providerData) => {
  const newProvider = await OrderProvider.create({ ...providerData, locationId });
  await sendMenuToProvider(newProvider);
  scheduleMenuSync(newProvider);
  return newProvider;
};

const updateOrderProvider = async (id, providerData) => {
  const provider = await OrderProvider.findByPk(id);
  if (!provider) {
    throw new AppError('Order provider not found', 404);
  }
  await provider.update(providerData);
  await sendMenuToProvider(provider);
  scheduleMenuSync(provider);
  return provider;
};

const getOrderProviders = async (locationId) => {
  return await OrderProvider.findAll({ where: { locationId } });
};

const deleteOrderProvider = async (id) => {
  const provider = await OrderProvider.findByPk(id);
  if (!provider) {
    throw new AppError('Order provider not found', 404);
  }
  await provider.destroy();
};

const processIncomingOrder = async (providerId, orderData) => {
  const provider = await OrderProvider.findByPk(providerId);
  if (!provider) {
    throw new AppError('Order provider not found', 404);
  }

  const transformedOrder = transformOrderData(orderData);
  const order = await Order.create(transformedOrder);

  if (orderData.scheduledTime && provider.handleScheduledOrders) {
    const scheduledTime = new Date(orderData.scheduledTime);
    const prepTime = new Date(scheduledTime.getTime() - provider.scheduledOrderLeadTime * 60000);

    await ScheduledOrder.create({
      orderId.id,
      scheduledTime,
    });

    scheduleJob(prepTime, async () => {
      await sendOrderToPOS(order);
      await ScheduledOrder.update({ sentToPOS }, { where: { orderId.id } });
    });
  } else {
    await sendOrderToPOS(order);
  }

  return order;
};

const syncMenuForProvider = async (providerId) => {
  const provider = await OrderProvider.findByPk(providerId);
  if (!provider) {
    throw new AppError('Order provider not found', 404);
  }
  const locationMenu = await LocationMenu.findOne({ 
    where: { locationId.locationId, isActive } 
  });
  if (!locationMenu) {
    throw new AppError('Active menu not found for this location', 404);
  }
  await sendMenuToProvider(provider, locationMenu.items);
  provider.lastMenuSync = new Date();
  await provider.save();
};

const createLocationMenu = async (locationId, menuData) => {
  const newMenu = await LocationMenu.create({ ...menuData, locationId });
  return newMenu;
};

const updateLocationMenu = async (id, menuData) => {
  const menu = await LocationMenu.findByPk(id);
  if (!menu) {
    throw new AppError('Menu not found', 404);
  }
  await menu.update(menuData);
  return menu;
};

const getLocationMenus = async (locationId) => {
  return await LocationMenu.findAll({ where: { locationId } });
};

const deleteLocationMenu = async (id) => {
  const menu = await LocationMenu.findByPk(id);
  if (!menu) {
    throw new AppError('Menu not found', 404);
  }
  await menu.destroy();
};

const updateDoordashSSIOSettings = async (providerId, ssioSettings) => {
  const provider = await OrderProvider.findByPk(providerId);
  if (!provider) {
    throw new AppError('Order provider not found', 404);
  }
  await provider.update(ssioSettings);
  await sendDoordashSSIOUpdate(provider);
  return provider;
};

const syncDoordashSSIOMenu = async (providerId) => {
  const provider = await OrderProvider.findByPk(providerId);
  if (!provider) {
    throw new AppError('Order provider not found', 404);
  }
  const locationMenu = await LocationMenu.findOne({ 
    where: { locationId.locationId, isActive } 
  });
  if (!locationMenu) {
    throw new AppError('Active menu not found for this location', 404);
  }
  await sendDoordashSSIOUpdate(provider, locationMenu.items);
  provider.lastMenuSync = new Date();
  await provider.save();
};

function transformOrderData(orderData) {
    throw new Error('Function not implemented.');
}


function sendOrderToPOS(order) {
    throw new Error('Function not implemented.');
}
