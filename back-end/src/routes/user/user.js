/* eslint-disable no-unused-vars */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const User = require('../../models/User');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const {body, validationResult} = require('express-validator');

// Avatar upload
const aws = require('aws-sdk');
const s3 = new aws.S3();
s3.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Storage = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: process.env.AWS_S3_BUCKET,
  key: async function(req, file, cb) {
    try {
      const user = await User.findOne({user_id: req.body.userId});
      const newFilename = `${file.fieldname}${path.extname(file.originalname)}`;
      user.avatar = newFilename;
      user.save();
      cb(null, `u/${req.body.userId}/${newFilename}`);
      req.body.success = true;
    } catch (err) {
      req.body.success = false;
      req.body.error = 'Error during user avatar upload';
      console.log(err);
    }
  },
});
const upload = multer({storage: s3Storage});

// Routes
router.get('/avatar/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({user_id: userId});
  if (user) {
    res.json({success: true, url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/u/${req.params.userId}/${user.avatar}`});
  } else {
    res.status(400).json({success: false, error: `User does not exist`});
  }
});

router.post('/update/avatar', upload.single('avatar'), (req, res) => {
  if (req.body.success) {
    res.json({success: true});
  } else {
    res.status(500).json({success: false, error: req.body.error});
  }
});

router.get('/info', (req, res) => {
  const user = req.user;
  res.json(user);
});

router.post('/update/info',
    body('email').isEmail(),
    body('username').isLength({min: 6}),
    async (req, res) => {
      const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) {
        const userId = req.user.user_id;
        try {
          const user = await User.findOne({user_id: userId});
          if (user) {
            const updatedInfo = req.body;
            Object.keys(updatedInfo).forEach((key) => {
              user[key] = updatedInfo[key];
            });
            user.save();
            res.json({success: true});
          } else {
            res.json(404).json({success: false, error: 'User not found'});
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({success: false, error: 'Server error'});
        }
      } else {
        res.status(400).json({success: false, error: 'Invalid inputs'});
      }
    });

module.exports = router;
