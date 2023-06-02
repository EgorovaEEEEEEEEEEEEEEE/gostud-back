const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../../jwtAuth/jwtAuth');
const chatsController = require('./chats.controller');

router.get('/:chatid', jwtAuth.auth, chatsController.getChat);
router.put('/:chatid', jwtAuth.auth, chatsController.updateChat);
router.delete('/:chatid', jwtAuth.auth, chatsController.deleteChat);

router.post('/:chatid', jwtAuth.auth, chatsController.createMessage);
router.put('/:chatid/messages/:messageid', jwtAuth.auth, chatsController.updateMessage);
router.delete('/:chatid/messages/:messageid', jwtAuth.auth, chatsController.deleteMessage);


module.exports = router;