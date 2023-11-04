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
  },
  {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
  }
);

export { Pet };
