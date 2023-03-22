import CategoryInterface from './categories';

interface AssetInterface {
  id: number;
  code: string;
  name: string;
  categoryId: number;
  supplierId: number;
  userId: number;
  price: number;
  detail: string;
  status: string;
  type: string;
  boughtDate: Date;
  warrantyExpriedDate: Date;
  purchaseInformation: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  category?: CategoryInterface;
};

export default AssetInterface;
