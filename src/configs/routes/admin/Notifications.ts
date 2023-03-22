import NotificationsController from '@controllers/api/admin/NotificationController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/notifications:
  *   post:
  *     tags:
  *      - "[ADMIN] NOTIFICATIONS"
  *     summary: Thêm mới thông báo
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "Thông tin thông báo"
  *        schema:
  *          type: "object"
  *          properties:
  *            title:
  *              type: "string"
  *              description: "Tiêu đề"
  *            content:
  *              type: "string"
  *              description: "Nội dung"
  *            sendableId:
  *              type: "string"
  *              description: "ID người nhận"
  *            sendableType:
  *              type: "enum"
  *              enum:
  *                - all
  *                - department
  *                - employee
  *              default: "all"
  *              description: "Lựa chọn gửi"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', isAdmin, NotificationsController.create);

export default router;
