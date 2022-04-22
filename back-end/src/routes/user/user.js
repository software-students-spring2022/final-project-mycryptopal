/* eslint-disable max-len */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const User = require('../../models/User');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const bcrypt = require('bcrypt');
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
      console.log('Error during user avatar upload');
      console.log(err);
    }
  },
});
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    req.body.code = 400;
    req.body.success = false;
    req.body.error = 'Invalid filetype (not an image)';
    cb(null, false);
  }
};
const upload = multer({storage: s3Storage, fileFilter: imageFilter});

// Routes
router.get('/assets', async (req, res) => {
  const userId = req.user.user_id;
  try {
    const user = await User.findOne({user_id: userId});
    const assets = user.assets;
    res.json({success: true, assets: assets});
  } catch (err) {
    console.log('Error getting user assets');
    console.log(err);
    res.status(500).json({success: false, error: 'Server error'});
  }
});

router.get('/assets/:symbol', async (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  const userId = req.user.user_id;
  try {
    const user = await User.findOne({user_id: userId});
    if (user.assets[SYMBOL]) {
      res.json({success: true, amount: user.assets[SYMBOL]});
    } else {
      res.json({success: true, amount: 0});
    }
  } catch (err) {
    console.log('Error getting an asset from user assets');
    console.log(err);
    res.status(500).json({success: false, error: 'Server error'});
  }
});

router.post('/update/assets/:symbol', async (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  const userId = req.user.user_id;
  const cryptoAmount = parseInt(req.body.amount); // if quantity is negative then, it is a drop command
  try {
    const user = await User.findOne({user_id: userId});
    // add to the assets property of the user here
    const assets = user.assets;
    if (SYMBOL in assets) { // case user has slug already and is simply adding
      assets[SYMBOL] += cryptoAmount;
      console.log(`case user has ${SYMBOL} already and is simply adding ${cryptoAmount}`);
    } else { // case user does not have slug
      assets[SYMBOL] = cryptoAmount;
      console.log(`user has added ${SYMBOL}.`);
    }
    if (assets[SYMBOL] === 0) { // Remove crypto from assets field
      delete assets[SYMBOL];
      console.log(`deleting ${SYMBOL}`);
    }
    user.markModified('assets');
    user.save();
    res.json({success: true});
    console.log(assets);
    console.log(assets[SYMBOL]);
    console.log(cryptoAmount);
  } catch (err) {
    console.log('Error updating user assets');
    console.log(err);
    res.status(500).json({success: false, error: 'Server error'});
  }
});

router.get('/avatar', async (req, res) => {
  const user = req.user;
  const userId = user.user_id;
  res.json({success: true, url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/u/${userId}/${user.avatar}`});
});

router.post('/update/avatar', upload.single('avatar'), (req, res) => {
  if (req.body.success) {
    res.json({success: true});
  } else {
    res.status(req.body.code).json({success: false, error: req.body.error});
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
        try {
          const userId = req.user.user_id;
          const user = await User.findOne({user_id: userId});
          const changedUsername = (user.username !== req.body.username);
          let duplicateUsername = false;
          if (changedUsername) {
            const duplicateUsers = await User.find({username: req.body.username});
            if (duplicateUsers.length > 0) {
              duplicateUsername = true;
            }
          }
          if (duplicateUsername) {
            res.status(400).json({success: false, error: 'A user with this username already exists'});
          } else {
            const updatedInfo = req.body;
            Object.keys(updatedInfo).forEach((key) => {
              user[key] = updatedInfo[key];
            });
            user.save();
            res.json({success: true});
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({success: false, error: 'Server error'});
        }
      } else {
        res.status(400).json({success: false, error: 'Invalid inputs'});
      }
    });

router.post('/update/credentials',
    body('newPassword').matches(process.env.PASSWORD_REGEX),
    async (req, res) => {
      const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) {
        const matchesReenter = req.body.newPassword === req.body.rePassword;
        if (matchesReenter) {
          const userId = req.user.user_id;
          try {
            const user = await User.findOne({user_id: userId});
            const matchesCurrent = await bcrypt.compare(req.body.currentPassword, user.password);
            if (matchesCurrent) {
              const passwordSalt = await bcrypt.genSalt(10);
              const hashedNewPassword = await bcrypt.hash(req.body.newPassword, passwordSalt);
              user.password = hashedNewPassword;
              user.save();
              res.json({success: true});
            } else {
              res.status(401).json({success: false, error: 'Entered current password is incorrect.'});
            }
          } catch (err) {
            console.log(err);
            res.status(500).json({success: false, error: 'Server error'});
          }
        } else {
          res.status(400).json({success: false, error: 'New password does not match re-entered password.'});
        }
      } else {
        res.status(400).json({success: false, error: 'Invalid format for new password. Should have no spaces, minimum length of 6, and at least 1 uppercase letter, 1 lowercase letter, and 1 number.'});
      }
    });

module.exports = router;
