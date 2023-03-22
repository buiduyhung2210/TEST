import sessionsController from '@controllers/api/admin/SessionsController';
import { Router } from 'express';
import { userPassport } from '@middlewares/passport';

const router = Router();
/**
 * @openapi
 * /a/sessions/:
 *   post:
 *     tags:
 *      - "[ADMIN] Sessions"
 *     summary: login
 *     description: login
 *     parameters:
 *      - in: body
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *            password:
 *              type: "string"
 *     responses:
 *       401:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.post('/', sessionsController.login);

/**
 * @openapi
 * /a/sessions/:
 *   get:
 *     tags:
 *      - "[ADMIN] Sessions"
 *     summary: Lấy thông tin cá nhân đăng nhập
 *     description: Lấy thông tin cá nhân đăng nhập
 *     responses:
 *       401:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/', userPassport.authenticate('jwt', { session: false }), sessionsController.show);

export default router;
