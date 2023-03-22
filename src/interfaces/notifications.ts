interface NotificationInterface {
  id: number;
  title: string;
  content: string;
  sendableId: number[];
  sendableType: string;
  createId: number;
  sendAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default NotificationInterface;
