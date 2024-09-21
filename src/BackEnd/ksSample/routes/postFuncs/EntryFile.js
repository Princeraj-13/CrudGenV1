import express from 'express';

var router = express.Router();

import {
    PostFunc, PostFromModalFunc, PostCustomPkFunc,
    PostUploadFunc, PostGetSelectColumnsFunc, PostUploadFromModalFunc,
    PostUploadImageFunc, PostFilterFunc, PostWithKeysCheckFunc,
    PostFuncGenUuId, PostWithCheckAndGenPkFunc, MultiInsertWithCheckFunc,
    UploadImageAsDataFunc, PostSendMailFunc, PostSendMailGenUuIdFunc
} from '../../controllers/postFuncs/EntryFile.js';

import {
    PostFunc as PostFuncmiddleware,
    MultiInsertWithCheck as MultiInsertWithCheckMiddleware
} from '../../middlewares/postFuncs/EntryFile.js';

import {
    StartFunc as middlewareUsingMulter
} from '../../middlewares/postFuncs/UsingMulter.js';

import { StartFunc as PostFuncPostUploadFunc } from '../../middlewares/postFuncs/PostUploadFunc.js';

import { upload as uploadFromMulter } from '../../dals/postFuncs/UsingMulter.js';

router.post('/BodyCheck', PostFuncmiddleware, PostFunc);
router.post('/GetSelectColumns', PostGetSelectColumnsFunc);
// Post - it's check foreign and unique check and it's collect Max pk and generate UuId And pk also
router.post('/', PostFunc);
router.post('/SendMail', PostSendMailFunc);
router.post('/SendMailGenUuId', PostSendMailGenUuIdFunc);

router.post('/CustomPk', PostCustomPkFunc);
router.post('/GenUuId', PostFuncGenUuId);
// WithKeysCheck - it's check foreign and unique check and it's collect Max pk and generate UuId
router.post('/WithKeysCheck', PostWithKeysCheckFunc);
// WithCheckAndGenPk - it's check foreign and unique check and it's collect Max pk and generate pk
router.post('/WithCheckAndGenPk', PostWithCheckAndGenPkFunc);
router.post('/MultiInsertWithCheck', MultiInsertWithCheckMiddleware, MultiInsertWithCheckFunc);
router.post('/Filter', PostFilterFunc);
router.post('/FromModal', PostFromModalFunc);
router.post('/Upload', PostFuncPostUploadFunc, PostUploadFunc);
router.post('/UploadFromModal', PostUploadFromModalFunc);
router.post('/UploadImage/:Id', middlewareUsingMulter.single("image"), PostUploadImageFunc);
router.post('/UploadMultipleImages/:Id', uploadFromMulter.array("images", 4), PostUploadImageFunc);
router.post('/UploadImageAsData', middlewareUsingMulter.array(), UploadImageAsDataFunc);

export { router };