import RepairHistoriesController from '@controllers/api/admin/RepairHistoriesController';
import { Router } from 'express';

const router = Router();
/**
  * @openapi
  * /a/repair_histories/:
  *   post:
  *     tags:
  *      - "[ADMIN] REPAIR_HISTORIES"
  *     summary: Thêm sửa chữa
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "Thêm sửa chữa"
  *        schema:
  *          type: "object"
  *          properties:
  *            assetId:
  *              type: "number"
  *            repairDate:
  *              type: "string"
  *            problemDetails:
  *              type: "string"
  *            cost:
  *              type: "number"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', RepairHistoriesController.create);

/**
  * @openapi
  * /a/repair_histories/:
  *   get:
  *     tags:
  *      - "[ADMIN] REPAIR_HISTORIES"
  *     summary: Lịch sử sửa chữa
  *     parameters:
  *      - in: "query"
  *        name: "assetId"
  *        type: "number"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/', RepairHistoriesController.index);
export default router;
