import AdminRequestController from '@controllers/api/admin/AdminRequestController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/admin_requests:
  *   get:
  *     tags:
  *      - "[ADMIN] ADMIN REQUESTS"
  *     summary: Hiển thị danh sách yêu cầu
  *     parameters:
  *      - in: query
  *        name: "page"
  *        description: "page"
  *        type: "number"
  *      - in: query
  *        name: "limit"
  *        description: "limit"
  *        type: "number"
  *      - in: query
  *        name: "freeWord"
  *        description: "freeWord"
  *        type: "string"
  *      - in: query
  *        name: "status"
  *        description: "status"
  *        type: "enum"
  *        enum:
  *          - waitingApproval
  *          - processing
  *          - processed
  *          - denied
  *          - cancelled
  *      - in: query
  *        name: "dateFrom"
  *        default: "2022-01-01"
  *        description: "dateFrom"
  *        type: "string"
  *      - in: query
  *        name: "dateTo"
  *        default: "2023-01-01"
  *        description: "dateTo"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/', isAdmin, AdminRequestController.index);

/**
  * @openapi
  * /a/admin_requests/{userRequestId}:
  *   get:
  *     tags:
  *      - "[ADMIN] ADMIN REQUESTS"
  *     summary: Hiển thị chi tiết yêu cầu
  *     parameters:
  *      - in: path
  *        name: "userRequestId"
  *        type: "number"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/:userRequestId', isAdmin, AdminRequestController.show);

/**
  * @openapi
  * /a/admin_requests/{userRequestId}:
  *   patch:
  *     tags:
  *      - "[ADMIN] ADMIN REQUESTS"
  *     summary: Chỉnh sửa yêu cầu
  *     parameters:
  *      - in: path
  *        name: "userRequestId"
  *        type: "number"
  *      - in: "body"
  *        name: "body"
  *        description: "Chỉnh sửa yêu cầu"
  *        schema:
  *          type: "object"
  *          properties:
  *            adminNote:
  *              type: "string"
  *            rejectReason:
  *              type: "string"
  *            status:
  *              type: "string"
  *              enum:
  *               - processing
  *               - processed
  *               - denied
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.patch('/:userRequestId', isAdmin, AdminRequestController.update);

export default router;
