interface RepairHistoriesInterface {
  id : number;
  assetId: number;
  repairDate: Date;
  problemDetails: string;
  cost: number;
  createdAt : Date;
  updatedAt : Date;
};

export default RepairHistoriesInterface;
