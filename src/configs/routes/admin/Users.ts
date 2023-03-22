import UserController from '@controllers/api/admin/UserController';
import { withoutSavingUploader } from '@middlewares/uploaders';
import { Router } from 'express';
import { isAdmin } from '@middlewares/checkRole';

const router = Router();
/**
 * @openapi
 * /a/users/:
 *   get:
 *     tags:
 *      - "[ADMIN] USERS"
 *     summary: Danh sách user/bộ lọc
 *     description: Danh sách user/bộ lọc
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
 *        name: "freeWord"
 *        description: "freeWord"
 *        type: "string"
 *      - in: query
 *        name: "status"
 *        description: "status"
 *        type: "string"
 *        enum:
 *          - active
 *          - inactive
 *      - in: query
 *        name: "positionIds"
 *        schema:
 *          type: string
 *        description: Lọc theo Id chức vụ
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
router.get('/', isAdmin, UserController.index);

/**
 * @openapi
 * /a/users/download:
 *   get:
 *     tags:
 *      - "[ADMIN] USERS"
 *     summary: Tải xuống danh sách nhân viên
 *     description: Tải xuống danh sách nhân viên
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
router.get('/download', isAdmin, UserController.download);

/**
  * @openapi
  * /a/users/upload:
  *   patch:
  *     tags:
  *      - "[ADMIN] USERS"
  *     summary: Tải lên danh sách nhân viên
  *     consumes:
  *      - "multipart/form-data"
  *     produces:
  *      - "application/json"
  *     parameters:
  *      - in: "formData"
  *        name: "file"
  *        description: "File upload"
  *        required: false
  *        allowMultiple: true
  *        type: "file"
  *     responses:
  *       200:
  *         description: "Upload success"
  *       500:
  *         description: "Upload failed"
  *     security:
  *      - Bearer: []
  */
router.patch('/upload', isAdmin,
  withoutSavingUploader.single('file'), UserController.upload);

/**
 * @openapi
 * /a/users/{userId}:
 *   get:
 *     tags:
 *      - "[ADMIN] USERS"
 *     summary: Chi tiết user
 *     description: Chi tiết user
 *     parameters:
 *      - in: path
 *        name: "userId"
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
router.get('/:userId', isAdmin, UserController.show);

/**
 * @openapi
 * /a/users/update_current:
 *   patch:
 *     tags:
 *      - "[ADMIN] USERS"
 *     summary: Cập nhật currentUser
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            fullName:
 *              type: "string"
 *            departmentId:
 *              type: "number"
 *            positionId:
 *              type: "number"
 *            address:
 *              type: "string"
 *            gender:
 *              type: "string"
 *              enum:
 *               - male
 *               - female
 *               - other
 *            dateOfBirth:
 *              type: "string"
 *              default: "2000/01/01"
 *            dateIn:
 *              type: "string"
 *              default: "2000/01/01"
 *            dateOut:
 *              type: "string"
 *              default: "2000/01/01"
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
router.patch('/update_current', UserController.updateCurrent);
/**
 * @openapi
 * /a/users/{userId}:
 *   patch:
 *     tags:
 *      - "[ADMIN] USERS"
 *     summary: Cập nhật user
 *     parameters:
 *      - in: path
 *        name: "userId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            phoneNumber:
 *              type: "string"
 *            employeeCode:
 *              type: "string"
 *            fullName:
 *              type: "string"
 *            departmentId:
 *              type: "number"
 *            positionId:
 *              type: "number"
 *            address:
 *              type: "string"
 *            gender:
 *              type: "string"
 *              enum:
 *               - male
 *               - female
 *               - other
 *            status:
 *              type: "string"
 *              enum:
 *               - active
 *               - inactive
 *            role:
 *              type: "string"
 *              enum:
 *               - admin
 *               - user
 *            dateOfBirth:
 *              type: "string"
 *              default: "2000/01/01"
 *            dateIn:
 *              type: "string"
 *              default: "2000/01/01"
 *            dateOut:
 *              type: "string"
 *              default: "2000/01/01"
 *            description:
 *              type: "string"
 *            password:
 *              type: "string"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:userId', isAdmin, UserController.update);

/**
  * @openapi
  * /a/users/{userId}/upload_avatar:
  *   patch:
  *     tags:
  *      - "[ADMIN] USERS"
  *     summary: Tải lên avatar
  *     consumes:
  *      - "multipart/form-data"
  *     produces:
  *      - "application/json"
  *     parameters:
  *      - in: "formData"
  *        name: "avatar"
  *        description: "File upload"
  *        required: false
  *        allowMultiple: true
  *        type: "file"
  *      - in: "path"
  *        name: "userId"
  *        required: true
  *     responses:
  *       200:
  *         description: "Upload success"
  *       500:
  *         description: "Upload failed"
  *     security:
  *      - Bearer: []
  */
router.patch('/:userId/upload_avatar', isAdmin, withoutSavingUploader.single('avatar'), UserController.uploadAvatar);

/**
  * @openapi
  * /a/users/{userId}:
  *   delete:
  *     tags:
  *      - "[ADMIN] USERS"
  *     summary: Xóa TK user
  *     parameters:
  *      - in: path
  *        name: "userId"
  *        description: "userId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:userId', isAdmin, UserController.delete);

/**
 * @openapi
 * /a/users/:
 *  post:
 *     tags:
 *      - "[ADMIN] USERS"
 *     summary: register
 *     description: register
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "thông tin admin"
 *        schema:
 *          type: "object"
 *          properties:
 *            phoneNumber:
 *              type: "string"
 *            fullName:
 *              type: "string"
 *            password:
 *              type: "string"
 *            email:
 *              type: "string"
 *            employeeCode:
 *              type: "string"
 *            positionId:
 *              type: "number"
 *            departmentId:
 *              type: "number"
 *            role:
 *              type: "string"
 *            status:
 *              type: "string"
 *            dateIn:
 *              type: "string"
 *              default: "2000/01/01"
 *            dateOut:
 *              type: "string"
 *              default: "2000/01/01"
 *     responses:
 *       120:
 *        description: email đã tồn tại
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.post('/', isAdmin, UserController.create);

export default router;
