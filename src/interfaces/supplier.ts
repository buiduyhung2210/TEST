interface SupplierInterface {
    id: number;
    code: string;
    name: string;
    describe: string;
    phoneNumber: string;
    address: string;
    note: string;
    bankAccount: string,
    taxCode: string,
    category: string,
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };

export default SupplierInterface;
