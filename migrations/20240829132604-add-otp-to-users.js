// migrations/xxxxxx-add-otp-to-users.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("User", "otp", {
      type: Sequelize.STRING,
      allowNull: true, // Set to true if you want to allow null values
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("User", "otp");
  },
};
