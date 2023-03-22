import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, ValidationErrorItem } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import SupplierInterface from '@interfaces/supplier';
import SupplierEntity from '@entities/supplier';
import settings from '@configs/settings';

class SupplierModel extends Model<SupplierInterface> implements SupplierInterface {
  public id: number;
  public code: string;
  public name: string;
  public describe: string;
  public phoneNumber: string;
  public address: string;
  public note: string;
  public bankAccount: string;
  public taxCode: string;
  public category: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static readonly CREATABLE_PARAMETERS = ['code', 'name', 'describe', 'phoneNumber', 'address', 'note', 'bankAccount', 'taxCode', 'category'];
  static readonly UPDATABLE_PARAMETERS = ['name', 'describe', 'phoneNumber', 'address', 'note', 'bankAccount', 'taxCode', 'category'];

  static readonly hooks: Partial<ModelHooks<SupplierModel>> = {};

  static readonly validations: ModelValidateOptions = {
    async uniqueCode () {
      if (this.code) {
        const existedRecord = await SupplierModel.scope([{ method: ['byCode', this.code] }]).findOne();
        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Mã nhà cung cấp đã được sử dụng.', 'uniqueCode', 'code', this.code);
        }
      }
    },
    async validationPhoneNumber () {
      if (this.phoneNumber) {
        const check = settings.defaultRegex;
        if (check.test(this.phoneNumber) === false) {
          throw new ValidationErrorItem('Số điện thoại không đúng định dạng', 'validationPhoneNumber', 'phoneNumber', this.phoneNumber);
        }
      } else {
        throw new ValidationErrorItem('Số điện thoại chưa được nhập', 'validationPhoneNumber', 'phoneNumber', this.phoneNumber);
      }
    },
    async validationCode () {
      if (!this.code) {
        throw new ValidationErrorItem('Mã nhà cung cấp chưa được nhập', 'validationCode', 'code', this.code);
      }
    },
    async validationName () {
      if (!this.name) {
        throw new ValidationErrorItem('Tên nhà cung cấp chưa được nhập', 'validationName', 'name', this.name);
      }
    },
    async validationAddress () {
      if (!this.address) {
        throw new ValidationErrorItem('Địa chỉ nhà cung cấp chưa được nhập', 'validationAddress', 'address', this.address);
      }
    },
    async validationDescribe () {
      if (!this.describe) {
        throw new ValidationErrorItem('Mô tả chưa được nhập', 'validationDescribe', 'describe', this.describe);
      }
    },
  };

  static readonly scopes: ModelScopeOptions = {
    byCode (code) {
      return {
        where: { code },
      };
    },
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${freeWord || ''}%` } },
          ],
        },
      };
    },
    bySort (sortBy, sortOrder) {
      return {
        order: [
          [
            sortBy,
            sortOrder,
          ],
        ],
      };
    },
    withTotalAssets () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT COUNT(*) FROM assets WHERE supplierId = SupplierModel.id)'),
              'totalAssets',
            ],
          ],
        },
      };
    },
  };

  public static initialize (sequelize: Sequelize) {
    this.init(SupplierEntity, {
      hooks: SupplierModel.hooks,
      scopes: SupplierModel.scopes,
      validate: SupplierModel.validations,
      tableName: 'suppliers',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () {};
}

export default SupplierModel;
