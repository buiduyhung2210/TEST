import UploadController from '@controllers/api/admin/UploadController';
import { Request, Response, Router } from 'express';
import { withoutSavingUploader } from '@middlewares/uploaders';

const router = Router();
/**
  * @openapi
  * /a/upload/:
  *   post:
  *     tags:
  *      - "[ADMIN] UPLOAD"
  *     summary: upload
  *     consumes:
  *      - "multipart/form-data"
  *     produces:
  *      - "application/json"
  *     parameters:
  *      - in: "formData"
  *        name: "files"
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
router.post('/', withoutSavingUploader.array('files'), (req: Request, res: Response) => UploadController.upload(req, res));
export default router;
