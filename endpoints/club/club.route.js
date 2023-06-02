const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../../jwtAuth/jwtAuth');
const clubController = require('./club.controller');

router.get('/', jwtAuth.auth, clubController.getClubs);
router.get('/:clubhandle', jwtAuth.auth, clubController.getClub);
router.post('/', jwtAuth.auth, clubController.createClub);
router.put('/:clubhandle', jwtAuth.auth, clubController.updateClub);
router.delete('/:clubhandle', jwtAuth.auth, clubController.deleteClub);

router.post('/:clubhandle/post', jwtAuth.auth, clubController.createPost);
router.put('/:clubhandle/post/:postid', jwtAuth.auth, clubController.updatePost);
router.delete('/:clubhandle/post/:postid', jwtAuth.auth, clubController.deletePost);

module.exports = router;