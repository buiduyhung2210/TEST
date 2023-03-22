interface UserNotificationInterface {
  id: number;
  title: string;
  content: string;
  notificationId: number;
  userId: number;
  readAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default UserNotificationInterface;
