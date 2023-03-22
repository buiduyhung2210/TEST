import CategoryController from '@controllers/api/admin/CategoriesController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/categories/{type}:
  *   post:
  *     tags:
  *      - "[ADMIN] CATEGORY"
  *     summary: thêm mới danh mục
  *     parameters:
  *      - in: path
  *        name: "type"
  *        description: "kiểu danh mục"
  *        type: "string"
  *        enum:
  *               - asset
  *      - in: "body"
  *        name: "body"
  *        description: "infomation"
  *        schema:
  *          type: "object"
  *          properties:
  *            name:
  *              type: "string"
  *              description: "tên danh mục"
  *            prefix:
  *              type: "string"
  *              description: "tiền tố mã thiết bị"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/:type', isAdmin, CategoryController.create);

/**
  * @openapi
  * /a/categories/{type}:
  *   get:
  *     tags:
  *      - "[ADMIN] CATEGORY"
  *     summary: thong tin danh mục
  *     parameters:
  *      - in: path
  *        name: "type"
  *        description: "kiểu danh mục"
  *        type: "string"
  *        enum:
  *               - asset
  *      - in: query
  *        name: "freeWord"
  *        description: "search"
  *        type: "string"
  *      - in: query
  *        name: "sortBy"
  *        description: "kiểu sort"
  *        type: "string"
  *        enum:
  *               - name
  *      - in: query
  *        name: "sortOrder"
  *        description: "thu tu sort"
  *        type: "string"
  *        enum:
  *               - ASC
  *               - DESC
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/:type', isAdmin, CategoryController.index);
/**
  * @openapi
  * /a/categories/{type}/{categoryId}:
  *   patch:
  *     tags:
  *      - "[ADMIN] CATEGORY"
  *     summary: cập nhật danh mục
  *     parameters:
  *      - in: path
  *        name: "type"
  *        description: "kiểu danh mục"
  *        type: "string"
  *        enum:
  *               - asset
  *      - in: path
  *        name: "categoryId"
  *        description: "categoryId"
  *        type: "number"
  *      - in: "body"
  *        name: "body"
  *        description: "infomation"
  *        schema:
  *          type: "object"
  *          properties:
  *            name:
  *              type: "string"
  *              description: "tên danh mục"
  *            prefix:
  *              type: "string"
  *              description: "tiền tố mã thiết bị"
  *     responses:
  *       200:
  *         description: Return data.
  *       404:
  *         description: No data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.patch('/:type/:categoryId', isAdmin, CategoryController.update);

/**
   * @openapi
   * /a/categories/{type}/{categoryId}:
   *   delete:
   *     tags:
   *      - "[ADMIN] CATEGORY"
   *     summary: xóa danh mục
   *     parameters:
   *      - in: path
   *        name: "type"
   *        description: "kiểu danh mục"
   *        type: "string"
   *        enum:
   *               - asset
   *      - in: path
   *        name: "categoryId"
   *        description: "categoryId"
   *        type: "number"
   *     responses:
   *       200:
   *         description: Return data.
   *       8:
   *         description: No data.
   *       500:
   *         description: Lỗi không xác định
   *     security:
   *      - Bearer: []
   */
router.delete('/:type/:categoryId', isAdmin, CategoryController.delete);

export default router;
