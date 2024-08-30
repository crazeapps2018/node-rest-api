module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("User", "profileImage", {
      type: Sequelize.STRING,
      allowNull: true, // Set to true if the profile image is optional
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("User", "profileImage");
  },
};
