interface DepartmentInterface {
    id: number;
    departmentName: string;
    departmentCode:string;
    managerId: number;
    address: string;
    assetNumber: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };

export default DepartmentInterface;
