import DepartmentController from '@controllers/api/admin/DepartmentsController';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
  * @openapi
  * /a/departments:
  *   post:
  *     tags:
  *      - "[ADMIN] DEPARTMENTS"
  *     summary: thêm mới phòng ban
  *     parameters:
  *      - in: "body"
  *        name: "body"
  *        description: "infomation"
  *        schema:
  *          type: "object"
  *          properties:
  *            departmentName:
  *              type: "string"
  *              description: "tên phòng ban"
  *            address:
  *              type: "string"
  *              description: "ví trị"
  *            managerId:
  *              type: "number"
  *              description: "người quản lý"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.post('/', isAdmin, DepartmentController.create);

/**
  * @openapi
  * /a/departments:
  *   get:
  *     tags:
  *      - "[ADMIN] DEPARTMENTS"
  *     summary: thông tin phòng ban
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/', isAdmin, DepartmentController.index);

/**
  * @openapi
  * /a/departments/{departmentId}:
  *   patch:
  *     tags:
  *      - "[ADMIN] DEPARTMENTS"
  *     summary: cập nhật phòng ban
  *     parameters:
  *      - in: path
  *        name: "departmentId"
  *        type: "number"
  *      - in: "body"
  *        name: "body"
  *        description: "infomation"
  *        schema:
  *          type: "object"
  *          properties:
  *            departmentName:
  *              type: "string"
  *              description: "tên phòng ban"
  *            address:
  *              type: "string"
  *              description: "ví trị"
  *            managerId:
  *              type: "number"
  *              description: "người quản lý"
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
router.patch('/:departmentId', isAdmin, DepartmentController.update);

/**
  * @openapi
  * /a/departments/{departmentId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] DEPARTMENTS"
  *     summary: xóa phòng ban
  *     parameters:
  *      - in: path
  *        name: "departmentId"
  *        description: "departmentId"
  *        type: "string"
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
router.delete('/:departmentId', isAdmin, DepartmentController.delete);

export default router;
