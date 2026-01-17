"use strict";

export default (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "users_profile",
      timestamps: false
    }
  );

  return Profile;
};
