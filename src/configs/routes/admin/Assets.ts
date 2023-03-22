import AssetController from '@controllers/api/admin/AssetsController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/assets:
  *   post:
  *     tags:
  *      - "[ADMIN] ASSET"
  *     summary: thêm mới thiết bị
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "infomation"
  *        schema:
  *          type: "object"
  *          properties:
  *            name:
  *              type: "string"
  *              description: "tên thiết bị"
  *            amount:
  *              type: "number"
  *              description: "số lượng"
  *              default: 1
  *            categoryId:
  *              type: "number"
  *              description: "id danh mục"
  *            supplierId:
  *              type: "number"
  *              description: "mã nhà cung cấp"
  *            type:
  *              type: "string"
  *              description: "kiểu thiết bị"
  *              enum:
  *                   - general
  *                   - personal
  *            price:
  *              type: "number"
  *              description: "giá thiết bị"
  *            detail:
  *              type: "string"
  *              description: "mô tả"
  *            boughtDate:
  *              type: "string"
  *              description: "ngày mua"
  *            warrantyExpriedDate:
  *              type: "string"
  *              description: "ngày hết hạn bảo hành"
  *            purchaseInformation:
  *              type: "string"
  *              description: "thông tin mua hang"
  *            note:
  *              type: "string"
  *              description: "ghi chú"
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
router.post('/', isAdmin, AssetController.create);

/**
  * @openapi
  * /a/assets:
  *   get:
  *     tags:
  *      - "[ADMIN] ASSET"
  *     summary: thông tin thiết bị
  *     description: Chi tiết thiet bi
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
  *        name: "categoryId"
  *        description: "categoryId"
  *        type: "string"
  *      - in: query
  *        name: "type"
  *        description: "type"
  *        type: "enum"
  *        enum:
  *          - general
  *          - personal
  *      - in: query
  *        name: "status"
  *        description: "status"
  *        type: "enum"
  *        enum:
  *          - beingUsed
  *          - spare
  *          - broken
  *          - sold
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/', isAdmin, AssetController.index);

/**
 * @openapi
 * /a/assets/{assetId}:
 *   get:
 *     tags:
 *      - "[ADMIN] ASSET"
 *     summary: Chi tiết thiet bi
 *     description: Chi tiết thiet bi
 *     parameters:
 *      - in: path
 *        name: "assetId"
 *        type: "number"
 *     responses:
 *       200:
 *         description:  Return data.
 *       404:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/:assetId', isAdmin, AssetController.show);

/**
  * @openapi
  * /a/assets/{assetId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] ASSET"
  *     summary: Xóa thiet bi
  *     parameters:
  *      - in: path
  *        name: "assetId"
  *        description: "assetId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:assetId', isAdmin, AssetController.delete);

/**
  * @openapi
  * /a/assets/{assetId}:
  *   patch:
  *     tags:
  *      - "[ADMIN] ASSET"
  *     summary: cap nhat thiet bi
  *     parameters:
  *      - in: path
  *        name: "assetId"
  *        description: "assetId"
  *        type: "string"
  *      - in: "body"
  *        name: "body"
  *        description: "infomation"
  *        schema:
  *          type: "object"
  *          properties:
  *            categoryId:
  *              type: "number"
  *              description: "id danh mục"
  *            type:
  *              type: "string"
  *              description: "kiểu thiết bị"
  *              enum:
  *                   - general
  *                   - personal
  *            price:
  *              type: "number"
  *              description: "giá thiết bị"
  *            detail:
  *              type: "string"
  *              description: "mô tả"
  *            boughtDate:
  *              type: "string"
  *              description: "ngày mua"
  *            warrantyExpriedDate:
  *              type: "string"
  *              description: "ngày hết hạn bảo hành"
  *            purchaseInformation:
  *              type: "string"
  *              description: "thông tin mua hang"
  *            note:
  *              type: "string"
  *              description: "ghi chú"
  *            medias:
  *              type: "array"
  *              items:
  *                type: "object"
  *                properties:
  *                  id:
  *                    type: "number"
  *                    description: "asset id"
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
router.patch('/:assetId', isAdmin, AssetController.update);

export default router;
