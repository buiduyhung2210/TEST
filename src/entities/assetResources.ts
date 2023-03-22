import settings from '@configs/settings';
import { DataTypes } from 'sequelize';

const AssetResources = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  source: {
    type: DataTypes.STRING(255),
    allowNull: false,
    get (): string {
      const source = this.getDataValue('type') === 'file'
        ? `${settings.fileStorageHost}/${this.getDataValue('source')}`
        : (this.getDataValue('type') === 'video'
            ? `${settings.videoStorageHost}/${this.getDataValue('source')}`
            : `${settings.imageStorageHost}/${this.getDataValue('source')}`);
      return source;
    },
  },
  assetId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  type: {
    type: DataTypes.ENUM({ values: ['image', 'video', 'file'] }), defaultValue: 'image',
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default AssetResources;
