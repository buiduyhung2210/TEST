interface UserRequestInterface {
  id: number;
  userId: number;
  title: string;
  describe: string;
  status: string;
  adminNote: string;
  rejectReason: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  code: string;
  adminId: number;
};

export default UserRequestInterface;
