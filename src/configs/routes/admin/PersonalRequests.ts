import PersonalRequestController from '@controllers/api/admin/PersonalRequestsController';
import { Router } from 'express';

const router = Router();
/**
  * @openapi
  * /a/personal_requests:
  *   post:
  *     tags:
  *      - "[ADMIN] PERSONAL REQUESTS"
  *     summary: Thêm mới yêu cầu
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "Thêm mới yêu cầu"
  *        schema:
  *          type: "object"
  *          properties:
  *            title:
  *              type: "string"
  *            describe:
  *              type: "string"
  *            medias:
  *              type: "array"
  *              items:
  *                type: "object"
  *                properties:
  *                  source:
  *                    type: "string"
  *                    description: "link file"
  *                  type:
  *                    type: "string"
  *                    description: "upload type"
  *                    enum:
  *                       - file
  *                       - image
  *                       - video
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', PersonalRequestController.create);

/**
  * @openapi
  * /a/personal_requests:
  *   get:
  *     tags:
  *      - "[ADMIN] PERSONAL REQUESTS"
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
  *        name: "fromDate"
  *        description: "dateFrom"
  *        default: "2022-01-01"
  *        type: "string"
  *      - in: query
  *        name: "toDate"
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
router.get('/', PersonalRequestController.index);

/**
  * @openapi
  * /a/personal_requests/{userRequestId}:
  *   get:
  *     tags:
  *      - "[ADMIN] PERSONAL REQUESTS"
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
router.get('/:userRequestId', PersonalRequestController.show);

/**
  * @openapi
  * /a/personal_requests/{userRequestId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] PERSONAL REQUESTS"
  *     summary: Xóa yêu cầu
  *     parameters:
  *      - in: path
  *        name: "userRequestId"
  *        description: "userRequestId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:userRequestId', PersonalRequestController.delete);

/**
  * @openapi
  * /a/personal_requests/{userRequestId}:
  *   patch:
  *     tags:
  *      - "[ADMIN] PERSONAL REQUESTS"
  *     summary: Cập nhật yêu cầu cá nhân
  *     parameters:
  *      - in: path
  *        name: "userRequestId"
  *        type: "number"
  *      - in: "body"
  *        name: "body"
  *        schema:
  *          type: "object"
  *          properties:
  *            describe:
  *              type: "string"
  *            medias:
  *              type: "array"
  *              items:
  *                type: "object"
  *                properties:
  *                  id:
  *                    type: "number"
  *                    description: "userRequest id"
  *                  source:
  *                    type: "string"
  *                    description: "link file"
  *                  type:
  *                    type: "string"
  *                    description: "upload type"
  *                    enum:
  *                       - file
  *                       - image
  *                       - video
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.patch('/:userRequestId', PersonalRequestController.update);

/**
  * @openapi
  * /a/personal_requests/{userRequestId}/cancel:
  *   patch:
  *     tags:
  *      - "[ADMIN] PERSONAL REQUESTS"
  *     summary: Hủy yêu cầu
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
router.patch('/:userRequestId/cancel', PersonalRequestController.cancel);

export default router;
