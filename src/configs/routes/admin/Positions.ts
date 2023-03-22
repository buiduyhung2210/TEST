import PositionController from '@controllers/api/admin/PositionController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/positions:
  *   post:
  *     tags:
  *      - "[ADMIN] POSITIONS"
  *     summary: Thêm mới chức vụ
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "thông tin chức vụ"
  *        schema:
  *          type: "object"
  *          properties:
  *            title:
  *              type: "string"
  *            description:
  *              type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', isAdmin, PositionController.create);
/**
 * @openapi
 * /a/positions/:
 *   get:
 *     tags:
 *      - "[ADMIN] POSITIONS"
 *     summary: Danh sách chức vụ
 *     description: Danh sách chức vụ
 *     parameters:
 *      - in: query
 *        name: "freeWord"
 *        description: "Find by free word"
 *        type: "string"
 *      - in: query
 *        name: "sortOrder"
 *        type: "enum"
 *        description: "sort order"
 *        enum:
 *          - DESC
 *          - ASC
 *        default: "DESC"
 *      - in: query
 *        name: "sortBy"
 *        type: "string"
 *        default: "id"
 *        description: "sort by"
 *     responses:
 *       200:
 *         description: "Return data."
 *       404:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 */
router.get('/', PositionController.index);

/**
 * @openapi
 * /a/positions/{positionId}:
 *   get:
 *     tags:
 *      - "[ADMIN] POSITIONS"
 *     summary: Chi tiết chức vụ
 *     description: Chi tiết chức vụ
 *     parameters:
 *      - in: path
 *        name: "positionId"
 *        type: "number"
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
router.get('/:positionId', PositionController.show);

/**
 * @openapi
 * /a/positions/{positionId}:
 *   patch:
 *     tags:
 *      - "[ADMIN] POSITIONS"
 *     summary: Cập nhật chức vụ
 *     parameters:
 *      - in: path
 *        name: "positionId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin chức vụ"
 *        schema:
 *          type: "object"
 *          properties:
 *            title:
 *              type: "string"
 *            description:
 *              type: "string"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:positionId', PositionController.update);
/**
  * @openapi
  * /a/positions/{positionId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] POSITIONS"
  *     summary: Xóa chức vụ
  *     parameters:
  *      - in: path
  *        name: "positionId"
  *        description: "positionId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:positionId', PositionController.delete);
export default router;
