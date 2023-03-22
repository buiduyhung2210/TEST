import RuleController from '@controllers/api/admin/RulesController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/rules:
  *   post:
  *     tags:
  *      - "[ADMIN] RULES"
  *     summary: Thêm mới nội quy
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "thông tin nội quy"
  *        schema:
  *          type: "object"
  *          properties:
  *            title:
  *              type: "string"
  *              description: "Tiêu đề"
  *            content:
  *              type: "string"
  *              description: "Nội dung"
  *            status:
  *              type: "enum"
  *              enum:
  *                - show
  *                - hide
  *              default: "hide"
  *              description: "Trạng thái hiển thị"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', isAdmin, RuleController.create);
/**
  * @openapi
  * /a/rules/{ruleId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] RULES"
  *     summary: Xóa nội quy
  *     parameters:
  *      - in: path
  *        name: "ruleId"
  *        description: "ruleId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:ruleId', isAdmin, RuleController.delete);

/**
 * @openapi
 * /a/rules/{ruleId}:
 *   patch:
 *     tags:
 *      - "[ADMIN] RULES"
 *     summary: Cập nhật nội quy
 *     parameters:
 *      - in: path
 *        name: "ruleId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin nội quy"
 *        schema:
 *          type: "object"
 *          properties:
 *            title:
 *              type: "string"
 *            content:
 *              type: "string"
  *            status:
  *              type: "enum"
  *              enum:
  *                - show
  *                - hide
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:ruleId', isAdmin, RuleController.update);

/**
 * @openapi
 * /a/rules/:
 *   get:
 *     tags:
 *      - "[ADMIN] RULES"
 *     summary: Danh sách / lọc - nội quy
 *     description: Danh sách / lọc - nội quy
 *     parameters:
 *      - in: query
 *        name: "freeWord"
 *        description: "Find by free word"
 *        type: "string"
 *      - in: query
 *        name: "dateFrom"
 *        type: "string"
 *        default: "2022-01-01"
 *        description: "from date"
 *      - in: query
 *        name: "dateTo"
 *        type: "string"
 *        default: "2023-01-01"
 *        description: "to date"
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
 *     security:
 *      - Bearer: []
 */
router.get('/', RuleController.index);
/**
 * @openapi
 * /a/rules/{ruleId}:
 *   get:
 *     tags:
 *      - "[ADMIN] RULES"
 *     summary: Chi tiết nội quy
 *     description: Chi tiết nội quy
 *     parameters:
 *      - in: path
 *        name: "ruleId"
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
router.get('/:ruleId', RuleController.show);
export default router;
