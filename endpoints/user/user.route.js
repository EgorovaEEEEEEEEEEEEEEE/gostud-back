const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../../jwtAuth/jwtAuth');
const userController = require('./user.controller');

router.get('/', jwtAuth.auth, userController.getUser);
router.put('/', jwtAuth.auth, userController.updateUser);
router.delete('/', jwtAuth.auth, userController.deleteUser);

router.get('/clubs', jwtAuth.auth, userController.getUserClubs);
router.get('/chats', jwtAuth.auth, userController.getUserChats);

router.post('/clubs', jwtAuth.auth, userController.subClub);
router.delete('/clubs', jwtAuth.auth, userController.unsubClub);

router.post('/club/:clubhandle', jwtAuth.auth, userController.joinChat);
router.delete('/chat/:chatid', jwtAuth.auth, userController.leaveChat);

module.exports = router;