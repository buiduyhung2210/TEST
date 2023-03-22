import SelectionsController from '@controllers/api/admin/SelectionsController';
import { Router } from 'express';

const router = Router();

/**
  * @openapi
  * /a/selections/supliers:
  *   get:
  *     tags:
  *      - "[ADMIN] SELECTIONS"
  *     summary: Hiển thị danh sách nhà cung cấp
  *     parameters:
  *      - in: query
  *        name: "freeWord"
  *        description: "freeWord"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/supliers', SelectionsController.indexSupplier);

/**
  * @openapi
  * /a/selections/departments:
  *   get:
  *     tags:
  *      - "[ADMIN] SELECTIONS"
  *     summary: Hiển thị danh sách phòng ban
  *     parameters:
  *      - in: query
  *        name: "freeWord"
  *        description: "freeWord"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/departments', SelectionsController.indexDepartment);

/**
  * @openapi
  * /a/selections/users:
  *   get:
  *     tags:
  *      - "[ADMIN] SELECTIONS"
  *     summary: Hiển thị danh sách người dùng
  *     parameters:
  *      - in: query
  *        name: "freeWord"
  *        description: "freeWord"
  *        type: "string"
  *      - in: query
  *        name: "role"
  *        description: "role"
  *        type: "enum"
  *        enum:
  *          - admin
  *          - user
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/users', SelectionsController.indexUser);

/**
  * @openapi
  * /a/selections/positions:
  *   get:
  *     tags:
  *      - "[ADMIN] SELECTIONS"
  *     summary: Hiển thị danh sách vị trí
  *     parameters:
  *      - in: query
  *        name: "freeWord"
  *        description: "freeWord"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.get('/positions', SelectionsController.indexPosition);

export default router;
