import SupplierController from '@controllers/api/admin/SuppliersController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/suppliers:
  *   post:
  *     tags:
  *      - "[ADMIN] SUPPLIERS"
  *     summary: Thêm mới nhà cung cấp
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "thông tin nhà cung cấp"
  *        schema:
  *          type: "object"
  *          properties:
  *            code:
  *              description: "Mã nhà cung cấp"
  *              type: "string"
  *            name:
  *              description: "Tên nhà cung cấp"
  *              type: "string"
  *            describe:
  *              description: "Mô tả"
  *              type: "string"
  *            phoneNumber:
  *              description: "Số điện thoại"
  *              type: "string"
  *            address:
  *              description: "Địa chỉ"
  *              type: "string"
  *            note:
  *              description: "Ghi chú"
  *              type: "string"
  *            bankAccount:
  *              description: "Số tài khoản ngân hàng"
  *              type: "string"
  *            taxCode:
  *              description: "Mã số thuế"
  *              type: "string"
  *            category:
  *              description: "Phân loại"
  *              type: "enum"
  *              enum:
  *                 - electronics
  *                 - furniture
  *                 - stationery
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', isAdmin, SupplierController.create);

/**
  * @openapi
  * /a/suppliers:
  *   get:
  *     tags:
  *      - "[ADMIN] SUPPLIERS"
  *     summary: Hiển thị danh sách nhà cung cấp
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
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/', isAdmin, SupplierController.index);

/**
  * @openapi
  * /a/suppliers/{supplierId}:
  *   get:
  *     tags:
  *      - "[ADMIN] SUPPLIERS"
  *     summary: Hiển thị chi tiết nhà cung cấp
  *     parameters:
  *      - in: path
  *        name: "supplierId"
  *        description: "supplierId"
  *        type: "number"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/:supplierId', isAdmin, SupplierController.show);

/**
  * @openapi
  * /a/suppliers/{supplierId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] SUPPLIERS"
  *     summary: Xóa nhà cung cấp
  *     parameters:
  *      - in: path
  *        name: "supplierId"
  *        description: "supplierId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:supplierId', isAdmin, SupplierController.delete);

/**
  * @openapi
  * /a/suppliers/{supplierId}:
  *   patch:
  *     tags:
  *      - "[ADMIN] SUPPLIERS"
  *     summary: Cập nhật nhà cung cấp
  *     parameters:
  *      - in: path
  *        name: "supplierId"
  *        type: "number"
  *      - in: "body"
  *        name: "body"
  *        schema:
  *          type: "object"
  *          properties:
  *            name:
  *              description: "Tên nhà cung cấp"
  *              type: "string"
  *            describe:
  *              description: "Mô tả"
  *              type: "string"
  *            phoneNumber:
  *              description: "Số điện thoại"
  *              type: "string"
  *            address:
  *              description: "Địa chỉ"
  *              type: "string"
  *            note:
  *              description: "Ghi chú"
  *              type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.patch('/:supplierId', isAdmin, SupplierController.update);

export default router;
