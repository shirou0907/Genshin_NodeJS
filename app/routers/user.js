const express = require('express');
const router = express.Router();
const PostController = require('../controller/post.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

router.get('/post', PostController.getAll);
router.get('/post/:id', PostController.getPostById);
router.post('/post/:id', AuthMiddleware.check , PostController.add);
router.put('/post/:id', AuthMiddleware.check , PostController.update);
router.delete('/post/:id', AuthMiddleware.check , PostController.delete);

module.exports = router;