import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import ImageUploaderService from '@services/imageUploader';
import VideoUploaderService from '@services/videoUploader';
import FileUploaderService from '@services/fileUploader';
import { FileNotAccepted } from '@libs/errors';

class UploadController {
  public async upload (req: Request, res: Response) {
    try {
      const files: any[] = req.files as any[];
      const results: any[] = [];
      for (const file of files) {
        if ((file.mimetype.split('/')[0] === 'image')) {
          const filepath = await ImageUploaderService.singleUpload(file);
          results.push(
            { source: filepath, type: file.mimetype.split('/')[0] },
          );
          continue;
        }
        if (file.mimetype.split('/')[0] === 'video') {
          const filepath = await VideoUploaderService.singleUpload(file);
          results.push(
            { source: filepath, type: file.mimetype.split('/')[0] },
          );
          continue;
        }
        if (file.mimetype.split('/')[0] === 'file') {
          const filepath = await FileUploaderService.singleUpload(file);
          results.push(
            { source: filepath, type: file.mimetype.split('/')[0] },
          );
          continue;
        }
        return sendError(res, 315, FileNotAccepted);
      }
      sendSuccess(res, { results });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new UploadController();
