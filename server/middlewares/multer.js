import multer from "multer";
import path from 'path';  

export const uploadImageSingle = (folder) => {
  const storage = multer.diskStorage({
    destination: `./uploads/${folder}`,
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const uniqueName = "poster-" + Date.now() + "-" + Math.round(Math.random() * 1E9) + ext;
      callback(null, uniqueName);
    }
  })

  const upload = multer({storage}).single("poster");
  return upload;
}