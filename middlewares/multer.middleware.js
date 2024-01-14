import multer from "multer";
import path from "path";

// const upload = multer({
//     dest: "uploads/",
//     limits: {fileSize: 50 * 1024 * 1024}, // 50 mb in size max limit
//     storage: multer.diskStorage({
//         destination: "uploads/",
//         filename: (_req,file,cd) => {
//             cd(null,file.originalname);
//         },
//     }),
//     fileFilter: (_req,file,cd) => {
//         let ext = path.extname(file.originalname);

//         if(
//             ext !== ".jpg" &&
//             ext !== ".jpeg" &&
//             ext !== ".webp" &&
//             ext !== ".png" &&
//             ext !== ".mp4"
//         ){
//               cd(new Error(`Unsupported file type! $(ext)`),false);
//               return;
//         }

//         cd(null,true)
//     },  
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

export default upload;