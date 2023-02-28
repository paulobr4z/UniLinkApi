import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid'

export const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, path.resolve('uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${uuid()}_${file.originalname}`);
  }
});