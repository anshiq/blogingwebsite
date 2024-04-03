import multer, { StorageEngine } from "multer";
import { Request } from "express";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: MulterFile,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, "uploads/");
  },
  filename: (
    req: Request,
    file: MulterFile,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export { upload };
