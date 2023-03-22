import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';
import PurchaseHistoryController from '@controllers/api/admin/PurchasesHistoriesController';

const router = Router();
/**
 * @openapi
 * /a/purchases_histories/:
 *   get:
 *     tags:
 *      - "[ADMIN] PURCHASES_HISTORIES"
 *     summary: Lịch sử mua hàng
 *     description: Lịch sử mua hàng
 *     parameters:
 *      - in: query
 *        name: "supplierId"
 *        description: "supplierId"
 *        type: "string"
 *      - in: query
 *        name: "page"
 *        description: "page"
 *        type: "number"
 *      - in: query
 *        name: "limit"
 *        description: "limit"
 *        type: "number"
 *      - in: query
 *        name: "sortOrder"
 *        description: "sortOrder"
 *        type: "enum"
 *        enum:
 *          - DESC
 *          - ASC
 *      - in: query
 *        name: "sortBy"
 *        description: "sortBy"
 *        type: "string"
 *      - in: query
 *        name: "freeWord"
 *        description: "freeWord"
 *        type: "string"
 *      - in: query
 *        name: "dateFrom"
 *        description: "dateFrom"
 *        type: "date"
 *      - in: query
 *        name: "dateTo"
 *        description: "dateTo"
 *        type: "date"
 *     responses:
 *       200:
 *         description: "Upload success"
 *       404:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/', isAdmin, PurchaseHistoryController.index);

export default router;
