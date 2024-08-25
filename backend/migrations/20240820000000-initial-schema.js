'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = async (tableName) => {
      try {
        await queryInterface.describeTable(tableName);
        return true;
      } catch (err) {
        return false;
      }
    };

    // Clients Table
    if (!(await tableExists('Clients'))) {
      await queryInterface.createTable('Clients', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        subdomain: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: { is: /^[a-zA-Z0-9-]+$/ },
        },
        primaryColor: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '#3b82f6',
        },
        secondaryColor: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '#1e40af',
        },
        accentColor: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '#f59e0b',
        },
        primaryFont: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Roboto, sans-serif',
        },
        secondaryFont: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Open Sans, sans-serif',
        },
        branding: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Roles Table
    if (!(await tableExists('Roles'))) {
      await queryInterface.createTable('Roles', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        level: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Users Table
    if (!(await tableExists('Users'))) {
      await queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Locations Table
    if (!(await tableExists('Locations'))) {
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
        posLocationName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        overrideName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        waitTime: {
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
        timezone: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'America/New_York',
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
    }

    // Menus Table
    if (!(await tableExists('Menus'))) {
      await queryInterface.createTable('Menus', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // MenuGroups Table
    if (!(await tableExists('MenuGroups'))) {
      await queryInterface.createTable('MenuGroups', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // MenuItems Table
    if (!(await tableExists('MenuItems'))) {
      await queryInterface.createTable('MenuItems', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
          allowNull: false,
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Orders Table
    if (!(await tableExists('Orders'))) {
      await queryInterface.createTable('Orders', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        orderDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        totalAmount: {
          type: Sequelize.FLOAT,
          allowNull: false,
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
          onDelete: 'CASCADE',
        },
        loyaltyPoints: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        discount: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Wallets Table
    if (!(await tableExists('Wallets'))) {
      await queryInterface.createTable('Wallets', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        balance: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
          allowNull: false,
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Discounts Table
    if (!(await tableExists('Discounts'))) {
      await queryInterface.createTable('Discounts', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        vanityName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        vanityDescription: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        value: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        conditions: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        cooldownPeriod: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        maxUsesPerGuest: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        lastUsedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        locationRestrictions: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'active',
        },
        walletId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Wallets',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        locationId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Loyalty Rewards Table
    if (!(await tableExists('LoyaltyRewards'))) {
      await queryInterface.createTable('LoyaltyRewards', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pointsRequired: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        value: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'active',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // AuditLogs Table
    if (!(await tableExists('AuditLogs'))) {
      await queryInterface.createTable('AuditLogs', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        action: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        details: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        timestamp: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Brandings Table
    if (!(await tableExists('Brandings'))) {
      await queryInterface.createTable('Brandings', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        buttonShape: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'rounded',
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
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // Guests Table
    if (!(await tableExists('Guests'))) {
      await queryInterface.createTable('Guests', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        loyaltyPoints: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        favoriteMenuItem: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    // PosProfiles Table
    if (!(await tableExists('PosProfiles'))) {
      await queryInterface.createTable('PosProfiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        locationId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        posSystem: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        apiKey: {
          type: Sequelize.STRING,
          allowNull: false,
        },
                baseUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastSyncedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        syncFrequency: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 24, // default sync frequency in hours
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
    }

    // Reports Table
    if (!(await tableExists('Reports'))) {
      await queryInterface.createTable('Reports', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        reportName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order to handle dependencies properly
    await queryInterface.dropTable('Reports');
    await queryInterface.dropTable('PosProfiles');
    await queryInterface.dropTable('Guests');
    await queryInterface.dropTable('Brandings');
    await queryInterface.dropTable('AuditLogs');
    await queryInterface.dropTable('LoyaltyRewards');
    await queryInterface.dropTable('Discounts');
    await queryInterface.dropTable('Wallets');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('MenuItems');
    await queryInterface.dropTable('MenuGroups');
    await queryInterface.dropTable('Menus');
    await queryInterface.dropTable('Locations');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
    await queryInterface.dropTable('Clients');
  },
};


