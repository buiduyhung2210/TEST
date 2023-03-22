interface AssetRequestsInterface {
  id: number;
  userId: number;
  title: string;
  describe: string;
  status: string;
  assetCategoryId: number;
  deadline: Date;
  code: string;
  procedure: string;
  adminId: number;
  assetId: number;
  adminNote: string;
  rejectReason: string;
  dateProcess: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default AssetRequestsInterface;
