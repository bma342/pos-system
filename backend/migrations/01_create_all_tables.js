'use strict';

const { tableExists } = require('./helpers/migrationHelpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clients table
    if (!(await tableExists(queryInterface, 'Clients'))) {
      await queryInterface.createTable('Clients', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        subdomain: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        features: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        settings: {
          type: Sequelize.JSON,
          defaultValue: {},
        },
        brandingOptions: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        clientSettings: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Clients table created');
    } else {
      console.log('Clients table already exists');
    }

    // Locations table
    if (!(await tableExists(queryInterface, 'Locations'))) {
      await queryInterface.createTable('Locations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        zipCode: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isOpen: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        diningOptions: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
        },
        latitude: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Locations table created');
    } else {
      console.log('Locations table already exists');
    }
    // Roles table
    if (!(await tableExists(queryInterface, 'Roles'))) {
      await queryInterface.createTable('Roles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        level: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Roles table created');
    } else {
      console.log('Roles table already exists');
    }

    // Users table
    if (!(await tableExists(queryInterface, 'Users'))) {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Roles',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Users table created');
    } else {
      console.log('Users table already exists');
    }

    // PosProfiles table
    if (!(await tableExists(queryInterface, 'PosProfiles'))) {
      await queryInterface.createTable('PosProfiles', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        posApiKey: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        apiBaseUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        clientSecret: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        contentType: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'application/json',
        },
        roundingOption: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        testProfile: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        lastSyncedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        syncFrequency: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 24,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('PosProfiles table created');
    } else {
      console.log('PosProfiles table already exists');
    }
    // Menus table
    if (!(await tableExists(queryInterface, 'Menus'))) {
      await queryInterface.createTable('Menus', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        locationId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Locations',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        menuType: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'regular',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Menus table created');
    } else {
      console.log('Menus table already exists');
    }

    // MenuGroups table
    if (!(await tableExists(queryInterface, 'MenuGroups'))) {
      await queryInterface.createTable('MenuGroups', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        menuId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Menus',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        displayOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        startTime: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        endTime: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        daysAvailable: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('MenuGroups table created');
    } else {
      console.log('MenuGroups table already exists');
    }

    // MenuItems table
    if (!(await tableExists(queryInterface, 'MenuItems'))) {
      await queryInterface.createTable('MenuItems', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        menuGroupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'MenuGroups',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        basePrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        pointsPrice: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        posItemId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        displayOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        calories: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        allergens: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
        },
        dietaryRestrictions: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
        },
        customizations: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('MenuItems table created');
    } else {
      console.log('MenuItems table already exists');
    }

    // Modifiers table
    if (!(await tableExists(queryInterface, 'Modifiers'))) {
      await queryInterface.createTable('Modifiers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        posModifierId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        modifierType: {
          type: Sequelize.ENUM('add-on', 'removal', 'substitution'),
          allowNull: false,
          defaultValue: 'add-on',
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        calories: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        allergens: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
        },
        displayOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Modifiers table created');
    } else {
      console.log('Modifiers table already exists');
    }

    // MenuItemModifiers table
    if (!(await tableExists(queryInterface, 'MenuItemModifiers'))) {
      await queryInterface.createTable('MenuItemModifiers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        menuItemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'MenuItems',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        modifierId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Modifiers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        isDefault: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isRequired: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        minQuantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        maxQuantity: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        displayOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        priceOverride: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('MenuItemModifiers table created');
    } else {
      console.log('MenuItemModifiers table already exists');
    }

    // Guests table
    if (!(await tableExists(queryInterface, 'Guests'))) {
      await queryInterface.createTable('Guests', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Guests table created');
    } else {
      console.log('Guests table already exists');
    }
    // Orders table
    if (!(await tableExists(queryInterface, 'Orders'))) {
      await queryInterface.createTable('Orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        guestId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Guests',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        locationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Locations',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        orderDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        status: {
          type: Sequelize.ENUM('pending', 'completed', 'canceled'),
          allowNull: false,
          defaultValue: 'pending',
        },
        totalAmount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        subtotal: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        tax: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        tip: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        discount: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        paymentMethod: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        loyaltyPointsEarned: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        loyaltyPointsRedeemed: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        orderType: {
          type: Sequelize.ENUM('pickup', 'delivery', 'dine-in'),
          allowNull: false,
        },
        specialInstructions: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        estimatedPickupTime: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        actualPickupTime: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Orders table created');
    } else {
      console.log('Orders table already exists');
    }

    // OrderItems table
    if (!(await tableExists(queryInterface, 'OrderItems'))) {
      await queryInterface.createTable('OrderItems', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        itemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'MenuItems',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        itemName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        itemPrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('OrderItems table created');
    } else {
      console.log('OrderItems table already exists');
    }

    // OrderModifiers table
    if (!(await tableExists(queryInterface, 'OrderModifiers'))) {
      await queryInterface.createTable('OrderModifiers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderItemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'OrderItems',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        modifierId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Modifiers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        modifierName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        modifierPrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('OrderModifiers table created');
    } else {
      console.log('OrderModifiers table already exists');
    }

    // Wallets table
    if (!(await tableExists(queryInterface, 'Wallets'))) {
      await queryInterface.createTable('Wallets', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        guestId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Guests',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        balance: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.00,
        },
        currency: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'USD',
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        lastTransactionDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Wallets table created');
    } else {
      console.log('Wallets table already exists');
    }

    // Discounts table
    if (!(await tableExists(queryInterface, 'Discounts'))) {
      await queryInterface.createTable('Discounts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM('percentage', 'fixed'),
          allowNull: false,
        },
        value: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        validFrom: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        validTo: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
      console.log('Discounts table created');
    } else {
      console.log('Discounts table already exists');
    }

    // LoyaltyPrograms table
    if (!(await tableExists(queryInterface, 'LoyaltyPrograms'))) {
      await queryInterface.createTable('LoyaltyPrograms', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        pointsPerDollar: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        redemptionRate: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0.01,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('LoyaltyPrograms table created');
    } else {
      console.log('LoyaltyPrograms table already exists');
    }
    // Rewards table
    if (!(await tableExists(queryInterface, 'Rewards'))) {
      await queryInterface.createTable('Rewards', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        loyaltyProgramId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'LoyaltyPrograms',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        pointsRequired: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Rewards table created');
    } else {
      console.log('Rewards table already exists');
    }

    // Coupons table
    if (!(await tableExists(queryInterface, 'Coupons'))) {
      await queryInterface.createTable('Coupons', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        discountType: {
          type: Sequelize.ENUM('percentage', 'fixed'),
          allowNull: false,
        },
        discountValue: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        usageLimit: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Coupons table created');
    } else {
      console.log('Coupons table already exists');
    }

    // Brandings table
    if (!(await tableExists(queryInterface, 'Brandings'))) {
      await queryInterface.createTable('Brandings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        primaryColor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        secondaryColor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        tertiaryColor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        fontColor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        secondaryFontColor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        fontFamily: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'Arial',
        },
        logoUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        backgroundUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        faviconUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        customCss: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        buttonStyle: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        headerStyle: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        footerStyle: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Brandings table created');
    } else {
      console.log('Brandings table already exists');
    }

    // GuestPreferences table
    if (!(await tableExists(queryInterface, 'GuestPreferences'))) {
      await queryInterface.createTable('GuestPreferences', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        guestId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Guests',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        preferenceType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        preferenceValue: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('GuestPreferences table created');
    } else {
      console.log('GuestPreferences table already exists');
    }

    // Reports table
    if (!(await tableExists(queryInterface, 'Reports'))) {
      await queryInterface.createTable('Reports', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        reportType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        reportData: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Reports table created');
    } else {
      console.log('Reports table already exists');
    }

    // CateringOrders table
    if (!(await tableExists(queryInterface, 'CateringOrders'))) {
      await queryInterface.createTable('CateringOrders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        guestId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Guests',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        locationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Locations',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        eventDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        totalCost: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        notes: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        status: {
          type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
          allowNull: false,
          defaultValue: 'pending',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('CateringOrders table created');
    } else {
      console.log('CateringOrders table already exists');
    }

    // ABTests table
    if (!(await tableExists(queryInterface, 'ABTests'))) {
      await queryInterface.createTable('ABTests', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        testName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        menuItemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'MenuItems',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        testVariant: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        variantDescription: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        testType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        upliftSettings: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: 'active',
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('ABTests table created');
    } else {
      console.log('ABTests table already exists');
    }

    // AuditLogs table
    if (!(await tableExists(queryInterface, 'AuditLogs'))) {
      await queryInterface.createTable('AuditLogs', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        action: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        entityType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        entityId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        details: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        ipAddress: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        userAgent: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('AuditLogs table created');
    } else {
      console.log('AuditLogs table already exists');
    }

    // HouseAccounts table
    if (!(await tableExists(queryInterface, 'HouseAccounts'))) {
      await queryInterface.createTable('HouseAccounts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        accountName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        billingAddress: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        contactEmail: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        creditLimit: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('HouseAccounts table created');
    } else {
      console.log('HouseAccounts table already exists');
    }

    // Analytics table
    if (!(await tableExists(queryInterface, 'Analytics'))) {
      await queryInterface.createTable('Analytics', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        locationId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Locations',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        metricType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        metricValue: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        dimension1: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        dimension2: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        dimension3: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        additionalData: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('Analytics table created');
    } else {
      console.log('Analytics table already exists');
    }

    // GlobalSettings table
    if (!(await tableExists(queryInterface, 'GlobalSettings'))) {
      await queryInterface.createTable('GlobalSettings', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        value: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        dataType: {
          type: Sequelize.ENUM('string', 'number', 'boolean', 'json'),
          allowNull: false,
          defaultValue: 'string',
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isEditable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        lastModifiedBy: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
      console.log('GlobalSettings table created');
    } else {
      console.log('GlobalSettings table already exists');
    }

    console.log('All tables created or verified successfully');
  },

  down: async (queryInterface, Sequelize) => {
    // Drop all tables in reverse order
    await queryInterface.dropTable('GlobalSettings');
    await queryInterface.dropTable('Analytics');
    await queryInterface.dropTable('HouseAccounts');
    await queryInterface.dropTable('AuditLogs');
    await queryInterface.dropTable('ABTests');
    await queryInterface.dropTable('CateringOrders');
    await queryInterface.dropTable('Reports');
    await queryInterface.dropTable('GuestPreferences');
    await queryInterface.dropTable('Brandings');
    await queryInterface.dropTable('Coupons');
    await queryInterface.dropTable('Rewards');
    await queryInterface.dropTable('LoyaltyPrograms');
    await queryInterface.dropTable('Discounts');
    await queryInterface.dropTable('Wallets');
    await queryInterface.dropTable('OrderModifiers');
    await queryInterface.dropTable('OrderItems');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Guests');
    await queryInterface.dropTable('MenuItemModifiers');
    await queryInterface.dropTable('Modifiers');
    await queryInterface.dropTable('MenuItems');
    await queryInterface.dropTable('MenuGroups');
    await queryInterface.dropTable('Menus');
    await queryInterface.dropTable('CorePOSProfiles');
    await queryInterface.dropTable('PosIntegrationSettings');
    await queryInterface.dropTable('PosProfiles');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
    await queryInterface.dropTable('Locations');
    await queryInterface.dropTable('Clients');
    // Add any additional table drops here...

    console.log('All tables dropped successfully');
  }
};
