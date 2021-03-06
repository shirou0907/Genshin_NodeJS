const express = require('express');
const router = express.Router();
const PostController = require('../controller/post.controller');
const AccountController = require('../controller/account.controller');
const AuthMiddleware = require('../middleware/auth.middleware');
const RoleMiddleware = require('../middleware/role.middleware');
const CommentController = require('../controller/comment.controller');


router.get('/', AuthMiddleware.check, RoleMiddleware.checkRole, AccountController.getInfo)

router.get('/post', PostController.getAll);
router.get('/post/v2', PostController.getAll2);
router.get('/post/:id', PostController.getPostById);
router.post('/post/:id', AuthMiddleware.check, PostController.add);
router.put('/post/:id', AuthMiddleware.check, PostController.update);
router.delete('/post/:id', AuthMiddleware.check, PostController.delete);

router.post('/post-by-user', PostController.getPostByUser);

router.post('/comment', AuthMiddleware.check, CommentController.create);
router.delete('/comment', AuthMiddleware.check, RoleMiddleware.checkRole, CommentController.delete);

router.put('/info', AuthMiddleware.check, AccountController.update);
router.delete('/info/:id', AuthMiddleware.check, RoleMiddleware.checkRole, AccountController.destroy);

router.put('/change-password', AuthMiddleware.check, AccountController.changePassword);

module.exports = router;