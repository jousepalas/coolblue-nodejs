// models/Pet.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db'; // Import your Sequelize instance

class Pet extends Model {
  id!: number;
  name!: string;
  species!: string;
  available!: boolean;
  birthYear!: number;
  dateAdded!: string;
  photoUrl!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    species: {
      type: DataTypes.STRING,
    },
    available: {
      type: DataTypes.BOOLEAN,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
    dateAdded: {
      type: DataTypes.STRING,
    },
    photoUrl: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Pet',
    paranoid: true,
    tableName: 'pets',
  }
);

export { Pet };
