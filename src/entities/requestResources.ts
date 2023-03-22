import settings from '@configs/settings';
import { DataTypes } from 'sequelize';

const RequestResourceEntity = {
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
      let source: string;
      if (this.getDataValue('type') === 'file') {
        source = `${settings.fileStorageHost}/${this.getDataValue('source')}`;
      } else if (this.getDataValue('type') === 'video') {
        source = `${settings.videoStorageHost}/${this.getDataValue('source')}`;
      } else if (this.getDataValue('type') === 'image') {
        source = `${settings.imageStorageHost}/${this.getDataValue('source')}`;
      }
      return source;
    },
  },
  requestAbleType: {
    type: DataTypes.STRING, allowNull: false,
  },
  requestAbleId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  type: {
    type: DataTypes.ENUM({ values: ['image', 'video', 'file'] }),
    defaultValue: 'image',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default RequestResourceEntity;
