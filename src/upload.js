import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: function(req, file, cb) {
      const [mtype] = file.mimetype.split("/");
      cb(
        null,
        mtype.toLowerCase() === "image"
          ? "wegoods/image"
          : mtype.toLowerCase() === "video"
          ? "wegoods/video"
          : "wegoods/other"
      );
    },
    contentType: function(req, file, cb) {
      const [, type] = file.originalname.split(".");
      cb(null, file.mimetype);
    },

    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    }
  })
});

//const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  //console.log("req.file", req.file);

  const {
    file: { location }
  } = req;
  res.json({ location });
};
