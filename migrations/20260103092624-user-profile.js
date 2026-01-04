"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users_profile", {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    profileId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      unique: true
    }
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable("users_profile");
}