const { MenuItem, Modifier } = require '../models';
const { AppError } = require '../utils/errorHandler';

const getMenuItemsByLocation = async (locationId) => {
  const menuItems = await MenuItem.findAll({
    where: { locationId },
    include: [
      {
        model,
        as: 'modifiers',
      },
      {
        model,
        as: 'defaultModifiers',
      },
    ],
  });

  if (!menuItems) {
    throw new AppError('No menu items found for this location', 404);
  }

  return menuItems;
};