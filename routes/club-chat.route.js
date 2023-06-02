const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../jwtAuth/jwtAuth');
const clubChatController = require('../controllers/club-chat.controller');

// router.post('/', jwtAuth.auth, clubsController.createClub);
router.get('/', clubChatController.getMessages);
router.post('/', clubChatController.createMessage);
router.put('/:messageid', clubChatController.editMessage);
router.delete('/:messageid', clubChatController.deleteMessage);

module.exports = router;