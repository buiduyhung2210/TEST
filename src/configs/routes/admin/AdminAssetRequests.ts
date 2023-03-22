import AdminAssetRequestController from '@controllers/api/admin/AdminAssetRequestsController';
import PersonalAssetRequestController from '@controllers/api/admin/PersonalAssetRequestsController';
import UserModel from '@models/users';
import { Router, Request, Response } from 'express';
import { sendError } from '@libs/response';
import { NoAccessPermission } from '@libs/errors';

const router = Router();
/**
 * @openapi
 * /a/asset_requests/{procedure}:
 *   post:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: Thêm mới yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "procedure"
 *        type: "enum"
 *        enum:
 *          - recall
 *          - renew
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
 *            deadline:
 *              type: "string"
 *            assetCategoryId:
 *              type: "number"
 *            assetId:
 *              type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.post('/:procedure', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.USER: PersonalAssetRequestController.create(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests/{assetRequestId}:
 *   delete:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: Xóa yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "assetRequestId"
 *        description: "assetRequestId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.delete('/:assetRequestId', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.USER:PersonalAssetRequestController.delete(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests/{assetRequestId}/cancel:
 *   patch:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: Hủy yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "assetRequestId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:assetRequestId/cancel', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.USER: PersonalAssetRequestController.cancel(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests:
 *   get:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: Hiển thị danh sách yêu cầu thiết bị
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
router.get('/', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.ADMIN: AdminAssetRequestController.index(req, res); break;
    case UserModel.TYPE_ENUM.USER: PersonalAssetRequestController.index(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests/{assetRequestId}:
 *   get:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: Hiển thị chi tiết yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "assetRequestId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/:assetRequestId', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.ADMIN: AdminAssetRequestController.show(req, res); break;
    case UserModel.TYPE_ENUM.USER: PersonalAssetRequestController.show(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests/{assetRequestId}/approve:
 *   patch:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: phê duyệt yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "assetRequestId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:assetRequestId/approve', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.ADMIN: AdminAssetRequestController.approve(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests/{assetRequestId}/deny:
 *   patch:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: từ chối yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "assetRequestId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Chỉnh sửa yêu cầu thiết bị"
 *        schema:
 *          type: "object"
 *          properties:
 *            rejectReason:
 *              type: "string"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:assetRequestId/deny', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.ADMIN: AdminAssetRequestController.deny(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

/**
 * @openapi
 * /a/asset_requests/{assetRequestId}:
 *   patch:
 *     tags:
 *      - "ASSET REQUESTS"
 *     summary: Chỉnh sửa yêu cầu thiết bị
 *     parameters:
 *      - in: path
 *        name: "assetRequestId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Chỉnh sửa yêu cầu thiết bị"
 *        schema:
 *          type: "object"
 *          properties:
 *            adminNote:
 *              type: "string"
 *            assetId:
 *               type: "number"
 *            describe:
 *               type: "string"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:assetRequestId', (req: Request, res: Response) => {
  switch (req.currentUser.role) {
    case UserModel.TYPE_ENUM.ADMIN: AdminAssetRequestController.update(req, res); break;
    case UserModel.TYPE_ENUM.USER: PersonalAssetRequestController.update(req, res); break;
    default : sendError(res, 305, NoAccessPermission);
  }
});

export default router;
